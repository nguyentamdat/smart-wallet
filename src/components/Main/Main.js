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
import TransactionScreen from "../TransactionScreen/TransactionScreen";
YellowBox.ignoreWarnings(["WebView"]);

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabOverview: true,
            tabAdd: false,
            tabPlan: false
        };
    }
    toggleTabOvervew() {
        this.setState({
            tabOverview: true,
            tabAdd: false,
            tabPlan: false
        });
    }
    toggleTabAdd() {
        this.setState({
            tabOverview: false,
            tabAdd: true,
            tabPlan: false
        });
    }
    toggleTabPlan() {
        this.setState({
            tabOverview: false,
            tabAdd: false,
            tabPlan: true
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title style={{ textTransform: "uppercase" }}>
                            Màn hình chính
                        </Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() =>
                                this.props.navigation.navigate(
                                    "NotificationView"
                                )
                            }
                        >
                            <Icon name="bell" type="MaterialCommunityIcons" />
                        </Button>
                    </Right>
                </Header>

                <Content />

                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.tabOverview}
                            onPress={() => this.toggleTabOvervew()}
                        >
                            <Icon
                                active={this.state.tabOverview}
                                type="FontAwesome"
                                name="home"
                            />
                            <Text>Tổng quan</Text>
                        </Button>
                    </FooterTab>

                    <FooterTab>
                        <Button
                            active={this.state.tabAdd}
                            onPress={() => this.toggleTabAdd()}
                        >
                            <Icon
                                active={this.state.tabAdd}
                                type="AntDesign"
                                name="pluscircle"
                            />
                        </Button>
                    </FooterTab>

                    <FooterTab>
                        <Button
                            active={this.state.tabPlan}
                            onPress={() => this.tabPlan()}
                        >
                            <Icon
                                active={this.state.tabPlan}
                                type="AntDesign"
                                name="pluscircle"
                            />
                        </Button>
                    </FooterTab>
                </Footer>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {/* <Header
                        containerStyle={{ paddingTop: 0 }}
                        leftComponent={{
                            type: "material-community",
                            icon: "menu",
                            color: "#fff"
                        }}
                        centerComponent={{
                            text: "Màn hình chính",
                            style: { color: "#fff", fontSize: 30 }
                        }}
                        rightComponent={{
                            type: "material-community",
                            icon: "bell",
                            color: "#fff",
                            onPress: () =>
                                this.props.navigation.navigate(
                                    "NotificationView"
                                )
                        }}
                    /> */}
                    <Button
                        title="Thêm Kế Hoạch"
                        onPress={() => {
                            this.props.navigation.navigate("SPMainScreen");
                        }}
                    />
                    <Button
                        title="Tìm kiếm nâng cao"
                        onPress={() => {
                            this.props.navigation.navigate("AdvancedSearch");
                        }}
                    />
                    <List />
                    {moveToBottom(
                        <Button
                            icon={
                                <Icon
                                    name="plus-circle"
                                    size={40}
                                    color="#fff"
                                    onPress={() => {
                                        console.log("Pressed Button");
                                        this.props.navigation.navigate(
                                            "Transaction"
                                        );
                                    }}
                                />
                            }
                            buttonStyle={{
                                width: 60,
                                height: 60,
                                alignSelf: "center",
                                margin: 0
                            }}
                        />
                    )}
                </View>
            </Container>
        );
    }
}

export default Main;
