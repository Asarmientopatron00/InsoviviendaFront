import {
   GET_COLECCION_PLAN_AMORTIZACION_DEFINITIVO,
   GET_COLECCION_HEADERS_PLAN_AMORTIZACION_DEFINITIVO,
} from '../../shared/constants/ActionTypes';

const initialState = {
   rows: [],
   ligera: [],
   selectedRow: null,
   desde: 1,
   hasta: 1,
   por_pagina: 1,
   pagina_actual: 1,
   ultima_pagina: 1,
   total: 1,
};

const PlanAmortizacionDefinitivoReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_COLECCION_PLAN_AMORTIZACION_DEFINITIVO:
         return {
         ...state,
         rows: action.payload.data.datos,
         desde: action.payload.data.desde,
         hasta: action.payload.data.hasta,
         por_pagina: action.payload.data.por_pagina,
         pagina_actual: action.payload.data.pagina_actual,
         ultima_pagina: action.payload.data.ultima_pagina,
         total: action.payload.data.total,
         };
      case GET_COLECCION_HEADERS_PLAN_AMORTIZACION_DEFINITIVO:
         return {
         ...state,
         ligera: action.payload.data,
         };

      default:
         return state;
   }
};
export default PlanAmortizacionDefinitivoReducer;
