import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { EmployeeKeys } from '../employeeKeys';

const getUserApi = `${import.meta.env.VITE_APP_API_URL}/person`;

const getUserById = async (userID: number) => {
  const res = await axios.get(`${getUserApi}/${userID}`);
  return res.data;
};

export const useFetchUserById = (id: number) => {
  return useQuery({
    queryKey: EmployeeKeys.byId(id),
    queryFn: () => getUserById(id),
    retry: 3,
  });
};
