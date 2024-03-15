import { Box, CircularProgress, Grid } from '@mui/material';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { UserDataFetcher } from './userDataFetcher';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';

export const DisplayRanks = () => {
  const fetchAllUsers = useFetchUser();
  console.log('fetchusress', fetchAllUsers.data);

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          {fetchAllUsers.data && fetchAllUsers.data.length > 0 ? (
            fetchAllUsers.data.map((user: EmployeeResponse) => (
              <Grid item key={user.personID}>
                <UserDataFetcher user={user} />
              </Grid>
            ))
          ) : (
            <CircularProgress size={24} />
          )}
        </Grid>
      </Box>
    </>
  );
};
