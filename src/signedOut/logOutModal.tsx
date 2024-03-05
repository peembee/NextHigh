import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { DialogContentText } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../contexts/appContext';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type LogOutProps = {
  setModalOpen: (close: boolean) => void;
  modalOpen: boolean;
};

export const LogOut = (props: LogOutProps) => {
  const { setModalOpen, modalOpen } = props;
  const { setUser } = useContext(AppContext);

  const handleLogOut = () => {
    setUser(null);
    setModalOpen(false);
    toast.success('You are now logged out');
  };

  return (
    <>
      <BootstrapDialog
        onClose={() => setModalOpen(false)}
        aria-labelledby='customized-dialog-title'
        open={modalOpen}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, justifyContent: 'center' }}
          id='customized-dialog-title'
        >
          <LogoutIcon sx={{ mr: 2 }} />
          Log out
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={() => setModalOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <DialogContentText
            sx={{ color: 'rgba(180, 0, 0, 0.8)' }}
            gutterBottom
          >
            Are you sure about this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleLogOut()}>
            Yes
          </Button>
          <Button autoFocus onClick={() => setModalOpen(false)}>
            No
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
