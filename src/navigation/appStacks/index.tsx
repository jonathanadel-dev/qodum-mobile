import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors, radii, spacing, typography } from '../../styles/theme';
import { commonStyles } from '../../styles/common';
// Stacks
import HomeStack from './HomeStack';
import ActivityStack from './ActivityStack';
import MessagesStack from './MessagesStack';
import SettingsStack from './SettingsStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator<any>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          left: 10,
          right: 10,
          height: 70,
          backgroundColor: '#ECEFF2',
          borderTopWidth: 2,
          elevation: 0
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarActiveTintColor: '#1E7CF5',
        tabBarInactiveTintColor: '#889cb5',
        tabBarIcon: ({ focused }) => {

          const isHomeTab = route.name === 'HomeStack';

          const iconMap: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
            HomeStack: 'home',
            ActivityStack: focused ? 'notifications' : 'notifications-outline',
            MessagesStack: focused ? 'chatbubble' : 'chatbubble-outline',
            SettingsStack: focused ? 'settings' : 'settings-outline',
            ProfileStack: focused ? 'person' : 'person-outline',
          };

          const iconName = iconMap[route.name];
          const iconColor = focused ? '#1E7CF5' : '#889cb5'

          if (isHomeTab) {
            return (
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 100,
                  backgroundColor: '#1E7CF5',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons
                  name='home'
                  size={28}
                  color="#FFFFFF"
                />
              </View>
            );
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {/* {route.name === 'ActivityStack' && !focused ? (
                <View
                  style={{
                    position: 'absolute',
                    left: 8,
                    top: -4,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: colors.danger,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                    zIndex: 2,
                    borderWidth: 2,
                    borderColor: colors.background,
                  }}
                >
                  <Ionicons name="notifications" size={8} color="#FFFFFF" />
                </View>
              ) : null} */}

              <Ionicons name={iconName} size={24} color={iconColor} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
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
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="MessagesStack"
        component={MessagesStack}
        options={{ tabBarLabel: 'Messages' }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}