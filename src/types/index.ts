/*
RaceType        → definisce i tipi di gara possibili
RaceDistance    → definisce le distanze possibili
Race            → usa RaceType e RaceDistance come "mattoncini"
DISTANCE_INFO   → usa RaceDistance come chiave per le info dettagliate
*/
export type RaceType = 'Running' | 'Triathlon' | 'Trail' | 'Cycling' | 'Hyrox'
export const RACE_TYPES: RaceType[] = ['Running', 'Triathlon', 'Trail', 'Cycling', 'Hyrox']
// Il formato della gara (quello che conta per la ricerca)
export type HyroxFormat = 'Single' | 'Doubles' | 'Relay'

// La categoria appartiene al PARTECIPANTE, non alla gara
// Una gara Hyrox Single ha sempre sia Open che Pro, sia Uomini che Donne

export type RaceDistance =
  | '5k'
  | '10k'
  | 'Half-Marathon'
  | 'Marathon'
  | 'Ultra'
  | 'Sprint'
  | 'Olympic'
  | 'Half-Ironman'
  | 'Ironman'
  | 'Hyrox-Single'
  | 'Hyrox-Doubles'
  | 'Hyrox-Relay'

export type Race = {
  id: string
  name: string
  type: RaceType
  distances: RaceDistance[]
  date: string
  endDate?: string    // data fine (opzionale)
  city: string
  region: string
  country: string
  venue?: string  // es. "Allianz Cloud Milano"
  elevation_m: number
  price_eur: number
  price_note?: string    // nota testuale sui prezzi
  website?: string
  description?: string
  hyrox_categories?: string[]
  // campi opzionali che hai già aggiunto
  competition?: string
  associations?: string[]
  startTimes?: string[]
  organizer?: string
  contactEmail?: string
  contactPhone?: string
  instagram?: string
  privateEmail?: string
  flyerUrl?: string
}

export const DISTANCE_INFO: Record<RaceDistance, {
  label: string
  description: string
  swim?: string
  bike?: string
  run: string
}> = {
  '5k':            { label: '5K',                        description: 'Road race',                  run: '5 km' },
  '10k':           { label: '10K',                       description: 'Road race',                  run: '10 km' },
  'Half-Marathon': { label: 'Half Marathon · 21.1 km',   description: 'Road race',                  run: '21.1 km' },
  'Marathon':      { label: 'Marathon · 42.2 km',        description: 'Road race',                  run: '42.2 km' },
  'Ultra':         { label: 'Ultra Trail · 60+ km',      description: 'Mountain trail race',        run: '60+ km' },
  'Sprint':        { label: 'Sprint Triathlon',          description: 'Short distance triathlon',   swim: '750m',   bike: '20 km',  run: '5 km' },
  'Olympic':       { label: 'Olympic Triathlon · 51 km', description: 'Olympic distance triathlon', swim: '1.5 km', bike: '40 km',  run: '10 km' },
  'Half-Ironman':  { label: 'Half Ironman 70.3',         description: 'Middle distance triathlon',  swim: '1.9 km', bike: '90 km',  run: '21.1 km' },
  'Ironman':       { label: 'Ironman · 226 km',          description: 'Full distance triathlon',    swim: '3.8 km', bike: '180 km', run: '42.2 km' },
  'Hyrox-Single':  { label: 'Hyrox Single',  description: '8x1km run + 8 workout stations', run: '8 km' },
  'Hyrox-Doubles': { label: 'Hyrox Doubles', description: '8x1km run + 8 stations', run: '8 km' },
  'Hyrox-Relay':   { label: 'Hyrox Relay',   description: 'each runs 2km + 2 stations', run: '8 km' },
}

// RUN CLUBS
export type RunClub = {
  id: string
  name: string
  city: string
  region: string
  country: string
  level?: string[]
  days?: string[]
  time?: string
  price_eur?: number
  description?: string
  website?: string
  instagram?: string
  whatsapp?: string
  strava?: string
  organizer?: string
  contactEmail?: string
  status?: string
}