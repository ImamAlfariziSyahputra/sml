import Axios from 'axios';
import * as KantorCabangType from '../constants/KantorCabangConst';

export const getKantorCabangs = () => async (dispatch) => {
  dispatch({
    type: KantorCabangType.GET_KANTOR_CABANGS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/kantor-cabang`);
    dispatch({
      type: KantorCabangType.GET_KANTOR_CABANGS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: KantorCabangType.GET_KANTOR_CABANGS_FAIL,
      payload: err.message
    });
  }
};

export const getKantorCabang = (id) => async (dispatch) => {
  dispatch({
    type: KantorCabangType.GET_KANTOR_CABANG_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/kantor-cabang/${id}`);
    dispatch({
      type: KantorCabangType.GET_KANTOR_CABANG_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: KantorCabangType.GET_KANTOR_CABANG_FAIL,
      payload: err.message
    });
  }
};

export const addKantorCabang = (kantorCabang) => async (dispatch) => {
  dispatch({
    type: KantorCabangType.ADD_KANTOR_CABANG_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/kantor-cabang`, kantorCabang);
    dispatch({
      type: KantorCabangType.ADD_KANTOR_CABANG_SUCCESS
    });
    dispatch(getKantorCabangs());
  } catch (err) {
    dispatch({
      type: KantorCabangType.ADD_KANTOR_CABANG_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateKantorCabang = (kantorCabang, id) => async (dispatch) => {
  dispatch({
    type: KantorCabangType.UPDATE_KANTOR_CABANG_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/kantor-cabang/${id}`, kantorCabang);
    dispatch({
      type: KantorCabangType.UPDATE_KANTOR_CABANG_SUCCESS
    });
    dispatch(getKantorCabangs());
  } catch (err) {
    dispatch({
      type: KantorCabangType.UPDATE_KANTOR_CABANG_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteKantorCabang = (id) => async (dispatch) => {
  dispatch({
    type: KantorCabangType.DELETE_KANTOR_CABANG_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/kantor-cabang/${id}`);
    dispatch({
      type: KantorCabangType.DELETE_KANTOR_CABANG_SUCCESS
    });
    dispatch(getKantorCabangs());
  } catch (err) {
    dispatch({
      type: KantorCabangType.DELETE_KANTOR_CABANG_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetKantorCabang = () => (dispatch) => {
  dispatch({
    type: KantorCabangType.RESET_KANTOR_CABANG
  });
};
