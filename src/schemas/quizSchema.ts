import * as yup from 'yup';

export const QuizSchema = yup.object().shape({
  quizHeading: yup.string().trim().required('Header is required'),
  altOne: yup.string().trim().required('First alternative is required'),
  altTwo: yup.string().trim().required('Second alternative is required'),
  altThree: yup.string().trim().required('Third alternative is required'),
  correctAnswer: yup.string().trim().required('Correctanswer is required'),
  points: yup
    .number()
    .positive()
    .integer()
    .min(1)
    .max(5)
    .required('Points is required'),
});
