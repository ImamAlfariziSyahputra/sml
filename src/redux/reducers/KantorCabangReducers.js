import * as KantorCabangType from '../constants/KantorCabangConst';

const initialState = {
  kantorCabangs: [],
  kantorCabang: {},
  loading: true
};

const kantorCabangReducers = (state = initialState, action) => {
  switch (action.type) {
    case KantorCabangType.GET_KANTOR_CABANGS_REQUEST:
    case KantorCabangType.GET_KANTOR_CABANG_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case KantorCabangType.GET_KANTOR_CABANGS_SUCCESS:
      return {
        ...state,
        kantorCabangs: action.payload,
        error: null,
        loading: false
      };
    case KantorCabangType.GET_KANTOR_CABANGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case KantorCabangType.GET_KANTOR_CABANG_SUCCESS:
      return {
        ...state,
        kantorCabang: action.payload,
        error: null,
        loading: false
      };
    case KantorCabangType.GET_KANTOR_CABANG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case KantorCabangType.ADD_KANTOR_CABANG_SUCCESS:
    case KantorCabangType.UPDATE_KANTOR_CABANG_SUCCESS:
    case KantorCabangType.DELETE_KANTOR_CABANG_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case KantorCabangType.ADD_KANTOR_CABANG_FAIL:
    case KantorCabangType.UPDATE_KANTOR_CABANG_FAIL:
    case KantorCabangType.DELETE_KANTOR_CABANG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case KantorCabangType.RESET_KANTOR_CABANG:
      return {
        ...state,
        kantorCabang: {}
      };
    default:
      return state;
  }
};

export default kantorCabangReducers;
