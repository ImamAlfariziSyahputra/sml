import Axios from 'axios';
import * as PicFakturType from '../constants/PicFakturConst';

export const getPicFakturs = () => async (dispatch) => {
  dispatch({
    type: PicFakturType.GET_PICFAKTURS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/faktur`);
    dispatch({
      type: PicFakturType.GET_PICFAKTURS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PicFakturType.GET_PICFAKTURS_FAIL,
      payload: err.message
    });
  }
};

export const getPicFaktur = (id) => async (dispatch) => {
  dispatch({
    type: PicFakturType.GET_PICFAKTUR_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/faktur/${id}`);
    dispatch({
      type: PicFakturType.GET_PICFAKTUR_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PicFakturType.GET_PICFAKTUR_FAIL,
      payload: err.message
    });
  }
};

export const addPicFaktur = (picFaktur) => async (dispatch) => {
  dispatch({
    type: PicFakturType.ADD_PICFAKTUR_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/faktur`, picFaktur);
    dispatch({
      type: PicFakturType.ADD_PICFAKTUR_SUCCESS
    });
    dispatch(getPicFakturs());
  } catch (err) {
    dispatch({
      type: PicFakturType.ADD_PICFAKTUR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updatePicFaktur = (picFaktur, id) => async (dispatch) => {
  dispatch({
    type: PicFakturType.UPDATE_PICFAKTUR_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/faktur/${id}`, picFaktur);
    dispatch({
      type: PicFakturType.UPDATE_PICFAKTUR_SUCCESS
    });
    dispatch(getPicFakturs());
  } catch (err) {
    dispatch({
      type: PicFakturType.UPDATE_PICFAKTUR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deletePicFaktur = (id) => async (dispatch) => {
  dispatch({
    type: PicFakturType.DELETE_PICFAKTUR_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/faktur/${id}`);
    dispatch({
      type: PicFakturType.DELETE_PICFAKTUR_SUCCESS
    });
    dispatch(getPicFakturs());
  } catch (err) {
    dispatch({
      type: PicFakturType.DELETE_PICFAKTUR_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetPicFaktur = () => (dispatch) => {
  dispatch({
    type: PicFakturType.RESET_PICFAKTUR
  });
};
