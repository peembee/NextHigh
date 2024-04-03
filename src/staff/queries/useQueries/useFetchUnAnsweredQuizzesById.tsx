import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { QuizKeys } from '../../../profile/queries/quizKeys';

const getUserApi = `${import.meta.env.VITE_APP_API_URL}/UnAsweredQuizzes`;

const FetchUnAnsweredQuizzes = async (userID: number) => {
  const res = await axios.get(`${getUserApi}/${userID}`);
  return res.data;
};

export const useFetchUnAnsweredQuizzesById = (id: number) => {
  return useQuery({
    queryKey: QuizKeys.byId(id),
    queryFn: () => FetchUnAnsweredQuizzes(id),
    retry: 3,
  });
};
