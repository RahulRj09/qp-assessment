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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const log_service_1 = require("../../common/services/log.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_dao_1 = require("../../common/dao/user.dao");
const common_service_1 = require("../../common/services/common.service");
let UserService = class UserService {
    async create(ctx, body) {
        const methodName = `UserService.create`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const { emailId, password, role } = body;
            const isUserUnique = await this.isEmailUnique(ctx, emailId);
            if (!isUserUnique) {
                const logMsg = `email id already exists`;
                this.logService.info(ctx.logId, logMsg);
                throw new Error(logMsg);
            }
            this.logService.info(ctx.logId, `creating user with email ${emailId}`);
            const userSchema = {
                emailId: emailId,
                password: this.commonService.getHash(password),
                context: ctx.logId,
                role: role,
                updatedBy: ctx.logId,
            };
            const createdUser = await this.userDao.create(ctx, userSchema);
            if (!createdUser) {
                const logMessage = `error while creating user`;
                this.logService.info(ctx.logId, logMessage);
                throw new Error(logMessage);
            }
            return createdUser;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while creating user, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
    async login(ctx, body) {
        const methodName = `login`;
        this.logService.info(ctx.logId, `inside ${methodName} with email: ${body.emailId}`);
        try {
            const { emailId, md5Password } = body;
            const user = await this.userDao.findByEmailId(ctx, emailId);
            if (!user) {
                const logMsg = `user not found with email ${emailId}`;
                this.logService.info(ctx.logId, logMsg);
                throw new Error(logMsg);
            }
            const { password } = user;
            if (password !== md5Password) {
                const logMsg = `user password mismatch with emailId ${emailId}`;
                this.logService.info(ctx.logId, logMsg);
                throw new Error(`invalid password`);
            }
            const token = await this.commonService.getAccessTokenNew({
                userId: user.id,
                role: user.role,
                sub: user.id,
            });
            return { userId: user.id, token, emailId };
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while user login, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
    async isEmailUnique(ctx, emailId) {
        this.logService.info(ctx.logId, `checking uniq-ness in PROD`);
        const emailFound = await this.userDao.findByEmailId(ctx, emailId);
        if (emailFound) {
            this.logService.info(ctx.logId, `email id already exists`);
            return false;
        }
        this.logService.info(ctx.logId, `email were unique`);
        return true;
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], UserService.prototype, "logService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", config_1.ConfigService)
], UserService.prototype, "configService", void 0);
__decorate([
    (0, common_1.Inject)(prisma_service_1.PrismaService),
    __metadata("design:type", prisma_service_1.PrismaService)
], UserService.prototype, "prisma", void 0);
__decorate([
    (0, common_1.Inject)(user_dao_1.UserDao),
    __metadata("design:type", user_dao_1.UserDao)
], UserService.prototype, "userDao", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", common_service_1.CommonService)
], UserService.prototype, "commonService", void 0);
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map