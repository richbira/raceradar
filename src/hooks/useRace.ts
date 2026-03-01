import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Race } from '../types'
import { mapRace } from '../lib/mapRace'

// Hook per fetchare una singola gara per ID
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
        // Visto che data è un singolo oggetto, lo passiamo direttamente a mapRace
        setRace(mapRace(data))
      }
      setLoading(false)
    }

    fetchRace()
  }, [id])

  return { race, loading, error }
}