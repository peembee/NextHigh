import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoginRequest } from '../../../services/API/request/loginRequest';

const getUserApi = `${import.meta.env.VITE_APP_API_URL}/Login`;

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
