import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from '@/db/schema'

let _db: NeonHttpDatabase<typeof schema> | null = null

export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    const DATABASE_URL = process.env['DATABASE_URL']
    if (!DATABASE_URL) throw new Error('DATABASE_URL is not set')
    _db = drizzle(neon(DATABASE_URL), { schema })
  }
  return _db
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export { schema }
