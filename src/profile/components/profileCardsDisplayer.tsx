import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProfilePics } from './profilePicsUrl';
import { useUpdateUser } from '../../staff/queries/useQueries/useUpdateUser';
import { EmployeeRequest } from '../../services/API/request/employeeRequest';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/appContext';

type ProfileCardsDisplayerProps = {
  setOpenProfilePicModal: (closeProfilePicModal: boolean) => void;
  user: EmployeeResponse;
};

export const ProfileCardsDisplayer = (props: ProfileCardsDisplayerProps) => {
  const { setOpenProfilePicModal, user } = props;
  const [loading, setIsLoading] = useState<boolean>(false);
  const { fetchUpdatedUser } = useContext(AppContext);

  const updateUser = useUpdateUser();

  const submit = (imageUrl: string) => {
    setIsLoading(true);
    const postData: EmployeeRequest = {
      personID: user.personID,
      firstName: user.firstName,
      lastName: user.lastName,
      yearsInPratice: user.yearsInPratice,
      email: user.email,
      username: user.username,
      imageURL: imageUrl,
    };
    console.log(postData);

    updateUser.mutate(postData, {
      onSuccess: () => {
        // When update is successful, fetch updated user data
        if (user.personID) {
          fetchUpdatedUser(user.personID);
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
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '20px',
        maxHeight: '5px',
        overflowY: 'auto',
      }}
    >
      <Grid container direction='column' spacing={2}>
        <Grid container>
          <Grid
            container
            alignItems='center'
            justifyContent='space-between'
            position={'fixed'}
          >
            <Grid item xs={4}>
              <Typography variant='h6' color='grey'>
                Select Profile Pic
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <IconButton
                aria-label='close'
                onClick={() => setOpenProfilePicModal(false)}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                  position: 'fixed',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ margin: '8px 0', backgroundColor: 'grey' }} />
        </Grid>

        <Grid item>
          <Grid
            container
            spacing={2}
            pb={5}
            justifyContent='center'
            alignItems='center'
          >
            <Grid
              item
              sx={{
                position: 'absolute',
                zIndex: 1,
              }}
            >
              {loading && <CircularProgress size={60} />}
            </Grid>

            {ProfilePics.map((pic) => (
              <Grid item key={pic.id} xs={12} md={4}>
                <IconButton
                  disabled={loading}
                  onClick={() => submit(pic.url)}
                  sx={{
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      transform: { md: 'scale(1.1)' },
                      transition: '0.3s',
                    },
                    boxShadow: 'none',
                  }}
                >
                  <Avatar
                    alt={pic.alt}
                    src={pic.url}
                    sx={{
                      width: { xs: '50%', md: '80%' },
                      height: 'auto',
                    }}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
