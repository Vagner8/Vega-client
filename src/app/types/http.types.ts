export interface ResponseDto<T> {
  data: T;
  success: boolean;
  error: string;
}

export enum Api {
  Matrix = 'https://localhost:7002/api/matrix',
}

export enum MatrixApi {
  Many = `${Api.Matrix}/many`,
}