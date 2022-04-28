import {
  GET_COLECCION_PERSONA,
  GET_COLECCION_LIGERA_PERSONA,
  SHOW_PERSONA,
  UPDATE_PERSONA,
  DELETE_PERSONA,
  CREATE_PERSONA,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

import {appIntl} from '../../@crema/utility/Utils';

export const onGetColeccion = (
  currentPage,
  rowsPerPage,
  nombre,
  identificacion,
  familia,
  primerApellido,
  categoria,
  estado,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const nombreAux = nombre ? nombre : '';
  const identificacionAux = identificacion ? identificacion : '';
  const familiaAux = familia ? familia : '';
  const primerApellidoAux = primerApellido ? primerApellido : '';
  const categoriaAux = categoria ? categoria : '';
  const estadoAux = estado ? estado : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('personas', {
        params: {
          page: page,
          limite: rowsPerPage,
          nombre: nombreAux,
          identificacion: identificacionAux,
          familia: familiaAux,
          primerApellido: primerApellidoAux,
          categoriaAp: categoriaAux,
          estado: estadoAux,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_PERSONA, payload: data});
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

export const onGetColeccionLigera = (
  depto,
  city,
  cmna,
  brro,
  tdto,
  gpoblacional,
  lvlEscolaridad,
  fmly,
) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('personas', {
        params: {
          ligera: true,
          departamento_id: depto,
          ciudad_id: city,
          comuna_id: cmna,
          barrio_id: brro,
          tipo_documento_id: tdto,
          grupo_poblacional_id: gpoblacional,
          nivel_escolaridad_id: lvlEscolaridad,
          familia_id: fmly,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_LIGERA_PERSONA, payload: data});
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

export const onShow = (id) => {
  const {messages} = appIntl();
  return (dispatch) => {
    if (id !== 0) {
      dispatch({type: FETCH_START});
      jwtAxios
        .get('personas/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_PERSONA, payload: data.data});
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
    }
  };
};

export const onUpdate = (params, handleOnClose /*, updateColeccion*/) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .put('personas/' + params.id, params)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_PERSONA,
            payload: data.data,
          });
          // updateColeccion();
          dispatch({
            type: SHOW_MESSAGE,
            payload: [data.data.mensajes[0], data.data.mensajes[1]],
          });
          setTimeout(function () {
            handleOnClose();
          }, 1000);
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: data.data.mensajes[0],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.response.data.mensajes[0]});
      });
  };
};

export const onDelete = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .delete('personas/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: [data.data.mensajes[0], data.data.mensajes[1]],
          });
          dispatch({type: DELETE_PERSONA, payload: data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        if (error.response.data.mensajes) {
          dispatch({
            type: FETCH_ERROR,
            payload: error.response.data.mensajes[0],
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: error.message});
        }
      });
  };
};

export const onCreate = (params, handleOnClose /*, updateColeccion*/) => {
  // const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('personas', params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_PERSONA,
            payload: data.data,
          });
          // updateColeccion();
          dispatch({
            type: SHOW_MESSAGE,
            payload: [data.data.mensajes[0], data.data.mensajes[1]],
          });
          setTimeout(function () {
            handleOnClose();
          }, 1000);
        } else {
          dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.response.data.mensajes[0]});
      });
  };
};
