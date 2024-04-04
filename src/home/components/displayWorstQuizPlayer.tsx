import { useEffect, useState } from 'react';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { WorstQuizPlayer } from './worstQuizPlayer';

export const DisplayWorstQuizPlayer = () => {
  const [user, setUser] = useState<EmployeeResponse[]>();
  const fetchUser = useFetchUser();

  useEffect(() => {
    if (fetchUser.data && fetchUser.data.length > 0) {
      const sortedUsers = [...fetchUser.data].sort(
        (a, b) => a.empPoints - b.empPoints
      );
      setUser(sortedUsers[0]);
    }
  }, [fetchUser.data]);

  useEffect(() => {
    if (fetchUser.data && fetchUser.data.length > 0) {
      const sortedUsers = [...fetchUser.data].sort(
        (a, b) => b.empPoints - a.empPoints
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
              Bottom Performers
            </Typography>
            <Grid
              container
              pt={3}
              pr={5}
              pl={5}
              display={'flex'}
              justifyContent={'center'}
            >
              {user.map((user, index) => (
                <Grid
                  key={index}
                  sx={{ paddingBottom: { xs: '20px', md: '0px' } }}
                  item
                  xs={12}
                  md={3}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <WorstQuizPlayer user={user} />
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
          Someone need to make a quiz..
        </Typography>
      )}
    </>
  );
};
