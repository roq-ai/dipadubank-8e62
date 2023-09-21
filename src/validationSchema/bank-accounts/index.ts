import * as yup from 'yup';

export const bankAccountValidationSchema = yup.object().shape({
  account_balance: yup.number().required(),
  account_type: yup.string().nullable(),
  interest_rate: yup.number().nullable(),
  account_number: yup.string().required(),
  account_status: yup.string().nullable(),
  account_owner: yup.string().nullable(),
});
