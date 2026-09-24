import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


// Options
type Options = {
  duration?: number;
  max?: number;
};


// Animates a 0..max value into a '0%'-'100%' width string, for
// progress bars. useNativeDriver: false is required — width can't
// run on the native driver.
export function useAnimatedProgress(value: number, options: Options = {}) {
    const { duration = 900, max = 100 } = options;
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, { toValue: value, duration, useNativeDriver: false }).start();
        return () => anim.stopAnimation();
    }, [anim, value, duration]);

    return anim.interpolate({ inputRange: [0, max], outputRange: ['0%', '100%'] });
}