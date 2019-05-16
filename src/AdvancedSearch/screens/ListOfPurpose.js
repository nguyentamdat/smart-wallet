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
//import console = require("console");

export default class ListOfPurpose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPurpose: variables.allPurpose,
      purposeInList: [],
      isAllSelected: false
    };
  }

  async componentWillMount() {
    const savedPurposes = await AsyncStorage.getItem("@listPurpose");
    if (savedPurposes) {
      this.setState({
        listPurpose: JSON.parse(savedPurposes)
      });
    }

    this.setState({
      purposeInList: this.props.navigation.state.params.purposeInList,
      isAllSelected: this.props.navigation.state.params.isAllSelected
    });
  }

  _handlePurposePress = purpose => {
    // Change status
    this.state.listPurpose.forEach(p => {
      if (purpose.id === p.id) {
        p.gotten = !p.gotten;
      }
      return p;
    });
    this.setState({ listPurpose: this.state.listPurpose });
    // Add and remove
    const purposeInListIndex = this.state.purposeInList.findIndex(
      p => p.id === purpose.id
    );
    if (purposeInListIndex > -1) {
      this.setState({
        purposeInList: this.state.purposeInList.filter(p => p.id !== purpose.id)
      });
      this.props.navigation.state.params.deletePurpose(purpose);
    } else {
      this.setState({
        purposeInList: this.state.purposeInList.concat(purpose)
      });
      this.props.navigation.state.params. (purpose);
    }
  };

  _handleSelectAll = () => {
    if (this.state.isAllSelected) {
      this.state.listPurpose.forEach(purpose => {
        purpose.gotten = false;
        return purpose;
      });
      this.setState({ listPurpose: this.state.listPurpose });
      this.setState({ purposeInList: [] });
      this.state.listPurpose.forEach(purpose => {
        this.props.navigation.state.params.deletePurpose(purpose);
      });
    } else {
      this.state.listPurpose.forEach(purpose => {
        purpose.gotten = true;
        return purpose;
      });
      this.setState({ listPurpose: this.state.listPurpose });
      this.state.listPurpose.forEach(purpose => {
        let purpose1 = this.state.purposeInList;
        purpose1.push(purpose);
        this.setState({
          purposeInList: purpose1
        });

        this.props.navigation.state.params.addPurpose(purpose);
      });
      console.log(this.state.purposeInList);
    }
    this.state.isAllSelected = !this.state.isAllSelected;
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="Ionicons" name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ textTransform: "uppercase" }}>
              danh sách mục đích
            </Title>
          </Body>
        </Header>

        <Content>
          <List>
            {this.state.listPurpose.map(purpose => {
              return (
                <ListItem
                  noIndent
                  key={purpose.id}
                  onPress={() => this._handlePurposePress(purpose)}
                >
                  <View style={styles.iconListItem}>
                    <Button transparent style={{ alignSelf: "center" }}>
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
                        color: purpose.gotten ? "#bbb" : "#000"
                      }}
                    >
                      {purpose.name}
                    </Text>
                  </Body>
                  <Right style={{ marginRight: 15 }}>
                    <CheckBox
                      checked={purpose.gotten}
                      onPress={() => this._handlePurposePress(purpose)}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>

        <View style={styles.footer}>
          <Button
            iconLeft
            style={[styles.footerButton, { width: 165 }]}
            onPress={() => this._handleSelectAll()}
          >
            <Icon type="MaterialCommunityIcons" name="select-all" />
            {!this.state.isAllSelected && <Text>Chọn tất cả</Text>}
            {this.state.isAllSelected && <Text>Bỏ chọn</Text>}
          </Button>
          <Button
            iconLeft
            style={[styles.footerButton, { width: 165 }]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon type="Feather" name="check-circle" />
            <Text>Xác nhận</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
