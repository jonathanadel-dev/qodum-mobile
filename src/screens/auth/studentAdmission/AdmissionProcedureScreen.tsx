import React from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';

import Header from '../../../components/Header';
import AppText from '../../../components/AppText';
import { colors, metrics } from '../../../styles/theme';
import { useStaggeredFadeInGroup } from '../../../hooks/animations/useStaggeredFadeInGroup';


// Types
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


// Steps
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


// Admission procedure
export default function AdmissionProcedureScreen({ navigation, route }: Props) {
    const { schoolCode } = route.params || {};

    const stepStyles = useStaggeredFadeInGroup(STEPS.length);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Admission Procedure" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {STEPS.map((step, index) => {
                    const isLast = index === STEPS.length - 1;

                    return (
                        <Animated.View
                            key={step.id}
                            style={[styles.row, stepStyles[index]]}
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
                                <AppText variant="text" style={styles.stepLabel}>{step.label}</AppText>
                                <AppText variant="h2" style={styles.stepTitle}>{step.title}</AppText>
                                <AppText variant="desc" style={styles.stepDescription}>{step.description}</AppText>
                            </View>
                        </Animated.View>
                    );
                })}
            </ScrollView>
        </View>
    );
}


// Styles
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
        color: colors.primary,
        marginBottom: metrics.xs,
    },
    stepTitle: {
        marginBottom: metrics.sm,
    },
    stepDescription: {
        lineHeight: 21,
    },
});