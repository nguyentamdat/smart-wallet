/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import AddTransaction from "./src/components/Transaction";
import PurposeSelect from "./src/components/Purpose";
import Main from "./src/components/Main";
import { Button, ThemeProvider } from "react-native-elements";
import { createAppContainer, createStackNavigator } from "react-navigation";
import * as firebase from "firebase";
import "firebase/firestore";
import MainView from "./src/components/SpendingPlan/MainView"
import RecordView from "./src/components/SpendingPlan/RecordView";

const navigator = createStackNavigator(
  {
    Transaction: AddTransaction,
    Purpose: PurposeSelect,
    Main: Main,
    SPMainScreen: MainView,
    SPRecordScreen: RecordView,
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {},
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(navigator);
export default class App extends Component {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyChLykabtAmjvgi1rnAqWB9l2kiRXKHwaU",
      authDomain: "srem-b062f.firebaseapp.com",
      projectId: "srem-b062f"
    };
    firebase.initializeApp(config);
  }
  componentDidMount() {
    var db = firebase.firestore();
  }
  render() {
    return <AppContainer />;
  }
}
