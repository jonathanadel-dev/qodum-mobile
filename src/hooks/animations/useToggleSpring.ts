import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

    
// Options
type Options = {
  speed?: number;
  bounciness?: number;
};


// Springs a 0<->1 value toward `active` — for badges/checkmarks that
// pop in and out on selection (ward avatar's selected checkmark today;
// any other toggle-driven badge later).
export function useToggleSpring(active: boolean, options: Options = {}) {
    const { speed = 20, bounciness = 10 } = options;
    const anim = useRef(new Animated.Value(active ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(anim, { toValue: active ? 1 : 0, useNativeDriver: true, speed, bounciness }).start();
        return () => anim.stopAnimation();
    }, [anim, active, speed, bounciness]);

    return anim;
}