import React, {useEffect, useRef} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
} from '../../../../redux/actions/ProyectoAction';
import ProyectoForm from './ProyectoForm';
import {useParams, useLocation} from 'react-router-dom';
import {history} from 'redux/store';
import GetUsuario from '../../../../shared/functions/GetUsuario';
import {UPDATE_TYPE, CREATE_TYPE} from 'shared/constants/Constantes';
import {MessageView} from '../../../../@crema';
import moment from 'moment';
import { useProyectoFormData } from 'shared/hooks/useProyectoFormData';
import {Box, CircularProgress} from '@material-ui/core';

const validationSchema = yup.object({
  persona_id: yup
    .number()
    .required('Requerido'),
  persona_identificacion: yup
    .number()
    .required('Requerido'),
  proyectosEstadoProyecto: yup
    .string()
    .required('Requerido'),
  proyectosFechaSolicitud: yup
    .date()
    .required('Requerido'),
  proyectosTipoProyecto: yup
    .string()
    .required('Requerido'),
  tipo_programa_id: yup
    .number()
    .required('Requerido'),
  proyectosRemitido: yup
    .string()
    .nullable('Requerido'),
  remitido_id: yup
    .number()
    .nullable(),
  remitente_identificacion: yup
    .number()
    .nullable()
    .when('proyectosRemitido', {
      is: 'S',
      then: yup.number().required('Debe especificar un remitente')
    }),
  departamento_id: yup
    .number()
    .nullable(),
  ciudad_id: yup
    .number()
    .nullable(),
  comuna_id: yup
    .number()
    .nullable(),
  barrio_id: yup
    .number()
    .nullable(),
  proyectosZona: yup
    .string()
    .nullable(),
  proyectosDireccion: yup
    .string()
    .nullable(),
  proyectosVisitaDomiciliaria: yup
    .string()
    .nullable(),
  proyectosFechaVisitaDom: yup
    .date()
    .nullable(),
  proyectosPagoEstudioCre: yup
    .string()
    .nullable(),
  proyectosReqLicenciaCon: yup
    .string()
    .nullable(),
  proyectosFechaInicioEstudio: yup
    .date()
    .nullable(),
  proyectosFechaAproRec: yup
    .date()
    .nullable(),
  proyectosFechaEstInicioObr: yup
    .date()
    .nullable(),
  proyectosValorProyecto: yup
    .number()
    .nullable(),
  proyectosValorSolicitud: yup
    .number()
    .nullable(),
  proyectosValorRecursosSol: yup
    .number()
    .nullable(),
  proyectosValorSubsidios: yup
    .number()
    .nullable(),
  proyectosValorDonaciones: yup
    .number()
    .nullable(),
  proyectosValorCuotaAprobada: yup
    .number()
    .nullable(),
  proyectosValorCapPagoMen: yup
    .number()
    .nullable(),
  proyectosValorAprobado: yup
    .number()
    .nullable(),
  proyectosValorSeguroVida: yup
    .number()
    .nullable(),
  proyectosTasaInteresNMV: yup
    .number()
    .nullable(),
  proyectosTasaInteresEA: yup
    .number()
    .nullable(),
  proyectosNumeroCuotas: yup
    .number()
    .nullable(),
  banco_id: yup
    .number()
    .nullable(),
  proyectosTipoCuentaRecaudo: yup
    .string()
    .nullable(),
  proyectosNumCuentaRecaudo: yup
    .string()
    .nullable(),
  proyectosEstadoFormalizacion: yup
    .string()
    .nullable(),
  proyectosFechaAutNotaria: yup
    .date()
    .nullable(),
  proyectosFechaFirEscrituras: yup
    .date()
    .nullable(),
  proyectosFechaIngresosReg: yup
    .date()
    .nullable(),
  proyectosAutorizacionDes: yup
    .string()
    .nullable(),
  proyectosFechaAutDes: yup
    .date()
    .nullable(),
  proyectosFechaCancelacion: yup
    .date()
    .nullable(),
  orientador_id: yup
    .number()
    .nullable(),
  orientador_identificacion: yup
    .number()
    .nullable(),
  proyectosObservaciones: yup
    .string()
    .nullable(),
});

