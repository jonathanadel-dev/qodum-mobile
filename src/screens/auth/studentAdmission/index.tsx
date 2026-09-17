import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Card from '../../../components/Card';
import Header from '../../../components/Header';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import { formStyles as styles } from '../../../styles/common';
import Slider from '../../../components/form/Slider';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'StudentAdmission'>;
type Route = keyof Pick<
    AuthStackParamList,
    'StudentAdmissionProcedure' | 'StudentAdmissionForm' | 'TrackApplication'
>;
type AdmissionOption = {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
    route?: Route;
};


// Admission options
const ADMISSION_OPTIONS: AdmissionOption[] = [
    {
        id: 'procedure',
        title: 'Admission Procedure',
        description:
            'Learn about the admission process, requirements and important steps.',
        icon: 'list-outline',
        route: 'StudentAdmissionProcedure',
    },
    {
        id: 'form',
        title: 'Admission Form',
        description:
            'Complete your application and submit your information to the school.',
        icon: 'document-text-outline',
        route: 'StudentAdmissionForm',
    },
    {
        id: 'track',
        title: 'Track Application',
        description:
            'Use your registration number to check the status of your application.',
        icon: 'search-outline',
        route: 'TrackApplication'
    },
    {
        id: 'admit',
        title: 'Download Admit Card',
        description:
            'Download your admit card once your application has been approved.',
        icon: 'download-outline',
    },
    {
        id: 'result',
        title: 'Admission Result',
        description:
            'Check your admission or selection result after the application process.',
        icon: 'checkmark-circle-outline',
    },
    {
        id: 'bus',
        title: 'Bus Stoppage',
        description:
            'Find available school bus routes and the stops serving your area.',
        icon: 'bus-outline',
    }
];


// Student admission screen
export default function StudentAdmissionScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params;


    // Press handler
    const pressHandler = (route: Route | undefined) => {
        if(!route) return;
        navigation.navigate(route, {schoolCode})
    }

    return (
        <View style={styles.container}>

            {/* Status bar */}
            <StatusBar barStyle='dark-content' />

            {/* Background decoration */}
            <View style={screenStyles.backgroundCircleTop} />
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
                            <Text style={screenStyles.schoolCodeLabel}>
                                {schoolCode || '------'}
                            </Text>
                        </View>

                    </View>


                    <Text style={screenStyles.title}>
                        Begin your journey.
                    </Text>

                    <Text style={screenStyles.subtitle}>
                        Everything you need to apply, track your
                        application and prepare for admission.
                    </Text>

                </View>


                {/* Image slider */}
                <Slider />


                {/* Portal heading */}
                <View style={screenStyles.sectionHeader}>

                    <View>
                        <Text style={screenStyles.sectionEyebrow}>
                            EXPLORE
                        </Text>

                        <Text style={screenStyles.sectionTitle}>
                            Admission services
                        </Text>
                    </View>

                </View>


                {/* Admission options */}
                <View style={screenStyles.options}>

                    {ADMISSION_OPTIONS.map((option) => (

                        <Card
                            key={option.id}
                            onPress={() => pressHandler(option.route)}
                            style={screenStyles.optionCard}
                            contentStyle={screenStyles.optionContent}
                        >

                            {/* Icon */}
                            <View style={screenStyles.optionIcon}>
                                <Ionicons
                                    name={option.icon}
                                    size={22}
                                    color={colors.primary}
                                />
                            </View>


                            {/* Content */}
                            <View style={screenStyles.optionBody}>

                                <Text style={screenStyles.optionTitle}>
                                    {option.title}
                                </Text>

                                <Text style={screenStyles.optionDescription}>
                                    {option.description}
                                </Text>

                            </View>


                            {/* Arrow */}
                            <View style={screenStyles.optionArrow}>
                                <Text style={screenStyles.optionArrowText}>
                                    →
                                </Text>
                            </View>

                        </Card>

                    ))}

                </View>


                {/* Bottom information */}
                <View style={screenStyles.bottomInfo}>

                    <View style={screenStyles.bottomInfoIcon}>
                        <Text style={screenStyles.bottomInfoIconText}>
                            i
                        </Text>
                    </View>

                    <View style={screenStyles.bottomInfoContent}>

                        <Text style={screenStyles.bottomInfoTitle}>
                            Need help with your application?
                        </Text>

                        <Text style={screenStyles.bottomInfoText}>
                            Make sure you have your registration number
                            available when checking your application status.
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
        </View>
    );
}


// Styles
const screenStyles = StyleSheet.create({

    /* Layout */
    scrollContent: {
        paddingHorizontal:20,
        paddingVertical: 20,
    },


    /* Background */
    backgroundCircleTop: {
        position: 'absolute',
        width: 330,
        height: 330,
        borderRadius: 165,
        backgroundColor: '#EAF8FE',
        top: -220,
        right: -180,
        opacity: 0.75,
    },
    backgroundCircleBottom: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#F3FAFD',
        bottom: -180,
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
    schoolCodeLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: colors.textSecondary,
    },
    title: {
        fontSize: 31,
        lineHeight: 38,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -1,
    },
    subtitle: {
        ...typography.description,
        marginTop: spacing.sm + 2,
        lineHeight: 21,
        maxWidth: 350,
    },


    /* Section header */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    sectionEyebrow: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: colors.primary,
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 21,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -0.3,
    },


    /* Options */
    options: {
        gap: 11,
    },
    optionCard: {
        marginBottom: 0,
    },
    optionContent: {
        minHeight: 105,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        width: 47,
        height: 47,
        borderRadius: 15,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13,
    },
    optionIconText: {
        fontSize: 22,
        fontWeight: '500',
        color: colors.primary,
    },
    optionBody: {
        flex: 1,
        paddingRight: 25,
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 5,
    },
    optionDescription: {
        fontSize: 11.5,
        lineHeight: 17,
        color: colors.textSecondary,
    },
    optionArrow: {
        width: 31,
        height: 31,
        borderRadius: radius.round,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    optionArrowText: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.primary,
        marginTop: -1,
    },


    /* Bottom information */
    bottomInfo: {
        marginTop: spacing.xl,
        padding: 15,
        borderRadius: 17,
        backgroundColor: '#F7FBFD',
        borderWidth: 1,
        borderColor: '#E2EEF3',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bottomInfoIcon: {
        width: 31,
        height: 31,
        borderRadius: radius.round,
        backgroundColor: '#E5F6FC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11,
    },
    bottomInfoIconText: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.primary,
    },
    bottomInfoContent: {
        flex: 1,
    },
    bottomInfoTitle: {
        fontSize: 12.5,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
    },
    bottomInfoText: {
        fontSize: 11,
        lineHeight: 17,
        color: colors.textSecondary,
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
    }
});