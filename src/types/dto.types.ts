import { IUser, UserRole, UserStatus } from './entity.typs';

export interface ICreateUserDto {
  email: string;
  userName: string;
  password: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}

export interface IUserResDto {
  message: string;
  user: IUser;
  tokenExp?: number;
}

export interface IUpdateUserDto {
  userName?: string;
  role?: UserRole,
  status?: UserStatus;
}

export interface ICreateWithdrawalDto {
  userId: number;
  text?: string;
}

export interface ICookies {
  sign: boolean;
  tokenExp: number;
}
