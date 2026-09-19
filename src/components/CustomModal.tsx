import React, {
    ReactNode,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { Animated, Dimensions, Easing, Keyboard, Modal, Pressable, StyleSheet, View, PanResponder } from "react-native";
import { colors, radius, spacing } from "../styles/theme";


// Types
type Props = {
    children: ReactNode,
    visible: boolean | undefined,
    onOpen?: () => void,
    onClose: () => void
}
export type CustomModalRef = {
    close: (onClosed?: () => void) => void;
};


const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.70;


// Custom modal
const CustomModal = forwardRef<CustomModalRef, Props>(({ children, visible, onClose, onOpen }, ref) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    const animateClose = (onClosed?: () => void) => {
        Keyboard.dismiss();

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 250,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(({ finished }) => {
            if (finished) {
                onClosed?.();
                onClose();
            }
        });
    };

    const animateOpen = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleRelease = (gestureY: number) => {
        const threshold = SHEET_HEIGHT * 0.25;
        
        if (gestureY > threshold) {
            // Swiped down enough - close
            animateClose();
        } else {
            // Snap back to top
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 0,
                speed: 12,
            }).start();
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 10,
            onPanResponderGrant: () => {
                // @ts-ignore
                translateY.setOffset(translateY.__getValue());
                translateY.setValue(0);
            },
            onPanResponderMove: (_, gesture) => {
                if (gesture.dy > 0) {
                    translateY.setValue(gesture.dy);
                }
            },
            onPanResponderRelease: (_, gesture) => {
                translateY.flattenOffset();
                handleRelease(gesture.dy);
            },
        })
    ).current;

    useImperativeHandle(ref, () => ({
        close: animateClose,
    }));

    useEffect(() => {
        if (visible) {
            Keyboard.dismiss();
            onOpen?.();
            animateOpen();
        } else {
            translateY.setValue(SCREEN_HEIGHT);
            backdropOpacity.setValue(0);
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={() => animateClose()}
        >
            <View style={styles.modalContainer}>
                <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => animateClose()} />
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.bottomSheet, 
                        { transform: [{ translateY }] }
                    ]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.handleContainer}>
                        <View style={styles.sheetHandle} />
                    </View>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
});
CustomModal.displayName = 'CustomModal';
export default CustomModal;


// Styles
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: colors.overlay,
    },
    bottomSheet: {
        height: SHEET_HEIGHT,
        backgroundColor: colors.background,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 12,
    },
    handleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: spacing.md,
    },
    sheetHandle: {
        width: 42,
        height: 5,
        borderRadius: radius.sm,
        backgroundColor: colors.border,
    }
});