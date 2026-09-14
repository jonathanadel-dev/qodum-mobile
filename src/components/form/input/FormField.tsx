import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import FormInput from './FormInput';


type FormFieldProps<T extends FieldValues> = Omit<TextInputProps, 'value' | 'onChangeText'> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
};


// Form field
export default function FormField<T extends FieldValues>({
    control,
    name,
    label,
    ...inputProps
}: FormFieldProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormInput
                    label={label}
                    value={value as string}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                    {...inputProps}
                />
            )}
        />
    );
}