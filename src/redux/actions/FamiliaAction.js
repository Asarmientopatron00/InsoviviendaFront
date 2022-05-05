import {
  GET_COLECCION_FAMILIA,
  GET_COLECCION_LIGERA_FAMILIA,
  SHOW_FAMILIA,
  UPDATE_FAMILIA,
  DELETE_FAMILIA,
  CREATE_FAMILIA,
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
  identificacion,
  tipoFamilia,
  condicionFamilia,
  estado,
  orderByToSend,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  const identificacionAux = identificacion ? identificacion : '';
  const tipoFamiliaAux = tipoFamilia ? tipoFamilia : '';
  const condicionFamiliaAux = condicionFamilia ? condicionFamilia : '';
  const estadoAux = estado ? estado : '';
  const ordenar_por = orderByToSend ? orderByToSend : '';

  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('familias', {
        params: {
          page: page,
          limite: rowsPerPage,
          identificacion: identificacionAux,
          tipoFamilia: tipoFamiliaAux,
          condicionFamilia: condicionFamiliaAux,
          estado: estadoAux,
          ordenar_por: ordenar_por,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_FAMILIA, payload: data});
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
) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('familias', {
        params: {
          ligera: true,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COLECCION_LIGERA_FAMILIA, payload: data});
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
        .get('familias/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SHOW_FAMILIA, payload: data.data});
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
      .put('familias/' + params.id, params)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_FAMILIA,
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
      .delete('familias/' + id)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: [data.data.mensajes[0], data.data.mensajes[1]],
          });
          dispatch({type: DELETE_FAMILIA, payload: data.data});
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
      .post('familias', params)
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: CREATE_FAMILIA,
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
