import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Animated,
    Easing,
    Dimensions,
    StatusBar,
} from 'react-native';
import { colors } from '../../styles/theme';


const { width } = Dimensions.get('window');
const PRIMARY = colors.primary;


export default function WelcomeScreen ({ navigation }: any) {

    // Animations
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.82)).current;
    const logoTranslateY = useRef(new Animated.Value(20)).current;

    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(20)).current;

    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(15)).current;

    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const buttonTranslateY = useRef(new Animated.Value(25)).current;

    const floatingAnimation = useRef(new Animated.Value(0)).current;

    const floatingY = floatingAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
    });

    useEffect(() => {
        // Entrance animation
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),

                Animated.spring(logoScale, {
                    toValue: 1,
                    friction: 7,
                    tension: 45,
                    useNativeDriver: true,
                }),

                Animated.timing(logoTranslateY, {
                    toValue: 0,
                    duration: 700,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),

            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),

                Animated.timing(titleTranslateY, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),

            Animated.parallel([
                Animated.timing(subtitleOpacity, {
                    toValue: 1,
                    duration: 450,
                    useNativeDriver: true,
                }),

                Animated.timing(subtitleTranslateY, {
                    toValue: 0,
                    duration: 450,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),

            Animated.parallel([
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),

                Animated.timing(buttonTranslateY, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        // Subtle continuous floating animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatingAnimation, {
                    toValue: 1,
                    duration: 2200,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(floatingAnimation, {
                    toValue: 0,
                    duration: 2200,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ]),
        ).start();

        return () => {
            [
                logoOpacity,
                logoScale,
                logoTranslateY,
                titleOpacity,
                titleTranslateY,
                subtitleOpacity,
                subtitleTranslateY,
                buttonOpacity,
                buttonTranslateY,
                floatingAnimation,
            ].forEach(animation => animation.stopAnimation());
        };
    }, []);


    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate('ContinueAs')}
        >

            <StatusBar barStyle="dark-content"/>

            {/* Decorative background elements */}
            <View style={styles.backgroundCircleLarge} />
            <View style={styles.backgroundCircleSmall} />

            {/* Top branding */}
            <View style={styles.topArea}>
                <Text style={styles.brandLabel}>QODUM</Text>
                <View style={styles.brandLine} />
            </View>

            {/* Main content */}
            <View style={styles.content}>

                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoWrapper,
                        {
                        opacity: logoOpacity,
                        transform: [
                            { scale: logoScale },
                            { translateY: logoTranslateY },
                            { translateY: floatingY },
                        ],
                        },
                    ]}
                >
                <View style={styles.logoGlow} />

                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                </Animated.View>

                {/* Title */}
                <Animated.View
                    style={[
                        styles.titleContainer,
                        {
                            opacity: titleOpacity,
                            transform: [
                                { translateY: titleTranslateY },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.welcomeText}>
                        Welcome to
                    </Text>

                    <Text style={styles.qodumText}>
                        Qodum
                    </Text>
                </Animated.View>

                {/* Subtitle */}
                <Animated.View
                    style={[
                        styles.subtitleContainer,
                        {
                            opacity: subtitleOpacity,
                            transform: [
                                { translateY: subtitleTranslateY },
                            ],
                        },
                    ]}
                >
                <Text style={styles.subtitle}>
                    Your school, your journey.
                </Text>

                <Text style={styles.subtitle}>
                    Everything in one place.
                </Text>
                </Animated.View>

            </View>

            {/* Bottom decoration */}
            <View style={styles.bottomWave}>
                <View style={styles.waveInner} />
            </View>

            {/* Bottom CTA */}
            <Animated.View
                style={[
                    styles.bottomArea,
                    {
                        opacity: buttonOpacity,
                        transform: [
                            { translateY: buttonTranslateY },
                        ],
                    },
                ]}
            >
                <View style={styles.continueButton}>
                    <Text style={styles.continueText}>
                        Continue
                    </Text>

                    <View style={styles.arrowCircle}>
                        <Text style={styles.arrow}>
                            →
                        </Text>
                    </View>
                </View>

                <Text style={styles.tapHint}>
                    Tap anywhere to continue
                </Text>
            </Animated.View>

        </Pressable>
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },

    // Background
    backgroundCircleLarge: {
        position: 'absolute',
        width: width * 1.15,
        height: width * 1.15,
        borderRadius: width,
        backgroundColor: '#F0FAFE',
        top: -width * 0.35,
        right: -width * 0.45,
    },
    backgroundCircleSmall: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: '#F7FCFE',
        bottom: 50,
        left: -100,
    },


    // Branding
    topArea: {
        position: 'absolute',
        top: 65,
        left: 28,
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandLabel: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 3,
        color: '#0D1B2A',
    },
    brandLine: {
        width: 28,
        height: 2,
        marginLeft: 10,
        backgroundColor: PRIMARY,
        borderRadius: 2,
    },


    // Main content
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },

    // Logo
    logoWrapper: {
        width: width * 0.78,
        height: width * 0.40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    logoGlow: {
        position: 'absolute',
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: '#E6F7FD',
        opacity: 0.8,
    },



    // Typography
    titleContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: '600',
        color: '#12263A',
        letterSpacing: -0.8,
    },
    qodumText: {
        marginTop: -2,
        fontSize: 46,
        fontWeight: '800',
        color: PRIMARY,
        letterSpacing: -1.5,
    },
    subtitleContainer: {
        alignItems: 'center',
        marginTop: 13,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 25,
        color: '#687789',
        fontWeight: '400',
        textAlign: 'center',
    },


    // Bottom CTA
    bottomArea: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 42,
        alignItems: 'center',
        zIndex: 2,
    },
    continueButton: {
        width: '100%',
        height: 62,
        borderRadius: 20,
        backgroundColor: PRIMARY,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: PRIMARY,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.22,
        shadowRadius: 16,
        elevation: 7,
    },
    continueText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.1,
    },
    arrowCircle: {
        display:'flex',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.18)',

        alignItems: 'center',

        marginLeft: 12,
    },
    arrow: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '400',
    },
    tapHint: {
        marginTop: 13,
        fontSize: 12,
        color: '#4B5B6B',
        letterSpacing: 0.2,
        fontWeight: '600',
        textAlign: 'center',
        zIndex: 2,
    },


    // Bottom decoration
    bottomWave: {
        position: 'absolute',
        bottom: -95,
        left: -40,
        right: -40,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#E9F8FD',
        zIndex: 1,
        transform: [
            { rotate: '-3deg' },
        ],
    },
    waveInner: {
        position: 'absolute',
        top: 25,
        left: -20,
        right: -20,
        height: 110,
        borderRadius: 100,
        backgroundColor: '#F5FCFE',
    },
});