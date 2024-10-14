import { Stack } from "expo-router";
import { usePathname } from "expo-router";
const RootLayout = () => {
  const pathname = usePathname();

  const isUserPath = pathname.startsWith("/user");
  console.log(pathname);
  console.log(isUserPath);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="user"
        options={{ headerShown: isUserPath ? false : true }}
      />
      {/* <Stack.Screen name="user/home/index" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="search" options={{ headerShown: false }} /> */}
    </Stack>
  );
};
export default RootLayout;
