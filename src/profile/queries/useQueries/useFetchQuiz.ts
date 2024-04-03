import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QuizKeys } from '../quizKeys';

const fetchQuizApi = `${import.meta.env.VITE_APP_API_URL}/Quizzes`;

const getAllQuiz = async () => {
  const res = await axios.get(fetchQuizApi);
  return res.data.result;
};

export const useFetchQuiz = () => {
  return useQuery({
    queryKey: QuizKeys.all,
    queryFn: () => getAllQuiz(),
    retry: 3,
  });
};
