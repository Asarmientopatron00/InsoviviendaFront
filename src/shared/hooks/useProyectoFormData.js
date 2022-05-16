import {useEffect, useState} from 'react'
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';

export const useProyectoFormData = () => {
  const [state, setState] = useState({
    isLoading: true,
    personas: [],
    tiposPrograma: [],
    paises: [],
    departamentos: [],
    ciudades: [],
    comunas: [],
    barrios: [],
    bancos: [],
    orientadores: [],
  });

  const getProyectoFormData = async () => {
    const personasPromise = jwtAxios.get('personas', {params: {ligera: true}});
    const tiposProgramaPromise = jwtAxios.get('tipos-programa', {params: {ligera: true}});
    const paisesPromise = jwtAxios.get('paises', {params: {ligera: true}});
    const departamentosPromise = jwtAxios.get('departamentos', {params: {ligera: true}});
    const ciudadesPromise = jwtAxios.get('ciudades', {params: {ligera: true}});
    const comunasPromise = jwtAxios.get('comunas', {params: {ligera: true}});
    const barriosPromise = jwtAxios.get('barrios', {params: {ligera: true}});
    const bancosPromise = jwtAxios.get('bancos', {params: {ligera: true}});
    const orientadoresPromise = jwtAxios.get('orientadores', {params: {ligera: true}});

    const [
      personasResp,
      tiposProgramaResp,
      paisesResp,
      departamentosResp,
      ciudadesResp,
      comunasResp,
      barriosResp,
      bancosResp,
      orientadoresResp,
    ] = await Promise.all([
      personasPromise,
      tiposProgramaPromise,
      paisesPromise,
      departamentosPromise,
      ciudadesPromise,
      comunasPromise,
      barriosPromise,
      bancosPromise,
      orientadoresPromise,
    ]);

    setState({
      isLoading: false,
      personas: personasResp.data,
      tiposPrograma: tiposProgramaResp.data,
      paises: paisesResp.data,
      departamentos: departamentosResp.data,
      ciudades: ciudadesResp.data,
      comunas: comunasResp.data,
      barrios: barriosResp.data,
      bancos: bancosResp.data,
      orientadores: orientadoresResp.data,
    })
  };

  useEffect(() => {
    getProyectoFormData();
  },[]);

  return {...state}
}
