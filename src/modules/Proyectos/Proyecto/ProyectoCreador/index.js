import React, {useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onCreate,
} from '../../../../redux/actions/ProyectoAction';
import {onGetColeccionLigera as onGetColeccionLigeraPersona} from '../../../../redux/actions/PersonaAction';
import {onGetColeccionLigera as onGetColeccionLigeraOrientador} from '../../../../redux/actions/OrientadorAction';
import ProyectoForm from './ProyectoForm';
// import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
// import {onGetColeccionLigera as departamentosColeccionLigera} from '../../../../redux/actions/DepartamentoAction';
// import {onGetColeccionLigera as gruposPoblacionalesColeccionLigera} from '../../../../redux/actions/GrupoPoblacionalAction';
// import {onGetColeccionLigera as nivelesEscolaridadColeccionLigera} from '../../../../redux/actions/NivelEscolaridadAction';
// import {onGetColeccionLigera as estadosSociopoliticosColeccionLigera} from '../../../../redux/actions/EstadoSociopoliticoAction';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import {UPDATE_TYPE, CREATE_TYPE} from 'shared/constants/Constantes';
import {MessageView} from '../../../../@crema';

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
  remitido_identificacion: yup
    .number()
    .nullable(),
  proyectosZona: yup
    .string()
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
  const {accion} = useParams();
  const handleOnClose = () => {
    history.goBack();
  };
  const dispatch = useDispatch();
  const personas = useSelector(({personaReducer}) => personaReducer.ligera);
  const orientadores = useSelector(({orientadorReducer}) => orientadorReducer.ligera);

  const {message, error, messageType} = useSelector(({common}) => common);

  useEffect(() => {
    dispatch(onGetColeccionLigeraPersona());
    dispatch(onGetColeccionLigeraOrientador());
  }, []); //eslint-disable-line

  if (accion !== 'crear') {
    history.goBack();
  }

  return (
    <Scrollbar>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          persona_id: '',
          persona_identificacion: '',
          nombrePersona: '',
          proyectosEstadoProyecto: '',
          proyectosFechaSolicitud: '',
          proyectosTipoProyecto: '',
          tipo_programa_id: '',
          proyectosRemitido: 'S',
          remitido_id: '',
          nombreRemitente: '',
          remitente_identificacion: '',
          proyectosZona: '',
          orientador_id: '',
          orientador_identificacion: '',
          nombreOrientador: '',
          proyectosObservaciones: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          if (accion === 'crear') {
            dispatch(onCreate(data, handleOnClose));
          }
          setSubmitting(false);
        }}>
        {({values, initialValues, setFieldValue}) => (
          <ProyectoForm
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            personas={personas}
            orientadores={orientadores}
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

export default ProyectoCreador;
