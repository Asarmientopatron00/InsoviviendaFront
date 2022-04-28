import React from 'react';
import {Field, useField} from 'formik';
import {RadioGroup, Radio, FormControl, FormControlLabel, FormHelperText, FormLabel} from '@material-ui/core';

const MyRadioField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <FormControl error={!!errorText} component='fieldset'>
      <FormLabel {...props} {...field}>
        {props.label}
      </FormLabel>
      <Field {...props} {...field} type='radio' as={RadioGroup} row>
        {props.options.map((option, index) => {
          return (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color='secondary' />}
              label={option.label}
              labelPlacement='end'
              disabled={props.disabled}
            />
          );
        })}
      </Field>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default MyRadioField;