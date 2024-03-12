import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
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

  const green = 'linear-gradient(to top, #9be15d 0%, #00e3ae 100%)';
  const red = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

  const fetchQuiz = useFetchUnAnsweredQuizzesById(userId);
  const createQuizResult = useCreateQuizResults();

  useEffect(() => {
    if (fetchQuiz.data) {
      setQuiz(fetchQuiz.data.result);
      setValue;
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

  const { handleSubmit, reset, watch, setValue, control } = formMethods;

  console.log('watch', watch());

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
        if (data.isCorrect) {
          setSelectedAnswer(data.guessedAnswer);
          setIsCorrect(true);
          fetchUpdatedUser(userId);
        } else {
          setIsCorrect(false);
        }
        setTimeout(() => {
          setSelectedAnswer(null);
          setIsCorrect(null);
          fetchNewQuiz();
          reset();
        }, 300);
      },
      onError: (error) => {
        toast.error('An error occurred. Please try again later.');
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      {quiz !== null ? (
        <Grid container>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Paper
                elevation={1}
                sx={{
                  background:
                    'linear-gradient(135deg, rgba(0, 128, 0, 0.3), rgba(0, 255, 0, 0.1))',
                  minWidth: '50rem',
                  paddingLeft: '50px',
                  paddingRight: '50px',
                }}
              >
                <Grid container pl={2} pr={2} pb={1} pt={1}>
                  <>
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
                        justifyContent={'center'}
                        pb={1}
                      >
                        <Typography
                          sx={{ color: 'rgba(0, 0, 0, 0.50)' }}
                          variant='h6'
                        >
                          POINTS {quiz.points}
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
                                <Divider
                                  sx={{
                                    paddingTop: '5px',
                                    width: '100%',
                                    borderBottom: '3px solid black', // Ökad tjocklek för bättre synlighet
                                  }}
                                />
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
                        border={'1px solid turquoise'}
                        mb={1}
                        borderRadius={3}
                        sx={{
                          background: 'rgba(0, 206, 209, 0.5)',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            background: 'rgba(0, 206, 209, 0.8)',
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Controller
                          name='guessedAnswer'
                          control={control}
                          defaultValue=''
                          render={({ field }) => (
                            <Button
                              disabled={loading}
                              disableRipple
                              sx={{
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                color: 'black',
                              }}
                              fullWidth
                              type='submit'
                              onClick={() => {
                                setSelectedAnswer(quiz.altOne);
                                field.onChange(quiz.altOne);
                              }}
                              style={{
                                background:
                                  selectedAnswer === quiz.altOne
                                    ? isCorrect
                                      ? green
                                      : red
                                    : 'transparent',
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
                        border={'1px solid turquoise'}
                        mb={1}
                        borderRadius={3}
                        sx={{
                          background: 'rgba(0, 206, 209, 0.5)',
                          transition: 'transform 0.2s',

                          '&:hover': {
                            background: 'rgba(0, 206, 209, 0.8)',
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Controller
                          name='guessedAnswer'
                          control={control}
                          defaultValue=''
                          render={({ field }) => (
                            <Button
                              disabled={loading}
                              disableRipple
                              sx={{
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                color: 'black',
                              }}
                              fullWidth
                              type='submit'
                              onClick={() => {
                                setSelectedAnswer(quiz.altTwo);
                                field.onChange(quiz.altTwo);
                              }}
                              style={{
                                background:
                                  selectedAnswer === quiz.altTwo
                                    ? isCorrect
                                      ? green
                                      : red
                                    : 'transparent',
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
                        border={'1px solid turquoise'}
                        mb={1}
                        borderRadius={3}
                        sx={{
                          background: 'rgba(0, 206, 209, 0.5)',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            background: 'rgba(0, 206, 209, 0.8)',
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Controller
                          name='guessedAnswer'
                          control={control}
                          defaultValue=''
                          render={({ field }) => (
                            <Button
                              disabled={loading}
                              disableRipple
                              sx={{
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                color: 'black',
                              }}
                              fullWidth
                              type='submit'
                              onClick={() => {
                                setSelectedAnswer(quiz.altThree);
                                field.onChange(quiz.altThree);
                              }}
                              style={{
                                background:
                                  selectedAnswer === quiz.altThree
                                    ? isCorrect
                                      ? green
                                      : red
                                    : 'transparent',
                              }}
                            >
                              {quiz.altThree}
                            </Button>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <Box>no more quiz</Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};
