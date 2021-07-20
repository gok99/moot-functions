/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {diff} from "./utils";
import {config} from "./secrets";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// Utils
const userRef = (uid: string) => db.ref(`/users/${uid}`);
const userChatRef = (uid: string, chatId: number) =>
  db.ref(`/users/${uid}/chats/chat${chatId}`);
const getChats = (snapshot: any) => {
  if (snapshot.exists()) {
    const val = snapshot.val();
    const chats = [];
    for (let i = 1; i <= 5; i++) {
      chats.push({
        chatId: i,
        details: val.chats[`chat${i}`],
      });
    }
    return chats;
  } else {
    console.log("No data available");
    return null;
  }
};
const getFirstAvailChat = (chats: any) => {
  if (chats) {
    for (const chat of chats) {
      if (!chat.details.active) return chat;
    }
    return null;
  }
  return null;
};
const getFirstAvailChatModified = (chats: any) => {
  if (chats) {
    const chatList = [];
    const chatVals = Object.values(chats);
    for (let i = 1; i <= chatVals.length; i++) {
      chatList.push({
        chatId: i,
        details: chats[`chat${i}`],
      });
    }
    if (!chatList[0].details) return null;
    for (const chat of chatList) {
      if (!chat.details.active) return chat;
    }
    return null;
  }
  return null;
};
const freshMatchCheck = (u1: any, u2: any) => {
  if (!u1.chats || !u2.chats) return false;
  const activeChats = Object.values(u1.chats || {}).find((chat: any) =>
    chat.activematchUUID === u2.profile.uid);
  const friends = Object.values(u1.friends || {}).find((friend: any) =>
    friend.friendUid === u2.profile.uid);
  console.log("chats");
  console.log(activeChats);
  console.log("friends");
  console.log(friends);
  return !activeChats && !friends;
};

admin.initializeApp(config);
const db = admin.database();
export const onMatchQueueChanged = functions.database
    .ref("/matchQueue")
    .onUpdate((snapshot, context) => {
      const before = snapshot.before.val();
      const after = snapshot.after.val();
      const la = Object.values(after).length;
      const lb = Object.values(before).length;
      if (la < lb || !changed(before, after)) {
        console.log("early finish");
        return null;
      }
      // db.ref("matchQueue").transaction(runMatches);
      return runMatches(snapshot.after.val());
    });

