import React, { useEffect } from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onCreateEspecial,
} from '../../../../redux/actions/PagoAction';
import { fetchError, hideMessage } from 'redux/actions';
import PagoEspecialForm from './PagoEspecialForm';
import { Box } from '@material-ui/core';
import { useState } from 'react';

const validationSchema = yup.object({
  proyecto_id: yup.number().required('Requerido'),
  pagosDescripcionPago: yup.string().required('Requerido'),
  pagosFechaPago: yup.date().required('Requerido'),
  pagosValorTotalPago: yup
    .number()
    .required('Requerido')
    .max(yup.ref('pagosValorTotalCuotas'), 'No debe ser mayor al valor total de las cuotas')
    .oneOf([yup.ref('one')], 'Debe corresponder con los valores ingresados'),
  pagosValorTotalCuotas: yup.number().required('Requerido'),
  valorSeguro: yup
    .number()
    .required('Requerido')
    .max(yup.ref('valorSeguroCuotas'), 'No debe ser mayor al valor de seguro de las cuotas'),
  valorSeguroCuotas: yup.number().required('Requerido'),
  valorInteres: yup
    .number()
    .nullable()
    .max(yup.ref('valorInteresCuotas'), 'No debe ser mayor al valor de interés corriente de las cuotas'),
  valorInteresCuotas: yup.number().required('Requerido'),
  valorMora: yup
    .number()
    .nullable()
    .max(yup.ref('valorMoraCuotas'), 'No debe ser mayor al valor de mora de las cuotas'),
  valorMoraCuotas: yup.number().required('Requerido'),
  valorCapital: yup
    .number()
    .nullable()
    .max(yup.ref('valorCapitalCuotas'), 'No debe ser mayor al valor de capital de las cuotas'),
  valorCapitalCuotas: yup.number().required('Requerido'),
  one: yup.number().nullable(),
});

let secuencia = false;

const PagoEspecialCreador = (props) => {
  const {
    selected, 
    proyecto_id,
    cuotaInferior,
    cuotaInferiorSeleccionada,
    cuotaSuperiorSeleccionada,
    resetForm
  } = props;

  const [check, setCheck] = useState({
    condonarSeguro: true,
    condonarMora: true,
    condonarInteres: true
  });

  useEffect(() => {
    verificarSecuencia();
  },[ // eslint-disable-line
    cuotaInferiorSeleccionada, 
    cuotaSuperiorSeleccionada, 
    selected.length
  ]);

  const dispatch = useDispatch();

  const handleCheck = (e) => {
    setCheck({
      ...check,
      [e.target.name]: e.target.checked
    })
  }

  const calcularTotalesCuotas = () => {
    const initialValue = 0;
    const sumSeguro = selected.reduce((prev, current) => parseInt(prev)+parseInt(current.plAmDeValorSeguroCuota), initialValue);
    const sumInteres = selected.reduce((prev, current) => parseInt(prev)+parseInt(current.plAmDeValorInteresCuota), initialValue);
    const sumMora = selected.reduce((prev, current) => parseInt(prev)+parseInt(current.plAmDeValorInteresMora), initialValue);
    const sumCapital = selected.reduce((prev, current) => parseInt(prev)+parseInt(current.plAmDeValorCapitalCuota), initialValue);
    const sumTotal = sumSeguro+sumInteres+sumMora+sumCapital;
    return {
      sumSeguro,
      sumInteres,
      sumMora,
      sumCapital,
      sumTotal
    };
  }
  
  const verificarSecuencia = () => {
    const cuotas = Array.from(
      {length: cuotaSuperiorSeleccionada-cuotaInferiorSeleccionada+1}, 
      (_, index) => index+cuotaInferiorSeleccionada
    );
    secuencia = !cuotas.every((cuota) => selected.some((element) => element.plAmDeNumeroCuota === cuota));
    return secuencia;
  }

  return (
    <Box>
      <Scrollbar>
        <Formik
          initialStatus={true}
          enableReinitialize={true}
          validateOnBlur={false}
          initialValues={{
            proyecto_id: proyecto_id,
            pagosFechaPago: '',
            pagosDescripcionPago: '',
            pagosEstado: '1',
            pagosTipo: 'E',
            pagosValorTotalPago: '',
            pagosValorTotalCuotas: selected?calcularTotalesCuotas().sumTotal:'',
            valorSeguro: '',
            valorSeguroCuotas: selected?calcularTotalesCuotas().sumSeguro:'',
            valorInteres: '',
            valorInteresCuotas: selected?calcularTotalesCuotas().sumInteres:'',
            valorMora: '',
            valorMoraCuotas: selected?calcularTotalesCuotas().sumMora:'',
            valorCapital: '',
            valorCapitalCuotas: selected?calcularTotalesCuotas().sumCapital:'',
            one: '',
            cuotaInicial: cuotaInferiorSeleccionada,
            cuotaFinal: cuotaSuperiorSeleccionada,
            especial: true,
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            let error = false;
            if(cuotaInferiorSeleccionada !== cuotaInferior){
              dispatch(fetchError('La primera cuota disponible para pago debe ser incluida'));
              setTimeout(() => {
                dispatch(hideMessage());
              },4000)
              error = true;
            } else if(secuencia){
              dispatch(fetchError('Las cuotas seleccionadas no son consecutivas'));
              setTimeout(() => {
                dispatch(hideMessage());
              },4000)
              error = true;
            }
            if(!error){
              setSubmitting(true);
              data.condonarSeguro = check.condonarSeguro;
              data.condonarMora = check.condonarMora;
              data.condonarInteres = check.condonarInteres;
              dispatch(onCreateEspecial(data, resetForm));
              setSubmitting(false);
            }
          }}>
          {({values, setFieldValue}) => (
            <PagoEspecialForm
              values={values}
              setFieldValue={setFieldValue}
              resetForm={resetForm}
              check={check}
              handleCheck={handleCheck}
            />
          )}
        </Formik>
      </Scrollbar>
    </Box>
  );
};

export default PagoEspecialCreador;
