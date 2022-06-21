import {
  EXECUTE_CALCULO_MORA,
  SHOW_MESSAGE,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from '../../shared/constants/ActionTypes';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';

export const onExecute = (updateColeccion) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('calcular-mora')
      .then((data) => {
        console.log(data)
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: EXECUTE_CALCULO_MORA,
            payload: data.data,
          });
          updateColeccion();
          dispatch({
            type: SHOW_MESSAGE,
            payload: [data.data.mensajes[0], data.data.mensajes[1]],
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: data.data.mensajes[0]});
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.response.data.mensajes[0]});
      });
  };
};