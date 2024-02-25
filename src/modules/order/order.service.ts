import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "../../common/services/log.service";
import { PrismaService } from "../../prisma/prisma.service";
import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ProductDao } from "../../common/dao/product.dao";
import { UserDao } from "../../common/dao/user.dao";
import { OrderDao } from "../../common/dao/order.dao";
import { CreateReq } from "../../common/api-models/order/create.req";

@Injectable()
export class OrderService {
  @Inject()
  private logService: LogService;

  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject(ProductDao)
  private productDao: ProductDao;

  @Inject(UserDao)
  private userDao: UserDao;

  @Inject(OrderDao)
  private orderDao: OrderDao;

  async create(ctx: RequestCtx, payload: CreateReq) {
    const methodName = `ProductService.create`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      await this.validateOrderCreateRequest(ctx, payload);
      const order = await this.orderDao.orderCreate(ctx, payload);
      if (!order) {
        throw new Error(`Error while creating order`);
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return order;
    } catch (error) {
      this.logService.info(ctx.logId, `error while creating product, error: ${error.message}`);
      throw new Error(error.message);
    }
  }
  async validateOrderCreateRequest(ctx: RequestCtx, payload: CreateReq) {
    const methodName = `validateOrderCreateRequest`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const { userId, items } = payload;
      const user = await this.userDao.findById(ctx, userId);
      if (!user) {
        throw new Error(`User not found with id ${userId}`);
      }
      for (const item of items) {
        const { itemId, quantity } = item;
        const product = await this.productDao.findById(ctx, itemId);
        if (!product) {
          throw new Error(`Product not found with id ${itemId}`);
        }
        if (quantity > product.quantity) {
          throw new Error(`Order quantity not available for product ${itemId}`);
        }
      }
      return;
    } catch (error) {
      this.logService.info(ctx.logId, `error while validating order, error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  async getOrdersByUserId(ctx: RequestCtx, id: string) {
    const methodName = `getOrdersByUserId`;
    this.logService.info(ctx.logId, `inside ${methodName} with userId ${id}`);
    try {
      const orders = await this.orderDao.getOrdersByUserId(ctx, id);
      if (orders.length === 0) {
        return [];
      }
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return orders;
    } catch (error) {
      this.logService.info(ctx.logId, `error while getting orders, error: ${error.message}`);
      throw new Error(error.message);
    }
  }
}
