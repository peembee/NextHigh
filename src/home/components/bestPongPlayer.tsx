import { Box, CircularProgress } from '@mui/material';
import { ProfileCard } from '../../profile/components/profileCard';
import { useFetchEmpRankById } from '../../profile/queries/useQueries/useFetchEmpRankById';
import { useFetchPongResultById } from '../../profile/queries/useQueries/useFetchPongResultById';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';

type BestPongPlayerProps = {
  user: EmployeeResponse;
};
export const BestPongPlayer = (props: BestPongPlayerProps) => {
  const { user } = props;
  const fetchRank = useFetchEmpRankById(user.personID);
  const pongResults = useFetchPongResultById(user.personID);

  const marginVictory = () => {
    if (!pongResults.data || pongResults.data.length === 0) {
      return 0;
    }
    let totalMatches = pongResults.data.length;

    let winPercentage = (user.pongVictories / totalMatches) * 100;
    return winPercentage.toFixed(1);
  };
  return (
    <>
      {pongResults.data && fetchRank.data ? (
        <Box
          sx={{
            backgroundImage:
              'linear-gradient(45deg, rgba(255, 255, 0, 0.7), rgba(255, 0, 0, 0.7))',
            padding: '4px',
            borderRadius: '4px',
            boxShadow: '0px 0px 15px 3px black',
            maxWidth: 250,
          }}
        >
          <ProfileCard
            image={user.imageURL}
            alt='PingPong Logo'
            header='Rank'
            rankTitle={fetchRank.data ? fetchRank.data.rankTitle : 'UnRanked'}
            imageTitle={'Victory ' + marginVictory() + '%'}
            points={`Victories ${user.pongVictories.toString()}`}
            username={user.username}
          />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
