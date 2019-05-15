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
import { firebaseApp } from "../../database/firebase";
import styles from "../styles";
//import console from "console";

export default class AdvancedSearchScreen extends Component {
    constructor(props) {
        super(props);
        this.database = firebaseApp.firestore();
        const currentDate = new Date();
        this.state = {
            moneyStart: 0,
            moneyEnd: 0,
            purposesChosen: [],
            timeStart: currentDate,
            timeEnd: currentDate,
            note: "",
            results: []
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
            .collection("REs")
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
    /*** Search for REs */
    _search() {
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
                .collection("REs")
                .where("money", ">=", this.state.moneyStart)
                .where("money", "<=", this.state.moneyEnd)
                .onSnapshot(
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
                        .collection("REs")
                        .where("purpose.id", "==", purpose.id)
                        .onSnapshot(
                            querySnapshot => {
                                let purposeResults = [];
                                querySnapshot.forEach(doc => {
                                    purposeResults.push({
                                        id: doc.id,
                                        data: doc.data()
                                    });
                                });

                                let map = new Map();
                                purposeResults.forEach(result =>
                                    map.set(result.id, true)
                                );
                                purposeResults = this.state.results.filter(
                                    result => map.has(result.id)
                                );

                                this.setState({ results: purposeResults });
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
                .collection("REs")
                .where("time", ">=", this.state.timeStart)
                .where("time", "<=", this.state.timeEnd)
                .onSnapshot(
                    querySnapshot => {
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
                    .collection("REs")
                    .where("note", "==", this.state.note)
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
    }
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="menu" />
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

                <View style={styles.footer}>
                    <Button
                        iconLeft
                        style={styles.footerButton}
                        onPress={() => this._addRE()}
                    >
                        <Icon type="MaterialIcons" name="add" />
                        <Text>Thêm RE</Text>
                    </Button>
                    <Button
                        iconLeft
                        style={styles.footerButton}
                        onPress={() => this._search()}
                    >
                        <Icon type="AntDesign" name="search1" />
                        <Text>Tìm kiếm</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
