import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EmployeeKeys } from '../employeeKeys';
import { EmployeeRequest } from '../../../services/API/request/employeeRequest';

const updateUserApi = 'https://localhost:7062/api/person';

const updateUser = async (user: EmployeeRequest) => {
  console.log('user from wuery', user);
  const res = await axios.put(`${updateUserApi}/${user.personID}`, user);
  return res.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EmployeeKeys.all });
    },
  });
};
