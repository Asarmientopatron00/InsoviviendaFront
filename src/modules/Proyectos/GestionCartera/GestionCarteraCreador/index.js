import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';
import {Dialog, Slide} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles/index';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import {CREATE_TYPE, UPDATE_TYPE} from 'shared/constants/Constantes';
import * as yup from 'yup';
import {MessageView, Scrollbar} from '../../../../@crema';
import {onGetColeccionLigera as onGetColeccionLigeraOrientador} from '../../../../redux/actions/OrientadorAction';
import {onCreate, onUpdate} from '../../../../redux/actions/ProyectoAction';
import {Fonts} from '../../../../shared/constants/AppEnums';
import GestionCarteraForm from './GestionCarteraForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  asesor_gestion_cartera_id: yup.number().required('Requerido'),
  asesor_gestion_cartera_identificacion: yup.string().required('Requerido'),
  proyectosObservacionesGestionC: yup.string().nullable(),
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

const GestionCarteraCreador = (props) => {
  const {handleOnClose, updateColeccion, accion, proyecto} = props;
  const [selectedRow, setSelectedRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const getSelectedRow = async () => {
    try {
      setShowForm(false);
      const {data} = await jwtAxios.get(`proyectos/${proyecto}`);
      setSelectedRow(data);
      setShowForm(true);
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const orientadores = useSelector(
    ({orientadorReducer}) => orientadorReducer.ligera,
  );

  const {message, error, messageType} = useSelector(({common}) => common);

  useEffect(() => {
    getSelectedRow();
    dispatch(onGetColeccionLigeraOrientador());
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
      maxWidth={'lg'}>
      <Scrollbar>
        <Formik
          initialStatus={true}
          enableReinitialize={true}
          validateOnBlur={false}
          initialValues={{
            proyecto_id: proyecto,
            asesor_gestion_cartera_id: selectedRow?.asesor?.id ?? '',
            identificacion: selectedRow?.solicitante?.identificacion ?? '',
            solicitante: selectedRow?.solicitante?.nombre ?? '',
            asesor_gestion_cartera_identificacion:
              selectedRow?.asesor?.identificacion ?? '',
            asesor_gestion_cartera_nombre: selectedRow?.asesor?.nombre ?? '',
            proyectosObservacionesGestionC:
              selectedRow?.proyectosObservacionesGestionC ?? '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            const body = {
              id: data.proyecto_id,
              asesor_gestion_cartera_id: data.asesor_gestion_cartera_id,
              proyectosObservacionesGestionC:
                data.proyectosObservacionesGestionC,
              gestion_cartera: true,
            };
            setSubmitting(true);
            if (accion === 'crear') {
              dispatch(onCreate(data, handleOnClose, updateColeccion));
            } else if (accion === 'editar') {
              if (selectedRow) {
                dispatch(onUpdate(body, handleOnClose, updateColeccion));
              }
            }
            setSubmitting(false);
          }}>
          {({values, setFieldValue, initialValues}) => (
            <GestionCarteraForm
              values={values}
              setFieldValue={setFieldValue}
              orientadores={orientadores}
              handleOnClose={handleOnClose}
              accion={accion}
              initialValues={initialValues}
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

export default GestionCarteraCreador;
