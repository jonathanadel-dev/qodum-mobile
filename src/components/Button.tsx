import { ActivityIndicator, Animated, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';

import { colors, metrics } from '../styles/theme';
import { usePressScale } from '../hooks/animations/usePressScale';
import AppText from './AppText';


// Types
type ButtonType = 'white' | 'plain' | 'gradient' | 'arrowRight' | 'arrowLeft';
type Props = {
  loading?: boolean;
  onPress: () => void;
  label?: string;
  icon?: any;
  loadingLabel?: string;
  style?: any;
  textStyle?: any;
  type: ButtonType;
};


// Constants
const GRADIENT_TYPES: ButtonType[] = ['gradient', 'arrowRight', 'arrowLeft'];
const ARROW_ICON: Partial<Record<ButtonType, string>> = {
  arrowRight: 'arrow-forward',
  arrowLeft: 'arrow-back',
};


// Button
export default function Button({ loading, onPress, label = 'Submit', loadingLabel = 'Submitting...', style, textStyle, icon, type }: Props) {


    // State
    const { scale, onPressIn, onPressOut } = usePressScale();
    const isGradient = GRADIENT_TYPES.includes(type);
    const isArrow = type === 'arrowRight' || type === 'arrowLeft';


    // Animation
    const handlePressIn = () => !loading && onPressIn();
    const handlePressOut = () => !loading && onPressOut();


    // Gradient / arrow buttons
    if (isGradient) {
        return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={loading}>
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[isArrow ? styles.arrowContainer : styles.button, loading && styles.disabled, style]}
            >
                {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
                ) : isArrow ? (
                <Ionicons name={ARROW_ICON[type] as any} size={20} color="#fff" />
                ) : (
                <View style={styles.content}>
                    <AppText variant="text" style={[styles.gradientText, textStyle]}>
                    {label}
                    </AppText>
                    {icon}
                </View>
                )}
            </LinearGradient>
            </Pressable>
        </Animated.View>
        );
    }


    // White / plain buttons
    const variantButtonStyle = type === 'white' ? styles.whiteButton : styles.plainButton;
    const variantTextStyle = type === 'white' ? styles.whiteText : styles.plainText;

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
                style={[styles.button, variantButtonStyle, loading && styles.disabled, style]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <ActivityIndicator color={type === 'white' ? colors.text : colors.primary} size="small" />
                        <AppText variant="text" style={[variantTextStyle, textStyle]}>
                            {loadingLabel}
                        </AppText>
                    </>
                ) : (
                    <View style={styles.content}>
                        <AppText variant="text" style={[variantTextStyle, textStyle]}>
                            {label}
                        </AppText>
                        {icon}
                    </View>
                )}
            </Pressable>
        </Animated.View>
    );
}


// Styles
const styles = StyleSheet.create({
    button: {
        height: 35,
        paddingHorizontal: metrics.xxxl,
        borderRadius: metrics.xs,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: metrics.sm,
    },
    whiteButton: {
        backgroundColor: colors.white,
    },
    plainButton: {
        paddingHorizontal: metrics.md,
        backgroundColor: 'transparent',
    },
    whiteText: {
        fontSize: 15,
        color: colors.text,
    },
    plainText: {
        fontSize: 15,
        color: colors.primary,
    },
    gradientText: {
        fontSize: 15,
        color: colors.white,
    },
    arrowContainer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: metrics.round,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    disabled: {
        opacity: 0.65,
        elevation: 0,
        shadowOpacity: 0,
    },
});