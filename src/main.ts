import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import * as morgan from "morgan";
import { AppModule } from "./app.module";
import { LogService } from "./common/services/log.service";

const configService = new ConfigService();
const nodeEnv = configService.get("NODE_ENV");

console.log("NODE_ENV ----->", nodeEnv);
console.log("DATABASE_URL ----->", configService.get("DATABASE_URL"));

async function bootstrap() {
  try {
    const port = process.env.PORT;
    const apiPrefix = "/api/v1/grocery";

    const app2 = await NestFactory.create(AppModule);
    app2.useLogger(new LogService());
    app2.setGlobalPrefix(apiPrefix);
    app2.useGlobalPipes(new ValidationPipe());
    app2.use(morgan(":method :url :status :response-time ms"));

    const configService = app2.get(ConfigService);

    //for consumption
    const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);

    app1.useLogger(new LogService());

    const dbStr = configService.get<string>("DATABASE_URL");
    app2.enableCors({ credentials: true, origin: "*" });
    await app2.listen(port);
    // await app1.listen();
    console.log(`grocery-service listening on port [${port}] , dbStr=[${dbStr}]`);
  } catch (e) {
    console.log(`error in starting grocery-service`);
    console.log(`[${JSON.stringify(e)}]`);
  }
}
bootstrap();
