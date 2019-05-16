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
    Separator,
    Form,
    Item,
    Label,
    Input,
    Picker,
    View
} from "native-base";
import styles from "../styles";
import variables from "../../variables/allPurpose";
//import console = require("console");

export default class SearchByPurpose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purposesSelected: [],
            isAllSelected_E: false,
            isAllSelected_R: false
        };
    }

    _handleSelectPurposePress = () => {
        this.props.navigation.navigate("ListOfPurpose", {
            addPurpose: purpose => {
                let purposeChosen = this.state.purposesSelected.concat(purpose);
                this.setState({ purposesSelected: purposeChosen });
                let purposeChosen_E = purposeChosen.filter(
                    purpose => purpose.isRevenue === false
                );
                if (purposeChosen_E.length === variables.lengthPurpose_E) {
                    this.setState({ isAllSelected_E: true });
                } else {
                    this.setState({ isAllSelected_E: false });
                }
                let purposeChosen_R = purposeChosen.filter(
                    purpose => purpose.isRevenue === true
                );
                if (purposeChosen_R.length === variables.lengthPurpose_R) {
                    this.setState({ isAllSelected_R: true });
                } else {
                    this.setState({ isAllSelected_R: false });
                }
            },
            deletePurpose: purpose => {
                let purposeChosen = this.state.purposesSelected.filter(
                    p => p.id !== purpose.id
                );
                this.setState({ purposesSelected: purposeChosen });
                let purposeChosen_E = purposeChosen.filter(
                    purpose => purpose.isRevenue === false
                );
                if (purposeChosen_E.length < variables.lengthPurpose_E) {
                    this.setState({ isAllSelected_E: false });
                } else {
                    this.setState({ isAllSelected_R: false });
                }
            },
            selectAllPurpose_E: () => {
                let listPurpose = this.state.purposesSelected.filter(
                    purpose => purpose.isRevenue === true
                );
                listPurpose = listPurpose.concat(
                    variables.allPurpose.filter(
                        purpose => purpose.isRevenue === false
                    )
                );
                this.setState({
                    purposesSelected: listPurpose,
                    isAllSelected_E: true
                });
            },
            deselectAllPurpose_E: () => {
                this.setState({
                    purposesSelected: this.state.purposesSelected.filter(
                        purpose => purpose.isRevenue === true
                    ),
                    isAllSelected_E: false
                });
            },
            selectAllPurpose_R: () => {
                let listPurpose = this.state.purposesSelected.filter(
                    purpose => purpose.isRevenue === false
                );
                listPurpose = listPurpose.concat(
                    variables.allPurpose.filter(
                        purpose => purpose.isRevenue === true
                    )
                );
                this.setState({
                    purposesSelected: listPurpose,
                    isAllSelected_R: true
                });
            },
            deselectAllPurpose_R: () => {
                this.setState({
                    purposesSelected: this.state.purposesSelected.filter(
                        purpose => purpose.isRevenue === false
                    ),
                    isAllSelected_R: false
                });
            },
            purposeInList: this.state.purposesSelected,
            isAllSelected_E: this.state.isAllSelected_E,
            isAllSelected_R: this.state.isAllSelected_R,
            updatePurposesChosen: () =>
                this.props.purposeChange(this.state.purposesSelected)
        });
    };

    render() {
        return (
            <Content>
                <Separator bordered style={styles.separator}>
                    <Text style={styles.separatorText}>Mục đích</Text>
                </Separator>
                <List>
                    <ListItem noIndent onPress={this._handleSelectPurposePress}>
                        <Body>
                            <Input
                                editable={false}
                                placeholder="Chọn các Mục đích muốn tìm kiếm"
                            />
                        </Body>
                        <Right>
                            <Icon
                                active
                                type="Ionicons"
                                name="ios-arrow-forward"
                            />
                        </Right>
                    </ListItem>
                    {this.state.purposesSelected.map(purpose => {
                        return (
                            <ListItem noIndent key={purpose.id}>
                                <View style={styles.iconListItem}>
                                    <Button
                                        transparent
                                        style={{ alignSelf: "center" }}
                                    >
                                        <Icon
                                            active
                                            type={purpose.iconType}
                                            name={purpose.iconName}
                                        />
                                    </Button>
                                </View>
                                <Body>
                                    <Text>{purpose.name}</Text>
                                </Body>
                                <Right style={{ marginRight: 20 }}>
                                    {purpose.isRevenue === true ? (
                                        <Button
                                            transparent
                                            style={{
                                                alignSelf: "center",
                                                color: "#00cc44"
                                            }}
                                        >
                                            <Icon
                                                name="md-trending-up"
                                                type="Ionicons"
                                                style={{ color: "#00cc44" }}
                                            />
                                        </Button>
                                    ) : (
                                        <Button
                                            transparent
                                            style={{ alignSelf: "center" }}
                                        >
                                            <Icon
                                                name="md-trending-down"
                                                type="Ionicons"
                                                style={{ color: "#e60000" }}
                                            />
                                        </Button>
                                    )}
                                </Right>
                            </ListItem>
                        );
                    })}
                </List>
            </Content>
        );
    }
}
