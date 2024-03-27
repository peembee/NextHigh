import { Divider, Grid, Typography } from '@mui/material';
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
      <Grid item xs={12} display={'flex'} justifyContent={'center'} pt={20}>
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'grey',
            fontWeight: 'bold',
          }}
        >
          Ping Pong
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
          <DisplayBestPongPlayer />
        </Grid>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
          <DisplayWorstPongPlayer />
        </Grid>
      </Grid>

      <Grid item xs={12} display={'flex'} justifyContent={'center'} pt={20}>
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'grey',
            fontWeight: 'bold',
          }}
        >
          Quizzes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid container>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
          <DisplayBestQuizPlayer />
        </Grid>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
          <DisplayWorstQuizPlayer />
        </Grid>
      </Grid>
    </Grid>
  );
};
