import React, { Component } from "react";
import { View } from "react-native";
import { Header, Button, ListItem } from "react-native-elements";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "native-base";

class PurposeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPurposes: []
    };
    this.ref = firebase.firestore().collection("purposes");
  }
  async componentWillMount() {
    try {
      const savedList = await AsyncStorage.getItem("@listPurposes");
      console.log(JSON.parse(savedList));
      if (savedList) {
        this.setState({ listOfPurposes: JSON.parse(savedList) });
      } else {
        this.ref
          .get({ source: "server" })
          .then(querySnapshot => {
            let list = [];
            querySnapshot.forEach(doc => {
              list.push(doc.data());
            });
            return list;
          })
          .then(list => {
            console.log(list);
            AsyncStorage.setItem("@listPurposes", JSON.stringify(list));
            this.setState({ listOfPurposes: list });
          });
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  }
  render() {
    console.log(this.state.listOfPurposes);
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
        <View style={{ flex: 1 }}>
          {this.state.listOfPurposes.map(purpose => {
            console.log(purpose);
            return (
              <ListItem
                key={purpose.id}
                title={purpose.name}
                leftIcon={
                  <Icon
                    type={purpose.iconType}
                    name={purpose.iconName}
                    active
                  />
                }
                onPress={() => {
                  console.log(purpose.name);
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default PurposeSelect;
