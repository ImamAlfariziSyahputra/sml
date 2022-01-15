import * as SnackbarType from '../constants/SnackbarConst';

export const setSnackbar =
  (snackbarOpen, snackbarSeverity = 'success', snackbarMessage = '') =>
  async (dispatch) => {
    dispatch({
      type: SnackbarType.SET_SNACKBAR,
      snackbarOpen,
      snackbarSeverity,
      snackbarMessage
    });
  };
