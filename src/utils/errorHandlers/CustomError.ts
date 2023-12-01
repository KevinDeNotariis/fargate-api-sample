export class CustomError {
  message!: string;
  status!: number;
  additionalInfo!: object;

  constructor(message: string, status = 500, additionalInfo: object = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}
