import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  secret_key: process.env.SECRET_KEY,
  global_admin_role: process.env.GLOBAL_ADMIN_ROLE,
  global_admin_name: process.env.GLOBAL_ADMIN_NAME,
  global_admin_password: process.env.GLOBAL_ADMIN_PASSWORD,
  auth_secret: process.env.AUTH_SECRET,
  auth_token_lifetime: process.env.AUTH_TOKEN_LIFETIME,
  auth_salt_rounds: process.env.AUTH_SALT_ROUNDS,
}));
