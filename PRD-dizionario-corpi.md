# PRD — Dizionario Esegetico dei Corpi Celesti

**Progetto:** Calcolatore del Tema Natale · Figlie di Lilith
**File da estendere:** `wordpress-child-theme/js/calcolatore-corpi-dict.js`
**Validazione:** `npm test`
**Stato:** Marte completo su segni, case, dignità e moto; 1 sintesi su 144 scritta.

---

## 1. Il problema da risolvere

Il calcolatore produceva testi interpretativi generati per concatenazione: un blocco fisso per pianeta, uno per segno, uno per casa, cuciti con frasi di raccordo costanti. Misurato su due temi natali il più diversi possibile (Roma 1990 · Sydney 1962):

| Sezione | Frasi identiche fra i due temi |
|---|---|
| Interpretazione Operativa | **72%** |
| Lettura Lilithiana | **69%** |

E dentro un singolo tema cinque formule di raccordo comparivano **20 volte ciascuna**, una per ogni corpo celeste.

La causa è strutturale: ogni segno era descritto da tre parole (`mode`, `adverb`, `style`) e ogni casa da due (`name`, `area`). Il segno non aggiungeva un contenuto, aggiungeva un avverbio dentro una frase generica.

**La soluzione adottata** è una matrice testuale in cui ogni combinazione ha un testo proprio, scritto per quella combinazione. Il modello già esistente nel progetto è `calcolatore-aspects-dict.js` (188 KB), che fa esattamente questo per le coppie planetarie.

**Questo PRD descrive il completamento della matrice.**

---

## 2. Obiettivo

Riempire il dizionario per tutti i corpi celesti, su quattro strati più la sintesi.

### Strati per corpo

| Strato | Chiave | Voci per corpo | Cosa dice |
|---|---|---|---|
| `signs` | nome inglese del segno | 12 | come quella funzione è fatta in questa persona |
| `houses` | numero 1–12 | 12 | dove accade, con chi, in quale settore di vita |
| `dignities` | nome inglese del segno | 0–6 | che rapporto ha la persona con quella propria parte |
| `retrograde` | — | 0 o 1 | funzione rivolta all'interno |
| `combinations` | `"Segno\|Casa"` | fino a 144 | **la sintesi**: cosa producono insieme, in due registri |

### Corpi

Tutti e venti quelli che il calcolatore mostra. Marte è già fatto su segni, case, dignità e moto: vale da riferimento (§6), e gli mancano 143 sintesi su 144.

| Gruppo | Corpi |
|---|---|
| Luminari | Sun, Moon |
| Personali e sociali | Venus, Mercury, Jupiter, Saturn |
| Canone lilithiano | Lilith (Luna Nera media), TrueLilith (osculatrice) |
| Transpersonali | Uranus, Neptune, Pluto |
| Punti karmici | TrueNode, Chiron |
| Asteroidi e punti calcolati | Ceres, Pallas, Juno, Vesta, ParsFortunae, Vertex |

### Ordine di esecuzione: prima la larghezza, poi la profondità

**Fase 1 — strati base per tutti i corpi.** Segni, case, dignità e retrogradazione: 25–31 blocchi per corpo, ~19 lotti in totale. Nell'ordine dei gruppi della tabella, dall'alto in basso.

**Fase 2 — sintesi segno × casa.** Nello stesso ordine, aggiungendo Marte in testa perché è l'unico corpo la cui fase 1 è già chiusa: Mars, Sun, Moon, Venus, Mercury, e così via.

L'ordine non è arbitrario. Al termine della fase 1 **ogni collocazione di ogni corpo, in qualunque tema, ha già una lettura completa e non ripetitiva**: il problema del 72% è risolto per tutti gli utenti. La fase 2 aggiunge lo strato premium dove c'è, e dove manca la scheda resta comunque ricca, perché i tre strati separati si mostrano lo stesso.

Invertire l'ordine — completare un corpo alla volta comprese le sue 144 sintesi — significherebbe avere Marte perfetto e diciannove corpi ancora al testo generico per moltissimo tempo. **Non farlo.**

---

## 3. Formato dei dati

Il file è uno script classico che espone `window.LILITH_BODY_DICT`. Nuovo corpo = nuova chiave in `BODIES`.

