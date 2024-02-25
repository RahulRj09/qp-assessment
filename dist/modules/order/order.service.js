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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../../common/services/log.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const product_dao_1 = require("../../common/dao/product.dao");
const user_dao_1 = require("../../common/dao/user.dao");
const order_dao_1 = require("../../common/dao/order.dao");
let OrderService = class OrderService {
    async create(ctx, payload) {
        const methodName = `ProductService.create`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            await this.validateOrderCreateRequest(ctx, payload);
            const order = await this.orderDao.orderCreate(ctx, payload);
            if (!order) {
                throw new Error(`Error while creating order`);
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return order;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while creating product, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
    async validateOrderCreateRequest(ctx, payload) {
        const methodName = `validateOrderCreateRequest`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const { userId, items } = payload;
            const user = await this.userDao.findById(ctx, userId);
            if (!user) {
                throw new Error(`User not found with id ${userId}`);
            }
            for (const item of items) {
                const { itemId, quantity } = item;
                const product = await this.productDao.findById(ctx, itemId);
                if (!product) {
                    throw new Error(`Product not found with id ${itemId}`);
                }
                if (quantity > product.quantity) {
                    throw new Error(`Order quantity not available for product ${itemId}`);
                }
            }
            return;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while validating order, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
    async getOrdersByUserId(ctx, id) {
        const methodName = `getOrdersByUserId`;
        this.logService.info(ctx.logId, `inside ${methodName} with userId ${id}`);
        try {
            const orders = await this.orderDao.getOrdersByUserId(ctx, id);
            if (orders.length === 0) {
                return [];
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return orders;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while getting orders, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], OrderService.prototype, "logService", void 0);
__decorate([
    (0, common_1.Inject)(prisma_service_1.PrismaService),
    __metadata("design:type", prisma_service_1.PrismaService)
], OrderService.prototype, "prisma", void 0);
__decorate([
    (0, common_1.Inject)(product_dao_1.ProductDao),
    __metadata("design:type", product_dao_1.ProductDao)
], OrderService.prototype, "productDao", void 0);
__decorate([
    (0, common_1.Inject)(user_dao_1.UserDao),
    __metadata("design:type", user_dao_1.UserDao)
], OrderService.prototype, "userDao", void 0);
__decorate([
    (0, common_1.Inject)(order_dao_1.OrderDao),
    __metadata("design:type", order_dao_1.OrderDao)
], OrderService.prototype, "orderDao", void 0);
OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map