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

export default class SearchByMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneyStart: "",
            selectedStart: "vnd",
            moneyEnd: "",
            selectedEnd: "vnd"
        };
    }

    onTypeChangeStart(value) {
        this.setState({
            selectedStart: value
        });
    }
    onTypeChangeEnd(value) {
        this.setState({
            selectedEnd: value
        });
    }
    render() {
        return (
            <Content>
                <Separator bordered style={styles.separator}>
                    <Text style={styles.separatorText}>Số tiền</Text>
                </Separator>
                <Form>
                    <Item style={{ marginLeft: 0 }}>
                        <View style={styles.labelItem}>
                            <Text>Từ</Text>
                        </View>
                        <View style={styles.moneyInputContainer}>
                            <Input
                                style={styles.moneyInputText}
                                placeholder="0.0"
                                keyboardType="numeric"
                                onChangeText={valueText => {
                                    this.setState({ moneyStart: valueText });
                                    this.props.moneyStartChange(valueText);
                                }}
                                value={this.state.moneyStart}
                            />
                        </View>
                        <View style={styles.currencyPicker}>
                            <Picker
                                mode="dropdown"
                                style={{ width: 100 }}
                                selectedValue={this.state.selectedStart}
                                onValueChange={this.onTypeChangeStart.bind(
                                    this
                                )}
                            >
                                <Picker.Item label="VND" value="key0" />
                                <Picker.Item label="USD" value="key1" />
                                <Picker.Item label="JPY" value="key2" />
                            </Picker>
                        </View>
                    </Item>
                    <Item style={{ marginLeft: 0 }}>
                        <View style={styles.labelItem}>
                            <Text>Đến</Text>
                        </View>
                        <View style={styles.moneyInputContainer}>
                            <Input
                                style={styles.moneyInputText}
                                placeholder="0.0"
                                keyboardType="numeric"
                                onChangeText={valueText => {
                                    this.setState({ moneyEnd: valueText });
                                    this.props.moneyEndChange(valueText);
                                }}
                                value={this.state.moneyEnd}
                            />
                        </View>
                        <View style={styles.currencyPicker}>
                            <Picker
                                mode="dropdown"
                                style={{ width: 100 }}
                                selectedValue={this.state.selectedEnd}
                                onValueChange={this.onTypeChangeEnd.bind(this)}
                            >
                                <Picker.Item label="VND" value="key0" />
                                <Picker.Item label="USD" value="key1" />
                                <Picker.Item label="JPY" value="key2" />
                            </Picker>
                        </View>
                    </Item>
                </Form>
            </Content>
        );
    }
}
