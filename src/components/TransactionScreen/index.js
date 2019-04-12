import React from "react";
import { StyleSheet, View, StatusBar, DatePickerAndroid } from "react-native";
import { Card, CardSection, Header, Input, Button } from "../common";

export default class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    let obj = new Date();
    this.state = {
      moneyInput: "",
      purpose: "",
      repeatTransaction: false,
      repeatTransactionText: "Non-repeat Transaction",
      note: "",
      date: {
        year: obj.getFullYear(),
        month: obj.getMonth(),
        day: obj.getDate()
      }
    };
    console.log(this.state.date);
    this.datePicker = this.datePicker.bind(this);
  }
  async datePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),
        mode: "spinner"
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ date: { year: year, month: month, day: day } });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }
  render() {
    const {
      moneyInput,
      purpose,
      repeatTransaction,
      repeatTransactionText,
      note
    } = this.state;
    let { day, month, year } = this.state.date;
    if (day < 10) day = "0" + day;
    month = month + 1;
    if (month < 10) month = "0" + month;
    const dateToText = day + "/" + month + "/" + year;
    return (
      <View>
        <StatusBar hidden />
        <Header headerText="Transaction" />
        <Card>
          <CardSection>
            <Input
              label="Amount"
              placeholder="Money"
              value={moneyInput}
              keyboardType={"numeric"}
              onChangeText={moneyInput => this.setState({ moneyInput })}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Purpose"
              placeholder="Purpose"
              value={purpose}
              onChangeText={purpose => this.setState({ purpose })}
            />
          </CardSection>
          <CardSection>
            <Button
              onPress={() => {
                this.setState({
                  repeatTransaction: !repeatTransaction
                });
                if (repeatTransactionText == "Non-repeat Transaction") {
                  this.setState({
                    repeatTransactionText: "Repeat Transaction"
                  });
                } else {
                  this.setState({
                    repeatTransactionText: "Non-repeat Transaction"
                  });
                }
              }}
            >
              {repeatTransactionText}
            </Button>
          </CardSection>
          <CardSection>
            <Input
              label="Note"
              placeholder="Note"
              value={note}
              onChangeText={note => this.setState({ note })}
            />
          </CardSection>
          <CardSection>
            <Button onPress={this.datePicker}>{dateToText}</Button>
          </CardSection>
        </Card>
        <Card style={styles.bottom_button}>
          <CardSection>
            <Button
              onPress={() => {
                console.log("Submitted");
              }}
            >
              Submit
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bottom_button: {
    alignSelf: "flex-end"
  }
});
