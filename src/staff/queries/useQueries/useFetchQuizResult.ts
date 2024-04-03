import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QuizResultKeys } from '../../../profile/queries/quizResultKeys';

const getQuizResultApi = `${import.meta.env.VITE_APP_API_URL}/QuizResult`;

const fetchQuizresult = async () => {
  const res = await axios.get(getQuizResultApi);
  return res.data.result;
};

export const useFetchQuizResult = () => {
  return useQuery({
    queryKey: QuizResultKeys.all,
    queryFn: fetchQuizresult,
    retry: 3,
  });
};
