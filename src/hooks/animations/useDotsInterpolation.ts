import { useMemo } from 'react';
import { Animated } from 'react-native';


// Options
type Options = {
    itemWidth: number;
    activeColor: string;
    inactiveColor: string;
    inactiveWidth?: number;
    activeWidth?: number;
};

// Interpolates dot width + color off a scroll position
export function useDotsInterpolation(
  scrollX: Animated.Value,
  count: number,
  { itemWidth, activeColor, inactiveColor, inactiveWidth = 8, activeWidth = 24 }: Options,
) {
    return useMemo(
        () =>
        Array.from({ length: count }).map((_, i) => {
            const inputRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth];

            const width = scrollX.interpolate({
                inputRange,
                outputRange: [inactiveWidth, activeWidth, inactiveWidth],
                extrapolate: 'clamp',
            });

            const backgroundColor = scrollX.interpolate({
                inputRange,
                outputRange: [inactiveColor, activeColor, inactiveColor],
                extrapolate: 'clamp',
            });

            return { width, backgroundColor };
        }),
        [scrollX, count, itemWidth, activeColor, inactiveColor, inactiveWidth, activeWidth],
    );
}