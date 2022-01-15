import * as PicFakturType from '../constants/PicFakturConst';

const initialState = {
  picFakturs: [],
  picFaktur: {},
  loading: true
};

const picFakturReducers = (state = initialState, action) => {
  switch (action.type) {
    case PicFakturType.GET_PICFAKTURS_REQUEST:
    case PicFakturType.GET_PICFAKTUR_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case PicFakturType.GET_PICFAKTURS_SUCCESS:
      return {
        ...state,
        picFakturs: action.payload,
        error: null,
        loading: false
      };
    case PicFakturType.GET_PICFAKTURS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case PicFakturType.GET_PICFAKTUR_SUCCESS:
      return {
        ...state,
        picFaktur: action.payload,
        error: null,
        loading: false
      };
    case PicFakturType.GET_PICFAKTUR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case PicFakturType.ADD_PICFAKTUR_SUCCESS:
    case PicFakturType.UPDATE_PICFAKTUR_SUCCESS:
    case PicFakturType.DELETE_PICFAKTUR_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case PicFakturType.ADD_PICFAKTUR_FAIL:
    case PicFakturType.UPDATE_PICFAKTUR_FAIL:
    case PicFakturType.DELETE_PICFAKTUR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PicFakturType.RESET_PICFAKTUR:
      return {
        ...state,
        picFaktur: {}
      };
    default:
      return state;
  }
};

export default picFakturReducers;
