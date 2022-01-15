import * as PenggunaType from '../constants/PenggunaConst';

const initialState = {
  penggunas: [],
  pengguna: {},
  loading: true
};

const penggunaReducers = (state = initialState, action) => {
  switch (action.type) {
    case PenggunaType.GET_PENGGUNAS_REQUEST:
    case PenggunaType.GET_PENGGUNA_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case PenggunaType.GET_PENGGUNAS_SUCCESS:
      return {
        ...state,
        penggunas: action.payload,
        error: null,
        loading: false
      };
    case PenggunaType.GET_PENGGUNAS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case PenggunaType.GET_PENGGUNA_SUCCESS:
      return {
        ...state,
        pengguna: action.payload,
        error: null,
        loading: false
      };
    case PenggunaType.GET_PENGGUNA_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case PenggunaType.ADD_PENGGUNA_SUCCESS:
    case PenggunaType.UPDATE_PENGGUNA_SUCCESS:
    case PenggunaType.DELETE_PENGGUNA_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case PenggunaType.ADD_PENGGUNA_FAIL:
    case PenggunaType.UPDATE_PENGGUNA_FAIL:
    case PenggunaType.DELETE_PENGGUNA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PenggunaType.RESET_PENGGUNA:
      return {
        ...state,
        pengguna: {}
      };
    default:
      return state;
  }
};

export default penggunaReducers;
