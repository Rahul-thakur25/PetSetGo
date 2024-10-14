import { Text, View, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import Home from "./home";
import Community from "./community";
import Ecommerce from "./ecommerce";
import Profile from "./profile";

const UserLayout = () => {
  //   const TabIcon = ({ icon, color, focused, name }) => {
  //     return (
  //       <View className="items-center justify-center space-y-2">
  //         <Image
  //           source={icon}
  //           resizeMode="contain"
  //           tintColor={color}
  //           className="w-5 h-5"
  //         />
  //         <Text
  //           className={`${
  //             focused
  //               ? "font-psemibold text-secondary"
  //               : "font-pregular text-white"
  //           }`}
  //         >
  //           {name}
  //         </Text>
  //       </View>
  //     );
  //   };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            broderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              //   <TabIcon
              //     icon={icons.home}
              //     color={color}
              //     focused={focused}
              //     name="Home"
              //   />
              <Text className="text-white">Home</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="community/index"
          options={{
            title: "Community",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              //   <TabIcon
              //     icon={icons.bookmark}
              //     color={color}
              //     focused={focused}
              //     name="Bookmark"
              //   />
              <Text className="text-white">Community</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="ecommerce/index"
          options={{
            title: "E-Commerce",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              //   <TabIcon
              //     icon={icons.plus}
              //     color={color}
              //     focused={focused}
              //     name="Create"
              //   />
              <Text className="text-white">E commerce</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              //   <TabIcon
              //     icon={icons.profile}
              //     color={color}
              //     focused={focused}
              //     name="Profile"
              //   />
              <Text className="text-white">Profile</Text>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default UserLayout;
