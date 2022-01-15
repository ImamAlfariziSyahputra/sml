import Axios from 'axios';
import * as PelangganType from '../constants/PelangganConst';

export const getPelanggans = () => async (dispatch) => {
  dispatch({
    type: PelangganType.GET_PELANGGANS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/pelanggan`);
    dispatch({
      type: PelangganType.GET_PELANGGANS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PelangganType.GET_PELANGGANS_FAIL,
      payload: err.message
    });
  }
};

export const getPelanggan = (id) => async (dispatch) => {
  dispatch({
    type: PelangganType.GET_PELANGGAN_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/pelanggan/${id}`);
    dispatch({
      type: PelangganType.GET_PELANGGAN_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PelangganType.GET_PELANGGAN_FAIL,
      payload: err.message
    });
  }
};

export const addPelanggan = (pelanggan) => async (dispatch) => {
  dispatch({
    type: PelangganType.ADD_PELANGGAN_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/pelanggan`, pelanggan);
    dispatch({
      type: PelangganType.ADD_PELANGGAN_SUCCESS
    });
    dispatch(getPelanggans());
  } catch (err) {
    dispatch({
      type: PelangganType.ADD_PELANGGAN_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updatePelanggan = (pelanggan, id) => async (dispatch) => {
  dispatch({
    type: PelangganType.UPDATE_PELANGGAN_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/pelanggan/${id}`, pelanggan);
    dispatch({
      type: PelangganType.UPDATE_PELANGGAN_SUCCESS
    });
    dispatch(getPelanggans());
  } catch (err) {
    dispatch({
      type: PelangganType.UPDATE_PELANGGAN_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deletePelanggan = (id) => async (dispatch) => {
  dispatch({
    type: PelangganType.DELETE_PELANGGAN_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/pelanggan/${id}`);
    dispatch({
      type: PelangganType.DELETE_PELANGGAN_SUCCESS
    });
    dispatch(getPelanggans());
  } catch (err) {
    dispatch({
      type: PelangganType.DELETE_PELANGGAN_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetPelanggan = () => (dispatch) => {
  dispatch({
    type: PelangganType.RESET_PELANGGAN
  });
};
