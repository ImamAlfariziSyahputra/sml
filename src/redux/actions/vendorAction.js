import Axios from 'axios';
import * as VendorType from '../constants/VendorConst';

export const getVendors = () => async (dispatch) => {
  dispatch({
    type: VendorType.GET_VENDORS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/vendor`);
    dispatch({
      type: VendorType.GET_VENDORS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: VendorType.GET_VENDORS_FAIL,
      payload: err.message
    });
  }
};

export const getVendor = (id) => async (dispatch) => {
  dispatch({
    type: VendorType.GET_VENDOR_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/vendor/${id}`);
    dispatch({
      type: VendorType.GET_VENDOR_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: VendorType.GET_VENDOR_FAIL,
      payload: err.message
    });
  }
};

export const addVendor = (vendor) => async (dispatch) => {
  dispatch({
    type: VendorType.ADD_VENDOR_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/vendor`, vendor);
    dispatch({
      type: VendorType.ADD_VENDOR_SUCCESS
    });
    dispatch(getVendors());
  } catch (err) {
    dispatch({
      type: VendorType.ADD_VENDOR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateVendor = (vendor, id) => async (dispatch) => {
  dispatch({
    type: VendorType.UPDATE_VENDOR_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/vendor/${id}`, vendor);
    dispatch({
      type: VendorType.UPDATE_VENDOR_SUCCESS
    });
    dispatch(getVendors());
  } catch (err) {
    dispatch({
      type: VendorType.UPDATE_VENDOR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteVendor = (id) => async (dispatch) => {
  dispatch({
    type: VendorType.DELETE_VENDOR_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/vendor/${id}`);
    dispatch({
      type: VendorType.DELETE_VENDOR_SUCCESS
    });
    dispatch(getVendors());
  } catch (err) {
    dispatch({
      type: VendorType.DELETE_VENDOR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetVendor = () => (dispatch) => {
  dispatch({
    type: VendorType.RESET_VENDOR
  });
};
