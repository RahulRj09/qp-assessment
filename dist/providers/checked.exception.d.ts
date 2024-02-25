import { HttpException, HttpStatus } from "@nestjs/common";
export declare class CheckedException extends HttpException {
    error: any;
    code: number;
    constructor(ctxId: string, errMsg: string, error?: any, statusCode?: HttpStatus);
}
