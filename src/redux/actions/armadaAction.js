import Axios from 'axios';
import * as ArmadaType from '../constants/ArmadaConst';

export const getArmadas = () => async (dispatch) => {
  dispatch({
    type: ArmadaType.GET_ARMADAS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/armada`);
    dispatch({
      type: ArmadaType.GET_ARMADAS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: ArmadaType.GET_ARMADAS_FAIL,
      payload: err.message
    });
  }
};

export const getArmada = (id) => async (dispatch) => {
  dispatch({
    type: ArmadaType.GET_ARMADA_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/armada/${id}`);
    dispatch({
      type: ArmadaType.GET_ARMADA_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: ArmadaType.GET_ARMADA_FAIL,
      payload: err.message
    });
  }
};

export const addArmada = (armada) => async (dispatch) => {
  dispatch({
    type: ArmadaType.ADD_ARMADA_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/armada`, armada);
    dispatch({
      type: ArmadaType.ADD_ARMADA_SUCCESS
    });
    dispatch(getArmadas());
  } catch (err) {
    dispatch({
      type: ArmadaType.ADD_ARMADA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateArmada = (armada, id) => async (dispatch) => {
  dispatch({
    type: ArmadaType.UPDATE_ARMADA_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/armada/${id}`, armada);
    dispatch({
      type: ArmadaType.UPDATE_ARMADA_SUCCESS
    });
    dispatch(getArmadas());
  } catch (err) {
    dispatch({
      type: ArmadaType.UPDATE_ARMADA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteArmada = (id) => async (dispatch) => {
  dispatch({
    type: ArmadaType.DELETE_ARMADA_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/armada/${id}`);
    dispatch({
      type: ArmadaType.DELETE_ARMADA_SUCCESS
    });
    dispatch(getArmadas());
  } catch (err) {
    dispatch({
      type: ArmadaType.DELETE_ARMADA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetArmada = () => (dispatch) => {
  dispatch({
    type: ArmadaType.RESET_ARMADA
  });
};
