import { PongResultResponse } from '../../services/API/response/pongResultResponse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';
import dayjs from 'dayjs';
import { Divider, Typography } from '@mui/material';

type PongDropdownProps = {
  pongResults: PongResultResponse[];
};

export const PongDropdown = (props: PongDropdownProps) => {
  const { pongResults } = props;
  const { user } = useContext(AppContext);

  console.log('poong', pongResults);
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
              <TableCell
                sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                align='left'
              >
                Outcome
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'whitesmoke' }}>
                User
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                align='left'
              >
                My Points
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
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
            {pongResults.map((item, index) => (
              <TableRow
                key={item.pingPongResultID}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: index % 2 === 0 ? '#dcdcdc' : 'white',
                }}
              >
                <TableCell align='left'>{item.wonMatch}</TableCell>
                <TableCell align='left'>{user?.username}</TableCell>
                <TableCell align='center'>{item.myPoints}</TableCell>
                <TableCell align='left'>{item.opponentUsername}</TableCell>

                <TableCell align='center'>{item.opponentPoints}</TableCell>
                <TableCell align='left'>
                  {dayjs(item.matchDate).format('YYYYMMDD')}
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
        Total {pongResults.length} Matches
      </Typography>
    </>
  );
};
