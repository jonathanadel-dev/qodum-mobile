// components/form/SubmitButton.tsx

import { useRef } from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../../styles/theme";


// Submit button
export default function SubmitButton({
    loading,
    onPress,
    label = 'Submit',
    loadingLabel = 'Submitting...',
}: {
    loading: boolean;
    onPress: () => void;
    label?: string;
    loadingLabel?: string;
}) {

    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (loading) return;

        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 35,
            bounciness: 0,
        }).start();
    };

    const handlePressOut = () => {
        if (loading) return;

        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 25,
            bounciness: 5,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <ActivityIndicator color="#FFFFFF" size="small" />
                        <Text style={styles.submitText}>{loadingLabel}</Text>
                    </>
                ) : (
                    <Text style={styles.submitText}>{label}</Text>
                )}
            </Pressable>
        </Animated.View>
    );
};


// Styles
const styles = StyleSheet.create({
    submitButton: {
        height: 56,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primaryPressed,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    submitButtonDisabled: {
        opacity: 0.65,
        elevation: 0,
        shadowOpacity: 0,
    },
    submitText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
})