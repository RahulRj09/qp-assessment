import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { CreateReq } from "../../common/api-models/order/create.req";
export declare class OrderService {
    private logService;
    private prisma;
    private productDao;
    private userDao;
    private orderDao;
    create(ctx: RequestCtx, payload: CreateReq): Promise<(import(".prisma/client").Order & {
        SubOrder: (import(".prisma/client").SubOrder & {
            Product: import(".prisma/client").Product;
        })[];
    })[]>;
    validateOrderCreateRequest(ctx: RequestCtx, payload: CreateReq): Promise<void>;
    getOrdersByUserId(ctx: RequestCtx, id: string): Promise<(import(".prisma/client").Order & {
        SubOrder: (import(".prisma/client").SubOrder & {
            Product: import(".prisma/client").Product;
        })[];
    })[]>;
}
