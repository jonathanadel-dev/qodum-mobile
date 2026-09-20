import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../../screens/app/notification/NotificationScreen';
import NotificationDetailsScreen from '../../screens/app/notification/NotificationDetailsScreen';

const Stack = createNativeStackNavigator();

export default function NotficationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="NotificationDetails" component={NotificationDetailsScreen} />
    </Stack.Navigator>
  );
}