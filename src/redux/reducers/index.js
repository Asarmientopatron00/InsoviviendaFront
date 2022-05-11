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
import OrientadorReducer from './OrientadorReducer';
//Parametrizacion
import TipoIdentificacionReducer from './TipoIdentificacionReducer';
import TipoParentescoReducer from './TipoParentescoReducer';
import TipoDiscapacidadReducer from './TipoDiscapacidadReducer';
import TipoAsesoriaReducer from './TipoAsesoriaReducer';

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
    orientadorReducer: OrientadorReducer,
    tipoIdentificacionReducer: TipoIdentificacionReducer,
    tipoParentescoReducer: TipoParentescoReducer,
    tipoDiscapacidadReducer: TipoDiscapacidadReducer,
    tipoAsesoriaReducer: TipoAsesoriaReducer,
  });
export default reducers;
