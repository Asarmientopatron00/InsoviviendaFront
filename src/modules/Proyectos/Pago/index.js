import React, {useState, useEffect} from 'react';
import {Box, Button, MenuItem, InputAdornment} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PagoCreador from './PagoCreador';
import {
  onGetColeccion,
  // onRevert,
} from '../../../redux/actions/PagoAction';
import {useDispatch, useSelector} from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import {
  UPDATE_TYPE,
  CREATE_TYPE,
  DELETE_TYPE,
} from 'shared/constants/Constantes';
import {MessageView} from '../../../@crema';
import {useDebounce} from 'shared/hooks/useDebounce';
import MyCell from 'shared/components/MyCell';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';
import moment from 'moment';
import { ESTADO, TIPOS_PAGO } from 'shared/constants/ListaValores';
import Search from '@material-ui/icons/Search';
import MyProjectSearcher from 'shared/components/MyProjectSearcher';
import { PictureAsPdf, Info, InsertDriveFile } from '@material-ui/icons';
import {history} from 'redux/store';
import { Formik, Form } from 'formik';
import MySearcher from 'shared/components/MySearcher';

const currencyFormatter = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0});

const {
  theme: {palette},
} = defaultConfig;

const cells = [
  {
    id: 'proyecto_id',
    typeHead: 'numeric',
    label: 'Proyecto Nro.',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'pagosTipo',
    typeHead: 'string',
    label: 'Tipo',
    value: (value) => TIPOS_PAGO.map((tipo) => tipo.id === value ? tipo.nombre : ''),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'pagosDescripcionPago',
    typeHead: 'string',
    label: 'Descripción Pago',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'identificacion',
    typeHead: 'numeric',
    label: 'Identificación',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'persona',
    typeHead: 'string',
    label: 'Solicitante',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'pagosFechaPago',
    typeHead: 'string',
    label: 'Fecha Pago',
    value: (value) => moment(value).format('DD-MM-YYYY'),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'pagosValorTotalPago',
    typeHead: 'numeric',
    label: 'Valor Pago',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'pagosEstado',
    typeHead: 'string',
    label: 'Estado',
    value: (value) => (value === 1 ? 'Activo' : 'Inactivo'),
    align: 'left',
    mostrarInicio: true,
    cellColor: (value) =>
      value === 1 ? palette.secondary.main : palette.secondary.red,
  },
  {
    id: 'usuario_modificacion_nombre',
    typeHead: 'string',
    label: 'Modificado Por',
    value: (value) => value,
    align: 'left',
    width: '140px',
    mostrarInicio: false,
  },
  {
    id: 'fecha_modificacion',
    typeHead: 'string',
    label: 'Fecha Última Modificación',
    value: (value) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
    align: 'left',
    width: '180px',
    mostrarInicio: false,
  },
  {
    id: 'usuario_creacion_nombre',
    typeHead: 'string',
    label: 'Creado Por',
    value: (value) => value,
    align: 'left',
    width: '140px',
    mostrarInicio: false,
  },
  {
    id: 'fecha_creacion',
    typeHead: 'string',
    label: 'Fecha Creación',
    value: (value) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
    align: 'left',
    width: '180px',
    mostrarInicio: false,
  },
];

