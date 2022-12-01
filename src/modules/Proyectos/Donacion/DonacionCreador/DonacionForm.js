import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, IconButton} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyTextField from 'shared/components/MyTextField';
import MyRadioField from 'shared/components/MyRadioField';
import MyCurrencyField from 'shared/components/MyCurrencyField';
import MySearcher from 'shared/components/MySearcher';
import { Search } from '@material-ui/icons';
import MySelectField from 'shared/components/MySelectField';
import { ESTADOS_DONACIONES } from 'shared/constants/ListaValores';
import { useMemo } from 'react';

const options=[ 
   {value: '1', label: 'Activo'},
   {value: '0', label: 'Inactivo'}, 
];

const useStyles=makeStyles((theme) => ({
   bottomsGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '20px',
      gap: '10px',
      backgroundColor: 'white',
      paddingRight: '20px',
      position: 'sticky',
      left: 0,
      bottom: 0, 
   },
   myTextField: { 
      width: '100%',
      marginBottom: 5,
      [ theme.breakpoints.up('xl') ]: {
         marginBottom: 5, 
     },
      height: '60px', 
      paddingRight: '20px',
   },
   MySelectField: { 
      width: 'auto',                      
      marginBottom: 16,                      
      [theme.breakpoints.up('xl')]: {
         marginBottom: 24, 
     },                      
      color: theme.palette.primary.main,                      
      '&:target': {color: theme.palette.primary.main,}, 
   },
   btnRoot: { 
      paddingLeft: 15,
      paddingRight: 15,
      color: 'white',
      '&:hover': { 
         backgroundColor: theme.palette.colorHover,                  
         cursor: 'pointer',  
     },  
   },
   btnPrymary: {
      backgroundColor: theme.palette.secondary.main,  
   },
   btnSecundary: {
      backgroundColor: theme.palette.primary.main,  
   },
   widthFull: { 
      width: '100%',  
   },
   pointer: { 
      cursor: 'pointer',  
   },
   inputs_4: {
      width: '100%',       
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)', 
   },
   inputs_4_A: {
      width: '100%',       
      display: 'grid',
      gridTemplateColumns: '2fr 2fr', 
   },
   inputs_3_mod: {
      width: '100%',       
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr', 
   },
}));

