import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@/env.js'
import * as schema from './schema'

export type DB = PostgresJsDatabase<typeof schema>

const globalForDrizzle = globalThis as unknown as {
  db: DB
}

export const db =
  globalForDrizzle.db ||
  drizzle(
    postgres(env.DATABASE_URL, {
      max: process.env.NODE_ENV === 'development' ? 50 : undefined,
      ssl: process.env.NODE_ENV !== 'development',
    }),
    { schema },
  )

if (env.NODE_ENV !== 'production') globalForDrizzle.db = db
