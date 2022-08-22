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
} from '../../../../redux/actions/PagoAction';
import { onGetColeccionLigera as onGetProyectos } from 'redux/actions/ProyectoAction';
import Slide from '@material-ui/core/Slide';
import PagoForm from './PagoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  proyecto_id: yup.number().required('Requerido'),
  pagosFechaPago: yup.date().required('Requerido'),
  pagosValorTotalPago: yup.number().required('Requerido'),
  pagosDescripcionPago: yup.string().required('Requerido'),
  pagosEstado: yup.string().required('Requerido'),
  pagosObservacionesAnulacion: yup
  .string()
  .nullable()
  .when('pagosEstado', {
    is: '0',
    then: yup.string().required('Debe especificar una razón de anulación')
  }),
});

const PagoCreador = (props) => {
  const {
    pago, 
    handleOnClose, 
    accion, 
    updateColeccion, 
    titulo,
    abonar
  } = props;

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
    ({pagoReducer}) => pagoReducer.selectedRow,
  );
  const proyectos = useSelector(({proyectoReducer}) => proyectoReducer.ligera);

  const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
    dispatch(onGetProyectos());
  }, []); //eslint-disable-line

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
      dispatch(onShow(pago));
    }
  }, [accion, dispatch, pago]);

  return (
    showForm && (
      <Dialog
        open={showForm}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}
        fullWidth
        maxWidth={'sm'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow?.id??'',
              solicitante: '',
              identificacion: '',
              proyecto_id: selectedRow?.proyecto_id??'',
              pagosFechaPago: selectedRow?.pagosFechaPago??'',
              pagosValorTotalPago: selectedRow?.pagosValorTotalPago??'',
              pagosDescripcionPago: selectedRow?.pagosDescripcionPago??'',
              pagosObservacionesAnulacion: selectedRow?.pagosObservacionesAnulacion??'',
              pagosTipo: selectedRow?.pagosTipo??'N',
              pagosEstado: selectedRow
                ? selectedRow.pagosEstado === 1
                  ? '1'
                  : '0'
                : '1',
              abono_extra: abonar
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
              <PagoForm
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                setFieldValue={setFieldValue}
                initialValues={initialValues}
                values={values}
                proyectos={proyectos}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default PagoCreador;
