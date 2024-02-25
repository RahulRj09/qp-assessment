"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const common_module_1 = require("./common/common.module");
const ctxId_midddleware_1 = require("./common/middlewares/ctxId.midddleware");
const env_validation_1 = require("./config/env.validation");
const env_variables_1 = require("./config/env.variables");
const exceptions_filter_1 = require("./providers/exception-filters/exceptions.filter");
const user_module_1 = require("./modules/user/user.module");
const product_module_1 = require("./modules/product/product.module");
const order_module_1 = require("./modules/order/order.module");
let AppModule = class AppModule {
    configure(userContext) {
        userContext.apply(ctxId_midddleware_1.CtxIdMiddleware).forRoutes({ path: "/**", method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
                validate: env_validation_1.validate,
                load: [env_variables_1.default],
            }),
            common_module_1.CommonModule,
            user_module_1.UserModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: exceptions_filter_1.HttpErrorFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map