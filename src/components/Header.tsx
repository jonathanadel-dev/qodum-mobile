import React from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../styles/theme";
import LinearGradient from 'react-native-linear-gradient';


// Header
export default function Header({ navigation, title, isStack = false }: any) {
    return (
        <>
            <StatusBar barStyle='light-content'/>
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                {!isStack ? (
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.backArrow}>‹</Text>
                    </Pressable>
                ) : (
                    <View />
                )}

                {title ? (
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                ) : null}

                <Text />
            </LinearGradient>
        </>

    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        height: 110,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderBottomLeftRadius: radius.xxl,
        borderBottomRightRadius: radius.xxl,
    },
    backArrow: {
        fontSize: 45,
        color: colors.background,
    },
    title: {
        ...typography.title,
        marginTop: spacing.lg,
        color: colors.background,
        marginBottom: 0,
    },
});