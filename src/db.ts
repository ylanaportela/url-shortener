import { Pool } from 'pg';
import dotenv from "dotenv"

dotenv.config();

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE
}

export const database = new Pool(config);