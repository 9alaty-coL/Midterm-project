export interface Account {
  
  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;
}

export interface RegisterAccount extends Account {
  readonly firstName: string;
  readonly lastName: string;
  readonly yearOfBirth: number;
  readonly address: string;
}

export interface UpdateAccount {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly yearOfBirth: number;
  readonly address: string;
}