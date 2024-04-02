import { useEffect, useState } from 'react';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
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
          <Divider
            orientation='vertical'
            sx={{
              borderWidth: '1px', // Här anger du önskad tjocklek, till exempel 2px
            }}
          />
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
              pt={3}
              pr={5}
              pl={5}
              display={'flex'}
              justifyContent={'center'}
            >
              {user.map((user) => (
                <Grid
                  key={user.personID}
                  sx={{ paddingBottom: { xs: '20px', md: '0px' } }}
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
