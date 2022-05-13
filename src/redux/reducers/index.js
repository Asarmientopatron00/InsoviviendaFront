import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import Common from './Common';
import Auth from './Auth';
// Seguridad
import RolReducer from './RolReducer';
import AplicacionReducer from './AplicacionReducer';
import ModuloReducer from './ModuloReducer';
import UsuarioReducer from './UsuarioReducer';
import OpcionSistemaReducer from './OpcionSistemaReducer';
import ConsultaAuditoriaReducer from './ConsultaAuditoriaReducer';
import PermisoReducer from './PermisoReducer';
import AuditoriaProcesoReducer from './AuditoriaProcesoReducer';
// PersonasEntidades
import PersonaReducer from './PersonaReducer';
import FamiliaReducer from './FamiliaReducer';
import OrientadorReducer from './OrientadorReducer';
// Proyectos
import ProyectoReducer from './ProyectoReducer';
//Parametrizacion
import TipoIdentificacionReducer from './TipoIdentificacionReducer';
import TipoParentescoReducer from './TipoParentescoReducer';
import TipoDiscapacidadReducer from './TipoDiscapacidadReducer';
import TipoAsesoriaReducer from './TipoAsesoriaReducer';
import TipoProgramaReducer from './TipoProgramaReducer';
import PaisReducer from './PaisReducer';
import DepartamentoReducer from './DepartamentoReducer';
import CiudadReducer from './CiudadReducer';
import ComunaReducer from './ComunaReducer';
import BarrioReducer from './BarrioReducer';


const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    common: Common,
    rolReducer: RolReducer,
    aplicacionReducer: AplicacionReducer,
    moduloReducer: ModuloReducer,
    usuarioReducer: UsuarioReducer,
    opcionSistemaReducer: OpcionSistemaReducer,
    permisoReducer: PermisoReducer,
    consultaAuditoriaReducer: ConsultaAuditoriaReducer,
    auditoriaProcesoReducer: AuditoriaProcesoReducer,
    personaReducer: PersonaReducer,
    familiaReducer: FamiliaReducer,
    orientadorReducer: OrientadorReducer,
    tipoIdentificacionReducer: TipoIdentificacionReducer,
    proyectoReducer: ProyectoReducer,
    tipoParentescoReducer: TipoParentescoReducer,
    tipoDiscapacidadReducer: TipoDiscapacidadReducer,
    tipoAsesoriaReducer: TipoAsesoriaReducer,
    tipoProgramaReducer: TipoProgramaReducer,
    paisReducer: PaisReducer,
    departamentoReducer: DepartamentoReducer,
    ciudadReducer: CiudadReducer,
    comunaReducer: ComunaReducer,
    barrioReducer: BarrioReducer,
  });
export default reducers;