```js
BODIES.Venus = {

  signs: {
    Aries: {
      title: 'Venere in Ariete — <titolo proprio di questa combinazione>',
      text: "…",              // il corpo della lettura
      sintesi: "…"            // UNA riga, usata quando il corpo non è in primo piano
    },
    // … tutti e 12: Aries Taurus Gemini Cancer Leo Virgo
    //               Libra Scorpio Sagittarius Capricorn Aquarius Pisces
  },

  houses: {
    1: { title: '…', text: "…", sintesi: "…" },
    // … tutte e 12, chiavi numeriche
  },

  dignities: {
    // chiave = SEGNO, non nome della dignità: il domicilio di Marte in Ariete
    // e quello in Scorpione non dicono la stessa cosa.
    Taurus: { kind: 'Domicilio', title: '…', text: "…", sintesi: "…" },
    // kind ∈ 'Domicilio' | 'Esaltazione' | 'Esilio' | 'Caduta'
  },

  combinations: {
    'Aries|1': {
      title: 'Venere in Ariete in Prima Casa',
      canonico:   "…",   // registro tradizionale
      lilithiano: "…",   // registro del Canone
      sintesi:    "…"
    },
  },

  retrograde: { title: '…', text: "…", sintesi: "…" }   // omettere per Sun e Moon
};
```

### Tabella delle dignità

Deve restare identica a `DIGNITIES` in `calcolatore-engine.js`. Corpi non elencati **non hanno dignità**: lasciare `dignities: {}`.

| Corpo | Domicilio | Esaltazione | Esilio | Caduta |
|---|---|---|---|---|
| Sun | Leo | Aries | Aquarius | Libra |
| Moon | Cancer | Taurus | Capricorn | Scorpio |
| Mercury | Gemini, Virgo | Virgo | Sagittarius, Pisces | Pisces |
| Venus | Taurus, Libra | Pisces | Aries, Scorpio | Virgo |
| Mars | Aries, Scorpio | Capricorn | Taurus, Libra | Cancer |
| Jupiter | Sagittarius, Pisces | Cancer | Gemini, Virgo | Capricorn |
| Saturn | Capricorn, Aquarius | Libra | Cancer, Leo | Aries |

Mercurio in Vergine è insieme domicilio ed esaltazione, Mercurio in Pesci insieme esilio e caduta: il motore restituisce il primo che trova nell'ordine domicilio → esaltazione → esilio → caduta. Scrivere la voce con quel `kind` e dire nel testo che le due condizioni coincidono.

### Retrogradazione

`Sun` e `Moon` non retrogradano mai: **omettere** `retrograde`. `ParsFortunae` e `Vertex` sono punti calcolati: omettere. Tutti gli altri lo prevedono.

---

## 4. Regole non negoziabili

Sono verificate da `tests/corpi-dict.test.mjs`. Una violazione fa fallire la build.

### 4.1 Nessuna frase riciclata

**Nessuna sequenza di sei parole consecutive può comparire in due blocchi dello stesso corpo.** I due registri di una sintesi contano come blocchi distinti: il lilithiano non può parafrasare il canonico.

Questa è la regola centrale. È ciò che impedisce di ricadere nel 72% di partenza.

### 4.2 Nessun genere presunto

Il calcolatore si rivolge a chi legge **senza presumerne il genere**. Niente doppie forme, niente barre, niente asterischi nel testo: la neutralità si ottiene riscrivendo.

Tre tecniche, nessuna delle quali indebolisce il testo:

- **sostantivi al posto degli aggettivi** — «Lilith non ti chiede aggressività» invece di «non ti chiede di diventare aggressiva»
- **costruzioni impersonali** — «Due volte ti è stato insegnato» invece di «ti hanno addestrata»
- **concordanze che cadono su un sostantivo del testo** — «la tua prima azione sovrana», «quel fuoco, l'hai già visto funzionare»

Parole di genere comune (*implacabile*, *ospite*, *capace*, *forte*) fanno il resto. Vietati: `te stesso/a`, `tu stesso/a`, `sei stato/a`, `sei nato/a`, `ancora vivo/a`, e ogni participio concordato con la seconda persona.

