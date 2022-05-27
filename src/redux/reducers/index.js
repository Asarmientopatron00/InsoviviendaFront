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
import BenefactorReducer from './BenefactorReducer';
import DocumentosProyectoReducer from './DocumentosProyectoReducer';
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
import EstadoCivilReducer from './EstadoCivilReducer';
import OcupacionReducer from './OcupacionReducer';
import GradosescolaridadReducer from './GradosescolaridadReducer';
import EpsReducer from './EpsReducer';
import TipofamiliaReducer from './TipofamiliaReducer';
import CondicionFamiliaReducer from './CondicionFamiliaReducer';
import TipoPoblacionReducer from './TipoPoblacionReducer';
import TipoViviendaReducer from './TipoViviendaReducer';
import TipoTechoReducer from './TipoTechoReducer';
import TipoPisoReducer from './TipoPisoReducer';
import TipoDivisionReducer from './TipoDivisionReducer';
import BancoReducer from './BancoReducer';
import FormaPagoReducer from './FormaPagoReducer';
import TipoDocumentoProyectoReducer from './TipoDocumentoProyectoReducer';
import TipoGastoReducer from './TipoGastoReducer';
import TipoBenefactorReducer from './TipoBenefactorReducer';
import TipoDonacionReducer from './TipoDonacionReducer';
import ParametroCorreoReducer from './ParametroCorreoReducer';
import ParametroConstanteReducer from './ParametroConstanteReducer';

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
    benefactorReducer: BenefactorReducer,
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
    estadocivilReducer:EstadoCivilReducer,
    ocupacionReducer:OcupacionReducer,
    gradosEscolaridadReducer:GradosescolaridadReducer,
    epsReducer:EpsReducer,
    tipofamiliaReducer:TipofamiliaReducer,
    condicionFamiliaReducer: CondicionFamiliaReducer,
    tipoPoblacionReducer: TipoPoblacionReducer,
    tipoViviendaReducer: TipoViviendaReducer,
    tipoTechoReducer: TipoTechoReducer,
    tipoPisoReducer: TipoPisoReducer,
    tipoDivisionReducer: TipoDivisionReducer,
    bancoReducer: BancoReducer,
    formaPagoReducer: FormaPagoReducer,
    parametroCorreoReducer: ParametroCorreoReducer,
    parametroConstanteReducer: ParametroConstanteReducer,
    tipoBenefactorReducer: TipoBenefactorReducer,
    tipoDocumentoProyectoReducer: TipoDocumentoProyectoReducer,
    tipoDonacionReducer: TipoDonacionReducer,
    tipoGastoReducer: TipoGastoReducer,
    documentosProyectoReducer: DocumentosProyectoReducer,
  });

export default reducers;
