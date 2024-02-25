import { RequestCtx } from "../decorators/requestContext.decorator";
import { Prisma } from "@prisma/client";
import { CreateReq } from "../api-models/order/create.req";
export declare class OrderDao {
    private prisma;
    private logService;
    private converterService;
    create(ctx: RequestCtx, orderSchema: Prisma.OrderCreateInput): Promise<import(".prisma/client").Order>;
    findById(ctx: RequestCtx, id: string): Promise<import(".prisma/client").Order>;
    updateById(ctx: RequestCtx, id: string, orderSchema: Prisma.OrderUpdateInput): Promise<import(".prisma/client").Order>;
    getOrdersByUserId(ctx: RequestCtx, id: string): Promise<(import(".prisma/client").Order & {
        SubOrder: (import(".prisma/client").SubOrder & {
            Product: import(".prisma/client").Product;
        })[];
    })[]>;
    orderCreate(ctx: RequestCtx, reqBody: CreateReq): Promise<(import(".prisma/client").Order & {
        SubOrder: (import(".prisma/client").SubOrder & {
            Product: import(".prisma/client").Product;
        })[];
    })[]>;
}