Una concordanza su un sostantivo del testo è legittima («quando a essere minacciato è qualcuno che ami» → concorda con *qualcuno*). Se il test la segnala, aggiungerla a `GENDER_ALLOWED` **con un commento che dice a quale sostantivo si riferisce**.

### 4.3 Lunghezze minime

| Campo | Minimo | Riferimento Marte |
|---|---|---|
| `text` (segno, casa, dignità, retrogrado) | 55 parole | 91–116, media 103 |
| `canonico` | 80 parole | 203 |
| `lilithiano` | 80 parole | 230 |
| `sintesi` | una riga piena | 10–20 parole |

I minimi sono una soglia di sicurezza, non l'obiettivo. **Puntare ai valori di riferimento.**

### 4.4 Titoli distinti

Ogni titolo dello stesso corpo deve essere unico e proprio di quella combinazione. Non «Marte in Ariete» ma «Marte in Ariete — La Spada Non Temperata».

### 4.5 Copertura completa

12 segni, 12 case, tutte le dignità della tabella. Un corpo incompleto fa fallire il test.

---

## 5. Contenuto: cosa deve dire ogni strato

Ogni strato dice una cosa **che gli altri non dicono**. Se un blocco casa potrebbe valere per qualsiasi segno, è sbagliato; se un blocco segno non nomina la funzione specifica di quel corpo, è sbagliato.

| Strato | Deve rispondere a |
|---|---|
| Segno | *Com'è fatta questa funzione in questa persona?* |
| Casa | *Dove si esercita, con chi, in quale settore di vita?* |
| Dignità | *Che rapporto ha la persona con questa propria parte?* |
| Sintesi | *Cosa producono insieme queste due condizioni?* |

### La sintesi è il cuore del lavoro

Non è il riassunto degli altri strati: è **l'interazione**. Va scritta chiedendosi se la casa amplifica, contraddice o nasconde ciò che il segno fa.

Esempio dal blocco già scritto — Marte in Bilancia in dodicesima: la Bilancia **rimanda** il conflitto, la dodicesima lo rende **invisibile a chi lo prova**. Due volte la stessa direzione, ed è questo che va detto: una collera che non solo non viene espressa, ma non viene nemmeno riconosciuta. Nessuno dei due strati separati lo dice.

### 5.1 Registro canonico

Voce della tradizione astrologica. Tecnica, in terza persona, senza indulgenza.

- usa il lessico classico: dignità, cadenza, settore, significatore, nemici occulti, *self-undoing*
- riporta le significazioni tradizionali della casa e del segno
- **deve essere astrologicamente corretto**: verificare dignità, angolarità (1/4/7/10), succedenza (2/5/8/11), cadenza (3/6/9/12), modalità e elemento del segno
- riferirsi a chi legge come «chi nasce con questa collocazione», mai «il nativo»
- chiude con il rimedio o l'uso alto che la tradizione prevede

### 5.2 Registro lilithiano

Voce del Canone del progetto. Seconda persona, diretta, senza consolazione facile.

- nomina il condizionamento, poi la sovranità che lo attraversa
- lessico: ombra, sovranità, permesso, soglia, iniziazione — **senza abusarne**
- non moralizza e non promette: descrive e indica l'atto concreto
- riconosce sempre il **dono** della configurazione, anche nelle collocazioni difficili
- può articolarsi in 2–3 paragrafi separati da `\n\n`

I due registri **non possono dire la stessa cosa con parole diverse**. Il canonico spiega il meccanismo, il lilithiano indica cosa farne.

---

## 6. Testi di riferimento

Questi blocchi definiscono il metro. Leggerli prima di scrivere.

### Segno — Marte in Bilancia

> Marte deve qui passare per il segno che più di ogni altro teme la rottura, e il risultato è un'energia che gira attorno allo scontro invece di attraversarlo. Ottieni per via diplomatica cose che altri ottengono per via frontale, e spesso ottieni di più: sai esattamente cosa dire perché l'altro conceda credendo di aver scelto. Il costo si accumula altrove. Le irritazioni non dette restano, si sedimentano per mesi in una cortesia impeccabile, e poi escono tutte insieme per un motivo sproporzionato, lasciando l'altro sinceramente stupito. Il tuo lavoro di una vita è imparare che un conflitto detto in tempo è più leggero di un conflitto rimandato.

