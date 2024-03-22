import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';
import { Grid } from '@mui/material';
import { LastPlayedPingPongGame } from '../components/lastPlayedPingPongGame';

export const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <LastPlayedPingPongGame />
      </Grid>
    </Grid>
  );
};
