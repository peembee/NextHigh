import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { QuizResultResponse } from '../../services/API/response/quizResultResponse';

type QuizzesDropdownProps = {
  quizResults: QuizResultResponse[];
};

export const QuizzesDropdown = (props: QuizzesDropdownProps) => {
  const { quizResults } = props;

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
        <Table
          sx={{
            maxWidth: '100%',
            '& .MuiTableCell-root': {
              padding: '8px', // Justera kuddutrymmet för tabellceller
              lineHeight: '1.5', // Justera radhöjden för tabellceller
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
          <TableBody>
            {quizResults
              .sort(
                (a, b) =>
                  dayjs(b.quizDate).valueOf() - dayjs(a.quizDate).valueOf()
              )
              .map((item, index) => (
                <TableRow
                  key={item.employeeResultID}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: index % 2 === 0 ? '#dcdcdc' : 'white',
                  }}
                >
                  <TableCell align='left'>{item.username}</TableCell>
                  <TableCell align='left'>{item.quizHeading}</TableCell>
                  <TableCell align='left'>{item.points}</TableCell>
                  <TableCell align='left'>{item.guessedAnswer}</TableCell>
                  <TableCell align='left'>{item.isCorrect}</TableCell>
                  <TableCell align='left'>
                    {dayjs(item.quizDate).format('dddd, MMMM DD, YYYY')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ bgcolor: 'black' }} />
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ justifyContent: 'left' }}
      >
        Total {quizResults.length} Quizzes
      </Typography>
    </>
  );
};
