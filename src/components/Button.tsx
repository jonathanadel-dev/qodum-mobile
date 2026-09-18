// components/form/SubmitButton.tsx

import { useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { colors, radius, spacing } from "../styles/theme";
import Ionicons from "@react-native-vector-icons/ionicons";


// Types
type ButtonType = 'white' | 'plain' | 'gradient' | 'arrowRight' | 'arrowLeft'
type Props = {
    loading?: boolean;
    onPress: () => void;
    label?: string;
    icon?: any;
    loadingLabel?: string;
    style?: any;
    textStyle?: any;
    type: ButtonType
}

// Button
export default function Button({ loading, onPress, label = 'Submit', loadingLabel = 'Submitting...', style, textStyle, icon, type }: Props) {


    // Animation
    const scale = useRef(new Animated.Value(1)).current;
    const handlePressIn = () => {
        if (loading) return;

        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 35,
            bounciness: 0,
        }).start();
    };
    const handlePressOut = () => {
        if (loading) return;

        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 25,
            bounciness: 5,
        }).start();
    };


    // Gradient background
    if(type == 'gradient' || type == 'arrowRight' || type == 'arrowLeft'){
        return (
            <Animated.View style={{ transform: [{ scale }] }}>
                <Pressable
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={['#3E5DAA', '#45AAD5']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={[
                            loading && styles.disabled,
                            type == 'gradient' ? styles.button : styles.arrowContainer,
                            style,
                        ]}
                    >
                        {type == 'arrowRight'
                            ? (
                                <Ionicons name='arrow-forward' size={20} color='#fff'/>
                            )
                            : type == 'arrowLeft' ? (
                                <Ionicons name='arrow-back' size={20} color='#fff'/>
                            )
                            : loading ? (
                                <>
                                    <ActivityIndicator color="#FFFFFF" size="small" />
                                    <Text style={[styles.gradientText, textStyle]}>
                                        {loadingLabel}
                                    </Text>
                                </>
                            ) : (
                                <Text style={[styles.gradientText, textStyle]}>
                                    {label}
                                    {icon}
                                </Text>
                            )
                        }
                    </LinearGradient>
                </Pressable>
            </Animated.View>
        )
    }


    // White background
    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
                style={[
                    styles.button,
                    type === 'white' ? styles.whiteButton : '',
                    loading && styles.disabled,
                    style,
                ]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <ActivityIndicator color="#FFFFFF" size="small" />
                        <Text style={[
                            type == 'white' ? styles.whiteText : styles.gradientText,
                            textStyle,
                        ]}>
                            {loadingLabel}
                        </Text>
                    </>
                ) : (
                    <Text style={[
                        type == 'white' ? styles.whiteText : styles.gradientText,
                        textStyle,
                    ]}>
                        {label}
                        {icon}
                    </Text>
                )}
            </Pressable>
        </Animated.View>
    );
};


// Styles
const styles = StyleSheet.create({
    button:{
        height: 35,
        paddingHorizontal: spacing.xxxl,
        borderRadius: radius.xs,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        // borderWidth: 1,
        // borderColor: colors.primaryPressed,
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.15,
        // shadowRadius: 8,
        // elevation: 8,
    },
    whiteButton: {
        backgroundColor: colors.background,
    },
    whiteText: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.text,
    },
    gradientText:{
        color: colors.background,
        fontWeight: '700'
    },
    arrowContainer:{
        width:45,
        height:45,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: radius.round,
    },
    disabled: {
        opacity: 0.65,
        elevation: 0,
        shadowOpacity: 0
    }
})