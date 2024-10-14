import { View, Text, Link, TouchableOpacity } from "react-native";
import React from "react";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const index = () => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          className="bg-black p-3 rounded-3xl mb-3"
          onPress={() => router.push("/user/home")}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
        <Text>index</Text>
      </View>
    </SafeAreaView>
  );
};

export default index;
