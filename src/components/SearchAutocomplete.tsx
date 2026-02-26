import { useState, useRef, useEffect, useMemo } from 'react'
import { races } from '../data/races'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SearchAutocomplete({ value, onChange }: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const allCities = useMemo(
    () => [...new Set(races.map((r) => r.city))],
    []
  )

  const suggestions = useMemo(() => {
    if (value.length < 2) return []
    return allCities.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    )
  }, [value, allCities])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        placeholder="Cerca per città, regione o nome gara..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => setShowSuggestions(true)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 overflow-hidden">
          {suggestions.map((city) => (
            <li
              key={city}
              onClick={() => {
                onChange(city)
                setShowSuggestions(false)
              }}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 flex items-center gap-2"
            >
              📍 {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}