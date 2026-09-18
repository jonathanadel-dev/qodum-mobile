import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../../../styles/theme';
import SubmitButton from '../../../components/Button';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'StudentAdmitted'>;


// Student admitted
export default function StudentAdmittedScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params || {};


    // Animations
    const iconScale = useRef(new Animated.Value(0)).current;
    const iconOpacity = useRef(new Animated.Value(0)).current;
    const circleScale = useRef(new Animated.Value(0.7)).current;
    const circleOpacity = useRef(new Animated.Value(0)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const contentTranslateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Success icon + circle
        Animated.parallel([
            Animated.spring(iconScale, {
                toValue: 1,
                speed: 12,
                bounciness: 7,
                useNativeDriver: true,
            }),

            Animated.timing(iconOpacity, {
                toValue: 1,
                duration: 350,
                useNativeDriver: true,
            }),

            Animated.timing(circleOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),

            Animated.spring(circleScale, {
                toValue: 1,
                speed: 8,
                bounciness: 5,
                useNativeDriver: true,
            }),
        ]).start();

        // Main content
        Animated.parallel([
            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 600,
                delay: 350,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),

            Animated.timing(contentTranslateY, {
                toValue: 0,
                duration: 600,
                delay: 350,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Decorative background */}
            <View style={styles.backgroundCircleTop} />
            <View style={styles.backgroundCircleBottom} />

            {/* Main content */}
            <View style={styles.content}>
                {/* Success icon */}
                <View style={styles.successIconArea}>
                    <Animated.View
                        style={[
                            styles.outerCircle,
                            {
                                opacity: circleOpacity,
                                transform: [{ scale: circleScale }],
                            },
                        ]}
                    />

                    <Animated.View
                        style={[
                            styles.iconCircle,
                            {
                                opacity: iconOpacity,
                                transform: [{ scale: iconScale }],
                            },
                        ]}
                    >
                        <Text style={styles.checkmark}>✓</Text>
                    </Animated.View>
                </View>

                {/* Text */}
                <Animated.View
                    style={[
                        styles.textContent,
                        {
                            opacity: contentOpacity,
                            transform: [
                                {
                                    translateY: contentTranslateY,
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.eyebrow}>
                        APPLICATION SUBMITTED
                    </Text>

                    <Text style={styles.title}>
                        Your application is
                        {'\n'}
                        on its way.
                    </Text>

                    <Text style={styles.description}>
                        Your student admission application has
                        been submitted successfully.
                    </Text>

                    {/* Information card */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Text style={styles.infoIconText}>i</Text>
                        </View>

                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>
                                What happens next?
                            </Text>

                            <Text style={styles.infoDescription}>
                                Your application will be reviewed by
                                the school. You can return to the
                                admission portal to track your
                                application and access other
                                admission services.
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </View>

            {/* Bottom action */}
            <View style={styles.bottomArea}>
                <SubmitButton
                    loading={false}
                    label="Back to admission portal"
                    loadingLabel="Back to admission portal"
                    onPress={() => navigation.replace('StudentAdmission', { schoolCode })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        overflow: 'hidden',
    },

    /* Background */
    backgroundCircleTop: {
        position: 'absolute',
        width: 340,
        height: 340,
        borderRadius: 170,
        backgroundColor: '#EAF8FE',
        top: -190,
        right: -150,
        opacity: 0.8,
    },

    backgroundCircleBottom: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#F2FAFD',
        bottom: -170,
        left: -150,
    },

    /* Content */
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
    },

    successIconArea: {
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
    },

    outerCircle: {
        position: 'absolute',
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: '#E5F6FC',
    },

    iconCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#EAF8FE',
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOpacity: 0.18,
        shadowRadius: 18,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        elevation: 6,
    },

    checkmark: {
        color: colors.primary,
        fontSize: 58,
        fontWeight: '500',
        lineHeight: 65,
        marginTop: -4,
    },

    /* Text */
    textContent: {
        width: '100%',
        alignItems: 'center',
    },

    eyebrow: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.6,
        color: colors.primary,
        marginBottom: 12,
    },

    title: {
        fontSize: 29,
        lineHeight: 35,
        fontWeight: '800',
        color: '#17232C',
        textAlign: 'center',
        letterSpacing: -0.7,
        maxWidth: 360,
    },

    description: {
        fontSize: 15,
        lineHeight: 23,
        color: '#71808A',
        textAlign: 'center',
        marginTop: 13,
        maxWidth: 350,
    },

    /* Information card */
    infoCard: {
        width: '100%',
        marginTop: 28,
        padding: 17,
        borderRadius: 17,
        backgroundColor: '#F7FBFD',
        borderWidth: 1,
        borderColor: '#E1EEF3',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    infoIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E2F5FC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    infoIconText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '800',
    },

    infoContent: {
        flex: 1,
    },

    infoTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#34424B',
        marginBottom: 5,
    },

    infoDescription: {
        fontSize: 12.5,
        lineHeight: 19,
        color: '#7C8991',
    },

    /* Bottom */
    bottomArea: {
        paddingBottom: 25,
    },
});