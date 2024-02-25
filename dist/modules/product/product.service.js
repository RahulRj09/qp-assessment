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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../../common/services/log.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const product_dao_1 = require("../../common/dao/product.dao");
const converter_service_1 = require("../../common/services/converter.service");
let ProductService = class ProductService {
    async create(ctx, adminId, body) {
        const methodName = `ProductService.create`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const { name, quantity, price, skuId } = body;
            if (skuId) {
                const product = await this.productDao.findBySkuId(ctx, skuId);
                if (product) {
                    throw new Error(`product already exists with sku id ${skuId}`);
                }
            }
            this.logService.info(ctx.logId, `creating product with name ${name}, quantity=[${quantity}], price=[${price}]`);
            const productSchema = {
                skuId,
                name,
                quantity,
                price,
                updatedBy: adminId,
                context: ctx.logId,
            };
            const product = await this.productDao.create(ctx, productSchema);
            if (!product) {
                const logMessage = `error while creating product`;
                this.logService.info(ctx.logId, logMessage);
                throw new Error(logMessage);
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return product;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while creating product, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
    async update(ctx, adminId, body) {
        const methodName = `ProductService.update`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const { productId } = body;
            const product = await this.productDao.findById(ctx, productId);
            if (!product) {
                throw new Error(`product not found with sku productId ${productId}`);
            }
            this.logService.info(ctx.logId, `updating product with productId=[${productId}]`);
            const productUpdateSchema = await this.converterService.productUpdateSchema(ctx, adminId, body);
            const updated = await this.productDao.updateById(ctx, productId, productUpdateSchema);
            if (!updated) {
                const logMessage = `error while updating product`;
                this.logService.info(ctx.logId, logMessage);
                throw new Error(logMessage);
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return product;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while updating product, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
    async getAllAvailableProducts(ctx) {
        const methodName = `getAllAvailableProducts`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const products = await this.productDao.getAllAvailableProducts(ctx);
            if (products.length === 0) {
                return [];
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return products;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while getting all the products, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
    async getAllProducts(ctx) {
        const methodName = `getAllProducts`;
        this.logService.info(ctx.logId, `inside ${methodName}`);
        try {
            const products = await this.productDao.getProducts(ctx);
            if (products.length === 0) {
                return [];
            }
            this.logService.info(ctx.logId, `successfully executed ${methodName}`);
            return products;
        }
        catch (error) {
            this.logService.info(ctx.logId, `error while getting all the available products, error: ${error.message}`);
            throw new Error(error.message);
        }
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], ProductService.prototype, "logService", void 0);
__decorate([
    (0, common_1.Inject)(prisma_service_1.PrismaService),
    __metadata("design:type", prisma_service_1.PrismaService)
], ProductService.prototype, "prisma", void 0);
__decorate([
    (0, common_1.Inject)(product_dao_1.ProductDao),
    __metadata("design:type", product_dao_1.ProductDao)
], ProductService.prototype, "productDao", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", converter_service_1.ConverterService)
], ProductService.prototype, "converterService", void 0);
ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map