import React, {useState, useEffect} from 'react';
import {Box, Button} from '@material-ui/core';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import {
  onExecute,
} from 'redux/actions/CalculoMoraAction';
import {onGetColeccionLigera as onGetFechaUltimaEjecucion} from 'redux/actions/ParametroConstanteAction';
import {useDispatch, useSelector} from 'react-redux';
import IntlMessages from '@crema/utility/IntlMessages';
import Swal from 'sweetalert2';
import {
  UPDATE_TYPE,
  CREATE_TYPE,
} from 'shared/constants/Constantes';
import {MessageView} from '@crema';
import moment from 'moment';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import MyTextField from 'shared/components/MyTextField';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    display: 'grid',
    // gap: '20px',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  clearButton: {
    backgroundColor: 'gray',
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  horizontalBottoms: {
    width: 'min-content',
    display: 'flex',
    gap: '5px',
  },
  titleTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  columnFilterButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  contenedorFiltros: {
    width: '90%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 2fr',
    gap: '20px',
    marginTop: '10px',
    marginBottom: '25px'
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
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
}));

const validationSchema = yup.object({
  fecha: yup.date().nullable(),
  fechaEjecucion: yup
    .date()
    .required('Requerido')
    .max(moment(Date.now()).format('YYYY-MM-DD'), 'Debe ser igual o inferior a la fecha actual')
    .test({
      name: 'fechaEjecucion',
      exclusive: false,
      params: {},
      message: 'Debe ser mayor a la fecha última ejecución', // eslint-disable-line
      test: function(value){
        return (
          this.parent.fecha !== undefined 
          && value > this.parent.fecha 
          ) || (
          this.parent.fecha === undefined
        );
      }
    }),
});

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    titulo,
    onExecuteCalcularMora,
    permisos,
    fecha
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      <Box className={classes.titleTop}>
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'>
          {titulo}
        </Typography>
      </Box>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          fecha: fecha ? moment(fecha.valor).format('YYYY-MM-DD') : '',
          fechaEjecucion: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting}) => {
          setSubmitting(true);
          onExecuteCalcularMora(data);
          setSubmitting(false);
        }}>
        {({initialValues, setFieldValue, values}) => (
          <Form noValidate autoComplete='off'>
            <Box className={classes.contenedorFiltros}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Última Ejecución'
                name='fecha'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Ejecución'
                name='fechaEjecucion'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {permisos.indexOf('Ejecutar') >= 0 && 
                <Box 
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    maxHeight: 50
                  }}
                >
                  <Tooltip title='Ejecutar Cálculo de Mora'>
                    <Button
                      className={classes.createButton}
                      aria-label='filter list'
                      type='submit'
                    >
                      <IntlMessages id='boton.executeMora' />
                    </Button>
                  </Tooltip>
                </Box>
              }
            </Box>
          </Form>
        )}
      </Formik>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  marcoTabla: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginTop: '5px',
  },
  root: {
    width: '100%%',
    padding: '20px',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));

const CalcularMora = (props) => {
  const [permisos, setPermisos] = useState('');
  const [titulo, setTitulo] = useState('');
  const classes = useStyles({vp: '0px'});
  const dispatch = useDispatch();
  const {ligera} = useSelector(
    ({parametroConstanteReducer}) => parametroConstanteReducer,
    );
  const {message, error, messageType} = useSelector(({common}) => common);
  const {user} = useSelector(({auth}) => auth);
  
  useEffect(() => {
    if (message && messageType === UPDATE_TYPE) {
      Swal.fire('Ejecución Exitosa!', message, 'success');
      updateColeccion();
    }
  }, [message, error]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    user && user.permisos.forEach((modulo) => {
      modulo.opciones.forEach((opcion) => {
        if (opcion.url === props.route.path) {
            setTitulo(opcion.nombre);
            const permisoAux = [];
            opcion.permisos.forEach((permiso) => {
              if (permiso.permitido) {
                permisoAux.push(permiso.titulo);
              }
            });
            setPermisos(permisoAux);
          }
        });
      });
  }, [user, props.route]);
    
  useEffect(() => {
    dispatch(onGetFechaUltimaEjecucion());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const fecha = ligera.find((lig) => lig.codigo === 'FECHA_ULTIMA_EJECUCION_CALCULO_MORA');
  
  const updateColeccion = () => {
    dispatch(onGetFechaUltimaEjecucion());
  };

  const onExecuteCalcularMora = (data) => {
    Swal.fire({
      title: 'Confirmar',
      text: `¿Seguro Que Desea Ejecutar el Proceso de Cálculo de Mora Para Hoy ${moment().format('YYYY-MM-DD HH:mm:ss')}?`,
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(onExecute(data, updateColeccion));
      }
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos ? (
          <EnhancedTableToolbar
            permisos={permisos}
            onExecuteCalcularMora={onExecuteCalcularMora}
            titulo={titulo}
            fecha={fecha}
          />
        ) : (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            className={classes.marcoTabla}>
            <IntlMessages id='noAutorizado' />
          </Box>
        )}
      </Paper>

      <MessageView
        variant={
          messageType === UPDATE_TYPE || messageType === CREATE_TYPE
            ? 'success'
            : 'error'
        }
        message={
          messageType === UPDATE_TYPE || messageType === CREATE_TYPE
            ? message
            : error
        }
      />
    </div>
  );
};

export default CalcularMora;
