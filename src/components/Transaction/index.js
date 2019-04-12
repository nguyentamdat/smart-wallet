import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class Transaction extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Input placeholder="Amount" />
        <Input
          placeholder="INPUT WITH ICON"
          leftIcon={{ type: "font-awesome", name: "chevron-left" }}
        />
        <Input
          placeholder="INPUT WITH CUSTOM ICON"
          leftIcon={<Icon name="user" size={24} color="black" />}
        />
      </View>
    );
  }
}

export default Transaction;
import { Button, ThemeProvider } from "react-native-elements";

const MyApp = () => {
  return (
    <ThemeProvider>
      <Button title="Hey!" />
    </ThemeProvider>
  );
};
