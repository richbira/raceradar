import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Race } from '../types'
import { mapRace } from '../lib/mapRace' // Importiamo il tuo mapper


// Hook per fetchare tutte le gare approvate
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
        const mapped = (data ?? []).map(mapRace)
        setRaces(mapped)
      }
      setLoading(false)
    }

    fetchRaces()
  }, [])

  return { races, loading, error }
}