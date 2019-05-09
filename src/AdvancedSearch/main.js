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
    View
} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AdvancedSearchScreen from "./screens/AdvancedSearch";
import ListOfPurpose from "./screens/ListOfPurpose";
import styles from "./styles";

const AppNavigator = createStackNavigator({
    AdvancedSearch: {
        screen: AdvancedSearchScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    ListOfPurpose: {
        screen: ListOfPurpose,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
});
const AppContainer = createAppContainer(AppNavigator);

export default class AdvancedSearch extends Component {
    constructor() {
        super();
    }
    render() {
        return <AppContainer />;
    }
}
