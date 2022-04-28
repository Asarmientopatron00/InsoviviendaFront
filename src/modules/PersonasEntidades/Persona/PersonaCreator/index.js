import React, {useEffect, useRef} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/PersonaAction';
// import {onGetColeccionLigera as onGetColeccionLigeraCiudad} from '../../../../redux/actions/CiudadAction';
// import {onGetColeccionLigera as onGetColeccionLigeraComuna} from '../../../../redux/actions/ComunaAction';
// import {onGetColeccionLigera as onGetColeccionLigeraBarrio} from '../../../../redux/actions/BarrioAction';
import ParticipanteForm from './PersonaForm';
// import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
// import {onGetColeccionLigera as departamentosColeccionLigera} from '../../../../redux/actions/DepartamentoAction';
// import {onGetColeccionLigera as gruposPoblacionalesColeccionLigera} from '../../../../redux/actions/GrupoPoblacionalAction';
// import {onGetColeccionLigera as nivelesEscolaridadColeccionLigera} from '../../../../redux/actions/NivelEscolaridadAction';
// import {onGetColeccionLigera as estadosSociopoliticosColeccionLigera} from '../../../../redux/actions/EstadoSociopoliticoAction';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  VALIDACION_REGEX_NUMEROS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import GetUsuario from '../../../../shared/functions/GetUsuario';
import {UPDATE_TYPE, CREATE_TYPE} from 'shared/constants/Constantes';
import {MessageView} from '../../../../@crema';

