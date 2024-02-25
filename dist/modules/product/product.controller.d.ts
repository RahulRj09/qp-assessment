import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ApiResponse } from "../../providers/api-response";
import { CreateReq } from "../../common/api-models/product/create.req";
import { UpdateReq } from "../../common/api-models/product/update.req";
export declare class ProductController {
    private productService;
    getAllProducts(ctx: RequestCtx): Promise<ApiResponse<unknown>>;
    getAllAvailableProducts(ctx: RequestCtx): Promise<ApiResponse<unknown>>;
    create(userId: string, ctx: RequestCtx, body: CreateReq): Promise<ApiResponse<unknown>>;
    update(userId: string, ctx: RequestCtx, body: UpdateReq): Promise<ApiResponse<unknown>>;
}
