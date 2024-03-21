import {
  Box,
  CircularProgress,
  Grid,
  ListItem,
  Typography,
} from '@mui/material';
import { ProfileCard } from '../../profile/components/profileCard';
import { PlayerData } from './lastPlayedPingPongGame';
import { useFetchPongRankById } from '../../profile/queries/useQueries/useFetchPongRankById';

type DisplayLatestMatchProps = {
  matchDate: string;
  winner: PlayerData;
  defeated: PlayerData;
};

export const DisplayLatestMatch = (props: DisplayLatestMatchProps) => {
  const { matchDate, winner, defeated } = props;

  const winnerRank = useFetchPongRankById(winner.personID);
  const defeatedRank = useFetchPongRankById(defeated.personID);

  console.log('winner', winner);
  console.log('defated', defeated);

  const setBorder = (victory: boolean) => {
    if (victory) {
      return 'linear-gradient(45deg, #008000, #FFD700)';
    } else {
      return 'linear-gradient(45deg, #FF0000, #000000)';
    }
  };

  return (
    <Grid container display={'flex'} justifyContent={'center'}>
      {winnerRank && winnerRank.data && defeatedRank && defeatedRank.data ? (
        <>
          <Grid item xs={2}>
            <Typography
              sx={{ position: 'absolute', right: '', color: 'green' }}
              variant='h4'
            >
              Winner!
            </Typography>
            <Box
              sx={{
                backgroundImage: setBorder(true),
                padding: '4px',
                borderRadius: '4px',
                boxShadow: '0px 0px 15px 3px black',
              }}
            >
              <ProfileCard
                username={winner.username}
                image={winner.imageUrl}
                header='Rank'
                rankTitle={winnerRank.data.rankTitle}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection={'row'}
            ml={10}
            mr={10}
          >
            <Grid item>
              <Typography variant='h1'>{winner.points}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='h1'>-</Typography>
            </Grid>
            <Grid item>
              <Typography variant='h1'>{defeated.points}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Typography
              sx={{ position: 'absolute', right: '', color: 'red' }}
              variant='h4'
            >
              Defetad!
            </Typography>
            <Box
              sx={{
                backgroundImage: setBorder(false),
                padding: '4px',
                borderRadius: '4px',
                boxShadow: '0px 0px 15px 3px black',
              }}
            >
              <ProfileCard
                username={defeated.username}
                image={defeated.imageUrl}
                header='Rank'
                rankTitle={defeatedRank.data.rankTitle}
              />
            </Box>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};
