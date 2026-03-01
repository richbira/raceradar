export const CITY_TO_REGION: Record<string, string> = {
  // Lombardia
  'Milano': 'Lombardia', 'Bergamo': 'Lombardia', 'Brescia': 'Lombardia',
  'Como': 'Lombardia', 'Monza': 'Lombardia', 'Pavia': 'Lombardia',
  'Cremona': 'Lombardia', 'Mantova': 'Lombardia', 'Lecco': 'Lombardia',
  'Lodi': 'Lombardia', 'Sondrio': 'Lombardia', 'Varese': 'Lombardia',

  // Lazio
  'Roma': 'Lazio', 'Viterbo': 'Lazio', 'Rieti': 'Lazio',
  'Latina': 'Lazio', 'Frosinone': 'Lazio',

  // Campania
  'Napoli': 'Campania', 'Salerno': 'Campania', 'Caserta': 'Campania',
  'Benevento': 'Campania', 'Avellino': 'Campania',

  // Toscana
  'Firenze': 'Toscana', 'Siena': 'Toscana', 'Pisa': 'Toscana',
  'Arezzo': 'Toscana', 'Livorno': 'Toscana', 'Grosseto': 'Toscana',
  'Lucca': 'Toscana', 'Massa': 'Toscana', 'Pistoia': 'Toscana',
  'Prato': 'Toscana',

  // Piemonte
  'Torino': 'Piemonte', 'Asti': 'Piemonte', 'Alessandria': 'Piemonte',
  'Cuneo': 'Piemonte', 'Novara': 'Piemonte', 'Verbania': 'Piemonte',
  'Vercelli': 'Piemonte', 'Biella': 'Piemonte',

  // Veneto
  'Venezia': 'Veneto', 'Verona': 'Veneto', 'Padova': 'Veneto',
  'Vicenza': 'Veneto', 'Treviso': 'Veneto', 'Belluno': 'Veneto',
  'Rovigo': 'Veneto',

  // Emilia-Romagna
  'Bologna': 'Emilia-Romagna', 'Parma': 'Emilia-Romagna', 'Modena': 'Emilia-Romagna',
  'Ferrara': 'Emilia-Romagna', 'Ravenna': 'Emilia-Romagna', 'Rimini': 'Emilia-Romagna',
  'Forlì': 'Emilia-Romagna', 'Piacenza': 'Emilia-Romagna', 'Reggio Emilia': 'Emilia-Romagna',
  'Cervia': 'Emilia-Romagna',

  // Sicilia
  'Palermo': 'Sicilia', 'Catania': 'Sicilia', 'Messina': 'Sicilia',
  'Siracusa': 'Sicilia', 'Agrigento': 'Sicilia', 'Trapani': 'Sicilia',
  'Ragusa': 'Sicilia', 'Caltanissetta': 'Sicilia', 'Enna': 'Sicilia',

  // Puglia
  'Bari': 'Puglia', 'Lecce': 'Puglia', 'Taranto': 'Puglia',
  'Foggia': 'Puglia', 'Brindisi': 'Puglia', 'Andria': 'Puglia',

  // Calabria
  'Catanzaro': 'Calabria', 'Reggio Calabria': 'Calabria', 'Cosenza': 'Calabria',
  'Crotone': 'Calabria', 'Vibo Valentia': 'Calabria',

  // Sardegna
  'Cagliari': 'Sardegna', 'Sassari': 'Sardegna', 'Nuoro': 'Sardegna',
  'Oristano': 'Sardegna', 'Olbia': 'Sardegna',

  // Liguria
  'Genova': 'Liguria', 'La Spezia': 'Liguria', 'Savona': 'Liguria',
  'Imperia': 'Liguria',

  // Friuli-Venezia Giulia
  'Trieste': 'Friuli-Venezia Giulia', 'Udine': 'Friuli-Venezia Giulia',
  'Pordenone': 'Friuli-Venezia Giulia', 'Gorizia': 'Friuli-Venezia Giulia',

  // Trentino-Alto Adige
  'Trento': 'Trentino-Alto Adige', 'Bolzano': 'Trentino-Alto Adige',
  'Cortina d\'Ampezzo': 'Veneto',

  // Marche
  'Ancona': 'Marche', 'Pesaro': 'Marche', 'Macerata': 'Marche',
  'Ascoli Piceno': 'Marche', 'Fermo': 'Marche',

  // Umbria
  'Perugia': 'Umbria', 'Terni': 'Umbria',

  // Abruzzo
  'L\'Aquila': 'Abruzzo', 'Pescara': 'Abruzzo', 'Chieti': 'Abruzzo',
  'Teramo': 'Abruzzo',

  // Basilicata
  'Potenza': 'Basilicata', 'Matera': 'Basilicata',

  // Molise
  'Campobasso': 'Molise', 'Isernia': 'Molise',

  // Valle d'Aosta
  'Aosta': 'Valle d\'Aosta',
}

export const CITIES = Object.keys(CITY_TO_REGION)

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia',
  'Austria', 'Azerbaigian', 'Bahrain', 'Bangladesh', 'Belgio', 'Bielorussia', 'Bolivia', 'Bosnia ed Erzegovina',
  'Brasile', 'Bulgaria', 'Canada', 'Cile', 'Cina', 'Colombia', 'Corea del Sud', 'Costa Rica',
  'Croazia', 'Cuba', 'Danimarca', 'Ecuador', 'Egitto', 'Emirati Arabi Uniti', 'Estonia', 'Etiopia',
  'Filippine', 'Finlandia', 'Francia', 'Georgia', 'Germania', 'Ghana', 'Giappone', 'Grecia',
  'Guatemala', 'Honduras', 'India', 'Indonesia', 'Iran', 'Iraq', 'Irlanda', 'Islanda',
  'Israele', 'Italia', 'Kenya', 'Kosovo', 'Lettonia', 'Libano', 'Lituania', 'Lussemburgo',
  'Macedonia del Nord', 'Malaysia', 'Malta', 'Marocco', 'Messico', 'Moldova', 'Montenegro', 'Norvegia',
  'Nuova Zelanda', 'Paesi Bassi', 'Pakistan', 'Panama', 'Paraguay', 'Perù', 'Polonia', 'Portogallo',
  'Qatar', 'Regno Unito', 'Repubblica Ceca', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Singapore',
  'Slovacchia', 'Slovenia', 'Spagna', 'Stati Uniti', 'Sudafrica', 'Svezia', 'Svizzera', 'Thailandia',
  'Tunisia', 'Turchia', 'Ucraina', 'Ungheria', 'Uruguay', 'Venezuela', 'Vietnam',
]

export const COMPETITION_OPTIONS = [
  'Competitiva',
  'Non competitiva',
]

export const HYROX_CATEGORIES = [
  'Open Men', 'Open Women',
  'Pro Men', 'Pro Women',
  'Masters Men', 'Masters Women',
  'Doubles Men', 'Doubles Women', 'Doubles Mixed',
  'Relay',
] as const