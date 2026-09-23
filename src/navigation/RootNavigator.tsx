import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppTabs from './appStacks';
import SplashScreen from '../screens/SplashScreen';

export default function RootNavigator() {

  // Showing splash screen for authentication check
  const MIN_SPLASH_DURATION = 2000;
  const { isAuthenticated, isLoading } = useAuth();
  const [minDelayElapsed, setMinDelayElapsed] = useState(false);
  const showSplash = isLoading || !minDelayElapsed;
  useEffect(() => {
    const timer = setTimeout(() => setMinDelayElapsed(true), MIN_SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}


// Remove
export const fonts = {
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    semiBold: 'Quicksand-SemiBold',
    bold: 'Quicksand-Bold',
};
export const typography = {
    title: {
        fontSize: 17,
        fontFamily: fonts.bold,
        color: '#12263A',
        marginBottom: 5,
    },
    description: {
        fontSize: 13,
        lineHeight: 19,
        fontFamily: fonts.regular,
        color: '#718096',
    },
    label: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: '#12263A',
        marginBottom: 8,
    },

    input: {
        fontSize: 15,
        color: '#12263A',
    },

    error: {
        fontSize: 12,
        color: '#FF3B30',
        marginTop: 5,
    },

    button: {
        fontSize: 15,
        fontWeight: '700' as const,
    },

    onboardingTitle: {
        fontSize: 26,
        fontWeight: '700' as const,
        color: '#12263A',
    },
    onboardingSubtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: '#718096',
    },
};
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 40,
};
export const radius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 32,
    xxxl: 40,
    round: 999,
};