import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    colors,
    metrics,
} from '../styles/theme';


// Types
export type SnackbarType =
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
export type SnackbarPayload = {
    message: string;
    type?: SnackbarType;
    duration?: number;
};
export type SnackbarRef = {
    show: (payload: SnackbarPayload) => void;
};


// Snackbar
const Snackbar = forwardRef<SnackbarRef>((_, ref) => {

    // State
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<SnackbarType>('info');

    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hide = () => {
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
            hideTimeout.current = null;
        }

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 100,
                duration: 180,
                useNativeDriver: true,
            }),

            Animated.timing(opacity, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(({ finished }) => {
            if (finished) {
                setVisible(false);
            }
        });
    };

    useImperativeHandle(ref, () => ({
        show: ({ message, type = 'info', duration = 4000 }) => {
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
            }

            setMessage(message);
            setType(type);
            setVisible(true);

            translateY.setValue(100);
            opacity.setValue(0);

            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    speed: 20,
                    bounciness: 6,
                }),

                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            hideTimeout.current = setTimeout(hide, duration);
        },
    }));

    if (!visible) {
        return null;
    }


    // Icon
    const icon = {
        success: '✓',
        error: '!',
        warning: '⚠',
        info: 'i',
    }[type];


    // Colors
    const getTypeColor = (type: SnackbarType) => {
        switch (type) {
            case 'success':
                return colors.success;

            case 'error':
                return colors.danger;

            case 'warning':
                return colors.warning;

            case 'info':
            default:
                return colors.primary;
        }
    };
    const getTypeBackground = (type: SnackbarType) => {
        switch (type) {
            case 'success':
                return colors.successBackground;

            case 'error':
                return colors.dangerBackground;

            case 'warning':
                return colors.warningBackground;

            case 'info':
            default:
                return colors.primaryBackground;
        }
    };
    const accentColor = getTypeColor(type);
    const backgroundColor = getTypeBackground(type);

    return (
        <Animated.View
            pointerEvents="box-none"
            style={[
                styles.wrapper,
                {
                    opacity,
                    transform: [{ translateY }],
                },
            ]}
        >
            <View
                style={[
                    styles.snackbar,
                    { backgroundColor },
                ]}
            >
                <View
                    style={[
                        styles.iconContainer,
                        { backgroundColor: accentColor },
                    ]}
                >
                    <Text style={styles.icon}>
                        {icon}
                    </Text>
                </View>

                <Text
                    style={styles.message}
                    numberOfLines={3}
                >
                    {message}
                </Text>

                <Pressable
                    onPress={hide}
                    hitSlop={10}
                    style={({ pressed }) => [
                        styles.closeButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Text
                        style={[
                            styles.close,
                            { color: accentColor },
                        ]}
                    >
                        ×
                    </Text>
                </Pressable>
            </View>
        </Animated.View>
    );
});


// Styles
const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: metrics.lg,
        right: metrics.lg,
        bottom: metrics.xl,
        zIndex: 9999,
    },
    snackbar: {
        minHeight: 64,
        borderRadius: metrics.lg,
        paddingVertical: metrics.md,
        paddingHorizontal: metrics.md,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: metrics.round,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: metrics.md,
    },
    icon: {
        color: colors.white,
        fontSize: 17,
    },
    message: {
        flex: 1,
        color: colors.text,
        fontSize: 14,
        lineHeight: 20,
    },
    closeButton: {
        marginLeft: metrics.sm,
        padding: metrics.xs,
    },
    close: {
        fontSize: 25,
        lineHeight: 25,
    },
    pressed: {
        opacity: 0.5,
    },
});


Snackbar.displayName = 'Snackbar';
export default Snackbar;