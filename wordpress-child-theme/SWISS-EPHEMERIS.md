# Calcolatore Swiss Ephemeris 4.0

Il tema include Swiss Ephemeris 2.10.03 compilato in WebAssembly tramite swisseph-wasm 0.1.0. Il calcolo non richiede Python, API, chiavi o un servizio su localhost. I file sono serviti dal tema; le coordinate cercate nel modulo continuano a usare i servizi geografici esterni esistenti.

## Architettura

Quattro file, con una sola direzione di dipendenza:

| File | Ruolo |
|---|---|
| `js/swiss-precision.mjs` | Risoluzione dell'istante UTC dalla zona IANA e chiamate dirette a Swiss Ephemeris. Nessuna conoscenza dell'interfaccia. |
| `js/calcolatore-swiss.mjs` | Ponte: espone `window.calculateLilithNatalChart(req)` e `window.lilithLookupTimezone(lat, lon)`. Caricato con `type="module"`. |
| `js/calcolatore-engine.js` | Strato interpretativo: segni, case, dignità, aspetti, dominanti e letture. **Non contiene astronomia**: riceve posizioni e cuspidi già calcolate tramite `window.LilithEngine.assembleChart(swiss, req)`. |
| `js/calcolatore-app.js` | Interfaccia, geocodifica, hash URL, rendering. Chiama solo il ponte. |

Prima della 4.0 il calcolo in produzione usava un motore kepleriano interno: Urano sbagliava fino a 1,1°, Chirone e gli asteroidi fino a 178°, il fuso orario veniva ignorato (offset fisso +1 o `round(longitudine/15)`), quattro sistemi di case su sei restituivano in realtà Placidus e il Vertex era invertito fuori dall'Europa. Quel codice è stato rimosso, non disattivato: `tests/calculator-integration.test.mjs` fallisce se rientra nel motore.

## Installazione

Caricare l'intera cartella del tema, inclusa `js/vendor/`, quindi svuotare le cache WordPress/CDN. I template usano gli script registrati in `functions.php`, senza copie manuali. Il server deve servire `.mjs` come JavaScript e `.wasm` come `application/wasm`; `.data` deve essere scaricabile. Gli ottimizzatori JavaScript devono preservare i percorsi di `calcolatore-engine.js` e `calcolatore-swiss.mjs` (escluderli da concatenazione e inlining: il secondo è un modulo ES).

Gli asset del calcolatore vengono accodati solo sulle pagine che lo usano (template `page-calcolatore.php` / `page-tema-natale.php` o shortcode `[calcolatore_tema_natale]`).

Le impostazioni `LILITH_CHART_API_BASE` e l'attributo `api_url` dello shortcode sono state rimosse: non esiste più alcun backend. Nei risultati vengono mostrati motore, versione, zona IANA, offset e istante UTC. Errori del motore non attivano alcun fallback approssimato: il calcolo si ferma e l'interfaccia mostra il motivo.

## Precisione e limiti

- File inclusi dal pacchetto: sepl_18.se1, semo_18.se1, seas_18.se1, con dati ausiliari. Intervallo ammesso: anni 1800–2399, calendario gregoriano; eventuali limiti di singoli corpi vengono segnalati come errore.
- Posizioni geocentriche tropicali con opzioni Swiss standard e velocità; il flag restituito deve confermare SWIEPH. UTC convertito in UT1 dalla libreria.
- Case P/K/W/C/R/E, con errore esplicito se il sistema non è calcolabile. Nessuna sostituzione nascosta nelle regioni polari.
- Punto di Fortuna diurno/notturno determinato dall'altitudine geometrica del Sole, indipendentemente dal sistema di case. Assegnazione dei pianeti alle case mediante longitudine eclittica.
- Zona geografica proposta da tz-lookup 6.1.25, correggibile nel campo IANA. Le regole dei fusi sono incluse in Moment Timezone 0.6.3, archivio IANA 2026c completo: non dipendono dalle regole installate nel browser. Temporal valida le date e gestisce gli istanti UTC. Gli offset storici mantengono anche i secondi. Nessuna garanzia di ricostruzione storica completa prima del 1970 o sui confini geografici.
- Le ore inesistenti vengono rifiutate; nelle ore ripetute serve scegliere prima/seconda occorrenza. I vecchi valori standard/daylight non forzano più UTC+1/+2.
- La precisione delle interpretazioni simboliche non è una proprietà verificabile delle effemeridi.

