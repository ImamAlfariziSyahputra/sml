// import React from 'react';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DatePicker from '@mui/lab/DatePicker';
// import { Controller } from 'react-hook-form';
// import { FormControl, FormHelperText, TextField } from '@mui/material';
// import FormField from './FormField';

// const DATE_FORMAT = 'dd-MMM-yyyy';

// const InputDate = React.forwardRef((props, ref) => (
//   <FormField ref={ref} Component={InputDateImpl} {...props} />
// ));

// const InputDateImpl = React.forwardRef(
//   (
//     {
//       label,
//       name = '',
//       error,
//       variant,
//       size,
//       value,
//       onChange,
//       helperText,
//       ...rest
//     },
//     ref
//   ) => {
//     return (
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Controller
//           name={name}
//           // control={control}
//           render={() => (
//             <FormControl variant={variant} size={size} error={error} fullWidth>
//               <>
//                 <DatePicker
//                   inputVariant="outlined"
//                   variant="inline"
//                   disableMaskedInput
//                   onChange={onChange}
//                   defaultValue={new Date()}
//                   // id={`date-${Math.random()}`}
//                   rifmFormatter={(val) =>
//                     val.replace(/[^[a-zA-Z0-9-]*$]+/gi, '')
//                   }
//                   inputFormat={DATE_FORMAT}
//                   renderInput={(params) => (
//                     <TextField fullWidth value={value} {...rest} {...params} />
//                   )}
//                   {...rest}
//                 />
//                 <FormHelperText>{helperText}</FormHelperText>
//               </>
//             </FormControl>
//           )}
//         />
//       </LocalizationProvider>
//     );
//   }
// );
// export default InputDate;

import React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const DATE_FORMAT = 'dd-MMM-yyyy';

export default function InputDate({ name, control, ...rest }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            inputVariant="outlined"
            variant="inline"
            disableMaskedInput
            onChange={field.onChange}
            defaultValue={new Date()}
            // id={`date-${Math.random()}`}
            rifmFormatter={(val) => val.replace(/[^[a-zA-Z0-9-]*$]+/gi, '')}
            inputFormat={DATE_FORMAT}
            renderInput={(params) => {
              // console.log('field.ref => ', field.ref);
              return (
                <TextField
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                  value={field.value}
                  {...rest}
                  {...params}
                />
              );
            }}
            {...field}
          />
        )}
      />
    </LocalizationProvider>
  );
}
