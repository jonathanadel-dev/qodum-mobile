import React, { useState } from 'react';
import {
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, metrics } from '../../../styles/theme';
import Ionicons from '@react-native-vector-icons/ionicons';
import AppText from '../../AppText';


type DatePickerProps = {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
    error?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    placeholder?: string;
};


// Date picker
export default function DatePicker ({
    label,
    value,
    onChange,
    error,
    minimumDate,
    maximumDate,
    placeholder = 'Select date',
}: DatePickerProps) {

    const [visible, setVisible] = useState(false);

    const handleChange = (
        event: any,
        selectedDate?: Date
    ) => {
        if (Platform.OS === 'android') {
            setVisible(false);
        }

        if (event.type === 'dismissed') {
            return;
        }

        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    const formattedDate =
        value instanceof Date
            ? value.toLocaleDateString()
            : placeholder;

    return (
        <View style={styles.container}>
            <AppText style={styles.label}>
                {label}
            </AppText>

            <Pressable
                onPress={() => setVisible(true)}
                style={({ pressed }) => [
                    styles.input,
                    pressed && styles.pressed,
                    error && styles.inputError,
                ]}
            >
                <AppText
                    style={[
                        styles.value,
                        !value && styles.placeholder,
                    ]}
                >
                    {formattedDate}
                </AppText>

                <AppText style={styles.icon}>
                    <Ionicons name='calendar-outline' size={16}/>
                </AppText>
            </Pressable>

            {error && (
                <AppText style={styles.error}>
                    {error}
                </AppText>
            )}

            {visible && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    display={
                        Platform.OS === 'ios'
                            ? 'spinner'
                            : 'default'
                    }
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                    onChange={handleChange}
                />
            )}
        </View>
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
        marginBottom: metrics.lg,
    },

    label: {
        // ...typography.label,
    },

    input: {
        minHeight: 52,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: metrics.md,
        paddingHorizontal: metrics.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    pressed: {
        opacity: 0.75,
    },

    inputError: {
        borderColor: colors.danger,
    },

    value: {
        // ...typography.input,
    },

    placeholder: {
        color: colors.hash,
    },

    icon: {
        fontSize: 18,
    },

    error: {
        // ...typography.error,
    }
});