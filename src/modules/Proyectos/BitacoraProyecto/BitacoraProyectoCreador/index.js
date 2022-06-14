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
} from '../../../../redux/actions/BitacoraProyectoAction';
import Slide from '@material-ui/core/Slide';
import BitacoraProyectoForm from './BitacoraProyectoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  proyecto_id: yup.number().required('Requerido'),
});

const BitacoraProyectoCreador = (props) => {
  const {BitacoraProyecto, proyecto_id, handleOnClose, accion, updateColeccion, titulo} = props;

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
    ({bitacoraProyectoReducer}) => bitacoraProyectoReducer.selectedRow,
  );

  const proyectos = useSelector(
    ({proyectoReducer}) => proyectoReducer.ligera,
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
      dispatch(onShow(proyecto_id, BitacoraProyecto));
    }
  }, [accion, dispatch, BitacoraProyecto]);

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
              proyecto_id: proyecto_id,
              bitacorasFechaEvento: selectedRow
                ? selectedRow.bitacorasFechaEvento
                  ? moment(selectedRow.bitacorasFechaEvento).format('YYYY-MM-DD')
                  : ''
                : '',
              bitacorasObservaciones: selectedRow
                ? selectedRow.bitacorasObservaciones
                  ? selectedRow.bitacorasObservaciones
                  : ''
                : '',
              bitacorasEstado: selectedRow
                ? selectedRow.bitacorasEstado === 1
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
              <BitacoraProyectoForm
                handleOnClose={handleOnClose}
                titulo={titulo}
                setFieldValue={setFieldValue}
                accion={accion}
                initialValues={initialValues}
                proyectos={proyectos}
                values={values}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default BitacoraProyectoCreador;
