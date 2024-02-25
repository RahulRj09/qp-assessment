import { Module } from "@nestjs/common";
import { CommonModule } from "../../common/common.module";
import { PrismaService } from "../../prisma/prisma.service";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [CommonModule],
})
export class UserModule {}
