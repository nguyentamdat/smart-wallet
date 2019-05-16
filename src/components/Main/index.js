import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { moveToBottom } from "../common";
import AsyncStorage from "@react-native-community/async-storage";
import { YellowBox } from "react-native";
import firebase from "react-native-firebase";
import { List, Footer, FooterTab } from "native-base";
import TransactionScreen from "../TransactionScreen";
YellowBox.ignoreWarnings(["WebView"]);

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TransactionScreen />
      // <View style={{ flex: 1, justifyContent: "center" }}>
      //   <Header
      //     containerStyle={{ paddingTop: 0 }}
      //     leftComponent={{
      //       type: "material-community",
      //       icon: "menu",
      //       color: "#fff"
      //     }}
      //     centerComponent={{
      //       text: "Màn hình chính",
      //       style: { color: "#fff", fontSize: 30 }
      //     }}
      //     rightComponent={{
      //       type: "material-community",
      //       icon: "bell",
      //       color: "#fff",
      //       onPress: () => this.props.navigation.navigate("NotificationView")
      //     }}
      //   />
      //   <Button
      //     title="Thêm Kế Hoạch"
      //     onPress={() => {
      //       this.props.navigation.navigate("SPMainScreen");
      //     }}
      //   />
      //   <List />
      //   {moveToBottom(
      //     <Button
      //       icon={
      //         <Icon
      //           name="plus-circle"
      //           size={40}
      //           color="#fff"
      //           onPress={() => {
      //             console.log("Pressed Button");
      //             this.props.navigation.navigate("Transaction");
      //           }}
      //         />
      //       }
      //       buttonStyle={{
      //         width: 60,
      //         height: 60,
      //         alignSelf: "center",
      //         margin: 0
      //       }}
      //     />
      //   )}
      // </View>
    );
  }
}

export default Main;
