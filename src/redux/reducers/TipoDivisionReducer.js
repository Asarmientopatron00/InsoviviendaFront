import {
  GET_COLECCION_TIPOS_DIVISION,
  GET_COLECCION_LIGERA_TIPOS_DIVISION,
  SHOW_TIPOS_DIVISION,
  UPDATE_TIPOS_DIVISION,
  DELETE_TIPOS_DIVISION,
  CREATE_TIPOS_DIVISION,
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

const TipoDivisionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_TIPOS_DIVISION:
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

    case GET_COLECCION_LIGERA_TIPOS_DIVISION:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_TIPOS_DIVISION:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_TIPOS_DIVISION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_TIPOS_DIVISION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_TIPOS_DIVISION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default TipoDivisionReducer;
