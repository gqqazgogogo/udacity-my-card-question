// @flow
import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { primary } from "./utils/colors";
import { Constants } from "expo";
import { MainNavigator } from "./AppNavigations";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from 'redux-thunk';
import { setLocalNotification } from './utils/helpers';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={primary} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
