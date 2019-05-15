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
import DateTimePicker from "react-native-modal-datetime-picker";

export default class SearchByTime extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        this.state = {
            isDatePickerVisible_Start: false,
            isDatePickerVisible_End: false,

            FullDate_Start: currentDate,
            Day_Start: currentDate.getDate(),
            Month_Start: currentDate.getMonth() + 1,
            Year_Start: currentDate.getFullYear(),

            FullDate_End: currentDate,
            Day_End: currentDate.getDate(),
            Month_End: currentDate.getMonth() + 1,
            Year_End: currentDate.getFullYear()
        };
    }
    _showDatePicker_Start = () =>
        this.setState({ isDatePickerVisible_Start: true });
    _hideDatePicker_Start = () => {
        this.setState({ isDatePickerVisible_Start: false });
        this.props.timeStartChange(this.state.FullDate_Start);
    };
    _handleDatePicked_Start = date => {
        this.setState({
            FullDate_Start: date,
            Day_Start: date.getDate(),
            Month_Start: date.getMonth() + 1,
            Year_Start: date.getFullYear()
        });
        this._hideDatePicker_Start();
    };

    _showDatePicker_End = () =>
        this.setState({ isDatePickerVisible_End: true });
    _hideDatePicker_End = () => {
        this.setState({ isDatePickerVisible_End: false });
        this.props.timeEndChange(this.state.FullDate_End);
    };
    _handleDatePicked_End = date => {
        this.setState({
            FullDate_End: date,
            Day_End: date.getDate(),
            Month_End: date.getMonth() + 1,
            Year_End: date.getFullYear()
        });
        this._hideDatePicker_End();
    };
    render() {
        return (
            <Content>
                <Separator bordered style={styles.separator}>
                    <Text style={styles.separatorText}>Thời gian</Text>
                </Separator>
                <ListItem noIndent>
                    <View style={styles.DatePickerStartContainer}>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible_Start}
                            onConfirm={this._handleDatePicked_Start}
                            onCancel={this._hideDatePicker_Start}
                            mode="date"
                            datePickerModeAndroid="calendar"
                        />
                        <Button
                            full
                            transparent
                            iconLeft
                            onPress={this._showDatePicker_Start}
                        >
                            <Icon type="FontAwesome" name="calendar" />
                            <Text style={styles.DateText}>
                                {this.state.Day_Start}/{this.state.Month_Start}/
                                {this.state.Year_Start}
                            </Text>
                        </Button>
                    </View>
                    <View style={styles.rowSeparator}>
                        <Text style={{ alignSelf: "center" }}>-</Text>
                    </View>
                    <View style={styles.DatePickerEndContainer}>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible_End}
                            onConfirm={this._handleDatePicked_End}
                            onCancel={this._hideDatePicker_End}
                            mode="date"
                            datePickerModeAndroid="calendar"
                        />
                        <Button
                            full
                            transparent
                            iconRight
                            onPress={this._showDatePicker_End}
                        >
                            <Text style={styles.DateText}>
                                {this.state.Day_End}/{this.state.Month_End}/
                                {this.state.Year_End}
                            </Text>
                            <Icon type="FontAwesome" name="calendar" />
                        </Button>
                    </View>
                </ListItem>
            </Content>
        );
    }
}
