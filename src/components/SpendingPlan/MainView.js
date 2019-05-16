import React, { Component } from "react";
import { Text, View, FlatList, Alert, TextInput } from "react-native";
import { Button, Header, Icon } from "react-native-elements";
import Swipeout from "react-native-swipeout";

import firebase from "react-native-firebase";

import AddRecordModal from "./AddRecordModal";

class NameItem extends Component {
  render() {
    const swipeSettings = {
      autoClose: true,

      onOpen: () => {},
      onClose: () => {},

      sectionId: 1,
      rowID: this.props.index,

      right: [
        {
          type: "primary",
          text: "Manage",
          backgroundColor: "#0085ff",
          onPress: () => {
            this.props.refMainView.props.navigation.navigate('SPRecordScreen', {
              item: this.props.item,
              itemId: this.props.item.id
            })
          }
        },
        {
          type: "delete",
          text: "Delete",
          backgroundColor: "#ff0000",
          onPress: () => {
            firebase.firestore().collection('SPRecordList')
            .doc(this.props.item.id).delete();
          }
        }
      ],
      
    };
    return (
      <Swipeout {...swipeSettings}>
        <View style = {{ flex: 1, justifyContent: "space-around", paddingLeft: 10, paddingVertical: 5,
          borderTopWidth:    8, borderTopColor:    "#fff",
          borderBottomWidth: 4, borderBottomColor: "#ffa500",
          borderLeftWidth:   8, borderLeftColor:   "#ffa500", 
          borderRightWidth:  8, borderRightColor:  "#fff",
          backgroundColor:                         "#fff"
        }}>

          <Text style = {{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
            {this.props.item.name}
          </Text>

          <Text style = {{ fontSize: 15, color: "#000" }}>
            From: 
            {this.props.item.startDay.day != null ? " " + this.props.item.startDay.day + '/' + this.props.item.startDay.month + '/' + this.props.item.startDay.year : " Not updated"}
          </Text>
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
    this._onPressBack = this._onPressBack.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    // firestore
    const names = [];
    querySnapshot.forEach(doc => {
      names.push({
        id: doc.id,
        name: doc.data().name,
        startDay: doc.data().start_day!=null?doc.data().start_day:{timestamp:1589536673000}
      });
    });
    this.setState({
      record: names.sort((a,b) => 
              {return a.startDay.timestamp > b.startDay.timestamp}),
      loading: false
    });
    console.log('Line 96');
    console.log(this.state.record);
  };

  componentDidMount() {
    // firestore
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onPressAdd() {
    this.refs.addRecordModal.showAddRecordModal();
  }

  _onPressBack() {
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <View style = {{ flex: 1, alignContent: "center", justifyContent: "center" }}>
        <Header
          backgroundColor = "#fff"

          containerStyle = {{ flex: 1, paddingTop: 0, paddingLeft: 5, paddingRight: 5, borderBottomWidth: 4,borderBottomColor: "#ffa500" }}

          leftContainerStyle = {{ flex: 1 }}
          rightContainerStyle = {{ flex: 1 }}
          centerContainerStyle = {{ flex: 2 }}

          leftComponent = {{ 
            type: "material-community",
            icon: "chevron-left", 
            color: "#0085ff",
            size: 33,
            onPress: this._onPressBack
          }}

          rightComponent = {{

          }}

          centerComponent = {{
            style: { fontSize: 24, fontWeight: "bold", color: "#0085ff" },
            text: "Spending Plan",
          }}
        />

        <View style = {{ flex: 8, backgroundColor: "#fff" }}>
          <FlatList
            data = { this.state.record }

            renderItem = {({ item, index }) => {
              return (<NameItem 
              item = { item } 
              index = { index } 

              refMainView = { this }
              />);
            }}

            keyExtractor = {(item, index) => item.id}
          />
        </View>

        <AddRecordModal ref = {"addRecordModal"}/>

        <View style = {{ flex: 1, alignItems: "center" , alignContent: "center",  justifyContent: "space-around", borderTopWidth: 4, borderTopColor: "#ffa500" }}>
          <Button
            buttonStyle = {{ height: 40, width: 120, alignSelf: "center", backgroundColor: "#ffa500" }}
            title = "Add"
            titleProps = {{ fontSize: 16, color: "#fff" }}
            onPress = { this._onPressAdd }
          />
        </View>
      </View>
    );
  }
}
