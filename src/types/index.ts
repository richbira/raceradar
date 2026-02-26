/*
RaceType        → definisce i tipi di gara possibili
RaceDistance    → definisce le distanze possibili
Race            → usa RaceType e RaceDistance come "mattoncini"
DISTANCE_INFO   → usa RaceDistance come chiave per le info dettagliate
*/
export type RaceType = 'running' | 'triathlon' | 'trail' | 'cycling' 

export type RaceDistance =
  | '5k'
  | '10k'
  | 'half-marathon'
  | 'marathon'
  | 'ultra'
  | 'sprint'
  | 'olympic'
  | 'half-ironman'
  | 'ironman'

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
'5k':            { label: '5 Km',           description: 'Road race',                  run: '5 km' },
'10k':           { label: '10 Km',          description: 'Road race',                  run: '10 km' },
'half-marathon': { label: 'Half Marathon',  description: 'Road race',                  run: '21.1 km' },
'marathon':      { label: 'Marathon',       description: 'Road race',                  run: '42.2 km' },
'ultra':         { label: 'Ultra Trail',    description: 'Mountain trail race',        run: '60+ km' },
'sprint':        { label: 'Sprint',         description: 'Short distance triathlon',   swim: '750m',   bike: '20 km',  run: '5 km' },
'olympic':       { label: 'Olympic',        description: 'Olympic distance triathlon', swim: '1.5 km', bike: '40 km',  run: '10 km' },
'half-ironman':  { label: 'Half Ironman',   description: 'Triathlon 70.3',            swim: '1.9 km', bike: '90 km',  run: '21.1 km' },
'ironman':       { label: 'Ironman',        description: 'Full distance triathlon',    swim: '3.8 km', bike: '180 km', run: '42.2 km' },
}