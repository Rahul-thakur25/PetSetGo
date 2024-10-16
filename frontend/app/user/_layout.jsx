import { Text, View, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import Home from "./home";
import Community from "./community";
import Ecommerce from "./ecommerce";
import Profile from "./profile";
import TabIcon from "../../components/TabIcon";
import icons from "../../constants/icons";

const UserLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#4DB6AC",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            broderTopColor: "#000000",
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
              <TabIcon
                name="Home"
                icon={icons.home}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="community/index"
          options={{
            title: "Community",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Community"
                icon={icons.community}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ecommerce/index"
          options={{
            title: "E-Commerce",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="E Commerce"
                icon={icons.ecommerce}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Profile"
                icon={icons.profile}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default UserLayout;
