import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


// Options
type Options = {
  index: number;
  duration?: number;
  staggerMs?: number;
  maxStaggerSteps?: number;
  distance?: number;
};


// Fade + slide-up entrance for list rows, staggered by item index.
export function useStaggeredFadeInUp({
    index,
    duration = 320,
    staggerMs = 50,
    maxStaggerSteps = 8,
    distance = 12
}: Options) {

    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, {
        toValue: 1,
        duration,
        delay: Math.min(index, maxStaggerSteps) * staggerMs,
        useNativeDriver: true,
        }).start();

        return () => anim.stopAnimation();
    }, [anim, index, duration, staggerMs, maxStaggerSteps]);

    const style = {
        opacity: anim,
        transform: [
            {
                translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [distance, 0],
                }),
            },
        ],
    };

    return style;
}