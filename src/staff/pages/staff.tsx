import { Box } from '@mui/material';
import { Quizzes } from '../components/quizzes';
import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';

export const Staff = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      {user && (
        <Box>
          <Quizzes userId={user.personID} />
        </Box>
      )}
    </>
  );
};
