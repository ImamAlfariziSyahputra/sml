import React, { forwardRef } from 'react';
import { Alert, Slide, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { setSnackbar } from '../../redux/actions/snackbarAction';

const Transition = forwardRef((props, ref) => {
  return <Slide ref={ref} {...props} direction="left" />;
});

const AlertStyled = styled(Alert)(({ theme, severity }) => ({
  width: '100%',
  color: 'white',
  backgroundColor:
    severity === 'success'
      ? theme.palette.success.dark
      : theme.palette.error.main,
  '& .MuiAlert-icon': {
    color: 'white'
  }
}));

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { snackbarOpen, snackbarSeverity, snackbarMessage } = useSelector(
    (state) => state.snackbar
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setSnackbar(false, snackbarSeverity, snackbarMessage));
  };

  return (
    <Snackbar
      open={snackbarOpen}
      TransitionComponent={Transition}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AlertStyled onClose={handleClose} severity={snackbarSeverity}>
        {snackbarMessage}
      </AlertStyled>
    </Snackbar>
  );
}
