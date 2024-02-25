import { plainToClass } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";
import { EnvironmentType } from "../constants/enums";
import { ErrorException } from "../providers/api-response";

class EnvironmentVariables {
  @IsEnum(EnvironmentType)
  NODE_ENV: EnvironmentType;

  @IsNumber()
  PORT: number;

  @IsString()
  BASE_URL: string;

  @IsString()
  APP_NAME: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  ACCESS_TOKEN_SECRET_KEY: string;
}

export function validate(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, { enableImplicitConversion: true });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  if (errors.length) {
    throw new ErrorException(errors.map((res) => res?.constraints));
  }
  return finalConfig;
}
