import { RECEIVE_DECKS, ADD_DECK, TOUCH_DECK, ADD_CARD } from "../actions";
import { updateDeckStorage, getDecks } from "../utils/helpers";

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
        ...action.decks
      };
    case ADD_DECK:
      const addDeckDecks = [...state.decks, action.deck];
      updateDeckStorage(addDeckDecks).then(res => {
        console.log(res);
        // tag: #01 为什么这里AsyncStorage.set成功并且get验证有值，但我模拟器和真机中刷新或重启应用后就为空了？
        // 是因为current mode: development或者是expo而没发布么？
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
