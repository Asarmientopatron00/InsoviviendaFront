import React, {useState, useEffect} from 'react';
import {
  Box, 
  makeStyles, 
  Toolbar, 
  Typography, 
  Paper, 
  IconButton, 
  Tooltip
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import ReajustarFechaPagoCreador from './ReajustarFechaPagoCreador';
import {useSelector} from 'react-redux';
import {
  UPDATE_TYPE,
  CREATE_TYPE,
} from 'shared/constants/Constantes';
import {MessageView} from '@crema';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    display: 'grid',
    // gap: '20px',
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
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    titulo,
    onOpenAddDesembolso,
    permisos,
  } = props;
  return (
    <Toolbar className={clsx(classes.root)}>
      <>
        <Box className={classes.titleTop}>
          <Typography
            className={classes.title}
            variant='h6'
            id='tableTitle'
            component='div'>
            {titulo}
          </Typography>
          <Box className={classes.horizontalBottoms}>
            {permisos.indexOf('Ajustar') >= 0 && (
              <Tooltip title='Ajustar Fecha Pago' onClick={onOpenAddDesembolso}>
                <IconButton
                  className={classes.createButton}
                  aria-label='filter list'>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  onOpenAddDesembolso: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
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

const AjustarFechaPago = (props) => {
  const [showForm, setShowForm] = useState(false);
  const {message, error, messageType} = useSelector(({common}) => common);

  // const {pathname} = useLocation();

  let vp = '15px';
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

  const onOpenAddDesembolso = () => {
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            onOpenAddDesembolso={onOpenAddDesembolso}
            permisos={permisos}
            titulo={titulo}
          />
        )}
      </Paper>
      {showForm ? (
        <ReajustarFechaPagoCreador
          showForm={showForm}
          handleOnClose={handleOnClose}
          titulo={titulo}
        />
      ) : (
        ''
      )}
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

export default AjustarFechaPago;
