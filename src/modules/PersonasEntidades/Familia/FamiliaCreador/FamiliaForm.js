import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyTextField from 'shared/components/MyTextField';
import MyRadioField from 'shared/components/MyRadioField';
import MySelectField from 'shared/components/MySelectField';
import MyCurrencyField from 'shared/components/MyCurrencyField';
import MyAutocompletePersona from 'shared/components/MyAutoCompletePersona';

const options = [
  {value: '1', label: 'Activo'},
  {value: '0', label: 'Inactivo'},
];

const FamiliaForm = (props) => {
  const {handleOnClose, accion, values, initialValues, titulo, setFieldValue, personas} = props;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  useEffect(() => {
    if(values.identificacion_persona){
      const persona = personas.find((persona) => persona.personasIdentificacion == values.identificacion_persona); //eslint-disable-line
      if(persona){
        setFieldValue('nombre', persona.nombre);
        console.log(values.identificacion_persona);
      }
    } else {
      setFieldValue('nombre', '');
    }
  },[values.identificacion_persona]) //eslint-disable-line

  useEffect(() => {
    const egresos = [
      values.familiasEgresosVivienda,
      values.familiasEgresosAlimentacion,
      values.familiasEgresosSerPublicos,
      values.familiasEgresosTransporte,
      values.familiasEgresosSalud,
      values.familiasEgresosEducacion,
      values.familiasEgresosDeudas,
      values.familiasEgresosOtros,
    ]
    let total = 0;
    egresos.forEach((egresos) => {
      total = total + parseFloat(egresos??0)
    })
    setFieldValue('familiasTotalEgresos', total)
  },[ //eslint-disable-line
    values.familiasEgresosVivienda,
    values.familiasEgresosAlimentacion,
    values.familiasEgresosSerPublicos,
    values.familiasEgresosTransporte,
    values.familiasEgresosSalud,
    values.familiasEgresosEducacion,
    values.familiasEgresosDeudas,
    values.familiasEgresosOtros,
  ])

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
      marginBottom: 5,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 5,
      },
      height: '60px',
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
      gap: '10px'
    },
  }));

  const classes = useStyles(props);

  return (
    <Form className='' noValidate autoComplete='off'>
      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box
            component='h6'
            mb={{xs: 4, xl: 6}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.inputs_2}>
              <MyAutocompletePersona
                options={personas}
                completeid
                style={{
                  paddingRight: '10px'
                }}
                name='identificacion_persona'
                inputValue={initialValues.identificacion_persona}
                label='Identificación Solicitante'
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label='Nombre Solicitante'
                name='nombre'
                disabled
              />
              <MySelectField
                label='Tipo Familia'
                className={classes.myTextField}
                style={{
                  paddingRight: 20
                }}
                disabled={disabled}
                name='tipo_familia_id'
                options={options}
                variant='standard'
              />
              <MySelectField
                label='Condición Familia'
                className={classes.myTextField}
                disabled={disabled}
                name='condicion_familia_id'
                options={options}
                variant='standard'
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Visita Domiciliaria'
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  paddingRight: 20
                }}
                name='familiasFechaVisitaDomici'
                disabled={disabled}
                type='date'
              />
            </Box>
            <Box className={classes.inputs_4}>
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Vivienda'
                name='familiasEgresosVivienda'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Alimentacion'
                name='familiasEgresosAlimentacion'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Serv. Públicos'
                name='familiasEgresosSerPublicos'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Transporte'
                name='familiasEgresosTransporte'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Salud'
                name='familiasEgresosSalud'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Educación'
                name='familiasEgresosEducacion'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Deudas'
                name='familiasEgresosDeudas'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Egresos Otros'
                name='familiasEgresosOtros'
                disabled={disabled}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Total Egresos'
                name='familiasTotalEgresos'
                disabled
              />
            </Box>
            <Box className={classes.inputs_4}>
              <MyCurrencyField
                className={classes.myTextField}
                label='Aportes Formales'
                name='familiasAportesFormales'
                disabled
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Aportes Informales'
                name='familiasAportesInformales'
                disabled
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Aportes Arriendo'
                name='familiasAportesArriendo'
                disabled
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Aportes Subsidios'
                name='familiasAportesSubsidios'
                disabled
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Aportes Paternidad'
                name='familiasAportesPaternidad'
                disabled
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Aportes Terceros'
                name='familiasAportesTerceros'
                disabled
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Aportes Otros'
                name='familiasAportesOtros'
                disabled
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Total Aportes'
                name='familiasTotalAportes'
                disabled
              />
            </Box>
            <Box className={classes.inputs_1}>
              <MyTextField
                className={classes.myTextField}
                label='Observaciones'
                name='familiasObservaciones'
                disabled={disabled}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyRadioField
                label='Estado'
                name='estado'
                required
                disabled={accion === 'ver'}
                options={options}
              />
            </Box>
          </Box>
        </Box>
      </Scrollbar>
      <Box className={classes.bottomsGroup}>
        {accion !== 'ver' ? (
          <Button
            className={`${classes.btnRoot} ${classes.btnPrymary}`}
            variant='contained'
            type='submit'>
            <IntlMessages id='boton.submit' />
          </Button>
        ) : (
          ''
        )}
        <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={handleOnClose}>
          <IntlMessages id='boton.cancel' />
        </Button>
      </Box>
    </Form>
  );
};

export default FamiliaForm;
