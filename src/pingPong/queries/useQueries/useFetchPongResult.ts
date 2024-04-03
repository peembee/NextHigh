import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PongResultKeys } from '../../../profile/queries/pongResultKeys';

const getPongResultApi = `${import.meta.env.VITE_APP_API_URL}/PongResult`;

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
