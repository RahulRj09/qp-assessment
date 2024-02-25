"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckedException = void 0;
const common_1 = require("@nestjs/common");
class CheckedException extends common_1.HttpException {
    constructor(ctxId, errMsg, error, statusCode = undefined) {
        super({
            code: statusCode ? statusCode : common_1.HttpStatus.BAD_REQUEST,
            errMsg,
            dispMsg: "",
            respId: ctxId,
            error: error ? error : {},
        }, common_1.HttpStatus.BAD_REQUEST | statusCode);
    }
}
exports.CheckedException = CheckedException;
//# sourceMappingURL=checked.exception.js.map