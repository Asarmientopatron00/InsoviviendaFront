import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onUpdate,
} from '../../../../redux/actions/DocumentosProyectoAction';
import Slide from '@material-ui/core/Slide';
import DocumentosProyectoForm from './DocumentosProyectoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
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

const validationSchema = yup.object({
  proyecto_id: yup.number().required('Requerido'),
  tipo_documento_proyecto_id: yup.number().required('Requerido'),
});

const DocumentosProyectoCreador = (props) => {
  const {documentoProyecto, handleOnClose, accion, updateColeccion} = props;

  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const classes = useStyles(props);

  useEffect(() => {
    if (documentoProyecto) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [documentoProyecto]);

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
              id: documentoProyecto ? documentoProyecto.id : '',
              proyecto_id: documentoProyecto ? documentoProyecto.proyecto_id : '',
              fechaSolicitud: documentoProyecto ? moment(documentoProyecto.fechaSolicitud).format('YYYY-MM-DD') : '',
              tipo_documento_proyecto_id: documentoProyecto ? documentoProyecto.tipo_documento_proyecto_id : '',
              tiDoPrDescripcion: documentoProyecto ? documentoProyecto.tiDoPrDescripcion : '',
              tiDoPrEtapa: documentoProyecto ? documentoProyecto.tiDoPrEtapa : '',
              tiDoPrRequerido: documentoProyecto ? documentoProyecto.tiDoPrRequerido === 1 ? '1' : '0' : '1',
              estado: documentoProyecto ? documentoProyecto.estado : '',
              identificacion: documentoProyecto ? documentoProyecto.identificacion : '',
              solicitante: documentoProyecto ? documentoProyecto.solicitante : '',
              docProEstado: documentoProyecto
                ? documentoProyecto.docProEstado === 1
                  ? '1'
                  : '0'
                : '1',
              docProAplica: documentoProyecto
                ? documentoProyecto.docProAplica === 1
                  ? '1'
                  : '0'
                : '1',
              docProEntregado: documentoProyecto
                ? documentoProyecto.docProEntregado === 1
                  ? '1'
                  : '0'
                : '1',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              if (accion === 'editar') {
                if (documentoProyecto) {
                  dispatch(onUpdate(data, handleOnClose, updateColeccion));
                }
              }
              setSubmitting(false);
            }}>
            {({initialValues}) => (
              <DocumentosProyectoForm
                handleOnClose={handleOnClose}
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

export default DocumentosProyectoCreador;
