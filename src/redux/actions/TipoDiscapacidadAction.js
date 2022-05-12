import {
    GET_COLECCION_TIPO_DISCAPACIDAD,
    GET_COLECCION_LIGERA_TIPO_DISCAPACIDAD,
    SHOW_TIPO_DISCAPACIDAD,
    UPDATE_TIPO_DISCAPACIDAD,
    DELETE_TIPO_DISCAPACIDAD,
    CREATE_TIPO_DISCAPACIDAD,
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
    orderByToSend,
  ) => {
    const {messages} = appIntl();
    const page = currentPage ? currentPage : 0;
    const nombreAux = nombre ? nombre : '';
    const ordenar_por = orderByToSend ? orderByToSend : '';
  
    return (dispatch) => {
      dispatch({type: FETCH_START});
      jwtAxios
        .get('tipos-discapacidad', {
          params: {
            page: page,
            limite: rowsPerPage,
            nombre: nombreAux,
            ordenar_por: ordenar_por,
          },
        })
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: GET_COLECCION_TIPO_DISCAPACIDAD, payload: data});
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
  
  export const onGetColeccionLigera = () => {
    const {messages} = appIntl();
    return (dispatch) => {
      dispatch({type: FETCH_START});
      jwtAxios
        .get('ttipos-discapacidad', {
          params: {
            ligera: true,
          },
        })
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: GET_COLECCION_LIGERA_TIPO_DISCAPACIDAD, payload: data});
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
          .get('tipos-discapacidad/' + id)
          .then((data) => {
            if (data.status === 200) {
              dispatch({type: FETCH_SUCCESS});
              dispatch({type: SHOW_TIPO_DISCAPACIDAD, payload: data.data});
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
  
  export const onUpdate = (params, handleOnClose, updateColeccion) => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      jwtAxios
        .put('tipos-discapacidad/' + params.id, params)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: UPDATE_TIPO_DISCAPACIDAD,
              payload: data.data,
            });
            updateColeccion();
            handleOnClose();
            dispatch({
              type: SHOW_MESSAGE,
              payload: [data.data.mensajes[0], data.data.mensajes[1]],
            });
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
        .delete('tipos-discapacidad/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: SHOW_MESSAGE,
              payload: [data.data.mensajes[0], data.data.mensajes[1]],
            });
            dispatch({type: DELETE_TIPO_DISCAPACIDAD, payload: data.data});
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
  
  export const onCreate = (params, handleOnClose, updateColeccion) => {
    return (dispatch) => {
      dispatch({type: FETCH_START});
      jwtAxios
        .post('tipos-discapacidad', params)
        .then((data) => {
          if (data.status === 201) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: CREATE_TIPO_DISCAPACIDAD,
              payload: data.data,
            });
            updateColeccion();
            handleOnClose();
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
  