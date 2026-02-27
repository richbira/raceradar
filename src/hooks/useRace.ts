import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Race } from '../types'

export function useRace(id: string | undefined) {
  const [race, setRace] = useState<Race | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchRace() {
      const { data, error } = await supabase
        .from('races')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setRace({
          id: data.id,
          name: data.name,
          type: data.type,
          distances: data.distances,
          date: data.date,
          endDate: data.end_date,
          city: data.city,
          region: data.region,
          country: data.country,
          elevation_m: data.elevation_m,
          price_eur: data.price_eur,
          price_note: data.price_note,
          website: data.website,
          description: data.description,
          venue: data.venue,
          competition: data.competition,
          associations: data.associations,
          startTimes: data.start_times,
          organizer: data.organizer,
          contactEmail: data.contact_email,
          contactPhone: data.contact_phone,
          instagram: data.instagram,
          privateEmail: data.private_email,
          flyerUrl: data.flyer_url,
          hyrox_categories: data.hyrox_categories,
        })
      }
      setLoading(false)
    }

    fetchRace()
  }, [id])

  return { race, loading, error }
}