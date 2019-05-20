import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
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
import SeparatorCustom from "../../components/common/SeparatorCustom";
import styles from "../AdvancedSearch/styles";
import commonColor from "../../variables/commonColor";

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

  transform_3digit(value) {
    if (value !== null)
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title
              style={{
                fontSize: 24,
                alignSelf: "center"
              }}
            >
              Tổng quan
            </Title>
          </Body>
          {/* <Right style={{ flex: 1 }}>
                        <Button
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
                            </Button>
                    </Right> */}
        </Header>

        <View style={[styles.stableArea, { height: 60 }]}>
          <TouchableOpacity
            style={styles.touchableOpacityRow}
            onPress={() => this.props.navigation.navigate("AdvancedSearch")}
          >
            <Left style={{ alignItems: "center" }}>
              <Icon
                type="FontAwesome"
                name="search"
                style={{
                  color: commonColor.inputPlaceholder,
                  fontSize: 25
                }}
              />
            </Left>
            <Body style={{ flex: 5, alignItems: "flex-start" }}>
              <Text
                style={{
                  color: commonColor.inputPlaceholder,
                  fontSize: 18
                }}
              >
                Tìm kiếm nâng cao
              </Text>
            </Body>
            <Right style={{ marginRight: 15 }}>
              <Icon
                active
                type="Ionicons"
                name="ios-arrow-forward"
                style={{
                  color: commonColor.inputPlaceholder,
                  fontSize: 20
                }}
              />
            </Right>
          </TouchableOpacity>
        </View>

        <SeparatorCustom />

        <View style={[styles.stableArea]}>
          <Text
            style={{
              fontSize: 18,
              color: commonColor.subText
            }}
          >
            Tổng tiền:{"  "}
          </Text>
          {this.state.loading ? (
            <Spinner style={{ height: 50 }} size="small" />
          ) : (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              {this.transform_3digit(this.state.wallet)}
            </Text>
          )}
        </View>

        <SeparatorCustom />

        <Content>
          {this.state.loading ? (
            <Spinner />
          ) : (
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
                        flex: 2,
                        alignContent: "flex-start"
                      }}
                    >
                      <Text
                        style={{
                          color: x.purpose.isRevenue ? "#00cc44" : "#e60000",
                          fontSize: 20
                        }}
                      >
                        {this.transform_3digit(x.amount)}
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
          )}
        </Content>
      </Container>
    );
  }
}

export default TransactionScreen;
