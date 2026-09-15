import React, {
    ReactNode,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { Animated, Dimensions, Easing, Keyboard, Modal, Pressable, StyleSheet, View } from "react-native";
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

        useImperativeHandle(ref, () => ({
            close: animateClose,
        }));

        useEffect(() => {
            if (visible) {
                Keyboard.dismiss();
                onOpen?.();

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

                    <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
                        <View style={styles.sheetHandle} />
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        );
    },
);
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
        height: SCREEN_HEIGHT * 0.72,
        backgroundColor: colors.surface,
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
    sheetHandle: {
        width: 42,
        height: 5,
        borderRadius: radius.sm,
        backgroundColor: colors.border,
        alignSelf: 'center',
        marginBottom: spacing.xl,
    }
});