import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import LoginScreen from '../screens/auth/schoolLogin/LoginScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';  
import ContinueAsScreen from '../screens/auth/ContinueAsScreen';
import StudentAdmissionFormScreen from '../screens/auth/studentAdmission/StudentAdmissionFormScreen';
import SchoolCodeScreen from '../screens/auth/SchoolCodeScreen';
import SplashScreen from '../screens/SplashScreen';
import AlumniFormScreen from '../screens/auth/alumni/AlumniFormScreen';
import AlumniAddedScreen from '../screens/auth/alumni/AlumniAddedScreen';
import JobOpeningScreen from '../screens/auth/jobOpening';
import JobDescriptionScreen from '../screens/auth/jobOpening/JobDescriptionScreen';
import JobFormScreen from '../screens/auth/jobOpening/JobFormScreen';
import JobAppliedScreen from '../screens/auth/jobOpening/JobAppliedScreen';
import ChooseRoleScreen from '../screens/auth/schoolLogin/ChooseRoleScreen';
import RegisterScreen from '../screens/auth/schoolLogin/RegisterScreen';

type AuthStackRouteName =
  | 'Splash'
  | 'Welcome'
  | 'ContinueAs'
  | 'StudentAdmissionForm'
  | 'Login'
  | 'JobOpening'
  | 'ChooseRole'

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ContinueAs: undefined;
  SchoolCode: {
    next_page: AuthStackRouteName;
  };

  // Student admission
  StudentAdmissionForm: {
    schoolCode: string;
  };

  // School login
  ChooseRole: {
    schoolCode: string
  };
  Login: {
    role: string;
    schoolCode: string;
  };
  Register: {
    role: string;
    schoolCode: string;
  };

  // Job opening
  JobOpening: {
    schoolCode: string
  };
  JobDescription: {
    jobId: string;
  };
  JobForm:{
    jobId: string
  };
  JobApplied: undefined;

  // Alumni
  AlumniForm: undefined;
  AlumniAdded: undefined;
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
      <Stack.Screen name="SchoolCode" component={SchoolCodeScreen} />

      {/* Student Admission */}
      <Stack.Screen name="StudentAdmissionForm" component={StudentAdmissionFormScreen} />


      {/* School Login */}
      <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />


      {/* Alumni */}
      <Stack.Screen name="AlumniForm" component={AlumniFormScreen} />
      <Stack.Screen name="AlumniAdded" component={AlumniAddedScreen} />

      {/* Job Opening */}
      <Stack.Screen name="JobOpening" component={JobOpeningScreen} />
      <Stack.Screen name="JobDescription" component={JobDescriptionScreen} />
      <Stack.Screen name="JobForm" component={JobFormScreen} />
      <Stack.Screen name="JobApplied" component={JobAppliedScreen} />

    </Stack.Navigator>
  );
}