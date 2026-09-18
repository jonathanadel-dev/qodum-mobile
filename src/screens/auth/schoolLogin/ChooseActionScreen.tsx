// screens/ChooseAction/ChooseActionScreen.tsx
import React from 'react';
import {
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../../../components/Button';
import { colors, spacing, typography } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'ChooseAction'>;


// Choose action screen
export default function ChooseActionScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params || {};


    // Handle sign up
    const handleSignUp = () => {
        navigation.navigate('Register', { schoolCode });
    };


    // Handle login
    const handleLogin = () => {
        navigation.navigate('Login', { schoolCode });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.content}>
                <Image
                    source={require('../../../assets/images/choose-action.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                />

                <Text style={styles.welcomeText}>Welcome To</Text>

                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.tagline}>
                    For an improved learning and teaching experience
                </Text>

                <View style={styles.actions}>
                    <Button
                        type="gradient"
                        label="Sign Up"
                        onPress={handleSignUp}
                        style={styles.signUpButton}
                    />

                    <View style={styles.loginRow}>
                        <Text style={styles.loginPrompt}>Already have an account ? </Text>
                        <Pressable onPress={handleLogin} hitSlop={10}>
                            <Text style={styles.loginLink}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.xxxl * 2,
    },
    illustration: {
        width: '100%',
        height: 240,
        marginBottom: spacing.xxxl,
    },
    welcomeText: {
        ...typography.title,
        fontSize: 24,
        marginBottom: spacing.xl,
    },
    logo: {
        width: 220,
        height: 90,
        marginBottom: spacing.xxl,
    },
    tagline: {
        ...typography.description,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 300,
    },
    actions: {
        width: '100%',
        marginTop: spacing.xxxl * 1.5,
    },
    signUpButton: {
        width: '100%',
        height: 54,
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    loginPrompt: {
        fontSize: 14,
        color: colors.text,
    },
    loginLink: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primary,
    },
});