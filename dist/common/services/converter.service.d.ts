import { UpdateReq } from "../api-models/product/update.req";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { Order, Prisma } from "@prisma/client";
import { CreateReq } from "../api-models/order/create.req";
export declare class ConverterService {
    private logService;
    private productDao;
    productUpdateSchema(ctx: RequestCtx, adminId: string, body: UpdateReq): Promise<Prisma.ProductUpdateInput>;
    getOrderCreateSchema(ctx: RequestCtx, payload: CreateReq): Prisma.OrderCreateInput;
    getSubOrdersSchema(ctx: RequestCtx, order: Order, payload: CreateReq): Prisma.SubOrderCreateManyInput[];
}
