import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import FeeScreen from '../../screens/app/fee/FeeScreen';

const Stack = createNativeStackNavigator();

export default function FeeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Fee" component={FeeScreen} />
    </Stack.Navigator>
  );
}