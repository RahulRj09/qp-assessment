import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ApiResponse } from "../../providers/api-response";
import { LoginReq } from "../../common/api-models/user/login.req";
import { CreateReq } from "../../common/api-models/user/create.req";
export declare class UserController {
    private userService;
    create(ctx: RequestCtx, body: CreateReq): Promise<ApiResponse<unknown>>;
    login(ctx: RequestCtx, body: LoginReq): Promise<ApiResponse<unknown>>;
}
