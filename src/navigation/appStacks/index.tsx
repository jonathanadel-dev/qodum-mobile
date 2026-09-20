// navigation/app/index.tsx (AppTabs)
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
// Stacks
import HomeStack from './HomeStack';
import NotificationStack from './NotificationStack';
import MessagesStack from './MessagesStack';
import FeeStack from './FeeStack';
import ProfileStack from './ProfileStack';
import { colors } from '../../styles/theme';

const Tab = createBottomTabNavigator<any>();

const SHOWN_TAB_BAR_ROUTES: Record<string, string[]> = {
  HomeStack: ['Home'],
  NotificationStack: ['Notification'],
  MessagesStack: ['Messages'],
  FeeStack: ['Fee'],
  ProfileStack: ['Profile'],
};

const TAB_BAR_STYLE = {
  position: 'absolute' as const,
  left: 10,
  right: 10,
  height: 70,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 0,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 8,
};

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName='HomeStack'
      screenOptions={({ route }) => {
        const focusedRouteName = getFocusedRouteNameFromRoute(route) ?? '';
        const shownRoutes = SHOWN_TAB_BAR_ROUTES[route.name] ?? [];
        // Before any nested navigation happens, focusedRouteName is '' —
        // treat that as "still on the root screen" so the bar shows by
        // default on first mount, not just after an explicit match.
        const shouldShowTabBar = focusedRouteName === '' || shownRoutes.includes(focusedRouteName);

        return {
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: shouldShowTabBar ? TAB_BAR_STYLE : { display: 'none' },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 2,
          },
          tabBarActiveTintColor: colors.gradientEnd,
          tabBarInactiveTintColor: colors.hash,
          tabBarIcon: ({ focused }) => {

            const isHomeTab = route.name === 'HomeStack';

            const iconMap: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
              HomeStack: 'home',
              NotificationStack: focused ? 'notifications' : 'notifications-outline',
              MessagesStack: focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline',
              FeeStack: 'logo-usd',
              ProfileStack: focused ? 'person' : 'person-outline',
            };

            const iconName = iconMap[route.name];
            const iconColor = focused ? colors.gradientEnd : colors.hash

            if (isHomeTab) {
              return (
                <View
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 100,
                    backgroundColor: colors.gradientEnd,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 30,
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
                <Ionicons name={iconName} size={24} color={iconColor} />
              </View>
            );
          },
        };
      }}
    >
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="NotificationStack"
        component={NotificationStack}
        options={{ tabBarLabel: 'Notification' }}
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
        name="FeeStack"
        component={FeeStack}
        options={{ tabBarLabel: 'Fee' }}
      />
    </Tab.Navigator>
  );
}