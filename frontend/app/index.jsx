import { View, Text } from "react-native";
import React from "react";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const index = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
