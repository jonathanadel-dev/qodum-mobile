import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';  
import ContinueAsScreen from '../screens/auth/ContinueAsScreen';
import StudentAdmissionFormScreen from '../screens/auth/StudentAdmissionFormScreen';
import SchoolCodeScreen from '../screens/auth/SchoolCodeScreen';
import SplashScreen from '../screens/SplashScreen';
import AlumniFormScreen from '../screens/auth/alumni/AlumniFormScreen';
import AlumniAddedScreen from '../screens/auth/alumni/AlumniAddedScreen';

type AuthStackRouteName =
  | 'Splash'
  | 'Welcome'
  | 'ContinueAs'
  | 'StudentAdmissionForm'
  | 'Login';

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ContinueAs: undefined;
  SchoolCode: {
    next_page: AuthStackRouteName;
  };
  StudentAdmissionForm: {
    schoolCode: string;
  };
  Login: {
    schoolCode: string
  };
  AlumniForm: undefined;
  AlumniAdded: undefined
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

      {/* Login */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Alumni */}
      <Stack.Screen name="AlumniForm" component={AlumniFormScreen} />
      <Stack.Screen name="AlumniAdded" component={AlumniAddedScreen} />

    </Stack.Navigator>
  );
}