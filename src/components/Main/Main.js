import React, { Component } from "react";
import { Button } from "react-native-elements";
import { moveToBottom } from "../common";
import AsyncStorage from "@react-native-community/async-storage";
import { YellowBox } from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    List,
    ListItem,
    View,
    Icon,
    Text
} from "native-base";
import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator
} from "react-navigation";
/*** Main Tabs Screens ***/
import TransactionScreen from "../TransactionScreen/TransactionScreen";
import AddTransaction from "../Transaction/Transaction";
import SPMainScreen from "../SpendingPlan/SPMainScreen";
/*** Sub Screens in Stacks***/
import ListOfPurpose from "../PurposeSelectScreen/ListOfPurpose";
import AdvancedSearchScreen from "../AdvancedSearch/screens/AdvancedSearch";
import SearchResultScreen from "../AdvancedSearch/screens/ResultScreen";
import SPRecordScreen from "../SpendingPlan/SPRecordScreen";

YellowBox.ignoreWarnings(["WebView"]);

const TransactionStack = createStackNavigator(
    {
        Transaction: TransactionScreen,
        AdvancedSearch: AdvancedSearchScreen,
        PurposeSelect: ListOfPurpose,
        SearchResult: SearchResultScreen
    },
    {
        initialRouteName: "Transaction",
        defaultNavigationOptions: {},
        headerMode: "none"
    }
);

const AddTransactionStack = createStackNavigator(
    {
        AddTransaction: AddTransaction,
        AdvancedSearch: AdvancedSearchScreen,
        PurposeSelect: ListOfPurpose
    },
    {
        initialRouteName: "AddTransaction",
        defaultNavigationOptions: {},
        headerMode: "none"
    }
);

const SpendingPlanStack = createStackNavigator(
  {
    SPMainScreen: SPMainScreen,
    SPRecordScreen: SPRecordScreen,
    PurposeSelect: ListOfPurpose
  },
  {
    initialRouteName: "SPMainScreen",
    defaultNavigationOptions: {},
    headerMode: "none"
  }
);

const TabNavigator = createBottomTabNavigator(
    {
        Transaction: {
            screen: TransactionStack,
            navigationOptions: ({ navigation }) => ({
                header: null,
                title: "Tổng quan",
                tabBarIcon: ({ tintColor }) => {
                    return (
                        <Icon
                            name="home"
                            type="FontAwesome5"
                            style={{ color: tintColor }}
                        />
                    );
                }
            })
        },
        AddTransaction: {
            screen: AddTransactionStack,
            navigationOptions: ({ navigation }) => ({
                header: null,
                tabBarLabel: () => {
                    return null;
                },
                tabBarIcon: ({ tintColor }) => {
                    return (
                        <Icon
                            name="pluscircle"
                            type="AntDesign"
                            style={{ color: tintColor, fontSize: 40 }}
                        />
                    );
                }
            })
        },
        SpendingPlan: {
            screen: SpendingPlanStack,
            navigationOptions: ({ navigation }) => ({
                header: null,
                title: "Lập kế hoạch",
                tabBarIcon: ({ tintColor }) => {
                    return (
                        <Icon
                            name="note"
                            type="SimpleLineIcons"
                            style={{ color: tintColor }}
                        />
                    );
                }
            })
        }
    },
    {
        initialRouteName: "Transaction",
        animationEnabled: true,
        tabBarOptions: {
            style: { elevation: 3, borderTopWidth: 0.5, borderTopColor: "#000" }
        }
    }
);

const TabAppContainer = createAppContainer(TabNavigator);

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <TabAppContainer />;
    }
}

export default Main;
