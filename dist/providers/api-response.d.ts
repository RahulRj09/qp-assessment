export declare class ApiResponse<T> {
    respId: string;
    code: number;
    errMsg: any;
    dispMsg: string;
    data: T;
    constructor(data: any, ctxId: string, dispMsg?: string, code?: number, errMsg?: any);
}
export declare class ApiResponseArr<T> {
    respId: string;
    code: number;
    errMsg: any;
    dispMsg: string;
    data: T[];
    totalCount: number;
    constructor(data: T[], totalCount: number, ctxId: string, dispMsg?: string, code?: number, errMsg?: any);
}
export declare class ErrorException {
    error: any;
    code: number;
    constructor(error: any, code?: number);
}
