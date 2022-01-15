import * as GrupMenuType from '../constants/GrupMenuConst';

const initialState = {
  grupMenus: [],
  grupMenu: {},
  loading: true
};

const grupMenuReducers = (state = initialState, action) => {
  switch (action.type) {
    case GrupMenuType.GET_GRUPMENUS_REQUEST:
    case GrupMenuType.GET_GRUPMENU_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case GrupMenuType.GET_GRUPMENUS_SUCCESS:
      return {
        ...state,
        grupMenus: action.payload,
        error: null,
        loading: false
      };
    case GrupMenuType.GET_GRUPMENUS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GrupMenuType.GET_GRUPMENU_SUCCESS:
      return {
        ...state,
        grupMenu: action.payload,
        error: null,
        loading: false
      };
    case GrupMenuType.GET_GRUPMENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GrupMenuType.ADD_GRUPMENU_SUCCESS:
    case GrupMenuType.UPDATE_GRUPMENU_SUCCESS:
    case GrupMenuType.DELETE_GRUPMENU_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GrupMenuType.ADD_GRUPMENU_FAIL:
    case GrupMenuType.UPDATE_GRUPMENU_FAIL:
    case GrupMenuType.DELETE_GRUPMENU_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GrupMenuType.RESET_GRUPMENU:
      return {
        ...state,
        grupMenu: {}
      };
    default:
      return state;
  }
};

export default grupMenuReducers;
