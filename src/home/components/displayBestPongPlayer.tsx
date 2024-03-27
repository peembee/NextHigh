import { useEffect, useState } from 'react';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { BestPongPlayer } from './bestPongPlayer';

export const DisplayBestPongPlayer = () => {
  const [user, setUser] = useState<EmployeeResponse>();
  const fetchUser = useFetchUser();

  useEffect(() => {
    if (fetchUser.data && fetchUser.data.length > 0) {
      const sortedUsers = [...fetchUser.data].sort(
        (a, b) => b.pongVictories - a.pongVictories
      );
      setUser(sortedUsers[0]);
    }
  }, [fetchUser.data]);

  return (
    <>
      {fetchUser.isLoading && <CircularProgress />}
      {fetchUser.data && user ? (
        <>
          <Grid container pt={5}>
            <Grid item xs={12}>
              <Typography
                variant='h5'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'grey',
                  fontWeight: 'bold',
                }}
              >
                Top Dog Player
              </Typography>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                pt={3}
              >
                <BestPongPlayer user={user} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'grey',
            fontWeight: 'bold',
          }}
        >
          Someone need to play a game..
        </Typography>
      )}
    </>
  );
};
