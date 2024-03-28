import { Box, CircularProgress } from '@mui/material';
import { ProfileCard } from '../../profile/components/profileCard';
import { useFetchEmpRankById } from '../../profile/queries/useQueries/useFetchEmpRankById';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchQuizResultById } from '../../profile/queries/useQueries/useFetchQuizResultById';
import { useFetchQuiz } from '../../profile/queries/useQueries/useFetchQuiz';

type BestQuizPlayerProps = {
  user: EmployeeResponse;
};
export const BestQuizPlayer = (props: BestQuizPlayerProps) => {
  const { user } = props;

  const fetchRank = useFetchEmpRankById(user.personID);
  const EmpResults = useFetchQuizResultById(user.personID);
  const fetchAllQuizzes = useFetchQuiz();

  const marginQuiz = () => {
    if (!EmpResults.data || EmpResults.data.length === 0) {
      return 0;
    }
    const totalQuizzes = fetchAllQuizzes.data ? fetchAllQuizzes.data.length : 0;
    const correctAnswers = EmpResults.data.filter(
      (myQuiz) => myQuiz.isCorrect === 'Correct answer'
    );

    const totalCorrect = correctAnswers.length;

    const correctPercentage = (totalCorrect / totalQuizzes) * 100;
    return correctPercentage.toFixed(1);
  };

  return (
    <>
      {EmpResults.data && fetchRank.data ? (
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
            imageTitle={'Quiz ' + marginQuiz() + '%'}
            points={`Points ${user.empPoints.toString() ?? '0'}`}
            username={user.username}
          />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
