import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { AccountSchema } from '../../schemas/accountSchema';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LockIcon from '@mui/icons-material/Lock';
import { useUpdateUser } from '../../staff/queries/useQueries/useUpdateUser';
import { toast } from 'react-toastify';
import '../../style/account.css';
import { EmployeeRequest } from '../../services/API/request/employeeRequest';
import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/appContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type AccountProps = {
  setModalOpen: (close: boolean) => void;
  modalOpen: boolean;
};

export const Account = (props: AccountProps) => {
  const { setModalOpen, modalOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { user, fetchUpdatedUser } = useContext(AppContext);

  const updateUser = useUpdateUser();

  const formMethods = useForm<any>({
    resolver: yupResolver(AccountSchema),
    defaultValues: {
      personID: user?.personID || 0,
      username: user?.username || '',
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      yearsInPratice: user?.yearsInPratice || 0,
      imageURL: user?.imageURL || '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = formMethods;

  const onSubmit = (data: EmployeeRequest) => {
    setIsLoading(true);
    setTimeout(() => {
      updateUser.mutate(data, {
        onSuccess: () => {
          // When update is successful, fetch updated user data
          if (data.personID) {
            fetchUpdatedUser(data.personID);
          }
          toast.success('Account updated');
        },
        onError: (error) => {
          toast.error('An error occurred. Please try again later.');
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    }, 1500);
  };
  return (
    <>
      <BootstrapDialog
        onClose={() => setModalOpen(false)}
        aria-labelledby='customized-dialog-title'
        open={modalOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className='background'>
          <DialogTitle
            sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'center' }}
            id='customized-dialog-title'
          >
            <Typography>Account Details</Typography>
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
            {user && (
              <Grid container spacing={3} p={2} pl={5} pr={5}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='username'
                    control={control}
                    defaultValue={user.username}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          disabled
                          size='small'
                          label='Username'
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <LockIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='email'
                    control={control}
                    defaultValue={user.email}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          size='small'
                          label='Email'
                          fullWidth
                        />
                        {errors?.email?.message && (
                          <Typography className='inputError'>
                            {String(errors.email.message)}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name='firstName'
                    control={control}
                    defaultValue={user.firstName}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          size='small'
                          label='Firstname'
                          fullWidth
                        />
                        {errors?.firstName?.message && (
                          <Typography className='inputError'>
                            {String(errors.firstName.message)}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='lastName'
                    control={control}
                    defaultValue={user.lastName}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          size='small'
                          label='Lastname'
                          fullWidth
                        />
                        {errors?.lastName?.message && (
                          <Typography className='inputError'>
                            {String(errors.lastName.message)}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='yearsInPratice'
                    control={control}
                    defaultValue={user.yearsInPratice}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          size='small'
                          type='number'
                          label='Employed for many years'
                          fullWidth
                        />
                        {errors?.yearsInPratice?.message && (
                          <Typography className='inputError'>
                            {String(errors.yearsInPratice.message)}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='imageURL'
                    control={control}
                    defaultValue={user.imageURL}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          size='small'
                          label='Image'
                          fullWidth
                        />
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              '@media (min-width:900px)': {
                justifyContent: 'flex-end',
                marginRight: '1rem',
              },
            }}
          >
            <Button
              type='submit'
              variant='outlined'
              disabled={!isDirty}
              autoFocus
              sx={{ width: '30%' }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Save Details'}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};
