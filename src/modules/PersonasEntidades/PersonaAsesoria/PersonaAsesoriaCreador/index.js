import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from '../../../../@crema';
import { 
   onShow, 
   onUpdate, 
   onCreate,
} from '../../../../redux/actions/PersonaAsesoriaAction';
import Slide from '@material-ui/core/Slide';
import PersonaAsesoriaForm from './PersonaAsesoriaForm';
import { Fonts } from '../../../../shared/constants/AppEnums';
import { makeStyles } from '@material-ui/core/styles/index';
import { onGetColeccionLigera as tipoIdentificacionLigera } from 'redux/actions/TipoIdentificacionAction';
import { onGetColeccionLigera as departamentoLigera } from 'redux/actions/DepartamentoAction';
import { onGetColeccionLigera as ciudadLigera } from 'redux/actions/CiudadAction';

const Transition = React.forwardRef(function Transition(props, ref) { 
   return <Slide direction = 'down' ref = { ref} { ...props } />;
});

const validationSchema = yup.object({
   tipo_identificacion_id: yup.string().required('Requerido'),
   numero_documento: yup.string().required('Requerido'),
   nombre: yup.string().required('Requerido'),
   telefono: yup.string().nullable(),
   celular: yup.string().nullable(),
   direccion: yup.string().nullable(),
   departamento_id: yup.string().nullable(),
   ciudad_id: yup.string().nullable(),
   observaciones: yup.string().nullable(),
   estado: yup.string().required('Requerido'),
});

const PersonaAsesoriaCreador = (props) => { 
   const { 
      personaAsesoria, 
      handleOnClose, 
      accion, 
      updateColeccion, 
      titulo } = props;

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
      ({personaAsesoriaReducer }) => personaAsesoriaReducer.selectedRow,
   );

   const tiposIdentificacion = useSelector(
      ({tipoIdentificacionReducer }) => tipoIdentificacionReducer.ligera, 
   );
  
   const departamentos = useSelector(
      ({departamentoReducer }) => departamentoReducer.ligera, 
   );
  
   const ciudades = useSelector(
      ({ciudadReducer }) => ciudadReducer.ligera, 
   );
  
   const initializeSelectedRow = () => { 
      selectedRow = null;
   };
  
   useEffect(() => { 
      initializeSelectedRow();
      dispatch( tipoIdentificacionLigera() );
      dispatch( departamentoLigera() );
      dispatch( ciudadLigera() );
      // eslint-disable-next-line 
   }, []);

   if (accion === 'crear') { 
      initializeSelectedRow();
   }

   useEffect(() => { 
      if (selectedRow) 
         setShowForm(true);
      else if (accion === 'crear') 
         setShowForm(true);
      else 
         setShowForm(false);
   }, [selectedRow, accion]);

   useEffect(() => { 
      if ((accion === 'editar') | (accion === 'ver')) 
         dispatch(onShow(personaAsesoria));
   }, [accion, dispatch, personaAsesoria]);

   return (
      showForm && (
         <Dialog
            open = { showForm }
            onClose = { handleOnClose }
            aria-labelledby = 'simple-modal-title'
            TransitionComponent = { Transition}
            aria-describedby = 'simple-modal-description'
            className = { classes.dialogBox}
            maxWidth = { 'md'}
            fullWidth>
            <Scrollbar>
               <Formik
                  initialStatus = { true }
                  enableReinitialize = { true }
                  validateOnBlur = { false }
                  initialValues = { {
                     id: selectedRow 
                        ? selectedRow.id 
                        : '',
                     tipo_identificacion_id: selectedRow 
                        ? selectedRow.tipo_identificacion_id 
                        : '',
                     numero_documento: selectedRow 
                        ? selectedRow.numero_documento 
                        : '',
                     nombre: selectedRow 
                        ? selectedRow.nombre 
                        : '', 
                     telefono: selectedRow 
                        ? selectedRow.telefono 
                        : '',
                     celular: selectedRow 
                        ? selectedRow.celular 
                        : '',
                     direccion: selectedRow 
                        ? selectedRow.direccion 
                        : '',
                     departamento_id: selectedRow 
                        ? selectedRow.departamento_id 
                        : '',
                     ciudad_id: selectedRow 
                        ? selectedRow.ciudad_id 
                        : '',
                     observaciones: selectedRow 
                        ? selectedRow.observaciones 
                        : '',
                     estado: selectedRow 
                        ? selectedRow.estado === 1 
                           ? '1' 
                           : '0' 
                        : '1',
                  }}
                  validationSchema = { validationSchema}
                  onSubmit = { 
                     (data, { setSubmitting}) => { 
                        setSubmitting(true);
                        if (accion === 'crear') 
                           dispatch(onCreate(data, handleOnClose, updateColeccion));
                        else if (accion === 'editar') 
                           if (selectedRow) 
                              dispatch(onUpdate(data, handleOnClose, updateColeccion));
                        setSubmitting(false);
                     }
                  }>
                  { ({initialValues, values }) => (
                     <PersonaAsesoriaForm
                        handleOnClose = { handleOnClose } 
                        accion = { accion }
                        initialValues = { initialValues }
                        values = { values }
                        titulo = { titulo }
                        tiposIdentificacion = { tiposIdentificacion }
                        departamentos = { departamentos }
                        ciudades = { ciudades }
                     />
                  )}
               </Formik>
            </Scrollbar>
         </Dialog>
      )
   );
};

export default PersonaAsesoriaCreador;
