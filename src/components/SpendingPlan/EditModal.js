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
export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingCategory: "",
      editingAmount: "",
      editingDescription: "",
      item_id: "",
    };

  }
  
  showEditModal = () => {
    //this.props.parentFlatList.refs.editModal.setState({item_id: itemId});
    this.refs.myModal.open();
    //alert('Hello '+this.state.item_id);
  };
  generateKey = numOfCharacters => {
    return require("random-string")({ length: numOfCharacters });
  };
  render() {
    return (
      <Modal
        ref={"myModal"}
        style={{
          justifyContent: "center",
          borderRadius: Platform.OS === "ios" ? 30 : 20,
          shadowRadius: 10,
          width: screen.width - 100,
          height: 280
        }}
        position="center"
        backdrop={false}
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
          Chỉnh sửa chi tiêu
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
          onChangeText={text => this.setState({ editingCategory: text })}
          placeholder="Nhập hạng mục"
          value={this.state.editingCategory}
        />

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
          onChangeText={text => this.setState({ editingAmount: text })}
          keyboardType='numeric'
          placeholder="Nhập số tiền"
          value={this.state.editingAmount}
        />

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
          onChangeText={text => this.setState({ editingDescription: text })}
          placeholder="Nhập mô tả"
          value={this.state.editingDescription}
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
              this.state.editingCategory.length == 0 ||
              this.state.editingAmount.length == 0 ||
              this.state.editingDescription.length == 0
            ) {
              alert("Bạn chưa nhập đủ thông tin!!");
              return;
            }

            firebase.firestore().collection('SPRecordList')
            .doc(this.props.parentFlatList.props.navigation.getParam('itemId', 'noId'))
            .collection('SPRecord').doc(this.state.item_id)
            .update({
                category: this.state.editingCategory,
                amount: this.state.editingAmount,
                description: this.state.editingDescription
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
