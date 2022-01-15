import React, { forwardRef } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Radio,
  RadioGroup
} from '@mui/material';
import FormField from './FormField';

const InputRadio = forwardRef((props, ref) => (
  <FormField ref={ref} Component={InputRadioImpl} {...props} />
));

const InputRadioImpl = forwardRef(
  (
    { label, name = '', error, value, onChange, helperText, options, ...rest },
    ref
  ) => {
    const generateRadioOptions = () => {
      return options.map((option, idx) => (
        <FormControlLabel
          ref={ref}
          key={idx}
          value={option}
          label={option}
          control={<Radio />}
        />
      ));
    };
    return (
      <FormControl component="fieldset" error={error}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup value={value} onChange={onChange} name={name} {...rest}>
          {generateRadioOptions()}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }
);

export default InputRadio;
