import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { users } from '../src/db/schema'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL is not set in .env.local')

  const db = drizzle(neon(databaseUrl))

  const passwordHash = await bcrypt.hash('Trace87223!', 12)

  await db
    .insert(users)
    .values({
      email: 'CEO@epicai.ai',
      name: 'Trace Hildebrand',
      passwordHash,
      isAdmin: true,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: { passwordHash, isAdmin: true, name: 'Trace Hildebrand' },
    })

  console.log('✓ Admin user seeded: CEO@epicai.ai')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
