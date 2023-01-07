import { Account } from 'src/models/account';
import * as Yup from 'yup';

/** Login form. */
export type ForgotPasswordFormValue = Omit<Account, 'password'>;

export const initValues: ForgotPasswordFormValue = {
  email: '',
};

export const forgotPasswordFormSchema: Yup.SchemaOf<ForgotPasswordFormValue> = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
});
