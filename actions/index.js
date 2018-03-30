export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const TOUCH_DECK = "TOUCH_DECK";
export const ADD_CARD = "ADD_CARD";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function touchDeck(deck, index) {
  return {
    type: TOUCH_DECK,
    info: {
      deck,
      index
    }
  };
}

export function addCard(deck, deckIndex) {
  return {
    type: ADD_CARD,
    info: {
      deck,
      deckIndex
    }
  };
}
