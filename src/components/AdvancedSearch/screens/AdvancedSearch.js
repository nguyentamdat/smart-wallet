import React, { Component } from "react";
import { Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem,
  View
} from "native-base";
import SearchByMoney from "./SearchByMoney";
import SearchByPurpose from "./SearchByPurpose";
import SearchByTime from "./SearchByTime";
import SearchByNote from "./SearchByNote";
import { firebaseApp } from "../../../database/firebase";
import styles from "../styles";
//import console from "console";

export default class AdvancedSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.database = firebaseApp.firestore();
    const currentDate = new Date();
    const dateStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
      0,
      0,
      0,
      0
    );
    const dateEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    this.state = {
      moneyStart: 0,
      moneyEnd: 0,
      purposesChosen: [],
      timeStart: dateStart,
      timeEnd: dateEnd,
      note: ""
    };
  }

  componentDidMount() {
    this.setState({ results: this.state.results });
  }
  /*** Handle Data Change through Components ***/
  _handleMoneyStartChange = value => {
    this.setState({ moneyStart: parseFloat(value) });
  };
  /*** Handle Data Change through Components ***/
  _handleMoneyStartChange = value => {
    this.setState({ moneyStart: parseFloat(value) });
  };

  _handleMoneyEndChange = value => {
    this.setState({ moneyEnd: parseFloat(value) });
  };

  _handlePurposeChosen = purposes => {
    this.setState({ purposesChosen: purposes });
  };

  _handleTimeStartChange = date => {
    this.setState({ timeStart: date });
  };

  _handleTimeEndChange = date => {
    this.setState({ timeEnd: date });
  };

  _handleNoteChange = content => {
    this.setState({ note: content });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" type="Ionicons" />
            </Button>
          </Left>
          <Body>
            <Title style={{ textTransform: "uppercase" }}>
              tìm kiếm nâng cao
            </Title>
          </Body>
        </Header>

        <Content>
          <SearchByMoney
            moneyStart={this.state.moneyStart}
            moneyStartChange={this._handleMoneyStartChange}
            moneyEnd={this.state.moneyEnd}
            moneyEndChange={this._handleMoneyEndChange}
          />
          <SearchByPurpose
            navigation={this.props.navigation}
            purposeChange={this._handlePurposeChosen}
          />
          <SearchByTime
            timeStartChange={this._handleTimeStartChange}
            timeEndChange={this._handleTimeEndChange}
          />
          <SearchByNote
            noteContent={this.state.note}
            noteChange={this._handleNoteChange}
          />
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
            onPress={() => {
              if (this.state.moneyStart > this.state.moneyEnd) {
                Alert.alert(
                  "Giá trị của 'Tiền bắt đầu' không được lớn hơn 'Tiền kết thúc'"
                );
              } else if (this.state.timeStart > this.state.timeEnd) {
                Alert.alert(
                  "'Thời gian bắt đầu' không được lớn hơn 'Thời gian kết thúc'"
                );
              } else {
                this.props.navigation.navigate("SearchResult", {
                  moneyStart: this.state.moneyStart,
                  moneyEnd: this.state.moneyEnd,
                  purposesChosen: this.state.purposesChosen,
                  timeStart: this.state.timeStart,
                  timeEnd: this.state.timeEnd,
                  note: this.state.note
                });
              }
            }}
          >
            <Icon type="AntDesign" name="search1" />
            <Text>Tìm</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
