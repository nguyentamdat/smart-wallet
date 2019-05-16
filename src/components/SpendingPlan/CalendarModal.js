import React, { Component } from 'react';
import {
    AppResistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput,
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Row } from 'native-base';
import firebase from 'react-native-firebase';
//import console = require('console');
//import console = require('console');

var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // newCategory: '',
            // newAmount: '',
            // newDescription: '',

            selectedDate: null,
            buttonState: '',
            startDay: null,
            endDay: null,
            minStartDay: null,
        }
    }


    showCalendarModal = (ref_recordView, button_state) => {
        this.setState({buttonState: button_state})
        if (button_state == 'end') {
            this.setState({minStartDay: ref_recordView.state.start_day_state});
        }
        else {
            var date = new Date().getDate();
            if (date < 10) {date = '0' + date}
            var month = new Date().getMonth()+1;
            if (month < 10) {month = '0'+month};
            var year = new Date().getFullYear();
            minDay = year + '-' + month + '-' + date;
            console.log({minDay});
            this.setState({minStartDay: minDay})
        }
        this.refs.myModal.open();
    }
    render() {

        return (
            <Modal
                ref={'myModal'}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 20,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 400, //280
                }}
                position='center'
                backdrop={true}
                backdropPressToClose={false}
                swipeToClose={true}
                onClosed={() => {
                    //alert("Modal closed");
                }}
            >

                <View style={{
                    backgroundColor: 'lightcoral',
                    height: 400,
                }}>

                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 0,
                        color: 'white',
                    }}>Chọn ngày
                    </Text>

                    <Calendar
                    markedDates={{[this.state.selectedDate]:{selected: true},}}
                    onDayPress={(day) => {
                        this.setState({
                            selectedDate: day.dateString
                            });
                        if (this.state.buttonState=='start') {
                            this.setState({startDay: day});
                        }
                        if (this.state.buttonState=='end') {
                            this.setState({endDay: day});
                        }
                        
                        }}
                    minDate={this.state.minStartDay}
                    >

                    </Calendar>
                    

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button
                        style={{ fontSize: 18, color: 'white' }}
                        containerStyle={{
                            padding: 5,
                            //height: 40,
                            borderRadius: 6,
                            backgroundColor: 'limegreen',
                            margin: 5,
                            marginTop: 15,
                            width: 70,

                        }}
                        onPress={
                            () => {
                                // alert('da bam Cancel')
                                this.refs.myModal.close()
                            }
                        }
                    >
                        Cancel
                    </Button>
                    

                    <Button
                        style={{ fontSize: 18, color: 'white' }}
                        containerStyle={{
                            padding: 5,
                            //height: 40,
                            borderRadius: 6,
                            backgroundColor: 'limegreen',
                            margin: 5,
                            marginTop: 15,
                            width: 70,

                        }}
                        onPress={
                            () => {
                                if (this.state.buttonState=='start') {
                                    this.props.parentFlatList.setState({
                                    //start_day_text: (this.state.day_s+'-'+this.state.month_s+'-'+this.state.year_s),
                                    start_day_text: this.state.startDay.day + '-' + this.state.startDay.month
                                    + '-' + this.state.startDay.year,
                                    start_day_state: this.state.startDay
                                    });

                                    firebase.firestore().collection('SPRecordList').doc(this.props.SPRecord_id).update({
                                        start_day: this.state.startDay
                                    })
                                  
                                } 
                                if (this.state.buttonState == 'end') {
                                    this.props.parentFlatList.setState({
                                    end_day_text: (this.state.endDay.day+'-'+this.state.endDay.month+'-'+this.state.endDay.year),
                                    end_day_state: this.state.endDay
                                    })

                                    firebase.firestore().collection('SPRecordList').doc(this.props.SPRecord_id).update({
                                        end_day: this.state.endDay
                                    })
                                } 
                                this.refs.myModal.close()
                            }
                        }
                    >
                        Save
                    </Button>

                    </View>

                </View>

            </Modal>
        )
    }
}