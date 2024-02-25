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
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../../common/services/log.service");
const api_response_1 = require("../api-response");
let HttpErrorFilter = class HttpErrorFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const errCode = exception.getStatus ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const logId = request.id;
        let finalErrMsg = "";
        const { message } = exception;
        try {
            const errResp = exception.getResponse();
            const errMsg = errResp["message"];
            finalErrMsg = `${message} : ${errMsg[0]}`;
        }
        catch (e) {
            finalErrMsg = `${message}`;
        }
        this.logService.error(logId, `exception=${JSON.stringify(exception)}`);
        const apiResp = new api_response_1.ApiResponse(null, logId, "", errCode, finalErrMsg);
        response.status(errCode).json(apiResp);
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], HttpErrorFilter.prototype, "logService", void 0);
HttpErrorFilter = __decorate([
    (0, common_1.Catch)()
], HttpErrorFilter);
exports.HttpErrorFilter = HttpErrorFilter;
//# sourceMappingURL=exceptions.filter.js.map