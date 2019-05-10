import React, { Component } from "react";
import {
  View,
  DatePickerAndroid,
  TimePickerAndroid,
  Picker
} from "react-native";
import {
  Header,
  Card,
  Input,
  CheckBox,
  Button,
  Image
} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { moveToBottom } from "../common";

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    const obj = new Date();
    this.state = {
      repeated: false,
      amount: null,
      purpose: "",
      note: "",
      date: {
        year: obj.getFullYear(),
        month: obj.getMonth(),
        day: obj.getDate(),
        hour: obj.getHours(),
        minute: obj.getMinutes()
      }
    };
    this.timePicker = this.timePicker.bind(this);
    this.datePicker = this.datePicker.bind(this);
  }
  async datePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: "spinner"
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ date: { ...this.state.date, year, month, day } });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }
  async timePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.date.hour,
        minute: this.state.date.minute,
        mode: "spinner"
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({ date: { ...this.state.date, hour, minute } });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  }
  render() {
    let { day, month, year, hour, minute } = this.state.date;
    if (day < 10) day = "0" + day;
    month = month + 1;
    if (month < 10) month = "0" + month;
    const dateToText = day + "/" + month + "/" + year;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    const timeToText = hour + ":" + minute;
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={{ paddingTop: 0 }}
          leftComponent={{
            type: "material-community",
            icon: "menu",
            color: "#fff"
          }}
          centerComponent={{
            text: "Chi tiêu",
            style: { color: "#fff", fontSize: 30 }
          }}
          rightComponent={{
            type: "material-community",
            icon: "bell",
            color: "#fff"
          }}
        />
        <Card>
          <Input
            placeholder="Số tiền"
            value={this.state.amount}
            name="amount"
            onChangeText={amount => this.setState({ amount })}
            keyboardType="numeric"
            rightIcon={<Image source={{ uri: "../../public/dong.png" }} />}
          />
          <Picker
            selectedValue={this.state.purpose}
            onValueChange={(ItemValue, ItemIndex) =>
              this.setState({ purpose: ItemValue })
            }
          >
            <Picker.Item label="An uong" value="anuong" />
            <Picker.Item label="Di lai" value="dilai" />
          </Picker>
          <CheckBox
            title="Lặp lại"
            name="repeated"
            checked={this.state.repeated}
            onPress={() => this.setState({ repeated: !this.state.repeated })}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            iconRight
            containerStyle={{
              backgroundColor: "#FFF",
              borderWidth: 0,
              borderBottomWidth: 1,
              borderColor: "grey"
            }}
          />
          <Input
            placeholder="Ghi chú"
            name="note"
            value={this.state.note}
            onChangeText={note => this.setState({ note })}
          />
          <View>
            <Button title={dateToText} onPress={this.datePicker} type="clear" />
            <Button title={timeToText} onPress={this.timePicker} type="clear" />
          </View>
        </Card>
        {moveToBottom(
          <Button
            title="Lưu"
            buttonStyle={{ alignSelf: "center", width: 100 }}
            onPress={() => {
              console.log(this.state);
            }}
          />
        )}
      </View>
    );
  }
}

export default AddTransaction;
