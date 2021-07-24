import {getFirstAvailChat, getFirstAvailChatModified} from "../index";

const chatExample0 = {
  chat1: {
    activematchUUID: "123", active: true,
  },
  chat2: {
    activematchUUID: "456", active: true,
  },
  chat3: {
    activematchUUID: "789", active: true,
  },
  chat4: {
    activematchUUID: "987", active: false,
  },
  chat5: {
    activematchUUID: "654", active: true,
  },
};

const chatExample1 = [
  {chatId: 1, details: {activematchUUID: "123", active: true}},
  {chatId: 2, details: {activematchUUID: "456", active: true}},
  {chatId: 3, details: {activematchUUID: "789", active: true}},
  {chatId: 4, details: {activematchUUID: "987", active: false}},
  {chatId: 5, details: {activematchUUID: "654", active: true}},
];

it("first chat modified is correct test 1", () => {
  const res = getFirstAvailChatModified(chatExample0);
  expect(res).toStrictEqual(chatExample1[3]);
});

it("first chat is correct test 1", () => {
  const res = getFirstAvailChat(chatExample1);
  expect(res).toBe(chatExample1[3]);
});

const chatExample2 = {
  chat1: {
    activematchUUID: "123", active: true,
  },
  chat2: {
    activematchUUID: "456", active: true,
  },
  chat3: {
    activematchUUID: "789", active: true,
  },
  chat4: {
    activematchUUID: "987", active: true,
  },
  chat5: {
    activematchUUID: "654", active: true,
  },
};

const chatExample3 = [
  {chatId: 1, details: {activematchUUID: "123", active: true}},
  {chatId: 2, details: {activematchUUID: "456", active: true}},
  {chatId: 3, details: {activematchUUID: "789", active: true}},
  {chatId: 4, details: {activematchUUID: "987", active: true}},
  {chatId: 5, details: {activematchUUID: "654", active: true}},
];

it("first chat modified is correct test 2", () => {
  const res = getFirstAvailChatModified(chatExample2);
  expect(res).toBe(null);
});

it("first chat is correct test 2", () => {
  const res = getFirstAvailChat(chatExample3);
  expect(res).toBe(null);
});
