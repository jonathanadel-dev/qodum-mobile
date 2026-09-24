import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


// Animates a numeric index (0, 1, 2...) toward activeIndex.
// Consumers multiply the output by a pixel width to get a translateX.
export function useSlidingIndicator(activeIndex: number, duration = 260) {
    const anim = useRef(new Animated.Value(activeIndex)).current;

    useEffect(() => {
        Animated.timing(anim, { toValue: activeIndex, duration, useNativeDriver: true }).start();
        return () => anim.stopAnimation();
    }, [anim, activeIndex, duration]);

    return anim;
}