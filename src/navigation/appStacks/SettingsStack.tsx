import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import SettingsScreen from '../../screens/app/settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}