const ProyectoCreador = (props) => {
  const {accion, id} = useParams();
  const {state} = useLocation().state;
  const {
    bancos,
    barrios, 
    ciudades,
    comunas,
    departamentos,
    isLoading,
    orientadores,
    paises,
    personas,
    tiposPrograma
  } = useProyectoFormData();

  const handleOnClose = () => {
    history.goBack();
  };

  const usuario = GetUsuario();
  const dispatch = useDispatch();
  const {message, error, messageType} = useSelector(({common}) => common);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({proyectoReducer}) => proyectoReducer.selectedRow,
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
          persona_id: selectedRow 
            ? (selectedRow.persona_id 
                ? selectedRow.persona_id 
                : '') 
            : '',
          persona_identificacion: selectedRow 
            ? (selectedRow?.solicitante?.identificacion 
                ? selectedRow.solicitante.identificacion 
                : '') 
            : '',
          remitente_identificacion: selectedRow 
            ? (selectedRow?.remitente?.identificacion 
                ? selectedRow.remitente.identificacion 
                : '') 
            : '',
          orientador_identificacion: selectedRow 
            ? (selectedRow?.orientador?.identificacion 
                ? selectedRow.orientador.identificacion
                : '') 
            : '',
          nombrePersona: selectedRow 
            ? (selectedRow?.solicitante?.nombre 
                ? selectedRow.solicitante.nombre 
                : '') 
            : '',
          nombreRemitente: selectedRow 
            ? (selectedRow?.remitente?.nombre 
                ? selectedRow.remitente.nombre 
                : '') 
            : '',
          nombreOrientador: selectedRow 
            ? (selectedRow?.orientador?.nombre 
                ? selectedRow.orientador.nombre
                : '') 
            : '',
          proyectosEstadoProyecto: selectedRow 
            ? (selectedRow.proyectosEstadoProyecto 
                ? selectedRow.proyectosEstadoProyecto 
                : '') 
            : '',
          proyectosFechaSolicitud: selectedRow 
            ? (selectedRow.proyectosFechaSolicitud 
                ? moment(selectedRow.proyectosFechaSolicitud).format('YYYY-MM-DD') 
                : '') 
            : '',
          proyectosTipoProyecto: selectedRow 
            ? (selectedRow.proyectosTipoProyecto 
                ? selectedRow.proyectosTipoProyecto 
                : '') 
            : '',
          tipo_programa_id: selectedRow 
            ? (selectedRow.tipo_programa_id 
                ? selectedRow.tipo_programa_id 
                : '') 
            : '',
          proyectosRemitido: selectedRow 
            ? (selectedRow.proyectosRemitido 
                ? selectedRow.proyectosRemitido 
                : '') 
            : 'S',
          remitido_id: selectedRow 
            ? (selectedRow.remitido_id 
                ? selectedRow.remitido_id 
                : '') 
            : '',
          pais_id: selectedRow 
            ? (selectedRow.pais_id 
                ? selectedRow.pais_id 
                : '') 
            : '',
          departamento_id: selectedRow 
            ? (selectedRow.departamento_id 
                ? selectedRow.departamento_id 
                : '') 
            : '',
          ciudad_id: selectedRow 
            ? (selectedRow.ciudad_id 
                ? selectedRow.ciudad_id 
                : '') 
            : '',
          comuna_id: selectedRow 
            ? (selectedRow.comuna_id 
                ? selectedRow.comuna_id 
                : '') 
            : '',
          barrio_id: selectedRow 
            ? (selectedRow.barrio_id 
                ? selectedRow.barrio_id 
                : '') 
            : '',
          proyectosZona: selectedRow 
            ? (selectedRow.proyectosZona 
                ? selectedRow.proyectosZona 
                : '') 
            : '',
          proyectosDireccion: selectedRow 
            ? (selectedRow.proyectosDireccion 
                ? selectedRow.proyectosDireccion 
                : '') 
            : '',
          proyectosVisitaDomiciliaria: selectedRow 
            ? (selectedRow.proyectosVisitaDomiciliaria 
                ? selectedRow.proyectosVisitaDomiciliaria 
                : '') 
            : '',
          proyectosFechaVisitaDom: selectedRow 
            ? (selectedRow.proyectosFechaVisitaDom 
                ? selectedRow.proyectosFechaVisitaDom 
                : '') 
            : '',
          proyectosPagoEstudioCre: selectedRow 
            ? (selectedRow.proyectosPagoEstudioCre 
                ? selectedRow.proyectosPagoEstudioCre 
                : '') 
            : '',
          proyectosReqLicenciaCon: selectedRow 
            ? (selectedRow.proyectosReqLicenciaCon 
                ? selectedRow.proyectosReqLicenciaCon 
                : '') 
            : '',
          proyectosFechaInicioEstudio: selectedRow 
            ? (selectedRow.proyectosFechaInicioEstudio 
                ? selectedRow.proyectosFechaInicioEstudio 
                : '') 
            : '',
          proyectosFechaAproRec: selectedRow 
            ? (selectedRow.proyectosFechaAproRec 
                ? selectedRow.proyectosFechaAproRec 
                : '') 
            : '',
          proyectosFechaEstInicioObr: selectedRow 
            ? (selectedRow.proyectosFechaEstInicioObr 
                ? selectedRow.proyectosFechaEstInicioObr 
                : '') 
            : '',
          proyectosValorProyecto: selectedRow 
            ? (selectedRow.proyectosValorProyecto 
                ? selectedRow.proyectosValorProyecto 
                : '') 
            : '',
          proyectosValorSolicitud: selectedRow 
            ? (selectedRow.proyectosValorSolicitud 
                ? selectedRow.proyectosValorSolicitud 
                : '') 
            : '',
          proyectosValorRecursosSol: selectedRow 
            ? (selectedRow.proyectosValorRecursosSol 
                ? selectedRow.proyectosValorRecursosSol 
                : '') 
            : '',
          proyectosValorSubsidios: selectedRow 
            ? (selectedRow.proyectosValorSubsidios 
                ? selectedRow.proyectosValorSubsidios 
                : '') 
            : '',
          proyectosValorDonaciones: selectedRow 
            ? (selectedRow.proyectosValorDonaciones 
                ? selectedRow.proyectosValorDonaciones 
                : '') 
            : '',
          proyectosValorCuotaAprobada: selectedRow 
            ? (selectedRow.proyectosValorCuotaAprobada 
                ? selectedRow.proyectosValorCuotaAprobada 
                : '') 
            : '',
          proyectosValorCapPagoMen: selectedRow 
            ? (selectedRow.proyectosValorCapPagoMen 
                ? selectedRow.proyectosValorCapPagoMen 
                : '') 
            : '',
          proyectosValorAprobado: selectedRow 
            ? (selectedRow.proyectosValorAprobado 
                ? selectedRow.proyectosValorAprobado 
                : '') 
            : '',
          proyectosValorSeguroVida: selectedRow 
            ? (selectedRow.proyectosValorSeguroVida 
                ? selectedRow.proyectosValorSeguroVida 
                : '') 
            : '',
          proyectosTasaInteresNMV: selectedRow 
            ? (selectedRow.proyectosTasaInteresNMV 
                ? selectedRow.proyectosTasaInteresNMV 
                : '') 
            : '',
          proyectosTasaInteresEA: selectedRow 
            ? (selectedRow.proyectosTasaInteresEA 
                ? selectedRow.proyectosTasaInteresEA 
                : '') 
            : '',
          proyectosNumeroCuotas: selectedRow 
            ? (selectedRow.proyectosNumeroCuotas 
                ? selectedRow.proyectosNumeroCuotas 
                : '') 
            : '',
          banco_id: selectedRow 
            ? (selectedRow.banco_id 
                ? selectedRow.banco_id 
                : '') 
            : '',
          proyectosTipoCuentaRecaudo: selectedRow 
            ? (selectedRow.proyectosTipoCuentaRecaudo 
                ? selectedRow.proyectosTipoCuentaRecaudo 
                : '') 
            : '',
          proyectosNumCuentaRecaudo: selectedRow 
            ? (selectedRow.proyectosNumCuentaRecaudo 
                ? selectedRow.proyectosNumCuentaRecaudo 
                : '') 
            : '',
          proyectosEstadoFormalizacion: selectedRow 
            ? (selectedRow.proyectosEstadoFormalizacion 
                ? selectedRow.proyectosEstadoFormalizacion 
                : '') 
            : '',
          proyectosFechaAutNotaria: selectedRow 
            ? (selectedRow.proyectosFechaAutNotaria 
                ? selectedRow.proyectosFechaAutNotaria 
                : '') 
            : '',
          proyectosFechaFirEscrituras: selectedRow 
            ? (selectedRow.proyectosFechaFirEscrituras 
                ? selectedRow.proyectosFechaFirEscrituras 
                : '') 
            : '',
          proyectosFechaIngresosReg: selectedRow 
            ? (selectedRow.proyectosFechaIngresosReg 
                ? selectedRow.proyectosFechaIngresosReg 
                : '') 
            : '',
          proyectosAutorizacionDes: selectedRow 
            ? (selectedRow.proyectosAutorizacionDes 
                ? selectedRow.proyectosAutorizacionDes 
                : '') 
            : '',
          proyectosFechaAutDes: selectedRow 
            ? (selectedRow.proyectosFechaAutDes 
                ? selectedRow.proyectosFechaAutDes 
                : '') 
            : '',
          proyectosFechaCancelacion: selectedRow 
            ? (selectedRow.proyectosFechaCancelacion 
                ? selectedRow.proyectosFechaCancelacion 
                : '') 
            : '',
          orientador_id: selectedRow 
            ? (selectedRow.orientador_id 
                ? selectedRow.orientador_id 
                : '') 
            : '',
          proyectosObservaciones: selectedRow 
            ? (selectedRow.proyectosObservaciones 
                ? selectedRow.proyectosObservaciones 
                : '') 
            : '',
          usuario_creacion_nombre: selectedRow
            ? selectedRow.usuario_creacion_nombre
              ? selectedRow.usuario_creacion_nombre
              : ''
            : usuario.displayName,
          usuario_modificacion_nombre: selectedRow
            ? selectedRow.usuario_modificacion_nombre
              ? selectedRow.usuario_modificacion_nombre
              : ''
            : usuario.displayName,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting}) => {
          setSubmitting(true);
          if (accion === 'editar') {
            if (selectedRow) {
              dispatch(onUpdate(data, handleOnClose));
            }
          }
          setSubmitting(false);
        }}>
        {({values, initialValues, setFieldValue}) => (
          <>
            { isLoading ? (
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '40px'
                }}
              >
                <CircularProgress size={60}/>
              </Box>
              ) : ( 
              <ProyectoForm
                usuario={usuario}
                values={values}
                setFieldValue={setFieldValue}
                accion={accion}
                initialValues={initialValues}
                bancos={bancos}
                barrios={barrios}
                ciudades={ciudades}
                comunas={comunas}
                departamentos={departamentos}
                orientadores={orientadores}
                paises={paises}
                personas={personas}
                tiposPrograma={tiposPrograma}
              />
            )}
          </>
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

export default ProyectoCreador;