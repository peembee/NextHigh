import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoginRequest } from '../../../services/API/request/loginRequest';

const getUserApi = 'https://localhost:7062/api/Login';

const getUser = async (user: LoginRequest) => {
  try {
    const res = await axios.post(getUserApi, {
      username: user.username,
      password: user.password,
    });
    console.log('res från login', res);
    return res.data;
  } catch (error) {
    console.log('error i createUSER:', error);
    throw error;
  }
};

export const useFetchUser = () => {
  return useMutation({
    mutationFn: getUser,
  });
};
