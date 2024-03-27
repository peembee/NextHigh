import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
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
import { ProfilePicDisplayer } from './profilePicDisplayer';

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
  const [openProfilePicModal, setOpenProfilePicModal] =
    useState<boolean>(false);
  const [updatedPicture, setUpdatedPicture] = useState<Boolean>(false);
  const [updatedPictureMessage, setUpdatedPictureMessage] = useState<string>();

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

  useEffect(() => {
    let timer;
    if (updatedPicture) {
      timer = setTimeout(() => {
        setUpdatedPicture(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [updatedPicture]);

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
              <Grid item xs={3} sx={{ paddingBottom: '1rem' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    position: 'sticky',
                    marginRight: { xs: '-100px', md: '5rem' },
                    top: 0,
                    zIndex: 1000,
                  }}
                >
                  <Avatar
                    alt='Profile Pic'
                    src={imageURL}
                    sx={{
                      scale: '5.0',
                      marginBottom: { xs: '80px' },
                      marginTop: '80px',
                      marginRight: '800px',
                    }}
                  />

                  <Tooltip title='Change Profile Pic' placement='right'>
                    <Box
                      sx={{
                        position: 'absolute',
                        color: grey[500],
                        left: '6rem',
                      }}
                    >
                      {!updatedPicture && (
                        <IconButton
                          onClick={() => {
                            setUpdatedPicture(false);
                            setOpenProfilePicModal(!openProfilePicModal);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {updatedPicture && (
                        <Typography
                          sx={{
                            marginLeft: '0rem',
                            marginTop: '0rem',
                            display: 'inline-block',
                            backgroundColor: 'rgba(0, 255, 0, 0.1)',
                            color: 'rgba(0, 0, 0, 0.6)',
                            padding: '8px',
                            borderRadius: '4px',
                          }}
                        >
                          {updatedPictureMessage}
                        </Typography>
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>

              {!openProfilePicModal ? (
                <>
                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        backgroundImage:
                          'linear-gradient(45deg, #ff00ff, #00ffff)',
                        padding: '4px',
                        borderRadius: '4px',
                        boxShadow: '0px 0px 15px 3px black',
                        maxWidth: 300,
                      }}
                    >
                      <ProfileCard
                        image='https://i.ibb.co/BnGByPB/pingpong.jpg'
                        alt='PingPong Logo'
                        header='Rank'
                        rankTitle={rankPongTitle}
                        imageTitle={'Victory ' + marginVictory() + '%'}
                        points={user?.pongVictories.toString()}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        backgroundImage:
                          'linear-gradient(45deg, #ff00ff, #00ffff)',
                        padding: '4px',
                        borderRadius: '4px',
                        boxShadow: '0px 0px 15px 3px black',
                        maxWidth: 300,
                      }}
                    >
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
                    </Box>
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
                  <ProfilePicDisplayer
                    setUpdatedPicture={setUpdatedPicture}
                    setUpdatedPictureMessage={setUpdatedPictureMessage}
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
