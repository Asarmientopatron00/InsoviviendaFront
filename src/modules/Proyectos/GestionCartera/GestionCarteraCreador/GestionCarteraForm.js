import React from 'react';
import {Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Form} from 'formik';
import {useEffect} from 'react';
import MyAutocompletePersona from 'shared/components/MyAutoCompletePersona';
import MyTextField from 'shared/components/MyTextField';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

const useStyles = makeStyles((theme) => ({
  bottomsGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '20px',
    gap: '10px',
    backgroundColor: 'white',
    paddingRight: '20px',
    marginTop: 80,
  },
  myTextField: {
    width: '100%',
    marginBottom: 5,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 5,
    },
    height: '60px',
    paddingRight: '20px',
  },
  MyRadioField: {
    width: '100%',
    marginBottom: 0,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 0,
    },
  },
  MySelectField: {
    width: 'auto',
    marginBottom: 16,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 24,
    },
    color: theme.palette.primary.main,
    '&:target': {
      color: theme.palette.primary.main,
    },
  },
  btnRoot: {
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
  btnSecundary: {
    backgroundColor: theme.palette.primary.main,
  },
  widthFull: {
    width: '100%',
  },
  pointer: {
    cursor: 'pointer',
  },
  inputs_2: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
  },
  inputs_3: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 3fr',
  },
  inputs_4: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
  },
  marco: {
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
  },
  root: {
    padding: '20px',
    // backgroundColor: theme.palette.gray[200],
  },
  actividad_eca: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
  },
}));

const GestionCarteraForm = (props) => {
  const {
    values,
    setFieldValue,
    orientadores,
    handleOnClose,
    accion,
    initialValues,
  } = props;

  const classes = useStyles(props);

  useEffect(() => {
    if (
      values.asesor_gestion_cartera_identificacion &&
      values.asesor_gestion_cartera_identificacion !==
        initialValues.asesor_gestion_cartera_identificacion &&
      orientadores
    ) {
      const orientador = orientadores.find(
        (orientador) =>
          orientador.identificacion ===
          values.asesor_gestion_cartera_identificacion,
      ); //eslint-disable-line
      setFieldValue('asesor_gestion_cartera_nombre', orientador?.nombre ?? '');
      setFieldValue('asesor_gestion_cartera_id', orientador?.id ?? '');
    }
  }, [values.asesor_gestion_cartera_identificacion]); //eslint-disable-line

  return (
    <Form noValidate autoComplete='off' className={classes.root}>
      <Box className={classes.marco}>
        <Box component='h6' mb={{xs: 4, xl: 6}} fontSize={20} fontWeight='bold'>
          Gestion Cartera
        </Box>
        <Box px={{md: 5, lg: 8, xl: 10}}>
          <Box className={classes.inputs_2}>
            <MyTextField
              label='Número Proyecto'
              name='proyecto_id'
              className={classes.myTextField}
              disabled={accion !== 'crear'}
            />
          </Box>
          <Box className={classes.inputs_2}>
            <MyTextField
              className={classes.myTextField}
              label='Identificación Solicitante'
              name='identificacion'
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
            <MyTextField
              className={classes.myTextField}
              label='Solicitante'
              name='solicitante'
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          </Box>
          <Box className={classes.inputs_2}>
            <MyAutocompletePersona
              label='Identificacion Gestor Cartera'
              completeid={'true'}
              style={{
                paddingRight: '10px',
              }}
              className={classes.myTextField}
              name='asesor_gestion_cartera_identificacion'
              options={orientadores}
              disabled={accion !== 'editar'}
            />
            <MyTextField
              className={classes.myTextField}
              label='Nombre Gestor Cartera'
              name='asesor_gestion_cartera_nombre'
              disabled
            />
          </Box>
          <Box className={classes.inputs_1}>
            <MyTextField
              className={classes.myTextField}
              label='Observaciones Gestión Cartera'
              multiline
              variant='outlined'
              rows={4}
              name='proyectosObservacionesGestionC'
              disabled={accion !== 'editar'}
            />
          </Box>
        </Box>
        <Box className={classes.bottomsGroup}>
          <Button
            className={`${classes.btnRoot} ${classes.btnPrymary}`}
            variant='contained'
            type='submit'>
            <IntlMessages id='boton.submit' />
          </Button>
          <Button
            className={`${classes.btnRoot} ${classes.btnSecundary}`}
            onClick={handleOnClose}>
            <IntlMessages id='boton.cancel' />
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default GestionCarteraForm;
