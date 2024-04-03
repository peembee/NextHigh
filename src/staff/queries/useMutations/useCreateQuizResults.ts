import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuizResultRequest } from '../../../services/API/request/quizResultRequest';
import axios from 'axios';
import { QuizResultKeys } from '../../../profile/queries/quizResultKeys';

const createQuizResultApi = `${import.meta.env.VITE_APP_API_URL}/QuizResult`;

const createQuizResults = async (newResult: QuizResultRequest) => {
  const res = await axios.post(createQuizResultApi, newResult);
  return res.data.result;
};

export const useCreateQuizResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuizResults,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QuizResultKeys.all });
    },
  });
};
