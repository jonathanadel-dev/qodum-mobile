import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import AdmitCard from '../../../components/admitCard/AdmitCard';
import {
    colors,
    fonts,
    radius,
    spacing,
} from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'AdmitCard'>;


// Mock card
const ADMIT_CARD = {
    schoolName: 'THE PILLAR PUBLIC SCHOOL',

    schoolAddress:
        'Rajendra Nagar, Sector 4 Ghaziabad,\nUttar Pradesh – 201001',

    admissionNumber: '11324453',

    studentName: 'Anjali Kumar Gupta',

    fatherName: 'Arjun Kumar Gupta',

    className: '11',

    session: '2025-2026',

    dateOfBirth: '22/10/2006',

    gender: 'Female',

    studentImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};
// Instructions
const INSTRUCTIONS = [
    'Candidates must report to the examination center at least 15 minutes before the exam time.',
    'Entry will not be allowed without a valid admit card.',
    'Mobile phones, smart watches, calculators, and electronic devices are strictly prohibited.',
    'Late entry after the reporting time will not be permitted.',
];


// Admit card screen
export default function AdmitCardScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params || {};


    // Actions
    const handleShare = () => {
        // TODO: Implement native sharing.
    };
    const handleDownload = () => {
        // TODO: Generate and download the admit card.
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <Header
                navigation={navigation}
                title="Admit Card"
            />


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Admit card */}
                <AdmitCard
                    schoolLogo={'../../../assets/images/logo.png'}
                    schoolName={ADMIT_CARD.schoolName}
                    schoolAddress={ADMIT_CARD.schoolAddress}
                    admissionNumber={ADMIT_CARD.admissionNumber}
                    studentName={ADMIT_CARD.studentName}
                    fatherName={ADMIT_CARD.fatherName}
                    className={ADMIT_CARD.className}
                    session={ADMIT_CARD.session}
                    dateOfBirth={ADMIT_CARD.dateOfBirth}
                    gender={ADMIT_CARD.gender}
                    studentImage={ADMIT_CARD.studentImage}
                />


                {/* Divider */}
                <View style={styles.divider} />


                {/* Exam information */}
                <View style={styles.examInfo}>

                    <View style={styles.examItem}>
                        <Text style={styles.examLabel}>
                            Exam Date
                        </Text>

                        <Text style={styles.examValue}>
                            25/03/2026
                        </Text>
                    </View>


                    <View style={styles.examItem}>
                        <Text style={styles.examLabel}>
                            Duration
                        </Text>

                        <Text style={styles.examValue}>
                            3 Hours
                        </Text>
                    </View>

                </View>


                {/* Instructions */}
                <View style={styles.instructions}>

                    <Text style={styles.instructionsTitle}>
                        Important Instructions:
                    </Text>


                    <View style={styles.instructionList}>
                        {INSTRUCTIONS.map((instruction, index) => (
                            <View
                                key={index}
                                style={styles.instruction}
                            >
                                <Text style={styles.bullet}>
                                    •
                                </Text>

                                <Text style={styles.instructionText}>
                                    {instruction}
                                </Text>
                            </View>
                        ))}
                    </View>

                </View>


                {/* Actions */}
                <View style={styles.actions}>

                    <View style={styles.actionButton}>
                        <Button
                            type="white"
                            label="Share"
                            onPress={handleShare}
                            style={styles.shareButton}
                            textStyle={styles.shareText}
                        />
                    </View>


                    <View style={styles.actionButton}>
                        <Button
                            type="gradient"
                            label="Download"
                            onPress={handleDownload}
                            style={styles.downloadButton}
                            textStyle={styles.downloadText}
                        />
                    </View>

                </View>


                {/* School code */}
                <View style={styles.footer}>

                    <Text style={styles.footerLabel}>
                        SCHOOL CODE
                    </Text>

                    <View style={styles.footerDot} />

                    <Text style={styles.footerCode}>
                        {schoolCode || '------'}
                    </Text>

                </View>

            </ScrollView>
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
    },


    /* Divider */
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginTop: spacing.xxl,
        marginBottom: spacing.lg,
    },


    /* Exam information */
    examInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
    },
    examItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    examLabel: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: colors.text,
        marginRight: 4,
    },
    examValue: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.text,
    },


    /* Instructions */
    instructions: {
        marginBottom: spacing.xxl,
    },
    instructionsTitle: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: fonts.bold,
        color: colors.text,
        marginBottom: spacing.md,
    },
    instructionList: {
        gap: spacing.sm,
    },
    instruction: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bullet: {
        width: 15,
        fontSize: 15,
        lineHeight: 21,
        fontFamily: fonts.bold,
        color: colors.text,
    },
    instructionText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: fonts.regular,
        color: colors.text,
    },


    /* Action buttons */
    actions: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    actionButton: {
        flex: 1,
    },
    shareButton: {
        width: '100%',
        height: 48,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: '#858585',
        borderRadius: radius.round,
        backgroundColor: colors.background,
    },
    shareText: {
        fontSize: 15,
        fontFamily: fonts.medium,
        color: colors.primary,
    },
    downloadButton: {
        width: '100%',
        height: 48,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.md,
    },
    downloadText: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: colors.background,
    },


    /* Footer */
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
    },
    footerLabel: {
        fontSize: 9,
        fontFamily: fonts.semiBold,
        letterSpacing: 1,
        color: colors.hash,
    },
    footerDot: {
        width: 3,
        height: 3,
        borderRadius: radius.round,
        backgroundColor: colors.border,
        marginHorizontal: spacing.sm,
    },
    footerCode: {
        fontSize: 10,
        fontFamily: fonts.bold,
        letterSpacing: 1,
        color: colors.textSecondary,
    },
});