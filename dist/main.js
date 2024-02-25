"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const morgan = require("morgan");
const app_module_1 = require("./app.module");
const log_service_1 = require("./common/services/log.service");
const configService = new config_1.ConfigService();
const nodeEnv = configService.get("NODE_ENV");
console.log("NODE_ENV ----->", nodeEnv);
console.log("DATABASE_URL ----->", configService.get("DATABASE_URL"));
async function bootstrap() {
    try {
        const port = process.env.PORT;
        const apiPrefix = "/api/v1/grocery";
        const app2 = await core_1.NestFactory.create(app_module_1.AppModule);
        app2.useLogger(new log_service_1.LogService());
        app2.setGlobalPrefix(apiPrefix);
        app2.useGlobalPipes(new common_1.ValidationPipe());
        app2.use(morgan(":method :url :status :response-time ms"));
        const configService = app2.get(config_1.ConfigService);
        const app1 = await core_1.NestFactory.createMicroservice(app_module_1.AppModule);
        app1.useLogger(new log_service_1.LogService());
        const dbStr = configService.get("DATABASE_URL");
        app2.enableCors({ credentials: true, origin: "*" });
        await app2.listen(port);
        console.log(`grocery-service listening on port [${port}] , dbStr=[${dbStr}]`);
    }
    catch (e) {
        console.log(`error in starting grocery-service`);
        console.log(`[${JSON.stringify(e)}]`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map