import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "./log.service";
import { UpdateReq } from "../api-models/product/update.req";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { Order, Prisma } from "@prisma/client";
import { ProductDao } from "../dao/product.dao";
import { CreateReq } from "../api-models/order/create.req";

@Injectable()
export class ConverterService {
  @Inject()
  private logService: LogService;

  @Inject(ProductDao)
  private productDao: ProductDao;

  async productUpdateSchema(ctx: RequestCtx, adminId: string, body: UpdateReq) {
    const methodName = `ConverterService.productUpdateSchema`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const schema: Prisma.ProductUpdateInput = {
        updatedBy: adminId,
        context: ctx.logId,
      };
      const { price = 0, isActive, name, quantity = -1, skuId } = body;

      if (skuId) {
        const product = await this.productDao.findBySkuId(ctx, skuId);
        if (product) {
          throw new Error(`product already exists with sku id ${skuId}`);
        }
        schema.skuId = skuId;
      }

      if (price > 0) {
        schema.price = price;
      }
      if (isActive === true || isActive === false) {
        schema.isActive = isActive;
      }
      if (name) {
        schema.name = name;
      }
      if (quantity > -1) {
        schema.quantity = quantity;
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName} with data=[${JSON.stringify(schema)}]`);
      return schema;
    } catch (error) {
      this.logService.info(ctx.logId, `error while converting product update schema`);
      throw new Error(error.message);
    }
  }

  getOrderCreateSchema(ctx: RequestCtx, payload: CreateReq) {
    const methodName = `getOrderCreateSchema`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const { userId } = payload;
      const schema: Prisma.OrderCreateInput = {
        context: ctx.logId,
        updatedBy: userId,
        User: {
          connect: {
            id: userId,
          },
        },
      };
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return schema;
    } catch (error) {
      this.logService.info(ctx.logId, `error while converting create order schema`);
      throw new Error(error.message);
    }
  }

  getSubOrdersSchema(ctx: RequestCtx, order: Order, payload: CreateReq) {
    const methodName = `getSubOrdersSchema`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const { userId, items } = payload;
      const schema: Prisma.SubOrderCreateManyInput[] = [];
      for (const item of items) {
        const subOrder: Prisma.SubOrderCreateManyInput = {
          quantity: item.quantity,
          context: ctx.logId,
          updatedBy: userId,
          orderId: order.id,
          productId: item.itemId,
        };
        schema.push(subOrder);
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return schema;
    } catch (error) {
      this.logService.info(ctx.logId, `error while converting create order schema`);
      throw new Error(error.message);
    }
  }
}
