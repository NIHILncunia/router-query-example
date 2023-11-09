const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const UserStatus = {
  WITHDRAW: 'WITHDRAW',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export interface IUser {
  id?: number;
  email: string;
  userName: string;
  role?: UserRole;
  status?: UserStatus;
  created?: string;
  updated?: string;
  UserAuth?: IUserAuth[];
  UserToken?: IUserToken[];
  Withdrawal?: IWithdrawal[];
}

export interface IUserAuth {
  id?: number;
  userId: number;
  hashedPassword: string;
  user?: IUser;
}

export interface IUserToken {
  id?: number;
  userId: number;
  hashedRefreshToken: string;
  user?: IUser;
}

export interface IWithdrawal {
  id?: number;
  userId: number;
  text?: string;
  created?: string;
  user?: IUser;
}
