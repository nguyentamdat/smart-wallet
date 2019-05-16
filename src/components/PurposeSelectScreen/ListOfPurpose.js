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
    CheckBox,
    Tabs,
    Tab,
    TabHeading
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import ListOfExpenditurePurpose from "./ListOfPurpose_E";
import ListOfRevenuePurpose from "./ListOfPurpose_R";
import variables from "../../variables/allPurpose";
import styles from "../../components/AdvancedSearch/styles";
//import console = require("console");

export default class ListOfPurpose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSingleSelect: false,
            listPurpose: variables.allPurpose,
            purposeInList: [],
            isAllSelected_E: false,
            isAllSelected_R: false,
            tabPage: 0
        };
    }

    async componentWillMount() {
        const savedPurposes = await AsyncStorage.getItem("@listPurpose");
        if (savedPurposes) {
            this.setState({
                listPurpose: JSON.parse(savedPurposes)
            });
        }

        this.setState({
            isSingleSelect: this.props.navigation.state.params.isSingleSelect,
            purposeInList: this.props.navigation.state.params.purposeInList,
            isAllSelected_E: this.props.navigation.state.params.isAllSelected_E,
            isAllSelected_R: this.props.navigation.state.params.isAllSelected_R
        });
    }

    _handlePurposePress = purpose => {
        if (this.state.isSingleSelect === true) {
            this.props.navigation.state.params.selectPurpose(purpose);
            this.props.navigation.goBack();
        } else {
            // Change status
            this.state.listPurpose.forEach(p => {
                if (purpose.id === p.id) {
                    p.gotten = !p.gotten;
                }
                return p;
            });
            this.setState({ listPurpose: this.state.listPurpose });
            // Add and remove
            let purposeChosen = this.state.purposeInList;
            const purposeInListIndex = this.state.purposeInList.findIndex(
                p => p.id === purpose.id
            );
            if (purposeInListIndex > -1) {
                purposeChosen = purposeChosen.filter(p => p.id !== purpose.id);
                this.setState({
                    purposeInList: purposeChosen
                });
                this.props.navigation.state.params.deletePurpose(purpose);
            } else {
                purposeChosen = purposeChosen.concat(purpose);
                this.setState({
                    purposeInList: purposeChosen
                });
                this.props.navigation.state.params.addPurpose(purpose);
            }
            // Check if All R Selected
            let purposeChosen_E = purposeChosen.filter(
                purpose => purpose.isRevenue === false
            );
            if (purposeChosen_E.length === variables.lengthPurpose_E) {
                this.setState({ isAllSelected_E: true });
            } else {
                this.setState({ isAllSelected_E: false });
            }
            // Check if All E Selected
            let purposeChosen_R = purposeChosen.filter(
                purpose => purpose.isRevenue === true
            );
            if (purposeChosen_R.length === variables.lengthPurpose_R) {
                this.setState({ isAllSelected_R: true });
            } else {
                this.setState({ isAllSelected_R: false });
            }
        }
    };

    _handleSelectAll = tabPage => {
        if (tabPage === 0) {
            if (this.state.isAllSelected_E === false) {
                this.state.listPurpose.forEach(p => {
                    if (p.isRevenue === false) {
                        p.gotten = true;
                    }
                    return p;
                });
                this.setState({
                    listPurpose: this.state.listPurpose
                });
                /*** Update list */
                let purposes = this.state.purposeInList.filter(
                    purpose => purpose.isRevenue === true
                );
                purposes = purposes.concat(
                    this.state.listPurpose.filter(
                        purpose => purpose.isRevenue === false
                    )
                );
                this.setState({
                    purposeInList: purposes
                });
                this.props.navigation.state.params.selectAllPurpose_E();
            } else {
                this.state.listPurpose.forEach(p => {
                    if (p.isRevenue === false) {
                        p.gotten = false;
                    }
                    return p;
                });
                this.setState({ listPurpose: this.state.listPurpose });
                /*** Update list */
                this.setState({
                    purposeInList: this.state.purposeInList.filter(
                        purpose => purpose.isRevenue === true
                    )
                });
                this.props.navigation.state.params.deselectAllPurpose_E();
            }
            this.setState({ isAllSelected_E: !this.state.isAllSelected_E });
        } else {
            if (this.state.isAllSelected_R === false) {
                this.state.listPurpose.forEach(p => {
                    if (p.isRevenue === true) {
                        p.gotten = true;
                    }
                    return p;
                });
                this.setState({
                    listPurpose: this.state.listPurpose
                });
                /*** Update list */
                let purposes = this.state.purposeInList.filter(
                    purpose => purpose.isRevenue === false
                );
                purposes = purposes.concat(
                    this.state.listPurpose.filter(
                        purpose => purpose.isRevenue === true
                    )
                );
                this.setState({
                    purposeInList: purposes
                });
                this.props.navigation.state.params.selectAllPurpose_R();
            } else {
                this.state.listPurpose.forEach(p => {
                    if (p.isRevenue === true) {
                        p.gotten = false;
                    }
                    return p;
                });
                this.setState({ listPurpose: this.state.listPurpose });
                /*** Update List */
                this.setState({
                    purposeInList: this.state.purposeInList.filter(
                        purpose => purpose.isRevenue === false
                    )
                });
                this.props.navigation.state.params.deselectAllPurpose_R();
            }
            this.setState({ isAllSelected_R: !this.state.isAllSelected_R });
        }
    };

    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon type="Ionicons" name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ textTransform: "uppercase" }}>
                            danh sách mục đích
                        </Title>
                    </Body>
                </Header>
                <Tabs
                    style={{ elevation: 3 }}
                    onChangeTab={({ i }) => this.setState({ tabPage: i })}
                >
                    <Tab
                        heading={
                            <TabHeading>
                                <Icon name="md-trending-down" type="Ionicons" />
                                <Text style={{ textTransform: "uppercase" }}>
                                    chi tiền
                                </Text>
                            </TabHeading>
                        }
                    >
                        <ListOfExpenditurePurpose
                            listPurpose_E={this.state.listPurpose.filter(
                                purpose => purpose.isRevenue === false
                            )}
                            purposePress={this._handlePurposePress}
                            isSingleSelect={this.state.isSingleSelect}
                        />
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading>
                                <Icon name="md-trending-up" type="Ionicons" />
                                <Text style={{ textTransform: "uppercase" }}>
                                    thu tiền
                                </Text>
                            </TabHeading>
                        }
                    >
                        <ListOfRevenuePurpose
                            listPurpose_R={this.state.listPurpose.filter(
                                purpose => purpose.isRevenue === true
                            )}
                            purposePress={this._handlePurposePress}
                            isSingleSelect={this.state.isSingleSelect}
                        />
                    </Tab>
                </Tabs>

                {!this.state.isSingleSelect && (
                    <Footer style={styles.footer}>
                        <Button
                            iconLeft
                            style={[styles.footerButton, { width: 165 }]}
                            onPress={() =>
                                this._handleSelectAll(this.state.tabPage)
                            }
                        >
                            <Icon
                                type="MaterialCommunityIcons"
                                name="select-all"
                            />
                            {((!this.state.isAllSelected_E &&
                                this.state.tabPage === 0) ||
                                (!this.state.isAllSelected_R &&
                                    this.state.tabPage === 1)) && (
                                <Text>Chọn tất cả</Text>
                            )}
                            {((this.state.isAllSelected_E &&
                                this.state.tabPage === 0) ||
                                (this.state.isAllSelected_R &&
                                    this.state.tabPage === 1)) && (
                                <Text>Bỏ chọn</Text>
                            )}
                        </Button>
                        <Button
                            iconLeft
                            style={[styles.footerButton, { width: 165 }]}
                            onPress={() => {
                                this.props.navigation.goBack();
                                this.props.navigation.state.params.updatePurposesChosen();
                            }}
                        >
                            <Icon
                                type="MaterialCommunityIcons"
                                name="checkbox-marked-circle-outline"
                            />
                            <Text>Xác nhận</Text>
                        </Button>
                    </Footer>
                )}
            </Container>
        );
    }
}
