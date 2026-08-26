import yenv from 'yenv';
const env = yenv('../env_fp.yaml', { env: process.env.NODE_ENV || 'production' });

export const LOCAL_URI = env.LOCAL_URI;
export const HOSTING_URI = env.HOSTING_URI;
export const SITE_NAME = env.SITE_NAME;
export const JWT_KEY = env.JWT_KEY;
export const TYPE_ENV = env.NODE_ENV;
export const API_PATH = env.API_PATH;
export const PORT_SERVICE_API = env.PORT_SERVICE_API;

export const SERVICE_HOST = env.SERVICE_HOST;
export const SERVICE_USER = env.SERVICE_USER;
export const SERVICE_PASS = env.SERVICE_PASS;

export const USER_NAME = env.USER_NAME;
export const USER_PASS = env.USER_PASS;
export const DB_NAME = env.DB_NAME;

export const DB_URI = `mongodb+srv://${USER_NAME}:${USER_PASS}@cluster0-gtmtp.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
