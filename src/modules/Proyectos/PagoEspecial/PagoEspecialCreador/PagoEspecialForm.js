import React, { useEffect } from 'react';
import {Box, Button} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyTextField from 'shared/components/MyTextField';
import MyCurrencyField from 'shared/components/MyCurrencyField';
import MyCheckField from 'shared/components/MyCheckField';

const useStyles = makeStyles((theme) => ({
  bottomsGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '20px',
    gap: '10px',
    backgroundColor: 'white',
    paddingRight: '20px',
    position: 'sticky',
    left: 0,
    bottom: 0,
  },
  myTextField: {
    width: '100%',
    marginBottom: 10,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 5,
    },
    height: '60px',
    paddingRight: 20
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
  grid: {
    width: '70%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  grid2: {
    width: '70%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const PagoEspecialForm = (props) => {
  const {
    values,
    setFieldValue,
    resetForm,
    check,
    handleCheck
  } = props;

  useEffect(() => {
    const seguro = parseInt(values.valorSeguro !== '' ? values.valorSeguro : 0);
    const interes = parseInt(values.valorInteres !== '' ? values.valorInteres : 0);
    const mora = parseInt(values.valorMora !== '' ? values.valorMora : 0);
    const capital = parseInt(values.valorCapital !== '' ? values.valorCapital : 0);
    const total = seguro+interes+mora+capital;
    setFieldValue('one', total);
  },[ // eslint-disable-line
    values.valorSeguro,
    values.valorInteres,
    values.valorMora,
    values.valorCapital,
  ])  
  const classes = useStyles(props);

  return (
    <Form className='' noValidate autoComplete='off'>
      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.grid2}>
              <h2>Valores a Pagar</h2>
              <h2>Valores Cuotas</h2>
            </Box>
            <Box className={classes.grid2}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha de Pago'
                name='pagosFechaPago'
                InputLabelProps={{
                  shrink: true,
                }}
                type='date'
              />
            </Box>
            <Box className={classes.grid2}>
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Pago'
                name='pagosValorTotalPago'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Pago'
                name='pagosValorTotalCuotas'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </Box>
            <Box className={classes.grid2}>
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Seguro'
                name='valorSeguro'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Seguro'
                name='valorSeguroCuotas'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <MyCheckField
                label='Condonar Seguro?'
                name='condonarSeguro'
                handleCheck={handleCheck}
                checked={check.condonarSeguro}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Interés Mora'
                name='valorMora'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Interés Mora'
                name='valorMoraCuotas'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <MyCheckField
                label='Condonar Int. Mora?'
                name='condonarMora'
                handleCheck={handleCheck}
                checked={check.condonarMora}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Interés Corriente'
                name='valorInteres'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Interés Corriente'
                name='valorInteresCuotas'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <MyCheckField
                label='Condonar Int. Corriente?'
                name='condonarInteres'
                handleCheck={handleCheck}
                checked={check.condonarInteres}
              />
            </Box>
            <Box className={classes.grid2}>
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Capital'
                name='valorCapital'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Capital'
                name='valorCapitalCuotas'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </Box>
            <Box className={classes.grid}>
              <MyTextField
                className={classes.myTextField}
                label='Descripción Pago'
                name='pagosDescripcionPago'
              />
            </Box>
          </Box>
        </Box>
      </Scrollbar>
      <Box className={classes.bottomsGroup}>
        <Button
          className={`${classes.btnRoot} ${classes.btnPrymary}`}
          variant='contained'
          type='submit'>
          <IntlMessages id='boton.submit' />
        </Button>
        <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={resetForm}
        >
          <IntlMessages id='boton.cancel' />
        </Button>
      </Box>
    </Form>
  );
};

export default PagoEspecialForm;
