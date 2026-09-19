// screens/CheckOTP/CheckOTPScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../../../components/Button';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import CodeInput from '../../../components/form/CodeInput';
import toast from '../../../lib/toast';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'CheckOTP'>;


// Constants
const OTP_LENGTH = 4;
const RESEND_SECONDS = 25;
const maskedPhone = '**********99';


// Check OTP
export default function CheckOTPScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params;
    const [otp, setOtp] = useState('');
    const [resendSeconds, setResendSeconds] = useState(RESEND_SECONDS);
    const [verifying, setVerifying] = useState(false);


    const handleResend = () => {
        if (resendSeconds > 0) return;
        setResendSeconds(RESEND_SECONDS);
        // TODO: trigger real OTP resend API call
    };
    const handleVerify = async () => {
        if (otp.length !== OTP_LENGTH) return;

        setVerifying(true);
        try {
            // TODO: real OTP verification API call
            await new Promise((resolve:any) => setTimeout(resolve, 900));
        } catch {
            toast.error('Invalid code. Please try again.');
        } finally {
            setVerifying(false);
        }
    };

    useEffect(() => {
        if (resendSeconds <= 0) return;

        const timer = setInterval(() => {
            setResendSeconds((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [resendSeconds]);

    const isOtpComplete = otp.length === OTP_LENGTH;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.content}>

                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.modalTitle}>OTP Authentication</Text>
                <Text style={styles.modalSubtitle}>
                    An authentication code has been sent to {maskedPhone}
                </Text>

                <View style={styles.otpWrapper}>
                    <CodeInput
                        length={OTP_LENGTH}
                        value={otp}
                        onChangeText={setOtp}
                        error=""
                        autoFocus
                    />
                </View>

                <View style={styles.resendRow}>
                    <Text style={styles.resendPrompt}>Didn't receive code. </Text>
                    <Text
                        style={[styles.resendLink, resendSeconds > 0 && styles.resendLinkDisabled]}
                        onPress={handleResend}
                    >
                        Resend {resendSeconds > 0 ? `( ${resendSeconds}s )` : ''}
                    </Text>
                </View>

                {isOtpComplete ? (
                    <Button
                        label='Verify'
                        loadingLabel='Verifying'
                        onPress={handleVerify}
                        loading={verifying}
                        type='gradient'
                        style={styles.verifyButton}
                    />
                ) : (
                    <Button
                        label='Continue'
                        type='white'
                        onPress={() => toast.info('Please enter the OTP')}
                        style={styles.continueButton}
                        textStyle={styles.continueButtonText}
                    />
                )}
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
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.xxxl * 2,
    },
    logo: {
        width: 220,
        height: 90,
        marginBottom: spacing.xxl,
        alignSelf: 'center',
    },
    modalTitle: {
        ...typography.title,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    modalSubtitle: {
        ...typography.description,
        textAlign: 'center',
        marginBottom: spacing.xxl,
    },
    otpWrapper: {
        marginBottom: spacing.xl,
        paddingHorizontal: 50
    },
    resendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.xxl,
    },
    resendPrompt: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    resendLink: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.primary,
    },
    resendLinkDisabled: {
        color: colors.textSecondary,
    },
    continueButton: {
        width: '100%',
        height: 52,
        borderRadius: radius.sm,
        borderWidth: 1.5,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        color: colors.primary,
        fontSize: 16,
    },
    verifyButton: {
        width: '100%',
        height: 52,
        borderRadius: radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
});