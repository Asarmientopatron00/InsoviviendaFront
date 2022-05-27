import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {onShow, onUpdate, onCreate,} from '../../../../redux/actions/BenefactorAction';
import Slide from '@material-ui/core/Slide';
import BenefactorForm from './BenefactorForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
// import { onGetColeccionLigera as paisLigera } from 'redux/actions/PaisAction';
// import { onGetColeccionLigera as departamentoLigera } from 'redux/actions/DepartamentoAction';
// import { onGetColeccionLigera as ciudadLigera } from 'redux/actions/CiudadAction';
// import { onGetColeccionLigera as comunaLigera } from 'redux/actions/ComunaAction';
// import { onGetColeccionLigera as barrioLigera } from 'redux/actions/BarrioAction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  asunto: yup.string().required('Requerido'),
  texto: yup.string().required('Requerido'),
  parametros: yup.string().required('Requerido'),
});

const BenefactorCreador = (props) => {
  const {benefactor, handleOnClose, accion, updateColeccion, titulo} = props;

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

  // const paises = useSelector(({paisReducer}) => paisReducer.ligera, );

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({benefactorReducer}) => benefactorReducer.selectedRow,
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
      dispatch(onShow(benefactor));
    }
  }, [accion, dispatch, benefactor]);

  return (
    showForm && (
      <Dialog
        open={showForm}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}
        disableBackdropClick={true}
        maxWidth={'sm'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              nombre: selectedRow ? selectedRow.nombre : '',
              asunto: selectedRow ? selectedRow.asunto : '',
              texto: selectedRow ? selectedRow.texto : '', 
              parametros: selectedRow ? selectedRow.parametros : '',
              estado: selectedRow ? selectedRow.estado === 1 ? '1' : '0' : '1',
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
            {({initialValues}) => (
              <BenefactorForm
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default BenefactorCreador;
