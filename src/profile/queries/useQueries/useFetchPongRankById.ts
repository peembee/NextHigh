import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PongRankKeys } from '../pongRankKeys';

const getUserApi = 'https://localhost:7062/api/PongRanks';

const getPongRankById = async (userID: number) => {
  const res = await axios.get(`${getUserApi}/${userID}`);
  return res.data.result;
};

export const useFetchPongRankById = (id: number) => {
  return useQuery({
    queryKey: PongRankKeys.byId(id),
    queryFn: () => getPongRankById(id),
    retry: 3,
  });
};
