import { Grid } from '@mui/material';
import { LastPlayedPingPongGame } from '../components/lastPlayedPingPongGame';
import { DisplayBestPongPlayer } from '../components/displayBestPongPlayer';
import { DisplayWorstPongPlayer } from '../components/displayWorstPongPlayer';
import { DisplayBestQuizPlayer } from '../components/displayBestQuizPlayer';
import { DisplayWorstQuizPlayer } from '../components/displayWorstQuizPlayer';

export const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <LastPlayedPingPongGame />
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
        <Grid container>
          <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
            <DisplayBestPongPlayer />
          </Grid>
          <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
            <DisplayWorstPongPlayer />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
        <Grid container>
          <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
            <DisplayBestQuizPlayer />
          </Grid>
          <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
            <DisplayWorstQuizPlayer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