function EnhancedTableHead(props) {
  const {classes, order, orderBy, onRequestSort, columnasMostradas} = props;

  return (
    <TableHead>
      <TableRow className={classes.head}>
        <TableCell
          align='left'
          style={{fontWeight: 'bold'}}
          className={classes.headCell}>
          {'Acciones'}
        </TableCell>
        {columnasMostradas.map((cell) => {
          if (cell.mostrar) {
            return (
              <TableCell
                key={cell.id}
                style={{fontWeight: 'bold'}}
                align={
                  cell.typeHead === 'string'
                    ? 'left'
                    : cell.typeHead === 'numeric'
                    ? 'right'
                    : 'center'
                }
                className={classes.cell}
                sortDirection={orderBy === cell.id ? order : false}>
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : 'asc'}
                  onClick={() => {
                    onRequestSort(cell.id);
                  }}>
                  {cell.label}
                  {orderBy === cell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <th key={cell.id}></th>;
          }
        })}
        <TableCell
          align='center'
          style={{fontWeight: 'bold'}}
          className={classes.headCellWoMargin}>
          {'Detalles'}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnasMostradas: PropTypes.array.isRequired,
};

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
    gridTemplateColumns: '4fr 4fr 4fr 4fr 4fr 1fr',
    gap: '20px',
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
  },
  exportButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  x: {
      position: 'absolute',
      color: '#4caf50',
      fontSize: '14px',
      top: '19px',
      fontWeight: 'bold',
    },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    titulo,
    onOpenAddPago,
    handleOpenPopoverColumns,
    queryFilter,
    proyectoFiltro,
    personaFiltro,
    fechaDesdeFiltro,
    fechaHastaFiltro,
    estadoFiltro,
    limpiarFiltros,
    permisos,
    handleOnClose,
    handleOnOpenProject,
    handleOnOpenPerson,
    setSelectedProyecto,
    setSelectedPersona,
    showSearch,
    abonar
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'>
          {numSelected} selected
        </Typography>
      ) : (
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
              <Formik>
                <Form>
                  {permisos.indexOf('Exportar') >= 0 && (
                    <Tooltip
                      title='Exportar'
                      component='a'
                      className={classes.linkDocumento}
                      href={
                        defaultConfig.API_URL +
                        '/pagos' +
                        '?proyecto=' +
                        proyectoFiltro +
                        '&fechaDesde=' +
                        fechaDesdeFiltro +
                        '&fechaHasta=' +
                        fechaHastaFiltro +
                        '&estado=' +
                        estadoFiltro +
                        '&persona=' +
                        personaFiltro+
                        '&abonoExtra=' +
                        abonar
                      }>
                      <IconButton
                        className={classes.exportButton}
                        aria-label='filter list'>
                        <Box component='span' className={classes.x}>
                          X
                        </Box>
                        <InsertDriveFile />
                      </IconButton>
                    </Tooltip>
                  )}
                </Form>
              </Formik>
              <Tooltip
                title='Mostrar/Ocultar Columnas'
                onClick={handleOpenPopoverColumns}>
                <IconButton
                  className={classes.columnFilterButton}
                  aria-label='filter list'>
                  <TuneIcon />
                </IconButton>
              </Tooltip>
              {permisos.indexOf('Crear') >= 0 && (
                <Tooltip title='Crear Pago' onClick={onOpenAddPago}>
                  <IconButton
                    className={classes.createButton}
                    aria-label='filter list'>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box className={classes.contenedorFiltros}>
            <TextField
              label='Número Proyecto'
              name='proyectoFiltro'
              id='proyectoFiltro'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleOnOpenProject}>
                      <Search/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={queryFilter}
              value={proyectoFiltro}
            />
            { showSearch.proyecto && <MyProjectSearcher showForm={showSearch.proyecto} handleOnClose={handleOnClose} getValue={setSelectedProyecto}/> }
            <TextField
              label='Solicitante'
              name='personaFiltro'
              id='personaFiltro'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleOnOpenPerson}>
                      <Search/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={queryFilter}
              value={personaFiltro}
            />
            { showSearch.persona && <MySearcher showForm={showSearch.persona} handleOnClose={handleOnClose} getValue={setSelectedPersona}/> }
            <TextField
              label='Fecha Desde Pago'
              name='fechaDesdeFiltro'
              id='fechaDesdeFiltro'
              type={'date'}
              InputLabelProps={{
                shrink: true
              }}
              onChange={queryFilter}
              value={fechaDesdeFiltro}>
            </TextField>
            <TextField
              label='Fecha Hasta Pago'
              name='fechaHastaFiltro'
              id='fechaHastaFiltro'
              type={'date'}
              InputLabelProps={{
                shrink: true
              }}
              onChange={queryFilter}
              value={fechaHastaFiltro}>
            </TextField>
            <TextField
              label='Estado Pago'
              name='estadoFiltro'
              id='estadoFiltro'
              select={true}
              onChange={queryFilter}
              value={estadoFiltro}>
              {ESTADO.map((estado) => {
                return (
                  <MenuItem
                    value={estado.id}
                    key={estado.id}
                    id={estado.id}
                    className={classes.pointer}>
                    {estado.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
            <Box display='grid'>
              <Box display='flex' mb={2}>
                <Tooltip title='Limpiar Filtros' onClick={limpiarFiltros}>
                  <IconButton
                    className={classes.clearButton}
                    aria-label='filter list'>
                    <ClearAllIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onOpenAddPago: PropTypes.func.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros: PropTypes.func.isRequired,
  proyectoFiltro: PropTypes.string.isRequired,
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
  head: {
    borderTop: '2px solid #dee2e6',
    borderBottom: '2px solid #dee2e6',
  },
  headCell: {
    padding: '0px 0px 0px 15px',
  },
  row: {
    padding: 'none',
  },
  cell: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    whiteSpace: 'nowrap',
  }),
  cellWidth: (props) => ({
    minWidth: props.width,
  }),
  cellColor: (props) => ({
    backgroundColor: props.cellColor,
    color: 'white',
  }),
  acciones: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    minWidth: '100px',
  }),
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  generalIcons: {
    '&:hover': {
      color: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  editIcon: {
    color: theme.palette.secondary.main,
  },
  visivilityIcon: {
    color: theme.palette.grayBottoms,
  },
  deleteIcon: {
    color: theme.palette.primary.main,
  },
  popoverColumns: {
    display: 'grid',
    padding: '10px',
    color: theme.palette.grayBottoms,
  },
  paginacion: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '5px',
  },
  rowsPerPageOptions: {
    marginRight: '10px',
  },
}));

