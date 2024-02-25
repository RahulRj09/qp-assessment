import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { CreateReq } from "../../common/api-models/product/create.req";
import { UpdateReq } from "../../common/api-models/product/update.req";
export declare class ProductService {
    private logService;
    private prisma;
    private productDao;
    private converterService;
    create(ctx: RequestCtx, adminId: string, body: CreateReq): Promise<import(".prisma/client").Product>;
    update(ctx: RequestCtx, adminId: string, body: UpdateReq): Promise<import(".prisma/client").Product>;
    getAllAvailableProducts(ctx: RequestCtx): Promise<import(".prisma/client").Product[]>;
    getAllProducts(ctx: RequestCtx): Promise<import(".prisma/client").Product[]>;
}
