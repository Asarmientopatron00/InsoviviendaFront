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
import BancoReducer from './BancoReducer';
import FormaPagoReducer from './FormaPagoReducer';
import TipoDocumentoProyectoReducer from './TipoDocumentoProyectoReducer';
import TipoGastoReducer from './TipoGastoReducer';
import TipoBenefactorReducer from './TipoBenefactorReducer';
import TipoDonacionReducer from './TipoDonacionReducer';
import ParametroCorreoReducer from './ParametroCorreoReducer';

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
    bancoReducer: BancoReducer,
    formaPagoReducer: FormaPagoReducer,
    parametroCorreoReducer: ParametroCorreoReducer,
    tipoBenefactorReducer: TipoBenefactorReducer,
    tipoDocumentoProyectoReducer: TipoDocumentoProyectoReducer,
    tipoDonacionReducer: TipoDonacionReducer,
    tipoGastoReducer: TipoGastoReducer,
    });

  export default reducers;
