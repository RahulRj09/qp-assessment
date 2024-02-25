"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCtxProvider = exports.RequestCtx = exports.CtxId = void 0;
const common_1 = require("@nestjs/common");
const date_service_1 = require("../services/date.service");
exports.CtxId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.id;
});
class RequestCtx {
}
exports.RequestCtx = RequestCtx;
exports.RequestCtxProvider = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const contextId = request.headers["x-request-id"];
    const generatedLogId = `${Math.random().toString(36).replace("0.", "")}${Math.random()
        .toString(36)
        .replace("0.", "")}`;
    const logId = contextId ? contextId : generatedLogId;
    const { url } = request;
    const ctxReturn = {
        endPoint: url,
        logId,
        requestReceivedTimeStamp: new date_service_1.DateService().getCurrentDateString(),
    };
    return ctxReturn;
});
//# sourceMappingURL=requestContext.decorator.js.map