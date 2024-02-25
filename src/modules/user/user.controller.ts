import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { RequestCtxProvider, RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ApiResponse } from "../../providers/api-response";
import { LoginReq } from "../../common/api-models/user/login.req";
import { CreateReq } from "../../common/api-models/user/create.req";

@Controller("user")
@ApiTags("user")
export class UserController {
  @Inject()
  private userService: UserService;

  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ApiResponse, description: "user created" })
  async create(@RequestCtxProvider() ctx: RequestCtx, @Body() body: CreateReq) {
    const resp = await this.userService.create(ctx, body);
    return new ApiResponse(resp, ctx.logId);
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ApiResponse, description: "user logged in" })
  async login(@RequestCtxProvider() ctx: RequestCtx, @Body() body: LoginReq) {
    const resp = await this.userService.login(ctx, body);
    return new ApiResponse(resp, ctx.logId);
  }
}
