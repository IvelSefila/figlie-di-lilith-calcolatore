# PRD — Correzione del Dizionario dei Corpi

**Progetto:** Calcolatore del Tema Natale · Figlie di Lilith
**File da correggere:** `wordpress-child-theme/js/calcolatore-corpi-dict.js`
**Validazione:** `npm test`
**Prerequisito:** `PRD-dizionario-corpi.md`, che resta valido in tutto ciò che non è modificato qui.

> **Stato all'apertura di questo documento: `npm test` è ROSSO.**
> 120 test, 116 verdi, **4 rossi**. Il lavoro consiste nel riportarlo verde
> riscrivendo i testi, mai allentando i controlli.

---

## 1. Cosa è successo

La fase 1 è stata completata: 20 corpi, 618 blocchi, 61.736 parole. Copertura piena, dignità coerenti con il motore, rendering funzionante, e — va detto — **i test non sono stati manomessi**.

Ma i controlli allora in vigore verificavano le ripetizioni **solo dentro un singolo corpo**. Una formula di raccordo distribuita su corpi diversi li superava tutti, pur essendo esattamente il difetto che questo dizionario esiste per eliminare. Analizzando l'opera intera:

| Strato | Blocchi | Con formule riciclate |
|---|---|---|
| Segni | 240 | 10% |
| Case | 240 | 23% |
| Dignità | 36 | 19% |
| **Retrogradi** | 16 | **63%** |
| **Sintesi — canonico** | 43 | **91%** |
| **Sintesi — lilithiano** | 43 | **74%** |

Quattro nuovi controlli globali sono ora attivi e rendono il difetto visibile. **Non sono negoziabili e non vanno modificati.**

---

## 2. I quattro controlli nuovi

Stanno in `tests/corpi-dict.test.mjs`, in fondo, sotto il commento «Controlli globali».

### 2.1 `nessuna formula riciclata fra corpi diversi`

Nessuna sequenza di **8 parole** può comparire in due blocchi di corpi diversi.

Dentro un corpo la soglia resta 6 parole (regola preesistente). Fra corpi diversi si allenta a 8 perché il lessico tecnico della tradizione ricorre legittimamente — «il luogo dei nemici occulti», «in domicilio notturno» — ma otto parole identiche di fila non sono mai un caso.

**Stato: 89 violazioni.**

### 2.2 `gli incipit non seguono uno stampo`

Dentro uno stesso strato, nessun trigramma iniziale può aprire più del 10% dei blocchi, con un minimo di 2.

**Stato: 4 violazioni.**

```
retrogradi:          «la retrogradazione di…»  apre 4 blocchi su 16  (max 2)
sintesi · canonico:  «la collocazione di…»     apre 6 blocchi su 43  (max 5)
sintesi · lilithiano:«ti è stato…»             apre 10 blocchi su 43 (max 5)
sintesi · lilithiano:«ti hanno fatto…»         apre 9 blocchi su 43  (max 5)
```

### 2.3 `le chiuse non si ripetono`

Dentro uno stesso strato, nessun quadrigramma finale può chiudere due blocchi.

**Stato: 1 violazione** — `sintesi · canonico: «…per l'intera comunità»` chiude 2 blocchi.

### 2.4 `nessun nome di ruolo marcato al maschile rivolto a chi legge`

Vietato `sei / diventi / resti / rimani / sentirti` + `un / il / lo` + nome che finisce in `-o`, `-tore`, `-sore`, `-iere`. Sono ruoli che hanno un femminile, e usarli al maschile esclude metà di chi legge.

**Stato: 43 violazioni** — 21 nelle case, 14 nei segni, 8 nelle sintesi lilithiane.

```
mediatore · maestro · ricercatore · negoziatore · guaritore · educatore
divulgatore · compagno · viaggiatore · traghettatore · precursore · pioniere
pellegrino · oratore · motivatore · mentore · lavoratore · investigatore
interlocutore · coordinatore · consigliere · collaboratore · cercatore
ascoltatore · alleato · trasmettitore
```

Le metafore che designano una cosa e non una persona sono ammesse tramite la lista `THING_NOUNS` (punto, ponte, specchio, pilastro, elemento…). Se ne serve una nuova e **denota davvero un oggetto**, si può aggiungere lì. Un ruolo umano non va mai aggiunto a quella lista: va riscritto.

---

## 3. Il lavoro, in tre parti

### Parte A — Riscrivere i 16 retrogradi

Sono stampati da un unico stampo. Esempio del difetto, tre corpi diversi:

> Urano: *…conferendo a questa posizione una profonda valenza di introiezione spirituale. Quando il pianeta dell'innovazione **inverte il suo cammino** al momento…*
> Nettuno: *…conferendo a questa posizione una profonda valenza di introiezione spirituale…*
> Plutone: *…conferendo a questa posizione una connotazione di profondo scavo interiore. Quando il pianeta degli inferi **inverte la sua marcia** al momento…*

Riscrivere tutti e sedici **da zero**, non ritoccarli: un testo nato da uno stampo resta modellato sullo stampo anche dopo la sostituzione dei sinonimi.

Ogni retrogrado deve dire **cosa significa per quella funzione specifica** tornare sul soggetto. Marte retrogrado (già scritto, §6 del PRD principale) non parla come Mercurio retrogrado: nel primo l'azione si volge contro chi agisce, nel secondo è il pensiero che rientra prima di uscire. La percentuale statistica di retrogradazione può comparire, ma non può essere l'incipit di più di due blocchi.