const PersonaCreator = (props) => {
  const {accion, id} = useParams();
  const handleOnClose = () => {
    history.goBack();
  };

  const usuario = GetUsuario();

  const dispatch = useDispatch();

  // const tiposDocumentos = useSelector(
  //   ({tipoDocumentoReducer}) => tipoDocumentoReducer.ligera,
  // );
  // const departamentos = useSelector(
  //   ({departamentoReducer}) => departamentoReducer.ligera,
  // );
  // const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);
  // const comunas = useSelector(({comunaReducer}) => comunaReducer.ligera);
  // const barrios = useSelector(({barrioReducer}) => barrioReducer.ligera);
  // const familias = useSelector(({familiaReducer}) => familiaReducer.ligera);
  // const gruposPoblacionales = useSelector(
  //   ({grupoPoblacionalReducer}) => grupoPoblacionalReducer.ligera,
  // );
  // const nivelesEscolaridad = useSelector(
  //   ({nivelEscolaridadReducer}) => nivelEscolaridadReducer.ligera,
  // );
  // const estadosSociopoliticos = useSelector(
  //   ({estadoSociopoliticoReducer}) => estadoSociopoliticoReducer.ligera,
  // );

  const {message, error, messageType} = useSelector(({common}) => common);

  // useEffect(() => {
  //   dispatch(tipoDocumentoColeccionLigera());
  //   dispatch(gruposPoblacionalesColeccionLigera());
  //   dispatch(nivelesEscolaridadColeccionLigera());
  //   dispatch(departamentosColeccionLigera());
  //   dispatch(estadosSociopoliticosColeccionLigera());
  // }, [dispatch]);

  // const onChangeDepartamento = (id) => {
  //   dispatch(onGetColeccionLigeraCiudad(id));
  // };

  // const onChangeCity = (id) => {
  //   dispatch(onGetColeccionLigeraComuna(id));
  // };

  // const onChangeComuna = (id) => {
  //   dispatch(onGetColeccionLigeraBarrio(id));
  // };

  let validationSchema = yup.object({
    personasIdentificacion: yup
      .string()
      .matches(VALIDACION_REGEX_NUMEROS, mensajeValidacion('numero'))
      .max(
        LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
        mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL),
      )
      .required('Requerido')
      .typeError(mensajeValidacion('numero')),
    tipo_identificacion_id: yup
      .number()
      .required('Requerido'),
    personasCategoriaAportes: yup
      .string()
      .required('Requerido'),
    personasNombres: yup
      .string()
      .required('Requerido'),
    personasPrimerApellido: yup
      .string()
      .required('Requerido'),
    personasSegundoApellido: yup
      .string()
      .nullable(),
    personasFechaNacimiento: yup
      .date()
      .required('Requerido'),
    pais_nacimiento_id: yup
      .number()
      .required('Requerido'),
    departamento_nacimiento_id: yup
      .number()
      .required('Requerido'),
    ciudad_nacimiento_id: yup
      .number()
      .required('Requerido'),
    personasGenero: yup
      .string()
      .required('Requerido'),
    estado_civil_id: yup
      .number()
      .required('Requerido'),
    personasParentesco: yup
      .string()
      .required('Requerido'),
    tipo_poblacion_id: yup
      .number()
      .required('Requerido'),
    tipo_discapacidad_id: yup
      .number()
      .required('Requerido'),
    personasSeguridadSocial: yup
      .string()
      .required('Requerido'),
    eps_id: yup
      .number()
      .required('Requerido'),
    grado_escolaridad_id: yup
      .number()
      .required('Requerido'),
    personasVehiculo: yup
      .string()
      .required('Requerido'),
    personasCorreo: yup
      .string()
      .nullable(),
    personasFechaVinculacion: yup
      .date()
      .required('Requerido'),
    departamento_id: yup
      .number()
      .required('Requerido'),
    ciudad_id: yup
      .number()
      .required('Requerido'),
    comuna_id: yup
      .number()
      .required('Requerido'),
    barrio_id: yup
      .number()
      .required('Requerido'),
    personasDireccion: yup
      .string()
      .nullable(),
    personasZona: yup
      .string()
      .required('Requerido'),
    personasEstrato: yup
      .string()
      .required('Requerido'),
    personasTelefonoCasa: yup
      .string()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      )
      .nullable(),
    personasTelefonoCelular: yup
      .string()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      )
      .nullable(),
    tipo_vivienda_id: yup
      .number()
      .required('Requerido'),
    personasTipoPropiedad: yup
      .string()
      .required('Requerido'),
    personasNumeroEscritura: yup
      .string()
      .required('Requerido'),
    personasNotariaEscritura: yup
      .string()
      .required('Requerido'),
    personasFechaEscritura: yup
      .date()
      .required('Requerido'),
    personasIndicativoPC: yup
      .string()
      .required('Requerido'),
    personasNumeroHabitaciones: yup
      .number()
      .nullable()
      .typeError(mensajeValidacion('numero')),
    personasNumeroBanos: yup
      .number()
      .nullable()
      .typeError(mensajeValidacion('numero')),
    tipo_techo_id: yup
      .number()
      .required('Requerido'),
    tipo_piso_id: yup
      .number()
      .required('Requerido'),
    tipo_division_id: yup
      .number()
      .required('Requerido'),
    personasSala: yup
      .string()
      .required('Requerido'),
    personasComedor: yup
      .string()
      .required('Requerido'),
    personasCocina: yup
      .string()
      .required('Requerido'),
    personasPatio: yup
      .string()
      .required('Requerido'),
    personasTerraza: yup
      .string()
      .required('Requerido'),
    ocupacion_id: yup
      .number()
      .required('Requerido'),
    personasTipoTrabajo: yup
      .string()
      .required('Requerido'),
    personasTipoContrato: yup
      .string()
      .required('Requerido'),
    personasNombreEmpresa: yup
      .string()
      .nullable(),
    personasTelefonoEmpresa: yup
      .string()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      )
      .nullable(),
    personasPuntajeProcredito: yup
      .number()
      .nullable()
      .typeError(mensajeValidacion('numero')),
    personasPuntajeDatacredito: yup
      .number()
      .nullable()
      .typeError(mensajeValidacion('numero')),
    departamento_correspondencia_id: yup
      .number()
      .required('Requerido'),
    ciudad_correspondencia_id: yup
      .number()
      .required('Requerido'),
    comuna_correspondencia_id: yup
      .number()
      .required('Requerido'),
    barrio_correspondencia_id: yup
      .number()
      .required('Requerido'),
    personasCorDireccion: yup
      .string()
      .nullable(),
    personasCorTelefono: yup
      .string()
      .nullable(),
    personasIngresosFormales: yup
      .number()
      .nullable(),
    personasIngresosInformales: yup
      .number()
      .nullable(),
    personasIngresosArriendo: yup
      .number()
      .nullable(),
    personasIngresosSubsidios: yup
      .number()
      .nullable(),
    personasIngresosPaternidad: yup
      .number()
      .nullable(),
    personasIngresosTerceros: yup
      .number()
      .nullable(),
    personasIngresosOtros: yup
      .number()
      .nullable(),
    personasAportesFormales: yup
      .number()
      .nullable(),
    personasAportesInformales: yup
      .number()
      .nullable(),
    personasAportesArriendo: yup
      .number()
      .nullable(),
    personasAportesSubsidios: yup
      .number()
      .nullable(),
    personasAportesPaternidad: yup
      .number()
      .nullable(),
    personasAportesTerceros: yup
      .number()
      .nullable(),
    personasAportesOtros: yup
      .number()
      .nullable(),
    personasRefNombre1: yup
      .string()
      .nullable(),
    personasRefTelefono1: yup
      .string()
      .nullable(),
    personasRefNombre2: yup
      .string()
      .nullable(),
    personasRefTelefono2: yup
      .string()
      .nullable(),
    personasObservaciones: yup
      .string()
      .nullable(),
    personasEstadoTramite: yup
      .string()
      .required('Requerido'),
    personasEstadoRegistro: yup
      .string()
      .required('Requerido'),
    familia_id: yup
      .string()
      .nullable('Requerido'),
    // telefono: yup
    //   .string()
    //   .nullable()
    //   .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
    //   .max(
    //     LONGITUD_MAXIMA_TELEFONOS,
    //     mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
    //   )
    //   .min(
    //     LONGITUD_MINIMA_TELEFONOS,
    //     mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
    //   )
    //   .when('celular', {
    //     is: null || '',
    //     then: yup.string().required('Requerido'),
    //   }),
  });

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({personaReducer}) => personaReducer.selectedRow,
  );

  const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
  }, []);

  if (accion === 'crear') {
    initializeSelectedRow();
  }
  if (accion !== 'editar' && accion !== 'ver' && accion !== 'crear') {
    history.goBack();
  }
  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShow(id));
    }
  }, [accion, dispatch, id]);

  return (
    <Scrollbar>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          id: selectedRow ? (selectedRow.id ? selectedRow.id : '') : '',
          personasIdentificacion: selectedRow
            ? selectedRow.personasIdentificacion
              ? selectedRow.personasIdentificacion
              : ''
            : '',
          tipo_identificacion_id: selectedRow
            ? selectedRow.tipo_identificacion_id
              ? selectedRow.tipo_identificacion_id
              : ''
            : '',
          personasCategoriaAportes: selectedRow
            ? selectedRow.personasCategoriaAportes
              ? selectedRow.personasCategoriaAportes
              : ''
            : '',
          personasNombres: selectedRow
            ? selectedRow.personasNombres
              ? selectedRow.personasNombres
              : ''
            : '',
          personasPrimerApellido: selectedRow
            ? selectedRow.personasPrimerApellido
              ? selectedRow.personasPrimerApellido
              : ''
            : '',
          personasSegundoApellido: selectedRow
            ? selectedRow.personasSegundoApellido
              ? selectedRow.personasSegundoApellido
              : ''
            : '',
          personasFechaNacimiento: selectedRow
            ? selectedRow.personasFechaNacimiento
              ? selectedRow.personasFechaNacimiento
              : ''
            : '',
          pais_nacimiento_id: selectedRow
            ? selectedRow.pais_nacimiento_id
              ? selectedRow.pais_nacimiento_id
              : ''
            : '',
          departamento_nacimiento_id: selectedRow
            ? selectedRow.departamento_nacimiento_id
              ? selectedRow.departamento_nacimiento_id
              : ''
            : '',
          ciudad_nacimiento_id: selectedRow
            ? selectedRow.ciudad_nacimiento_id
              ? selectedRow.ciudad_nacimiento_id
              : ''
            : '',
          personasGenero: selectedRow
            ? selectedRow.personasGenero
              ? selectedRow.personasGenero
              : ''
            : '',
          estado_civil_id: selectedRow
            ? selectedRow.estado_civil_id
              ? selectedRow.estado_civil_id
              : ''
            : '',
          personasParentesco: selectedRow
            ? selectedRow.personasParentesco
              ? selectedRow.personasParentesco
              : ''
            : '',
          tipo_poblacion_id: selectedRow
            ? selectedRow.tipo_poblacion_id
              ? selectedRow.tipo_poblacion_id
              : ''
            : '',
          tipo_discapacidad_id: selectedRow
            ? selectedRow.tipo_discapacidad_id
              ? selectedRow.tipo_discapacidad_id
              : ''
            : '',
          personasSeguridadSocial: selectedRow
            ? selectedRow.personasSeguridadSocial
              ? selectedRow.personasSeguridadSocial
              : ''
            : '',
          eps_id: selectedRow
            ? selectedRow.eps_id
              ? selectedRow.eps_id
              : ''
            : '',
          grado_escolaridad_id: selectedRow
            ? selectedRow.grado_escolaridad_id
              ? selectedRow.grado_escolaridad_id
              : ''
            : '',
          personasVehiculo: selectedRow
            ? selectedRow.personasVehiculo
              ? selectedRow.personasVehiculo
              : ''
            : '',
          personasCorreo: selectedRow
            ? selectedRow.personasCorreo
              ? selectedRow.personasCorreo
              : ''
            : '',
          personasFechaVinculacion: selectedRow
            ? selectedRow.personasFechaVinculacion
              ? selectedRow.personasFechaVinculacion
              : ''
            : '',
          departamento_id: selectedRow
            ? selectedRow.departamento_id
              ? selectedRow.departamento_id
              : ''
            : '',
          ciudad_id: selectedRow
            ? selectedRow.ciudad_id
              ? selectedRow.ciudad_id
              : ''
            : '',
          comuna_id: selectedRow
            ? selectedRow.comuna_id
              ? selectedRow.comuna_id
              : ''
            : '',
          barrio_id: selectedRow
            ? selectedRow.barrio_id
              ? selectedRow.barrio_id
              : ''
            : '',
          personasDireccion: selectedRow
            ? selectedRow.personasDireccion
              ? selectedRow.personasDireccion
              : ''
            : '',
          personasZona: selectedRow
            ? selectedRow.personasZona
              ? selectedRow.personasZona
              : ''
            : '',
          personasEstrato: selectedRow
            ? selectedRow.personasEstrato
              ? selectedRow.personasEstrato
              : ''
            : '',
          personasTelefonoCasa: selectedRow
            ? selectedRow.personasTelefonoCasa
              ? selectedRow.personasTelefonoCasa
              : ''
            : '',
          personasTelefonoCelular: selectedRow
            ? selectedRow.personasTelefonoCelular
              ? selectedRow.personasTelefonoCelular
              : ''
            : '',
          tipo_vivienda_id: selectedRow
            ? selectedRow.tipo_vivienda_id
              ? selectedRow.tipo_vivienda_id
              : ''
            : '',
          personasTipoPropiedad: selectedRow
            ? selectedRow.personasTipoPropiedad
              ? selectedRow.personasTipoPropiedad
              : ''
            : '',
          personasNumeroEscritura: selectedRow
            ? selectedRow.personasNumeroEscritura
              ? selectedRow.personasNumeroEscritura
              : ''
            : '',
          personasNotariaEscritura: selectedRow
            ? selectedRow.personasNotariaEscritura
              ? selectedRow.personasNotariaEscritura
              : ''
            : '',
          personasFechaEscritura: selectedRow
            ? selectedRow.personasFechaEscritura
              ? selectedRow.personasFechaEscritura
              : ''
            : '',
          personasIndicativoPC: selectedRow
            ? selectedRow.personasIndicativoPC
              ? selectedRow.personasIndicativoPC
              : ''
            : '',
          personasNumeroHabitaciones: selectedRow
            ? selectedRow.personasNumeroHabitaciones
              ? selectedRow.personasNumeroHabitaciones
              : ''
            : '',
          personasNumeroBanos: selectedRow
            ? selectedRow.personasNumeroBanos
              ? selectedRow.personasNumeroBanos
              : ''
            : '',
          tipo_techo_id: selectedRow
            ? selectedRow.tipo_techo_id
              ? selectedRow.tipo_techo_id
              : ''
            : '',
          tipo_piso_id: selectedRow
            ? selectedRow.tipo_piso_id
              ? selectedRow.tipo_piso_id
              : ''
            : '',
          tipo_division_id: selectedRow
            ? selectedRow.tipo_division_id
              ? selectedRow.tipo_division_id
              : ''
            : '',
          personasSala: selectedRow
            ? selectedRow.personasSala
              ? selectedRow.personasSala
              : ''
            : '',
          personasComedor: selectedRow
            ? selectedRow.personasComedor
              ? selectedRow.personasComedor
              : ''
            : '',
          personasCocina: selectedRow
            ? selectedRow.personasCocina
              ? selectedRow.personasCocina
              : ''
            : '',
          personasPatio: selectedRow
            ? selectedRow.personasPatio
              ? selectedRow.personasPatio
              : ''
            : '',
          personasTerraza: selectedRow
            ? selectedRow.personasTerraza
              ? selectedRow.personasTerraza
              : ''
            : '',
          ocupacion_id: selectedRow
            ? selectedRow.ocupacion_id
              ? selectedRow.ocupacion_id
              : ''
            : '',
          personasTipoTrabajo: selectedRow
            ? selectedRow.personasTipoTrabajo
              ? selectedRow.personasTipoTrabajo
              : ''
            : '',
          personasTipoContrato: selectedRow
            ? selectedRow.personasTipoContrato
              ? selectedRow.personasTipoContrato
              : ''
            : '',
          personasNombreEmpresa: selectedRow
            ? selectedRow.personasNombreEmpresa
              ? selectedRow.personasNombreEmpresa
              : ''
            : '',
          personasTelefonoEmpresa: selectedRow
            ? selectedRow.personasTelefonoEmpresa
              ? selectedRow.personasTelefonoEmpresa
              : ''
            : '',
          personasPuntajeProcredito: selectedRow
            ? selectedRow.personasPuntajeProcredito
              ? selectedRow.personasPuntajeProcredito
              : ''
            : '',
          personasPuntajeDatacredito: selectedRow
            ? selectedRow.personasPuntajeDatacredito
              ? selectedRow.personasPuntajeDatacredito
              : ''
            : '',
          departamento_correspondencia_id: selectedRow
            ? selectedRow.departamento_correspondencia_id
              ? selectedRow.departamento_correspondencia_id
              : ''
            : '',
          ciudad_correspondencia_id: selectedRow
            ? selectedRow.ciudad_correspondencia_id
              ? selectedRow.ciudad_correspondencia_id
              : ''
            : '',
          comuna_correspondencia_id: selectedRow
            ? selectedRow.comuna_correspondencia_id
              ? selectedRow.comuna_correspondencia_id
              : ''
            : '',
          barrio_correspondencia_id: selectedRow
            ? selectedRow.barrio_correspondencia_id
              ? selectedRow.barrio_correspondencia_id
              : ''
            : '',
          personasCorDireccion: selectedRow
            ? selectedRow.personasCorDireccion
              ? selectedRow.personasCorDireccion
              : ''
            : '',
          personasCorTelefono: selectedRow
            ? selectedRow.personasCorTelefono
              ? selectedRow.personasCorTelefono
              : ''
            : '',
          personasIngresosFormales: selectedRow
            ? selectedRow.personasIngresosFormales
              ? selectedRow.personasIngresosFormales
              : ''
            : '',
          personasIngresosInformales: selectedRow
            ? selectedRow.personasIngresosInformales
              ? selectedRow.personasIngresosInformales
              : ''
            : '',
          personasIngresosArriendo: selectedRow
            ? selectedRow.personasIngresosArriendo
              ? selectedRow.personasIngresosArriendo
              : ''
            : '',
          personasIngresosSubsidios: selectedRow
            ? selectedRow.personasIngresosSubsidios
              ? selectedRow.personasIngresosSubsidios
              : ''
            : '',
          personasIngresosPaternidad: selectedRow
            ? selectedRow.personasIngresosPaternidad
              ? selectedRow.personasIngresosPaternidad
              : ''
            : '',
          personasIngresosTerceros: selectedRow
            ? selectedRow.personasIngresosTerceros
              ? selectedRow.personasIngresosTerceros
              : ''
            : '',
          personasIngresosOtros: selectedRow
            ? selectedRow.personasIngresosOtros
              ? selectedRow.personasIngresosOtros
              : ''
            : '',
          personasAportesFormales: selectedRow
            ? selectedRow.personasAportesFormales
              ? selectedRow.personasAportesFormales
              : ''
            : '',
          personasAportesInformales: selectedRow
            ? selectedRow.personasAportesInformales
              ? selectedRow.personasAportesInformales
              : ''
            : '',
          personasAportesArriendo: selectedRow
            ? selectedRow.personasAportesArriendo
              ? selectedRow.personasAportesArriendo
              : ''
            : '',
          personasAportesSubsidios: selectedRow
            ? selectedRow.personasAportesSubsidios
              ? selectedRow.personasAportesSubsidios
              : ''
            : '',
          personasAportesPaternidad: selectedRow
            ? selectedRow.personasAportesPaternidad
              ? selectedRow.personasAportesPaternidad
              : ''
            : '',
          personasAportesTerceros: selectedRow
            ? selectedRow.personasAportesTerceros
              ? selectedRow.personasAportesTerceros
              : ''
            : '',
          personasAportesOtros: selectedRow
            ? selectedRow.personasAportesOtros
              ? selectedRow.personasAportesOtros
              : ''
            : '',
          personasRefNombre1: selectedRow
            ? selectedRow.personasRefNombre1
              ? selectedRow.personasRefNombre1
              : ''
            : '',
          personasRefTelefono1: selectedRow
            ? selectedRow.personasRefTelefono1
              ? selectedRow.personasRefTelefono1
              : ''
            : '',
          personasRefNombre2: selectedRow
            ? selectedRow.personasRefNombre2
              ? selectedRow.personasRefNombre2
              : ''
            : '',
          personasRefTelefono2: selectedRow
            ? selectedRow.personasRefTelefono2
              ? selectedRow.personasRefTelefono2
              : ''
            : '',
          personasObservaciones: selectedRow
            ? selectedRow.personasObservaciones
              ? selectedRow.personasObservaciones
              : ''
            : '',
          personasEstadoTramite: selectedRow
            ? selectedRow.personasEstadoTramite
              ? selectedRow.personasEstadoTramite
              : ''
            : '',
          personasEstadoRegistro: selectedRow
            ? selectedRow.personasEstadoRegistro
              ? selectedRow.personasEstadoRegistro
              : ''
            : '',
          familia_id: selectedRow
            ? selectedRow.familia_id
              ? selectedRow.familia_id
              : ''
            : '',
          sexo: selectedRow ? (selectedRow.sexo ? selectedRow.sexo : '') : '',
          eps: selectedRow ? (selectedRow.eps ? selectedRow.eps : '') : '',
          indicativo_discapacidad: selectedRow
            ? selectedRow.indicativo_discapacidad
              ? selectedRow.indicativo_discapacidad
              : 'N'
            : 'N',
          estado: selectedRow ? (selectedRow.estado === 1 ? '1' : '0') : '1',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          if (accion === 'crear') {
            console.log(data);
            dispatch(onCreate(data, handleOnClose));
          } else if (accion === 'editar') {
            if (selectedRow) {
              dispatch(onUpdate(data, handleOnClose));
            }
          }
          // resetForm();
          setSubmitting(false);
          // updateColeccion();
        }}>
        {({values, initialValues, setFieldValue}) => (
          <ParticipanteForm
            usuario={usuario}
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            // tiposDocumentos={tiposDocumentos}
            // departamentos={departamentos}
            // ciudades={ciudades}
            // comunas={comunas}
            // barrios={barrios}
            // familias={familias}
            // estadosSociopoliticos={estadosSociopoliticos}
            // gruposPoblacionales={gruposPoblacionales}
            // nivelesEscolaridad={nivelesEscolaridad}
            // onChangeDepartamento={onChangeDepartamento}
            // onChangeCity={onChangeCity}
            // onChangeComuna={onChangeComuna}
          />
        )}
      </Formik>
      <MessageView
        variant={
          messageType === UPDATE_TYPE || messageType === CREATE_TYPE
            ? 'success'
            : 'error'
        }
        message={
          messageType === UPDATE_TYPE || messageType === CREATE_TYPE
            ? message
            : error
        }
      />
    </Scrollbar>
  );
};

export default PersonaCreator;
