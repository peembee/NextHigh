import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { ProfileCard } from './profileCard';
import dayjs from 'dayjs';
import { PongResultResponse } from '../../services/API/response/pongResultResponse';
import { useFetchQuiz } from '../queries/useQueries/useFetchQuiz';
import { QuizResultResponse } from '../../services/API/response/quizResultResponse';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/appContext';
import { StatsDetailDropdown } from './statsDetailDropdown';
import EditIcon from '@mui/icons-material/Edit';
import { grey } from '@mui/material/colors';
import { ProfileCardsDisplayer } from './profileCardsDisplayer';

type ProfileCardProps = {
  memberSince: string | undefined;
  rankEmpTitle?: string;
  rankPongTitle?: string;
  pongResults: PongResultResponse[];
  quizResults: QuizResultResponse[];
  imageURL: string;
};

export const ProfilePaper = (props: ProfileCardProps) => {
  const {
    memberSince,
    rankEmpTitle,
    rankPongTitle,
    pongResults,
    quizResults,
    imageURL,
  } = props;

  const { user } = useContext(AppContext);
  const [totalWins, setTotalWins] = useState(0);
  const [openProfilePicModal, setOpenProfilePicModal] =
    useState<boolean>(false);

  console.log('openProfilePicModal', openProfilePicModal);

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
      {user !== null && (
        <Grid
          container
          spacing={10}
          p={2}
          pl={5}
          pr={5}
          pb={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={5} justifyContent='center'>
              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    position: 'relative',
                    marginRight: { xs: '-80px', md: '100px' },
                  }}
                >
                  <Avatar
                    alt='Profile Pic'
                    src={imageURL}
                    sx={{
                      scale: '5.0',
                      marginBottom: { xs: '80px' },
                      marginTop: '80px',
                      marginRight: '80px',
                    }}
                  />
                  <Tooltip title='Change Profile Pic' placement='right'>
                    <Box
                      sx={{
                        position: 'absolute',
                        color: grey[500],
                        right: '-10px',
                      }}
                    >
                      <IconButton onClick={() => setOpenProfilePicModal(true)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>

              {!openProfilePicModal ? (
                <>
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

                  <Grid item>
                    <ProfileCard
                      image='https://i.ibb.co/x1SjHM3/programmer.jpg'
                      header='Rank'
                      alt='Programmer Logo'
                      rankTitle={rankEmpTitle}
                      imageTitle={'Quiz ' + marginQuiz() + '%'}
                      points={`Points ${
                        user?.empPoints.toString() ?? 'Unknown'
                      }`}
                    />
                  </Grid>
                </>
              ) : (
                <Grid
                  item
                  md={6}
                  sx={{
                    padding: '20px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                  }}
                >
                  <ProfileCardsDisplayer
                    setOpenProfilePicModal={setOpenProfilePicModal}
                    user={user}
                  />
                </Grid>
              )}
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
      )}

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
