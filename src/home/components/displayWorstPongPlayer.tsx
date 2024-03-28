import { useEffect, useState } from 'react';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { WorstPongPlayer } from './worstPongPlayer';

export const DisplayWorstPongPlayer = () => {
  const [user, setUser] = useState<EmployeeResponse[]>();
  const fetchUser = useFetchUser();

  useEffect(() => {
    if (fetchUser.data && fetchUser.data.length > 0) {
      const sortedUsers = [...fetchUser.data].sort(
        (a, b) => b.pongVictories - a.pongVictories
      );
      if (sortedUsers.length >= 3) {
        const lastThreeUsers = sortedUsers.slice(-3);
        setUser(lastThreeUsers);
      } else {
        setUser(sortedUsers);
      }
    }
  }, [fetchUser.data]);

  return (
    <>
      {fetchUser.isLoading && <CircularProgress />}
      {fetchUser.data && user && user.length > 0 ? (
        <Grid container pt={5}>
          <Grid item xs={10}>
            <Typography
              variant='h5'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: 'grey',
                fontWeight: 'bold',
              }}
            >
              The Underdogs
            </Typography>
            <Grid
              container
              spacing={3}
              pt={3}
              display={'flex'}
              justifyContent={'center'}
            >
              {user.map((user, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={4}
                  display={'flex'}
                  justifyContent={'right'}
                >
                  <WorstPongPlayer user={user} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
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
          Someone needs to play a game..
        </Typography>
      )}
    </>
  );
};
