import { View, Text, Image } from "react-native";
import React from "react";

const TabIcon = ({ name, icon, color, focused }) => {
  return (
    <View className="items-center justify-center space-y-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className={`${
          focused ? "font-semibold text-[#4DB6AC]" : "font-regular text-white"
        }`}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
