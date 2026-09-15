import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';  
import ContinueAsScreen from '../screens/auth/ContinueAsScreen';
import StudentAdmissionFormScreen from '../screens/auth/studentAdmission/StudentAdmissionFormScreen';
import SchoolCodeScreen from '../screens/auth/SchoolCodeScreen';
import SplashScreen from '../screens/SplashScreen';

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ContinueAs: undefined;
  SchoolCode: undefined;
  StudentAdmissionForm: {
    schoolCode: string;
  };
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {


  return (
    <Stack.Navigator
      initialRouteName='Splash'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ContinueAs" component={ContinueAsScreen} />

      {/* School code */}
      <Stack.Screen name="SchoolCode" component={SchoolCodeScreen} />

      {/* Student Admission */}
      <Stack.Screen name="StudentAdmissionForm" component={StudentAdmissionFormScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}