import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, IconButton} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyTextField from 'shared/components/MyTextField';
import MySelectField from 'shared/components/MySelectField';
import { DATO_BOOLEAN_RADIO, ESTADOS_PROYECTO, TIPOS_PROYECTO, ZONA } from 'shared/constants/ListaValores';
import MySearcher from 'shared/components/MySearcher';
import Search from '@material-ui/icons/Search';
import MyRadioField from 'shared/components/MyRadioField';
import MyAutocompletePersona from 'shared/components/MyAutoCompletePersona';

const useStyles = makeStyles((theme) => ({
  bottomsGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '20px',
    gap: '10px',
    backgroundColor: 'white',
    paddingRight: '20px',
    marginTop: 80
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
    values,
    setFieldValue,
    personas,
    tiposPrograma,
    orientadores,
    handleOnClose
  } = props;

  const [showSearch, setShowSearch] = useState({
    persona: false,
    remitente: false
  });

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
          <Box className={classes.inputs_2}>
            <MyTextField
              label='Solicitante'
              name='persona_identificacion'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleOpenPersonaSearcher}>
                      <Search/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              className={classes.myTextField}
            />
            { showSearch.persona && <MySearcher showForm={showSearch.persona} handleOnClose={handleCloseSearcher} getValue={setSelectePersona}/> }
            <MyTextField
              className={classes.myTextField}
              label='Nombre Solicitante'
              name='nombrePersona'
              disabled
            />
            <MySelectField
              label='Estado Proyecto'
              className={classes.myTextField}
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
              type='date'
            />
            <MySelectField
              label='Tipo Proyecto'
              className={classes.myTextField}
              name='proyectosTipoProyecto'
              options={TIPOS_PROYECTO}
              variant='standard'
            />
            <MySelectField
              label='Tipo Programa'
              className={classes.myTextField}
              name='tipo_programa_id'
              options={tiposPrograma}
              variant='standard'
            />
            <MySelectField
              label='Zona'
              className={classes.myTextField}
              name='proyectosZona'
              options={ZONA}
              variant='standard'
            />
          </Box>
          <Box className={classes.inputs_2}>
            <MyRadioField
              label='Remitido'
              className={classes.MyRadioField}
              name='proyectosRemitido'
              required
              options={DATO_BOOLEAN_RADIO}
            />
            {values.proyectosRemitido === 'S' && (
              <>
                <MyTextField
                  label='Remitente'
                  name='remitente_identificacion'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleOpenRemitenteSearcher}>
                          <Search/>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  className={classes.myTextField}
                />
                { showSearch.remitente && <MySearcher showForm={showSearch.remitente} handleOnClose={handleCloseSearcher} getValue={setSelecteRemitente}/> }
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Remitente'
                  name='nombreRemitente'
                  
                />
              </>
              )}
          </Box>
          <Box className={classes.inputs_2}>
            <MyAutocompletePersona
              label='Identificacion Asesor'
              completeid={'true'}
              style={{
                paddingRight: '10px'
              }}
              className={classes.myTextField}
              name='orientador_identificacion'
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
              multiline
              variant='outlined'
              rows={4}
              name='proyectosObservaciones'
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

export default ProyectoForm;
