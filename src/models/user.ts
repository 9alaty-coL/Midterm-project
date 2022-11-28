import { RegisterAccount } from './account';

export interface User extends RegisterAccount {
  id: string;
  avatar: string;
}
