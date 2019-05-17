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
    View,
    Textarea
} from "native-base";
import styles from "../styles";

export default class SearchByNote extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content>
                <Separator bordered style={styles.separator}>
                    <Text style={styles.separatorText}>Ghi chú</Text>
                </Separator>
                <Form>
                    <Textarea
                        rowSpan={4}
                        bordered
                        placeholder="Nhập Ghi chú mà bạn muốn tìm vào đây"
                        style={{
                            margin: 10,
                            marginTop: 10
                        }}
                        value={this.props.noteContent}
                        onChangeText={text => this.props.noteChange(text)}
                    />
                </Form>
            </Content>
        );
    }
}
