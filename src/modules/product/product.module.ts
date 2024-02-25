import { Module } from "@nestjs/common";
import { CommonModule } from "../../common/common.module";
import { PrismaService } from "../../prisma/prisma.service";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
  imports: [CommonModule],
})
export class ProductModule {}
