import * as KaryawanType from '../constants/KaryawanConst';

const initialState = {
  karyawans: [],
  karyawan: {},
  loading: true
};

const karyawanReducers = (state = initialState, action) => {
  switch (action.type) {
    case KaryawanType.GET_KARYAWANS_REQUEST:
    case KaryawanType.GET_KARYAWAN_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case KaryawanType.GET_KARYAWANS_SUCCESS:
      return {
        ...state,
        karyawans: action.payload,
        error: null,
        loading: false
      };
    case KaryawanType.GET_KARYAWANS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case KaryawanType.GET_KARYAWAN_SUCCESS:
      return {
        ...state,
        karyawan: action.payload,
        error: null,
        loading: false
      };
    case KaryawanType.GET_KARYAWAN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case KaryawanType.ADD_KARYAWAN_SUCCESS:
    case KaryawanType.UPDATE_KARYAWAN_SUCCESS:
    case KaryawanType.DELETE_KARYAWAN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case KaryawanType.ADD_KARYAWAN_FAIL:
    case KaryawanType.UPDATE_KARYAWAN_FAIL:
    case KaryawanType.DELETE_KARYAWAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case KaryawanType.RESET_KARYAWAN:
      return {
        ...state,
        karyawan: {}
      };
    default:
      return state;
  }
};

export default karyawanReducers;
