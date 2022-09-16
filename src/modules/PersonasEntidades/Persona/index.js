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
import { Check, Search } from '@material-ui/icons';
import {
  onGetColeccion,
  onDelete,
} from '../../../redux/actions/PersonaAction';
import {useDispatch, useSelector} from 'react-redux';
// import {onGetColeccionLigera as onGetColeccionLigeraBarrio} from 'redux/actions/BarrioAction';
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
import {history} from 'redux/store';
import {
  GENERO,
  ESTADO_TRAMITE,
  ESTADO_REGISTRO,
  CATEGORIA_APORTES,
  DATO_BOOLEAN,
  ZONA,
  ESTRATO,
  TIPO_PROPIEDAD,
  INDICATIVO_PC,
  TIPO_TRABAJO,
  TIPO_CONTRATO,
  SEGURIDAD_SOCIAL,
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
import MySearcherFamily from 'shared/components/MyFamilySearcher';

const currencyFormatter = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP'});

const {
  theme: {palette},
} = defaultConfig;

const cells2 = [
  {
    id: 'personasIdentificacion',
    typeHead: 'numeric',
    label: 'Identificacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'nombre',
    typeHead: 'string',
    label: 'Nombre',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'personasCategoriaAportes',
    typeHead: 'string',
    label: 'Categoría',
    value: (value) => CATEGORIA_APORTES.map((catAp) => (catAp.id === value ? catAp.nombre : '')),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'identificacion_persona',
    typeHead: 'numeric',
    label: 'Familia Id',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'personasEstadoRegistro',
    typeHead: 'string',
    label: 'Est. Registro',
    value: (value) => ESTADO_REGISTRO.map((estReg) => (estReg.id === value ? estReg.nombre : '')),
    align: 'left',
    mostrarInicio: true,
  },
];

const cells = [
  {
    id: 'tipIdeDescripcion',
    typeHead: 'string',
    label: 'Tipo Identificacion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'personasIdentificacion',
    typeHead: 'numeric',
    label: 'Identificacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'nombre',
    typeHead: 'string',
    label: 'Nombre',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'personasFechaVinculacion',
    typeHead: 'string',
    label: 'Fecha Vinculacion',
    value: (value) => moment(value).format('YYYY-MM-DD'),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'personasCategoriaAportes',
    typeHead: 'string',
    label: 'Categoría',
    value: (value) => CATEGORIA_APORTES.map((catAp) => (catAp.id === value ? catAp.nombre : '')),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'personasFechaNacimiento',
    typeHead: 'string',
    label: 'Fecha Nacimiento',
    value: (value) => moment(value).format('YYYY-MM-DD'),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'identificacion_persona',
    typeHead: 'numeric',
    label: 'Familia Id',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'personasEstadoTramite',
    typeHead: 'string',
    label: 'Est. Tramite',
    value: (value) => ESTADO_TRAMITE.map((estTra) => (estTra.id === value ? estTra.nombre : '')),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'personasEstadoRegistro',
    typeHead: 'string',
    label: 'Est. Registro',
    value: (value) => ESTADO_REGISTRO.map((estReg) => (estReg.id === value ? estReg.nombre : '')),
    align: 'left',
    mostrarInicio: true,
    cellColor: (value) => value === 'AC' 
         ? palette.secondary.main 
         : palette.secondary.red,
  },
  {
    id: 'paisesDescripcion',
    typeHead: 'string',
    label: 'Pais Nacimiento',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'depNacimiento',
    typeHead: 'string',
    label: 'Depto. Nacimiento',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'ciuNacimiento',
    typeHead: 'string',
    label: 'Ciudad Nacimiento',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasGenero',
    typeHead: 'string',
    label: 'Género',
    value: (value) => GENERO.map((genero) => (genero.id === value ? genero.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'estCivDescripcion',
    typeHead: 'string',
    label: 'Est. Civil',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'tipParDescripcion',
    typeHead: 'string',
    label: 'Tipo Parentesco',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'tipPobDescripcion',
    typeHead: 'string',
    label: 'Tipo Poblacion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'tipDisDescripcion',
    typeHead: 'string',
    label: 'Tipo Discapacidad',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasSeguridadSocial',
    typeHead: 'string',
    label: 'Seg. Social',
    value: (value) => SEGURIDAD_SOCIAL.map((segSoc) => (segSoc.id === value ? segSoc.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'epsDescripcion',
    typeHead: 'string',
    label: 'EPS',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'graEscDescripcion',
    typeHead: 'string',
    label: 'Grado Escolaridad',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasVehiculo',
    typeHead: 'string',
    label: 'Vehiculo',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasCorreo',
    typeHead: 'string',
    label: 'Correo',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'departamentosDescripcion',
    typeHead: 'string',
    label: 'Departamento',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'ciudadesDescripcion',
    typeHead: 'string',
    label: 'Ciudad',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'comunasDescripcion',
    typeHead: 'string',
    label: 'Comuna',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'barriosDescripcion',
    typeHead: 'string',
    label: 'Barrio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasDireccion',
    typeHead: 'string',
    label: 'Direccion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasZona',
    typeHead: 'string',
    label: 'Zona',
    value: (value) => ZONA.map((zona) => (zona.id === value ? zona.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasEstrato',
    typeHead: 'numeric',
    label: 'Estrato',
    value: (value) => ESTRATO.map((estrato) => (estrato.id === value ? estrato.nombre : '')),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasTelefonoCasa',
    typeHead: 'numeric',
    label: 'Tel. Casa',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasTelefonoCelular',
    typeHead: 'numeric',
    label: 'Tel. Celular',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'tipVivDescripcion',
    typeHead: 'string',
    label: 'Tipo Vivienda',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasTipoPropiedad',
    typeHead: 'string',
    label: 'Tipo Propiedad',
    value: (value) => TIPO_PROPIEDAD.map((tipPro) => (tipPro.id === value ? tipPro.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasNumeroEscritura',
    typeHead: 'numeric',
    label: 'Núm. Escritura',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasNotariaEscritura',
    typeHead: 'numeric',
    label: 'Notaria Escritura',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasFechaEscritura',
    typeHead: 'string',
    label: 'Fecha Escritura',
    value: (value) => moment(value).format('YYYY-MM-DD'),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasIndicativoPC',
    typeHead: 'string',
    label: 'Indicativo PC',
    value: (value) => INDICATIVO_PC.map((IndPC) => (IndPC.id === value ? IndPC.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasNumeroHabitaciones',
    typeHead: 'numeric',
    label: 'Núm. Habitaciones',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasNumeroBanos',
    typeHead: 'numeric',
    label: 'Núm. Baños',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'tipTecDescripcion',
    typeHead: 'string',
    label: 'Tipo Techo',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'tipPisDescripcion',
    typeHead: 'string',
    label: 'Tipo Piso',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'tipDivDescripcion',
    typeHead: 'string',
    label: 'Tipo División',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasSala',
    typeHead: 'string',
    label: 'Sala',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasComedor',
    typeHead: 'string',
    label: 'Comedor',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasCocina',
    typeHead: 'string',
    label: 'Cocina',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasPatio',
    typeHead: 'string',
    label: 'Patio',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasTerraza',
    typeHead: 'string',
    label: 'Terraza',
    value: (value) => DATO_BOOLEAN.map((dato) => (dato.id === value ? dato.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'ocupacionesDescripcion',
    typeHead: 'string',
    label: 'Ocupación',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasTipoTrabajo',
    typeHead: 'string',
    label: 'Tipo Trabajo',
    value: (value) => TIPO_TRABAJO.map((tipTra) => (tipTra.id === value ? tipTra.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasTipoContrato',
    typeHead: 'string',
    label: 'Tipo Contrato',
    value: (value) => TIPO_CONTRATO.map((tipCon) => (tipCon.id === value ? tipCon.nombre : '')),
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasNombreEmpresa',
    typeHead: 'string',
    label: 'Empresa',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasTelefonoEmpresa',
    typeHead: 'string',
    label: 'Teléfono Empresa',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasPuntajeProcredito',
    typeHead: 'numeric',
    label: 'Punt. Procrédito',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasPuntajeDatacredito',
    typeHead: 'numeric',
    label: 'Punt. Datacrédito',
    value: (value) => value,
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'depCorr',
    typeHead: 'string',
    label: 'Depto. Correspondencia',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'ciuCorr',
    typeHead: 'string',
    label: 'Ciudad Correspondencia',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'comCorr',
    typeHead: 'string',
    label: 'Comuna Correspondencia',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'barCorr',
    typeHead: 'string',
    label: 'Barrio Correspondencia',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasCorDireccion',
    typeHead: 'string',
    label: 'Dir. Correspondencia',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasCorTelefono',
    typeHead: 'string',
    label: 'Tel. Correspondencia',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasIngresosFormales',
    typeHead: 'numeric',
    label: 'Ing. Formales',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasIngresosInformales',
    typeHead: 'numeric',
    label: 'Ing. Informales',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasIngresosArriendo',
    typeHead: 'numeric',
    label: 'Ing. Arriendo',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasIngresosSubsidios',
    typeHead: 'numeric',
    label: 'Ing. Subsidio',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasIngresosPaternidad',
    typeHead: 'numeric',
    label: 'Ing. Paternidad',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasIngresosTerceros',
    typeHead: 'numeric',
    label: 'Ing. Terceros',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasIngresosOtros',
    typeHead: 'numeric',
    label: 'Ing. Otros',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasAportesFormales',
    typeHead: 'numeric',
    label: 'Apor. Formales',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasAportesInformales',
    typeHead: 'numeric',
    label: 'Apor. Informales',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasAportesArriendo',
    typeHead: 'numeric',
    label: 'Apor. Arriendo',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasAportesSubsidios',
    typeHead: 'numeric',
    label: 'Apor. Subsidio',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasAportesPaternidad',
    typeHead: 'numeric',
    label: 'Apor. Paternidad',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasAportesTerceros',
    typeHead: 'numeric',
    label: 'Apor. Terceros',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasAportesOtros',
    typeHead: 'numeric',
    label: 'Apor. Otros',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
    mostrarInicio: false,
  },
  {
    id: 'personasRefNombre1',
    typeHead: 'string',
    label: 'Referencia 1',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasRefTelefono1',
    typeHead: 'string',
    label: 'Tel. Ref. 1',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasRefNombre2',
    typeHead: 'string',
    label: 'Referencia 2',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasRefTelefono2',
    typeHead: 'string',
    label: 'Tel. Ref. 2',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'personasObservaciones',
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
  const {classes, order, orderBy, onRequestSort, columnasMostradas} = props;

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
        {/* <TableCell
          align='center'
          style={{fontWeight: 'bold'}}
          className={classes.headCellWoMargin}>
          {'Datos Adicionales'}
        </TableCell> */}
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
    gridTemplateColumns: '4fr 4fr 4fr 1fr',
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
    onOpenAddPersona,
    handleOpenPopoverColumns,
    queryFilter,
    nombreFiltro,
    numeroDocumentoFiltro,
    familiaFiltro,
    categoriaApFiltro,
    estadoFiltro,
    limpiarFiltros,
    permisos,
    buscador,
    handleOnClose,
    handleOnOpen,
    showSearch,
    setSelecteFamilia
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
                        '/personas/informe-personas' +
                        '?nombre=' +
                        nombreFiltro +
                        '&identificacion=' +
                        numeroDocumentoFiltro +
                        '&familia=' +
                        familiaFiltro +
                        '&categoriaAp=' +
                        categoriaApFiltro +
                        '&estado=' +
                        estadoFiltro
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
                  title='Crear Persona'
                  onClick={onOpenAddPersona}>
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
              label='Identificacion'
              name='numeroDocumentoFiltro'
              id='numeroDocumentoFiltro'
              onChange={queryFilter}
              value={numeroDocumentoFiltro}
            />
            <TextField
              label='Estado'
              name='estadoFiltro'
              id='estadoFiltro'
              select={true}
              onChange={queryFilter}
              value={estadoFiltro}>
              {ESTADO_REGISTRO.map((estado) => {
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
              label='Categoria Aportes'
              name='categoriaApFiltro'
              id='categoriaApFiltro'
              select={true}
              onChange={queryFilter}
              value={categoriaApFiltro}>
              {CATEGORIA_APORTES.map((estado) => {
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
          </Box>
          <Box className={classes.contenedorFiltros}>
            <TextField
              label='Nombres y/o Apellidos'
              name='nombreFiltro'
              id='nombreFiltro'
              onChange={queryFilter}
              value={nombreFiltro}
            />
            <TextField
              label='Familia'
              name='familiaFiltro'
              id='familiaFiltro'
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
              value={familiaFiltro}
            />
            { showSearch && <MySearcherFamily showForm={showSearch} handleOnClose={handleOnClose} getValue={setSelecteFamilia}/> }
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
  onOpenAddPersona: PropTypes.func.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros: PropTypes.func.isRequired,
  nombreFiltro: PropTypes.string.isRequired,
  numeroDocumentoFiltro: PropTypes.string.isRequired,
  familiaFiltro: PropTypes.string.isRequired,
  categoriaApFiltro: PropTypes.string.isRequired,
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
}));

const initialFilters = {
  nombreFiltro: '',
  numeroDocumentoFiltro: '',
  familiaFiltro: '',
  categoriaApFiltro: '',
  estadoFiltro: '',
};

const Persona = (props) => {
  const {buscador, onSelectPersona} = props;
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
    ({personaReducer}) => personaReducer,
  );

  const {message, error, messageType} = useSelector(({common}) => common);
  useEffect(() => {
    if (message || error) {
      if (messageType === DELETE_TYPE) {
        Swal.fire('Eliminada', message, 'success');
        updateColeccion();
      }
    }
  }, [message, error]); // eslint-disable-line react-hooks/exhaustive-deps

  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const [filters, setFilters] = useState(initialFilters);
  const {
    nombreFiltro,
    numeroDocumentoFiltro,
    familiaFiltro,
    categoriaApFiltro,
    estadoFiltro,
  } = filters;
  const debouncedFilters = useDebounce(filters, 800);
  const [openPopOver, setOpenPopOver] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);

  let columnasMostradasInicial = [];

  if(buscador){
    cells2.forEach((cell) => {
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
  } else {
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
  }

  const [columnasMostradas, setColumnasMostradas] = useState(
    columnasMostradasInicial,
  );

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }
  const classes = useStyles({vp: vp});
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(onGetColeccionLigeraFamilia());
  }, [dispatch]);

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
        nombreFiltro,
        numeroDocumentoFiltro,
        familiaFiltro,
        categoriaApFiltro,
        estadoFiltro,
        orderByToSend,
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
        nombreFiltro,
        numeroDocumentoFiltro,
        familiaFiltro,
        categoriaApFiltro,
        estadoFiltro,
        orderByToSend,
      ),
    );
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
    })
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

  const onOpenEditPersona = (id) => {
    history.push(history.location.pathname + '/editar/' + id);
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

  const onOpenViewPersona = (id) => {
    history.push(history.location.pathname + '/ver/' + id);
  };

  const onDeletePersona = (id) => {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Seguro Que Desea Eliminar La Persona?',
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

  const onOpenAddPersona = () => {
    history.push(history.location.pathname + '/crear');
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

  const setSelecteFamilia = (id) => {
    setFilters({
      ...filters,
      familiaFiltro: id
    });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            onOpenAddPersona={onOpenAddPersona}
            handleOpenPopoverColumns={handleOpenPopoverColumns}
            queryFilter={queryFilter}
            limpiarFiltros={limpiarFiltros}
            nombreFiltro={nombreFiltro}
            numeroDocumentoFiltro={numeroDocumentoFiltro}
            familiaFiltro={familiaFiltro}
            categoriaApFiltro={categoriaApFiltro}
            estadoFiltro={estadoFiltro}
            permisos={permisos}
            titulo={titulo}
            buscador={buscador}
            handleOnClose={handleCloseSearcher}
            handleOnOpen={handleOpenSearcher}
            showSearch={showSearch}
            setSelecteFamilia={setSelecteFamilia}
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
                                  onClick={() => onSelectPersona(row.personasIdentificacion)}
                                  className={`${classes.generalIcons} ${classes.editIcon}`}></Check>
                              </Tooltip>
                            ) : ( 
                              <>
                                {permisos.indexOf('Modificar') >= 0 && (
                                  <Tooltip
                                    title={<IntlMessages id='boton.editar' />}>
                                    <EditIcon
                                      onClick={() => onOpenEditPersona(row.id)}
                                      className={`${classes.generalIcons} ${classes.editIcon}`}></EditIcon>
                                  </Tooltip>
                                )}
                                {permisos.indexOf('Listar') >= 0 && (
                                  <Tooltip title={<IntlMessages id='boton.ver' />}>
                                    <VisibilityIcon
                                      onClick={() => onOpenViewPersona(row.id)}
                                      className={`${classes.generalIcons} ${classes.visivilityIcon}`}></VisibilityIcon>
                                  </Tooltip>
                                )}
                                {permisos.indexOf('Eliminar') >= 0 && (
                                  <Tooltip
                                    title={<IntlMessages id='boton.eliminar' />}>
                                    <DeleteIcon
                                      onClick={() => onDeletePersona(row.id)}
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
                          {/* <TableCell align='center' className={classes.cell}>
                            <Tooltip
                              title={
                                <IntlMessages id='boton.datosAdicionales' />
                              }>
                              <Icon
                                path={mdiDatabasePlusOutline}
                                onClick={() =>
                                  onOpenParticipanteDatosAdicionales(row.id)
                                }
                                className={`${classes.generalIcons}`}></Icon>
                            </Tooltip>
                          </TableCell> */}
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

export default Persona;
