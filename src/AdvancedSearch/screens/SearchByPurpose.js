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

export default class SearchByPurpose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purposesSelected: [],
            isAllSelected: false
        };
    }

    _handleSelectPurposePress = () => {
        this.props.navigation.navigate("ListOfPurpose", {
            addPurpose: async purpose => {
                await this.setState({
                    purposesSelected: this.state.purposesSelected.concat(
                        purpose
                    )
                });
                //console.log(this.state.purposesSelected);
            },
            deletePurpose: purpose => {
                this.setState({
                    purposesSelected: this.state.purposesSelected.filter(
                        p => p.id !== purpose.id
                    )
                });
            },
            purposeInList: this.state.purposesSelected,
            isAllSelected: this.state.isAllSelected
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
                                <Right style={{ marginRight: 15 }} />
                            </ListItem>
                        );
                    })}
                </List>
            </Content>
        );
    }
}