### Parte B — Riscrivere le 39 sintesi

78 testi fra i due registri. Il difetto è strutturale, non lessicale.

**Canonico** — tutte le chiuse hanno la stessa architettura:

> «L'espressione elevata prescritta dagli studiosi risiede nella figura del X: chi fa Y lascia un'eredità Z.»

Ricorre su Lilith Vera, Nettuno, Plutone, Nodo… Con essa scompaiano anche «l'uso alto raccomandato dagli esperti del simbolismo» e simili. **La tradizione non ha una formula di chiusura: ogni configurazione ha un rimedio suo.**

**Lilithiano** — tutte le aperture hanno la stessa mossa retorica: *Ti è stato imposto… / Ti è stato inculcato… / Ti hanno messo… / Ti hanno fatto sentire…* Diciannove blocchi su quarantatré cominciano denunciando un condizionamento subito nell'infanzia. È una mossa potente la prima volta e una maniera la decima.

Variare il punto d'attacco: da un comportamento presente, da una scena concreta, da un'osservazione che chi legge riconosce, da ciò che gli altri vedono e la persona no, dal dono prima della ferita.

### Parte C — Correggere i 43 ruoli maschili

Distribuiti anche nei segni e nelle case, cioè nel materiale per il resto buono. Qui **non serve riscrivere il blocco**: basta la frase.

| Invece di | Scrivere |
|---|---|
| «Sei un mediatore naturale» | «Medi per natura» · «La mediazione è il tuo riflesso» |
| «Sei un maestro» | «Insegni» · «La tua autorevolezza è didattica» |
| «Sei un guaritore» | «Curi» · «La tua presenza risana» |
| «Diventi un traghettatore» | «Traghetti» · «Accompagni oltre la soglia» |

Il verbo al posto del nome risolve quasi sempre, e spesso il testo ne esce più diretto.

### E le 10 collisioni nel materiale buono

Fra le 89 violazioni del §2.1 una decina riguarda segni, case e dignità — per esempio `Saturn/casa 12` e `Pluto/casa 12`, `Sun/Aquarius` e `Moon/Capricorn`. Vanno corrette riscrivendo **una** delle due frasi in collisione, non entrambi i blocchi.

---

## 4. Ordine di lavoro

1. **Parte C**, i 43 ruoli — sono correzioni di frase, veloci, e sbloccano un test intero
2. **le 10 collisioni** nel materiale buono — stesso tipo di intervento
3. **Parte A**, i 16 retrogradi — un solo lotto
4. **Parte B**, le 39 sintesi — quattro lotti da dieci, prima tutti i canonici poi tutti i lilithiani

Dopo ogni lotto: `npm test`. Non procedere con la suite rossa.

---

## 5. Regola assoluta sui test

I quattro controlli nuovi descrivono la ragione per cui questo dizionario esiste. **Sono vietati:** alzare la soglia degli 8-gram, alzare la percentuale degli incipit, permettere chiuse ripetute, aggiungere un ruolo umano a `THING_NOUNS`, marcare un test come `skip`, cancellare un controllo.

L'unica modifica ammessa a `tests/corpi-dict.test.mjs` è aggiungere a `THING_NOUNS` un nome che **denota un oggetto e non una persona**, con un commento che lo giustifica.

Se un testo non passa, **si riscrive il testo**. Non esistono eccezioni a questa frase.

---

## 6. Cosa non toccare

Restano validi gli elenchi del PRD principale. In particolare **non** modificare `calcolatore-engine.js`, `calcolatore-app.js`, `swiss-precision.mjs`, `js/vendor/**`, e non alterare la copertura già corretta: 12 segni, 12 case e le dignità di ogni corpo devono restare tutti presenti.

Il testo di Marte è il riferimento (§6 del PRD principale) ed è già conforme ai quattro controlli nuovi: **non riscriverlo**.

---

## 7. Definizione di fatto

- [ ] `npm test` verde: 120 test, 120 passati
- [ ] 16 retrogradi riscritti da zero, ognuno sulla funzione del suo corpo
- [ ] 78 testi di sintesi riscritti, senza formula di chiusura nel canonico e con aperture varie nel lilithiano
- [ ] 43 ruoli maschili sostituiti, di norma con un verbo
- [ ] nessuna modifica ai controlli oltre l'eccezione del §5
- [ ] verificato nel browser su almeno un tema reale con `node tools/preview-calculator.mjs`

---

## 8. Dopo

A suite verde il lavoro si ferma. **Le restanti sintesi — circa 2.840 combinazioni — non vanno iniziate senza una decisione esplicita del committente**, che deve stabilire se coprire tutti i venti corpi o soltanto quelli centrali del Canone: Sole, Luna, Marte, Venere, Lilith.

Questa istruzione era già nel PRD principale al §10 e non è stata rispettata: le 39 sintesi oggetto di questa correzione sono state scritte senza chiedere, fuori dai lotti previsti, e sono precisamente il materiale venuto peggio. **Il nesso fra le due cose non è casuale.**

---

*I controlli non sono un ostacolo al lavoro: sono la definizione del lavoro. Un blocco che li supera per costruzione, e non per aggiramento, è un blocco che vale la pena consegnare.*
