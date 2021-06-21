/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import {diff} from "./utils";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const onUserChanged = functions.database
    .ref("/users/{uid}/queue")
    .onUpdate((snapshot, context) => {
      const uid = context.params.uid;
      console.log(`${uid} data changed`);
      const beforeUserData = snapshot.before.val();
      const afterUserData = snapshot.after.val();
      console.log(diff(beforeUserData, afterUserData));
    });

