import { 
   GET_COLECCION_BENEFACTOR,
   GET_COLECCION_LIGERA_BENEFACTOR,
   SHOW_BENEFACTOR,
   UPDATE_BENEFACTOR,
   DELETE_BENEFACTOR,
   CREATE_BENEFACTOR,
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

const BenefactorReducer = (state = initialState, action) => 
{
   switch (action.type) {
      case GET_COLECCION_BENEFACTOR: 
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
      case GET_COLECCION_LIGERA_BENEFACTOR: 
         return { 
            ...state, 
            ligera: action.payload.data, 
         };
      case SHOW_BENEFACTOR: 
         return { 
            ...state, 
            selectedRow: action.payload, 
         };
      case UPDATE_BENEFACTOR: 
         return { 
            ...state, 
            selectedRow: action.payload.datos, 
         };
      case DELETE_BENEFACTOR: 
         return { 
            ...state, 
            selectedRow: action.payload.datos, 
         };
      case CREATE_BENEFACTOR: 
         return { 
            ...state, 
            selectedRow: action.payload.datos, 
         };
      default: 
         return state;
   }
};

export default BenefactorReducer;
