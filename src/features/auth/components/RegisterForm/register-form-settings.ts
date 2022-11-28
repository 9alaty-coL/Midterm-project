import { Account, RegisterAccount } from 'src/models/account';
import * as Yup from 'yup';

/** Register form. */
export type RegisterFormValue = RegisterAccount & {retypePassword: string};

export const initValues: RegisterFormValue = {
  email: '',
  password: '',
  yearOfBirth: 0,
  firstName: '',
  lastName: '',
  address: '',
  retypePassword: '',
};

export const registerFormSchema: Yup.SchemaOf<RegisterFormValue> = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),

  password: Yup.string().required(),
  yearOfBirth: Yup.number().required().min(1),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  retypePassword: Yup.string()
  .required()
  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
