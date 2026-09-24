import React, { useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import { colors, metrics } from '../styles/theme';
import AppText from './AppText';
import { useSlidingIndicator } from '../hooks/animations/useSlidingIndicator';


// Types
export type SegmentedTabOption<T extends string> = {
    label: string;
    value: T;
};
type Props<T extends string> = {
    options: SegmentedTabOption<T>[];
    value: T;
    onChange: (value: T) => void;
    style?: any;
};


// Segmented tabs
export default function SegmentedTabs<T extends string>({ options, value, onChange, style }: Props<T>) {
    const [containerWidth, setContainerWidth] = useState(0);
    const activeIndex = Math.max(options.findIndex((o) => o.value === value), 0);
    const pillWidth = containerWidth ? containerWidth / options.length : 0;
    const anim = useSlidingIndicator(activeIndex);

    const handleLayout = (e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width);

    return (
        <View style={[styles.container, style]} onLayout={handleLayout}>
            {containerWidth > 0 && (
                <Animated.View
                    style={[
                        styles.pill,
                        {
                            width: pillWidth,
                            transform: [{ translateX: Animated.multiply(anim, pillWidth) }],
                        },
                    ]}
                />
            )}

            {options.map((option) => {
                const isActive = option.value === value;
                return (
                    <Pressable key={option.value} style={styles.tabButton} onPress={() => onChange(option.value)}>
                        <AppText
                            variant={isActive ? 'h3' : 'text'}
                            style={[styles.tabText, isActive && styles.tabTextActive]}
                        >
                            {option.label}
                        </AppText>
                    </Pressable>
                );
            })}
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: colors.grayBackground,
        borderRadius: metrics.round,
        height: 52,
        overflow: 'hidden',
    },
    pill: {
        position: 'absolute',
        top: 4,
        left: 4,
        bottom: 4,
        backgroundColor: colors.primary,
        borderRadius: metrics.round,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 15,
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.white,
    },
});