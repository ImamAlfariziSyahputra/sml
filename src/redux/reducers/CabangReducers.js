import * as CabangType from '../constants/CabangConst';

const initialState = {
  cabangs: [],
  cabang: {},
  loading: true
};

const cabangReducers = (state = initialState, action) => {
  switch (action.type) {
    case CabangType.GET_CABANGS_REQUEST:
    case CabangType.GET_CABANG_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case CabangType.GET_CABANGS_SUCCESS:
      return {
        ...state,
        cabangs: action.payload,
        error: null,
        loading: false
      };
    case CabangType.GET_CABANGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CabangType.GET_CABANG_SUCCESS:
      return {
        ...state,
        cabang: action.payload,
        error: null,
        loading: false
      };
    case CabangType.GET_CABANG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CabangType.ADD_CABANG_SUCCESS:
    case CabangType.UPDATE_CABANG_SUCCESS:
    case CabangType.DELETE_CABANG_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CabangType.ADD_CABANG_FAIL:
    case CabangType.UPDATE_CABANG_FAIL:
    case CabangType.DELETE_CABANG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CabangType.RESET_CABANG:
      return {
        ...state,
        cabang: {}
      };
    default:
      return state;
  }
};

export default cabangReducers;
