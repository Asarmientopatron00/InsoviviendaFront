import {  
   GET_COLECCION_DONACION,
   GET_COLECCION_LIGERA_DONACION,
   SHOW_DONACION,
   UPDATE_DONACION,
   DELETE_DONACION,
   CREATE_DONACION,
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
   identificacionFiltro,
   benefactorFiltro,
   orderByToSend,
) => {
   const {messages} = appIntl();
   const page = currentPage ? currentPage : 0;
   const IdentificacionFiltroAux = identificacionFiltro ? identificacionFiltro : '';
   const benefactorFiltroAux = benefactorFiltro ? benefactorFiltro : '';
   const ordenar_por = orderByToSend ? orderByToSend : '';

   return (dispatch) => {
      dispatch({ type: FETCH_START });
      jwtAxios
         .get('donaciones', { 
            params: { 
               page: page,
               limite: rowsPerPage,
               identificacion: IdentificacionFiltroAux,
               benefactor: benefactorFiltroAux,
               ordenar_por: ordenar_por,
            },
         })
         .then((data) => { 
            if (data.status === 200) {
               dispatch({ type: FETCH_SUCCESS });
               dispatch({ type: GET_COLECCION_DONACION, payload: data });
            } 
            else 
               dispatch({ type: FETCH_ERROR, payload: messages['message.somethingWentWrong'], });
         })
         .catch((error) => { 
            dispatch({ type: FETCH_ERROR, payload: error.message }); 
         });
   };
};

export const onGetColeccionLigera = () => {
   const {messages} = appIntl();
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      jwtAxios
         .get('donaciones', { 
            params: { 
               ligera: true, 
            }, 
         })
         .then((data) => { 
            if (data.status === 200) {
               dispatch({ type: FETCH_SUCCESS });
               dispatch({ type: GET_COLECCION_LIGERA_DONACION, payload: data });
            } 
            else 
               dispatch({ type: FETCH_ERROR, payload: messages['message.somethingWentWrong'], });
         })
         .catch((error) => { 
            dispatch({ type: FETCH_ERROR, payload: error.message }); 
         });
   };
};

export const onShow = (id) => {
   const {messages} = appIntl();
   return (dispatch) => {
      if (id !== 0) {
         dispatch({ type: FETCH_START });
         jwtAxios
            .get('donaciones/' + id)
            .then((data) => { 
               if (data.status === 200) {
                  dispatch({ type: FETCH_SUCCESS });
                  dispatch({ type: SHOW_DONACION, payload: data.data });
               } 
               else 
                  dispatch({ type: FETCH_ERROR, payload: messages['message.somethingWentWrong'], });
            })
            .catch((error) => { 
               dispatch({ type: FETCH_ERROR, payload: error.message }); 
            });
      }
   };
};

export const onUpdate = (params, handleOnClose, updateColeccion) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      jwtAxios
         .put('donaciones/' + params.id, params)
         .then((data) => { 
            if (data.status === 200) {
               dispatch({ type: FETCH_SUCCESS });
               dispatch({ type: UPDATE_DONACION, payload: data.data, });
               updateColeccion();
               handleOnClose();
               dispatch({ type: SHOW_MESSAGE, payload: [data.data.mensajes[0], data.data.mensajes[1]], });
            } 
            else 
               dispatch({ type: FETCH_ERROR, payload: data.data.mensajes[0], });
         })
         .catch((error) => { dispatch({ type: FETCH_ERROR, payload: error.response.data.mensajes[0] }); });
   };
};

export const onDelete = (id) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      jwtAxios
         .delete('donaciones/' + id)
         .then((data) => { 
            if (data.status === 200) {
               dispatch({ type: FETCH_SUCCESS });
               dispatch({ type: SHOW_MESSAGE, payload: [data.data.mensajes[0], data.data.mensajes[1]], });
               dispatch({ type: DELETE_DONACION, payload: data.data });
            } 
            else 
               dispatch({ type: FETCH_ERROR, payload: data.data.mensajes[0] });
         })
         .catch((error) => { 
            if (error.response.data.mensajes) 
               dispatch({ type: FETCH_ERROR, payload: error.response.data.mensajes[0], });
            else 
               dispatch({ type: FETCH_ERROR, payload: error.message });
         });
   };
};

export const onCreate = (params, handleOnClose, updateColeccion) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      jwtAxios
         .post('donaciones', params)
         .then((data) => { 
            if (data.status === 201) {
               dispatch({ type: FETCH_SUCCESS });
               dispatch({ type: CREATE_DONACION, payload: data.data, });
               updateColeccion();
               handleOnClose();
               dispatch({ type: SHOW_MESSAGE, payload: [data.data.mensajes[0], data.data.mensajes[1]], });
            } 
            else 
               dispatch({ type: FETCH_ERROR, payload: data.data.mensajes[0] });
         })
         .catch((error) => { 
            dispatch({ type: FETCH_ERROR, payload: error.response.data.mensajes[0] }); 
         });
   };
};
