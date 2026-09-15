import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../styles/theme";


// Header
export default function Header({ navigation, title }: any) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backArrow}>‹</Text>
            </Pressable>

            {title ? (
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
            ) : null}
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: spacing.xl,
        gap: spacing.md,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArrow: {
        fontSize: 32,
        lineHeight: 32,
        color: colors.text,
        marginTop: -4,
    },
    title: {
        ...typography.title,
        marginBottom: 0,
        flex: 1,
    },
});