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
import Header from '../../../components/Header';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import {
    registerSchema,
    RegisterFormData,
} from '../../../lib/zodSchemas/registerFormSchema';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { register } from '../../../lib/api/schoolLoginApi';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;


// Register screen
export default function RegisterScreen({ navigation, route }: Props) {

    // State
    const { role, schoolCode } = route.params;
    const isStudent = role === 'student';
    const roleLabel = isStudent ? 'Student' : 'Teacher';


    // Form
    const defaultValues: RegisterFormData = {
        admission_number: '',
        password: '',
        confirm_password: '',
    };
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues,
    });


    // Submit handlers
    const onSubmit = async (data: RegisterFormData) => {
        try {
            await register({
                admission_no: data.admission_number,
                password: data.password,
                confirmPassword: data.confirm_password,
                role,
            });

            // TODO: Auth context and redirection
            await new Promise((resolve: any) => setTimeout(resolve, 1200));
        } catch {
            toast.error('Unable to create your account. Please try again.');
        }
    };
    const onInvalid = () => {
        toast.error('Please correct the highlighted fields.');
    };


    // Sign in
    const handleSignIn = () => {
        navigation.replace('Login', { role, schoolCode });
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

                    {/* Title row + role tag */}
                    <View style={styles.titleRow}>
                        <View style={styles.titleBlock}>
                            <Text style={styles.title}>Create account.</Text>
                            <Text style={styles.subtitle}>
                                Register to get started with your school account.
                            </Text>
                        </View>

                        <View style={styles.roleTag}>
                            <Text style={styles.roleTagText}>{roleLabel}</Text>
                        </View>
                    </View>

                    {/* School code — plain, unobtrusive */}
                    <Text style={styles.schoolLine}>
                        School code: <Text style={styles.schoolLineCode}>{schoolCode || '------'}</Text>
                    </Text>

                    {/* Register */}
                    <Card style={styles.formCard} contentStyle={styles.formCardContent}>
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
                            placeholder="Create a password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <FormField
                            control={control}
                            name="confirm_password"
                            label="Confirm password"
                            placeholder="Re-enter your password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <View style={styles.submitArea}>
                            <SubmitButton
                                loading={isSubmitting}
                                onPress={handleSubmit(onSubmit, onInvalid)}
                                label="Create account"
                                loadingLabel="Creating account..."
                            />
                        </View>
                    </Card>

                    {/* Sign in */}
                    <View style={styles.signInArea}>
                        <Text style={styles.signInPrompt}>Already have an account?</Text>
                        <Pressable onPress={handleSignIn}>
                            <Text style={styles.signInLink}>Sign in</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.xxl,
        paddingBottom: spacing.xxxl,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: spacing.md,
    },
    titleBlock: {
        flex: 1,
        paddingRight: spacing.md,
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -0.7,
    },
    subtitle: {
        ...typography.description,
        marginTop: spacing.sm,
        maxWidth: 280,
    },
    roleTag: {
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.xs + 1,
        borderRadius: radius.sm,
        backgroundColor: colors.iconBackground,
        marginTop: spacing.xs,
    },
    roleTagText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.primary,
    },

    schoolLine: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: spacing.lg,
        marginBottom: spacing.xxl,
    },
    schoolLineCode: {
        fontWeight: '700',
        color: colors.text,
    },

    formCard: {
        marginBottom: 0,
    },
    formCardContent: {
        padding: spacing.xl,
    },
    submitArea: {
        marginTop: spacing.xs,
    },

    signInArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
    },
    signInPrompt: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    signInLink: {
        fontSize: 13,
        fontWeight: '800',
        color: colors.primary,
        marginLeft: spacing.xs + 1,
    },
});