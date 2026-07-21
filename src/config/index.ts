import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    port : process.env.PORT || 5000,
    appUrl : process.env.APP_URL,
    databaseUrl : process.env.DATABASE_URL,
    bcryptSaltRounds : process.env.BCRYPT_SALT_ROUNDS,
    jwtAccessSecret : process.env.JWT_ACCESS_SECRET!,
    jwtRefreshSecret : process.env.JWT_REFRESH_SECRET!,
    jwtAccessExpiration : process.env.JWT_ACCESS_EXPIRATION!,
    jwtRefreshExpiration : process.env.JWT_REFRESH_EXPIRATION!,
}