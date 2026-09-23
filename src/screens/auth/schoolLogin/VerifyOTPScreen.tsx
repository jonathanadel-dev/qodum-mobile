import React, { useEffect, useState } from 'react';
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
import { colors, metrics } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import CodeInput from '../../../components/form/CodeInput';
import toast from '../../../lib/toast';
import { useAuth } from '../../../context/AuthContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import AppText from '../../../components/AppText';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'VerifyOTP'>;


// Constants
const OTP_LENGTH = 4;
const RESEND_SECONDS = 25;
const maskedPhone = '**********99';


// Check OTP
export default function VerifyOTPScreen({ navigation, route }: Props) {

    // State
    const {login} = useAuth();
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
            login('dthth', {
                id:'456164',
                number:'684684',
                name: 'Danilla Mohamed',
                role: 'student'
            });
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
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={12}>
                <Ionicons name="chevron-back" size={26} color={colors.primary} />
            </Pressable>

            <View style={styles.content}>


                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <AppText style={styles.modalTitle}>OTP Authentication</AppText>
                <AppText style={styles.modalSubtitle}>
                    An authentication code has been sent to {maskedPhone}
                </AppText>

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
                    <AppText style={styles.resendPrompt}>Didn't receive code. </AppText>
                    <AppText
                        style={[styles.resendLink, resendSeconds > 0 && styles.resendLinkDisabled]}
                        onPress={handleResend}
                    >
                        Resend {resendSeconds > 0 ? `( ${resendSeconds}s )` : ''}
                    </AppText>
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
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: metrics.xxl,
        paddingTop: metrics.xxxl * 2,
    },
    backButton: {
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.md,
    },
    logo: {
        width: 220,
        height: 90,
        marginBottom: metrics.xxl,
        alignSelf: 'center',
    },
    modalTitle: {
        // ...typography.title,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: metrics.sm,
    },
    modalSubtitle: {
        // ...typography.description,
        textAlign: 'center',
        marginBottom: metrics.xxl,
    },
    otpWrapper: {
        marginBottom: metrics.xl,
        paddingHorizontal: 50
    },
    resendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: metrics.xxl,
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
        borderRadius: metrics.sm,
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
        borderRadius: metrics.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
});