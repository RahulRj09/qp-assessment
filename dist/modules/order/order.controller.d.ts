import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ApiResponse } from "../../providers/api-response";
import { CreateReq } from "../../common/api-models/order/create.req";
export declare class OrderController {
    private orderService;
    getOrdersByUserId(ctx: RequestCtx, id: string): Promise<ApiResponse<unknown>>;
    create(ctx: RequestCtx, body: CreateReq): Promise<ApiResponse<unknown>>;
}
