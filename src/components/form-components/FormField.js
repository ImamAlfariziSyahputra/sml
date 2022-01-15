import React from 'react';
import { Controller, useFormState } from 'react-hook-form';

const FormField = React.forwardRef(
  (
    {
      name,
      label,
      Component,
      rules,
      control,
      variant = 'outlined',
      size = 'small',
      ...restProps
    },
    ref
  ) => {
    const formState = useFormState({ control });
    return (
      <Controller
        name={name}
        ref={ref}
        render={({ field }) => (
          <Component
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            ref={field.ref}
            error={Boolean(formState.errors && formState.errors[name])}
            helperText={formState.errors && formState.errors[name]?.message}
            label={label}
            variant={variant}
            size={size}
            {...restProps}
            {...field}
          />
        )}
        rules={rules}
        control={control}
      />
    );
  }
);

export default FormField;
