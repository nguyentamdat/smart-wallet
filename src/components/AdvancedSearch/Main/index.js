import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";
//  All child-component
import MoneyFilterScreen from "../MoneyFilter";
import PurposeFilterScreen from "../PurposeFilter";
import TimeFilterScreen from "../TimeFilter";
import NoteFilterScreen from "../NoteFilter";
//  Styles for global use
import GlobalStyles from "../styles/styles.js";

class MainSearchScreen extends Component {
    render() {
        return (
            <View style={GlobalStyles.container}>
                <View style={GlobalStyles.header}>
                    <Text
                        style={{
                            fontSize: 45,
                            fontStyle: "italic",
                            fontWeight: "bold"
                        }}
                    >
                        Tìm kiếm nâng cao
                    </Text>
                </View>
                <View style={GlobalStyles.filterList}>
                    <Button
                        title="Số tiền"
                        type="outline"
                        buttonStyle={GlobalStyles.buttons}
                        containerStyle={GlobalStyles.buttonContainer}
                        titleStyle={GlobalStyles.buttonText}
                        onPress={() =>
                            this.props.navigation.navigate("MoneyFilter")
                        }
                    />
                    <Button
                        title="Mục đích"
                        type="outline"
                        buttonStyle={GlobalStyles.buttons}
                        containerStyle={GlobalStyles.buttonContainer}
                        titleStyle={GlobalStyles.buttonText}
                        onPress={() =>
                            this.props.navigation.navigate("PurposeFilter")
                        }
                    />
                    <Button
                        title="Thời gian"
                        type="outline"
                        buttonStyle={GlobalStyles.buttons}
                        containerStyle={GlobalStyles.buttonContainer}
                        titleStyle={GlobalStyles.buttonText}
                        onPress={() =>
                            this.props.navigation.navigate("TimeFilter")
                        }
                    />
                    <Button
                        title="Ghi chú"
                        type="outline"
                        buttonStyle={GlobalStyles.buttons}
                        containerStyle={GlobalStyles.buttonContainer}
                        titleStyle={GlobalStyles.buttonText}
                        onPress={() =>
                            this.props.navigation.navigate("NoteFilter")
                        }
                    />
                </View>
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Main: MainSearchScreen,
        MoneyFilter: MoneyFilterScreen,
        PurposeFilter: PurposeFilterScreen,
        TimeFilter: TimeFilterScreen,
        NoteFilter: NoteFilterScreen
    },
    {
        initialRouteName: "Main"
    }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
