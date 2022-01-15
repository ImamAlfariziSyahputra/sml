import Axios from 'axios';
import * as KurirType from '../constants/KurirConst';

export const getKurirs = () => async (dispatch) => {
  dispatch({
    type: KurirType.GET_KURIRS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/kurir`);
    dispatch({
      type: KurirType.GET_KURIRS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: KurirType.GET_KURIRS_FAIL,
      payload: err.message
    });
  }
};

export const getKurir = (id) => async (dispatch) => {
  dispatch({
    type: KurirType.GET_KURIR_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/kurir/${id}`);
    dispatch({
      type: KurirType.GET_KURIR_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: KurirType.GET_KURIR_FAIL,
      payload: err.message
    });
  }
};

export const addKurir = (kurir) => async (dispatch) => {
  dispatch({
    type: KurirType.ADD_KURIR_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/kurir`, kurir);
    dispatch({
      type: KurirType.ADD_KURIR_SUCCESS
    });
    dispatch(getKurirs());
  } catch (err) {
    dispatch({
      type: KurirType.ADD_KURIR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateKurir = (kurir, id) => async (dispatch) => {
  dispatch({
    type: KurirType.UPDATE_KURIR_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/kurir/${id}`, kurir);
    dispatch({
      type: KurirType.UPDATE_KURIR_SUCCESS
    });
    dispatch(getKurirs());
  } catch (err) {
    dispatch({
      type: KurirType.UPDATE_KURIR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteKurir = (id) => async (dispatch) => {
  dispatch({
    type: KurirType.DELETE_KURIR_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/kurir/${id}`);
    dispatch({
      type: KurirType.DELETE_KURIR_SUCCESS
    });
    dispatch(getKurirs());
  } catch (err) {
    dispatch({
      type: KurirType.DELETE_KURIR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetKurir = () => (dispatch) => {
  dispatch({
    type: KurirType.RESET_KURIR
  });
};
