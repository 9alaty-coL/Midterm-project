import { RegisterAccount } from './account';
import { Group } from './group';

export interface User extends RegisterAccount {
  readonly id: string;
  readonly avatar: string;
  readonly owner: Group[];
  readonly co_owner: Group[];
  readonly member: Group[];
}
