import { createPool } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { migrate } from 'drizzle-orm/vercel-postgres/migrator'

import 'dotenv/config'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

const sql = createPool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(sql)

console.log('Running migrations...')

const start = Date.now()
await migrate(db, { migrationsFolder: 'migrations' })
const end = Date.now()

console.log(`✅ Migrations completed in ${end - start}ms`)
