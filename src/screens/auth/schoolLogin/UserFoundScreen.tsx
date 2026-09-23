import React from 'react';
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Card from '../../../components/Card';
import Button from '../../../components/Button';
import { colors, metrics } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import AppText from '../../../components/AppText';

type Props = NativeStackScreenProps<AuthStackParamList, 'UserFound'>;

const user = {
    id: 'stu_10254',
    name: 'Rahul Kumar',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    phone: '9198765214521',
    admissionNo: '10254',
    className: 'IX-A',
    session: '2026 - 27',
};

export default function UserFoundScreen({ navigation, route }: Props) {
    const { role, schoolCode } = route.params;
    const isStudent = role === 'student';

    const maskedPhone = user.phone.length >= 4
        ? `${'*'.repeat(Math.max(user.phone.length - 4, 0))}${user.phone.slice(-4)}`
        : user.phone;

    const handleContinue = () => {
        navigation.navigate('VerifyOTP', {
            schoolCode,
            // role,
            // userId: user.id,
            // phone: user.phone,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={12}>
                <Ionicons name="chevron-back" size={26} color={colors.primary} />
            </Pressable>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.successIconWrapper}>
                    <Ionicons name="checkmark-circle" size={84} color={colors.success} />
                </View>

                <AppText style={styles.title}>{isStudent ? 'Student Found' : 'Teacher Found'}</AppText>
                <AppText style={styles.subtitle}>Please confirm the details below</AppText>

                <Card contentStyle={styles.userCardContent}>
                    <Image source={{ uri: user.photo }} style={styles.avatar} />

                    <View style={styles.userTextBlock}>
                        <AppText style={styles.userName}>{user.name}</AppText>

                        {/* {isStudent ? (
                            <>
                                <AppText style={styles.detailLine}>Admission No. {user.admissionNo}</AppText>
                                <AppText style={styles.detailLine}>Class {user.className}</AppText>
                                <AppText style={styles.detailLine}>Session {user.session}</AppText>
                            </>
                        ) : (
                            <>
                                <AppText style={styles.detailLine}>Employee ID {user.employeeId}</AppText>
                                <AppText style={styles.detailLine}>{user.department}</AppText>
                                <AppText style={styles.detailLine}>Session {user.session}</AppText>
                            </>
                        )} */}
                        <>
                            <AppText style={styles.detailLine}>Admission No. {user.admissionNo}</AppText>
                            <AppText style={styles.detailLine}>Class {user.className}</AppText>
                            <AppText style={styles.detailLine}>Session {user.session}</AppText>
                        </>
                    </View>
                </Card>

                <View style={styles.otpNoticeRow}>
                    <Ionicons name="call" size={20} color={colors.success} />
                    <AppText style={styles.otpNoticeText}>
                        OTP will be sent to <AppText style={styles.otpNoticePhone}>{maskedPhone}</AppText>
                    </AppText>
                </View>

                <Button
                    type="gradient"
                    label="Send OTP"
                    onPress={handleContinue}
                    style={styles.continueButton}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    backButton: {
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.md,
    },
    scrollContent: {
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.xl,
        paddingBottom: metrics.xxxl,
        alignItems: 'center',
    },
    successIconWrapper: {
        marginBottom: metrics.lg,
    },
    title: {
        // ...typography.title,
        fontSize: 22,
        color: colors.primary,
        marginBottom: metrics.xs,
    },
    subtitle: {
        // ...typography.description,
        marginBottom: metrics.xxl,
    },
    userCardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: metrics.round,
        marginRight: metrics.lg,
    },
    userTextBlock: {
        flex: 1,
    },
    userName: {
        // ...typography.title,
        fontSize: 17,
        marginBottom: metrics.xs,
    },
    detailLine: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    otpNoticeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: metrics.md,
        marginTop: metrics.xl,
        marginBottom: metrics.xxl,
    },
    otpNoticeText: {
        fontSize: 14,
        color: colors.text,
        flex: 1,
    },
    otpNoticePhone: {
        fontWeight: '700',
        color: colors.primary,
    },
    continueButton: {
        width: '100%',
        height: 54,
    },
});