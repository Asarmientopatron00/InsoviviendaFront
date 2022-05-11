import {
  GET_COLECCION_AUDITORIA_PROCESO,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (
  currentPage,
  rowsPerPage,
  orderByToSend,
  nombre_recurso,
  nombre_responsable,
  descripcion_recurso,
  numero_proyecto,
  tipo,
  fecha_desde,
  fecha_hasta,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const ordenar_por = orderByToSend ? orderByToSend : '';
  const nombre_recursoAux = nombre_recurso ? nombre_recurso : '';
  const nombre_responsableAux = nombre_responsable ? nombre_responsable : '';
  const numero_proyectoAux = numero_proyecto ? numero_proyecto : '';
  const descripcion_recursoAux = descripcion_recurso ? descripcion_recurso : '';
  const fecha_desdeAux = fecha_desde ? fecha_desde : '';
  const fecha_hastaAux = fecha_hasta ? fecha_hasta : '';
  const tipoAux = tipo ? tipo : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('auditoria-procesos', {
        params: {
          page: page,
          limite: rowsPerPage,
          ordenar_por: ordenar_por,
          nombre_recurso: nombre_recursoAux,
          nombre_responsable: nombre_responsableAux,
          numero_proyecto: numero_proyectoAux,
          descripcion_recurso: descripcion_recursoAux,
          tipo: tipoAux,
          fecha_desde: fecha_desdeAux,
          fecha_hasta: fecha_hastaAux,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_AUDITORIA_PROCESO, payload: data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
