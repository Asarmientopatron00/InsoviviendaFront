import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import {
  onGetColeccionVencidas,
  // onDelete,
} from '../../../redux/actions/PlanAmortizacionDefinitivoAction';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import TextField from '@material-ui/core/TextField';
import {
  UPDATE_TYPE,
  CREATE_TYPE,
} from 'shared/constants/Constantes';
import { MessageView } from '../../../@crema';
import MyCell from 'shared/components/MyCell';
import moment from 'moment';
import { Search } from '@material-ui/icons';
import MyProjectSearcher from 'shared/components/MyProjectSearcher';
import PagoEspecialCreador from './PagoEspecialCreador';

const currencyFormatter = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

const cells = [
  {
    id: 'plAmDeNumeroCuota',
    typeHead: 'numeric',
    label: 'Cuota',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeFechaVencimientoCuota',
    typeHead: 'string',
    label: 'Fecha Vencimiento',
    value: (value) => value ? moment(value).format('DD-MM-YYYY') : '',
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeValorSaldoCapital',
    typeHead: 'numeric',
    label: 'Saldo Capital',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeValorCapitalCuota',
    typeHead: 'numeric',
    label: 'Capital Cuota',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeValorInteresCuota',
    typeHead: 'numeric',
    label: 'Interés Cuota',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeValorSeguroCuota',
    typeHead: 'numeric',
    label: 'Seguro Cuota',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'totalCuota',
    typeHead: 'numeric',
    label: 'Total Cuota',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeValorInteresMora',
    typeHead: 'numeric',
    label: 'Interés Mora',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeDiasMora',
    typeHead: 'numeric',
    label: 'Días Mora',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'plAmDeFechaUltimoPagoCuota',
    typeHead: 'string',
    label: 'Fecha Pago',
    value: (value) => value ? moment(value).format('DD-MM-YYYY') : '',
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'plAmDeCuotaCancelada',
    typeHead: 'boolean',
    label: 'Cancelada',
    value: (value) => (value === 'S' ? 'Sí' : 'No'),
    align: 'center',
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
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    columnasMostradas,
    onSelectAllClick,
    numSelected,
    rowCount
  } = props;

  return (
    <TableHead>
      <TableRow className={classes.head}>
        <TableCell
          align='center'
          style={{ fontWeight: 'bold' }}
          className={classes.headCell}>
          <Tooltip title={'Seleccionar Todas'}>
            <Checkbox
              checked={rowCount > 0 && numSelected === rowCount}
              onClick={(e) => onSelectAllClick(e)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Tooltip>
        </TableCell>
        {columnasMostradas.map((cell, index) => {
          if (cell.mostrar) {
            return (
              <TableCell
                className={index === 1 || index === 8 ? classes.cell2 : classes.cell}
                key={cell.id}
                style={{ fontWeight: 'bold' }}
                align={cell.typeHead === 'string' ? 'left' : cell.typeHead === 'numeric' ? 'right' : 'center'}
                sortDirection={orderBy === cell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : 'asc'}
                  onClick={() => { onRequestSort(cell.id) }}
                >
                  {cell.label}
                  {orderBy === cell.id
                    ? (<span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'
                      }
                    </span>)
                    : null
                  }
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <th key={cell.id}></th>;
          }
        })
        }
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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
  },
  linkDocumento: {
    textDecoration: 'underline',
    color: 'blue',
    textAlign: 'center',
    '&:hover': {
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
    handleOpenPopoverColumns,
    titulo,
    queryFilter,
    proyecto_id,
    handleOnClose,
    handleOnOpen,
    setSelectedProyecto,
    showSearch,
  } = props;

  return (
    <Toolbar className={clsx(classes.root)}>
      <>
        <Box className={classes.titleTop}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <Typography
              className={classes.title}
              variant='h6'
              id='tableTitle'
              component='div'>
              {titulo}
            </Typography>
          </Box>
          <Box className={classes.horizontalBottoms}>
            <Tooltip
              title='Mostrar/Ocultar Columnas'
              onClick={handleOpenPopoverColumns}>
              <IconButton
                className={classes.columnFilterButton}
                aria-label='filter list'>
                <TuneIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box className={classes.contenedorFiltros}>
          <TextField
            label='Número Proyecto'
            name='proyecto_id'
            id='proyecto_id'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleOnOpen}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={queryFilter}
            value={proyecto_id}
          />
          {showSearch && <MyProjectSearcher showForm={showSearch} handleOnClose={handleOnClose} getValue={setSelectedProyecto} />}
        </Box>
      </>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  handleOpenPopoverColumns: PropTypes.func.isRequired,
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
  cell2: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
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

const rowsPerPageOptions = [5, 10, 15, 25, 50, 100, 250];

const PagoEspecial = (props) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState(
    'plAmDeNumeroCuota:asc',
  );
  const [permisos, setPermisos] = useState('');
  const [showTable, setShowTable] = useState(true);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const dense = true; //Borrar cuando se use el change
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [proyecto_id, setProyectoId] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const [titulo, setTitulo] = useState('');
  // const {pathname}=useLocation();
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

  const classes = useStyles({ vp: '0px' });
  const dispatch = useDispatch();

  const { user } = useSelector(({ auth }) => auth);
  const { rows, desde, hasta, ultima_pagina, total } = useSelector(
    ({ planAmortizacionDefinitivoReducer }) => planAmortizacionDefinitivoReducer,
  );
  const { message, messageType, error } = useSelector(({ common }) => common);
  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  
  useEffect(() => {
    if (rows.length === 0)
      setShowTable(false);
    else
      setShowTable(true);
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
    dispatch(onGetColeccionVencidas(page, rowsPerPage, orderByToSend, proyecto_id));
  }, [dispatch, page, rowsPerPage, orderByToSend, proyecto_id]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeOrderBy = (id) => {
    if (orderBy === id) {
      if (order === 'asc') {
        setOrder('desc');
        setOrderByToSend(id + ':desc');
      }
      else {
        setOrder('asc');
        setOrderByToSend(id + ':asc');
      }
    }
    else {
      setOrder('asc');
      setOrderBy(id);
      setOrderByToSend(id + ':asc');
    }
  };

  const handleClosePopover = () => {
    setOpenPopOver(false);
    setPopoverTarget(null);
  };

  const handleOpenPopoverColumns = (e) => {
    setPopoverTarget(e.currentTarget);
    setOpenPopOver(true);
  };

  const queryFilter = (e) => {
    switch (e.target.name) {
      case 'proyecto_id':
        setProyectoId(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleOnchangeMostrarColumna = (e) => {
    let aux = columnasMostradas;
    setColumnasMostradas(
      aux.map((column) => {
        if (column.id === e.target.id)
          return {
            ...column,
            mostrar: !column.mostrar
          };
        else
          return column;
      }),
    );
  };

  const showAllColumns = () => {
    let aux = columnasMostradas;
    setColumnasMostradas(
      aux.map((column) => {
        return {
          ...column,
          mostrar: true
        };
      }),
    );
  };

  const reiniciarColumns = () => {
    setColumnasMostradas(columnasMostradasInicial);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const calcTotal = (row) => {
    const total =
      parseFloat(row['plAmDeValorCapitalCuota']) +
      parseFloat(row['plAmDeValorInteresCuota']) +
      parseFloat(row['plAmDeValorSeguroCuota']);
    return total;
  }

  const handleCloseSearcher = () => {
    setShowSearch(false);
  }

  const handleOpenSearcher = () => {
    setShowSearch(true);
  }

  const setSelectedProyecto = (id) => {
    setProyectoId(id);
  }

  const selectRow = (row) => {
    const currentRows = [...selected];
    currentRows.push(row);
    setSelected(currentRows);
  }

  const checkRow = (id) => {
    const exists = selected.find((row) =>  row.id === id);
    if(exists){
      return true
    }
    return false
  }

  const unSelectRow = (id) => {
    const currentRows = [...selected];
    const index = currentRows.findIndex((element) => element.id === id);
    if(index !== -1){
      currentRows.splice(index, 1);
      setSelected(currentRows);
    } 
  }

  const quoteNumber = () => {
    const minRow = Math.min(...rows.map((row) => row.plAmDeNumeroCuota));
    const maxSelected = Math.max(...selected.map((row) => row.plAmDeNumeroCuota));
    const minSelected = Math.min(...selected.map((row) => row.plAmDeNumeroCuota)); 
    return {minRow, maxSelected, minSelected}
  }

  const resetForm = () => {
    setSelected([]);
    setProyectoId('');
  }

  const handleCheckAll = (e) => {
    if(e.target.checked){
      setSelected(rows);
    } else {
      setSelected([]);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            handleOpenPopoverColumns={handleOpenPopoverColumns}
            permisos={permisos}
            proyecto_id={proyecto_id}
            queryFilter={queryFilter}
            setSelectedProyecto={setSelectedProyecto}
            handleOnClose={handleCloseSearcher}
            handleOnOpen={handleOpenSearcher}
            showSearch={showSearch}
            titulo={titulo}
          />
        )}
        {showTable && permisos
          ? (<Box className={classes.marcoTabla}>
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
                  rowCount={rows.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleCheckAll}
                  onRequestSort={changeOrderBy}
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
                        <TableCell align='center' className={classes.acciones}>
                          {permisos.indexOf('Crear') >= 0 && (
                            <Tooltip title={<IntlMessages id='boton.select' />}>
                              <Checkbox
                                checked={checkRow(row.id)}
                                onClick={(e) => {
                                  if(e.target.checked){
                                    selectRow(row)
                                  } else {
                                    unSelectRow(row.id)
                                  }
                                }}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Tooltip>
                          )}
                        </TableCell>
                        {
                          columnasMostradas.map((columna) => {
                            if (columna.mostrar) return (
                              <MyCell
                                useStyles={useStyles}
                                key={row.id + columna.id}
                                align={columna.align}
                                width={columna.width}
                                claseBase={classes.cell}
                                value={columna.value(
                                  columna.id === 'totalCuota'
                                    ? calcTotal(row)
                                    : row[columna.id]
                                )}
                                cellColor={
                                  columna.cellColor
                                    ? columna.cellColor(row[columna.id])
                                    : ''
                                }
                              />
                            );
                            else
                              return <th key={row.id + columna.id}></th>;
                          })
                        }
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
          </Box>)
          : permisos
            ? (<Box
              component='h2'
              padding={4}
              fontSize={19}
              className={classes.marcoTabla}>
              <IntlMessages id='sinResultados' />
            </Box>)
            : (<Box
              component='h2'
              padding={4}
              fontSize={19}
              className={classes.marcoTabla}>
              <IntlMessages id='noAutorizado' />
            </Box>)
        }
      </Paper>

      { selected.length > 0 && 
        <Box className={classes.marcoTabla}>
          <PagoEspecialCreador
            selected={selected}
            proyecto_id={proyecto_id}
            cuotaInferior={quoteNumber().minRow}
            cuotaSuperiorSeleccionada={quoteNumber().maxSelected}
            cuotaInferiorSeleccionada={quoteNumber().minSelected}
            resetForm={resetForm}
          />
        </Box>
      }

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
        message={message?message:error}
      />
    </div>
  );
};

export default PagoEspecial;
