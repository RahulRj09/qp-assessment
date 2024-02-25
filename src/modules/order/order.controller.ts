import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequestCtxProvider, RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ApiResponse } from "../../providers/api-response";
import { JwtVerification } from "../../common/middlewares/jwtVerification.middleware";
import { UserRolesEnum } from "../../constants/enums";
import { OrderService } from "./order.service";
import { CreateReq } from "../../common/api-models/order/create.req";

@Controller("order")
@ApiTags("order")
export class OrderController {
  @Inject()
  private orderService: OrderService;

  @Get("/getOrdersByUserId/:id")
  @JwtVerification(UserRolesEnum.ADMIN, UserRolesEnum.USER)
  @HttpCode(HttpStatus.OK)
  async getOrdersByUserId(@RequestCtxProvider() ctx: RequestCtx, @Param("id") id: string) {
    const resp = await this.orderService.getOrdersByUserId(ctx, id);
    return new ApiResponse(resp, ctx.logId);
  }

  @Post("/create")
  @JwtVerification(UserRolesEnum.ADMIN, UserRolesEnum.USER)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ApiResponse, description: "order created" })
  async create(@RequestCtxProvider() ctx: RequestCtx, @Body() body: CreateReq) {
    const resp = await this.orderService.create(ctx, body);
    return new ApiResponse(resp, ctx.logId);
  }
}
