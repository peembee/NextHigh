import * as yup from 'yup';

export const PongResultSchema = yup.object().shape({
  fK_PersonID: yup.number().required('Username is required'),
  fK_PersonIDPoints: yup
    .number()
    .positive()
    .integer()
    .min(0)
    .max(80)
    .required('You need to submit your points'),
  opponentPoints: yup
    .number()
    .positive()
    .integer()
    .min(0)
    .max(80)
    .required('You need to submit your opponents points'),
  opponentUsername: yup.string().required('Opponents is required'),
});
