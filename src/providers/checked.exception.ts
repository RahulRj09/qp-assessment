import { HttpException, HttpStatus } from "@nestjs/common";

export class CheckedException extends HttpException {
  error: any;
  code: number;

  constructor(ctxId: string, errMsg: string, error?: any, statusCode: HttpStatus = undefined) {
    super(
      {
        code: statusCode ? statusCode : HttpStatus.BAD_REQUEST,
        errMsg,
        dispMsg: "",
        respId: ctxId,
        error: error ? error : {},
      },
      HttpStatus.BAD_REQUEST | statusCode
    );
  }
}
