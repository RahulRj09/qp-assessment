import { ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
export declare class HttpErrorFilter implements ExceptionFilter {
    private logService;
    catch(exception: HttpException, host: ArgumentsHost): void;
}
