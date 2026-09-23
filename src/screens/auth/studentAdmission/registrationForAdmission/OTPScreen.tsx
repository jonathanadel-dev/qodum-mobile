import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Keyboard,
    Pressable,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

import BackgroundScreen from '../../../../components/BackgroundScreen';
import FloatingModal, { FloatingModalRef } from '../../../../components/FloatingModal';
import FormInput from '../../../../components/form/input/FormInput';
import CodeInput from '../../../../components/form/CodeInput';
import { colors, metrics } from '../../../../styles/theme';
import { AuthStackParamList } from '../../../../navigation/AuthStack';
import toast from '../../../../lib/toast';
import Button from '../../../../components/Button';
import AppText from '../../../../components/AppText';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;


// Lengths
const OTP_LENGTH = 4;
const PHONE_LENGTH = 10;
const RESEND_SECONDS = 25;


// OTP screen
export default function OTPScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params;
    const [phone, setPhone] = useState('');
    const [otpVisible, setOtpVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [resendSeconds, setResendSeconds] = useState(RESEND_SECONDS);
    const [verifying, setVerifying] = useState(false);
    const modalRef = useRef<FloatingModalRef>(null);

    const isPhoneComplete = phone.length === PHONE_LENGTH;
    const maskedPhone = phone.length >= 2 ? `********${phone.slice(-2)}` : '**********';

    useEffect(() => {
        if (!otpVisible) return;
        if (resendSeconds <= 0) return;

        const timer = setInterval(() => {
            setResendSeconds((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [otpVisible, resendSeconds]);


    // Handlers
    const handlePhoneChange = (value: string) => {
        const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, PHONE_LENGTH);
        setPhone(digitsOnly);

        if (digitsOnly.length === PHONE_LENGTH) {
            Keyboard.dismiss();
        }
    };
    const handleGetOtp = () => {
        Keyboard.dismiss();

        if (!isPhoneComplete) {
            toast.error('Please enter a valid 10-digit mobile number.');
            return;
        }

        setOtp('');
        setResendSeconds(RESEND_SECONDS);
        setOtpVisible(true);
    };
    const handleResend = () => {
        if (resendSeconds > 0) return;
        setResendSeconds(RESEND_SECONDS);
        // TODO: trigger real OTP resend API call
    };
    const handleCloseModal = () => {
        setOtpVisible(false);
    };
    const handleVerify = async () => {
        if (otp.length !== OTP_LENGTH) return;

        setVerifying(true);
        try {
            // TODO: real OTP verification API call
            await new Promise((resolve:any) => setTimeout(resolve, 900));

            modalRef.current?.close(() => {
                navigation.navigate('StudentAdmissionForm', { schoolCode });
            });
        } catch {
            toast.error('Invalid code. Please try again.');
        } finally {
            setVerifying(false);
        }
    };

    
    const isOtpComplete = otp.length === OTP_LENGTH;

    return (
        <BackgroundScreen navigation={navigation}>
            <View style={styles.screen}>
                <View style={styles.content}>
                    <Image
                        source={require('../../../../assets/images/logo.png')}
                        style={styles.seal}
                        resizeMode="contain"
                    />

                    <AppText style={styles.label}>Enter Your Mobile No.</AppText>

                    <View style={styles.phoneFieldWrapper}>
                        <FormInput
                            value={phone}
                            onChangeText={handlePhoneChange}
                            placeholder="Enter your number"
                            keyboardType="phone-pad"
                            maxLength={PHONE_LENGTH}
                            style={styles.phoneInputOverride}
                        />

                        <AppText style={styles.countryCodeOverlay}>+91 | </AppText>

                        {isPhoneComplete && (
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color={colors.success}
                                style={styles.checkOverlay}
                            />
                        )}
                    </View>

                    <Pressable style={styles.getOtpButton} onPress={handleGetOtp}>
                        <AppText style={styles.getOtpText}>Get OTP</AppText>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <AppText style={styles.footerText}>Powered By</AppText>
                    <Image
                        source={require('../../../../assets/images/logo.png')}
                        style={styles.footerLogo}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <FloatingModal
                ref={modalRef}
                visible={otpVisible}
                onClose={handleCloseModal}
                dismissOnBackdropPress
            >
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
                    <>
                        <Button
                            label='Verify'
                            loadingLabel='Verifying'
                            onPress={handleVerify}
                            loading={verifying}
                            type='gradient'
                            style={styles.verifyButton}
                        />
                    </>
                ) : (
                    <Button
                        label='Continue'
                        type='white'
                        onPress={() => toast.info('Please enter the OTP')}
                        style={styles.continueButton}
                        textStyle={styles.continueButtonText}
                    />
                )}
            </FloatingModal>
        </BackgroundScreen>
    );
}


// Styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        alignItems: 'center',
        marginTop: '25%',
    },
    seal: {
        width: 150,
        height: 150,
        marginBottom: metrics.xxl,
    },
    label: {
        // ...typography.title,
        fontSize: 18,
        marginBottom: metrics.lg,
    },
    phoneFieldWrapper: {
        width: '100%',
        position: 'relative',
        marginBottom: metrics.xxl,
    },
    phoneInputOverride: {
        paddingLeft: 54,
        paddingTop: 15,
        paddingRight: 40,
        borderWidth:1,
        borderColor: '#000',
        backgroundColor:colors.iconBackground
    },
    countryCodeOverlay: {
        position: 'absolute',
        left: 14,
        top: 15,
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    checkOverlay: {
        position: 'absolute',
        right: 14,
        top: 15,
    },
    getOtpButton: {
        width: '70%',
        height: 50,
        borderRadius: metrics.round,
        borderWidth: 1.5,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.iconBackground
    },
    getOtpText: {
        color: colors.primary,
        fontSize: 16
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: metrics.sm,
        paddingBottom: metrics.xl,
    },
    footerText: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    footerLogo: {
        width: 90,
        height: 28,
    },

    // Modal content
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
        paddingHorizontal: 20,
        marginBottom: metrics.xl,
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
        fontWeight: '700',
    },
    verifyButton: {
        width: '100%',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifyButtonDisabled: {
        opacity: 0.7,
    },
    verifyButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
});