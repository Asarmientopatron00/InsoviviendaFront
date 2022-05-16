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
import {onGetColeccionLigera as onGetColeccionLigeraTipoPrograma} from '../../../../redux/actions/TipoProgramaAction';
import ProyectoForm from './ProyectoForm';
import {UPDATE_TYPE, CREATE_TYPE} from 'shared/constants/Constantes';
import {MessageView} from '../../../../@crema';
import { Dialog, Slide } from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

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

const useStyles = makeStyles(() => ({
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 600,
      width: '100%',
      // maxHeight:'fit-content'
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
    },
  },
}));

const ProyectoCreador = (props) => {
  const {showForm, handleOnClose, updateColeccion} = props;
  
  const dispatch = useDispatch();
  const personas = useSelector(({personaReducer}) => personaReducer.ligera);
  const orientadores = useSelector(({orientadorReducer}) => orientadorReducer.ligera);
  const tiposPrograma = useSelector(({tipoProgramaReducer}) => tipoProgramaReducer.ligera);

  const {message, error, messageType} = useSelector(({common}) => common);

  useEffect(() => {
    dispatch(onGetColeccionLigeraPersona());
    dispatch(onGetColeccionLigeraOrientador());
    dispatch(onGetColeccionLigeraTipoPrograma());
  }, []); //eslint-disable-line

  const classes = useStyles(props);

  return (
    <Dialog
      open={showForm}
      onClose={handleOnClose}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}
      disableBackdropClick={true}
      maxWidth={'lg'}>
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
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            dispatch(onCreate(data, handleOnClose, updateColeccion));
            setSubmitting(false);
          }}>
          {({values, setFieldValue}) => (
            <ProyectoForm
              values={values}
              setFieldValue={setFieldValue}
              personas={personas}
              orientadores={orientadores}
              tiposPrograma={tiposPrograma}
              handleOnClose={handleOnClose}
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
    </Dialog>
  );
};

export default ProyectoCreador;
