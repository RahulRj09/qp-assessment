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
exports.ProductDao = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const log_service_1 = require("../services/log.service");
let ProductDao = class ProductDao {
    async create(ctx, productSchema) {
        const methodName = "ProductDao.create";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , productSchema=[${JSON.stringify(productSchema)}]`);
            const product = await this.prisma.product.create({
                data: productSchema,
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return product;
        }
        catch (e) {
            return null;
        }
    }
    async getAllAvailableProducts(ctx) {
        const methodName = "ProductDao.getAllAvailableProducts";
        try {
            this.logService.info(ctx.logId, `inside ${methodName}`);
            const products = await this.prisma.product.findMany({
                where: {
                    quantity: {
                        gt: 1,
                    },
                    isActive: true,
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return products;
        }
        catch (e) {
            return [];
        }
    }
    async getProducts(ctx) {
        const methodName = "ProductDao.getProducts";
        try {
            this.logService.info(ctx.logId, `inside ${methodName}`);
            const products = await this.prisma.product.findMany({
                where: {
                    isActive: true,
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return products;
        }
        catch (e) {
            return [];
        }
    }
    async findById(ctx, id) {
        const methodName = "ProductDao.findById";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
            const product = await this.prisma.product.findFirst({
                where: {
                    id,
                    isActive: true,
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return product;
        }
        catch (e) {
            return null;
        }
    }
    async updateById(ctx, id, productSchema) {
        const methodName = "ProductDao.updateById";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , productSchema=[${JSON.stringify(productSchema)}]`);
            const product = await this.prisma.product.update({
                where: {
                    id,
                },
                data: productSchema,
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return product;
        }
        catch (e) {
            return null;
        }
    }
    async findBySkuId(ctx, id) {
        const methodName = "ProductDao.findBySkuId";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , skuId=[${id}]`);
            const product = await this.prisma.product.findFirst({
                where: {
                    skuId: id,
                    isActive: true,
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return product;
        }
        catch (e) {
            return null;
        }
    }
};
__decorate([
    (0, common_1.Inject)(prisma_service_1.PrismaService),
    __metadata("design:type", prisma_service_1.PrismaService)
], ProductDao.prototype, "prisma", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], ProductDao.prototype, "logService", void 0);
ProductDao = __decorate([
    (0, common_1.Injectable)()
], ProductDao);
exports.ProductDao = ProductDao;
//# sourceMappingURL=product.dao.js.map