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
} from '../../../../redux/actions/DesembolsoAction';
import Slide from '@material-ui/core/Slide';
import DesembolsoForm from './DesembolsoForm';
import { onGetColeccionLigera as getBancos } from 'redux/actions/BancoAction';
import { onGetColeccionLigera as getProyectos } from 'redux/actions/ProyectoAction';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  proyecto_id: yup.number().required('Requerido'),
  desembolsosFechaDesembolso: yup.date().required('Requerido'),
  desembolsosValorDesembolso: yup
    .number()
    .required('Requerido')
    .typeError('Debe ser un número')
    .min(1, 'Debe ser al menos 1'),
  desembolsosFechaNormalizacionP: 
    yup
    .date()
    .required('Requerido')
    .min(yup.ref('desembolsosFechaDesembolso'), 'Debe ser mayor a la fecha de desembolso'),
  desembolsosDescripcionDes: yup.string().required('Requerido'),
  banco_id: yup.number().required('Requerido'),
  desembolsosTipoCuentaDes: yup.string().required('Requerido'),
  desembolsosNumeroCuentaDes: yup.number().required('Requerido').typeError('Debe ser un número'),
  desembolsosNumeroComEgreso: yup.number().required('Requerido').typeError('Debe ser un número')
});

const DesembolsoCreador = (props) => {
  const {desembolso, handleOnClose, accion, updateColeccion, titulo} = props;

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
    ({desembolsoReducer}) => desembolsoReducer.selectedRow,
  );

  const bancos = useSelector(({bancoReducer}) => bancoReducer.ligera);
  const proyectos = useSelector(({proyectoReducer}) => proyectoReducer.ligera);

  const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
    dispatch(getBancos());
    dispatch(getProyectos());
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
      dispatch(onShow(desembolso));
    }
  }, [accion, dispatch, desembolso]);

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
        maxWidth={'md'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              proyecto_id: selectedRow ? selectedRow.proyecto_id : '',
              solicitante: selectedRow?.solicitante?.nombre??'',
              identificacion: selectedRow?.solicitante?.identificacion??'',
              desembolsosFechaDesembolso: selectedRow ? selectedRow.desembolsosFechaDesembolso : '',
              desembolsosValorDesembolso: selectedRow ? selectedRow.desembolsosValorDesembolso : '',
              desembolsosFechaNormalizacionP: selectedRow ? selectedRow.desembolsosFechaNormalizacionP : '',
              desembolsosDescripcionDes: selectedRow ? selectedRow.desembolsosDescripcionDes : '',
              banco_id: selectedRow?.banco_id??'',
              desembolsosTipoCuentaDes: selectedRow ? selectedRow.desembolsosTipoCuentaDes : '',
              desembolsosNumeroCuentaDes: selectedRow ? selectedRow.desembolsosNumeroCuentaDes : '',
              desembolsosNumeroComEgreso: selectedRow ? selectedRow.desembolsosNumeroComEgreso : '',
              desembolsosPlanDefinitivo: selectedRow
              ? selectedRow.desembolsosPlanDefinitivo === 1
                ? '1'
                : '0'
              : '0',
              desembolsosEstado: selectedRow
                ? selectedRow.desembolsosEstado === 1
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
              <DesembolsoForm
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                bancos={bancos}
                proyectos={proyectos}
                setFieldValue={setFieldValue}
                initialValues={initialValues}
                values={values}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default DesembolsoCreador;
