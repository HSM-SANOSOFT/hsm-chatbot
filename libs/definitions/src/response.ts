export interface IErrorResponse {
  error: {
    code: string;
    message: string;
    cuase?: string;
  };
}
