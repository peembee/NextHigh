import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PongResultKeys } from '../pongResultKeys';

const getUserApi = 'https://localhost:7062/api/PongResult';

const getPongResultById = async (userID: number) => {
  const res = await axios.get(`${getUserApi}/${userID}`);
  return res.data.result;
};

export const useFetchPongResultById = (id: number) => {
  return useQuery({
    queryKey: PongResultKeys.byId(id),
    queryFn: () => getPongResultById(id),
  });
};
