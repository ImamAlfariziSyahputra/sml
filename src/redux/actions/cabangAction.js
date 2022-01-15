import Axios from 'axios';
import * as CabangType from '../constants/CabangConst';

export const getCabangs = () => async (dispatch) => {
  dispatch({
    type: CabangType.GET_CABANGS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/cabang`);
    dispatch({
      type: CabangType.GET_CABANGS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CabangType.GET_CABANGS_FAIL,
      payload: err.message
    });
  }
};

export const getCabang = (id) => async (dispatch) => {
  dispatch({
    type: CabangType.GET_CABANG_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/cabang/${id}`);
    dispatch({
      type: CabangType.GET_CABANG_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CabangType.GET_CABANG_FAIL,
      payload: err.message
    });
  }
};

export const addCabang = (cabang) => async (dispatch) => {
  dispatch({
    type: CabangType.ADD_CABANG_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/cabang`, cabang);
    dispatch({
      type: CabangType.ADD_CABANG_SUCCESS
    });
    dispatch(getCabangs());
  } catch (err) {
    dispatch({
      type: CabangType.ADD_CABANG_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateCabang = (cabang, id) => async (dispatch) => {
  dispatch({
    type: CabangType.UPDATE_CABANG_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/cabang/${id}`, cabang);
    dispatch({
      type: CabangType.UPDATE_CABANG_SUCCESS
    });
    dispatch(getCabangs());
  } catch (err) {
    dispatch({
      type: CabangType.UPDATE_CABANG_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteCabang = (id) => async (dispatch) => {
  dispatch({
    type: CabangType.DELETE_CABANG_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/cabang/${id}`);
    dispatch({
      type: CabangType.DELETE_CABANG_SUCCESS
    });
    dispatch(getCabangs());
  } catch (err) {
    dispatch({
      type: CabangType.DELETE_CABANG_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetCabang = () => (dispatch) => {
  dispatch({
    type: CabangType.RESET_CABANG
  });
};
