import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuizResultKeys } from '../quizResultKeys';
import { QuizResultRequest } from '../../../services/API/request/quizResultRequest';
import axios from 'axios';

const createQuizResultApi = 'https://localhost:7062/api/QuizResult';

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
