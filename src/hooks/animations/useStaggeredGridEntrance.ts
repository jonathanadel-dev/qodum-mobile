import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


// Options
type Options = {
  distance?: number;
  fromScale?: number;
  staggerMs?: number;
};


// Fade + rise + scale entrance for a fixed-size set of items that
// animate in together as a group (Animated.stagger), owned by the
// parent — as opposed to useStaggeredFadeInUp, where each list row
// is its own component instance managing its own delay.
export function useStaggeredGridEntrance(count: number, options: Options = {}) {
    const { distance = 18, fromScale = 0.97, staggerMs = 70 } = options;

    const items = useRef(
        Array.from({ length: count }, () => ({
            translateY: new Animated.Value(distance),
            opacity: new Animated.Value(0),
            scale: new Animated.Value(fromScale),
        }))
    ).current;

    useEffect(() => {
        const animations = items.map((item) =>
            Animated.parallel([
                Animated.timing(item.translateY, { toValue: 0, duration: 500, useNativeDriver: true }),
                Animated.timing(item.opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.spring(item.scale, { toValue: 1, speed: 18, bounciness: 2, useNativeDriver: true }),
            ])
        );

        Animated.stagger(staggerMs, animations).start();

        return () => {
            items.forEach((item) => {
                item.translateY.stopAnimation();
                item.opacity.stopAnimation();
                item.scale.stopAnimation();
            });
        };
    }, [items, staggerMs]);

    return items.map((item) => ({
        opacity: item.opacity,
        transform: [{ translateY: item.translateY }, { scale: item.scale }],
    }));
}