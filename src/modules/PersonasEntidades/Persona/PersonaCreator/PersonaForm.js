import React, {useEffect, useState, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import MyTextField from 'shared/components/MyTextField';
import MyRadioField from 'shared/components/MyRadioField';
import MySelectField from 'shared/components/MySelectField';

const options = [
  {id: 1, nombre: 'Uno', estado: 1},
  {id: 2, nombre: 'Dos', estado: 1},
  {id: 3, nombre: 'Tres', estado: 1},
  {id: 4, nombre: 'Cuatro', estado: 1},
];

const ParticipanteForm = (props) => {
  const {
    accion,
    values,
    initialValues,
    // tiposDocumentos,
    // onChangeDepartamento,
    // departamentos,
    // ciudades,
    // comunas,
    // barrios,
    // gruposPoblacionales,
    // nivelesEscolaridad,
    // familias,
    // estadosSociopoliticos,
    // onChangeCity,
    // onChangeComuna,
  } = props;

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  // let onChangeDepartamento1 = useRef();
  // onChangeDepartamento1 = (id) => {
  //   onChangeDepartamento(id);
  //   if (!initialValues.departamento_id) {
  //     values.ciudad_id = '';
  //   }
  // };
  // let onChangeCiudad1 = useRef();
  // onChangeCiudad1 = (id) => {
  //   onChangeCity(id);
  //   if (!initialValues.ciudad_id) {
  //     values.comuna_id = '';
  //   }
  // };
  // let onChangeComuna1 = useRef();
  // onChangeComuna1 = (id) => {
  //   onChangeComuna(id);
  //   // initialValues.barrio_id='';
  //   if (!initialValues.comuna_id) {
  //     values.barrio_id = '';
  //   }
  // };

  // useEffect(() => {
  //   if (values.departamento_id !== '') {
  //     onChangeDepartamento1(values.departamento_id);
  //   } else {
  //     onChangeDepartamento1(0);
  //   }
  // }, [values.departamento_id]);

  // useEffect(() => {
  //   if (values.ciudad_id !== '') {
  //     onChangeCiudad1(values.ciudad_id);
  //   } else {
  //     onChangeCiudad1(0);
  //   }
  // }, [values.ciudad_id]);

  // useEffect(() => {
  //   if (values.comuna_id !== '') {
  //     onChangeComuna1(values.comuna_id);
  //   } else {
  //     onChangeComuna1(0);
  //   }
  // }, [values.comuna_id]);

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

  const classes = useStyles(props);
  return (
    <Form noValidate autoComplete='off' className={classes.root}>
      <Box className={classes.marco}>
        <Box
          component='h6'
          mb={{xs: 4, xl: 6}}
          fontSize={20}
          fontWeight='bold'>
          <IntlMessages id='personas' />
        </Box>
        <Box px={{md: 5, lg: 8, xl: 10}}>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3}>
              Datos Generales:
          </Box>
          <Box className={classes.inputs_4}>
            <MyTextField
              className={classes.myTextField}
              label='Identificacion'
              name='personasIdentificacion'
              disabled={disabled}
              required
            />
            <MyAutocomplete
              options={options}
              style={{
                paddingRight: '10px'
              }}
              name='tipo_identificacion_id'
              inputValue={initialValues.tipo_identificacion_id}
              label='Tipo Identificacion'
              className={classes.myTextField}
              required
              disabled={disabled}
            />
            <MySelectField
              label='Categoria Aportes'
              className={classes.myTextField}
              disabled={disabled}
              name='personasCategoriaAportes'
              options={options}
              variant='standard'
            />
            <MyTextField
              className={classes.myTextField}
              label='Nombres'
              name='personasNombres'
              disabled={disabled}
              required
              inputProps={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <MyTextField
              className={classes.myTextField}
              label='Primer Apellido'
              name='personasPrimerApellido'
              disabled={disabled}
              required
              inputProps={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <MyTextField
              className={classes.myTextField}
              label='Segundo Apellido'
              name='personasSegundoApellido'
              disabled={disabled}
              inputProps={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <MyTextField
              className={classes.myTextField}
              label='Fecha Nacimiento'
              InputLabelProps={{
                shrink: true,
              }}
              name='personasFechaNacimiento'
              disabled={disabled}
              type='date'
              inputProps={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <MyAutocomplete
              label='Pais Nacimiento'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='pais_nacimiento_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Departamento Nacimiento'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='departamento_nacimiento_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Ciudad Nacimiento'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='ciudad_nacimiento_id'
              disabled={disabled}
              options={options}
            />
            <MySelectField
              label='Genero'
              className={classes.myTextField}
              disabled={disabled}
              name='personasGenero'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Estado Civil'
              className={classes.myTextField}
              disabled={disabled}
              name='estado_civil_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo Parentesco'
              className={classes.myTextField}
              disabled={disabled}
              name='personasParentesco'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo Poblacion'
              className={classes.myTextField}
              disabled={disabled}
              name='tipo_poblacion_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo Discapacidad'
              className={classes.myTextField}
              disabled={disabled}
              name='tipo_discapacidad_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Seguridad Social'
              className={classes.myTextField}
              disabled={disabled}
              name='personasSeguridadSocial'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='EPS'
              className={classes.myTextField}
              disabled={disabled}
              name='eps_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Grado Escolaridad'
              className={classes.myTextField}
              disabled={disabled}
              name='grado_escolaridad_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Vehiculo'
              className={classes.myTextField}
              disabled={disabled}
              name='personasVehiculo'
              options={options}
              variant='standard'
            />
            <MyTextField
              className={classes.myTextField}
              label='Correo'
              name='personasCorreo'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Fecha Vinculacion'
              InputLabelProps={{
                shrink: true,
              }}
              name='personasFechaVinculacion'
              disabled={disabled}
              type='date'
              inputProps={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <MyAutocomplete
              label='Identificacion Familia'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='familia_id'
              disabled={disabled}
              options={options}
            />
            <MyTextField
              className={classes.myTextField}
              label='Nombre Familia'
              name='personasCorreo'
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
            <MySelectField
              label='Estado Trámite'
              className={classes.myTextField}
              disabled={disabled}
              name='personasEstadoTramite'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Estado Registro'
              className={classes.myTextField}
              disabled={disabled}
              name='personasEstadoRegistro'
              options={options}
              variant='standard'
            />
            {/* <MyRadioField
              label='Persona con Discapacidad'
              className={classes.MyRadioField}
              name='indicativo_discapacidad'
              disabled={disabled}
              required
              options={INDICATIVO_DISCAPACIDAD}
            /> */}
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Datos Vivienda:
          </Box>
          <Box className={classes.inputs_4}>
            <MyAutocomplete
              label='Departamento'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='departamento_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Ciudad'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='ciudad_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Comuna'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='comuna_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Barrio'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='barrio_id'
              disabled={disabled}
              options={options}
            />
            <MyTextField
              className={classes.myTextField}
              label='Direccion'
              name='personasDireccion'
              disabled={disabled}
            />
            <MySelectField
              label='Zona'
              className={classes.myTextField}
              disabled={disabled}
              name='personasZona'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Estrato'
              className={classes.myTextField}
              disabled={disabled}
              name='personasEstrato'
              options={options}
              variant='standard'
            />
            <MyTextField
              className={classes.myTextField}
              label='Teléfono Casa'
              name='personasTelefonoCasa'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Teléfono Celular'
              name='personasTelefonoCelular'
              disabled={disabled}
            />
            <MySelectField
              label='Tipo Vivienda'
              className={classes.myTextField}
              disabled={disabled}
              name='tipo_vivienda_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo Propiedad'
              className={classes.myTextField}
              disabled={disabled}
              name='personasTipoPropiedad'
              options={options}
              variant='standard'
            />
            <MyTextField
              className={classes.myTextField}
              label='Numero Escritura'
              name='personasNumeroEscritura'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Notaria Escritura'
              name='personasNotariaEscritura'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Fecha Escritura'
              InputLabelProps={{
                shrink: true,
              }}
              name='personasFechaEscritura'
              disabled={disabled}
              type='date'
              inputProps={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <MySelectField
              label='Indicativo'
              className={classes.myTextField}
              disabled={disabled}
              name='personasIndicativoPC'
              options={options}
              variant='standard'
            />
            <MyTextField
              className={classes.myTextField}
              label='Numero Habitaciones'
              name='personasNumeroHabitaciones'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Numero Baños'
              name='personasNumeroBanos'
              disabled={disabled}
            />
            <MySelectField
              label='Tipo Techo'
              className={classes.myTextField}
              disabled={disabled}
              name='tipo_techo_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo Piso'
              className={classes.myTextField}
              disabled={disabled}
              name='tipo_piso_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo División'
              className={classes.myTextField}
              disabled={disabled}
              name='tipo_division_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Sala'
              className={classes.myTextField}
              disabled={disabled}
              name='personasSala'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Comedor'
              className={classes.myTextField}
              disabled={disabled}
              name='personasComedor'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Cocina'
              className={classes.myTextField}
              disabled={disabled}
              name='personasCocina'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Patio'
              className={classes.myTextField}
              disabled={disabled}
              name='personasPatio'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Terraza'
              className={classes.myTextField}
              disabled={disabled}
              name='personasTerraza'
              options={options}
              variant='standard'
            />
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Datos Laborales:
          </Box>
          <Box className={classes.inputs_4}>
            <MySelectField
              label='Ocupacion'
              className={classes.myTextField}
              disabled={disabled}
              name='ocupacion_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo Trabajo'
              className={classes.myTextField}
              disabled={disabled}
              name='personasTipoTrabajo'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Tipo Contrato'
              className={classes.myTextField}
              disabled={disabled}
              name='personasTipoContrato'
              options={options}
              variant='standard'
            />
            <MyTextField
              className={classes.myTextField}
              label='Nombre Empresa'
              name='personasNombreEmpresa'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Teléfono Empresa'
              name='personasTelefonoEmpresa'
              disabled={disabled}
            />
            {/* <MyAutocomplete
              options={options}
              name='ciudad_id'
              inputValue={initialValues.ciudad_id}
              label='Ciudad'
              className={classes.myTextField}
              required
              disabled={disabled}
            /> */}
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Datos Crediticios:
          </Box>
          <Box className={classes.inputs_4}>
            <MyTextField
              className={classes.myTextField}
              label='Puntaje Procrédito'
              name='personasPuntajeProcredito'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Puntaje Datacrédito'
              name='personasPuntajeDatacredito'
              disabled={disabled}
            />
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Datos Correspondencia:
          </Box>
          <Box className={classes.inputs_4}>
            <MyAutocomplete
              label='Departamento'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='departamento_correspondencia_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Ciudad'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='ciudad_correspondencia_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Comuna'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='comuna_correspondencia_id'
              disabled={disabled}
              options={options}
            />
            <MyAutocomplete
              label='Barrio'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='barrio_correspondencia_id'
              disabled={disabled}
              options={options}
            />
            <MyTextField
              className={classes.myTextField}
              label='Direccion'
              name='personasCorDireccion'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Teléfono'
              name='personasCorTelefono'
              disabled={disabled}
            />
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Ingresos:
          </Box>
          <Box className={classes.inputs_4}>
            <MyTextField
              className={classes.myTextField}
              label='Formales'
              name='personasIngresosFormales'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Informales'
              name='personasIngresosInformales'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Arriendo'
              name='personasIngresosArriendo'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Subsidios'
              name='personasIngresosSubsidios'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Paternidad'
              name='personasIngresosPaternidad'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Terceros'
              name='personasIngresosTerceros'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Otros'
              name='personasIngresosOtros'
              disabled={disabled}
            />
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Aportes:
          </Box>
          <Box className={classes.inputs_4}>
            <MyTextField
              className={classes.myTextField}
              label='Formales'
              name='personasAportesFormales'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Informales'
              name='personasAportesInformales'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Arriendo'
              name='personasAportesArriendo'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Subsidios'
              name='personasAportesSubsidios'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Paternidad'
              name='personasAportesPaternidad'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Terceros'
              name='personasAportesTerceros'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Otros'
              name='personasAportesOtros'
              disabled={disabled}
            />
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Referencias:
          </Box>
          <Box className={classes.inputs_4}>
           <MyTextField
              className={classes.myTextField}
              label='Nombre 1'
              name='personasRefNombre1'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Teléfono 1'
              name='personasRefTelefono1'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Nombre 2'
              name='personasRefNombre2'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Teléfono 2'
              name='personasRefTelefono2'
              disabled={disabled}
            />
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Observaciones:
          </Box>
          <Box className={classes.inputs_1}>
            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='personasObservaciones'
              disabled={disabled}
            />
            {/* <FormControl className={classes.widthFull} component='fieldset'>
              <FormLabel>Estado*</FormLabel>
              <Field
                name='estado'
                type='radio'
                as={RadioGroup}
                className={classes.myTextField}
                disabled={accion === 'ver'}
                row
                value={values.estado}>
                <FormControlLabel
                  value='1'
                  control={<Radio color='secondary' />}
                  label='Activo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
                <FormControlLabel
                  value='0'
                  control={<Radio color='secondary' />}
                  label='Inactivo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
              </Field>
            </FormControl> */}
          </Box>
          <Box component='h6' fontSize={16} fontWeight='bold' mb={3} mt={3}>
            Auditoría:
          </Box>
          <Box className={classes.inputs_4}>
            <MyTextField
              className={classes.myTextField}
              label='Usuario Creción'
              name='personasObservaciones'
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
            <MyTextField
              className={classes.myTextField}
              label='Usuario Modificación'
              name='personasObservaciones'
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          </Box>
        </Box>
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
            href='/personas'>
            <IntlMessages id='boton.cancel' />
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default ParticipanteForm;
