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
    constructor() {
        super();
    }

    render() {
        return (
            <Content>
                <Separator bordered style={styles.separator}>
                    <Text style={styles.separatorText}>Mục đích</Text>
                </Separator>
                <ListItem noIndent>
                    <Body>
                        <Input
                            disabled
                            placeholder="Chọn các Mục đích muốn tìm kiếm"
                        />
                    </Body>
                    <Right>
                        <Icon active type="Ionicons" name="ios-arrow-forward" />
                    </Right>
                </ListItem>
            </Content>
        );
    }
}
