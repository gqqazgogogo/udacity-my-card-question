import React from "react";
import { StackNavigator } from "react-navigation";
import DeckList from "./pages/DeckList";
import DeckDetail from "./pages/DeckDetail";
import TestDetail from "./pages/TestDetail";

export const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList
  },
  Detail: {
    screen: DeckDetail
  },
  Test: {
    screen: TestDetail
  }
});
