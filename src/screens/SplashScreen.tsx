import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../styles/theme';


// Types
type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
};
type Props = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;


// Splash screen
export default function SplashScreen ({ navigation }: Props) {
  
  /* Main logo animation */
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.75)).current;

  /* Blue glow behind the logo */
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.7)).current;

  /* Loading dots */
  const dot1 = useRef(new Animated.Value(0.35)).current;
  const dot2 = useRef(new Animated.Value(0.35)).current;
  const dot3 = useRef(new Animated.Value(0.35)).current;

  /* Bottom text */
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    /* Logo entrance */
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(
          Easing.cubic,
        ),
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        speed: 12,
        bounciness: 5,
        useNativeDriver: true,
      }),

      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(
            Easing.cubic,
        ),
        useNativeDriver: true,
      }),

      Animated.spring(glowScale, {
        toValue: 1,
        speed: 8,
        bounciness: 4,
        useNativeDriver: true,
      }),
    ]).start();

    /* Bottom text */
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 600,
      delay: 700,
      easing: Easing.out(
        Easing.cubic,
      ),
      useNativeDriver: true,
    }).start();

    /* Loading dots */
    const animateDot = (
      animation: Animated.Value,
      delay: number,
    ) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),

          Animated.timing(
            animation,
            {
              toValue: 1,
              duration: 450,
              easing: Easing.inOut(
                  Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            animation,
            {
                toValue: 0.35,
                duration: 450,
                easing: Easing.inOut(
                    Easing.ease,
                ),
                useNativeDriver: true,
            },
          ),

          Animated.delay(300),
        ]),
      ).start();
    };
    animateDot(dot1, 0);
    animateDot(dot2, 180);
    animateDot(dot3, 360);

    /* Move to Welcome screen */
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2600);

    return () => {
      clearTimeout(timer);

      logoOpacity.stopAnimation();
      logoScale.stopAnimation();
      glowOpacity.stopAnimation();
      glowScale.stopAnimation();

      dot1.stopAnimation();
      dot2.stopAnimation();
      dot3.stopAnimation();

      textOpacity.stopAnimation();
    };

  }, [navigation]);

  return (
    <View style={styles.container}>

      {/* Decorative background */}
      <View style={styles.backgroundCircleLarge} />
      <View style={styles.backgroundCircleSmall} />

      {/* Logo */}
      <View style={styles.logoArea}>
          <Animated.View
              style={[
                  styles.glow,
                  {
                      opacity:
                          glowOpacity.interpolate(
                              {
                                  inputRange: [
                                      0,
                                      1,
                                  ],
                                  outputRange: [
                                      0,
                                      0.14,
                                  ],
                              },
                          ),
                      transform: [
                          {
                              scale: glowScale,
                          },
                      ],
                  },
              ]}
          />

          <Animated.View
              style={[
                  styles.logoWrapper,
                  {
                      opacity:
                          logoOpacity,
                      transform: [
                          {
                              scale: logoScale,
                          },
                      ],
                  },
              ]}
          >
              <Image
                  source={require('../assets/images/logo.png')}
                  style={
                      styles.logo
                  }
                  resizeMode="contain"
              />
          </Animated.View>
      </View>

      {/* Loading */}
      <Animated.View
        style={[
          styles.loadingArea,
          {
            opacity: textOpacity,
          },
        ]}
      >
        <Text style={styles.loadingText}>
          Preparing your experience
        </Text>

        <View style={styles.dots}>
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dot1,
                transform: [
                  {
                    translateY: dot1.interpolate(
                      {
                        inputRange: [
                          0.35,
                          1,
                        ],
                        outputRange: [
                          0,
                          -4,
                        ],
                      },
                    ),
                  },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dot2,
                transform: [
                  {
                    translateY: dot2.interpolate(
                      {
                        inputRange: [
                          0.35,
                          1,
                        ],
                        outputRange: [
                          0,
                          -4,
                        ],
                      },
                    ),
                  },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dot3,
                transform: [
                  {
                    translateY: dot3.interpolate(
                      {
                        inputRange: [
                          0.35,
                          1,
                        ],
                        outputRange: [
                          0,
                          -4,
                        ],  
                      },
                    ),
                  },
                ],
              },
            ]}
          />
        </View>
      </Animated.View>

      {/* Version */}
      <Text style={styles.version}>
        QODUM
      </Text>

    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#EAF8FE',
    top: -190,
    right: -150,
    opacity: 0.7,
  },
  backgroundCircleSmall: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#F0FAFE',
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
    backgroundColor: '#FFFFFF',
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
  loadingText: {
    fontSize: 13,
    color: '#8A969E',
    fontWeight: '500',
    letterSpacing: 0.2
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
    fontSize: 10,
    color: '#B7C1C7',
    fontWeight: '700',
    letterSpacing: 2,
  }
});