import Axios from 'axios';
import * as HelperType from '../constants/HelperConst';

export const getHelpers = () => async (dispatch) => {
  dispatch({
    type: HelperType.GET_HELPERS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/helper`);
    dispatch({
      type: HelperType.GET_HELPERS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: HelperType.GET_HELPERS_FAIL,
      payload: err.message
    });
  }
};

export const getHelper = (id) => async (dispatch) => {
  dispatch({
    type: HelperType.GET_HELPER_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/helper/${id}`);
    dispatch({
      type: HelperType.GET_HELPER_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: HelperType.GET_HELPER_FAIL,
      payload: err.message
    });
  }
};

export const addHelper = (helper) => async (dispatch) => {
  dispatch({
    type: HelperType.ADD_HELPER_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/helper`, helper);
    dispatch({
      type: HelperType.ADD_HELPER_SUCCESS
    });
    dispatch(getHelpers());
  } catch (err) {
    dispatch({
      type: HelperType.ADD_HELPER_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateHelper = (helper, id) => async (dispatch) => {
  dispatch({
    type: HelperType.UPDATE_HELPER_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/helper/${id}`, helper);
    dispatch({
      type: HelperType.UPDATE_HELPER_SUCCESS
    });
    dispatch(getHelpers());
  } catch (err) {
    dispatch({
      type: HelperType.UPDATE_HELPER_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteHelper = (id) => async (dispatch) => {
  dispatch({
    type: HelperType.DELETE_HELPER_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/helper/${id}`);
    dispatch({
      type: HelperType.DELETE_HELPER_SUCCESS
    });
    dispatch(getHelpers());
  } catch (err) {
    dispatch({
      type: HelperType.DELETE_HELPER_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetHelper = () => (dispatch) => {
  dispatch({
    type: HelperType.RESET_HELPER
  });
};
