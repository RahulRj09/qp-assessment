"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("./services/log.service");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const user_dao_1 = require("./dao/user.dao");
const common_service_1 = require("./services/common.service");
const product_dao_1 = require("./dao/product.dao");
const converter_service_1 = require("./services/converter.service");
const order_dao_1 = require("./dao/order.dao");
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [log_service_1.LogService, config_1.ConfigService, prisma_service_1.PrismaService, user_dao_1.UserDao, common_service_1.CommonService, product_dao_1.ProductDao, converter_service_1.ConverterService, order_dao_1.OrderDao],
        exports: [log_service_1.LogService, user_dao_1.UserDao, common_service_1.CommonService, product_dao_1.ProductDao, converter_service_1.ConverterService, order_dao_1.OrderDao],
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map