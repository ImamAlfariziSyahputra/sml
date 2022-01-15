import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material';
import { Controller, useFormState } from 'react-hook-form';

export default function InputCheckbox({
  name,
  control,
  setValue,
  label,
  options,
  ...rest
}) {
  const { errors } = useFormState({ control });
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  useEffect(() => {
    setValue(name, selectedItems);
    console.log(selectedItems);
  }, [selectedItems]);

  return (
    <FormControl
      size="small"
      variant="outlined"
      error={Boolean(errors && errors[name])}
    >
      <FormLabel component="legend">{label}</FormLabel>

      <FormGroup row>
        {options.map((option, idx) => {
          return (
            <FormControlLabel
              label={option.label}
              key={idx}
              control={
                <Controller
                  name={name}
                  render={({ field: { ref } }) => {
                    return (
                      <Checkbox
                        {...rest}
                        value={option.value}
                        inputRef={ref}
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    );
                  }}
                  control={control}
                />
              }
            />
          );
        })}
      </FormGroup>
      {errors && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
}
