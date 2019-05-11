import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header, Button } from "react-native-elements";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { Input } from "../common";

class PurposeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPurposes: []
    };
    this.ref = firebase.firestore().collection("purposes");
    this.getDataFromCloud = this.getDataFromCloud.bind(this);
  }
  async getDataFromCloud() {
    try {
      this.ref.get({ source: "server" }).then(querySnapshot => {
        console.log(querySnapshot);
        querySnapshot.forEach(doc => {
          console.log(doc.id + " => ", doc.data());
        });
      });
    } catch (e) {
      console.log("Error: " + e);
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItem: "center" }}>
        <Header
          containerStyle={{ paddingTop: 0 }}
          leftComponent={{
            type: "material-community",
            icon: "menu",
            color: "#fff"
          }}
          centerComponent={{
            text: "Mục đích",
            style: { color: "#fff", fontSize: 30 }
          }}
          rightComponent={{
            type: "material-community",
            icon: "bell",
            color: "#fff",
            onPress: () => this.props.navigation.navigate("NotificationView")
          }}
        />
        <Button title="Get Data" onPress={this.getDataFromCloud} />
      </View>
    );
  }
}

export default PurposeSelect;
