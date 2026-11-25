import dotenv from 'dotenv';

dotenv.config();

const {
  PORT = '3000',
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
  UPLOAD_PATH = 'images',
  UPLOAD_PATH_TEMP = 'temp',
  ORIGIN_ALLOW = 'http://localhost:5173',
  JWT_SECRET = 'super-secret-key',
  AUTH_REFRESH_TOKEN_EXPIRY = '7d',
  AUTH_ACCESS_TOKEN_EXPIRY = '1m',
} = process.env;

export {
  PORT,
  DB_ADDRESS,
  UPLOAD_PATH,
  UPLOAD_PATH_TEMP,
  ORIGIN_ALLOW,
  JWT_SECRET,
  AUTH_REFRESH_TOKEN_EXPIRY,
  AUTH_ACCESS_TOKEN_EXPIRY,
};
