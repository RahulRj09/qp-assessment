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
exports.UserDao = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const log_service_1 = require("../services/log.service");
let UserDao = class UserDao {
    async create(ctx, userSchema) {
        const methodName = "UserDao.create";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , userSchema=[${JSON.stringify(userSchema)}]`);
            const user = await this.prisma.user.create({
                data: userSchema,
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return user;
        }
        catch (e) {
            return null;
        }
    }
    async findById(ctx, id) {
        const methodName = "UserDao.findById";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
            const user = await this.prisma.user.findFirst({
                where: {
                    id,
                    isActive: true,
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return user;
        }
        catch (e) {
            return null;
        }
    }
    async findByEmailId(ctx, emailId) {
        const methodName = "UserDao.findByEmailId";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , emailId=[${emailId}]`);
            const user = await this.prisma.user.findFirst({
                where: {
                    emailId,
                    isActive: true,
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return user;
        }
        catch (e) {
            return null;
        }
    }
};
__decorate([
    (0, common_1.Inject)(prisma_service_1.PrismaService),
    __metadata("design:type", prisma_service_1.PrismaService)
], UserDao.prototype, "prisma", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], UserDao.prototype, "logService", void 0);
UserDao = __decorate([
    (0, common_1.Injectable)()
], UserDao);
exports.UserDao = UserDao;
//# sourceMappingURL=user.dao.js.map