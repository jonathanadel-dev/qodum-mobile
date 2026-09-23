import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors, metrics } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackgroundScreen from '../../../components/BackgroundScreen';
import RouteSelectorButton from '../../../components/busStoppage/RouteSelectorButton';
import RoutesModal, { ROUTES, RouteType } from '../../../components/busStoppage/RoutesModal';
import AppText from '../../../components/AppText';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'BusStoppage'>;


// Bus stoppage
export default function BusStoppageScreen({ navigation }: Props) {
    const [isSelectRoute, setIsSelectRoute] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState<RouteType>(ROUTES[0]);
    const [currentStopIndex, setCurrentStopIndex] = useState(0);
    
    const busPositionY = useRef(new Animated.Value(0)).current;
    const busOpacity = useRef(new Animated.Value(0)).current;
    const routeProgress = useRef(new Animated.Value(0)).current;

    const stopSpacing = 80;
    const routeLength = (selectedRoute.stops.length - 1) * stopSpacing;
    const containerHeight = routeLength + 240;

    useEffect(() => {
        startJourney();
    }, [selectedRoute]);

    const startJourney = () => {
        busPositionY.setValue(0);
        routeProgress.setValue(0);
        busOpacity.setValue(0);
        setCurrentStopIndex(0);

        Animated.timing(busOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(routeProgress, {
                toValue: 1,
                duration: selectedRoute.stops.length * 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });
    };

    useEffect(() => {
        const listener = routeProgress.addListener(({ value }) => {
            const newPosition = value * routeLength;
            busPositionY.setValue(newPosition);
            
            const stopIndex = Math.min(
                Math.floor(value * (selectedRoute.stops.length - 1)),
                selectedRoute.stops.length - 1
            );
            setCurrentStopIndex(stopIndex);
        });

        return () => {
            routeProgress.removeListener(listener);
        };
    }, [routeLength, selectedRoute.stops.length]);

    const handleRouteSelect = (route: RouteType) => {
        setSelectedRoute(route);
        setIsSelectRoute(false);
    };

    const getStopPosition = (index: number) => index * stopSpacing;
    const isStopVisible = (index: number) => index <= currentStopIndex + 1;
    const isStopReached = (index: number) => index <= currentStopIndex;
    const isLastStop = (index: number) => index === selectedRoute.stops.length - 1;

    return (
        <BackgroundScreen
            navigation={navigation}
            isHeader={true}
            title='Bus Stoppage'
        >
            <View style={styles.container}>
                <View style={styles.routeSelectorContainer}>
                    <RouteSelectorButton
                        routeName={selectedRoute.name}
                        onPress={() => setIsSelectRoute(true)}
                    />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View 
                        key={selectedRoute.id}
                        style={[styles.journeyContainer, { height: containerHeight }]}
                    >
                        <View style={[styles.routeLine, { height: routeLength }]} />

                        {selectedRoute.stops.map((stop, index) => {
                            const isVisible = isStopVisible(index);
                            const reached = isStopReached(index);
                            const isLeft = index % 2 === 0;
                            const showPin = !isLastStop(index);
                            
                            return (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.stopRow,
                                        {
                                            top: getStopPosition(index),
                                            opacity: isVisible ? 1 : 0,
                                            transform: [{ scale: isVisible ? 1 : 0.85 }],
                                        }
                                    ]}
                                >
                                    <View style={[
                                        styles.buttonAnchor,
                                        isLeft ? styles.buttonLeft : styles.buttonRight
                                    ]}>
                                        {reached ? (
                                            <LinearGradient
                                                colors={[colors.gradientStart, colors.gradientEnd]}
                                                start={{ x: 0, y: 0.5 }}
                                                end={{ x: 1, y: 0.5 }}
                                                style={styles.stopButton}
                                            >
                                                <AppText style={styles.stopTextReached} numberOfLines={1} ellipsizeMode="tail">
                                                    {stop}
                                                </AppText>
                                            </LinearGradient>
                                        ) : (
                                            <LinearGradient
                                                colors={['#E0E7EF', '#D1D9E0']}
                                                start={{ x: 0, y: 0.5 }}
                                                end={{ x: 1, y: 0.5 }}
                                                style={styles.stopButton}
                                            >
                                                <AppText style={styles.stopText} numberOfLines={1} ellipsizeMode="tail">
                                                    {stop}
                                                </AppText>
                                            </LinearGradient>
                                        )}
                                    </View>
                                    
                                    {showPin && (
                                        <View style={styles.pinContainer}>
                                            <View style={styles.pin} />
                                        </View>
                                    )}
                                </Animated.View>
                            );
                        })}

                        <Animated.View
                            style={[
                                styles.busContainer,
                                {
                                    transform: [{ translateY: busPositionY }],
                                    opacity: busOpacity,
                                },
                            ]}
                        >
                            <Image
                                source={require('../../../assets/images/bus.png')}
                                style={styles.busImage}
                                resizeMode="contain"
                            />
                        </Animated.View>
                    </View>
                </ScrollView>

                <RoutesModal
                    visible={isSelectRoute}
                    onClose={() => setIsSelectRoute(false)}
                    onRouteSelect={handleRouteSelect}
                    selectedRoute={selectedRoute}
                    routes={ROUTES}
                />
            </View>
        </BackgroundScreen>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    routeSelectorContainer: {
        marginBottom: metrics.xl,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    journeyContainer: {
        position: 'relative',
        alignItems: 'center',
        width: '100%',
    },
    routeLine: {
        width: 4,
        backgroundColor: colors.primary,
        borderRadius: 2,
        opacity: 0.3,
        position: 'absolute',
        alignSelf: 'center',
        top: 0,
        zIndex: 1,
    },
    stopRow: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 60,
        zIndex: 2,
    },
    buttonAnchor: {
        position: 'absolute',
        top: 10,
        width: 140,
        height: 40,
    },
    buttonLeft: {
        right: '50%',
        marginRight: 24,
    },
    buttonRight: {
        left: '50%',
        marginLeft: 24,
    },
    stopButton: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    stopText: {
        fontSize: 13,
        // fontFamily: fonts.medium,
        color: '#6B7280',
        textAlign: 'center',
    },
    stopTextReached: {
        fontSize: 13,
        // fontFamily: fonts.semiBold,
        color: colors.white,
        textAlign: 'center',
    },
    pinContainer: {
        position: 'absolute',
        left: '50%',
        marginLeft: -40,
        top: -10,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
    },
    pin: {
        position: 'absolute',
        width: 15,
        height: 15,
        borderRadius: 38,
        backgroundColor: '#f00',
        shadowColor: '#f00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 16,
    },
    busContainer: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        width: 50,
        zIndex: 10,
    },
    busImage: {
        width: 50,
        height: 50,
    },
});