const initialFilters = {
  proyectoFiltro: '',
  personaFiltro: '',
  fechaDesdeFiltro: '',
  fechaHastaFiltro: '',
  estadoFiltro: '',
}
const Pago = (props) => {
  const [abonar, setAbonar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState(
    'proyecto_id:asc',
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPageOptions = [5, 10, 15, 25, 50];
  const [showSearch, setShowSearch] = useState({
    proyecto: false,
    persona: false
  });

  const [accion, setAccion] = useState('ver');
  const [pagoSeleccionado, setPagoSeleccionado] = useState(0);
  const {rows, desde, hasta, ultima_pagina, total} = useSelector(
    ({pagoReducer}) => pagoReducer,
  );

  const {message, error, messageType} = useSelector(({common}) => common);

  useEffect(() => {
    if (message || error) {
      if (messageType === DELETE_TYPE) {
        Swal.fire('Reversado', message, 'success');
        updateColeccion();
      }
    }
  }, [message, error]); // eslint-disable-line react-hooks/exhaustive-deps

  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const [filters, setFilters] = useState(initialFilters);
  const debouncedFilters = useDebounce(filters, 800);
  const {
    proyectoFiltro,
    personaFiltro,
    fechaDesdeFiltro,
    fechaHastaFiltro,
    estadoFiltro,
  } = filters;
  // const {pathname} = useLocation();
  const [openPopOver, setOpenPopOver] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);

  let columnasMostradasInicial = [];

  cells.forEach((cell) => {
    columnasMostradasInicial.push({
      id: cell.id,
      mostrar: cell.mostrarInicio,
      typeHead: cell.typeHead,
      label: cell.label,
      value: cell.value,
      align: cell.align,
      width: cell.width,
      cellColor: cell.cellColor,
    });
  });

  const [columnasMostradas, setColumnasMostradas] = useState(
    columnasMostradasInicial,
  );

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }
  const classes = useStyles({vp: vp});
  const dispatch = useDispatch();

  const {user} = useSelector(({auth}) => auth);
  const [permisos, setPermisos] = useState('');
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    user &&
      user.permisos.forEach((modulo) => {
        modulo.opciones.forEach((opcion) => {
          if (opcion.url === props.route.path) {
            if(opcion.url === '/pagos-abonar-extra'){
              setAbonar(true);
            }
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
    dispatch(onGetColeccion(
      page, 
      rowsPerPage, 
      orderByToSend, 
      proyectoFiltro, 
      fechaDesdeFiltro, 
      fechaHastaFiltro, 
      estadoFiltro,
      personaFiltro,
      abonar 
    ));
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    dispatch, 
    page, 
    rowsPerPage, 
    orderByToSend, 
    showForm,
    debouncedFilters,
    estadoFiltro,
    abonar
  ]); 

  const updateColeccion = () => {
    setPage(1);
    dispatch(onGetColeccion(
      page, 
      rowsPerPage, 
      orderByToSend, 
      proyectoFiltro, 
      fechaDesdeFiltro, 
      fechaHastaFiltro, 
      estadoFiltro, 
      personaFiltro,
      abonar
    ));
  };

  useEffect(() => {
    setPage(1);
  }, [ 
    orderByToSend, 
    debouncedFilters
  ]);

  const queryFilter = (e) => {
    setFilters({
      ...filters, 
      [e.target.name]: e.target.value
    });
  };

  const limpiarFiltros = () => {
    setFilters(initialFilters);
  };

  const changeOrderBy = (id) => {
    if (orderBy === id) {
      if (order === 'asc') {
        setOrder('desc');
        setOrderByToSend(id + ':desc');
      } else {
        setOrder('asc');
        setOrderByToSend(id + ':asc');
      }
    } else {
      setOrder('asc');
      setOrderBy(id);
      setOrderByToSend(id + ':asc');
    }
  };

  const onOpenEditPago = (id) => {
    setPagoSeleccionado(id);
    setAccion('editar');
    setShowForm(true);
  };

  const handleClosePopover = () => {
    setOpenPopOver(false);
    setPopoverTarget(null);
  };

  const handleOpenPopoverColumns = (e) => {
    setPopoverTarget(e.currentTarget);
    setOpenPopOver(true);
  };

  const handleOnchangeMostrarColumna = (e) => {
    let aux = columnasMostradas;
    setColumnasMostradas(
      aux.map((column) => {
        if (column.id === e.target.id) {
          return {...column, mostrar: !column.mostrar};
        } else {
          return column;
        }
      }),
    );
  };

  const showAllColumns = () => {
    let aux = columnasMostradas;
    setColumnasMostradas(
      aux.map((column) => {
        return {...column, mostrar: true};
      }),
    );
  };

  const reiniciarColumns = () => {
    setColumnasMostradas(columnasMostradasInicial);
  };

  const onOpenViewPago = (id) => {
    setPagoSeleccionado(id);
    setAccion('ver');
    setShowForm(true);
  };

  const onOpenAddPago = () => {
    setPagoSeleccionado(0);
    setAccion('crear');
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setPagoSeleccionado(0);
    setAccion('ver');
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [showTable, setShowTable] = useState(true);
  useEffect(() => {
    if (rows.length === 0) {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
  }, [rows]);

  const handleCloseSearcher = () => {
    setShowSearch({
      proyecto: false,
      persona: false
    });
  }

  const handleOpenProjectSearcher = () => {
    setShowSearch({
      proyecto: true,
      persona: false
    });
  }

  const handleOpenPersonSearcher = () => {
    setShowSearch({
      proyecto: false,
      persona: true
    });
  }

  const setSelectedProyecto = (id) => {
    setFilters({
      ...filters, 
      proyectoFiltro: id
    });
  }

  const setSelectedPersona = (id) => {
    setFilters({
      ...filters, 
      personaFiltro: id
    });
  }

  const onExportPago = (id) => {
    window.location.href = defaultConfig.API_URL+'/pagos/'+id;
  }

  const onGoPagosDetalle = (id) => {
    history.push('/pagos-detalle/'+id);
  }
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            onOpenAddPago={onOpenAddPago}
            handleOpenPopoverColumns={handleOpenPopoverColumns}
            queryFilter={queryFilter}
            limpiarFiltros={limpiarFiltros}
            permisos={permisos}
            titulo={titulo}
            handleOnClose={handleCloseSearcher}
            handleOnOpenProject={handleOpenProjectSearcher}
            handleOnOpenPerson={handleOpenPersonSearcher}
            showSearch={showSearch}
            setSelectedProyecto={setSelectedProyecto}
            setSelectedPersona={setSelectedPersona}
            abonar={abonar}
            proyectoFiltro={proyectoFiltro}
            personaFiltro={personaFiltro}
            fechaDesdeFiltro={fechaDesdeFiltro}
            fechaHastaFiltro={fechaHastaFiltro}
            estadoFiltro={estadoFiltro}
          />
        )}
        {showTable && permisos ? (
          <Box className={classes.marcoTabla}>
            <Box className={classes.paginacion}>
              <Box>
                <p>{textoPaginacion}</p>
              </Box>
              <Box className={classes.paginacion}>
                <select
                  className={classes.rowsPerPageOptions}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}>
                  {rowsPerPageOptions.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
                <Pagination
                  showFirstButton
                  showLastButton
                  onChange={handleChangePage}
                  count={ultima_pagina}
                  page={page}
                />
              </Box>
            </Box>

            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
                aria-label='enhanced table'>
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={changeOrderBy}
                  rowCount={rows.length}
                  columnasMostradas={columnasMostradas}
                />
                <TableBody>
                  {rows.map((row, index) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                      <TableRow
                        hover
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className={classes.row}>
                        <TableCell align='left' className={classes.acciones}>
                          {permisos.indexOf('Modificar') >= 0 && (
                            <Tooltip title={<IntlMessages id='boton.editar' />}>
                              <EditIcon
                                onClick={() => onOpenEditPago(row.id)}
                                className={`${classes.generalIcons} ${classes.editIcon}`}></EditIcon>
                            </Tooltip>
                          )}
                          {permisos.indexOf('Listar') >= 0 && (
                            <Tooltip title={<IntlMessages id='boton.ver' />}>
                              <VisibilityIcon
                                onClick={() => onOpenViewPago(row.id)}
                                className={`${classes.generalIcons} ${classes.visivilityIcon}`}></VisibilityIcon>
                            </Tooltip>
                          )}
                          {permisos.indexOf('Exportar') >= 0 && (
                            <Tooltip
                              title={<IntlMessages id='boton.recibo' />}>
                              <PictureAsPdf
                                onClick={() => onExportPago(row.id)}
                                style={{color: 'darkred'}}
                                className={`${classes.generalIcons} ${classes.deleteIcon}`}></PictureAsPdf>
                            </Tooltip>
                          )}
                        </TableCell>

                        {columnasMostradas.map((columna) => {
                          if (columna.mostrar) {
                            return (
                              <MyCell
                                useStyles={useStyles}
                                key={row.id + columna.id}
                                align={columna.align}
                                width={columna.width}
                                claseBase={classes.cell}
                                value={columna.value(row[columna.id])}
                                cellColor={
                                  columna.cellColor
                                    ? columna.cellColor(row[columna.id])
                                    : ''
                                }
                              />
                            );
                          } else {
                            return <th key={row.id + columna.id}></th>;
                          }
                        })}
                        <TableCell align='center' className={classes.cell}>
                          <Tooltip title={'Detalles'}>
                            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Info 
                                style={{
                                  color: '#001597'
                                }}
                                onClick={() => onGoPagosDetalle(row.id)}
                                className={`${classes.generalIcons}`}/>
                            </Box>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box className={classes.paginacion}>
              <Box>
                <p>{textoPaginacion}</p>
              </Box>
              <Box className={classes.paginacion}>
                <select
                  className={classes.rowsPerPageOptions}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}>
                  {rowsPerPageOptions.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
                <Pagination
                  showFirstButton
                  showLastButton
                  onChange={handleChangePage}
                  count={ultima_pagina}
                  page={page}
                />
              </Box>
            </Box>
          </Box>
        ) : permisos ? (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            className={classes.marcoTabla}>
            <IntlMessages id='sinResultados' />
          </Box>
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

      {showForm ? (
        <PagoCreador
          showForm={showForm}
          pago={pagoSeleccionado}
          accion={accion}
          abonar={abonar}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          titulo={titulo}
        />
      ) : (
        ''
      )}

      <Popover
        id='popoverColumns'
        open={openPopOver}
        anchorEl={popoverTarget}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Box className={classes.popoverColumns}>
          {columnasMostradas.map((column) => {
            return (
              <FormControlLabel
                key={column.id}
                control={
                  <Switch
                    id={column.id}
                    checked={column.mostrar}
                    onChange={handleOnchangeMostrarColumna}
                  />
                }
                label={column.label}
              />
            );
          })}
          <Box>
            <Button onClick={showAllColumns}>Mostrar Todos</Button>
            <Button onClick={reiniciarColumns}>Reiniciar Vista</Button>
          </Box>
        </Box>
      </Popover>
      <MessageView
        variant={
          messageType === UPDATE_TYPE || messageType === CREATE_TYPE
            ? 'success'
            : 'error'
        }
        message={
          messageType === UPDATE_TYPE || messageType === CREATE_TYPE
            ? message :
              error ? 'El pago seleccionado ya ha sido reversado' : 
              ''
        }
      />
    </div>
  );
};

export default Pago;
