import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EmployeeKeys } from '../../../staff/queries/employeeKeys';

const getUserApi = `${import.meta.env.VITE_APP_API_URL}/Person`;

const fetchUser = async () => {
  const res = await axios(getUserApi);
  return res.data.result;
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: EmployeeKeys.all,
    queryFn: fetchUser,
    retry: 3,
  });
};
