import { RequestCtx } from "../decorators/requestContext.decorator";
import { Prisma } from "@prisma/client";
export declare class ProductDao {
    private prisma;
    private logService;
    create(ctx: RequestCtx, productSchema: Prisma.ProductCreateInput): Promise<import(".prisma/client").Product>;
    getAllAvailableProducts(ctx: RequestCtx): Promise<import(".prisma/client").Product[]>;
    getProducts(ctx: RequestCtx): Promise<import(".prisma/client").Product[]>;
    findById(ctx: RequestCtx, id: string): Promise<import(".prisma/client").Product>;
    updateById(ctx: RequestCtx, id: string, productSchema: Prisma.ProductUpdateInput): Promise<import(".prisma/client").Product>;
    findBySkuId(ctx: RequestCtx, id: string): Promise<import(".prisma/client").Product>;
}
