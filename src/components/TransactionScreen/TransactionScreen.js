import React, { Component } from "react";
import {
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
            total -= x.amount;
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
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        "AdvancedSearch"
                                    )
                                }
                            >
                                <Icon type="AntDesign" name="search1" />
                            </Button>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title
                                style={{
                                    textTransform: "uppercase",
                                    alignSelf: "center"
                                }}
                            >
                                Tổng quan
                            </Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
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
                        </Right>
                    </Header>

                    <Content>
                        {this.state.listTrans.map(x => {
                            const date = x.date.toDate();
                            return (
                                <ListItem key={x.key}>
                                    <Left
                                        style={{
                                            flexDirection: "row",
                                            flex: 1
                                        }}
                                    >
                                        <Grid>
                                            <Row style={{ height: 20 }}>
                                                <H3 style={{ color: "blue" }}>
                                                    {x.amount}
                                                </H3>
                                            </Row>
                                            <Row style={{ height: 10 }}>
                                                <Text>{x.purpose.name}</Text>
                                            </Row>
                                        </Grid>
                                    </Left>
                                    <Right style={{ flex: 1 }}>
                                        <Text>
                                            {date.toLocaleDateString() +
                                                "\n" +
                                                date.toLocaleTimeString()}
                                        </Text>
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </Content>
                    {/* <Footer>
                        <FooterTab>
                            <Button
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        "AddTransaction"
                                    );
                                }}
                            >
                                <Text>+</Text>
                            </Button>
                        </FooterTab>
                    </Footer> */}
                </Container>
            );
    }
}

export default TransactionScreen;
