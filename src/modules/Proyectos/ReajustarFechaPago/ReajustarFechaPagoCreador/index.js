import React, {useEffect} from 'react';
import {Dialog, Slide} from '@material-ui/core';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '@crema';
import {
  onReajustarFecha,
} from 'redux/actions/DesembolsoAction';
import ReajustarFechaPagoForm from './ReajustarFechaPagoForm';
import { onGetColeccionLigera as getProyectos } from 'redux/actions/ProyectoAction';
import {Fonts} from 'shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  proyecto_id: yup.number().required('Requerido'),
  desembolsosFechaNormalizacionP: 
    yup
    .date()
    .required('Requerido'),
});

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

const ReajustarFechaPagoCreador = (props) => {
  const {
    handleOnClose, 
    titulo, 
    showForm
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const proyectos = useSelector(({proyectoReducer}) => proyectoReducer.ligera);

  useEffect(() => {
    dispatch(getProyectos());
  }, []); //eslint-disable-line

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
              proyecto_id: '',
              solicitante: '',
              identificacion: '',
              desembolsosFechaNormalizacionP: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              dispatch(onReajustarFecha(data, handleOnClose));
              setSubmitting(false);
            }}>
            {({initialValues, setFieldValue, values}) => (
              <ReajustarFechaPagoForm
                handleOnClose={handleOnClose}
                titulo={titulo}
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

export default ReajustarFechaPagoCreador;
