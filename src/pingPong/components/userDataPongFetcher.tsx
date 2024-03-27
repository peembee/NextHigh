import { useFetchPongRankById } from '../../profile/queries/useQueries/useFetchPongRankById';
import { useFetchPongResultById } from '../../profile/queries/useQueries/useFetchPongResultById';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { ProfileCard } from '../../profile/components/profileCard';
import { Box, CircularProgress } from '@mui/material';

type UserDataPongFetcher = {
  user: EmployeeResponse;
  highScorePlace?: number;
  maxWidht: number;
};

export const UserDataPongFetcher = (props: UserDataPongFetcher) => {
  const { user, highScorePlace, maxWidht } = props;

  const pongRank = useFetchPongRankById(user.personID);
  const pongResults = useFetchPongResultById(user.personID);

  const marginVictory = () => {
    if (!pongResults.data || pongResults.data.length === 0) {
      return 0;
    }
    let totalMatches = pongResults.data.length;

    let winPercentage = (user.pongVictories / totalMatches) * 100;
    return winPercentage.toFixed(1);
  };

  const setTopRankBorder = () => {
    if (highScorePlace === 1) {
      return 'linear-gradient(45deg, rgba(255, 255, 0, 0.7), rgba(255, 0, 0, 0.7))';
    } else if (highScorePlace === 2) {
      return 'linear-gradient(45deg, #cccccc, #999999)';
    } else if (highScorePlace === 3) {
      return 'linear-gradient(45deg, rgba(205, 127, 50, 0.7), rgba(139, 69, 19, 0.7))';
    } else {
      return 'linear-gradient(45deg, #ff00ff, #00ffff)';
    }
  };

  return (
    <>
      {user ? (
        <>
          <Box
            sx={{
              backgroundImage: setTopRankBorder(),
              padding: '4px',
              borderRadius: '4px',
              boxShadow: '0px 0px 15px 3px black',
              maxWidth: maxWidht,
            }}
          >
            <ProfileCard
              image={user.imageURL}
              alt='PingPong Logo'
              header='Rank'
              rankTitle={pongRank.data ? pongRank.data.rankTitle : 'UnRanked'}
              imageTitle={'Victory ' + marginVictory() + '%'}
              points={`Victories ${user.pongVictories.toString()}`}
              username={user.username}
            />
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

UserDataPongFetcher.defaultProps = {
  highScorePlace: null,
};
