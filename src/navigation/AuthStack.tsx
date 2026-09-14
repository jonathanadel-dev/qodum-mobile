import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';  
import ContinueAsScreen from '../screens/auth/ContinueAsScreen';
import StudentAdmissionFormScreen from '../screens/auth/studentAdmission/AdmissionFormScreen';


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ContinueAs" component={ContinueAsScreen} />

      {/* Student Admission */}
      <Stack.Screen name="StudentAdmissionForm" component={StudentAdmissionFormScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}