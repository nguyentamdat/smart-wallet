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
import SearchByMoney from "./screens/SearchByMoney.js";
import SearchByPurpose from "./screens/SearchByPurpose.js";
import SearchByTime from "./screens/SearchByTime.js";
import SearchByNote from "./screens/SearchByNote.js";
import styles from "./styles.js";

export default class AdvancedSearch extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ textTransform: "uppercase" }}>
                            tìm kiếm nâng cao
                        </Title>
                    </Body>
                </Header>

                <Content>
                    <SearchByMoney />
                    <SearchByPurpose />
                    <SearchByTime />
                    <SearchByNote />
                </Content>

                <View style={styles.footer}>
                    <Button iconLeft style={styles.footerButton}>
                        <Icon type="AntDesign" name="reload1" />
                        <Text>Mặc định</Text>
                    </Button>
                    <Button iconLeft style={styles.footerButton}>
                        <Icon type="AntDesign" name="search1" />
                        <Text>Xác nhận</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
