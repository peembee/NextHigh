import axios from 'axios';
import { QuizResultKeys } from '../quizResultKeys';
import { useQuery } from '@tanstack/react-query';

const getQuizResultApi = `${import.meta.env.VITE_APP_API_URL}/QuizResult`;

const getQuizResultById = async (userID: number) => {
  const res = await axios.get(`${getQuizResultApi}/${userID}`);
  return res.data.result;
};

export const useFetchQuizResultById = (id: number) => {
  return useQuery({
    queryKey: QuizResultKeys.byId(id),
    queryFn: () => getQuizResultById(id),
    retry: 3,
  });
};
