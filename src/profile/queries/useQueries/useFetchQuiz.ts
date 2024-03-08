import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QuizKeys } from '../quizKeys';

const fetchQuizApi = 'https://localhost:7062/api/Quizzes';

const getAllQuiz = async () => {
  const res = await axios.get(fetchQuizApi);
  return res.data.result;
};

export const useFetchQuiz = () => {
  return useQuery({
    queryKey: QuizKeys.all,
    queryFn: () => getAllQuiz(),
  });
};
