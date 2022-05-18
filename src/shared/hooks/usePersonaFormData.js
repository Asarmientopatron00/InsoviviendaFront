import {useEffect, useState} from 'react'
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';

export const usePersonaFormData = () => {
  const [state, setState] = useState({
    isLoading: true,
    tiposIdentificacion: [],
    paises: [],
    departamentos: [],
    ciudades: [],
    comunas: [],
    barrios: [],
    tiposParentesco: [],
    tiposDiscapacidad: [],
    familias: [],
    estadosCiviles: [],
    epses: [],
    gradosEscolaridad: [],
    ocupaciones: [],
    tiposPoblacion: [],
    tiposVivienda: [],
    tiposTecho: [],
    tiposPiso: [],
    tiposDivision: [],
  });

  const getPersonaFormData = async () => {
    const tiposIdentificacionPromise = jwtAxios.get('tipos-identificacion', {params: {ligera: true}});
    const paisesPromise = jwtAxios.get('paises', {params: {ligera: true}});
    const departamentosPromise = jwtAxios.get('departamentos', {params: {ligera: true}});
    const ciudadesPromise = jwtAxios.get('ciudades', {params: {ligera: true}});
    const comunasPromise = jwtAxios.get('comunas', {params: {ligera: true}});
    const barriosPromise = jwtAxios.get('barrios', {params: {ligera: true}});
    const tiposParentescoPromise = jwtAxios.get('tipos-parentesco', {params: {ligera: true}});
    const tiposDiscapacidadPromise = jwtAxios.get('tipos-discapacidad', {params: {ligera: true}});
    const familiasPromise = jwtAxios.get('familias', {params: {ligera: true}});
    const estadosCivilesPromise = jwtAxios.get('estados-civil', {params: {ligera: true}});
    const epsesPromise = jwtAxios.get('eps', {params: {ligera: true}});
    const gradosEscolaridadPromise = jwtAxios.get('grado-escolaridad', {params: {ligera: true}});
    const ocupacionesPromise = jwtAxios.get('ocupaciones', {params: {ligera: true}});
    const tiposPoblacionPromise = jwtAxios.get('tipos-poblacion', {params: {ligera: true}});
    const tiposViviendaPromise = jwtAxios.get('tipos-vivienda', {params: {ligera: true}});
    const tiposTechoPromise = jwtAxios.get('tipos-techo', {params: {ligera: true}});
    const tiposPisoPromise = jwtAxios.get('tipos-piso', {params: {ligera: true}});
    const tiposDivisionPromise = jwtAxios.get('tipos-division', {params: {ligera: true}});

    const [
      tiposIdentificacionResp,
      paisesResp,
      departamentosResp,
      ciudadesResp,
      comunasResp,
    ] = await Promise.all([
      tiposIdentificacionPromise,
      paisesPromise,
      departamentosPromise,
      ciudadesPromise,
      comunasPromise,
    ]);

    const [
      barriosResp,
      tiposParentescoResp,
      tiposDiscapacidadResp,
      familiasResp,
      estadosCivilesResp,
    ] = await Promise.all([
      barriosPromise,
      tiposParentescoPromise,
      tiposDiscapacidadPromise,
      familiasPromise,
      estadosCivilesPromise,
    ]);

    const [
      epsesResp,
      gradosEscolaridadResp,
      ocupacionesResp,
      tiposPoblacionResp,
      tiposViviendaResp,
    ] = await Promise.all([
      epsesPromise,
      gradosEscolaridadPromise,
      ocupacionesPromise,
      tiposPoblacionPromise,
      tiposViviendaPromise,
    ]);

    const [
      tiposTechoResp,
      tiposPisoResp,
      tiposDivisionResp,
    ] = await Promise.all([
      tiposTechoPromise,
      tiposPisoPromise,
      tiposDivisionPromise,
    ]);

    setState({
      isLoading: false,
      tiposIdentificacion: tiposIdentificacionResp.data,
      paises: paisesResp.data,
      departamentos: departamentosResp.data,
      ciudades: ciudadesResp.data,
      comunas: comunasResp.data,
      barrios: barriosResp.data,
      tiposParentesco: tiposParentescoResp.data,
      tiposDiscapacidad: tiposDiscapacidadResp.data,
      familias: familiasResp.data,
      estadosCiviles: estadosCivilesResp.data,
      epses: epsesResp.data,
      gradosEscolaridad: gradosEscolaridadResp.data,
      ocupaciones: ocupacionesResp.data,
      tiposPoblacion: tiposPoblacionResp.data,
      tiposVivienda: tiposViviendaResp.data,
      tiposTecho: tiposTechoResp.data,
      tiposPiso: tiposPisoResp.data,
      tiposDivision: tiposDivisionResp.data,
    })
  };

  useEffect(() => {
    getPersonaFormData();
  },[]);

  return {...state}
}
