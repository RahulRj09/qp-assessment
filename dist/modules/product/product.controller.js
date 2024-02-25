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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const requestContext_decorator_1 = require("../../common/decorators/requestContext.decorator");
const api_response_1 = require("../../providers/api-response");
const jwtVerification_middleware_1 = require("../../common/middlewares/jwtVerification.middleware");
const enums_1 = require("../../constants/enums");
const product_service_1 = require("./product.service");
const create_req_1 = require("../../common/api-models/product/create.req");
const update_req_1 = require("../../common/api-models/product/update.req");
let ProductController = class ProductController {
    async getAllProducts(ctx) {
        const resp = await this.productService.getAllProducts(ctx);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
    async getAllAvailableProducts(ctx) {
        const resp = await this.productService.getAllAvailableProducts(ctx);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
    async create(userId, ctx, body) {
        const resp = await this.productService.create(ctx, userId, body);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
    async update(userId, ctx, body) {
        const resp = await this.productService.update(ctx, userId, body);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", product_service_1.ProductService)
], ProductController.prototype, "productService", void 0);
__decorate([
    (0, common_1.Get)("/products"),
    (0, jwtVerification_middleware_1.JwtVerification)(enums_1.UserRolesEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestContext_decorator_1.RequestCtx]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)("/getAllAvailableProducts"),
    (0, jwtVerification_middleware_1.JwtVerification)(enums_1.UserRolesEnum.ADMIN, enums_1.UserRolesEnum.USER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestContext_decorator_1.RequestCtx]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllAvailableProducts", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, jwtVerification_middleware_1.JwtVerification)(enums_1.UserRolesEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: api_response_1.ApiResponse, description: "product created" }),
    __param(0, (0, jwtVerification_middleware_1.GetUserIdFromToken)()),
    __param(1, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, requestContext_decorator_1.RequestCtx, create_req_1.CreateReq]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/update"),
    (0, jwtVerification_middleware_1.JwtVerification)(enums_1.UserRolesEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: api_response_1.ApiResponse, description: "product updated" }),
    __param(0, (0, jwtVerification_middleware_1.GetUserIdFromToken)()),
    __param(1, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, requestContext_decorator_1.RequestCtx, update_req_1.UpdateReq]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
ProductController = __decorate([
    (0, common_1.Controller)("product"),
    (0, swagger_1.ApiTags)("product")
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map