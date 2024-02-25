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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const requestContext_decorator_1 = require("../../common/decorators/requestContext.decorator");
const api_response_1 = require("../../providers/api-response");
const login_req_1 = require("../../common/api-models/user/login.req");
const create_req_1 = require("../../common/api-models/user/create.req");
let UserController = class UserController {
    async create(ctx, body) {
        const resp = await this.userService.create(ctx, body);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
    async login(ctx, body) {
        const resp = await this.userService.login(ctx, body);
        return new api_response_1.ApiResponse(resp, ctx.logId);
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: api_response_1.ApiResponse, description: "user created" }),
    __param(0, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestContext_decorator_1.RequestCtx, create_req_1.CreateReq]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: api_response_1.ApiResponse, description: "user logged in" }),
    __param(0, (0, requestContext_decorator_1.RequestCtxProvider)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requestContext_decorator_1.RequestCtx, login_req_1.LoginReq]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, common_1.Controller)("user"),
    (0, swagger_1.ApiTags)("user")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map