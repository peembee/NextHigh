import {
  Avatar,
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
import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/appContext';

type ProfilePicDisplayerProps = {
  setOpenProfilePicModal: (closeProfilePicModal: boolean) => void;
  user: EmployeeResponse;
  setUpdatedPicture: (updatedPicture: boolean) => void;
  setUpdatedPictureMessage: (updatedPictureMessage: string) => void;
};

export const ProfilePicDisplayer = (props: ProfilePicDisplayerProps) => {
  const {
    setOpenProfilePicModal,
    user,
    setUpdatedPicture,
    setUpdatedPictureMessage,
  } = props;
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

    updateUser.mutate(postData, {
      onSuccess: () => {
        // When update is successful, fetch updated user data
        if (user.personID) {
          fetchUpdatedUser(user.personID);
        }
        setUpdatedPicture(true);
        setUpdatedPictureMessage('Updated');
      },
      onError: () => {
        setUpdatedPicture(true);
        setUpdatedPictureMessage('An error occurred. Please try again later.');
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
        paddingLeft: '20px',
        paddingRight: '20px',
        overflowY: 'auto',
      }}
    >
      <Grid container>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          position={'sticky'}
          top={0}
          bgcolor='white'
          zIndex={1000}
        >
          <Grid item xs={6}>
            <Typography variant='h5' color='grey' ml={1}>
              Select Profile Pic
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <IconButton
              aria-label='close'
              onClick={() => {
                setUpdatedPicture(false);
                setOpenProfilePicModal(false);
              }}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon sx={{ scale: '1.5' }} />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Divider
              sx={{ margin: '2px', backgroundColor: 'grey', height: '1px' }}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Grid container pb={5} justifyContent='center' alignItems='center'>
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
