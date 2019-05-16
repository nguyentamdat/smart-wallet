import React, { Component } from "react";
import { Text, View, FlatList, Alert, TextInput } from "react-native";
import { Button, Header, Icon } from "react-native-elements";
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
        <Text style={{ fontSize: 15 }}>
        Ngày bắt đầu: {this.props.item.startDay.day!=null
        ?this.props.item.startDay.day+'-'+this.props.item.startDay.month
        +'-'+this.props.item.startDay.year:'chưa cập nhập'}
        </Text>
          <Text
            style={{
              fontSize: 23
            }}
          >
            {this.props.item.name}
          </Text>
          {/* <Text style={{ fontSize: 18 }}>Id: {this.props.item.id}</Text> */}
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
      <View style={{ flex: 1 }}>
        {/* <View>
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
            Kế hoạch chi tiêu
          </Text>
        </View> */}

        <Header
          leftComponent={{ 
            icon: "chevron-left", 
            color: "#fff",
            size: 30,
            onPress: this._onPressBack
             }}
          centerComponent={{
            text: 'Kế hoạch chi tiêu',
            style: { color: "#fff", fontSize: 27 }
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />

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
            //containerStyle={{ borderWidth: 1 }}
            containerStyle={{ margin: 5, borderWidth: 2, borderColor: "blue" }}
            type="outline"
            //raised
            onPress={this._onPressAdd}
          />
        </View>

        <View
          style={{
            //height: 60,
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 10
          }}
        >
          {/* <Button 
          type="outline" 
          title="Thoát" 
          containerStyle={{ width: 85 }} 
          onPress={ () => {
            this.props.navigation.navigate('Main');
          }}
          /> */}
        </View>
      </View>
    );
  }
}
