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

**Mars è completo: 144 su 144.** È il riferimento di stile, struttura e lunghezza per tutti gli altri.

Ordine deciso dal committente:

1. **Lilith** (Luna Nera media) — il cuore del Canone, ciò che distingue questo calcolatore da ogni altro
2. **TrueLilith** (osculatrice)
3. **Sun**, **Moon**
4. **Venus**, **Mercury**, **Jupiter**, **Saturn**
5. **Uranus**, **Neptune**, **Pluto**
6. **TrueNode**, **Chiron**
7. **Ceres**, **Pallas**, **Juno**, **Vesta**, **ParsFortunae**, **Vertex**

Le sintesi già esistenti non vanno riscritte: sono conformi ai controlli. Completare le combinazioni mancanti attorno a esse.

### Il registro canonico per i punti moderni

Marte ha due millenni di dottrina alle spalle, e il suo registro canonico poteva legittimamente richiamare la tradizione. **Lilith no.** La Luna Nera entra in astrologia nel Novecento: non esistono «autori antichi», «cronache medievali» o «maestri classici» che ne abbiano trattato.

Attribuirle una tradizione inesistente è l'anti-pattern «astrologia inventata» del PRD principale, ed è particolarmente grave qui: il sorgente del calcolatore è pubblico e la pagina dichiara la precisione delle Swiss Ephemeris. Una falsa genealogia dottrinaria intaccherebbe la credibilità di tutto il resto.

Per **Lilith, TrueLilith, Chiron, gli asteroidi, ParsFortunae e Vertex** il registro canonico deve quindi poggiare su ciò che esiste davvero:

- la **definizione astronomica** del punto — per Lilith, l'apogeo dell'orbita lunare, il luogo in cui la Luna è più lontana dalla Terra;
- la **logica simbolica** che ne discende, dichiarata come tale;
- il **significato consolidato** della casa e del segno, che quelli sì hanno una tradizione;
- la letteratura astrologica **moderna**, quando la si può nominare senza inventarla.

Dove la tradizione tace, lo si dice: è più autorevole di una citazione falsa.

### Le due Lune Nere vanno scritte in coppia

`Lilith` (media) e `TrueLilith` (osculatrice) occupano lo stesso segno e la stessa casa a pochi gradi di distanza: sono la coppia che più rischia di diventare una la parafrasi dell'altra. Scriverne 144 e poi, mesi dopo, le altre 144 garantisce che la seconda ricalchi la prima.

**Si lavora quindi alternando, segno per segno:** `Lilith/Aries|1..12`, poi `TrueLilith/Aries|1..12`, poi `Lilith/Taurus|1..12`, e così via. I lotti restano da dodici; ogni coppia viene scritta a poche ore di distanza, con il contrasto sotto gli occhi.

La differenza da rendere non è lessicale ma sostanziale:

| | |
|---|---|
| **Lilith media** | l'apogeo *calcolato*, che avanza con moto regolare: l'archetipo costante, la ferita strutturale, il fondo che non cambia |
| **Lilith vera** | l'apogeo *osculatore*, quello reale, che oscilla attorno al medio, retrograda e accelera: l'irruzione nell'istante, il lampo, la reazione imprevedibile |

Un controllo dedicato (`Luna Nera media e osculatrice non si parafrasano`) vieta fra i due corpi qualunque sequenza di **6 parole**, invece delle 8 previste fra corpi diversi.

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

**Il genere cambia da un registro all'altro.** Il calcolatore chiede ora il sesso e per gli uomini non esegue il calcolo: il Canone maschile sarà un'opera distinta, con testi propri. Ma questo riguarda **soltanto il responso lilithiano**. Tre regole diverse, verificate da due controlli separati:

| Registro | Regola |
|---|---|
| **`lilithiano`** | Si rivolge a **una lettrice**. Il femminile è corretto (*ti hanno convinta*, *sei cresciuta*, *da sola*), il neutro è ammesso e spesso più elegante (*ti è stato insegnato*), il **maschile è l'errore** (*sei attratto*, *restare solo*, *te stesso*). Qui «sorellanza», «ciascuna», «alleata» sono lessico legittimo del Canone. |
| **Segni, case, dignità, retrogradi** | Restano **neutri**: sono la parte descrittiva del calcolatore e non presuppongono nulla. Qui sono errore *sia* il maschile *sia* il femminile rivolti a chi legge. |
| **`canonico`** | Terza persona su «chi nasce con questa collocazione»: il maschile generico è la forma corretta della lingua. Escluso da entrambi i controlli. |

La concordanza che cade su un sostantivo del testo non è mai un errore — *«la stabilità che da sola non possiede»* concorda con la Luna, *«l'avversario si è indebolito da solo»* con l'avversario. Se un controllo la segnala, si aggiunge alla lista di eccezioni **con il commento che indica il sostantivo**.

Valgono immutate: nessuna sequenza di 6 parole ripetuta dentro lo stesso corpo; nessuna chiusa di 4 parole ripetuta nello strato; `canonico` e `lilithiano` almeno 80 parole ciascuno e mai l'uno parafrasi dell'altro.

---

## 6. Regola assoluta sui test

Invariata e senza eccezioni: **se un testo non passa, si riscrive il testo.**

Vietato alzare soglie, alzare il tetto degli incipit, permettere chiuse ripetute, aggiungere un ruolo umano a `THING_NOUNS`, ampliare `GENDER_ALLOWED` per una concordanza che riguarda chi legge, marcare un test `skip` o `todo`, cancellare un controllo.

Le uniche modifiche ammesse restano:

- aggiungere a `THING_NOUNS` un nome che **denota un oggetto e non una persona**, con un commento che lo giustifichi;
- aggiungere a `GENDER_ALLOWED` o `FEMININE_ALLOWED` una concordanza che cade su un sostantivo del testo, **con il commento che indica quale**.

Se un controllo fallisce per una ragione che non è un difetto del testo — per esempio una sentinella che interroga una combinazione nel frattempo scritta — **non correggerlo da solo: segnalalo e fermati.** La sentinella sulla degradazione degli strati cerca ormai da sé una combinazione mancante e non va più aggiornata a mano.

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
