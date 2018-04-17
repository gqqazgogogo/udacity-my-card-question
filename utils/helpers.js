// @flow
import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

/**
 * storage结构
 * decks:  [
 *  {
 *    title: string,
 *    cards: [
 *      {
 *        title: string,
 *        answer: boolean
 *      }
 *    ]
 *  }
 * ]
 */

const DECK_KEY = "mycard:deck";
const NOTIFICATION_KEY = "mycard:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data !== 'Y') {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let alertTime = new Date();
            alertTime.setDate(alertTime.getDate() + 1);
            alertTime.setHours(10);
            alertTime.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: alertTime,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, 'Y');
          }
        });
      }
    });
}

function createNotification() {
  return {
    title: "mycard",
    body: "🂡老铁你今天还没有完成过卡片测试哦!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function updateDeckStorage(decks: { title: string, cards: [] }) {
  return AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks));
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY).then(
    res => (res === null ? [] : JSON.parse(res))
  );
}

function addDeck(title: string) {
  getDecks().then(decks => {
    updateDeckStorage([
      ...decks,
      {
        title,
        cards: []
      }
    ]);
  });
}

function getDeck(id: string) {
  return getDecks().then(decks => decks[id]);
}

function deleteDeck(index: number) {
  return getDecks().then(decks => {
    decks.splice(index, 1);
    updateDeckStorage(decks);
  });
}

export function addCard(deckIndex: number, { title, answer }) {
  getDecks().then(decks => {
    decks[deckIndex].card.push({ title, answer });
    updateDeckStorage(decks);
  });
}

function deleteCard(index: string, deckIndex: string) {
  getDecks().then(decks => {
    decks[deckIndex].card.splice(index, 1);
    updateDeckStorage(decks);
  });
}

function clearCards(deckIndex: string) {
  getDecks().then(decks => {
    decks[deckIndex].card = [];
    updateDeckStorage(decks);
  });
}
