import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const PetBar = ({ name, breed, age, picture }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert("Hello there");
      }}
      activeOpacity={0.7}
    >
      <View className="relative h-48  mb-4 rounded-lg overflow-hidden mx-4 ">
        {/* Pet Picture on the Right */}
        <Image
          source={{ uri: picture }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />

        {/* Gradient Background using expo-linear-gradient */}
        <LinearGradient
          colors={["#161622", "transparent"]}
          // style={{ position: "absolute", inset: 0 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            //   width: "100%",
            //   height: "100%",
          }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.7, y: 0.5 }}
        />

        {/* Pet Details on the Left */}
        <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Text className="text-white text-xl font-bold">{name}</Text>
          <Text className="text-gray-200 text-lg">{breed}</Text>
          <Text className="text-gray-200">{age} years old</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PetBar;
