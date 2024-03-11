import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EmployeeKeys } from '../../../staff/queries/employeeKeys';

const getUserApi = 'https://localhost:7062/api/Person';

const fetchUser = async () => {
  const res = await axios(getUserApi);
  return res.data.result;
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: EmployeeKeys.all,
    queryFn: fetchUser,
  });
};
