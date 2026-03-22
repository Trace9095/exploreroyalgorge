import { SignJWT, jwtVerify } from 'jose'

const ADMIN_EMAIL = process.env['ADMIN_EMAIL'] ?? 'CEO@epicai.ai'

function getSecret() {
  const secret = process.env['JWT_SECRET']
  if (!secret) throw new Error('JWT_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export interface Session {
  email: string
  name: string
}

export async function createSession(email: string, name: string): Promise<string> {
  return new SignJWT({ email, name })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(getSecret())
}

export async function getSession(token: string | undefined): Promise<Session | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return { email: payload['email'] as string, name: payload['name'] as string }
  } catch {
    return null
  }
}

export function isAdmin(email: string): boolean {
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}
