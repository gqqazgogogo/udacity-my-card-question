import { RECEIVE_DECKS, ADD_DECK, TOUCH_DECK, ADD_CARD } from "../actions";
import { updateDeckStorage, getDecks } from "../utils/helpers";

const initState = {
  decks: [
    {
      title: 'tester',
      cards: [
        {
          title: 'card01',
          answer: true
        },
        {
          title: 'card02',
          answer: true
        }
      ]
    }
  ]
};

function entries(state = initState, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      const addDeckDecks = [...state.decks, action.deck];
      updateDeckStorage(addDeckDecks).then(res => {
        console.log(res);
        // tag: #01 为什么这里AsyncStorage.set成功并且get验证有值，但我刷新应用后就为空了？是因为current mode: development么？
        getDecks().then(res => console.log(res));
      });
      return {
        ...state,
        decks: addDeckDecks
      };
    case TOUCH_DECK:
      return {
        ...state,
        touchDeck: action.info
      };
    case ADD_CARD:
      const addCardDecks = state.decks.map((deck, index) => {
        if (index === action.info.deckIndex) {
          return action.info.deck;
        }
        return deck;
      })
      updateDeckStorage(addCardDecks).then(res => {
        console.log(res);
        // tag: #01 为什么这里AsyncStorage.set成功并且get验证有值，但我刷新应用后就为空了？是因为current mode: development么？
        getDecks().then(res => console.log(res));
      });
      return {
        ...state,
        decks: addCardDecks
      };
    default:
      return state;
  }
}

export default entries;
