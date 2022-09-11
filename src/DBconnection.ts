import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

const Client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: process.env.ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
});

export default Client;
