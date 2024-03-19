import { useFetchEmpRankById } from '../../profile/queries/useQueries/useFetchEmpRankById';
import { useFetchQuizResultById } from '../../profile/queries/useQueries/useFetchQuizResultById';
import { ProfileCard } from '../../profile/components/profileCard';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchQuiz } from '../../profile/queries/useQueries/useFetchQuiz';
import { Box } from '@mui/material';

type UserDataFetcherProps = {
  user: EmployeeResponse;
  highScorePlace?: number;
};

export const UserDataFetcher = (props: UserDataFetcherProps) => {
  const { user, highScorePlace } = props;

  const fetchEmpRank = useFetchEmpRankById(user.personID);
  const fetchQuizResult = useFetchQuizResultById(user.personID);
  const fetchAllQuizzes = useFetchQuiz();

  const marginQuiz = () => {
    if (!fetchQuizResult.data || fetchQuizResult.data.length === 0) {
      return 0;
    }
    const totalQuizzes = fetchAllQuizzes.data.length;

    const correctAnswers = fetchQuizResult.data.filter(
      (myQuiz) => myQuiz.isCorrect === 'Correct answer'
    );

    const totalCorrect = correctAnswers.length;

    const correctPercentage = (totalCorrect / totalQuizzes) * 100;
    return correctPercentage.toFixed(1);
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
      {user && (
        <>
          <Box
            sx={{
              backgroundImage: setTopRankBorder(),
              padding: '4px',
              borderRadius: '4px',
              boxShadow: '0px 0px 15px 3px black',
            }}
          >
            <ProfileCard
              image={user.imageURL}
              header='Rank'
              alt='Programmer Logo'
              rankTitle={
                fetchEmpRank.data ? fetchEmpRank.data.rankTitle : 'UnRanked'
              }
              imageTitle={`Quiz ${
                fetchQuizResult.data ? marginQuiz() + '%' : '0%'
              }`}
              points={`Points ${user.empPoints.toString() ?? '0'}`}
              username={user.username}
            />
          </Box>
        </>
      )}
    </>
  );
};

UserDataFetcher.defaultProps = {
  highScorePlace: null,
};
