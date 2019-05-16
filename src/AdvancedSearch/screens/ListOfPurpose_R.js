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
    View,
    CheckBox
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import variables from "../../variables/allPurpose";
import styles from "../styles";

export default class ListOfRevenuePurpose extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content padder>
                <List>
                    {this.props.listPurpose_R.map(purpose => {
                        return (
                            <ListItem
                                noIndent
                                key={purpose.id}
                                onPress={() => this.props.purposePress(purpose)}
                            >
                                <View style={styles.iconListItem}>
                                    <Button
                                        transparent
                                        style={{ alignSelf: "center" }}
                                    >
                                        <Icon
                                            active
                                            type={purpose.iconType}
                                            name={purpose.iconName}
                                        />
                                    </Button>
                                </View>
                                <Body>
                                    <Text
                                        style={{
                                            color: purpose.gotten
                                                ? "#bbb"
                                                : "#000"
                                        }}
                                    >
                                        {purpose.name}
                                    </Text>
                                </Body>
                                <Right style={{ marginRight: 15 }}>
                                    <CheckBox
                                        checked={purpose.gotten}
                                        onPress={() =>
                                            this.props.purposePress(purpose)
                                        }
                                    />
                                </Right>
                            </ListItem>
                        );
                    })}
                </List>
            </Content>
        );
    }
}
