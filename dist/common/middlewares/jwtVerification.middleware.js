"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserIdFromToken = exports.JwtVerification = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const log_service_1 = require("../services/log.service");
const shared_1 = require("@kenko-health/shared");
const core_1 = require("@nestjs/core");
let AuthGuard = class AuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const ip = req.ip;
        this.logId = (req === null || req === void 0 ? void 0 : req.id) ? req.id : `${this.configService.get("appName")}`;
        this.remoteIp = req.headers["x-forwarded-for"] || "n/a";
        this.logService.info(this.logId, `started processing request for protected-route => ${method} : ${url} , ip=[${ip}] , remoteIp=[${this.remoteIp}]`);
        if (!req.headers.authorization)
            return false;
        req.user = await this.validateToken(req.headers.authorization);
        const requireRoles = this.reflector.getAllAndOverride("roles", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (requireRoles.length > 0) {
            const response = await this.validateUserRoles(requireRoles, [req.user.role]);
            return response;
        }
        return true;
    }
    async validateUserRoles(requireRoles, userRoles) {
        this.logService.info(this.logId, `inside role-checking middle-ware`);
        const authorized = requireRoles.some((roleReq) => userRoles.includes(roleReq));
        if (!authorized) {
            this.logService.info(this.logId, `Unauthorized Access , due to insufficient roles`);
            throw new common_1.HttpException("Unauthorized Access", common_1.HttpStatus.FORBIDDEN);
        }
        return authorized;
    }
    async validateToken(auth) {
        try {
            if (auth.split(" ")[0] !== "Bearer")
                throw new common_1.HttpException("Invalid token", common_1.HttpStatus.FORBIDDEN);
            this.token = auth.split(" ")[1];
            const decoded = await jwt.verify(this.token, this.configService.get("accessToKenSecretKey"));
            return decoded;
        }
        catch (err) {
            const { name = "*" } = err;
            this.logService.error(this.logId, `error while validating JWT : ${name}`);
            if (name === "TokenExpiredError") {
                throw new common_1.HttpException(shared_1.ErrorMessage.ACCESS_TOKEN_EXPIRED, shared_1.ErrorCode.ACCESS_TOKEN_EXPIRED);
            }
            else {
                throw new common_1.HttpException(shared_1.ErrorMessage.UN_AUTHORIZED, common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", config_1.ConfigService)
], AuthGuard.prototype, "configService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], AuthGuard.prototype, "logService", void 0);
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
function JwtVerification(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)("roles", roles), (0, common_1.UseGuards)(AuthGuard));
}
exports.JwtVerification = JwtVerification;
exports.GetUserIdFromToken = (0, common_1.createParamDecorator)((data, req) => {
    const user = req.args[0].user;
    return user.userId;
});
//# sourceMappingURL=jwtVerification.middleware.js.map