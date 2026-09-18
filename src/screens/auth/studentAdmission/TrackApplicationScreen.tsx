import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from '../../../lib/toast';
import FormField from '../../../components/form/input/FormField';
import SubmitButton from '../../../components/Button';
import Card from '../../../components/Card';
import {
    trackApplicationSchema,
    TrackApplicationFormData,
} from '../.././../lib/zodSchemas/trackApplication';
import { formStyles as styles } from '../../../styles/common';
import { colors, radius, spacing } from '../../../styles/theme';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Header from '../../../components/Header';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Types
type ApplicationStatus =
    | 'pending'
    | 'under_review'
    | 'approved'
    | 'rejected';
type ApplicationStatusResult = {
    registrationNumber: string;
    status: ApplicationStatus;
    title: string;
    description: string;
};
type Props = NativeStackScreenProps<AuthStackParamList, 'TrackApplication'>;


// Track application screen
export default function TrackApplicationScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params || {};
    const [application, setApplication] = useState<ApplicationStatusResult | null>(null);


    // Form
    const defaultValues: TrackApplicationFormData = {
        registration_number: '',
    };
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<TrackApplicationFormData>({
        resolver: zodResolver(trackApplicationSchema),
        defaultValues,
    });


    // Submit handlers
    const onSubmit = async (data: TrackApplicationFormData) => {
        try {

            await new Promise((resolve:any) => setTimeout(resolve, 1000));

            // Temporary mock response
            const result: ApplicationStatusResult = {
                registrationNumber: data.registration_number,
                status: 'under_review',
                title: 'Application under review',
                description:
                    'Your application has been received and is currently being reviewed by the school.',
            };

            setApplication(result);
        } catch {
            toast.error(
                'Unable to check your application. Please try again.'
            );
        }
    };
    const onInvalid = () => {
        toast.error('Please enter your registration number.');
    };


    // Get status label
    const getStatusLabel = (status: ApplicationStatus) => {
        switch (status) {
            case 'pending':
                return 'Pending';

            case 'under_review':
                return 'Under review';

            case 'approved':
                return 'Admitted';

            case 'rejected':
                return 'Not admitted';

            default:
                return 'Unknown';
        }
    };

    return (
        <View style={styles.container}>
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
                    <View style={screenStyles.header}>
                        <View style={screenStyles.headerTop}>
                            <View style={screenStyles.eyebrowContainer}>
                                <View style={screenStyles.eyebrowDot} />

                                <Text style={screenStyles.eyebrow}>
                                    ADMISSION PORTAL
                                </Text>
                            </View>

                            <View style={screenStyles.schoolCodePill}>
                                <Text style={screenStyles.schoolCodeText}>
                                    {schoolCode || '------'}
                                </Text>
                            </View>
                        </View>

                        <Text style={screenStyles.title}>
                            Track your application
                        </Text>

                        <Text style={screenStyles.subtitle}>
                            Enter your registration number to check the
                            current status of your admission application.
                        </Text>
                    </View>

                    {/* Form */}
                    <Card
                        style={screenStyles.formCard}
                        contentStyle={screenStyles.formContent}
                    >
                        <View style={screenStyles.formHeader}>
                            <View style={screenStyles.formIcon}>
                                <Text style={screenStyles.formIconText}>
                                    #
                                </Text>
                            </View>

                            <View style={screenStyles.formHeaderText}>
                                <Text style={screenStyles.formTitle}>
                                    Application status
                                </Text>

                                <Text style={screenStyles.formDescription}>
                                    Use the registration number you received
                                    after submitting your application.
                                </Text>
                            </View>
                        </View>

                        <View style={screenStyles.divider} />

                        <FormField
                            control={control}
                            name="registration_number"
                            label="Registration number"
                            placeholder="Enter registration number"
                            autoCapitalize="characters"
                            autoCorrect={false}
                        />

                        <SubmitButton
                            loading={isSubmitting}
                            onPress={handleSubmit(onSubmit, onInvalid)}
                            label="Check application status"
                            loadingLabel="Checking..."
                        />
                    </Card>

                    {/* Result */}
                    {application && (
                        <Card
                            style={screenStyles.resultCard}
                            contentStyle={screenStyles.resultContent}
                        >
                            <View style={screenStyles.resultHeader}>
                                <View style={screenStyles.resultIcon}>
                                    <Text style={screenStyles.resultIconText}>
                                        ✓
                                    </Text>
                                </View>

                                <View style={screenStyles.resultHeaderText}>
                                    <Text style={screenStyles.resultEyebrow}>
                                        APPLICATION FOUND
                                    </Text>

                                    <Text style={screenStyles.resultNumber}>
                                        {application.registrationNumber}
                                    </Text>
                                </View>
                            </View>

                            <View style={screenStyles.resultDivider} />

                            <Text style={screenStyles.resultLabel}>
                                CURRENT STATUS
                            </Text>

                            <View style={screenStyles.statusRow}>
                                <View style={screenStyles.statusDot} />

                                <Text style={screenStyles.statusText}>
                                    {getStatusLabel(application.status)}
                                </Text>
                            </View>

                            <Text style={screenStyles.resultTitle}>
                                {application.title}
                            </Text>

                            <Text style={screenStyles.resultDescription}>
                                {application.description}
                            </Text>
                        </Card>
                    )}

                    {/* Help */}
                    <View style={screenStyles.helpCard}>
                        <View style={screenStyles.helpIcon}>
                            <Text style={screenStyles.helpIconText}>
                                i
                            </Text>
                        </View>

                        <View style={screenStyles.helpContent}>
                            <Text style={screenStyles.helpTitle}>
                                Don't have your registration number?
                            </Text>

                            <Text style={screenStyles.helpDescription}>
                                Your registration number was provided after
                                successfully submitting your admission
                                application. Keep it safe for future
                                admission services.
                            </Text>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={screenStyles.footer}>
                        <Text style={screenStyles.footerText}>
                            SCHOOL CODE
                        </Text>

                        <View style={screenStyles.footerDot} />

                        <Text style={screenStyles.footerCode}>
                            {schoolCode || '------'}
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const screenStyles = {
    header: {
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },

    headerTop: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        marginBottom: spacing.md,
    },

    eyebrowContainer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
    },

    eyebrowDot: {
        width: 7,
        height: 7,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        marginRight: 7,
    },

    eyebrow: {
        fontSize: 10,
        fontWeight: '800' as const,
        letterSpacing: 1.5,
        color: colors.primary,
    },

    schoolCodePill: {
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: radius.round,
        backgroundColor: '#F1F8FB',
        borderWidth: 1,
        borderColor: '#E2EEF3',
    },

    schoolCodeText: {
        fontSize: 10,
        fontWeight: '800' as const,
        letterSpacing: 1,
        color: colors.textSecondary,
    },

    title: {
        fontSize: 30,
        lineHeight: 37,
        fontWeight: '800' as const,
        color: colors.text,
        letterSpacing: -0.8,
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.textSecondary,
        marginTop: spacing.sm + 2,
        maxWidth: 350,
    },

    formCard: {
        marginBottom: 0,
    },

    formContent: {
        padding: spacing.xl,
    },

    formHeader: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
    },

    formIcon: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: colors.iconBackground,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        marginRight: spacing.md,
    },

    formIconText: {
        fontSize: 21,
        fontWeight: '800' as const,
        color: colors.primary,
    },

    formHeaderText: {
        flex: 1,
    },

    formTitle: {
        fontSize: 16,
        fontWeight: '800' as const,
        color: colors.text,
    },

    formDescription: {
        fontSize: 11.5,
        lineHeight: 17,
        color: colors.textSecondary,
        marginTop: 3,
    },

    divider: {
        height: 1,
        backgroundColor: '#EAF0F3',
        marginVertical: spacing.lg,
    },

    /* Result */
    resultCard: {
        marginTop: spacing.xl,
    },

    resultContent: {
        padding: spacing.xl,
    },

    resultHeader: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
    },

    resultIcon: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: '#EAF8FE',
        borderWidth: 1,
        borderColor: '#CDEEF9',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        marginRight: spacing.md,
    },

    resultIconText: {
        fontSize: 20,
        fontWeight: '800' as const,
        color: colors.primary,
    },

    resultHeaderText: {
        flex: 1,
    },

    resultEyebrow: {
        fontSize: 9,
        fontWeight: '800' as const,
        letterSpacing: 1.3,
        color: colors.primary,
        marginBottom: 3,
    },

    resultNumber: {
        fontSize: 15,
        fontWeight: '800' as const,
        color: colors.text,
        letterSpacing: 0.3,
    },

    resultDivider: {
        height: 1,
        backgroundColor: '#EAF0F3',
        marginVertical: spacing.lg,
    },

    resultLabel: {
        fontSize: 9,
        fontWeight: '800' as const,
        letterSpacing: 1.3,
        color: colors.hash,
        marginBottom: 8,
    },

    statusRow: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        marginBottom: 10,
    },

    statusDot: {
        width: 9,
        height: 9,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        marginRight: 8,
    },

    statusText: {
        fontSize: 16,
        fontWeight: '800' as const,
        color: colors.text,
    },

    resultTitle: {
        fontSize: 13,
        fontWeight: '700' as const,
        color: '#34424B',
        marginTop: 4,
    },

    resultDescription: {
        fontSize: 12.5,
        lineHeight: 19,
        color: colors.textSecondary,
        marginTop: 6,
    },

    /* Help */
    helpCard: {
        marginTop: spacing.xl,
        padding: spacing.lg,
        borderRadius: 18,
        backgroundColor: '#F7FBFD',
        borderWidth: 1,
        borderColor: '#E2EEF3',
        flexDirection: 'row' as const,
        alignItems: 'flex-start' as const,
    },

    helpIcon: {
        width: 32,
        height: 32,
        borderRadius: radius.round,
        backgroundColor: '#EAF7FC',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        marginRight: spacing.md,
    },

    helpIconText: {
        fontSize: 15,
        fontWeight: '800' as const,
        color: colors.primary,
    },

    helpContent: {
        flex: 1,
    },

    helpTitle: {
        fontSize: 13,
        fontWeight: '800' as const,
        color: colors.text,
        marginBottom: 5,
    },

    helpDescription: {
        fontSize: 11.5,
        lineHeight: 18,
        color: colors.textSecondary,
    },

    /* Footer */
    footer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        marginTop: spacing.xxl,
        marginBottom: spacing.lg,
    },

    footerText: {
        fontSize: 9,
        fontWeight: '700' as const,
        letterSpacing: 1,
        color: colors.hash,
    },

    footerDot: {
        width: 3,
        height: 3,
        borderRadius: radius.round,
        backgroundColor: colors.border,
        marginHorizontal: 8,
    },

    footerCode: {
        fontSize: 10,
        fontWeight: '800' as const,
        letterSpacing: 1,
        color: colors.textSecondary,
    },
};