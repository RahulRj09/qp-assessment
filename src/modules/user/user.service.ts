import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LogService } from "../../common/services/log.service";
import { PrismaService } from "../../prisma/prisma.service";
import { RequestCtx } from "../../common/decorators/requestContext.decorator";
import { UserDao } from "../../common/dao/user.dao";
import { Prisma } from "@prisma/client";
import { CommonService } from "../../common/services/common.service";
import { LoginReq } from "../../common/api-models/user/login.req";
import { CreateReq } from "../../common/api-models/user/create.req";

@Injectable()
export class UserService {
  @Inject()
  private logService: LogService;

  @Inject()
  private configService: ConfigService;

  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject(UserDao)
  private userDao: UserDao;

  @Inject()
  private commonService: CommonService;

  async create(ctx: RequestCtx, body: CreateReq) {
    const methodName = `UserService.create`;
    this.logService.info(ctx.logId, `inside ${methodName}`);
    try {
      const { emailId, password, role } = body;
      const isUserUnique = await this.isEmailUnique(ctx, emailId);
      if (!isUserUnique) {
        const logMsg = `email id already exists`;
        this.logService.info(ctx.logId, logMsg);
        throw new Error(logMsg);
      }
      this.logService.info(ctx.logId, `creating user with email ${emailId}`);
      const userSchema: Prisma.UserCreateInput = {
        emailId: emailId,
        password: this.commonService.getHash(password),
        context: ctx.logId,
        role: role,
        updatedBy: ctx.logId,
      };
      const createdUser = await this.userDao.create(ctx, userSchema);
      if (!createdUser) {
        const logMessage = `error while creating user`;
        this.logService.info(ctx.logId, logMessage);
        throw new Error(logMessage);
      }
      return createdUser;
    } catch (error) {
      this.logService.info(ctx.logId, `error while creating user, error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  async login(ctx: RequestCtx, body: LoginReq) {
    const methodName = `login`;
    this.logService.info(ctx.logId, `inside ${methodName} with email: ${body.emailId}`);
    try {
      const { emailId, md5Password } = body;
      const user = await this.userDao.findByEmailId(ctx, emailId);
      if (!user) {
        const logMsg = `user not found with email ${emailId}`;
        this.logService.info(ctx.logId, logMsg);
        throw new Error(logMsg);
      }
      const { password } = user;
      if (password !== md5Password) {
        const logMsg = `user password mismatch with emailId ${emailId}`;
        this.logService.info(ctx.logId, logMsg);
        throw new Error(`invalid password`);
      }
      const token = await this.commonService.getAccessTokenNew({
        userId: user.id,
        role: user.role,
        sub: user.id,
      });
      return { userId: user.id, token, emailId };
    } catch (error) {
      this.logService.info(ctx.logId, `error while user login, error: ${error.message}`);
      throw new Error(error.message);
    }
  }

  async isEmailUnique(ctx: RequestCtx, emailId: string) {
    this.logService.info(ctx.logId, `checking uniq-ness in PROD`);

    const emailFound = await this.userDao.findByEmailId(ctx, emailId);

    if (emailFound) {
      this.logService.info(ctx.logId, `email id already exists`);
      return false;
    }
    this.logService.info(ctx.logId, `email were unique`);
    return true;
  }
}
