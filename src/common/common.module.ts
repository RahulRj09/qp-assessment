import { Module } from "@nestjs/common";
import { LogService } from "./services/log.service";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { UserDao } from "./dao/user.dao";
import { CommonService } from "./services/common.service";
import { ProductDao } from "./dao/product.dao";
import { ConverterService } from "./services/converter.service";
import { OrderDao } from "./dao/order.dao";

@Module({
  providers: [LogService, ConfigService, PrismaService, UserDao, CommonService, ProductDao, ConverterService, OrderDao],
  exports: [LogService, UserDao, CommonService, ProductDao, ConverterService, OrderDao],
})
export class CommonModule {}
