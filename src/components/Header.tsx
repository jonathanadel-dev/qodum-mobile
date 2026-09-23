import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { colors, metrics } from "../styles/theme";
import LinearGradient from 'react-native-linear-gradient';
import AppText from './AppText';


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
                        <AppText style={styles.backArrow}>‹</AppText>
                    </Pressable>
                ) : (
                    <View />
                )}

                {image ? (
                    <View style={styles.titleImageRow}>
                        <Image source={image} style={styles.avatar} />
                        {title ? (
                            <AppText
                                variant='h2'
                                numberOfLines={1}
                                style={[styles.title, styles.titleWithImage]}
                            >
                                {title}
                            </AppText>
                        ) : null}
                    </View>
                ) : (
                    title ? (
                        <AppText
                            variant='h2'
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {title}
                        </AppText>
                    ) : null
                )}

                {!image && <AppText />}
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
        borderBottomLeftRadius: metrics.xxl,
        borderBottomRightRadius: metrics.xxl,
    },
    containerWithImage: {
        justifyContent: 'flex-start',
    },
    backArrow: {
        fontSize: 45,
        color: colors.white,
    },
    title: {
        marginTop: metrics.lg,
        color: colors.white,
    },
    titleImageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: metrics.md,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: metrics.round,
        borderWidth: 2,
        borderColor: colors.white,
        marginRight: metrics.md,
    },
    titleWithImage: {
        marginTop: 0,
    },
});