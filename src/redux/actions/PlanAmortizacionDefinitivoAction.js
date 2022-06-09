import {
   GET_COLECCION_PLAN_AMORTIZACION_DEFINITIVO,
   GET_COLECCION_HEADERS_PLAN_AMORTIZACION_DEFINITIVO,
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
   proyecto_id
) => {
   const {messages} = appIntl();
   const page = currentPage ? currentPage : 0;
   const ordenar_por = orderByToSend ? orderByToSend : '';

   return (dispatch) => {
      dispatch({type: FETCH_START});
      jwtAxios
         .get('plan-amortizacion-definitivo/'+proyecto_id, {
         params: {
            page: page,
            limite: rowsPerPage,
            ordenar_por: ordenar_por,
         },
         })
         .then((data) => {
         if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: GET_COLECCION_PLAN_AMORTIZACION_DEFINITIVO, payload: data});
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
   export const onGetHeaders = (
   proyecto_id
   ) => {
   const {messages} = appIntl();

   return (dispatch) => {
      dispatch({type: FETCH_START});
      jwtAxios
         .get('plan-amortizacion-definitivo/'+proyecto_id, {
         params: {
            headerInfo: true,
         },
         })
         .then((data) => {
         if (data.status === 200) {
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: GET_COLECCION_HEADERS_PLAN_AMORTIZACION_DEFINITIVO, payload: data});
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