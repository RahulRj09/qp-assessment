import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
export declare class AuthGuard implements CanActivate {
    private reflector;
    private configService;
    private logService;
    private logId;
    private token;
    private remoteIp;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateUserRoles(requireRoles: string[], userRoles: string[]): Promise<true>;
    validateToken(auth: string): Promise<any>;
}
export declare function JwtVerification(...roles: string[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const GetUserIdFromToken: (...dataOrPipes: any[]) => ParameterDecorator;
