import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { CommonModule } from "./common/common.module";
import { CtxIdMiddleware } from "./common/middlewares/ctxId.midddleware";
import { validate } from "./config/env.validation";
import configuration from "./config/env.variables";
import { HttpErrorFilter } from "./providers/exception-filters/exceptions.filter";
import { UserModule } from "./modules/user/user.module";
import { ProductModule } from "./modules/product/product.module";
import { OrderModule } from "./modules/order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate,
      load: [configuration],
    }),
    CommonModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext.apply(CtxIdMiddleware).forRoutes({ path: "/**", method: RequestMethod.ALL });
  }
}
