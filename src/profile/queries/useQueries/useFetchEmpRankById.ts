import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProfileKeys } from '../profileKeys';

const getUserApi = 'https://localhost:7062/api/EmployeeRanks';

const getEmpRankById = async (userID: number) => {
  const res = await axios.get(`${getUserApi}/${userID}`);
  return res.data.result;
};

export const useFetchEmpRankById = (id: number) => {
  return useQuery({
    queryKey: ProfileKeys.byId(id),
    queryFn: () => getEmpRankById(id),
    retry: 3,
  });
};
