import {
  GET_COLECCION_ORIENTACION,
  SHOW_ORIENTACION,
  UPDATE_ORIENTACION,
  DELETE_ORIENTACION,
  CREATE_ORIENTACION,
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

const OrientacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLECCION_ORIENTACION:
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

    case SHOW_ORIENTACION:
      return {
        ...state,
        selectedRow: action.payload,
      };

    case UPDATE_ORIENTACION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case DELETE_ORIENTACION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    case CREATE_ORIENTACION:
      return {
        ...state,
        selectedRow: action.payload.datos,
      };

    default:
      return state;
  }
};
export default OrientacionReducer;
