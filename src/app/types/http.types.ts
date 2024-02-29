export interface ResponseDto<T> {
  result: T;
  success: boolean;
  error: string;
  token: string;
}

export interface QueryParams {
  userId: string;
  [key: string]: string | number;
}

export enum ApiBaseUrl {
  Auth = 'https://localhost:7002/api/auth',
  Users = 'https://localhost:7001/api',
}

export enum ApiUrl {
  Users = `${ApiBaseUrl.Users}/users`,
  login = `${ApiBaseUrl.Auth}/login`,
  UserRegister = `${ApiBaseUrl.Auth}/register`
}
