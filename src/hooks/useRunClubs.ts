import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { mapRunClub } from '../lib/mapRunClub'
import type { RunClub } from '../types'

export function useRunClubs() {
  const [runClubs, setRunClubs] = useState<RunClub[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('run_clubs')
      .select('*')
      .eq('status', 'approved')
      .order('city', { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setRunClubs((data ?? []).map(mapRunClub))
        setLoading(false)
      })
  }, [])

  return { runClubs, loading, error }
}