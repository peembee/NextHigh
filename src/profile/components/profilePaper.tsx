import { Divider, Grid, Typography } from '@mui/material';
import { ProfileCard } from './profileCard';
import dayjs from 'dayjs';
import { PongResultResponse } from '../../services/API/response/pongResultResponse';
import { useFetchQuiz } from '../queries/useQueries/useFetchQuiz';
import { QuizResultResponse } from '../../services/API/response/quizResultResponse';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/appContext';
import { StatsDetailDropdown } from './statsDetailDropdown';

type ProfileCardProps = {
  memberSince: string | undefined;
  rankEmpTitle?: string;
  rankPongTitle?: string;
  pongResults: PongResultResponse[];
  quizResults: QuizResultResponse[];
};

export const ProfilePaper = (props: ProfileCardProps) => {
  const { memberSince, rankEmpTitle, rankPongTitle, pongResults, quizResults } =
    props;

  const { user } = useContext(AppContext);
  const [totalWins, setTotalWins] = useState(0);
  const fetchAllQuizzes = useFetchQuiz();

  const marginQuiz = () => {
    if (!fetchAllQuizzes.data || !quizResults || quizResults.length === 0) {
      return 0;
    }
    const totalQuizzes = fetchAllQuizzes.data.length;

    const correctAnswers = quizResults.filter(
      (myQuiz) => myQuiz.isCorrect === 'Correct answer'
    );

    const totalCorrect = correctAnswers.length;

    const correctPercentage = (totalCorrect / totalQuizzes) * 100;
    return correctPercentage.toFixed(1);
  };

  const marginVictory = () => {
    if (user !== null) {
      if (!pongResults || pongResults.length === 0) {
        return 0;
      }
      let totalMatches = pongResults.length;

      let winPercentage = (user.pongVictories / totalMatches) * 100;
      return winPercentage.toFixed(1);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={10}
        p={2}
        pl={5}
        pr={5}
        pb={5}
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}
      >
        <Grid item xs={12}>
          <Grid container spacing={10} justifyContent='space-around'>
            <Grid item>
              <ProfileCard
                image='https://i.ibb.co/BnGByPB/pingpong.jpg'
                alt='PingPong Logo'
                header='Rank'
                rankTitle={rankPongTitle}
                imageTitle={'Victory ' + marginVictory() + '%'}
                points={user?.pongVictories.toString()}
              />
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <ProfileCard
                image='https://i.ibb.co/x1SjHM3/programmer.jpg'
                header='Rank'
                alt='Programmer Logo'
                rankTitle={rankEmpTitle}
                imageTitle={'Quiz ' + marginQuiz() + '%'}
                points={`Points ${user?.empPoints.toString() ?? 'Unknown'}`}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ bgcolor: 'black' }} />
          <StatsDetailDropdown
            pongResults={pongResults ?? []}
            quizResults={quizResults ?? []}
          />
        </Grid>
      </Grid>

      <Divider sx={{ bgcolor: 'black' }} />
      {memberSince !== undefined && (
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ justifyContent: 'left' }}
        >
          Active since {dayjs(memberSince).format('YYYY-MM-DD')}
        </Typography>
      )}
    </>
  );
};

ProfilePaper.defaultProps = {
  memberSince: 'Unknown',
  rankEmpTitle: null,
  rankPongTitle: null,
};
