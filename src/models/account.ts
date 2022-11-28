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