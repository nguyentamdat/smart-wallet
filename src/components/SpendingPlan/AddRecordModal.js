import React, { Component } from "react";
import {
  Text,
  Platform,
  Dimensions,
  TextInput
} from "react-native";
import Button from "react-native-button";
import Modal from "react-native-modalbox";
import firebase from "react-native-firebase";

var screen = Dimensions.get("window");
export default class AddRecordModal extends Component {
  constructor(props) {
    super(props);
    // Add firestore
    this.ref = firebase.firestore().collection("SPRecordList");
    this.unsubcribe = null;

    this.state = {
      recordName: "",
    };
  }
  showAddRecordModal = () => {
    this.setState({recordName: ""});
    this.refs.currentModal.open();
  };
  generateKey = numOfCharacters => {
    return require("random-string")({ length: numOfCharacters });
  };

  render() {
    return (
      <Modal
        ref = {"currentModal"}
        style = {{ height: 200, width: screen.width - 100, alignItems: "center", justifyContent: "center", borderRadius: Platform.OS === "ios" ? 30 : 20, shadowRadius: 10 }}
        position = "center"
        backdrop = {true}
        backdropPressToClose = {false}
      >
        <Text
          style = {{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 0, color: "#000" }}>
          Plan name
        </Text>

        <TextInput
          style = {{ height: 40, width: 240, marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#000" }}
          onChangeText = {text => this.setState({ recordName: text })}
        />

        <Button
          style = {{ fontSize: 16, color: "white" }}
          containerStyle = {{ padding: 8, height: 40, width: 120, borderRadius: 6, backgroundColor: "#ffa500" }}
          onPress={() => {
            if (
              this.state.recordName.length == 0 
            ) {
              alert("Please enter the plan name\nOr swipe down to dismiss");
              return;
            }
            
            // firestore
            this.ref.add({
              name: this.state.recordName
            });
            this.refs.currentModal.close();
          }}
        >
          Save
        </Button>
      </Modal>
    );
  }
}
