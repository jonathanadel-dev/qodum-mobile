import React, { ReactNode, useRef } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Animated,
    ViewStyle,
    StyleProp
} from 'react-native';


interface CardProps{
    children: ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
}


export default function Card({children, onPress, style, contentStyle}:CardProps) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (!onPress) return;

        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 30,
            bounciness: 0,
        }).start();
    };

    const handlePressOut = () => {
        if (!onPress) return;

        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 5,
        }).start();
    };

    const content = (
        <View style={[styles.content, contentStyle]}>
            {children}
        </View>
    );

    // Regular card
    if (!onPress) {
        return (
            <View style={[styles.card, style]}>
                {content}
            </View>
        );
    }

    // Pressed card
    return (
        <Animated.View
            style={[
                styles.cardWrapper,
                {
                    transform: [{ scale }],
                },
            ]}
        >
            <Pressable
                style={[styles.card, style]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {content}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({

    cardWrapper: {
        width: '100%',
    },

    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        borderColor: '#E6EEF3',

        borderRadius: 22,

        shadowColor: '#0B2538',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.055,
        shadowRadius: 14,

        elevation: 2,
    },

    content: {
        padding: 16,
    }
});