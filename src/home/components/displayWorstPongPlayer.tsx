import { useEffect, useState } from 'react';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { WorstPongPlayer } from './worstPongPlayer';

export const DisplayWorstPongPlayer = () => {
  const [user, setUser] = useState<EmployeeResponse>();
  const fetchUser = useFetchUser();

  useEffect(() => {
    if (fetchUser.data && fetchUser.data.length > 0) {
      const sortedUsers = [...fetchUser.data].sort(
        (a, b) => a.pongVictories - b.pongVictories
      );
      setUser(sortedUsers[0]);
    }
  }, [fetchUser.data]);

  return (
    <>
      {fetchUser.isLoading && <CircularProgress />}
      {fetchUser.data && user ? (
        <>
          <Grid container pt={10}>
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
                Worst PingPong Player
              </Typography>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                pt={3}
              >
                <WorstPongPlayer user={user} />
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
