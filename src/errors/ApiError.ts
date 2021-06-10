class ApiError extends Error {
  res: Response;

  code: number;

  constructor(res: Response) {
    super('ApiError');
    this.res = res;
    this.code = res.status;
  }
}

export default ApiError;