const DonacionForm=(props) => {
   const {
      handleOnClose, 
      accion, 
      initialValues,
      titulo,
      personas, 
      benefactores, 
      tiposDonacion, 
      formasPago, 
      bancos,
      setFieldValue, 
      values,
      parametros
   } = props;

   const [disabled, setDisabled] = useState(false);
   const [showSearch, setShowSearch] = useState(false);

   useEffect(() => {
      if (accion === 'ver' || initialValues.estado === '0') 
         setDisabled(true);
   }, [initialValues.estado, accion]);

   useEffect(() => {
      if(values.persona_identificacion){
        const persona = personas.find((persona) => persona.identificacion == values.persona_identificacion) //eslint-disable-line
        setFieldValue('persona_id', persona?.id??'');
      }
    },[values.persona_identificacion]) //eslint-disable-line

    useEffect(() => {
      if(values.benefactor_id){
         const benefactor = benefactores.find((reg) => reg.id === values.benefactor_id);
         if(benefactor){
            setFieldValue('donacionesNombreTercero', benefactor.nombre);
            setFieldValue('donacionesNumeroDocumentoTercero', benefactor.identificacion);
         }
      }
    },[values.benefactor_id]) // eslint-disable-line

   const classes=useStyles(props);

   const handleCloseSearcher = () => {
      setShowSearch(false);
    }
  
    const handleOpenPersonaSearcher = () => {
      setShowSearch(true);
    }
  
    const setSelectedPersona = (id) => {
      setFieldValue('persona_identificacion',id);
    }

    const parametro = useMemo(() => {
      return parametros.find((par) => par.codigo === 'ID_TIPO_DONACION_OTROS_INGRESOS');
    },[parametros]);

    const tipoDonacion = useMemo(() => {
      return tiposDonacion.find((tipo) => tipo.id === values.tipo_donacion_id);
    },[tiposDonacion, values.tipo_donacion_id])

   return (
      <Form noValidate autoComplete='off' className={classes.root}>
         <Scrollbar style = {{maxHeight: 600}}>
            <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
               <Box component='h6' mb={{xs: 4, xl: 6}} fontSize={20} fontWeight={Fonts.MEDIUM}>
                  {titulo}
               </Box>

               <Box px={{md: 5, lg: 8, xl: 10}}>
                  <Box className={classes.inputs_4_A}>
                     <MyAutocomplete 
                        className={classes.myTextField} 
                        label='Tipo de donación' 
                        name='tipo_donacion_id' 
                        disabled={disabled} 
                        options={tiposDonacion} 
                        style={{paddingRight: '10px'}}
                        required
                     />   
                  </Box>
                  {tipoDonacion && (
                     <>
                        <Box className={classes.inputs_4_A}>
                           <MyTextField
                              label='Persona'
                              name='persona_identificacion'
                              InputProps={{
                                 endAdornment: (
                                 <InputAdornment position='end'>
                                    <IconButton 
                                    style={{
                                       pointerEvents: disabled?'none':'auto'
                                    }}
                                    onClick={handleOpenPersonaSearcher}>
                                       <Search/>
                                    </IconButton>
                                 </InputAdornment>
                                 )
                              }}
                              disabled={disabled}
                              className={classes.myTextField}
                           />
                           { showSearch && <MySearcher showForm={showSearch} handleOnClose={handleCloseSearcher} getValue={setSelectedPersona}/> }
                           { parametro && tipoDonacion && parseInt(parametro.valor) !== tipoDonacion.id && (
                              <MyAutocomplete 
                                 className={classes.myTextField} 
                                 label='Benefactor' 
                                 name='benefactor_id' 
                                 disabled={disabled} 
                                 options={benefactores} 
                                 style={{paddingRight: '10px'}}
                                 required
                              />
                           )}
                        </Box>
                        <Box className={classes.inputs_4_A}>
                           <MyTextField 
                              className={classes.myTextField} 
                              label='Nombre Tercero' 
                              name='donacionesNombreTercero' 
                              disabled={disabled} 
                           />
                           <MyTextField 
                              className={classes.myTextField} 
                              label='Número Documento Tercero' 
                              name='donacionesNumeroDocumentoTercero' 
                              disabled={disabled} 
                           />
                        </Box>
                        <Box className={classes.inputs_4}>
                           <MyTextField                             
                              className={classes.myTextField} 
                              label='Fecha donacion' 
                              name='donacionesFechaDonacion' 
                              disabled={disabled} 
                              required
                              InputLabelProps={{
                                 shrink: true,
                              }}
                              type='date'
                           />
                           <MyCurrencyField
                              className={classes.myTextField}
                              label='Valor donación'
                              name='donacionesValorDonacion'
                              disabled={disabled}
                              required
                           />
                           <MySelectField 
                              className={classes.myTextField} 
                              label='Estado donación' 
                              name='donacionesEstadoDonacion' 
                              disabled={disabled} 
                              options={ESTADOS_DONACIONES}
                              required
                           />
                           <MyAutocomplete 
                              className={classes.myTextField} 
                              label='Forma de pago' 
                              name='forma_pago_id' 
                              disabled={disabled} 
                              options={formasPago} 
                              style={{paddingRight: '10px'}}
                              required
                           />
                        </Box>
                        <Box className={classes.inputs_4}>
                           <MyTextField 
                              className={classes.myTextField} 
                              label='Número cheque' 
                              name='donacionesNumeroCheque' 
                              disabled={disabled} 
                           />
                           <MyAutocomplete 
                              className={classes.myTextField} 
                              label='Banco' 
                              name='banco_id' 
                              disabled={disabled} 
                              options={bancos} 
                              style={{paddingRight: '10px'}}
                           />
                           <MyTextField 
                              className={classes.myTextField} 
                              label='Fecha recibo' 
                              name='donacionesFechaRecibo' 
                              disabled={disabled} 
                              required
                              InputLabelProps={{
                                 shrink: true,
                              }}
                              type='date'
                           />   
                        </Box>
                        <MyTextField 
                           className={classes.myTextField} 
                           label='Notas' 
                           name='donacionesNotas' 
                           disabled={disabled}
                           required
                        />
                        <MyRadioField 
                           label='Estado' 
                           name='estado' 
                           // disabled={disabled}
                           options={options} 
                           required 
                        />
                     </>
                  )}
               </Box>        
            </Box>
         </Scrollbar>
         <Box className={classes.bottomsGroup}>
            {accion !== 'ver' 
               ? (   <Button 
                        className={`${classes.btnRoot} ${classes.btnPrymary}`} 
                        variant='contained' 
                        type='submit'>
                        <IntlMessages id='boton.submit' />
                     </Button> ) 
               : ('')}
            <Button 
               className={`${classes.btnRoot} ${classes.btnSecundary}`} 
               onClick={handleOnClose}>
               <IntlMessages id='boton.cancel' />
            </Button>
         </Box>
      </Form>
   );
};

export default DonacionForm;
