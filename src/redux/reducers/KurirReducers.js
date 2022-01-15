import * as KurirType from '../constants/KurirConst';

const initialState = {
  kurirs: [],
  kurir: {},
  loading: true
};

const kurirReducers = (state = initialState, action) => {
  switch (action.type) {
    case KurirType.GET_KURIRS_REQUEST:
    case KurirType.GET_KURIR_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case KurirType.GET_KURIRS_SUCCESS:
      return {
        ...state,
        kurirs: action.payload,
        error: null,
        loading: false
      };
    case KurirType.GET_KURIRS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case KurirType.GET_KURIR_SUCCESS:
      return {
        ...state,
        kurir: action.payload,
        error: null,
        loading: false
      };
    case KurirType.GET_KURIR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case KurirType.ADD_KURIR_SUCCESS:
    case KurirType.UPDATE_KURIR_SUCCESS:
    case KurirType.DELETE_KURIR_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case KurirType.ADD_KURIR_FAIL:
    case KurirType.UPDATE_KURIR_FAIL:
    case KurirType.DELETE_KURIR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case KurirType.RESET_KURIR:
      return {
        ...state,
        kurir: {}
      };
    default:
      return state;
  }
};

export default kurirReducers;
