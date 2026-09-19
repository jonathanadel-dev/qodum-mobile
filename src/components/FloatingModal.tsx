import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useEffect,
    ReactNode,
} from 'react';
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import { colors, radius, spacing } from '../styles/theme';


// Types
export type FloatingModalRef = {
    close: (onClosed?: () => void) => void;
};
type FloatingModalProps = {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    dismissOnBackdropPress?: boolean;
};


// Floating modal
const FloatingModal = forwardRef<FloatingModalRef, FloatingModalProps>(({ visible, onClose, children, dismissOnBackdropPress = false }, ref) => {

        // Animation and backdrop effect
        const backdropOpacity = useRef(new Animated.Value(0)).current;
        const cardOpacity = useRef(new Animated.Value(0)).current;
        const cardScale = useRef(new Animated.Value(0.92)).current;
        const animateIn = () => {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 220,
                    useNativeDriver: true,
                }),
                Animated.timing(cardOpacity, {
                    toValue: 1,
                    duration: 260,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.spring(cardScale, {
                    toValue: 1,
                    friction: 8,
                    tension: 60,
                    useNativeDriver: true,
                }),
            ]).start();
        };
        const animateOut = (onDone?: () => void) => {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 180,
                    useNativeDriver: true,
                }),
                Animated.timing(cardOpacity, {
                    toValue: 0,
                    duration: 180,
                    useNativeDriver: true,
                }),
                Animated.timing(cardScale, {
                    toValue: 0.92,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onDone?.();
            });
        };


        // Close
        const requestClose = (onClosed?: () => void) => {
            animateOut(() => {
                onClose();
                onClosed?.();
            });
        };
        useImperativeHandle(ref, () => ({
            close: requestClose,
        }));

        useEffect(() => {
            if (visible) {
                backdropOpacity.setValue(0);
                cardOpacity.setValue(0);
                cardScale.setValue(0.92);
                animateIn();
            }
        }, [visible]);

        if (!visible) return null;

        return (
            <Modal
                visible={visible}
                transparent
                animationType="none"
                statusBarTranslucent
                onRequestClose={() => requestClose()}
            >
                <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={dismissOnBackdropPress ? () => requestClose() : undefined}
                    />
                </Animated.View>

                <View style={styles.centerWrapper} pointerEvents="box-none">
                    <Animated.View
                        style={[
                            styles.card,
                            {
                                opacity: cardOpacity,
                                transform: [{ scale: cardScale }],
                            },
                        ]}
                    >
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        );
    },
);

export default FloatingModal;


// Styles
const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: colors.overlay,
    },
    centerWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
    },
    card: {
        width: '100%',
        backgroundColor: colors.background,
        borderRadius: radius.xl,
        padding: spacing.xxl,
    },
});