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
import MainView from "../SpendingPlan/MainView";
/*** Sub Screens in Stacks***/
import ListOfPurpose from "../PurposeSelectScreen/ListOfPurpose";
import AdvancedSearchScreen from "../AdvancedSearch/screens/AdvancedSearch";
import SearchResultScreen from "../AdvancedSearch/screens/ResultScreen";
import NotificationScreen from "../NotificationScreen/index";
import RecordView from "../SpendingPlan/RecordView";

YellowBox.ignoreWarnings(["WebView"]);

const TransactionStack = createStackNavigator(
  {
    Transaction: TransactionScreen,
    AdvancedSearch: AdvancedSearchScreen,
    PurposeSelect: ListOfPurpose,
    NotificationView: NotificationScreen,
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
    SPMainScreen: MainView,
    SPRecordScreen: RecordView
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
    this.state = {
      tabOverview: true,
      tabAdd: false,
      tabPlan: false
    };
  }

  render() {
    return (
      <TabAppContainer />
      // <Container>
      //     <Header>
      //         <Body>
      //             <Title style={{ textTransform: "uppercase" }}>
      //                 Màn hình chính
      //             </Title>
      //         </Body>
      //         <Right>
      //             <Button
      //                 transparent
      //                 onPress={() =>
      //                     this.props.navigation.navigate(
      //                         "NotificationView"
      //                     )
      //                 }
      //             >
      //                 <Icon name="bell" type="MaterialCommunityIcons" />
      //             </Button>
      //         </Right>
      //     </Header>

      //     <Content />

      //     <Footer>
      //         <FooterTab>
      //             <Button
      //                 active={this.state.tabOverview}
      //                 onPress={() => this.toggleTabOvervew()}
      //             >
      //                 <Icon
      //                     active={this.state.tabOverview}
      //                     type="FontAwesome"
      //                     name="home"
      //                 />
      //                 <Text>Tổng quan</Text>
      //             </Button>
      //         </FooterTab>

      //         <FooterTab>
      //             <Button
      //                 active={this.state.tabAdd}
      //                 onPress={() => this.toggleTabAdd()}
      //             >
      //                 <Icon
      //                     active={this.state.tabAdd}
      //                     type="AntDesign"
      //                     name="pluscircle"
      //                 />
      //             </Button>
      //         </FooterTab>

      //         <FooterTab>
      //             <Button
      //                 active={this.state.tabPlan}
      //                 onPress={() => this.tabPlan()}
      //             >
      //                 <Icon
      //                     active={this.state.tabPlan}
      //                     type="AntDesign"
      //                     name="pluscircle"
      //                 />
      //             </Button>
      //         </FooterTab>
      //     </Footer>
      //     <View style={{ flex: 1, justifyContent: "center" }}>
      //         {/* <Header
      //             containerStyle={{ paddingTop: 0 }}
      //             leftComponent={{
      //                 type: "material-community",
      //                 icon: "menu",
      //                 color: "#fff"
      //             }}
      //             centerComponent={{
      //                 text: "Màn hình chính",
      //                 style: { color: "#fff", fontSize: 30 }
      //             }}
      //             rightComponent={{
      //                 type: "material-community",
      //                 icon: "bell",
      //                 color: "#fff",
      //                 onPress: () =>
      //                     this.props.navigation.navigate(
      //                         "NotificationView"
      //                     )
      //             }}
      //         /> */}
      //         <Button
      //             title="Thêm Kế Hoạch"
      //             onPress={() => {
      //                 this.props.navigation.navigate("SPMainScreen");
      //             }}
      //         />
      //         <Button
      //             title="Tìm kiếm nâng cao"
      //             onPress={() => {
      //                 this.props.navigation.navigate("AdvancedSearch");
      //             }}
      //         />
      //         <List />
      //         {moveToBottom(
      //             <Button
      //                 icon={
      //                     <Icon
      //                         name="plus-circle"
      //                         size={40}
      //                         color="#fff"
      //                         onPress={() => {
      //                             console.log("Pressed Button");
      //                             this.props.navigation.navigate(
      //                                 "Transaction"
      //                             );
      //                         }}
      //                     />
      //                 }
      //                 buttonStyle={{
      //                     width: 60,
      //                     height: 60,
      //                     alignSelf: "center",
      //                     margin: 0
      //                 }}
      //             />
      //         )}
      //     </View>
      // </Container>
    );
  }
}

export default Main;
