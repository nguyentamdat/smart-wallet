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
export default class EditInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingCategory: "",
      editingAmount: "",
      editingDescription: "",
      item_id: "",
      isRevenue: null,
    };

  }
  
  showEditInfoModal = () => {    
    this.refs.myModal.open();
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
        backdrop={true}
        backdropPressToClose={false}
        onClosed={() => {
          //alert("Modal closed");
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 0,
            color: "#000"
          }}
        >
          Edit expenditure
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
          onChangeText={text => this.setState({ editingAmount: text })}
          keyboardType='numeric'
          placeholder="Enter amount"
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
          onChangeText={text => this.setState({ editingCategory: text })}
          placeholder="Enter purpose"
          onFocus = {() => this.props.navigation.navigate("PurposeSelect", {
            isSingleSelect: true,
            selectPurpose: async purpose => {
              this.setState({editingCategory: purpose.name});
              this.setState({isRevenue: purpose.isRevenue});
            }
          })}
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
          onChangeText={text => this.setState({ editingDescription: text })}
          placeholder="Enter description"
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
              alert("Please enter all above information!!!\nOr swipe down to dismiss");
              return;
            }

            if (this.state.editingAmount.length > 9) {
              alert("Please enter the amount less than one billion");
              return;
            }

            firebase.firestore().collection('SPRecordList')
            .doc(this.props.navigation.getParam('itemId', 'noId'))
            .collection('SPRecord').doc(this.state.item_id)
            .update({
                category: this.state.editingCategory,
                amount: this.state.editingAmount,
                description: this.state.editingDescription,
                isRevenue: this.state.isRevenue
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
