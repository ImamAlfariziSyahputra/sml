/* eslint-disable camelcase */
import { Icon } from '@iconify/react';
import { forwardRef, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Dialog,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// Icons
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { deleteHelper } from '../../../../redux/actions/helperAction';

const GreenMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.success.main
}));

const RedMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main
}));

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function TableActionMenu({ id, name }) {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onDelete = () => {
    return dispatch(deleteHelper(id))
      .then(() => {
        setIsOpen(false);
        setConfirmOpen(false);
        dispatch(setSnackbar(true, 'success', 'Data berhasil dihapus.'));
      })
      .catch(() => {
        setIsOpen(false);
        setConfirmOpen(false);
        dispatch(setSnackbar(true, 'error', 'Data gagal dihapus.'));
      });
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <GreenMenuItem
          component={Link}
          onClick={() => setIsOpen(false)}
          to={`/data-master/edit-helper/${id}`}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </GreenMenuItem>

        <RedMenuItem
          onClick={() => {
            setConfirmOpen(true);
          }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </RedMenuItem>

        <Dialog
          open={confirmOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setConfirmOpen(false);
          }}
          aria-describedby="alert-delete-confirmation"
        >
          <DialogTitle>Yakin ingin menghapus "{name}" ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-confirmation">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, voluptatum magnam illum eveniet animi consectetur omnis
              dolore
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsOpen(false);
                setConfirmOpen(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={handleSubmit(onDelete)}
              loading={isSubmitting}
            >
              Agree
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
