import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from '../schemas' 

config({ path: ".env.local" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql, logger:true, schema });