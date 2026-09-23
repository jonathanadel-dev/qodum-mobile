// src/screens/auth/WelcomeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    StatusBar,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, metrics } from '../../styles/theme';
import Button from '../../components/Button';
import AppText from '../../components/AppText';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDotsInterpolation } from '../../hooks/animations/useDotsInterpolation';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;
type Slide = {
    id: string;
    image: any;
    title: string;
    subtitle: string;
};

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

export default function WelcomeScreen({ navigation }: Props) {
    const AUTOPLAY_INTERVAL_MS = 3500;
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    const autoPlayEnabled = useRef(true);
    const listRef = useRef<any>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const isLastSlide = activeIndex === slides.length - 1;

    const dots = useDotsInterpolation(scrollX, slides.length, {
        itemWidth: width,
        activeColor: colors.primary,
        inactiveColor: colors.grayBackground,
    });

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

                            <AppText variant='h2'>{item.title}</AppText>
                            <AppText variant='desc'>{item.subtitle}</AppText>
                        </View>
                    )}
                />

                <View style={styles.dotsRow}>
                    {dots.map((dotStyle, i) => (
                        <Animated.View key={i} style={[styles.dot, dotStyle]} />
                    ))}
                </View>
            </View>
            <View style={styles.footer}>
                <Button
                    label='Skip'
                    onPress={goToContinue}
                    type='plain'
                    textStyle={{ color: colors.white }}
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


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteContent: {
        flex: 1,
        backgroundColor: colors.white,
        borderBottomLeftRadius: metrics.xxl,
        borderBottomRightRadius: metrics.xxl,
    },
    slide: {
        width,
        alignItems: 'center',
        paddingTop: 65,
        paddingHorizontal: metrics.xxl,
    },
    logo: {
        width: 180,
        height: 60,
        marginBottom: metrics.xxxl,
    },
    illustrationWrapper: {
        width: '100%',
        height: width * 0.62,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: metrics.xl,
    },
    illustration: {
        width: '100%',
        height: '70%',
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: metrics.xl,
    },
    dot: {
        height: 8,
        borderRadius: metrics.round,
        marginHorizontal: metrics.xs / 2,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 130,
        justifyContent: 'space-between',
        paddingHorizontal: metrics.xxl,
        paddingVertical: metrics.xxl,
    },
});