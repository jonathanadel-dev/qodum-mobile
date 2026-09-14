import React, { forwardRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import { colors } from '../../../styles/theme';


type FormInputProps = TextInputProps & {
    label: string;
    error?: string;
};


// Input
const FormInput = forwardRef<TextInput, FormInputProps>(
    (
        {
            label,
            error,
            style,
            onFocus,
            onBlur,
            ...props
        },
        ref
    ) => {
        const [focused, setFocused] = useState(false);

        return (
            <View style={styles.inputGroup}>
                <Text style={styles.label}>
                    {label}
                </Text>

                <TextInput
                    // @ts-ignore
                    ref={ref}
                    {...props}
                    onFocus={(event) => {
                        setFocused(true);
                        onFocus?.(event);
                    }}
                    onBlur={(event) => {
                        setFocused(false);
                        onBlur?.(event);
                    }}
                    placeholderTextColor={colors.hash}
                    style={[
                        styles.input,
                        focused && styles.inputFocused,
                        props.multiline && styles.multilineInput,
                        error && styles.inputError,
                        style,
                    ]}
                    textAlignVertical={props.multiline ? 'top' : 'center'}
                />

                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}
            </View>
        );
    }
);


// Styles
const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 18,
    },

    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#12263A',
        marginBottom: 7,
        marginLeft: 2,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        color: '#12263A',
        textAlign: 'left',
        textAlignVertical: 'center',
    },

    inputFocused: {
        borderColor: colors.primary,
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },

    inputError: {
        borderColor: colors.danger,
        backgroundColor: colors.dangerBackground,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },

    multilineInput: {
        height: 110,
        paddingHorizontal: 12,
        paddingVertical: 14,
        textAlignVertical: 'top',
    },

    errorText: {
        fontSize: 12,
        color: colors.danger,
        marginTop: 5,
    },
});


FormInput.displayName = 'FormInput';
export default FormInput;