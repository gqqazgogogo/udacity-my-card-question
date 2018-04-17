import { RECEIVE_DECKS, ADD_DECK, TOUCH_DECK, ADD_CARD } from "../actions";


const initState = {
  // decks: [
  //   {
  //     title: '测试卡片集',
  //     cards: [
  //       {
  //         title: '卡片1,答案正确',
  //         answer: true
  //       },
  //       {
  //         title: '卡片2,答案错误',
  //         answer: false
  //       }
  //     ]
  //   }
  // ],
  decks: []
};

function entries(state = initState, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        decks: action.newDecks
      };
    case TOUCH_DECK:
      return {
        ...state,
        touchDeck: action.info
      };
    case ADD_CARD:
      return {
        ...state,
        decks: action.newDecks
      };
    default:
      return state;
  }
}

export default entries;
