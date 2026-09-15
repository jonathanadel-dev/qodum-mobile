import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../../styles/theme';
import { School } from '../../lib/types/school';


// Type
type AnimatedSchoolResultProps = {
    school: School;
    index: number;
    onPress: () => void;
};


// Animated school result
export default function AnimatedSchoolResult({ school, index, onPress }: AnimatedSchoolResultProps) {

    // Animation
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(15)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const handlePressIn = () => {
        Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 30, bounciness: 0 }).start();
    };
    const handlePressOut = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 5 }).start();
    };
    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                delay: index * 50,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                delay: index * 50,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.schoolResult}
            >
                <View style={styles.schoolIconContainer}>
                    <Text style={styles.schoolIcon}>🏫</Text>
                </View>

                <View style={styles.schoolInfo}>
                    <Text style={styles.schoolName} numberOfLines={2}>{school.name}</Text>
                    <Text style={styles.schoolCode}>Code: {school.code}</Text>
                </View>

                <Text style={styles.resultArrow}>→</Text>
            </Pressable>
        </Animated.View>
    );
}


// Styles
const styles = StyleSheet.create({
    schoolResult: {
        minHeight: 74,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    schoolIconContainer: {
        width: 48,
        height: 48,
        borderRadius: radius.md,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    schoolIcon: {
        fontSize: 21,
    },
    schoolInfo: {
        flex: 1,
    },
    schoolName: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 19,
        marginBottom: 3,
    },
    schoolCode: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    resultArrow: {
        fontSize: 21,
        color: colors.hash,
        marginLeft: spacing.sm,
    },
});