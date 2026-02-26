/*
RaceType        → definisce i tipi di gara possibili
RaceDistance    → definisce le distanze possibili
Race            → usa RaceType e RaceDistance come "mattoncini"
DISTANCE_INFO   → usa RaceDistance come chiave per le info dettagliate
*/
export type RaceType = 'Running' | 'Triathlon' | 'Trail' | 'Cycling' 

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

export type Race = {
  id: string
  name: string
  type: RaceType
  distance: RaceDistance
  date: string
  city: string
  region: string
  country: string
  elevation_m: number
  price_eur: number
  website: string
  description: string
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
}