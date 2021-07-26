/* eslint-disable @typescript-eslint/no-explicit-any */
import {runMatches} from "../index";
import {users} from "../quickmatchconstants";

const j = (o: any) => JSON.stringify(o);
const queue1 = {
  "-MfO6tQxzHpxpWqpEPaa": {
    "likerAvail": false,
    "likerUid": "s6G8g9hP4aTJtJwj1DZyDqRer0m2",
    "postUid": "-MfMuEUD0rwD4aJjYDWS",
    "posterAvail": true,
    "posterUid": "6UBuI0ReRkR226xuTB1PkVNPm3z2",
    "timeMatched": 1627140363571,
  },
};

it("match test 1", async () => {
  const res = await runMatches(queue1, true, users);
  expect(j(res)).toBe(j(queue1));
});

const queue2 = {
  "-MfO6tQxzHpxpWqpEPaa": {
    "likerAvail": true,
    "likerUid": "s6G8g9hP4aTJtJwj1DZyDqRer0m2",
    "postUid": "-MfMuEUD0rwD4aJjYDWS",
    "posterAvail": true,
    "posterUid": "6UBuI0ReRkR226xuTB1PkVNPm3z2",
    "timeMatched": 1627140363571,
  },
};

it("match test 2", async () => {
  const res = await runMatches(queue2, true, users);
  expect(j(res)).toBe(j({}));
});

const queue3 = {
  "-MfO6tQxzHpxpWqpEPaa": {
    "likerAvail": true,
    "likerUid": "s6G8g9hP4aTJtJwj1DZyDqRer0m2",
    "postUid": "-MfMuEUD0rwD4aJjYDWS",
    "posterAvail": true,
    "posterUid": "MgFaXdV0hda0K6YLJUJur7QBw0l1",
    "timeMatched": 1627140363571,
  },
};

it("match test 3", async () => {
  const res = await runMatches(queue3, true, users);
  expect(j(res)).toBe(j(queue3));
});
