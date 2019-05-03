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
import { Button, ThemeProvider } from "react-native-elements";
import { createAppContainer, createStackNavigator } from "react-navigation";
import * as firebase from "firebase";
import "firebase/firestore";

const navigator = createStackNavigator(
  {
    Transaction: AddTransaction,
    Purpose: PurposeSelect
  },
  {
    initialRouteName: "Transaction",
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
    db.collection("purposes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      });
  }
  render() {
    return <AppContainer />;
  }
}
