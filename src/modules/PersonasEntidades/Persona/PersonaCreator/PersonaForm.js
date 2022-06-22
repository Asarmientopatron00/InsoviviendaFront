import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, IconButton} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import MyTextField from 'shared/components/MyTextField';
import MySelectField from 'shared/components/MySelectField';
import { CATEGORIA_APORTES, DATO_BOOLEAN, ESTADO_REGISTRO, ESTADO_TRAMITE, ESTRATO, GENERO, INDICATIVO_PC, SEGURIDAD_SOCIAL, TIPO_CONTRATO, TIPO_PROPIEDAD, TIPO_TRABAJO, ZONA } from 'shared/constants/ListaValores';
import MyCurrencyField from 'shared/components/MyCurrencyField';
import Search from '@material-ui/icons/Search';
import MySearcherFamily from 'shared/components/MyFamilySearcher';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import MySearcher from 'shared/components/MySearcher';
import moment from 'moment';

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

let departamentosNacimiento = [];
let ciudadesNacimiento = [];
let ciudadesVivienda = [];
let comunasVivienda = [];
let barriosVivienda = [];
let ciudadesCor = [];
let comunasCor = [];
let barriosCor = [];

const PersonaForm = (props) => {
  const {
    accion,
    values,
    setFieldValue,
    initialValues,
    tiposIdentificacion,
    paises,
    departamentos,
    ciudades,
    comunas,
    barrios,
    tiposDiscapacidad,
    familias,
    tiposParentesco,
    epses,
    estadosCiviles,
    gradosEscolaridad,
    ocupaciones,
    tiposDivision,
    tiposPiso,
    tiposPoblacion,
    tiposTecho,
    tiposVivienda,
    personas,
  } = props;

  const [showSearch, setShowSearch] = useState({
    family: false,
    persona: false
  });
  const [disabled, setDisabled] = useState(false);
  const [parts, setParts] = useState({
    general: true,
    vivienda: false,
    lcd: false,
    ia: false,
    rfo: false,
  });
  useEffect(() => {
    if (accion === 'ver' || initialValues.personasEstadoRegistro === 'IN') {
      setDisabled(true);
    }
  }, [initialValues.personasEstadoRegistro, accion]); //eslint-disable-line

  useEffect(() => {
    if(values.pais_nacimiento_id){
      departamentosNacimiento = departamentos.filter((dep) => dep.pais_id === values.pais_nacimiento_id)
    }
  },[values.pais_nacimiento_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.departamento_nacimiento_id){
      ciudadesNacimiento = ciudades.filter((city) => city.departamento_id === values.departamento_nacimiento_id)
    }
  },[values.departamento_nacimiento_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.departamento_id){
      ciudadesVivienda = ciudades.filter((city) => city.departamento_id === values.departamento_id)
    }
  },[values.departamento_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.ciudad_id){
      comunasVivienda = comunas.filter((comuna) => comuna.ciudad_id === values.ciudad_id)
    }
  },[values.ciudad_id]); //eslint-disable-line

  useEffect(() => {
    if(values.comuna_id){
      barriosVivienda = barrios.filter((neigh) => neigh.comuna_id === values.comuna_id)
    }
  },[values.comuna_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.departamento_correspondencia_id){
      ciudadesCor = ciudades.filter((city) => city.departamento_id === values.departamento_correspondencia_id)
    }
  },[values.departamento_correspondencia_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.ciudad_correspondencia_id){
      comunasCor = comunas.filter((comuna) => comuna.ciudad_id === values.ciudad_correspondencia_id)
    }
  },[values.ciudad_correspondencia_id]); //eslint-disable-line

  useEffect(() => {
    if(values.comuna_correspondencia_id){
      barriosCor = barrios.filter((neigh) => neigh.comuna_id === values.comuna_correspondencia_id)
    }
  },[values.comuna_correspondencia_id]); //eslint-disable-line

  useEffect(() => {
    if(values.familia_identificacion){
      const familia = familias.find((familia) => familia.identificacion_persona == values.familia_identificacion); //eslint-disable-line
      if(familia){
        setFieldValue('familia_nombre', familia.nombre);
        setFieldValue('familia_id', familia.id);
      }
    } else {
      setFieldValue('familia_nombre', '');
      setFieldValue('familia_id', '');
    }
  },[values.familia_identificacion]) //eslint-disable-line

  useEffect(() => {
    if(values.identificacion_persona_asociada){
      const persona = personas.find((person) => person.identificacion === values.identificacion_persona_asociada);
      if(persona){
        setFieldValue('departamento_id', persona?.departamento_id??'');
        setFieldValue('ciudad_id', persona?.ciudad_id??'');
        setFieldValue('comuna_id', persona?.comuna_id??'');
        setFieldValue('barrio_id', persona?.barrio_id??'');
        setFieldValue('personasDireccion', persona?.personasDireccion??'');
        setFieldValue('personasZona', persona?.personasZona??'');
        setFieldValue('personasEstrato', persona?.personasEstrato??'');
        setFieldValue('personasTelefonoCasa', persona?.personasTelefonoCasa??'');
        setFieldValue('personasTelefonoCelular', persona?.personasTelefonoCelular??'');
        setFieldValue('tipo_vivienda_id', persona?.tipo_vivienda_id??'');
        setFieldValue('personasTipoPropiedad', persona?.personasTipoPropiedad??'');
        setFieldValue('personasNumeroEscritura', persona?.personasNumeroEscritura??'');
        setFieldValue('personasNotariaEscritura', persona?.personasNotariaEscritura??'');
        setFieldValue('personasFechaEscritura', moment(persona?.personasFechaEscritura??'').format('YYYY-MM-DD'));
        setFieldValue('personasIndicativoPC', persona?.personasIndicativoPC??'');
        setFieldValue('personasNumeroHabitaciones', persona?.personasNumeroHabitaciones??'');
        setFieldValue('personasNumeroBanos', persona?.personasNumeroBanos??'');
        setFieldValue('tipo_techo_id', persona?.tipo_techo_id??'');
        setFieldValue('tipo_piso_id', persona?.tipo_piso_id??'');
        setFieldValue('tipo_division_id', persona?.tipo_division_id??'');
        setFieldValue('personasSala', persona?.personasSala??'');
        setFieldValue('personasComedor', persona?.personasComedor??'');
        setFieldValue('personasCocina', persona?.personasCocina??'');
        setFieldValue('personasPatio', persona?.personasPatio??'');
        setFieldValue('personasTerraza', persona?.personasTerraza??'');
      }
    }
  },[values.identificacion_persona_asociada]) //eslint-disable-line

  const setSelecteFamilia = (id) => {
    setFieldValue('familia_identificacion', id);
  }

  const setSelectedPerson = (id) => {
    setFieldValue('identificacion_persona_asociada', id);
  }

  const handleOnOpenFamilySearcher = () => {
    setShowSearch({family: true, persona: false});
  }

  const handleOnOpenPersonSearcher = () => {
    setShowSearch({family: false, persona: true});
  }

  const handleOnCloseSearch = () => {
    setShowSearch({
      family: false,
      persona: false
    });
  }

  const renderChevron = (state) => {
    return (
      state ?
        ( <KeyboardArrowDown style={{fontSize: 40}}/> )
        : 
        ( <KeyboardArrowRight style={{fontSize: 40}}/>)
    );
  }

  const tooglePart = (e) => {
    switch (e) {
      case 'general':
        setParts(
          {...parts,
          general: !parts.general
        })
        break;
      case 'vivienda':
        setParts(
          {...parts,
          vivienda: !parts.vivienda
        })
        break;
      case 'lcd':
        setParts(
          {...parts,
          lcd: !parts.lcd
        })
        break;
      case 'ia':
        setParts(
          {...parts,
          ia: !parts.ia
        })
        break;
      case 'rfo':
        setParts(
          {...parts,
          rfo: !parts.rfo
        })
        break;
      default:
        break;
    }
  }

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
          <Box 
            component='h6' 
            fontSize={17} 
            fontWeight='bold'
            onClick={() => tooglePart('general')}
            mb={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
              Datos Generales: {renderChevron(parts.general)}
          </Box>
          { parts.general && 
            <>
              <Box className={classes.inputs_4}>
                <MyTextField
                  className={classes.myTextField}
                  label='Identificación'
                  name='personasIdentificacion'
                  disabled={disabled}
                  required
                />
                <MyAutocomplete
                  options={tiposIdentificacion}
                  style={{
                    paddingRight: '10px'
                  }}
                  name='tipo_identificacion_id'
                  inputValue={initialValues.tipo_identificacion_id}
                  label='Tipo Identificación'
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />
                <MySelectField
                  label='Categoría'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasCategoriaAportes'
                  options={CATEGORIA_APORTES}
                  variant='standard'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Nombres'
                  name='personasNombres'
                  disabled={disabled}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Primer Apellido'
                  name='personasPrimerApellido'
                  disabled={disabled}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Segundo Apellido'
                  name='personasSegundoApellido'
                  disabled={disabled}
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
                />
                <MyAutocomplete
                  label='País Nacimiento'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='pais_nacimiento_id'
                  disabled={disabled}
                  options={paises}
                />
                <MyAutocomplete
                  label='Departamento Nacimiento'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='departamento_nacimiento_id'
                  disabled={disabled}
                  options={departamentosNacimiento}
                />
                <MyAutocomplete
                  label='Ciudad Nacimiento'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='ciudad_nacimiento_id'
                  disabled={disabled}
                  options={ciudadesNacimiento}
                />
                <MySelectField
                  label='Género'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasGenero'
                  options={GENERO}
                  variant='standard'
                />
                <MySelectField
                  label='Estado Civil'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='estado_civil_id'
                  options={estadosCiviles}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo Parentesco'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='tipo_parentesco_id'
                  options={tiposParentesco}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo Población'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='tipo_poblacion_id'
                  options={tiposPoblacion}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo Discapacidad'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='tipo_discapacidad_id'
                  options={tiposDiscapacidad}
                  variant='standard'
                />
                <MySelectField
                  label='Seguridad Social'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasSeguridadSocial'
                  options={SEGURIDAD_SOCIAL}
                  variant='standard'
                />
                <MySelectField
                  label='EPS'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='eps_id'
                  options={epses}
                  variant='standard'
                />
                <MySelectField
                  label='Grado Escolaridad'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='grado_escolaridad_id'
                  options={gradosEscolaridad}
                  variant='standard'
                />
                <MySelectField
                  label='Vehículo'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasVehiculo'
                  options={DATO_BOOLEAN}
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
                />
                <MyTextField
                  label='Identificacion Familia'
                  disabled={disabled}
                  style={{
                    marginRight: '20px'
                  }}
                  name='familia_identificacion'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton style={{
                          pointerEvents: disabled?'none':'auto'
                        }} onClick={handleOnOpenFamilySearcher}>
                          <Search/>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                { showSearch.family && <MySearcherFamily showForm={showSearch.family} handleOnClose={handleOnCloseSearch} getValue={setSelecteFamilia}/> }
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Familia'
                  name='familia_nombre'
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
                  options={ESTADO_TRAMITE}
                  variant='standard'
                />
                <MySelectField
                  label='Estado Registro'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasEstadoRegistro'
                  options={ESTADO_REGISTRO}
                  variant='standard'
                />
              </Box>
            </>
          }
          <Box 
            component='h6' 
            fontSize={17} 
            fontWeight='bold' 
            onClick={() => tooglePart('vivienda')}
            mb={3} 
            mt={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            Datos Vivienda: {renderChevron(parts.vivienda)}
          </Box>
          { parts.vivienda && 
            <>
              <Box className={classes.inputs_4}>
                <MyTextField
                  label='Persona Asociada'
                  disabled={disabled}
                  style={{
                    marginRight: '20px'
                  }}
                  name='identificacion_persona_asociada'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton style={{
                          pointerEvents: disabled?'none':'auto'
                        }} onClick={handleOnOpenPersonSearcher}>
                          <Search/>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                { showSearch.persona && <MySearcher showForm={showSearch.persona} handleOnClose={handleOnCloseSearch} getValue={setSelectedPerson}/> }
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
                  options={departamentos}
                />
                <MyAutocomplete
                  label='Ciudad'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='ciudad_id'
                  disabled={disabled}
                  options={ciudadesVivienda}
                />
                <MyAutocomplete
                  label='Comuna'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='comuna_id'
                  disabled={disabled}
                  options={comunasVivienda}
                />
                <MyAutocomplete
                  label='Barrio'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='barrio_id'
                  disabled={disabled}
                  options={barriosVivienda}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Dirección'
                  name='personasDireccion'
                  disabled={disabled}
                />
                <MySelectField
                  label='Zona'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasZona'
                  options={ZONA}
                  variant='standard'
                />
                <MySelectField
                  label='Estrato'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasEstrato'
                  options={ESTRATO}
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
                  options={tiposVivienda}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo Propiedad'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasTipoPropiedad'
                  options={TIPO_PROPIEDAD}
                  variant='standard'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Número Escritura'
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
                />
                <MySelectField
                  label='Indicativo'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasIndicativoPC'
                  options={INDICATIVO_PC}
                  variant='standard'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Número Habitaciones'
                  name='personasNumeroHabitaciones'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Número Baños'
                  name='personasNumeroBanos'
                  disabled={disabled}
                />
                <MySelectField
                  label='Tipo Techo'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='tipo_techo_id'
                  options={tiposTecho}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo Piso'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='tipo_piso_id'
                  options={tiposPiso}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo División'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='tipo_division_id'
                  options={tiposDivision}
                  variant='standard'
                />
                <MySelectField
                  label='Sala'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasSala'
                  options={DATO_BOOLEAN}
                  variant='standard'
                />
                <MySelectField
                  label='Comedor'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasComedor'
                  options={DATO_BOOLEAN}
                  variant='standard'
                />
                <MySelectField
                  label='Cocina'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasCocina'
                  options={DATO_BOOLEAN}
                  variant='standard'
                />
                <MySelectField
                  label='Patio'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasPatio'
                  options={DATO_BOOLEAN}
                  variant='standard'
                />
                <MySelectField
                  label='Terraza'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasTerraza'
                  options={DATO_BOOLEAN}
                  variant='standard'
                />
              </Box>
            </>
          }
          <Box 
            component='h6' 
            fontSize={17} 
            onClick={() => tooglePart('lcd')}
            fontWeight='bold' 
            mb={3} 
            mt={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            Datos Laborales, Crediticios y Correspondencia: {renderChevron(parts.lcd)}
          </Box>
          { parts.lcd && 
            <>
              <Box className={classes.inputs_4}>
                <MySelectField
                  label='Ocupación'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='ocupacion_id'
                  options={ocupaciones}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo Trabajo'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasTipoTrabajo'
                  options={TIPO_TRABAJO}
                  variant='standard'
                />
                <MySelectField
                  label='Tipo Contrato'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='personasTipoContrato'
                  options={TIPO_CONTRATO}
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
              <Box className={classes.inputs_4}>
                <MyAutocomplete
                  label='Departamento Correspon.'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='departamento_correspondencia_id'
                  disabled={disabled}
                  options={departamentos}
                />
                <MyAutocomplete
                  label='Ciudad Correspon.'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='ciudad_correspondencia_id'
                  disabled={disabled}
                  options={ciudadesCor}
                />
                <MyAutocomplete
                  label='Comuna Correspon.'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='comuna_correspondencia_id'
                  disabled={disabled}
                  options={comunasCor}
                />
                <MyAutocomplete
                  label='Barrio Correspon.'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='barrio_correspondencia_id'
                  disabled={disabled}
                  options={barriosCor}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Dirección Correspon.'
                  name='personasCorDireccion'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Teléfono Correspon.'
                  name='personasCorTelefono'
                  disabled={disabled}
                />
              </Box>
            </>
          }
          <Box 
            component='h6' 
            fontSize={17} 
            fontWeight='bold' 
            onClick={() => tooglePart('ia')}
            mb={3} 
            mt={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            Ingresos y Aportes: {renderChevron(parts.ia)}
          </Box>
          { parts.ia && 
            <>
              <Box className={classes.inputs_4}>
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Ing. Formales'
                  name='personasIngresosFormales'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Ing. Informales'
                  name='personasIngresosInformales'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Ing. Arriendo'
                  name='personasIngresosArriendo'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Ing. Subsidios'
                  name='personasIngresosSubsidios'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Ing. Paternidad'
                  name='personasIngresosPaternidad'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Ing. Terceros'
                  name='personasIngresosTerceros'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Ing. Otros'
                  name='personasIngresosOtros'
                  disabled={disabled}
                />
              </Box>
              <Box className={classes.inputs_4}>
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Aport. Formales'
                  name='personasAportesFormales'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Aport. Informales'
                  name='personasAportesInformales'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Aport. Arriendo'
                  name='personasAportesArriendo'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Aport. Subsidios'
                  name='personasAportesSubsidios'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Aport. Paternidad'
                  name='personasAportesPaternidad'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Aport. Terceros'
                  name='personasAportesTerceros'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Aport. Otros'
                  name='personasAportesOtros'
                  disabled={disabled}
                />
              </Box>
            </>
          }
          <Box 
            component='h6' 
            fontSize={17} 
            fontWeight='bold' 
            onClick={() => tooglePart('rfo')}
            mb={3} 
            mt={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            Referencias y Otros:{renderChevron(parts.rfo)}
          </Box>
          { parts.rfo && 
            <>
              <Box className={classes.inputs_4}>
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Ref. 1'
                  name='personasRefNombre1'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Teléfono Ref. 1'
                  name='personasRefTelefono1'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Ref. 2'
                  name='personasRefNombre2'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Teléfono Ref. 2'
                  name='personasRefTelefono2'
                  disabled={disabled}
                />
              </Box>
              <Box className={classes.inputs_1}>
                <MyTextField
                  className={classes.myTextField}
                  label='Observaciones'
                  name='personasObservaciones'
                  disabled={disabled}
                />
              </Box>
              <Box className={classes.inputs_4}>
                <MyTextField
                  className={classes.myTextField}
                  label='Usuario Creción'
                  name='usuario_creacion_nombre'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Usuario Modificación'
                  name='usuario_modificacion_nombre'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </Box>
            </>
          }
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

export default PersonaForm;
