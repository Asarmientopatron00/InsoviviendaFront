import {
    GET_COLECCION_GRADOS_ESCOLARIDAD,
    GET_COLECCION_LIGERA_GRADOS_ESCOLARIDAD,
    SHOW_GRADOS_ESCOLARIDAD,
    UPDATE_GRADOS_ESCOLARIDAD,
    DELETE_GRADOS_ESCOLARIDAD,
    CREATE_GRADOS_ESCOLARIDAD,
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
        .get('grado-escolaridad', {
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
            dispatch({type: GET_COLECCION_GRADOS_ESCOLARIDAD, payload: data});
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
        .get('grado-escolaridad', {
          params: {
            ligera: true,
          },
        })
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: GET_COLECCION_LIGERA_GRADOS_ESCOLARIDAD, payload: data});
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
          .get('grado-escolaridad/' + id)
          .then((data) => {
            if (data.status === 200) {
              dispatch({type: FETCH_SUCCESS});
              dispatch({type: SHOW_GRADOS_ESCOLARIDAD, payload: data.data});
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
       .put ('grado-escolaridad/' + params.id, params)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: UPDATE_GRADOS_ESCOLARIDAD,
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
        .delete('grado-escolaridad/' + id)
        .then((data) => {
          if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: SHOW_MESSAGE,
              payload: [data.data.mensajes[0], data.data.mensajes[1]],
            });
            dispatch({type: DELETE_GRADOS_ESCOLARIDAD, payload: data.data});
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
        .post('grado-escolaridad', params)
        .then((data) => {
          if (data.status === 201) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({
              type: CREATE_GRADOS_ESCOLARIDAD,
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