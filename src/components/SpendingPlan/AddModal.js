import React, { Component } from "react";
import {
  AppResistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  Dimensions,
  TextInput
} from "react-native";
import Button from "react-native-button";
import Modal from "react-native-modalbox";
import firebase from "react-native-firebase";

var screen = Dimensions.get("window");
export default class AddModal extends Component {
  constructor(props) {
    super(props);
    // Add firestore
    this.ref = firebase.firestore().collection("SPRecordList")
                .doc(this.props.SPRecord_id).collection("SPRecord"); //
    this.unsubcribe = null;

    this.state = {
      newCategory: "",
      newAmount: "",
      newDescription: "",
    };
  }
  showAddModal = () => {
    this.refs.myModal.open();
  };
  generateKey = numOfCharacters => {
    return require("random-string")({ length: numOfCharacters });
  };

  render() {
    return (
      <Modal
        ref={"myModal"}
        style = {{ height: 300, width: screen.width - 100, alignItems: "center", justifyContent: "center", borderRadius: Platform.OS === "ios" ? 30 : 20, shadowRadius: 10 }}
        position = "center"
        backdrop = {true}
        backdropPressToClose = {false}
      >
        <Text
          style = {{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 0, color: "#000" }}>
          New expenditure
        </Text>

        <TextInput
          style = {{ height: 40, width: 240, marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#000" }}
          onChangeText = {text => this.setState({ newAmount: text })}
          keyboardType='numeric'
          placeholder="Enter amount"
          value={this.state.newAmount}
        />

        <TextInput
          style = {{ height: 40, width: 240, marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#000" }}
          onChangeText = {text => this.setState({ newCategory: text })}
          placeholder="Enter purpose"
          value={this.state.newCategory}
        />

        <TextInput
          style = {{ height: 40, width: 240, marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#000" }}
          onChangeText = {text => this.setState({ newAmount: text })}
          onChangeText={text => this.setState({ newDescription: text })}
          placeholder="Enter description"
          value={this.state.newDescription}
        />
      
        <Button
          style = {{ fontSize: 16, color: "white" }}
          containerStyle = {{ padding: 8, height: 40, width: 120, borderRadius: 6, backgroundColor: "#ffa500" }}
          onPress={() => {
            if (
              this.state.newCategory.length == 0 ||
              this.state.newAmount.length == 0 ||
              this.state.newDescription.length == 0
            ) {
              alert("Please enter all above information!!!");
              return;
            }
            
            // firestore
            this.ref.add({
              category: this.state.newCategory,
              amount: this.state.newAmount,
              description: this.state.newDescription,
              
            });

            this.refs.myModal.close();
          }}
        >
          Save
        </Button>
        
      </Modal>
    );
  }
}
