import { Box, Divider, Grid, Typography } from '@mui/material';
import { ProfileCard } from './profileCard';
import imagePingPing from '../../assets/pingpong.jpg';
import imageProgrammer from '../../assets/programmer.jpg';
import dayjs from 'dayjs';
import { PongResultResponse } from '../../services/API/response/pongResultResponse';
import { ViewCarousel } from '@mui/icons-material';

type ProfileCardProps = {
  memberSince: string | undefined;
  rankEmpTitle?: string;
  rankPongTitle?: string;
  pongResults: PongResultResponse[];
};

export const ProfilePaper = (props: ProfileCardProps) => {
  const { memberSince, rankEmpTitle, rankPongTitle, pongResults } = props;

  console.log('pongResults', pongResults);

  function marginVictory(matchDataArray) {
    let totalMatches = matchDataArray.length;
    let totalWins = 0;

    matchDataArray.forEach((matchData) => {
      if (matchData.wonMatch === 'Victory') {
        totalWins++;
      }
    });

    let winPercentage = (totalWins / totalMatches) * 100;
    return winPercentage.toFixed(1);
  }

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
        <ProfileCard
          image={imagePingPing}
          header='Rank'
          rankTitle={rankEmpTitle}
        />

        <ProfileCard
          image={imageProgrammer}
          header='Rank'
          rankTitle={rankPongTitle}
          victoryMargin={'Victory ' + marginVictory(pongResults) + '%'}
        />
      </Grid>
      <Divider />
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ justifyContent: 'left' }}
      >
        Active since {dayjs(memberSince).format('YYYY-MM-DD')}
      </Typography>
    </>
  );
};

ProfilePaper.defaultProps = {
  memberSince: 'Unknown',
  rankEmpTitle: null,
  rankPongTitle: null,
};
