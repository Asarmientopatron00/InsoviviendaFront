import {
  EXECUTE_CALCULO_MORA,
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

const CalculoMoraReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXECUTE_CALCULO_MORA:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default CalculoMoraReducer;
