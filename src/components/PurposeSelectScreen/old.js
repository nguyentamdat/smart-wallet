import React, { Component } from "react";
import { View } from "react-native";
import { Header, Button, ListItem } from "react-native-elements";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "native-base";
import allPurpose from "../../variables/allPurpose";

class PurposeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPurposes: []
    };
  }
  async componentWillMount() {
    try {
      const savedList = await AsyncStorage.getItem("@listPurposes");
      console.log(JSON.parse(savedList));
      if (savedList) {
        this.setState({ listOfPurposes: JSON.parse(savedList) });
      } else {
        let list = allPurpose;
        AsyncStorage.setItem("@listPurposes", JSON.stringify(list));
        this.setState({ listOfPurposes: list });
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
                  this.props.navigation.state.params.selectPurpose(purpose);
                  console.log(purpose.name);
                  this.props.navigation.goBack();
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
