import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { RACE_TYPES } from "../../types";
import { HYROX_CATEGORIES } from "../../constants";
import type { RaceType } from "../../types";
import Footer from "../../components/Footer";
import AutocompleteInput from "../../components/AutoCompleteInput";
import {
  CITIES,
  CITY_TO_REGION,
  COUNTRIES,
  COMPETITION_OPTIONS,
} from "../../constants";

const DISTANCES_BY_TYPE: Record<RaceType, string[]> = {
  Running: ["5k", "10k", "Half-Marathon", "Marathon", "Ultra"],
  Triathlon: ["Sprint", "Olympic", "Half-Ironman", "Ironman"],
  Trail: ["Ultra"],
  Cycling: [],
  Hyrox: ["Hyrox-Single", "Hyrox-Doubles", "Hyrox-Relay"],
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

export default function ProposeRace() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const [flyerMode, setFlyerMode] = useState<"file" | "url">("file");
  const timeInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: "",
    type: "" as RaceType | "",
    distances: [] as string[],
    date: "",
    end_date: "",
    city: "",
    region: "",
    country: "Italia",
    elevation_m: "",
    venue: "",
    competition: [] as string[],
    start_times: [] as string[],
    price_eur: "",
    price_note: "",
    website: "",
    description: "",
    associations: "",
    organizer: "",
    contact_email: "",
    contact_phone: "",
    instagram: "",
    private_email: "",
    private_phone: "",
    flyer_url: "",
  });

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

