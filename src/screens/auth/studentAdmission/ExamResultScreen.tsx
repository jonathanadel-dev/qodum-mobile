// src/screens/auth/ExamResultScreen.tsx
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { colors, metrics } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import AppText from '../../../components/AppText';

type Props = NativeStackScreenProps<AuthStackParamList, 'ExamResult'>;

const EXAM_RESULT = {
    schoolName: 'THE PILLAR PUBLIC SCHOOL',
    schoolAddress: 'Rajendra Nagar, Sector 4 Ghaziabad,\nUttar Pradesh – 201001',
    schoolLogo: require('../../../assets/images/logo.png'),
    studentName: 'Anjali Kumar Gupta',
    registrationNo: 'REG202600145',
    className: 'XI',
    maximumMarks: 100,
    marksObtained: 72,
    resultStatus: 'PASS',
};

export default function ExamResultScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Header title="Exam Result" navigation={navigation} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    <View style={styles.schoolRow}>
                        <Image
                            source={EXAM_RESULT.schoolLogo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={styles.schoolTextContainer}>
                            <AppText variant="h2" style={styles.schoolName} numberOfLines={1}>
                                {EXAM_RESULT.schoolName}
                            </AppText>
                            <AppText variant="h3" style={styles.schoolAddress}>
                                {EXAM_RESULT.schoolAddress}
                            </AppText>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <AppText variant="h2" style={styles.label}>Student Name</AppText>
                        <AppText variant="h2" style={styles.colon}>:</AppText>
                        <AppText variant="desc" style={styles.value}>{EXAM_RESULT.studentName}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText variant="h2" style={styles.label}>Registration No</AppText>
                        <AppText variant="h2" style={styles.colon}>:</AppText>
                        <AppText variant="desc" style={styles.value}>{EXAM_RESULT.registrationNo}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText variant="h2" style={styles.label}>Class</AppText>
                        <AppText variant="h2" style={styles.colon}>:</AppText>
                        <AppText variant="desc" style={styles.value}>{EXAM_RESULT.className}</AppText>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <AppText variant="h2" style={styles.label}>Maximum Marks</AppText>
                        <AppText variant="h2" style={styles.colon}>:</AppText>
                        <AppText variant="desc" style={styles.value}>{EXAM_RESULT.maximumMarks}</AppText>
                    </View>

                    <View style={styles.row}>
                        <AppText variant="h2" style={styles.label}>Marks Obtained</AppText>
                        <AppText variant="h2" style={styles.colon}>:</AppText>
                        <AppText variant="desc" style={styles.value}>{EXAM_RESULT.marksObtained}</AppText>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statusRow}>
                        <AppText variant="h2" style={styles.label}>Result Status</AppText>
                        <AppText variant="h2" style={styles.passText}>{EXAM_RESULT.resultStatus}</AppText>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.admitCardBackground,
    },
    scrollContent: {
        padding: metrics.lg,
    },
    card: {
        borderWidth: 1,
        borderColor: '#999',
        padding: metrics.md,
    },
    schoolRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    schoolTextContainer: {
        flex: 1,
    },
    schoolName: {
        fontSize: 18,
        color: colors.primary,
        marginBottom: metrics.xs,
    },
    schoolAddress: {
        fontSize: 12,
        color: colors.text,
        lineHeight: 16,
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#999',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    label: {
        fontSize: 14,
        color: colors.text,
        width: 130,
    },
    colon: {
        fontSize: 14,
        color: colors.text,
        marginRight: metrics.sm,
    },
    value: {
        fontSize: 14,
        color: colors.text,
        flex: 1,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: metrics.xs,
    },
    passText: {
        fontSize: 14,
        color: '#28C76F',
    },
});