import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityScreen from '../../screens/app/activity/ActivityScreen';

const Stack = createNativeStackNavigator();

export default function ActivityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  );
}