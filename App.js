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
  //Prepare for notification listener
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

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

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  async createNotificationListeners() {
    /**
     * Triggered when a particular notification has been received in foreground
     **/
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /**
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     **/
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /**
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     **/
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    /**
     * Triggered for data only payload in foreground
     **/
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  render() {
    return <AppContainer />;
  }
}
