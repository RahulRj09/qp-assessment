"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let CommonService = class CommonService {
    getHash(str) {
        const hash = (0, crypto_1.createHash)("md5").update(str, "utf8").digest("hex");
        return hash;
    }
    getAccessTokenNew(dataToEncode) {
        const validityOfTokenInSeconds = 60 * 60;
        return this.getJwtTokenNew(dataToEncode, validityOfTokenInSeconds, this.configService.get("accessToKenSecretKey"));
    }
    getJwtTokenNew(tokenData, validityOfTokenInSeconds, secretKey) {
        const payLoad = tokenData;
        const options = {
            expiresIn: validityOfTokenInSeconds,
            issuer: this.configService.get("appName"),
        };
        return jwt.sign(payLoad, secretKey, options);
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", config_1.ConfigService)
], CommonService.prototype, "configService", void 0);
CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map