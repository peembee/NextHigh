import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PongResultKeys } from '../pongResultKeys';

const getUserApi = `${import.meta.env.VITE_APP_API_URL}/PongResult`;

const getPongResultById = async (userID: number) => {
  const res = await axios.get(`${getUserApi}/${userID}`);
  return res.data.result;
};

export const useFetchPongResultById = (id: number) => {
  return useQuery({
    queryKey: PongResultKeys.byId(id),
    queryFn: () => getPongResultById(id),
    retry: 3,
  });
};
