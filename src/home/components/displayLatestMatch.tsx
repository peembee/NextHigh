import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
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
  const { winner, defeated } = props;

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const winnerRank = useFetchPongRankById(winner.personID);
  const defeatedRank = useFetchPongRankById(defeated.personID);

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
          <Grid
            item
            xs={6}
            md={2}
            sx={{
              marginRight: isMdUp ? '30px' : '0px',
            }}
          >
            <Grid item display={'flex'} justifyContent={'left'}>
              <Typography
                sx={{
                  position: 'absolute',
                  marginTop: '5px',
                  marginLeft: !isMdUp ? '-20px' : '',
                  marginRight: !isMdUp ? '20px' : '',
                  color: '#00FF00',
                  background: 'linear-gradient(45deg, #00000080, #00000040)',
                  padding: '0px 15px',

                  borderRadius: '4px',
                }}
                variant={isMdUp ? 'h4' : 'h5'}
              >
                Winner!
              </Typography>
            </Grid>
            <Box
              sx={{
                backgroundImage: setBorder(true),
                padding: '4px',
                borderRadius: '4px',
                boxShadow: '0px 0px 15px 3px black',
                marginLeft: !isMdUp ? '-20px' : '',
                marginRight: !isMdUp ? '+20px' : '',
                maxWidth: '300px',
              }}
            >
              <ProfileCard
                username={winner.username}
                image={winner.imageUrl}
                header='Rank'
                rankTitle={winnerRank.data.rankTitle}
                points={`Points ${winner.points}` || ''}
                colorPoints='#00FF00'
              />
            </Box>
          </Grid>

          <Grid item xs={6} md={2} sx={{ marginLeft: isMdUp ? '60px' : '0px' }}>
            <Grid item display={'flex'} justifyContent={'left'}>
              <Typography
                sx={{
                  position: 'absolute',
                  marginTop: '5px',
                  marginLeft: !isMdUp ? '20px' : '',
                  marginRight: !isMdUp ? '-20px' : '',
                  color: 'red',
                  background: 'linear-gradient(45deg, #00000080, #00000040)',
                  padding: '0px 9px',
                  borderRadius: '4px',
                }}
                variant={isMdUp ? 'h4' : 'h5'}
              >
                Defeated!
              </Typography>
            </Grid>
            <Box
              sx={{
                backgroundImage: setBorder(false),
                padding: '4px',
                borderRadius: '4px',
                boxShadow: '0px 0px 15px 3px black',
                marginLeft: !isMdUp ? '20px' : '',
                marginRight: !isMdUp ? '-20px' : '',
                maxWidth: '300px',
              }}
            >
              <ProfileCard
                username={defeated.username}
                image={defeated.imageUrl}
                header='Rank'
                rankTitle={defeatedRank.data.rankTitle}
                points={`Points ${defeated.points}` || ''}
                colorPoints='red'
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
