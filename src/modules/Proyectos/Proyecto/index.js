import React, {useState, useEffect} from 'react';
import {Box, Button, InputAdornment} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {Form, Formik} from 'formik';
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
import {
  onGetColeccion,
  onDelete,
} from '../../../redux/actions/ProyectoAction';
import {useDispatch, useSelector} from 'react-redux';
// import {onGetColeccionLigera as onGetColeccionLigeraFamilia} from 'redux/actions/FamiliaAction';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Search from '@material-ui/icons/Search';
import {history} from 'redux/store';
import {
  DATO_BOOLEAN,
  ZONA,
  ESTADOS_PROYECTO,
  TIPOS_PROYECTO,
  TIPOS_CUENTA_RECAUDO,
  ESTADOS_FORMALIZACION,
} from 'shared/constants/ListaValores';
import {
  UPDATE_TYPE,
  CREATE_TYPE,
  DELETE_TYPE,
} from 'shared/constants/Constantes';
import {MessageView} from '../../../@crema';
import {useDebounce} from 'shared/hooks/useDebounce';
import moment from 'moment';
import MyCell from 'shared/components/MyCell';
import MySearcher from 'shared/components/MySearcher';
import ProyectoCreador from './ProyectoCreador';
import Description from '@material-ui/icons/Description'
import { Money, Comment, Check } from '@material-ui/icons';
const currencyFormatter = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP'});

const stateColor = [
  {id: 'SOL', value: '#ECA313'},
  {id: 'EST', value: '#2397E2'},
  {id: 'APR', value: '#9C00B2'},
  {id: 'FOR', value: '#671DE1'},
  {id: 'DES', value: '#628233'},
  {id: 'REC', value: '#B20A0A'},
  {id: 'CAN', value: '#B20A0A'},
  {id: 'CON', value: '#B20A0A'},
]

