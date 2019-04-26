import React, { Component } from "react";
import { Button } from "react-native-elements";
import { Text, View, TextInput } from "react-native";
//  Styles for global use
import GlobalStyles from "../styles/styles.js";

class NoteFilterScreen extends Component {
    render() {
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
                        (Ghi chú)
                    </Text>
                </View>
                <View style={GlobalStyles.content}>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
                        <View
                            style={{ flex: 8, marginTop: 10, borderWidth: 1 }}
                        >
                            <TextInput
                                placeholder="Nhập nội dung Ghi chú"
                                editable={true}
                                multiline={true}
                                numberOfLines={30}
                                style={{ fontSize: 20 }}
                                textAlignVertical="top"
                            />
                        </View>
                        <View
                            style={{
                                flex: 2,
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

export default NoteFilterScreen;