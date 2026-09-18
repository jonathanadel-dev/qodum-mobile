import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    StatusBar,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography, spacing, radius } from '../../styles/theme';
import Button from '../../components/Button';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Width
const { width } = Dimensions.get('window');


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;
type Slide = {
    id: string;
    image: any;
    title: string;
    subtitle: string;
};


// Slides
const slides: Slide[] = [
    {
        id: '1',
        image: require('../../assets/images/welcome/teachers.png'),
        title: 'Teachers',
        subtitle: 'School Teachers',
    },
    {
        id: '2',
        image: require('../../assets/images/welcome/attendance.png'),
        title: 'Attendance',
        subtitle: "Student's Monthly Attendance",
    },
    {
        id: '3',
        image: require('../../assets/images/welcome/report-card.png'),
        title: 'Report Card',
        subtitle: "Student's Report Card",
    },
];


// Welcome screen
export default function WelcomeScreen({ navigation }: Props) {

    // State
    const AUTOPLAY_INTERVAL_MS = 3500;
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    const autoPlayEnabled = useRef(true);
    const listRef = useRef<any>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const isLastSlide = activeIndex === slides.length - 1;


    // Functions
    const goToContinue = () => navigation.navigate('ContinueAs');
    const scrollToIndex = (index: number) => {
        listRef.current?.scrollToIndex({ index, animated: true });
    };
    const handleNext = () => {
        if (isLastSlide) {
            goToContinue();
            return;
        }
        scrollToIndex(activeIndex + 1);
    };
    const handleScrollBeginDrag = () => {
        autoPlayEnabled.current = false;
    };
    const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        activeIndexRef.current = index;
        setActiveIndex(index);
        autoPlayEnabled.current = true;
    };


    // Auto scrolling
    useEffect(() => {
        const timer = setInterval(() => {
            if (!autoPlayEnabled.current) return;
            const next = (activeIndexRef.current + 1) % slides.length;
            scrollToIndex(next);
        }, AUTOPLAY_INTERVAL_MS);

        return () => clearInterval(timer);
    }, []);

    return (
        <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.whiteContent}>
                <StatusBar barStyle="dark-content" />

                <Animated.FlatList
                    ref={listRef}
                    data={slides}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScrollBeginDrag={handleScrollBeginDrag}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}
                    scrollEventThrottle={16}
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />

                            <View style={styles.illustrationWrapper}>
                                <Image
                                    source={item.image}
                                    style={styles.illustration}
                                    resizeMode="contain"
                                />
                            </View>

                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subtitle}>{item.subtitle}</Text>
                        </View>
                    )}
                />

                <AnimatedDots scrollX={scrollX} count={slides.length} />
            </View>
            <View style={styles.footer}>
                <Button
                    label='Skip'
                    onPress={goToContinue}
                    type='plain'
                />

                <Button
                    label={isLastSlide ? 'Done' : 'Next'}
                    onPress={handleNext}
                    type='white'
                />
            </View>
        </LinearGradient>
    );
}


// Dots animation
function AnimatedDots({ scrollX, count }: {scrollX: Animated.Value; count: number;}) {
    return (
        <View style={styles.dotsRow}>
            {Array.from({ length: count }).map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 24, 8],
                    extrapolate: 'clamp',
                });

                const dotColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [colors.dotInactive, colors.primary, colors.dotInactive],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={i}
                        style={[
                            styles.dot,
                            { width: dotWidth, backgroundColor: dotColor },
                        ]}
                    />
                );
            })}
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteContent:{
        flex:1,
        backgroundColor: colors.background,
        borderBottomLeftRadius: radius.xxl,
        borderBottomRightRadius: radius.xxl,
    },
    slide: {
        width,
        alignItems: 'center',
        paddingTop: 65,
        paddingHorizontal: spacing.xxl,
    },
    logo: {
        width: 180,
        height: 60,
        marginBottom: spacing.xxxl,
    },
    illustrationWrapper: {
        width: '100%',
        height: width * 0.62,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    illustration: {
        width: '100%',
        height: '70%',
    },
    title: {
        marginTop:spacing.xxxl,
        ...typography.onboardingTitle,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.onboardingSubtitle,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    dot: {
        height: 8,
        borderRadius: radius.round,
        marginHorizontal: spacing.xs / 2,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 130,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.xxl,
    },
    skipText: {
        ...typography.button,
        color: colors.background,
    },
    nextButton: {
        backgroundColor: colors.background,
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.md,
        borderRadius: radius.lg,
    },
    nextButtonText: {
        ...typography.button,
        color: colors.primary,
    },
});