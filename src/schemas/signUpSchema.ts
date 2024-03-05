import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  email: yup.string().trim().email().required('Email is required'),
  firstName: yup.string().trim().required('Firstname is required'),
  lastName: yup.string().trim().required('Lastname is required'),
  yearsInPratice: yup
    .number()
    .positive()
    .integer()
    .min(0)
    .max(80)
    .required('Hiredtime is required'),
  password: yup.string().min(4).max(20).required('Password is required'),
  confirmPassword: yup
    .string()
    .notOneOf([null], "Password Don't Match")
    .oneOf([yup.ref('password')], "Password Don't Match")
    .required('Confirm Password is required'),
});
