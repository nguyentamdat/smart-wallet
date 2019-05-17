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
import NotificationScreen from "./src/components/NotificationScreen";

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
