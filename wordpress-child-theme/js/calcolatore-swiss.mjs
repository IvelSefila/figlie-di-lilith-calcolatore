/**
 * Figlie di Lilith — Ponte fra Swiss Ephemeris e il motore interpretativo.
 *
 * Unico punto di ingresso del calcolo: espone window.calculateLilithNatalChart,
 * che risolve l'istante UTC dalla zona IANA, chiama Swiss Ephemeris 2.10.03 e
 * consegna il risultato grezzo a window.LilithEngine.assembleChart.
 *
 * Non esiste alcun fallback approssimato: se le effemeridi non sono
 * disponibili o l'input non è valido, l'errore viene propagato all'interfaccia.
 */

import { calculate, initialize } from './swiss-precision.mjs';
import { tzLookup } from './vendor/swiss-time.mjs?v=2026c';

window.lilithLookupTimezone = function (latitude, longitude) {
  try {
    return tzLookup(Number(latitude), Number(longitude));
  } catch (e) {
    return null;
  }
};

// Precarica il WASM appena la pagina è pronta, così il primo calcolo
// dell'utente non paga l'attesa di download e inizializzazione.
window.lilithPrewarmEphemeris = function () {
  return initialize().catch(() => null);
};

window.calculateLilithNatalChart = async function (req) {
  if (!window.LilithEngine || typeof window.LilithEngine.assembleChart !== 'function') {
    throw new Error('Motore interpretativo non caricato (calcolatore-engine.js).');
  }
  const swiss = await calculate({
    date: req.date,
    time: req.time,
    latitude: req.latitude,
    longitude: req.longitude,
    timezone: req.timezone || '',
    house_system: req.house_system || 'P',
    dst: req.dst
  });
  return window.LilithEngine.assembleChart(swiss, req);
};

window.dispatchEvent(new Event('lilith-swiss-ready'));
