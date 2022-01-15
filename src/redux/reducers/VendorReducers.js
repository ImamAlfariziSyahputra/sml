import * as VendorType from '../constants/VendorConst';

const initialState = {
  vendors: [],
  vendor: {},
  loading: true
};

const vendorReducers = (state = initialState, action) => {
  switch (action.type) {
    case VendorType.GET_VENDORS_REQUEST:
    case VendorType.GET_VENDOR_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case VendorType.GET_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: action.payload,
        error: null,
        loading: false
      };
    case VendorType.GET_VENDORS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case VendorType.GET_VENDOR_SUCCESS:
      return {
        ...state,
        vendor: action.payload,
        error: null,
        loading: false
      };
    case VendorType.GET_VENDOR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case VendorType.ADD_VENDOR_SUCCESS:
    case VendorType.UPDATE_VENDOR_SUCCESS:
    case VendorType.DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case VendorType.ADD_VENDOR_FAIL:
    case VendorType.UPDATE_VENDOR_FAIL:
    case VendorType.DELETE_VENDOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case VendorType.RESET_VENDOR:
      return {
        ...state,
        vendor: {}
      };
    default:
      return state;
  }
};

export default vendorReducers;
