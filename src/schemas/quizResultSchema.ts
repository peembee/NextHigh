import * as yup from 'yup';

export const QuizResultSchema = yup.object().shape({
  fK_PersonID: yup.number().required('Username is required'),
  fK_QuizID: yup.number().required('Quiz-ID is required'),
  guessedAnswer: yup.string().required('Valid guess is required'),
});
