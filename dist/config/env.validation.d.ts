import { EnvironmentType } from "../constants/enums";
declare class EnvironmentVariables {
    NODE_ENV: EnvironmentType;
    PORT: number;
    BASE_URL: string;
    APP_NAME: string;
    DATABASE_URL: string;
    ACCESS_TOKEN_SECRET_KEY: string;
}
export declare function validate(configuration: Record<string, unknown>): EnvironmentVariables;
export {};
