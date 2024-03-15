import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PongResultKeys } from '../../../profile/queries/pongResultKeys';

const getPongResultApi = 'https://localhost:7062/api/PongResult';

const fetchPongresult = async () => {
  const res = await axios.get(getPongResultApi);
  return res.data.result;
};

export const useFetchPongResult = () => {
  return useQuery({
    queryKey: PongResultKeys.all,
    queryFn: fetchPongresult,
    retry: 3,
  });
};
