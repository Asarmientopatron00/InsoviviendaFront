import {
  GET_COLECCION_TIPO_PROGRAMA,
  GET_COLECCION_LIGERA_TIPO_PROGRAMA,
  SHOW_TIPO_PROGRAMA,
  UPDATE_TIPO_PROGRAMA,
  DELETE_TIPO_PROGRAMA,
  CREATE_TIPO_PROGRAMA,
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

const TipoProgramaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_TIPO_PROGRAMA:
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

    case GET_COLECCION_LIGERA_TIPO_PROGRAMA:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_TIPO_PROGRAMA:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_TIPO_PROGRAMA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_TIPO_PROGRAMA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_TIPO_PROGRAMA:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default TipoProgramaReducer;
