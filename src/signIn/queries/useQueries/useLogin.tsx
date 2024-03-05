import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoginRequest } from '../../../services/API/request/loginRequest';

const getUserApi = 'https://localhost:7062/api/Login';

const getUser = async (user: LoginRequest) => {
  const res = await axios.post(getUserApi, {
    username: user.username,
    password: user.password,
  });
  return res.data;
};

export const useFetchUser = () => {
  return useMutation({
    mutationFn: getUser,
  });
};
