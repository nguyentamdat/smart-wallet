/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import Transaction from "./src/components/Transaction";
import { Button, ThemeProvider } from "react-native-elements";

export default class App extends Component {
  render() {
    return (
      <View>
        <StatusBar hidden />
        <Transaction />
      </View>
    );
  }
}
