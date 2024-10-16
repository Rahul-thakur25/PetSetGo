import { Stack,SplashScreen } from "expo-router";
// import React,{useEffect}from 'react'
import { usePathname } from "expo-router";
import {useFonts} from 'expo-font'
import { useEffect } from "react";
import { StatusBar } from "react-native";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded,error])
  
  const pathname = usePathname();

  const isUserPath = pathname.startsWith("/user");
  console.log(pathname);
  console.log(isUserPath);
  if(!fontsLoaded && !error) return null;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="user"
        options={{ headerShown: isUserPath ? false : true }}
      />
      {/* <Stack.Screen name="user/home" options={{ headerShown: false }} /> */}
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      {/* <Stack.Screen name="user/home/index" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="search" options={{ headerShown: false }} /> */}
    
    </Stack>
    
  );
};
export default RootLayout;