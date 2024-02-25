import { Inject, Injectable } from "@nestjs/common";
import { createHash } from "crypto";
import * as jwt from "jsonwebtoken";
import { ReqDecoded } from "../dto/ReqDecoded";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CommonService {
  @Inject()
  private configService: ConfigService;

  getHash(str: string): string {
    const hash = createHash("md5").update(str, "utf8").digest("hex");
    return hash;
  }

  getAccessTokenNew(dataToEncode: ReqDecoded): string {
    const validityOfTokenInSeconds = 60 * 60; //60 mins in seconds
    return this.getJwtTokenNew(dataToEncode, validityOfTokenInSeconds, this.configService.get("accessToKenSecretKey"));
  }

  private getJwtTokenNew(tokenData: ReqDecoded, validityOfTokenInSeconds: number, secretKey: string): string {
    const payLoad = tokenData;
    const options = {
      expiresIn: validityOfTokenInSeconds,
      issuer: this.configService.get("appName"),
    };

    return jwt.sign(payLoad, secretKey, options);
  }
}
