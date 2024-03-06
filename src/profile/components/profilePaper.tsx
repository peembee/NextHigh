import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';
import { ProfileCard } from './profileCard';

export const ProfilePaper = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      <Grid
        container
        spacing={3}
        p={2}
        pl={5}
        pr={5}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ProfileCard header='Rank ' content='noob' />
        <ProfileCard header='Employee Rank' content='noob' />
      </Grid>
      <Divider />
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ justifyContent: 'left' }}
      >
        Active since {user?.createdDate}
      </Typography>
    </>
  );
};
