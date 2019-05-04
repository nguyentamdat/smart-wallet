import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { moveToBottom } from "../common";

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <Header
          containerStyle={{ paddingTop: 0 }}
          leftComponent={{
            type: "material-community",
            icon: "menu",
            color: "#fff"
          }}
          centerComponent={{
            text: "Trang chính",
            style: { color: "#fff", fontSize: 30 }
          }}
          rightComponent={{
            type: "material-community",
            icon: "bell",
            color: "#fff"
          }}
        />
        <Button
          title="Thêm Kế Hoạch"
          onPress={() => {
            this.props.navigation.navigate("Plan");
          }}
        />
        {moveToBottom(
          <Button
            icon={
              <Icon
                name="plus-circle"
                size={40}
                color="#fff"
                onPress={() => {
                  console.log("Pressed Button");
                  this.props.navigation.navigate("Transaction");
                }}
              />
            }
          />
        )}
      </View>
    );
  }
}

export default Main;
