import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import ProfileScreen from '../../screens/app/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}