const setCellColor = (value) => {
  const state = stateColor.find((state) => state.id === value);
  if(state){
    return state.value;
  }
  return 'transparent';
}
const cells = [
  {
    id: 'id',
    typeHead: 'numeric',
    label: 'Id Proyecto',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'solicitante',
    typeHead: 'string',
    label: 'Solicitante',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'proyectosEstadoProyecto',
    typeHead: 'string',
    label: 'Estado Proyecto',
    value: (value) => ESTADOS_PROYECTO.map((estadoProyecto) => (estadoProyecto.id === value ? estadoProyecto.nombre : '')),
    align: 'left',
    mostrarInicio: true,
    cellColor: (value) => setCellColor(value),
  },
  {
    id: 'proyectosFechaSolicitud',
    typeHead: 'string',
    label: 'Fecha Solicitud',
    value: (value) => moment(value).format('DD-MM-YYYY'),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'proyectosTipoProyecto',
    typeHead: 'string',
    label: 'Tipo Proyecto',
    value: (value) => TIPOS_PROYECTO.map((tipoProyecto) => (tipoProyecto.id === value ? tipoProyecto.nombre : '')),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'tipo_programa',
    typeHead: 'string',
    label: 'Tipo Programa',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosRemitido',
    typeHead: 'string',
    label: 'Remitido',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'remitente',
    typeHead: 'string',
    label: 'Remitente',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'pais',
    typeHead: 'string',
    label: 'Pais',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'departamento',
    typeHead: 'string',
    label: 'Departamento',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'ciudad',
    typeHead: 'string',
    label: 'Ciudad',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'comuna',
    typeHead: 'string',
    label: 'Comuna',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'barrio',
    typeHead: 'string',
    label: 'Barrio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosZona',
    typeHead: 'string',
    label: 'Zona',
    value: (value) => ZONA.map((zona) => (zona.id === value ? zona.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosDireccion',
    typeHead: 'string',
    label: 'Dirección',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosVisitaDomiciliaria',
    typeHead: 'string',
    label: 'Visita Domic.',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaVisitaDom',
    typeHead: 'string',
    label: 'Fecha Visita Domic.',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosPagoEstudioCre',
    typeHead: 'string',
    label: 'Pago Estudio Cré.',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosReqLicenciaCon',
    typeHead: 'string',
    label: 'Requiere Lic. Cond.',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaInicioEstudio',
    typeHead: 'string',
    label: 'Fecha Inicio Estudio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaAproRec',
    typeHead: 'string',
    label: 'Fecha Aprob. Rec.',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaEstInicioObr',
    typeHead: 'string',
    label: 'Fecha Inicio Obra',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorProyecto',
    typeHead: 'numeric',
    label: 'Valor Proyecto',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorSolicitud',
    typeHead: 'numeric',
    label: 'Valor Solicitud',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorRecursosSol',
    typeHead: 'numeric',
    label: 'Valor Recursos Solic.',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorSubsidios',
    typeHead: 'numeric',
    label: 'Valor Subsidios',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorDonaciones',
    typeHead: 'numeric',
    label: 'Valor Donaciones',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorCuotaAprobada',
    typeHead: 'numeric',
    label: 'Valor Cuota Aprob.',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorCapPagoMen',
    typeHead: 'numeric',
    label: 'Valor Cap. Pago Mens.',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorAprobado',
    typeHead: 'numeric',
    label: 'Valor Aprobado',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosValorSeguroVida',
    typeHead: 'numeric',
    label: 'Valor Seg. de Vida',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosTasaInteresNMV',
    typeHead: 'numeric',
    label: 'Tasa Int. NMV',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosTasaInteresEA',
    typeHead: 'numeric',
    label: 'Tasa EA',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosNumeroCuotas',
    typeHead: 'numeric',
    label: 'Num. Cuotas',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'banco',
    typeHead: 'string',
    label: 'Banco',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosTipoCuentaRecaudo',
    typeHead: 'string',
    label: 'Tipo Cuenta Rec.',
    value: (value) => TIPOS_CUENTA_RECAUDO.map((tipoCuentaRecaudo) => (tipoCuentaRecaudo.id === value ? tipoCuentaRecaudo.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosNumCuentaRecaudo',
    typeHead: 'numeric',
    label: 'Num. Cuenta Rec.',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'proyectosEstadoFormalizacion',
    typeHead: 'string',
    label: 'Id Proyecto',
    value: (value) => ESTADOS_FORMALIZACION.map((estadoForm) => (estadoForm.id === value ? estadoForm.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaAutNotaria',
    typeHead: 'string',
    label: 'Fecha Aut. Notaría',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaFirEscrituras',
    typeHead: 'string',
    label: 'Fecha Fir Escrituras',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaIngresosReg',
    typeHead: 'string',
    label: 'Fecha Ingresos Reg.',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosAutorizacionDes',
    typeHead: 'string',
    label: 'Autor. Desembolso',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaAutDes',
    typeHead: 'string',
    label: 'Fecha Aut. Desembolso',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosFechaCancelacion',
    typeHead: 'string',
    label: 'Fecha Cancelación',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'orientador',
    typeHead: 'string',
    label: 'Asesor',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'proyectosObservaciones',
    typeHead: 'string',
    label: 'Observaciones',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
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
  const {classes, order, orderBy, onRequestSort, columnasMostradas, buscador} = props;

  return (
    <TableHead>
      <TableRow className={classes.head}>
        <TableCell
          align='center'
          style={{fontWeight: 'bold'}}
          className={classes.headCellWoMargin}>
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
                  // onClick={createSortHandler(cell.id)}
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
        {buscador ? ('') : (
          <>
            <TableCell
              align='center'
              style={{fontWeight: 'bold'}}
              className={classes.headCellWoMargin}>
              {'Documentos'}
            </TableCell>
            <TableCell
              align='center'
              style={{fontWeight: 'bold'}}
              className={classes.headCellWoMargin}>
              {'Plan Amort. Inic.'}
            </TableCell>
            <TableCell
              align='center'
              style={{fontWeight: 'bold'}}
              className={classes.headCellWoMargin}>
              {'Plan Amort. Def.'}
            </TableCell>
            <TableCell
              align='center'
              style={{fontWeight: 'bold'}}
              className={classes.headCellWoMargin}>
              {'Bitácoras'}
            </TableCell>
          </>
        )}
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
  x: {
    position: 'absolute',
    color: '#4caf50',
    fontSize: '14px',
    top: '19px',
    fontWeight: 'bold',
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
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    titulo,
    onOpenAddProyecto,
    handleOpenPopoverColumns,
    queryFilter,
    solicitanteFiltro,
    tipoFiltro,
    fechaFiltro,
    estadoFiltro,
    limpiarFiltros,
    permisos,
    handleOnClose,
    handleOnOpen,
    showSearch,
    buscador,
    setSelectePersona
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
            { buscador ? (''): (
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
                        '/proyectos/proyecto' + 
                        '?solicitante=' +
                        solicitanteFiltro +
                        '&tipo=' +
                        tipoFiltro +
                        '&estado=' +
                        estadoFiltro +
                        '&fecha=' +
                        fechaFiltro
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
                <Tooltip
                  title='Crear Proyecto'
                  onClick={onOpenAddProyecto}>
                  <IconButton
                    className={classes.createButton}
                    aria-label='filter list'>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            )}
          </Box>
          <Box className={classes.contenedorFiltros}>
            <TextField
              label='Solicitante'
              name='solicitanteFiltro'
              id='solicitanteFiltro'
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
              value={solicitanteFiltro}
            />
            { showSearch && <MySearcher showForm={showSearch} handleOnClose={handleOnClose} getValue={setSelectePersona}/> }
            <TextField
              label='Estado Proyecto'
              name='estadoFiltro'
              id='estadoFiltro'
              select={true}
              onChange={queryFilter}
              value={estadoFiltro}>
              {ESTADOS_PROYECTO.map((estado) => {
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
            <TextField
              label='Tipo Proyecto'
              name='tipoFiltro'
              id='tipoFiltro'
              select
              onChange={queryFilter}
              value={tipoFiltro}>
              {TIPOS_PROYECTO.map((tipo) => {
              return (
                <MenuItem
                  value={tipo.id}
                  key={tipo.id}
                  id={tipo.id}
                  className={classes.pointer}>
                  {tipo.nombre}
                </MenuItem>
              );
            })}
            </TextField>
            <TextField
              label='Fecha Solicitud'
              name='fechaFiltro'
              id='fechaFiltro'
              type={'date'}
              InputLabelProps={{
                shrink: true
              }}
              onChange={queryFilter}
              value={fechaFiltro}>
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
          <Box className={classes.contenedorFiltros}>
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
  onOpenAddProyecto: PropTypes.func.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros: PropTypes.func.isRequired,
  solicitanteFiltro: PropTypes.string.isRequired,
  tipoFiltro: PropTypes.string.isRequired,
  fechaFiltro: PropTypes.string.isRequired,
  estadoFiltro: PropTypes.string.isRequired,
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
  linkDocumento: {
    textDecoration: 'underline',
    color: 'blue',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
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
  headCellWoMargin: {
    padding: '0px',
    width: 'max-content',
    fontSize: '14px',
    [theme.breakpoints.up('xl')]: {
      fontSize: '14px',
    },
  },
  row: {
    padding: 'none',
  },
  cell: (props) => ({
    fontSize: '13px',
    [theme.breakpoints.up('xl')]: {
      fontSize: '14px',
    },
    padding: props.vp + ' 0px ' + props.vp + ' 10px',
    whiteSpace: 'nowrap',
  }),
  cell2: (props) => ({
    fontSize: '13px',
    [theme.breakpoints.up('xl')]: {
      fontSize: '14px',
    },
    padding: props.vp + ' 0px ' + props.vp + ' 10px',
    whiteSpace: 'wrap',
  }),
  cellWidth: (props) => ({
    minWidth: props.width,
  }),
  cellColor: (props) => ({
    backgroundColor: props.cellColor,
    color: 'white',
  }),
  acciones: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 10px',
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
    height: '20px',
    [theme.breakpoints.up('xl')]: {
      height: '25px',
    },
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
  descargarIcon: {
    color: theme.palette.enviaEmailBottoms,
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

const initialFilters = {
  solicitanteFiltro: '',
  tipoFiltro: '',
  fechaFiltro: '',
  estadoFiltro: '',
};

const Proyecto = (props) => {
  const {buscador, onSelectProyecto} = props;
  const [showForm, setShowForm] = useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState(
    'fecha_modificacion:desc',
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const dense = true; //Borrar cuando se use el change
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPageOptions = [5, 10, 15, 25, 50];
  const [showSearch, setShowSearch] = useState(false);

  const {rows, desde, hasta, ultima_pagina, total} = useSelector(
    ({proyectoReducer}) => proyectoReducer,
  );

  const {message, error, messageType} = useSelector(({common}) => common);
  useEffect(() => {
    if (message || error) {
      if (messageType === DELETE_TYPE) {
        Swal.fire('Eliminado', message, 'success');
        updateColeccion();
      }
    }
  }, [message, error]); // eslint-disable-line react-hooks/exhaustive-deps

  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const [filters, setFilters] = useState(initialFilters)
  const {
    solicitanteFiltro,
    tipoFiltro,
    fechaFiltro,
    estadoFiltro,
  } = filters;
  const debouncedFilters = useDebounce(filters, 800);
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
  const [showTable, setShowTable] = useState(true);
  
  useEffect(() => {
    if (rows.length === 0) {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
  }, [rows]);

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
    dispatch(
      onGetColeccion(
        page,
        rowsPerPage,
        orderByToSend,
        solicitanteFiltro,
        tipoFiltro,
        estadoFiltro,
        fechaFiltro,
      ),
    );
  }, [ //eslint-disable-line
    dispatch,
    page,
    rowsPerPage,
    debouncedFilters,
    orderByToSend,
  ]);

  const updateColeccion = () => {
    setPage(1);
    dispatch(
      onGetColeccion(
        page,
        rowsPerPage,
        orderByToSend,
        solicitanteFiltro,
        tipoFiltro,
        estadoFiltro,
        fechaFiltro,
      ),
    );
  };
  useEffect(() => {
    setPage(1);
  }, [
    orderByToSend,
    debouncedFilters,
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

  const onOpenEditProyecto = (id, state) => {
    history.push(history.location.pathname + '/editar/' + id, {state});
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

  const onOpenViewProyecto = (id, state) => {
    history.push(history.location.pathname + '/ver/' + id, {state});
  };

  const onDeleteProyecto = (id) => {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Seguro Que Desea Eliminar El Proyecto?',
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(onDelete(id));
      }
    });
  };

  const onGoDocumentosProyecto = (proyecto_id) => {
    history.push('/documentos-proyecto/'+proyecto_id);
  };

  const onGoPlanAmortizacion = (proyecto_id) => {
    history.push('/plan-amortizacion/'+proyecto_id);
  };

  const onGoPlanAmortizacionDefinitivo = (proyecto_id) => {
    history.push('/plan-amortizacion-definitivo/'+proyecto_id);
  };

  const onGoBitacorasProyecto = (proyecto_id) => {
    history.push('/bitacoras-proyecto/'+proyecto_id);
  };

  const onOpenAddProyecto = () => {
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
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

  const handleCloseSearcher = () => {
    setShowSearch(false);
  }

  const handleOpenSearcher = () => {
    setShowSearch(true);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;


  const setSelectePersona = (id) => {
    setFilters({
      ...filters,
      solicitanteFiltro: id
    });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            onOpenAddProyecto={onOpenAddProyecto}
            handleOpenPopoverColumns={handleOpenPopoverColumns}
            queryFilter={queryFilter}
            limpiarFiltros={limpiarFiltros}
            solicitanteFiltro={solicitanteFiltro}
            tipoFiltro={tipoFiltro}
            fechaFiltro={fechaFiltro}
            estadoFiltro={estadoFiltro}
            permisos={permisos}
            titulo={titulo}
            handleOnClose={handleCloseSearcher}
            handleOnOpen={handleOpenSearcher}
            showSearch={showSearch}
            setSelectePersona={setSelectePersona}
            buscador={buscador}
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
                  buscador={buscador}
                />
                <TableBody>
                  {
                    rows.map((row, index) => {
                      const isItemSelected = isSelected(row.name);

                      return (
                        <TableRow
                          hover
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          className={classes.row}>
                          <TableCell
                            align='center'
                            className={classes.acciones}>
                            { buscador ? (
                              <Tooltip
                                title={'Seleccionar'}>
                                <Check
                                  onClick={() => onSelectProyecto(row.id)}
                                  className={`${classes.generalIcons} ${classes.editIcon}`}></Check>
                              </Tooltip>
                            ) : ( 
                              <>
                                {permisos.indexOf('Modificar') >= 0 && (
                                  <Tooltip
                                    title={<IntlMessages id='boton.editar' />}>
                                    <EditIcon
                                      onClick={() => onOpenEditProyecto(row.id, row.proyectosEstadoProyecto)}
                                      className={`${classes.generalIcons} ${classes.editIcon}`}></EditIcon>
                                  </Tooltip>
                                )}
                                {permisos.indexOf('Listar') >= 0 && (
                                  <Tooltip title={<IntlMessages id='boton.ver' />}>
                                    <VisibilityIcon
                                      onClick={() => onOpenViewProyecto(row.id, row.proyectosEstadoProyecto)}
                                      className={`${classes.generalIcons} ${classes.visivilityIcon}`}></VisibilityIcon>
                                  </Tooltip>
                                )}
                                {permisos.indexOf('Eliminar') >= 0 && (
                                  <Tooltip
                                    title={<IntlMessages id='boton.eliminar' />}>
                                    <DeleteIcon
                                      onClick={() => onDeleteProyecto(row.id)}
                                      className={`${classes.generalIcons} ${classes.deleteIcon}`}></DeleteIcon>
                                  </Tooltip>
                                )}
                              </> 
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
                          { buscador ? (''): (
                            <>
                              <TableCell align='center' className={classes.cell}>
                                <Tooltip title={'Documentos'}>
                                  <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Description 
                                      style={{
                                        color: '#001597'
                                      }}
                                      onClick={() => onGoDocumentosProyecto(row.id)}
                                      className={`${classes.generalIcons}`}/>
                                  </Box>
                                </Tooltip>
                              </TableCell>
                              <TableCell align='center' className={classes.cell2}>
                                <Tooltip title={'Plan Amort. Ini.'}>
                                  <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Money 
                                      style={{
                                        color: '#ff9800'
                                      }}
                                      onClick={() => onGoPlanAmortizacion(row.id)}
                                      className={`${classes.generalIcons}`}/>
                                  </Box>
                                </Tooltip>
                              </TableCell>
                              <TableCell align='center' className={classes.cell2}>
                                <Tooltip title={'Plan Amort. Def.'}>
                                  <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Money 
                                      style={{
                                        color: '#009705'
                                      }}
                                      onClick={() => onGoPlanAmortizacionDefinitivo(row.id)}
                                      className={`${classes.generalIcons}`}/>
                                  </Box>
                                </Tooltip>
                              </TableCell>
                              <TableCell align='center' className={classes.cell2}>
                                <Tooltip title={'Bitácoras'}>
                                  <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Comment 
                                      onClick={() => onGoBitacorasProyecto(row.id)}
                                      className={`${classes.generalIcons}`}/>
                                  </Box>
                                </Tooltip>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    })
                  }
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
        <ProyectoCreador
          showForm={showForm}
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
            ? message
            : ''
        }
      />
    </div>
  );
};

export default Proyecto;
