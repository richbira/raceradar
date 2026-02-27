import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Race } from '../types'

export function useRaces() {
  const [races, setRaces] = useState<Race[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRaces() {
      const { data, error } = await supabase
        .from('races')
        .select('*')
        .eq('status', 'approved')
        .order('date', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        // Supabase usa snake_case, convertiamo in camelCase
        const mapped: Race[] = (data ?? []).map((r) => ({
          id: r.id,
          name: r.name,
          type: r.type,
          distances: r.distances,
          date: r.date,
          endDate: r.end_date,
          city: r.city,
          region: r.region,
          country: r.country,
          elevation_m: r.elevation_m,
          price_eur: r.price_eur,
          price_note: r.price_note,
          website: r.website,
          description: r.description,
          venue: r.venue,
          competition: r.competition,
          associations: r.associations,
          startTimes: r.start_times,
          organizer: r.organizer,
          contactEmail: r.contact_email,
          contactPhone: r.contact_phone,
          instagram: r.instagram,
          privateEmail: r.private_email,
          flyerUrl: r.flyer_url,
          hyrox_categories: r.hyrox_categories,
        }))
        setRaces(mapped)
      }
      setLoading(false)
    }

    fetchRaces()
  }, [])

  return { races, loading, error }
}