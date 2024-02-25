"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, printf } = winston_1.format;
const winston_console_transport_1 = require("winston-console-transport");
const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [grocery-app] [${level}] [${message}]`;
});
let LogService = class LogService {
    constructor() {
        this.appName = `grocery-app`;
        this.logger = nest_winston_1.WinstonModule.createLogger({
            transports: [
                new DailyRotateFile({
                    handleExceptions: true,
                    filename: `logs/${this.appName}-%DATE%.log`,
                    datePattern: "YYYY-MM-DD",
                    zippedArchive: true,
                    maxSize: "100m",
                    JSON: true,
                }),
                new winston_console_transport_1.default(),
            ],
            format: combine(timestamp(), myFormat),
        });
    }
    getLogData(ctx, msg) {
        const log = {
            service: this.appName,
            id: ctx,
            data: msg,
        };
        return JSON.stringify(log);
    }
    info(ctx, msg) {
        const data = this.getLogData(ctx, msg);
        this.logger.log(data);
    }
    err(ctx, msg) {
        const data = this.getLogData(ctx, msg);
        this.logger.error(data);
    }
    wrn(ctx, msg) {
        const data = this.getLogData(ctx, msg);
        this.logger.warn(data);
    }
    printObject(ctx, msg, inputObj) {
        this.info(ctx, `in printObject...`);
        if (!inputObj) {
            this.info(ctx, `obj was undefined `);
            return;
        }
        try {
            let objString = "";
            const keys = Object.keys(inputObj);
            for (const k of keys) {
                objString += `${k}=[${inputObj[k]}]  <#> `;
            }
            this.info(ctx, `${msg} => ${objString}`);
        }
        catch (e) {
            const { message, error } = e;
            this.info(ctx, `error in printObject => message=[${message}] , error=[${error}]`);
        }
    }
    log(message, ...optionalParams) {
        this.info(message, optionalParams[0] || "n/a");
    }
    error(message, ...optionalParams) {
        this.err(message, optionalParams[0] || "n/a");
    }
    warn(message, ...optionalParams) {
        this.wrn(message, optionalParams[0] || "n/a");
    }
};
LogService = __decorate([
    (0, common_1.Injectable)()
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map