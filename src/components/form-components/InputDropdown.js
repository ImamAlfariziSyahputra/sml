import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function InputDropdown({
  name,
  label,
  control,
  options,
  ...rest
}) {
  const generateSingleOption = () => {
    return options.map((option, idx) => (
      <MenuItem key={idx} value={option}>
        {option}
      </MenuItem>
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          select
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
          onChange={onChange}
          value={value}
          variant="outlined"
          fullWidth
          inputRef={ref}
          {...rest}
        >
          <MenuItem value="">~ Silahkan Pilih ~</MenuItem>
          {generateSingleOption()}
        </TextField>
      )}
    />
  );
}
