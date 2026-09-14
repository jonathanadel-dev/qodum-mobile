// components/form/SubmitButton.tsx

import { useRef } from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../../styles/theme";


// Submit button
export default function SubmitButton({
    loading,
    onPress,
}: {
    loading: boolean;
    onPress: () => void;
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
                style={({ pressed }) => [
                    styles.submitButton,
                    pressed && !loading && styles.submitButtonPressed,
                    loading && styles.submitButtonDisabled,
                ]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <ActivityIndicator color="#FFFFFF" size="small" />
                        <Text style={styles.submitText}>Submitting...</Text>
                    </>
                ) : (
                    <Text style={styles.submitText}>Submit</Text>
                )}
            </Pressable>
        </Animated.View>
    );
};


// Styles
const styles = StyleSheet.create({
    submitButton: {
        height: 56,
        borderRadius: radius.xl,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.22,
        shadowRadius: 16,
        elevation: 6,
    },
    submitButtonPressed: {
        backgroundColor: colors.primaryPressed,
    },
    submitButtonDisabled: {
        opacity: 0.65,
        shadowOpacity: 0,
        elevation: 0,
    },
    submitText: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.3,
        color: '#FFFFFF',
    }
})