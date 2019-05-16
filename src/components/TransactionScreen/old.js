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

const initState = { listTrans: [] };

class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    state = initState;
    this.unsub = null;
    this.ref = firebase.firestore().collection("transactions");
  }
  componentDidMount() {
    this.unsub = this.ref.onSnapshot(this.onConnect);
  }
  componentWillUnmount() {
    this.unsub();
  }
  onConnect = querySnapshot => {
    console.log("comp mounted");
    const listTrans = [];
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      listTrans.push({
        key: doc.id,
        ...doc.data()
      });
    });
    this.setState({ listTrans: listTrans });
  };
  render() {
    console.log(this.listTrans);
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
