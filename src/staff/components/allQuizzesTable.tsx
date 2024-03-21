import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useFetchQuizResult } from '../queries/useQueries/useFetchQuizResult';
import { QuizResultResponse } from '../../services/API/response/quizResultResponse';

export const AllQuizzesTable = () => {
  const quizResults = useFetchQuizResult();

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant='caption' color='text.secondary' fontSize={'15px'}>
        Total {quizResults.data ? quizResults.data.length : 0} Quizzes
      </Typography>

      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        {quizResults.data && quizResults.data.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
              <Table
                sx={{
                  maxWidth: '100%',
                  '& .MuiTableCell-root': {
                    padding: '8px',
                    lineHeight: '1.5',
                  },
                }}
                aria-label='simple table'
              >
                <TableHead
                  sx={{
                    backgroundColor: '#130f40',
                    backgroundImage:
                      'linear-gradient(315deg, #130f40 0%, #000000 74%)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <TableRow sx={{ maxHeight: '40px', overflowY: 'auto' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: 'whitesmoke' }}>
                      User
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                      align='left'
                    >
                      Quiz
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        color: 'whitesmoke',
                      }}
                      align='left'
                    >
                      Quiz Points
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                      align='left'
                    >
                      Your Answer
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                      align='left'
                    >
                      Outcome
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                      align='left'
                    >
                      Quiz Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                {
                  <TableBody>
                    {quizResults.data &&
                      quizResults.data.length > 0 &&
                      quizResults.data
                        .sort(
                          (a, b) =>
                            new Date(b.quizDate).getTime() -
                            new Date(a.quizDate).getTime()
                        )
                        .map((item: QuizResultResponse, index) => (
                          <TableRow
                            key={item.employeeResultID}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              backgroundColor:
                                index % 2 === 0 ? '#dcdcdc' : 'white',
                            }}
                          >
                            <TableCell
                              sx={{
                                color:
                                  item.isCorrect === 'Incorrect answer'
                                    ? 'red'
                                    : 'green',
                              }}
                              align='left'
                            >
                              {item.username}
                            </TableCell>
                            <TableCell
                              sx={{
                                color:
                                  item.isCorrect === 'Incorrect answer'
                                    ? 'red'
                                    : 'green',
                              }}
                              align='left'
                            >
                              {item.quizHeading}
                            </TableCell>
                            <TableCell
                              sx={{
                                color:
                                  item.isCorrect === 'Incorrect answer'
                                    ? 'red'
                                    : 'green',
                              }}
                              align='left'
                            >
                              {item.isCorrect === 'Incorrect answer'
                                ? `-${item.points}`
                                : `${item.points}`}
                            </TableCell>
                            <TableCell
                              sx={{
                                color:
                                  item.isCorrect === 'Incorrect answer'
                                    ? 'red'
                                    : 'green',
                              }}
                              align='left'
                            >
                              {item.guessedAnswer}
                            </TableCell>
                            <TableCell
                              sx={{
                                color:
                                  item.isCorrect === 'Incorrect answer'
                                    ? 'red'
                                    : 'green',
                              }}
                              align='left'
                            >
                              {item.isCorrect}
                            </TableCell>
                            <TableCell align='left'>
                              {dayjs(item.quizDate).format(
                                'dddd, MMMM DD, YYYY'
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                }
              </Table>
            </TableContainer>
          </>
        ) : (
          <CircularProgress size={24} />
        )}
      </Grid>
    </Grid>
  );
};
