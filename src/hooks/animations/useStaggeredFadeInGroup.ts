import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


// Options
type Options = {
  duration?: number;
  staggerMs?: number;
  distance?: number;
};

// Fade + slide-up for a fixed-size set of items animated together as
// a group via Animated.stagger, single value per item (opacity and
// translateY both interpolated off it). Lighter-weight sibling of
// useStaggeredGridEntrance for cases that don't need a scale pop —
// timelines, step lists, simple staggered sections.
export function useStaggeredFadeInGroup(count: number, options: Options = {}) {
    const { duration = 420, staggerMs = 120, distance = 18 } = options;

    const anims = useRef(Array.from({ length: count }, () => new Animated.Value(0))).current;

    useEffect(() => {
        Animated.stagger(
        staggerMs,
        anims.map((anim) =>
            Animated.timing(anim, { toValue: 1, duration, useNativeDriver: true }),
        ),
        ).start();

        return () => anims.forEach((anim) => anim.stopAnimation());
    }, [anims, duration, staggerMs]);

    return anims.map((anim) => ({
        opacity: anim,
        transform: [
            {
                translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [distance, 0],
                }),
            },
        ],
    }));
}