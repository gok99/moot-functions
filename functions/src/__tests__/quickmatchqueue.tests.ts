/* eslint-disable @typescript-eslint/no-explicit-any */
import {runQuickMatches} from "../index";
import {users} from "../quickmatchconstants";

const j = (o: any) => JSON.stringify(o);
const queue1 = {
  "6UBuI0ReRkR226xuTB1PkVNPm3z2": {
    "timeMatched": 1627120093958,
    "uid": "6UBuI0ReRkR226xuTB1PkVNPm3z2",
  },
  "FY5aQrPpOwcuJp8N9fpyfchZzUI3": {
    "timeMatched": 1627119469778,
    "uid": "FY5aQrPpOwcuJp8N9fpyfchZzUI3",
  },
};

it("quick match test 1", async () => {
  const res = await runQuickMatches(queue1, true, users);
  expect(j(res)).toBe(j(queue1));
});

const queue2 = {
  "6UBuI0ReRkR226xuTB1PkVNPm3z2": {
    "timeMatched": 1627120093958,
    "uid": "6UBuI0ReRkR226xuTB1PkVNPm3z2",
  },
  "Z3Bw59ax8SPhrzftnAWE48kE4yk2": {
    "timeMatched": 1627119469778,
    "uid": "Z3Bw59ax8SPhrzftnAWE48kE4yk2",
  },
};
it("quick match test 2", async () => {
  const res = await runQuickMatches(queue2, true, users);
  expect(j(res)).toBe(j({}));
});

const queue3 = {
  "6UBuI0ReRkR226xuTB1PkVNPm3z2": {
    "timeMatched": 1627120093958,
    "uid": "6UBuI0ReRkR226xuTB1PkVNPm3z2",
  },
  "MgFaXdV0hda0K6YLJUJur7QBw0l1": {
    "timeMatched": 1627119469778,
    "uid": "MgFaXdV0hda0K6YLJUJur7QBw0l1",
  },
  "s6G8g9hP4aTJtJwj1DZyDqRer0m2": {
    "timeMatched": 1627119469978,
    "uid": "s6G8g9hP4aTJtJwj1DZyDqRer0m2",
  },
};

it("quick match test 3", async () => {
  const res = await runQuickMatches(queue3, true, users);
  expect(j(res)).toBe(j({"MgFaXdV0hda0K6YLJUJur7QBw0l1": {
    "timeMatched": 1627119469778,
    "uid": "MgFaXdV0hda0K6YLJUJur7QBw0l1",
  }}));
});


const queue4 = {
  "6UBuI0ReRkR226xuTB1PkVNPm3z2": {
    "timeMatched": 1627120093958,
    "uid": "6UBuI0ReRkR226xuTB1PkVNPm3z2",
  },
  "MgFaXdV0hda0K6YLJUJur7QBw0l1": {
    "timeMatched": 1627119469778,
    "uid": "MgFaXdV0hda0K6YLJUJur7QBw0l1",
  },
  "s6G8g9hP4aTJtJwj1DZyDqRer0m2": {
    "timeMatched": 1627119469978,
    "uid": "s6G8g9hP4aTJtJwj1DZyDqRer0m2",
  },
  "LitEz1ZKqUP3viexVNk1m1yQHOt1": {
    "timeMatched": 1627199469978,
    "uid": "LitEz1ZKqUP3viexVNk1m1yQHOt1",
  },
};

it("quick match test 3", async () => {
  const res = await runQuickMatches(queue4, true, users);
  expect(j(res)).toBe(j({"MgFaXdV0hda0K6YLJUJur7QBw0l1": {
    "timeMatched": 1627119469778,
    "uid": "MgFaXdV0hda0K6YLJUJur7QBw0l1",
  },
  "s6G8g9hP4aTJtJwj1DZyDqRer0m2": {
    "timeMatched": 1627119469978,
    "uid": "s6G8g9hP4aTJtJwj1DZyDqRer0m2",
  }}));
});

