import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import type { TextFieldProps } from '@mui/material';

interface DatePickerProps {
    label: string;
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
}

const DatePickerField = ({ label, value, onChange }: DatePickerProps) => {
    return (
        <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            slotProps={{
                textField: {
                    fullWidth: true,
                    size: 'small',
                    variant: 'outlined',
                    className: '!bg-secondary/50 !rounded-md',
                } as TextFieldProps,
            }}
        />
    );
};

export default DatePickerField;
