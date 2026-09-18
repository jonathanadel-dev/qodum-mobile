// components/Slider.tsx
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, ScrollViewInstance, StyleSheet, View } from "react-native";
import { colors, radius } from "../styles/theme";
import { useEffect, useRef, useState } from "react";

type Slide = {
    id: string;
    image: string;
};

const SLIDES: Slide[] = [
    { id: '1', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85' },
    { id: '2', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85' },
    { id: '3', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85' },
];

export default function Slider({ height = 225 }: { height?: number }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const sliderRef = useRef<ScrollViewInstance>(null);
    const sliderWidthRef = useRef(0);

    const handleSliderScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        if (!sliderWidth) return;
        const index = Math.round(offsetX / sliderWidth);
        if (index >= 0 && index < SLIDES.length && index !== activeSlide) {
            setActiveSlide(index);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((current: any) => {
                const next = current === SLIDES.length - 1 ? 0 : current + 1;
                sliderRef.current?.scrollTo({ x: next * sliderWidthRef.current, animated: true });
                return next;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSliderLayout = (event: { nativeEvent: { layout: { width: number } } }) => {
        const width = event.nativeEvent.layout.width;
        if (width !== sliderWidthRef.current) {
            sliderWidthRef.current = width;
            setSliderWidth(width);
        }
    };

    return (
        <View style={[styles.sliderWrapper, { height }]} onLayout={handleSliderLayout}>
            <ScrollView
                ref={sliderRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleSliderScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
            >
                {SLIDES.map((slide) => (
                    <View key={slide.id} style={[styles.slide, { width: sliderWidth, height }]}>
                        <Image source={{ uri: slide.image }} style={styles.slideImage} resizeMode="cover" />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.pagination}>
                {SLIDES.map((slide, index) => (
                    <View
                        key={slide.id}
                        style={[styles.paginationDot, index === activeSlide && styles.paginationDotActive]}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderWrapper: {
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#DCECF2',
    },
    slide: {
        position: 'relative',
    },
    slideImage: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
    },
    pagination: {
        position: 'absolute',
        bottom: 22,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: radius.round,
        backgroundColor: 'rgba(255,255,255,0.55)',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        width: 19,
        backgroundColor: colors.primary,
    }
});