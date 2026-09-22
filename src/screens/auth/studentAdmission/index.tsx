import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../../../components/Button';
import Slider from '../../../components/Slider';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { getMyAdmissionNumbers } from '../../../lib/localDB';


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'StudentAdmission'>;
type Route = keyof Pick <AuthStackParamList, 'StudentAdmissionProcedure' | 'OTP' | 'TrackApplication' | 'AdmitCard' | 'ExamResult' | 'BusStoppage' | 'PreviousAdmissions'>;
type AdmissionOption = {
    id: string;
    title: string;
    icon: any;
    route?: Route;
};

// Dummy — swap for a real fetch by schoolCode once that endpoint exists
const school = {
    name: 'The Pillar Public School',
    logo: require('../../../assets/images/logo.png'),
    admissionHelpline: '7355378251',
    email: 'wecare@gmail.com',
};


// Student admission
export default function StudentAdmissionScreen({ navigation, route }: Props) {
    const { schoolCode } = route.params;

    let [formRoute, setFormRoute] = useState<Route>('OTP');

    const ADMISSION_OPTIONS: AdmissionOption[] = [
        {
            id: 'procedure',
            title: 'Admission Procedure',
            icon: require('../../../assets/images/studentAdmission/admission-procedure.png'),
            route: 'StudentAdmissionProcedure',
        },
        {
            id: 'form',
            title: 'Registration for Admission',
            icon: require('../../../assets/images/studentAdmission/registration-for-admission.png'),
            route: formRoute,
        },
        {
            id: 'track',
            title: 'Track The Application',
            icon: require('../../../assets/images/studentAdmission/track-application.png'),
            route: 'TrackApplication',
        },
        {
            id: 'admit',
            title: 'Download Admit Card',
            icon: require('../../../assets/images/studentAdmission/download-card.png'),
            route: 'AdmitCard',
        },
        {
            id: 'result',
            title: 'Result',
            icon: require('../../../assets/images/studentAdmission/result.png'),
            route: 'ExamResult'
        },
        {
            id: 'bus',
            title: 'Bus Stoppage',
            icon: require('../../../assets/images/studentAdmission/bus-stoppage.png'),
            route: 'BusStoppage'
        },
    ];

    const cardAnimations = useRef(
        ADMISSION_OPTIONS.map(() => ({
            translateY: new Animated.Value(18),
            opacity: new Animated.Value(0),
            scale: new Animated.Value(0.97),
        }))
    ).current;

    useEffect(() => {
        const animations = cardAnimations.map((animation) =>
            Animated.parallel([
                Animated.timing(animation.translateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation.opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.spring(animation.scale, {
                    toValue: 1,
                    speed: 18,
                    bounciness: 2,
                    useNativeDriver: true,
                }),
            ])
        );

        Animated.stagger(70, animations).start();
    }, [cardAnimations]);

    const pressHandler = (targetRoute: Route | undefined) => {
        if (!targetRoute) return;
        navigation.navigate(targetRoute, { schoolCode });
    };

    useEffect(() => {
        const getFormRoute = async () => {
            const previousAdmissions = await getMyAdmissionNumbers();
            if (previousAdmissions.length > 0) {
                setFormRoute('PreviousAdmissions');
            } else {
                setFormRoute('OTP');
            }
        }
        getFormRoute();
    }, [route])

    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.heroWrapper}>
                        <Slider height={180} />

                        <View style={styles.backButtonWrapper}>
                            <Button
                                type="arrowLeft"
                                onPress={() => navigation.goBack()}
                                style={styles.backButton}
                            />
                        </View>
                    </View>

                    <View style={styles.panel}>
                        <Text style={styles.sectionTitle}>Actions</Text>

                        <View style={styles.grid}>
                            {ADMISSION_OPTIONS.map((option, index) => {
                                const animation = cardAnimations[index];

                                return (
                                    <Animated.View
                                        key={option.id}
                                        style={{
                                            width: '31%',
                                            opacity: animation.opacity,
                                            transform: [
                                                { translateY: animation.translateY },
                                                { scale: animation.scale },
                                            ],
                                        }}
                                    >
                                        <Pressable
                                            style={styles.tile}
                                            onPress={() => pressHandler(option.route)}
                                        >
                                            <View style={styles.tileIconFrame}>
                                                <Image
                                                    source={option.icon}
                                                    style={styles.tileIcon}
                                                    resizeMode="contain"
                                                />
                                            </View>

                                            <Text
                                                style={styles.tileTitle}
                                                numberOfLines={2}
                                            >
                                                {option.title}
                                            </Text>
                                        </Pressable>
                                    </Animated.View>
                                );
                            })}
                        </View>

                        <View style={styles.footer}>
                            <Image
                                source={school.logo}
                                style={styles.footerLogo}
                                resizeMode="contain"
                            />
                            <Text style={styles.footerSchoolName}>
                                {school.name}
                            </Text>
                            <Text style={styles.footerLine}>
                                Admission Helpline: {school.admissionHelpline}
                            </Text>
                            <Text style={styles.footerLine}>
                                Email: {school.email}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    root: { flex: 1 },
    background: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
    },
    heroWrapper: {
        position: 'relative',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxxl,
        paddingBottom: spacing.lg,
    },
    backButtonWrapper: {
        position: 'absolute',
        top: spacing.xxxl + 16,
        left: spacing.xl + 16,
        zIndex: 2,
    },
    backButton: {
        width: 46,
        height: 46,
    },
    panel: {
        flex: 1,
        marginTop: 0,
        backgroundColor: colors.background,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
        paddingBottom: spacing.xxxl,
    },
    sectionTitle: {
        ...typography.title,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    tile: {
        width: '100%',
        borderWidth: 1,
        height:120,
        borderColor: colors.border,
        borderRadius: radius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xs,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    tileIconFrame: {
        width: 52,
        height: 52,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
        overflow: 'hidden',
    },
    tileIcon: {
        width: '75%',
        height: '75%',
    },
    tileTitle: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.text,
        textAlign: 'center',
        lineHeight: 14,
    },
    footer: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    footerLogo: {
        width: 90,
        height: 60,
        marginBottom: spacing.md,
    },
    footerSchoolName: {
        ...typography.title,
        fontSize: 18,
        marginBottom: spacing.xs,
    },
    footerLine: {
        fontSize: 13,
        color: colors.textSecondary,
        marginBottom: 2,
    },
});