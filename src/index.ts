import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', () => ({ message: 'Hello Elysia + Bun + Drizzle + MySQL!' }))
  .get('/users', async () => {
    try {
      if (!db) throw new Error("Database connection is not initialized.");
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (error) {
      return { error: 'Database connection failed. Please check your .env settings.' };
    }
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
