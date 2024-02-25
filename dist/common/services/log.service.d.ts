import { LoggerService } from "@nestjs/common";
export declare class LogService implements LoggerService {
    private appName;
    private logger;
    private getLogData;
    info(ctx: string, msg: any): void;
    private err;
    private wrn;
    printObject(ctx: string, msg: string, inputObj: any): void;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
}
