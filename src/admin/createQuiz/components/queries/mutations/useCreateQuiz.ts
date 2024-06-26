import { QueryClient, useMutation } from '@tanstack/react-query';
import { QuizKeys } from '../../../../../profile/queries/quizKeys';
import axios from 'axios';
import { QuizRequest } from '../../../../../services/API/request/quizRequest';

const createQuizApi = `${import.meta.env.VITE_APP_API_URL}/Quizzes`;

const createQuiz = async (newQuiz: QuizRequest) => {
  const res = await axios.post(createQuizApi, newQuiz);
  return res.data;
};

export const useCreateQuiz = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QuizKeys.all });
    },
  });
};
