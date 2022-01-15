import * as SnackbarType from '../constants/SnackbarConst';

const initialState = {
  snackbarOpen: false,
  snackbarSeverity: 'success',
  snackbarMessage: ''
};

const snackbarReducers = (state = initialState, action) => {
  switch (action.type) {
    case SnackbarType.SET_SNACKBAR:
      return {
        ...state,
        snackbarOpen: action.snackbarOpen,
        snackbarSeverity: action.snackbarSeverity,
        snackbarMessage: action.snackbarMessage
      };
    default:
      return state;
  }
};

export default snackbarReducers;
