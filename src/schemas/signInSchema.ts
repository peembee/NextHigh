import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  password: yup.string().required('Password is required'),
});
