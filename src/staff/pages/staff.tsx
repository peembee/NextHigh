import { Box, Button, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/appContext';
import { DisplayRanks } from '../components/displayRanks';

import { Quizzes } from '../components/quizzes';

export const Staff = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      {user && (
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                pb={10}
                display={'flex'}
                justifyContent={'center'}
                minHeight={'30rem'}
                maxHeight={'30rem'}
              >
                <Quizzes userId={user.personID} />
              </Grid>
              <Grid item xs={12}>
                <DisplayRanks />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
