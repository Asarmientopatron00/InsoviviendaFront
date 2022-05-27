import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyTextField from 'shared/components/MyTextField';
import MyRadioField from 'shared/components/MyRadioField';

const options = [ 
   { value: '1', label: 'Activo' },
   { value: '0', label: 'Inactivo' }, 
];

let departamentosSelec = [];
let ciudadesSelec = [];
let comunasSelec = [];
let barriosSelec = [];

const BenefactorForm = (props) => {
   const { 
      handleOnClose, 
      accion, 
      initialValues,
      values, 
      titulo,
      tiposBenefactor, 
      benefactores, 
      paises, 
      departamentos, 
      ciudades, 
      comunas, 
      barrios
   } = props;

   const [disabled, setDisabled] = useState(false);
   useEffect(() => {
      if (accion === 'ver' || initialValues.estado === '0') 
         setDisabled(true);
   }, [initialValues.estado, accion]);

   useEffect(() => {
      if (values.pais_id)
         departamentosSelec = departamentos.filter((dep) => dep.pais_id === values.pais_id)
      // eslint-disable-next-line 
   }, [values.pais_id]); 

   useEffect(() => {
      if (values.departamento_id)
         ciudadesSelec = ciudades.filter((ciu) => ciu.departamento_id === values.departamento_id) 
      // eslint-disable-next-line  
   }, [values.departamento_id]); 

   useEffect(() => {
      if (values.ciudad_id)
         comunasSelec = comunas.filter((com) => com.ciudad_id === values.ciudad_id)
      // eslint-disable-next-line  
   }, [values.ciudad_id]); 
   
   useEffect(() => {
      if (values.comuna_id)
         barriosSelec = barrios.filter((bar) => bar.comuna_id === values.comuna_id) 
      // eslint-disable-next-line 
   }, [values.comuna_id]); 

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
         '&:target': { color: theme.palette.primary.main, }, 
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
   }));

   const classes = useStyles(props);

   return (
      <Form noValidate autoComplete = 'off' className = {classes.root}>
         <Scrollbar style = {{maxHeight: 600}}>
            <Box py = {5} px = {{xs: 5, lg: 8, xl: 10}}>
               <Box component = 'h6' mb = {{xs: 4, xl: 6}} fontSize = {20} fontWeight = {Fonts.MEDIUM}>
                  {titulo}
               </Box>

               <Box px = {{md: 5, lg: 8, xl: 10}} className = {classes.inputs_4}>
                  
                  <MyTextField                             
                     className = { classes.myTextField } 
                     label = 'Identificación' 
                     name = 'benefactoresIdentificacion' 
                     disabled = { disabled } 
                     required
                  />
                  
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Nombres' 
                     name = 'benefactoresNombres' 
                     disabled = { disabled } 
                     required
                  />
                  
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Primer Apellido' 
                     name = 'benefactoresPrimerApellido' 
                     disabled = { disabled } 
                     required
                  />
                  
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Segundo Apellido' 
                     name = 'benefactoresSegundoApellido' 
                     disabled = { disabled } 
                  />
                  
                  <MyAutocomplete 
                     className = { classes.myTextField } 
                     label = 'Tipo de benefactor' 
                     name = 'tipo_benefactor_id' 
                     disabled = { disabled } 
                     options = { tiposBenefactor } 
                     style = {{ paddingRight: '10px' }}
                     required
                  />
                  
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Nombre persona contacto' 
                     name = 'benefactoresNombrePerContacto' 
                     disabled = { disabled }
                  />
                  
                  <MyAutocomplete 
                     className = { classes.myTextField } 
                     label = 'Benefactor referencia' 
                     name = 'benefactor_id' 
                     disabled = { disabled } 
                     options = { benefactores } 
                     style = {{ paddingRight: '10px' }}
                  />
                  
                  <MyAutocomplete 
                     className = { classes.myTextField } 
                     label = 'País' 
                     name = 'pais_id' 
                     disabled = { disabled } 
                     options = { paises } 
                     style = {{ paddingRight: '10px' }}
                     required
                  />
                  
                  <MyAutocomplete 
                     className = { classes.myTextField } 
                     label = 'Departamento' 
                     name = 'departamento_id' 
                     disabled = { disabled } 
                     options = { departamentosSelec } 
                     style = {{ paddingRight: '10px' }}
                     required
                  />
                  
                  <MyAutocomplete 
                     className = { classes.myTextField } 
                     label = 'Ciudad' 
                     name = 'ciudad_id' 
                     disabled = { disabled } 
                     options = { ciudadesSelec } 
                     style = {{ paddingRight: '10px' }}
                     required
                  />
                  
                  <MyAutocomplete 
                     className = { classes.myTextField } 
                     label = 'Comuna' 
                     name = 'comuna_id' 
                     disabled = { disabled } 
                     options = { comunasSelec } 
                     style = {{ paddingRight: '10px' }}
                  />
                  
                  <MyAutocomplete 
                     className = { classes.myTextField } 
                     label = 'Barrio' 
                     name = 'barrio_id' 
                     disabled = { disabled } 
                     options = { barriosSelec } 
                     style = {{ paddingRight: '10px' }}
                  />
                  
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Dirección' 
                     name = 'benefactoresDireccion' 
                     disabled = { disabled }
                     required
                  />
                  
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Telefono fijo' 
                     name = 'benefactoresTelefonoFijo' 
                     disabled = { disabled }
                  />
                  
                  <MyTextField   
                     className = { classes.myTextField } 
                     label = 'Celular' 
                     name = 'benefactoresTelefonoCelular' 
                     disabled = { disabled }
                  />
                  
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Correo' 
                     name = 'benefactoresCorreo' 
                     disabled = { disabled }
                     required
                  />
               </Box>

               <Box px = {{md: 5, lg: 8, xl: 10}}>       
                  <MyTextField 
                     className = { classes.myTextField } 
                     label = 'Notas' 
                     name = 'benefactoresNotas' 
                     disabled = { disabled }
                     required
                  />
               </Box>

               <Box px = {{md: 5, lg: 8, xl: 10}} className = {classes.inputs_4}>       
                  <MyRadioField 
                     label = 'Estado' 
                     name = 'estado' 
                     // disabled = { disabled }
                     options = { options } 
                     required 
                  />
               </Box>
            </Box>
         </Scrollbar>
         <Box className = {classes.bottomsGroup}>
            {accion !== 'ver' 
               ? (   <Button 
                        className = {`${classes.btnRoot} ${classes.btnPrymary}`} 
                        variant = 'contained' 
                        type = 'submit'>
                        <IntlMessages id = 'boton.submit' />
                     </Button> ) 
               : ('')}
            <Button 
               className = {`${classes.btnRoot} ${classes.btnSecundary}`} 
               onClick = {handleOnClose}>
               <IntlMessages id = 'boton.cancel' />
            </Button>
         </Box>
      </Form>
   );
};

export default BenefactorForm;
