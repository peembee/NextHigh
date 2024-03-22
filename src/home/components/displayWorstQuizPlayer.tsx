import { useEffect, useState } from 'react';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { WorstQuizPlayer } from './worstQuizPlayer';

export const DisplayWorstQuizPlayer = () => {
  const [user, setUser] = useState<EmployeeResponse>();
  const fetchUser = useFetchUser();

  useEffect(() => {
    if (fetchUser.data && fetchUser.data.length > 0) {
      const sortedUsers = [...fetchUser.data].sort(
        (a, b) => a.empPoints - b.empPoints
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
                R U even an Employee?..
              </Typography>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'center'}
                pt={3}
              >
                <WorstQuizPlayer user={user} />
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
          Someone need to make a quiz..
        </Typography>
      )}
    </>
  );
};
