import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing } from "../styles/theme";


// Type
type Props = {
    label: String;
    icon?: String;
    pressHandler: () => void;
}


// Outline button
export default function OutlineButton({label, icon, pressHandler}:Props){

    const searchButtonScale = useRef(new Animated.Value(1)).current;
    const pressIn = (animation: Animated.Value) => {
        Animated.spring(animation, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 0 }).start();
    };
    const pressOut = (animation: Animated.Value) => {
        Animated.spring(animation, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 5 }).start();
    };

    return(
        <Animated.View style={{ transform: [{ scale: searchButtonScale }] }}>
            <Pressable
                onPress={pressHandler}
                onPressIn={() => pressIn(searchButtonScale)}
                onPressOut={() => pressOut(searchButtonScale)}
                style={styles.searchButton}
            >
                <Text style={styles.searchIconButton}>{icon}</Text>
                <Text style={styles.searchButtonText}>{label}</Text>
            </Pressable>
        </Animated.View>
    )
}


// Styles
const styles = StyleSheet.create({
    searchButton: {
        height: 46,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIconButton: {
        fontSize: 15,
        marginRight: spacing.sm,
    },
    searchButtonText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '700',
    },
});