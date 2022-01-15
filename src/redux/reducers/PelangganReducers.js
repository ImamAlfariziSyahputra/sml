import * as PelangganType from '../constants/PelangganConst';

const initialState = {
  pelanggans: [],
  pelanggan: {},
  loading: true
};

const pelangganReducers = (state = initialState, action) => {
  switch (action.type) {
    case PelangganType.GET_PELANGGANS_REQUEST:
    case PelangganType.GET_PELANGGAN_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case PelangganType.GET_PELANGGANS_SUCCESS:
      return {
        ...state,
        pelanggans: action.payload,
        error: null,
        loading: false
      };
    case PelangganType.GET_PELANGGANS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case PelangganType.GET_PELANGGAN_SUCCESS:
      return {
        ...state,
        pelanggan: action.payload,
        error: null,
        loading: false
      };
    case PelangganType.GET_PELANGGAN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case PelangganType.ADD_PELANGGAN_SUCCESS:
    case PelangganType.UPDATE_PELANGGAN_SUCCESS:
    case PelangganType.DELETE_PELANGGAN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case PelangganType.ADD_PELANGGAN_FAIL:
    case PelangganType.UPDATE_PELANGGAN_FAIL:
    case PelangganType.DELETE_PELANGGAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PelangganType.RESET_PELANGGAN:
      return {
        ...state,
        pelanggan: {}
      };
    default:
      return state;
  }
};

export default pelangganReducers;
