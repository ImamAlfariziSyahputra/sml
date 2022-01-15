import Axios from 'axios';
import * as Karyawan from '../constants/KaryawanConst';

export const getKaryawans = () => async (dispatch) => {
  dispatch({
    type: Karyawan.GET_KARYAWANS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/karyawan`);
    dispatch({
      type: Karyawan.GET_KARYAWANS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: Karyawan.GET_KARYAWANS_FAIL,
      payload: err.message
    });
  }
};

export const getKaryawan = (id) => async (dispatch) => {
  dispatch({
    type: Karyawan.GET_KARYAWAN_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/karyawan/${id}`);
    dispatch({
      type: Karyawan.GET_KARYAWAN_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: Karyawan.GET_KARYAWAN_FAIL,
      payload: err.message
    });
  }
};

export const addKaryawan = (karyawan) => async (dispatch) => {
  dispatch({
    type: Karyawan.ADD_KARYAWAN_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/karyawan`, karyawan);
    dispatch({
      type: Karyawan.ADD_KARYAWAN_SUCCESS
    });
    dispatch(getKaryawans());
  } catch (err) {
    dispatch({
      type: Karyawan.ADD_KARYAWAN_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateKaryawan = (karyawan, id) => async (dispatch) => {
  dispatch({
    type: Karyawan.UPDATE_KARYAWAN_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/karyawan/${id}`, karyawan);
    dispatch({
      type: Karyawan.UPDATE_KARYAWAN_SUCCESS
    });
    dispatch(getKaryawans());
  } catch (err) {
    dispatch({
      type: Karyawan.UPDATE_KARYAWAN_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteKaryawan = (id) => async (dispatch) => {
  dispatch({
    type: Karyawan.DELETE_KARYAWAN_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/karyawan/${id}`);
    dispatch({
      type: Karyawan.DELETE_KARYAWAN_SUCCESS
    });
    dispatch(getKaryawans());
  } catch (err) {
    dispatch({
      type: Karyawan.DELETE_KARYAWAN_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetKaryawan = () => (dispatch) => {
  dispatch({
    type: Karyawan.RESET_KARYAWAN
  });
};
