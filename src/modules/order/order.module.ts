import { Module } from "@nestjs/common";
import { CommonModule } from "../../common/common.module";
import { PrismaService } from "../../prisma/prisma.service";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
  imports: [CommonModule],
})
export class OrderModule {}
