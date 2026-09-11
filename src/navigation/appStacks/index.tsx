import React from 'react';
import HomeStack from './HomeStack';
import ActivityStack from "./ActivityStack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator<any>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          height: 70,
          borderRadius: 20,
          backgroundColor: '#111827',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ActivityStack') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="ProfileStack"
        component={ActivityStack}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="ActivityStack"
        component={ActivityStack}
        options={{ tabBarLabel: 'Activity' }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
    </Tab.Navigator>
  );
}