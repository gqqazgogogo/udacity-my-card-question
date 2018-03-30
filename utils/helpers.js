// @flow
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
import { AsyncStorage } from "react-native";
const DECK_KEY = "mycard:deck";

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
