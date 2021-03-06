import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Alert,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import {
  Header,
  ButtonGroup,
  Button,
  colors,
  ThemeProvider
} from "react-native-elements";
//import {icon} from 'react-native-vector-icons'
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import { makeEmptyAggregatedTestResult } from "@jest/test-result";
import { Toast } from "native-base";
import AddInfoModal from "./AddInfoModal";
import EditInfoModal from "./EditInfoModal";
import CalendarModal from "./CalendarModal";

import firebase from "react-native-firebase";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Require cycle:"]);

class FirestoreItem extends Component {
  constructor(props) {
    super(props);
  }

  _onPressEditItemButton = () => {
    this.props.parentFlatList.refs.editInfoModal.setState({
      item_id: this.props.item.id
    });
    firebase
      .firestore()
      .collection("SPRecordList")
      .doc(
        this.props.parentFlatList.props.navigation.getParam("itemId", "noId")
      )
      .collection("SPRecord")
      .doc(this.props.item.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("document exist");
          console.log(doc.data().category);
          this.props.parentFlatList.refs.editInfoModal.setState({
            editingCategory: doc.data().category,
            editingAmount: doc.data().amount,
            editingDescription: doc.data().description,
            isRevenue: doc.data().isRevenue
          });
        } else {
          console.log("EditInfoModal.showEditInfoModal: no such document");
        }
      });

    this.props.parentFlatList.refs.editInfoModal.showEditInfoModal();
  };

  _onPressDeleteItemButton = () => {
    var SPRecordListDB = firebase.firestore().collection("SPRecordList");
    SPRecordListDB.doc(
      this.props.parentFlatList.props.navigation.getParam("itemId", "noId")
    )
      .collection("SPRecord")
      .doc(this.props.item.id)
      .delete();
  };

  render() {
    const swipeSettings_FI = {
      autoClose: true,
      //buttonWidth: 50,
      onClose: () => {},

      onOpen: () => {},
      right: [
        {
          backgroundColor: "#ffffe6",
          onPress: this._onPressDeleteItemButton,
          component: (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderRightWidth: 0
              }}
            >
              <Icon name="trash" size={30} color="#b32400" />
            </View>
          )
        }
      ],
      rowID: this.props.index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings_FI}>
        <TouchableOpacity
          onPress={this._onPressEditItemButton}
          activeOpacity={0.7}
        >
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              borderLeftColor: "darkgreen",
              borderLeftWidth: 0,
              padding: 3,
              marginLeft: 1,
              marginTop: 2,
              backgroundColor: "#ffffe6"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                {/* <Text style={{ fontSize: 21, color: "#00b300" }}>
                {this.props.item.amount}
              </Text> */}
                <Text style={{ fontSize: 20, color: "#e65c00" }}>
                  {this.props.item.category}
                </Text>
                <Text style={{ fontSize: 17 }}>
                  {this.props.item.description}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 21,
                  color: this.props.item.isRevenue === true ? "#00b300" : "red",
                  marginRight: 30,
                  marginLeft: 20
                }}
              >
                {this.props.item.amount}
              </Text>              
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

