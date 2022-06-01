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
} from '../../../../redux/actions/DonacionAction';
import Slide from '@material-ui/core/Slide';
import DonacionForm from './DonacionForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import moment from 'moment';

import { onGetColeccionLigera as personaLigera } from 'redux/actions/PersonaAction';
import { onGetColeccionLigera as benefactorLigera } from 'redux/actions/BenefactorAction';
import { onGetColeccionLigera as tipoDonacionLigera } from 'redux/actions/TipoDonacionAction';
import { onGetColeccionLigera as formaPagoLigera } from 'redux/actions/FormaPagoAction';
import { onGetColeccionLigera as bancoLigera } from 'redux/actions/BancoAction';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction = 'down' ref = {ref} {...props} />;
});

const validationSchema = yup.object({
   persona_id: yup.string().required('Requerido'),
   benefactor_id: yup.string().required('Requerido'),
   donacionesFechaDonacion: yup.date().required('Requerido'),
   tipo_donacion_id: yup.string().required('Requerido'),
   donacionesValorDonacion: yup.number().required('Requerido'),
   donacionesEstadoDonacion: yup.string().required('Requerido'),
   forma_pago_id: yup.string().required('Requerido'),
   donacionesNumeroRecibo: yup.string().required('Requerido'),
   donacionesFechaRecibo: yup.date().required('Requerido'),
   donacionesNotas: yup.string().required('Requerido'),
   estado: yup.string().required('Requerido'),
});

const DonacionCreador = (props) => {
   const {
      donacion, 
      handleOnClose, 
      accion, 
      updateColeccion, 
      titulo 
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
      ({donacionReducer}) => donacionReducer.selectedRow,
   );

   const personas = useSelector(
      ({personaReducer}) => personaReducer.ligera, 
   );
  
   const benefactores = useSelector(
      ({benefactorReducer}) => benefactorReducer.ligera, 
   );

   const tiposDonacion = useSelector(
      ({tipoDonacionReducer}) => tipoDonacionReducer.ligera, 
   );
   
   const formasPago = useSelector(
      ({formaPagoReducer}) => formaPagoReducer.ligera, 
   );
  
   const bancos = useSelector(
      ({bancoReducer}) => bancoReducer.ligera, 
   );
  
   const initializeSelectedRow = () => {
      selectedRow = null;
   };
  
   useEffect(() => {
      initializeSelectedRow();
      dispatch( personaLigera() );
      dispatch( benefactorLigera() );
      dispatch( tipoDonacionLigera() );
      dispatch( formaPagoLigera() );
      dispatch( bancoLigera() );
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
         dispatch(onShow(donacion));
   }, [accion, dispatch, donacion]);

   return (
      showForm && (
         <Dialog
            open = { showForm }
            onClose = { handleOnClose }
            aria-labelledby = 'simple-modal-title'
            TransitionComponent = {Transition}
            aria-describedby = 'simple-modal-description'
            className = {classes.dialogBox}
            maxWidth = {'md'}
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
                     persona_id: selectedRow 
                        ? selectedRow.persona_id 
                        : '',
                     benefactor_id: selectedRow 
                        ? selectedRow.benefactor_id 
                        : '',
                     donacionesFechaDonacion: selectedRow 
                        ? selectedRow.donacionesFechaDonacion 
                           ? moment(selectedRow.donacionesFechaDonacion).format('YYYY-MM-DD')
                           : ''
                        : '',
                     tipo_donacion_id: selectedRow 
                        ? selectedRow.tipo_donacion_id 
                        : '',
                     donacionesValorDonacion: selectedRow
                        ? selectedRow.donacionesValorDonacion
                           ? selectedRow.donacionesValorDonacion
                           : ''
                        : 0,
                     donacionesEstadoDonacion: selectedRow 
                        ? selectedRow.donacionesEstadoDonacion 
                        : '', 
                     forma_pago_id: selectedRow 
                        ? selectedRow.forma_pago_id 
                        : '',
                     donacionesNumeroCheque: selectedRow 
                        ? selectedRow.donacionesNumeroCheque 
                        : '',
                     banco_id: selectedRow 
                        ? selectedRow.banco_id 
                           ? selectedRow.banco_id 
                           : ''
                        : '',
                     donacionesNumeroRecibo: selectedRow 
                        ? selectedRow.donacionesNumeroRecibo 
                        : '',
                     donacionesFechaRecibo: selectedRow 
                        ? selectedRow.donacionesFechaRecibo 
                           ? moment(selectedRow.donacionesFechaRecibo).format('YYYY-MM-DD')
                           : ''
                        : '',
                     donacionesNotas: selectedRow 
                        ? selectedRow.donacionesNotas 
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
                  {({initialValues}) => (
                     <DonacionForm
                        handleOnClose = { handleOnClose } 
                        accion = { accion }
                        initialValues = { initialValues }
                        titulo = { titulo }
                        personas = { personas }
                        benefactores = { benefactores }
                        tiposDonacion = { tiposDonacion }
                        formasPago = { formasPago }
                        bancos = { bancos }
                     />
                  )}
               </Formik>
            </Scrollbar>
         </Dialog>
      )
   );
};

export default DonacionCreador;
