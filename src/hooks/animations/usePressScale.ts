import { useRef } from 'react';
import { Animated } from 'react-native';


// Press scale
export function usePressScale() {

    const scale = useRef(new Animated.Value(1)).current;


    const onPressIn = () => {
        Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 35, bounciness: 0 }).start();
    };
    const onPressOut = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 25, bounciness: 5 }).start();
    };


    return { scale, onPressIn, onPressOut };
}