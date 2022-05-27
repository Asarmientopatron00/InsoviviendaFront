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
import { ESTADOS_PROYECTO } from 'shared/constants/ListaValores';

const options = [
  {value: '1', label: 'Activo'},
  {value: '0', label: 'Inactivo'},
];

const options2 = [
  {value: '1', label: 'Sí'},
  {value: '0', label: 'No'},
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
  inputs_2_modified: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
}));

const DocumentosProyectoForm = (props) => {
  const {handleOnClose, accion, initialValues} = props;

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.docProEstado === '0') {
      setDisabled(true);
    }
  }, [initialValues.docProEstado, accion]);

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
            Proyectos - Documentos
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.inputs_3}>
              <MyTextField
                className={classes.myTextField}
                label='Numero Proyecto'
                name='proyecto_id'
                disabled
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Solicitud'
                InputLabelProps={{
                  shrink: true,
                }}
                name='fechaSolicitud'
                disabled
                type='date'
              />
              <MySelectField
                label='Estado Proyecto'
                className={classes.myTextField}
                disabled
                name='estado'
                options={ESTADOS_PROYECTO}
                variant='standard' 
              />
            </Box>
            <Box className={classes.inputs_2_modified}>
              <MyTextField
                className={classes.myTextField}
                label='Solicitante'
                name='identificacion'
                disabled
              />
              <MyTextField
                className={classes.myTextField}
                label='Nombre Solicitante'
                name='solicitante'
                disabled
              />
            </Box>
            <Box className={classes.inputs_3}>
              <MyTextField
                className={classes.myTextField}
                label='Documento'
                name='tiDoPrDescripcion'
                disabled
              />
              <MySelectField
                label='Etapa'
                className={classes.myTextField}
                disabled
                name='tiDoPrEtapa'
                options={ESTADOS_PROYECTO}
                variant='standard' 
              />
            </Box>
            <Box className={classes.inputs_3}>
              <MyRadioField
                label='Requerido'
                name='tiDoPrRequerido'
                disabled
                options={options2}
              />
            </Box>
            <Box className={classes.inputs_3}>
              <MyRadioField
                label='Aplica'
                name='docProAplica'
                disabled={disabled}
                options={options2}
              />
            </Box>
            <Box className={classes.inputs_3}>
              <MyRadioField
                label='Entregado'
                name='docProEntregado'
                disabled={disabled}
                options={options2}
              />
            </Box>
            <Box className={classes.inputs_3}>
              <MyRadioField
                label='Estado'
                name='docProEstado'
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

export default DocumentosProyectoForm;
