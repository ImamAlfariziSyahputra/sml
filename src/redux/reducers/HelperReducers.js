import * as HelperType from '../constants/HelperConst';

const initialState = {
  helpers: [],
  helper: {},
  loading: true
};

const helperReducers = (state = initialState, action) => {
  switch (action.type) {
    case HelperType.GET_HELPERS_REQUEST:
    case HelperType.GET_HELPER_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case HelperType.GET_HELPERS_SUCCESS:
      return {
        ...state,
        helpers: action.payload,
        error: null,
        loading: false
      };
    case HelperType.GET_HELPERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case HelperType.GET_HELPER_SUCCESS:
      return {
        ...state,
        helper: action.payload,
        error: null,
        loading: false
      };
    case HelperType.GET_HELPER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case HelperType.ADD_HELPER_SUCCESS:
    case HelperType.UPDATE_HELPER_SUCCESS:
    case HelperType.DELETE_HELPER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case HelperType.ADD_HELPER_FAIL:
    case HelperType.UPDATE_HELPER_FAIL:
    case HelperType.DELETE_HELPER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case HelperType.RESET_HELPER:
      return {
        ...state,
        helper: {}
      };
    default:
      return state;
  }
};

export default helperReducers;
