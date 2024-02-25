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
exports.ErrorException = exports.ApiResponseArr = exports.ApiResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../constants/enums");
class ApiResponse {
    constructor(data, ctxId, dispMsg, code, errMsg) {
        this.code = code && !isNaN(code) ? code : 200;
        this.errMsg = null;
        this.dispMsg = dispMsg ? dispMsg : "";
        this.respId = ctxId ? ctxId : Math.random().toString(36).replace("0.", "");
        this.data = null;
        if (data && data !== null && data !== undefined) {
            this.data = data;
        }
        else if (errMsg) {
            this.errMsg = errMsg;
            this.data = null;
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "unique response ID of API call",
    }),
    __metadata("design:type", String)
], ApiResponse.prototype, "respId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "header code",
    }),
    __metadata("design:type", Number)
], ApiResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "err message",
    }),
    __metadata("design:type", Object)
], ApiResponse.prototype, "errMsg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "misc message",
    }),
    __metadata("design:type", String)
], ApiResponse.prototype, "dispMsg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "object",
    }),
    __metadata("design:type", Object)
], ApiResponse.prototype, "data", void 0);
exports.ApiResponse = ApiResponse;
class ApiResponseArr {
    constructor(data, totalCount, ctxId, dispMsg, code, errMsg) {
        this.code = code && !isNaN(code) ? code : 200;
        this.errMsg = null;
        this.dispMsg = dispMsg ? dispMsg : "";
        this.respId = ctxId ? ctxId : Math.random().toString(36).replace("0.", "");
        this.data = null;
        this.totalCount = totalCount;
        if (data && data !== null && data !== undefined) {
            this.data = data;
        }
        else if (errMsg) {
            this.errMsg = errMsg;
            this.data = null;
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "unique response ID of API call",
    }),
    __metadata("design:type", String)
], ApiResponseArr.prototype, "respId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "header code",
    }),
    __metadata("design:type", Number)
], ApiResponseArr.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "err message",
    }),
    __metadata("design:type", Object)
], ApiResponseArr.prototype, "errMsg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "misc message",
    }),
    __metadata("design:type", String)
], ApiResponseArr.prototype, "dispMsg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "object",
    }),
    __metadata("design:type", Array)
], ApiResponseArr.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ApiResponseArr.prototype, "totalCount", void 0);
exports.ApiResponseArr = ApiResponseArr;
class ErrorException {
    constructor(error, code) {
        this.error = error;
        this.code = code ? code : enums_1.MiscCode.BAD_REQUEST;
    }
}
exports.ErrorException = ErrorException;
//# sourceMappingURL=api-response.js.map