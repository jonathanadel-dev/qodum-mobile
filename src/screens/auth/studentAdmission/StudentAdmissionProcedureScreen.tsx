import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';

import Header from '../../../components/Header';
import { colors, metrics } from '../../../styles/theme';

type Props = {
    navigation: any;
    route: {
        params: {
            schoolCode: string;
        };
    };
};

type Step = {
    id: string;
    label: string;
    title: string;
    description: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
};

// Hardcoded per request — swap for real data whenever it's ready.
const STEPS: Step[] = [
    {
        id: '1',
        label: 'Step 01',
        title: 'Fill Admission Form',
        description:
            'Students must fill in their personal and academic details carefully using the application.',
        icon: 'document-text-outline',
    },
    {
        id: '2',
        label: 'Step 02',
        title: 'Receive Registration Number',
        description:
            'After successful submission, a unique Registration Number will be generated for future reference.',
        icon: 'checkmark-circle-outline',
    },
    {
        id: '3',
        label: 'Step 03',
        title: 'Track Application Status',
        description:
            'Using the registration number, students can track the real-time status of their admission application.',
        icon: 'search-outline',
    },
    {
        id: '4',
        label: 'Step 04',
        title: 'Download Admit Card',
        description:
            'Once the application is approved, students can download their admit card from the Download Admit Card section.',
        icon: 'download-outline',
    },
    {
        id: '5',
        label: 'Step 05',
        title: 'Appear for Examination',
        description:
            'Students must appear for the examination on the scheduled date and time as mentioned on the admit card.',
        icon: 'create-outline',
    },
];

export default function AdmissionProcedureScreen({ navigation, route }: Props) {
    const { schoolCode } = route.params || {};

    // One Animated.Value per step, staggered fade + slide-up on mount.
    const stepAnims = useRef(STEPS.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        Animated.stagger(
            120,
            stepAnims.map((anim) =>
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 420,
                    useNativeDriver: true,
                }),
            ),
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Admission Procedure" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {STEPS.map((step, index) => {
                    const anim = stepAnims[index];
                    const isLast = index === STEPS.length - 1;

                    return (
                        <Animated.View
                            key={step.id}
                            style={[
                                styles.row,
                                {
                                    opacity: anim,
                                    transform: [
                                        {
                                            translateY: anim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [18, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <View style={styles.timelineColumn}>
                                <LinearGradient
                                    colors={[colors.gradientStart, colors.gradientEnd]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.iconCircle}
                                >
                                    <Ionicons name={step.icon} size={26} color={colors.white} />
                                </LinearGradient>

                                {!isLast && <View style={styles.connectorLine} />}
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.stepLabel}>{step.label}</Text>
                                <Text style={styles.stepTitle}>{step.title}</Text>
                                <Text style={styles.stepDescription}>{step.description}</Text>
                            </View>
                        </Animated.View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollContent: {
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.xxl,
        paddingBottom: metrics.xxxl,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    timelineColumn: {
        alignItems: 'center',
        width: 72,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectorLine: {
        flex: 1,
        width: 2,
        backgroundColor: colors.border,
        marginTop: metrics.sm,
        marginBottom: metrics.sm,
    },
    content: {
        flex: 1,
        paddingLeft: metrics.lg,
        paddingBottom: metrics.xxl,
    },
    stepLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: metrics.xs,
    },
    stepTitle: {
        // ...typography.title,
        fontSize: 19,
        marginBottom: metrics.sm,
    },
    stepDescription: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.textSecondary,
    },
});