import { useFetchEmpRankById } from '../../profile/queries/useQueries/useFetchEmpRankById';
import { useFetchQuizResultById } from '../../profile/queries/useQueries/useFetchQuizResultById';
import { ProfileCard } from '../../profile/components/profileCard';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';

type UserDataFetcherProps = {
  user: EmployeeResponse;
};

export const UserDataFetcher = (props: UserDataFetcherProps) => {
  const { user } = props;

  const fetchEmpRank = useFetchEmpRankById(user.personID);
  const fetchQuizResult = useFetchQuizResultById(user.personID);

  const marginQuiz = () => {
    if (!fetchQuizResult.data || fetchQuizResult.data.length === 0) {
      return 0;
    }
    const totalQuizzes = fetchQuizResult.data.length;

    const correctAnswers = fetchQuizResult.data.filter(
      (myQuiz) => myQuiz.isCorrect === 'Correct answer'
    );

    const totalCorrect = correctAnswers.length;

    const correctPercentage = (totalCorrect / totalQuizzes) * 100;
    return correctPercentage.toFixed(1);
  };

  return (
    <>
      {user && (
        <>
          <ProfileCard
            image='https://i.ibb.co/x1SjHM3/programmer.jpg'
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
        </>
      )}
    </>
  );
};
