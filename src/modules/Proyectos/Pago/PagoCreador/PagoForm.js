import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment,IconButton} from '@material-ui/core';
import {Form} from 'formik';
import { Search } from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyTextField from 'shared/components/MyTextField';
import MyRadioField from 'shared/components/MyRadioField';
import MyProjectSearcher from 'shared/components/MyProjectSearcher';
import MyCurrencyField from 'shared/components/MyCurrencyField';

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
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
  },
  grid2: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
}));

const PagoForm = (props) => {
  const {
    handleOnClose, 
    accion, 
    initialValues, 
    titulo,
    setFieldValue,
    values,
    proyectos
  } = props;

  const [showSearch, setShowSearch] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (accion === 'ver' || initialValues.pagosEstado === '0' || initialValues.pagosTipo === 'E') {
      setDisabled(true);
    }
  }, [initialValues.pagosEstado, initialValues.pagosTipo, accion]);

  useEffect(() => {
    if(values.proyecto_id){
      const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(values.proyecto_id));
      if(proyecto){
        setFieldValue('identificacion', proyecto.identificacion);
        setFieldValue('solicitante', proyecto.nombre);
      }
    } else {
      setFieldValue('identificacion', '');
      setFieldValue('solicitante', '')
    }
  },[values.proyecto_id, proyectos]); // eslint-disable-line

  const classes = useStyles(props);

  const handleCloseSearcher = () => {
    setShowSearch(false);
  }
  const handleOnOpenSearcher = () => {
    setShowSearch(true);
  }
  const setSelectedProyecto = (id) => {
    setFieldValue('proyecto_id',id);
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
            <Box className={classes.grid}>
              <MyTextField
                label='Número Proyecto'
                name='proyecto_id'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        style={{
                          pointerEvents: accion==='crear'?'auto':'none'
                        }} 
                        onClick={handleOnOpenSearcher}>
                        <Search/>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                className={classes.myTextField}
                disabled={accion !== 'crear'}
              />
              { showSearch && <MyProjectSearcher showForm={showSearch} handleOnClose={handleCloseSearcher} getValue={setSelectedProyecto}/> }
            </Box>
            <Box className={classes.grid}>
              <MyTextField
                className={classes.myTextField}
                label='Identificación'
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
              <MyTextField
                className={classes.myTextField}
                label='Fecha Pago'
                name='pagosFechaPago'
                InputLabelProps={{
                  shrink: true,
                }}
                type='date'
                disabled={accion !== 'crear'}
              />
              <MyCurrencyField
                className={classes.myTextField}
                label='Valor Pago'
                name='pagosValorTotalPago'
                disabled={disabled}
              />
            </Box>
            <Box className={classes.grid2}>
              <MyTextField
                className={classes.myTextField}
                label='Descripción Pago'
                name='pagosDescripcionPago'
                disabled={disabled}
              />              
            </Box>
            <Box className={classes.grid}>
              <MyRadioField
                label='Estado'
                name='pagosEstado'
                disabled={initialValues.pagosEstado === '0'}
                options={options}
              />
            </Box>
            {values.pagosEstado === '0' && 
              <Box className={classes.grid2}>
                <MyTextField
                  className={classes.myTextField}
                  label='Observaciones Anulación'
                  name='pagosObservacionesAnulacion'
                  disabled={initialValues.pagosEstado === '0'}
                />              
              </Box>
            }
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

export default PagoForm;
