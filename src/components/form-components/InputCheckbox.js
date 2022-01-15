import React, { useState, forwardRef, useEffect } from 'react';
import {
  FormControl,
  // FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import FormField from './FormField';

const InputCheckbox = forwardRef((props, ref) => (
  <FormField ref={ref} Component={InputCheckboxImpl} {...props} />
));

const InputCheckboxImpl = forwardRef(
  (
    {
      // label,
      name = '',
      error,
      variant,
      size,
      value,
      onChange,
      helperText,
      options = []
      // nameField = 'label',
      // valueField = 'value'
    },
    ref
  ) => {
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {
      const newState = [];
      if (value) {
        // console.log("value => ", value);
        value.map((option) => newState.push(option));
        setCheckedItems(newState);
      }
      // }
    }, [value]);

    const handleClick = (e) => {
      const newState = { ...checkedItems };
      console.log("newState => ", newState)
      console.log("e.target.checked => ", e.target.checked)

      if (e.target.checked) {
        newState[e.target.value] = true;
      } else {
        delete newState[e.target.value];
      }
      setCheckedItems(newState);

      const options = Object.keys(newState);
      if (onChange) onChange(options.length === 0 ? [] : options);
    };

    // console.log('checkedItems => ', checkedItems);
    return (
      <FormControl variant={variant} size={size} error={error}>
        {/* {options.map((option) => (
          <FormLabel key={option}>{option}</FormLabel>
        ))} */}
        <FormGroup row>
          {options.map((option) => {
            return (
              <FormControlLabel
                key={option}
                value={option}
                label={option}
                control={
                  <Checkbox
                    inputRef={ref}
                    size={size}
                    name={name}
                    value={option}
                    onClick={handleClick}
                    checked={Boolean(checkedItems.includes(`"${option}"`))}
                  />
                }
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }
);

export default InputCheckbox;
