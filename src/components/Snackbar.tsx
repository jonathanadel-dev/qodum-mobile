// components/Snackbar.tsx

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
    radius,
    spacing,
} from '../styles/theme';

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

const Snackbar = forwardRef<SnackbarRef>((_, ref) => {
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

    const icon = {
        success: '✓',
        error: '!',
        warning: '⚠',
        info: 'i',
    }[type];

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

Snackbar.displayName = 'Snackbar';

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
            return colors.infoBackground;
    }
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: spacing.lg,
        right: spacing.lg,
        bottom: spacing.xl,
        zIndex: 9999,
    },

    snackbar: {
        minHeight: 64,
        borderRadius: radius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,

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
        borderRadius: radius.round,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },

    icon: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

    message: {
        flex: 1,
        color: colors.text,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },

    closeButton: {
        marginLeft: spacing.sm,
        padding: spacing.xs,
    },

    close: {
        fontSize: 25,
        lineHeight: 25,
        fontWeight: '400',
    },

    pressed: {
        opacity: 0.5,
    },
});

export default Snackbar;