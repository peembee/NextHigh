import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';
import { Box } from '@mui/material';

export const Home = () => {
  const { user } = useContext(AppContext);

  return <Box>home</Box>;
};
