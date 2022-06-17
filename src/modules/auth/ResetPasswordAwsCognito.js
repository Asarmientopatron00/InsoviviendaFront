import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {onSetNewCognitoPassword} from '../../redux/actions';
import {useHistory, useParams} from 'react-router-dom';
import InfoView from '@crema/core/InfoView';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../shared/constants/AppEnums';
import AppLogo from 'shared/components/AppLogo';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  email: yup.string().required('Requerido'),
  newPassword: yup.string().required('Requerido'),
  confirmPassword: yup.string().required('Requerido'),
});

const ResetPasswordAwsCognito = (props) => {
  const dispatch = useDispatch();
  const {token} = useParams();

  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    imgRoot: {
      cursor: 'pointer',
      display: 'inline-block',
      width: 140,
    },
    cardRoot: {
      maxWidth: '32rem',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      // padding: 24,
      padding: 24,
      [theme.breakpoints.up('sm')]: {
        // padding: 40,
      },
      [theme.breakpoints.up('md')]: {
        // padding: 48,
      },
      [theme.breakpoints.up('xl')]: {
        // padding: 64,
      },
    },
    formRoot: {
      position: 'relative',
    },
    myTextFieldRoot: {
      width: '100%',
      height: '70px',
    },
    btnRoot: {
      width: '100%',
      fontWeight: Fonts.REGULAR,
      fontSize: 16,
      textTransform: 'capitalize',
      paddingLeft: 15,
      paddingRight: 15,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.colorHover,
        cursor: 'pointer',
      },
    },
    btnPrymary: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));
  const classes = useStyles(props);

  return (
    <Box flex={1} display='flex' flexDirection='column' justifyContent='center'>
      <Box
        mb={{xs: 6, md: 8, xl: 18}}
        textAlign='center'
        style={{margin: '10px auto'}}>
        <AppLogo big={true} />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Card className={classes.cardRoot}>
          <Box
            component='h2'
            mb={{xs: 6, xl: 8}}
            color='text.primary'
            fontWeight={Fonts.REGULAR}
            fontSize={{xs: 24, sm: 26}}>
            <IntlMessages id='common.resetPassword' />
          </Box>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setErrors, resetForm, setSubmitting}) => {
              if (data.newPassword !== data.confirmPassword) {
                setErrors({
                  confirmPassword: (
                    <IntlMessages id='validation.passwordMisMatch' />
                  ),
                });
                setSubmitting(false);
              } else {
                setSubmitting(true);
                dispatch(
                  onSetNewCognitoPassword(
                    token,
                    data.email,
                    data.newPassword,
                    data.confirmPassword,
                    history,
                  ),
                );
                setSubmitting(false);
              }
            }}>
            {({isSubmitting}) => (
              <Form className={classes.formRoot} noValidate autoComplete='off'>
                <Box mb={{xs: 2, lg: 4}}>
                  <MyTextField
                    name='email'
                    label='Identificación'
                    className={classes.myTextFieldRoot}
                    type='text'
                  />
                </Box>

                <Box mb={{xs: 2, lg: 4}}>
                  <MyTextField
                    name='newPassword'
                    label={<IntlMessages id='common.newPassword' />}
                    className={classes.myTextFieldRoot}
                    type='password'
                  />
                </Box>

                <Box mb={{xs: 2, lg: 4}}>
                  <MyTextField
                    name='confirmPassword'
                    label={<IntlMessages id='common.confirmPassword' />}
                    className={classes.myTextFieldRoot}
                    type='password'
                  />
                </Box>

                <Button
                  variant='contained'
                  type='submit'
                  disabled={isSubmitting}
                  color='secondary'
                  className={`${classes.btnRoot} ${classes.btnPrymary}`}>
                  <IntlMessages id='common.resetMyPassword' />
                </Button>
              </Form>
            )}
          </Formik>
          <InfoView />
        </Card>
      </Box>
    </Box>
  );
};

export default ResetPasswordAwsCognito;
