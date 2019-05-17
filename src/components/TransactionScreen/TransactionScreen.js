import React, { Component } from "react";
import {
  View,
  Container,
  Header,
  Body,
  Text,
  Right,
  Icon,
  List,
  ListItem,
  Spinner,
  Item,
  Label,
  Left,
  Grid,
  Row,
  H3,
  Separator,
  Content,
  Footer,
  FooterTab,
  Button,
  H1,
  Title
} from "native-base";
import firebase from "react-native-firebase";
import styles from "../AdvancedSearch/styles";

let initState = { listTrans: [], loading: true, wallet: null };

class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.unsubcribe = null;
    this.ref = firebase
      .firestore()
      .collection("transactions")
      .orderBy("date", "desc");
    this.onConnect = this.onConnect.bind(this);
  }
  componentDidMount() {
    this.unsubcribe = this.ref.onSnapshot(this.onConnect);
  }
  componentWillUnmount() {
    this.unsubcribe();
  }
  onConnect(querySnapshot) {
    const list = [];
    querySnapshot.forEach(doc => {
      let data = doc.data();
      data = { ...data, key: doc.id };
      list.push(data);
    });
    this.setState({ listTrans: list, loading: false });
    let total = 0;
    this.state.listTrans.forEach(x => {
      if (x.purpose.isRevenue) {
        total += x.amount;
      } else total -= x.amount;
    });
    console.log(total);
    this.setState({ wallet: total });
  }
  render() {
    if (this.state.loading)
      return (
        <Container>
          <Spinner />
        </Container>
      );
    else
      return (
        <Container>
          <Header>
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("AdvancedSearch")}
              >
                <Icon type="AntDesign" name="search1" />
              </Button>
            </Left>
            <Body style={{ flex: 4 }}>
              <Title
                style={{
                  textTransform: "uppercase",
                  fontSize: 26,
                  alignSelf: "center",
                  color: this.state.wallet >= 0 ? "#00ff55" : "#ff6666"
                }}
              >
                {this.state.wallet}
              </Title>
            </Body>
            <Right style={{ flex: 1 }}>
              {/* <Button
                                transparent
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        "NotificationView"
                                    )
                                }
                            >
                                <Icon
                                    name="bell"
                                    type="MaterialCommunityIcons"
                                />
                            </Button> */}
            </Right>
          </Header>

          <Content>
            {this.state.listTrans.map(x => {
              const date = x.date.toDate();
              return (
                <ListItem key={x.key} noIndent>
                  <View style={styles.iconListItem}>
                    <Button transparent style={{ alignSelf: "center" }}>
                      <Icon
                        active
                        type={x.purpose.iconType}
                        name={x.purpose.iconName}
                      />
                    </Button>
                  </View>
                  <Body
                    style={{
                      flexDirection: "column",
                      flex: 1,
                      alignContent: "flex-start"
                    }}
                  >
                    <Text
                      style={{
                        color: x.purpose.isRevenue ? "#00cc44" : "#e60000",
                        fontSize: 24
                      }}
                    >
                      {x.amount}
                    </Text>
                    <Text>{x.purpose.name}</Text>
                  </Body>
                  <Right style={{ flex: 1 }}>
                    <Text>{date.toLocaleDateString()}</Text>
                    <Text>{date.toLocaleTimeString()}</Text>
                  </Right>
                </ListItem>
              );
            })}
          </Content>
        </Container>
      );
  }
}

export default TransactionScreen;
