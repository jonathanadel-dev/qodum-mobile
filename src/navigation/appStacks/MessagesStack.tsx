import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import MessageScreen from '../../screens/app/message/MessageScreen';
import ChatScreen from '../../screens/app/message/ChatScreen';

const Stack = createNativeStackNavigator();

export default function MessagesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}