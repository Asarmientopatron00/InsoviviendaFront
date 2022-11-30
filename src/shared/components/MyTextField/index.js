import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useField} from 'formik';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      onBlur={props.onBlur}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default MyTextField;
