import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { LoginReq } from "../../common/api-models/user/login.req";
import { CreateReq } from "../../common/api-models/user/create.req";
export declare class UserService {
    private logService;
    private configService;
    private prisma;
    private userDao;
    private commonService;
    create(ctx: RequestCtx, body: CreateReq): Promise<import(".prisma/client").User>;
    login(ctx: RequestCtx, body: LoginReq): Promise<{
        userId: string;
        token: string;
        emailId: string;
    }>;
    isEmailUnique(ctx: RequestCtx, emailId: string): Promise<boolean>;
}
