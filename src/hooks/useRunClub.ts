import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { mapRunClub } from '../lib/mapRunClub'
import type { RunClub } from '../types'

export function useRunClub(id: string | undefined) {
  const [runClub, setRunClub] = useState<RunClub | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    supabase
      .from('run_clubs')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setRunClub(mapRunClub(data))
        setLoading(false)
      })
  }, [id])

  return { runClub, loading, error }
}