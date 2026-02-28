import { useState, useRef, useEffect, useMemo } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  onSelect: () => void
  cities: string[]  // ← prop esterna invece di importare races
}

export default function SearchAutocomplete({ value, onChange, onSelect, cities }: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    if (value.length < 2) return []
    return cities.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    )
  }, [value, cities])

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
    <div ref={containerRef} className="relative w-full h-full">
      <div className="flex flex-col justify-center h-full">
        <p className="text-xs font-bold text-gray-800 mb-1">Dove</p>
        <input
          type="text"
          placeholder="Cerca città o regione..."
          value={value}
          onChange={(e) => { onChange(e.target.value); setShowSuggestions(true) }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full focus:outline-none text-sm text-gray-500 bg-transparent placeholder-gray-400"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-6 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          {suggestions.map((city, index) => (
            <li
              key={city}
              onClick={() => { onChange(city); setShowSuggestions(false); onSelect() }}
              className="suggestion-enter px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-blue-400">📍</span>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{city}</p>
                <p className="text-xs text-gray-400">Italia</p>
              </div>
              <span className="text-gray-400 font-bold text-sm">→</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}