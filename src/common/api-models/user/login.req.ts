import { IsNotEmpty, IsString } from "class-validator";

export class LoginReq {
  @IsNotEmpty()
  @IsString()
  emailId: string;

  @IsNotEmpty()
  @IsString()
  md5Password: string;
}
