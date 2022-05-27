import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, InputAdornment} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyTextField from 'shared/components/MyTextField';
import MyRadioField from 'shared/components/MyRadioField';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import MySearcher from 'shared/components/MySearcher';
import Search from '@material-ui/icons/Search';

const options = [
  {value: '1', label: 'Activo'},
  {value: '0', label: 'Inactivo'},
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
  inputs_3: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const OrientacionForm = (props) => {
  const {
    handleOnClose, 
    accion, 
    initialValues, 
    titulo,
    tiposAsesorias, 
    asesores,
    setFieldValue,
    personas,
    values
  } = props;

  const [showSearch, setShowSearch] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  useEffect(() => {
    if(values.persona_identificacion){
      const persona = personas.find((persona) => persona.identificacion == values.persona_identificacion) //eslint-disable-line
      setFieldValue('nombrePersona', persona?.nombre??'');
      setFieldValue('persona_id', persona?.id??'');
    }
  },[values.persona_identificacion]) //eslint-disable-line

  const classes = useStyles(props);

  const handleCloseSearcher = () => {
    setShowSearch(false);
  }

  const handleOpenPersonaSearcher = () => {
    setShowSearch(true);
  }

  const setSelectePersona = (id) => {
    setFieldValue('persona_identificacion',id);
  }

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
            <Box className={classes.inputs_3}>
              <MyAutocomplete
                label='Tipo Asesoria'
                options={tiposAsesorias}
                style={{
                  paddingRight: '10px'
                }}
                className={classes.myTextField}
                name='tipo_orientacion_id'
                required
                disabled={disabled}
              />
              <MyAutocomplete
                options={asesores}
                style={{
                  paddingRight: '10px'
                }}
                name='orientador_id'
                label='Asesor'
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Asesoria'
                InputLabelProps={{
                  shrink: true,
                }}
                name='orientacionesFechaOrientacion'
                disabled={disabled}
                type='date'
              />
              <MyTextField
                label='Persona'
                name='persona_identificacion'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton 
                      style={{
                        pointerEvents: disabled?'none':'auto'
                      }}
                      onClick={handleOpenPersonaSearcher}>
                        <Search/>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                disabled={disabled}
                className={classes.myTextField}
              />
              { showSearch && <MySearcher showForm={showSearch} handleOnClose={handleCloseSearcher} getValue={setSelectePersona}/> }
              <MyTextField
                className={classes.myTextField}
                label='Nombre Persona'
                name='nombrePersona'
                disabled
              />
            </Box>
            <MyTextField
              className={classes.myTextField}
              label='Solicitud'
              name='orientacionesSolicitud'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Nota'
              name='orientacionesNota'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Respuesta'
              name='orientacionesRespuesta'
              disabled={disabled}
            />
            <MyRadioField
              label='Estado'
              name='estado'
              required
              disabled={accion === 'ver'}
              options={options}
            />
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

export default OrientacionForm;
