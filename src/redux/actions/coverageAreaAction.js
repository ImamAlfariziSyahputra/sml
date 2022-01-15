import Axios from 'axios';
import * as CoverageAreaType from '../constants/CoverageAreaConst';

export const getCoverageAreas = () => async (dispatch) => {
  dispatch({
    type: CoverageAreaType.GET_COVERAGEAREAS_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/coverage-area`);
    dispatch({
      type: CoverageAreaType.GET_COVERAGEAREAS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CoverageAreaType.GET_COVERAGEAREAS_FAIL,
      payload: err.message
    });
  }
};

export const getCoverageArea = (id) => async (dispatch) => {
  dispatch({
    type: CoverageAreaType.GET_COVERAGEAREA_REQUEST
  });
  try {
    const {
      data: { data }
    } = await Axios.get(`/api/datamaster/get/coverage-area/${id}`);
    dispatch({
      type: CoverageAreaType.GET_COVERAGEAREA_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CoverageAreaType.GET_COVERAGEAREA_FAIL,
      payload: err.message
    });
  }
};

export const addCoverageArea = (coverageArea) => async (dispatch) => {
  dispatch({
    type: CoverageAreaType.ADD_COVERAGEAREA_REQUEST
  });
  try {
    await Axios.post(`/api/datamaster/create/coverage-area`, coverageArea);
    dispatch({
      type: CoverageAreaType.ADD_COVERAGEAREA_SUCCESS
    });
    dispatch(getCoverageAreas());
  } catch (err) {
    dispatch({
      type: CoverageAreaType.ADD_COVERAGEAREA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const updateCoverageArea = (coverageArea, id) => async (dispatch) => {
  dispatch({
    type: CoverageAreaType.UPDATE_COVERAGEAREA_REQUEST
  });
  try {
    await Axios.put(`/api/datamaster/update/coverage-area/${id}`, coverageArea);
    dispatch({
      type: CoverageAreaType.UPDATE_COVERAGEAREA_SUCCESS
    });
    dispatch(getCoverageAreas());
  } catch (err) {
    dispatch({
      type: CoverageAreaType.UPDATE_COVERAGEAREA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const deleteCoverageArea = (id) => async (dispatch) => {
  dispatch({
    type: CoverageAreaType.DELETE_COVERAGEAREA_REQUEST
  });
  try {
    await Axios.delete(`/api/datamaster/delete/coverage-area/${id}`);
    dispatch({
      type: CoverageAreaType.DELETE_COVERAGEAREA_SUCCESS
    });
    dispatch(getCoverageAreas());
  } catch (err) {
    dispatch({
      type: CoverageAreaType.DELETE_COVERAGEAREA_FAIL
      // payload: err.message
    });
    throw Error(err.message);
  }
};

export const resetCoverageArea = () => (dispatch) => {
  dispatch({
    type: CoverageAreaType.RESET_COVERAGEAREA
  });
};
