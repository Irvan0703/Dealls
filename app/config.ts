import dotenv from 'dotenv';
import path from 'path';


dotenv.config();


interface Config {
  rootPath: string;
  secret_key: string | undefined;
  serviceName: string | undefined;
  dbHost: string | undefined;
  dbPort: string | undefined;
  dbUser: string | undefined;
  dbPass: string | undefined;
  dbName: string | undefined;
}


const config: Config = {
  rootPath: path.resolve(__dirname, '..'),
  secret_key: process.env.JWT_SECRET,
  serviceName: process.env.SERVICE_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
};

export default config;
