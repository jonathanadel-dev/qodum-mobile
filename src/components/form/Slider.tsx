import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, ScrollViewInstance, StyleSheet, Text, View } from "react-native";
import { radius, spacing } from "../../styles/theme";
import { useEffect, useRef, useState } from "react";


// Type
type Slide = {
    id: string;
    image: string;
    eyebrow: string;
    title: string;
    description: string;
};


// Slider data
const SLIDES: Slide[] = [
    {
        id: '1',
        image:
            'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85',
        eyebrow: 'WELCOME TO OUR SCHOOL',
        title: 'A place to learn, grow and belong.',
        description:
            'Discover everything you need to know about joining our school.',
    },
    {
        id: '2',
        image:
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85',
        eyebrow: 'YOUR JOURNEY STARTS HERE',
        title: 'Take the first step toward your future.',
        description:
            'Explore the admission process and complete your application.',
    },
    {
        id: '3',
        image:
            'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85',
        eyebrow: 'LEARNING TOGETHER',
        title: 'Discover a place built for learning.',
        description:
            'Explore the opportunities and experiences waiting for you at our school.',
    },
];


// Slider
export default function Slider(){

    // State
    const [activeSlide, setActiveSlide] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const sliderRef = useRef<ScrollViewInstance>(null);
    const sliderWidthRef = useRef(0);


    // Slider scroll
    const handleSliderScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;

        if (!sliderWidth) {
            return;
        }

        const index = Math.round(offsetX / sliderWidth);

        if (
            index >= 0 &&
            index < SLIDES.length &&
            index !== activeSlide
        ) {
            setActiveSlide(index);
        }
    };


    // Automatic slider
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((current:any) => {
                const next =
                    current === SLIDES.length - 1
                        ? 0
                        : current + 1;

                sliderRef.current?.scrollTo({
                    x: next * sliderWidthRef.current,
                    animated: true,
                });

                return next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    // Slider layout
    const handleSliderLayout = (event: { nativeEvent: { layout: { width: number } } }) => {
        const width = event.nativeEvent.layout.width;

        if (width !== sliderWidthRef.current) {
            sliderWidthRef.current = width;
            setSliderWidth(width);
        }
    };

    return(
        <View style={styles.sliderWrapper} onLayout={handleSliderLayout}>

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
                    <View
                        key={slide.id}
                        style={[styles.slide, { width: sliderWidth }]}
                    >

                        <Image
                            source={{ uri: slide.image }}
                            style={styles.slideImage}
                            resizeMode="cover"
                        />

                        {/* Dark overlay */}
                        <View
                            style={styles.slideOverlay}
                        />

                        {/* Slide content */}
                        <View style={styles.slideContent}>

                            <Text style={styles.slideEyebrow}>
                                {slide.eyebrow}
                            </Text>

                            <Text style={styles.slideTitle}>
                                {slide.title}
                            </Text>

                            <Text style={styles.slideDescription}>
                                {slide.description}
                            </Text>

                        </View>

                    </View>
                ))}

            </ScrollView>


            {/* Slider indicators */}
            <View style={styles.pagination}>

                {SLIDES.map((slide, index) => (
                    <View
                        key={slide.id}
                        style={[
                            styles.paginationDot,
                            index === activeSlide &&
                                styles.paginationDotActive,
                        ]}
                    />
                ))}

            </View>

        </View>
    )
}


// Styles
const styles = StyleSheet.create({
    sliderWrapper: {
        width: '100%',
        height: 225,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: spacing.xxl,
        backgroundColor: '#DCECF2',
    },
    slide: {
        height: 225,
        position: 'relative',
    },
    slideImage: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
    },
    slideOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(8, 25, 36, 0.48)',
    },
    slideContent: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 22,
        paddingBottom: 29,
        paddingRight: 50,
    },
    slideEyebrow: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: '#D8F4FC',
        marginBottom: 7,
    },
    slideTitle: {
        fontSize: 23,
        lineHeight: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    slideDescription: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(255,255,255,0.84)',
        marginTop: 7,
        maxWidth: 300,
    },
    pagination: {
        position: 'absolute',
        bottom: 13,
        right: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: radius.round,
        backgroundColor: 'rgba(255,255,255,0.45)',
        marginLeft: 5,
    },
    paginationDotActive: {
        width: 19,
        backgroundColor: '#FFFFFF',
    }
});