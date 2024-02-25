import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { LogService } from "../services/log.service";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { Prisma } from "@prisma/client";
import { CreateReq } from "../api-models/order/create.req";
import { ConverterService } from "../services/converter.service";

@Injectable()
export class OrderDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject()
  private logService: LogService;

  @Inject()
  private converterService: ConverterService;

  async create(ctx: RequestCtx, orderSchema: Prisma.OrderCreateInput) {
    const methodName = "OrderDao.create";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , orderSchema=[${JSON.stringify(orderSchema)}]`);
      const order = await this.prisma.order.create({
        data: orderSchema,
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return order;
    } catch (e) {
      return null;
    }
  }

  async findById(ctx: RequestCtx, id: string) {
    const methodName = "OrderDao.findById";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
      const order = await this.prisma.order.findFirst({
        where: {
          id,
          isActive: true,
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return order;
    } catch (e) {
      return null;
    }
  }

  async updateById(ctx: RequestCtx, id: string, orderSchema: Prisma.OrderUpdateInput) {
    const methodName = "OrderDao.updateById";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , orderSchema=[${JSON.stringify(orderSchema)}]`);
      const order = await this.prisma.order.update({
        where: {
          id,
        },
        data: orderSchema,
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return order;
    } catch (e) {
      return null;
    }
  }

  async getOrdersByUserId(ctx: RequestCtx, id: string) {
    const methodName = "OrderDao.getOrdersByUserId";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
      const order = await this.prisma.order.findMany({
        where: {
          userId: id,
          isActive: true,
        },
        include: {
          SubOrder: {
            include: {
              Product: true,
            },
          },
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return order;
    } catch (e) {
      return null;
    }
  }

  async orderCreate(ctx: RequestCtx, reqBody: CreateReq) {
    const methodName = `OrderDao.orderCreate`;
    this.logService.info(ctx.logId, `inside benefitCreationOperation...`);
    try {
      const orderSchema: Prisma.OrderCreateInput = this.converterService.getOrderCreateSchema(ctx, reqBody);
      const orderToReturn = await this.prisma.$transaction(async (prisma) => {
        const order = await prisma.order.create({
          data: orderSchema,
        });
        if (!order) {
          throw new Error(`error while creating order`);
        }
        for (const item of reqBody.items) {
          const product = await prisma.product.findUnique({
            where: {
              id: item.itemId,
            },
          });
          await prisma.product.update({
            where: { id: item.itemId },
            data: {
              quantity: product.quantity - item.quantity,
              context: ctx.logId,
              updatedBy: reqBody.userId,
            },
          });
        }
        const subOrdersSchema = this.converterService.getSubOrdersSchema(ctx, order, reqBody);
        await prisma.subOrder.createMany({
          data: subOrdersSchema,
          skipDuplicates: true,
        });
        return order;
      });
      const order = await this.prisma.order.findMany({
        where: {
          id: orderToReturn.id,
          isActive: true,
        },
        include: {
          SubOrder: {
            include: {
              Product: true,
            },
          },
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return order;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
