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
import { useFetchPongResult } from '../queries/useQueries/useFetchPongResult';

export const AllPingPongTable = () => {
  const pongResults = useFetchPongResult();

  const uniqueMatches = new Set();
  const filteredResults = pongResults.data
    ? pongResults.data.filter((item) => {
        if (uniqueMatches.has(item.matchGuid)) {
          return false;
        } else {
          uniqueMatches.add(item.matchGuid);
          return true;
        }
      })
    : [];

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant='caption' color='text.secondary' fontSize={'15px'}>
        Total {pongResults.data ? pongResults.data.length : 0} Matches
      </Typography>

      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        {pongResults.data && pongResults.data.length > 0 ? (
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
                      Outcome
                    </TableCell>

                    <TableCell
                      sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                      align='left'
                    >
                      My Points
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        color: 'whitesmoke',
                      }}
                      align='left'
                    >
                      Opponent
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                      align='left'
                    >
                      Opponent Points
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                      align='left'
                    >
                      Match Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredResults
                    .sort(
                      (a, b) =>
                        dayjs(b.matchDate).valueOf() -
                        dayjs(a.matchDate).valueOf()
                    )
                    .map((item, index) => (
                      <TableRow
                        key={item.pingPongResultID}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          backgroundColor:
                            index % 2 === 0 ? '#dcdcdc' : 'white',
                        }}
                      >
                        <TableCell
                          sx={{
                            color: item.wonMatch === 'Defeat' ? 'red' : 'green',
                          }}
                          align='left'
                        >
                          {item.username}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: item.wonMatch === 'Defeat' ? 'red' : 'green',
                          }}
                          align='left'
                        >
                          {item.wonMatch}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: item.wonMatch === 'Defeat' ? 'red' : 'green',
                          }}
                          align='left'
                        >
                          {item.myPoints}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: item.wonMatch === 'Defeat' ? 'green' : 'red',
                          }}
                          align='left'
                        >
                          {item.opponentUsername}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: item.wonMatch === 'Defeat' ? 'green' : 'red',
                          }}
                          align='left'
                        >
                          {item.opponentPoints}
                        </TableCell>
                        <TableCell align='left'>
                          {dayjs(item.matchDate).format('dddd, MMMM DD, YYYY')}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
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