const toggleItem = (key: 'distances' | 'start_times', item: string) => {
  setForm((prev) => ({
    ...prev,
    [key]: (prev[key] as string[]).includes(item)
      ? (prev[key] as string[]).filter((d) => d !== item)
      : [...(prev[key] as string[]), item],
  }))
};

  const handleCityChange = async (city: string) => {
    set("city", city);
    const regionFromMap = CITY_TO_REGION[city];
    if (regionFromMap) {
      set("region", regionFromMap);
      return;
    }
    if (city.length >= 3) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`,
        { headers: { "Accept-Language": "it" } }
      );
      const data = await res.json();
      if (data[0]?.address?.state) set("region", data[0].address.state);
      if (data[0]?.address?.country) set("country", data[0].address.country);
    }
  };

  const toggleCompetition = (opt: string) => {
    setForm((prev) => ({
      ...prev,
      competition: prev.competition.includes(opt)
        ? prev.competition.filter((c) => c !== opt)
        : [...prev.competition, opt],
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.date || !form.city || !form.region) {
      setError("Compila almeno: nome, tipo, data, città e regione.");
      return;
    }
    if (form.distances.length === 0) {
      setError("Seleziona almeno una distanza.");
      return;
    }

    setLoading(true);
    setError(null);

    // Upload flyer se presente
    let flyer_url = form.flyer_url || null;
    if (flyerFile && flyerMode === "file") {
      const ext = flyerFile.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("flyers")
        .upload(fileName, flyerFile);
      if (uploadError) {
        setError("Errore upload locandina. Riprova.");
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage
        .from("flyers")
        .getPublicUrl(uploadData.path);
      flyer_url = urlData.publicUrl;
    }

    // Valida start_times
      const timeRegex = /^\d{2}:\d{2}$/
      const invalidTimes = form.start_times.filter(t => !timeRegex.test(t))
      if (invalidTimes.length > 0) {
        setError(`Formato orario non valido: ${invalidTimes.join(', ')}. Usa HH:MM`)
      return
      }

    const { error } = await supabase.from("pending_races").insert({
      name: form.name,
      type: form.type,
      distances: form.distances,
      date: form.date,
      end_date: form.end_date || null,
      city: form.city,
      region: form.region,
      country: form.country,
      elevation_m: form.elevation_m ? parseInt(form.elevation_m) : null,
      venue: form.venue || null,
      competition: form.competition.length > 0 ? form.competition : null,
      start_times: form.start_times.length > 0 ? form.start_times : null,
      price_eur: form.price_eur ? parseFloat(form.price_eur) : null,
      price_note: form.price_note || null,
      website: form.website || null,
      description: form.description || null,
      associations: form.associations
        ? form.associations
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean)
        : null,
      organizer: form.organizer || null,
      contact_email: form.contact_email || null,
      contact_phone: form.contact_phone || null,
      instagram: form.instagram || null,
      private_email: form.private_email || null,
      private_phone: form.private_phone || null,
      flyer_url,
      status: "pending",
    });

    setLoading(false);
    if (error) {
      setError("Errore durante l'invio. Riprova più tardi.");
      console.error('Supabase error:', error.message, error.details, error.hint)
    } else {
      setSuccess(true);
    }
  };

  if (success)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <p className="text-4xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Grazie!</h2>
          <p className="text-gray-500 mb-6">
            La tua gara è stata inviata e verrà revisionata dal nostro team.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1"
          >
            ← Torna indietro
          </button>
          <h1 className="text-3xl font-bold">📝 Proponi una gara</h1>
          <p className="text-blue-100 mt-1">
            Compila il form e il nostro team la verificherà.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* ── INFO BASE ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Info base
          </h2>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nome gara *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="es. Milano City Marathon"
              className={inputClass}
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Tipo *
            </label>
            <div className="flex gap-2 flex-wrap">
              {RACE_TYPES.map((type) => (
  <button
    key={type}
    onClick={() => {
      if (type === 'Hyrox') {
        setForm((prev) => ({
          ...prev,
          type: 'Hyrox',
          distances: ['Hyrox-Single', 'Hyrox-Doubles', 'Hyrox-Relay'],
          hyrox_categories: [...HYROX_CATEGORIES],
        }))
      } else {
        setForm((prev) => ({ ...prev, type, distances: [], hyrox_categories: [] }))
      }
    }}
    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
      form.type === type
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
    }`}
  >
    {type}
  </button>
))}
            </div>
          </div>

          {/* Distanze */}
{form.type && form.type !== 'Hyrox' && (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-2 block">Distanze *</label>
    <div className="flex gap-2 flex-wrap">
      {DISTANCES_BY_TYPE[form.type as RaceType].map((dist) => (
        <button key={dist} onClick={() => toggleItem('distances', dist)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            form.distances.includes(dist)
              ? 'bg-orange-500 text-white border-orange-500'
              : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
          }`}>
          {dist}
        </button>
      ))}
    </div>
  </div>
)}

{/* Hyrox — info automatica */}
{form.type === 'Hyrox' && (
  <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm text-orange-700">
    🏋️ Le distanze per (Single, Doubles, Relay) e tutte le categorie vengono impostate automaticamente per le gare Hyrox.
  </div>
)}

          {/* Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Data *
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Data fine <span className="text-gray-400">(opzionale)</span>
              </label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => set("end_date", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Orari partenza */}
<div>
  <label className="text-sm font-medium text-gray-700 mb-2 block">Orari partenza</label>
  
  <div className="flex gap-2 items-center mb-3">
    <input
  ref={timeInputRef}
  type="time"
  className={inputClass}
  onChange={(e) => {
    const value = e.target.value
    if (value && !form.start_times.includes(value)) {
      setForm((prev) => ({ ...prev, start_times: [...prev.start_times, value] }))
      setTimeout(() => {
        if (timeInputRef.current) timeInputRef.current.value = ''
      }, 0)
    }
  }}
/>
    <span className="text-xs text-gray-400 whitespace-nowrap">Seleziona e aggiunge automaticamente</span>
  </div>

  {form.start_times.length > 0 && (
    <div className="flex gap-2 flex-wrap">
      {form.start_times.map((t) => (
        <span key={t} className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full text-sm font-medium">
          🕐 {t}
          <button
            onClick={() => setForm((prev) => ({ ...prev, start_times: prev.start_times.filter((s) => s !== t) }))}
            className="ml-1 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  )}
</div>

          {/* Paese */}
          <AutocompleteInput
            label="Paese"
            required
            value={form.country}
            onChange={(val) => {
              set("country", val);
              set("region", "");
              set("city", "");
            }}
            options={COUNTRIES}
            placeholder="es. Italia"
          />

          {/* Città */}
          <AutocompleteInput
            label="Città"
            required
            value={form.city}
            onChange={handleCityChange}
            options={form.country === "Italia" ? CITIES : []}
            placeholder="es. Milano"
          />

          {/* Regione */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Regione
            </label>
            {form.country === "Italia" ? (
              <div className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500">
                {form.region || "Calcolata automaticamente dalla città"}
              </div>
            ) : (
              <input
                type="text"
                value={form.region}
                onChange={(e) => set("region", e.target.value)}
                placeholder="es. Catalonia"
                className={inputClass}
              />
            )}
          </div>

          {/* Venue */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Venue / Luogo di partenza
            </label>
            <input
              type="text"
              value={form.venue}
              onChange={(e) => set("venue", e.target.value)}
              placeholder="es. Piazza del Duomo, Milano"
              className={inputClass}
            />
          </div>

          {/* Dislivello — nascosto per Hyrox */}
          {form.type !== "Hyrox" && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Dislivello (m){" "}
                <span className="text-gray-400">(0 se pianeggiante)</span>
              </label>
              <input
                type="number"
                value={form.elevation_m}
                onChange={(e) => set("elevation_m", e.target.value)}
                placeholder="es. 450"
                className={inputClass}
              />
            </div>
          )}

          {/* Competition */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Tipologia gara
            </label>
            <div className="flex gap-2 flex-wrap">
              {COMPETITION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggleCompetition(opt)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    form.competition.includes(opt)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── COSTI ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Costi
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Prezzo iscrizione (€)
              </label>
              <input
                type="number"
                value={form.price_eur}
                onChange={(e) => set("price_eur", e.target.value)}
                placeholder="es. 50"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Note sul prezzo
              </label>
              <input
                type="text"
                value={form.price_note}
                onChange={(e) => set("price_note", e.target.value)}
                placeholder="es. Early bird fino al 31/12"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ── INFO AGGIUNTIVE ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Info aggiuntive
          </h2>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Sito web
            </label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Descrizione
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Descrivi brevemente la gara..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Associazioni{" "}
              <span className="text-gray-400">(separate da virgola)</span>
            </label>
            <input
              type="text"
              value={form.associations}
              onChange={(e) => set("associations", e.target.value)}
              placeholder="es. FIDAL, UISP, CSI"
              className={inputClass}
            />
          </div>

          {/* Locandina */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Locandina
            </label>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setFlyerMode("file")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  flyerMode === "file"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                📎 Carica file
              </button>
              <button
                onClick={() => setFlyerMode("url")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  flyerMode === "url"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                🔗 Link esterno
              </button>
            </div>

            {flyerMode === "file" ? (
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setFlyerFile(e.target.files?.[0] ?? null)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <input
                type="url"
                value={form.flyer_url}
                onChange={(e) => set("flyer_url", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            )}
          </div>
        </div>

        {/* ── CONTATTI ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Contatti pubblici
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Organizzatore
              </label>
              <input
                type="text"
                value={form.organizer}
                onChange={(e) => set("organizer", e.target.value)}
                placeholder="es. ASD Milano Running"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Instagram
              </label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
                placeholder="@nomeaccount"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email pubblica
              </label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => set("contact_email", e.target.value)}
                placeholder="info@gara.it"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Telefono pubblico
              </label>
              <input
                type="tel"
                value={form.contact_phone}
                onChange={(e) => set("contact_phone", e.target.value)}
                placeholder="+39 02 1234567"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ── CONTATTI PRIVATI ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Contatti privati
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Visibili solo al nostro team, non pubblici
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email privata
              </label>
              <input
                type="email"
                value={form.private_email}
                onChange={(e) => set("private_email", e.target.value)}
                placeholder="tua@email.it"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Telefono privato
              </label>
              <input
                type="tel"
                value={form.private_phone}
                onChange={(e) => set("private_phone", e.target.value)}
                placeholder="+39 333 1234567"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-2xl font-semibold transition-colors"
        >
          {loading ? "⏳ Invio in corso..." : "📝 Invia proposta"}
        </button>
      </div>
      <Footer />
    </div>
  );
}
