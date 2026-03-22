import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// ─── Users (admin only) ───────────────────────────────────────────────────

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  isAdmin: boolean('is_admin').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Listing Requests ─────────────────────────────────────────────────────

export const listingRequests = pgTable('listing_requests', {
  id: serial('id').primaryKey(),
  businessName: text('business_name').notNull(),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  businessWebsite: text('business_website'),
  message: text('message'),
  tier: text('tier').notNull().default('premium'), // premium | sponsored
  status: text('status').notNull().default('pending'), // pending | approved | rejected
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Claim Submissions (for Stripe-backed claims) ─────────────────────────

export const claimSubmissions = pgTable('claim_submissions', {
  id: serial('id').primaryKey(),
  businessSlug: text('business_slug').notNull(),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  tier: text('tier').notNull(), // premium | sponsored
  stripeSessionId: text('stripe_session_id'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  subscriptionStatus: text('subscription_status'), // active | past_due | cancelled | trialing
  currentPeriodEnd: timestamp('current_period_end'),
  status: text('status').notNull().default('pending'), // pending | paid | cancelled
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
