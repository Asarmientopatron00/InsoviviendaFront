import {
    GET_COLECCION_BARRIO,
    GET_COLECCION_LIGERA_BARRIO,
    SHOW_BARRIO,
    UPDATE_BARRIO,
    DELETE_BARRIO,
    CREATE_BARRIO,
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
  
  const BarrioReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COLECCION_BARRIO:
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
  
      case GET_COLECCION_LIGERA_BARRIO:
        return {
          ...state,
          ligera: action.payload.data,
        };
  
      case SHOW_BARRIO:
        return {
          ...state,
          selectedRow: action.payload,
        };
  
      case UPDATE_BARRIO:
        return {
          ...state,
          selectedRow: action.payload.datos,
        };
  
      case DELETE_BARRIO:
        return {
          ...state,
          selectedRow: action.payload.datos,
        };
  
      case CREATE_BARRIO:
        return {
          ...state,
          selectedRow: action.payload.datos,
        };
  
      default:
        return state;
    }
  };
  export default BarrioReducer;
  