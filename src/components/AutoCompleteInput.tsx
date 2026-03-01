import { useState, useRef, useEffect } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  label?: string
  required?: boolean
}


export default function AutocompleteInput({
  value,
  onChange,
  options,
  placeholder,
  label,
  required,
}: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions = options.filter((opt) =>
    opt.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  )

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
    <div ref={containerRef} className="relative">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => {
  const normalized = normalize(e.target.value)
  onChange(normalized)
  setShowSuggestions(true)
}}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
          {suggestions.map((opt) => (
            <li
              key={opt}
              onClick={() => { onChange(opt); setShowSuggestions(false) }}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  // Funzione che capitalizza correttamente
function normalize(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
}