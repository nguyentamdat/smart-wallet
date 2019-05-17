import React, { Component } from "react";
import {
  View,
  DatePickerAndroid,
  TimePickerAndroid,
  Picker,
  Text
} from "react-native";
import { Card, Input, CheckBox, Image } from "react-native-elements";
import {
  Container,
  Content,
  ListItem,
  Body,
  Left,
  Right,
  Header,
  Title,
  Footer,
  Button
} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { moveToBottom } from "../common";
import firebase from "react-native-firebase";
import styles from "../AdvancedSearch/styles";

const initState = {
  repeated: false,
  amount: null,
  purpose: null,
  note: "",
  date: new Date(),
  noti: true
};

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    const obj = new Date();
    this.state = initState;
    this.ref = firebase.firestore().collection("transactions");
    this.unsub = null;
    this.timePicker = this.timePicker.bind(this);
    this.datePicker = this.datePicker.bind(this);
    this.submitTransaction = this.submitTransaction.bind(this);
  }
  async datePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.date,
        mode: "spinner"
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = this.state.date;
        date.setFullYear(year, month, day);
        this.setState({ date: date });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }
  async timePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.date.getHours(),
        minute: this.state.date.getMinutes(),
        mode: "spinner"
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const date = this.state.date;
        date.setHours(hour, minute);
        this.setState({ date: date });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  }
  submitTransaction() {
    let trans = ({ amount, purpose, date, repeated, note } = this.state);
    trans.amount = parseInt(trans.amount);
    const res = this.ref.add(trans);
    console.log(res);
    this.setState({ ...initState });
    this.props.navigation.goBack();
  }
  render() {
    const dateToText = this.state.date.toLocaleDateString();
    const timeToText = this.state.date.toLocaleTimeString();
    let purpose;
    if (this.state.purpose) purpose = this.state.purpose.name;
    return (
      <Container>
        {/* <Header
                    containerStyle={{ paddingTop: 0 }}
                    // leftComponent={{
                    //     type: "ionicon",
                    //     icon: "ios-arrow-back",
                    //     color: "#fff"
                    // }}
                    centerComponent={{
                        text: "Ghi khoản",
                        style: {
                            color: "#fff",
                            fontSize: 25,
                            textTransform: "uppercase"
                        }
                    }}
                    // rightComponent={{
                    //     type: "material-community",
                    //     icon: "bell",
                    //     color: "#fff"
                    // }}
                /> */}
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("AdvancedSearch")}
            >
              <Icon name="crop-free" size={25} style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ textTransform: "uppercase" }}>
              Ghi khoản thu/chi
            </Title>
          </Body>
        </Header>

        <Content>
          <Card>
            <Input
              containerStyle={{ borderWidth: 0 }}
              placeholder="Số tiền"
              value={this.state.amount}
              name="amount"
              onChangeText={amount => {
                if (!isNaN(amount)) {
                  this.setState({ amount });
                }
              }}
              keyboardType="numeric"
              rightIcon={<Image source={{ uri: "../../public/dong.png" }} />}
            />
            <ListItem
              noIndent
              onPress={() => {
                this.props.navigation.navigate("PurposeSelect", {
                  isSingleSelect: true,
                  selectPurpose: async purpose => {
                    this.setState({ purpose: purpose });
                  }
                });
              }}
            >
              <Input editable={false} placeholder="Mục đích" value={purpose} />
            </ListItem>
            {/* <Input
                        editable={false}
                        placeholder="Mục đích"
                        value={purpose}
                        onPress={() => {
                            this.props.navigation.navigate("PurposeSelect", {
                                isSingleSelect: true,
                                selectPurpose: async purpose => {
                                    this.setState({ purpose: purpose });
                                }
                            });
                        }}
                    /> */}
            <CheckBox
              title="Lặp lại"
              name="repeated"
              checked={this.state.repeated}
              onPress={() =>
                this.setState({
                  repeated: !this.state.repeated
                })
              }
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Button
                title={dateToText}
                onPress={this.datePicker}
                type="clear"
              />
              <Button
                title={timeToText}
                onPress={this.timePicker}
                type="clear"
              />
            </View>
          </Card>
        </Content>
        <Footer
          style={[
            styles.footer,
            {
              justifyContent: "center"
            }
          ]}
        >
          <Button
            iconLeft
            style={[styles.footerButton, { width: 225 }]}
            onPress={this.submitTransaction}
            disabled={!this.state.amount}
          >
            <Icon name="content-save" size={25} style={{ color: "#fff" }} />
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                marginLeft: 10
              }}
            >
              Lưu
            </Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default AddTransaction;
