# Calcolatore del Tema Natale — Figlie di Lilith

Sorgente completo del calcolatore astrologico usato su [figliedililith.it](https://figliedililith.it), nella forma di componente per un tema figlio WordPress.

Questo repository esiste per soddisfare l'obbligo della **GNU Affero General Public License**: chiunque usi il calcolatore attraverso la rete deve poterne ottenere il sorgente completo corrispondente. È quello che trovi qui — tutto il codice che viene eseguito nel tuo browser quando calcoli un tema natale, più gli script per ricostruire le dipendenze compilate.

## Che cosa non è incluso

Il repository contiene il **componente calcolatore**, non l'intero tema del portale. Restano fuori le pagine editoriali (Grimorio, homepage, portale completo), i loro testi e le immagini di brand: sono contenuti che non interoperano con le Swiss Ephemeris e non fanno parte del programma coperto dall'AGPL. `functions.php` è incluso per intero perché contiene la registrazione degli asset del calcolatore; le parti che vi si riferiscono ad altri file del tema non hanno effetto in questo repository.

## Il calcolatore

I calcoli astronomici sono eseguiti dalle **Swiss Ephemeris 2.10.03** di Astrodienst AG, compilate in WebAssembly e eseguite **interamente nel browser**: nessun backend, nessuna chiave API, nessun dato di nascita trasmesso a un server.

- Posizioni geocentriche tropicali di 18 corpi e punti, più Punto di Fortuna e Vertex.
- Sei sistemi di domificazione reali: Placidus, Koch, Whole Sign, Campanus, Regiomontanus, Equal.
- Fuso orario dedotto dalle coordinate con tz-lookup e risolto con l'archivio IANA incluso in Moment Timezone, indipendente dalle regole installate nel browser. Le ore inesistenti vengono rifiutate, quelle ripetute chiedono quale occorrenza usare.
- Intervallo ammesso: anni 1800–2399.
- Nessun fallback approssimato: se un calcolo non è eseguibile, il motore lo dichiara.

## Struttura

I percorsi rispecchiano quelli del tema figlio WordPress.

| Percorso | Contenuto |
|---|---|
| `js/swiss-precision.mjs` | Risoluzione dell'istante UTC dalla zona IANA e chiamate dirette a Swiss Ephemeris. |
| `js/calcolatore-swiss.mjs` | Ponte fra le effemeridi e lo strato interpretativo (modulo ES). |
| `js/calcolatore-engine.js` | Segni, case, dignità, aspetti, dominanti e letture. **Nessuna astronomia.** |
| `js/calcolatore-app.js` | Interfaccia, geocodifica, hash URL, rendering dei risultati. |
| `js/calcolatore-chart.js` | Renderer SVG della ruota zodiacale. |
| `js/vendor/` | Dipendenze compilate e testi di licenza di terze parti. |
| `css/calcolatore-lilith.css` | Stili del componente. |
| `template-parts/calcolatore-markup.php` | Markup del componente. |
| `page-calcolatore.php`, `page-tema-natale.php` | Template di pagina dedicati. |
| `functions.php` | Registrazione degli asset e shortcode `[calcolatore_tema_natale]`. |
| `../tools/`, `../tests/` | Script di build e verifica, suite di regressione. |

Documentazione del motore: [`SWISS-EPHEMERIS.md`](wordpress-child-theme/SWISS-EPHEMERIS.md).

## Installazione

Copiare il contenuto di `wordpress-child-theme/` nel proprio tema figlio, conservando i percorsi, e includere il componente con lo shortcode `[calcolatore_tema_natale]` oppure assegnando a una pagina il template *Calcolatore Tema Natale*. Il server deve servire `.mjs` come JavaScript, `.wasm` come `application/wasm` e consentire il download di `.data`; gli ottimizzatori JavaScript non devono concatenare né inlinare `js/calcolatore-swiss.mjs`, che è un modulo ES.

## Build e test

```bash
npm install --ignore-scripts
npm run build:swiss   # rigenera js/vendor/ da node_modules
npm test              # 14 gruppi di regressione
```

Il tema distribuito contiene già gli artefatti compilati e non richiede npm sul server.

`wordpress-child-theme/js/vendor/swiss-time.mjs` è un bundle minificato: la sua forma sorgente sono i pacchetti npm dichiarati in `package.json`, riassemblati da `tools/build-swiss.mjs` a partire da `tools/swiss-time-source.mjs`.

Anteprima del solo calcolatore, senza WordPress:

```bash
node tools/preview-calculator.mjs
```

## Licenza

**AGPL-3.0-or-later.** Testo integrale in [`LICENSE`](LICENSE); scelte di licenza, attribuzioni e componenti di terze parti in [`wordpress-child-theme/LICENZA.md`](wordpress-child-theme/LICENZA.md).

Le Swiss Ephemeris sono distribuite da Astrodienst AG sotto AGPL **oppure** con licenza professionale a pagamento. Questo progetto usa il regime AGPL. Chi volesse riutilizzare questo codice in un prodotto proprietario deve acquistare la licenza professionale da Astrodienst (<https://www.astro.com/swisseph/>).

## Avvertenza

L'astrologia appartiene alla tradizione simbolica e culturale, non alle scienze esatte. I contenuti interpretativi hanno finalità culturale, filosofica e introspettiva e non sostituiscono in alcun caso pareri medici, psicologici, legali o finanziari.
