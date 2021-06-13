import { StatusCodes } from 'http-status-codes';

class ApiError extends Error {
  public status;
  constructor(status: StatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

export default ApiError;
