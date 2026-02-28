import type { Database } from '../types/database'
import type { RunClub } from '../types'

type RunClubRow = Database['public']['Tables']['run_clubs']['Row']

export function mapRunClub(r: RunClubRow): RunClub {
  return {
    id: r.id,
    name: r.name,
    city: r.city,
    region: r.region,
    country: r.country,
    level: r.level ?? undefined,
    days: r.days ?? undefined,
    time: r.time ?? undefined,
    price_eur: r.price_eur ?? undefined,
    description: r.description ?? undefined,
    website: r.website ?? undefined,
    instagram: r.instagram ?? undefined,
    whatsapp: r.whatsapp ?? undefined,
    strava: r.strava ?? undefined,
    organizer: r.organizer ?? undefined,
    contactEmail: r.contact_email ?? undefined,
  }
}