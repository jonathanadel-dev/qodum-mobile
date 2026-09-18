// screens/auth/login/LoginScreen.tsx

import React from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from '../../../lib/toast';
import FormField from '../../../components/form/input/FormField';
import SubmitButton from '../../../components/Button';
import Card from '../../../components/Card';
import { formStyles as styles } from '../../../styles/common';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Header from '../../../components/Header';
import {
    loginSchema,
    LoginFormData,
} from '../../../lib/zodSchemas/loginFormSchema';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { login } from '../../../lib/api/schoolLoginApi';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;


// Login screen
export default function LoginScreen({ navigation, route }: Props) {

    // State
    const { role, schoolCode } = route.params;
    const isStudent = role === 'student';
    const roleLabel = isStudent ? 'Student' : 'Teacher';


    // Form
    const defaultValues: LoginFormData = {
        admission_number: '',
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
                admission_no: data.admission_number,
                password: data.password,
                role,
            });

            // TODO: Auth context and redirection
            await new Promise((resolve: any) => setTimeout(resolve, 1200));

        } catch {
            toast.error('Unable to sign in. Please check your details and try again.');
        }
    };
    const onInvalid = () => {
        toast.error('Please correct the highlighted fields.');
    };


    // Register
    const handleRegister = () => {
        navigation.navigate('Register', { role, schoolCode });
    };


    return (
        <View style={styles.container}>

            {/* Status bar */}
            <CustomStatusBar />

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <Header navigation={navigation} />

                    {/* Header */}
                    <View style={loginStyles.header}>
                        <View style={loginStyles.roleBadge}>
                            <View style={loginStyles.roleDot} />
                            <Text style={loginStyles.roleBadgeText}>
                                {roleLabel.toUpperCase()}
                            </Text>
                        </View>

                        <Text style={loginStyles.title}>Welcome back.</Text>

                        <Text style={loginStyles.subtitle}>
                            Sign in to continue to your school account.
                        </Text>
                    </View>

                    {/* School identity */}
                    <Card style={loginStyles.schoolCard} contentStyle={loginStyles.schoolCardContent}>
                        <View style={loginStyles.schoolIcon}>
                            <Text style={loginStyles.schoolIconText}>✓</Text>
                        </View>

                        <View style={loginStyles.schoolDetails}>
                            <Text style={loginStyles.schoolLabel}>VERIFIED SCHOOL</Text>
                            <Text style={loginStyles.schoolCode}>{schoolCode || '------'}</Text>
                        </View>

                        <View style={loginStyles.verifiedBadge}>
                            <Text style={loginStyles.verifiedText}>Verified</Text>
                        </View>
                    </Card>

                    {/* Login */}
                    <Card style={loginStyles.loginCard} contentStyle={loginStyles.loginCardContent}>
                        <View style={loginStyles.formHeader}>
                            <Text style={loginStyles.formTitle}>Sign in</Text>
                            <Text style={loginStyles.formSubtitle}>Enter your school credentials.</Text>
                        </View>

                        <FormField
                            control={control}
                            name="admission_number"
                            label={isStudent ? 'Admission number' : 'Staff number'}
                            placeholder={isStudent ? 'Enter admission number' : 'Enter staff number'}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <FormField
                            control={control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <View style={loginStyles.submitArea}>
                            <SubmitButton
                                loading={isSubmitting}
                                onPress={handleSubmit(onSubmit, onInvalid)}
                                label="Sign in"
                                loadingLabel="Signing in..."
                            />
                        </View>
                    </Card>

                    {/* Register */}
                    <View style={loginStyles.registerArea}>
                        <Text style={loginStyles.registerPrompt}>Don't have an account?</Text>
                        <Pressable onPress={handleRegister}>
                            <Text style={loginStyles.registerLink}>Create one</Text>
                        </Pressable>
                    </View>

                    {/* Footer */}
                    <View style={loginStyles.footer}>
                        <Text style={loginStyles.footerText}>Signing in as {roleLabel}</Text>
                        <View style={loginStyles.footerDot} />
                        <Text style={loginStyles.footerText}>{schoolCode || 'School'}</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}


// Login styles
const loginStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm - 2,
        borderRadius: radius.round,
        backgroundColor: colors.infoBackground,
        marginBottom: spacing.lg,
    },
    roleDot: {
        width: 6,
        height: 6,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        marginRight: spacing.sm - 1,
    },
    roleBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.3,
        color: colors.primary,
    },
    title: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -0.8,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.description,
        textAlign: 'center',
        marginTop: spacing.sm + 2,
        maxWidth: 300,
        alignSelf: 'center',
    },

    schoolCard: {
        marginBottom: spacing.lg,
    },
    schoolCardContent: {
        padding: spacing.md + 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    schoolIcon: {
        width: 40,
        height: 40,
        borderRadius: radius.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    schoolIconText: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: '800',
    },
    schoolDetails: {
        flex: 1,
    },
    schoolLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.1,
        color: colors.textSecondary,
        marginBottom: 3,
    },
    schoolCode: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: 1.1,
    },
    verifiedBadge: {
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.sm - 2,
        borderRadius: radius.sm + 2,
        backgroundColor: colors.successBackground,
    },
    verifiedText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.success,
    },

    loginCard: {
        marginBottom: 0,
    },
    loginCardContent: {
        padding: spacing.xl,
    },
    formHeader: {
        marginBottom: spacing.xl + 1,
    },
    formTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: colors.text,
    },
    formSubtitle: {
        ...typography.description,
        marginTop: spacing.xs + 1,
    },
    submitArea: {
        marginTop: spacing.xs,
    },

    registerArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl - 2,
    },
    registerPrompt: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    registerLink: {
        fontSize: 13,
        fontWeight: '800',
        color: colors.primary,
        marginLeft: spacing.xs + 1,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
    },
    footerText: {
        fontSize: 11,
        color: colors.hash,
    },
    footerDot: {
        width: 3,
        height: 3,
        borderRadius: radius.round,
        backgroundColor: colors.border,
        marginHorizontal: spacing.sm,
    },
});