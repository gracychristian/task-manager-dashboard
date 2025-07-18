import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { MenuItem } from '@mui/material';

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    formik: any
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onEndIconClick?: () => void;
    multiline?: boolean;
    rows?: number;
    select?: boolean;
    options?: { label: string; value: string }[];
}

const InputField = ({
    name,
    label,
    type = 'text',
    formik,
    icon,
    endIcon,
    onEndIconClick,
    ...props
}: InputFieldProps) => {
    const hasError = formik.touched[name] && Boolean(formik.errors[name]?.value || formik.errors[name]);
    const helperText =
        formik.touched[name] && typeof formik.errors[name] === 'object'
            ? formik.errors[name]?.value
            : formik.errors[name];

    return (
        <TextField
            fullWidth
            variant="outlined"
            id={name}
            name={name}
            label={label}
            type={type}
            value={props.select ? formik.values[name]?.value || '' : formik.values[name]}
            onChange={(e) => {
                const selectedValue = e.target.value;
                if (props.select && props.options) {
                    const selectedOption = props.options.find(opt => opt.value === selectedValue);
                    formik.setFieldValue(name, selectedOption || { label: '', value: '' });
                } else {
                    formik.handleChange(e);
                }
            }}
            onBlur={formik.handleBlur}
            error={hasError}
            helperText={helperText}
            multiline={props.multiline}
            rows={props.rows}
            select={props.select}
            InputLabelProps={type === 'date' ? { shrink: true } : undefined}
            InputProps={{
                startAdornment: icon && (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ),
                endAdornment: type !== 'date' && endIcon ? (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={onEndIconClick}
                            edge="end"
                            size="small"
                        >
                            {endIcon}
                        </IconButton>
                    </InputAdornment>
                ) : undefined,
            }}
            {...props}
        >
            {
                props.select &&
                props.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))
            }
        </TextField >
    );
};

export default InputField;
