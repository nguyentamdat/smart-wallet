import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
//  Styles for global use
import GlobalStyles from "../styles/styles.js";

class MoneyFilterScreen extends Component {
    render() {
        let currencyUnit = [
            {
                value: "VND"
            },
            {
                value: "USD"
            },
            {
                value: "JPY"
            },
            {
                value: "CNY"
            }
        ];

        return (
            <View style={GlobalStyles.container}>
                <View style={GlobalStyles.header}>
                    <Text
                        style={{
                            fontSize: 42,
                            fontStyle: "italic",
                            fontWeight: "bold"
                        }}
                    >
                        Tìm kiếm nâng cao
                    </Text>
                    <Text style={{ fontSize: 35, fontWeight: "bold" }}>
                        (Số tiền)
                    </Text>
                </View>
                <View style={GlobalStyles.content}>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 30
                        }}
                    >
                        <Text style={GlobalStyles.textStyleContent}>
                            Nhập số tiền:
                        </Text>
                        <View style={{ flex: 4.5, marginTop: 15 }}>
                            <View style={{ flex: 5 }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Input
                                        placeholder="0.0"
                                        label="Từ"
                                        labelStyle={{ fontSize: 25 }}
                                        keyboardType="numeric"
                                        inputContainerStyle={{
                                            borderWidth: 2,
                                            borderRadius: 10
                                        }}
                                        containerStyle={{ flex: 7 }}
                                        inputStyle={GlobalStyles.textStyleInput}
                                    />
                                    <View style={{ flex: 3 }}>
                                        <Dropdown
                                            data={currencyUnit}
                                            fontSize={20}
                                            selectedItemColor="#e60000"
                                            value="VND"
                                            dropdownOffset={{
                                                top: 38,
                                                left: 0
                                            }}
                                            containerStyle={{ marginLeft: 15 }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 5 }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Input
                                        placeholder="0.0"
                                        label="Đến"
                                        labelStyle={{ fontSize: 25 }}
                                        keyboardType="numeric"
                                        inputContainerStyle={{
                                            borderWidth: 2,
                                            borderRadius: 10
                                        }}
                                        containerStyle={{ flex: 7 }}
                                        inputStyle={GlobalStyles.textStyleInput}
                                    />
                                    <View style={{ flex: 3 }}>
                                        <Dropdown
                                            data={currencyUnit}
                                            fontSize={20}
                                            selectedItemColor="#e60000"
                                            value="VND"
                                            dropdownOffset={{
                                                top: 38,
                                                left: 0
                                            }}
                                            containerStyle={{ marginLeft: 15 }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 5.5,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                marginBottom: 20
                            }}
                        >
                            <Button
                                type="outline"
                                title="Hủy"
                                raised={true}
                                titleStyle={{ fontSize: 22, color: "black" }}
                                buttonStyle={{
                                    borderColor: "#000000",
                                    borderRadius: 5
                                }}
                                containerStyle={{ width: 150 }}
                            />
                            <Button
                                type="outline"
                                title="Tìm"
                                raised={true}
                                titleStyle={{ fontSize: 22, color: "black" }}
                                buttonStyle={{
                                    borderColor: "#000000",
                                    borderRadius: 5
                                }}
                                containerStyle={{ width: 150 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default MoneyFilterScreen;
