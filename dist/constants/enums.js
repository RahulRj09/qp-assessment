"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesEnum = exports.MiscCode = exports.MiscMessages = exports.EnvironmentType = void 0;
var EnvironmentType;
(function (EnvironmentType) {
    EnvironmentType["LOCAL"] = "local";
    EnvironmentType["DEVELOPMENT"] = "development";
    EnvironmentType["PRODUCTION"] = "production";
})(EnvironmentType = exports.EnvironmentType || (exports.EnvironmentType = {}));
var MiscMessages;
(function (MiscMessages) {
    MiscMessages["SUCCESS"] = "SUCCESS";
    MiscMessages["FAILED"] = "FAILED";
    MiscMessages["ADDED"] = "ADDED";
    MiscMessages["UPDATED"] = "UPDATED";
    MiscMessages["DELETED"] = "DELETED";
    MiscMessages["NOT_FOUND"] = "NOT_FOUND";
    MiscMessages["ALREADY_EXIST"] = "ALREADY_EXIST";
})(MiscMessages = exports.MiscMessages || (exports.MiscMessages = {}));
var MiscCode;
(function (MiscCode) {
    MiscCode[MiscCode["SUCCESS"] = 200] = "SUCCESS";
    MiscCode[MiscCode["CREATED"] = 201] = "CREATED";
    MiscCode[MiscCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    MiscCode[MiscCode["UNAUTHORISED"] = 401] = "UNAUTHORISED";
    MiscCode[MiscCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    MiscCode[MiscCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    MiscCode[MiscCode["ALREADY_EXIST"] = 409] = "ALREADY_EXIST";
})(MiscCode = exports.MiscCode || (exports.MiscCode = {}));
var UserRolesEnum;
(function (UserRolesEnum) {
    UserRolesEnum["ADMIN"] = "ADMIN";
    UserRolesEnum["USER"] = "USER";
})(UserRolesEnum = exports.UserRolesEnum || (exports.UserRolesEnum = {}));
//# sourceMappingURL=enums.js.map