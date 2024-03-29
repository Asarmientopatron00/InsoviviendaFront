import React, {useState, useEffect} from 'react';
import {Box, Button, InputAdornment} from '@material-ui/core';
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
import DonacionCreador from './DonacionCreador';
import {
   onGetColeccion, 
   onDelete,
} from '../../../redux/actions/DonacionAction';
import {
   useDispatch, 
   useSelector
} from 'react-redux';
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
import { InsertDriveFile, PictureAsPdf, Search } from '@material-ui/icons';
import MySearcher from 'shared/components/MySearcher';

const currencyFormatter = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP'});

const {
  theme: {palette},
} = defaultConfig;

const cells = [
   { 
      id: 'nombre',           
      typeHead: 'string', 
      label: 'Beneficiario',          
      value: (value) => value,
      align: 'left',
      mostrarInicio: true,
   },
   { 
      id: 'donacionesNumeroDocumentoTercero',                 
      typeHead: 'numeric', 
      label: 'Documento Tercero',       
      value: (value) => value,
      align: 'right',
      mostrarInicio: true,
   },
   { 
      id: 'donacionesNombreTercero',                 
      typeHead: 'string', 
      label: 'Nombre Tercero',       
      value: (value) => value,
      align: 'left',
      mostrarInicio: true,
   },
   {
      id: 'donacionesFechaDonacion',
      typeHead: 'string',
      label: 'Fecha',
      value: (value) => moment(value).format('YYYY-MM-DD'),
      align: 'left',
      mostrarInicio: true,
   },
   { 
      id: 'tipDonDescripcion',            
      typeHead: 'string', 
      label: 'Tipo donacion',  
      value: (value) => value,
      align: 'left',
      mostrarInicio: true,
   },
   { 
      id: 'donacionesValorDonacion', 
      typeHead: 'numeric', 
      label: 'Valor donación',  
      value: (value) => currencyFormatter.format(value),
      align: 'right',
      mostrarInicio: false,
   },
   { 
      id: 'donacionesEstadoDonacion', 
      typeHead: 'string', 
      label: 'Estado Ingreso',  
      value: (value) => value,
      align: 'left',
      mostrarInicio: false,
   },   
   { 
      id: 'forPagDescripcion',                       
      typeHead: 'string', 
      label: 'Forma de pago',             
      value: (value) => value,
      align: 'left',
      mostrarInicio: false,
   },
   { 
      id: 'donacionesNumeroCheque',      
      typeHead: 'string', 
      label: 'Número cheque',         
      value: (value) => value,
      align: 'left',
      mostrarInicio: false,
   },
   { 
      id: 'bancosDescripcion',               
      typeHead: 'string', 
      label: 'Banco',     
      value: (value) => value,
      align: 'left',
      mostrarInicio: false,
   },
   { 
      id: 'donacionesNumeroRecibo',   
      typeHead: 'string', 
      label: 'Número recibo',          
      value: (value) => value,
      align: 'left',
      mostrarInicio: false,
   },
   { 
      id: 'donacionesFechaRecibo',            
      typeHead: 'string', 
      label: 'Fecha recibo',           
      value: (value) => moment(value).format('YYYY-MM-DD'),
      align: 'left',
      mostrarInicio: false,
   },
   { 
      id: 'donacionesNotas',             
      typeHead: 'string', 
      label: 'Notas',      
      value: (value) => value,
      align: 'left',
      mostrarInicio: false,
   },
   {
      id: 'estado',
      typeHead: 'boolean',
      label: 'Estado',
      value: (value) => (value === 1 
         ? 'Activo' 
         : 'Inactivo'),
      align: 'left',
      mostrarInicio: true,
      cellColor: (value) => value === 1 
         ? palette.secondary.main 
         : palette.secondary.red,
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
   const {
      classes, 
      order, 
      orderBy, 
      onRequestSort, 
      columnasMostradas
   } = props;

   return (
      <TableHead>
         <TableRow className = {classes.head}>
            <TableCell
               align = 'center'
               style = {{fontWeight: 'bold'}}
               className = {classes.headCell}>
               {'Acciones'}
            </TableCell>
            {columnasMostradas.map((cell) => {
               if (cell.mostrar) 
                  return (
                     <TableCell
                        key = {cell.id}
                        style = {{fontWeight: 'bold'}}
                        align = {cell.align}
                        className = {classes.cell}
                        sortDirection = { orderBy === cell.id 
                                             ? order 
                                             : false
                                       }>
                        <TableSortLabel
                           active = { orderBy === cell.id }
                           direction = { orderBy === cell.id 
                              ? order 
                              : 'asc'
                           }
                           onClick = {() => {
                              onRequestSort(cell.id);
                           }}>
                           { cell.label}
                           { orderBy === cell.id 
                            ? ( <span className = {classes.visuallyHidden}> 
                                    { order === 'desc'
                                       ? 'sorted descending'
                                       : 'sorted ascending'}
                                  </span>)
                              : null }
                        </TableSortLabel>
                     </TableCell>
                  );
               else 
                  return <th key = {cell.id}></th>;
            })}
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
      boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
      '&:hover': {
         backgroundColor: theme.palette.colorHover,
         cursor: 'pointer',
      },
   },
   clearButton: {
      backgroundColor: 'gray',
      color: 'white',
      boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
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
      boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
      '&:hover': {
         backgroundColor: theme.palette.colorHover,
         cursor: 'pointer',
      },
   },
   contenedorFiltros: {
      width: '90%',
      display: 'grid',
      gridTemplateColumns: '4fr 4fr 4fr 4fr 1fr',
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
      titulo,
      onOpenAddDonacion,
      handleOpenPopoverColumns,
      queryFilter,
      identificacion,
      benefactor,
      limpiarFiltros,
      permisos,
      handleOnClose,
      handleOnOpen,
      showSearch,
      setSelectedPersona,
      fechaInicial,
      fechaFinal
   } = props;
   return (
      <Toolbar
         className = {clsx(classes.root)}>
         <>
            <Box className = {classes.titleTop}>
               <Typography
                  className = {classes.title}
                  variant = 'h6'
                  id = 'tableTitle'
                  component = 'div'>
                  {titulo}
               </Typography>
               <Box className = {classes.horizontalBottoms}>
                  {permisos.indexOf('Exportar') >= 0 && (
                    <Tooltip
                      title='Exportar'
                      component='a'
                      className={classes.linkDocumento}
                      href={
                        defaultConfig.API_URL +
                        '/donaciones' +
                        '?identificacion=' +
                        identificacion +
                        '&benefactor=' +
                        benefactor +
                        '&fechaInicial=' +
                        fechaInicial +
                        '&fechaFinal=' +
                        fechaFinal
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
                  <Tooltip
                     title = 'Mostrar/Ocultar Columnas'
                     onClick = {handleOpenPopoverColumns}>
                     <IconButton
                        className = {classes.columnFilterButton}
                        aria-label = 'filter list'>
                        <TuneIcon />
                     </IconButton>
                  </Tooltip>
                  {permisos.indexOf('Crear') >= 0 && (
                     <Tooltip 
                        title = 'Crear Donacion/Otro Ingreso' 
                        onClick = { onOpenAddDonacion }>
                        <IconButton
                           className = { classes.createButton }
                           aria-label = 'filter list'>
                           <AddIcon />
                        </IconButton>
                     </Tooltip>
                  )}
               </Box>
            </Box>
            <Box className = {classes.contenedorFiltros}>
               <TextField
                  label='Beneficiario'
                  name='identificacion'
                  id='identificacion'
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position='end'>
                        <IconButton onClick={handleOnOpen}>
                           <Search/>
                        </IconButton>
                        </InputAdornment>
                     )
                  }}
                  onChange={queryFilter}
                  value={identificacion}
                  />
                  { showSearch && <MySearcher showForm={showSearch} handleOnClose={handleOnClose} getValue={setSelectedPersona}/> }
               <TextField
                  label='Nombres y/o Apellidos Tercero'
                  name='benefactor'
                  id='benefactor'
                  InputLabelProps={{
                     // shrink: true,
                     style: {
                        fontSize: 14
                     }
                  }}
                  onChange={queryFilter}
                  value={benefactor}
                  className={classes.inputFiltros}
               />
               <TextField
                  label='Fecha Inicial Donación'
                  name='fechaInicial'
                  id='fechaInicial'
                  type='date'
                  InputLabelProps={{
                     shrink: true
                  }}
                  onChange={queryFilter}
                  value={fechaInicial}
                  className={classes.inputFiltros}
               />
               <TextField
                  label='Fecha Final Donación'
                  name='fechaFinal'
                  id='fechaFinal'
                  type='date'
                  InputLabelProps={{
                     shrink: true
                  }}
                  onChange={queryFilter}
                  value={fechaFinal}
                  className={classes.inputFiltros}
               />
               <Box display='grid'>
                  <Box display='flex' mb={2}>
                     <Tooltip 
                        title='Limpiar Filtros' 
                        onClick={limpiarFiltros}>
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
      </Toolbar>
   );
};

EnhancedTableToolbar.propTypes = {
   onOpenAddDonacion: PropTypes.func.isRequired,
   handleOpenPopoverColumns: PropTypes.func.isRequired,
   queryFilter: PropTypes.func.isRequired,
   limpiarFiltros: PropTypes.func.isRequired,
   identificacion: PropTypes.string.isRequired,
   benefactor: PropTypes.string.isRequired,
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
      minWidth: '120px',
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
   identificacion: '',
   benefactor: '',
   fechaInicial: '',
   fechaFinal: ''
}

const Donaciones = (props) => {
   let columnasMostradasInicial = [];
   const [showForm, setShowForm] = useState(false);
   const [order, setOrder] = React.useState('asc');
   const [orderBy, setOrderBy] = React.useState('');
   const [orderByToSend, setOrderByToSend] = React.useState( 'fecha_modificacion:desc', );
   const [selected, setSelected] = React.useState([]);
   const [page, setPage] = React.useState(1);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const rowsPerPageOptions = [5, 10, 15, 25, 50];
   const [showSearch, setShowSearch] = useState(false);
   const [accion, setAccion] = useState('ver');
   const [donacionSeleccionado, setDonacionSeleccionado] = useState(0);
   const [filters, setFilters] = useState(initialFilters);
   const {
      identificacion,
      benefactor,
      fechaFinal,
      fechaInicial
   } = filters;
   const [openPopOver, setOpenPopOver] = useState(false);
   const [popoverTarget, setPopoverTarget] = useState(null);
   const [permisos, setPermisos] = useState('');
   const [titulo, setTitulo] = useState('');
   const [showTable, setShowTable] = useState(true);
   const [columnasMostradas, setColumnasMostradas] = useState(
      columnasMostradasInicial,
   );   
   const {rows, desde, hasta, ultima_pagina, total} = useSelector(
      ({donacionReducer}) => donacionReducer,
   );
   const {message, error, messageType} = useSelector(({common}) => common);
   const {user} = useSelector(({auth}) => auth);
   const debouncedFilters = useDebounce(filters, 600);
   const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
   const classes = useStyles({vp: '0px'});
   const dispatch = useDispatch();


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

   useEffect(() => {
      if (message) {
         if (messageType === DELETE_TYPE) {
            Swal.fire('Eliminado', message, 'success');
            updateColeccion();
         }
      }
   }, [message]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      if (rows.length === 0) 
         setShowTable(false);
      else 
         setShowTable(true);
   }, [rows]);

   useEffect(() => {
      user && user.permisos.forEach((modulo) => {
         modulo.opciones.forEach((opcion) => {
            if (opcion.url === props.route.path) {
               setTitulo(opcion.nombre);
               const permisoAux = [];
               opcion.permisos.forEach((permiso) => {
                  if (permiso.permitido) 
                     permisoAux.push(permiso.titulo);
               });
               setPermisos(permisoAux);
            }
         });
      });
   }, [user, props.route]);

   useEffect(() => {
      dispatch(onGetColeccion(page, rowsPerPage, orderByToSend, identificacion, benefactor, fechaInicial, fechaFinal));
   }, [dispatch, page, rowsPerPage, debouncedFilters, orderByToSend]); // eslint-disable-line react-hooks/exhaustive-deps
  
   useEffect(() => {
      setPage(1);
   }, [debouncedFilters, orderByToSend]);

   const queryFilter = (e) => {
      setFilters({
         ...filters,
         [e.target.name]: e.target.value
      })
   }

   const limpiarFiltros = () => {
      setFilters(initialFilters);
   };

   const updateColeccion = () => {
      setPage(1);
      dispatch(onGetColeccion(page, rowsPerPage, orderByToSend, identificacion, benefactor, fechaInicial, fechaFinal));
   };

   const changeOrderBy = (id) => {
      if (orderBy === id) 
         if (order === 'asc') {
            setOrder('desc');
            setOrderByToSend(id + ':desc');
         } 
         else {
            setOrder('asc');
            setOrderByToSend(id + ':asc');
         }
      else {
         setOrder('asc');
         setOrderBy(id);
         setOrderByToSend(id + ':asc');
      }
   };

   const onOpenEditDonacion = (id) => {
      setDonacionSeleccionado(id);
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
            if (column.id === e.target.id) 
               return {...column, mostrar: !column.mostrar};
            else 
               return column;
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

   const onOpenViewDonacion = (id) => {
      setDonacionSeleccionado(id);
      setAccion('ver');
      setShowForm(true);
   };

   const onDeleteDonacion = (id) => {
      Swal.fire({
         title: 'Confirmar',
         text: '¿ Seguro que desea eliminar la Donacion ?',
         allowEscapeKey: false,
         allowEnterKey: false,
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         cancelButtonText: 'NO',
         confirmButtonText: 'SI',
      }).then((result) => {
            if (result.isConfirmed) 
               dispatch(onDelete(id));
         });
   };

   const onOpenAddDonacion = () => {
      setDonacionSeleccionado(0);
      setAccion('crear');
      setShowForm(true);
   };

   const handleOnClose = () => {
      setShowForm(false);
      setDonacionSeleccionado(0);
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

   const handleCloseSearcher = () => {
      setShowSearch(false);
   }

   const handleOpenSearcher = () => {
      setShowSearch(true);
   }

   const setSelectedPersona = (id) => {
      setFilters({
         ...filters,
         identificacion: id
      });
   }

   const onExportPago = (id) => {
      window.location.href = defaultConfig.API_URL+'/donaciones/'+id;
   }

   return (
      <div className = {classes.root}>
         <Paper className = {classes.paper}>
            { permisos && (
               <EnhancedTableToolbar
                  onOpenAddDonacion={onOpenAddDonacion}
                  handleOpenPopoverColumns={handleOpenPopoverColumns}
                  queryFilter={queryFilter}
                  limpiarFiltros={limpiarFiltros}
                  identificacion={identificacion}
                  benefactor={benefactor}
                  fechaInicial={fechaInicial}
                  fechaFinal={fechaFinal}
                  permisos={permisos}
                  titulo={titulo}
                  handleOnClose={handleCloseSearcher}
                  handleOnOpen={handleOpenSearcher}
                  showSearch={showSearch}
                  setSelectedPersona={setSelectedPersona}
               />)
            }
            { showTable && permisos 
               ? (<Box className = {classes.marcoTabla}>
                     <Box className = {classes.paginacion}>
                        <Box>
                           <p>{textoPaginacion}</p>
                        </Box>
                        <Box className = {classes.paginacion}>
                           <select
                              className = {classes.rowsPerPageOptions}
                              value = {rowsPerPage}
                              onChange = {handleChangeRowsPerPage}>
                              {rowsPerPageOptions.map((option) => {
                                 return (
                                    <option key = {option} value = {option}>
                                       {option}
                                    </option>
                                 );
                               })
                              }
                           </select>
                           <Pagination
                              showFirstButton
                              showLastButton
                              onChange = {handleChangePage}
                              count = {ultima_pagina}
                              page = {page}
                           />
                        </Box>
                     </Box>

                     <TableContainer>
                        <Table
                           className = {classes.table}
                           aria-labelledby = 'tableTitle'
                           size = {'small'}
                           aria-label = 'enhanced table'>
                           <EnhancedTableHead
                              classes = {classes}
                              numSelected = {selected.length}
                              order = {order}
                              orderBy = {orderBy}
                              onSelectAllClick = {handleSelectAllClick}
                              onRequestSort = {changeOrderBy}
                              rowCount = {rows.length}
                              columnasMostradas = {columnasMostradas}
                           />
                           <TableBody>
                              {rows.map((row, index) => {
                                 const isItemSelected = isSelected(row.name);
                                 return (
                                    <TableRow
                                       hover
                                       aria-checked = {isItemSelected}
                                       tabIndex = {-1}
                                       key = {row.id}
                                       selected = {isItemSelected}
                                       className = {classes.row}>
                                       <TableCell align = 'center' className = {classes.acciones}>
                                          {permisos.indexOf('Modificar') >= 0 && (
                                             <Tooltip title = {<IntlMessages id = 'boton.editar' />}>
                                                <EditIcon
                                                   onClick = {() => onOpenEditDonacion(row.id)}
                                                 className = {`${classes.generalIcons} ${classes.editIcon}`}>
                                                </EditIcon>
                                             </Tooltip>
                                          )}
                                          {permisos.indexOf('Listar') >= 0 && (
                                             <Tooltip title = {<IntlMessages id = 'boton.ver' />}>
                                                <VisibilityIcon
                                                   onClick = {() => onOpenViewDonacion(row.id)}
                                                   className = {`${classes.generalIcons} ${classes.visivilityIcon}`}>
                                                </VisibilityIcon>
                                            </Tooltip>
                                          )}
                                          {permisos.indexOf('Eliminar') >= 0 && (
                                             <Tooltip
                                                title = {<IntlMessages id = 'boton.eliminar' />}>
                                                <DeleteIcon
                                                   onClick = {() => onDeleteDonacion(row.id)}
                                                   className = {`${classes.generalIcons} ${classes.deleteIcon}`}>
                                                </DeleteIcon>
                                             </Tooltip>
                                          )}
                                          {permisos.indexOf('Exportar') >= 0 && (
                                             <Tooltip
                                                title={<IntlMessages id='boton.recibo' />}>
                                                <PictureAsPdf
                                                onClick={() => onExportPago(row.id)}
                                                style={{color: 'darkred'}}
                                                className={`${classes.generalIcons} ${classes.deleteIcon}`}/>
                                             </Tooltip>
                                          )}
                                       </TableCell>
                                       {columnasMostradas.map((columna) => {
                                          if (columna.mostrar) 
                                             return (
                                                <MyCell
                                                   useStyles = {useStyles}
                                                   key = {row.id + columna.id}
                                                   align = {columna.align}
                                                   width = {columna.width}
                                                   claseBase = {classes.cell}
                                                   value = {columna.value(row[columna.id])}
                                                   cellColor = {
                                                      columna.cellColor
                                                         ? columna.cellColor(row[columna.id])
                                                         : ''
                                                   }
                                                />
                                             );
                                          else 
                                             return <th key = {row.id + columna.id}></th>;
                                       })}
                                    </TableRow>
                                 );
                              })}
                           </TableBody>
                        </Table>
                     </TableContainer>

                     <Box className = {classes.paginacion}>
                        <Box>
                           <p>{textoPaginacion}</p>
                        </Box>
                        <Box className = {classes.paginacion}>
                           <select
                             className = {classes.rowsPerPageOptions}
                              value = {rowsPerPage}
                              onChange = {handleChangeRowsPerPage}>
                              {rowsPerPageOptions.map((option) => {
                                 return (
                                    <option key = {option} value = {option}>
                                       {option}
                                    </option>
                                );
                              })}
                           </select>
                           <Pagination
                              showFirstButton
                              showLastButton
                              onChange = {handleChangePage}
                              count = {ultima_pagina}
                              page = {page}
                           />
                        </Box>
                     </Box>
                  </Box>) 
               : permisos 
                  ? (<Box
                        component = 'h2'
                        padding = {4}
                        fontSize = {19}
                        className = {classes.marcoTabla}>
                        <IntlMessages id = 'sinResultados' />
                     </Box>) 
                  : (<Box
                        component = 'h2'
                        padding = {4}
                        fontSize = {19}
                        className = {classes.marcoTabla}>
                        <IntlMessages id = 'noAutorizado' />
                     </Box>)
            }
         </Paper>

         {showForm 
            ? (<DonacionCreador
               showForm = {showForm}
               donacion = {donacionSeleccionado}
               accion = {accion}
               handleOnClose = {handleOnClose}
               updateColeccion = {updateColeccion}
               titulo = {titulo}
            />) 
            : ('')
         }

         <Popover
            id = 'popoverColumns'
            open = {openPopOver}
            anchorEl = {popoverTarget}
            onClose = {handleClosePopover}
            anchorOrigin = {{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            transformOrigin = {{
               vertical: 'top',
               horizontal: 'center',
            }}>
            <Box className = {classes.popoverColumns}>
               {columnasMostradas.map((column) => {
                  return (
                     <FormControlLabel
                        key = {column.id}
                        control = {
                           <Switch
                              id = {column.id}
                              checked = {column.mostrar}
                              onChange = {handleOnchangeMostrarColumna}
                           />
                        }
                        label = {column.label}
                     />
                  );
               })}
               <Box>
                  <Button onClick = {showAllColumns}>Mostrar Todos</Button>
                  <Button onClick = {reiniciarColumns}>Reiniciar Vista</Button>
               </Box>
            </Box>
         </Popover>
         <MessageView
            variant = {
               messageType === UPDATE_TYPE || messageType === CREATE_TYPE
                  ? 'success'
                  : 'error'
            }
            message = {message||error}
         />
      </div>
   );
};

export default Donaciones;
