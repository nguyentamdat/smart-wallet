import React from "react";
import { View } from "react-native";

const moveToBottom = component => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 36 }}>
      {component}
    </View>
  );
};

export { moveToBottom };
