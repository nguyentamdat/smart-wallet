import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import AddTransaction from "./src/components/Transaction";
import PurposeSelect from "./src/components/Purpose";
import Main from "./src/components/Main";
import { Button, ThemeProvider } from "react-native-elements";
import { createAppContainer, createStackNavigator } from "react-navigation";
import firebase from "react-native-firebase";
import MainView from "./src/components/SpendingPlan/MainView";
import RecordView from "./src/components/SpendingPlan/RecordView";
import NotificationScreen from "./src/components/NotificationScreen";

const navigator = createStackNavigator(
  {
    Transaction: AddTransaction,
    Purpose: PurposeSelect,
    Main: Main,
    SPMainScreen: MainView,
    SPRecordScreen: RecordView,
    NotificationView: NotificationScreen
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
      // var config = {
      //   apiKey: "AIzaSyChLykabtAmjvgi1rnAqWB9l2kiRXKHwaU",
      //   authDomain: "srem-b062f.firebaseapp.com",
      //   projectId: "srem-b062f"
      // };
      // await firebase.initializeApp(config);
      // const db = await firebase.firestore();
      const initfire = firebase.app();
      // console.log(initfire);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return <AppContainer />;
  }
}
