import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import pets from "../../../constants/dummyData/petList";
import PetBar from "../../../components/PetBar";
import icons from "../../../constants/icons";

const Home = () => {
  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <PetBar
              name={item.name}
              breed={item.breed}
              age={item.age}
              picture={item.picture}
            />
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View className="my-6 px-7 space-y-8 flex-col">
              <View className="w-full flex-row justify-between items-center">
                <View>
                  <Text className="text-gray-100 text-md font-medium">
                    Welcome back
                  </Text>
                  <Text className="text-white text-2xl font-bold">user</Text>
                </View>
                <Image
                  source={icons.logo}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
