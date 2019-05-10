import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import AddTransaction from "./src/components/Transaction";
import PurposeSelect from "./src/components/Purpose";
import Main from "./src/components/Main";
import { Button, ThemeProvider } from "react-native-elements";
import { createAppContainer, createStackNavigator } from "react-navigation";
import * as firebase from "firebase";
import "firebase/firestore";
import MainView from "./components/MainView";
import RecordView from "./components/RecordView";

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
  async componentWillMount() {
    try {
      var config = {
        apiKey: "AIzaSyChLykabtAmjvgi1rnAqWB9l2kiRXKHwaU",
        authDomain: "srem-b062f.firebaseapp.com",
        projectId: "srem-b062f"
      };
      await firebase.initializeApp(config);
      const db = await firebase.firestore();
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return <AppContainer />;
  }
}
