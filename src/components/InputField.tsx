import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    formik: any
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onEndIconClick?: () => void;
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
    const hasError = formik.touched[name] && Boolean(formik.errors[name]);

    return (
        <TextField
            fullWidth
            variant="outlined"
            id={name}
            name={name}
            label={label}
            type={type}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={hasError}
            helperText={hasError ? formik.errors[name] : ''}
            InputProps={{
                startAdornment: icon && (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ),
                endAdornment: endIcon && (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={onEndIconClick}
                            edge="end"
                            size="small"
                        >
                            {endIcon}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default InputField;
