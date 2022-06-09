import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/OrientacionAction';
import Slide from '@material-ui/core/Slide';
import OrientacionForm from './OrientacionForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import { onGetColeccionLigera } from 'redux/actions/TipoAsesoriaAction';
import { onGetColeccionLigera as onGetColeccionLigeraAsesor} from 'redux/actions/OrientadorAction';
import { onGetColeccionLigera as onGetColeccionLigeraPersona} from 'redux/actions/PersonaAction';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  tipo_orientacion_id: yup
      .number()
      .required('Requerido'),
  orientador_id: yup
      .number()
      .required('Requerido'),
  orientacionesFechaOrientacion: yup
      .date()
      .required('Requerido'),
  persona_id: yup
      .number()
      .required('Requerido'),
  persona_identificacion: yup
      .number()
      .required('Requerido'),
  orientacionesSolicitud: yup.string().required('Requerido'),
  orientacionesNota: yup.string().required('Requerido'),
  orientacionesRespuesta: yup.string().required('Requerido'),
  estado: yup.string().required('Requerido'),
});

const OrientacionCreador = (props) => {
  const {Orientacion, handleOnClose, accion, updateColeccion, titulo} = props;

  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const useStyles = makeStyles((theme) => ({
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

  const classes = useStyles(props);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({orientacionReducer}) => orientacionReducer.selectedRow,
  );

  const tiposAsesorias = useSelector(
    ({tipoAsesoriaReducer}) => tipoAsesoriaReducer.ligera,
  );
 
  const asesores = useSelector(
    ({orientadorReducer}) => orientadorReducer.ligera,
  );
 
  const personas = useSelector(
    ({personaReducer}) => personaReducer.ligera,
  );

   const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
    dispatch(onGetColeccionLigera()); 
    dispatch(onGetColeccionLigeraAsesor());
    dispatch(onGetColeccionLigeraPersona());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (accion === 'crear') {
    initializeSelectedRow();
  }

  useEffect(() => {
    if (selectedRow) {
      setShowForm(true);
    } else if (accion === 'crear') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [selectedRow, accion]);

  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShow(Orientacion));
    }
  }, [accion, dispatch, Orientacion]);

  return (
    showForm && (
      <Dialog
        open={showForm}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}
        maxWidth={'md'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              tipo_orientacion_id: selectedRow ? selectedRow.tipo_orientacion_id: '',
              orientador_id: selectedRow ? selectedRow.orientador_id: '',
              orientacionesFechaOrientacion: selectedRow
                ? selectedRow.orientacionesFechaOrientacion
                  ? moment(selectedRow.orientacionesFechaOrientacion).format('YYYY-MM-DD')
                  : ''
                : '',
              persona_id: selectedRow
                ? selectedRow.persona_id
                  ? selectedRow.persona_id
                  : ''
                : '',
              persona_identificacion: selectedRow
                ? selectedRow?.persona?.identificacion??''
                : '',
              nombrePersona: selectedRow
                ? selectedRow?.persona?.nombre??''
                : '',
              orientacionesSolicitud: selectedRow
                ? selectedRow.orientacionesSolicitud
                  ? selectedRow.orientacionesSolicitud
                  : ''
                : '',
              orientacionesNota: selectedRow
                ? selectedRow.orientacionesNota
                  ? selectedRow.orientacionesNota
                  : ''
                : '',
              orientacionesRespuesta: selectedRow
                ? selectedRow.orientacionesRespuesta
                  ? selectedRow.orientacionesRespuesta
                  : ''
                : '',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              if (accion === 'crear') {
                dispatch(onCreate(data, handleOnClose, updateColeccion));
              } else if (accion === 'editar') {
                if (selectedRow) {
                  dispatch(onUpdate(data, handleOnClose, updateColeccion));
                }
              }
              setSubmitting(false);
            }}>
            {({initialValues, setFieldValue, values}) => (
              <OrientacionForm
                handleOnClose={handleOnClose}
                titulo={titulo}
                setFieldValue={setFieldValue}
                accion={accion}
                initialValues={initialValues}
                tiposAsesorias={tiposAsesorias}
                asesores={asesores}
                personas={personas}
                values={values}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default OrientacionCreador;
