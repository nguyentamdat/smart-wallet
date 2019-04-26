import React, { Component } from "react";
import { Text, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
//  Styles for global use
import GlobalStyles from "../styles/styles.js";

const purposeList = [
    {
        name: "Mua sắm đồ đạc",
        iconName: "sofa",
        iconType: "material-community"
    },
    {
        name: "Ăn uống",
        iconName: "hamburger",
        iconType: "material-community"
    },
    {
        name: "Đi lại",
        iconName: "map-marker",
        iconType: "material-community"
    },
    {
        name: "Học hành",
        iconName: "book-open-page-variant",
        iconType: "material-community"
    },
    {
        name: "Giao lưu, quan hệ",
        iconName: "handshake-o",
        iconType: "font-awesome"
    },
    {
        name: "Dịch vụ sinh hoạt",
        iconName: "live-tv",
        iconType: "material"
    },
    {
        name: "Sức khỏe",
        iconName: "heartbeat",
        iconType: "font-awesome"
    },
    {
        name: "Thuốc men",
        iconName: "medical-bag",
        iconType: "material-community"
    },
    {
        name: "Đồ chơi",
        iconName: "toys",
        iconType: "material"
    }
];

class PurposeFilterScreen extends Component {
    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            leftIcon={
                <Icon
                    name={item.iconName}
                    type={item.iconType}
                    size={32}
                    containerStyle={{ marginRight: 10 }}
                />
            }
            rightIcon={<Icon name="ios-arrow-forward" type="ionicon" />}
            titleStyle={{ fontSize: 20 }}
            containerStyle={{ borderBottomWidth: 1 }}
        />
    );
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
                        (Mục đích)
                    </Text>
                </View>
                <View style={GlobalStyles.content}>
                    <View
                        style={{
                            borderTopWidth: 3,
                            borderTopColor: "#666666",
                            width: "85%",
                            alignSelf: "center"
                        }}
                    />
                    <View style={GlobalStyles.ListBox}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={purposeList}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default PurposeFilterScreen;
