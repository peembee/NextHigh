import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QuizResultKeys } from '../quizResultKeys';

const getQuizResultApi = 'https://localhost:7062/api/QuizResult';

const fetchQuizresult = async () => {
  const res = await axios.get(getQuizResultApi);
  return res.data.result;
};

export const useFetchQuizResult = () => {
  return useQuery({
    queryKey: QuizResultKeys.all,
    queryFn: fetchQuizresult,
  });
};
