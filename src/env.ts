import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), `.env${process.env.NODE_ENV === '.test' ? '.test' : ''}`),
});

export default {
  port: parseInt(process.env.PORT as string),
  database: process.env.DATABASE_URL as string,
};
