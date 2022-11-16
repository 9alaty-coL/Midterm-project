import { Account } from 'src/models/account';
import * as Yup from 'yup';

/** Login form. */
export type LoginFormValue = Account;

export const initValues: LoginFormValue = {
  email: '',
  password: '',
};

export const loginFormSchema: Yup.SchemaOf<LoginFormValue> = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  password: Yup.string().required(),
});
