import React, { Component } from "react";
import { Text, View, FlatList, Alert, TextInput } from "react-native";
import { Button } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import firebase from "react-native-firebase";
import { createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';

export default class NotificationScreen extends Component {
render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text
            style={{
              fontSize: 30,
              padding: 10,
              borderBottomWidth: 3,
              borderLeftWidth: 5
            }}
          >
            Tạo kế hoạch chi tiêu
          </Text>
        </View>

      </View>
    );
    }
}