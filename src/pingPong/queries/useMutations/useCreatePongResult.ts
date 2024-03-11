import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PongResultRequest } from '../../../services/API/request/pongResultRequest';
import { PongResultKeys } from '../../../profile/queries/pongResultKeys';

const createPongResultApi = 'https://localhost:7062/api/PongResult';

const createPongResult = async (newResult: PongResultRequest) => {
  const res = await axios.post(createPongResultApi, newResult);
  return res.data;
};
export const useCreatePongResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPongResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PongResultKeys.all });
    },
  });
};
