import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../styles/theme";
import LinearGradient from 'react-native-linear-gradient';


// Header
export default function Header({ navigation, title, isStack = false, image }: any) {
    return (
        <>
            <StatusBar barStyle='light-content'/>
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={[styles.container, image && styles.containerWithImage]}
            >
                {!isStack ? (
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.backArrow}>‹</Text>
                    </Pressable>
                ) : (
                    <View />
                )}

                {image ? (
                    <View style={styles.titleImageRow}>
                        <Image source={image} style={styles.avatar} />
                        {title ? (
                            <Text style={[styles.title, styles.titleWithImage]} numberOfLines={1}>
                                {title}
                            </Text>
                        ) : null}
                    </View>
                ) : (
                    title ? (
                        <Text style={styles.title} numberOfLines={1}>
                            {title}
                        </Text>
                    ) : null
                )}

                {!image && <Text />}
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
    containerWithImage: {
        justifyContent: 'flex-start',
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
    titleImageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: spacing.md,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: radius.round,
        borderWidth: 2,
        borderColor: colors.background,
        marginRight: spacing.md,
    },
    titleWithImage: {
        marginTop: 0,
    },
});