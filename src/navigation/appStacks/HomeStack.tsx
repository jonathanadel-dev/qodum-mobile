import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import HomeScreen from '../../screens/app/home/HomeScreen';
import AssignmentsScreen from '../../screens/app/home/AssignmentsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Assignments" component={AssignmentsScreen} />
    </Stack.Navigator>
  );
}