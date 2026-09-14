# PRD — Fase 2: le sintesi segno × casa, per tutti i corpi

**Progetto:** Calcolatore del Tema Natale · Figlie di Lilith
**File da estendere:** `wordpress-child-theme/js/calcolatore-corpi-dict.js`
**Validazione:** `npm test`
**Prerequisiti:** `PRD-dizionario-corpi.md` e `PRD-correzione-dizionario.md`, entrambi ancora validi.

> **Decisione del committente: copertura totale.**
> La fase 2 si estende a tutti e venti i corpi, non ai soli centrali.
> L'obiettivo dichiarato è la completezza: ogni collocazione possibile deve
> avere la sua sintesi nei due registri. La lunghezza complessiva della
> lettura non è un vincolo del progetto.

---

## 1. Stato e obiettivo

La fase 1 è chiusa e conforme: 20 corpi, 240 segni, 240 case, 36 dignità, 16 retrogradi, 60.315 parole, `npm test` verde su 120 controlli.

Delle sintesi segno × casa ne esistono **43 su 2.880**.

| | |
|---|---|
| Combinazioni totali | 20 corpi × 12 segni × 12 case = **2.880** |
| Già scritte | 43 |
| **Da scrivere** | **2.837** |
| Testi, contando i due registri | **5.674** |
| Parole stimate | **~1.200.000** |
| Lotti da 12 | **~237** |

È il lavoro più grande del progetto e va misurato in mesi di sessioni, non in giorni.

---

## 2. Ordine di esecuzione

Per corpo, nell'ordine sotto; dentro ogni corpo, un lotto per segno — `Aries|1` … `Aries|12`, poi `Taurus|1` … e così via fino a `Pisces|12`. Dodici lotti chiudono un corpo.

1. **Mars** — l'unico con la fase 1 chiusa da più tempo e il riferimento stilistico del progetto (ne manca 143)
2. **Sun**, **Moon**
3. **Venus**, **Mercury**, **Jupiter**, **Saturn**
4. **Lilith**, **TrueLilith**
5. **Uranus**, **Neptune**, **Pluto**
6. **TrueNode**, **Chiron**
7. **Ceres**, **Pallas**, **Juno**, **Vesta**, **ParsFortunae**, **Vertex**

Le 43 sintesi esistenti non vanno riscritte: sono già conformi ai controlli. Completare le combinazioni mancanti attorno a esse.

---

## 3. Cosa distingue una sintesi da un riassunto

Vale il §5 del PRD principale, e a questa scala diventa la difficoltà centrale. La sintesi **non** ripete cosa fa il segno e cosa fa la casa: dice **cosa producono insieme**.

Il criterio operativo è chiedersi che rapporto c'è fra i due:

| Rapporto | Cosa dire |
|---|---|
| **Consonanza** | la casa offre il terreno naturale a ciò che il segno fa — dirlo senza compiacimento, nominando il rischio di un talento mai messo alla prova |
| **Tensione** | la casa chiede l'opposto di ciò che il segno sa fare — è la sintesi più ricca: nominare l'attrito e cosa lo risolve |
| **Amplificazione** | la casa raddoppia la direzione del segno, nel bene e nel male |
| **Occultamento** | la casa nasconde alla persona stessa ciò che il segno fa — il caso di Marte in Bilancia in dodicesima |

Se un testo resta valido cambiando la casa, o cambiando il segno, è sbagliato: quella è la definizione operativa del fallimento a questa scala.

---

## 4. Il rischio di questa fase, e come si evita

Con 5.674 testi da produrre, la pressione verso lo stampo è enorme: è precisamente ciò che è accaduto alle prime 39 sintesi, poi riscritte. Tre presidi.

**Non lavorare per corpo trasversale.** Scrivere dodici sintesi dello stesso segno di seguito (`Aries|1` … `Aries|12`) obbliga a variare la casa mantenendo fisso il segno: la differenza fra i blocchi diventa il contenuto del lavoro, non un effetto collaterale.

**Non riusare l'architettura della frase.** Cambiare i sostantivi lasciando in piedi la struttura produce testi che i controlli intercettano solo a campione e che un lettore riconosce subito. Variare l'ordine: a volte il meccanismo prima e il vissuto poi, a volte il contrario; a volte aprire da una scena concreta, a volte da una contraddizione, a volte dal dono.

**Rileggere l'ultimo lotto prima di scrivere il successivo.** Se i dodici blocchi appena scritti si somigliano fra loro, si somiglieranno anche ai prossimi dodici.

---

## 5. I controlli, e cosa cambia a questa scala

Restano i sei del file `tests/corpi-dict.test.mjs`. Due note sul comportamento con un corpus grande.

**Le collisioni fra corpi diventano più probabili.** La regola è nessuna sequenza di 8 parole ripetuta fra blocchi di corpi diversi; con 5.674 testi le occasioni di collisione crescono molto. Non è un difetto del controllo: è la ragione per cui esiste. Una collisione va risolta **riscrivendo una delle due frasi**, mai allargando la soglia.

**La soglia degli incipit ora ha un tetto assoluto.** Era «al massimo il 10% dei blocchi dello strato»; a 2.880 sintesi avrebbe permesso 288 aperture identiche. Ora è `min(10%, 8)`: **nessun trigramma iniziale può aprire più di otto blocchi**, qualunque sia la dimensione dello strato.

Valgono immutate: nessuna sequenza di 6 parole ripetuta dentro lo stesso corpo; nessuna chiusa di 4 parole ripetuta nello strato; nessun ruolo marcato al maschile rivolto a chi legge; nessun participio concordato con la seconda persona, irregolari compresi (`ti sei mossa`, `sei costretta`, `sei attratto` sono tutti vietati); `canonico` e `lilithiano` almeno 80 parole ciascuno e mai l'uno parafrasi dell'altro.

---

## 6. Regola assoluta sui test

Invariata e senza eccezioni: **se un testo non passa, si riscrive il testo.**

Vietato alzare soglie, alzare il tetto degli incipit, permettere chiuse ripetute, aggiungere un ruolo umano a `THING_NOUNS`, ampliare `GENDER_ALLOWED` per una concordanza che riguarda chi legge, marcare un test `skip` o `todo`, cancellare un controllo.

L'unica modifica ammessa resta aggiungere a `THING_NOUNS` un nome che **denota un oggetto e non una persona**, con un commento che lo giustifichi.

---

## 7. Cosa non toccare

`calcolatore-engine.js`, `calcolatore-app.js`, `calcolatore-chart.js`, `swiss-precision.mjs`, `calcolatore-swiss.mjs`, `js/vendor/**`, e la copertura già completa di segni, case, dignità e retrogradi.

Il file cresce di parecchi megabyte: è previsto e non va compresso, minificato o diviso senza accordo preventivo, perché il caricamento è governato da `functions.php` e dal PRD principale.

---

## 8. Definizione di fatto

Un corpo è concluso quando ha **144 combinazioni** `Segno|Casa`, ciascuna con `title`, `canonico`, `lilithiano` e `sintesi`, e `npm test` è verde.

La fase 2 è conclusa quando tutti e venti i corpi lo sono: **2.880 combinazioni, 5.760 testi**.

Dopo ogni lotto da dodici: `npm test`. Non procedere con la suite rossa.

---

*Il committente ha stabilito che la completezza viene prima di ogni considerazione di lunghezza. Questo vale per quanto materiale produrre, non per come produrlo: un blocco scritto in fretta non rende l'opera più completa, la rende più lunga.*
