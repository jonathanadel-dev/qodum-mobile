import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import FeeScreen from '../../screens/fee/FeeScreen';
import FeeDetailsScreen from '../../screens/fee/FeeDetailsScreen';

const Stack = createNativeStackNavigator();

export default function FeeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Fee" component={FeeScreen} />
      <Stack.Screen name="FeeDetails" component={FeeDetailsScreen} />
    </Stack.Navigator>
  );
}