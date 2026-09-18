import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import LoginScreen from '../screens/auth/schoolLogin/LoginScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';  
import ContinueAsScreen from '../screens/auth/ContinueAsScreen';
import StudentAdmissionFormScreen from '../screens/auth/studentAdmission/StudentAdmissionFormScreen';
import SchoolCodeScreen from '../screens/auth/schoolCode/SchoolCodeScreen';
import SplashScreen from '../screens/SplashScreen';
import AlumniFormScreen from '../screens/auth/alumni/AlumniFormScreen';
import AlumniAddedScreen from '../screens/auth/alumni/AlumniAddedScreen';
import JobOpeningScreen from '../screens/auth/jobOpening';
import JobDescriptionScreen from '../screens/auth/jobOpening/JobDescriptionScreen';
import JobFormScreen from '../screens/auth/jobOpening/JobFormScreen';
import JobAppliedScreen from '../screens/auth/jobOpening/JobAppliedScreen';
import ChooseRoleScreen from '../screens/auth/schoolLogin/ChooseActionScreen';
import RegisterScreen from '../screens/auth/schoolLogin/RegisterScreen';
import StudentAdmissionScreen from '../screens/auth/studentAdmission';
import StudentAdmissionProcedureScreen from '../screens/auth/studentAdmission/StudentAdmissionProcedureScreen';
import StudentAdmittedScreen from '../screens/auth/studentAdmission/StudentAdmittedScreen';
import TrackApplicationScreen from '../screens/auth/studentAdmission/TrackApplicationScreen';
import SchoolSearchScreen from '../screens/auth/schoolCode/SchoolSearchScreen';
import { SchoolType } from '../lib/api/schoolApi';
import ChooseActionScreen from '../screens/auth/schoolLogin/ChooseActionScreen';

type AuthStackRouteName =
  | 'Splash'
  | 'Welcome'
  | 'ContinueAs'
  | 'StudentAdmission'
  | 'Login'
  | 'JobOpening'
  | 'ChooseAction'

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ContinueAs: undefined;

  // School code
  SchoolCode: {
    next_page: AuthStackRouteName;
  };
  SchoolSearch: {
    onSelect: (school: SchoolType) => void
  };

  // Student admission
  StudentAdmission: {
    schoolCode: string;
  };
  StudentAdmissionProcedure: {
    schoolCode: string;
  };
  StudentAdmissionForm: {
    schoolCode: string;
  };
  StudentAdmitted:{
    schoolCode: string;
  };
  TrackApplication: {
    schoolCode: string;
  };

  // School login
  ChooseAction: {
    schoolCode: string
  };
  Login: {
    schoolCode: string;
  };
  Register: {
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

      {/* School Code */}
      <Stack.Screen name="SchoolCode" component={SchoolCodeScreen} />
      <Stack.Screen name="SchoolSearch" component={SchoolSearchScreen} />

      {/* Student Admission */}
      <Stack.Screen name="StudentAdmission" component={StudentAdmissionScreen} />
      <Stack.Screen name="StudentAdmissionProcedure" component={StudentAdmissionProcedureScreen} />
      <Stack.Screen name="StudentAdmissionForm" component={StudentAdmissionFormScreen} />
      <Stack.Screen name="StudentAdmitted" component={StudentAdmittedScreen} />
      <Stack.Screen name="TrackApplication" component={TrackApplicationScreen} />


      {/* School Login */}
      <Stack.Screen name="ChooseAction" component={ChooseActionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      

      {/* Job Opening */}
      <Stack.Screen name="JobOpening" component={JobOpeningScreen} />
      <Stack.Screen name="JobDescription" component={JobDescriptionScreen} />
      <Stack.Screen name="JobForm" component={JobFormScreen} />
      <Stack.Screen name="JobApplied" component={JobAppliedScreen} />

    </Stack.Navigator>
  );
}