export default class SPRecordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // for firestore
      loading: true,
      SPInfoList: [],

      // for Button
      start_day_text: "Start day",
      end_day_text: "End day",
      start_day_state: null,
      end_day_state: null,

      record_name: "",
      total: 0
    };

    this._onPressAdd = this._onPressAdd.bind(this);
    this._onPressBackIcon = this._onPressBackIcon.bind(this);
    this._onPressCalendarStartDay = this._onPressCalendarStartDay.bind(this);
    this._onPressCalendarEndDay = this._onPressCalendarEndDay.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    // firestore
    const infos = [];
    var newTotal = 0;
    querySnapshot.forEach(doc => {
      infos.push({
        id: doc.id,
        category: doc.data().category,
        amount: doc.data().amount,
        description: doc.data().description,
        isRevenue: doc.data().isRevenue
      });
      if (doc.data().isRevenue) {
        newTotal = newTotal + Number(doc.data().amount);
      } else {
        newTotal = newTotal - Number(doc.data().amount);
      }
    });

    this.setState({
      SPInfoList: infos.sort((a, b) => {
        return Number(a.amount) > Number(b.amount);
      }),
      loading: false,
      total: newTotal
    });
    console.log(this.state.SPInfoList);
  };

  componentDidMount() {
    var db_ref_record = firebase
      .firestore()
      .collection("SPRecordList")
      .doc(this.props.navigation.getParam("itemId", "noId"))
      .collection("SPRecord");

    this.unsubscribe = db_ref_record.onSnapshot(this.onCollectionUpdate);

    this.setState({
      record_name: this.props.navigation.getParam("item", "").name
    });
    var db_ref_list = firebase
      .firestore()
      .collection("SPRecordList")
      .doc(this.props.navigation.getParam("itemId", "noId"));
    console.log('Line 310: ' + this.props.navigation.getParam("itemId", "noId"));

    db_ref_list.get().then(doc => {
      if (doc.exists) {
        if (doc.data().start_day.dateString != null) {
          var start_day_str_db =
            doc.data().start_day.day +
            "-" +
            doc.data().start_day.month +
            "-" +
            doc.data().start_day.year;
          this.setState({
            start_day_text: start_day_str_db,
            start_day_state: doc.data().start_day
          });

          // display total
          var newTotal = 0;
          var db_ref_record = firebase
            .firestore()
            .collection("SPRecordList")
            .doc(this.props.navigation.getParam("itemId", "noId"))
            .collection("SPRecord");
          db_ref_record
            .get()
            .then(snapShot => {
              if (snapShot.empty) {
                console.log("No matching documents");
                return;
              }
              snapShot.forEach(doc => {
                if (doc.data().isRevenue)
                newTotal = newTotal + Number(doc.data().amount);
                else {
                  newTotal = newTotal - Number(doc.data().amount);
                }
              });
              this.setState({ total: newTotal });
            })
            .catch(err => {
              console.log("Error getting documents", err);
            });
        }
        if (doc.data().end_day.dateString != null) {
          var end_day_str_db =
            doc.data().end_day.day +
            "-" +
            doc.data().end_day.month +
            "-" +
            doc.data().end_day.year;
          this.setState({
            end_day_text: end_day_str_db,
            end_day_state: doc.data().end_day
          });
        }
      } else {
        console.log("No such document");
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onPressAdd() {
    this.refs.addInfoModal.showAddInfoModal();
  }
  _onPressCalendarStartDay() {
    this.refs.calendarModal_startDay.showCalendarModal(this, "start");
  }
  _onPressCalendarEndDay() {
    if (this.state.start_day_text == "Start day") {
      return alert("Please enter start day first");
    } else {
      this.refs.calendarModal_endDay.showCalendarModal(this, "end");
    }
  }

  _onPressBackIcon() {
    // TODO_: condition for start_day < end_day

    if (
      this.state.start_day_state == null ||
      this.state.end_day_state == null
    ) {
      alert(
        "Please enter start day and end day\nOr use Android navigator to go back"
      );
      // check firestore
      return;
    } else {
      if (
        this.state.start_day_state.timestamp >
        this.state.end_day_state.timestamp
      ) {
        console.log(this.state.start_day_state);
        console.log(this.state.end_day_state);
        alert("Start day must before end day");
        return;
      }
    }

    firebase
      .firestore()
      .collection("SPRecordList")
      .doc(this.props.navigation.getParam("itemId", "noId"))
      .update({
        total: this.state.total
      });

    this.props.navigation.navigate("SPMainScreen");
  }

  render() {
    

    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="#fff"
          containerStyle={{
            flex: 1,
            paddingTop: 0,
            paddingLeft: 5,
            paddingRight: 5
          }}
          leftContainerStyle={{ flex: 1 }}
          rightContainerStyle={{ flex: 1 }}
          centerContainerStyle={{ flex: 2 }}
          leftComponent={{
            type: "material-community",
            icon: "chevron-left",
            color: "#0085ff",
            size: 33,
            onPress: this._onPressBackIcon
          }}
          rightComponent={{}}
          centerComponent={{
            style: { fontSize: 24, fontWeight: "bold", color: "#0085ff" },
            text: this.state.record_name
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingTop: 4,
            borderTopWidth: 4,
            borderTopColor: "#0085ff"
          }}
        >
          <Button
            buttonStyle={{ width: 200, backgroundColor: "#0085ff" }}
            icon={{ name: "date-range", color: "#ffa500" }}
            title={this.state.start_day_text}
            onPress={this._onPressCalendarStartDay}
          />

          <Button
            large
            buttonStyle={{ width: 200, backgroundColor: "#0085ff" }}
            icon={{ name: "date-range", color: "#ffa500" }}
            title={this.state.end_day_text}
            onPress={this._onPressCalendarEndDay}
          />
        </View>

        <View
          style={{
            flex: 6,
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: "#0085ff",
            margin: 2
          }}
        >
          <FlatList
            ref={"flatList"}
            data={this.state.SPInfoList}
            renderItem={({ item, index }) => {
              return (
                <FirestoreItem
                  item={item}
                  parentFlatList={this}
                  index={index}
                />
              );
            }}
            keyExtractor={(item, index) => item.id}
          />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#0085ff",
            borderWidth: 2,
            margin: 2
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#000"
            }}
          >
            Total: {this.state.total} VND
          </Text>
        </View>

        <View
          style={{
            flex: 1,

            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 4,
            borderTopColor: "#0085ff"
          }}
        >
          <Button
            buttonStyle={{ width: 120, height: 40, backgroundColor: "#ffa500" }}
            title="Add section"
            titleProps={{ fontSize: 20 }}
            //containerStyle={{ height: 65}}
            type="solid"
            //raised
            onPress={this._onPressAdd}
          />
        </View>

        <AddInfoModal
          navigation={this.props.navigation}
          ref={"addInfoModal"}
          parentFlatList={this}
          SPRecord_id={this.props.navigation.getParam("itemId", "noId")}
        />

        <EditInfoModal
          navigation={this.props.navigation}
          ref={"editInfoModal"}
          parentFlatList={this}
        />

        <CalendarModal
          ref={"calendarModal_startDay"}
          parentFlatList={this}
          SPRecord_id={this.props.navigation.getParam("itemId", "noId")}
        />
        <CalendarModal
          ref={"calendarModal_endDay"}
          parentFlatList={this}
          SPRecord_id={this.props.navigation.getParam("itemId", "noId")}
        />
      </View>
    );
  }
}
