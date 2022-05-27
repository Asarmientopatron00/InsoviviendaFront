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
} from '../../../../redux/actions/BenefactorAction';
import Slide from '@material-ui/core/Slide';
import BenefactorForm from './BenefactorForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import { onGetColeccionLigera as tipoBenefactorLigera } from 'redux/actions/TipoBenefactorAction';
import { onGetColeccionLigera as benefactorLigera } from 'redux/actions/BenefactorAction';
import { onGetColeccionLigera as paisLigera } from 'redux/actions/PaisAction';
import { onGetColeccionLigera as departamentoLigera } from 'redux/actions/DepartamentoAction';
import { onGetColeccionLigera as ciudadLigera } from 'redux/actions/CiudadAction';
import { onGetColeccionLigera as comunaLigera } from 'redux/actions/ComunaAction';
import { onGetColeccionLigera as barrioLigera } from 'redux/actions/BarrioAction';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction = 'down' ref = {ref} {...props} />;
});

const validationSchema = yup.object({
   benefactoresIdentificacion: yup.string().required('Requerido'),
   benefactoresNombres: yup.string().required('Requerido'),
   benefactoresPrimerApellido: yup.string().required('Requerido'),
   tipo_benefactor_id: yup.string().required('Requerido'),
   pais_id: yup.string().required('Requerido'),
   departamento_id: yup.string().required('Requerido'),
   ciudad_id: yup.string().required('Requerido'),
   benefactoresDireccion: yup.string().required('Requerido'),
   benefactoresCorreo: yup.string().required('Requerido'),
   benefactoresNotas: yup.string().required('Requerido'),
   estado: yup.string().required('Requerido'),
});

const BenefactorCreador = (props) => {
   const {
      benefactor, 
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
      ({benefactorReducer}) => benefactorReducer.selectedRow,
   );

   const tiposBenefactor = useSelector(
      ({tipoBenefactorReducer}) => tipoBenefactorReducer.ligera, 
   );
  
   const benefactores = useSelector(
      ({benefactorReducer}) => benefactorReducer.ligera, 
   );
  
   const paises = useSelector(
      ({paisReducer}) => paisReducer.ligera, 
   );
  
   const departamentos = useSelector(
      ({departamentoReducer}) => departamentoReducer.ligera, 
   );
  
   const ciudades = useSelector(
      ({ciudadReducer}) => ciudadReducer.ligera, 
   );
  
   const comunas = useSelector(
      ({comunaReducer}) => comunaReducer.ligera, 
   );
  
   const barrios = useSelector(
      ({barrioReducer}) => barrioReducer.ligera, 
   );
  
   const initializeSelectedRow = () => {
      selectedRow = null;
   };
  
   useEffect(() => {
      initializeSelectedRow();
      dispatch( tipoBenefactorLigera() );
      dispatch( benefactorLigera() );
      dispatch( paisLigera() );
      dispatch( departamentoLigera() );
      dispatch( ciudadLigera() );
      dispatch( comunaLigera() );
      dispatch( barrioLigera() );
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
         dispatch(onShow(benefactor));
   }, [accion, dispatch, benefactor]);

   return (
      showForm && (
         <Dialog
            open = { showForm }
            onClose = { handleOnClose }
            aria-labelledby = 'simple-modal-title'
            TransitionComponent = {Transition}
            aria-describedby = 'simple-modal-description'
            className = {classes.dialogBox}
            disableBackdropClick = { true }
            maxWidth = {'lg'}
            fullWidth>
            <Scrollbar>
               <Formik
                  initialStatus = { true }
                  enableReinitialize = { true }
                  validateOnBlur = { false }
                  initialValues = {{
                     id: selectedRow 
                        ? selectedRow.id 
                        : '',
                     benefactoresIdentificacion: selectedRow 
                        ? selectedRow.benefactoresIdentificacion 
                        : '',
                     benefactoresNombres: selectedRow 
                        ? selectedRow.benefactoresNombres 
                        : '', 
                     benefactoresPrimerApellido: selectedRow 
                        ? selectedRow.benefactoresPrimerApellido 
                        : '',
                     benefactoresSegundoApellido: selectedRow 
                        ? selectedRow.benefactoresSegundoApellido 
                        : '',
                     tipo_benefactor_id: selectedRow 
                        ? selectedRow.tipo_benefactor_id 
                        : '',
                     benefactoresNombrePerContacto: selectedRow 
                        ? selectedRow.benefactoresNombrePerContacto 
                        : '',
                     benefactor_id: selectedRow 
                        ? selectedRow.benefactor_id ?
                        selectedRow.benefactor_id : ''
                        : '',
                     pais_id: selectedRow 
                        ? selectedRow.pais_id 
                        : '',
                     departamento_id: selectedRow 
                        ? selectedRow.departamento_id 
                        : '',
                     ciudad_id: selectedRow 
                        ? selectedRow.ciudad_id 
                        : '',
                     comuna_id: selectedRow 
                        ? selectedRow.comuna_id 
                        : '',
                     barrio_id: selectedRow 
                        ? selectedRow.barrio_id 
                        : '',
                     benefactoresDireccion: selectedRow 
                        ? selectedRow.benefactoresDireccion 
                        : '',
                     benefactoresTelefonoFijo: selectedRow 
                        ? selectedRow.benefactoresTelefonoFijo 
                        : '',
                     benefactoresTelefonoCelular: selectedRow 
                        ? selectedRow.benefactoresTelefonoCelular 
                        : '',
                     benefactoresCorreo: selectedRow 
                        ? selectedRow.benefactoresCorreo 
                        : '',
                     benefactoresNotas: selectedRow 
                        ? selectedRow.benefactoresNotas 
                        : '',
                     estado: selectedRow 
                        ? selectedRow.estado === 1 
                           ? '1' 
                           : '0' 
                        : '1',
                  }}
                  validationSchema = {validationSchema}
                  onSubmit = {
                     (data, {setSubmitting}) => {
                        setSubmitting(true);
                        if (accion === 'crear') 
                           dispatch(onCreate(data, handleOnClose, updateColeccion));
                        else if (accion === 'editar') 
                           if (selectedRow) 
                              dispatch(onUpdate(data, handleOnClose, updateColeccion));
                        setSubmitting(false);
                     }
                  }>
                  {({initialValues, values}) => (
                     <BenefactorForm
                        handleOnClose = { handleOnClose } 
                        accion = { accion }
                        initialValues = { initialValues }
                        values = { values }
                        titulo = { titulo }
                        tiposBenefactor = { tiposBenefactor }
                        benefactores = { benefactores }
                        paises = { paises }
                        departamentos = { departamentos }
                        ciudades = { ciudades }
                        comunas = { comunas }
                        barrios = { barrios }
                     />
                  )}
               </Formik>
            </Scrollbar>
         </Dialog>
      )
   );
};

export default BenefactorCreador;
