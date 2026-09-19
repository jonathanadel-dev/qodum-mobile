import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors, fonts, spacing } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../../components/Header';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'ExamResult'>;


// Mock result
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


// Exam result screen
export default function ExamResultScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Header title="Exam Result" navigation={navigation}/>

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
                            <Text style={styles.schoolName} numberOfLines={1}>
                                {EXAM_RESULT.schoolName}
                            </Text>
                            <Text style={styles.schoolAddress}>
                                {EXAM_RESULT.schoolAddress}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Student Name</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{EXAM_RESULT.studentName}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Registration No</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{EXAM_RESULT.registrationNo}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Class:</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{EXAM_RESULT.className}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Maximum Marks</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{EXAM_RESULT.maximumMarks}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Marks Obtained</Text>
                        <Text style={styles.colon}>:</Text>
                        <Text style={styles.value}>{EXAM_RESULT.marksObtained}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statusRow}>
                        <Text style={styles.label}>Result Status</Text>
                        <Text style={styles.passText}>{EXAM_RESULT.resultStatus}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.admitCardBackground,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    scrollContent: {
        padding: 16,
    },
    card: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 12,
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
        flex: 1
    },
    schoolName: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: colors.primary,
        marginBottom: 4,
    },
    schoolAddress: {
        fontSize: 12,
        fontFamily: fonts.semiBold,
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
        fontFamily: fonts.bold,
        color: colors.text,
        width: 130,
    },
    colon: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: colors.text,
        marginRight: 8,
    },
    value: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.text,
        flex: 1,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    passText: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: '#28C76F',
    },
});