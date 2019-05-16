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
            note: "",
            results: [],
            purposeResults: []
        };
    }
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
    /*** Add RE to database ***/
    _addRE() {
        this.database
            .collection("transactions")
            .add({
                money: parseFloat(this.state.moneyStart),
                purpose: this.state.purposesChosen[0],
                time: this.state.timeStart,
                note: this.state.note
            })
            .catch(error => {
                console.log("Error adding document: ", error);
            });
    }
    abc;
    /*** Search for REs */
    _search = () => {
        if (this.state.moneyStart > this.state.moneyEnd) {
            Alert.alert(
                "Giá trị của 'Tiền bắt đầu' không được lớn hơn 'Tiền kết thúc'"
            );
        } else if (this.state.timeStart > this.state.timeEnd) {
            Alert.alert(
                "'Thời gian bắt đầu' không được lớn hơn 'Thời gian kết thúc'"
            );
        } else {
            this.database
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
                            results: moneyResults
                        });
                    },
                    error => {
                        console.log("Error getting moneyResults: ", error);
                    }
                );

            if (this.state.purposesChosen.length > 0) {
                this.state.purposesChosen.forEach(purpose => {
                    this.database
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

            this.database
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
                            results: this.state.results.filter(result =>
                                mapForPurpose.has(result.id)
                            )
                        });

                        let timeResults = [];
                        querySnapshot.forEach(doc => {
                            timeResults.push({ id: doc.id, data: doc.data() });
                        });

                        let map = new Map();
                        timeResults.forEach(result => map.set(result.id, true));
                        timeResults = this.state.results.filter(result =>
                            map.has(result.id)
                        );

                        this.setState({ results: timeResults });
                    },
                    error => {
                        console.log("Error getting timeResults: ", error);
                    }
                );

            if (this.state.note.length > 0) {
                this.database
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
                            noteResults = this.state.results.filter(result =>
                                map.has(result.id)
                            );

                            this.setState({ results: noteResults });
                        },
                        error => {
                            console.log("Error getting noteResults: ", error);
                        }
                    );
            }
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
                    {/* <Button
                        iconLeft
                        style={styles.footerButton}
                        onPress={() => this._addRE()}
                    >
                        <Icon type="MaterialIcons" name="add" />
                        <Text>Thêm RE</Text>
                    </Button> */}
                    <Button
                        iconLeft
                        style={[styles.footerButton, { width: 275 }]}
                        onPress={() => this._search()}
                    >
                        <Icon type="AntDesign" name="search1" />
                        <Text>Tìm kiếm</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}
