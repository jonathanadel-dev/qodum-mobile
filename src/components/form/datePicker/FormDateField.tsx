// components/form/FormDateField.tsx

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import FormDatePicker from './DatePicker';

type FormDateFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    maximumDate?: Date;
};

function FormDateField<T extends FieldValues>({
    control,
    name,
    label,
    maximumDate,
}: FormDateFieldProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormDatePicker
                    label={label}
                    value={value as Date}
                    onChange={onChange}
                    error={error?.message}
                    maximumDate={maximumDate}
                />
            )}
        />
    );
}

export default FormDateField;