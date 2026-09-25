import React, { useEffect, useState } from 'react';
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
import { Step } from '../../../lib/api/admissionProcedureApi';



// Admission procedure
export default function AdmissionProcedureScreen({ navigation, route }: any) {
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