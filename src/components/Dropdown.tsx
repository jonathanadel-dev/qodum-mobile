import React, { useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors, metrics } from '../styles/theme';

export type DropdownOption = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: DropdownOption[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ComponentProps<typeof Ionicons>['name'];
};

export default function Dropdown({ options, value, onChange, placeholder = 'Select', icon }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [anchor, setAnchor] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const fieldRef = useRef<View>(null);
    const anim = useRef(new Animated.Value(0)).current;

    const selectedOption = options.find((o) => o.value === value);

    const openDropdown = () => {
        fieldRef.current?.measureInWindow((x, y, width, height) => {
            setAnchor({ x, y, width, height });
            setIsOpen(true);
            Animated.timing(anim, {
                toValue: 1,
                duration: 180,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start();
        });
    };

    const closeDropdown = () => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 140,
            useNativeDriver: true,
        }).start(() => setIsOpen(false));
    };

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        closeDropdown();
    };

    return (
        <>
            <Pressable ref={fieldRef} style={styles.field} onPress={openDropdown}>
                {icon && (
                    <Ionicons name={icon} size={18} color={colors.textSecondary} style={styles.fieldIcon} />
                )}
                <Text style={[styles.fieldText, !selectedOption && styles.placeholderText]} numberOfLines={1}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={colors.textSecondary}
                />
            </Pressable>

            <Modal visible={isOpen} transparent animationType="none" onRequestClose={closeDropdown}>
                <Pressable style={StyleSheet.absoluteFill} onPress={closeDropdown} />

                <Animated.View
                    style={[
                        styles.optionsList,
                        {
                            top: anchor.y + anchor.height + 6,
                            left: anchor.x,
                            width: anchor.width,
                            opacity: anim,
                            transform: [
                                {
                                    scaleY: anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.9, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <ScrollView style={styles.optionsScroll} nestedScrollEnabled bounces={false}>
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <Pressable
                                    key={option.value}
                                    style={[styles.option, isSelected && styles.optionSelected]}
                                    onPress={() => handleSelect(option.value)}
                                >
                                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                        {option.label}
                                    </Text>
                                    {isSelected && <Ionicons name="checkmark" size={16} color={colors.primary} />}
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </Animated.View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: metrics.md,
        backgroundColor: colors.grayBackground,
        paddingHorizontal: metrics.lg,
    },
    fieldIcon: {
        marginRight: metrics.sm,
    },
    fieldText: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
    },
    placeholderText: {
        color: colors.hash,
    },
    optionsList: {
        position: 'absolute',
        backgroundColor: colors.white,
        borderRadius: metrics.md,
        maxHeight: 220,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
        overflow: 'hidden',
    },
    optionsScroll: {
        maxHeight: 220,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: metrics.lg,
        paddingVertical: metrics.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    optionSelected: {
        backgroundColor: colors.primaryBackground,
    },
    optionText: {
        fontSize: 15,
        color: colors.text,
    },
    optionTextSelected: {
        fontWeight: '700',
        color: colors.primary,
    },
});