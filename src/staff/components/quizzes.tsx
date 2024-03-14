import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFetchUnAnsweredQuizzesById } from '../queries/useQueries/useFetchUnAnsweredQuizzesById';
import { Controller, useForm } from 'react-hook-form';
import { QuizResultRequest } from '../../services/API/request/quizResultRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { QuizResultSchema } from '../../schemas/quizResultSchema';
import { useContext, useEffect, useState } from 'react';
import { useCreateQuizResults } from '../queries/useMutations/useCreateQuizResults';
import { toast } from 'react-toastify';
import { QuizResponse } from '../../services/API/response/quizResponse';
import { AppContext } from '../../contexts/appContext';

type QuizzesProps = {
  userId: number;
};

export const Quizzes = (props: QuizzesProps) => {
  const { userId } = props;
  const [loading, setLoading] = useState(false);
  const { fetchUpdatedUser } = useContext(AppContext);
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const green = 'linear-gradient(to top, #9be15d 0%, #00e3ae 100%)';
  const red = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

  //hoover:
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));

  let hoverStyles = {}; // Stilerna för hover-effekten

  if (!isXsScreen) {
    hoverStyles = {
      '&:hover': {
        transform: 'scale(1.1)',
      },
    };
  }

  const fetchQuiz = useFetchUnAnsweredQuizzesById(userId);
  const createQuizResult = useCreateQuizResults();

  useEffect(() => {
    if (fetchQuiz.data) {
      setQuiz(fetchQuiz.data.result);
    }
  }, [fetchQuiz.data]);

  const formMethods = useForm<QuizResultRequest>({
    resolver: yupResolver(QuizResultSchema),
    defaultValues: {
      fK_PersonID: userId,
      fK_QuizID: undefined,
      guessedAnswer: undefined,
    },
  });

  const { handleSubmit, reset, setValue, control } = formMethods;

  useEffect(() => {
    if (fetchQuiz.data && fetchQuiz.data.result) {
      if (fetchQuiz.data.result === 'MissingData') {
        setQuiz(null);
      } else {
        setQuiz(fetchQuiz.data.result);
        setValue('fK_QuizID', fetchQuiz.data.result.quizID);
      }
    }
  }, [fetchQuiz.data]);

  const fetchNewQuiz = () => {
    fetchQuiz.refetch();
  };

  const onSubmit = async (data: QuizResultRequest) => {
    setLoading(true);
    createQuizResult.mutate(data, {
      onSuccess: (data) => {
        setCorrectAnswer(data.correctAnswer);
        if (data.isCorrect) {
          setIsCorrect(true);
        } else {
          setIsCorrect(false);
        }

        const newTimeoutId = setTimeout(() => {
          setSelectedAnswer(null);
          setIsCorrect(null);
          fetchNewQuiz();
          setCorrectAnswer(null);
          reset();
        }, 1500);

        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        setTimeoutId(newTimeoutId);

        fetchUpdatedUser(userId);
      },
      onError: (error) => {
        toast.error('An error occurred. Please try again later.');
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const handleColors = (quiz: string) => {
    if (isCorrect !== null && correctAnswer !== null) {
      if (isCorrect && selectedAnswer === quiz) {
        return green;
      }
      if (!isCorrect && correctAnswer === quiz) {
        return green;
      }
      if (!isCorrect && selectedAnswer === quiz) {
        return red;
      } else {
        return 'transparent';
      }
    }
  };

  return (
    <>
      {quiz !== null ? (
        <Grid container>
          <Grid
            item
            xs={12}
            display={'flex'}
            justifyContent={'center'}
            sx={{
              maxWidth: {
                md: '100rem',
                xs: '100%',
              },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container pl={5} pr={5} pb={5} pt={5}>
                <>
                  {!fetchQuiz.isFetching ? (
                    <Grid
                      item
                      xs={12}
                      display={'flex'}
                      flexDirection={'column'}
                    >
                      <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'space-between'}
                        pb={1}
                      >
                        <Typography
                          sx={{ color: 'rgba(0, 0, 0, 0.50)' }}
                          variant='body2'
                        >
                          POINTS {quiz.points}
                        </Typography>
                        <Typography
                          sx={{ color: 'rgba(0, 0, 0, 0.50)' }}
                          variant='body2'
                        >
                          INCORRECT ANSWER -{quiz.points} POINTS
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        pb={2}
                        display={'flex'}
                        justifyContent={'center'}
                      >
                        <Grid display={'flex'} flexDirection={'column'} pb={1}>
                          <Controller
                            name='fK_QuizID'
                            control={control}
                            defaultValue={quiz.quizID}
                            render={({ field }) => (
                              <>
                                <Typography variant='h5'>
                                  {quiz.quizHeading}
                                </Typography>
                              </>
                            )}
                          />
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'center'}
                        mb={1}
                        borderRadius={3}
                        sx={{
                          backgroundColor: '#090947',
                          backgroundImage:
                            'linear-gradient(315deg, #090947 0%, #5a585a 74%)',
                          ...hoverStyles,
                        }}
                      >
                        <Controller
                          name='guessedAnswer'
                          control={control}
                          defaultValue=''
                          render={({ field }) => (
                            <Button
                              disabled={loading}
                              size='large'
                              disableRipple
                              sx={{
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '18px',
                              }}
                              fullWidth
                              type='submit'
                              onClick={() => {
                                setSelectedAnswer(quiz.altOne);
                                field.onChange(quiz.altOne);
                              }}
                              style={{
                                background: handleColors(quiz.altOne),
                              }}
                            >
                              {quiz.altOne}
                            </Button>
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'center'}
                        mb={1}
                        borderRadius={3}
                        sx={{
                          backgroundColor: '#090947',
                          backgroundImage:
                            'linear-gradient(315deg, #090947 0%, #5a585a 74%)',
                          ...hoverStyles,
                        }}
                      >
                        <Controller
                          name='guessedAnswer'
                          control={control}
                          defaultValue=''
                          render={({ field }) => (
                            <Button
                              disabled={loading}
                              size='large'
                              disableRipple
                              sx={{
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '18px',
                              }}
                              fullWidth
                              type='submit'
                              onClick={() => {
                                setSelectedAnswer(quiz.altTwo);
                                field.onChange(quiz.altTwo);
                              }}
                              style={{
                                background: handleColors(quiz.altTwo),
                              }}
                            >
                              {quiz.altTwo}
                            </Button>
                          )}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'center'}
                        mb={1}
                        borderRadius={3}
                        sx={{
                          backgroundColor: '#090947',
                          backgroundImage:
                            'linear-gradient(315deg, #090947 0%, #5a585a 74%)',
                          ...hoverStyles,
                        }}
                      >
                        <Controller
                          name='guessedAnswer'
                          control={control}
                          defaultValue=''
                          render={({ field }) => (
                            <Button
                              disabled={loading}
                              size='large'
                              disableRipple
                              sx={{
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '18px',
                              }}
                              fullWidth
                              type='submit'
                              onClick={() => {
                                setSelectedAnswer(quiz.altThree);
                                field.onChange(quiz.altThree);
                              }}
                              style={{
                                background: handleColors(quiz.altThree),
                              }}
                            >
                              {quiz.altThree}
                            </Button>
                          )}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <CircularProgress color='primary' />
                  )}
                </>
              </Grid>
            </form>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <Typography variant='h2' sx={{ color: 'rgba(128, 128, 128, 1)' }}>
              Your Quiz is 100% answered
              <Divider
                sx={{
                  paddingTop: '5px',
                  width: '100%',
                  borderBottom: '2px solid black', // Ökad tjocklek för bättre synlighet
                }}
              />
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
