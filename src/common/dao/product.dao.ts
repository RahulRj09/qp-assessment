import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { LogService } from "../services/log.service";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject()
  private logService: LogService;

  async create(ctx: RequestCtx, productSchema: Prisma.ProductCreateInput) {
    const methodName = "ProductDao.create";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , productSchema=[${JSON.stringify(productSchema)}]`);
      const product = await this.prisma.product.create({
        data: productSchema,
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return product;
    } catch (e) {
      return null;
    }
  }

  async getAllAvailableProducts(ctx: RequestCtx) {
    const methodName = "ProductDao.getAllAvailableProducts";
    try {
      this.logService.info(ctx.logId, `inside ${methodName}`);
      const products = await this.prisma.product.findMany({
        where: {
          quantity: {
            gt: 1,
          },
          isActive: true,
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return products;
    } catch (e) {
      return [];
    }
  }

  async getProducts(ctx: RequestCtx) {
    const methodName = "ProductDao.getProducts";
    try {
      this.logService.info(ctx.logId, `inside ${methodName}`);
      const products = await this.prisma.product.findMany({
        where: {
          isActive: true,
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return products;
    } catch (e) {
      return [];
    }
  }

  async findById(ctx: RequestCtx, id: string) {
    const methodName = "ProductDao.findById";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
      const product = await this.prisma.product.findFirst({
        where: {
          id,
          isActive: true,
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return product;
    } catch (e) {
      return null;
    }
  }

  async updateById(ctx: RequestCtx, id: string, productSchema: Prisma.ProductUpdateInput) {
    const methodName = "ProductDao.updateById";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , productSchema=[${JSON.stringify(productSchema)}]`);
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: productSchema,
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return product;
    } catch (e) {
      return null;
    }
  }

  async findBySkuId(ctx: RequestCtx, id: string) {
    const methodName = "ProductDao.findBySkuId";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , skuId=[${id}]`);
      const product = await this.prisma.product.findFirst({
        where: {
          skuId: id,
          isActive: true,
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return product;
    } catch (e) {
      return null;
    }
  }
}
