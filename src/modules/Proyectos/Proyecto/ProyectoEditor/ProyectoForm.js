import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, IconButton} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import MyTextField from 'shared/components/MyTextField';
import MySelectField from 'shared/components/MySelectField';
import { DATO_BOOLEAN_RADIO, ESTADOS_PROYECTO, TIPOS_PROYECTO, ZONA } from 'shared/constants/ListaValores';
import MySearcher from 'shared/components/MySearcher';
import Search from '@material-ui/icons/Search';
import MyRadioField from 'shared/components/MyRadioField';

const options = [
  {id: 1, nombre: 'Uno', estado: 1},
  {id: 2, nombre: 'Dos', estado: 1},
  {id: 3, nombre: 'Tres', estado: 1},
  {id: 4, nombre: 'Cuatro', estado: 1},
];

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

const ProyectoForm = (props) => {
  const {
    accion,
    values,
    initialValues,
    setFieldValue,
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
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (accion === 'ver' || initialValues.personasEstadoRegistro === 'IN') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]); //eslint-disable-line

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

  const classes = useStyles(props);

  const handleCloseSearcher = () => {
    setShowSearch(false);
  }

  const handleOpenSearcher = () => {
    setShowSearch(true);
  }

  const setSelectePersona = (id) => {
    setFieldValue('persona_id',id);
  }

  return (
    <Form noValidate autoComplete='off' className={classes.root}>
      <Box className={classes.marco}>
        <Box
          component='h6'
          mb={{xs: 4, xl: 6}}
          fontSize={20}
          fontWeight='bold'>
          <IntlMessages id='proyectos' />
        </Box>
        <Box px={{md: 5, lg: 8, xl: 10}}>
          <Box className={classes.inputs_4}>
            <MyTextField
              label='Solicitante'
              name='persona_id'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleOpenSearcher}>
                      <Search/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              className={classes.myTextField}
            />
            { showSearch && <MySearcher showForm={showSearch} handleOnClose={handleCloseSearcher} getValue={setSelectePersona}/> }
            <MyTextField
              className={classes.myTextField}
              label='Nombre Solicitante'
              name='nombre'
              disabled
            />
            <MySelectField
              label='Estado Proyecto'
              className={classes.myTextField}
              disabled={disabled}
              name='proyectosEstadoProyecto'
              options={ESTADOS_PROYECTO}
              variant='standard'
            />
            <MyTextField
              className={classes.myTextField}
              label='Fecha Solicitud'
              InputLabelProps={{
                shrink: true,
              }}
              name='proyectosFechaSolicitud'
              disabled={disabled}
              type='date'
            />
            <MySelectField
              label='Tipo Proyecto'
              className={classes.myTextField}
              disabled={disabled}
              name='proyectosTipoProyecto'
              options={TIPOS_PROYECTO}
              variant='standard'
            />
            <MySelectField
              label='Tipo Programa'
              className={classes.myTextField}
              disabled={disabled}
              name='tipo_programa_id'
              options={options}
              variant='standard'
            />
            <MySelectField
              label='Zona'
              className={classes.myTextField}
              disabled={disabled}
              name='proyectosZona'
              options={ZONA}
              variant='standard'
            />
          </Box>
          <Box className={classes.inputs_4}>
            <MyRadioField
              label='Remitido'
              className={classes.MyRadioField}
              name='proyectosRemitido'
              disabled={disabled}
              required
              options={DATO_BOOLEAN_RADIO}
            />
            {values.proyectosRemitido === 'S' && (
              <>
                <MyTextField
                  label='Remitente'
                  name='remitente_id'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleOpenSearcher}>
                          <Search/>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  className={classes.myTextField}
                />
                { showSearch && <MySearcher showForm={showSearch} handleOnClose={handleCloseSearcher} getValue={setSelectePersona}/> }
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Remitente'
                  name='remitenteNombre'
                  disabled
                />
              </>
              )}
          </Box>
          <Box className={classes.inputs_4}>
            <MyAutocomplete
              label='Identificacion Asesor'
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='orientador_id'
              disabled={disabled}
              options={options}
            />
            <MyTextField
              className={classes.myTextField}
              label='Nombre Asesor'
              name='asesorNombre'
              disabled
            />
          </Box>
          <Box className={classes.inputs_1}>
            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='proyectosObservaciones'
              disabled={disabled}
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
            href='/proyectos'>
            <IntlMessages id='boton.cancel' />
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default ProyectoForm;
