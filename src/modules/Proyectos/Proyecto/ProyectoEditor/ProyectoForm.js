import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, IconButton} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyAutocompletePersona from '../../../../shared/components/MyAutoCompletePersona';
import MyTextField from 'shared/components/MyTextField';
import MySelectField from 'shared/components/MySelectField';
import { DATO_BOOLEAN_RADIO, ESTADOS_FORMALIZACION, ESTADOS_PROYECTO, TIPOS_CUENTA_RECAUDO, TIPOS_PROYECTO, ZONA } from 'shared/constants/ListaValores';
import MySearcher from 'shared/components/MySearcher';
import Search from '@material-ui/icons/Search';
import MyRadioField from 'shared/components/MyRadioField';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MyAutocomplete from 'shared/components/MyAutoComplete';
import MyCurrencyField from 'shared/components/MyCurrencyField';

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

let departamentosFilter = [];
let ciudadesFilter = [];
let comunasFilter = [];
let barriosFilter = [];

const ProyectoForm = (props) => {
  const {
    accion,
    values,
    initialValues,
    setFieldValue,
    bancos,
    barrios, 
    ciudades,
    comunas,
    departamentos,
    orientadores,
    paises,
    personas,
    tiposPrograma
  } = props;

  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState({
    persona: false,
    remitente: false
  });
  const verifyInitialState = (label) => {
    if(values.proyectosEstadoProyecto === label){
      return true;
    }
    return false;
  }
  
  const [parts, setParts] = useState({
    inicial: true,
    estudio: verifyInitialState('EST'),
    aprobacion: verifyInitialState('APR'),
    formalizacion: verifyInitialState('FOR'),
    autorizacion: verifyInitialState('DES')
  });

  useEffect(() => {
    if (accion === 'ver' || initialValues.proyectosEstadoProyecto === 'CAN') {
      setDisabled(true);
    }
  }, [initialValues.proyectosEstadoProyecto, accion]); //eslint-disable-line

  useEffect(() => {
    if(values.pais_id){
      departamentosFilter = departamentos.filter((dep) => dep.pais_id === values.pais_id)
    }
  },[values.pais_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.departamento_id){
      ciudadesFilter = ciudades.filter((city) => city.departamento_id === values.departamento_id)
    }
  },[values.departamento_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.ciudad_id){
      comunasFilter = comunas.filter((com) => com.ciudad_id === values.ciudad_id)
    }
  },[values.ciudad_id]); //eslint-disable-line
  
  useEffect(() => {
    if(values.comuna_id){
      barriosFilter = barrios.filter((neigh) => neigh.comuna_id === values.comuna_id)
    }
  },[values.comuna_id]); //eslint-disable-line

  useEffect(() => {
    openOneCloseOthers(values.proyectosEstadoProyecto)
  },[values.proyectosEstadoProyecto]) //eslint-disable-line

  const classes = useStyles(props);

  const handleCloseSearcher = () => {
    setShowSearch({persona: false, remitente: false});
  }

  const handleOpenPersonaSearcher = () => {
    setShowSearch({persona: true, remitente: false});
  }
  const handleOpenRemitenteSearcher = () => {
    setShowSearch({persona: false, remitente: true});
  }

  const setSelectePersona = (id) => {
    setFieldValue('persona_identificacion',id);
  }

  const setSelecteRemitente = (id) => {
    setFieldValue('remitente_identificacion',id);
  }

  useEffect(() => {
    if(values.persona_identificacion){
      const persona = personas.find((persona) => persona.identificacion == values.persona_identificacion) //eslint-disable-line
      setFieldValue('nombrePersona', persona?.nombre??'');
      setFieldValue('persona_id', persona?.id??'');
    }
  },[values.persona_identificacion]) //eslint-disable-line
  
  useEffect(() => {
    if(values.remitente_identificacion){
      const persona = personas.find((persona) => persona.identificacion == values.remitente_identificacion) //eslint-disable-line
      setFieldValue('nombreRemitente', persona?.nombre??'');
      setFieldValue('remitido_id', persona?.id??'');
    }
  },[values.remitente_identificacion]) //eslint-disable-line
  
  useEffect(() => {
    if(values.orientador_identificacion){
      const orientador = orientadores.find((orientador) => orientador.identificacion == values.orientador_identificacion) //eslint-disable-line
      setFieldValue('nombreOrientador', orientador?.nombre??'');
      setFieldValue('orientador_id', orientador?.id??'');
    }
  },[values.orientador_identificacion]) //eslint-disable-line

  useEffect(() => {
    if(values.proyectosTasaInteresNMV){
      const tasaEA = (1+parseFloat(values.proyectosTasaInteresNMV)/1200)**12-1
      setFieldValue('proyectosTasaInteresEA', (tasaEA*100).toFixed(2).toString())
    }
  },[values.proyectosTasaInteresNMV]) //eslint-disable-line

  const renderChevron = (state) => {
    return (
      state ?
        ( <KeyboardArrowDown style={{fontSize: 40}}/> )
        : 
        ( <KeyboardArrowRight style={{fontSize: 40}}/> )
    );
  }

  const tooglePart = (e) => {
    switch (e) {
      case 'SOL':
        setParts(
          {...parts,
          inicial: !parts.inicial
        })
        break;
      case 'EST':
        setParts(
          {...parts,
          estudio: !parts.estudio
        })
        break;
      case 'APR':
        setParts(
          {...parts,
          aprobacion: !parts.aprobacion
        })
        break;
      case 'FOR':
        setParts(
          {...parts,
          formalizacion: !parts.formalizacion
        })
        break;
      case 'DES':
        setParts(
          {...parts,
          autorizacion: !parts.autorizacion
        })
        break;
      default:
        break;
    }
  }

  const openOneCloseOthers = (e) => {
    switch (e) {
      case 'SOL':
        setParts(
          {...parts,
          estudio: false,
          aprobacion: false,
          formalizacion: false,
          autorizacion: false
        })
        break;
      case 'EST':
        setParts(
          {...parts,
          estudio: true,
          aprobacion: false,
          formalizacion: false,
          autorizacion: false
        })
        break;
      case 'APR':
        setParts(
          {...parts,
            estudio: false,
            aprobacion: true,
            formalizacion: false,
            autorizacion: false
        })
        break;
      case 'FOR':
        setParts(
          {...parts,
            estudio: false,
            aprobacion: false,
            formalizacion: true,
            autorizacion: false
        })
        break;
      case 'DES':
        setParts(
          {...parts,
            estudio: false,
            aprobacion: false,
            formalizacion: false,
            autorizacion: true
        })
        break;
      default:
        break;
    }
  }

  const isClickeable = (currentState, currentLabel) => {
    const estados = [
      {id: 'SOL', nombre: 'Solicitud', value: 1},
      {id: 'EST', nombre: 'Estudio', value: 2},
      {id: 'APR', nombre: 'Aprobado', value: 3},
      {id: 'REC', nombre: 'Rechazado', value: 4},
      {id: 'FOR', nombre: 'Formalización', value: 5},
      {id: 'DES', nombre: 'Desembolsado', value: 6},
      {id: 'CAN', nombre: 'Cancelado', value: 7},
      {id: 'CON', nombre: 'Congelado', value: 8},
    ];
    const currentEstado = estados.filter((estado) => estado.id === currentState);
    const currentPart = estados.filter((estado) => estado.id === currentLabel);
    if(currentEstado[0]?.value >= currentPart[0]?.value){
      return 'auto';
    }
    return 'none'
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
          <Box 
            component='h6' 
            fontSize={17} 
            onClick={() => tooglePart('SOL')}
            fontWeight='bold' 
            mb={3} 
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
              Datos Iniciales: {renderChevron(parts.inicial)}
          </Box>
          { parts.inicial && 
            <>
              <Box className={classes.inputs_4}>
                <MyTextField
                  label='Solicitante'
                  name='persona_identificacion'
                  disabled={disabled}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton 
                          style={{
                            pointerEvents: disabled?'none':'auto'
                          }} 
                          onClick={handleOpenPersonaSearcher}
                        >
                          <Search/>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  className={classes.myTextField}
                />
                { showSearch.persona && 
                  <MySearcher 
                    showForm={showSearch.persona} 
                    handleOnClose={handleCloseSearcher} 
                    getValue={setSelectePersona}
                  /> 
                }
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Solicitante'
                  name='nombrePersona'
                  disabled
                />
              </Box>
              <Box className={classes.inputs_4}>
                <MyTextField
                  className={classes.myTextField}
                  label='Num. Proyecto'
                  name='id'
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
                  options={tiposPrograma}
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
                      name='remitente_identificacion'
                      disabled={disabled}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              style={{
                                pointerEvents: disabled?'none':'auto'
                              }} 
                              onClick={handleOpenRemitenteSearcher}
                            >
                              <Search/>
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      className={classes.myTextField}
                    />
                    { showSearch.remitente && 
                      <MySearcher 
                        showForm={showSearch.remitente} 
                        handleOnClose={handleCloseSearcher} 
                        getValue={setSelecteRemitente}
                      /> 
                    }
                    <MyTextField
                      className={classes.myTextField}
                      label='Nombre Remitente'
                      name='nombreRemitente'
                      disabled
                    />
                  </>
                  )}
              </Box>
            </>
          }
          <Box 
            component='h6' 
            fontSize={17} 
            onClick={() => tooglePart('EST')}
            fontWeight='bold' 
            mb={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              pointerEvents: isClickeable(values.proyectosEstadoProyecto, 'EST')
            }}
          >
                Datos Estudio: {renderChevron(parts.estudio)}
          </Box>
          { parts.estudio && 
            <>
              <Box className={classes.inputs_4}>
                <MyAutocomplete
                  label='Pais'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='pais_id'
                  disabled={disabled}
                  options={paises}
                />
                <MyAutocomplete
                  label='Departamento'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='departamento_id'
                  disabled={disabled}
                  options={departamentosFilter}
                />
                <MyAutocomplete
                  label='Ciudad'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='ciudad_id'
                  disabled={disabled}
                  options={ciudadesFilter}
                />
                <MyAutocomplete
                  label='Comuna'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='comuna_id'
                  disabled={disabled}
                  options={comunasFilter}
                />
                <MyAutocomplete
                  label='Barrio'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='barrio_id'
                  disabled={disabled}
                  options={barriosFilter}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Direccion'
                  name='proyectosDireccion'
                  disabled={disabled}
                />
                <MyRadioField
                  label='Pago Estudio Crédito'
                  className={classes.MyRadioField}
                  name='proyectosPagoEstudioCre'
                  disabled={disabled}
                  options={DATO_BOOLEAN_RADIO}
                />
                <MyRadioField
                  label='Requiere Licencia Construcción'
                  className={classes.MyRadioField}
                  name='proyectosReqLicenciaCon'
                  disabled={disabled}
                  options={DATO_BOOLEAN_RADIO}
                />
                <MyRadioField
                  label='Visita Domiciliaria'
                  className={classes.MyRadioField}
                  name='proyectosVisitaDomiciliaria'
                  disabled={disabled}
                  options={DATO_BOOLEAN_RADIO}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Visita Domic.'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaVisitaDom'
                  disabled={disabled}
                  type='date'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Inicio Estudio'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaInicioEstudio'
                  disabled={disabled}
                  type='date'
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Proyecto'
                  name='proyectosValorProyecto'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Solicitud'
                  name='proyectosValorSolicitud'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Recursos Solicitante'
                  name='proyectosValorRecursosSol'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Subsidios'
                  name='proyectosValorSubsidios'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Donaciones'
                  name='proyectosValorDonaciones'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Capacidad de Pago Mensual'
                  name='proyectosValorCapPagoMen'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Número de Cuotas'
                  name='proyectosNumeroCuotas'
                  disabled={disabled}
                />
              </Box>
            </>
          }
          <Box 
            component='h6' 
            fontSize={17} 
            onClick={() => tooglePart('APR')}
            fontWeight='bold' 
            mb={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              pointerEvents: isClickeable(values.proyectosEstadoProyecto, 'APR')
            }}
          >
                Datos Aprobación: {renderChevron(parts.aprobacion)}
          </Box>
          { parts.aprobacion && 
            <>
              <Box className={classes.inputs_4}>
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Aprobación/Rechazo'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaAproRec'
                  disabled={disabled}
                  type='date'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Estimada Inicio Obra'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaEstInicioObr'
                  disabled={disabled}
                  type='date'
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Aprobado'
                  name='proyectosValorAprobado'
                  disabled={disabled}
                />
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Cuota Aprobada'
                  name='proyectosValorCuotaAprobada'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Tasa Interés NMV (%)'
                  name='proyectosTasaInteresNMV'
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Tasa Interés EA (%)'
                  name='proyectosTasaInteresEA'
                  disabled
                />
                <MyAutocomplete
                  label='Banco Recaudo'
                  style={{
                    paddingRight: '10px'
                  }}
                  className={classes.myTextField}
                  name='banco_id'
                  disabled={disabled}
                  options={bancos}
                />
                <MySelectField
                  label='Tipo Cuenta Recaudo'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='proyectosTipoCuentaRecaudo'
                  options={TIPOS_CUENTA_RECAUDO}
                  variant='standard'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Número Cuenta Recaudo'
                  name='proyectosNumCuentaRecaudo'
                  disabled={disabled}
                />
              </Box>
            </>
          }
          <Box 
            component='h6' 
            fontSize={17} 
            onClick={() => tooglePart('FOR')}
            fontWeight='bold' 
            mb={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              pointerEvents: isClickeable(values.proyectosEstadoProyecto, 'FOR')
            }}
          >
                Datos Formalización: {renderChevron(parts.formalizacion)}
          </Box>
          { parts.formalizacion && 
            <>
              <Box className={classes.inputs_4}>
                <MySelectField
                  label='Estado Formalización'
                  className={classes.myTextField}
                  disabled={disabled}
                  name='proyectosEstadoFormalizacion'
                  options={ESTADOS_FORMALIZACION}
                  variant='standard'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Autorización Notaria'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaAutNotaria'
                  disabled={disabled}
                  type='date'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Firma Escrituras'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaFirEscrituras'
                  disabled={disabled}
                  type='date'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Ingreso Registro'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaIngresosReg'
                  disabled={disabled}
                  type='date'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Salida Registro'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaSalidaReg'
                  disabled={disabled}
                  type='date'
                />
              </Box>
            </> 
          }
          <Box 
            component='h6' 
            fontSize={17} 
            onClick={() => tooglePart('DES')}
            fontWeight='bold' 
            mb={3}
            style={{
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              pointerEvents: isClickeable(values.proyectosEstadoProyecto, 'DES')
            }}
          >
                Datos Autorización: {renderChevron(parts.autorizacion)}
          </Box>
          { parts.autorizacion && 
            <>
              <Box className={classes.inputs_4}>
                <MyCurrencyField
                  className={classes.myTextField}
                  label='Valor Seguro de Vida'
                  name='proyectosValorSeguroVida'
                  disabled={disabled}
                />
                <MyRadioField
                  label='Autorización Desembolso'
                  className={classes.MyRadioField}
                  name='proyectosAutorizacionDes'
                  disabled={disabled}
                  options={DATO_BOOLEAN_RADIO}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Autorización Desembolso'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaAutDes'
                  disabled={disabled}
                  type='date'
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Fecha Cancelación'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='proyectosFechaCancelacion'
                  disabled={disabled}
                  type='date'
                />
              </Box>
            </>
          }
          <Box component='h6' fontSize={17} fontWeight='bold' mb={3} mt={3}>
              Asesor:
          </Box>
          <Box className={classes.inputs_4}>
            <MyAutocompletePersona
              label='Identificacion Asesor'
              completeid={'true'}
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='orientador_identificacion'
              disabled={disabled}
              options={orientadores}
            />
            <MyTextField
              className={classes.myTextField}
              label='Nombre Asesor'
              name='nombreOrientador'
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
          <Box component='h6' fontSize={17} fontWeight='bold' mb={3} mt={3}>
            Auditoría:
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
