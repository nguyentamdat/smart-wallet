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
    View,
    Spinner
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
        othersQueries.push(
            this.dbRef.where("note", "array-contains", this.state.note).get()
        );
        // Aggregate all queries above
        let othersPromise = Promise.all(othersQueries)
            .then(querysnapShot => {
                return querysnapShot.map(snapshot => snapshot.docs);
            })
            .catch(reason => {
                console.log(reason);
            });
        // Query Purposes
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
                        (accumulator, current) => [...accumulator, ...current]
                    );
                }
                return querySnapshotPurpose;
            })
            .catch(reason => {
                console.log(reason);
            });
        // Aggregate all queries with AND logical
        Promise.all([othersPromise, purposePromise])
            .then(docsArray => {
                docsArray = [...docsArray[0], docsArray[1]];

                return docsArray.reduce((accumulator, current) => {
                    if (current.length > 0) {
                        if (accumulator.length > 0) {
                            let map = new Map();
                            accumulator.forEach(doc => map.set(doc.id, true));
                            accumulator = current.filter(doc =>
                                map.has(doc.id)
                            );
                        } else {
                            return current;
                        }
                    }
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

    // _search = () => {
    //     this.unsubcribe = this.database
    //         .collection("transactions")
    //         .where("amount", ">=", this.state.moneyStart)
    //         .where("amount", "<=", this.state.moneyEnd)
    //         .onSnapshot(
    //             { includeMetadataChanges: true },
    //             querySnapshot => {
    //                 let moneyResults = [];
    //                 querySnapshot.forEach(doc => {
    //                     moneyResults.push({ id: doc.id, data: doc.data() });
    //                 });
    //                 moneyResults = moneyResults.sort((a, b) => {
    //                     return a.data.date <= b.data.date;
    //                 });

    //                 this.setState({
    //                     resultsList: moneyResults
    //                 });
    //             },
    //             error => {
    //                 console.log("Error getting moneyResults: ", error);
    //             }
    //         );

    //     if (this.state.purposesChosen.length > 0) {
    //         this.state.purposesChosen.forEach(purpose => {
    //             this.unsubcribe = this.database
    //                 .collection("transactions")
    //                 .where("purpose.id", "==", purpose.id)
    //                 .onSnapshot(
    //                     querySnapshot => {
    //                         let purposeList = this.state.purposeResults;
    //                         querySnapshot.forEach(doc => {
    //                             purposeList.push({
    //                                 id: doc.id,
    //                                 data: doc.data()
    //                             });
    //                         });
    //                         purposeList = purposeList.sort((a, b) => {
    //                             return a.data.date <= b.data.date;
    //                         });

    //                         this.setState({
    //                             purposeResults: purposeList
    //                         });
    //                     },
    //                     error => {
    //                         console.log(
    //                             "Error getting purposeResults: ",
    //                             error
    //                         );
    //                     }
    //                 );
    //         });
    //     }

    //     this.unsubcribe = this.database
    //         .collection("transactions")
    //         .where("date", ">=", this.state.timeStart)
    //         .where("date", "<=", this.state.timeEnd)
    //         .onSnapshot(
    //             querySnapshot => {
    //                 if (this.state.purposeResults.length > 0) {
    //                     /*** Filter by Purpose */
    //                     let mapForPurpose = new Map();
    //                     this.state.purposeResults.forEach(result =>
    //                         mapForPurpose.set(result.id, true)
    //                     );
    //                     let resultsNew = this.state.resultsList.filter(result =>
    //                         mapForPurpose.has(result.id)
    //                     );
    //                     /*** Filter by Time */
    //                     let timeResults = [];
    //                     querySnapshot.forEach(doc => {
    //                         timeResults.push({ id: doc.id, data: doc.data() });
    //                     });

    //                     let map = new Map();
    //                     timeResults.forEach(result => map.set(result.id, true));
    //                     timeResults = resultsNew.filter(result =>
    //                         map.has(result.id)
    //                     );
    //                     timeResults.sort((a, b) => {
    //                         return a.data.date <= b.data.date;
    //                     });

    //                     this.setState({
    //                         purposeResults: [],
    //                         resultsList: timeResults
    //                     });
    //                 } else {
    //                     let timeResults = [];
    //                     querySnapshot.forEach(doc => {
    //                         timeResults.push({ id: doc.id, data: doc.data() });
    //                     });

    //                     let map = new Map();
    //                     timeResults.forEach(result => map.set(result.id, true));
    //                     timeResults = this.state.resultsList.filter(result =>
    //                         map.has(result.id)
    //                     );
    //                     timeResults.sort((a, b) => {
    //                         return a.data.date <= b.data.date;
    //                     });

    //                     this.setState({ resultsList: timeResults });
    //                 }
    //             },
    //             error => {
    //                 console.log("Error getting timeResults: ", error);
    //             }
    //         );

    //     if (this.state.note.length > 0) {
    //         this.unsubcribe = this.database
    //             .collection("transactions")
    //             .where("note", "array-contains", this.state.note)
    //             .onSnapshot(
    //                 querySnapshot => {
    //                     let noteResults = [];
    //                     querySnapshot.forEach(doc => {
    //                         noteResults.add(doc);
    //                     });

    //                     let map = new Map();
    //                     noteResults.forEach(result => map.set(result.id));
    //                     noteResults = this.state.resultsList.filter(result =>
    //                         map.has(result.id)
    //                     );
    //                     noteResults.sort((a, b) => {
    //                         return a.data.date <= b.data.date;
    //                     });

    //                     this.setState({ results: noteResults });
    //                 },
    //                 error => {
    //                     console.log("Error getting noteResults: ", error);
    //                 }
    //             );
    //     }
    // };

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
