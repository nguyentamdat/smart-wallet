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
import styles from "../../components/AdvancedSearch/styles";

export default class ListOfExpenditurePurpose extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content padder>
                <List>
                    {this.props.listPurpose_E.map(purpose => {
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
                                    {!this.props.isSingleSelect && (
                                        <CheckBox
                                            checked={purpose.gotten}
                                            onPress={() => {
                                                this.props.purposePress(
                                                    purpose
                                                );
                                            }}
                                        />
                                    )}
                                </Right>
                            </ListItem>
                        );
                    })}
                </List>
            </Content>
        );
    }
}
