import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let connection;
try {
  connection = await mysql.createConnection(process.env.DATABASE_URL!);
} catch (e) {
  console.warn("⚠️ Database connection failed. Running in reduced mode.");
}
export const db = connection ? drizzle(connection, { schema, mode: 'default' }) : null;
