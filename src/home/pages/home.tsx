import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';
import { Box } from '@mui/material';

export const Home = () => {
  const { user } = useContext(AppContext);
  // test first azure commit
  return <Box>test</Box>;
};
