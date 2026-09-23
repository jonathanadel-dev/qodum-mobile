import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';


// Pulsing dots
export function usePulsingDots(count: number, staggerMs = 180) {

    const dots = useRef(Array.from({ length: count }, () => new Animated.Value(0.35))).current;

    useEffect(() => {
        const animate = (value: Animated.Value, delay: number) => {
        Animated.loop(
            Animated.sequence([
            Animated.delay(delay),
            Animated.timing(value, { toValue: 1, duration: 450, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            Animated.timing(value, { toValue: 0.35, duration: 450, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            Animated.delay(300),
            ]),
        ).start();
        };
        dots.forEach((d, i) => animate(d, i * staggerMs));

        return () => dots.forEach((d) => d.stopAnimation());
    }, [dots, staggerMs]);

    return dots;
}