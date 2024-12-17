import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import GradientHeader from '@/components/GrdientHeader';


export default function TabLayout() {
  const colorScheme = useColorScheme();
 const user = null



  if (!user) { 
    return<Redirect href='/auth/signin'/>
  }




  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown : true,
          header: () => <GradientHeader/>,
          title: 'Chats',
          tabBarIcon: ({ color }) => <Entypo name="chat" size={24} color={color}
          />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
