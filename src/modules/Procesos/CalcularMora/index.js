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
} from '../../../redux/actions/CalculoMoraAction';
import {onGetColeccionLigera as onGetFechaUltimaEjecucion} from 'redux/actions/ParametroConstanteAction';
import {useDispatch, useSelector} from 'react-redux';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import {
  UPDATE_TYPE,
  CREATE_TYPE,
} from 'shared/constants/Constantes';
import {MessageView} from '../../../@crema';
import moment from 'moment';


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
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '10px'
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
  },
}));

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
      <Box className={classes.contenedorFiltros}>
        <TextField
          label='Fecha Última Ejecución'
          name='fechaUltimaEjecucion'
          id='fechaUltimaEjecucion'
          value={fecha?.valor??'No se ha ejecutado el Proceso Antes'}
          disabled
          className={classes.inputFiltros}
        />
        <Box display='grid'>
          <Box display='flex' style={{justifyContent: 'flex-end'}}>
            {permisos.indexOf('Ejecutar') >= 0 && 
              <Tooltip title='Ejecutar Cálculo de Mora'>
                <Button
                  className={classes.createButton}
                  aria-label='filter list'
                  onClick={onExecuteCalcularMora}
                >
                  <IntlMessages id='boton.executeMora' />
                </Button>
              </Tooltip>
            }
          </Box>
        </Box>
      </Box>
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
  const dense = true; //Borrar cuando se use el change
  const {ligera} = useSelector(
    ({parametroConstanteReducer}) => parametroConstanteReducer,
  );
  const fecha = ligera.find((lig) => lig.codigo === 'FECHA_ULTIMA_EJECUCION_CALCULO_MORA');
  const {message, error, messageType} = useSelector(({common}) => common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      if (messageType === UPDATE_TYPE) {
        Swal.fire('Ejecución Exitosa!', message, 'success');
        updateColeccion();
      }
    }
  }, [message, error]); // eslint-disable-line react-hooks/exhaustive-deps

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }
  const classes = useStyles({vp: vp});

  const {user} = useSelector(({auth}) => auth);
  const [permisos, setPermisos] = useState('');
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    user &&
      user.permisos.forEach((modulo) => {
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

  const updateColeccion = () => {
    dispatch(onGetFechaUltimaEjecucion());
  };

  const onExecuteCalcularMora = () => {
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
        dispatch(onExecute(updateColeccion));
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
