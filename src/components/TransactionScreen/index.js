import React, { Component } from "react";
import {
  Container,
  Header,
  Body,
  Text,
  Right,
  Icon,
  List,
  ListItem
} from "native-base";
import firebase from "react-native-firebase";

const getTransactions = async () => {
  const db = firebase
    .firestore()
    .collection("transactions")
    .orderBy("date", "ASC")
    .get();
  console.log(db);
};
getTransactions();
class TransactionScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text>{}</Text>
          </Body>
          <Right>
            <Icon name="bell" type="MaterialCommunityIcons" />
          </Right>
        </Header>
        <List>
          <ListItem itemDivider>
            <Text>Divider</Text>
          </ListItem>
          <ListItem onPress={() => {}}>
            <Text>Child</Text>
          </ListItem>
        </List>
      </Container>
    );
  }
}

export default TransactionScreen;
