import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from "react-native-firebase";
//*** Components Screens ***/
import Main from "./src/components/Main/Main";
import ListOfPurpose from "./src/components/PurposeSelectScreen/ListOfPurpose";
import AdvancedSearchScreen from "./src/components/AdvancedSearch/screens/AdvancedSearch";
import RecordView from "./src/components/SpendingPlan/RecordView";
import Notification from "./src/components/Notification"
const navigator = createStackNavigator(
  {
    Main: Main
  },
  {
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(navigator);

export default class App extends Component {
  async componentWillMount() {
    try {
      const initfire = firebase.app();
    } 
    catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    <Notification>
      {checkPermission()}
      {createNotificationListeners()}
    </Notification>
  }
  componentWillUnmount() {
    <Notification>
      {notificationListener()}
      {notificationOpenedListener()}
    </Notification>
  }
  render() {
    return <AppContainer />;
  }
}
