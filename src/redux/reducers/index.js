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
// PersonasEntidades
import PersonaReducer from './PersonaReducer';
import FamiliaReducer from './FamiliaReducer';
//Parametrizacion
import TipoIdentificacionReducer from './TipoIdentificacionReducer';
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
    personaReducer: PersonaReducer,
    familiaReducer: FamiliaReducer,
    tipoIdentificacionReducer: TipoIdentificacionReducer,
    tipoProgramaReducer: TipoProgramaReducer,
    paisReducer: PaisReducer,
    departamentoReducer: DepartamentoReducer,
    ciudadReducer: CiudadReducer,
    comunaReducer: ComunaReducer,
    barrioReducer: BarrioReducer,
  });
export default reducers;
