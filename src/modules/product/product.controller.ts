import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequestCtxProvider, RequestCtx } from "../../common/decorators/requestContext.decorator";
import { ApiResponse } from "../../providers/api-response";
import { GetUserIdFromToken, JwtVerification } from "../../common/middlewares/jwtVerification.middleware";
import { UserRolesEnum } from "../../constants/enums";
import { ProductService } from "./product.service";
import { CreateReq } from "../../common/api-models/product/create.req";
import { UpdateReq } from "../../common/api-models/product/update.req";

@Controller("product")
@ApiTags("product")
export class ProductController {
  @Inject()
  private productService: ProductService;

  @Get("/products")
  @JwtVerification(UserRolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async getAllProducts(@RequestCtxProvider() ctx: RequestCtx) {
    const resp = await this.productService.getAllProducts(ctx);
    return new ApiResponse(resp, ctx.logId);
  }

  @Get("/getAllAvailableProducts")
  @JwtVerification(UserRolesEnum.ADMIN, UserRolesEnum.USER)
  @HttpCode(HttpStatus.OK)
  async getAllAvailableProducts(@RequestCtxProvider() ctx: RequestCtx) {
    const resp = await this.productService.getAllAvailableProducts(ctx);
    return new ApiResponse(resp, ctx.logId);
  }

  @Post("/create")
  @JwtVerification(UserRolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ApiResponse, description: "product created" })
  async create(@GetUserIdFromToken() userId: string, @RequestCtxProvider() ctx: RequestCtx, @Body() body: CreateReq) {
    const resp = await this.productService.create(ctx, userId, body);
    return new ApiResponse(resp, ctx.logId);
  }

  @Put("/update")
  @JwtVerification(UserRolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ApiResponse, description: "product updated" })
  async update(@GetUserIdFromToken() userId: string, @RequestCtxProvider() ctx: RequestCtx, @Body() body: UpdateReq) {
    const resp = await this.productService.update(ctx, userId, body);
    return new ApiResponse(resp, ctx.logId);
  }
}
