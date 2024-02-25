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
exports.ConverterService = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("./log.service");
const product_dao_1 = require("../dao/product.dao");
let ConverterService = class ConverterService {
    async productUpdateSchema(ctx, adminId, body) {
        const methodName = `ConverterService.productUpdateSchema`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const schema = {
                updatedBy: adminId,
                context: ctx.logId,
            };
            const { price = 0, isActive, name, quantity = -1, skuId } = body;
            if (skuId) {
                const product = await this.productDao.findBySkuId(ctx, skuId);
                if (product) {
                    throw new Error(`product already exists with sku id ${skuId}`);
                }
                schema.skuId = skuId;
            }
            if (price > 0) {
                schema.price = price;
            }
            if (isActive === true || isActive === false) {
                schema.isActive = isActive;
            }
            if (name) {
                schema.name = name;
            }
            if (quantity > -1) {
                schema.quantity = quantity;
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName} with data=[${JSON.stringify(schema)}]`);
            return schema;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while converting product update schema`);
            throw new Error(error.message);
        }
    }
    getOrderCreateSchema(ctx, payload) {
        const methodName = `getOrderCreateSchema`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const { userId } = payload;
            const schema = {
                context: ctx.logId,
                updatedBy: userId,
                User: {
                    connect: {
                        id: userId,
                    },
                },
            };
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return schema;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while converting create order schema`);
            throw new Error(error.message);
        }
    }
    getSubOrdersSchema(ctx, order, payload) {
        const methodName = `getSubOrdersSchema`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const { userId, items } = payload;
            const schema = [];
            for (const item of items) {
                const subOrder = {
                    quantity: item.quantity,
                    context: ctx.logId,
                    updatedBy: userId,
                    orderId: order.id,
                    productId: item.itemId,
                };
                schema.push(subOrder);
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return schema;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while converting create order schema`);
            throw new Error(error.message);
        }
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], ConverterService.prototype, "logService", void 0);
__decorate([
    (0, common_1.Inject)(product_dao_1.ProductDao),
    __metadata("design:type", product_dao_1.ProductDao)
], ConverterService.prototype, "productDao", void 0);
ConverterService = __decorate([
    (0, common_1.Injectable)()
], ConverterService);
exports.ConverterService = ConverterService;
//# sourceMappingURL=converter.service.js.map