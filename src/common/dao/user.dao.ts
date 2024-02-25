import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { LogService } from "../services/log.service";
import { RequestCtx } from "../decorators/requestContext.decorator";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject()
  private logService: LogService;

  async create(ctx: RequestCtx, userSchema: Prisma.UserCreateInput) {
    const methodName = "UserDao.create";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , userSchema=[${JSON.stringify(userSchema)}]`);
      const user = await this.prisma.user.create({
        data: userSchema,
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return user;
    } catch (e) {
      return null;
    }
  }

  async findById(ctx: RequestCtx, id: string) {
    const methodName = "UserDao.findById";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , id=[${id}]`);
      const user = await this.prisma.user.findFirst({
        where: {
          id,
          isActive: true,
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return user;
    } catch (e) {
      return null;
    }
  }

  async findByEmailId(ctx: RequestCtx, emailId: string) {
    const methodName = "UserDao.findByEmailId";
    try {
      this.logService.info(ctx.logId, `inside ${methodName} , emailId=[${emailId}]`);
      const user = await this.prisma.user.findFirst({
        where: {
          emailId,
          isActive: true,
        },
      });
      this.logService.info(ctx.logId, `successfully executed ${methodName}`);
      return user;
    } catch (e) {
      return null;
    }
  }
}
