import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { IInputTextProps } from './InputTextProps';

const InputText = ({
  name,
  control,
  label,
  defaultValue = '',
  ...props
}: IInputTextProps) => (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          fullWidth
          inputRef={ref}
          label={label}
          variant='outlined'
          margin='normal'
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          {...props}
        />
      )}
    />
);
export default InputText;
