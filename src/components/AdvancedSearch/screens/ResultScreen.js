import React, { Component } from "react";
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
import { firebaseApp } from "../../../database/firebase";
import firebase from "react-native-firebase";
import styles from "../styles";
//import console from "console";

export default class SearchResultScreen extends Component {
    constructor(props) {
        super(props);
        this.unsubcribe = null;
        this.database = firebase.firestore();

        this.state = {
            moneyStart: 0,
            moneyEnd: 0,
            purposesChosen: [],
            timeStart: new Date(),
            timeEnd: new Date(),
            note: "",
            resultsList: [],
            purposeResults: []
        };
    }

    async componentWillMount() {
        this.setState({
            moneyStart: this.props.navigation.state.params.moneyStart,
            moneyEnd: this.props.navigation.state.params.moneyEnd,
            purposesChosen: this.props.navigation.state.params.purposesChosen,
            timeStart: this.props.navigation.state.params.timeStart,
            timeEnd: this.props.navigation.state.params.timeEnd,
            note: this.props.navigation.state.params.note
        });
    }

    componentDidMount() {
        this._search();
    }

    componentWillUnmount() {
        this.unsubcribe();
    }

    _search = () => {
        this.unsubcribe = this.database
            .collection("transactions")
            .where("amount", ">=", this.state.moneyStart)
            .where("amount", "<=", this.state.moneyEnd)
            .onSnapshot(
                { includeMetadataChanges: true },
                querySnapshot => {
                    let moneyResults = [];
                    querySnapshot.forEach(doc => {
                        moneyResults.push({ id: doc.id, data: doc.data() });
                    });

                    this.setState({
                        resultsList: moneyResults
                    });
                    console.log("money results: ", moneyResults);
                },
                error => {
                    console.log("Error getting moneyResults: ", error);
                }
            );

        if (this.state.purposesChosen.length > 0) {
            this.state.purposesChosen.forEach(purpose => {
                this.unsubcribe = this.database
                    .collection("transactions")
                    .where("purpose.id", "==", purpose.id)
                    .onSnapshot(
                        querySnapshot => {
                            let purposeList = this.state.purposeResults;
                            querySnapshot.forEach(doc => {
                                purposeList.push({
                                    id: doc.id,
                                    data: doc.data()
                                });
                            });
                            this.setState({
                                purposeResults: purposeList
                            });
                        },
                        error => {
                            console.log(
                                "Error getting purposeResults: ",
                                error
                            );
                        }
                    );
            });
        }

        this.unsubcribe = this.database
            .collection("transactions")
            .where("date", ">=", this.state.timeStart)
            .where("date", "<=", this.state.timeEnd)
            .onSnapshot(
                querySnapshot => {
                    let mapForPurpose = new Map();
                    this.state.purposeResults.forEach(result =>
                        mapForPurpose.set(result.id, true)
                    );
                    this.setState({
                        purposeResults: [],
                        resultsList: this.state.resultsList.filter(result =>
                            mapForPurpose.has(result.id)
                        )
                    });

                    let timeResults = [];
                    querySnapshot.forEach(doc => {
                        timeResults.push({ id: doc.id, data: doc.data() });
                    });

                    let map = new Map();
                    timeResults.forEach(result => map.set(result.id, true));
                    timeResults = this.state.resultsList.filter(result =>
                        map.has(result.id)
                    );

                    this.setState({ resultsList: timeResults });
                },
                error => {
                    console.log("Error getting timeResults: ", error);
                }
            );

        if (this.state.note.length > 0) {
            this.unsubcribe = this.database
                .collection("transactions")
                .where("note", "array-contains", this.state.note)
                .onSnapshot(
                    querySnapshot => {
                        let noteResults = [];
                        querySnapshot.forEach(doc => {
                            noteResults.add(doc);
                        });

                        let map = new Map();
                        noteResults.forEach(result => map.set(result.id));
                        noteResults = this.state.resultsList.filter(result =>
                            map.has(result.id)
                        );

                        this.setState({ results: noteResults });
                    },
                    error => {
                        console.log("Error getting noteResults: ", error);
                    }
                );
        }
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="ios-arrow-back" type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Kết quả tìm kiếm</Title>
                    </Body>
                </Header>

                <Content>
                    {this.state.resultsList.map(result => {
                        return (
                            <ListItem noIndent key={result.id}>
                                <View style={styles.iconListItem}>
                                    <Button
                                        transparent
                                        style={{ alignSelf: "center" }}
                                    >
                                        <Icon
                                            active
                                            type={result.data.purpose.iconType}
                                            name={result.data.purpose.iconName}
                                        />
                                    </Button>
                                </View>
                                <Body style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: 30,
                                            color: result.data.purpose.isRevenue
                                                ? "#00cc44"
                                                : "#e60000"
                                        }}
                                    >
                                        {result.data.amount}
                                    </Text>
                                    <Text>{result.data.purpose.name}</Text>
                                </Body>
                                <Right style={{ flex: 1 }}>
                                    <Text>
                                        {result.data.date
                                            .toDate()
                                            .toLocaleDateString()}
                                    </Text>
                                    <Text>
                                        {result.data.date
                                            .toDate()
                                            .toLocaleTimeString()}
                                    </Text>
                                </Right>
                            </ListItem>
                        );
                    })}
                </Content>
            </Container>
        );
    }
}
