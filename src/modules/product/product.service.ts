import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "../../common/services/log.service";
import { PrismaService } from "../../prisma/prisma.service";
import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ProductDao } from "../../common/dao/product.dao";
import { CreateReq } from "../../common/api-models/product/create.req";
import { Prisma } from "@prisma/client";
import { UpdateReq } from "../../common/api-models/product/update.req";
import { ConverterService } from "../../common/services/converter.service";

@Injectable()
export class ProductService {
  @Inject()
  private logService: LogService;

  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject(ProductDao)
  private productDao: ProductDao;

  @Inject()
  private converterService: ConverterService;

  async create(ctx: RequestCtx, adminId: string, body: CreateReq) {
    const methodName = `ProductService.create`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const { name, quantity, price, skuId } = body;
      if (skuId) {
        const product = await this.productDao.findBySkuId(ctx, skuId);
        if (product) {
          throw new Error(`product already exists with sku id ${skuId}`);
        }
      }
      this.logService.info(ctx.logId, `creating product with name ${name}, quantity=[${quantity}], price=[${price}]`);
      const productSchema: Prisma.ProductCreateInput = {
        skuId,
        name,
        quantity,
        price,
        updatedBy: adminId,
        context: ctx.logId,
      };
      const product = await this.productDao.create(ctx, productSchema);
      if (!product) {
        const logMessage = `error while creating product`;
        this.logService.info(ctx.logId, logMessage);
        throw new Error(logMessage);
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return product;
    } catch (error) {
      this.logService.info(ctx.logId, `error while creating product, error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  async update(ctx: RequestCtx, adminId: string, body: UpdateReq) {
    const methodName = `ProductService.update`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const { productId } = body;
      const product = await this.productDao.findById(ctx, productId);
      if (!product) {
        throw new Error(`product not found with sku productId ${productId}`);
      }

      this.logService.info(ctx.logId, `updating product with productId=[${productId}]`);
      const productUpdateSchema: Prisma.ProductUpdateInput = await this.converterService.productUpdateSchema(
        ctx,
        adminId,
        body
      );
      const updated = await this.productDao.updateById(ctx, productId, productUpdateSchema);
      if (!updated) {
        const logMessage = `error while updating product`;
        this.logService.info(ctx.logId, logMessage);
        throw new Error(logMessage);
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return product;
    } catch (error) {
      this.logService.info(ctx.logId, `error while updating product, error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  async getAllAvailableProducts(ctx: RequestCtx) {
    const methodName = `getAllAvailableProducts`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const products = await this.productDao.getAllAvailableProducts(ctx);
      if (products.length === 0) {
        return [];
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return products;
    } catch (error) {
      this.logService.info(ctx.logId, `error while getting all the products, error: ${error.message}`);
      throw new Error(error.message);
    }
  }
  async getAllProducts(ctx: RequestCtx) {
    const methodName = `getAllProducts`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const products = await this.productDao.getProducts(ctx);
      if (products.length === 0) {
        return [];
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return products;
    } catch (error) {
      this.logService.info(ctx.logId, `error while getting all the available products, error: ${error.message}`);
      throw new Error(error.message);
    }
  }
}
