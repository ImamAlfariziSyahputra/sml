import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function InputText({ name, control, label, ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          {...rest}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
          onChange={onChange}
          value={value}
          variant="outlined"
          fullWidth
          inputRef={ref}
        />
      )}
    />
  );
}
