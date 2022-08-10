import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import { Fonts } from '../../../../shared/constants/AppEnums';
import MyTextField from 'shared/components/MyTextField';
import MyRadioField from 'shared/components/MyRadioField';

const options = [ 
   { value: '1', label: 'Activo' },
   { value: '0', label: 'Inactivo' }, 
];

const useStyles = makeStyles((theme) => ({
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
      '&:target': { color: theme.palette.primary.main,}, 
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
   inputs_2: { 
      width: '100%',       
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)', 
   },
   inputs_4_mod: { 
      width: '100%',       
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 2fr', 
   },
   inputs_3_mod: { 
      width: '100%',       
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr', 
   },
}));

let ciudadesSelec = [];

const PersonaAsesoriaForm = (props) => { 
   const { 
      handleOnClose, 
      accion, 
      initialValues,
      values, 
      titulo,
      tiposIdentificacion,  
      departamentos, 
      ciudades, 
   } = props;

   const [disabled, setDisabled] = useState(false);
   useEffect(() => { 
      if (accion === 'ver' || initialValues.estado === '0') 
         setDisabled(true);
   }, [initialValues.estado, accion]);

   useEffect(() => { 
      if (values.departamento_id)
         ciudadesSelec = ciudades.filter((ciu) => ciu.departamento_id === values.departamento_id) 
      // eslint-disable-next-line  
   }, [values.departamento_id]); 

   const classes = useStyles(props);

   return (
      <Form noValidate autoComplete = 'off' className = {classes.root}>
         <Scrollbar style = {{ maxHeight: 600}}>
            <Box py = {5} px = {{ xs: 5, lg: 8, xl: 10}}>
               <Box component = 'h6' mb = {{ xs: 4, xl: 6}} fontSize = {20} fontWeight = {Fonts.MEDIUM}>
                  { titulo}
               </Box>

               <Box px = {{ md: 5, lg: 8, xl: 10}}>
                  <Box className = {classes.inputs_2}>
                     <MyAutocomplete
                        className = {classes.myTextField}
                        label = 'Tipo Identificación'
                        name = 'tipo_identificacion_id'
                        disabled = {disabled}
                        required
                        options = {tiposIdentificacion }
                        style = {{ 
                        paddingRight: '10px'
                        }}
                        inputValue = {initialValues.tipo_identificacion_id}
                     />
                     <MyTextField                             
                        className = {classes.myTextField} 
                        label = 'Identificación' 
                        name = 'numero_documento' 
                        disabled = {disabled} 
                        required
                     />
                     <MyTextField 
                        className = {classes.myTextField} 
                        label = 'Nombre completo' 
                        name = 'nombre' 
                        disabled = {disabled} 
                        required
                     />
                     <MyTextField 
                        className = {classes.myTextField} 
                        label = 'Telefono' 
                        name = 'telefono' 
                        disabled = {disabled}
                     />
                     <MyTextField   
                        className = {classes.myTextField} 
                        label = 'Celular' 
                        name = 'celular' 
                        disabled = {disabled}
                     />
                     <MyTextField 
                        className = {classes.myTextField} 
                        label = 'Dirección' 
                        name = 'direccion' 
                        disabled = {disabled}
                     />
                     <MyAutocomplete 
                        className = {classes.myTextField} 
                        label = 'Departamento' 
                        name = 'departamento_id' 
                        disabled = {disabled} 
                        options = {departamentos } 
                        style = {{ paddingRight: '10px' }}
                     />
                     <MyAutocomplete 
                        className = {classes.myTextField} 
                        label = 'Ciudad' 
                        name = 'ciudad_id' 
                        disabled = {disabled} 
                        options = {ciudadesSelec} 
                        style = {{ paddingRight: '10px' }}
                     />
                  </Box>
                  <MyTextField 
                     className = {classes.myTextField} 
                     label = 'Observaciones' 
                     name = 'observaciones' 
                     disabled = {disabled}
                  />
                  <MyRadioField 
                     label = 'Estado' 
                     name = 'estado' 
                     disabled = {accion === 'ver' }
                     options = {options } 
                     required 
                  />
               </Box>        
            </Box>
         </Scrollbar>
         <Box className = {classes.bottomsGroup}>
            { accion !== 'ver' 
               ? (   <Button 
                        className = {`${classes.btnRoot} ${classes.btnPrymary}`} 
                        variant = 'contained' 
                        type = 'submit'>
                        <IntlMessages id = 'boton.submit' />
                     </Button> ) 
               : ('')}
            <Button 
               className = {`${classes.btnRoot} ${classes.btnSecundary}`} 
               onClick = {handleOnClose }>
               <IntlMessages id = 'boton.cancel' />
            </Button>
         </Box>
      </Form>
   );
};

export default PersonaAsesoriaForm;
