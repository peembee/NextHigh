import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { EmployeeKeys } from '../employeeKeys';

const getUserApi = 'https://localhost:7062/api/person';

const getUserById = async (userID: number) => {
  try {
    const res = await axios.get(`${getUserApi}/${userID}`);
    return res.data;
  } catch (error) {
    throw new Error('An error occurred while fetching user by ID');
  }
};

export const useFetchUserById = (id: number) => {
  return useQuery({
    queryKey: EmployeeKeys.byId(id),
    queryFn: () => getUserById(id),
  });
};
