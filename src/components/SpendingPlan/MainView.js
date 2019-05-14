import React, { Component } from "react";
import { Text, View, FlatList, Alert, TextInput } from "react-native";
import { Button } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import AddRecordModal from "./AddRecordModal";
import firebase from "react-native-firebase";
//import console = require("console");

class NameItem extends Component {
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: () => {},
      onOpen: () => {},
      right: [
        {
          onPress: () => {
            this.props.refMainView.props.navigation.navigate('SPRecordScreen', {
              itemId: this.props.item.id,
              item: this.props.item,
            });
          },
          text: "Xem",
          type: "primary"
        },
        {
          onPress: () => {
            firebase.firestore().collection('SPRecordList')
            .doc(this.props.item.id).delete();
          },
          text: "Xóa",
          type: "delete"
        }
      ],
      rowID: this.props.index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings}>
        <View
          style={{
            flex: 1,
            backgroundColor:
              this.props.index % 2 === 0 ? "gainsboro" : "lightgreen",
            borderBottomColor: "green",
            borderBottomWidth: 3,
            borderLeftColor: "green",
            borderLeftWidth: 3,
            padding: 5,
            marginTop: 2
          }}
        >
          <Text
            style={{
              fontSize: 23
            }}
          >
            {this.props.item.name}
          </Text>
          <Text style={{ fontSize: 18 }}>Id: {this.props.item.id}</Text>
        </View>
      </Swipeout>
    );
  }
}
export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("SPRecordList");

    this.state = {
      // for firestore
      loading: true,
      record: []
    };

    this._onPressAdd = this._onPressAdd.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    // firestore
    const names = [];
    querySnapshot.forEach(doc => {
      names.push({
        id: doc.id,
        name: doc.data().name
      });
    });
    this.setState({
      record: names,
      loading: false
    });
  };

  componentDidMount() {
    // firestore
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  _onPressAdd() {
    this.refs.addRecordModal.showAddRecordModal();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text
            style={{
              backgroundColor: "yellow",
              fontSize: 30,
              padding: 10,
              borderBottomColor: "gold",
              borderBottomWidth: 3,
              borderLeftColor: "gold",
              borderLeftWidth: 5
            }}
          >
            Tạo kế hoạch chi tiêu
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 10,
            backgroundColor: "clightcyan",
            borderColor: "black",
            borderWidth: 2,
            margin: 3
          }}
        >
          <FlatList
            data={this.state.record}
            renderItem={({ item, index }) => {
              return (<NameItem 
              item={item} 
              index={index} 
              refMainView={this}
              />);
            }}
            keyExtractor={(item, index) => item.id}
          />
        </View>

        <AddRecordModal ref={"addRecordModal"} />

        <View style={{ marginTop: 3 }}>
          <Button
            title="Tạo bản ghi mới"
            containerStyle={{ borderWidth: 1 }}
            type="outline"
            //raised
            onPress={this._onPressAdd}
          />
        </View>

        <View
          style={{
            height: 60,
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 10
          }}
        >
          <Button 
          type="outline" 
          title="Thoát" 
          containerStyle={{ width: 85 }} 
          onPress={ () => {
            this.props.navigation.navigate('Main');
          }}

          />
        </View>
      </View>
    );
  }
}