### Dignità — Marte in Bilancia, Esilio

> Nel segno opposto al suo domicilio, Marte deve agire attraverso il criterio che gli è più estraneo: tenere conto dell'altro prima di muoversi. Ne nasce un'esitazione strutturale — il momento in cui dovresti affermare una tua ragione è esattamente il momento in cui ti chiedi se sia giusto farlo, e quella frazione di dubbio ti fa perdere l'occasione. Molte persone con questa collocazione arrivano alla mezza età con una lista di cose che non hanno detto. L'esilio però insegna ciò che il domicilio ignora: sai negoziare, sai far cedere l'altro senza umiliarlo, e nessun Marte ariano imparerà mai a farlo.

### Sintesi — registro canonico

> Marte è in esilio in Bilancia e si trova in casa dodicesima, cadente: doppia debilitazione, una per dignità e una per posizione. La tradizione legge questa configurazione come il significatore dell'azione privato sia dello strumento sia del terreno. Chi nasce con questa collocazione non vede arrivare l'offesa — la dodicesima è il luogo dei nemici occulti, di ciò che agisce contro di noi senza mostrarsi — e, quando la vede, il Marte bilancino non dispone della franchezza necessaria a rispondere. L'energia che non trova bersaglio esterno si volge contro il soggetto: gli autori antichi collegano questa posizione alle malattie da collera trattenuta, all'astenia senza causa organica e a quella che chiamavano self-undoing. Vi è però un uso alto, e la tradizione lo registra con chiarezza: Marte in dodicesima governa bene i luoghi di clausura — ospedali, istituti, comunità — e in Bilancia vi porta la capacità di mediare invece di comandare. Il rimedio classico è uno solo: rendere visibile il conflitto.

### Sintesi — registro lilithiano

> Due volte ti è stato insegnato a non esistere. La Bilancia ti ha insegnato a rimandare — mai il momento giusto, mai la persona giusta, mai il tono giusto. La dodicesima ha fatto il resto, e ti ha tolto perfino la consapevolezza di essere in collera. Il risultato è che porti dentro una rabbia che non hai mai incontrato: non la reprimi, non sai di averla. Esce di notte nei sogni, esce nel corpo come stanchezza che nessun esame spiega, esce nella cortesia impeccabile con cui tratti persone che non meriteresti di dover trattare affatto.
>
> Lilith non ti chiede aggressività. Ti chiede di smettere di credere che la tua mitezza sia una virtù, quando è soltanto un riflesso di sopravvivenza. La tua prima azione sovrana non sarà un grido: sarà lasciare che qualcuno resti scontento di te, e scoprire che non ne muori.
>
> C'è un dono che nessun Marte diretto possiede, e va detto perché è tuo: per gli altri sai combattere. Per chi non ha voce, per chi è nascosto, per chi sta dove nessuno guarda, diventi implacabile — e lo fai con un'eleganza che ottiene ciò che la forza non otterrebbe.

---

## 7. Anti-pattern

Da rifiutare esplicitamente. Sono i modi in cui questo lavoro fallisce.

| Anti-pattern | Esempio da non scrivere |
|---|---|
| **Frase di raccordo riutilizzata** | «In questa configurazione, l'energia opera…» ripetuta in più blocchi |
| **Il segno ridotto a un avverbio** | «…e trova piena espressione nei rapporti a due» innestato su un testo generico |
| **Registri che si parafrasano** | il lilithiano che ripete il canonico con più aggettivi |
| **Riassunto invece di sintesi** | «Come visto, il segno dà X e la casa dà Y» |
| **Oroscopo generico** | «Sei una persona determinata che a volte fatica a fermarsi» |
| **Promessa terapeutica** | «Questa posizione guarirà la tua ferita» — il calcolatore ha finalità culturali, mai cliniche |
| **Accumulo di lessico iniziatico** | tre «ombra», due «sovranità» e un «abisso» nello stesso paragrafo |
| **Astrologia inventata** | attribuire a una casa significazioni che la tradizione non le dà |

---

## 8. Modo di lavorare

### Lotti

