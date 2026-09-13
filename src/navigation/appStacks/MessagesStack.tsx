import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import MessagsScreen from '../../screens/app/messages/MessagesScreen';

const Stack = createNativeStackNavigator();

export default function MessagesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Messages" component={MessagsScreen} />
    </Stack.Navigator>
  );
}