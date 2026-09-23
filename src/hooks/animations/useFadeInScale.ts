import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';


// Options
type Options = {
  duration?: number;
  delay?: number;
  fromScale?: number;
};


// Fade in scale
export function useFadeInScale({ duration = 700, delay = 0, fromScale = 0.75 }: Options = {}) {

    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(fromScale)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, speed: 12, bounciness: 5, delay, useNativeDriver: true }),
        ]).start();

        return () => {
            opacity.stopAnimation();
            scale.stopAnimation();
        };
    }, [duration, delay, fromScale]);

    return { opacity, scale };
}