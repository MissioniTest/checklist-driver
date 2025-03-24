import { useState } from "react";

// Dati della checklist
const checklistData = [
  {
    title: "Fase 1: Il giorno prima della missione",
    items: [
      "Verificare le attività previste in app",
      "Controllare i Driver Message",
      "Verificare orari di apertura e chiusura",
      "Stampare il CMR"
    ]
  },
  {
    title: "Fase 2: Svolgimento della Missione",
    items: [
      "Contattare il centro di ritiro",
      "Recarsi al centro negli orari indicati",
      "Identificare il veicolo",
      "Compilare il CMR con i dati della missione",
      "Controllare eventuali danni al veicolo",
      "Scattare foto e documentare lo stato",
      "Verificare livello carburante e km percorsi",
      "Far firmare il verbale al centro",
      "Movimentare il veicolo fino alla destinazione",
      "Contattare il cliente per l'orario di arrivo",
      "Consegna del veicolo e firma del verbale",
      "Scattare foto finali e caricare su app"
    ]
  },
  {
    title: "Fase 3: Dopo la missione",
    items: [
      "Caricare i giustificativi di spesa rispondendo alla mail",
      "Caricare il verbale"
    ]
  }
];

// Componente interattivo per il calcolo del contributo spesa
function ContributionCalculator() {
  const [km, setKm] = useState("");

  // Funzione che ritorna il tasso applicabile in base ai km
  const getRate = (kmValue) => {
    const value = parseFloat(kmValue);
    if (isNaN(value)) return 0;
    if (value <= 150) return 0.20;
    if (value <= 300) return 0.25;
    return 0.30;
  };

  const rate = getRate(km);
  const contribution =
    km && !isNaN(parseFloat(km)) ? (parseFloat(km) * rate).toFixed(2) : 0;

  return (
    <div className="p-4 bg-gray-50 rounded-md border border-gray-200 mt-4">
      <h3 className="text-lg font-semibold mb-2" style={{ color: "#800020" }}>
        Calcola il Contributo Spesa
      </h3>
      <label className="block mb-2">
        Quanti km è la missione? 
        <input 
          type="number" 
          value={km} 
          onChange={(e) => setKm(e.target.value)} 
          className="ml-2 p-1 border rounded-md focus:outline-none" 
          style={{ borderColor: "#800020" }}
          placeholder="Inserisci km"
        />
      </label>
      {km && !isNaN(parseFloat(km)) && (
        <p className="text-sm" style={{ color: "#800020" }}>
          Tasso applicato: {rate.toFixed(2)} €/km<br />
          Contributo spese: {contribution} €
        </p>
      )}
    </div>
  );
}

// Icone (emoji) per ogni passaggio della checklist
const iconsData = [
  ["📱", "💬", "⏰", "🖨️"],
  ["📞", "🕒", "🔍", "📝", "🚧", "📸", "⛽", "🖊️", "🛣️", "📞", "📝", "📸"],
  ["💳", "📄"]
];

export default function Checklist() {
  const [expanded, setExpanded] = useState({});
  const [completed, setCompleted] = useState({});

  const toggleItem = (item) => {
    setCompleted((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const toggleSection = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div
      className="p-4 bg-white min-h-screen text-gray-800"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#800020" }}
      >
        Checklist Prima Missione
      </h1>
      {checklistData.map((section, i) => (
        <div
          key={i}
          className="mb-6 p-4 bg-white rounded-lg shadow-md border-l-4"
          style={{ borderColor: "#800020" }}
        >
          <h2
            className="text-xl font-semibold mb-3 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection(i)}
          >
            <span>{section.title}</span>
            <span
              className="text-gray-500"
              style={{ opacity: 0.6 }}
            >
              {expanded[i] ? "▼" : "▶"}
            </span>
          </h2>
          {expanded[i] && (
            <ul>
              {section.items.map((item, j) => (
                <li key={j} className="flex items-center gap-3 mb-3">
                  <span style={{ fontSize: "1.5rem" }}>
                    {iconsData[i][j]}
                  </span>
                  <input
                    type="checkbox"
                    checked={completed[item] || false}
                    onChange={() => toggleItem(item)}
                    className="w-5 h-5 rounded-md border-2"
                    style={{
                      borderColor: "#800020",
                      accentColor: "#800020"
                    }}
                  />
                  <span className={completed[item] ? "line-through text-gray-500" : ""}>
                    {item}
                  </span>
                </li>
              ))}
              {/* Se siamo nella Fase 1, aggiungiamo il calcolatore del contributo spesa */}
              {i === 0 && <ContributionCalculator />}
            </ul>
          )}
        </div>
      ))}
      <div className="mt-8 text-center text-sm">
        Per pianificare il viaggio, consulta{" "}
        <a
          href="https://www.google.com/maps"
          className="underline"
          style={{ color: "#800020", opacity: 0.8 }}
        >
          Google Maps
        </a>{" "}
        e per i dettagli operativi leggi il{" "}
        <a
          href="https://manuale-operativo.com"
          className="underline"
          style={{ color: "#800020", opacity: 0.8 }}
        >
          Manuale Operativo
        </a>.
      </div>
    </div>
  );
}