export const onQuickMatchQueueChanged = functions.database
    .ref("/quickMatchQueue")
    .onUpdate((snapshot, context) => {
      const before = snapshot.before.val();
      const after = snapshot.after.val();
      const la = Object.values(after).length;
      const lb = Object.values(before).length;
      if (la < lb || !changed(before, after)) {
        console.log("early finish");
        return null;
      }

      //  db.ref("quickMatchQueue").transaction(async (queue) => {

      async function runQuickMatches(queue: any) {
        const promises = [];
        if (queue) {
          const userPromises = Object.values(queue).map((val: any) =>
            userRef(val.uid).once("value"));
          // const tags = Object.values(queue).map((val: any) =>
          //   Object.keys(val.tags));
          const userSnapshots = await Promise.all(userPromises);
          const users = userSnapshots.map((us) => us.val() || {});
          const commonTags = users.map((user1) =>
            users.map((user2) => {
              return {
                user: user2,
                commonTagsCount: (Object.keys((user2 || {}).tags || {}))
                    .filter((tag: string) =>
                      (Object.keys((user1 || {}).tags || {}))
                          .includes(tag)).length,
              };
            }).filter((obj) => {
              const objUid = obj.user.profile ? obj.user.profile.uid : "DUMMY";
              const user1Uid = user1.profile ? user1.profile.uid : "DUMMY";
              return objUid !== user1Uid && objUid !== "DUMMY";
            }).sort((obj1, obj2) =>
              obj1.commonTagsCount - obj2.commonTagsCount));
          const usersMatched = users.map(() => false);
          const getUidIndex = (uid:string) =>
            users.findIndex((u:any) =>
              (u.profile ? u.profile.uid : "DUMMY") === uid);
          for (let i = 0; i < users.length; i++) {
            if (!usersMatched[i]) {
              const tagObj1 = commonTags[i];
              for (let j = 0; j < tagObj1.length; j++) {
                const u2Index = getUidIndex(tagObj1[j].user.profile.uid);
                if (!usersMatched[u2Index]) {
                  const u1 = users[i];
                  const u2 = users[u2Index];
                  const u1Avail = getFirstAvailChatModified(u1.chats);
                  const u2Avail = getFirstAvailChatModified(u2.chats);
                  console.log(u1Avail);
                  console.log(u2Avail);
                  if (u1Avail && u2Avail && freshMatchCheck(u1, u2)) {
                    promises.push(userChatRef(u1.profile.uid, u1Avail.chatId)
                        .update({
                          active: true,
                          activematchUUID: u2.profile.uid,
                          matchBOT: u2Avail.chatId,
                        }));
                    promises.push(userChatRef(u2.profile.uid, u2Avail.chatId)
                        .update({
                          active: true,
                          activematchUUID: u1.profile.uid,
                          matchBOT: u1Avail.chatId,
                        }));
                    usersMatched[i] = true;
                    usersMatched[u2Index] = true;
                    break;
                  }
                }
              }
            }
          }
          console.log(usersMatched);
          for (let i = users.length-1; i >= 0; i--) {
            if (usersMatched[i] && users[i].profile) {
              delete queue[users[i].profile.uid];
            }
          }
          promises.push(db.ref("/quickMatchQueue").set(queue));
        }
        return Promise.all(promises);
      }
      return runQuickMatches(after);
    });


async function runMatches(queue: any) {
  const matched: { liker: string, poster: string }[] = [];
  // eslint-disable-next-line max-len
  const matchedInQueue = async (likerP: any, posterP: any) => {
    const liker = (await likerP).val().profile.uid;
    const poster = (await posterP).val().profile.uid;
    for (const match of matched) {
      if ((liker === match.liker && poster === match.poster) ||
      (liker === match.poster && poster === match.liker)) {
        return true;
      }
    }
    return false;
  };
  const promises = [];

  for (const key of Object.keys(queue)) {
    const match = queue[key];
    if (match.posterAvail && match.likerAvail) {
      const poster = userRef(match.posterUid).once("value");
      const liker = userRef(match.likerUid).once("value");
      const likerChat = await liker.then(getChats).then(getFirstAvailChat);
      const posterChat = await poster.then(getChats).then(getFirstAvailChat);
      if (!likerChat) {
        queue[key].likerAvail = false;
      }
      if (!posterChat) {
        queue[key].posterAvail = false;
      }
      if (await matchedInQueue(liker, poster)) {
        delete queue[key];
      } else if (likerChat && posterChat) {
        promises.push(userChatRef(match.likerUid, likerChat.chatId).update({
          active: true,
          activematchUUID: match.posterUid,
          matchBOT: posterChat.chatId,
        }));
        promises.push(userChatRef(match.posterUid, posterChat.chatId).update({
          active: true,
          activematchUUID: match.likerUid,
          matchBOT: likerChat.chatId,
        }));
        matched.push({
          liker: (await liker).val().profile.uid,
          poster: (await poster).val().profile.uid,
        });
        console.log({
          liker: likerChat.chatId,
          poster: posterChat.chatId,
        });
        delete queue[key];
      }
    }
  }
  promises.push(db.ref("/matchQueue").set(queue));
  return Promise.all(promises);
}

function changed(obj1: any, obj2: any) {
  const d = diff(obj1, obj2);
  if (d) {
    const vals = Object.values(d);
    let changed = false;
    for (const v of vals) {
      if (!v || Object.values(v).length > 0) {
        changed = true;
        break;
      }
    }
    return changed;
  }
  return false;
}
