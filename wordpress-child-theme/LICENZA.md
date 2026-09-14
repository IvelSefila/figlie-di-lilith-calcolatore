# Licenza — Calcolatore del Tema Natale «Figlie di Lilith»

## Regime scelto

Il calcolatore del tema natale incorpora le **Swiss Ephemeris 2.10.03** di Astrodienst AG, distribuite a doppia licenza: **GNU Affero General Public License v3 o successiva (AGPL)** oppure licenza professionale a pagamento.

Questo progetto usa il **regime AGPL**. Di conseguenza il componente calcolatore — motore interpretativo, dizionari degli aspetti, interfaccia, renderer della ruota e fogli di stile — è distribuito sotto **AGPL-3.0-or-later**.

L'obbligo copyleft riguarda il programma eseguito insieme alle Swiss Ephemeris. I contenuti editoriali del portale (Grimorio, pagine dottrinali, immagini di brand) non interoperano con le effemeridi, non fanno parte di quel programma e restano opere d'autore separate, non pubblicate in questo regime.

> **Da completare prima della pubblicazione:** l'AGPL richiede che a chiunque usi il calcolatore attraverso la rete sia offerto il **sorgente completo corrispondente**. Non basta che il JavaScript sia leggibile nel browser. Occorre pubblicare il tema in un repository o come archivio scaricabile e inserirne il collegamento qui sotto e nella sezione «Software di Terze Parti» del calcolatore.
>
> Sorgente completo: `<INSERIRE URL>`

Se in futuro il portale dovesse diventare commerciale e si volesse mantenere chiuso il codice interpretativo, la strada è acquistare la licenza professionale Swiss Ephemeris da Astrodienst AG (swisseph@astro.com) e aggiornare questo file. La licenza professionale non ha effetto retroattivo sulle versioni già distribuite sotto AGPL.

## Componenti di terze parti

| Componente | Versione | Licenza | Origine |
|---|---|---|---|
| Swiss Ephemeris | 2.10.03 | AGPL-3.0-or-later **o** licenza professionale Astrodienst | https://www.astro.com/swisseph/ |
| swisseph-wasm (wrapper e binari WASM) | 0.1.0 | GPL-3.0-or-later | https://github.com/prolaxu/swisseph-wasm |
| Moment / Moment Timezone (archivio IANA 2026c) | 0.6.3 | MIT | https://github.com/moment/moment-timezone |
| @js-temporal/polyfill | 0.5.1 | ISC | https://github.com/js-temporal/temporal-polyfill |
| JSBI | — | Apache-2.0 | dipendenza del polyfill Temporal |
| tz-lookup | 6.1.25 | CC0-1.0 | https://github.com/darkskyapp/tz-lookup |

I testi integrali delle licenze si trovano in `js/vendor/`:
`swisseph/LICENSE`, `MOMENT-LICENSE`, `MOMENT-TIMEZONE-LICENSE`, `TEMPORAL-LICENSE`, `JSBI-LICENSE`, `TZ-LOOKUP-LICENSE`.

### Nota sul testo di licenza incluso nel wrapper

Il file `js/vendor/swisseph/LICENSE` riassume le condizioni Swiss Ephemeris come «GPL, gratis per uso non commerciale». È la sintesi scritta dall'autore del wrapper, non da Astrodienst, e indica una licenza superata: dalla versione 2.10 Astrodienst distribuisce le Swiss Ephemeris sotto **AGPL**, non GPL. Fanno fede unicamente le condizioni pubblicate su https://www.astro.com/swisseph/ .

## Servizi esterni

Le ricerche geografiche del modulo interrogano **OpenStreetMap Nominatim** e **Photon**. Sono servizi pubblici con proprie condizioni d'uso (in particolare i limiti di frequenza e l'obbligo di identificare l'applicazione chiamante): https://operations.osmfoundation.org/policies/nominatim/ . Nessun dato di nascita viene trasmesso: viene inviato soltanto il testo della località digitata.

## Contenuti non software

I testi dottrinali, le pagine editoriali, le immagini e i sigilli del progetto *Figlie di Lilith* restano opere d'autore dei rispettivi titolari e non sono distribuiti sotto AGPL.

Fanno eccezione i dizionari interpretativi incorporati nei file JavaScript del calcolatore (`js/calcolatore-engine.js`, `js/calcolatore-aspects-dict.js`): sono parte del programma eseguito insieme alle Swiss Ephemeris e ricadono quindi nel regime AGPL dichiarato sopra.

---

*Questo documento descrive le scelte di licenza del progetto. Non è un parere legale.*
