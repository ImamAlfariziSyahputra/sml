import Axios from 'axios';
import * as PenggunaType from '../constants/PenggunaConst';

export const getPenggunas = () => async (dispatch) => {
  dispatch({
    type: PenggunaType.GET_PENGGUNAS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/pengguna`);
    dispatch({
      type: PenggunaType.GET_PENGGUNAS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PenggunaType.GET_PENGGUNAS_FAIL,
      payload: err.message
    });
  }
};

export const getPengguna = (id) => async (dispatch) => {
  dispatch({
    type: PenggunaType.GET_PENGGUNA_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/pengguna/${id}`);
    dispatch({
      type: PenggunaType.GET_PENGGUNA_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PenggunaType.GET_PENGGUNA_FAIL,
      payload: err.message
    });
  }
};

export const addPengguna = (pengguna) => async (dispatch) => {
  dispatch({
    type: PenggunaType.ADD_PENGGUNA_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/pengguna`, pengguna);
    dispatch({
      type: PenggunaType.ADD_PENGGUNA_SUCCESS
    });
    dispatch(getPenggunas());
  } catch (err) {
    dispatch({
      type: PenggunaType.ADD_PENGGUNA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updatePengguna = (pengguna, id) => async (dispatch) => {
  dispatch({
    type: PenggunaType.UPDATE_PENGGUNA_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/pengguna/${id}`, pengguna);
    dispatch({
      type: PenggunaType.UPDATE_PENGGUNA_SUCCESS
    });
    dispatch(getPenggunas());
  } catch (err) {
    dispatch({
      type: PenggunaType.UPDATE_PENGGUNA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deletePengguna = (id) => async (dispatch) => {
  dispatch({
    type: PenggunaType.DELETE_PENGGUNA_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/pengguna/${id}`);
    dispatch({
      type: PenggunaType.DELETE_PENGGUNA_SUCCESS
    });
    dispatch(getPenggunas());
  } catch (err) {
    dispatch({
      type: PenggunaType.DELETE_PENGGUNA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetPengguna = () => (dispatch) => {
  dispatch({
    type: PenggunaType.RESET_PENGGUNA
  });
};
