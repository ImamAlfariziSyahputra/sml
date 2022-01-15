import * as ArmadaType from '../constants/ArmadaConst';

const initialState = {
  armadas: [],
  armada: {},
  loading: true
};

const armadaReducers = (state = initialState, action) => {
  switch (action.type) {
    case ArmadaType.GET_ARMADAS_REQUEST:
    case ArmadaType.GET_ARMADA_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ArmadaType.GET_ARMADAS_SUCCESS:
      return {
        ...state,
        armadas: action.payload,
        error: null,
        loading: false
      };
    case ArmadaType.GET_ARMADAS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ArmadaType.GET_ARMADA_SUCCESS:
      return {
        ...state,
        armada: action.payload,
        error: null,
        loading: false
      };
    case ArmadaType.GET_ARMADA_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ArmadaType.ADD_ARMADA_SUCCESS:
    case ArmadaType.UPDATE_ARMADA_SUCCESS:
    case ArmadaType.DELETE_ARMADA_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case ArmadaType.ADD_ARMADA_FAIL:
    case ArmadaType.UPDATE_ARMADA_FAIL:
    case ArmadaType.DELETE_ARMADA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ArmadaType.RESET_ARMADA:
      return {
        ...state,
        armada: {}
      };
    default:
      return state;
  }
};

export default armadaReducers;
