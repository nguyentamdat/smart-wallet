import React, { Component } from "react";
import { Text, View } from "react-native";
import { List, Button, Icon } from "native-base";

const ListTransactions = ({ props }) => {
  return (
    <List
      rightOpenValue={-75}
      renderRow={x => (
        <ListItem key={x.key} noIndent>
          <View style={styles.iconListItem}>
            <Button transparent style={{ alignSelf: "center" }}>
              <Icon
                active
                type={x.purpose.iconType}
                name={x.purpose.iconName}
              />
            </Button>
          </View>
          <Body
            style={{
              flexDirection: "column",
              flex: 1,
              alignContent: "flex-start"
            }}
          >
            <Text
              style={{
                color: x.purpose.isRevenue ? "#00cc44" : "#e60000",
                fontSize: 24
              }}
            >
              {x.amount}
            </Text>
            <Text>{x.purpose.name}</Text>
          </Body>
          <Right style={{ flex: 1 }}>
            <Text>{date.toLocaleDateString()}</Text>
            <Text>{date.toLocaleTimeString()}</Text>
          </Right>
        </ListItem>
      )}
      dataSource={props.listOfTransactions}
      renderRightHiddenRow={x => (
        <Button full danger onPress={x => {}}>
          <Icon active name="trash" />
        </Button>
      )}
    />
  );
};

export default ListTransactions;
