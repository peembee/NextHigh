import { useFetchPongRankById } from '../../profile/queries/useQueries/useFetchPongRankById';
import { useFetchPongResultById } from '../../profile/queries/useQueries/useFetchPongResultById';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { ProfileCard } from '../../profile/components/profileCard';
import { CircularProgress } from '@mui/material';

type UserDataPongFetcher = {
  user: EmployeeResponse;
};

export const UserDataPongFetcher = (props: UserDataPongFetcher) => {
  const { user } = props;

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

  return (
    <>
      {user ? (
        <>
          <ProfileCard
            image='https://i.ibb.co/BnGByPB/pingpong.jpg'
            alt='PingPong Logo'
            header='Rank'
            rankTitle={pongRank.data ? pongRank.data.rankTitle : 'UnRanked'}
            imageTitle={'Victory ' + marginVictory() + '%'}
            points={user.pongVictories.toString()}
            username={user.username}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
