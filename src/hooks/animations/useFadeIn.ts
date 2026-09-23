import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';


// Options
type Options = {
  duration?: number;
  delay?: number;
};


// Fade in
export function useFadeIn({ duration = 600, delay = 0 }: Options = {}) {

    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
        }).start();

        return () => opacity.stopAnimation();
    }, [duration, delay]);


    return opacity;
}