import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../styles/theme';
import { useFadeInScale } from '../hooks/animations/useFadeInScale';
import { useFadeIn } from '../hooks/animations/useFadeIn';
import { usePulsingDots } from '../hooks/animations/usePulsingDots';
import AppText from '../components/AppText';


// Splash screen
export default function SplashScreen () {
  
  // Animations
  const { opacity: logoOpacity, scale: logoScale } = useFadeInScale({ duration: 700 });
  const { opacity: glowOpacity, scale: glowScale } = useFadeInScale({ duration: 900, fromScale: 0.7 });
  const textOpacity = useFadeIn({ duration: 600, delay: 700 });
  const dots = usePulsingDots(3, 180);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircleLarge} />
      <View style={styles.backgroundCircleSmall} />

      <View style={styles.logoArea}>
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: glowOpacity.interpolate({ inputRange: [0, 1], outputRange: [0, 0.14] }),
              transform: [{ scale: glowScale }],
            },
          ]}
        />
        <Animated.View style={[styles.logoWrapper, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      </View>

      <Animated.View style={[styles.loadingArea, { opacity: textOpacity }]}>
        <AppText variant='desc'>Preparing your experience</AppText>
        <View style={styles.dots}>
          {dots.map((dot, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  opacity: dot,
                  transform: [{ translateY: dot.interpolate({ inputRange: [0.35, 1], outputRange: [0, -4] }) }],
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>

      <AppText variant='desc' style={styles.version}>QODUM</AppText>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  /* Background decoration */
  backgroundCircleLarge: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: colors.iconBackground,
    top: -190,
    right: -150,
    opacity: 0.7,
  },
  backgroundCircleSmall: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.iconBackground,
    bottom: -150,
    left: -130,
  },

  /* Logo */
  logoArea: {
    width: 230,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.primary,
  },
  logoWrapper: {
    width: 175,
    height: 175,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 8,
  },
  logo: {
    width: 125,
    height: 125,
  },

  /* Loading */
  loadingArea: {
    alignItems: 'center',
    marginTop: 18
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary
  },

  /* Footer */
  version: {
    position: 'absolute',
    bottom: 28,
    letterSpacing: 2
  }
});