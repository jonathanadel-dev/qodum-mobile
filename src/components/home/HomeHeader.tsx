import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors, radius, spacing, typography } from '../../styles/theme';


// Type
type HomeHeaderProps = {
    name: string;
    grade: string;
    role: string;
    avatar: any;
    onLogoutPress?: () => void;
};


// Home header
export default function HomeHeader({ name, grade, role, avatar, onLogoutPress }: HomeHeaderProps) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <Image source={avatar} style={styles.avatar} />

                <View style={styles.textBlock}>
                    <Text style={styles.name}>Hi {name}</Text>
                    <Text style={styles.subtitle}>{grade}</Text>
                    <Text style={styles.subtitle}>{role}</Text>
                </View>

                <Pressable onPress={onLogoutPress} hitSlop={10}>
                    <Ionicons name="log-out-outline" size={26} color={colors.background} />
                </Pressable>
            </LinearGradient>
        </>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: 50,
        paddingBottom: spacing.lg,
        borderBottomLeftRadius: radius.xxl,
        borderBottomRightRadius: radius.xxl,
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: radius.round,
        borderWidth: 2,
        borderColor: colors.background,
        marginRight: spacing.md,
    },
    textBlock: {
        flex: 1,
    },
    name: {
        ...typography.title,
        fontSize: 19,
        color: colors.background,
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
    },
});