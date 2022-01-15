import Axios from 'axios';
import * as GrupMenuType from '../constants/GrupMenuConst';

export const getGrupMenus = () => async (dispatch) => {
  dispatch({
    type: GrupMenuType.GET_GRUPMENUS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/grup`);
    dispatch({
      type: GrupMenuType.GET_GRUPMENUS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: GrupMenuType.GET_GRUPMENUS_FAIL,
      payload: err.message
    });
  }
};

export const getGrupMenu = (id) => async (dispatch) => {
  dispatch({
    type: GrupMenuType.GET_GRUPMENU_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/grup/${id}`);
    dispatch({
      type: GrupMenuType.GET_GRUPMENU_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: GrupMenuType.GET_GRUPMENU_FAIL,
      payload: err.message
    });
  }
};

export const addGrupMenu = (grupMenu) => async (dispatch) => {
  dispatch({
    type: GrupMenuType.ADD_GRUPMENU_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/grup`, grupMenu);
    dispatch({
      type: GrupMenuType.ADD_GRUPMENU_SUCCESS
    });
    dispatch(getGrupMenus());
  } catch (err) {
    dispatch({
      type: GrupMenuType.ADD_GRUPMENU_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateGrupMenu = (grupMenu, id) => async (dispatch) => {
  dispatch({
    type: GrupMenuType.UPDATE_GRUPMENU_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/grup/${id}`, grupMenu);
    dispatch({
      type: GrupMenuType.UPDATE_GRUPMENU_SUCCESS
    });
    dispatch(getGrupMenus());
  } catch (err) {
    dispatch({
      type: GrupMenuType.UPDATE_GRUPMENU_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteGrupMenu = (id) => async (dispatch) => {
  dispatch({
    type: GrupMenuType.DELETE_GRUPMENU_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/grup/${id}`);
    dispatch({
      type: GrupMenuType.DELETE_GRUPMENU_SUCCESS
    });
    dispatch(getGrupMenus());
  } catch (err) {
    dispatch({
      type: GrupMenuType.DELETE_GRUPMENU_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetGrupMenu = () => (dispatch) => {
  dispatch({
    type: GrupMenuType.RESET_GRUPMENU
  });
};
