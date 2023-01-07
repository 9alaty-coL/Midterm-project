import { Account, RegisterAccount } from 'src/models/account';
import * as Yup from 'yup';

/** Register form. */
export type ResetPasswordFormValue = Pick<RegisterAccount, 'password'>
 & {retypePassword: string};

export const initValues: ResetPasswordFormValue = {
  password: '',
  retypePassword: '',
};

export const resetPasswordFormSchema: Yup.SchemaOf<ResetPasswordFormValue> = Yup.object().shape({
  password: Yup.string().required(),
  retypePassword: Yup.string()
  .required()
  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
