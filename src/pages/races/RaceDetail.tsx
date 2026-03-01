import { useParams, useNavigate } from "react-router-dom";
import { useRace } from "../../hooks/useRace";
import { DISTANCE_INFO } from "../../types";
import Footer from "../../components/Footer";
import SkeletonCard from "../../components/SkeletonCard";
import { HYROX_CATEGORIES } from "../../constants";

export default function RaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { race, loading, error } = useRace(id);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-2xl mx-auto px-4 py-6">
          <SkeletonCard />
        </div>
        <Footer />
      </div>
    );

  if (error || !race)
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Gara non trovata.</p>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* HERO */}
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1"
          >
            ← Torna indietro
          </button>
          <span className="text-xs uppercase tracking-wide text-blue-200">
            {race.type}
          </span>
          <h1 className="text-3xl font-bold mt-1">{race.name}</h1>
          <p className="text-blue-100 mt-1">
            📍 {race.city}, {race.region}, {race.country}
          </p>
          <div className="flex gap-2 flex-wrap mt-3">
            {race.distances.map((dist) => (
              <span
                key={dist}
                className="bg-white/20 text-white text-xs px-3 py-1 rounded-full"
              >
                {DISTANCE_INFO[dist].label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Info principali */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-2 gap-6">
          {/* Data */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Data
            </p>
            <p className="text-xl font-bold text-gray-800">
              {race.endDate
                ? `📅 ${new Date(race.date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                  })} - ${new Date(race.endDate).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}`
                : `📅 ${new Date(race.date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}`}
            </p>
          </div>

          {/* Orari partenza */}
          {race.startTimes && race.startTimes.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Orari partenza
              </p>
              <p className="text-xl font-bold text-gray-800">
                🕐 {race.startTimes.join(" · ")}
              </p>
            </div>
          )}

{/* Prezzo */}
<div>
  <p className="text-xs text-gray-400 uppercase tracking-wide">Costo iscrizione</p>
  <p className="text-xl font-bold text-gray-800">
    {race.price_eur === undefined || race.price_eur === null
      ? '💶 Non censito'
      : `💶 ${race.price_eur}€`}
  </p>
</div>

          {/* Note prezzo */}
          {race.price_note && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Note sul costo
              </p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {race.price_note}
              </p>
            </div>
          )}

{/* Dislivello */}
{race.type !== 'Hyrox' && (
  <div>
    <p className="text-xs text-gray-400 uppercase tracking-wide">Dislivello</p>
    <p className="text-xl font-bold text-gray-800">
      {race.elevation_m === undefined || race.elevation_m === null
        ? '⛰️ Non censito'
        : race.elevation_m === 0
          ? '⛰️ Pianeggiante'
          : `⛰️ ${race.elevation_m}m`}
    </p>
  </div>
)}

          {/* Venue */}
          {race.venue && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Venue
              </p>
              <p className="text-xl font-bold text-gray-800">🏟️ {race.venue}</p>
            </div>
          )}

          {/* Competition */}
          {race.competition && race.competition.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Tipologia
              </p>
              <div className="flex gap-2 flex-wrap mt-1">
                {race.competition.map((c) => (
                  <span
                    key={c}
                    className="text-sm bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full font-medium"
                  >
                    {c === "Competitiva"
                      ? "🏆 Competitiva"
                      : "🤝 Non competitiva"}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Organizzatore */}
          {race.organizer && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Organizzatore
              </p>
              <p className="text-xl font-bold text-gray-800">
                🧑‍💼 {race.organizer}
              </p>
            </div>
          )}
        </div>

        {/* Associazioni */}
        {race.associations && race.associations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Associazioni
            </h2>
            <div className="flex flex-wrap gap-2">
              {race.associations.map((assoc) => (
                <span
                  key={assoc}
                  className="text-sm bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full font-medium"
                >
                  {assoc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Percorsi */}
        {race.distances.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
              Percorsi
            </h2>
            <div className="flex flex-row flex-wrap gap-4 items-start justify-center">
              {race.distances.map((dist) => {
                const info = DISTANCE_INFO[dist];
                const athleteIcons: Record<string, string> = {
                  "Hyrox-Single": "🏃",
                  "Hyrox-Doubles": "🏃🏃",
                  "Hyrox-Relay": "🏃🏃🏃🏃",
                };
                const isHyrox = dist.startsWith("Hyrox");

                return (
                  <div key={dist} className="flex-1 min-w-0 text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {info.label}
                    </h3>
                    {isHyrox ? (
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-2xl tracking-widest">
                          {athleteIcons[dist]}
                        </p>
                        <p className="text-xs font-bold text-gray-800">
                          {info.run} corsa totale
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {info.description}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-center items-center flex-wrap">
                        {info.swim && (
                          <div className="text-center">
                            <p className="text-xl">🏊</p>
                            <p className="text-xs font-bold text-gray-800">
                              {info.swim}
                            </p>
                          </div>
                        )}
                        {info.bike && (
                          <div className="text-center">
                            <p className="text-xl">🚴</p>
                            <p className="text-xs font-bold text-gray-800">
                              {info.bike}
                            </p>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-xl">🏃</p>
                          <p className="text-xs font-bold text-gray-800">
                            {info.run}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Categorie Hyrox */}
        {race.type === 'Hyrox' && (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
      💪 Categorie disponibili
    </h2>
    <div className="flex flex-wrap gap-2">
      {HYROX_CATEGORIES.map((cat) => (
        <span
          key={cat}
          className="text-sm bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full font-medium"
        >
          {cat}
        </span>
      ))}
    </div>
  </div>
)}

        {/* Descrizione */}
        {race.description && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Descrizione
            </h2>
            <p className="text-gray-700 leading-relaxed">{race.description}</p>
          </div>
        )}

        {/* Flyer */}
        {race.flyerUrl && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Locandina
            </h2>

            <a
              href={race.flyerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span className="text-2xl">📄</span>
              <div>
                <p className="font-medium text-sm">Scarica la locandina</p>
                <p className="text-xs text-gray-400">PDF o immagine</p>
              </div>
            </a>
          </div>
        )}

        {/* Contatti e Social */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Contatti e Social
          </h2>
          <div className="flex flex-col gap-3">
            {race.website && (
              <a
                href={race.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="text-xl">🌐</span>
                <div>
                  <p className="font-medium text-sm">Sito web</p>
                  <p className="text-xs text-gray-400">{race.website}</p>
                </div>
              </a>
            )}

            {race.instagram && (
              <a
                href={
                  race.instagram.startsWith("http")
                    ? race.instagram
                    : `https://instagram.com/${race.instagram.replace("@", "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors"
              >
                <span className="text-xl">📸</span>
                <div>
                  <p className="font-medium text-sm">Instagram</p>
                  <p className="text-xs text-gray-400">{race.instagram}</p>
                </div>
              </a>
            )}

            {race.contactEmail && (
              <a
                href={`mailto:${race.contactEmail}`}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="text-xl">📧</span>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-xs text-gray-400">{race.contactEmail}</p>
                </div>
              </a>
            )}

            {race.contactPhone && (
              <a
                href={`tel:${race.contactPhone}`}
                className="flex items-center gap-3 text-gray-700 hover:text-green-500 transition-colors"
              >
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-medium text-sm">Telefono</p>
                  <p className="text-xs text-gray-400">{race.contactPhone}</p>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* CTA */}
        {race.website && (
          <a
            href={race.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-semibold transition-colors"
          >
            🔗 Vai al sito ufficiale
          </a>
        )}
      </div>
      <Footer />
    </div>
  );
}
