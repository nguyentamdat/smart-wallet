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
    this.refs.currentModal.open();
  };
  generateKey = numOfCharacters => {
    return require("random-string")({ length: numOfCharacters });
  };

  render() {
    return (
      <Modal
        ref={"currentModal"}
        style={{
          justifyContent: "center",
          borderRadius: Platform.OS === "ios" ? 30 : 20,
          shadowRadius: 10,
          width: screen.width - 100,
          height: 280
        }}
        position="center"
        backdrop={true}
        backdropPressToClose={false}
        onClosed={() => {
          //alert("Modal closed");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 0
          }}
        >
          Nhập tên bản ghi
        </Text>

        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 10,
            marginBottom: 10,
            borderBottomWidth: 1
          }}
          onChangeText={text => this.setState({ recordName: text })}
          placeholder=""
          value={this.state.recordName}
        />

        <Button
          style={{ fontSize: 18, color: "white" }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: "lightgreen"
          }}
          onPress={() => {
            if (
              this.state.recordName.length == 0 
            ) {
              alert("Bạn chưa nhập tên bản ghi\nKéo xuống để Cancel");
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
