import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
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
    View,
    Spinner
} from "native-base";
import { firebaseApp } from "../../../database/firebase";
import firebase from "react-native-firebase";
import styles from "../styles";
import commonColor from "../../../variables/commonColor";
//import console from "console";

export default class SearchResultScreen extends Component {
    constructor(props) {
        super(props);
        this.unsubcribe = null;
        this.database = firebase.firestore();
        this.dbRef = firebase.firestore().collection("transactions");

        this.state = {
            moneyStart: 0,
            moneyEnd: 0,
            purposesChosen: [],
            timeStart: new Date(),
            timeEnd: new Date(),
            note: "",
            resultsList: [],
            loading: true
            //purposeResults: []
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
        //this._search();
        this._searchQuery();
    }

    //componentWillUnmount() {}

    _searchQuery() {
        let othersQueries = [];
        let allPromises = [];
        // Query Money
        othersQueries.push(
            this.dbRef
                .where("amount", ">=", this.state.moneyStart)
                .where("amount", "<=", this.state.moneyEnd)
                .get()
        );
        // Query Time
        othersQueries.push(
            this.dbRef
                .where("date", ">=", this.state.timeStart)
                .where("date", "<=", this.state.timeEnd)
                .get()
        );
        // Query Note
        if (this.state.note.length > 0) {
            othersQueries.push(
                this.dbRef
                    .where("note", "array-contains", this.state.note)
                    .get()
            );
        }
        // Aggregate all queries above
        let othersPromise = Promise.all(othersQueries)
            .then(querysnapShot => {
                return querysnapShot.map(snapshot => snapshot.docs);
            })
            .catch(reason => {
                console.log(reason);
            });
        allPromises.push(othersPromise);
        // Query Purposes
        if (this.state.purposesChosen.length > 0) {
            let queriesPurpose = this.state.purposesChosen.map(purpose => {
                return this.dbRef.where("purpose.id", "==", purpose.id).get();
            });
            // Aggregate all purpose's queries with OR logical
            let purposePromise = Promise.all(queriesPurpose)
                .then(querySnapshotPurpose => {
                    querySnapshotPurpose = querySnapshotPurpose.map(
                        snapshot => snapshot.docs
                    );
                    if (querySnapshotPurpose.length > 0) {
                        return querySnapshotPurpose.reduce(
                            (accumulator, current) => [
                                ...accumulator,
                                ...current
                            ]
                        );
                    }
                    return querySnapshotPurpose;
                })
                .catch(reason => {
                    console.log(reason);
                });
            allPromises.push(purposePromise);
        }
        // Aggregate all queries with AND logical
        Promise.all(allPromises)
            .then(docsArray => {
                if (docsArray.length === 1) {
                    docsArray = [...docsArray[0]];
                } else {
                    docsArray = [...docsArray[0], docsArray[1]];
                }
                console.log("docsArray: ", docsArray);
                return docsArray.reduce((accumulator, current) => {
                    // if (current.length > 0) {
                    //     if (accumulator.length > 0) {
                    //         let map = new Map();
                    //         accumulator.forEach(doc => map.set(doc.id, true));
                    //         accumulator = current.filter(doc =>
                    //             map.has(doc.id)
                    //         );
                    //     } else {
                    //         return current;
                    //     }
                    // }
                    let map = new Map();
                    accumulator.forEach(doc => map.set(doc.id, true));
                    accumulator = current.filter(doc => map.has(doc.id));

                    return accumulator;
                });
            })
            .then(matchingResults => {
                matchingResults.sort((a, b) => {
                    return b.data().date.toDate() - a.data().date.toDate();
                });

                this.setState({ resultsList: matchingResults, loading: false });
            })
            .catch(reason => {
                console.log(reason);
            });
    }

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
                {this.state.loading ? (
                    <Spinner />
                ) : this.state.resultsList.length === 0 ? (
                    <Content
                        contentContainerStyle={{
                            backgroundColor: commonColor.separatorBg,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignSelf: "center",
                                alignItems: "center"
                            }}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon
                                type="Entypo"
                                name="emoji-sad"
                                style={{
                                    fontSize: 30,
                                    color: commonColor.inputPlaceholder
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 20,
                                    color: commonColor.inputPlaceholder
                                }}
                            >
                                Không tìm thấy kết quả phù hợp
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: commonColor.inputPlaceholder
                                }}
                            >
                                Hãy thử lại nhé!
                            </Text>
                        </TouchableOpacity>
                    </Content>
                ) : (
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
                                                type={
                                                    result.data().purpose
                                                        .iconType
                                                }
                                                name={
                                                    result.data().purpose
                                                        .iconName
                                                }
                                            />
                                        </Button>
                                    </View>
                                    <Body style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: 24,
                                                color: result.data().purpose
                                                    .isRevenue
                                                    ? "#00cc44"
                                                    : "#e60000"
                                            }}
                                        >
                                            {result.data().amount}
                                        </Text>
                                        <Text>
                                            {result.data().purpose.name}
                                        </Text>
                                    </Body>
                                    <Right style={{ flex: 1 }}>
                                        <Text>
                                            {result
                                                .data()
                                                .date.toDate()
                                                .toLocaleDateString()}
                                        </Text>
                                        <Text>
                                            {result
                                                .data()
                                                .date.toDate()
                                                .toLocaleTimeString()}
                                        </Text>
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </Content>
                )}
            </Container>
        );
    }
}
