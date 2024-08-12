import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

config({ path: '.env.local' });

// Do not call `connect` on the client
const connectionString = process.env.DATABASE_URL!;

// For migrations and queries during development
export const migrationClient = postgres(connectionString, { max: 1 });

// For query purposes
const queryClient = postgres(connectionString, { max: 10 });
export const db = drizzle(queryClient, { schema });