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
exports.OrderDao = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const log_service_1 = require("../services/log.service");
const converter_service_1 = require("../services/converter.service");
let OrderDao = class OrderDao {
    async create(ctx, orderSchema) {
        const methodName = "OrderDao.create";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , orderSchema=[${JSON.stringify(orderSchema)}]`);
            const order = await this.prisma.order.create({
                data: orderSchema,
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return order;
        }
        catch (e) {
            return null;
        }
    }
    async findById(ctx, id) {
        const methodName = "OrderDao.findById";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
            const order = await this.prisma.order.findFirst({
                where: {
                    id,
                    isActive: true,
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return order;
        }
        catch (e) {
            return null;
        }
    }
    async updateById(ctx, id, orderSchema) {
        const methodName = "OrderDao.updateById";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , orderSchema=[${JSON.stringify(orderSchema)}]`);
            const order = await this.prisma.order.update({
                where: {
                    id,
                },
                data: orderSchema,
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return order;
        }
        catch (e) {
            return null;
        }
    }
    async getOrdersByUserId(ctx, id) {
        const methodName = "OrderDao.getOrdersByUserId";
        try {
            this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
            const order = await this.prisma.order.findMany({
                where: {
                    userId: id,
                    isActive: true,
                },
                include: {
                    SubOrder: {
                        include: {
                            Product: true,
                        },
                    },
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return order;
        }
        catch (e) {
            return null;
        }
    }
    async orderCreate(ctx, reqBody) {
        const methodName = `OrderDao.orderCreate`;
        this.logService.info(ctx.logId, `inside benefitCreationOperation...`);
        try {
            const orderSchema = this.converterService.getOrderCreateSchema(ctx, reqBody);
            const orderToReturn = await this.prisma.$transaction(async (prisma) => {
                const order = await prisma.order.create({
                    data: orderSchema,
                });
                if (!order) {
                    throw new Error(`error while creating order`);
                }
                for (const item of reqBody.items) {
                    const product = await prisma.product.findUnique({
                        where: {
                            id: item.itemId,
                        },
                    });
                    await prisma.product.update({
                        where: { id: item.itemId },
                        data: {
                            quantity: product.quantity - item.quantity,
                            context: ctx.logId,
                            updatedBy: reqBody.userId,
                        },
                    });
                }
                const subOrdersSchema = this.converterService.getSubOrdersSchema(ctx, order, reqBody);
                await prisma.subOrder.createMany({
                    data: subOrdersSchema,
                    skipDuplicates: true,
                });
                return order;
            });
            const order = await this.prisma.order.findMany({
                where: {
                    id: orderToReturn.id,
                    isActive: true,
                },
                include: {
                    SubOrder: {
                        include: {
                            Product: true,
                        },
                    },
                },
            });
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return order;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
};
__decorate([
    (0, common_1.Inject)(prisma_service_1.PrismaService),
    __metadata("design:type", prisma_service_1.PrismaService)
], OrderDao.prototype, "prisma", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], OrderDao.prototype, "logService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", converter_service_1.ConverterService)
], OrderDao.prototype, "converterService", void 0);
OrderDao = __decorate([
    (0, common_1.Injectable)()
], OrderDao);
exports.OrderDao = OrderDao;
//# sourceMappingURL=order.dao.js.map