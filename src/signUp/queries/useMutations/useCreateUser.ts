import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { EmployeeRequest } from '../../../services/API/request/employeeRequest';
import { EmployeeKeys } from '../../../staff/queries/employeeKeys';

// eslint-disable-next-line no-unused-vars
const createUserApi = `${import.meta.env.VITE_APP_API_URL}/Person`;

const createUser = async (newUser: EmployeeRequest) => {
  const res = await axios.post(createUserApi, newUser);
  return res.data;
};
export const UseCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EmployeeKeys.all });
    },
  });
};
