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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const requestContext_decorator_1 = require("../../common/decorators/requestContext.decorator");
const api_response_1 = require("../../providers/api-response");
const jwtVerification_middleware_1 = require("../../common/middlewares/jwtVerification.middleware");
const enums_1 = require("../../constants/enums");
const order_service_1 = require("./order.service");
const create_req_1 = require("../../common/api-models/order/create.req");
let OrderController = class OrderController {
    async getOrdersByUserId(ctx, id) {
        const resp = await this.orderService.getOrdersByUserId(ctx, id);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
    async create(ctx, body) {
        const resp = await this.orderService.create(ctx, body);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", order_service_1.OrderService)
], OrderController.prototype, "orderService", void 0);
__decorate([
    (0, common_1.Get)("/getOrdersByUserId/:id"),
    (0, jwtVerification_middleware_1.JwtVerification)(enums_1.UserRolesEnum.ADMIN, enums_1.UserRolesEnum.USER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestContext_decorator_1.RequestCtx, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersByUserId", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, jwtVerification_middleware_1.JwtVerification)(enums_1.UserRolesEnum.ADMIN, enums_1.UserRolesEnum.USER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: api_response_1.ApiResponse, description: "order created" }),
    __param(0, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestContext_decorator_1.RequestCtx, create_req_1.CreateReq]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
OrderController = __decorate([
    (0, common_1.Controller)("order"),
    (0, swagger_1.ApiTags)("order")
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map