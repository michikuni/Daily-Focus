import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="today"
        options={{
          title: 'Hôm nay',
          tabBarIcon: ({ color }) => <FontAwesome5 size={24} name="calendar-day" color={color} />,
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: 'Đã hoàn thành',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="calendar-check-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tất cả',
          tabBarIcon: ({ color }) => <Entypo size={24} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