## Build e verifiche

Dalla radice del progetto: `npm install --ignore-scripts`, `npm run build:swiss`, `npm test`. Il tema distribuito contiene già gli artefatti compilati e non richiede npm sul server. `node tools/preview-calculator.mjs` avvia una preview del componente su 127.0.0.1:4189 senza WordPress.

Test: quattordici gruppi di regressione in due file. `tests/swiss-precision.test.mjs` copre il livello effemeridi (rifiuto del fallback Moshier, offset storici con secondi, cambio data UTC, distinzione diurna/notturna indipendente dalle case). `tests/calculator-integration.test.mjs` copre il collegamento con l'interfaccia: assenza di astronomia approssimata nel motore, corrispondenza esatta fra posizioni/cuspidi Swiss e tema assemblato, retrogradi dalla velocità, sei sistemi di case realmente distinti, Punto di Fortuna coerente e istanti corretti fuori dall'Europa. Il valore solare congelato nel test è una regressione del motore, non una verifica astronomica indipendente.

Confronto separato con pyswisseph 2.10.3.2 (Swiss 2.10.03 nativo) e Python zoneinfo/tzdata 2026d: 864 casi su 12 luoghi, 12 date fra 1800 e 2399 e 6 sistemi di case. 840 risultati validi concordanti; 24 rifiuti polari concordanti. Scarto massimo longitudinale 3.48e-8 secondi d'arco; cuspidi 4.10e-10 secondi d'arco; UT1 e TT identici. Il confronto usa lo stesso modello Swiss e gli stessi file per isolare gli errori d'integrazione: non misura l'errore assoluto rispetto al cielo reale. Report: output/validation/native-comparison.json nella radice del progetto. Ripetibile con tools/verify-native.mjs e tools/native-reference.py, installando pyswisseph e tzdata in .validation-python.

Verificato nel browser il flusso modulo → calcolo → ruota SVG, le case differenti, il Punto di Fortuna e l'invalidazione delle coordinate cambiando città. L'installazione WordPress remota non è stata verificata.

## Provenienza e licenze

Il regime di licenza applicato dal progetto è dichiarato in `LICENZA.md`: **AGPL-3.0-or-later**. Il sorgente completo corrispondente è pubblicato su <https://github.com/IvelSefila/figlie-di-lilith-calcolatore> e collegato dall'informativa del calcolatore. Va riallineato a ogni modifica del calcolatore in produzione.

- Wrapper e binari: https://github.com/prolaxu/swisseph-wasm (0.1.0), licenza GPL-3.0-or-later inclusa in js/vendor/swisseph/LICENSE.
- Libreria originale: https://github.com/aloistr/swisseph ; documentazione e condizioni ufficiali: https://www.astro.com/swisseph/swephprg.htm . Astrodienst indica AGPL oppure licenza professionale. La descrizione GPL nel wrapper non sostituisce le condizioni ufficiali. L'integrazione locale non acquista licenze né cambia automaticamente la licenza del progetto.
- Temporal: https://github.com/js-temporal/temporal-polyfill (ISC); tz-lookup: https://github.com/darkskyapp/tz-lookup (CC0); JSBI (Apache-2.0). Avvisi inclusi nella directory vendor.
- Moment e Moment Timezone (MIT): https://github.com/moment/moment-timezone . Avvisi inclusi in vendor.
