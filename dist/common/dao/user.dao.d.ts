import { RequestCtx } from "../decorators/requestContext.decorator";
import { Prisma } from "@prisma/client";
export declare class UserDao {
    private prisma;
    private logService;
    create(ctx: RequestCtx, userSchema: Prisma.UserCreateInput): Promise<import(".prisma/client").User>;
    findById(ctx: RequestCtx, id: string): Promise<import(".prisma/client").User>;
    findByEmailId(ctx: RequestCtx, emailId: string): Promise<import(".prisma/client").User>;
}
