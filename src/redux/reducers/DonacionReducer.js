import { 
   GET_COLECCION_DONACION,
   GET_COLECCION_LIGERA_DONACION,
   SHOW_DONACION,
   UPDATE_DONACION,
   DELETE_DONACION,
   CREATE_DONACION,
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

const DonacionReducer = (state = initialState, action) => 
{
   switch (action.type) {
      case GET_COLECCION_DONACION: 
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
      case GET_COLECCION_LIGERA_DONACION: 
         return { 
            ...state, 
            ligera: action.payload.data, 
         };
      case SHOW_DONACION: 
         return { 
            ...state, 
            selectedRow: action.payload, 
         };
      case UPDATE_DONACION: 
         return { 
            ...state, 
            selectedRow: action.payload.datos, 
         };
      case DELETE_DONACION: 
         return { 
            ...state, 
            selectedRow: action.payload.datos, 
         };
      case CREATE_DONACION: 
         return { 
            ...state, 
            selectedRow: action.payload.datos, 
         };
      default: 
         return state;
   }
};

export default DonacionReducer;
