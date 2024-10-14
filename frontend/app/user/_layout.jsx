import { Text, View, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import Home from "./home";
import Community from "./community";
import Ecommerce from "./ecommerce";

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
          name="home"
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
              <Home />
            ),
          }}
        />
        <Tabs.Screen
          name="community"
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
              <Community />
            ),
          }}
        />
        <Tabs.Screen
          name="ecommerce"
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
              <Ecommerce />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
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
              <Profile></Profile>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default UserLayout;
