// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  // Kiểm tra trạng thái đăng nhập Firebase khi app khởi động
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setInitialRoute(user ? "login-register/login-activity" : "(tabs)");
    });
    return unsubscribe;
  }, []);

  if (!initialRoute) {
    // Hiển thị loading trong lúc check auth
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        {/* Login / Register */}
        <Stack.Screen
          name="login-register/login-activity"
          options={{ title: "Login", presentation: "modal" }}
        />
        <Stack.Screen
          name="login-register/register-activity"
          options={{ title: "Register", presentation: "modal" }}
        />

        {/* Tabs */}
        <Stack.Screen name="(tabs)" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
