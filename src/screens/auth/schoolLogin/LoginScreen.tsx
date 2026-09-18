// screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

import toast from '../../../lib/toast';
import FormField from '../../../components/form/input/FormField';
import Button from '../../../components/Button';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import {
    loginSchema,
    LoginFormData,
} from '../../../lib/zodSchemas/loginFormSchema';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { login } from '../../../lib/api/schoolLoginApi';


// Props
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;


// Login screen
export default function LoginScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params || {};
    const [saveMe, setSaveMe] = useState(false);


    // Form
    const defaultValues: LoginFormData = {
        email: '',
        password: '',
    };
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues,
    });


    // Submit handlers
    const onSubmit = async (data: LoginFormData) => {
        try {
            await login({
                email: data.email,
                password: data.password,
            });
            // TODO: Auth context and redirection
            await new Promise((resolve: any) => setTimeout(resolve, 1200));
        } catch {
            toast.error('Unable to log in. Please check your details and try again.');
        }
    };
    const onInvalid = () => {
        toast.error('Please correct the highlighted fields.');
    };


    // Handle register
    const handleSignUp = () => {
        navigation.replace('Register', { schoolCode });
    };


    // Handle forgot password
    const handleForgotPassword = () => {
        // TODO: no forgot-password route wired up yet
    };

    return (
        <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <CustomStatusBar />

            <View style={styles.panel}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Login to continue to your account!</Text>

                        <View style={styles.form}>
                            <FormField<LoginFormData>
                                control={control}
                                name="email"
                                placeholder="Email Address"
                                icon="mail-outline"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />

                            <FormField<LoginFormData>
                                control={control}
                                name="password"
                                placeholder="Password"
                                icon="lock-closed-outline"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.optionsRow}>
                            <Pressable
                                style={styles.checkboxRow}
                                onPress={() => setSaveMe((prev) => !prev)}
                                hitSlop={8}
                            >
                                <View style={[styles.checkbox, saveMe && styles.checkboxChecked]}>
                                    {saveMe && <Ionicons name="checkmark" size={14} color={colors.background} />}
                                </View>
                                <Text style={styles.checkboxLabel}>Save me</Text>
                            </Pressable>

                            <Pressable onPress={handleForgotPassword} hitSlop={8}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </Pressable>
                        </View>

                        <Button
                            type="gradient"
                            loading={isSubmitting}
                            onPress={handleSubmit(onSubmit, onInvalid)}
                            label="Login"
                            loadingLabel="Logging in..."
                            style={styles.signUpButton}
                        />

                        <View style={styles.signInArea}>
                            <Text style={styles.signInPrompt}>Don't have an account ? </Text>
                            <Pressable onPress={handleSignUp} hitSlop={8}>
                                <Text style={styles.signInLink}>Sign up</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
}


// Styles
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    panel: {
        flex: 1,
        marginTop: '10%',
        backgroundColor: colors.background,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
    },
    flex: { flex: 1 },
    scrollContent: {
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.xxxl,
        paddingBottom: spacing.xxxl,
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: spacing.xl,
        alignSelf: 'center',
    },
    title: {
        ...typography.title,
        fontSize: 24,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.description,
        fontSize: 15,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        gap: spacing.lg,
    },
    optionsRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.lg,
        marginBottom: spacing.xxl,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: radius.xs,
        borderWidth: 1.5,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkboxLabel: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '600',
    },
    forgotText: {
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    signUpButton: {
        width: '100%',
        height: 56,
    },
    signInArea: {
        flexDirection: 'row',
        marginTop: spacing.xxxl * 2,
        alignSelf: 'center',
    },
    signInPrompt: {
        fontSize: 14,
        color: colors.text,
    },
    signInLink: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primary,
    },
});