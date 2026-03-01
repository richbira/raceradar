import type { Database } from '../types/database'
import type { Race } from '../types'

type RaceRow = Database['public']['Tables']['races']['Row']

{
    /*
    SUPABASE (PostgreSQL)          TYPESCRIPT (React)
    ─────────────────────          ──────────────────
    usa snake_case          ≠      usa camelCase
    end_date                →      endDate
    start_times             →      startTimes
    contact_email           →      contactEmail
    flyer_url               →      flyerUrl
    null (campo vuoto)      →      undefined 
    */
}
export function mapRace(r: RaceRow): Race {
  return {
    id: r.id,
    name: r.name,
    type: r.type as Race['type'],
    distances: r.distances as Race['distances'],
    date: r.date,
    endDate: r.end_date ?? undefined,
    city: r.city,
    region: r.region,
    country: r.country,
    elevation_m: r.elevation_m ?? undefined,
    price_eur: r.price_eur ?? undefined,
    price_note: r.price_note ?? undefined,
    website: r.website ?? undefined,
    description: r.description ?? undefined,
    venue: r.venue ?? undefined,
    competition: r.competition ?? undefined,
    associations: r.associations ?? undefined,
    startTimes: r.start_times ?? undefined,
    organizer: r.organizer ?? undefined,
    contactEmail: r.contact_email ?? undefined,
    contactPhone: r.contact_phone ?? undefined,
    instagram: r.instagram ?? undefined,
    privateEmail: r.private_email ?? undefined,
    privatePhone: r.private_phone ?? undefined,
    flyerUrl: r.flyer_url ?? undefined,
  }
}