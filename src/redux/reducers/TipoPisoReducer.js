import {
  GET_COLECCION_TIPOS_PISO,
  GET_COLECCION_LIGERA_TIPOS_PISO,
  SHOW_TIPOS_PISO,
  UPDATE_TIPOS_PISO,
  DELETE_TIPOS_PISO,
  CREATE_TIPOS_PISO,
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

const TipoPisoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_TIPOS_PISO:
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

    case GET_COLECCION_LIGERA_TIPOS_PISO:
      return {
        ...state,
        ligera: action.payload.data,
      };

    case SHOW_TIPOS_PISO:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_TIPOS_PISO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_TIPOS_PISO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_TIPOS_PISO:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default TipoPisoReducer;
