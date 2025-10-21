import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen
          name="login-register/login-activity"
          options={{
            title: "Login",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="login-register/register-activity"
          options={{
            title: "Register",
            presentation: "modal",
          }}
        /> */}
        {/* <Stack.Screen
          name="home/home-activity"
          options={{
            title: "Home Activity",
            presentation: "modal",
        }}
        /> */}
        <Stack.Screen
          name="(tabs)"
        />
      </Stack>
    
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
