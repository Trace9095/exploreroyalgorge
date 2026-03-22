// Shared types for Explore Royal Gorge monorepo

export type BusinessTier = 'free' | 'premium' | 'sponsored'

export type BusinessCategory =
  | 'rafting'
  | 'zipline'
  | 'hiking'
  | 'rock-climbing'
  | 'helicopter'
  | 'scenic'
  | 'camping'
  | 'dining'
  | 'vacation-rentals'
  | 'railroad'

export interface Business {
  slug: string
  name: string
  tagline: string
  description: string
  category: BusinessCategory
  address?: string
  city: string
  state: string
  zip?: string
  phone?: string
  website?: string
  tier: BusinessTier
  claimed: boolean
  featured: boolean
  ownedByTrace: boolean
  highlights: string[]
  amenities?: string[]
  hours?: Record<string, string>
  imageUrl?: string
  latitude?: number
  longitude?: number
}

export type BlogBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: BlogBlock[]
  publishedAt: string
  readingTime: number
  tags: string[]
  category: string
}

export interface ListingRequest {
  id: number
  businessName: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  businessWebsite?: string
  message?: string
  tier: BusinessTier
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  rafting: 'Whitewater Rafting',
  zipline: 'Zipline Tours',
  hiking: 'Hiking & Trails',
  'rock-climbing': 'Rock Climbing',
  helicopter: 'Helicopter Tours',
  scenic: 'Scenic Attractions',
  camping: 'Camping & Glamping',
  dining: 'Dining & Bars',
  'vacation-rentals': 'Vacation Rentals',
  railroad: 'Scenic Railroad',
}

export const TIER_LABELS: Record<BusinessTier, string> = {
  free: 'Free',
  premium: 'Premium',
  sponsored: 'Sponsored',
}
