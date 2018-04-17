import { updateDeckStorage, getDecks } from "../utils/helpers";

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
  return dispatch => {
    getDecks().then(decks => {
      const newDecks = [...decks, deck];
      updateDeckStorage(newDecks).then(res => {
        dispatch({
          type: ADD_DECK,
          newDecks
        })
      });
    });
  }
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

export function addCard(addCardDeck, deckIndex) {
  return dispatch => {
    getDecks().then(decks => {
      const newDecks = decks.map((deck, index) => {
        if (index === deckIndex) {
          return addCardDeck;
        }
        return deck;
      })
      updateDeckStorage(newDecks).then(res => {
        dispatch({
          type: ADD_CARD,
          newDecks
        })
      });
    });
  }
}