Lavorare a **lotti da 12**, seguendo l'ordine in due fasi del §2.

- *Fase 1, corpo nuovo:* un lotto per i 12 segni, uno per le 12 case, uno per dignità e retrogrado. Tre lotti chiudono un corpo.
- *Fase 2, sintesi:* 12 per volta raggruppate per segno — `Aries|1` … `Aries|12`, poi `Taurus|1` … e così via. Dodici lotti chiudono un corpo.

Dopo ogni lotto:

```bash
npm test
```

**Non procedere al lotto successivo con la suite rossa.**

### Regola assoluta sui test

I test sono il contratto di qualità, non un ostacolo. **È vietato modificare `tests/corpi-dict.test.mjs` per far passare un testo.** Le uniche modifiche ammesse al file di test sono:

- aggiungere una voce a `GENDER_ALLOWED`, con commento che indica il sostantivo a cui la concordanza si riferisce
- aggiornare la tabella `DIGNITIES` **solo** se cambia quella in `calcolatore-engine.js`

Se un testo non passa, si riscrive il testo.

### File da non toccare

| File | Perché |
|---|---|
| `js/swiss-precision.mjs`, `js/calcolatore-swiss.mjs`, `js/vendor/**` | motore astronomico Swiss Ephemeris |
| `js/calcolatore-engine.js` | logica di calcolo e assemblaggio |
| `js/calcolatore-app.js`, `js/calcolatore-chart.js` | interfaccia e rendering |
| `tests/**` | salvo le due eccezioni sopra |

L'unico file da estendere è **`wordpress-child-theme/js/calcolatore-corpi-dict.js`**.

### Come vedere il risultato

```bash
node tools/preview-calculator.mjs
```

Apre il calcolatore su `http://127.0.0.1:4189` senza WordPress. Calcolare un tema che contenga la collocazione scritta e aprire la Lettura Lilithiana.

---

## 9. Definizione di fatto

**Fase 1 conclusa** quando tutti e venti i corpi hanno segni, case, dignità e retrogradazione, con la suite verde. È il traguardo che risolve il problema per tutti gli utenti, e va raggiunto prima di iniziare la fase 2.

Un corpo è completo quando:

- [ ] 12 segni, 12 case, tutte le dignità previste dalla tabella, retrogrado dove si applica
- [ ] ogni voce ha `title`, `text`/`canonico`+`lilithiano`, `sintesi`
- [ ] `npm test` verde
- [ ] nessuna sequenza di 6 parole condivisa fra blocchi
- [ ] nessuna forma marcata di genere rivolta a chi legge
- [ ] i testi rispettano le lunghezze di riferimento, non solo i minimi
- [ ] verificato nel browser su almeno un tema reale

Il progetto è completo quando tutti i corpi dell'elenco al §2 soddisfano questi criteri.

---

## 10. Dimensione del lavoro

| Voce | Quantità |
|---|---|
| Blocchi per corpo, esclusa la sintesi | 25–31 |
| Sintesi per corpo | 144 × 2 registri = 288 testi |
| Parole per corpo, sintesi inclusa | ~65.000 |
| Corpi in elenco | 20 |
| **Fase 1 — tutti i corpi, strati base** | ~19 corpi × 3 lotti ≈ **57 lotti**, ~60.000 parole |
| **Fase 2 — tutte le sintesi** | 20 corpi × 12 lotti ≈ **240 lotti**, ~1.200.000 parole |

La fase 2 è un ordine di grandezza più grande della fase 1 e vale la pena rivalutarne l'estensione una volta chiusa la prima: potrebbe avere senso limitarla ai corpi centrali (Sole, Luna, Marte, Venere, Lilith) invece di coprirli tutti. **Questa decisione spetta al committente, non all'agente:** al termine della fase 1, fermarsi e chiedere.

È un lavoro da eseguire per lotti su molte sessioni. **La qualità di un singolo blocco vale più della velocità di avanzamento**: un blocco generico non è un passo avanti, è debito che andrà riscritto. La suite di test esiste per rendere questo verificabile invece che opinabile.

---

*Documento di riferimento per l'estensione del dizionario. Le regole dei §4 e §7 non sono preferenze stilistiche: sono la ragione per cui questo lavoro viene fatto.*
