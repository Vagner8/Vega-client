export interface ResponseDto<T> {
  data: T;
  success: boolean;
  error: string;
}

export enum Api {
  Entity = 'https://localhost:7002/api/entity',
}

export enum EntityApi {
  Many = `${Api.Entity}/many`,
}