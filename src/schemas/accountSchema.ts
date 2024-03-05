import * as yup from 'yup';

export const AccountSchema = yup.object().shape({
  personID: yup.number().nullable(), // Lägg till personID här om det behövs
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
  imageURL: yup.string().nullable(),
});
