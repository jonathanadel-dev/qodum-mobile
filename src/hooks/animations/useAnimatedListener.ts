import { useEffect, DependencyList } from 'react';
import { Animated } from 'react-native';

// Subscribes to an Animated.Value's live numeric updates and calls
// back with each one — for deriving non-animated state (an index, a
// flag, a label) off an animation already in progress. Generic
// utility, not tied to any specific animation's meaning.
export function useAnimatedListener(
    value: Animated.Value,
    onChange: (value: number) => void,
    deps: DependencyList = [],
) {
    useEffect(() => {
        const listenerId = value.addListener(({ value: v }) => onChange(v));
        return () => value.removeListener(listenerId);
    }, deps);
}