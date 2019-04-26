import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import NumericInput from "react-native-numeric-input";
import DateTimePicker from "react-native-modal-datetime-picker";
//  Styles for global use
import GlobalStyles from "../styles/styles.js";

class TimeFilterScreen extends Component {
    constructor() {
        super();
        var currentDate = new Date();
        this.state = {
            isDateTimePickerVisible_Start: false,
            isDateTimePickerVisible_End: false,

            FullDate_Start: currentDate,
            Hour_Start: currentDate.getHours(),
            Min_Start: currentDate.getMinutes(),
            Day_Start: currentDate.getDate(),
            Month_Start: currentDate.getMonth() + 1,
            Year_Start: currentDate.getFullYear(),

            FullDate_End: currentDate,
            Hour_End: currentDate.getHours(),
            Min_End: currentDate.getMinutes(),
            Day_End: currentDate.getDate(),
            Month_End: currentDate.getMonth() + 1,
            Year_End: currentDate.getFullYear()
        };
    }

    _showDateTimePicker_Start = () =>
        this.setState({ isDateTimePickerVisible_Start: true });

    _hideDateTimePicker_Start = () =>
        this.setState({ isDateTimePickerVisible_Start: false });

    _handleDatePicked_Start = date => {
        this.setState({
            FullDate_Start: date,
            Hour_Start: date.getHours(),
            Min_Start: date.getMinutes(),
            Day_Start: date.getDate(),
            Month_Start: date.getMonth() + 1,
            Year_Start: date.getFullYear()
        });
        this._hideDateTimePicker_Start();
    };

    _showDateTimePicker_End = () =>
        this.setState({ isDateTimePickerVisible_End: true });

    _hideDateTimePicker_End = () =>
        this.setState({ isDateTimePickerVisible_End: false });

    _handleDatePicked_End = date => {
        this.setState({
            FullDate_End: date,
            Hour_End: date.getHours(),
            Min_End: date.getMinutes(),
            Day_End: date.getDate(),
            Month_End: date.getMonth() + 1,
            Year_End: date.getFullYear()
        });
        this._hideDateTimePicker_End();
    };

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
                        (Thời gian)
                    </Text>
                </View>
                <View style={GlobalStyles.content}>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 10
                        }}
                    >
                        <Text style={GlobalStyles.textStyleContent}>
                            Nhập thời gian:
                        </Text>
                        <View style={{ flex: 7, marginTop: 20 }}>
                            <View style={{ flex: 5 }}>
                                <View
                                    style={{
                                        flex: 5,
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        Từ
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Hour_Start}
                                        value={this.state.Hour_Start}
                                        onChange={value =>
                                            this.setState({ Hour_Start: value })
                                        }
                                        minValue={0}
                                        maxValue={23}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        {" "}
                                        :{" "}
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Min_Start}
                                        value={this.state.Min_Start}
                                        onChange={value =>
                                            this.setState({ Min_Start: value })
                                        }
                                        minValue={0}
                                        maxValue={59}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Icon
                                        name="clock"
                                        type="feather"
                                        size={42}
                                        onPress={this._showDateTimePicker_Start}
                                    />
                                    <DateTimePicker
                                        isVisible={
                                            this.state
                                                .isDateTimePickerVisible_Start
                                        }
                                        onConfirm={this._handleDatePicked_Start}
                                        onCancel={
                                            this._hideDateTimePicker_Start
                                        }
                                        date={this.state.FullDate_Start}
                                        mode="datetime"
                                        datePickerModeAndroid="spinner"
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 5,
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Day_Start}
                                        value={this.state.Day_Start}
                                        onChange={value =>
                                            this.setState({ Day_Start: value })
                                        }
                                        minValue={1}
                                        maxValue={30}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        {" "}
                                        /{" "}
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Month_Start}
                                        value={this.state.Month_Start}
                                        onChange={value =>
                                            this.setState({
                                                Month_Start: value
                                            })
                                        }
                                        minValue={1}
                                        maxValue={12}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        {" "}
                                        /{" "}
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Year_Start}
                                        value={this.state.Year_Start}
                                        onChange={value =>
                                            this.setState({ Year_Start: value })
                                        }
                                        minValue={1900}
                                        maxValue={3000}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    borderTopWidth: 3,
                                    borderTopColor: "#666666",
                                    width: "85%",
                                    alignSelf: "center"
                                }}
                            />
                            <View style={{ flex: 5, marginTop: 15 }}>
                                <View
                                    style={{
                                        flex: 5,
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        Đến
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Hour_End}
                                        value={this.state.Hour_End}
                                        onChange={value =>
                                            this.setState({ Hour_End: value })
                                        }
                                        minValue={0}
                                        maxValue={23}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        {" "}
                                        :{" "}
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Min_End}
                                        value={this.state.Min_End}
                                        onChange={value =>
                                            this.setState({ Min_End: value })
                                        }
                                        minValue={0}
                                        maxValue={59}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Icon
                                        name="clock"
                                        type="feather"
                                        size={42}
                                        onPress={this._showDateTimePicker_End}
                                    />
                                    <DateTimePicker
                                        isVisible={
                                            this.state
                                                .isDateTimePickerVisible_End
                                        }
                                        onConfirm={this._handleDatePicked_End}
                                        onCancel={this._hideDateTimePicker_End}
                                        date={this.state.FullDate_End}
                                        mode="datetime"
                                        datePickerModeAndroid="spinner"
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 5,
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Day_End}
                                        value={this.state.Day_End}
                                        onChange={value =>
                                            this.setState({ Day_End: value })
                                        }
                                        minValue={1}
                                        maxValue={30}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        {" "}
                                        /{" "}
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Month_End}
                                        value={this.state.Month_End}
                                        onChange={value =>
                                            this.setState({ Month_End: value })
                                        }
                                        minValue={1}
                                        maxValue={12}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            lineHeight: 42
                                        }}
                                    >
                                        {" "}
                                        /{" "}
                                    </Text>
                                    <NumericInput
                                        type="up-down"
                                        initValue={this.state.Year_End}
                                        value={this.state.Year_End}
                                        onChange={value =>
                                            this.setState({ Year_End: value })
                                        }
                                        minValue={1900}
                                        maxValue={3000}
                                        rounded={true}
                                        inputStyle={{ fontSize: 25 }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 3,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                marginBottom: 20
                            }}
                        >
                            <Button
                                type="outline"
                                title="Mặc định"
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

export default TimeFilterScreen;
