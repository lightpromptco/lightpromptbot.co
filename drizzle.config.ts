import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema', // or wherever your schema file is
  out: './drizzle',       // where generated files go
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
});

