// screens/admission/admissionProcedure/AdmissionProcedureScreen.tsx

import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Card from '../../../components/Card';
import Header from '../../../components/Header';
import CustomStatusBar from '../../../components/CustomStatusBar';

import { colors, radius, spacing, typography } from '../../../styles/theme';
import { formStyles as styles } from '../../../styles/common';


// Type
type Props = {
    navigation: any;
    route: {
        params: {
            schoolCode: string;
        };
    };
};


// Mock data
// Replace this with the plain text returned from the database.
const admissionProcedure = `
Admission to the school is carried out through a simple and transparent process. Parents and students are encouraged to read the following information carefully before submitting an application.

Before starting your application, make sure that you meet the admission requirements for the class you wish to join. You should also have all the required documents and information available.

To apply, open the Admission Form from the admission portal and complete all the required fields. Please make sure that the information provided is accurate and matches the student's official documents.

After completing the form, review all the information carefully and submit the application. Once the application has been successfully submitted, you will receive a registration number. Please keep this number safe, as it will be required to track your application and access other admission services.

The school's admission team will review the submitted application. Depending on the class and the school's admission requirements, the student may be contacted for an assessment, interview, or additional documentation.

After the review process has been completed, the admission result will be made available through the admission portal. Students who are admitted will receive further instructions regarding enrollment and any remaining requirements.

Applicants are advised to complete all steps within the deadlines announced by the school. Applications submitted after the specified deadline may not be considered.

Admission requirements, available places, assessment procedures, deadlines, and enrollment requirements may vary depending on the academic year and the class being applied for. Please refer to the information provided by the school for the current admission cycle.
`.trim();


// Admission procedure screen
export default function AdmissionProcedureScreen({
    navigation,
    route,
}: Props) {

    // State
    const { schoolCode } = route.params || {};


    return (
        <View style={styles.container}>

            {/* Status bar */}
            <CustomStatusBar />

            {/* Decorative background */}
            <View style={screenStyles.backgroundCircleBottom} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={screenStyles.scrollContent}
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
                        Admission Procedure
                    </Text>

                    <Text style={screenStyles.subtitle}>
                        Please read the admission procedure carefully
                        before starting your application.
                    </Text>

                </View>


                {/* Procedure */}
                <Card
                    style={screenStyles.procedureCard}
                    contentStyle={screenStyles.procedureContent}
                >

                    {/* Document header */}
                    <View style={screenStyles.documentHeader}>

                        <View style={screenStyles.documentIcon}>
                            <Text style={screenStyles.documentIconText}>
                                ≡
                            </Text>
                        </View>

                        <View style={screenStyles.documentHeaderText}>

                            <Text style={screenStyles.documentTitle}>
                                Admission information
                            </Text>

                            <Text style={screenStyles.documentSubtitle}>
                                Please read before applying
                            </Text>

                        </View>

                    </View>


                    {/* Divider */}
                    <View style={screenStyles.divider} />


                    {/* Plain text */}
                    <Text style={screenStyles.procedureText}>
                        {admissionProcedure}
                    </Text>

                </Card>


                {/* Important information */}
                <View style={screenStyles.infoCard}>

                    <View style={screenStyles.infoIcon}>

                        <Text style={screenStyles.infoIconText}>
                            i
                        </Text>

                    </View>


                    <View style={screenStyles.infoContent}>

                        <Text style={screenStyles.infoTitle}>
                            Before you apply
                        </Text>

                        <Text style={screenStyles.infoText}>
                            Make sure you have all the required information
                            and documents available before starting the
                            admission form.
                        </Text>

                    </View>

                </View>


                {/* Bottom action */}
                <View style={screenStyles.bottom}>

                    <Text style={screenStyles.bottomText}>
                        Ready to begin?
                    </Text>

                    <Text
                        style={screenStyles.bottomLink}
                        onPress={() =>
                            navigation.navigate('StudentAdmissionForm', {
                                schoolCode,
                            })
                        }
                    >
                        Start your admission application →
                    </Text>

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
        </View>
    );
}


// Styles
const screenStyles = StyleSheet.create({

    /* Layout */

    scrollContent: {
        paddingBottom: 40,
        paddingHorizontal: 20
    },


    /* Background */

    backgroundCircleBottom: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#F3FAFD',
        bottom: -170,
        left: -170,
    },


    /* Header */

    header: {
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },

    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },

    eyebrowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: '800',
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
        fontWeight: '800',
        letterSpacing: 1,
        color: colors.textSecondary,
    },

    title: {
        fontSize: 30,
        lineHeight: 37,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -0.8,
    },

    subtitle: {
        ...typography.description,
        marginTop: spacing.sm + 2,
        lineHeight: 21,
        maxWidth: 350,
    },


    /* Procedure card */

    procedureCard: {
        marginBottom: 0,
    },

    procedureContent: {
        padding: spacing.xl,
    },


    /* Document header */

    documentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    documentIcon: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },

    documentIconText: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.primary,
        marginTop: -2,
    },

    documentHeaderText: {
        flex: 1,
    },

    documentTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.text,
    },

    documentSubtitle: {
        fontSize: 11.5,
        color: colors.textSecondary,
        marginTop: 3,
    },


    /* Divider */

    divider: {
        height: 1,
        backgroundColor: '#EAF0F3',
        marginVertical: spacing.lg,
    },


    /* Procedure text */

    procedureText: {
        fontSize: 14,
        lineHeight: 23,
        color: '#465761',
        letterSpacing: 0.05,
    },


    /* Information */

    infoCard: {
        marginTop: spacing.xl,
        padding: spacing.lg,
        borderRadius: 18,
        backgroundColor: '#F7FBFD',
        borderWidth: 1,
        borderColor: '#E2EEF3',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    infoIcon: {
        width: 32,
        height: 32,
        borderRadius: radius.round,
        backgroundColor: '#EAF7FC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },

    infoIconText: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.primary,
    },

    infoContent: {
        flex: 1,
    },

    infoTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 5,
    },

    infoText: {
        fontSize: 11.5,
        lineHeight: 18,
        color: colors.textSecondary,
    },


    /* Bottom */

    bottom: {
        alignItems: 'center',
        marginTop: spacing.xxl,
    },

    bottomText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 5,
    },

    bottomLink: {
        fontSize: 13,
        fontWeight: '800',
        color: colors.primary,
    },


    /* Footer */

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
    },

    footerText: {
        fontSize: 9,
        fontWeight: '700',
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
        fontWeight: '800',
        letterSpacing: 1,
        color: colors.textSecondary,
    },
});