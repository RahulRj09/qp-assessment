"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    appName: process.env.APP_NAME,
    accessToKenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
});
//# sourceMappingURL=env.variables.js.map