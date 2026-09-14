/**
 * Figlie di Lilith — Dizionario Esegetico dei Corpi Celesti (Canone 2026)
 *
 * Matrice testuale per la lettura a strati di ogni collocazione:
 *   segno    → come quella funzione è fatta in questa persona
 *   casa     → dove accade, con chi, in quale settore di vita
 *   dignità  → che rapporto ha la persona con quella propria parte
 *   moto     → funzione rivolta all'esterno o all'interno (retrogradazione)
 *
 * Ogni voce è scritta per la sua combinazione specifica: nessun testo è
 * ottenuto incastrando un avverbio dentro una frase generica, e nessuna
 * formula di raccordo viene riusata fra voci diverse. È lo stesso criterio
 * del dizionario degli aspetti (calcolatore-aspects-dict.js).
 *
 * Struttura di una voce:
 *   title   — titolo della sezione, proprio di quella combinazione
 *   text    — il corpo della lettura, quando il corpo celeste è rilevante
 *   sintesi — una riga sola, usata quando il corpo non è in primo piano
 *
 * Le dignità sono indicizzate per segno, non per nome della dignità: il
 * domicilio ariano di Marte e quello scorpionico non dicono la stessa cosa.
 */

(function (window) {
  'use strict';

  const BODIES = {};

// Bozza di BODIES.Sun per calcolatore-corpi-dict.js
  // =========================================================================
  // SOLE — il nucleo dell'identità, la volontà solare, il principio cosciente
  // e la sovranità del centro vitale.
  // =========================================================================
  BODIES.Sun = {
  signs: {
    Aries: {
      title: 'Sole in Ariete — Il Fuoco dell’Atto Primario',
      text: "L'identità qui si accende solo nel momento in cui c'è un territorio da inaugurare o una barriera da infrangere. Il senso di esistere non precede l'azione ma ne scaturisce: finché rimani nell'attesa o nella riflessione astratta, percepisci un calo di vitalità che scambi per noia, mentre è soltanto assenza di combustione. Ti riconosci autentico quando prendi l'iniziativa senza chiedere conferme. La difficoltà strutturale di questa posizione solare risiede nella continuità: quando la fase d'assalto iniziale si conclude e comincia la gestione quotidiana, l'interesse cala bruscamente e subentra il desiderio di ricominciare altrove con una nuova sfida.",
      sintesi: "L'identità si afferma nell'apertura della pista; la difficoltà sorge quando bisogna conservare."
    },
    Taurus: {
      title: 'Sole in Toro — La Luce Radicata nella Materia',
      text: "La coscienza solare prende corpo attraverso la costruzione tangibile, il tempo organico e il contatto diretto con il reale. Non hai fretta di dimostrare chi sei con dichiarazioni d'intenti: preferisci lasciare che parlino le cose fatte, i risultati che restano nel tempo e la solidità del terreno edificato. C'è un senso del valore personale che non cerca l'approvazione immediata ma la stabilità dei ritmi naturali. Il rischio più insidioso è confondere il proprio valore con la difesa a oltranza di ciò che si possiede, irrigidendosi in abitudini che mantengono la sicurezza materiale a spese dell'evoluzione interiore.",
      sintesi: "Consapevolezza che cresce per accumulo e durata; il limite è scambiare la forma per la vita."
    },
    Gemini: {
      title: 'Sole in Gemelli — L’Identità Come Ponte e Polifonia',
      text: "Il principio vitale rifiuta la definizione monolitica e si articola nella molteplicità dei collegamenti. Ti senti vivo dove le idee circolano, dove è possibile cambiare angolatura e dove il linguaggio permette di unire mondi tra loro distanti. Non c'è un solo centro ma una rete in perenne riorganizzazione, capace di registrare stimoli divergenti senza lasciarsi vincolare a un ruolo fisso. Il prezzo di questa agilità è la dispersione: l'esplorazione brillante della superficie sostituisce spesso l'immersione profonda, lasciando una sensazione di vuoto quando si spegne il rumore della conversazione.",
      sintesi: "Vitalità mobile che unisce poli distanti; il compito è trovare un perno che regga la varietà."
    },
    Cancer: {
      title: 'Sole in Cancro — Il Centro Custodito nel Grembo',
      text: "La luce solare splende verso l'interno, illuminando la memoria, i legami d'origine e il bisogno profondo di protezione. L'identità si forgia nella capacità di nutrire, di sentire prima ancora di formulare un pensiero e di creare un rifugio per chi viene accolto nella tua cerchia ristretta. Sei consapevole della tua forza soltanto quando c'è qualcosa di vulnerabile da salvaguardare dal disordine esterno. La trappola di questa collocazione è il ripiegamento difensivo: trattare il mondo come una minaccia costante e ritirarsi in una corazza emotiva che impedisce l'esposizione necessaria alla maturità.",
      sintesi: "Coscienza radicata nella protezione e nell'origine; il pericolo è chiudersi per timore della perdita."
    },
    Leo: {
      title: 'Sole in Leone — L’Autorità Radiante del Cuore',
      text: "Il Sole occupa qui la propria dimora naturale: non ha bisogno di cercare altrove la legittimità per esistere. C'è una dignità innata nel portamento, una generosità calorosa e una fiducia spontanea nel proprio diritto di esprimersi e di occupare il centro della scena. Non cerchi il potere per controllo ma per magnanimità, perché governare bene fa fiorire l'intero ambiente circostante. Il punto cieco coincide con l'orgoglio: la paura della mediocrità e dell'indifferenza altrui può trasformare la regalità naturale in una pretesa di ammirazione continua, che soffoca il dialogo paritario.",
      sintesi: "Presenza solare sovrana e magnanima; la caduta arriva quando l'ego dipende dal plauso altrui."
    },
    Virgo: {
      title: 'Sole in Vergine — La Vocazione della Forma Esatta',
      text: "Il centro dell'Io non si impone con la grandezza del gesto, ma con la perfezione della funzione. Ti realizzi nel rendere utile ciò che era caotico, nel depurare il superfluo e nel padroneggiare una disciplina che mette ordine nella complessità della vita quotidiana. C'è una modestia severa ma potentissima: vali per ciò che sai riparare, comprendere ed eseguire a regola d'arte. L'ombra di questa posizione solare è il perfezionismo corrosivo: una voce interna che non dichiara mai terminata l'opera e che trasforma l'autocritica in una paralisi preventiva.",
      sintesi: "Realizzazione attraverso la cura del dettaglio e l'utilità; l'insidia è il giudizio che paralizza."
    },
    Libra: {
      title: 'Sole in Bilancia — La Ricerca dello Specchio Equanime',
      text: "L'identità solare fatica a concepirsi in isolamento: ha bisogno del confronto, della relazione e del riconoscimento dell'altro per mettere a fuoco i propri contorni. Cerchi la bellezza, l'armonia formale e la giustizia come condizioni indispensabili per poter agire nel mondo con serenità. La capacità di comprendere punti di vista opposti ti rende un mediatore naturale eccezionale. Il dilemma centrale sorge quando la ricerca della concordia a ogni costo cancella la tua vera volontà: smussare ogni angolo per non scontentare nessuno finisce per dissolvere la sovranità personale.",
      sintesi: "L'Io si scopre nella relazione e nell'armonia; il rischio è delegare all'altro la propria volontà."
    },
    Scorpio: {
      title: 'Sole in Scorpione — La Coscienza dell’Invisibile e della Crisi',
      text: "La volontà qui non si accontenta delle apparenze solari o delle verità di facciata: cerca la radice nascosta, il movente inconfessabile e la verità che tutti gli altri preferiscono tacere. L'identità si tempra nelle prove decisive, nelle perdite e nelle rinascite radicali che azzerano il superfluo per rivelare la sostanza incorruttibile. Non temi l'oscurità ma la superficialità. Il pericolo strutturale di questo segno solare è il controllo difensivo: credere che mostrare una debolezza coincida con la distruzione, trasformando la vita interiore in una fortezza inaccessibile governata dal sospetto.",
      sintesi: "Lucidità che penetra le profondità e rinasce dalle crisi; il limite è il controllo ossessivo."
    },
    Sagittarius: {
      title: 'Sole in Sagittario — L’Espansione Verso il Significato Lontano',
      text: "Il senso dell'esistenza coincide con la ricerca di un orizzonte sempre più vasto: una filosofia, un viaggio geografico, un sistema etico capace di dare senso al cammino umano. Hai un ottimismo vitale contagioso e una fiducia spontanea nelle possibilità del futuro che solleva chiunque ti stia accanto. Ti mobiliti per ciò che eleva lo spirito e supera i confini angusti del consueto. Il limite di questa luce è l'insofferenza verso il limite concreto: il rifiuto di fare i conti con la prosaicità del quotidiano e la presunzione di possedere la verità definitiva.",
      sintesi: "Spinta verso la conoscenza e l'ampliamento degli orizzonti; l'ombra è fuggire il limite terreno."
    },
    Capricorn: {
      title: 'Sole in Capricorno — La Sovranità del Tempo e della Vetta',
      text: "L'identità non cerca l'esplosione precoce ma la consacrazione che resiste agli inverni dell'esistenza. Sei consapevole fin da giovane che l'autorevolezza autentica si guadagna con la solitudine della salita, la disciplina silenziosa e l'assunzione totale di responsabilità. Non ti spaventa la fatica prolungata se porta a una meta duratura. La qualità della tua luce è essenziale, asciutta, priva di fronzoli decorativi. La trappola è la pietrificazione affettiva: sacrificare il calore umano e la tenerezza sull'altare di un dovere inflessibile, rimanendo in cima alla montagna senza nessuno con cui dialogare.",
      sintesi: "Autorità che matura nella perseveranza; il rischio è costruire una corazza che isola dal mondo."
    },
    Aquarius: {
      title: 'Sole in Acquario — La Luce Eretica del Progresso',
      text: "Il principio solare si individualizza prendendo le distanze dall'omologazione tribale e dalle consuetudini ereditate. Ti riconosci nella visione di un futuro alternativo, nella difesa dell'indipendenza di pensiero e nella fratellanza basata su ideali condivisi piuttosto che su vincoli di sangue. C'è una lucidità intellettuale impersonale che sa cogliere le dinamiche collettive prima degli altri. L'attrito interiore nasce dalla freddezza: la tendenza a teorizzare i sentimenti anziché viverli corporalmente, sentendosi estraneo al consesso umano proprio mentre si dichiara di volerlo servire.",
      sintesi: "Individualità orientata all'innovazione e alla libertà; l'ostacolo è il distacco emotivo asettico."
    },
    Pisces: {
      title: 'Sole in Pesci — Il Centro Sommerso nell’Oceano',
      text: "Il confine dell'Io è poroso, permeabile all'inconscio collettivo e ai dolori e alle speranze del mondo intero. La tua consapevolezza non procede per affermazione perentoria ma per risonanza emotiva, intuizione poetica e capacità di sacrificio per un ideale più vasto. Possiedi una compassione che non giudica e che sa trovare la bellezza dove altri vedono soltanto il fallimento. Il rischio principale è la dissoluzione identitaria: perdersi nei bisogni altrui, fuggire la responsabilità pratica rifugiandosi nell'illusione e diventare spettatore passivo del proprio destino.",
      sintesi: "Sensibilità empatica universale priva di rigide barriere; il pericolo è smarrire il senso del limite personale."
    }
  },

  houses: {
    1: {
      title: 'Sole in Prima Casa — La Presenza Solare alla Soglia',
      text: "La volontà e la visibilità coincidono con l'istante in cui varchi la porta: il tuo impatto sul mondo è immediato, tangibile e impossibile da ignorare. Non puoi nasconderti dietro a un ruolo secondario, perché la tua figura attira naturalmente l'attenzione e chiede di assumere una posizione definita. C'è una vitalità fisica e una spinta all'autodeterminazione che ti impongono di guidare il tuo percorso senza attendere il consenso altrui. La sfida sta nel non confondere l'intera realtà circostante con l'estensione del proprio riflesso, imparando a concedere spazio alla luce di chi ti sta di fronte.",
      sintesi: "Presenza visibile che definisce immediatamente il campo; la lezione è non accentrare ogni cosa su di sé."
    },
    2: {
      title: 'Sole in Seconda Casa — Il Valore Convertito in Sostanza',
      text: "L'affermazione dell'identità si gioca sul terreno concreto delle risorse, del denaro e della stima che accordi alle tue capacità pratiche. Esisti attraverso ciò che sai generare, custodire e consolidare con le tue forze. Non cerchi la ricchezza per ostentazione fine a se stessa, ma come prova inconfutabile della tua autonomia vitale nel mondo materiale. La tentazione da sorvegliare è ancorare il valore del tuo essere unicamente al bilancio economico o all'accumulo di certezze esteriori, vivendo ogni fluttuazione materiale come una minaccia alla tua integrità personale.",
      sintesi: "Identità saldata al valore materiale e all'autonomia; il rischio è misurare la dignità sul possesso."
    },
    3: {
      title: 'Sole in Terza Casa — La Parola Che Illumina l’Ambiente',
      text: "Il principio solare si esprime nella curiosità instancabile, nella trasmissione delle informazioni e nel governo intelligente dell'ambiente prossimo. Ti realizzi come testimone vigile, divulgatore brillante o mente che collega i frammenti sparsi della realtà quotidiana. Hai bisogno di uno scambio continuo con fratelli, colleghi e compagni di strada per verificare la validità delle tue intuizioni. Il limite di questa collocazione è la frammentazione intellettuale: disperdere l'energia vitale in mille stimoli effimeri senza mai concedersi il tempo di sviluppare una visione profonda.",
      sintesi: "Intelligenza solare applicata alla comunicazione; il compito è non sacrificare la profondità alla rapidità."
    },
    4: {
      title: 'Sole in Quarta Casa — Il Fuoco Nascosto Nelle Radici',
      text: "Il centro di gravità della tua esistenza si colloca nella profondità del focolare privato, nella storia ancestrale e nella ricerca di un fondamento interiore inattaccabile. Non cerchi la gloria nei palcoscenici pubblici, ma nella costruzione di un tempio domestico dove la tua sovranità sia autentica e protetta. C'è una connessione viscerale con il lignaggio familiare che richiede di essere onorata o trasmutata. La difficoltà consiste nel non rimanere prigioniero del passato, trovando il coraggio di uscire dalle mura protettive per portare la propria luce nel mondo aperto.",
      sintesi: "Sovranità radicata nell'intimità e nelle origini; la sfida è non farsi rinchiudere dal proprio rifugio."
    },
    5: {
      title: 'Sole in Quinta Casa — L’Irradiazione Creativa e il Gioco della Gloria',
      text: "Questa è la sede in cui la luce solare si fa celebrazione della vitalità pura, della creazione artistica e della gioia di generare nuove forme. Ti realizzi pienamente quando puoi creare qualcosa che porti la tua impronta inconfondibile, sia essa un'opera, un'avventura amorosa o un progetto vissuto con passione ludica. I tuoi figli o le tue creazioni ricevono un calore generoso e stimolante. L'ombra di questa posizione è il dramma egotico: l'incapacità di vivere senza applausi e la tendenza a trasformare ogni affetto in una recita in cui devi recitare la parte principale.",
      sintesi: "Vitalità espressiva che fiorisce nella creatività; l'insidia è pretendere il ruolo di protagonista assoluto."
    },
    6: {
      title: 'Sole in Sesta Casa — Il Servizio Maestro del Quotidiano',
      text: "La dignità solare impara a misurarsi con il limite della materia, la fatica quotidiana e la maestria del mestiere. Non cerchi scorciatoie clamorose: la tua autorità si fonda sull'efficienza impeccabile, sulla competenza tecnica e sulla capacità di risolvere i problemi concreti che tengono in piedi il mondo comune. C'è un'etica del dovere che ti nobilita, ma che può scivolare nell'autosacrificio logorante. La lezione fondamentale è ricordare che il lavoro serve a nobilitare l'essere umano e non a consumarne l'anima in un perfezionismo sterile che ignora la gioia.",
      sintesi: "Realizzazione attraverso la cura del lavoro e l'efficienza; l'errore è farsi divorare dall'ipercritica."
    },
    7: {
      title: 'Sole in Settima Casa — La Sovranità Riflessa nel Patto',
      text: "Il tuo cammino di auto-scoperta passa inevitabilmente attraverso l'incontro con l'altro, il matrimonio, le alleanze decisive e il confronto dialettico. Non puoi conoscerti fino in fondo senza misurarti con uno specchio paritario che ti interroghi e ti stimoli a precisare la tua posizione. Cerchi compagni di grande statura morale e intellettuale con cui condividere la vita. Il nodo irrisolto di questa casa risiede nella delega identitaria: rischiare di farsi oscurare dalla personalità del partner o, al contrario, ingaggiare una competizione sotterranea per il comando della relazione.",
      sintesi: "Consapevolezza che cresce nello specchio relazionale; la trappola è cedere la propria sovranità al partner."
    },
    8: {
      title: 'Sole in Ottava Casa — La Luce Che Scende Negli Abissi',
      text: "La coscienza solare è chiamata a confrontarsi con i territori della fine, della trasformazione radicale e della gestione del potere condiviso. Non puoi vivere in superficie: ti attirano i misteri psicologici, le eredità karmiche e le crisi esistenziali che costringono a rinascere a un livello superiore di consapevolezza. Possiedi una fermezza magnetica che gli altri avvertono nei momenti di tempesta. Il punto di massimo attrito è l'ossessione per il controllo: la paura della resa intima e il sospetto che aprirsi all'altro comporti la distruzione della propria autonomia.",
      sintesi: "Identità forgiata nella metamorfosi e nel potere profondo; il limite è il terrore di perdere il controllo."
    },
    9: {
      title: 'Sole in Nona Casa — La Cerca della Verità Superiore',
      text: "La realizzazione del principio solare si compie nella dilatazione degli orizzonti mentali, etici e geografici. Hai bisogno di aderire a un disegno grandioso, a una visione spirituale o a un sapere cosmopolita per sentire che la tua vita possiede una direzione feconda. Insegni con naturalezza, trasmettendo entusiasmo e di infondere coraggio nelle anime smarrite. Il pericolo specifico è il dogmatismo morale: confondere la propria personale prospettiva con una legge universale infallibile, giudicando dall'alto chi cammina lungo sentieri diversi.",
      sintesi: "Coscienza orientata alla visione e alla filosofia; l'ombra è l'arroganza di ritenersi depositario del vero."
    },
    10: {
      title: 'Sole in Decima Casa — Il Trono alla Vista del Mondo',
      text: "Il Sole culmina nel punto più alto del cielo, proiettando la volontà nella sfera pubblica, nella professione e nella conquista dell'autorevolezza sociale. Hai dentro la vocazione ad assumerti incarichi di peso, a guidare con l'esempio e a costruire un'eredità tangibile di cui la comunità debba tenere conto. Non temi il giudizio dei pari perché rispondi prima di tutto ai tuoi standard elevatissimi. L'insidia di questa visibilità è l'aridità del successo: scambiare il riconoscimento istituzionale per la pienezza del cuore, scoprendosi vuoti quando si spegne la luce della ribalta.",
      sintesi: "Vocazione al comando pubblico e all'eccellenza; la trappola è sacrificare l'interiorità all'immagine sociale."
    },
    11: {
      title: 'Sole in Undicesima Casa — La Luce Consacrata al Collettivo',
      text: "L'energia solare non si chiude nella gloria privata, ma si mette a disposizione dei grandi progetti comunitari, delle associazioni d'avanguardia e delle amicizie elettive. Ti realizzi come catalizzatore di talenti, colui che sa coordinare individui liberi verso un obiettivo comune che anticipa il progresso civile. Credi profondamente nel valore della lealtà tra pari. La difficoltà risiede nel mantenere la propria unicità senza perdersi nel coro: rischiare di diventare il portavoce impersonale di una fazione o di una dottrina sociale fino a dimenticare i bisogni della propria anima.",
      sintesi: "Guida illuminata all'interno del gruppo; il rischio è subordinare la propria verità al consenso dell'assemblea."
    },
    12: {
      title: 'Sole in Dodicesima Casa — La Sovranità del Chiostro Segreto',
      text: "Il Sole dimora nell'ultimo settore zodiacale, dove la luce terrena si dissolve per ricongiungersi con la fonte invisibile della coscienza cosmica. La tua forza vitale non opera nell'esibizione mondana: preferisce il ritiro fecondo, l'indagine mistica, la cura discreta di chi soffre e la creazione compiuta nel silenzio. C'è una regalità nascosta che non chiede titoli esteriori. Il dramma interiore si manifesta nella sensazione precoce di invisibilità: credere di non avere il permesso di esistere alla luce del giorno, scivolando nell'isolamento o nell'autosabotaggio difensivo.",
      sintesi: "Forza solare custodita nel silenzio interiore; la liberazione avviene quando accetti il diritto di essere visto."
    }
  },

  dignities: {
    Leo: {
      kind: 'Domicilio',
      title: 'In Domicilio — La Luce Che Non Chiede Scusa',
      text: "Il Sole in Leone si trova nella propria reggia: qui l'autorità non è un traguardo faticosamente conquistato o una concessione altrui, ma lo stato originario della coscienza. Non hai bisogno di gridare per farti ascoltare né di spiegare perché occupi lo spazio che ti compete: la tua presenza si irradia spontaneamente, scaldando chi sa starti vicino senza competere. È la dignità della sovranità magnanima, che governa con naturalezza perché non teme di essere detronizzata. Il pericolo insito in questa pienezza è l'incapacità di comprendere l'ombra: ritenere inconcepibile che qualcuno possa desiderare una strada diversa dal tuo splendore, trasformando la regalità in una gabbia dorata che non tollera repliche.",
      sintesi: "Coscienza solare nel suo tempio naturale: autorità che si irradia senza dover combattere."
    },
    Aries: {
      kind: 'Esaltazione',
      title: 'In Esaltazione — Il Dardo Solare Che Apre l’Anno',
      text: "L'esaltazione del Sole nell'Ariete rappresenta l'apice della forza ascendente, la vittoria della luce sull'inverno ancestrale e l'inizio irremovibile di ogni ciclo vivente. C'è una potenza d'intento che non conosce esitazioni: quando ti proponi un traguardo, la determinazione è totale e disposta a bruciare ogni ostacolo sul percorso. È la collocazione dell'eroe pionieristico che vince con lo slancio del primo colpo e ispira con l'esempio audace. L'altra faccia della medaglia è l'impazienza distruttiva: l'incapacità di sopportare i tempi lunghi di maturazione, l'intolleranza per la fragilità altrui e la tendenza a scambiare la violenza del gesto per grandezza d'animo.",
      sintesi: "Trionfo della volontà pionieristica; il pericolo è bruciare il terreno invece di fecondarlo."
    },
    Aquarius: {
      kind: 'Esilio',
      title: 'In Esilio — Il Sovrano Che Rifiuta la Corona Unipersonale',
      text: "Nel segno opposto al Leone, il Sole si trova a dover operare attraverso il principio che gli è più ostico: distribuire l'autorità alla pari e rifiutare il privilegio individuale. Ne deriva una frattura tra il desiderio inconscio di emergere e l'ideale razionale di eguaglianza, che porta spesso a sabotare la propria visibilità per paura di sembrare autoritari. Ti senti spesso un esule nel consorzio umano, un osservatore lucido ma distante. Tuttavia, l'esilio insegna ciò che il domicilio ignora: scopri che la vera sovranità non consiste nell'essere venerati da una corte servile, ma nell'essere una mente libera che sa liberare anche gli altri.",
      sintesi: "Autorità decentrata nel collettivo; impari che la vera regalità rende liberi senza chiedere vassalli."
    },
    Libra: {
      kind: 'Caduta',
      title: 'In Caduta — La Luce Ceduta per Evitare la Guerra',
      text: "La caduta del Sole nella Bilancia segnala una condizione in cui la volontà individuale si inchina costantemente alla necessità di preservare l'equilibrio con l'altro. La tua prima reazione davanti a una scelta non è chiederti cosa desideri, ma cosa gli altri si aspettano che tu sia per non turbare l'armonia. Questo genera una debolezza energetica visibile, in cui la decisione viene continuamente rinviata e il prezzo da pagare è la perdita del centro solare interiore. Il compito di questa posizione è arduo e altissimo: comprendere che la vera pace non nasce dalla sottomissione cortese, ma dal coraggio di sostenere il proprio peso anche quando crea una temporanea discordia.",
      sintesi: "Volontà che rischia di perdersi nella compiacenza; il riscatto è affermarsi senza pretendere l'assenso unanime."
    }
  },

  combinations: {
    'Aries|1': {
        title: "Sole in Ariete in Prima Casa",
        canonico: "Il Sole trova la propria esaltazione nell'Ariete e risiede nel primo settore, angolo orientale e luogo del sorgere: la vitalità primordiale dispone qui del massimo coefficiente di irradiazione fisica e visibilità individuale. Nel canone classico questa segnatura esprime il principio del comando indomito, dell'iniziativa ardita che apre sentieri dove prima non vi era passaggio alcuno. Chi possiede tale impronta affronta l'esistenza con un piglio fiero e un'audacia contagiosa, trascinando il seguito attraverso la pura forza del proprio esempio. I rischi documentati dalla tradizione riguardano la fretta cieca, il rifiuto sdegnoso di ogni critica e la consunzione precoce delle energie dovuta a un perenne stato d'attacco. La spada che si abbatte alla cieca rischia di spezzarsi contro la prima roccia: la regalità del primo grado solare si compie quando la fiamma impara a governare il proprio calore, illuminando sentieri montani senza appiccare il fuoco all'intera vallata.",
        lilithiano: "Non hai mai saputo chiedere permesso prima di esistere. Nelle aule d'asilo e nei pranzi di famiglia ogni tuo moto prorompente veniva bollato come arroganza da spegnere con la mortificazione. Ti sei presa urti, rimproveri e rifiuti da chi voleva insegnarti la discrezione, ma piegare la testa ti provocava una nausea fisica.\n\nLilith non doma la tua irruenza: ti ordina di smettere di usarla come scudo contro la paura. Quando attacchi per abitudine, non stai dimostrando forza: stai solo confessando il terrore di essere sorpresa disarmata. La tua iniziazione comincia nel momento in cui scopri che puoi fermarti, guardare l'avversario negli occhi e non scagliare alcun dardo. La maestria risiede nel sapere quanto vali senza aver bisogno di misurarlo sul numero delle teste abbattute.\n\nPossiedi una luce sorgiva che risveglia chiunque ti stia vicino: quando entri in una stanza la rassegnazione arretra. Sei una sorgente viva di coraggio per chi non osa nemmeno respirare a fondo. Riconoscere la dignità del proprio fuoco significa smettere di chiedere perdono per l'ombra che proietta: chi cammina a testa alta apre varchi dove prima esistevano soltanto recinti spinati.",
        sintesi: "Sole esaltato all'Ascendente: slancio pionieristico fulmineo che vince la tentazione dell'assalto continuo."
      },
    'Leo|10': {
        title: "Sole in Leone in Decima Casa",
        canonico: "Nel segno del proprio domicilio diurno e sulla vetta del cielo, il Sole tocca l'apice della visibilità sociale e della dignità regale. La tradizione individua in questa configurazione il contrassegno delle grandi figure pubbliche, destinate a farsi carico della guida di una comunità attraverso la generosità del comando e la nobiltà del tratto. La persona esercita un magnetismo naturale che attira onori, prebende e cariche di vertice, sentendosi a proprio agio nei palazzi delle istituzioni o sui palcoscenici del potere. I pericoli descritti nei testi antichi toccano la superbia dinastica, l'intolleranza verso qualsiasi critica e la caduta rovinosa dovuta a un senso d'infallibilità che ignora i mutamenti storici. La storia imperiale abbonda di palazzi crollati sul capo di sovrani accecati dal proprio riflesso: la corona resiste ai secoli solo quando chi la indossa accetta di farsi baluardo imparziale per l'intero popolo.",
        lilithiano: "Impari a salire sul podio prima ancora di conoscere i tuoi desideri intimi. L'ambiente familiare pretendeva un'eccellenza decorosa e obbediente, pronta a brillare solo per lustro dei superiori e mai per vocazione personale. Custodisci l'ammirazione collettiva, pagando il tributo di un riserbo forzato che non ammetteva mai né il dubbio né la stanchezza.\n\nLilith ti aspetta proprio lì dove nessuno osa contestarti per chiederti: chi sei quando le luci si spengono e la corte si disperde? Il trono su cui ti hanno messa rischia di essere un patibolo dorato. L'atto di disobbedienza più sacro della tua vita non consisterà nel vincere una nuova competizione, ma nel mostrarti imperfetta senza chiedere scusa a nessuno, mandando in frantumi il simulacro della perfezione dinastica.\n\nLa tua regalità è autentica quando smette di mendicare l'applauso dei sudditi. Sai donare calore con una larghezza d'animo che incanta e guarisce le meschinità altrui. Una presenza veramente sovrana non ha bisogno di cortigiani prostrati: la sua luce riscalda la terra senza pretendere alcuna sottomissione feudale.",
        sintesi: "Sole al Medio Cielo in Leone: regalità manifesta che deve spogliarsi della vanità per diventare autorità feconda."
      },
    'Aquarius|11': {
        title: "Sole in Acquario in Undicesima Casa",
        canonico: "Il luminare diurno si trova nel segno del proprio esilio ma gode della collocazione propizia nell'undicesima casa, dimora del Buon Demone e dei consessi di pari. Qui l'autorità non si esercita tramite il fasto dell'individuo, ma attraverso la fondazione di coalizioni, leghe ideali e movimenti riformatori. La dottrina attribuisce a questa figura l'arte rara di unire personalità differenti attorno a un fine comune che oltrepassa i confini delle consorterie familiari. I difetti consueti contemplano il fanatismo utopico, l'astrattezza dogmatica e una freddezza affettiva che predilige l'umanità teorica rispetto all'individuo concreto in carne e ossa. Il paradosso insolubile dell'avanguardia rimane la solitudine del precursore: chi corre dieci passi avanti alla colonna deve accettare la polvere del tragitto senza maledire la lentezza di chi marcia nelle retrovie.",
        lilithiano: "I tuoi occhi vedono sempre vent'anni più in là di quelli di chi ti circonda. Il gruppo dei pari e gli educatori guardavano con diffidenza i tuoi interessi bizzarri, tentando di normalizzare ogni deviazione dalla media statistica. Hai cercato rifugio nelle grandi utopie e nei circoli intellettuali, credendo che la libertà consistesse nel non appartenere mai del tutto a nessun consorzio umano.\n\nLilith smaschera la tua fuga nell'iperuranio: non puoi redimere il mondo se rifiuti di toccarne la carne e le contraddizioni. La solitudine da esule disincantata che coltivi con tanta cura è solo un modo per non farti sporcare dalla vita. La tua ribellione acquista peso reale solo quando scendi nel fango insieme a chi soffre, accettando la lentezza degli esseri umani senza liquidarli con fastidio intellettuale.\n\nLa tua intelligenza sa disarmare i dogmi secolari con una limpidezza da oracolo laico. Non hai bisogno di comandare per farti seguire: le tue visioni mostrano sentieri così ovvi che nessuno può più far finta di non averli visti. La vera rottura epocale si attua nel silenzio delle coscienze sveglie: un pensiero privo di padroni dischiude orizzonti di giustizia che nessuna dogana ideologica potrà mai sbarrare.",
        sintesi: "Sole esiliato in casa undicesima: riforma dei legami di gruppo che supera l'astrattezza per fare corpo comune."
      },
    'Libra|7': {
        title: "Sole in Bilancia in Settima Casa",
        canonico: "Caduta solare nella Bilancia associata alla presenza nella settima casa, luogo dell'Altro e del tramonto: il principio dell'Io cede il primato alla geometria del patto e alla ricerca costante della misura relazionale. La tradizione legge questa configurazione come la vocazione suprema alla diplomazia, all'arbitrato giuridico e alla celebrazione di nozze di alto rango sociale. L'individuo rifugge la solitudine e acquisisce consapevolezza di sé specchiandosi negli sguardi altrui, coltivando un'eleganza comportamentale priva di asperità. Le insidie classiche si concentrano sull'indecisione cronica, sul timore di scontentare i contraenti e sulla tendenza a sacrificare la verità in nome di una pacificazione fittizia. Resta l'interrogativo cruciale su cosa rimanga dell'intesa quando la concordia viene comprata al prezzo della diserzione interiore: un salotto impeccabile edificato sopra un cimitero di verità taciute.",
        lilithiano: "Hai fatto dell'armonia altrui la tua prigione quotidiana. Il perbenismo borghese esigeva sorrisi a comando e una perpetua mediazione, convincendoti che esprimere disaccordo equivalesse a un delitto di lesa maestà. Hai recitato la parte della persona ragionevole fino a dimenticare quale sapore avesse la tua collera legittima.\n\nLilith spezza la tua bilancia truccata: un patto che esige il silenzio sulla tua verità non è un'alleanza, è una resa incondizionata. Quando eviti la discussione per paura di rimanere sola, stai barattando la tua anima per un po' di finta quiete. La tua sovranità relazionale inizia nel momento in cui sostieni uno sguardo contrario senza abbassare gli occhi e scopri che la tua dignità resta integra anche nel mezzo della discordia.\n\nPossiedi una finezza psicologica magistrale: sai cogliere la proporzione esatta dei rapporti umani con la precisione di un accordatore di strumenti rari. Quando non mendichi l'approvazione del partner, la tua voce acquista un peso sovrano che rimette ordine tra le fazioni. La vera bellezza dell'incontro sboccia solo tra due persone che non hanno paura di mostrare le proprie ferite.",
        sintesi: "Sole in caduta al Discendente: diplomazia sopraffina che ritrova vigore quando cessa di sacrificare la propria verità."
      }
  }
};

// Bozza di BODIES.Moon per calcolatore-corpi-dict.js
  // =========================================================================
  // LUNA — la memoria somatica, il corpo emotivo, il rifugio primario
  // e le radici intime della psiche.
  // =========================================================================
  BODIES.Moon = {
  signs: {
    Aries: {
      title: 'Luna in Ariete — L’Urgenza del Corpo Emotivo',
      text: "La vita affettiva non conosce tempi di sedimentazione: ogni emozione si manifesta come una scossa immediata, un'urgenza fisica che chiede una risposta nell'istante esatto in cui sorge. La vulnerabilità viene spesso mascherata da scatti di impazienza o da una reattività fiera che rifiuta di mostrarsi bisognosa. Ti calmi soltanto attraverso il movimento, lo sfogo corporeo o la risoluzione rapida di un attrito. La difficoltà specifica sta nella digestione dei sentimenti complessi: quando un dolore richiede attesa, silenzio e accoglienza prolungata, subentra una frustrazione acuta che spinge a provocare un conflitto pur di non restare nell'incertezza.",
      sintesi: "Reattività affettiva istantanea e impulsiva; la vulnerabilità si nasconde dietro l'attacco."
    },
    Taurus: {
      title: 'Luna in Toro — Il Santuario della Sostanza Pacificata',
      text: "Il corpo emotivo trova pace nella ripetizione dei gesti rassicuranti, nel contatto sensoriale con la materia e nella certezza della stabilità domestica. C'è una calma viscerale che trasmetti a chi ti circonda, un senso di ancoraggio che resiste alle tempeste psicologiche altrui senza scomporsi. Hai bisogno di tempi lenti per elaborare le ferite e di un ambiente confortevole per sentirti al sicuro. Il limite di questa collocazione lunare è l'inerzia difensiva: la paura del cambiamento che porta a trattenere legami o situazioni ormai sterili pur di non affrontare il vuoto della trasformazione.",
      sintesi: "Bisogno profondo di quiete e sicurezza tangibile; il rischio è l'attaccamento possessivo che soffoca."
    },
    Gemini: {
      title: 'Luna in Gemelli — L’Emozione Tradotta in Linguaggio',
      text: "Il sentire passa costantemente attraverso il filtro della mente: per comprendere ciò che provi hai bisogno di nominarlo, di analizzarlo, di raccontarlo o di alleggerirlo con una battuta d'ironia. La curiosità è la tua prima forma di cura, e la solitudine prolungata ti spegne più di qualsiasi fatica fisica. Passi con agilità da uno stato d'animo all'altro senza lasciarti intrappolare a lungo nella gravità. L'ombra di questa posizione è la disconnessione corporea: intellettualizzare il dolore per non sentirne il peso viscerale, rimanendo sulla superficie dell'esperienza affettiva per paura dell'intensità incontrollabile.",
      sintesi: "Filtro razionale sui sentimenti e bisogno di dialogo; l'ostacolo è fuggire il sentire profondo."
    },
    Cancer: {
      title: 'Luna in Cancro — La Dimora Primordiale delle Maree',
      text: "La Luna abita qui la propria matrice originaria: la sensibilità è totale, porosa, capace di assorbire il clima invisibile di ogni ambiente prima ancora che vengano pronunciate parole. La memoria affettiva custodisce ogni sfumatura del passato, rendendo l'attaccamento alle radici e ai propri cari il perno dell'intera esistenza. C'è un talento immenso nel consolare, proteggere e creare intimità riparatrice. Il rovescio della medaglia è l'ipersensibilità difensiva: ritirarsi nel guscio al minimo segnale di rifiuto, coltivando risentimenti silenziosi e pretendendo che gli altri indovinino i tuoi bisogni senza doverli esprimere chiaramente.",
      sintesi: "Sensibilità oceanica legata alle radici intime; la trappola è il ricatto emotivo del silenzio."
    },
    Leo: {
      title: 'Luna in Leone — Il Bisogno di Riconoscimento del Cuore',
      text: "Il nutrimento affettivo coincide con la certezza di essere amati in modo speciale, unico e visibile. C'è una generosità calorosa nel modo di prendersi cura degli altri, che viene espressa attraverso gesti grandiosi, protezione regale e un orgoglio protettivo verso chi fa parte del proprio regno privato. Hai bisogno di sentirti al centro del cuore altrui. La vulnerabilità più acuta è il timore dell'indifferenza: una critica o una freddezza percepita ferisce l'orgoglio prima ancora del sentimento, scatenando reazioni drammatiche o un distacco altezzoso volto a celare la paura di non valere abbastanza.",
      sintesi: "Affettività generosa e fiera che cerca riconoscimento; il punto debole è la dipendenza dalla stima altrui."
    },
    Virgo: {
      title: 'Luna in Vergine — La Cura Come Ordine e Riparazione',
      text: "La sicurezza interiore viene costruita attraverso l'utilità pratica, la gestione meticolosa delle incombenze quotidiane e il controllo del corpo fisico. Esprimi l'affetto risolvendo problemi concreti, organizzando la vita di chi ami e anticipando ogni possibile contrattempo con discreta efficienza. C'è una modestia dignitosa che rifugge i clamori emotivi. L'attrito interiore sorge dall'ansia di inadeguatezza: una vigilanza ipercritica rivolta a se stessi e agli altri, che trasforma la cura in un catalogo di difetti da correggere e impedisce di abbandonarsi alla spontaneità del riposo.",
      sintesi: "Cura espressa nel servizio e nell'ordine pratico; l'ansia di controllo ostacola il vero abbandono."
    },
    Libra: {
      title: 'Luna in Bilancia — L’Equilibrio Emotivo Nello Specchio',
      text: "La pace interiore dipende dalla grazia dell'ambiente circostante e dall'assenza di tensioni nei rapporti ravvicinati. Non riesci a sentirti sereno se percepisci discordia nell'aria: cerchi l'intesa, la buona educazione e la bellezza come scudi protettivi contro la volgarità del mondo. C'è una squisita delicatezza nel cogliere i desideri del partner e nel predisporre condizioni di armonia condivisa. La trappola strutturale è la censura dei moti istintivi: sacrificare le proprie reazioni autentiche pur di preservare la facciata della concordia, accumulando un'insoddisfazione sottile che mina la stabilità interiore.",
      sintesi: "Benessere ancorato alla grazia e alla pace a due; il costo è reprimere le proprie emozioni sgradevoli."
    },
    Scorpio: {
      title: 'Luna in Scorpione — La Memoria Somatica dell’Abisso',
      text: "Il sentire è estremo, totalizzante, privo di mezze misure o compromessi consolatori. Fin dall'infanzia hai registrato i non detti, i segreti di famiglia e le correnti sotterranee della psiche, sviluppando un radar infallibile per la menzogna. Ti fidi difficilmente e metti alla prova chi si avvicina per misurarne la lealtà assoluta prima di concedere l'accesso al tuo santuario intimo. Il pericolo di questa collocazione lunare è la dipendenza dalla crisi: confondere la serenità con la noia, cercando inconsciamente il dramma e trattenendo veleni emotivi che finiscono per intossicare chi li cova.",
      sintesi: "Intensità viscerale che scruta il non detto; il rischio è vivere ogni legame come una prova di sopravvivenza."
    },
    Sagittarius: {
      title: 'Luna in Sagittario — Il Rifugio nell’Orizzonte Aperto',
      text: "La sicurezza emotiva non si trova nella clausura domestica ma nella libertà di movimento, nella fuga verso spazi ampi e nella fiducia in una provvidenza benefica. Quando ti senti soffocare da regole o da legami troppo opprimenti, la tua prima reazione è allontanarti, viaggiare, cercare una risposta filosofica che ridimensioni la pesantezza contingente. C'è un candore affettivo entusiasta che incoraggia chiunque incontri. Il limite è l'insofferenza verso il dolore altrui: la tendenza a scavalcare le fasi buie con prediche ottimistiche, fuggendo la complessità dei problemi che non si risolvono con un cambio di prospettiva.",
      sintesi: "Emozione che ritrova vigore nell'avventura e nel sapere; l'ombra è la fuga davanti al dolore concreto."
    },
    Capricorn: {
      title: 'Luna in Capricorno — La Fortezza del Silenzio Interiore',
      text: "La vita emotiva si struttura presto attorno al senso del dovere, alla solitudine sopportata con fierezza e alla necessità di contare solo sulle proprie forze. Hai imparato precocemente a non mostrare le lacrime e a considerare la debolezza come un lusso pericoloso, costruendo una corazza di autosufficienza che incute rispetto. La tua lealtà è di pietra: proteggi chi ami con fatti concreti e protezione duratura. La ferita nascosta è il digiuno affettivo: convincersi di non meritare tenerezza spontanea e continuare a credere che l'amore vada guadagnato con la fatica e con il sacrificio silenzioso.",
      sintesi: "Autosufficienza rigorosa e sentimenti trattenuti; la guarigione comincia quando accetti il diritto alla tenerezza."
    },
    Aquarius: {
      title: 'Luna in Acquario — L’Affetto Fraterno e la Distanza Sacra',
      text: "L'intimità viene vissuta con un bisogno irrinunciabile di spazio personale, indipendenza e rispetto delle singole peculiarità. Non tolleri i ricatti affettivi, i legami simbiotici o le convenzioni familiari imposte dalla tradizione: ti senti a casa tra spiriti affini, nella condivisione di ideali e in relazioni che non pretendono di possedere l'altro. C'è un'amicizia pura e leale che offri con generosità discreta. L'ostacolo è l'anestesia emotiva: rifugiarsi nella prospettiva cosmica o nell'analisi distaccata per non lasciarsi toccare dalle passioni disordinate che spaventano la mente razionale.",
      sintesi: "Intimità libera da possessività e ricatti; il punto cieco è la fuga nel distacco impersonale."
    },
    Pisces: {
      title: 'Luna in Pesci — Il Cuore Permeabile dell’Oceano',
      text: "La sfera emotiva non ha confini protettivi: sei una cassa di risonanza per ogni dolore, gioia o vibrazione psichica che attraversa l'ambiente. Possiedi una facoltà intuitiva quasi medianica e una tenerezza sconfinata verso ogni essere fragile o ferito dalla vita. La musica, l'arte e il raccoglimento spirituale sono i tuoi rifugi indispensabili per depurarti dalle tossine assorbite dal mondo. Il rischio primario è il martirio inconscio: farsi carico delle colpe e delle fatiche altrui fino a svuotarsi, rifugiandosi nel vittimismo o nell'illusione per sfuggire alla durezza della realtà materiale.",
      sintesi: "Sensibilità mistica priva di corazze; il compito vitale è imparare a chiudere i varchi quando serve."
    }
  },

  houses: {
    1: {
      title: 'Luna in Prima Casa — Il Sentire Visibile sul Volto',
      text: "La tua interiorità emotiva non ha modo di mascherarsi: ogni oscillazione d'animo, ogni turbamento o entusiasmo traspare istantaneamente sul viso e nella postura corporea prima che tu possa decidere se mostrarlo. C'è una permeabilità immediata all'ambiente che ti rende vulnerabile e al tempo stesso magnetico, capace di stabilire un'intimità spontanea con chiunque ti avvicini. La sfida principale è non rimanere ostaggio degli sbalzi d'umore, imparando a distinguere ciò che appartiene veramente alla tua persona dalle vibrazioni passeggere assorbite da chi ti circonda.",
      sintesi: "Stati d'animo immediatamente visibili e trasparenti; la lezione è non farsi travolgere dalle correnti altrui."
    },
    2: {
      title: 'Luna in Seconda Casa — La Sicurezza Custodita nel Paniere',
      text: "Il benessere affettivo è strettamente intrecciato con la stabilità delle risorse materiali, la disponibilità di cibo confortevole e la certezza di avere un fondo di riserva per i giorni difficili. Un calo economico non è vissuto come un semplice inconveniente pratico, ma come un'angoscia viscerale di privazione che risveglia antiche paure infantili. Sai gestire la casa e i beni con saggezza e parsimonia. Il nodo da sciogliere è l'attaccamento ansioso agli oggetti e alle abitudini consolidate, scambiando il possesso materiale per l'unico garante dell'affetto.",
      sintesi: "Tranquillità emotiva ancorata alle risorse materiali; l'errore è placare l'inquietudine con l'accumulo."
    },
    3: {
      title: 'Luna in Terza Casa — Il Focolare Nelle Parole Quotidiane',
      text: "Il bisogno di connessione emotiva si realizza attraverso la conversazione incessante, lo scambio di memorie, la vicinanza con i fratelli o con la comunità di quartiere. Hai una mente reattiva e immaginativa, che assimila le nozioni non per logica fredda ma per risonanza affettiva con chi insegna. I tuoi ricordi d'infanzia sono legati a odori, strade e voci familiari. Il rischio di questa posizione è la volubilità intellettuale: lasciarsi influenzare dalle ultime opinioni ascoltate e confondere la reazione emotiva momentanea con un giudizio ponderato.",
      sintesi: "Affettività che si nutre di vicinanza e dialogo; la debolezza è l'instabilità delle opinioni emotive."
    },
    4: {
      title: 'Luna in Quarta Casa — La Radice Sacra del Rifugio Domestico',
      text: "La Luna splende nel cuore della notte interiore, nel punto di massimo radicamento dell'albero genealogico e della vita privata. La casa non è un semplice indirizzo, ma un santuario sacro in cui ritirarsi per rigenerare le forze al riparo dal rumore mondano. C'è un legame profondissimo con la figura materna o con la terra ancestrale, che condiziona ogni scelta successiva. La prova di maturità risiede nell'emancipazione dal nido: evitare di restare eternamente figli, capaci di costruire una propria dimora adulta senza farsi imprigionare dai fantasmi del passato.",
      sintesi: "Radicamento intimo nel santuario della casa; la sfida è tagliare il cordone per fondare la propria autonomia."
    },
    5: {
      title: 'Luna in Quinta Casa — Il Teatro Degli Affetti e la Gioia Fanciulla',
      text: "L'espressione emotiva trova compimento nel gioco creativo, nell'innamoramento romantico e nella dedizione appassionata ai figli o ai propri talenti artistici. Mantieni viva una freschezza fanciullesca che conquista gli altri e che ha bisogno di celebrare la vita con feste, sorprese e calore spontaneo. Il tuo cuore si rigenera quando puoi esprimere pubblicamente ciò che ami. L'insidia di questa casa è l'inclinazione al melodramma: esasperare i sentimenti per renderli spettacolari e pretendere che chi ti è vicino reciti sempre nel ruolo di spettatore devoto.",
      sintesi: "Cuore fecondo che cerca gioia nella creatività; il pericolo è trasformare l'amore in una recita continua."
    },
    6: {
      title: 'Luna in Sesta Casa — La Cura Inscindibile tra Corpo e Anima',
      text: "La sensibilità emotiva si riflette con precisione chirurgica sullo stato di salute del corpo e sui ritmi del lavoro giornaliero: un'inquietudine non detta si trasforma quasi subito in un disturbo digestivo o in stanchezza somatica. Trovi equilibrio prendendoti cura degli altri, curando l'alimentazione, ordinando lo spazio vitale e accudendo animali domestici con premura materna. C'è una dedizione ammirevole alle necessità pratiche. La trappola è l'ansia da prestazione quotidiana: farsi sommergere dai doveri minuti fino a non concedersi mai il diritto a una sosta rigenerante.",
      sintesi: "Corpo ed emozione fusi nella routine quotidiana; la salute esige di non sacrificarsi al servizio perenne."
    },
    7: {
      title: 'Luna in Settima Casa — La Ricerca del Nido Nello Sguardo dell’Altro',
      text: "Il bisogno primario di nutrimento e rassicurazione viene proiettato sul legame di coppia o sulle partnership continuative. Fatichi a stare bene da solo: cerchi un partner che sappia accoglierti, proteggerti e farti da specchio emotivo, e a tua volta offri una dedizione materna e attenta ai bisogni dell'altro. Attiri persone sensibili o mutevoli come la Luna. La criticità fondamentale è la dipendenza affettiva simbiotica: confondere l'amore con la tutela genitoriale, finendo per infantilizzare il rapporto e temere il conflitto come preludio all'abbandono.",
      sintesi: "Sicurezza emotiva cercata nella relazione a due; il nodo è non trasformare il partner in genitore vicario."
    },
    8: {
      title: 'Luna in Ottava Casa — Il Patto di Sangue Nelle Zone d’Ombra',
      text: "La dimensione affettiva non si accontenta della tenerezza superficiale: pretende una fusione viscerale, un patto di lealtà totale che includa le reciproche zone buie e le crisi profonde. Ti attraggono i legami intensi e trasformativi, dove ci si mette a nudo senza riserve e dove il controllo delle risorse condivise assume un significato simbolico potente. Possiedi un'intuizione psicologica formidabile per i segreti altrui. L'ostacolo è il terrore del tradimento: vivere sulla difensiva, manipolare sotterraneamente i legami per paura di essere vulnerabili e coltivare ossessioni difficili da estirpare.",
      sintesi: "Legami viscerali e patti profondi; la redenzione avviene quando deponi il sospetto e impari la fiducia."
    },
    9: {
      title: 'Luna in Nona Casa — La Nostalgia di una Patria Spirituale',
      text: "L'anima non trova radici stabili nel luogo geografico di nascita: sente una nostalgia perenne per terre lontane, culture straniere o orizzonti filosofici capaci di dare respiro all'inquietudine interiore. Ti senti a casa quando viaggi, quando studi testi di saggezza o quando incontri persone portatrici di visioni ampie del mondo. Hai un'emotività etica che si accende per la giustizia e per la verità ideale. Il limite di questa collocazione è lo sradicamento cronico: fuggire costantemente altrove alla prima difficoltà emotiva, idealizzando ciò che è lontano per non impegnarsi nel presente.",
      sintesi: "Anima pellegrina che trova pace nel viaggio e nel sapere; l'ombra è lo sradicamento perenne."
    },
    10: {
      title: 'Luna in Decima Casa — La Maternità Sociale alla Prova del Pubblico',
      text: "La sfera privata e la vulnerabilità emotiva vengono portate sotto i riflettori della carriera, del ruolo sociale e della reputazione pubblica. Sei percepito dalla comunità come una figura accogliente, protettiva, una sorta di genitore istituzionale a cui affidarsi nei momenti di smarrimento. I tuoi successi professionali sono profondamente legati al favore della gente comune. Il costo interiore è altissimo: sacrificare l'intimità del proprio focolare sull'altare delle richieste collettive, sentendosi in dovere di non deludere mai le aspettative di chi ti guarda.",
      sintesi: "Ruolo pubblico vissuto con dedizione protettiva; la difficoltà è difendere uno spazio privato autentico."
    },
    11: {
      title: 'Luna in Undicesima Casa — La Tribù Degli Affetti Elettivi',
      text: "Il senso di appartenenza familiare si trasferisce dalla cerchia biologica alla comunità di amici, ai gruppi di affinità e ai collettivi impegnati in cause condivise. Ti senti nutrito quando fai parte di un sodalizio accogliente in cui ciascuno può essere se stesso senza giudizio, trovando tra pari quel calore che forse è mancato nell'infanzia. Sai fare da collante emotivo per l'intera assemblea. Il punto delicato è la delusione affettiva nei progetti comuni: investire troppe speranze infantili nel gruppo, vivendo ogni normale dissenso interno come un tradimento lacerante.",
      sintesi: "La famiglia scelta tra pari e ideali comuni; il rischio è pretendere dal gruppo una protezione assoluta."
    },
    12: {
      title: 'Luna in Dodicesima Casa — Il Lago Silenzioso dei Ricordi Ancestrali',
      text: "La Luna risiede nella stanza più segreta del tema natale, dove le emozioni individuali si mescolano con la memoria sommersa delle generazioni passate e con le correnti dell'inconscio collettivo. Spesso questa collocazione segnala un'infanzia in cui bisognava non fare rumore o in cui la madre viveva una solitudine sofferta. Hai un'empatia prodigiosa per chi soffre in silenzio e una capacità di raccoglimento che sfiora l'esperienza mistica. La trappola è l'autoesilio emotivo: chiudersi in un mondo di fantasie per sfuggire all'attrito della realtà quotidiana, lasciandosi logorare da paure prive di fondamento tangibile.",
      sintesi: "Sensibilità sommersa e memoria ancestrale; la via maestra è trasformare la solitudine in rifugio fecondo."
    }
  },

  dignities: {
    Cancer: {
      kind: 'Domicilio',
      title: 'In Domicilio — La Sorgente Inviolata delle Acque Prime',
      text: "La Luna nel Cancro governa la propria casa celeste: qui la facoltà recettiva non deve combattere per farsi spazio né mascherarsi per non apparire fragile. C'è una sintonia assoluta tra ciò che il corpo sente e ciò che la memoria registra. Possiedi l'arte antica del nutrimento, la capacità di creare legami che riparano le ferite e un'intuizione infallibile sulle intenzioni altrui. È la dignità della protezione piena e materna. Il rischio di questa abbondanza è la marea che non recede mai: rimanere prigionieri dei propri umori mutevoli, soffocare chi si ama con un accudimento ansioso e usare la propria sensibilità come arma per colpevolizzare chi cerca autonomia.",
      sintesi: "Forza lunare nel suo tempio: nutrimento e memoria intatta che devono evitare il soffocamento simbiotico."
    },
    Taurus: {
      kind: 'Esaltazione',
      title: 'In Esaltazione — Il Grembo Fertile della Terra Materna',
      text: "Nel Toro la Luna trova la stabilità che da sola non possiede: le sue maree emotive vengono accolte dalla solidità dell'elemento terra, trasformandosi in fecondità, calma serena e capacità di godere dei doni materiali dell'esistenza. Non c'è dispersione isterica né panico davanti agli scossoni del destino: sai rimanere solido e offrire un riparo confortevole a chiunque tremi. È la collocazione della prosperità affettiva e corporea. L'ombra dell'esaltazione è l'ostinazione cieca: rifiutarsi di registrare che qualcosa è finito, confondere la fedeltà con la pigrizia emotiva e accumulare beni per non sentire l'angoscia del vuoto.",
      sintesi: "Le maree lunari trovano radici nella terra: serenità feconda che rischia l'inerzia possessiva."
    },
    Capricorn: {
      kind: 'Esilio',
      title: 'In Esilio — Il Digiuno Emotivo Nella Torre di Pietra',
      text: "Opposta al morbido nido del Cancro, la Luna sperimenta l'esilio affrontando la disciplina della pietra, il tempo misurato e l'imperativo di resistere senza cedere allo sconforto. Hai imparato molto presto che il lamento sterile non porta soccorso, sviluppando una tempra d'acciaio che ti ha permesso di superare privazioni severe con dignità incrollabile. Non dipendi da nessuno per sopravvivere. Eppure, proprio questa prova dischiude una saggezza inaccessibile a chi resta sempre protetto: la vera maturità affettiva non consiste nel bandire ogni sentimento, ma nel garantire una protezione duratura a chi soffre senza esigere tributi né riconoscimenti.",
      sintesi: "Corazza d'autosufficienza forgiata nella privazione; scopri che la fedeltà incrollabile vale più delle promesse."
    },
    Scorpio: {
      kind: 'Caduta',
      title: 'In Caduta — Il Veleno Trasmutato in Elisir',
      text: "La caduta della Luna nello Scorpione segnala una psiche che non conosce il riposo delle acque calme: qui ogni sentimento viene passato al vaglio della diffidenza, della prova estrema e della paura della perdita. C'è una ferita primordiale legata alla vulnerabilità tradita, che spinge a controllare ogni dinamica affettiva per non essere colti alla sprovvista dal tradimento. Ne deriva una tensione costante che logora chi la nutre. Ma chi compie l'opera alchemica di questa caduta scopre un dono inestimabile: la capacità di guardare negli abissi senza impazzire, di accompagnare gli altri attraverso la morte psicologica e di rinascere sempre più forti dalle ceneri.",
      sintesi: "Sentire estremo che scruta l'oscurità; la trasmutazione avviene quando deponi il veleno e scegli la rinascita."
    }
  },

  combinations: {
    'Cancer|4': {
        title: "Luna in Cancro in Quarta Casa",
        canonico: "La Luna splende nel proprio domicilio e siede nell'Imum Coeli, vertice della notte e matrice del lignaggio: la sfera affettiva e mnestica raggiunge qui la sua massima concentrazione e potenza archetipica. La dottrina tradizionale scorge in questa figura il custode delle memorie ancestrali, il focolare intimo che nutre la stirpe e difende la casa da ogni incursione esterna. La persona vive in uno stato di osmosi profonda con le proprie radici e manifesta una sollecitudine protettiva quasi insuperabile verso chi considera parte della propria famiglia. I pericoli canonici sono l'attaccamento infantile, la regressione sentimentale di fronte a ogni contrasto e il ricorso al ricatto emotivo per trattenere a sé i figli o i compagni. Il lutto non risolto e l'ossessione per le memorie passate possono trasformare la casa in un mausoleo spettrale, dove i vivi sacrificano la propria giovinezza per nutrire le ombre degli antenati.",
        lilithiano: "Il grembo della tua infanzia era un mare troppo denso, in cui ogni emozione familiare ti si incollava addosso senza chiederti il permesso. Le mura domestiche funzionavano come un tribunale emotivo permanente, dove ogni desiderio di indipendenza veniva accolto con lacrime di rimprovero e accuse di ingratitudine. Hai dovuto farti madre dei tuoi stessi genitori prima ancora di comprendere cosa significasse essere prole.\n\nLilith prosciuga le paludi della nostalgia ricattatoria: tagliare il cordone ombelicale non significa disprezzare le radici, ma impedire che diventino catene che ti trascinano a fondo. La tenerezza che offri al mondo non deve essere una trappola per costringere gli altri a non abbandonarti mai. La tua prima guarigione consiste nel chiudere a chiave la tua stanza interiore, tenendo per te ciò che appartiene unicamente alla tua persona.\n\nLa tua intuizione viscerale è un radar infallibile che capta i bisogni segreti dell'anima prima che vengano pronunciati. Sai creare calore e protezione dove prima regnava solo lo sradicamento. Chi edifica un santuario dentro il proprio petto non ha più bisogno di sbarrare le finestre: la tenerezza autonoma risana le ferite senza pretendere tributi di sottomissione.",
        sintesi: "Luna signora della quarta casa: ricchezza emozionale delle origini che trova compimento solo superando il ricatto del nido."
      },
    'Taurus|2': {
        title: "Luna in Toro in Seconda Casa",
        canonico: "La Luna gode della propria esaltazione nel Toro e occupa la seconda casa, sede delle risorse materiali e della sussistenza corporea: l'emotività trova un solido ancoraggio nella terra, trasformando la sensibilità in perizia concreta e stabilità patrimoniale. La tradizione registra questo connubio come foriero di prosperità duratura, attaccamento sano ai beni visibili e capacità di godere dei frutti del lavoro senza farsi logorare dalle ansie del domani. La persona agisce con un ritmo ponderato che infonde sicurezza negli affari e nei rapporti domestici. I difetti registrati dagli autori classici risiedono nella voracità conservatrice, nella pigrizia somatica e nella riluttanza ostinata ad accettare i cambiamenti necessari della vita. La terra accumulata senza respiro finisce per soffocare chi la coltiva: il granaio più opulento diventa una prigione desolata se la paura della carestia impedisce di allestire la tavola per la festa.",
        lilithiano: "Metti le mani sulla terra e senti subito cosa può crescere e cosa invece marcirà prima del tempo. L'ansia economica dei genitori instillava il terrore costante della miseria, imponendo il risparmio amaro come supremo dovere morale della stirpe. Ti hanno persuasa che accumulare riserve fosse l'unica maniera per non rimanere alla mercé delle tempeste della vita.\n\nLilith scuote la tua quiete apparente: l'attaccamento viscerale alle tue certezze rischia di diventare una prigione comoda da cui non oserai più uscire. Non puoi comprare la pace dell'anima stipulando polizze contro l'imprevisto. Il tuo valore non si misura dalle cose che hai messo al sicuro, ma dalla capacità di restare in piedi quando il vento spazza via tutto ciò che consideravi intoccabile.\n\nLa tua presenza corporale possiede un potere calmante prodigioso: nei momenti di panico collettivo la tua fermezza ricorda agli altri che il suolo sotto i piedi non è mai crollato. Sai come far fruttificare le risorse senza sprecare una sola goccia di sudore. La vera fertilità fiorisce solo dove cade la paranoia del domani: mani generose sanno moltiplicare il pane proprio perché non tremano al pensiero dell'inverno.",
        sintesi: "Luna esaltata in seconda casa: fecondità solida e rassicurante che deve aprirsi al flusso della condivisione vitale."
      },
    'Scorpio|8': {
        title: "Luna in Scorpione in Ottava Casa",
        canonico: "La Luna cade nello Scorpione e sprofonda nella casa ottava, abisso delle eredità invisibili e delle metamorfosi luttuose: la psiche si misura quotidianamente con le correnti sottomarine dell'inconscio e con il tabù del potere. La dottrina antica riconosce in questa combinazione un animo scrutatore, capace di sopportare le prove più aspre e di intuire i segreti taciuti da chi gli sta intorno con una perspicacia che sgomenta. L'individuo attraversa crisi profonde che costringono a rigenerare dalle fondamenta la propria identità. I pericoli canonici sono l'ossessione rancorosa, la paranoia investigativa e il compiacimento morboso nella rovina propria o altrui. Chi scruta l'abisso con il solo intento di trovarvi conferme al proprio risentimento finisce per restare pietrificato sulla soglia, prigioniero delle stesse catene che intendeva spezzare.",
        lilithiano: "Hai visto troppo presto ciò che si nascondeva dietro i quadri impeccabili del salotto buono. I segreti inconfessabili della parentela gravavano sull'atmosfera di casa, costringendo l'infanzia a una vigilanza armata contro trappole invisibili. Per difenderti dalla sopraffazione trovi rifugio nelle ombre, facendoti corazza del silenzio e covando una rabbia che nessuno osava nominare.\n\nLilith non ti chiede di fingere che l'orrore non sia accaduto, ma ti ordina di smettere di berne il veleno ogni mattina per colazione. Rimuginare all'infinito sui torti patiti non ferisce i tuoi nemici: distrugge soltanto la tua capacità di godere della luce del sole. Il tuo vero salto evolutivo consiste nel deporre il pugnale, guardare in faccia il dolore senza farlo diventare un alibi e scoprire che la tua sovranità non dipende dalle scuse di chi ti ha ferito.\n\nC'è in te una stoffa alchemica indomabile: sai scendere negli inferi senza perdere l'orientamento, e dove gli altri vedono solo putredine tu sai estrarre la radice della risurrezione. Sei una compagna preziosa nei passaggi oscuri dell'esistenza. Nessun inganno sopravvive allo sguardo di chi ha camminato negli inferi senza vendere l'anima: la verità nuda disarma i falsari con la sola forza della presenza.",
        sintesi: "Luna in caduta nell'ottava casa: scandaglio implacabile dell'ombra che guarisce quando rinuncia alla sete di risarcimento."
      },
    'Capricorn|10': {
        title: "Luna in Capricorno in Decima Casa",
        canonico: "Esilio lunare nel Capricorno unito alla collocazione al culmine della decima casa: il bisogno di intimità si scontra con l'imperativo severo del dovere sociale e della reputazione pubblica. Nel sistema tradizionale questa posizione indica l'anima a cui le circostanze impongono una rapida dismissione delle fragilità infantili per assumere carichi istituzionali o incarichi faticosi davanti al mondo. L'individuo edifica il proprio cammino con un rigore ascetico e una serietà d'intenti che finiscono per imporsi anche sui contestatori più ostili. I rischi consueti sono la freddezza d'animo, il terrore dell'insuccesso e una solitudine glaciale vissuta come unico prezzo possibile per conservare il decoro. Le fortezze montane resistono alle bufere ma restano inospitali se prive di focolare: l'autorità acquista vera grandezza solo quando la fermezza istituzionale impara a non temere le lacrime degli umili.",
        lilithiano: "Ti hanno caricato sulle spalle il peso del decoro familiare quando avresti dovuto pensare solo a correre sui prati. I precettori e i parenti misuravano il tuo valore unicamente attraverso i voti scolastici e l'obbedienza, trattando ogni debolezza come un'onta da censurare. Raggiungi la cima della rupe, convinta che solo da lassù nessuno avrebbe potuto farti del male.\n\nLilith ti raggiunge sul tuo picco solitario per farti una domanda semplice: quanto ti costa mantenere ogni giorno questa maschera indistruttibile? Il mondo ti ammira, ma dentro le tue mura si gela. Non devi meritarti il diritto di esistere attraverso la fatica estenuante. La tua vera ribellione comincia quando osi mostrare un momento di cedimento senza vergognarti, scoprendo che la terra non si apre sotto i tuoi piedi se per una volta chiedi aiuto.\n\nPossiedi una tempra monumentale: non crolli sotto urti che spazzerebbero via chiunque altro e sai edificare progetti capaci di sfidare i decenni. La statura più alta non si misura dall'altezza delle mura erette contro il pianto, ma dalla capacità regale di restare saldi offrendo asilo a chi ha le ginocchia sbucciate.",
        sintesi: "Luna esiliata al Medio Cielo: ascesi austera e precoce senso del dovere che rifioriscono quando il cuore disinnesca la corazza."
      }
  }
};

// Bozza di BODIES.Venus per calcolatore-corpi-dict.js
  // =========================================================================
  // VENERE — l'eros sacro, il principio del piacere, l'attrazione, il valore
  // e l'armonia delle relazioni sovrane.
  // =========================================================================
  BODIES.Venus = {
  signs: {
    Aries: {
      title: 'Venere in Ariete — L’Assalto Amoroso Senza Schermi',
      text: "Il desiderio qui non attende di essere invitato né tollera i rituali prolungati del corteggiamento: quando si accende, dichiara la propria intenzione con una franchezza che può disorientare chi è abituato a codici più sfumati. C'è una passione ardente, immediata e competitiva, che trova stimolo nella conquista difficile e tende a spegnersi quando la situazione diventa prevedibile. Ti innamori dello slancio e della sfida. La difficoltà strutturale risiede nella gestione della reciprocità: scambiare il proprio bisogno impaziente per il ritmo dell'altro, pretendendo una risposta istantanea e vivendo ogni esitazione come un rifiuto personale.",
      sintesi: "Desiderio ardente e conquista frontale; la sfida cala quando viene a mancare l'attrito."
    },
    Taurus: {
      title: 'Venere in Toro — L’Arte della Lentezza Sensoriale',
      text: "L'amore e il piacere prendono forma attraverso il corpo, la tattilità, la cura dello spazio condiviso e la certezza della presenza materiale. Non ti lasci sedurre dalle promesse astratte: hai bisogno di toccare, di sentire il profumo e di verificare la solidità concreta del legame nel tempo. C'è una fedeltà terrena e generosa, capace di creare benessere e serenità attorno a sé. Il punto cieco coincide con la possessività rassicurante: considerare chi si ama come parte integrante del proprio patrimonio affettivo, opponendo una resistenza sorda a ogni trasformazione che turbi la quiete delle abitudini.",
      sintesi: "Piacere sensoriale e costanza negli affetti; l'ostacolo è confondere l'amore con il possesso materiale."
    },
    Gemini: {
      title: 'Venere in Gemelli — La Seduzione dell’Intelligenza Mobile',
      text: "L'attrazione nasce nella conversazione, nell'ironia brillante e nella complicità intellettuale prima ancora che sul piano fisico. Ti innamori di una mente agile, di una battuta formulata con tempismo perfetto e della possibilità di condividere stimoli culturali sempre nuovi. Rifuggi la pesantezza emotiva e le rivendicazioni asfissianti come una minaccia alla tua libertà interiore. Il limite di questa collocazione è la superficialità difensiva: svolazzare da un fiore all'altro per non affrontare l'attrito del legame profondo, scambiando il brio dello scambio verbale per un'intimità reale.",
      sintesi: "Amore che fiorisce nel dialogo e nel gioco; la debolezza è fuggire il coinvolgimento viscerale."
    },
    Cancer: {
      title: 'Venere in Cancro — La Tenerezza Protettiva del Focolare',
      text: "Il valore affettivo si misura dalla capacità di offrire e ricevere rifugio, protezione e nutrimento intimo. Ami con una memoria fedele e vulnerabile, legando ogni gesto d'amore a un ricordo prezioso e cercando nel partner un alleato capace di comprendere le tue maree interiori senza giudicarle. Sai creare un'atmosfera calda e riparatrice per chi accogli. La trappola è il ricatto dell'accudimento: pretendere devozione eterna in cambio delle proprie premure materne e ritirarsi in un silenzio offeso al minimo accenno di distacco o di disaccordo.",
      sintesi: "Affetto intimo e vulnerabile che cerca riparo; l'ombra è pretendere gratitudine e trattenere il passato."
    },
    Leo: {
      title: 'Venere in Leone — La Magnificenza del Dono Regale',
      text: "L'amore qui è un atto solenne, luminoso e generoso, che chiede di essere vissuto a testa alta e senza compromessi mediocri. Quando ami lo fai con fierezza regale, ricoprendo l'altro di attenzioni splendide e pretendendo di essere a tua volta stimato, ammirato e riconosciuto come il centro del suo orizzonte affettivo. Non sopporti la meschinità o la freddezza calcolata. La zona di pericolo è l'orgoglio ferito: l'incapacità di perdonare una mancanza di riguardo pubblico e la tendenza a trasformare la relazione in un palcoscenico in cui l'altro deve recitare il ruolo di ammiratore devoto.",
      sintesi: "Eros splendido e regale che celebra il sentimento; il limite è la vulnerabilità al disinteresse dell'altro."
    },
    Virgo: {
      title: 'Venere in Vergine — La Devozione al Dettaglio Utile',
      text: "Il sentimento si manifesta nella cura discreta, nel supporto pratico e nella vigilanza premurosa verso il benessere quotidiano di chi si ama. Non credi ai grandi giuramenti enfatici: preferisci dimostrare la tua presenza riparando un guasto, preparando un rimedio o sollevando l'altro da una fatica materiale con sobria maestria. C'è una lealtà operosa ammirevole. L'ombra è la censura ipercritica: il timore della vulnerabilità emotiva che spinge a sezionare ogni difetto del partner, trasformando l'amore in un esame continuo in cui nessuno risulta mai pienamente promosso.",
      sintesi: "Amore espresso nel servizio attento e concreto; la trappola è soffocare la passione con il rilievo del difetto."
    },
    Libra: {
      title: 'Venere in Bilancia — L’Armonia Sacra della Proporzione',
      text: "Venere risiede nel proprio tempio diurno: l'amore è concepito come un'arte squisita, fatta di reciproco rispetto, buone maniere, grazia estetica e ricerca ostinata della parità. Possiedi un talento eccezionale nel disinnescare i conflitti rozzi e nel creare ambienti di rara armonia dove ciascuno si sente compreso e valorizzato. La bruttezza e la sgarbatezza ti feriscono profondamente. La sfida fondamentale è non confondere la forma con la sostanza: evitare di sacrificare la verità dei propri impulsi pur di non rompere l'incantesimo della concordia esteriore.",
      sintesi: "Grazia ed eleganza relazionale nel segno proprio; il rischio è sacrificare la verità per evitare la discordia."
    },
    Scorpio: {
      title: 'Venere in Scorpione — Il Legame Indissolubile nell’Abisso',
      text: "Il desiderio non accetta mezze misure, flirt leggeri o patti di convenienza: pretende l'anima intera, la trasparenza totale e la condivisione delle reciproche ombre. C'è un magnetismo irresistibile e misterioso, che attrae chi cerca un'esperienza trasformativa e profonda. Quando doni il tuo cuore lo fai per sempre, con una fedeltà estrema che esige altrettanta dedizione. La trappola è l'ossessione del tradimento: controllare l'altro attraverso il sospetto, vivere l'amore come un campo di battaglia sotterraneo e distruggere il legame per la paura ancestrale di essere feriti.",
      sintesi: "Eros viscerale e trasformativo che pretende tutto; il pericolo è la tortura dell'inquisizione affettiva."
    },
    Sagittarius: {
      title: 'Venere in Sagittario — L’Amore Come Grande Avventura',
      text: "L'attrazione ha bisogno di aria libera, di ideali condivisi e di cammini da percorrere insieme verso terre sconosciute o traguardi di pensiero elevato. Ti innamori di chi allarga i tuoi orizzonti, di chi ti fa ridere e di chi condivide la tua sete di scoperta e di verità filosofica. Non tolleri la gelosia meschina o i recinti domestici soffocanti. La difficoltà primaria risiede nell'insofferenza per l'impegno concreto: idealizzare l'amore lontano o futuro per non affrontare la manutenzione quotidiana del legame reale, dileguandosi appena svanisce l'entusiasmo dell'inizio.",
      sintesi: "Passione che si nutre di libertà e ricerca; la debolezza è fuggire la quotidianità dell'impegno."
    },
    Capricorn: {
      title: 'Venere in Capricorno — La Promessa Che Resiste al Tempo',
      text: "I sentimenti non si accendono con facili effusioni: maturano lentamente, superando prove silenziose e verificando la lealtà dei patti prima di concedere la propria fiducia. C'è una dignità sobria, quasi severa, che disprezza le dimostrazioni plateali e preferisce garantire una sicurezza incrollabile, un supporto tangibile e una fedeltà che dura decenni. Ami con responsabilità e rispetto. La zona d'ombra è la freddezza difensiva: calcolare l'affetto come un investimento a lungo termine, negandosi la dolcezza della spontaneità per la paura di mostrarsi deboli.",
      sintesi: "Sentimento austero che si consolida negli anni; l'ostacolo è la corazza che nega il diritto alla tenerezza."
    },
    Aquarius: {
      title: 'Venere in Acquario — L’Eros dell’Alleanza Eretica',
      text: "L'amore si fonda sulla stima intellettuale, sulla complicità amicale e sull'assoluto rispetto dell'autonomia individuale. Rifiuti gli stereotipi di genere, i rituali possessivi e le aspettative sociali prefabbricate, inventando ogni volta codici relazionali originali e liberi da convenzioni. Sai essere un compagno leale, stimolante e privo di meschinità. Il punto critico è il distacco concettuale: teorizzare l'amore universale mentre si fatica a reggere il contatto caldo con i bisogni emotivi più imperfetti dell'altro, fuggendo l'intimità carnale nell'iperuranio delle idee.",
      sintesi: "Legame fondato su amicizia e libertà; la trappola è rifugiarsi nella teoria per timore dell'attaccamento."
    },
    Pisces: {
      title: 'Venere in Pesci — La Compassione dell’Amore Senza Rive',
      text: "Venere raggiunge qui la sua espressione più pura e disinteressata: il desiderio si trasfigura in devozione mistica, empatia totale e capacità di amare l'altro nella sua intera vulnerabilità. Non giudichi le debolezze altrui, le accogli come parte del sacro mistero dell'esistenza, offrendo una dolcezza che cura e consola ogni ferita. L'arte e la musica sono canali naturali della tua seduzione. Il pericolo è l'illusione sacrificale: innamorarsi di figure irrisolte con la pretesa di salvarle, confondendo la pietà con l'eros ed esaurendo le proprie risorse in relazioni disuguali.",
      sintesi: "Amore oceanico ed empatico privo di confini; il rischio è sacrificarsi per riscattare l'indegno."
    }
  },

  houses: {
    1: {
      title: 'Venere in Prima Casa — Il Magnetismo della Grazia Corporea',
      text: "La grazia, il fascino e il senso dell'armonia sono impressi direttamente nella tua presenza fisica e nel modo spontaneo con cui ti relazioni al mondo. Attiri l'affetto e la simpatia altrui senza sforzo apparente, perché emani un calore accogliente che disinnesca le ostilità prima ancora che si manifestino. Hai un gusto innato per la bellezza e la proporzione. La trappola risiede nella compiacenza seduttiva: dipendere dall'essere piacevoli a tutti i costi, sacrificando le proprie convinzioni scomode pur di non perdere il consenso e la dolcezza dell'approvazione esterna.",
      sintesi: "Fascino naturale impresso nella persona; la lezione è non fare della seduzione la maschera della propria verità."
    },
    2: {
      title: 'Venere in Seconda Casa — Il Valore Sublime della Materia',
      text: "Il principio del piacere e della bellezza si radica profondamente nella terra dei beni tangibili, del patrimonio e dell'autonomia economica. Possiedi un fiuto eccezionale per le cose di pregio, per l'arte che mantiene valore nel tempo e per la gestione armoniosa del denaro. Trovi serenità quando le tue finanze sono solide e il tuo ambiente è arredato con eleganza confortevole. Il rischio è l'attaccamento estetico possessivo: identificare il proprio valore interiore con il lusso posseduto o pretendere di comprare la serenità emotiva attraverso spese compensative.",
      sintesi: "Attrazione per il valore materiale e l'abbondanza; l'ombra è quantificare la stima di sé nel conto economico."
    },
    3: {
      title: 'Venere in Terza Casa — La Parola Che Incanta e Pacifica',
      text: "La seduzione passa attraverso la voce, la scrittura raffinata e la capacità di condurre conversazioni stimolanti ed educate. Trovi piacere nello studio, nei brevi spostamenti quotidiani e nei legami affettuosi con fratelli, cugini e persone del proprio ambiente prossimo. Sai formulare le verità più difficili con una grazia che non ferisce l'interlocutore. L'attrito peculiare di questa casa consiste nella civetteria verbale: dire ciò che l'altro desidera ascoltare per compiacere l'uditorio, disperdendo la sostanza del pensiero in formule di cortesia prive di reale impegno.",
      sintesi: "Grazia comunicativa e pensiero armonico; il pericolo è usare la gentilezza per eludere la chiarezza."
    },
    4: {
      title: 'Venere in Quarta Casa — L’Oasi di Bellezza nel Focolare',
      text: "La ricerca dell'armonia affettiva trova il suo tempio tra le mura domestiche, nella storia familiare e nella cura minuziosa della propria dimora. Esprimi il tuo amore rendendo la casa un rifugio accogliente, profumato e pacifico, dove chi entra si sente immediatamente al sicuro dal frastuono esterno. C'è un attaccamento riconoscente alle proprie radici o il desiderio di risanare antiche discordie dei genitori. La trappola è la clausura dorata: rifiutarsi di uscire all'aperto, pretendendo che l'amore rimanga confinato all'interno di un'intimità protetta e non contaminata.",
      sintesi: "Armonia e amore radicati nella casa intima; la sfida è non trasformare il nido in una fortezza chiusa."
    },
    5: {
      title: 'Venere in Quinta Casa — La Festa del Desiderio e dell’Arte',
      text: "Questa è una delle sedi più gioiose e radiose di Venere: il piacere, la seduzione, il gioco teatrale e la creazione artistica fluiscono con generosa spontaneità. Ti innamori con entusiasmo autentico, donando calore, regali e momenti indimenticabili a chi sa accendere la tua fantasia. Con i figli o nelle opere creative riversi un senso di grazia e divertimento che contagia chiunque. Il punto debole è la frivolezza perenne: l'insofferenza per le fasi sobrie o faticose della vita, fuggendo la maturazione del legame non appena svanisce l'ebbrezza dell'innamoramento.",
      sintesi: "Eros creativo e gioia di vivere espressa apertamente; il limite è la dipendenza dall'euforia romantica."
    },
    6: {
      title: 'Venere in Sesta Casa — La Grazia nei Ritmi del Quotidiano',
      text: "Il piacere dell'armonia impara a convivere con le incombenze della vita pratica, l'ambiente di lavoro e la cura attenta della salute corporea. Dimostri affetto rendendoti utile, migliorando le condizioni dei colleghi e curando i dettagli del vivere con un gusto sobrio e rilassante. Trovi bellezza nei mestieri ben fatti e nell'accudimento degli animali. L'ombra è la subordinazione affettiva: sentirsi degni di amore solo in cambio di un servizio impeccabile, permettendo al partner di scaricare su di te fatiche materiali che non ti competono.",
      sintesi: "Amore che si esprime nel supporto pratico e nel mestiere; la lezione è non confondere l'affetto con il servizio."
    },
    7: {
      title: 'Venere in Settima Casa — L’Incontro Sacro Nello Specchio a Due',
      text: "Venere risiede nella casa delle unioni ufficiali, dei patti d'anima e della diplomazia paritaria: qui l'altro è il centro vitale dell'esistenza. Hai una vocazione spontanea per il matrimonio e per le partnership stabili, dove cerchi bellezza, reciprocità etica e condivisione totale di mete elevate. Sai negoziare accordi in cui entrambe le parti escono vittoriose. La trappola è la dipendenza dalla coppia: il terrore viscerale della solitudine che spinge a rimanere in un'alleanza tiepida o vuota pur di non dover sostenere lo sguardo del mondo senza un compagno accanto.",
      sintesi: "Vocazione all'unione paritaria e all'armonia a due; l'errore è svendere la propria autonomia per paura di restare soli."
    },
    8: {
      title: 'Venere in Ottava Casa — L’Eros Che Attraversa la Notte',
      text: "Il piacere non è mai superficiale: si accende nella fusione intima profonda, nella condivisione di segreti inconfessabili e nella gestione comune delle risorse decisive. Ti attraggono legami intensi, che costringono a una metamorfosi psicologica radicale e che mettono alla prova la lealtà fino in fondo. Possiedi un carisma magnetico sottile ma incisivo. L'insidia di questa casa è il dramma possessivo: scambiare il controllo emotivo e finanziario per amore sincero, logorandosi in gelosie sotterranee e battaglie per il potere all'interno della coppia.",
      sintesi: "Magnetismo profondo e patti intimi trasformativi; la redenzione esige la rinuncia al controllo e al sospetto."
    },
    9: {
      title: 'Venere in Nona Casa — L’Attrazione per il Mondo Lontano',
      text: "Il cuore si infiamma per ciò che è lontano, diverso, esotico o portatore di una saggezza superiore. Trovi l'amore in viaggio, nelle accademie, tra persone di culture o fedi diverse dalla tua, unendo l'eros alla ricerca spirituale e alla sete di conoscenza. Hai un senso etico elevato che non tollera le angustie del pregiudizio provinciale. Il limite risiede nella fuga idealizzante: proiettare la perfezione su chi risiede lontano o su filosofie astratte, per poi mostrarsi incapaci di gestire la realtà imperfetta delle relazioni vicine.",
      sintesi: "Amore che fiorisce nell'avventura e nei grandi orizzonti; l'ombra è fuggire il concreto per l'ideale lontano."
    },
    10: {
      title: 'Venere in Decima Casa — Il Fascino Eretto a Carriera Pubblica',
      text: "Venere culmina nel punto più alto del cielo, donando grazia sociale, stima delle autorità e una naturale capacità di attrarre successo professionale attraverso il tatto, l'eleganza e la mediazione. La tua reputazione pubblica è favorita da un'immagine armoniosa che suscita ammirazione spontanea. Spesso la carriera si sviluppa nelle arti, nella diplomazia o nella cura dell'estetica pubblica. L'attrito interiore sorge quando il matrimonio o i sentimenti vengono subordinati all'ambizione di prestigio, riducendo l'amore a una vetrina sociale priva di calore.",
      sintesi: "Successo pubblico favorito da grazia e diplomazia; la trappola è sposare la carriera a spese del cuore."
    },
    11: {
      title: 'Venere in Undicesima Casa — L’Armonia nell’Assemblea dei Liberi',
      text: "L'affettività si allarga alla cerchia delle amicizie scelte, dei circoli intellettuali e delle grandi cause collettive. Ti realizzi come elemento pacificatore all'interno dei gruppi, promuovendo progetti in cui la bellezza, l'arte e la cooperazione tra pari guidano il rinnovamento sociale. Le tue amicizie sono improntate a una lealtà generosa e raffinata. La zona delicata è l'ambiguità tra amicizia e amore: stemperare la passione amorosa in una complicità fraterna che rifiuta l'impegno esclusivo, lasciando l'altro disorientato.",
      sintesi: "Amore che brilla nella comunità e nei patti amicali; il nodo è non disperdere la passione nell'impersonale."
    },
    12: {
      title: 'Venere in Dodicesima Casa — Il Giardino Segreto dell’Amore Sommerso',
      text: "Venere dimora nel chiostro del silenzio interiore, dove il sentimento si fa mistico, appartato e custode di dolori e bellezze inesprimibili alla folla. Spesso questa collocazione segnala amori segreti, relazioni vissute nella solitudine o un talento artistico coltivato lontano dai riflettori mondani con commovente purezza. C'è una dedizione soccorrevole verso chi è emarginato o soffre. Il pericolo è l'autocensura affettiva: credere di non meritare la felicità alla luce del sole, attirando amori impossibili o scivolando nel ruolo di vittima rassegnata.",
      sintesi: "Amore mistico e discreto custodito nel silenzio; la liberazione avviene quando accetti il diritto di amare alla luce del sole."
    }
  },

  dignities: {
    Taurus: {
      kind: 'Domicilio',
      title: 'In Domicilio Notturno — Il Piacere Incarnato nei Sensi',
      text: "Nel Toro, Venere governa la materia terrena e il corpo che gode della propria sostanza. Qui non c'è ansia di dimostrare nulla né tormento psicologico: il valore personale si fonda sulla calma primordiale della natura, sulla capacità di creare abbondanza e di assaporare ogni istante con piena lentezza sensoriale. È la dignità della pace carnale e della fedeltà che costruisce. Il rischio implicito è l'ingordigia pigra: adagiarsi nelle comodità materiali, temere qualsiasi turbamento che chieda rinuncia e confondere il nutrimento autentico con l'accumulo di certezze intoccabili.",
      sintesi: "Venere a casa propria nella terra fertile: pienezza sensoriale che deve evitare l'inerzia possessiva."
    },
    Libra: {
      kind: 'Domicilio',
      title: 'In Domicilio Diurno — La Grazia dell’Accordo Estetico',
      text: "Nella Bilancia, Venere governa l'aria limpida dell'incontro paritario, della giustizia e della forma perfetta. Non cerca il possesso materiale ma l'accordo squisito delle menti e dei cuori, la bellezza delle proporzioni e la concordia che nobilita la convivenza umana. È la dignità del patto leale e dell'eleganza che disinnesca la barbarie. L'insidia di questa luce pura è l'estetismo vacuo: pretendere che la vita sia sempre ordinata e gradevole, rifiutando il disordine fertile delle passioni carnali e fingendo una serenità che cela conflitti irrisolti.",
      sintesi: "Venere nel suo tempio d'aria: equilibrio e giustizia a due che rischiano di sacrificare la visceralità per la forma."
    },
    Pisces: {
      kind: 'Esaltazione',
      title: 'In Esaltazione — L’Amore Oceanico Incondizionato',
      text: "L'esaltazione di Venere nei Pesci segna il vertice dell'amore spirituale, dove ogni confine dell'Io si dissolve per accogliere l'altro nella sua intera verità. La dolcezza è universale, capace di perdonare ogni miseria terrena e di trasfigurare il dolore in sublime ispirazione poetica o musicale. È la collocazione della grazia mistica che redime. Il prezzo dell'esaltazione è l'assenza di filtri difensivi: non sapere a chi concedere la propria fiducia, cadere preda di inganni affettivi e scambiare il martirio per santità d'animo, dimenticando che anche l'amore esige confini per non morire disperso.",
      sintesi: "Apice dell'amore universale e della dedizione pura; la salvaguardia impone di conservare un confine protettivo."
    },
    Aries: {
      kind: 'Esilio',
      title: 'In Esilio — La Brama che Conquista Senza Sedurre',
      text: "Nel segno di Marte, Venere deve operare attraverso un'energia che ignora la grazia della reciprocità: vuole tutto e subito, pretendendo che l'altro si arrenda alla veemenza della sua brama. Ne nasce una tensione strutturale tra il bisogno di unione e l'istinto irrefrenabile alla battaglia, che porta a scambiare il conflitto per passione autentica e a perdere interesse appena la tensione cala. Tuttavia l'esilio dona una dote che i domicili ignorano: una sincerità assoluta, incapace di ipocrisie cortesi, che si espone in prima persona senza paura di essere respinta.",
      sintesi: "Passione impaziente che procede per assalto; impari che l'amore vero non è una conquista ma un patto."
    },
    Scorpio: {
      kind: 'Esilio',
      title: 'In Esilio Notturno — La Passione Inesorabile e l’Ombra',
      text: "Nello Scorpione, Venere è costretta a misurarsi con il regno delle maree invisibili, della perdita e del controllo. La leggerezza le è preclusa: ogni sentimento si colora di assoluto, di gelosia e di una sete inestinguibile di possesso dell'anima altrui, generando un magnetismo che seduce e al contempo intimorisce. L'esilio scorpionico compie però un'alchimia formidabile che nessuna posizione comoda conosce: sa amare chi è spezzato, sa rimanere in piedi accanto a un sepolcro e possiede una fedeltà che supera la soglia della morte terrena.",
      sintesi: "Eros oscuro e magnetico forgiato nella crisi; la redenzione avviene deponendo il controllo per l'abbandono fiducioso."
    },
    Virgo: {
      kind: 'Caduta',
      title: 'In Caduta — Il Desiderio al Vaglio della Critica',
      text: "La caduta di Venere nella Vergine segnala una mente che non riesce ad abbandonarsi all'ebbrezza del sentimento senza prima averne verificato l'affidabilità, i costi pratici e le possibili falle. La spontaneità viene frenata dal pudore e dall'ansia di inadeguatezza, portando a trattenere l'affetto dietro una barriera di compiti e di giudizi severi che allontanano l'intimità. Ma chi vince la freddezza di questa caduta scopre un tesoro raro: una fedeltà priva di illusioni, una dedizione operosa che non tradisce e la capacità di amare l'altro esattamente nella sua imperfetta umanità.",
      sintesi: "Sentimento imbrigliato dal controllo razionale; il riscatto comincia quando accetti che l'amore non si misura."
    }
  },

  combinations: {
    'Taurus|2': {
        title: "Venere in Toro in Seconda Casa",
        canonico: "Venere risiede nel proprio domicilio notturno nel Toro e abita la seconda casa, suo luogo naturale di consonanza: le proprietà del desiderio, dell'attrazione sensuale e della ricchezza terrena trovano qui la massima cooperazione astrologica. La tradizione classica riconosce in questo schema l'emblema dell'abbondanza feconda, del gusto sicuro per le cose di pregio e della capacità di consolidare patrimoni senza affanni rovinosi. Chi porta questo contrassegno emana una bellezza serena e un fascino pacificatore che attira favori concreti nei settori delle arti, dell'agricoltura e del commercio decoroso. I pericoli canonici toccano l'avidità indolente, l'avarizia scambiata per cautela e la resistenza pigra contro ogni cambiamento delle proprie abitudini quotidiane. La materia non custodita con generosità imputridisce nel silenzio delle cantine: il lusso terreno assume vero valore solo quando si trasforma in banchetto aperto e nutrimento per la vita comune.",
        lilithiano: "Conosci il peso della materia, la grana della terra e il ritmo segreto delle stagioni con una sapienza che viene dalle ossa. L'educazione familiare dipingeva il mondo come una giungla spietata in cui solo chi possiede beni materiali può scampare al disprezzo generale. Hai scambiato la comodità di un nido protetto per la felicità, rinunciando all'avventura per non mettere a rischio le tue dispense.\n\nLilith spalanca le finestre della tua dimora custodita: il piacere non è un anestetico per sopire i tormenti della coscienza, ma un fuoco selvaggio che deve scorrere senza padroni. Se vivi solo per difendere le tue provviste, diventi la custode delle tue paure invece che l'amante della vita. La tua libertà rinasce quando osi rischiare qualcosa per amore di una verità che non promette alcun ritorno economico immediato.\n\nLa tua carne è sapiente e le tue mani sanno portare ordine e bellezza dove prima c'era solo trascuratezza. Un corpo pacificato con la terra non teme la carestia: l'abbondanza autentica sgorga spontanea dove il possesso cessa di essere una trincea contro la vita.",
        sintesi: "Venere in domicilio in seconda casa: opulenza e grazia dei sensi che elevano l'esistenza quando disinnescano la bramosia del possesso."
      },
    'Libra|7': {
        title: "Venere in Bilancia in Settima Casa",
        canonico: "Nel segno del proprio domicilio diurno e insediata nella settima casa, Venere realizza la quadratura perfetta dell'archetipo dell'accordo e della convivenza civile. La dottrina antica riconosce in tale figura il sommo arbitro delle alleanze, capace di forgiare patti stabili e nozze nobili attraverso la parità di dignità tra i contraenti e la delicatezza della condotta. Chi nasce con questo sigillo possiede un talento innato nel comporre i dissidi, disarmando le contese con la grazia del linguaggio e un senso innato di giustizia distributiva. I rischi registrati dalla tradizione toccano la debolezza del carattere di fronte all'altrui prepotenza, il formalismo vacuo e la fuga dall'attrito a discapito della sincerità. La diplomazia priva di coraggio si riduce a un cerimoniale funebre: l'alleanza nobilita i contraenti solo finché ciascuno è pronto a sostenere l'urto della franchezza pur di salvare l'onore del patto.",
        lilithiano: "Ti hanno convinta fin dall'infanzia che la tua unica dote consistesse nel farti amare, nel comporre le risse degli altri e nell'essere sempre amabile anche quando dentro ti ribolliva il sangue. I precetti della buona creanza imponevano il sorriso perenne e la cancellazione delle proprie istanze per non turbare la serenità dei commensali.\n\nLilith frantuma il tuo specchio di cortesia: non vivi per fare da tappezzeria soave alle pretese di chi ti circonda. L'amore vero non si ottiene con la resa dei propri confini né con la mediazione permanente a proprio discapito. La tua iniziazione comincia il giorno in cui osi dire un no rotondo, limpido e definitivo, lasciando che la corte intorno a te rimanga per una volta scontenta.\n\nLa tua grazia naturale è una spada di luce: quando non la prostituisci per mendicare una carezza di approvazione, diventa lo strumento con cui rimetti in asse i rapporti umani corrotti. Sai creare unioni sacre fondate sulla libertà e sul mutuo rispetto. L'amore sovrano nasce esclusivamente tra pari che non chiedono sconti alla realtà: due fierezze integre che si riconoscono senza piegarsi.",
        sintesi: "Venere signora della settima casa: maestria assoluta nella conciliazione che acquista vera nobiltà quando diserta l'adulazione."
      }
  },

  retrograde: {
    title: 'Venere Retrograda — L’Eros Riportato alla Fonte Segreta',
    text: "L'attrazione affettiva non cerca conferme nei rituali del consenso né si adatta ai canoni estetici prefabbricati dalla cultura dominante. Quando Venere arretra, il valore delle cose e delle relazioni non viene stabilito dall'approvazione altrui: la persona deve trovare dentro di sé la misura esatta di ciò che merita amore e rispetto. Questo assetto produce un'intimità schiva nell'adolescenza, segnata dalla sensazione di non desiderare ciò che gli altri desiderano. Con il tempo fiorisce una capacità d'amare incorruttibile, che ignora le apparenze e stringe patti solo dove ravvisa un'autentica consonanza dell'anima. Spesso affiora il timore dell'inadeguatezza: sentirsi indegni d'affetto per non saper recitare la parte prescritta dal mercato sentimentale.",
    sintesi: "Il desiderio si affranca dai canoni sociali: misura intima del valore e rifiuto dei compromessi d'apparenza."
  }
};

// Bozza di BODIES.Lilith per calcolatore-corpi-dict.js
  // =========================================================================
  // LILITH (Luna Nera Media) — la sovranità radicale, il rifiuto della
  // sottomissione, la verità non negoziabile e l'iniziazione dell'ombra.
  // =========================================================================
  BODIES.Lilith = {
  signs: {
    Aries: {
      title: 'Lilith in Ariete — La Furia dell’Origine Insubordinata',
      text: "La Luna Nera qui incide l'anima nel punto esatto in cui l'istinto si rifiuta di attendere il permesso altrui. C'è una memoria primordiale di soffocamento, una ribellione viscerale contro ogni tentativo di imbrigliare la tua iniziativa o di moderare la tua foga per compiacere i deboli. Non accetti compromessi quando è in gioco la tua autodeterminazione. L'ombra di questa fiamma è la furia reattiva: scambiare ogni limite pratico per un attacco frontale e bruciare alleanze preziose prima ancora che abbiano avuto il tempo di dimostrarsi leali, per il solo terrore di essere messi in catene.",
      sintesi: "Rifiuto viscerale della sottomissione e rottura immediata; il rischio è distruggere per paura del vincolo."
    },
    Taurus: {
      title: 'Lilith in Toro — Il Sacrilegio della Carne Sovrana',
      text: "Il nodo dell'esilio lilithiano tocca il corpo, il piacere non regolamentato dai codici morali e la gestione autonoma della materia. Ti è stato chiesto di vergognarti della tua voracità naturale, dei tuoi appetiti o del tuo attaccamento alla terra, e la risposta è stata una rivendicazione ostinata, quasi sacrilega, del diritto all'auto-nutrimento. Possiedi un'indipendenza materiale che non si lascia piegare da ricatti economici. La trappola è il rancore accumulato nella materia: trattenere le risorse con durezza o punire il corpo attraverso privazioni ascetiche per dimostrare di non avere bisogno di nulla.",
      sintesi: "Rivendicazione carnale e materiale non negoziabile; il nodo è non trasformare l'autonomia in un digiuno vendicativo."
    },
    Gemini: {
      title: 'Lilith in Gemelli — La Parola Eretica che Rompe il Tabù',
      text: "La ferita e la sovranità si manifestano attraverso la voce, il pensiero anticonformista e la capacità di pronunciare la verità scomoda che tutti gli altri fingono di non vedere. Sei l'elemento perturbatore che smonta le certezze ipocrite con una battuta fulminea o con una logica spietata che non rispetta le autorità costituite. Il bando che hai conosciuto riguardava il tuo diritto di dubitare e di fare domande proibite. Il punto delicato è l'uso cinico dell'intelligenza: usare l'ironia come una lama per non farsi mai raggiungere da nessuno e per non rischiare mai il coinvolgimento emotivo.",
      sintesi: "Intelligenza corrosiva che infrange i dogmi; l'ombra è l'uso dell'ironia come fortezza inaccessibile."
    },
    Cancer: {
      title: 'Lilith in Cancro — Il Rifiuto del Grembo Addomesticato',
      text: "Lilith scava nella radice della famiglia, della maternità biologica e del mito del sacrificio femminile imposto come dovere morale. C'è stata in te una ribellione precoce contro l'obbligo di fare da custode ai segreti della stirpe e al ricatto della colpa ancestrale, pagando il prezzo di sentirti l'estraneo nel focolare d'origine. C'è una chiaroveggenza emotiva che percepisce le dinamiche simbiotiche tossiche prima che si manifestino. La trappola è il terrore dell'abbandono rovesciato in gelo difensivo: negare il proprio bisogno di appartenenza e respingere chi ama per non rischiare di essere divorati.",
      sintesi: "Frattura con il ricatto del sangue e della colpa; il compito è non trasformare il dolore in una fortezza gelida."
    },
    Leo: {
      title: 'Lilith in Leone — La Corona Nera Strappata all’Omologazione',
      text: "La rivendicazione di sovranità è assoluta: non accetti di essere un satellite attorno al Sole di qualcun altro né tolleri che la tua luce venga sminuita per non oscurare figure mediocri. C'è un magnetismo fiero, indomito, che incute timore a chi basa il proprio potere su gerarchie convenzionali. Hai conosciuto l'umiliazione dell'orgoglio e ne sei uscito con il rifiuto perentorio di piegare la testa davanti a qualsiasi padrone. Il pericolo risiede nell'isolamento dispotico: scambiare la solitudine della vetta per l'unica forma di dignità, finendo per considerare nemico chiunque non si prostri davanti alla tua grandezza.",
      sintesi: "Orgoglio indomito che rifiuta ruoli gregari; il rischio è la superbia che condanna all'isolamento assoluto."
    },
    Virgo: {
      title: 'Lilith in Vergine — La Ribellione del Caos Contro la Gabbia del Dovere',
      text: "Il conflitto tocca il tema dell'ordine imposto, della servitù mascherata da virtù e del controllo ossessivo esercitato sulla spontaneità vitale. Rifiuti con disprezzo viscerale l'addestramento all'obbedienza cieca e la riduzione dell'essere a mero ingranaggio produttivo. Possiedi un talento diagnostico implacabile: vedi immediatamente l'ipocrisia dei sistemi perfetti e sai dove colpire per far crollare la finzione. L'insidia è il sabotaggio metodico: rivolgere la lama critica contro la propria opera, impedendosi di concludere alcunché per il terrore che il risultato contenga una minima imperfezione.",
      sintesi: "Rifiuto della servitù e lucidità critica implacabile; la trappola è sabotarsi per non accettare l'imperfezione del fare."
    },
    Libra: {
      title: 'Lilith in Bilancia — Il Rifiuto del Compromesso Pacificatore',
      text: "La Luna Nera lacera il velo dell'armonia di facciata e delle buone maniere usate per mettere a tacere le disparità reali. Non credi alla pace ottenuta sacrificando la verità e provi un'insofferenza viscerale per chi scende a patti disonorevoli pur di evitare una discussione franca. Nelle relazioni pretendi una parità radicale, in cui nessuno chieda all'altro di mutilare la propria natura. La sfida è non trasformare ogni incontro in un tribunale inquisitorio: il rischio di vedere tradimenti e ingiustizie anche dove c'era soltanto una normale e umana fragilità dell'altro.",
      sintesi: "Intolleranza per la falsa armonia e patti iniqui; l'ostacolo è trasformare il confronto in un'inquisizione perpetua."
    },
    Scorpio: {
      title: 'Lilith in Scorpione — La Sacerdotessa dell’Ombra Sovrana',
      text: "Qui Lilith tocca la sua sede di massima potenza iniziatica: l'abisso non fa paura, è il terreno familiare in cui la verità viene spogliata di ogni residuo consolatorio. Riconosci l'ipocrisia morale della società patriarcale con uno sguardo che non vacilla e possiedi un potere di rigenerazione che terrorizza chi cerca di manipolarti. Hai attraversato il tradimento e hai scoperto che la tua forza rinasce sempre più intatta. Il pericolo mortale è la vendetta cosmica: restare prigionieri della memoria delle ferite subite, usando il proprio magnetismo per distruggere chiunque mostri un segno di debolezza.",
      sintesi: "Potenza iniziatica pura nel regno dell'ombra; la grandezza esige di non fare della distruzione la propria dimora."
    },
    Sagittarius: {
      title: 'Lilith in Sagittario — La Nemica dei Falsi Maestri e dei Dogmi',
      text: "Il bando lilithiano si accende contro le verità rivelate dall'alto, le morali precostituite e i sacerdoti di ogni ortodossia che pretendono di insegnare come si vive. Rifiuti ogni gabbia ideologica e cerchi la tua iniziazione sulle strade del mondo, attraverso l'esperienza diretta e selvaggia che non deve rendere conto a nessun tempio. Sei un viandante senza patria che non si lascia convertire. Il limite è il fanatismo alla rovescia: l'incapacità di riconoscere saggezza autentica anche quando si presenta sotto forme tradizionali, scambiando il rifiuto di ogni guida per illuminazione personale.",
      sintesi: "Rifiuto delle ortodossie e ricerca indomita della verità; l'ombra è scambiare la ribellione cieca per saggezza."
    },
    Capricorn: {
      title: 'Lilith in Capricorno — L’Autorità Nuda che Non Deve Nulla a Nessuno',
      text: "La sovranità si forgia nell'assoluto disincanto: hai compreso molto presto che le istituzioni terrene premiano l'adulazione e puniscono l'integrità, e hai scelto di costruire la tua forza sulla solitudine della pietra. Non chiedi soccorso, non accetti debiti morali e guardi il potere convenzionale con un distacco regale che disarma chi cerca di controllarti. Non c'è ambizione mondana che possa corromperti. La ferita nascosta è l'atrofia del calore vitale: diventare così inespugnabili da soffocare ogni moto di tenerezza spontanea, vivendo la vita come una sentinella su una torre di ghiaccio.",
      sintesi: "Autonomia incorruttibile e disincanto sovrano; la trappola è chiudersi in un gelo che rifiuta la vita stessa."
    },
    Aquarius: {
      title: 'Lilith in Acquario — L’Aliena che Rifiuta il Branco',
      text: "L'esilio tocca il legame con la comunità, il gruppo di pari e l'obbligo di conformarsi al pensiero dominante della propria tribù. Non sopporti il conformismo progressista più di quello conservatore: smascheri l'intolleranza mascherata da tolleranza e rivendichi una singolarità che non si lascia arruolare in nessuna fazione precostituita. Sei la voce fuori dal coro che spezza l'unanimità forzata. La zona d'ombra è la disumanizzazione ideologica: sentirsi così superiori alla folla da non provare più pietà per le cadute umane, ritirandosi in una freddezza spaziale priva di cuore.",
      sintesi: "Indipendenza radicale da ogni fazione o tribù; il rischio è cadere nell'indifferenza glaciale verso gli umani."
    },
    Pisces: {
      title: 'Lilith in Pesci — Il Caos Sacro Sommerso nel Silenzio',
      text: "Lilith dimora nell'oceano senza sponde dell'inconscio, dove la colpa cosmica e il senso di peccato ancestrale sono stati imposti per secoli alla psiche umana. Rifiuti di fare da vittima sacrificale per i peccati del mondo e demolisci l'illusione della salvezza delegata a un salvatore esterno. Possiedi una percezione medianica dei confini invisibili e un'attrazione per ciò che la società considera folle o marginale. Il pericolo è la dissoluzione nelle nebbie della dipendenza: scivolare nella fuga psichica, nella dispersione energetica e nell'autosabotaggio nebuloso per non affrontare la forma finita del reale.",
      sintesi: "Demolizione del senso di colpa universale; la salvezza esige di non annegare nell'illusione e nella fuga."
    }
  },

  houses: {
    1: {
      title: 'Lilith in Prima Casa — La Maschera Spezzata alla Nascita',
      text: "La soglia della persona è segnata dal marchio indelebile della diversità: emani un magnetismo perturbante che gli altri avvertono ancora prima di conoscerti. Non puoi recitare la parte della creatura accomodante senza avvertire un senso immediato di nausea corporea. La tua sola presenza mette in crisi chi cerca relazioni fondate su finzioni e convenienze sociali. La sfida più alta è non fare della reattività il tuo intero destino: imparare che esistere come creatura sovrana non richiede di dover dichiarare guerra a ogni persona che incontri lungo la strada.",
      sintesi: "Presenza magnetica che perturba e non finge; la lezione è non fare della battaglia l'unico modo di esistere."
    },
    2: {
      title: 'Lilith in Seconda Casa — Il Patto di Autonomia sulla Sostanza',
      text: "Il nodo dell'esilio e della sovranità riguarda il tuo rapporto con il denaro, i beni tangibili e il diritto di sostentamento. Un'antica imposizione voleva che per ottenere sicurezza materiale bisognasse vendere una parte della propria anima o piegare la schiena davanti a chi deteneva i cordoni della borsa. Hai risposto costruendo un'autonomia economica inflessibile, che rifiuta doni avvelenati e lasciti condizionati. Il limite è l'ansia della privazione: faticare a godere della ricchezza accumulata per il timore perenne che qualcuno possa venire a strappartela con l'inganno.",
      sintesi: "Sostentamento difeso da ogni compromesso disonorevole; il nodo è non trasformare l'indipendenza in un'ossessione difensiva."
    },
    3: {
      title: 'Lilith in Terza Casa — Il Verbo che Non Chiede Permesso',
      text: "La ribellione lilithiana è passata attraverso la scuola, i primi compagni di gioco e i fratelli: hai sperimentato precocemente il silenzio imposto, la censura delle tue curiosità ardite e l'etichetta di persona difficile per il solo fatto di dire le cose con il loro nome crudo. Oggi la tua parola possiede una precisione chirurgica che atterrisce chi manipola la realtà con bugie rassicuranti. La trappola da disinnescare è la provocazione fine a se stessa: usare il linguaggio unicamente per ferire o distruggere l'interlocutore prima che possa contestare il tuo pensiero.",
      sintesi: "Parola affilata che squarcia le menzogne dell'ambiente; l'insidia è fare della provocazione un riflesso automatico."
    },
    4: {
      title: 'Lilith in Quarta Casa — Lo Strappo con la Matrice d’Origine',
      text: "Il crogiuolo iniziatico risiede nelle fondamenta della casa d'infanzia, nella figura materna e nei patti silenziosi della genealogia. C'è in te la memoria dell'ospite straniero nel sangue d'origine, di chi ha rifiutato di portare la maschera della rispettabilità di facciata per compiacere i parenti. Hai conosciuto l'esilio domestico e ne sei uscito imparando a fondare la tua casa unicamente sulla tua integrità. La difficoltà è il cordone non reciso: continuare a provare rancore per chi non ha saputo accoglierti, rimanendo agganciati alle ferite del nido antico.",
      sintesi: "Estraneità radicale alle ipocrisie del clan d'origine; la guarigione comincia quando fondi il tuo vero tempio interiore."
    },
    5: {
      title: 'Lilith in Quinta Casa — L’Eros Sovrano che Non Genera per Dovere',
      text: "Il tabù tocca la creatività pura, la sessualità vissuta come gioco sacro e la sovranità del corpo che rifiuta di riprodursi o creare per compiacere le aspettative sociali. La tua arte o la tua passione non possono essere addomesticate da canoni commerciali: crei solo quando c'è una verità bruciante da incarnare. Nei legami amorosi cerchi complici e mai carcerieri. Il punto di attrito è l'insofferenza per l'impegno affettivo: fuggire l'intimità non appena l'altro manifesta bisogni ordinari, scambiando la propria incapacità di donarsi per pura libertà.",
      sintesi: "Creatività e desiderio selvaggio che rifiutano obblighi; il limite è fuggire l'amore per paura della costrizione."
    },
    6: {
      title: 'Lilith in Sesta Casa — Il Rifiuto della Servitù Quotidiana',
      text: "La lotta contro l'addomesticamento si combatte nel lavoro ordinario, nelle gerarchie aziendali e nel rapporto con la disciplina del corpo fisico. Rifiuti con orrore la routine alienante e l'idea che la dignità umana debba essere misurata dal grado di sottomissione a un superiore mediocre. Spesso il corpo somatizza con ribellioni violente quando viene costretto in ritmi innaturali. La sfida è governare il proprio mestiere senza farsi divorare dall'astio: trovare un'occupazione in cui la propria maestria operi da sovrana, senza sprecare energie in battaglie sterili contro gli apparati.",
      sintesi: "Insofferenza totale per l'alienazione del lavoro servo; la vittoria è padroneggiare un'arte autonoma e sovrana."
    },
    7: {
      title: 'Lilith in Settima Casa — Lo Specchio che Rifiuta il Compromesso',
      text: "Lilith occupa la soglia dell'altro, il luogo dei patti e del matrimonio: le relazioni diventano il tuo campo d'iniziazione più severo e trasformativo. Non accetti compagni tiepidi, né sopporti i patti convenzionali in cui uno dei due debba fare da ombra all'altro. Attiri partner intensi, controversi o con cui ingaggi una contesa continua per la parità sovrana. La trappola è il terrore di essere fagocitati: rompere l'alleanza al primo segnale di intesa per paura di perdere la propria libertà, scambiando la complicità leale per una gabbia da cui fuggire.",
      sintesi: "Patti a due come crogiuolo di sovranità paritaria; il nodo è non distruggere l'amore per il terrore del vincolo."
    },
    8: {
      title: 'Lilith in Ottava Casa — Il Custode dei Segreti del Passaggio',
      text: "Questa è una delle collocazioni più potenti e temute del tema: Lilith risiede nel regno delle crisi decisive, della morte simbolica, del potere occulto e dell'intimità viscerale. Hai uno sguardo capace di scendere negli abissi dell'animo umano senza voltarsi indietro e non hai timore di ciò che la società nasconde sotto il tappeto. Possiedi un magnetismo che trasforma chi ti incontra. La tentazione da superare è l'uso vendicativo del potere: manipolare le paure altrui per mantenere il controllo assoluto, rimanendo prigionieri della propria stessa oscurità.",
      sintesi: "Accesso regale ai misteri profondi della trasformazione; la grandezza esige di usare il potere senza sete di dominio."
    },
    9: {
      title: 'Lilith in Nona Casa — La Cerca dello Spazio Incontaminato',
      text: "La sete di libertà si sposta verso orizzonti geografici e spirituali remoti: non accetti le fedi imposte dalla tua cultura d'origine e guardi con disgusto i dogmi religiosi che predicano la colpa e l'obbedienza. La tua etica è forgiata nel deserto, lontana dai pulpiti ufficiali. Hai bisogno di viaggiare e studiare per conto tuo, cercandoti le risposte senza mediatori autorizzati. Il rischio è l'esilio perenne: non trovare mai pace in nessun luogo, idealizzando una terra incontaminata che non esiste per fuggire la responsabilità di costruire nel presente.",
      sintesi: "Spirito pellegrino che demolisce i dogmi e cerca spazi liberi; l'ombra è la fuga continua senza mai approdare."
    },
    10: {
      title: 'Lilith in Decima Casa — L’Autorità Eretica alla Luce del Mondo',
      text: "La Luna Nera culmina nel cielo pubblico, sfidando apertamente le gerarchie del potere sociale, l'autorità patriarcale e i codici di rispettabilità borghese. Non accetti di recitare la commedia dell'obbedienza per fare carriera: se ottieni riconoscimento lo fai alle tue condizioni, pagando spesso il prezzo di calunnie, scandali o tentativi di boicottaggio da parte dei mediocri. Sei un punto di riferimento per chi cerca il coraggio di essere autentico. L'insidia è la solitudine del bersaglio: credere di dover sempre combattere da soli contro tutti, irrigidendosi in una trincea perenne.",
      sintesi: "Presenza pubblica che contesta l'autorità finta; la maestria è guidare con fermezza senza cadere nel martirio pubblico."
    },
    11: {
      title: 'Lilith in Undicesima Casa — L’Anima Eretica nell’Assemblea',
      text: "Il banco di prova è l'appartenenza ai gruppi, alle comunità politiche o ai circoli intellettuali. Ti ribelli prontamente quando l'assemblea comincia a chiedere conformismo, obbedienza alla linea o censura del dissenso interno in nome di una presunta causa comune. Sei colui che svela l'autoritarismo mascherato da fraternità. Le tue amicizie sono rare, fedelissime e scelte tra individui indomiti. Il pericolo è il disprezzo per la collettività: ritirarsi in una solitudine cinica, convincendosi che gli esseri umani siano incapaci di condividere ideali senza cadere nel servilismo.",
      sintesi: "Rifiuto del conformismo di gruppo e vigilanza eretica; la trappola è disprezzare ogni progetto comune."
    },
    12: {
      title: 'Lilith in Dodicesima Casa — Il Segreto Primordiale nel Santuario Sommerso',
      text: "Lilith risiede nella camera più nascosta dell'inconscio, dove la memoria ancestrale del bando e della persecuzione è custodita in profondità oceaniche. Puoi aver vissuto un senso di alienazione misterioso fin dall'infanzia, una solitudine sacra che non trovava conforto in nessuna voce terrena. Hai doni medianici e un contatto intatto con la saggezza selvaggia che precede la civiltà patriarcale. La sfida suprema è il riscatto dall'invisibilità: smettere di nascondere la propria verità per paura del giudizio del mondo, portando la luce nera della propria sovranità fuori dal chiostro interiore.",
      sintesi: "Saggezza primordiale custodita nel silenzio dell'anima; la liberazione esige il coraggio di uscire dal nascondiglio segreto."
    }
  },

  dignities: {},

  combinations: {
    'Scorpio|8': {
        title: "Lilith in Scorpione in Ottava Casa",
        canonico: "La Luna Nera occupa lo Scorpione e sprofonda nell'ottavo settore, vertice delle prove iniziatiche e dei patti occulti: massima concentrazione della pulsione viscerale che non ammette compromessi. La tradizione esoterica riconosce qui il transito obbligato attraverso la notte dell'anima, dove ogni finzione deve morire affinché risorga l'autenticità incorruttibile. Chi porta questa configurazione sperimenta crisi radicali e confronti crudi con il tabù della perdita e del potere. I pericoli canonici toccano l'attaccamento vendicativo, la fascinazione distruttiva per l'abisso e l'ossessione del tradimento che sabota le intese sincere. Chi si ostina a stringere il pugnale del rancore finisce per ferire unicamente la propria carne: la conoscenza dei recessi oscuri diventa medicina solo quando rinuncia a fabbricare trappole per i colpevoli di ieri.",
        lilithiano: "Le cose non dette nelle stanze di casa ti facevano sanguinare le gengive prima ancora che imparassi a leggere. L'omertà della parentela imponeva di fingere che certe violenze non fossero mai accadute, pretendendo rispetto formale verso figure che avevano avvelenato la stirpe. Porti addosso il peso di segreti che non ti appartenevano.\n\nLilith ti ordina di deporre il veleno che continui a distillare per difenderti: la diffidenza armata non è sovranità, è la confessione che il passato comanda ancora i tuoi gesti. La vendetta non risana il grembo ferito. Il tuo affrancamento si compie quando smetti di indagare sui moventi altrui e scopri che la tua luce regale non ha bisogno di scavare fosse per brillare in tutta la sua magnificenza.\n\nPossiedi una vista da rapace che trapassa la nebbia delle apparenze mondane: non c'è maschera che possa reggere al tuo sguardo limpido e disarmante. Abbandonare il cimitero dei torti patiti è l'atto di diserzione definitivo: la lama della consapevolezza taglia i fili della vendetta e restituisce la sovranità alla luce.",
        sintesi: "Luna Nera nell'ottava casa in Scorpione: catabasi radicale che dissolve ogni finzione e risorge nella purezza del disincanto."
      },
    'Capricorn|10': {
        title: "Lilith in Capricorno in Decima Casa",
        canonico: "La Luna Nera nel Capricorno siede al Medio Cielo, esponendo la spinta emancipatrice al massimo grado di visibilità istituzionale e giudizio pubblico. La tradizione registra questo schema come il rifiuto categorico delle gerarchie arbitrarie e dei titoli ereditati per privilegio di sangue. Chi nasce con questo sigillo fatica ad accettare capi mediocri o regole corporative prive di fondamento etico reale, entrando presto in rotta di collisione con le cariche ufficiali. I rischi tradizionali contemplano la caduta rovinosa dovuta a ribellioni premature, il cinismo amaro verso la convivenza civile e la reclusione misantropica dopo una sconfitta politica. Le gerarchie imposte con la violenza crollano sotto il proprio peso: chi intende governare la materia deve imparare a fondare il comando sulla rettitudine interiore, accettando l'impopolarità senza trasformarla in cinismo.",
        lilithiano: "Non hai mai sopportato chi dava ordini solo perché portava una divisa o un cognome altisonante. I corridoi delle istituzioni e delle aziende richiedevano ossequio cieco e diplomazia opportunista per concedere l'accesso ai ruoli di responsabilità. Ricevevi accuse di superbia e freddezza, mentre era soltanto il tuo rifiuto di prostituire l'intelletto per una briciola di carriera.\n\nLilith ti attende proprio dove le strutture del potere cercano di piegarti: non farti rubare la gioia di costruire dal rancore verso chi governa male. La solitudine austera in cui ti rifugi rischia di diventare una cella di pietra dove muori di gelo per orgoglio. La tua vera regalità comincia quando scendi in campo senza pretendere che il mondo sia perfetto, edificando opere solide con la pazienza millimetrica degli antichi architetti.\n\nLa tua integrità morale è una scogliera contro cui si infrangono le lusinghe dei corridoi corrotti: non hai un prezzo e nessuno può comprarti. Nessun palazzo del potere può intimidire chi ha imparato a camminare tra le bufere senza mendicare cappotti: l'integrità morale resta la sola fortezza inespugnabile.",
        sintesi: "Luna Nera culminante in Capricorno: diserzione dalle gerarchie ipocrite che edifica una sovranità autonoma e inattaccabile."
      }
  },

  retrograde: {
    title: 'Lilith Retrograda — La Fiamma Che Ritorna all’Origine Primordiale',
    text: "Il rifiuto del ricatto non si esaurisce in una reazione polemica contro l'autorità, ma scava fino alla sorgente della propria fiamma primordiale. Quando la Luna Nera arretra nel tema natale, la ribellione cessa di essere una lite continua con il mondo esterno per trasformarsi in una diserzione radicale e irrevocabile: la persona smette semplicemente di negoziare la propria essenza selvatica. Si impara a convivere con l'esilio interiore senza chiedere asilo a comunità compiacenti né mendicare comprensione dai propri censori. Questa solitudine genera una fermezza regale, immune alla vergogna e al senso di colpa inculcato dal costume. Chi cova un rancore implacabile rischia di avvelenare l'anima anziché liberarla, trasformando la fiamma in cenere amara.",
    sintesi: "Diserzione radicale da ogni ricatto: la fiamma selvaggia diventa sovranità che non ha bisogno di combattere."
  }
};

// Bozza di BODIES.Mercury per calcolatore-corpi-dict.js
  // =========================================================================
  // MERCURIO — il principio cognitivo, il verbo, l'analisi, la trasmissione
  // e la connessione ermetica tra mondi diversi.
    // =========================================================================
  // LUNA NERA VERA (TrueLilith / Osculatrice) — il lampo della rottura,
  // la soglia somatica non negoziabile, l'istinto viscerale non addomesticabile.
  // =========================================================================
// Bozza di BODIES.TrueLilith per calcolatore-corpi-dict.js
  BODIES.TrueLilith = {
  signs: {
    Aries: {
      title: 'Luna Nera Vera in Ariete — L’Impulso Fulmineo della Rottura Istantanea',
      text: "L'apogeo lunare vero accende in Ariete un detonatore psichico immediato: la soglia di tolleranza verso qualsiasi imposizione è ridotta a zero millisecondi. Mentre la Luna Nera media lavora su un rifiuto strutturale e continuo, l'oscillazione vera si manifesta come una saetta che squarcia improvvisamente la calma apparente quando qualcuno tenta di impartire un comando non concordato. C'è una prontezza marziale straordinaria nel difendere la propria sovranità prima ancora che la mente razionale abbia calcolato le conseguenze. Il rischio è la terra bruciata: agire d'anticipo distruggendo opportunità feconde per l'illusione persecutoria di un agguato imminente.",
      sintesi: "Reattività fulminea e rifiuto istantaneo del comando; il pericolo è distruggere ponti utili prima del tempo."
    },
    Taurus: {
      title: 'Luna Nera Vera in Toro — Il Rigetto Corporeo della Mercificazione',
      text: "Nel segno della terra fissa, la Luna Nera osculatrice agisce come un riflesso di rigetto viscerale e somatico. Il corpo si ribella istantaneamente se costretto a subire manipolazioni, ritmi estranei o compromessi che offendono la dignità materiale. Non si tratta di una teoria astratta ma di una reazione organica: la pelle, il respiro e l'energia fisica segnalano il pericolo di espropriazione con chiarezza inappellabile. Possiedi un fiuto infallibile per smascherare chi vuole monetizzare la tua presenza. Il punto critico è la serrata ostinata: trincerarsi dietro un mutismo difensivo che impedisce qualsiasi scambio vitale con l'esterno.",
      sintesi: "Allarme somatico immediato contro ogni mercificazione; il nodo è non trasformare la tutela del corpo in isolamento."
    },
    Gemini: {
      title: 'Luna Nera Vera in Gemelli — Il Lampo Eretico che Squarcia la Retorica',
      text: "L'oscillazione rapida tocca la parola, il sistema nervoso e la reazione intellettuale. Quando ti trovi di fronte a un discorso manipolatorio o a una finzione sociale, scatta una replica corrosiva e istintiva capace di smascherare l'impalcatura ipocrita in una sola sillaba. La mente funziona come un rivelatore di doppiezze, cogliendo l'incongruenza logica prima che chi parla abbia finito la frase. È un dono tagliente e temuto negli ambienti formali. L'ombra di questa vivacità è il cinismo compulsivo: ridicolizzare la vulnerabilità altrui solo per evitare che una conversazione tocchi corde intime e profonde.",
      sintesi: "Smascheramento fulmineo dell'ipocrisia retorica; l'insidia è fare dell'ironia uno scudo perenne contro l'intimità."
    },
    Cancer: {
      title: 'Luna Nera Vera in Cancro — Il Brivido Ancestrale che Spezza l’Intreccio',
      text: "La Luna Nera vera tocca la memoria arcaica del sangue e il cordone ombelicale: basta un gesto sottile di ricatto affettivo per innescare un brivido freddo di separazione radicale. Se la famiglia o il gruppo tentano di imporre la lealtà al clan a scapito della tua integrità, la risposta è un distacco emotivo istantaneo che sconcerta chi credeva di averti in pugno. Non tolleri la colpa indotta. La sfida risiede nel non pietrificare il cuore: distinguere l'ingerenza manipolatoria dal calore sincero, evitando di interpretare ogni gesto d'affetto come una trappola tesa per limitare la tua autonomia.",
      sintesi: "Rottura immediata del ricatto familiare ed emotivo; la fatica è non considerare ogni vicinanza una prigione potenziale."
    },
    Leo: {
      title: 'Luna Nera Vera in Leone — La Fiammata Sovrana che Disintegra la Recita',
      text: "Nel domicilio solare, l'apogeo osculatore non ammette alcuna forma di sottomissione estetica o morale: se qualcuno prova a degradarti a comparsa o a dispensare elogi paternalistici, l'orgoglio esplode con un'intensità abbagliante. La rivendicazione di rispetto è primordiale e non accetta anticamere. C'è una luce magnetica e spietata, che ridicolizza i potenti di cartapesta con una sola occhiata di sdegno regale. Il trabocchetto è la collera distruttiva dell'ego: scambiare una critica costruttiva per un attentato alla propria maestà, chiudendosi in una torre d'avorio dove nessuno può più raggiungerti.",
      sintesi: "Orgoglio fulmineo che disintegra il paternalismo; l'errore è credere che qualsiasi confronto sia un affronto mortale."
    },
    Virgo: {
      title: 'Luna Nera Vera in Vergine — L’Attrito Tagliente che Disarma il Protocollo',
      text: "La precisione osculatrice si manifesta come una scintilla che fa saltare i meccanismi dell'obbedienza cieca e delle gerarchie d'ufficio. Riconosci in un batter d'occhio la falla nascosta di una procedura e provi un'insofferenza quasi fisica verso chi sacrifica il buon senso sull'altare della burocrazia. C'è un'esigenza di verità operativa chirurgica, che rifiuta di eseguire compiti umilianti o privi di scopo autentico. La debolezza è l'autosabotaggio ipercritico: bloccare un progetto promettente al primo minuscolo difetto, pretendendo una perfezione impossibile pur di non doversi confrontare con il giudizio del pubblico.",
      sintesi: "Rifiuto viscerale della burocrazia ottusa e precisione chirurgica; il rischio è paralizzarsi nell'ossessione del dettaglio perfetto."
    },
    Libra: {
      title: 'Luna Nera Vera in Bilancia — Lo Strappo Subitaneo del Falso Accordo',
      text: "Nel segno dell'equilibrio convenzionale, la Luna Nera vera avverte la falsità di un patto molto prima che le clausole vengano tradite nei fatti. C'è un'allergia radicale per le cortesie ipocrite e per chi sorride nascondendo un pugnale dietro la schiena: in quel frangente rompi le trattative bruscamente, senza attendere i tempi diplomatici che gli altri vorrebbero imporre. Pretendi patti fondati sulla parità assoluta. L'ombra è la rottura preventiva delle unioni: mandare all'aria una relazione sana alla minima discrepanza di opinioni per la paura atavica di cedere la propria sovranità decisionale.",
      sintesi: "Intolleranza fulminea per le tregue ingannevoli; il compito è distinguere il compromesso utile dalla sottomissione reale."
    },
    Scorpio: {
      title: 'Luna Nera Vera in Scorpione — Il Morso dell’Abisso che Travolge l’Inganno',
      text: "La Luna Nera osculatrice raggiunge qui il suo grado massimo di penetrazione e di potenza sotterranea. Nulla può restare nascosto: percepisci le intenzioni segrete, i ricatti inconfessati e le pulsioni represse di chi ti circonda con la rapidità di un lampo nel buio. Quando vieni sfidata o messa all'angolo, la tua risposta non cerca il compromesso ma colpisce al cuore della debolezza altrui con precisione chirurgica. La prova consiste nel disarmare il sospetto perenne: non credere che la vita sia un campo minato continuo e concedersi la grazia di abbassare la guardia dove esiste vera lealtà.",
      sintesi: "Sguardo che attraversa l'ombra e smonta ogni congiura; la salvezza richiede di non fare della diffidenza una religione."
    },
    Sagittarius: {
      title: 'Luna Nera Vera in Sagittario — La Freccia Fuori Bersaglio che Incendia il Tempio',
      text: "L'impulso della verità non sopporta le gabbie confessionali, le morali codificate o le prediche di chi si erge a guida spirituale senza aver mai conosciuto l'abisso. Se qualcuno tenta di catechizzarti, la risposta è una dissacrazione immediata, un'eresia liberatoria che demolisce l'autorità dell'interlocutore con un sorriso beffardo. Non accetti dogmi di seconda mano. Il pericolo è la dispersione randagia: fuggire costantemente da ogni legame, maestro o disciplina per il terrore di essere imprigionati in una dottrina, perdendo così la concentrazione necessaria a compiere la propria opera.",
      sintesi: "Eresia viva che fa crollare i falsi maestri; l'insidia è fuggire ogni approdo scambiando la fuga per libertà interiore."
    },
    Capricorn: {
      title: 'Luna Nera Vera in Capricorno — Il Terremoto che Sbriciola la Roccia del Potere',
      text: "La Luna Nera vera opera come una crepa improvvisa nelle mura dell'autoritarismo convenzionale. Di fronte a gerarchie fondate unicamente sul sopruso o sull'anzianità di carica, scatta un rifiuto glaciale che toglie ogni credibilità al potere costituito. Non rispetti le etichette formali se non sono sostenute da una dirittura morale incorruttibile. Possiedi una resistenza d'acciaio che sfinisce chi tenta di piegarti. Il rischio è la solitudine difensiva marmorea: costruire una muraglia di gelo emotivo così alta da condannare la propria esistenza a un rigore che toglie ogni dolcezza al vivere quotidiano.",
      sintesi: "Rifiuto netto dei patriarchi privi di valore etico; il nodo è non confondere l'indipendenza con l'aridità del cuore."
    },
    Aquarius: {
      title: 'Luna Nera Vera in Acquario — Il Cortocircuito che Disintegra il Gregarismo',
      text: "L'apogeo lunare osculatore agisce come un fulmine che interrompe qualsiasi conformismo di branco o di partito politico. Rifiuti con disprezzo viscerale la morale del gregge e l'obbligo di aderire a slogan ideologici solo per sentirsi parte di una maggioranza rassicurante. La tua libertà individuale è intoccabile: nel momento esatto in cui un gruppo chiede di uniformare il pensiero, prendi la porta senza voltarti indietro. L'ostacolo è l'eccentricità polemica a tutti i costi: opporsi a prescindere da qualsiasi proposta solo per affermare la propria diversità, rischiando un isolamento sterile.",
      sintesi: "Rigetto immediato dell'omologazione di massa; la trappola è fare del dissenso automatico una gabbia identitaria."
    },
    Pisces: {
      title: 'Luna Nera Vera in Pesci — Il Risucchio dell’Oceano Non Censurato',
      text: "Nell'ultimo segno zodiacale, la Luna Nera vera apre improvvisamente le paratie dell'inconscio sommerso, riversando nella coscienza visioni, sogni premonitori e rifiuti epidermici privi di spiegazione logica. Senti il non detto collettivo, la menzogna spirituale e la sofferenza mascherata da bontà con un'intensità che può togliere il fiato. Non riesci a fingere indifferenza quando avverti la corruzione sottile dell'ambiente. Il pericolo è il naufragio emotivo: lasciarsi travolgere dalle correnti psichiche senza un ancoraggio terreno, rifugiandosi nel caos interiore o nel vittimismo quando la realtà diventa troppo ruvida.",
      sintesi: "Intuizione vertiginosa dell'ombra collettiva; la sfida è costruire sponde solide per non affogare nelle maree psichiche."
    }
  },

  houses: {
    1: {
      title: 'Luna Nera Vera in Prima Casa — L’Urto Elettrico della Presenza Sovrana',
      text: "La Luna Nera osculatrice sul punto dell'Ascendente imprime all'intera persona un'aura magnetica, selvaggia e non addomesticabile che non passa mai inosservata. Chi ti incontra percepisce immediatamente che non c'è spazio per finzioni o convenevoli ipocriti: la tua sola vicinanza costringe gli altri a mostrare chi sono realmente. C'è stata una lotta precoce per difendere il diritto di manifestarsi senza censure. La difficoltà è l'eccesso di spigolosità reattiva: percepire un'ostilità nell'ambiente anche dove c'è solo timore reverenziale, attaccando per primi per non rischiare di subire un'invasione del proprio spazio vitale.",
      sintesi: "Presenza primordiale che disarma le maschere altrui; la via esige di non scambiare lo stupore degli altri per un attacco."
    },
    2: {
      title: 'Luna Nera Vera in Seconda Casa — Lo Scatto Istintivo a Difesa dei Beni Propri',
      text: "Il nodo della sovranità tocca il patrimonio, il salario e il controllo esclusivo delle proprie risorse energetiche e materiali. Non permetti a nessuno di mettere becco nelle tue decisioni economiche né tolleri che qualcuno tenti di farti sentire in colpa per ciò che possiedi o guadagni con le tue forze. C'è un fiuto affilato per scovare parassiti e manipolatori finanziari. La trappola coincide con l'avidità difensiva d'urgenza: temere che ogni condivisione di beni coincida con una perdita di autonomia, accumulando riserve con una tensione ansiosa che impedisce di godere del benessere terreno.",
      sintesi: "Autonomia economica non negoziabile e fiuto anti-parassiti; l'insidia è trasformare la cautela in ansia di scarsità."
    },
    3: {
      title: 'Luna Nera Vera in Terza Casa — La Frattura Verbale che Lacera il Silenzio',
      text: "L'energia di rottura si esprime attraverso la parola detta a voce alta, la scrittura provocatoria e l'insofferenza per i tabù del vicinato o dei fratelli. Quando una discussione tocca questioni di principio, la risposta esce tagliente come un rasoio, rompendo il velo del perbenismo senza alcuna pietà diplomatica. Spesso nei primi anni scolastici hai conosciuto l'ostracismo per aver osato contestare insegnanti o dogmi ufficiali. La sfida è governare il colpo verbale: non usare il talento argomentativo per distruggere chi semplicemente non ha i tuoi stessi strumenti intellettuali per difendersi.",
      sintesi: "Verità tagliente espressa senza censure linguistiche; il dovere morale è non infierire su chi non può replicare."
    },
    4: {
      title: 'Luna Nera Vera in Quarta Casa — Il Tremore Sotterraneo Sotto le Radici',
      text: "La Luna Nera vera si insinua nelle profondità dell'albero genealogico e dell'abitazione intima: avverti con precisione quasi sismica i segreti inconfessati dei padri e le colpe non espiate della famiglia. Se l'ambiente domestico tenta di pretendere silenzio sui drammi del passato, in te scatta la determinazione incrollabile di aprire tutte le stanze segrete e bonificare la terra. Non puoi vivere in una casa in cui si respira falsità. Il rischio è non trovare mai pace residenziale: sentirsi perennemente inquilini stranieri ovunque e rifiutare di mettere radici stabili per il terrore di ereditare una maledizione antica.",
      sintesi: "Esplorazione coraggiosa delle ombre familiari; la maturità chiede di fondare un focolare adulto libero dai fantasmi del clan."
    },
    5: {
      title: 'Luna Nera Vera in Quinta Casa — La Fiammata Indomabile dell’Eros e dell’Arte',
      text: "La dimensione creativa, il corteggiamento e il piacere carnale vengono vissuti come territori di sovranità assoluta in cui le regole dell'ipocrisia sociale decadono. Rifiuti i giochi amorosi mediocri, i compromessi matrimoniali di facciata e l'arte di maniera fatta solo per compiacere il mercato. Quando crei o quando ami lo fai con una voracità viscerale che incanta gli spiriti liberi e terrorizza i tiepidi. L'ostacolo è il sabotaggio del compimento: fuggire dalla scena appena un'opera o una passione richiede la costanza quotidiana per paura di veder svanire l'ebbrezza iniziale del fuoco puro.",
      sintesi: "Passione carnale e creatività indomita; il nodo è non bruciare ogni relazione per il solo brivido dell'inizio."
    },
    6: {
      title: 'Luna Nera Vera in Sesta Casa — La Rivolta del Corpo Contro la Macchina',
      text: "Nel settore delle incombenze pratiche e del servizio professionale, la Luna Nera vera agisce come un fusibile di sicurezza: se il lavoro diventa disumanizzante o se i superiori calpestano la dignità personale, il corpo dice basta all'istante attraverso sintomi fisici inequivocabili. Non puoi piegarti a una routine degradante solo per obbedienza. Possiedi un talento impeccabile per smontare le inefficienze e i compiti inutili imposti dal vertice. La trappola è la litiosità quotidiana: considerare ogni incarico ordinario come un tentativo di sottomissione, vivendo le ore d'ufficio in trincea permanente.",
      sintesi: "Rigetto somatico dello sfruttamento lavorativo; la saggezza consiste nel trovare una propria maestria autonoma."
    },
    7: {
      title: 'Luna Nera Vera in Settima Casa — Lo Strappo Improvviso del Vincolo Tossico',
      text: "La sfera dei patti formali, delle associazioni d'affari e del matrimonio è il teatro delle rivelazioni più brucianti. Non puoi tollerare un compagno che pretenda di farti ombra o che pretenda la sottomissione in cambio di sicurezza economica. Se avverti che la relazione sta mutando in una gabbia dorata, la tua reazione è immediata: stracciare il contratto senza rimpianti e riprendere la strada della libertà solitaria. C'è un'esigenza di lealtà adamantina. L'ombra è la fobia della vulnerabilità congiunta: sabotare un'unione autentica appena l'altro chiede un normale impegno di reciprocità.",
      sintesi: "Rifiuto fulmineo dei legami iniqui e asimmetrici; la fatica è accettare l'impegno reciproco senza considerarlo una trappola."
    },
    8: {
      title: 'Luna Nera Vera in Ottava Casa — Il Risveglio Magnetico Oltre le Paure Arcaiche',
      text: "In questa sede occulta, l'apogeo lunare vero diventa una torcia inestinguibile accesa negli abissi del tabù, della sessualità sciamanica e della gestione del potere invisibile. Non hai alcuna paura di guardare negli occhi ciò che la gente comune nasconde sotto il tappeto: la morte, il debito, la manipolazione psichica e l'eredità non detta. Possiedi un magnetismo che attrae vicende estreme e un potere di riscatto quasi miracoloso. La tentazione perversa è l'uso occulto del controllo: manipolare le fragilità dell'altro per non dover mai mostrare le proprie ferite interiori.",
      sintesi: "Discesa lucida nei territori dell'occulto e del tabù; la redenzione esige di rinunciare al ricatto psicologico difensivo."
    },
    9: {
      title: 'Luna Nera Vera in Nona Casa — La Fuga Eretica Oltre le Frontiere dei Dogmi',
      text: "La coscienza non accetta orizzonti ristretti o spiegazioni confezionate da autorità ecclesiastiche o universitarie: il bisogno di verità spinge a viaggiare lontano, verso terre straniere o sistemi filosofici eterodossi capaci di scardinare le credenze ricevute alla nascita. Cerchi la verità senza sosta, preferendo l'esilio alla menzogna di una fede rassicurante. Rifiuti ogni guru che chieda devozione cieca. Il punto debole è il nomadismo dell'anima: continuare a spostarsi da un Paese all'altro o da una teoria all'altra per il terrore di dover concretizzare la propria visione nel mondo terreno.",
      sintesi: "Cercatore eretico che rifiuta le risposte precotte; il compito è trasformare l'esplorazione nomade in una saggezza viva."
    },
    10: {
      title: 'Luna Nera Vera in Decima Casa — Il Rifiuto Incoronante della Sottomissione Pubblica',
      text: "La Luna Nera vera culmina sulla vetta visibile della vocazione e della reputazione pubblica: non accetti promozioni ottenute con l'adulazione né accetti di chinare il capo davanti a padroni temporanei per fare carriera. La tua autorevolezza si fonda sull'incorruttibilità radicale, che può attirare l'ostilità feroce di chi si è venduto al sistema e non tollera di vedere qualcuno rimanere integro. Sei una guida temuta ed esemplare. La trappola è lo scontro frontale continuo: considerare ogni figura autorevole un nemico da abbattere, sabotando il proprio successo professionale solo per dimostrare la propria purezza morale.",
      sintesi: "Vocazione sovrana che non si vende a nessun padrone; l'errore è distruggere la propria carriera per orgoglio belligerante."
    },
    11: {
      title: 'Luna Nera Vera in Undicesima Casa — L’Insurrezione Improvvisa Contro il Conformismo dei Pari',
      text: "Nei circoli di amicizia, nei partiti e nelle associazioni umanitarie, la Luna Nera vera segnala una rottura immediata con le illusioni comunitarie. Riconosci subito quando una causa nobile viene sequestrata da mediocri opportunisti in cerca di potere personale, e non esiti un istante a denunciare l'inganno anche a costo di essere espulso con disonore. Preferisci restare solo che complice di una menzogna di fazione. L'ostacolo è il disprezzo per la dimensione collettiva: diventare incapaci di collaborare con chiunque per la certezza aprioristica che ogni gruppo sia destinato a tradire.",
      sintesi: "Rifiuto del tribalismo ipocrita e lealtà ai principi; il nodo è non escludersi a priori dalla gioia della cooperazione."
    },
    12: {
      title: 'Luna Nera Vera in Dodicesima Casa — Il Lampo Solitario nella Cella Notturna',
      text: "L'apogeo osculatore risiede nell'isolamento sacro, nel territorio dei sogni arcaici e delle prove invisibili al mondo esteriore. È qui che l'ombra rivela la sua bellezza originaria: nei momenti di ritiro e silenzio completo ricevi intuizioni folgoranti che ti liberano da colpe ancestrali e legami invisibili che ti tenevano prigioniero. C'è un rapporto diretto e potente con il mistero. La fragilità consiste nell'angoscia della solitudine: scambiare i momenti di isolamento necessario per un castigo del destino, cercando fughe nella dissipazione mentale o nell'ansia per non ascoltare il silenzio.",
      sintesi: "Iniziazione folgorante nella solitudine sacra; la salvezza sta nel trasformare il silenzio in un rifugio di rigenerazione."
    }
  },

  dignities: {},

  combinations: {
    'Scorpio|8': {
        title: "Luna Nera Vera in Scorpione in Ottava Casa",
        canonico: "L'apogeo lunare osculatore vero precipita nello Scorpione e occupa l'ottava casa, generando una tensione tellurica di smisurata portata nelle dinamiche della rigenerazione psichica. Nel canone esoterico questa segnatura individua il punto esatto in cui le ipocrisie del lignaggio vengono scardinate senza sconti: la persona avverte le faglie sotterranee della stirpe e ne assume l'urto per compiere una catarsi definitiva. I pericoli della dottrina vertono sulla tentazione di manipolare gli affetti attraverso il terrore dell'abbandono o il sabotaggio premeditato di ogni intimità rassicurante. Il paradosso di questa collocazione risiede nell'illusione del controllo assoluto: chi scende nelle profondità con l'ossessione di dominare ogni variabile finisce per farsi fagocitare dalle correnti stesse che intendeva incatenare.",
        lilithiano: "La memoria della violenza e del tradimento ti scorre nel sangue come un fiume carsico che non si placa. Le trame occulte del clan costringevano a intuire le intenzioni altrui dal battito delle ciglia, sviluppando un radar infallibile a spese della serenità infantile. Hai vissuto a lungo credendo che la pace fosse solo una tregua provvisoria tra due guerre.\n\nLilith vera dissotterra la spada arrugginita: non puoi trascorrere l'intera esistenza con le dita strette sull'elsa per paura di un nuovo agguato. Continuare a vedere nemici ovunque significa concedere a chi ti ha ferito il governo perpetuo dei tuoi pensieri. Il tuo atto sovrano più maestoso consiste nel deporre l'assedio, aprire il petto e scoprire che la tua sostanza vitale è immortale e non può più essere profanata da nessuno.\n\nPossiedi una perspicacia chirurgica che sa estrarre il marciume dalle relazioni umane con precisione immacolata: dove gli altri si smarriscono nell'angoscia, tu mantieni una fermezza imperturbabile. La lama che recide l'omertà della stirpe non ha bisogno di infierire sui vinti: la verità pronunciata senza tremare dissolve le catene storiche in un istante.",
        sintesi: "Luna Nera vera in ottava casa: faglia tellurica della genealogia che trasforma il terrore del tradimento in forza rigeneratrice."
      },
    'Aries|1': {
        title: "Luna Nera Vera in Ariete in Prima Casa",
        canonico: "La Luna Nera vera all'Ascendente nell'Ariete imprime alla corporeità e all'affermazione personale una scintilla indomabile che sfida a viso aperto qualsiasi consuetudine sociale. La tradizione vede in questo sigillo l'archetipo dell'amazzone o del pioniere solitario, la cui sola comparsa infrange la pax borghese e costringe l'ambiente a prendere posizione. La persona rifiuta ogni tutela paternalistica e difende la propria indipendenza con un vigore che sconvolge i misuratori del decoro. I pericoli canonici toccano l'aggressività reattiva, le ferite al volto dovute a impeti sconsiderati e la solitudine forzata causata da un'intolleranza viscerale verso chiunque esiti. La fiamma che non trova argini finisce per incenerire se stessa: l'audacia originaria diventa potenza feconda solo quando l'impulso a combattere si trasforma nella fermezza sobria di chi presidia il proprio confine senza provocare.",
        lilithiano: "Hai sempre dato fastidio a chi voleva farti camminare in fila indiana con la testa bassa. I custodi della buona condotta consideravano il tuo passo deciso una minaccia alla quiete pubblica, tentando di fiaccare la tua risolutezza con continue censure. Hai dovuto lottare palmo a palmo per ogni centimetro di respiro che ti sei presa.\n\nLilith vera non placa il tuo fuoco sacro: ti chiede di smettere di consumarlo in risse che non portano alcuna liberazione. Se ogni volta che qualcuno ti contraddice rispondi con un ruggito, resti ancora legata al guinzaglio delle provocazioni altrui. La tua prima vera vittoria consisterà nel rimanere immobile davanti a chi cerca di farti perdere la calma, guardando la sua agitazione con l'indifferenza di chi conosce la propria forza smisurata.\n\nIl tuo coraggio è un faro nella nebbia dell'omologazione: non indietreggi quando tutti fuggono e sai assumerti la responsabilità dei tuoi atti con limpidezza adamantina. Camminare nel mondo senza chiedere asilo né domandare conferme è la vittoria suprema: la sovranità radiosa non ha più bisogno di brandire armi per essere rispettata.",
        sintesi: "Luna Nera vera in prima casa: scintilla selvaggia all'Ascendente che supera la contesa reattiva per diventare audacia creatrice."
      }
  },

  retrograde: {
    title: 'Luna Nera Vera Retrograda — Il Tremore Sotterraneo dell’Ombra Trattenuta',
    text: "Le oscillazioni dell'apogeo lunare riflettono una spinta tellurica che agisce nelle pieghe più remote dell'inconscio. Chi nasce con la Luna Nera vera retrograda non fa esplodere i propri veti morali al primo attrito: incassa il colpo, osserva la dinamica di sopraffazione con calma spietata e attende il momento propizio per recidere i vincoli con precisione chirurgica. C'è una straordinaria pazienza strategica che disorienta chi confonde il silenzio con la condiscendenza. La ferita originaria del rifiuto non viene trasformata in vittimismo ma in un laboratorio alchemico di dignità non negoziabile. La trappola è il veleno del risentimento: rimuginare all'infinito sulle sopraffazioni patite, trasformando la vigilanza in una prigione di eterna sfiducia.",
    sintesi: "Pazienza tellurica dell'ombra: lo strappo liberatorio matura nel silenzio fino all'istante dell'affrancamento definitivo."
  }
};


// =========================================================================
  BODIES.Mercury = {
  signs: {
    Aries: {
      title: 'Mercurio in Ariete — Il Pensiero Fulmineo e la Parola Dardo',
      text: "L'intelletto non indugia nella deliberazione prolungata: afferra l'idea con la rapidità di un lampo e la scaglia come una freccia prima che gli interlocutori abbiano terminato di formulare la premessa. C'è una brillantezza intuitiva formidabile, che eccelle nelle situazioni di emergenza in cui bisogna decidere in una frazione di secondo. Non temi lo scontro verbale, anzi lo cerchi per testare la solidità delle tue convinzioni. Il punto debole è l'impazienza cognitiva: l'insofferenza per i dettagli noiosi e la tendenza ad abbandonare un ragionamento complesso appena richiede un'analisi metodica e paziente.",
      sintesi: "Intelligenza fulminea e parola diretta; il limite è la fretta che trascura i dettagli."
    },
    Taurus: {
      title: 'Mercurio in Toro — Il Pensiero Pragmatico che Pesa la Realtà',
      text: "La mente procede con calma implacabile, verificando ogni concetto attraverso il filtro dell'esperienza concreta e della tangibilità pratica. Non ti lasci incantare da speculazioni astratte o da mode intellettuali passeggere: chiedi a ogni teoria di dimostrare la propria utilità nel mondo reale. Possiedi una memoria eccezionale e una capacità di concentrazione che resiste a ogni distrazione esterna. La zona di rigidità è l'ostinazione mentale: faticare ad accogliere punti di vista radicalmente nuovi e rifiutarsi di modificare un'opinione consolidata anche davanti all'evidenza dei fatti.",
      sintesi: "Ragionamento solido ancorato alla concretezza; la trappola è l'irrigidimento sulle certezze acquisite."
    },
    Gemini: {
      title: 'Mercurio in Gemelli — La Rete Polifonica delle Connessioni',
      text: "Mercurio risiede nel proprio domicilio d'aria: la curiosità è insaziabile, il linguaggio scorre con agilità prodigiosa e la mente registra mille stimoli simultanei senza perdere il filo. Trasmetti con naturalezza informazioni ed esperienze, collegando mondi distanti e di cogliere le sfumature più sottili di ogni contesto sociale. Ti annoi a morte nella ripetizione monotematica. L'insidia di questa velocità è l'inconsistenza: rimanere alla superficie dei saperi senza mai approfondire una disciplina fino in fondo, accumulando nozioni brillanti che non diventano mai vera saggezza.",
      sintesi: "Agilità mentale e padronanza del verbo nel segno proprio; il compito è trovare profondità oltre la varietà."
    },
    Cancer: {
      title: 'Mercurio in Cancro — L’Intelligenza Emotiva e la Memoria del Cuore',
      text: "I processi cognitivi sono indissolubilmente legati al sentimento, all'immaginazione e alla risonanza affettiva. Non impari attraverso schemi asettici ma attraverso storie, immagini evocative e la sintonia umana con chi ti parla. La tua memoria custodisce conversazioni, toni di voce e dettagli emotivi accaduti decenni prima con precisione commovente. La difficoltà peculiare è l'ipersensibilità al giudizio: prendere ogni disaccordo teorico come un attacco personale e lasciarsi offuscare la lucidità logica dalle maree mutevoli dei propri stati d'animo.",
      sintesi: "Mente intuitiva guidata dalla memoria affettiva; l'ostacolo è l'interferenza emotiva sul giudizio razionale."
    },
    Leo: {
      title: 'Mercurio in Leone — Il Verbo Sovrano e l’Eloquenza Teatrale',
      text: "La parola viene usata con calore, solennità e senso innato dello spettacolo: non ti limiti a esporre un'idea, la proclami, infondendole una forza espressiva che convince e trascina chi ascolta. Possiedi una mente sintetica, capace di individuare il fulcro centrale di una questione senza perdersi in meandri secondari. La tua leadership comunicativa è naturale. L'ombra è l'arroganza intellettuale: considerare le proprie opinioni come verità definitive non negoziabili, rifiutando il contraddittorio per il terrore infantile di fare una figura meschina.",
      sintesi: "Comunicazione calorosa e persuasiva; il rischio è scambiare le proprie convinzioni per dogmi assoluti."
    },
    Virgo: {
      title: 'Mercurio in Vergine — La Precisione Chirurgica dell’Analisi',
      text: "Nel proprio domicilio di terra ed esaltazione congiunta, Mercurio tocca l'apice della lucidità analitica: nulla sfugge a questo sguardo che scompone, classifica, individua il difetto microscopico e trova la soluzione tecnica più efficiente. Organizzi la pratica con maestria, trasformando il disordine in un meccanismo perfettamente oliato. Il prezzo di questa maestria è l'ipercritica logorante: perdersi nei particolari fino a smarrire la visione d'insieme e consumare la serenità mentale nel timore perenne dell'errore.",
      sintesi: "Rigore analitico e lucidità suprema; la trappola è l'ansia da controllo che soffoca l'intuizione d'insieme."
    },
    Libra: {
      title: 'Mercurio in Bilancia — La Bilancia della Dialettica Equanime',
      text: "L'intelletto è costantemente impegnato a soppesare tesi e antitesi, cercando il punto esatto di equilibrio, giustizia e armonia logica tra posizioni opposte. Medi con straordinaria efficacia, mostrando un tatto verbale che sa disarmare l'interlocutore più ostile senza mai alzare i toni. Rifuggi la volgarità e l'aggressività espressiva. Il dilemma centrale è la paralisi decisionale: vedere così chiaramente le ragioni di entrambe le parti da non riuscire a prendere una posizione netta nel momento in cui la situazione esige una scelta coraggiosa.",
      sintesi: "Mente diplomatica che cerca l'equità dialettica; il limite è l'esitazione cronica davanti alle decisioni nette."
    },
    Scorpio: {
      title: 'Mercurio in Scorpione — Lo Sguardo che Penetra il Non Detto',
      text: "La mente non si ferma mai alla versione ufficiale delle cose: scava, investiga, coglie il movente recondito e l'inconscio dell'interlocutore prima ancora che termini la frase. Possiedi una lucidità psicologica formidabile, che non teme di affrontare le verità tabù che la società cerca di censurare. Sei il custode perfetto di segreti inviolabili. La deriva pericolosa è la paranoia inquisitoria: interpretare ogni silenzio o distrazione altrui come un complotto sotterraneo, usando la parola come un veleno per punire prima ancora di essere colpiti.",
      sintesi: "Intelligenza investigativa che sonda il rimosso; il nodo è non farsi avvelenare dal sospetto sistematico."
    },
    Sagittarius: {
      title: 'Mercurio in Sagittario — L’Intelletto Panoramico e la Visione Lontana',
      text: "Nel segno opposto ai Gemelli, Mercurio abbandona l'interesse per i dettagli minuti per dedicarsi ai grandi sistemi di pensiero, alla filosofia, all'etica e ai saperi cosmopoliti. C'è un entusiasmo trascinante nell'insegnare e nell'ispirare le menti altrui con visioni ampie e luminose del futuro. Ti muovi agevolmente tra concetti astratti e culture diverse. L'esilio mentale si manifesta nella trascuratezza delle incombenze pratiche: promettere più di quanto sia realisticamente fattibile e peccare di faciloneria nelle verifiche dei dati concreti.",
      sintesi: "Visione d'insieme e vocazione all'insegnamento; la debolezza è la leggerezza nel trattare i dettagli pratici."
    },
    Capricorn: {
      title: 'Mercurio in Capricorno — La Ragione Austera della Struttura',
      text: "La mente lavora con la serietà della pietra e la pazienza del tempo: non sprechi parole in chiacchiere superflue e basi ogni giudizio su dati verificati, responsabilità e metodo rigoroso. Possiedi un senso strategico di lungo respiro, che ti rende capace di pianificare imprese complesse e di portarle a termine superando ogni ostacolo con silenziosa perseveranza. La rigidità risiede nel pessimismo difensivo: diffidare dell'immaginazione spontanea e scambiare il proprio rigore logico per l'unica verità ammissibile nel mondo.",
      sintesi: "Pensiero strategico e sobria razionalità; l'insidia è il cinismo che chiude le porte alla meraviglia."
    },
    Aquarius: {
      title: 'Mercurio in Acquario — L’Intuizione Eretica del Futuro',
      text: "Il pensiero rifiuta i binari tracciati dalla consuetudine per procedere per salti quantici, lampi di genio e intuizioni d'avanguardia che anticipano i tempi. Ti appassionano i sistemi complessi, la scienza, le riforme sociali e la tecnologia usata per emancipare l'umanità dai pregiudizi. Dialoghi con brillantezza e senza condizionamenti tradizionali. Il limite di questa collocazione è l'astrattezza disincarnata: innamorarsi delle proprie teorie fino a ignorare la realtà biologica ed emotiva degli esseri umani in carne e ossa.",
      sintesi: "Intelletto visionario e originale; il rischio è l'ostinazione intellettuale che perde il contatto umano."
    },
    Pisces: {
      title: 'Mercurio in Pesci — La Conoscenza Poetica per Simboli e Maree',
      text: "La logica convenzionale cede il passo all'intuizione poetica, alla ricezione telepatica e alla comprensione simultanea delle correnti invisibili della vita. Non pensi per sillogismi ma per immagini, musica e metafore, cogliendo l'anima delle situazioni molto prima che la ragione possa analizzarle. Possiedi un talento artistico e narrativo commovente. L'esilio e caduta si manifestano nella confusione pratica: smarrire il senso dell'orientamento nel mondo materiale, faticare a dare ordine alle idee e rifugiarsi nell'ambiguità verbale.",
      sintesi: "Intelligenza simbolica e facoltà poetica; la sfida è non perdersi nella nebbia della disorganizzazione pratica."
    }
  },

  houses: {
    1: {
      title: 'Mercurio in Prima Casa — Il Segno dell’Intelligenza nello Sguardo',
      text: "La prontezza mentale, la curiosità e il bisogno di esprimersi sono impressi immediatamente nella fisionomia e nell'eloquio: hai un'aria sveglia, giovanile e mobile che cattura subito l'attenzione dell'ambiente circostante. Non sai stare fermo né in silenzio per troppo tempo, perché la tua mente ha bisogno di processare la realtà attraverso l'interazione continua. La trappola è la dispersione nevrotica: consumare la propria energia vitale in un'irrequietezza verbale e fisica che impedisce di radicarsi profondamente in ciò che si fa.",
      sintesi: "Vivacità intellettuale impressa nella presenza fisica; il compito è governare l'irrequietezza nervosa."
    },
    2: {
      title: 'Mercurio in Seconda Casa — L’Ingegno Applicato al Valore Tangibile',
      text: "L'intelletto si mette al servizio della gestione patrimoniale, della negoziazione commerciale e della monetizzazione dei propri talenti comunicativi o tecnici. Hai una mente calcolatrice nel senso più nobile del termine: sai quanto costa ogni cosa, come moltiplicare le risorse con accortezza e come ricavare valore pratico da idee che altri lascerebbero cadere. Il rischio è la mercificazione mentale: valutare le persone e i progetti unicamente sulla base del loro rendimento economico a breve termine.",
      sintesi: "Abilità commerciale e senso pratico del denaro; il pericolo è ridurre il pensiero al solo calcolo contabile."
    },
    3: {
      title: 'Mercurio in Terza Casa — Il Dominio Naturale del Linguaggio Quotidiano',
      text: "Mercurio si trova nella propria casa di gioia essenziale: l'apprendimento è spontaneo, la scrittura fluida e la rete delle relazioni di vicinato vivacissima e stimolante. Sei l'archivio vivente delle notizie del tuo ambiente, colui che conosce tutti e sa sempre a chi rivolgersi per risolvere un problema informativo. Leggi, scrivi e ti sposti continuamente con agilità. L'ombra è la superficialità da pettegolezzo: scambiare il flusso continuo di chiacchiere per vera conoscenza e disperdere l'attenzione in mille dettagli futili.",
      sintesi: "Mercurio nella sua gioia ideale: comunicazione brillante e curiosità vivissima che deve evitare la dispersione."
    },
    4: {
      title: 'Mercurio in Quarta Casa — L’Archivio delle Memorie Familiari',
      text: "La mente trova rifugio nello studio della storia delle proprie origini, nella genealogia e nella costruzione di una biblioteca intima all'interno della dimora. Hai bisogno di silenzio e raccoglimento per pensare con lucidità, e spesso la casa diventa il tuo laboratorio di scrittura o di ricerca intellettuale. C'è un dialogo interiore fitto con la figura dei genitori. La difficoltà risiede nel rimuginio nostalgico: rimanere prigionieri dei vecchi discorsi d'infanzia, rianalizzando all'infinito antichi torti mai sepolti.",
      sintesi: "Pensiero intimo che studia le radici della stirpe; il limite è rimuginare sulle ferite del passato familiare."
    },
    5: {
      title: 'Mercurio in Quinta Casa — L’Intelletto che Gioca e Crea Bellezza',
      text: "La parola e il pensiero si fanno strumento di seduzione, intrattenimento brillante e creazione artistica originale. Trovi gioia nell'inventare giochi mentali, nel teatro, nella scrittura creativa e nel dialogo stimolante con persone più giovani o con i figli, a cui trasmetti l'amore per la conoscenza con spirito leggero. La tua intelligenza sa essere magnetica. L'insidia è la vanità oratoria: parlare unicamente per strappare applausi e trasformare ogni conversazione in una dimostrazione sterile della propria bravura dialettica.",
      sintesi: "Creatività espressiva e mente giocosa; la debolezza è usare l'intelligenza come palcoscenico per l'ego."
    },
    6: {
      title: 'Mercurio in Sesta Casa — Il Maestro dell’Ingranaggio Operativo',
      text: "L'intelligenza si esprime nella precisione metodica, nell'ottimizzazione dei processi lavorativi e nella cura rigorosa della salute e della fisiologia corporea. Sei l'analista ideale dei problemi tecnici: scomponi la complessità, individui il collo di bottiglia e rimetti in sesto la catena operativa con maestria indiscutibile. C'è una dedizione ammirevole al dovere pratico. Il costo interiore è l'ansia somatizzata: vivere in uno stato di allarme continuo per ogni minimo disordine, logorando il sistema nervoso con un perfezionismo che non ammette tregua.",
      sintesi: "Efficienza tecnica suprema nell'organizzazione quotidiana; il rischio è l'esaurimento nervoso da ipercritica."
    },
    7: {
      title: 'Mercurio in Settima Casa — La Negoziazione Intelligente del Patto',
      text: "Il pensiero si attiva e dà il meglio di sé nel confronto dialettico a due, nella consulenza paritaria e nella mediazione contrattuale. Cerchi partner che siano prima di tutto stimolanti sul piano intellettuale, con cui discutere di tutto senza tabù e con cui condividere la curiosità per il mondo. Negozi con perizia e rispetto delle regole formali. Il punto debole è l'eccesso di razionalizzazione affettiva: pretendere di risolvere ogni divergenza emotiva con la logica fredda, dimenticando che i sentimenti non seguono sempre le regole del buon senso.",
      sintesi: "Confronto dialettico e patto intellettuale nella coppia; l'errore è voler spiegare le emozioni solo con la logica."
    },
    8: {
      title: 'Mercurio in Ottava Casa — L’Intelligenza Investigativa del Mistero',
      text: "La mente è attratta irresistibilmente dai territori proibiti: la psicologia del profondo, i segreti finanziari, l'esoterismo e le verità inconfessabili che si celano dietro le facciate rassicuranti. Possiedi un intuito investigativo formidabile per scovare le bugie e per comprendere i meccanismi nascosti del potere condiviso. Sai custodire il silenzio quando la situazione lo esige. La trappola è l'ossessione del controllo informativo: usare la conoscenza delle debolezze altrui come arma di ricatto o farsi tormentare da sospetti ingiustificati.",
      sintesi: "Mente chirurgica che scruta i segreti profondi; il pericolo è usare la conoscenza per dominare o manipolare."
    },
    9: {
      title: 'Mercurio in Nona Casa — La Mente Filosofica del Viandante',
      text: "L'intelletto non si accontenta delle nozioni prossime: vuole comprendere il senso ultimo dell'esistenza, esplorare filosofie comparate, apprendere lingue straniere e viaggiare verso orizzonti remoti. Divulghi grandi idee con passione, traducendo concetti complessi in un linguaggio accessibile e ispiratore per molti. Il tuo sguardo abbraccia l'intero pianeta. Il limite risiede nella presunzione dottrinale: infatuarsi di un grande sistema teorico fino a perdere l'aderenza alla concretezza e giudicare con sufficienza chi non condivide la tua visione.",
      sintesi: "Apertura mentale ai grandi orizzonti e al sapere superiore; l'ombra è la presunzione filosofica astratta."
    },
    10: {
      title: 'Mercurio in Decima Casa — La Parola Che Conquista l’Autorità Sociale',
      text: "Mercurio culmina nel cielo pubblico, donando una reputazione fondata sulla competenza comunicativa, la perizia tecnica o l'abilità diplomatica esercitata ai massimi livelli della carriera. La tua opinione ha peso nella comunità, e spesso il successo professionale si lega alla scrittura, al giornalismo, alla pianificazione strategica o all'insegnamento superiore. Sei un portavoce rispettato delle istituzioni. L'attrito interiore sorge dall'opportunismo calcolato: piegare la propria intelligenza alla convenienza politica del momento per preservare la carica conquistata.",
      sintesi: "Successo pubblico conquistato con la competenza e il verbo; la trappola è piegare la verità alla convenienza."
    },
    11: {
      title: 'Mercurio in Undicesima Casa — La Mente Connessa alla Rete Collettiva',
      text: "Il pensiero si esprime nella progettualità comunitaria, nell'associazionismo d'avanguardia e nella collaborazione orizzontale tra menti libere. Coordini con perizia gruppi di lavoro o circoli culturali, sapendo facilitare la circolazione delle idee innovative per il progresso della comunità civile. Le tue amicizie nascono da affinità intellettuali profonde. Il rischio è la dispersione assembleare: discutere all'infinito di teorie e riforme utopiche senza mai tradurre una sola idea in un'azione concreta e misurabile.",
      sintesi: "Pensiero d'avanguardia condiviso nella comunità; la debolezza è l'utopismo sterile che non conclude nulla."
    },
    12: {
      title: 'Mercurio in Dodicesima Casa — Il Pensiero Ermetico nel Chiostro Sommerso',
      text: "La mente opera al di là della logica ordinaria, attingendo direttamente all'oceano dell'inconscio, dei sogni premonitori e della memoria spirituale. Spesso questa collocazione segnala un'intelligenza che ha dovuto nascondersi nell'infanzia o che fatica a esprimersi attraverso i canali scolastici standard, possedendo una saggezza intuitiva che non si lascia racchiudere in formule prefabbricate. Ascolti con profondità e discrezione. La trappola è la confusione mentale solitaria: farsi sopraffare da timori immaginari e faticare a comunicare la propria verità al mondo esterno per timore di essere fraintesi.",
      sintesi: "Intelligenza medianica e intuitiva nel silenzio; la liberazione comincia quando impari a dare voce alle tue visioni."
    }
  },

  dignities: {
    Gemini: {
      kind: 'Domicilio',
      title: 'In Domicilio — La Parola Libera dell’Aria Mobile',
      text: "Nei Gemelli, Mercurio abita la propria reggia d'aria: qui non vi sono ostacoli alla circolazione delle idee, al brio dell'argomentazione e alla molteplicità degli scambi umani. È la dignità della mente pura e curiosa, che non giudica ciò che incontra ma ne esplora le connessioni con freschezza inesauribile. Possiedi l'arte di alleggerire ogni pesantezza con l'intelligenza. Il pericolo insito in questa grazia è la frammentazione frivola: non legarsi a nulla, trattare la verità come un gioco di specchi e non concedersi mai il tempo di approfondire una sola radice.",
      sintesi: "Mercurio sovrano nell'aria mobile: agilità comunicativa totale che deve imparare la disciplina della costanza."
    },
    Virgo: {
      kind: 'Domicilio',
      title: 'In Domicilio ed Esaltazione — La Precisione che Ordina la Materia',
      text: "Nella Vergine si verifica un caso singolare nella dottrina tolemaica: il pianeta vi risiede contemporaneamente in domicilio e in esaltazione. Qui la mente abbandona il vagabondaggio per farsi strumento di misura infallibile, diagnostica perfetta e servizio dell'opera compiuta ad arte. Nulla è lasciato al caso: ogni elemento trova la sua collocazione esatta. La trappola di questa duplice dignità è la prigione del dettaglio: dimenticare la bellezza dell'insieme per correggere una minuscola sbavatura, logorando la serenità d'animo in una ricerca ossessiva della perfezione formale.",
      sintesi: "Domicilio ed esaltazione congiunti nella Vergine: rigore analitico sommo che rischia di perdersi nel microdettaglio."
    },
    Sagittarius: {
      kind: 'Esilio',
      title: 'In Esilio — Il Pensiero che Abbandona la Misura',
      text: "Nel Sagittario, Mercurio deve muoversi attraverso l'archetipo che gli è più estraneo: rinunciare all'analisi scrupolosa per abbracciare la fede, l'orizzonte lontano e la sintesi filosofica. La mente fatica a concentrarsi sui dati minuti, ma riceve in cambio una dote magnifica che il domicilio ignora: la capacità di cogliere il senso complessivo del cammino umano, di ispirare fiducia negli scoraggiati e di indicare una direzione etica quando tutti si perdono nei cavilli burocratici.",
      sintesi: "Mente espansiva in esilio: trascura il particolare ma possiede la grandezza della visione d'insieme."
    },
    Pisces: {
      kind: 'Esilio',
      title: 'In Esilio e Caduta — La Mente Sommersa nell’Oceano Simbolico',
      text: "Nei Pesci, Mercurio sperimenta contemporaneamente la condizione di esilio e quella di caduta: la logica ordinaria si dissolve nell'acqua delle emozioni universali, dove le categorie concettuali nette perdono consistenza. Ne deriva una difficoltà oggettiva nell'orientamento pratico e nella gestione della routine materiale. Tuttavia questa duplice debilitazione compie una trasmutazione sacra: apre le porte della chiaroveggenza poetica, della comprensione intuitiva dell'animo umano e della capacità di comunicare verità spirituali che la pura ragione non saprà mai spiegare.",
      sintesi: "Esilio e caduta nell'oceano dei Pesci: la ragione cede il passo all'intuizione mistica e alla poesia dell'inconscio."
    }
  },

  combinations: {
    'Gemini|3': {
        title: "Mercurio in Gemelli in Terza Casa",
        canonico: "Mercurio risiede nel proprio domicilio diurno e nella terza casa, suo luogo naturale di esplicazione: la facoltà cognitiva, la destrezza verbale e la velocità di collegamento concettuale raggiungono qui il culmine della perfezione astrologica. La tradizione vi riconosce il talento insigne del negoziatore agile, del cronista impeccabile e del maestro delle reti comunicative che sa tradurre codici distanti con naturalezza sorprendente. Chi nasce con tale disposizione assimila nozioni complesse con facilità prodigiosa e ravviva qualsiasi conversazione con brio inesauribile. I rischi canonici riguardano la superficialità dispersiva, la duplicità verbale e l'inquietudine nervosa dovuta a un sovraccarico perenne di stimoli. La brillantezza priva di centro rischia di consumarsi in una girandola di fuochi fatui: le parole moltiplicate all'infinito senza ancoraggio etico diventano specchi deformanti che confondono l'oratore prima ancora degli ascoltatori.",
        lilithiano: "La tua mente corre a una velocità che sfinisce chiunque pretenda di rinchiuderti dentro una casella fissa. Gli insegnanti e i tutori sanzionavano le tue domande scomode come prove di insubordinazione, cercando di imbrigliare la rapidità delle tue associazioni mentali. Hai dovuto fingere una lentezza rassicurante per non sembrare saccente agli occhi dei tuoi precettori.\n\nLilith ti libera dal senso di colpa per la tua curiosità proteiforme: non vivi per fare la guardia polverosa di un solo archivio. Ma bada a non trasformare la tua rapidità in una fuga perenne dall'intimità profonda. Chiacchierare con tutti per non incontrare veramente nessuno è il trucco che usi quando la commozione della carne ti fa paura. La tua vera maturità intellettuale comincia quando hai il coraggio di tacere e ascoltare ciò che il linguaggio comune non sa esprimere.\n\nPossiedi una brillantezza verbale che sa squarciare l'ipocrisia delle formule preconfezionate con una sola battuta fulminea. Sai collegare persone lontanissime tra loro creando ponti dove altri erigono barricate. Un verbo restituito alla sua purezza selvatica squarcia i paraventi del perbenismo: l'intelligenza critica risveglia le coscienze sopite senza concedere alibi al potere.",
        sintesi: "Mercurio signore della terza casa: mente fulminea e connettiva che trova pieno compimento quando sposa la profondità all'agilità."
      },
    'Virgo|6': {
        title: "Mercurio in Vergine in Sesta Casa",
        canonico: "Domicilio ed esaltazione di Mercurio congiunti alla sede nella sesta casa: il principio dell'analisi empirica, della cura del dettaglio e del discernimento tecnico tocca qui la massima efficienza geometrica e materiale. Gli autori antichi celebrano in questo assetto la mente del sapiente operoso, del medico scrupoloso e dell'architetto dei sistemi che individua l'errore invisibile dove gli altri vedono solo perfezione apparente. La persona ordina la materia con una pazienza formidabile e garantisce la regolarità dei processi vitali e produttivi. Le ombre tradizionali toccano l'angoscia ipocondriaca, l'ipercritica paralizzante e la subordinazione servile alle mansioni esecutive. L'ossessione per il frammento perfetto conduce dritta alla paralisi operativa: la mente che seziona ogni granello di sabbia finisce per smarrire la visione della duna e l'orientamento nel deserto.",
        lilithiano: "Ti hanno insegnato a contare ogni grano di polvere, a correggere ogni sbavatura e a meritarti il riposo solo dopo aver terminato un elenco infinito di incombenze quotidiane. L'ambiente domestico rimarcava ogni minima svista con severità gelida, inducendo la convinzione che solo la perfezione maniacale potesse scongiurare l'abbandono.\n\nLilith scuote il tuo laboratorio metodico per farti respirare: la vita non è un meccanismo da revisionare continuamente e il tuo valore non dipende da quante pratiche riesci a smaltire senza lamentarti. L'ossessione del dovere è solo la maschera dietro cui nascondi il terrore di un rifiuto se mostri le tue debolezze. La tua disobbedienza più sacra consiste nel lasciare una pagina imperfetta, uscire a guardare il tramonto e scoprire che il mondo continua a girare anche senza il tuo controllo costante.\n\nLa tua lucidità diagnostica è insuperabile: sai rimettere in sesto situazioni compromesse con la precisione di chi conosce il peso esatto di ogni elemento. Nessuno può ingannarti con belle parole perché guardi subito come funzionano le cose nei fatti. La precisione affrancata dal terrore del giudizio si trasforma in arte curativa: mani sicure restituiscono splendore e salute alle cose senza chiedere alcuna medaglia di virtù.",
        sintesi: "Mercurio esaltato in sesta casa: intelligenza critica prodigiosa che si nobilita quando supera l'ossessione della perfezione formale."
      }
  },

  retrograde: {
    title: 'Mercurio Retrogrado — La Mente Che Scandaglia l’Invisibile',
    text: "Il pensiero che retrocede non segue l'argomentazione lineare: scivola sotto le parole, ascolta le pause e registra le intenzioni non dichiarate prima di elaborare i concetti. Chi nasce con Mercurio retrogrado avverte spesso una frattura tra la ricchezza caotica delle proprie immagini mentali e la povertà del linguaggio convenzionale. Parlare richiede una traduzione faticosa, come se la lingua comune fosse troppo rozza per restituire la complessità del percepito. Ne deriva una riflessività profonda, immune alle mode dialettiche e agli slogan di consumo. La mente impara a verificare le proprie conclusioni senza fidarsi dell'evidenza immediata. L'auto-censura si insinua con facilità: tacere per paura di non essere capiti o smarrirsi in un labirinto di dubbi insolubili.",
    sintesi: "Pensiero che scava sotto il linguaggio: la mente disseziona i moventi invisibili prima di formulare la parola."
  }
};

// Bozza di BODIES.Jupiter per calcolatore-corpi-dict.js
  // =========================================================================
  // GIOVE — la provvidenza, l'espansione vitale, la fede filosofica,
  // la magnanimità e la visione etica universale.
  // =========================================================================
  BODIES.Jupiter = {
  signs: {
    Aries: {
      title: 'Giove in Ariete — L’Audacia di Credere nell’Inizio',
      text: "La fiducia nella vita si accende nell'atto pionieristico, nella capacità di osare dove nessuno ha ancora aperto una via e nell'entusiasmo guerriero che non teme la sfida. Credi nel tuo potere di inaugurare destini nuovi con la pura determinazione della volontà. Motive con slancio travolgente, infondendo speranza in chi si è arreso davanti alle difficoltà. Il limite di questo fuoco è la presunzione incauta: scambiare l'ebbrezza del primo slancio per la vittoria definitiva, sottovalutando la fatica della perseveranza e abbandonando il campo quando sopraggiungono gli ostacoli burocratici.",
      sintesi: "Fede cieca nell'azione audace e ottimismo d'assalto; l'ombra è la presunzione che sottovaluta il percorso."
    },
    Taurus: {
      title: 'Giove in Toro — La Prosperità della Terra Fecondata',
      text: "L'espansione e la grazia prendono forma nella moltiplicazione delle risorse materiali, nella custodia generosa del patrimonio e nella saggezza organica dei ritmi lenti. La tua fortuna nasce dal rispetto della natura, dalla pazienza nel coltivare progetti solidi e dal buon senso pratico che non insegue chimere speculative. Sai creare benessere e sicurezza durevole per chi ti è vicino. La trappola è l'ingordigia dell'accumulo: confondere la benedizione con l'ingrassamento materiale, resistendo a ogni cambiamento che chieda di rinunciare a un privilegio acquisito.",
      sintesi: "Abbondanza che cresce con la pazienza terrena; il rischio è adagiarsi nella sazietà conservatrice."
    },
    Gemini: {
      title: 'Giove in Gemelli — La Moltiplicazione delle Strade Possibili',
      text: "L'espansione mentale rifiuta la dottrina unica per cercare la verità nella varietà infinita dei punti di vista, dei contatti sociali e delle discipline diverse. Trovi ricchezza nel viaggiare leggero, nell'imparare continuamente nozioni nuove e nel trasmettere entusiasmo attraverso un'ironia brillante e accattivante. Rifuggi il dogmatismo pesante. L'esilio di Giove si manifesta nella frammentazione del senso: sapere un po' di tutto senza credere veramente in nulla di duraturo, disperdendo il proprio potenziale di saggezza in una girandola di curiosità effimere.",
      sintesi: "Fede nella mobilità intellettuale e nella curiosità; l'ostacolo è non trovare mai una radice profonda."
    },
    Cancer: {
      title: 'Giove in Cancro — La Provvidenza Custodita nel Grembo',
      text: "Giove tocca qui la propria esaltazione: la generosità è accogliente, viscerale, capace di nutrire la comunità con una protezione calda e riparatrice. C'è una fiducia profonda nella provvidenza che veglia sulla famiglia e sulla memoria della propria gente, manifestata attraverso una magnanimità domestica che non nega mai ospitalità a chi ha fame. Sei un rifugio naturale nelle tempeste. L'insidia dell'esaltazione è il favoritismo tribale: riversare ogni risorsa solo sulla propria cerchia ristretta, considerando il mondo esterno come una minaccia da cui difendere il focolare.",
      sintesi: "Magnanimità accogliente nel segno di esaltazione; il limite è chiudere la generosità nel recinto familiare."
    },
    Leo: {
      title: 'Giove in Leone — La Regalità Magnanima del Cuore',
      text: "L'espansione vitale coincide con la grandezza d'animo, la generosità teatrale e il bisogno nobilissimo di ispirare il mondo con gesti memorabili ed esemplari. Credi nel valore sacro dell'eccellenza e non sopporti la mediocrità o l'invidia meschina, governando il tuo ambiente con un calore splendido che incoraggia ciascuno a dare il meglio di sé. Possiedi una statura carismatica indiscutibile. Il punto cieco è la megalomania egotica: pretendere un'adorazione continua per la propria magnanimità, scivolando nell'orgoglio ferito appena qualcuno osa mettere in dubbio la tua perfezione.",
      sintesi: "Fede nella grandezza e generosità regale; la caduta è subordinare la virtù alla ricerca dell'applauso."
    },
    Virgo: {
      title: 'Giove in Vergine — La Grazia Scoperta nell’Umile Quotidiano',
      text: "Nel segno di mercuriale prudenza, Giove vive l'esilio della misura: la grande visione deve piegarsi all'esame minuzioso dei costi, dei doveri e dell'utilità pratica. Eppure questo esilio compie un'opera preziosa: insegna che la vera saggezza si costruisce attraverso la cura devota delle piccole cose, il lavoro onesto e il servizio disinteressato a favore del prossimo. La tua etica è impeccabile. L'ombra è la miopia ansiosa: faticare ad avere fiducia nel destino, paralizzandosi davanti a minuscoli imprevisti e soffocando ogni entusiasmo con un catalogo di obiezioni scrupolose.",
      sintesi: "Saggezza nel servizio pratico e nell'umiltà; la trappola è il pessimismo scettico che preclude il volo."
    },
    Libra: {
      title: 'Giove in Bilancia — La Giustizia Nobilita la Convivenza Umana',
      text: "La provvidenza opera attraverso la diplomazia raffinata, l'armonia estetica e la difesa inflessibile dei principi di equità e legalità. Credi fermamente che nessun traguardo sia degno se ottenuto violando i diritti dell'altro o calpestando le regole della reciproca dignità. Possiedi un talento eccezionale nell'attrarre alleanze prestigiose e pacifiche. La difficoltà è l'indolenza compiacente: rimandare scelte etiche urgenti pur di non scontentare fazioni potenti, scambiando il perbenismo formale per autentica rettitudine d'animo.",
      sintesi: "Fede nella giustizia paritaria e nell'eleganza sociale; il pericolo è sacrificare la sostanza alla forma cortese."
    },
    Scorpio: {
      title: 'Giove in Scorpione — La Luce che Riscotta l’Oro negli Inferi',
      text: "La fede non teme di misurarsi con la morte, con il tradimento e con le prove più laceranti dell'esistenza: crede nella resurrezione alchemica che rinasce dalle ceneri della catastrofe. Possiedi un carisma psicologico profondo e magnetico, capace di guidare gli altri attraverso le loro crisi peggiori con lucidità implacabile e incrollabile fermezza d'intenti. La finanza complessa e i segreti del potere ti sono familiari. La deriva è il titanismo ossessivo: volere il controllo totale anche sui destini altrui, usando la propria conoscenza esoterica per dominare invece di liberare.",
      sintesi: "Fede indomita che vince la crisi e transmuta il piombo; l'ombra è l'ossessione manipolatoria del potere."
    },
    Sagittarius: {
      title: 'Giove in Sagittario — Il Maestro del Fuoco Sapienziale',
      text: "Giove risiede nel proprio domicilio primario: la visione è sconfinata, la fiducia nella vita inesauribile e la sete di verità filosofica e geografica autentica maestra di civiltà. Esplori i sentieri dello spirito, indicando la rotta verso mete elevate e sa riaccendere il fuoco sacro nelle anime spente con parole di speranza luminosa. Non c'è confine che possa trattenere il tuo entusiasmo. L'insidia di questa pienezza è la presunzione dogmatica: ritenersi portatore della parola divina infallibile, dispensando prediche morali e non tollerando chi cammina lungo sentieri diversi.",
      sintesi: "Giove sovrano nel tempio del fuoco filosofico; il limite è il moralismo paternalista che predica senza ascoltare."
    },
    Capricorn: {
      title: 'Giove in Capricorno — La Grazia Guadagnata con l’Ascesi',
      text: "In Capricorno l'energia gioviana sperimenta una severa riduzione di gratuità: qui nulla piove dall'alto come un miracolo inatteso. La ricchezza, la stima e l'autorevolezza vanno conquistate anno dopo anno, pietra su pietra, con una disciplina austera che resiste alle intemperie della storia. Chi supera questa prova raggiunge una solidità monumentale che nessuna crisi può scalfire. L'aridità della posizione si manifesta nel cinismo amaro: convincersi che il mondo sia retto solo da egoismo e forza bruta, negando a se stessi e agli altri la gioia di una generosità spontanea.",
      sintesi: "Espansione sobria costruita sulla disciplina; l'errore è credere che la vita sia unicamente dovere e privazione."
    },
    Aquarius: {
      title: 'Giove in Acquario — La Provvidenza Sociale dell’Assemblea Libera',
      text: "L'ottimismo si consacra alle grandi riforme civili, alla fraternità universale e all'emancipazione intellettuale dell'intera umanità. La tua fortuna si manifesta dentro i movimenti collettivi, nella scienza innovativa e nelle alleanze solidali tra spiriti liberi che rifiutano gerarchie oppressive. Anticipi tempi migliori con visione feconda. Il rischio di questa collocazione è l'utopismo impersonale: amare appassionatamente l'umanità futura nei propri manifesti teorici, mostrando al contempo indifferenza gelida verso i bisogni immediati e concreti delle persone vicine.",
      sintesi: "Fede nell'evoluzione collettiva e nell'alleanza tra pari; il nodo è non dimenticare la persona reale nell'astrazione."
    },
    Pisces: {
      title: 'Giove in Pesci — La Misericordia Oceanica e la Fede Senza Rive',
      text: "Nel suo domicilio notturno, Giove spoglia la fede di ogni dogmatismo concettuale per trasformarla in compassione pura, intuizione spirituale e connessione mistica con il Tutto. Possiedi una generosità segreta che non cerca testimoni, una grazia che soccorre chi è caduto e una facoltà poetica e visionaria capace di toccare il cuore della folla. Senti che una mano invisibile guida il cammino dell'anima. L'ombra è la passività fatalista: rinunciare a difendere i propri confini pratici confidando in miracoli immaginari, fino a lasciarsi travolgere dalle correnti del disordine materiale.",
      sintesi: "Compassione universale nel tempio notturno; la trappola è il fatalismo ingenuo che abbandona la responsabilità pratica."
    }
  },

  houses: {
    1: {
      title: 'Giove in Prima Casa — La Presenza Solenne e l’Entusiasmo Radiante',
      text: "La grandezza d'animo, l'ottimismo e il carisma accogliente sono visibili immediatamente nella tua figura fisica e nel modo con cui ti affacci al mondo. Emani una sicurezza bonaria che rassicura chi ti incontra e attira la simpatia spontanea dell'ambiente sociale circostante. Hai una naturale vocazione a guidare, insegnare e proteggere chi è più fragile. La trappola è l'eccesso compiacente: la tendenza a promettere mari e monti senza calcolare le proprie forze concrete e l'inclinazione ad allargarsi a dismisura, scambiando la generosità per onnipotenza.",
      sintesi: "Fiducia radiosa riflessa nella persona fisica; il compito è moderare l'espansività senza promettere oltre il reale."
    },
    2: {
      title: 'Giove in Seconda Casa — Il Forziere della Prosperità Tangibile',
      text: "L'espansione gioviana benedice la sfera patrimoniale, la capacità di attrarre guadagni consistenti e la generosità nel godere dei beni terreni. Non temi la povertà perché senti dentro di te una risorsa inesauribile di ingegno pratico capace di ricreare valore in qualsiasi circostanza. Sai spendere con magnanimità per cause degne e per migliorare la qualità della vita di chi ami. Il rischio è la prodigalità imprudente: vivere al di sopra dei propri mezzi nella convinzione cieca che il denaro non finirà mai, finendo nei guai finanziari per pura leggerezza.",
      sintesi: "Abbondanza patrimoniale e fiducia nella provvidenza materiale; l'insidia è lo spreco per presunzione di sicurezza."
    },
    3: {
      title: 'Giove in Terza Casa — La Diffusione Entusiasta del Sapere',
      text: "L'intelligenza si nutre di viaggi frequenti, scambi culturali arricchenti e una curiosità calorosa verso l'ambiente prossimo. Parli con eloquenza trascinante, trasmettendo entusiasmo attraverso la scrittura, l'insegnamento scolastico o la comunicazione mediatica con un linguaggio generoso e limpido. I rapporti con fratelli e vicini sono fonte di reciproco sostegno e crescita. L'ombra di questa posizione è l'enfasi verbale: esagerare la portata delle notizie, perdersi in grandi proclami e trascurare la verifica scrupolosa delle fonti informative.",
      sintesi: "Mente vivace che diffonde ottimismo nell'ambiente; la debolezza è la tendenza a gonfiare i fatti per enfasi."
    },
    4: {
      title: 'Giove in Quarta Casa — La Benedizione del Focolare Ancestrale',
      text: "Il santuario intimo della casa e la memoria della propria stirpe sono il centro di massima espansione e pace per l'anima. Hai dentro la vocazione a creare una dimora spaziosa, accogliente e ospitale, dove riunire la famiglia allargata attorno a una tavola generosa e protetta dalle intemperie del mondo. C'è un'eredità morale o materiale benefica che ricevi dagli avi. La difficoltà è l'eccesso di radicamento: faticare ad allontanarsi dal nido confortevole, preferendo regnare nella propria oasi privata anziché misurarsi con la fatica delle sfide pubbliche.",
      sintesi: "Pace e abbondanza nel rifugio domestico; il rischio è farsi imprigionare dal comfort del nido ancestrale."
    },
    5: {
      title: 'Giove in Quinta Casa — La Celebrazione della Gioia Creativa',
      text: "Questa è una delle collocazioni più fortunate e luminose del tema: il piacere, la creatività artistica, il gioco amoroso e il rapporto con i figli fioriscono con magnifica fecondità. Vivi le tue passioni a cuore aperto, infondendo entusiasmo contagioso in ogni progetto ludico o espressivo e attirando la fortuna attraverso la fiducia radiosa che trasmetti. I tuoi figli ricevono un'educazione generosa e fiduciosa. Il punto debole è il vizio dell'azzardo: scambiare la propria buona stella per un'assicurazione contro ogni perdita, rischiando risorse per pura insolenza.",
      sintesi: "Creatività feconda e gioia di vivere senza riserve; la tentazione da domare è la dipendenza dalla fortuna facile."
    },
    6: {
      title: 'Giove in Sesta Casa — Il Maestro delle Fatiche Quotidiane',
      text: "La grazia impara a scendere nella sala macchine dell'esistenza: trovi realizzazione nel migliorare l'ambiente lavorativo, nel guidare i collaboratori con equità paterna e nell'occuparti della salute e della cura del corpo con approccio olistico e fiducioso. C'è una capacità eccezionale di rendere sereno anche il mestiere più pesante e di attrarre impieghi stabili e stimolanti. La trappola è l'ottimismo ingenuo sulle forze fisiche: caricarsi di impegni superiori alla propria capacità di carico somatico, convinti che la salute reggerà qualsiasi abuso.",
      sintesi: "Protezione e miglioramento nella routine lavorativa; il nodo è non abusare della propria resistenza fisica."
    },
    7: {
      title: 'Giove in Settima Casa — La Grande Alleanza tra Pari Nobili',
      text: "La fortuna esistenziale e la crescita spirituale passano attraverso i contratti sacri, il matrimonio e le collaborazioni paritarie di alto profilo sociale o morale. Attiri partner di statura generosa, colti, stranieri o portatori di un prestigio che arricchisce profondamente la tua vita interiore e materiale. Nelle contese legali godi di una protezione speciale grazie alla lealtà che dimostri. Il pericolo è l'eccesso di fiducia nei contratti: delegare troppo all'altro, credere alle promesse senza pretendere garanzie scritte e farsi trascinare in spese sconsiderate.",
      sintesi: "Crescita ed elevazione attraverso il patto nuziale o sociale; l'errore è la cieca ingenuità nelle intese contrattuali."
    },
    8: {
      title: 'Giove in Ottava Casa — L’Eredità Rigeneratrice Nelle Crisi',
      text: "Giove estende la propria ala protettrice sui territori più rischiosi del tema: le grandi crisi esistenziali, le trasformazioni profonde della psiche e la gestione del patrimonio condiviso. Nelle tempeste più devastanti trovi sempre una risorsa imprevista, un aiuto provvidenziale o un'eredità materiale che ti consente di rimetterti in piedi più solido di prima. Possiedi un intuito formidabile per gli investimenti a lungo termine e per la psicologia occulta. L'insidia è la leggerezza morale nel gestire il denaro altrui, facendosi sedurre da speculazioni spregiudicate.",
      sintesi: "Protezione sovrana nelle crisi e fortuna nel patrimonio comune; il limite è la disinvoltura sui doveri altrui."
    },
    9: {
      title: 'Giove in Nona Casa — La Cattedra Suprema del Sapere Lontano',
      text: "Giove occupa la sua dimora naturale: la mente si dilata fino a comprendere l'intero orizzonte del mondo attraverso lunghi viaggi, studi accademici, meditazione spirituale ed etica universale. Sei la figura autentica del maestro, colui che sa indicare il senso della via a chi brancola nel buio e sa gettare ponti tra civiltà apparentemente inconciliabili. Non temi il lontano, perché ti senti a casa sotto qualsiasi cielo. Il rischio è l'arroganza dogmatica: ritenersi al di sopra delle leggi ordinarie per il solo fatto di possedere una visione più ampia dei propri simili.",
      sintesi: "Trionfo della vocazione filosofica e del viaggio illuminante; il pericolo è il paternalismo dottrinale e altezzoso."
    },
    10: {
      title: 'Giove in Decima Casa — Il Trono Consacrato dall’Autorità Pubblica',
      text: "Il pianeta dell'onore culmina al vertice del cielo visibile, promettendo un destino di notorietà istituzionale, successo professionale e rispetto conquistato nella comunità per meriti morali ed eccellenza d'ufficio. Sei percepito come una guida equanime e autorevole, a cui affidare incarichi di peso nei momenti decisivi. La scalata alla vetta avviene con il favore di maestri influenti. La trappola è l'ipocrisia di facciata: sacrificare la verità interiore pur di non intaccare l'immagine prestigiosa costruita agli occhi dell'opinione pubblica.",
      sintesi: "Successo pubblico e onori conquistati con autorevolezza; l'insidia è anteporre il decoro esteriore all'onestà intima."
    },
    11: {
      title: 'Giove in Undicesima Casa — L’Assemblea Fraterna dei Grandi Ideali',
      text: "Giove risiede nella casa dell'Alleanza e delle amicizie elettive: la tua provvidenza personale si moltiplica dentro i circoli intellettuali, le grandi associazioni civili e i progetti collettivi dedicati all'evoluzione della società. Ti proteggono amicizie influenti e sincere, che condividono la tua fede in un futuro più libero e generoso per tutti. Sai federare individui diversi verso un ideale comune. Il limite è l'idealismo inconcludente: perdersi in piani grandiosi e promesse assembleari senza mai quantificare la fattibilità reale delle risorse richieste.",
      sintesi: "Benedizione sociale attraverso alleanze fraterne e grandi visioni; la sfida è dare concretezza ai progetti utopici."
    },
    12: {
      title: 'Giove in Dodicesima Casa — L’Angelo Custode nel Ritiro Silenzioso',
      text: "Questa è tradizionalmente la collocazione dell'Angelo Protettore: Giove vigila sul chiostro più nascosto dell'inconscio, neutralizzando i nemici occulti, risanando le ferite dell'anima e offrendo una serenità mistica che si rivela invincibile nelle prove estreme. Spesso operi nel silenzio, aiutando chi soffre o dedicandoti all'arte e alla meditazione lontano dalla ribalta mondana. La tua fede non ha bisogno di testimoni per essere incrollabile. La debolezza è la fuga rassegnata: rifugiarsi nella contemplazione per paura della contesa terrena, trascurando il proprio dovere nel mondo visibile.",
      sintesi: "Protezione invisibile e pace mistica nel segreto; il compito è non usare il silenzio come alibi per la passività."
    }
  },

  dignities: {
    Sagittarius: {
      kind: 'Domicilio',
      title: 'In Domicilio Diurno — La Fiamma Filosofica e la Fede nel Cammino',
      text: "Nel Sagittario, Giove governa il fuoco che rischiara le tenebre dell'ignoranza e apre gli spazi dell'avventura. Qui la fede non è un dogma cieco ma un'esperienza vissuta sui sentieri del mondo, un'irradiazione calda che risveglia il coraggio negli sfiduciati e indica la direzione con fermezza magnanima. È la dignità del maestro che non impone ma ispira con la verità del proprio cammino. Il pericolo implicito è la certezza tracotante: non ammettere che la propria personale prospettiva etica possa contenere limiti e trattare con sufficienza chi si attarda nelle pianure della cautela.",
      sintesi: "Giove sovrano nel fuoco sapienziale: entusiasmo luminoso che deve imparare l'ascolto del dubbio altrui."
    },
    Pisces: {
      kind: 'Domicilio',
      title: 'In Domicilio Notturno — La Grazia Oceanica e la Provvidenza Invisibile',
      text: "Nei Pesci, Giove governa l'acqua sacra della compassione universale, della misericordia e della dissoluzione benefica dell'ego. Non cerca le cattedre del sapere esteriore ma il santuario del cuore, dove ogni separazione tra esseri viventi svanisce nella comprensione del disegno universale. È la dignità della pace mistica che guarisce senza far rumore. L'insidia di questa sorgente è l'inconcludenza evasiva: perdersi nelle fantasie di salvezza cosmica, rifiutare la severità necessaria alla vita materiale e lasciare che il disordine inghiotta le responsabilità pratiche.",
      sintesi: "Giove nel suo tempio notturno d'acqua: compassione infinita che esige un ancoraggio fermo nella realtà concreta."
    },
    Cancer: {
      kind: 'Esaltazione',
      title: 'In Esaltazione — Il Calice Colmo dell’Abbondanza Materna',
      text: "L'esaltazione di Giove nel Cancro rappresenta il trionfo della fertilità affettiva, del nutrimento inesauribile e della protezione amorosa che fa fiorire la vita. C'è una sintonia sublime tra la generosità cosmica e il calore umano del grembo: sai accogliere chi è smarrito e fargli riscoprire il senso della propria dignità semplicemente offrendogli un rifugio sicuro. È la collocazione della prosperità feconda. Il rovescio della medaglia è il possesso soffocante: nutrire per legare a sé, colpevolizzare chi tenta di staccarsi dal nido e pretendere una devozione perenne in cambio del bene elargito.",
      sintesi: "Trionfo dell'abbondanza accogliente nel Cancro: nutrimento supremo che deve concedere la libertà a chi sfama."
    },
    Gemini: {
      kind: 'Esilio',
      title: 'In Esilio — Il Senso del Tutto Frammentato nei Mille Dettagli',
      text: "Nei Gemelli, Giove è costretto a muoversi nel regno dell'analisi minuta, della curiosità intermittente e della molteplicità verbale. La visione grandiosa viene scomposta in aneddoti, e la fede solenne rischia di ridursi a un gioco intellettuale che cambia opinione al mutare del vento. Tuttavia questo esilio dona una virtù rara che i domicili ignorano: la capacità di tradurre i concetti metafisici più astratti in un linguaggio quotidiano, frizzante e accessibile anche a chi non frequenta i templi della sapienza.",
      sintesi: "Saggezza frammentata nei dettagli d'aria: la grande visione impara a farsi dialogo leggero e divulgativo."
    },
    Virgo: {
      kind: 'Esilio',
      title: 'In Esilio — La Grande Visione Frenata dal Dubbio Minuzioso',
      text: "Nella Vergine, l'ottimismo gioviano deve fare i conti con la lente d'ingrandimento del controllo pratico, della contabilità esatta e del sospetto verso ciò che non può essere collaudato. Ne nasce un'esitazione a fidarsi del destino, compensata da una scrupolosità impeccabile nel lavoro e nel servizio concreto. L'esilio compie però una trasmutazione preziosa: salva la generosità dall'ingenuità, insegnando che la vera prosperità non nasce dai miracoli sognati ma dalla cura impeccabile dei dettagli operativi.",
      sintesi: "Fede sottoposta alla verifica della terra: l'espansione impara il rigore del servizio impeccabile."
    },
    Capricorn: {
      kind: 'Caduta',
      title: 'In Caduta — La Grazia Sottoposta alla Pietra della Scarsità',
      text: "La caduta di Giove nel Capricorno spegne ogni facile euforia: la provvidenza non regala nulla che non sia stato duramente guadagnato con la fatica, la rinuncia e l'assunzione totale di responsabilità. C'è un pessimismo di fondo che guarda con diffidenza alle promesse facili. Chi attraversa questa prova forgiandosi nella roccia scopre però un dono inestimabile: la capacità di creare abbondanza dove tutti gli altri vedono soltanto il deserto, costruendo strutture che resisteranno a secoli di inverni storici.",
      sintesi: "Espansione severa nel regno del rigore: la fortuna diventa opera indistruttibile solo attraverso la perseveranza."
    }
  },

  combinations: {
    'Sagittarius|9': {
        title: "Giove in Sagittario in Nona Casa",
        canonico: "Nel segno del proprio domicilio diurno e collocato nella nona casa, sua dimora naturale di gioia e significato, Giove raggiunge la più elevata concentrazione del principio filosofico, legislativo ed etico. La tradizione vi riconosce il contrassegno del pensatore universale, del viaggiatore delle terre remote e della guida morale che sa indicare la rotta alle genti nei tempi di smarrimento. Chi porta questa configurazione gode di una generosità d'animo contagiosa e di una visione cosmopolita che abbatte ogni frontiera settaria. I difetti classici toccano la prosopopea dottrinale, la prodigalità sconsiderata e l'illusione che le proprie convinzioni debbano valere come legge infallibile per chiunque. La presunzione di possedere la verità universale ha armato le peggiori crociate della storia: la grandezza filosofica dura nel tempo solo finché il maestro conserva la reverenza dello studente davanti all'insondabile.",
        lilithiano: "Ti hanno convinta che la tua missione consistesse nell'avere sempre una parola di incoraggiamento per tutti, nell'indossare il sorriso dell'ottimismo a oltranza e nell'elargire lezioni morali dall'alto di un piedistallo comodo. La grettezza provinciale e i catechismi parrocchiali tentavano di tarpare ogni slancio metafisico, deridendo l'ansia di esplorazione come una pericolosa stravaganza.\n\nLilith abbatte le colonne del tuo tempio prefabbricato: non c'è sapienza autentica che non abbia conosciuto il sapore acre della sconfitta, della caduta e dello sconcerto. Smetti di recitare la parte della guida infallibile che non dubita mai di nulla. La verità non è una bandiera dottrinale da sventolare per farsi applaudire dalla congregazione: è un fuoco umile che scende nella polvere per guardare la sofferenza umana senza volerla correggere all'istante con formule pie.\n\nPossiedi una fede indomabile che sa riaccendere la speranza quando ogni certezza materiale viene a mancare. La tua mente spazia con grandezza d'orizzonti che fa apparire meschini i rancori quotidiani. Camminare verso l'orizzonte senza l'ansia di fondare nuove chiese restituisce il sacro alla terra: la fede incorruttibile splende nelle opere senza bisogno di altari o catechismi.",
        sintesi: "Giove signore della nona casa: respiro filosofico grandioso che trova autentica autorità solo quando diserta il trionfalismo dottrinario."
      },
    'Pisces|12': {
        title: "Giove in Pesci in Dodicesima Casa",
        canonico: "Giove risiede nel proprio domicilio notturno nei Pesci e abita la dodicesima casa, settore legato al silenzio interiore, alle memorie invisibili e alla grazia che opera al riparo dagli sguardi mondani. La dottrina antica riconosce in tale figura una tutela provvidenziale singolare, capace di preservare la persona dalle congiure più oscure e dai pericoli apparentemente ineluttabili. Chi nasce con questo sigillo manifesta un'inclinazione spontanea alla compassione e una capacità di percepire l'unità profonda di tutte le cose viventi. I pericoli tradizionali contemplano la fuga nella fantasticheria consolatoria, la debolezza somatica e l'inerzia pratica di fronte alle ingiustizie visibili della società. L'abbandono mistico che rifiuta i confini della materia scivola fatalmente nell'autoinganno o nella malinconia paralizzante: la grazia celeste feconda il mondo solo quando trova un vaso di terra capace di trattenerne il flusso.",
        lilithiano: "Hai sempre avvertito che il mondo visibile delle convenzioni borghesi e dei conti da far quadrare non bastava a contenere la sete della tua anima. Il cinismo circostante condannava la tua empatia spontanea come una fragilità imperdonabile, spingendoti a considerare la pietà un difetto da estirpare.\n\nLilith squarcia il velo delle tue fantasie consolatorie: la compassione vera non è un rifugio passivo per sottrarsi alle fatiche della realtà. Offrire l'altra guancia per timore dello scontro non è santità, è solo la fuga di chi non osa sostenere la contesa. La tua misericordia diventa sovrana nel momento in cui impari a dire basta a chi calpesta la tua dolcezza, scoprendo che puoi difendere la tua persona senza perdere la purezza del cuore.\n\nC'è in te un oceano di accoglienza che sa placare le angosce più tempestose: sai perdonare dove gli altri chiedono vendetta e intuisci la grazia misteriosa che opera sotto il disordine della vita. Una sensibilità purificata dalla vergogna non annega più nelle tempeste del mondo: il silenzio interiore diventa un rifugio inviolabile che diffonde pace senza perdere se stesso.",
        sintesi: "Giove in domicilio in dodicesima casa: grazia misteriosa e compassione cosmica che si compiono disinnescando la fuga dal reale."
      }
  },

  retrograde: {
    title: 'Giove Retrogrado — La Cerca Interiore del Senso e della Fede',
    text: "La bussola filosofica rifiuta le credenze preconfezionate e i dogmi delle dottrine dominanti. Giove retrogrado non cerca la fortuna esteriore nell'espansione sociale acritica, ma nella costruzione di un codice etico forgiato dall'esperienza diretta. Si avverte presto l'inadeguatezza delle risposte consolatorie offerte dalla religione o dalla morale comune, cercando una verità capace di reggere all'urto del dolore reale. La prosperità diventa allora uno stato di libertà interiore prima che un accumulo di beni. Chi porta questa configurazione sviluppa una fede sobria, solida e priva di trionfalismo. Il limite è l'autosufficienza arrogante: ritenersi gli unici detentori della rettitudine morale, respingendo ogni maestro per il solo fatto che appartiene a una tradizione.",
    sintesi: "Codice etico forgiato dall'esperienza diretta: la verità interiore sostituisce i dogmi e l'ottimismo di maniera."
  }
};

  // =========================================================================
  // MARTE — la spinta all'azione, la difesa del confine, la capacità di
  // dire no, di iniziare, di reggere il conflitto.
    // =========================================================================
  // SATURNO — il principio del limite, del tempo, della struttura e della
  // maturazione solitaria attraverso la prova.
  // =========================================================================
// Bozza di BODIES.Saturn per calcolatore-corpi-dict.js
  BODIES.Saturn = {
  signs: {
    Aries: {
      title: 'Saturno in Ariete — Il Freno Rigido Sull’Impeto Primario',
      text: "La funzione limitante e strutturante incontra il segno dell'impulso bruciante: ogni slancio spontaneo deve fare i conti con un'esitazione severa, un senso precoce di inadeguatezza o la paura di essere puniti per la propria audacia. Hai dovuto imparare a conquistare l'autonomia con fatica tripla rispetto agli altri, forgiando una disciplina ferrea che non cede davanti alle sconfitte. C'è una tenacia solitaria ammirevole. L'ombra è la frustrazione vendicativa: oscillare tra un blocco paralizzante e scatti di durezza improvvisa quando senti minacciata la tua posizione.",
      sintesi: "Sforzo severo per affermare la propria volontà; la lezione è non trasformare l'esitazione in rabbia repressa."
    },
    Taurus: {
      title: 'Saturno in Toro — La Conservazione Ostinata della Forma',
      text: "La disciplina saturnina si incarna nella materia tangibile, nella sicurezza patrimoniale e nella paura atavica della scarsità. Hai imparato precocemente che per sopravvivere nel mondo terreno bisogna costruire fondamenta indistruttibili, risparmiare con metodo inflessibile e non fare affidamento su aiuti esterni. La tua affidabilità economica è proverbiale. Il punto critico è l'avarizia esistenziale: trattenere ogni risorsa materiale ed emotiva per il terrore di restare senza appoggio, pietrificandosi in abitudini rigide che impediscono il rinnovamento vitale.",
      sintesi: "Costruzione paziente e terrena di certezze durevoli; il limite è la prigione dell'accumulo difensivo."
    },
    Gemini: {
      title: 'Saturno in Gemelli — La Disciplina Rigorosa del Pensiero',
      text: "L'intelletto viene sottoposto a una severa opera di depurazione: non ti accontenti di chiacchiere superficiali o di nozioni frammentarie, ma esigi prove logiche inconfutabili e precisione metodologica in ogni affermazione. Spesso nell'infanzia hai sperimentato difficoltà comunicative o il timore di non essere abbastanza intelligente, sviluppando per riscatto una serietà argomentativa impeccabile. Il rischio è l'aridità scettica: usare la logica formale come una fortezza difensiva per non farsi toccare dalla verità viva delle emozioni, riducendo la realtà a un catalogo sterile di definizioni.",
      sintesi: "Metodo e rigore applicati al linguaggio; la trappola è il cinismo critico che dissecca la conversazione."
    },
    Cancer: {
      title: 'Saturno in Cancro — La Corazza di Gelo Sul Focolare',
      text: "Nel segno della sensibilità materna, Saturno sperimenta l'esilio della vulnerabilità: la memoria infantile è spesso segnata da freddezza affettiva, responsabilità precoci o dal senso doloroso di non aver ricevuto il nutrimento intimo necessario. Hai reagito costruendo un muro attorno al cuore, rifiutando di mostrarti fragile e assumendoti il carico di proteggere tutti senza chiedere soccorso. L'ombra è il ricatto morale silenzioso: rinfacciare agli altri i propri sacrifici e chiudersi in un isolamento rancoroso quando non ci si sente ricambiati con uguale dedizione.",
      sintesi: "Difesa rigida delle ferite intime ed esilio del calore; la via di maturità esige il coraggio di ammettere il bisogno d'amore."
    },
    Leo: {
      title: 'Saturno in Leone — L’Autorità Sobria Che Rifiuta l’Adulazione',
      text: "Nel segno del Sole, Saturno toglie alla regalità ogni compiacimento vanitoso: ti è stato negato l'applauso facile e hai dovuto imparare che il vero valore non dipende dalla corteccia del plauso sociale ma dalla consistenza interiore dell'anima. Possiedi una dignità aristocratica e silenziosa, che disprezza i clamori e assume il comando per senso del dovere morale. La zona d'attrito è il terrore della mediocrità: l'incapacità di sopportare una critica pubblica e la tendenza a mascherare le proprie insicurezze dietro una maschera di superiorità altera e gelida.",
      sintesi: "Sovranità conquistata attraverso il rigore etico; l'insidia è la superbia difensiva che allontana il dialogo paritario."
    },
    Virgo: {
      title: 'Saturno in Vergine — La Maestria Incorruttibile del Mestiere',
      text: "La serietà saturnina trova nella Vergine il terreno ideale per l'applicazione tecnica, la ricerca scientifica e l'organizzazione impeccabile della vita quotidiana. Lavori con disciplina instancabile, affrontando fatiche prolungate pur di portare a termine un'opera a regola d'arte senza la minima sbavatura. Non c'è disordine che tu non sappia bonificare. Il prezzo pagato è l'ipercritica ossessiva: una vigilanza ansiosa che non perdona alcuna imperfezione a se stessi o ai collaboratori, logorando la salute fisica in una routine priva di respiro e di gioia.",
      sintesi: "Perfezione metodica e dedizione operosa; il pericolo è farsi divorare dall'ansia del controllo microscopico."
    },
    Libra: {
      title: 'Saturno in Bilancia — La Giustizia Solenne dell’Equità',
      text: "Saturno tocca qui la propria esaltazione: la legge morale, la lealtà contrattuale e il rispetto dei patti raggiungono il massimo equilibrio geometrico e civile. Non cerchi la vendetta né ti lasci corrompere dalla parzialità emotiva, giudicando le controversie umane con una severità equanime che merita il rispetto universale. Offri un'alleanza solida per patti a lungo termine. L'ombra dell'esaltazione è l'intransigenza formale: pretendere dagli altri standard etici disumani e usare le regole come scudo per non concedere la grazia del perdono umano.",
      sintesi: "Equità suprema e rettitudine contrattuale nel segno di esaltazione; la lezione è non confondere la giustizia con la spietatezza."
    },
    Scorpio: {
      title: 'Saturno in Scorpione — La Roccia che Regge la Discesa agli Inferi',
      text: "La prova saturnina si consuma nei territori della perdita, del potere occulto e dell'intimità profonda: hai dovuto guardare negli occhi le paure più indicibili della condizione umana, uscendone con una resistenza psicologica che incute timore. Possiedi un autocontrollo d'acciaio, capace di custodire segreti capitali e di sostenere battaglie prolungate senza arretrare di un millimetro. La tentazione mortale è la paranoia difensiva: credere che la sopravvivenza esiga il controllo totale sull'altro, trattenendo rancori storici che pietrificano la capacità di amare.",
      sintesi: "Resistenza indistruttibile nelle prove estreme; il nodo è deporre il sospetto per non pietrificarsi nel rancore."
    },
    Sagittarius: {
      title: 'Saturno in Sagittario — La Fondazione Severa della Fede Etica',
      text: "L'entusiasmo filosofico viene messo al vaglio della serietà e della verifica pratica: non accetti ideali astratti o morali facili che non abbiano retto alla prova della realtà terrena. Cerchi un sistema di principi duraturo, una cattedrale di pensiero solida capace di orientare la civiltà con saggezza misurata. Educhi con rigore austero ed esigente. Il limite è il dogmatismo severo: confondere la propria personale disciplina morale con una legge assoluta, guardando con disprezzo chi vive la ricerca spirituale con leggerezza o audacia innovativa.",
      sintesi: "Costruzione paziente di una filosofia etica solida; la trappola è l'intolleranza dogmatica verso le fedi altrui."
    },
    Capricorn: {
      title: 'Saturno in Capricorno — La Pietra Angolare del Tempo e dell’Opera',
      text: "Saturno risiede nella propria reggia di terra: qui l'autorità non ha bisogno di concessioni, la pazienza è indistruttibile e la vocazione al comando si fonda sulla prova tangibile dei fatti compiuti. Sai cosa significa camminare da solo nella bufera invernale senza voltarsi indietro, conquistando la vetta centimetro dopo centimetro con totale assunzione di responsabilità. Sei la spina dorsale di ogni comunità. Il pericolo insito nella vetta è la solitudine pietrificata: dimenticare la tenerezza del cuore, credere che il riposo sia colpa e vivere la propria vita come una condanna all'ascesi perpetua.",
      sintesi: "Saturno sovrano nel proprio tempio di pietra: maestria del tempo che deve concedersi il diritto al riposo e alla tenerezza."
    },
    Aquarius: {
      title: 'Saturno in Acquario — L’Architettura Mentale del Futuro Libero',
      text: "Nel suo domicilio d'aria, Saturno conferisce alla mente una lucidità scientifica straordinaria, capace di ideare strutture sociali d'avanguardia libere da superstizioni e privilegi feudali. Possiedi una coerenza intellettuale incorruttibile, un senso altissimo della fraternità tra pari e la capacità di lavorare per obiettivi collettivi che matureranno decenni dopo la tua azione. L'ostacolo è l'ostinazione dottrinaria: innamorarsi di un sistema teorico perfetto fino a diventare inflessibili con le umane debolezze, scambiando il distacco freddo per saggezza morale.",
      sintesi: "Rigore scientifico e costruzione di ideali collettivi; il rischio è l'intransigenza teorica che ignora i limiti umani."
    },
    Pisces: {
      title: 'Saturno in Pesci — Il Limite Tracciato Nelle Acque Senza Confini',
      text: "La funzione di struttura impara a confrontarsi con l'invisibile, con il dolore sommerso del mondo e con la dissoluzione di ogni certezza materiale. Spesso questa posizione chiede di fare i conti con antichi sensi di colpa non propri o con paure nebulose prive di causa logica, sviluppando attraverso la prova una compassione sobria e una saggezza spirituale autentica. Sei capace di un sacrificio silenzioso per chi soffre. La trappola è il fatalismo paralizzante: sentirsi vittime predestinate del destino e fuggire le responsabilità pratiche nell'apatia o nell'illusione difensiva.",
      sintesi: "Struttura interiore forgiata nel confronto con l'inconscio; la salvezza esige di non cedere alla rassegnazione passiva."
    }
  },

  houses: {
    1: {
      title: 'Saturno in Prima Casa — La Gravità Severa Impressa sul Volto',
      text: "La persona si presenta al mondo con un'aria di serietà precoce, riserbo aristocratico e dignità austera che incute rispetto immediato. Nell'infanzia hai dovuto imparare presto a non essere di peso, sviluppando una maturità superiore ai tuoi anni e una corazza difensiva che non lascia trapelare la vulnerabilità interna. C'è l'abitudine consolidata a contare solo sulle proprie forze. La sfida risiede nel disinnescare la diffidenza corporale: imparare a sorridere senza temere che la leggerezza sminuisca la tua autorità naturale.",
      sintesi: "Maturità precoce e presenza austera alla soglia del mondo; la lezione è non scambiare la chiusura per forza."
    },
    2: {
      title: 'Saturno in Seconda Casa — La Costruzione Parca del Valore Proprio',
      text: "La stabilità economica e la percezione del proprio valore non sono regali fortunati: sono il risultato di una disciplina frugale, di un lavoro indefesso e di una prudenza patrimoniale che previene ogni dissesto. Non sopporti i debiti né le spese superflue, preferendo investire in beni stabili che superano le crisi del mercato. L'ombra è la paura cronica della miseria: sentirsi sempre a un passo dal baratro anche con i forzieri pieni, negandosi il legittimo piacere di godere di ciò che si è guadagnato.",
      sintesi: "Solidità patrimoniale costruita con parsimonia; il nodo è non farsi avvelenare dall'angoscia della privazione futura."
    },
    3: {
      title: 'Saturno in Terza Casa — Il Silenzio Fecondo Prima della Parola',
      text: "L'apprendimento e la parola non cercano l'effetto facile: preferisci tacere finché non hai verificato a fondo la solidità del tuo pensiero, parlando poco ma con un peso che nessuno può ignorare. I rapporti con fratelli o l'ambiente scolastico iniziale possono essere stati severi o distaccati, spingendoti a coltivare una solitudine intellettuale feconda. Conduci ricerche con metodo meticoloso. La trappola è il pessimismo verbale: soffermarsi unicamente sugli aspetti bui delle notizie e comunicare con un rigore che raggela l'interlocutore.",
      sintesi: "Parola ponderata e pensiero scrupoloso; la debolezza è la tendenza alla severità comunicativa che isola."
    },
    4: {
      title: 'Saturno in Quarta Casa — La Fondazione di Pietra del Focolare',
      text: "Saturno scava nelle fondamenta della casa d'infanzia, dove spesso si respirava un'atmosfera austera, regolata da doveri inderogabili o gravata da sacrifici familiari pesanti. Hai appreso precocemente il valore del silenzio e della resistenza, sviluppando il bisogno di fondare una dimora solida come una fortezza dove nessuno possa violare la tua pace. C'è un legame profondo e difficile con la genealogia. La prova consiste nel riscaldare le mura: non riprodurre nella propria casa adulta la stessa freddezza subita nell'infanzia.",
      sintesi: "Radici familiari severe e bisogno di una casa-fortezza; il compito è portare calore umano nella propria dimora adulta."
    },
    5: {
      title: 'Saturno in Quinta Casa — L’Amore Esigente e l’Opera Paziente',
      text: "La creatività, l'eros e il gioco non sono vissuti con disinvoltura leggera: chiedono disciplina, impegno autentico e rifiuto categorico dei flirt superficiali o delle avventure passeggere. Se ti dedichi a un'arte lo fai con il rigore del maestro che lavora per anni a un capolavoro; se ami pretendi lealtà totale e rispetto reciproco. Con i figli sei una guida autorevole e protettiva. L'ombra è la censura del piacere: sentirsi in colpa quando ci si diverte, negando alla propria vita la spontaneità della gioia pura.",
      sintesi: "Creatività matura e sentimenti profondi che rifiutano la frivolezza; la sfida è non censurare il diritto al piacere."
    },
    6: {
      title: 'Saturno in Sesta Casa — Il Maestro dell’Efficienza Quotidiana',
      text: "Saturno trova qui un settore congeniale alla sua natura: il lavoro quotidiano, la manutenzione ostinata delle cose e la disciplina rigorosa della salute corporea diventano il tuo terreno di consacrazione. Collabori con dedizione insostituibile, gestendo incarichi ingrati con scrupolosità impeccabile e senza mai lamentarti. C'è una comprensione profonda dei limiti del corpo. Il rischio è l'autosfruttamento logorante: farsi sommergere da doveri altrui, trasformando l'intera vita in una servitù senza mai concedersi un giorno di vacanza.",
      sintesi: "Dedizione impeccabile al dovere e cura dei dettagli pratici; l'errore è farsi schiacciare da un carico operativo disumano."
    },
    7: {
      title: 'Saturno in Settima Casa — Il Patto Nuziale Scritto Nella Pietra',
      text: "La sfera delle unioni e delle collaborazioni decisive viene affrontata con massima serietà e prudenza: non ti sposi né ti associ per capriccio o convenienza passeggera, ma cerchi alleanze stabili, spesso con persone più mature o di collaudata rettitudine morale. I contratti che firmi sono sacri e duraturi. La difficoltà peculiare è la freddezza tra i partner: trasformare la relazione in un'azienda di doveri reciproci in cui ciascuno fa la guardia all'altro, dimenticando la dolcezza della complicità amorosa.",
      sintesi: "Patti di lealtà incrollabile e unioni durature; la trappola è pietrificare l'amore dentro una gabbia di obblighi formali."
    },
    8: {
      title: 'Saturno in Ottava Casa — Il Custode Severo delle Risorse Condivise',
      text: "Saturno presidia le zone di confine: le eredità contese, la gestione oculata del denaro altrui e le metamorfosi psicologiche profonde. Nelle grandi crisi mantieni una lucidità marmorea che ti consente di guidare la propria persona e gli altri fuori dal baratro con pragmatismo implacabile. Non concedi la tua intimità facilmente, chiedendo all'altro una fedeltà a tutta prova. L'insidia è il terrore viscerale della perdita: diventare sospettosi fino all'inquisizione, difendendosi dall'abbandono con una chiusura emotiva impenetrabile.",
      sintesi: "Lucidità marmorea nelle crisi e prudenza sui beni comuni; il nodo è non farsi accecare dal terrore del tradimento."
    },
    9: {
      title: 'Saturno in Nona Casa — La Cattedrale del Sapere Filosofico',
      text: "L'intelletto persegue una saggezza di lungo corso attraverso studi rigorosi, cattedre universitarie, giurisprudenza o ricerche filosofiche di vasto respiro. Non credi alle illuminazioni improvvise né alle verità prefabbricate, preferendo scalare la montagna della conoscenza con metodo austero e spirito critico inflessibile. I tuoi viaggi sono pellegrinaggi dell'anima o missioni di lavoro. Il pericolo è l'irrigidimento dogmatico: diventare il guardiano inflessibile di una tradizione superata, respingendo ogni intuizione nuova con sufficienza dottrinale.",
      sintesi: "Ricerca filosofica severa ed etica solida; l'ombra è l'arroganza accademica che si chiude al rinnovamento del sapere."
    },
    10: {
      title: 'Saturno in Decima Casa — Il Culmine Solitario dell’Autorevolezza',
      text: "Saturno culmina al Medio Cielo nel suo settore di massimo compimento mondano: la scalata alla notorietà pubblica e al successo professionale è lenta, durissima, costruita su meriti inattaccabili e su una reputazione incorruttibile. Hai dentro la tempra per reggere responsabilità che schiaccerebbero altri e per governare con saggezza austera nei momenti di crisi istituzionale. La trappola è la caduta dall'alto: l'ambizione cieca che fa dimenticare la misericordia, attirando l'odio di chi aspetta al varco il minimo cedimento del sovrano.",
      sintesi: "Ascesa monumentale al potere pubblico fondata sul merito; l'insidia è la superbia che dimentica l'umanità dei subordinati."
    },
    11: {
      title: 'Saturno in Undicesima Casa — L’Alleanza Fedele tra Spiriti Maturi',
      text: "Le tue amicizie sono poche, selezionate con cura estrema nel corso degli anni e difese con una lealtà che non conosce tradimenti né compromessi. Ti impegni all'interno di progetti collettivi e associazioni civili con pragmatismo sobrio, assumendoti la parte organizzativa più faticosa che altri scansano volentieri. Sei la roccia su cui i tuoi alleati possono fare sempre affidamento. Il limite è l'insofferenza per la folla: diffidare dei movimenti popolari spontanei e chiudersi in un circolo ristretto di persone severe.",
      sintesi: "Amicizie storiche e fedeltà incrollabile nei progetti comuni; il rischio è l'eccesso di diffidenza verso il nuovo."
    },
    12: {
      title: 'Saturno in Dodicesima Casa — Il Ritiro Solitario che Purifica l’Anima',
      text: "Saturno dimora nell'ultimo settore della carta natale, dove la solitudine terrena diventa laboratorio di profonda emancipazione spirituale e purificazione dei debiti karmici del passato. Puoi aver conosciuto periodi di reclusione, lavoro solitario o prove invisibili che hanno temprato il tuo carattere al riparo dagli sguardi mondani. C'è una saggezza ascetica che ti rende capace di sopportare le ingiustizie con nobile serenità. La debolezza è la rassegnazione colpevole: credere di essere destinati alla sofferenza, sabotando le proprie occasioni di felicità terrena.",
      sintesi: "Ascesi silenziosa e saldo dei debiti del passato; la liberazione esige di non fare del sacrificio la propria unica identità."
    }
  },

  dignities: {
    Capricorn: {
      kind: 'Domicilio',
      title: 'In Domicilio Notturno — La Pietra d’Angolo e la Legge del Tempo',
      text: "Nel Capricorno, Saturno siede sul proprio trono di roccia: qui la legge del tempo, della materia e della fatica non è vissuta come una condanna esterna ma come l'essenza stessa della dignità personale. Non chiedi scorciatoie, non invidi i successi facili e sai che l'opera compiuta con perseveranza solitaria resisterà quando le mode effimere saranno scomparse. È la dignità della maestria incrollabile. Il pericolo implicito in tanta fortezza è la pietrificazione del sentimento: considerare la vulnerabilità un difetto imperdonabile, costruendosi una tomba di doveri dentro cui si finisce per morire di freddo.",
      sintesi: "Saturno padrone della roccia e del tempo: autorità incorruttibile che deve preservare uno spazio per la vita del cuore."
    },
    Aquarius: {
      kind: 'Domicilio',
      title: 'In Domicilio Diurno — La Struttura dell’Aria e il Rigore della Verità',
      text: "Nell'Acquario, Saturno governa l'aria limpida dell'intelletto imparziale, della giustizia sociale e della costruzione di un ordine civile fondato sulla fratellanza razionale. Non si piega al conformismo della tribù né teme l'impopolarità di chi anticipa i tempi: disegna leggi per l'umanità futura con coerenza incrollabile. È la dignità del legislatore incorruttibile e visionario. L'insidia di questa purezza è l'astrazione disumana: preferire la bellezza del sistema teorico alla pietà per la persona concreta, diventando tiranni del progresso senza accorgersene.",
      sintesi: "Saturno architetto del pensiero libero e della società: rigore intellettuale sublime che non deve dimenticare il calore umano."
    },
    Libra: {
      kind: 'Esaltazione',
      title: 'In Esaltazione — L’Equità della Bilancia e il Giudizio Senza Rabbia',
      text: "L'esaltazione di Saturno nella Bilancia rappresenta l'apice della civiltà del diritto: la forza severa del tempo si mette al servizio della misura, della proporzione estetica e della risoluzione imparziale delle controversie. Qui il giudizio non è dettato dalla vendetta né dal privilegio di fazione, ma dall'equilibrio oggettivo delle ragioni e dei doveri. È la collocazione dell'arbitro supremo e del patto indissolubile. Il prezzo dell'esaltazione è l'intransigenza gelida: rifiutare qualsiasi deviazione dal protocollo stabilito, dimenticando che la vera giustizia deve saper accogliere anche il perdono.",
      sintesi: "Trionfo della giustizia equanime e del patto inviolabile; la maestria esige di mitigare il rigore della legge con la comprensione."
    },
    Cancer: {
      kind: 'Esilio',
      title: 'In Esilio — La Corazza Fredda Sopra la Ferita del Bambino',
      text: "Nel segno della Luna, Saturno si trova a dover operare dove è richiesta morbidezza, abbandono e accoglienza incondizionata. La risposta spontanea a questa frizione è spesso una corazza d'acciaio calata sui sentimenti più vulnerabili per non rischiare di essere feriti o abbandonati. Tuttavia questo esilio dona una ricchezza morale che le posizioni comode non conoscono: impari che la vera protezione non consiste nel murare il proprio cuore nella pietra, ma nel diventare capaci di custodire la tenerezza altrui con fedeltà silenziosa e indistruttibile.",
      sintesi: "Difesa rigida dell'intimità in esilio: la redenzione comincia quando impari che la vera forza accoglie senza barricate."
    },
    Leo: {
      kind: 'Esilio',
      title: 'In Esilio — Il Limite Austero che Umilia il Palcoscenico dell’Ego',
      text: "Nel segno del Sole, Saturno impone la disciplina dove l'anima vorrebbe brillare senza freni né doveri. Ne deriva una sensazione precoce di non essere visti o di dover guadagnare ogni briciola di stima con sforzi monumentali, che può generare un orgoglio amaro e diffidente. Ma chi supera la mortificazione dell'ego scopre un tesoro regale: una sovranità autentica, che non ha bisogno dell'adulazione della folla per sapere quanto vale e che sa guidare gli altri senza trasformare il proprio trono in un palcoscenico da circo.",
      sintesi: "Orgoglio ferito e disciplina severa dell'ego; scopri che la vera regalità non mendica applausi ma regge il peso del mondo."
    },
    Aries: {
      kind: 'Caduta',
      title: 'In Caduta — L’Impatto Prematuro che Infrange la Spada',
      text: "La caduta di Saturno nell'Ariete segnala uno scontro violento tra il bisogno di attendere e la foga irrefrenabile di agire immediatamente. Spesso la fretta porta a infrangersi contro muri eretti prima del tempo, generando una frustrazione acuta che porta a dubitare della propria forza o a scagliarsi contro l'ostacolo con rabbia cieca. Chi impara l'alchimia di questa caduta ottiene una spada temprata nel fuoco e nell'acciaio: impara a dosare la velocità del colpo, diventando un guerriero implacabile che sa quando avanzare e quando attendere senza sprecare un solo respiro.",
      sintesi: "Frizione tra la prudenza e l'assalto istintivo; la vittoria si conquista quando l'audacia impara il tempismo del colpo."
    }
  },

  combinations: {
    'Capricorn|10': {
        title: "Saturno in Capricorno in Decima Casa",
        canonico: "Nel proprio domicilio nel Capricorno e insediato al culmine della decima casa, Saturno realizza la più possente concentrazione del principio di responsabilità civile, governo del tempo e perseveranza morale. La tradizione classica vede in tale schema l'archetipo dello statista probo, dell'edificatore di strutture durevoli che sale alle cariche supreme unicamente per il rigore della condotta e la resistenza indefessa alle prove della sorte. L'individuo sostiene fatiche monumentali senza cedere al lamento e imprime alla propria opera una stabilità che supera i decenni. I pericoli canonici toccano la durezza inflessibile, l'ambizione pietrificata che soffoca ogni calore umano e l'isolamento amaro sulla vetta. I bastioni più fieri franano rovinosamente quando poggiano sulla sabbia dell'intimidazione: il comando conserva autorevolezza solo finché la legge viene applicata con la medesima imparzialità al principe e al mendicante.",
        lilithiano: "Ti hanno messo sulle spalle il peso del decoro e della reputazione familiare quando avevi ancora lo sguardo fresco dei primi anni. La rigidezza delle aspettative adulte cancellava ogni diritto alla spensieratezza, pretendendo prestazioni impeccabili prima ancora che l'infanzia avesse termine. Raggiungi la cima della rupe in solitudine, giurando nel gelo che nessuno avrebbe più osato darti ordini.\n\nLilith ti attende sulla vetta più alta per farti una domanda che nessuno ti ha mai rivolto: cosa te ne fai dell'ammirazione generale se dentro le tue mura si muore di freddo? Il potere che hai forgiato nella solitudine rischia di diventare la tua tomba dorata. La tua vera ribellione comincia quando deponi l'armatura, guardi la valle senza sentirti in dovere di governarla tutta e ammetti che anche il tuo cuore merita calore, ascolto e riposo senza dover pagare dazio a nessuno.\n\nLa tua forza d'animo è monumentale: sai mantenere la barra dritta quando infuria la burrasca e tutti gli altri cedono al panico. Edifichi opere che restano salde dopo che le mode effimere sono svanite nel nulla. La vera grandezza non teme la tenerezza: chi ha domato le cime più impervie sa posare lo scettro per ascoltare chi trema, fondando la propria autorità sulla giustizia disarmata.",
        sintesi: "Saturno signore del Medio Cielo in Capricorno: autorità titanica ed etica del dovere che rifioriscono spogliandosi della rigidità difensiva."
      },
    'Libra|7': {
        title: "Saturno in Bilancia in Settima Casa",
        canonico: "Saturno gode della propria esaltazione nella Bilancia e siede nella settima casa, angolo dell'Altro e sede delle obbligazioni contrattuali: la fermezza della legge si fonde con la ricerca meticolosa dell'armonia giuridica e nuziale. La dottrina astrologica classica scorge in tale configurazione il garante incorruttibile dei patti solenni, l'arbitro saggio che concilia le contese storiche ponendo fine alle faide tra fazioni avverse. Chi nasce sotto questo segno non ammette accordi ambigui e conferisce alle unioni affettive e professionali una serietà d'intenti che incute rispetto. I rischi consueti toccano la rigidità censorie verso il partner, la trasformazione del legame in una contesa giudiziaria permanente e l'aridità del sentimento. La paura del tradimento porta spesso a blindare il contratto fino a soffocarne la linfa vitale: nessuna clausola notarile potrà mai sostituire il coraggio di scommettere sulla lealtà della controparte.",
        lilithiano: "Hai vissuto i legami come contratti severi in cui ogni mossa doveva essere soppesata con precisione da tribunale per timore di cadere in fallo. I matrimoni ipocriti della cerchia familiare fornivano un modello desolante di convivenza forzata, fondata sul ricatto della rispettabilità esteriore.\n\nLilith entra nella tua stanza delle udienze per stracciare i verbali delle accuse reciproche. Una relazione vera tra creature libere non è un patto notarile garantito dalla paura della separazione né un processo in cui si tengono registri delle mancanze passate. La vera unione non teme l'attrito né esige una perfezione sterile: vive dell'incontro reale tra due esseri sovrani che si scelgono ogni giorno senza bisogno di gabbie istituzionali.\n\nPossiedi una saggezza nuziale rara: sai come dare struttura e lealtà a progetti condivisi che altrimenti andrebbero in fumo alla prima burrasca. Un patto sacro si riconosce dalla libertà con cui ciascuno può nominare il proprio confine: la lealtà adamantina fiorisce solo dove la vigilanza cede il passo al rispetto tra pari.",
        sintesi: "Saturno esaltato al Discendente in Bilancia: lealtà contrattuale incrollabile che trova autentica grandezza quando diserta la censura dell'Altro."
      }
  },

  retrograde: {
    title: 'Saturno Retrogrado — La Legge Interiore Forgiata nel Fuoco Segreto',
    text: "La legge interiore nasce dal vuoto lasciato da un'autorità esterna che non ha saputo proteggere né dare confini certi. Con Saturno retrogrado, l'individuo non si fida delle gerarchie costituite né cerca conferme nei titoli mondani: il severo guardiano che misura ogni azione risiede interamente nella coscienza. Questo comporta una maturità precoce, gravata da un'auto-esigenza spietata che non perdona alcuna imperfezione. Spesso si lavora nell'ombra senza pretendere applausi, costruendo con metodo formidabile opere che resistono al passare delle generazioni. Il nodo critico è il senso di colpa paralizzante: caricarsi addosso i debiti del mondo e punirsi continuamente per il solo fatto di esistere o di desiderare il riposo.",
    sintesi: "Autorità edificata senza modelli esterni: disciplina implacabile della coscienza e superamento dell'auto-accusa ancestrale."
  }
};


// =========================================================================
  BODIES.Mars = {

    signs: {

      Aries: {
        title: 'Marte in Ariete — La Spada Non Temperata',
        text: "Marte in Ariete non è Marte «potenziato»: è Marte senza mediazione. In ogni altro segno la spinta all'azione passa attraverso un filtro — il calcolo, l'attesa, il permesso implicito di qualcuno. Qui il filtro non esiste. L'impulso e il gesto sono lo stesso istante, e ne risulta una persona che si muove prima di aver finito di deliberare. Il vantaggio è la velocità pura: dove gli altri stanno ancora valutando, tu hai già occupato il terreno. Il prezzo è che non c'è un freno interno da azionare, perché il freno non è mai stato costruito. Va imparato da adulti, e si impara sbagliando.",
        sintesi: "Impulso e gesto coincidono: nessun filtro fra il volere e il fare."
      },

      Taurus: {
        title: 'Marte in Toro — La Forza che Non Si Sposta',
        text: "Qui l'azione ha un tempo di accensione lungo e una durata sproporzionata. Non sei tu a partire per primo, e questo viene spesso scambiato per mancanza di grinta da chi non ti ha mai visto arrivare in fondo a qualcosa: mentre gli altri hanno già cambiato tre obiettivi, tu sei ancora sul primo, e lo stai finendo. La tua forma di aggressività non è l'attacco, è il rifiuto di spostarti — una resistenza fisica, quasi corporea, che logora l'avversario senza alzare la voce. Il punto cieco è che la stessa inerzia che ti rende inespugnabile ti tiene fermo anche quando la posizione non vale più la pena di essere difesa.",
        sintesi: "Accensione lenta, durata lunghissima: vinci per resistenza, non per assalto."
      },

      Gemini: {
        title: 'Marte in Gemelli — Il Combattimento Verbale',
        text: "L'arma è la parola, e la usi con una rapidità che gli altri registrano molto prima di riuscire a rispondere. Il conflitto qui non è fisico né frontale: è argomentativo, ironico, fatto di battute che arrivano una frazione di secondo prima di quelle altrui. Sul piano dell'azione, l'energia si distribuisce su molti fronti insieme — tre progetti aperti sono la tua condizione normale, non un disordine. La difficoltà arriva quando la situazione chiede una sola direzione tenuta a lungo: l'interesse si sposta proprio quando comincerebbe la parte faticosa, e resta una scia di cose iniziate bene e mai chiuse.",
        sintesi: "Combatti con la parola e su più fronti; la fatica è restare su uno solo."
      },

      Cancer: {
        title: 'Marte in Cancro — La Difesa Obliqua',
        text: "Questa è la collocazione in cui Marte fatica di più a riconoscersi. L'aggressività non scompare — si inabissa: invece di uscire come attacco esce come ritiro, come silenzio prolungato, come una freddezza improvvisa che l'altro non sa decifrare. Non attacchi il nemico, gli togli la tua presenza. C'è anche un dato di forza che va detto, perché passa inosservato: quando a essere minacciato è qualcuno che ami, la stessa energia diventa immediata e feroce, e scopri una capacità di combattere che per te non avresti mai mobilitato. Difendi gli altri con una prontezza che non riesci a usare per te.",
        sintesi: "L'ira si ritira invece di colpire; la ferocia si accende solo per proteggere altri."
      },

      Leo: {
        title: 'Marte in Leone — Il Coraggio Come Spettacolo',
        text: "L'azione qui ha bisogno di uno sguardo che la registri. Non è vanità: è che il gesto compiuto senza testimoni ti sembra incompleto, non ancora del tutto reale. Ne deriva un coraggio autentico e teatrale insieme — sai esporti in prima persona dove altri si tirano indietro, e lo fai meglio se qualcuno sta guardando. Il conflitto lo affronti a viso aperto, dichiarandolo, perché colpire di nascosto ti disgusta più che perdere. Il punto delicato è l'orgoglio: una volta preso pubblicamente un impegno, ti costa infinitamente più fatica ritirarti che continuare in una direzione che hai già capito essere sbagliata.",
        sintesi: "Coraggio dichiarato, mai obliquo; l'orgoglio impedisce la ritirata."
      },

      Virgo: {
        title: 'Marte in Vergine — L’Azione Come Tecnica',
        text: "L'energia qui non si spende in slancio, si spende in precisione. Prima di agire scomponi, verifichi, elimini il superfluo, e quando finalmente ti muovi il gesto è essenziale e non ha sbavature. È la collocazione dell'artigiano e del tecnico: il lavoro fatto bene è per te una forma di combattimento, e il disordine altrui è una provocazione reale. L'aggressività passa attraverso l'osservazione critica — vedi il difetto prima di ogni altra cosa, e nominarlo è il tuo modo di colpire. Il logoramento specifico di questa posizione è interno: la stessa esigenza che rivolgi al mondo la rivolgi a te, e non fa sconti.",
        sintesi: "Agisci per precisione; l'arma è il rilievo del difetto, anche sui tuoi."
      },

      Libra: {
        title: 'Marte in Bilancia — Il Conflitto Rimandato',
        text: "Marte deve qui passare per il segno che più di ogni altro teme la rottura, e il risultato è un'energia che gira attorno allo scontro invece di attraversarlo. Ottieni per via diplomatica cose che altri ottengono per via frontale, e spesso ottieni di più: sai esattamente cosa dire perché l'altro conceda credendo di aver scelto. Il costo si accumula altrove. Le irritazioni non dette restano, si sedimentano per mesi in una cortesia impeccabile, e poi escono tutte insieme per un motivo sproporzionato, lasciando l'altro sinceramente stupito. Il tuo lavoro di una vita è imparare che un conflitto detto in tempo è più leggero di un conflitto rimandato.",
        sintesi: "Ottieni per diplomazia ciò che non chiedi frontalmente; l'ira arretra e poi esplode."
      },

      Scorpio: {
        title: 'Marte in Scorpione — La Forza Che Non Si Mostra',
        text: "Qui la potenza è massima e quasi invisibile. Non ti agiti, non alzi la voce, non minacci: aspetti, osservi dove l'altro è vulnerabile, e quando ti muovi lo fai una volta sola. È una collocazione che regge il dolore fisico e psicologico molto oltre la media, e che non lascia mai vedere quanto costa reggerlo. Il conflitto non ti spaventa perché sai già di poterlo sostenere più a lungo dell'avversario. La zona pericolosa è il rancore: la stessa memoria che ti rende un alleato assoluto ti rende anche incapace di lasciar cadere un torto, e puoi portare avanti una partita per anni dopo che tutti gli altri l'hanno dimenticata.",
        sintesi: "Colpisci una volta sola, dopo aver atteso; e non dimentichi."
      },

      Sagittarius: {
        title: 'Marte in Sagittario — La Causa Prima della Persona',
        text: "Ti muovi bene solo quando puoi credere in qualcosa. Un obiettivo puramente pratico, privo di una ragione più larga, non riesce a mobilitarti — mentre per un principio attraversi distanze che nessuno ti ha chiesto di attraversare. L'azione qui è slancio, entusiasmo contagioso, capacità di trascinare altri semplicemente perché tu ci credi davvero. Il conflitto lo combatti sul piano delle idee, e lo combatti convinto di avere ragione. Il rischio che ti riguarda in proprio è la crociata: trasformare una divergenza di opinioni in una questione morale, e continuare a difendere una posizione non perché sia ancora giusta, ma perché è tua.",
        sintesi: "Ti attiva solo ciò in cui credi; il rischio è trasformare le divergenze in crociate."
      },

      Capricorn: {
        title: 'Marte in Capricorno — La Campagna Lunga',
        text: "Questa è l'unica collocazione in cui l'impulso è interamente al servizio di un piano. Non sprechi un gesto: ogni azione è collocata dentro una sequenza che punta a un risultato lontano, e la pazienza con cui aspetti il momento giusto sarebbe insopportabile per quasi chiunque altro. Il conflitto lo gestisci per posizioni, non per scontri — occupi il terreno, consolidi, avanzi quando l'avversario si è già indebolito da solo. La forza reale è che arrivi: ciò che ti proponi a vent'anni è statisticamente ciò che avrai a quaranta. L'ombra è la durezza verso di te, l'idea che il riposo vada meritato e che fermarsi sia una forma di resa.",
        sintesi: "Ogni gesto dentro un piano lungo; arrivi, ma non ti concedi soste."
      },

      Aquarius: {
        title: 'Marte in Acquario — L’Azione Che Rompe lo Schema',
        text: "L'energia qui è discontinua per natura: lunghi periodi di apparente distacco interrotti da mosse improvvise che nessuno aveva previsto, e che cambiano la situazione in un colpo solo. Non ti mobiliti per un interesse personale — ti mobiliti quando una regola ti sembra ingiusta, e allora diventi inamovibile. C'è una freddezza operativa che ti permette di prendere decisioni nette in momenti in cui altri sono paralizzati dall'emotività. Ciò che ti sfugge più facilmente è l'effetto umano delle tue rotture: accetti di far saltare un assetto per un principio giusto, senza calcolare per intero cosa costa a chi ci stava dentro.",
        sintesi: "Immobile per lunghi tratti, poi una mossa che ribalta tutto in nome di un principio."
      },

      Pisces: {
        title: 'Marte in Pesci — La Forza Senza Contorni',
        text: "L'azione qui non ha bordi netti, e questo confonde te per primo: sai muoverti benissimo quando la direzione ti viene da qualcosa di più grande — un'ispirazione, un'arte, una persona da salvare — e ti ritrovi paralizzato quando dovresti semplicemente affermare un tuo interesse. Rivendicare per sé è la manovra che non riesce. In compenso hai una forma di forza che le collocazioni marziali più dure non conoscono: la capacità di cedere sul momento e di riemergere intatto altrove, senza che lo scontro abbia mai avuto luogo. Il pericolo è il vittimismo — la scorciatoia di non agire e poi lamentare ciò che non è accaduto.",
        sintesi: "Agisci per qualcosa di più grande di te; rivendicare per te stesso è la manovra difficile."
      }

    },

    houses: {

      1: {
        title: 'Marte in Prima Casa — Si Vede Prima Che Tu Parli',
        text: "L'energia marziale sta sull'Ascendente, cioè sulla soglia dalla quale il mondo ti registra. Le persone percepiscono una prontezza, una tensione fisica, un'aria di uno che non si lascia mettere i piedi in testa — e la percepiscono prima di aver scambiato con te una frase. Questo ti evita una quantità di conflitti che non dovrai combattere perché nessuno li inizia. Il contraccolpo è che ricevi reazioni difensive da persone che non avevi alcuna intenzione di sfidare: arrivi con un'intensità che per te è normale e che l'altro legge come una pressione.",
        sintesi: "La tua forza è la prima cosa che gli altri percepiscono, prima delle parole."
      },

      2: {
        title: 'Marte in Seconda Casa — Guadagnare Come Atto di Forza',
        text: "Il campo di battaglia è ciò che possiedi e ciò che vali. Le risorse non ti arrivano, le prendi: c'è in te un'aggressività sana e diretta nel procurarti mezzi, che si accende quando qualcosa che consideri tuo viene messo in discussione. Il denaro ha per te un peso emotivo che non ha per altri — non per avidità, ma perché lo leggi come misura concreta della tua autonomia. La dinamica da sorvegliare è il rapporto fra guadagno e dispersione: qui Marte sa produrre con notevole efficacia, e sa bruciare ciò che ha prodotto con la stessa rapidità, spesso per affermare che può permetterselo.",
        sintesi: "Ti procuri le risorse combattendo; le produci in fretta e le bruci con la stessa fretta."
      },

      3: {
        title: 'Marte in Terza Casa — La Mente Armata',
        text: "L'azione si concentra nel pensiero, nel linguaggio e nello spazio quotidiano che attraversi. Discuti volentieri, e discutere per te non è un conflitto ma un modo di pensare ad alta voce: gli altri lo scoprono in ritardo e nel frattempo si sono offesi. L'apprendimento avviene per scontro con il materiale — assimili ciò che ti resiste e ti annoi mortalmente davanti a ciò che ti viene concesso troppo facilmente. L'attrito più tipico di questa casa riguarda fratelli, sorelle e primi compagni: è lì che hai imparato a difendere il tuo spazio, e spesso lì che è rimasta una partita non chiusa.",
        sintesi: "Pensi discutendo e impari per attrito; la prima palestra sono stati i fratelli."
      },

      4: {
        title: 'Marte in Quarta Casa — Il Fuoco Sotto il Pavimento',
        text: "La radice della casa, la famiglia d'origine, la vita privata: è qui che l'energia marziale si è formata e ha trovato il suo primo ostacolo. Molto spesso significa una casa d'infanzia in cui c'era una tensione permanente, dichiarata o sotterranea, e in cui hai imparato prestissimo a stare in allerta. Da adulto questo produce due cose opposte e simultanee: una difesa fortissima del tuo spazio domestico, che nessuno può violare, e una difficoltà a riposare davvero dentro di esso, perché una parte di te resta di guardia. Il lavoro di questa collocazione è trasformare il presidio in radicamento.",
        sintesi: "La tensione ha origine nella casa d'infanzia; difendi il tuo spazio ma fatichi a riposarci."
      },

      5: {
        title: 'Marte in Quinta Casa — Il Desiderio che Prende l’Iniziativa',
        text: "Creatività, gioco, seduzione, figli: il settore in cui ci si espone per piacere, non per dovere. Marte qui rende diretta la conquista — sei tu a fare la prima mossa, e la fai senza i preamboli che altri considerano necessari. La stessa immediatezza vale per l'espressione creativa: produci molto e in fretta, con un'energia che si accende sull'entusiasmo e si spegne appena l'entusiasmo cala. Nel rapporto con i figli e con chi è più giovane, porti una vitalità fisica e competitiva che li stimola davvero — a patto di ricordare che per loro non è un gioco alla pari.",
        sintesi: "Fai tu la prima mossa, in amore e in creazione; l'entusiasmo accende e spegne."
      },

      6: {
        title: 'Marte in Sesta Casa — La Battaglia Quotidiana',
        text: "L'energia si scarica dove nessuno la vede: nel lavoro giornaliero, nella routine, nella manutenzione ostinata di ciò che funziona. Hai una capacità di carico operativo superiore alla media e la usi tutta, spesso senza accorgertene, finché non è il corpo a presentare il conto — questa è la casa in cui lo sforzo non gestito si traduce in sintomo. Nell'ambiente di lavoro sei quello che affronta il problema invece di aggirarlo, e questo ti procura insieme stima e attriti con i colleghi che avrebbero preferito non vederlo. La disciplina fisica non è per te un'opzione salutistica: è lo scarico necessario.",
        sintesi: "Scarichi tutto nel lavoro quotidiano; senza scarico fisico il conto lo presenta il corpo."
      },

      7: {
        title: 'Marte in Settima Casa — Il Guerriero Dentro il Patto',
        text: "La settima è l'unico luogo del tema che non ti appartiene: è lo spazio dell'altro, del socio, del coniuge, dell'avversario dichiarato. Marte qui non combatte il mondo, combatte dentro le relazioni, e questo cambia tutto. L'energia che in prima casa sarebbe stata affermazione personale diventa confronto a due: attiri persone dirette, competitive, a volte conflittuali, e non per sfortuna — le riconosci come gli unici interlocutori che ti tengono testa. Il rischio specifico di questa casa, che non riguarda nessun'altra collocazione di Marte, è confondere la relazione con l'arena: trasformare in duello ciò che chiedeva un'alleanza.",
        sintesi: "La tua forza si attiva dentro le relazioni; il rischio è scambiare il patto per un duello."
      },

      8: {
        title: 'Marte in Ottava Casa — L’Energia nelle Zone Profonde',
        text: "Crisi, intimità, denaro condiviso, tutto ciò che si tocca solo quando le difese sono cadute. Marte qui dà una resistenza notevole nelle situazioni estreme: dove gli altri si bloccano — un lutto, una rottura, un tracollo economico — tu trovi paradossalmente lucidità e capacità di manovra. La sessualità ha un peso e un'intensità che non sono negoziabili e che richiedono un partner capace di reggerli. Il terreno minato sono le risorse altrui e le dinamiche di potere: eredità, soci, contratti in cui il denaro non è solo tuo. È lì che questa collocazione produce le battaglie più lunghe e più costose.",
        sintesi: "Lucido nelle crisi e intenso nell'intimità; le guerre lunghe nascono sul denaro condiviso."
      },

      9: {
        title: 'Marte in Nona Casa — La Conquista dell’Orizzonte',
        text: "L'azione si dirige verso ciò che è lontano: studi superiori, viaggi, culture e sistemi di pensiero diversi dal proprio. C'è in te una spinta fisica ad andare a vedere, e una intolleranza reale verso gli ambienti chiusi e le mentalità provinciali. Nelle questioni di principio ti batti volentieri e con competenza, e questo settore è anche quello delle cause legali, in cui tendi a entrare più facilmente della media. La cosa da tenere d'occhio è la scivolata dal convincimento alla predica: la stessa energia che ti fa difendere ciò in cui credi può farti smettere di ascoltare chi crede altro.",
        sintesi: "Ti muovi verso il lontano e ti batti per principio; il limite è smettere di ascoltare."
      },

      10: {
        title: 'Marte in Decima Casa — L’Ambizione a Cielo Aperto',
        text: "Marte al Medio Cielo mette l'energia nel punto più visibile del tema: la carriera, il ruolo pubblico, ciò per cui ti riconoscono. L'ambizione non è dissimulata e non ha bisogno di esserlo; la tua scalata è dichiarata e diretta, e produce risultati concreti prima di quanto sarebbe ragionevole attendersi. Gli attriti con le figure di autorità sono strutturali in questa posizione: fin da giovane hai avuto difficoltà a riconoscere un capo che non ti sembrasse competente. Il punto di massima esposizione è che ogni tuo conflitto avviene sotto gli occhi di tutti, e la reputazione ne porta traccia più a lungo di quanto tu ricordi.",
        sintesi: "Ambizione dichiarata e scontri con l'autorità, entrambi in pubblico."
      },

      11: {
        title: 'Marte in Undicesima Casa — La Forza Messa in Comune',
        text: "L'energia si attiva dentro i gruppi, i progetti collettivi, le amicizie e le cause condivise. Sei quello che nel gruppo fa succedere le cose: dove gli altri discutono, tu proponi e muovi, e per questo finisci spesso a guidare senza averlo chiesto. Le tue amicizie sono poche, scelte per affinità di temperamento e difese con una lealtà che non ammette sfumature. La zona di frizione è il momento in cui gli obiettivi del gruppo divergono dai tuoi: fatichi a restare in un collettivo che rallenta, e le rotture, quando arrivano, sono nette e definitive.",
        sintesi: "Nei gruppi sei tu che fai muovere le cose; quando divergono, rompi in modo netto."
      },

      12: {
        title: 'Marte in Dodicesima Casa — La Forza che Non Sa di Avere',
        text: "L'energia marziale sta nel settore di ciò che resta fuori dalla coscienza, e la conseguenza più concreta è che fatichi a riconoscere la tua stessa aggressività. Ti percepisci mite, e resti sinceramente sorpreso quando qualcuno ti dice di averti trovato duro. La collera non sparisce: si accumula sottotraccia, senza destinatario dichiarato, e si scarica spesso contro di te sotto forma di autosabotaggio o di stanchezza inspiegabile. La direzione di lavoro è opposta a quella delle altre case: non imparare a contenere Marte, ma dargli finalmente un nome e un bersaglio esterno legittimo. Quando ci riesci, questa è la posizione che agisce per gli altri con una potenza che nessuna posizione visibile raggiunge.",
        sintesi: "Non riconosci la tua aggressività; accumulata, si rivolge contro di te."
      }

    },

    dignities: {

      Aries: {
        kind: 'Domicilio',
        title: 'In Domicilio — Autorità Senza Permesso',
        text: "Marte governa l'Ariete: qui è a casa propria, e la dignità non si limita a «rafforzare». Significa che non c'è dissonanza fra ciò che senti e ciò che fai. Non devi giustificare la tua aggressività, non la vivi come un difetto da gestire: è semplicemente il tuo modo di essere presente. Chi ha Marte in esilio passa la vita a chiedere scusa per la propria forza; tu no. È una libertà, e come ogni dignità piena porta la sua trappola: non avendo mai dovuto negoziare con questa funzione, difficilmente sospetti che agli altri costi fatica sostenerla.",
        sintesi: "Marte a casa propria: nessuna frattura fra il sentire e l'agire."
      },

      Scorpio: {
        kind: 'Domicilio',
        title: 'In Domicilio Notturno — Il Possesso di Sé',
        text: "Marte governa anche lo Scorpione, ma qui il domicilio ha tutt'altro sapore: non è la forza che si dichiara, è la forza che si trattiene sapendo di averla. La padronanza non riguarda il gesto, riguarda il momento in cui compierlo. Questo ti dà un'autorità che non ha bisogno di essere esercitata per essere percepita — le persone avvertono che potresti, e questo basta. È la dignità più difficile da corrompere e la più difficile da correggere: proprio perché la tua forza funziona bene così, non hai alcun incentivo interno a rivedere il modo in cui la usi, e un uso implacabile ti sembrerà sempre semplicemente un uso efficace.",
        sintesi: "Padronanza del momento più che del gesto: la forza si percepisce senza essere usata."
      },

      Capricorn: {
        kind: 'Esaltazione',
        title: 'In Esaltazione — La Forza che Trova la Sua Forma',
        text: "L'esaltazione non è il possesso, è l'incontro riuscito: Marte in Capricorno trova finalmente la struttura che gli mancava per non disperdersi. L'impulso viene trattenuto, misurato, orientato — e diventa capacità di portare a termine, che è la cosa che Marte da solo non sa fare. È la collocazione dell'efficacia: la stessa quantità di energia che altrove produce scintille, qui produce opere. Va detto però che l'esaltazione è una condizione di ospite, non di padrone: il prezzo è una certa aridità, la difficoltà a spendere forza per qualcosa che non abbia un risultato misurabile, e il sospetto verso la gioia che non sia stata guadagnata.",
        sintesi: "L'impulso trova struttura e diventa opera; il costo è l'aridità."
      },

      Taurus: {
        kind: 'Esilio',
        title: 'In Esilio — La Fretta in un Corpo Lento',
        text: "Marte in esilio nel Toro governa una materia che non risponde ai suoi tempi. La funzione non è indebolita, è fuori ritmo: vorresti risolvere adesso e ti trovi dentro processi che richiedono mesi, e la frustrazione che ne deriva è la nota di fondo di questa posizione. L'esilio non è una condanna, è un compito preciso — imparare che qui la forza non è la velocità dell'attacco ma la durata della presa. Chi ci riesce ottiene una qualità che nessun domicilio marziale possiede: la capacità di restare in una situazione che non si sblocca senza incendiarla e senza abbandonarla.",
        sintesi: "Fuori ritmo, non indebolito: devi imparare la durata al posto della velocità."
      },

      Libra: {
        kind: 'Esilio',
        title: 'In Esilio — Chiedere Scusa per la Propria Forza',
        text: "Nel segno opposto al suo domicilio, Marte deve agire attraverso il criterio che gli è più estraneo: tenere conto dell'altro prima di muoversi. Ne nasce un'esitazione strutturale — il momento in cui dovresti affermare una tua ragione è esattamente il momento in cui ti chiedi se sia giusto farlo, e quella frazione di dubbio ti fa perdere l'occasione. Molte persone con questa collocazione arrivano alla mezza età con una lista di cose che non hanno detto. L'esilio però insegna ciò che il domicilio ignora: sai negoziare, sai far cedere l'altro senza umiliarlo, e nessun Marte ariano imparerà mai a farlo.",
        sintesi: "L'affermazione passa per il dubbio; in cambio sai negoziare come nessun altro Marte."
      },

      Cancer: {
        kind: 'Caduta',
        title: 'In Caduta — L’Ira Che Torna Indietro',
        text: "La caduta è la condizione più scomoda e la più fraintesa. Marte in Cancro non è un Marte debole: è un Marte a cui è stato tolto il bersaglio esterno. L'energia c'è tutta, ma invece di uscire rientra, e si trasforma in permalosità, in rimuginio, in reazioni emotive sproporzionate che arrivano in differita rispetto all'offesa. Chi ti conosce poco ti crede accomodante; chi ti conosce sa che tieni il conto. Questa posizione chiede un lavoro che nessun'altra chiede con la stessa urgenza: riconoscere la propria collera mentre accade, non tre giorni dopo. Fatto quel lavoro, la stessa sensibilità che ti espone diventa la capacità di percepire un conflitto molto prima che diventi visibile.",
        sintesi: "L'energia rientra invece di uscire: il compito è riconoscere la collera mentre accade."
      }

    },

    // Sintesi segno × casa: il terzo strato, quello che descrive davvero una
    // persona. Chiave "Segno|Casa". Due registri distinti — la dottrina
    // classica e la lettura del Canone — mai l'uno la parafrasi dell'altro.
    combinations: {

      'Aries|1': {
        title: "Il Fuoco che Apre la Pista",
        canonico: "La tradizione astrologica considera Marte in Ariete in prima casa il vertice della forza dinamica: il pianeta si trova nel proprio domicilio diurno e nella casa angolare che governa l'inizio, il corpo e l'apparizione nel mondo. Questa configurazione conferisce una risolutezza fulminea e una vitalità prorompente che non tollera indugi né mediazioni prolungate. L'individuo avverte ogni circostanza come un invito all'azione pionieristica, fidando nel proprio vigore fisico e nella prontezza d'intuito per superare qualsiasi ostacolo. L'eccesso di foga espone tuttavia al pericolo di collisioni violente, alla collera esplosiva e a un consumo dissennato delle energie biologiche, lasciando progetti incompiuti non appena si esaurisce l'eccitazione della novità. Nelle cronache medievali questo Marte descrive il cavaliere solitario che precede la colonna: un'avanguardia necessaria che paga di tasca propria il rischio di aprire la via, dove il trionfo e la rovina sono separati da un millimetro di esitazione.",
        lilithiano: "La cultura patriarcale ha sempre temuto l'impulso primordiale dell'Ariete, tentando di addomesticarlo con il ricatto dell'obbedienza o di esiliarlo nella violenza cieca. Nelle aule scolastiche e nei salotti di famiglia ogni slancio autonomo veniva catalogato come insolenza da correggere. Quando questo fuoco abita la prima casa, la tua sola presenza diventa una dichiarazione di indipendenza che irrita chi fonda il potere sulla sottomissione. La ferita originaria riguarda il divieto di occupare spazio senza chiedere scusa: hai imparato a mostrare i denti per non farti cancellare, rischiando di scambiare la diffidenza costante per l'unico modo di restare in vita. Il riscatto autentico consiste nel trasformare l'audacia in sovranità incorruttibile, separando l'urgenza di esistere dalla necessità di provocare chi non possiede il tuo ardore. Resta un fatto incontrovertibile: chi rinuncia a domandare il permesso per esistere costringe l'intero ambiente a ridefinire le proprie frontiere.",
        sintesi: "La volontà pura incontra la prima casa: l'azione è un'affermazione immediata di sé, che deve imparare a non confondere il coraggio con la fretta cieca."
      },

      'Aries|2': {
        title: "La Spada della Fondazione",
        canonico: "Nella seconda casa il fuoco diurno dell'Ariete si scontra con il principio della terra e del consolidamento materiale. La dottrina attribuisce a questa posizione un'urgenza feroce di indipendenza economica, perseguita attraverso imprese audaci, il lavoro autonomo e la capacità di strappare risorse dal terreno con la sola forza dell'iniziativa personale. La persona non tollera debiti né dipendenze patrimoniali, vivendo il conto economico come una trincea da difendere con i denti. Il punto debole risiede nella gestione impulsiva del patrimonio: la tendenza a spendere di colpo o a rischiare capitali vitali in investimenti temerari può vanificare in poche ore i frutti di fatiche prolungate. La contraddizione rimane aperta sul terreno pratico: senza la pazienza di seminare prima di mietere, la conquista si traduce in una fiammata che lascia dietro di sé terra bruciata e granai vuoti.",
        lilithiano: "La morale economica dominante predica che la sicurezza si ottenga accumulando garanzie e chiedendo il permesso ai custodi del capitale. I manuali di prudenza domestica prescrivevano la subordinazione salariale come unica garanzia contro la rovina. Quando Marte in Ariete attraversa la seconda casa, avverti nel profondo che vendere il proprio tempo per un salario sicuro equivale a una mutilazione dello spirito. La società ti vuole con le mani legate dal debito, mentre la tua natura esige di procurarsi il sostentamento senza intermediari né contratti umilianti. La sfida consiste nel dissodare il proprio campo senza disperdere il raccolto nella fretta di dimostrare a tutti la tua autosufficienza. Nessun conto cifrato o rendita fondiaria potrà mai compensare la perdita dell'autonomia con cui procurarsi il pane quotidiano.",
        sintesi: "La spinta marziale incontra le risorse concrete: l'indipendenza materiale si conquista con iniziativa pionieristica senza cedere all'azzardo economico."
      },

      'Aries|3': {
        title: "Il Dardo del Verbo",
        canonico: "La terza casa orienta la forza impulsiva di Marte nel campo della dialettica, della scrittura e degli scambi immediati di prossimità. La mente opera come un dardo scagliato con precisione fulminea: comprende i problemi al volo, smonta le argomentazioni avversarie senza pietà ed esprime giudizi netti che non ammettono repliche. Questa immediatezza rende la persona formidabile nella polemica, nella contrattazione serrata e nell'inchiesta senza censure, dove l'esitazione equivale alla sconfitta. Tuttavia, l'insofferenza per le sfumature e il tono perennemente aggressivo rischiano di alienare amicizie, spezzare legami fraterni e provocare liti continue nel vicinato o sul lavoro. Resta da chiedersi se una lama così affilata serva a squarciare l'inganno o finisca per recidere i fili stessi della conversazione civile, lasciando chi parla solo nella propria ragione.",
        lilithiano: "I codici del decoro sociale esigono che il verbo sia mediato da formule di convenienza e cerimoniali di finta armonia. L'ambiente circostante considerava la diplomazia ipocrita l'unico contrassegno della persona beneducata. In terza casa, questo Marte rifiuta di indorare la pillola o di nascondere le contraddizioni dietro sorrisi di circostanza. Hai sofferto per l'incomprensione di chi scambia la limpidezza per cattiveria, provando la tentazione di usare la lingua come un pugnale per difenderti in anticipo dalle falsità del circondario. La trasformazione avviene quando smetti di combattere contro ogni sciocchezza pronunciata a tavola e impieghi la tua lucidità per smascherare le menzogne dei potenti. Quale utilità possiede una parola impeccabilmente forbita se tace esattamente nel momento in cui occorreva gridare?",
        sintesi: "L'energia dell'Ariete entra nella comunicazione: la parola si fa lama affilata e penetrante, che rischia di ferire se non impara a dosare il colpo."
      },

      'Aries|4': {
        title: "Il Fuoco delle Radici",
        canonico: "Collocato al Fondo Cielo, Marte in Ariete concentra la propria combustione nelle fondamenta intime dell'esistenza, nell'albero genealogico e nelle mura domestiche. La tradizione descrive questa sede come un terreno di attriti precoci con l'autorità familiare, dove l'infanzia è stata teatro di rivalità o dove la persona ha dovuto combattere per difendere il proprio diritto di esistere senza essere soffocata. La casa diventa una trincea: l'individuo manifesta un'inquietudine perenne che lo spinge a continue ristrutturazioni, traslochi o rotture con le tradizioni del clan d'origine. Se non canalizzata con rigore, questa vampa sotterranea genera litigi cronici tra le pareti domestiche e una reattività cieca verso chiunque tenti di imporre regole abitative. Nelle vecchie leggende fondative, il primo solco della città viene sempre tracciato con il ferro e difeso con il sangue: la casa diventa sicura solo quando chi la abita accetta di custodirne i confini di persona.",
        lilithiano: "Le genealogie familiari esigono spesso che la discendenza si immoli per mantenere in vita le illusioni e i debiti dei padri. La consuetudine domestica pretendeva che ogni slancio individuale venisse immolato sull'altare della concordia di facciata. In quarta casa, la fiamma dell'Ariete non accetta di ereditare il silenzio complice né di fare la sentinella delle colpe altrui. La tua ribellione è iniziata nella stanza d'infanzia, rifiutando l'omologazione affettiva imposta dai custodi del focolare. Non c'è sollievo nel restaurare le prigioni antiche: occorre andarsene o bruciare le maschere che coprivano le ingiustizie dei parenti. Chi abbandona le fortezze avite scopre che la vera patria si fonda sulla terra battuta con le proprie gambe, non sui feudi ereditati.",
        sintesi: "L'irruenza di Marte penetra nelle profondità domestiche: la casa è un territorio conteso, dove la persona deve fondare un proprio focolare autonomo."
      },

      'Aries|5': {
        title: "La Forgia del Desiderio",
        canonico: "La quinta casa accoglie Marte in Ariete in una consonanza di fuoco che amplifica l'eros, l'espressione artistica, il gioco e il desiderio di generare. La persona vive la conquista amorosa e la creazione come imprese epiche in cui investire l'intera sostanza vitale con slancio travolgente e disarmante sincerità. Non esistono mezze misure né corteggiamenti timidi: chi possiede questo transito attacca a testa alta, sfidando convenzioni e rivali con una baldanza che spesso affascina e intimidisce. Il rovescio della medaglia è l'egocentrismo teatrale, l'insofferenza per la routine quotidiana e la tendenza a disperdere talenti grandiosi in avventure effimere o scommesse rischiose intraprese solo per provare l'ebbrezza della sfida. Il rischio evidente è la combustione prematura: un teatro sontuoso dove gli attori si consumano in un atto unico di splendore, incapaci di sostenere l'attesa del secondo tempo.",
        lilithiano: "I recinti del conformismo affettivo tentano di ridurre la passione a un gioco ornamentale o a un contratto di mutua rassicurazione. I censori del gusto comune temevano l'intensità cruda del tuo slancio, pretendendo decoro al posto del sangue. In quinta casa, il fuoco marziale esige di amare e creare a briglie sciolte, senza chiedere garanzie di conformità sociale. Spesso hai conosciuto il gelo di chi voleva consumare la tua linfa vitale senza assumersi la responsabilità di reggere il confronto con un'anima selvaggia. La sovranità erotica si conquista smettendo di esibirsi per ottenere approvazione e riversando questa potenza in opere concepite secondo criteri incorruttibili. L'arte autentica e l'amore sovrano lasciano sempre una cicatrice: pretendere che non brucino significa scambiare il fuoco con una lampada da comodino.",
        sintesi: "Il fuoco della creazione e della passione erotica: l'ardore di vivere reclama un'opera fiera e un amore che non accetti mediocrità."
      },

      'Aries|6': {
        title: "L'Incudine del Lavoro",
        canonico: "Nel settore del servizio, della routine e della salute corporale, Marte in Ariete immette un'energia instancabile e un'etica del lavoro fondata sulla velocità e sull'autonomia esecutiva. L'individuo affronta le mansioni più gravose con la grinta di un pioniere, risolvendo emergenze complesse con prontezza invidiabile e pretendendo standard elevatissimi da se stesso e dai collaboratori. La convivenza professionale risulta tuttavia problematica: l'insofferenza per le procedure lente, l'intolleranza verso i ritardi altrui e la tendenza a scavalcare la gerarchia provocano attriti continui con colleghi e dirigenti. Sul piano fisico, l'accumulo di tensione non scaricata genera stati infiammatori, emicranie acute o traumi da sovraccarico, segnali inequivocabili di un motore condotto perennemente oltre la soglia termica consentita. L'officina artigiana mostra chiaramente il punto critico: l'utensile impugnato con rabbia rompe il pezzo in lavorazione anziché perfezionarlo, moltiplicando la fatica senza migliorare il risultato.",
        lilithiano: "La liturgia del dovere impone di immolare le proprie forze sull'altare di gerarchie sterili, scambiando lo sfruttamento per dedizione morale. I datori di lavoro e i superiori adulavano la tua resistenza fisica proprio per trasformarla in una risorsa da prosciugare a costo zero. Quando Marte abita la sesta casa, la tua persona non può accettare il ruolo dell'ingranaggio silenzioso in un meccanismo alienante. Il corpo si ribella con febbre e infortuni ogni volta che accetti di svendere la tua perizia per arricchire padroni mediocri. La vera salute consiste nel riprendersi il ritmo del proprio tempo, allestendo un'attività autonoma dove la disciplina risponde unicamente alle leggi della tua coscienza. L'organismo prima o poi presenta il conto: nessun elogio di fedeltà aziendale vale il logoramento silenzioso dei propri tessuti.",
        sintesi: "La forza marziale nelle incombenze quotidiane: l'efficienza esige ritmi indipendenti per non trasformare il corpo in una trincea logorante."
      },

      'Aries|7': {
        title: "Il Patto tra Fuochi",
        canonico: "L'ingresso di Marte in Ariete nella settima casa introduce una potente dialettica tra l'affermazione dell'io e la richiesta di cooperazione paritaria. La tradizione segnala qui la tendenza ad attirare persone dal temperamento focoso, volitivo o apertamente polemico, trasformando il matrimonio e le società in campi di continua negoziazione armata. La persona vive le relazioni con ardore viscerale: non sopporta i non detti, provoca il chiarimento non appena percepisce un'ambiguità e preferisce una lite clamorosa a un silenzio ipocrita. Il rischio costante è l'incapacità di scendere a patti, scambiando qualsiasi concessione diplomatica per una sconfitta disonorevole. Due spade sguainate nello stesso cortile non possono coesistere a lungo: o imparano a guardare nella stessa direzione contro un avversario comune, o la contesa si risolverà nella devastazione reciproca.",
        lilithiano: "La dottrina matrimoniale consueta descrive la relazione come un compromesso pacificatore dove l'attrito deve essere cancellato a ogni costo. L'educazione sentimentale corrente insegnava a considerare il conflitto un fallimento irreparabile anziché una chiarificazione salutare. In settima casa, Marte smaschera l'inganno dei patti fondati sulla rinuncia alla propria sovranità personale. Se hai passato la giovinezza a smussare i tuoi angoli per non sembrare minacciosa agli occhi del partner, hai scoperto che la sottomissione non compra l'amore ma il disprezzo. L'alleanza sacra esige il coraggio di sostenere lo sguardo di chi amiamo senza abbassare la testa, stipulando patti di fedeltà solo con chi non teme la tua tempra selvatica. È preferibile una rottura leale e clamorosa a cinquant'anni di risentimento consumato a bassa voce nello stesso letto.",
        sintesi: "Il pianeta della lotta si affaccia sulla casa dell'alleanza: il legame vive di sincerità coraggiosa, rifiutando le finzioni di una falsa concordia."
      },

      'Aries|8': {
        title: "La Spada dell'Ombra",
        canonico: "Nell'ottava casa l'energia pura di Marte si immerge nei recessi dell'inconscio, delle risorse condivise e delle crisi trasformative irreversibili. L'astrologia attribuisce a questa posizione un istinto infallibile nello smascherare le dinamiche di potere sotterranee, le manipolazioni economiche e i debiti morali tramandati lungo le generazioni. La persona affronta le perdite e i traumi esistenziali con una determinazione indomita, rifiutando di farsi abbattere dalle avversità più spietate. Tuttavia, la tentazione di ingaggiare duelli mortali nell'ombra, la diffidenza paranoica e il desiderio di controllo assoluto sulle finanze condivise possono inquinare profondamente le alleanze intime. Chi scende negli ipogei armato di sola audacia rischia di scambiare le proprie ombre per demoni da trucidare, ignorando che certe potenze sotterranee chiedono riscatto, non massacro.",
        lilithiano: "I patti non scritti dell'omertà impongono di seppellire i segreti della stirpe per non turbare l'apparente rispettabilità dell'eredità. La paura del disonore induceva i parenti a serrare le porte e a fingere che certe ferite non fossero mai state inflitte. In ottava casa, il fuoco dell'Ariete non si fa intimidire dai tabù sessuali, dalle minacce di scomunica o dai debiti ereditari manipolati per tenere l'anima al guinzaglio. Hai dovuto imparare a sopravvivere in ambienti dove il ricatto psicologico era la moneta corrente, sviluppando una chiaroveggenza chirurgica verso ogni ipocrisia. La liberazione si compie recidendo le catene dell'eredità tossica con colpo netto e rifiutando di negoziare la propria integrità con i fantasmi del passato. Finché il debito occulto non viene saldato alla luce del sole, ogni nuova ricchezza porterà con sé il sapore amaro dell'usurpazione.",
        sintesi: "Il coraggio marziale scende nei territori delle eredità occulte: la rigenerazione esige di affrontare i segreti sepolti senza timore del buio."
      },

      'Aries|9': {
        title: "L'Avanguardia del Pensiero",
        canonico: "La nona casa proietta l'impeto di Marte verso gli orizzonti filosofici, gli studi superiori, i viaggi transoceanici e la battaglia delle idee. La persona si fa paladina di convinzioni etiche e visioni del mondo con fervore missionario, aprendo rotte intellettuali vergini e contestando apertamente le accademie polverose con saggi dissacranti e discorsi incendiari. Questo assetto favorisce esploratori impavidi, riformatori temerari e spiriti liberi che non temono di confrontarsi con terre o culture sconosciute. Il pericolo consiste nel fanatismo ideologico, nell'intolleranza verso le opinioni altrui e nella pretesa di imporre la propria verità con la violenza del proselitismo settario. Le dispute teologiche e le spedizioni d'oltremare testimoniano la duplice sorte di questa configurazione: condottieri che aprirono rotte inesplorate e fanatici che ridussero in cenere biblioteche millenarie per difendere un dogma.",
        lilithiano: "I sistemi dogmatici e le accademie ortodosse pretendono che l'ardore conoscitivo sia incanalato in dottrine precostituite e carriere canoniche. Gli ambienti accademici e confessionali esigevano la citazione deferente dell'autorità prima di concedere il diritto di parola. In nona casa, Marte spezza le gabbie concettuali e le morali di convenienza, cercando l'esperienza diretta della vastità senza intermediari sacerdotali né catechismi di partito. La tua sete di verità è stata spesso tacciata di eresia o presunzione da chi preferiva la sicurezza di dogmi preconfezionati. La vera sapienza nasce quando abbandoni le certezze comode e affronti il cammino con il coraggio di chi accetta di errare senza bussola pur di toccare l'infinito. I grandi eretici non hanno cercato templi accoglienti: hanno preferito il deserto all'obbligo di ripetere verità preconfezionate da altri.",
        sintesi: "La sete di esplorazione marziale spinge verso confini lontani: il pensiero si batte per una verità viva, immune all'ortodossia dei dogmi."
      },

      'Aries|10': {
        title: "La Vetta Conquistata",
        canonico: "Al Medio Cielo, Marte in Ariete spinge l'individuo a scalare le gerarchie sociali e professionali attraverso l'iniziativa autonoma e una determinazione inflessibile. Non vi è desiderio di ricevere titoli ereditari: la persona pretende di costruire la propria reputazione da sola, affrontando rivali temibili con sfrontata sicurezza e assumendo ruoli di guida esposta alle intemperie della scena pubblica. L'impatto sul mondo professionale è travolgente, ma l'eccesso di autoritarismo, la fretta di liquidare collaboratori preziosi e l'insofferenza verso le normative vigenti possono creare congiure e rovesci improvvisi di fortuna. La storia militare insegna che le fortezze espugnate di slancio sono le più difficili da presidiare: chi sale al comando con la spada deve imparare l'arte della legge prima che i vinti si coalizzino contro il nuovo tiranno.",
        lilithiano: "L'architettura del potere costituito pretende che l'ascesa sociale avvenga per cooptazione docile e devozione incondizionata alle gerarchie. Le gerarchie istituite pretendevano una lunga trafila di ossequi prima di tollerare la benché minima manifestazione di comando. Quando Marte occupa la decima casa, il tuo rifiuto di ossequiare i potenti suscita scandalo e ammirazione insieme. Hai conosciuto il tentativo di sbarrarti la strada solo perché non sapevi adulare né accettavi compromessi umilianti per una promozione. Il vero trionfo si compie edificando un'opera autonoma che non deve nulla al favore dei padroni, dimostrando che l'eccellenza professionale può camminare con la schiena dritta. Che valore possiede una corona ricevuta in dono se per indossarla è stato necessario inginocchiarsi davanti a padroni mediocri?",
        sintesi: "L'ambizione marziale scala il culmine del cielo: l'autorità deve poggiare su una condotta retta per non franare nella tirannia."
      },

      'Aries|11': {
        title: "La Fratellanza dei Liberi",
        canonico: "L'undicesima casa convoglia la scintilla marziale nell'alveo delle alleanze ideali, dei movimenti civici e della progettazione del futuro comune. L'individuo non si accontenta di frequentazioni salottiere: pretende camaraderie leali, si pone alla testa di riforme radicali e profonde energie generose per difendere compagni in difficoltà o sostenere cause considerate disperate dalla maggioranza. La sua azione ispira coraggio e mobilità nella collettività. L'insidia maggiore risiede nell'insofferenza per i tempi del confronto assembleare e nella tendenza a spaccare le organizzazioni non appena emergono opinioni divergenti dalla propria linea d'azione. Come accade in ogni assemblea rivoluzionaria, il battitore di testa si ritrova presto isolato: troppo veloce per essere seguito dalla base, troppo indipendente per accettare i compromessi del direttivo.",
        lilithiano: "Le ideologie corporative e i collettivismi d'apparato chiedono all'individuo di uniformare il passo al ritmo del gregge in nome dell'unità. I circoli e i partiti pretendevano l'allineamento automatico alla linea decisa dai comitati, diffidando di qualsiasi battitore libero. In undicesima casa, Marte scuote i gruppi intorpiditi dalla burocrazia e li costringe a prendere posizione contro le ingiustizie con atti concreti. Hai sofferto il tradimento di consorterie ipocrite pronte a sacrificare i propri membri per salvare la reputazione della sigla. La liberazione consiste nell'unirsi solo a chi riconosce la sovranità dei singoli e nel rifiutare qualsiasi tessera che pretenda di censurare il tuo pensiero. La storia dei movimenti dimostra che l'avanguardia autentica si dissolve nel momento esatto in cui comincia a temere il giudizio dei propri compagni.",
        sintesi: "L'ardore di Marte nei progetti condivisi: la guida pionieristica apre rotte collettive senza pretendere devozioni settarie."
      },

      'Aries|12': {
        title: "Il Guardiano del Silenzio",
        canonico: "La dodicesima casa ospita Marte in Ariete in un territorio occulto, misterioso e di difficile decifrazione per la coscienza ordinaria. La forza primordiale del pianeta non può riversarsi liberamente all'esterno: agisce come una corrente sotterranea che scava nell'inconscio, generando inquietudini sorde, collera trattenuta o la sensazione penosa di lottare contro avversari invisibili. L'individuo teme il proprio potere distruttivo e finisce per reprimere l'aggressività naturale, rischiando di dirigerla contro il proprio equilibrio psicofisico sotto forma di auto-sabotaggio o stanchezza inspiegabile. Il pericolo maggiore è la guerriglia fantasma: combattere nemici immaginari per non ammettere che l'avversario più ostinato si nasconde dietro la maschera della propria rassegnazione.",
        lilithiano: "La paura del caos interiore spinge spesso la persona a chiudere la propria collera in una segreta, trasformando la forza in un nemico invisibile. I censori morali predicavano la docilità come unica virtù spirituale, equiparando l'ira sacra a un peccato mortale da estirpare. In dodicesima casa, questo Marte segregato rischia di divorare la persona dall'interno con dubbi paralizzanti e sensi di colpa ingiustificati. La svolta comincia quando smetti di considerare la tua forza un crimine e scendi nella cripta ad accendere la torcia della consapevolezza. Riconoscere la propria ombra selvaggia è il primo atto di sovranità: chi fa pace con la propria fiamma non teme più alcun tradimento dal mondo esterno. Il demone che rifiuti di guardare negli occhi non scompare: continua a manovrare i tuoi gesti dall'ombra, decidendo per te ogni sconfitta.",
        sintesi: "La forza marziale nelle profondità dell'invisibile: l'energia deve emergere dal buio senza farsi sabotare dall'auto-ostilità."
      },

      'Libra|12': {
        title: 'Marte in Bilancia in Dodicesima Casa',
        canonico: "Marte è in esilio in Bilancia e si trova in casa dodicesima, cadente: doppia debilitazione, una per dignità e una per posizione. La tradizione legge questa configurazione come il significatore dell'azione privato sia dello strumento sia del terreno. Chi nasce con questa collocazione non vede arrivare l'offesa — la dodicesima è il luogo dei nemici occulti, di ciò che agisce contro di noi senza mostrarsi — e, quando la vede, il Marte bilancino non dispone della franchezza necessaria a rispondere. L'energia che non trova bersaglio esterno si volge contro il soggetto: gli autori antichi collegano questa posizione alle malattie da collera trattenuta, all'astenia senza causa organica e a quella che chiamavano self-undoing, il sabotaggio della propria opera per mano propria. Vi è però un uso alto, e la tradizione lo registra con chiarezza: Marte in dodicesima governa bene i luoghi di clausura — ospedali, istituti, comunità, tutto ciò che opera al riparo dallo sguardo — e in Bilancia vi porta la capacità di mediare invece di comandare. Il rimedio classico è uno solo: rendere visibile il conflitto. Un nemico nominato smette di essere occulto, e un Marte in esilio che sappia negoziare vale più di un Marte in domicilio che sappia solo colpire.",
        lilithiano: "Due volte ti è stato insegnato a non esistere. La Bilancia ti ha insegnato a rimandare — mai il momento giusto, mai la persona giusta, mai il tono giusto. La dodicesima ha fatto il resto, e ti ha tolto perfino la consapevolezza di essere in collera. Il risultato è che porti dentro una rabbia che non hai mai incontrato: non la reprimi, non sai di averla. Esce di notte nei sogni, esce nel corpo come stanchezza che nessun esame spiega, esce nella cortesia impeccabile con cui tratti persone che non meriteresti di dover trattare affatto.\n\nLilith non ti chiede aggressività. Ti chiede di smettere di credere che la tua mitezza sia una virtù, quando è soltanto un riflesso di sopravvivenza. La tua prima azione sovrana non sarà un grido: sarà lasciare che qualcuno resti scontento di te, e scoprire che non ne muori. È la cosa che non hai mai provato, ed è l'intero lavoro di questa collocazione.\n\nC'è un dono che nessun Marte diretto possiede, e va detto perché è tuo: per gli altri sai combattere. Per chi non ha voce, per chi è nascosto, per chi sta dove nessuno guarda, diventi implacabile — e lo fai con un'eleganza che ottiene ciò che la forza non otterrebbe. Quel fuoco esiste, l'hai già visto funzionare. Quando imparerai a spenderlo anche per te, avrai smesso di essere ospite nella tua vita.",
        sintesi: "Collera rimandata dalla Bilancia e resa invisibile dalla dodicesima: combatti per gli altri, mai per te."
      }

    },

    retrograde: {
      title: 'Marte Retrogrado — La Battaglia Rivolta all’Interno',
      text: "Marte è retrogrado in circa il nove per cento dei temi, e la sua inversione non rallenta l'energia: ne cambia la direzione. L'azione, invece di andare verso l'esterno, torna sul soggetto. Concretamente significa che prima di muoverti contro qualcosa te ne chiedi conto, e che una parte considerevole della tua forza si consuma in un processo interno che nessuno vede. Questo produce un'esitazione visibile dall'esterno e scambiata per insicurezza, mentre è revisione. La qualità che ne deriva è rara: non attacchi mai per riflesso, e quando finalmente agisci hai già superato le obiezioni che gli altri incontreranno dopo aver cominciato. Il pericolo è l'accumulo — la collera trattenuta troppo a lungo non si dissolve, si comprime.",
      sintesi: "L'azione torna sul soggetto: revisione scambiata per esitazione, e collera che si comprime."
    }

  };

    // =========================================================================
  // URANO — il principio della rottura, dell'invenzione e del risveglio
  // radicale dalla gabbia dei condizionamenti storici.
  // =========================================================================
// Bozza di BODIES.Uranus per calcolatore-corpi-dict.js
  BODIES.Uranus = {
  signs: {
    Aries: {
      title: 'Urano in Ariete — Il Lampo Iniziatore della Rottura Pionieristica',
      text: "L'impulso uraniano si fonde con la vampa primordiale dell'Ariete: la necessità di mutamento non attende conferme ma erompe come un fulmine a ciel sereno. C'è una fretta geniale e temeraria, una voglia irrefrenabile di fare piazza pulita delle convenzioni logore per inaugurare modelli di vita mai sperimentati prima. Non accetti di percorrere sentieri già battuti da altri. Il rischio dell'influsso è l'incendio iconoclasta: distruggere opere e rapporti validi unicamente per il brivido dell'insurrezione estemporanea, scambiando l'irrequietezza nervosa per una reale liberazione dell'anima.",
      sintesi: "Scatto improvviso verso il futuro e ardore pionieristico; l'ombra è la furia distruttiva fine a se stessa."
    },
    Taurus: {
      title: 'Urano in Toro — La Mutazione Tellurica delle Forme Stabili',
      text: "Il fulmine celeste colpisce il suolo granitico del Toro, costringendo la materia, l'economia e il rapporto con la natura a reinventarsi dalle radici. Avverti il bisogno di scardinare le vecchie concezioni del possesso e della sicurezza terrena, cercando metodi alternativi di sussistenza e innovazioni tangibili che sfidano la consuetudine bancaria e patrimoniale. C'è un'ostinata inventiva ecologica e materiale. La frizione risiede nella resistenza somatica: subire l'ansia delle trasformazioni epocali nel corpo, alternando fasi di irrigidimento difensivo a scosse improvvise che azzerano ogni pianificazione.",
      sintesi: "Rivoluzione radicale delle certezze materiali e delle risorse; il limite è l'ansia viscerale del crollo."
    },
    Gemini: {
      title: 'Urano in Gemelli — La Rete Neuronale delle Idee Elettriche',
      text: "L'energia di Urano accelera il ritmo delle sinapsi, producendo intuizioni folgoranti, salti logici non convenzionali e una visione anticipatoria dei media e della comunicazione globale. La mente lavora come un trasmettitore ad alta frequenza, capace di captare correnti intellettuali sotterranee e collegare concetti apparentemente inconciliabili con brillante disinvoltura. Sei una presenza provocatoria e dissacrante nel dibattito civile. L'insidia è il sovraccarico nervoso: farsi divorare da una miriade di stimoli simultanei, disperdendo il potenziale creativo in una frenesia verbale sterile.",
      sintesi: "Intelligenza fulminea e avanguardia comunicativa; la trappola è il logorio delle energie nervose in troppe direzioni."
    },
    Cancer: {
      title: 'Urano in Cancro — Lo Squarcio Risanatore nel Guscio della Memoria',
      text: "Nel territorio intimo della memoria e delle radici storiche, Urano agisce come un fattore di liberazione dagli automatismi del lignaggio ancestrale. Rifiuti l'obbligo di ripetere i copioni familiari convenzionali, cercando una definizione inedita della casa, del focolare e dell'appartenenza affettiva. C'è la capacità di guardare al passato senza nostalgia paralizzante, estraendo dal mito antico una spinta trasformatrice per l'avvenire. Il pericolo è la freddezza difensiva: tagliare i ponti con le proprie origini in modo traumatico per paura che la tenerezza emotiva possa soffocare l'indipendenza.",
      sintesi: "Emancipazione dai condizionamenti della stirpe d'origine; il nodo è non confondere l'autonomia con l'anestesia del cuore."
    },
    Leo: {
      title: 'Urano in Leone — L’Eversione Regale Contro le Corti Conformiste',
      text: "La forza d'urto uraniana tocca il fulcro della sovranità personale, dell'espressione artistica e dell'autorità: non tolleri che la creatività venga imbrigliata in schemi accademici o sottomessa a consensi prefabbricati. Esprimi un'individualità eccentrica, teatrale e fiera, che si impone per originalità genuina e che preferisce lo scandalo all'adulazione cortigiana. C'è un magnetismo da leader ribelle. Il limite è l'assolutismo anarchico: pretendere che gli altri si conformino alle proprie stravaganze, scambiando il dispotismo dell'ego per genialità innovativa.",
      sintesi: "Creatività eccentrica e rottura degli schemi regali; l'insidia è la pretesa megalomane di dominare da eretico solitario."
    },
    Virgo: {
      title: 'Urano in Vergine — La Riorganizzazione Eretica del Metodo Operativo',
      text: "La spinta all'invenzione si applica al dettaglio tecnico, alle scienze applicate, all'ecologia del lavoro e al benessere del corpo. Non accetti procedure obsolete semplicemente perché sancite dalla tradizione: analizzi i processi quotidiani con occhio spietato per introdurre automazioni intelligenti e semplificazioni audaci che alleggeriscono la fatica umana. C'è una maestria sperimentale lucidissima. L'ombra di questa posizione è l'ossessione tecnocratica: credere che ogni problema dell'esistenza possa essere risolto con un algoritmo perfetto, dimenticando il disordine vitale delle emozioni.",
      sintesi: "Riforma tecnica e innovazione dei sistemi operativi; il pericolo è sterilizzare la spontaneità nella freddezza funzionale."
    },
    Libra: {
      title: 'Urano in Bilancia — La Riformulazione Radicale dei Patti Relazionali',
      text: "Urano mette sotto pressione l'istituzione della coppia tradizionale, le alleanze formali e i canoni estetici convenzionali. Senti con estrema chiarezza che un'unione non può sopravvivere se si fonda sulla rinuncia alla libertà reciproca o su contratti nuziali asfissianti: cerchi relazioni basate sulla complicità tra spiriti liberi, al di là dei ruoli di genere precostituiti. C'è una visione anticipatrice del diritto e della giustizia tra pari. Il rischio è l'instabilità cronica: fuggire al minimo accenno di intimità stabile per il terrore di perdere la propria indipendenza contrattuale.",
      sintesi: "Patti basati sulla parità e superamento dei vecchi schemi di coppia; l'ostacolo è l'allergia a qualsiasi vincolo profondo."
    },
    Scorpio: {
      title: 'Urano in Scorpione — Il Risveglio Atomico negli Abissi Psichici',
      text: "La penetrazione uraniana si immerge nelle zone d'ombra, nella sessualità misteriosa, nelle risorse occulte e nelle dinamiche di potere invisibile. C'è una capacità straordinaria di operare mutazioni psicologiche repentine, liberando energie compresse da secoli di tabù con un coraggio che disarma chi vive di paure convenzionali. Sei un catalizzatore di crisi rigeneratrici capaci di abbattere le tirannie nascoste. La tentazione distruttiva è la manipolazione traumatica: usare la propria vista penetrante per sventrare le difese altrui senza riguardo per la loro fragilità umana.",
      sintesi: "Trasformazione radicale delle forze sommerse e dei tabù; la via esige di non fare del trauma uno strumento di dominio."
    },
    Sagittarius: {
      title: 'Urano in Sagittario — La Frantumazione Eretica dei Dogmi Filosofici',
      text: "L'impulso di apertura spazza via le certezze religiose dogmatiche, le frontiere geopolitiche e le visioni accademiche consolidate. Cerchi una sintesi nuova tra scienza, spiritualità cosmica e viaggi di scoperta verso territori inesplorati della coscienza, rifiutando qualsiasi catechismo confessionale con argomentazioni audaci e trasgressive. C'è l'animo del filosofo rivoluzionario. Il punto cieco coincide con l'utopia presuntuosa: innamorarsi di teorie grandiose e futuribili fino a perdere qualsiasi contatto con le difficoltà terrene della realtà quotidiana.",
      sintesi: "Esplorazione audace di nuove visioni del mondo; il difetto è l'astrazione utopica che ignora la concretezza dei fatti."
    },
    Capricorn: {
      title: 'Urano in Capricorno — La Demolizione Mirata delle Strutture Obsolete',
      text: "L'innovazione uraniana incontra il realismo del Capricorno, traducendosi in una volontà metodica di riformare dall'interno le grandi istituzioni, le gerarchie statali e i sistemi di governo. Non ti accontenti di proteste di piazza effimere: preferisci studiare i punti deboli della fortezza per sostituire le vecchie leggi con un'architettura civile più equa e duratura nel tempo. Possiedi una disciplina pragmatica e innovativa. L'ombra è la freddezza autoritaria: imporre riforme calate dall'alto con spietato rigore razionale, senza curarsi delle sofferenze di chi le deve subire.",
      sintesi: "Ristrutturazione solida e innovativa delle grandi istituzioni; l'insidia è la tecnocrazia inflessibile che trascura le persone."
    },
    Aquarius: {
      title: 'Urano in Acquario — La Rete Planetaria della Coscienza Libera',
      text: "Nel suo domicilio primario, Urano esprime la pienezza della propria funzione trasformatrice: la fratellanza tra pari, l'accesso aperto alla conoscenza e la cooperazione planetaria priva di caste o privilegi ereditari. La mente opera con un distacco sovrano dalle passioni egoiche, orientandosi verso soluzioni collettive d'avanguardia capaci di emanciparci dalle schiavitù storiche. C'è un genio visionario limpido e altruista. La debolezza sta nell'algida indifferenza: amare l'umanità ideale in astratto e mostrare distacco insofferente verso i bisogni intimi delle persone vicine.",
      sintesi: "Visione d'avanguardia e cooperazione fraterna universale; il limite è la lontananza affettiva dalle realtà individuali."
    },
    Pisces: {
      title: 'Urano in Pesci — Il Risveglio Mistico nelle Onde dell’Infinito',
      text: "La scarica elettrica attraversa le acque oceaniche dell'empatia, del misticismo e della dissoluzione dei confini dell'ego. Si aprono canali di percezione straordinari verso le correnti invisibili del cosmo, unendo intuizione musicale, sensibilità medianica e slanci di compassione universale che superano ogni logica razionalista. C'è una vocazione alla redenzione degli emarginati. Il rischio evidente è la dispersione caotica: farsi trascinare da utopie spirituali confuse o da fanatismi new age, perdendo la lucidità necessaria per discriminare il vero dal falso.",
      sintesi: "Illuminazione intuitiva e compassione senza confini; l'errore è smarrirsi nel miraggio di utopie prive di radici."
    }
  },

  houses: {
    1: {
      title: 'Urano in Prima Casa — L’Urto Elettrico dell’Identità Eretica',
      text: "La presenza uraniana all'Ascendente imprime all'individuo una fisionomia inconfondibile, attraversata da un'irrequietezza magnetica e da un'aura di eccentricità che rifiuta qualsiasi assimilazione al gruppo dei pari. Fin dai primi anni di vita hai manifestato l'urgenza di distinguerti con scelte anticonvenzionali, abiti originali o comportamenti spiazzanti che impedivano a chiunque di inquadrarti in categorie rassicuranti. Sei un elemento perturbatore ovunque metti piede. La fatica costante risiede nella tensione nervosa: vivere con l'acceleratore premuto, sentendosi sempre sul punto di dover difendere la propria unicità.",
      sintesi: "Individualità eccentrica e presenza magnetica; la sfida è non vivere in uno stato di costante trincea identitaria."
    },
    2: {
      title: 'Urano in Seconda Casa — La Rivoluzione Improvvisa delle Risorse Materiali',
      text: "La sicurezza economica non può poggiare su stipendi fissi tradizionali o su rendite passive preconfezionate: il flusso del denaro conosce oscillazioni spettacolari, tra cadute improvvise e guadagni vertiginosi derivanti da intuizioni innovative o nuove tecnologie. Inventi professioni fuori dal comune e rifiuti di vendere il tuo tempo a padroni ingrati. C'è un distacco quasi filosofico dalla ricchezza accumulata. L'ombra è l'incoscienza patrimoniale: bruciare risorse stabili in speculazioni azzardate solo per il gusto del brivido o per sfidare le convenzioni del buon padre di famiglia.",
      sintesi: "Economia autonoma e guadagni legati all'innovazione; l'errore è l'incostanza cronica che genera precarietà."
    },
    3: {
      title: 'Urano in Terza Casa — La Mente Elettrica e la Parola-Scintilla',
      text: "L'intelletto viaggia a velocità supersonica: le idee compaiono nella mente sotto forma di lampi completi di dettagli prima ancora che la logica discorsiva abbia formulato una premessa. La comunicazione è audace, provocatoria, ricca di battute fulminee che mettono a nudo i paradossi dell'ambiente circostante con precisione disarmante. I rapporti con fratelli o vicini possono essere stati segnati da stranezze o improvvise rotture di continuità. La trappola è l'ansia espressiva: parlare con una concitazione che confonde l'interlocutore, finendo per sentirsi incompresi per colpa della propria fretta.",
      sintesi: "Comunicazione brillante e intuizione lampo; il pericolo è la frenesia mentale che sfinisce chi ascolta."
    },
    4: {
      title: 'Urano in Quarta Casa — Il Fulmine nel Focolare Ancestrale',
      text: "Le radici d'infanzia e la dimora intima sono state teatro di mutamenti improvvisi: traslochi inaspettati, fratture nell'assetto familiare o figure genitoriali fortemente eccentriche che hanno impedito di adagiarsi nella routine rassicurante della consuetudine. Da adulto concepisci la casa come un laboratorio aperto al mondo, dotato di tecnologie avanzate o dislocato lontano dalla terra natale. Non sopporti il soffocamento delle tradizioni di clan. La difficoltà è l'inquietudine residenziale: non riuscire a sentirsi a casa da nessuna parte, scambiando il bisogno di radici per una prigione.",
      sintesi: "Radici familiari non convenzionali e dimora aperta; il compito è trovare un proprio ancoraggio senza fuggire."
    },
    5: {
      title: 'Urano in Quinta Casa — L’Invenzione Sovversiva dell’Eros e dell’Opera',
      text: "L'eros, il gioco e l'atto creativo rifiutano qualsiasi canone prestabilito: l'attrazione amorosa scatta all'improvviso, spesso verso personalità stravaganti, ribelli o appartenenti a mondi culturali distanti dai tuoi orizzonti abituali. Nei progetti artistici porti una ventata d'aria fresca sperimentale che rompe le liturgie del gusto borghese. Nei confronti della prole dimostri un atteggiamento fraterno, incoraggiando un'autonomia precoce. L'insidia è il distacco affettivo repentino: interrompere legami amorosi non appena la novità si stabilizza in una normale intimità quotidiana.",
      sintesi: "Amore fulmineo e creatività sperimentale; il limite è la noia subitanea che distrugge le passioni appena consolidate."
    },
    6: {
      title: 'Urano in Sesta Casa — Il Cortocircuito della Routine e l’Innovazione Operativa',
      text: "Il lavoro quotidiano e la cura del corpo non possono sottostare a orari da catena di montaggio o a ordini gerarchici autoritari: il fisico manifesta reazioni somatiche repentine se costretto a un'operatività ripetitiva e alienante. Trovi la tua dimensione ideale nel lavoro indipendente, nella ricerca scientifica o nelle professioni legate all'informatica e all'avanguardia tecnica. Hai metodi di ottimizzazione che sbalordiscono i colleghi. Il rischio è lo stress da sovraccarico: pretendere che il corpo segua il ritmo elettrico della mente, ignorando i segnali di stanchezza fisica.",
      sintesi: "Autonomia professionale e innovazione dei processi; la lezione è rispettare i limiti biologici del proprio organismo."
    },
    7: {
      title: 'Urano in Settima Casa — Il Patto Senza Catene e l’Incontro Folgorante',
      text: "La sfera matrimoniale e associativa è attraversata da una corrente ad alto voltaggio: non cerchi un'unione claustrofobica che soffochi l'individualità ma un'alleanza tra pari che riconosca a ciascuno spazi inviolabili di libertà personale. I partner che attrai sono spesso eccentrici, innovatori o spiriti randagi che non possono essere addomesticati. I contratti si firmano e si sciolgono con rapidità sorprendente. L'ombra è la rottura preventiva: provocare crisi artificiali nella coppia solo per la paura recondita di sentirsi vincolati da un impegno duraturo.",
      sintesi: "Relazioni basate sulla libertà reciproca e incontri improvvisi; la trappola è fuggire dal legame per paura della dipendenza."
    },
    8: {
      title: 'Urano in Ottava Casa — La Rivelazione Abissale e la Mutazione Energetica',
      text: "Nei territori della sessualità occulta, delle eredità e delle grandi prove di metamorfosi, Urano agisce come un catalizzatore di liberazioni istantanee. Hai la capacità di chiudere capitoli esistenziali dolorosi con un taglio netto e chirurgico, risorgendo dalle crisi finanziarie o psicologiche con risorse del tutto impreviste. Le questioni patrimoniali condivise possono conoscere ribaltamenti giudiziari o bancari repentini. L'insidia è la tentazione del colpo di testa: azzerare alleanze economiche strategiche per impazienza o per un rifiuto irrazionale dei vincoli di reciprocità.",
      sintesi: "Rinascite fulminee dopo crisi estreme e metamorfosi radicali; il compito è non sabotare i beni condivisi per impeto cieco."
    },
    9: {
      title: 'Urano in Nona Casa — Lo Strappo Visionario Verso Orizzonti Inesplorati',
      text: "La mente filosofica non si accontenta delle cattedre tradizionali: la sete di sapere spinge a viaggiare verso terre remote, ad abbracciare discipline di frontiera e ad anticipare le sintesi culturali del domani con intuizioni profetiche. Rifiuti qualsiasi credo religioso dogmatico, elaborando una visione cosmica della realtà in cui scienza e trascendenza si fondono senza attrito. Divulghi idee innovative con visione illuminata. Il pericolo è il disprezzo per la tradizione: considerare inutile tutto ciò che è stato pensato nel passato, cadendo in un fanatismo del nuovo a ogni costo.",
      sintesi: "Filosofia visionaria e viaggi che cambiano la mente; l'ombra è l'arroganza verso il patrimonio del pensiero antico."
    },
    10: {
      title: 'Urano in Decima Casa — La Sovversione Pubblica e la Vocazione d’Avanguardia',
      text: "La carriera mondana e il ruolo sociale non seguono percorsi ordinari: l'ascesa pubblica è costellata da improvvisi cambi di rotta, licenziamenti liberatori, invenzioni fortunate e rotture con l'establishment costituito. Ti affermi come innovatore solitario, capace di rivoluzionare il settore professionale con idee che anticipano i bisogni della collettività. Non accetti padroni sulla tua testa. La debolezza sta nell'insofferenza cronica per l'autorità: farsi terra bruciata attorno solo per il gusto di contraddire i superiori, perdendo occasioni di comando autorevole.",
      sintesi: "Carriera non convenzionale e successo legato all'innovazione; l'errore è la ribellione sterile contro ogni forma di gerarchia."
    },
    11: {
      title: 'Urano in Undicesima Casa — L’Architettura Fraterna dell’Umanità Futura',
      text: "Nel suo settore di massima risonanza, Urano orienta la persona verso grandi progetti umanitari, reti di cooperazione tecnologica e amicizie tra spiriti liberi che condividono ideali di rinnovamento sociale. Sei il perno attorno al quale nascono collettivi innovativi, associazioni d'avanguardia e comunità intenzionali fondate sulla democrazia diretta e sulla parità effettiva. Credi nel potere della cooperazione orizzontale. Il limite è l'astrazione ideologica: innamorarsi della teoria del gruppo fino a non accorgersi delle sofferenze individuali dei singoli amici.",
      sintesi: "Reti fraterne, ideali umanitari e progetti collettivi; la cura esige di non sacrificare i legami concreti alle astrazioni teoriche."
    },
    12: {
      title: 'Urano in Dodicesima Casa — Il Lampo Quantico nell’Inconscio Collettivo',
      text: "La scarica uraniana agisce nei recessi della psiche sommersa, producendo risvegli interiori improvvisi, intuizioni medianiche e liberazioni repentine da antiche memorie di prigionia o di isolamento. Spesso lavori a progetti visionari nell'ombra, lontano dal clamore del pubblico, elaborando teorie che matureranno molto più tardi. C'è una connessione diretta con l'inconscio dell'umanità. Il trabocchetto risiede nell'ansia senza volto: essere attraversati da correnti elettriche invisibili che generano insonnia o paure improvvise se non vengono canalizzate in opere creative.",
      sintesi: "Intuizioni folgoranti nel silenzio interiore; la via esige di ancorare le scariche dell'inconscio a una disciplina pratica."
    }
  },

  dignities: {},

  combinations: {
    'Aquarius|11': {
        title: "Urano in Acquario in Undicesima Casa",
        canonico: "Il pianeta delle mutazioni radicali occupa il proprio domicilio nell'Acquario e risiede nell'undicesima casa, settore naturale dei progetti comuni e delle alleanze di principio: configurazione di massima coerenza per l'emancipazione intellettuale e la riforma dei costumi. La dottrina vi scorge la mente del pioniere sociale, capace di anticipare le trasformazioni epocali e di federare spiriti liberi attorno a ideali di progresso scientifico ed etico. Chi nasce con tale collocazione rifiuta l'omologazione alle consuetudini del passato e concepisce la fratellanza come un patto orizzontale tra pari. I pericoli canonici toccano il dogmatismo ideologico, il distacco sprezzante verso i limiti della natura umana e la tendenza all'anarchismo settario. L'utopia concepita nella solitudine asettica del laboratorio rischia di partorire mostri quando viene calata d'autorità sulla carne viva degli esseri umani: ogni rivoluzione autentica deve respirare con il ritmo della terra.",
        lilithiano: "Sin dalla giovinezza avverti una distanza siderale rispetto ai rituali insulsi e alle convenzioni ipocrite della società civile. Le assemblee conformiste e i rituali di gruppo esigevano la rinuncia all'originalità in cambio di un'appartenenza tiepida e rassicurante. Hai vissuto a lungo con la sensazione di parlare una lingua incomprensibile al gregge.\n\nLilith smantella la tua torre d'avorio: l'anticonformismo sterile e la freddezza intellettuale non sono vera libertà, sono una fuga dalla contaminazione della realtà terrena. Non puoi rinnovare il mondo se lo disprezzi dal balcone delle tue teorie astratte. La tua iniziazione richiede di scendere tra la gente, guardare la paura negli occhi e scoprire che l'autonomia spirituale non teme il contatto con l'imperfezione dei simili.\n\nPossiedi una scintilla visionaria che squarcia le nebbie del fatalismo con una facilità disarmante. Sai ideare modelli comunitari dove ciascuno trova posto senza dover vendere la propria unicità. L'intelletto audace ritrova la sua fecondità primordiale solo scendendo nell'arena comune: idee nate dall'amore per la libertà accendono fari che resistono alle bufere dei secoli.",
        sintesi: "Urano in domicilio in undicesima casa: visione libertaria e genialità scientifica che trasformano la società disinnescando il gelo intellettuale."
      },
    'Taurus|2': {
        title: "Urano in Toro in Seconda Casa",
        canonico: "La caduta di Urano nel Toro e la sua collocazione nel secondo settore, legato alla sostanza materiale e alle risorse terrene, imprimono un'instabilità radicale alle basi della sicurezza economica e corporale. Il sistema tradizionale riconosce qui l'innovatore spregiudicato dei sistemi produttivi, l'inventore che rivoluziona i commerci o il teorico che disintegra le rendite consolidate attraverso tecnologie d'avanguardia. La persona sperimenta svolte patrimoniali repentine e rifiuta di vincolare la propria esistenza a garanzie feudali o a contratti a vita. Le ombre canoniche vertono sul dissesto finanziario dovuto ad azzardi speculativi, sul rifiuto ostinato di ogni prudenza somatica e sull'ansia permanente di perdere la terra sotto i piedi. La presunzione di poter piegare i ritmi della biologia all'arbitrio della tecnica conduce a crisi sistemiche rovinose: la terra accoglie l'innovazione solo se il seme rispetta la profondità del solco.",
        lilithiano: "Ti hanno insegnato che per dormire la notte dovevi possedere certezze di pietra, contratti blindati e una madia sempre piena fino all'orlo. La predicazione sulla sicurezza economica nascondeva il cappio della dipendenza salariale, punendo ogni velleità di autonomia con la minaccia del fallimento.\n\nLilith ti rivela la verità di questi crolli ripetuti: la materia non è una tomba dove seppellire l'audacia dello spirito, ma un campo fluido di sperimentazione incessante. Aggrapparsi con il terrore della scarsità a beni che possono svanire in un lampo è il modo più sicuro per rendersi schiavi del domani. La tua vera emancipazione inizia quando comprendi che la tua stabilità non risiede nelle coordinate bancarie, ma nella capacità istintiva di reinventare la sussistenza con un colpo di genio inatteso.\n\nC'è in te un talento pionieristico straordinario nel dissodare terreni vergini e creare prosperità dove gli altri vedono solo carestia. Sai scardinare i ricatti economici con disinvoltura regale. La vera sicurezza non risiede nei forzieri blindati, ma nella prontezza ingegnosa di reinventare la sussistenza a ogni svolta del destino: l'abbondanza libera non riconosce padroni.",
        sintesi: "Urano in caduta in seconda casa: scardinamento dei patrimoni tradizionali che genera una nuova sovranità materiale oltre la paura della rovina."
      }
  },

  retrograde: {
    title: 'Urano Retrogrado — L’Insurrezione Silenziosa della Coscienza Interiore',
    text: "La frattura con il conformismo si consuma in silenzio, molto prima che l'ambiente circostante si accorga dell'avvenuta rottura. Urano retrogrado non esibisce la propria diversità come un vessillo da esibire: disconnette internamente i circuiti dell'obbedienza sociale, osservando le ipocrisie del clan con un distacco chirurgico. La persona coltiva intuizioni fulminee e concezioni radicali che tiene per sé finché non sono del tutto mature, evitando conflitti sterili che dissiperebbero energia preziosa. Ne nasce un'autonomia di pensiero incorruttibile, capace di anticipare le mutazioni storiche con impressionante esattezza. C'è chi scambia l'indipendenza per un isolamento glaciale, rinchiudendosi in una torre d'avorio sterile e sprezzante.",
    sintesi: "Disconnessione silenziosa dai patti sociali: intuizioni radicali coltivate al riparo prima dell'azione trasformatrice."
  }
};


    // =========================================================================
  // NETTUNO — la dissoluzione dei confini, la compassione cosmica,
  // la trance artistica e l'anelito all'unione mistica originaria.
  // =========================================================================
// Bozza di BODIES.Neptune per calcolatore-corpi-dict.js
  BODIES.Neptune = {
  signs: {
    Aries: {
      title: 'Nettuno in Ariete — La Fiammata Mistica che Infiamma la Volontà Guerriera',
      text: "L'oceano nettuniano si incontra con il fuoco primario dell'Ariete, generando una fede ardente, pionieristica e priva di mediazioni razionali. L'individuo persegue ideali visionari con la determinazione di un crociato solitario, pronto a sacrificarsi per una causa che oltrepassa i confini dell'interesse personale. C'è un coraggio spirituale capace di trascinare le masse verso orizzonti insperati. Il punto di rottura coincide con il fanatismo idealistico: scambiare un miraggio soggettivo per una missione divina irrinunciabile, lanciandosi in battaglie donchisciottesche contro nemici inesistenti.",
      sintesi: "Idealismo infuocato e fede pionieristica; l'insidia è il fanatismo cieco che insegue battaglie illusorie."
    },
    Taurus: {
      title: 'Nettuno in Toro — La Spiritualizzazione Sacra della Materia e della Terra',
      text: "La funzione di dissoluzione dei confini si incarna nella materia palpabile, nel contatto sacro con la natura e nella ricerca di una bellezza terrena che rifletta l'armonia universale. Si avverte la presenza del divino nelle cose semplici, nell'arte scultorea, nella terra feconda e nei ritmi biologici dei corpi viventi. C'è una straordinaria generosità sensoriale. L'ombra è l'incapacità di gestire le incombenze patrimoniali: lasciarsi ingannare da miraggi finanziari o trascurare la conservazione dei beni concreti nell'illusione che l'universo provveda magicamente a ogni bisogno materiale.",
      sintesi: "Percezione sacra della materia e contemplazione terrena; il rischio è la passività finanziaria che disperde le risorse."
    },
    Gemini: {
      title: 'Nettuno in Gemelli — La Nebbia Poetica e l’Intuizione Telepatica dei Linguaggi',
      text: "L'intelletto logico viene sommerso dalle acque dell'inconscio: la parola scritta e parlata si arricchisce di sfumature metaforiche, allusioni musicali e sensibilità telepatica alle intenzioni altrui. La mente coglie corrispondenze segrete tra idee lontane e si esprime con un fascino incantatorio che incanta l'ascoltatore. C'è un talento letterario e comunicativo profondo. La trappola è la dispersione nebulosa: perdersi in un labirinto di ambiguità verbali, promettendo ciò che non si può mantenere o credendo alle proprie stesse finzioni narrative.",
      sintesi: "Linguaggio poetico e intuizione tra le righe; l'ostacolo è l'ambiguità elusiva che sfugge alla verità fattuale."
    },
    Cancer: {
      title: 'Nettuno in Cancro — L’Oceano Materno e la Memoria delle Origini Sommerse',
      text: "Nel segno dell'acqua cardinale, Nettuno amplifica la sensibilità empatica, il legame con la memoria genealogica e il senso di comunione viscerale con le proprie origini. Si manifesta un istinto protettivo quasi sciamanico verso chi soffre, accompagnato da sogni vividi e da un forte bisogno di un rifugio interiore in cui ritemprarsi. C'è una compassione tenera e avvolgente. Il pericolo è l'ipersensibilità vulnerabile: farsi sommergere dai dolori del passato o dalle dinamiche familiari tossiche, rifugiandosi in una malinconia passiva che paralizza l'azione nel presente.",
      sintesi: "Empatia oceanica e memoria ancestrale; la debolezza è la malinconia regressiva che impedisce l'autonomia."
    },
    Leo: {
      title: 'Nettuno in Leone — La Trasfigurazione Romantica del Cuore e dell’Espressione',
      text: "L'immaginazione nettuniana incontra la regalità del Sole: la creatività si colora di tinte fiabesche, romantiche e monumentali, cercando nell'amore e nell'arte un'esperienza di estasi sublime capace di redimere la mediocrità del mondo. C'è una generosità magnanima verso il prossimo e un talento teatrale che sa toccare le corde più intime del pubblico. L'ombra è l'illusione di grandezza redentrice: credersi salvatori designati degli altri o innamorarsi della propria immagine idealizzata, soffrendo amaramente quando la realtà terrena non regge il confronto con il mito.",
      sintesi: "Creatività sublime e amore fiabesco; l'insidia è il miraggio di perfezione regale che si scontra con il limite terreno."
    },
    Virgo: {
      title: 'Nettuno in Vergine — La Devozione Curatrice e la Compassione Operosa',
      text: "Nettuno opera nel settore del servizio quotidiano, dell'analisi minuziosa e della cura della salute corporale. La sensibilità mistica non cerca templi solenni ma si incarna nella dedizione silenziosa ai malati, nell'attenzione terapeutica verso le erbe medicamentose e nell'ecologia applicata con pazienza certosina. C'è una grazia speciale nel prendersi cura dei dettagli trascurati da tutti. La difficoltà è l'ansia somatica ipocondriaca: assorbire i malesseri dell'ambiente circostante nel proprio corpo, sviluppando fobie di contaminazione o sentendosi colpevoli per ogni imperfezione del mondo.",
      sintesi: "Servizio compassionevole e cura devota del vivente; il nodo è non farsi logorare dalle ansie di purezza impossibile."
    },
    Libra: {
      title: 'Nettuno in Bilancia — L’Estetica Sublimata e la Ricerca dell’Anima Gemella',
      text: "La sfera delle relazioni e della giustizia viene avvolta da un anelito di perfezione celestiale: cerchi nell'unione con l'altro una fusione spirituale assoluta, priva di meschinità e basata su una grazia estetica e morale impeccabile. Possiedi un talento diplomatico squisito e una capacità naturale di mediare i conflitti umani appellandoti ai sentimenti più nobili dei contendenti. Il punto critico è la delusione amorosa cronica: idealizzare il partner fino a renderlo un idolo irreale, per poi cadere nello sconforto quando emergono i normali difetti umani dell'altro.",
      sintesi: "Armonia sublimata e anelito all'unione sacra; la trappola è la delusione dolorosa quando il mito incontra la realtà."
    },
    Scorpio: {
      title: 'Nettuno in Scorpione — La Discesa Redentrice negli Abissi dell’Inconscio',
      text: "L'energia di Nettuno si inabissa nei recessi dell'ombra psichica, della sessualità trasformativa, della morte e della rinascita interiore. Non hai paura di esplorare i territori dell'occulto o i tabù che spaventano la società perbenista: c'è una vocazione a guarire le ferite più profonde attraverso la compassione e la comprensione psicologica totale. Possiedi un'intuizione quasi magica dei misteri della vita. Il trabocchetto è l'attrazione morbosa per il dramma: farsi sedurre da legami autodistruttivi o indulgere in dipendenze emotive nel tentativo illusorio di salvare chi non desidera essere aiutato.",
      sintesi: "Guarigione psichica profonda e visione dell'ombra; il pericolo è il fascino autodistruttivo per i baratri altrui."
    },
    Sagittarius: {
      title: 'Nettuno in Sagittario — L’Estasi Filosofica e la Fede Senza Confini Dogmatici',
      text: "L'anelito spirituale si espande verso gli orizzonti sterminati del pensiero universale, del misticismo comparato e dell'unione di tutte le fedi in una fratellanza cosmica. Rifiuti le gabbie settarie e cerchi la verità suprema attraverso viaggi visionari, contemplazione della natura selvaggia e studi delle grandi tradizioni sapienziali del mondo. C'è una speranza contagiosa nel destino dell'umanità. L'ombra è la credulità ingenua: lasciarsi abbagliare da falsi profeti o teorie new age strampalate, scambiando un facile ottimismo per una reale conquista della consapevolezza interiore.",
      sintesi: "Fede universale e misticismo cosmico; l'insidia è l'ingenuità dottrinale che segue miraggi spirituali senza verifica."
    },
    Capricorn: {
      title: 'Nettuno in Capricorno — La Dissoluzione Silenziosa delle Fortezze di Potere',
      text: "Nel segno della pietra e del rigore saturnino, Nettuno dissolve con pazienza inesorabile le certezze del materialismo arido, della carriera mondana e dell'autorità puramente burocratica. Aiuti a riscoprire una responsabilità etica superiore, dimostrando che nessun potere terreno può reggersi senza un'anima morale e un servizio sincero al bene comune. C'è la capacità di dare forma pratica a sogni apparentemente impossibili. Il limite è il disincanto cinico: quando le illusioni crollano si rischia di cadere in una desolazione rassegnata, credendo che ogni ideale sia destinato a essere corrotto dal tempo.",
      sintesi: "Spiritualizzazione del dovere e ideali che prendono forma terrena; il rischio è lo sconforto quando l'opera tarda a compiersi."
    },
    Aquarius: {
      title: 'Nettuno in Acquario — L’Utopia Fraterna e la Rete Telepatica della Collettività',
      text: "La visione nettuniana si proietta sul futuro dell'umanità, concependo il pianeta come un unico organismo vivente interconnesso da legami invisibili di solidarietà e progresso scientifico disinteressato. Ti attraggono i movimenti umanitari, tecnologie al servizio dell'emancipazione e comunità ideali che superano le barriere di classe, razza e credo religioso. C'è una genialità empatica straordinaria. L'ombra è l'astrazione disincarnata: amare l'umanità intera in teoria ma risultare incapaci di mostrare calore tangibile verso la singola persona in carne e ossa che condivide la tua stanza.",
      sintesi: "Sogno di fratellanza planetaria e progresso etico; la fatica è non dimenticare la cura dei legami affettivi concreti."
    },
    Pisces: {
      title: 'Nettuno in Pesci — Il Ritorno Mistico nell’Oceano della Coscienza Pura',
      text: "Nel proprio domicilio primario, Nettuno tocca l'apogeo della sua potenza trascendente: i confini dell'ego individuale evaporano per rivelare la continuità indistruttibile della vita e la sacralità di ogni creatura vivente. Possiedi un'ispirazione artistica raffinata, un'apertura al mondo dei sogni e una capacità di perdono incondizionato che trascende qualsiasi calcolo della mente razionale. C'è una grazia angelica e luminosa. Il pericolo è il naufragio nell'evasione: fuggire le durezze della terra attraverso dipendenze, confusione interiore o vittimismo sacrificale, rifiutando di assumere le responsabilità della vita materiale.",
      sintesi: "Coscienza mistica suprema e compassione universale; la salvezza esige di tenere i piedi ben piantati sul terreno."
    }
  },

  houses: {
    1: {
      title: 'Nettuno in Prima Casa — L’Aura Fluida e la Presenza Invisibile',
      text: "La persona si affaccia al mondo con un fascino misterioso, sfuggente e magnetico che cattura l'immaginazione altrui senza alcuno sforzo apparente. I tuoi lineamenti e la tua energia comunicano una dolcezza indifesa, inducendo gli altri a proiettare su di te i propri sogni romantici o le proprie aspirazioni ideali. C'è una permeabilità psichica enorme agli umori dell'ambiente. La sfida fondamentale è trovare un centro di gravità solido: evitare di mimetizzarsi continuamente per compiacere chi ti sta intorno, rischiando di non sapere più chi sei quando rimani in solitudine.",
      sintesi: "Presenza magnetica e sensibilità empatica sul volto del mondo; il compito è non perdersi nei desideri altrui."
    },
    2: {
      title: 'Nettuno in Seconda Casa — La Fede nell’Abbondanza e l’Incognita del Denaro',
      text: "Il rapporto con i beni materiali e con il valore della propria persona non segue le rigide leggi della contabilità aziendale: il denaro entra ed esce con flussi imprevedibili, guidato da intuizioni creative, donazioni generose o collaborazioni artistiche. Non attribuisci un valore assoluto all'accumulo di ricchezze, confidando che l'esistenza fornisca sempre il necessario. C'è un distacco nobile dalle ansie finanziarie. L'ombra è il disordine economico: cadere vittime di truffe o trascurare la gestione delle proprie entrate fino a ritrovarsi in situazioni di penuria per eccesso di disattenzione.",
      sintesi: "Flusso intuitivo delle risorse e distacco dal possesso; l'insidia è il caos amministrativo che genera instabilità."
    },
    3: {
      title: 'Nettuno in Terza Casa — La Mente Poetica e la Parola Evocativa',
      text: "L'intelletto lavora attraverso immagini, sensazioni musicali e sintonie telepatiche con i pensieri dell'interlocutore. La parola non serve unicamente a catalogare la realtà ma a creare atmosfere magiche, a confortare chi soffre e a rivelare la bellezza nascosta dietro le apparenze ordinarie. Nei rapporti con fratelli o vicini prevale un legame sentimentale profondo o un alone di sacrificio reciproco. La trappola è la vaghezza concettuale: dimenticare i dati oggettivi durante una discussione importante, confondendo la propria immaginazione con la realtà dei fatti.",
      sintesi: "Pensiero intuitivo e comunicazione artistica; l'errore è la dispersione verbale che crea malintesi pratici."
    },
    4: {
      title: 'Nettuno in Quarta Casa — Il Santuario Sommerso delle Radici Ancestrali',
      text: "La dimora d'infanzia e le radici della stirpe sono state avvolte da un'atmosfera nebbiosa: sacrifici familiari taciuti, figure genitoriali idealizzate o assenti, oppure un forte sentimento di fede condiviso tra le mura di casa. Da adulto concepisci la tua abitazione come un tempio sacro o un rifugio appartato, preferibilmente vicino all'acqua o immerso nella quiete della natura. C'è un legame profondo con l'inconscio della famiglia. La difficoltà risiede nella nostalgia perenne: restare legati al miraggio di un paradiso perduto, faticando a costruire una dimora autonoma nel presente.",
      sintesi: "Focolare vissuto come rifugio mistico e radici ancestrali sfuggenti; la lezione è costruire la propria pace nel presente."
    },
    5: {
      title: 'Nettuno in Quinta Casa — L’Estasi Romantica e la Creazione Trascendente',
      text: "L'amore, la sessualità e l'espressione artistica sono vissuti come varchi aperti verso l'infinito: ti innamori dell'anima dell'altro prima ancora che del suo corpo, cercando una comunione totalizzante che fa dimenticare la durezza del mondo. Nelle opere creative esprimi un talento visionario che tocca il cuore di chi guarda. Con i figli dimostri una dolcezza protettiva, incoraggiandone la fantasia e la sensibilità artistica. L'insidia è la seduzione dell'illusione: farsi ingannare da partner deboli nel desiderio compulsivo di redimerli, finendo per sacrificare il proprio benessere per un amore non corrisposto.",
      sintesi: "Creazione artistica sublime e amori trasfigurati; la trappola è il miraggio del salvatore che porta alla delusione."
    },
    6: {
      title: 'Nettuno in Sesta Casa — La Grazia del Servizio e la Cura Spirituale del Corpo',
      text: "La sfera del lavoro subordinato, delle mansioni quotidiane e della salute fisica richiede un approccio olistico e compassionevole. Non puoi sopportare ambienti lavorativi freddi, competitivi o privi di uno scopo benefico verso gli altri: trovi la tua realizzazione ideale nelle professioni d'aiuto, nelle terapie naturali o nell'arte applicata. Il corpo funziona come un sismografo sottile, manifestando disturbi psicosomatici quando l'ambiente si carica di negatività. Il rischio è la trascuratezza pratica: farsi carico del lavoro dei colleghi fannulloni fino all'esaurimento delle proprie energie fisiche.",
      sintesi: "Dedizione generosa e sensibilità corporale profonda; il nodo è stabilire confini chiari per non esaurirsi nel dovere."
    },
    7: {
      title: 'Nettuno in Settima Casa — La Fusione Spirituale e il Rischio dell’Idolatria',
      text: "La relazione di coppia e i contratti associativi sono caricati di aspettative mistiche e ideali sublimi: cerchi un compagno d'anima con cui condividere non solo un tetto ma una missione spirituale e una comprensione senza parole. Possiedi una capacità di perdono e di accoglienza senza pari. Tuttavia, la tendenza a proiettare la perfezione sull'altro può farti ignorare segnali evidenti di inaffidabilità o dipendenza. La maturità si raggiunge quando impari ad amare l'essere umano reale con tutte le sue imperfezioni, senza pretendere che reciti la parte dell'angelo salvatore.",
      sintesi: "Anelito a un'unione trascendente tra anime; il dovere è guardare il partner per ciò che è realmente, senza maschere celesti."
    },
    8: {
      title: 'Nettuno in Ottava Casa — La Resa Mistica negli Abissi della Rigenerazione',
      text: "Nel settore delle grandi prove, delle eredità, del denaro condiviso e della sessualità profonda, Nettuno opera una vera e propria trasfigurazione dell'ego. Comprendi intuitivamente che non si può possedere nulla per sempre e che la vera forza scaturisce dalla capacità di arrendersi alle grandi correnti della vita con fiducia cosmica. C'è una sensibilità medianica e una protezione invisibile nelle situazioni di pericolo. La trappola coincide con la confusione patrimoniale: debiti nebulosi, controversie testamentarie o complicità con persone che approfittano della tua ingenuità finanziaria.",
      sintesi: "Trasfigurazione interiore e fiducia nel mistero; l'ostacolo sono le ambiguità sulle risorse economiche condivise."
    },
    9: {
      title: 'Nettuno in Nona Casa — Il Pellegrinaggio Infinito Verso la Sapienza Universale',
      text: "La mente filosofica è attratta dall'infinito, dalle religioni orientali, dalla metafisica e dai grandi viaggi oltremare vissuti come cammini di purificazione interiore. Non trovi pace nelle spiegazioni accademiche aride, cercando un contatto vivente con l'anima del mondo attraverso la contemplazione solitaria e la lettura dei testi mistici. Offri una guida spirituale capace di infondere speranza. L'ombra è la deriva fanatica: seguire ciecamente dottrine settarie o maestri carismatici di dubbia rettitudine, abbandonando il proprio discernimento critico sull'altare di un sogno rassicurante.",
      sintesi: "Ricerca spirituale sterminata e saggezza metafisica; il pericolo è la fascinazione cieca per dogmi esotici ingannevoli."
    },
    10: {
      title: 'Nettuno in Decima Casa — La Vocazione Ispirata e il Rifiuto del Potere Tirannico',
      text: "La carriera mondana e il ruolo pubblico non sono motivati dall'ambizione fredda di dominare: cerchi una professione che sia una testimonianza di bellezza, carità, musica o elevazione culturale per la società intera. La tua reputazione pubblica è legata al carisma, alla grazia e alla capacità di ispirare le folle con un messaggio di pace e solidarietà. Rifiuti le scorrettezze politiche dei vertici. Il trabocchetto risiede nell'instabilità di ruolo: scivolare nella disillusione professionale o subire scandali ingiusti causati da maldicenze o invidie di chi non comprende il tuo disinteresse.",
      sintesi: "Vocazione pubblica ideale e guida carismatica; il limite è la fragilità mondana davanti alle meschinità politiche."
    },
    11: {
      title: 'Nettuno in Undicesima Casa — La Comunione Fraterna delle Anime Elette',
      text: "Le tue amicizie non sono alleanze utilitaristiche ma legami d'affetto puro, uniti dalla condivisione di ideali umanitari, progetti artistici o percorsi di crescita spirituale. Trovi la tua gioia più autentica nelle comunità aperte, nei circoli di meditazione e nelle associazioni di volontariato che lavorano silenziosamente per il sollievo dei sofferenti. Sei la spalla compassionevole su cui tutti possono piangere. L'insidia è il parassitismo affettivo: circondarsi di amici disperati che assorbono le tue energie senza mai ricambiare, scambiando il proprio sfinimento per dedizione altruistica.",
      sintesi: "Amicizie basate sull'affinità spirituale e ideali umanitari; la cautela esige di non farsi dissanguare da anime vampire."
    },
    12: {
      title: 'Nettuno in Dodicesima Casa — Il Riposo Sacro nell’Origine di Tutte le Cose',
      text: "Nettuno dimora nella propria sede naturale: qui la separazione tra il visibile e l'invisibile svanisce del tutto, aprendo le porte a una contemplazione mistica e a una pace profonda che il mondo non può comprendere né togliere. Nei periodi di solitudine, di preghiera o di meditazione silenziosa attingi a una fonte perenne di rigenerazione spirituale, sciogliendo i nodi dolorosi del passato con un atto di abbandono assoluto. È la posizione dei mistici autentici. Il pericolo è l'apatia eremitica: fuggire le incombenze della vita pratica, rifugiandosi in un isolamento privo di comunicazione con i propri simili.",
      sintesi: "Pace mistica suprema e riconnessione con l'origine cosmica; la sfida è non scappare dalla realtà terrena nell'eremitaggio passivo."
    }
  },

  dignities: {},

  combinations: {
    'Pisces|12': {
        title: "Nettuno in Pesci in Dodicesima Casa",
        canonico: "Nel segno del proprio domicilio e all'interno dell'ultimo settore della carta, Nettuno tocca l'acme dell'espressione simbolica della dissoluzione, della pietà universale e del superamento dei confini dell'Io empirico. Il canone classico vi legge il sigillo del mistico contemplativo, dell'artista che attinge alla memoria cosmica o del custode silenzioso degli afflitti che agisce lontano da ogni ribalta temporale. La persona possiede un'antenna medianica sensibilissima, capace di avvertire il dolore del mondo e di fondersi con l'invisibile senza mediazioni dogmatiche. I rischi canonici riguardano lo smarrimento allucinatorio, la caduta nella dipendenza autosabotante e la fuga ipocondriaca dalla concretezza dell'azione terrena. Chi si perde nell'abisso senza bussola morale rischia di annegare nelle proprie visioni o di farsi strumento passivo di forze caotiche: il confine individuale, per quanto sottile, resta la sola diga che preserva la coscienza dall'annientamento.",
        lilithiano: "Le correnti sotterranee della vita ti entrano nei pori senza che tu possa fermarle con una barriera di buone maniere. L'ambiente familiare riversava su di te i propri veleni psichici inconfessati, sfruttando la tua docilità per ripulire le proprie coscienze sporche.\n\nLilith dissipa la nebbia del tuo martirio: farti spugna del dolore altrui non è una virtù salvifica, è una trappola che ti consuma il midollo e ti toglie la forza di reggerti in piedi. Non vivi per immolarti sull'altare delle miserie del clan. La tua sovranità spirituale si risveglia quando impari a delimitare il tuo spazio sacro, tenendo lontane le voracità psichiche che cercano di nutrirsi della tua innocenza senza dare nulla in cambio.\n\nPossiedi una grazia poetica capace di risanare le anime più desolate con la sola dolcezza della presenza: sai vedere la redenzione dove tutti pronunciano condanne senza appello. Presidiare i propri confini sacri permette alla grazia di fluire senza farsi vampirizzare dall'ingordigia altrui: il cuore intatto diviene un tempio incorruttibile.",
        sintesi: "Nettuno signore del chiostro in Pesci: immersione mistica e sensibilità transpersonale che risplendono difendendo i confini del tempio interiore."
      },
    'Sagittarius|9': {
        title: "Nettuno in Sagittario in Nona Casa",
        canonico: "La presenza di Nettuno nel Sagittario e nella nona casa orienta la facoltà spirituale verso la ricerca di orizzonti trascendenti, il misticismo pellegrino e la sintesi profetica tra filosofie eterogenee. La tradizione individua in questa configurazione l'archetipo dell'esploratore dello spirito, colui che solca mari e terre alla ricerca di una sapienza immacolata che sappia ricongiungere l'umanità al di là dei credi confessionali. L'individuo respinge i limiti imposti dal fanatismo dottrinale e persegue visioni cosmiche di vasto respiro. Le insidie classiche si concentrano sulla credulità fanatica, sulla fascinazione per falsi profeti e sullo smarrimento in labirinti ideologici privi di fondamento nella realtà. La seduzione dei grandi paradisi teorici rischia di trasformare l'esploratore in un predicatore distaccato, cieco davanti alle ingiustizie concrete che si consumano sotto le finestre della sua accademia.",
        lilithiano: "Cercavi orizzonti infiniti prima ancora di sapere cosa ci fosse al di là della collina di casa tua. I predicatori di certezze dogmatiche condannavano ogni dubbio metafisico come un peccato d'orgoglio, esigendo genuflessioni davanti a verità preconfezionate.\n\nLilith abbatte gli idoli dorati della tua fuga esoterica: inseguire maestri illuminati e dottrine mirabolanti non cancella la ferita del tuo sradicamento primordiale. Se la tua fede serve solo a farti sentire superiore al resto dei mortali, stai solo fabbricando un'altra gabbia, più sontuosa delle precedenti. Il vero viaggio dello spirito comincia nel momento in cui trovi il coraggio di guardare la polvere delle tue scarpe e scoprire il divino proprio lì dove nessuno vorrebbe cercarlo.\n\nLa tua intelligenza spirituale è una freccia ardente che sa trafiggere le menzogne dei tribunali religiosi con una disinvoltura sacra. Sai restituire dignità al mistero senza bisogno di dogmi o minacce d'inferno. Toccare la polvere del sentiero con passi limpidi e disarmati dischiude la sola trascendenza autentica: lo spirito non ha bisogno di fuggire dal mondo per rivelare la propria regalità.",
        sintesi: "Nettuno nella nona casa in Sagittario: anelito mistico e orizzonti filosofici universali che fioriscono disarmando la tentazione del fanatismo."
      }
  },

  retrograde: {
    title: 'Nettuno Retrogrado — L’Oceano Sommerso della Mistica Interiore',
    text: "L'anelito alla trascendenza si spoglia dalle illusioni consolatorie per affrontare il mistero senza l'intermediazione di liturgie rassicuranti. Quando Nettuno retrocede, la sete di infinito scende nella carne e nella memoria sepolta, smantellando le finzioni con cui l'ego cerca di proteggersi dalla vastità dell'ignoto. Questa collocazione rende assai difficile ingannare la persona con miti preconfezionati o promesse spirituali da salotto: si percepisce subito la falsità dei salvatori improvvisati. L'empatia diventa allora una facoltà discreta, capace di consolare il dolore altrui senza farsi trascinare nel baratro della confusione emotiva. Il rischio è la disillusione acida: chiudere il cuore alla poesia e alla grazia per difendersi dalla paura del disincanto.",
    sintesi: "Mistica depurata da fumi e miraggi: percezione spietata dell'invisibile e compassione che non teme il disincanto."
  }
};


    // =========================================================================
  // PLUTONE — la forza dell'abisso, la distruzione del falso ego,
  // la rigenerazione catartica e la sovranità incorruttibile della fenice.
  // =========================================================================
// Bozza di BODIES.Pluto per calcolatore-corpi-dict.js
  BODIES.Pluto = {
  signs: {
    Aries: {
      title: 'Plutone in Ariete — Il Fuoco Vulcanico dell’Inizio Implacabile',
      text: "La potenza sotterranea di Plutone incontra la scintilla primordiale dell'Ariete: la rigenerazione non conosce mezze misure e si compie attraverso un atto di rottura titanico e irreversibile. C'è un'energia marziale sotterranea capace di resistere a pressioni estreme, abbattendo qualsiasi ostacolo che si frapponga tra la volontà e l'obiettivo vitale prefissato. L'individuo rinasce dalle proprie ceneri con furore intatto. Il pericolo insito in questa combustione è l'istinto distruttivo cieco: scagliare tutta la violenza rigeneratrice contro il mondo esterno, incenerendo legami ed equilibri preziosi per il solo bisogno di affermare la propria invulnerabilità.",
      sintesi: "Volontà titanica e rinascita fulminea nel fuoco; il rischio è la distruzione furiosa che azzera ogni mediazione."
    },
    Taurus: {
      title: 'Plutone in Toro — La Mutazione Tellurica delle Radici del Valore',
      text: "La trasformazione plutoniana penetra negli strati profondi della materia, dell'agricoltura, della valuta e della sicurezza materiale. Si sperimenta un'attrazione viscerale per il controllo delle risorse terrene e un bisogno ossessivo di rendere inattaccabile la propria posizione patrimoniale contro qualsiasi crisi storica. C'è una capacità inaudita di ricostruire un impero finanziario partendo dal nulla. Il punto cieco coincide con l'avarizia paranoica: trattenere le ricchezze con una morsa d'acciaio per paura della miseria, pietrificando il flusso vitale dell'esistenza in una gabbia di possesso e sospetto.",
      sintesi: "Ricostruzione monumentale delle risorse materiali; l'insidia è il terrore della perdita che pietrifica la generosità."
    },
    Gemini: {
      title: 'Plutone in Gemelli — La Penetrazione Inquisitoria del Pensiero Sotterraneo',
      text: "L'intelletto diventa uno strumento di vivisezione psicologica: non ti accontenti delle opinioni ufficiali o delle risposte di facciata, ma scavi dietro ogni parola per estrarre il movente segreto, la manipolazione retorica o il tabù inconfessato. La comunicazione assume un potere magnetico e ipnotico, capace di persuadere, turbare o liberare l'interlocutore con poche frasi mirate. C'è un talento investigativo formidabile. L'ombra è l'uso velenoso dell'intelligenza: usare i segreti altrui come arma di ricatto o cadere in un cinismo compulsivo che demolisce qualsiasi verità per il solo gusto di dimostrarne la doppiezza.",
      sintesi: "Intelligenza investigativa e parola magnetica; la trappola è il cinismo manipolatorio che distrugge la fiducia verbale."
    },
    Cancer: {
      title: 'Plutone in Cancro — Il Segreto Arcaico del Sangue e la Rigenerazione Emotiva',
      text: "L'energia plutoniana scende nei recessi della memoria ancestrale, del clan familiare e dell'inconscio infantile. Spesso si ereditano ferite genealogiche profonde o debiti morali pesanti che chiedono di essere portati alla luce per essere finalmente trasmutati. C'è un istinto viscerale di protezione verso chi fa parte della propria cerchia ristretta, unito a una capacità quasi magica di guarire i traumi del passato. La tentazione oscura è il ricatto affettivo simbiotico: legare a sé le persone amate attraverso la colpa o il senso di vulnerabilità condivisa, impedendo loro ogni reale autonomia.",
      sintesi: "Trasmutazione dei traumi del lignaggio e protezione viscerale; il limite è il controllo possessivo mascherato da dedizione materna."
    },
    Leo: {
      title: 'Plutone in Leone — La Trasfigurazione Oscura dell’Autorità Regale',
      text: "Il potere plutoniano si veste della maestà solare: la vocazione al comando non ammette rivali né tollera di essere messa in discussione da mediocri cortigiani. C'è un magnetismo teatrale imponente, una generosità travolgente ma anche la pretesa che la propria sovranità morale sia riconosciuta senza riserve. Chi possiede questa forza può guidare popoli fuori dal baratro o compiere opere creative di portata epocale. Il lato oscuro è la tirannia dell'ego: scambiare la propria sete di affermazione personale per una necessità universale, distruggendo con orgoglio spietato chiunque mostri dissenso.",
      sintesi: "Magnetismo regale e sovranità titanica; il pericolo è la superbia dispotica che calpesta la dignità altrui."
    },
    Virgo: {
      title: 'Plutone in Vergine — La Purificazione Chirurgica dell’Ordine Quotidiano',
      text: "La forza plutoniana lavora nel dettaglio microscopico, nella biochimica, nella salute organica e nell'organizzazione spietata del lavoro. C'è un bisogno implacabile di bonificare ogni imperfezione, di eliminare le tossine fisiche e psicologiche e di estirpare l'inefficienza con la precisione di un chirurgo che asporta un male profondo. Persegui l'eccellenza con ricerca infaticabile. Il rischio evidente è l'angoscia della contaminazione: diventare schiavi di manie di controllo igienico o di una severità lavorativa disumana che avvelena la quotidianità propria e dei collaboratori.",
      sintesi: "Bonifica chirurgica delle tossine e precisione assoluta; l'ombra è l'ossessione del controllo che distrugge la spontaneità vitale."
    },
    Libra: {
      title: 'Plutone in Bilancia — La Giustizia Karmica che Frantuma le Finzioni di Coppia',
      text: "La potenza della trasformazione investe i contratti legali, le alleanze politiche e le dinamiche di potere interne alla coppia. Non tolleri la falsa armonia borghese: porti alla luce i ricatti economici, i compromessi disonorevoli e le disparità nascoste che si celano dietro i matrimoni di facciata, esigendo una parità radicale o la rottura netta del vincolo. C'è la vocazione a riformare il diritto civile in chiave egualitaria. L'insidia è la guerra di logoramento coniugale: trasformare la relazione in un'aula di tribunale perpetua in cui nessuno concede tregua all'altro.",
      sintesi: "Riforma radicale dei patti e distruzione delle false paci; il nodo è non fare del legame amoroso un campo di battaglia forense."
    },
    Scorpio: {
      title: 'Plutone in Scorpione — Il Trono Supremo della Morte e della Rinascita',
      text: "Nel proprio domicilio primario, Plutone esprime il vertice assoluto della sua energia iniziatica: nessuna maschera può resistere, nessun tabù resta intatto e la verità viene spogliata di ogni velo consolatorio. Si sperimenta una familiarità innata con la fine, con la sessualità sacra, con i fondi oscuri della psiche e con il potere di trasformare il veleno mortale nel più potente dei medicinali. È la collocazione dello sciamano e del risorto. Il pericolo mortale risiede nella sete di vendetta cosmica: non perdonare mai alcuna offesa, vivendo in una fortezza di veleno emotivo che finisce per intossicare chi la custodisce.",
      sintesi: "Dominio supremo dell'abisso e potere di trasmutazione radicale; la grazia richiede di deporre il veleno del rancore."
    },
    Sagittarius: {
      title: 'Plutone in Sagittario — L’Inquisizione Spirituale e la Rinascita della Fede',
      text: "La rigenerazione scardina le credenze filosofiche consolidate, le istituzioni ecclesiastiche e le morali ufficiali dei popoli. Avverti il bisogno viscerale di scoprire se dietro i dogmi esista una verità immortale o soltanto un apparato di potere per controllare le masse, spingendoti verso esplorazioni spirituali audaci e prive di confini dogmatici. C'è una passione contagiosa per la conoscenza iniziatica. L'ombra è il fanatismo ideologico: credersi detentori dell'unica verità escatologica e intraprendere crociate morali contro chiunque professi visioni del mondo differenti.",
      sintesi: "Purificazione radicale delle credenze e sete di sapienza iniziatica; l'insidia è il dogmatismo fanatico che non tollera eresie."
    },
    Capricorn: {
      title: 'Plutone in Capricorno — La Demolizione Mirata dei Sistemi di Potere Obsoleti',
      text: "Plutone scava sotto le fondamenta delle grandi cattedrali statali, delle corporazioni finanziarie e dei poteri costituiti che hanno tradito la propria funzione etica. Possiedi una pazienza geologica e un pragmatismo inflessibile: comprendi i meccanismi nascosti del comando e sai come scalare i vertici istituzionali per operare una bonifica strutturale duratura. È la tempra del grande statista o del riformatore austero. Il trabocchetto coincide con l'ossessione del dominio totale: confondere l'autorevolezza morale con il controllo dispotico, sacrificando la propria vita personale alla freddezza della carica.",
      sintesi: "Sgretolamento delle strutture corrotte e rigore del comando; il pericolo è la spietatezza marmorea dell'ambizione solitaria."
    },
    Aquarius: {
      title: 'Plutone in Acquario — La Metamorfosi Atomica della Coscienza Collettiva',
      text: "La potenza sotterranea irrompe nella rete planetaria, nell'intelligenza artificiale, nella genetica e nell'architettura delle società future. Si sperimenta l'urgenza di sradicare i monopoli tecnocratici per restituire al popolo il controllo della conoscenza, promuovendo una democrazia diretta radicale e un'evoluzione della coscienza umana che abbatte ogni casta. C'è il genio del rivoluzionario profetico. L'ombra risiede nell'utopismo distruttivo: voler resettare l'intera storia umana in nome di un'astrazione teorica perfetta, cancellando le tradizioni con foga ideologica giacobina.",
      sintesi: "Rivoluzione radicale delle reti umane e del sapere futuro; il limite è la tentazione di cancellare la storia per un ideale astratto."
    },
    Pisces: {
      title: 'Plutone in Pesci — La Dissoluzione Catartica e la Resa all’Abisso Oceanico',
      text: "Nell'ultimo segno dello zodiaco, la morte e la rinascita si compiono attraverso la resa totale dei confini dell'ego nel grembo della coscienza cosmica. Si sciolgono le illusioni secolari dell'isolamento individuale, rivelando che il dolore dell'altro è il proprio dolore e che la salvezza si conquista unicamente attraverso una purificazione spirituale collettiva. C'è un potere di guarigione psichica immenso. Il rischio è il crollo nel caos autodistruttivo: lasciarsi risucchiare dalle correnti di angoscia universale, rifugiandosi in un nichilismo passivo o in un vittimismo mistico che rifiuta la terra.",
      sintesi: "Catarsi spirituale profonda e dissoluzione dell'illusione dell'ego; la salvezza esige di non sprofondare nel nichilismo caotico."
    }
  },

  houses: {
    1: {
      title: 'Plutone in Prima Casa — La Presenza Vulcanica e il Magnetismo dell’Ombra',
      text: "La persona si presenta al mondo emanando un'aura di potere sotterraneo, mistero impenetrabile e intensità magnetica che catalizza l'attenzione di chiunque entri nella stanza. Chi ti incontra percepisce subito che sotto la superficie calma ribolle una lava pronta a travolgere qualsiasi finzione, suscitando reazioni estreme che vanno dalla fascinazione totale al timore reverenziale. Sei una presenza incorruttibile. La sfida fondamentale è non vivere in trincea continua: disarmare lo sguardo inquisitorio e non interpretare la normale debolezza altrui come una cospirazione ordita contro la tua persona.",
      sintesi: "Magnetismo viscerale e presenza impenetrabile sul volto del mondo; il compito è non considerare la vita una guerra perpetua."
    },
    2: {
      title: 'Plutone in Seconda Casa — Il Tesoro Sepolto e la Sovranità Materiale Indomita',
      text: "Il denaro, i beni tangibili e il senso del proprio valore non sono mai questioni superficiali: rappresentano la garanzia assoluta della tua indipendenza e il baluardo contro ogni tentativo di sottomissione economica. Possiedi un fiuto eccezionale per le opportunità sommerse e una tenacia formidabile nel ricostruire le proprie finanze dopo eventuali tracolli patrimoniali. Sei una roccia economica. L'ombra è l'avidità difensiva ossessiva: accumulare ricchezze con una diffidenza feroce, credendo che chiunque si avvicini voglia sottrarti ciò che hai guadagnato con la tua fatica.",
      sintesi: "Potere economico rigenerativo e controllo ferreo dei beni; l'insidia è il terrore viscerale dell'espropriazione materiale."
    },
    3: {
      title: 'Plutone in Terza Casa — La Parola Ipnotica che Lacera le Finzioni Quotidiane',
      text: "L'intelletto opera come una sonda geologica: raccoglie informazioni nascoste, smonta le mezze verità e decifra le comunicazioni non verbali con una rapidità disarmante. Quando parli o scrivi, la tua voce possiede un'autorità magnetica capace di persuadere nel profondo o di ferire a morte l'avversario toccando il punto esatto della sua vulnerabilità. Nell'infanzia possono esserci stati segreti pesanti nell'ambiente circostante. La trappola è il sospetto verbale sistematico: essere convinti che tutti mentano, finendo per usare la conversazione unicamente come strumento di spionaggio difensivo.",
      sintesi: "Parola penetrante e mente investigativa insuperabile; il limite è la diffidenza ossessiva che avvelena il dialogo fraterno."
    },
    4: {
      title: 'Plutone in Quarta Casa — Le Cripte Segrete del Focolare Ancestrale',
      text: "Plutone scava nelle fondamenta della casa d'origine, dove spesso si sono consumate lotte di potere sotterranee, traumi non detti o la presenza di figure familiari autoritarie e dominatrici. Hai dovuto imparare a difendere il tuo spazio interiore fin dalla più tenera età, sviluppando una resistenza psicologica a tutta prova. Da adulto concepisci la casa come un bunker sacro e inaccessibile, dove solo pochissimi fidati possono entrare. La prova consiste nel fare pulizia nelle cripte del passato: non perpetuare nella propria dimora adulta le dinamiche di controllo e ricatto subite da bambini.",
      sintesi: "Radici familiari complesse e bisogno di una dimora-bunker; la redenzione sta nel bonificare i fantasmi della genealogia."
    },
    5: {
      title: 'Plutone in Quinta Casa — Il Fuoco Vorace dell’Eros Iniziatore e della Creazione',
      text: "L'eros, la passione amorosa e l'atto creativo sono territori di trasmutazione radicale in cui non c'è spazio per flirt leggeri o divertimenti superficiali. Quando ti innamori cerchi una fusione carnale e spirituale totale che tocchi le radici dell'essere, vivendo il legame come un'iniziazione profonda capace di distruggere e ricreare la personalità. Nelle tue opere d'arte esprimi una forza drammatica che scuote l'anima del pubblico. L'ostacolo risiede nella gelosia distruttiva: pretendere il possesso assoluto dell'anima del compagno, soffocando la spontaneità dell'amore con un controllo ossessivo.",
      sintesi: "Passione travolgente e creazione artistica potente; la trappola è il delirio di possesso che distrugge la libertà di amare."
    },
    6: {
      title: 'Plutone in Sesta Casa — La Purificazione Chirurgica dell’Organismo e del Mestiere',
      text: "La salute corporale, la cura dei dettagli e le mansioni quotidiane richiedono una disciplina rigorosa e una costante opera di disintossicazione. Sei capace di sostenere carichi lavorativi massacranti senza mostrare cedimenti, eccellendo nelle professioni che richiedono indagini minuziose, risanamenti aziendali, chirurgia o bonifiche ambientali. Conosci i segreti della rigenerazione cellulare. Il pericolo è l'autosfruttamento tirannico: pretendere una perfezione disumana da se stessi e dai subordinati, logorando il fisico in battaglie operative ossessive che conducono a crisi somatiche violente.",
      sintesi: "Maestria nel risanamento pratico e dedizione incrollabile; il rischio è la tirannia del dovere che esaurisce le forze vitali."
    },
    7: {
      title: 'Plutone in Settima Casa — Lo Specchio Trasformativo del Patto Indissolubile',
      text: "Le unioni nuziali e le grandi associazioni sono teatri di trasformazione alchemica: non puoi accontentarti di un legame tiepido ma attrai partner potenti, magnetici o complessi che fungono da catalizzatori per la tua evoluzione interiore. Nei contratti pretendi una lealtà assoluta, considerata una questione di vita o di morte. C'è una capacità enorme di risorgere insieme dalle crisi più nere. L'ombra è la lotta sorda per la supremazia nella coppia: trasformare la convivenza in un braccio di ferro sotterraneo in cui ciascuno tenta di piegare la volontà dell'altro.",
      sintesi: "Legami intensi e relazioni che trasmutano l'anima; la fatica è rinunciare al controllo per sperimentare la vera parità."
    },
    8: {
      title: 'Plutone in Ottava Casa — Il Regno Sotterraneo della Rigenerazione Suprema',
      text: "Plutone risiede nella propria dimora cosmica: qui la forza di morte e rinascita tocca il vertice della sua manifestazione terrena e occulta. Possiedi una lucidità imperturbabile nelle situazioni di emergenza estrema, un fiuto infallibile per la gestione dei grandi capitali altrui e un'attitudine naturale alla decifrazione dei misteri della psiche profonda. Non temi l'ombra perché sai che ogni fine racchiude il germe di una rinascita più gloriosa. La trappola coincide con la manipolazione occulta: usare il proprio ascendente psicologico per tenere gli altri in pugno attraverso il senso di debito o di colpa.",
      sintesi: "Plutone sovrano negli abissi: padronanza delle crisi estreme e rigenerazione totale che esige incorruttibilità etica."
    },
    9: {
      title: 'Plutone in Nona Casa — La Fede Forgiata nella Notte Oscura dell’Anima',
      text: "La visione filosofica e spirituale della vita non nasce da dottrine preconfezionate ma è il frutto di un'esplorazione coraggiosa degli abissi del pensiero umano. Hai dovuto attraversare la distruzione delle tue certezze religiose infantili per approdare a una fede incrollabile, fondata sull'esperienza diretta della trasformazione interiore. I tuoi viaggi sono vere e proprie iniziazioni che cambiano per sempre la tua visione del mondo. L'insidia è il fanatismo dottrinale: voler convertire a tutti i costi gli altri alla propria visione escatologica con intransigenza inquisitoria.",
      sintesi: "Sapienza iniziatica conquistata nella prova e fede incorruttibile; il limite è la tentazione del fanatismo dogmatico."
    },
    10: {
      title: 'Plutone in Decima Casa — L’Autorità Monumentale e la Bonifica dei Vertici',
      text: "La realizzazione professionale e la vocazione pubblica sono segnate da un'ascesa solitaria, determinata e incorruttibile che si impone per pura potenza di merito e di visione strategica. C'è la vocazione a guidare istituzioni in momenti di crisi sistemica, bonificando corruzioni storiche e assumendoti responsabilità titaniche che schiaccerebbero individui ordinari. Possiedi una reputazione che incute timore e rispetto. Il trabocchetto risiede nella caduta catastrofica: abusare della propria influenza per consolidare un potere personale indiscutibile, attirando vendette spietate dai rivali.",
      sintesi: "Ascesa monumentale e comando nelle crisi istituzionali; il pericolo è la brama cieca di potere che attira congiure mortali."
    },
    11: {
      title: 'Plutone in Undicesima Casa — L’Alleanza Cospirativa per il Rinnovamento dei Tempi',
      text: "I tuoi progetti collettivi e le tue amicizie non sono semplici circoli di svago ma alleanze strategiche, votate alla trasformazione radicale della società o alla realizzazione di opere pionieristiche di vasto respiro. Hai il potere di aggregare personalità straordinarie attorno a una causa comune, esercitando una leadership discreta ma determinante nel guidare il gruppo verso la meta. Offri un'alleanza fedele fino alla morte. L'ostacolo è il tradimento all'interno della fazione: subire o tramare congiure di corridoio, rompendo legami storici per dissidi ideologici insanabili.",
      sintesi: "Alleanze potenti e progetti collettivi rivoluzionari; la lezione è non sacrificare l'amicizia sincera ai calcoli di fazione."
    },
    12: {
      title: 'Plutone in Dodicesima Casa — Il Guardiano delle Soglie nell’Inconscio Inviolato',
      text: "La forza plutoniana presidia i territori più remoti della psiche sommersa, dei sogni arcaici e delle prove affrontate lontano dal clamore della vita sociale. C'è una riserva segreta di energia rigenerativa a cui puoi attingere nei momenti di solitudine estrema, riuscendo a sconfiggere angosce ancestrali e sensi di colpa che risalgono a tempi remoti. Curi l'anima nel silenzio profondo. La fragilità risiede nella paura dei propri stessi mostri interni: reprimere l'ombra fino a farla erompere in fobie ingiustificate o in sentimenti di colpa che sabotano la gioia terrena.",
      sintesi: "Riconnessione con la potenza dell'inconscio primordiale; la vittoria richiede di guardare i propri mostri interiori senza paura."
    }
  },

  dignities: {},

  combinations: {
    'Scorpio|8': {
        title: "Plutone in Scorpione in Ottava Casa",
        canonico: "Nel proprio domicilio notturno e custodito nell'ottava casa, Plutone concentra la massima potenza trasmutatrice del rito di morte e rinascita, del disvelamento dei misteri occulti e della gestione della ricchezza sotterranea. La dottrina classica ravvisa qui la figura del guardiano della soglia, capace di scendere nelle viscere della psiche per debellare mali atavici e rigenerare radicalmente la struttura del lignaggio. Chi nasce con questo sigillo non indietreggia di fronte all'orrore e maneggia le crisi come crogioli di purificazione alchemica. I pericoli canonici toccano il terrore paranoico della sopraffazione, la sete di vendetta implacabile e il ricatto affettivo esercitato attraverso l'ombra. La fascinazione per la catastrofe e l'ossessione per il disfacimento rischiano di trasformare l'iniziazione in un gorgo letale: scendere nelle fosse esige una fermezza sobria, per non restare sepolti sotto le ceneri di ciò che andava bruciato.",
        lilithiano: "Hai visto troppo presto ciò che si muoveva sotto la superficie rassicurante delle certezze familiari. La rispettabilità esteriore del casato esigeva il seppellimento immediato di qualsiasi scandalo, barattando la salute psichica dei figli con l'opinione del vicinato. Porti nel petto una cicatrice antica che brucia ogni volta che qualcuno prova ad avvicinarsi senza bussare con rispetto.\n\nLilith ti ordina di smettere di nutrire i fantasmi della vendetta: covare rancore per decenni è solo un modo per rimanere nel laccio della memoria dei tuoi aguzzini. La tua vera potenza non risiede nella capacità di distruggere chi ti ha ferito, ma nella libertà regale di lasciarlo al suo destino, sapendo che non può più toccare un solo capello della tua persona sovrana. La tua rinascita si compie quando apri le mani e lasci che il passato si dissolva nel nulla.\n\nPossiedi una fermezza sciamanica che non trema davanti a nessun crollo: sai come estrarre il diamante più puro dalle ceneri dell'abbandono. Nessun ricatto può piegarti perché hai già guardato l'abisso negli occhi senza abbassare la testa. Chi non trema davanti alla decomposizione possiede la chiave della rinascita: nominare la ferita alla luce del sole spezza l'incantesimo funebre e restituisce la vita alla stirpe.",
        sintesi: "Plutone signore dell'ottava casa: alchimia profonda della discesa negli inferi che genera un'autorità invincibile spogliandosi dell'ossessione del dominio."
      },
    'Capricorn|10': {
        title: "Plutone in Capricorno in Decima Casa",
        canonico: "La collocazione di Plutone al Medio Cielo nel Capricorno unisce la potenza catartica della distruzione trasformatrice con le istituzioni storiche, il governo della collettività e le strutture del comando temporale. La tradizione astrologica vede in questo schema la forza inarrestabile che abbatte regimi corrotti e disintegra consorterie consolidate per instaurare un ordine politico più rigoroso ed equanime. La persona esercita un magnetismo imperioso che incute rispetto e persegue i propri fini di vertice con una determinazione incrollabile che ignora gli ostacoli contingenti. Le ombre tradizionali vertono sulla tirannia autoritaria, sull'ossessione maniacale del comando supremo e sul rischio di crolli vertiginosi che travolgono chi abusa della carica pubblica per fini personali. Le cospirazioni ordite nelle anticamere del comando finiscono inevitabilmente per divorare chi le ha tessute: l'autorità conserva una reale tenuta storica solo finché le decisioni strategiche poggiano su un'etica trasparente e incorruttibile.",
        lilithiano: "Non hai mai avuto paura del potere perché ne hai compreso i meccanismi fin dai primi anni, osservando le meschinità di chi lo esercitava senza meritarlo. I padroni delle gerarchie premiavano l'adulazione e il cinismo opportunista, ignorando la competenza scrupolosa di chi lavorava dietro le quinte senza piegare la schiena.\n\nLilith ti attende sulla soglia del palazzo del comando: bada a non diventare ciò che un tempo hai combattuto con sdegno. Se per governare devi indossare la maschera del cinismo e considerare gli esseri umani come pedine da manovrare, la tua vittoria sarà solo una prigione più vasta e desolata. Il tuo vero compito di liberazione non consiste nel sostituire un despota con un altro, ma nello smantellare i troni dell'arbitrio per restituire alla comunità il senso della propria dignità originaria.\n\nLa tua tempra politica è di quelle che segnano un'epoca: possiedi una lucidità strategica magistrale e un'incorruttibilità che fa tremare i corrotti. Non c'è compromesso che possa piegarti. Un'opera monumentale fondata su fondamenta di limpida giustizia non teme i terremoti della politica: la vera autorità si riconosce dalla capacità di durare oltre la memoria dei tiranni.",
        sintesi: "Plutone culminante in Capricorno: rigenerazione radicale delle istituzioni storiche che trionfa quando diserta la tirannia personale."
      }
  },

  retrograde: {
    title: 'Plutone Retrogrado — La Trasmutazione Alchemica dell’Ombra Segreta',
    text: "La discesa negli inferi non combatte tiranni esteriori, ma affronta la trama delle proprie ossessioni e dei propri terrori atavici. Con Plutone retrogrado, la questione del controllo e della vulnerabilità viene vissuta come un corpo a corpo solitario con la propria ombra. La persona possiede un fiuto infallibile per riconoscere la corruzione e la menzogna nelle strutture umane, ma comprende che nessun potere mondano potrà risanare la radice della paura originaria. Si compie così un'alchimia segreta di trasmutazione del trauma, capace di restituire lucidità dove gli altri vedono solo rovina. La tentazione distruttiva consiste nel compiacimento del lutto: rimanere intrappolati nell'abisso, convincendosi che la vita debba essere un'agonia senza fine.",
    sintesi: "Alchimia della notte interiore: bonifica delle memorie sotterranee per rinascere senza il bisogno di dominare."
  }
};


    // =========================================================================
  // NODO LUNARE NORD VERO (TrueNode) — la direzione evolutiva dell'anima,
  // il mandato karmico di superamento dell'inerzia e l'affrancamento dal passato.
  // =========================================================================
// Bozza di BODIES.TrueNode per calcolatore-corpi-dict.js
  BODIES.TrueNode = {
  signs: {
    Aries: {
      title: 'Nodo Nord in Ariete — La Chiamata Primaria al Coraggio Solitario',
      text: "Il sentiero evolutivo chiede di superare la tendenza ancestrale a delegare le scelte, a compiacere l'altro per paura del conflitto o a restare impigliati nei compromessi pacificatori della Bilancia. La vita ti sfida a fare il primo passo in solitaria, a dichiarare con fermezza ciò che desideri e ad assumerti il rischio di scontentare chi preferiva vederti remissivo. È l'iniziazione dell'audacia e del pionierismo autentico. L'ostacolo è il ripiegamento opportunistico: tornare a nascondersi dietro le decisioni del partner al primo segnale di attrito, rimandando l'affermazione della propria traiettoria.",
      sintesi: "Direzione evolutiva fondata sull'audacia solitaria; la prova è non fuggire il conflitto per paura del dissenso."
    },
    Taurus: {
      title: 'Nodo Nord in Toro — L’Approdare alla Calma Feconda della Terra',
      text: "La rotta di crescita conduce fuori dai drammi esasperati dello Scorpione, dalle crisi continue e dal bisogno compulsivo di manipolare o controllare le dinamiche invisibili del potere. La maturazione passa attraverso l'apprendimento della semplicità, la stima del proprio valore tangibile e la costruzione paziente di un benessere duraturo fondato su basi stabili. Si impara a godere della pace terrena senza sospettare agguati dietro ogni angolo. Il rischio è la ricaduta nell'ansia distruttiva: sabotare la tranquillità conquistata per nostalgia del tumulto emotivo delle crisi passate.",
      sintesi: "Sentiero di pace terrena e costruzione paziente; il pericolo è richiamare il caos per timore della quiete."
    },
    Gemini: {
      title: 'Nodo Nord in Gemelli — La Curiosità Aperta Verso la Molteplicità delle Voci',
      text: "L'asse karmico invita ad abbandonare le certezze dogmatiche del Sagittario, le verità assolute proclamate dall'alto e il disprezzo per la conversazione ordinaria. Il compito spirituale risiede nell'ascolto attento dei dettagli, nella curiosità sincera verso i punti di vista differenti e nella capacità di fare domande senza pretendere di possedere già la risposta. Si sviluppa un'agilità mentale fresca e comunicativa. L'ombra è la presunzione dottrinale: ergersi a maestri infallibili che rifiutano il confronto paritario, isolandosi in torri d'avorio ideologiche.",
      sintesi: "Apertura mentale e curiosità per la varietà del reale; l'ostacolo è la tentazione del dogma cattedratico."
    },
    Cancer: {
      title: 'Nodo Nord in Cancro — Il Ritorno Risanatore alla Tenerezza del Cuore',
      text: "Il cammino evolutivo esige di ammorbidire la corazza fredda del Capricorno, fatta di ambizione arida, autosufficienza ostinata e paura atavica di mostrarsi vulnerabili. La vita invita ad aprire le porte all'intimità affettiva, a prendersi cura dei propri bisogni emotivi primari e a creare focolari umani accoglienti dove non sia necessario recitare il ruolo della roccia indistruttibile. Si scopre la sovranità della dolcezza. La debolezza è la fuga nel lavoro: seppellirsi sotto doveri e responsabilità esteriori per non dover affrontare la fame d'amore del bambino interiore.",
      sintesi: "Consacrazione alla cura intima e alla vulnerabilità; la trappola è blindarsi nel rigore per timore del rifiuto."
    },
    Leo: {
      title: 'Nodo Nord in Leone — La Consacrazione della Sovranità Creativa Personale',
      text: "La traiettoria dell'anima esorta a uscire dal mimetismo protettivo dell'Acquario, dove ci si nascondeva dietro l'anonimato del gruppo, le teorie collettive o il disinteresse aristocratico per l'esposizione diretta. Il destino chiama a salire sul palcoscenico della propria vita, a mostrare il volto, a esprimere il proprio calore regale e a guidare gli altri con generosità magnanima. C'è una chiamata alla creatività sfolgorante. L'insidia è il rifugio nel gregarismo: accontentarsi di fare il suggeritore dietro le quinte per non rischiare l'impopolarità di un comando autentico.",
      sintesi: "Affermazione radiosa della propria unicità creativa; il limite è nascondersi dietro l'alibi dell'uguaglianza astratta."
    },
    Virgo: {
      title: 'Nodo Nord in Vergine — La Maestria Pragmatica nell’Organizzazione del Reale',
      text: "Il nodo evolutivo spinge a uscire dalla nebbia indistinta dei Pesci, dall'evasione mistica, dal fatalismo passivo e dal vittimismo che attende miracoli esterni senza mai agire. Il dharma chiede di rimboccarsi le maniche, di applicare metodo e discernimento lucido alla vita pratica e di curare il benessere del corpo con disciplina quotidiana. Si impara a diventare strumenti utili e impeccabili nel mondo terreno. Il trabocchetto risiede nella deriva caotica: abbandonare le incombenze materiali al primo ostacolo, rifugiandosi in una spiritualità disincarnata priva di riscontri concreti.",
      sintesi: "Metodo operativo e servizio intelligente alla terra; la tentazione è fuggire la disciplina nel disordine sognatore."
    },
    Libra: {
      title: 'Nodo Nord in Bilancia — L’Arte Sublime dell’Incontro e della Condivisione Paritaria',
      text: "Il cammino di crescita esige di superare l'egocentrismo bellicoso dell'Ariete, l'abitudine di procedere come carri armati solitari senza consultare nessuno e la paura che l'alleanza equivalga a una sconfitta personale. La maturazione si compie imparando a negoziare, ad ascoltare le ragioni dell'altro e a costruire accordi equi fondati sul rispetto e sulla reciprocità contrattuale. Si scopre la grazia della cooperazione armoniosa. L'ostacolo è l'impazienza aggressiva: spezzare le trattative al primo disaccordo per il terrore di dover dividere il merito dell'opera con altri.",
      sintesi: "Evoluzione verso l'equità e la reciprocità relazionale; il pericolo è la fuga nell'assalto solitario per paura del patto."
    },
    Scorpio: {
      title: 'Nodo Nord in Scorpione — Il Coraggio della Trasmutazione e della Verità Nuda',
      text: "La rotta dell'anima chiama ad abbandonare la comodità stagnante del Toro, l'attaccamento possessivo alle cose materiali e il terrore viscerale di qualsiasi cambiamento che mini le abitudini acquisite. Il compito spirituale chiede di scendere nelle profondità emotive, di accettare le fini necessarie, di guardare in faccia le ombre della psiche e di scoprire che la vera sicurezza non risiede nell'oro ma nella capacità di rinascere. È la consacrazione iniziatica. Il rischio è la resistenza conservativa: rimanere abbarbicati a situazioni morte solo perché garantiscono una rendita materiale o una calma apparente.",
      sintesi: "Discesa trasformatrice nell'ombra e rigenerazione; la trappola è la difesa ottusa delle certezze materiali morte."
    },
    Sagittarius: {
      title: 'Nodo Nord in Sagittario — Il Volo Fiducioso Verso la Saggezza Universale',
      text: "L'asse di destino esorta a uscire dal labirinto frammentato dei Gemelli, dal chiacchiericcio scettico, dalla moltiplicazione sterile di informazioni e dalla paura di prendere una posizione etica netta. La vita ti chiede di allargare lo sguardo, di avere fede in un senso superiore dell'esistenza, di intraprendere viaggi di vasta portata e di sintetizzare la conoscenza in una visione filosofica luminosa. Si impara a credere davvero in qualcosa. La tentazione è l'ironia disimpegnata: scherzare su tutto per non assumersi la responsabilità di un credo profondo e coerente.",
      sintesi: "Espansione fiduciosa verso la visione etica e spirituale; il limite è restare imprigionati nel dubbio scettico perpetuo."
    },
    Capricorn: {
      title: 'Nodo Nord in Capricorno — La Vetta Solenne della Maturità e della Responsabilità',
      text: "Il percorso spirituale invita a emanciparsi dalla dipendenza infantile del Cancro, dalle oscillazioni emotive umorali e dal bisogno continuo di protezione o approvazione materna. Il destino chiama a diventare l'autorità di riferimento per se stessi, ad assumersi la responsabilità delle proprie azioni nel mondo pubblico e a costruire con rigore e perseveranza opere che resistano al tempo. C'è una chiamata alla maestria morale e civile. La trappola è il rifugio nel nido: lamentarsi delle durezze del mondo esterno per giustificare la propria inerzia o il rifiuto di crescere.",
      sintesi: "Assunzione sovrana di responsabilità pubblica e maestria; il pericolo è la regressione infantile nel lamento indifeso."
    },
    Aquarius: {
      title: 'Nodo Nord in Acquario — La Fratellanza Universale e la Libertà dai Dogmi',
      text: "La rotta evolutiva chiede di deporre l'egocentrismo aristocratico del Leone, il bisogno ossessivo di plauso personale e l'abitudine di sentirsi il centro unico attorno a cui tutto deve ruotare. La maturazione si raggiunge lavorando tra pari, mettendo il proprio ingegno al servizio di cause collettive emancipatorie e credendo in una democrazia reale priva di caste e gerarchie feudali. Si scopre la bellezza dell'altruismo visionario. L'ombra è la vanità offesa: ritirarsi sdegnati dai progetti comuni se non viene tributata una celebrazione continua ai propri meriti individuali.",
      sintesi: "Cooperazione orizzontale e ideali comunitari d'avanguardia; l'insidia è il narcisismo che rifiuta la parità con gli altri."
    },
    Pisces: {
      title: 'Nodo Nord in Pesci — La Resa Fiduciosa al Flusso dell’Amore Incondizionato',
      text: "Il cammino spirituale conduce oltre l'ansia del controllo microscopico della Vergine, oltre il perfezionismo paralizzante e la tendenza a sezionare ogni moto dell'animo con spirito ipercritico. La vita ti invita ad arrenderti alla grazia, a fidarti dell'invisibile, a perdonare le imperfezioni della condizione terrena e ad abbracciare una compassione senza riserve per tutti gli esseri viventi. Si impara l'arte sacra dell'abbandono consapevole. La debolezza è la rigidità ipocondriaca: continuare ad aggrapparsi a elenchi e doveri formali per paura di affondare nel mare dell'inconscio.",
      sintesi: "Abbandono fiducioso alla compassione cosmica e alla grazia; l'ostacolo è l'ipercontrollo ansioso che impedisce la resa."
    }
  },

  houses: {
    1: {
      title: 'Nodo Nord in Prima Casa — L’Iniziazione Solitaria all’Autoaffermazione',
      text: "La traiettoria dell'esistenza chiede di abbandonare l'abitudine consolidata di definire la propria identità unicamente attraverso lo sguardo del partner o il consenso della coppia. Il destino chiama a sviluppare una spina dorsale autonoma, a manifestare con franchezza i propri desideri primari e a non chiedere scusa per il proprio spazio nel mondo. C'è una grandiosa vocazione al coraggio pionieristico. Il rischio è la ricaduta nella dipendenza: sacrificare la propria vocazione per preservare un'unione comoda ma asfissiante.",
      sintesi: "Sviluppo dell'autonomia e della sovranità personale; la prova è non cedere la propria traiettoria per compiacere l'altro."
    },
    2: {
      title: 'Nodo Nord in Seconda Casa — L’Edificazione Autonoma delle Risorse Terrene',
      text: "L'asse di crescita impone di affrancarsi dalla dipendenza finanziaria o psicologica dalle risorse altrui, dai debiti, dalle eredità manipolatorie o dalle crisi continue tipiche dell'ottava casa. Il compito evolutivo consiste nell'imparare a guadagnare con le proprie sole forze, nel dare valore concreto al proprio lavoro e nello sviluppare un'autosufficienza economica solida e pacifica. C'è la scoperta del valore interiore incorruttibile. L'insidia è farsi mantenere o manipolare da altri pur di non affrontare la disciplina del sostentamento autonomo.",
      sintesi: "Conquista dell'indipendenza economica e del valore proprio; il limite è la tentazione di appoggiarsi sui beni altrui."
    },
    3: {
      title: 'Nodo Nord in Terza Casa — La Voce Libera e il Radicamento nel Quotidiano',
      text: "Il dharma chiama a scendere dalle vette delle grandi astrazioni filosofiche o dalle fughe esotiche in terre lontane per immergersi nella realtà concreta dell'ambiente vicino. Il compito risiede nell'imparare a comunicare con semplicità, a scambiare idee con fratelli e vicini senza complessi di superiorità e a diffondere una conoscenza pratica e accessibile a tutti. Si riscopre la freschezza della conversazione immediata. La tentazione è l'evasione accademica: pontificare su teorie lontane per non confrontarsi con le necessità concrete di chi vive accanto.",
      sintesi: "Comunicazione chiara e dialogo attivo nell'ambiente vicino; l'ostacolo è la fuga nell'astrazione dottrinale distante."
    },
    4: {
      title: 'Nodo Nord in Quarta Casa — La Fondazione Consapevole del Tempio Domestico',
      text: "La rotta di maturazione chiede di allentare l'ossessione per il successo mondano, per la carriera esteriore e per il riconoscimento sociale a tutti i costi. La vita invita a coltivare la propria interiorità, a bonificare le radici genealogiche, a costruire un focolare sereno e a trovare sicurezza dentro la propria anima prima che nella piazza pubblica. C'è una guarigione profonda delle ferite d'infanzia. Il pericolo è l'aridità ambiziosa: continuare a sacrificare la pace degli affetti per inseguire titoli di potere che lasciano il cuore deserto.",
      sintesi: "Ritorno all'intimità della casa e radicamento interiore; il rischio è l'ambizione cieca che desertifica gli affetti."
    },
    5: {
      title: 'Nodo Nord in Quinta Casa — Il Risveglio del Fuoco Creativo e dell’Eros',
      text: "Il cammino evolutivo esorta a uscire dal conformismo delle comitive, delle associazioni ideologiche o dall'abitudine di disperdere la propria unicità nel calderone dei progetti collettivi. Il destino chiama a mettersi in gioco personalmente attraverso l'arte, il corteggiamento appassionato, la gioia del gioco e la trasmissione viva del proprio cuore ai figli o alle proprie creazioni. C'è la rinascita dell'entusiasmo solare. L'ombra è la freddezza teorica: rifugiarsi nell'analisi sociologica per non correre il rischio di esporsi con un atto d'amore audace.",
      sintesi: "Espressione appassionata della creatività e del cuore; l'insidia è nascondersi nel gruppo per timore del giudizio."
    },
    6: {
      title: 'Nodo Nord in Sesta Casa — La Cura Quotidiana del Tempio Corporeo e dell’Opera',
      text: "Il sentiero spirituale chiede di abbandonare le evasioni nebulose, la confusione mistica e la tentazione di farsi sommergere dal disordine o dal vittimismo emotivo. La vita invita a trovare il sacro nel profano attraverso la disciplina quotidiana del lavoro, l'attenzione minuziosa alle incombenze terrene e la cura scientifica e compassionevole della propria salute corporea. Si sperimenta la santità del servizio utile. Il trabocchetto è la diserzione passiva: attendere che il destino risolva i problemi pratici senza assumersi la responsabilità della fatica ordinaria.",
      sintesi: "Disciplina quotidiana e sacralità dell'operosità pratica; la debolezza è la fuga nel disordine per evitare l'impegno."
    },
    7: {
      title: 'Nodo Nord in Settima Casa — L’Incontro Paritario e la Lealtà del Patto Nuziale',
      text: "La traiettoria dell'anima esige di superare l'isolamento egoistico, l'abitudine di decidere sempre da soli e la paura che l'altro sia un concorrente da sconfiggere o un limite alla propria libertà. La crescita si compie nell'arte dell'ascolto, nell'unione matrimoniale fondata sulla lealtà reciproca e nella stipula di patti equi in cui il bene della relazione prevale sull'orgoglio individuale. Si impara a guardare il mondo attraverso gli occhi dell'altro. L'ostacolo è la fuga belligerante: rompere l'alleanza alla prima difficoltà per riprendere la strada solitaria.",
      sintesi: "Apertura sincera all'altro e costruzione di patti equi; il pericolo è la reazione individualista che distrugge la cooperazione."
    },
    8: {
      title: 'Nodo Nord in Ottava Casa — La Rigenerazione Iniziatica Oltre le Certezze Materiali',
      text: "Il cammino karmico impone di abbandonare l'attaccamento rigido alle sicurezze borghesi, alle abitudini immutabili e alla paura fobica di perdere il controllo patrimoniale. La vita chiama ad affrontare le grandi trasformazioni psicologiche, a condividere le risorse in profondità con l'altro e a scoprire il potere invincibile che scaturisce dall'attraversamento consapevole delle crisi interiori. C'è una chiamata all'alchimia psichica. La tentazione è l'irrigidimento difensivo: blindarsi nei propri possessi per non dover mai affrontare la verità nuda delle proprie emozioni.",
      sintesi: "Discesa consapevole nelle crisi trasmutatrici e rigenerazione; la trappola è il blocco difensivo nelle abitudini materiali."
    },
    9: {
      title: 'Nodo Nord in Nona Casa — L’Orizzonte della Verità Vissuta e dei Grandi Viaggi',
      text: "La traiettoria dell'evoluzione chiede di oltrepassare i confini angusti del pettegolezzo locale, dalle piccole diatribe di vicinato e dalla raccolta frammentaria di nozioni prive di sintesi. La vita invita a intraprendere viaggi di scoperta spirituale, a esplorare filosofie universali e ad abbracciare una fede etica ampia, capace di dare un senso luminoso all'intero cammino terreno. Si sviluppa la statura della guida sapienziale. Il limite è l'adagiamento nella banalità: accontentarsi delle opinioni del quartiere per non affrontare lo sforzo di pensare in grande.",
      sintesi: "Espansione verso orizzonti sapienziali vasti e fede viva; l'insidia è l'impantanamento nelle polemiche locali ordinarie."
    },
    10: {
      title: 'Nodo Nord in Decima Casa — La Vetta della Vocazione Pubblica e dell’Autorità Morale',
      text: "La traiettoria evolutiva esige di affrancarsi dal ricatto emotivo del focolare infantile, dalla dipendenza dalle figure genitoriali e dal bisogno di rifugiarsi nella propria zona di comfort domestica. Il destino chiama ad assumere ruoli di responsabilità nel mondo pubblico, a realizzare la propria vocazione con fermezza incorruttibile e a diventare un punto di riferimento autorevole per la comunità. Emerge l'esigenza di una solida autorevolezza mondana. La debolezza risiede nell'alibi affettivo: giustificare la mancanza di realizzazione professionale con la scusa di doversi dedicare unicamente alla casa.",
      sintesi: "Realizzazione della vocazione pubblica e maestria civile; la trappola è usare la famiglia come alibi per non esporsi al mondo."
    },
    11: {
      title: 'Nodo Nord in Undicesima Casa — La Cooperazione Fraterna per il Bene Collettivo',
      text: "La rotta di crescita chiede di superare il bisogno infantile di essere costantemente al centro dell'attenzione amorosa o teatrale. La maturazione passa attraverso l'impegno all'interno di gruppi di pari, l'adesione a progetti umanitari di lungo corso e la coltivazione di amicizie leali fondate sulla condivisione di ideali civili d'avanguardia. Si scopre la gioia di lavorare per una meta che oltrepassa il proprio tornaconto personale. L'ombra è il narcisismo solista: abbandonare il collettivo appena non ci si sente lodati come sovrani assoluti dell'opera.",
      sintesi: "Dedizione alle reti fraterne e ai grandi ideali futuri; il limite è il protagonismo egoico che sabota il lavoro di squadra."
    },
    12: {
      title: 'Nodo Nord in Dodicesima Casa — La Resa Mistica e la Riconnessione con la Sorgente',
      text: "Il sentiero spirituale conduce oltre l'ansia da prestazione, il controllo maniacale della salute e l'ossessione per l'efficienza quotidiana tipici della sesta casa. La vita ti chiede di imparare l'arte della solitudine feconda, di coltivare la meditazione silenziosa e di affidare il proprio destino alle grandi leggi invisibili del cosmo con totale compassione verso ogni forma vivente. C'è una riserva perenne di pace mistica da risvegliare. Il pericolo è l'iperattivismo difensivo: riempirsi di compiti futili pur di non fermarsi ad ascoltare la voce sommessa dell'anima.",
      sintesi: "Riconnessione mistica con la totalità e pace interiore; l'ostacolo è l'attivismo frenetico che soffoca il silenzio dell'anima."
    }
  },

  dignities: {},

  combinations: {
    'Taurus|2': {
        title: "Nodo Nord in Toro in Seconda Casa",
        canonico: "La convergenza del Nodo Lunare ascendente nel Toro e nella seconda casa segna un compito karmico fondato sull'abbandono delle crisi distruttive per radicarsi nella saggezza feconda della materia, della stabilità e dell'autonomia corporea. L'anima deve disinnescare l'abitudine secolare ai conflitti laceranti e alle passioni morbose, eredità del Nodo Sud in Scorpione nell'ottava, per apprendere l'arte paziente della coltivazione pacifica e del consolidamento dei beni terreni. L'individuo è chiamato a costruire valore tangibile giorno per giorno, rispettando i ritmi naturali della terra. I pericoli canonici toccano la regressione recidiva in drammi sentimentali o manipolazioni segrete che bruciano le risorse conquistate. La dipendenza psicologica dal pericolo continuo crea una pericolosa cecità verso le stagioni di bonaccia: chi scambia la tregua per una trappola finisce per sabotare con le proprie mani il raccolto faticosamente maturato nel campo.",
        lilithiano: "Vivi da sempre sul bordo del vulcano, credendo che solo nel dramma e nella tensione estrema si potesse misurare l'intensità dell'esistenza. I conflitti laceranti della prima infanzia avevano assuefatto il sistema nervoso all'allarme continuo, rendendo la tranquillità domestica sospetta e minacciosa.\n\nLilith ti invita a deporre la corazza da guerra e a posare i piedi nudi sull'erba bagnata: la tua iniziazione più ardua non è sopravvivere a un altro massacro, ma concederti il diritto alla pace, al riposo e alla gioia della carne senza sensi di colpa ancestrali. Non devi espiare alcuna colpa primordiale attraverso la sofferenza continua. La terra è accogliente e ti offre nutrimento abbondante se smetti di guardarla con il sospetto del cacciatore braccato.\n\nPossiedi una fecondità somatica straordinaria che sa trasformare ogni risorsa grezza in bellezza duratura e benessere tangibile. Sai come far fiorire un giardino nei terreni più inospitali. Fermare la spada e respirare il profumo dell'erba bagnata è l'atto più coraggioso della vita: abitare il presente con fiduciosa fermezza edifica una pace che nessuna tempesta potrà violare.",
        sintesi: "Nodo Nord nel Toro in seconda casa: transito evolutivo dalla turbolenza drammatica alla prosperità serena della terra viva."
      },
    'Aries|1': {
        title: "Nodo Nord in Ariete in Prima Casa",
        canonico: "La collocazione del Nodo Nord nell'Ariete e sulla soglia dell'Ascendente indica una traiettoria evolutiva orientata all'affermazione impavida della propria identità e al superamento dell'arrendevolezza diplomatica. L'anima è chiamata a dismettere l'eccesso di compiacenza e il bisogno di consenso derivanti dal Nodo Sud in Bilancia nella settima casa, per imparare a guidare la propria esistenza con franchezza assoluta e slancio autonomo. Chi porta questo contrassegno deve assumersi il rischio della rottura e del giudizio sfavorevole pur di rimanere fedele alla propria rotta interiore. Le insidie canoniche risiedono nel ritorno codardo a compromessi ipocriti che castrano l'iniziativa, oppure nel passaggio cieco a una belligeranza sconsiderata. L'esitazione diplomatica prolungata oltre misura si tramuta in complicità con il sopruso: il primo passo sulla via dell'individuazione esige la rottura netta degli accordi comodi che garantivano sicurezza al prezzo dell'obbedienza.",
        lilithiano: "Ti hanno insegnato a chiedere scusa prima ancora di aver urtato qualcuno, a sacrificare i tuoi desideri per non disturbare la quiete della coppia e a credere che la tua vita valesse solo come riflesso delle aspettative altrui. I ricatti dell'approvazione sociale insegnavano che il dissenso esplicito fosse il peggiore dei peccati, spingendoti a chiedere scusa per il semplice fatto di occupare spazio.\n\nLilith spezza il collare dorato delle tue sottomissioni cortesi: la concordia che compri cancellando la tua volontà non è amore, è una servitù mascherata da decoro borghese. La tua anima non è venuta al mondo per fare da gregario obbediente alle certezze di altri. Il tuo primo dovere sacro consiste nel pretendere il tuo spazio, dire ciò che pensi senza addolcire la pillola e sostenere la discordia senza abbassare lo sguardo.\n\nC'è in te un fuoco primordiale che aspetta solo il tuo consenso per risvegliarsi e bruciare ogni catena residua: possiedi l'ardimento dei precursori che non temono l'ignoto. L'avanguardia comincia nell'istante esatto in cui smetti di voltarti indietro a contare i consensi: camminare dritti senza domandare il permesso traccia sentieri di libertà per chiunque segua.",
        sintesi: "Nodo Nord all'Ascendente in Ariete: compito karmico di autonomia e franchezza che dissolve l'eccesso di diplomazia subordinata."
      }
  },

  retrograde: {
    title: 'Nodo Lunare Retrogrado — Il Ritorno Iniziatore alle Radici del Compito Karmico',
    text: "Il moto retrogrado costituisce la traiettoria ordinaria dell'asse nodale nello zodiaco, orientato a riconnettere il destino con la memoria profonda delle origini. Avere il Nodo Nord in moto retrogrado significa che il cammino verso il futuro non può essere una fuga spensierata in avanti né un'acquisizione superficiale di nuovi traguardi mondani: richiede di voltarsi indietro, fare i conti con i debiti genealogici lasciati in sospeso e sciogliere i vincoli contratti per paura. La crescita si compie attraverso un recupero consapevole di antiche sapienze dismesse. L'esperienza insegna a discernere tra le eredità feconde e le catene paralizzanti. Il nodo debole è il richiamo nostalgico del passato: preferire la sicurezza del noto alla sfida arricchente dell'inedito.",
    sintesi: "Il destino si compie ricucendo la memoria originaria: risoluzione dei debiti ereditari per aprire sentieri inediti."
  }
};


    // =========================================================================
  // CHIRONE — il guaritore ferito, il punto di riconciliazione tra istinto
  // e saggezza, la trasmutazione della cicatrice in medicina sovrana.
  // =========================================================================
// Bozza di BODIES.Chiron per calcolatore-corpi-dict.js
  BODIES.Chiron = {
  signs: {
    Aries: {
      title: 'Chirone in Ariete — La Ferita Primordiale dell’Esistere e il Riscatto dell’Atto',
      text: "Il centauro ferito tocca il punto nevralgico della legittimità vitale: la sensazione ancestrale di non avere il diritto di manifestare la propria volontà o di essere puniti per il solo fatto di prendere l'iniziativa. Si sperimenta spesso un'esitazione dolorosa prima di agire, come se affermare se stessi costituisse una colpa originaria. La medicina che scaturisce da questa lacerazione è straordinaria: chi supera questa paura diventa un mentore invincibile per gli sfiduciati, insegnando agli altri come rialzarsi e conquistare la propria sovranità terrena. Il pericolo è l'aggressività ipercompensatoria: aggredire per primi per nascondere la propria fragilità interiore.",
      sintesi: "Ferita sul diritto primario di esistere e agire; la redenzione sta nel diventare guida impavida per chi dubita di sé."
    },
    Taurus: {
      title: 'Chirone in Toro — Il Trauma della Scarsità e la Riconciliazione Carnale',
      text: "La vulnerabilità chironiana colpisce il rapporto con il corpo fisico, con il valore materiale e con la paura atavica della privazione. Possono esserci state esperienze precoci di indigenza o la sensazione dolorosa di non meritare il piacere, il comfort e la sicurezza della terra. Si impara a guarire la materia ascoltando i ritmi lenti della natura, diventando terapeuti capaci di restituire dignità al corpo mortificato e di insegnare la vera arte dell'abbondanza feconda. L'ombra è l'ansia dell'accumulo: blindarsi nel possesso materiale per il terrore viscerale che il mondo possa improvvisamente toglierti ogni mezzo di sostentamento.",
      sintesi: "Vulnerabilità legata al corpo e al valore materiale; la medicina è insegnare la sacralità della terra e dell'abbondanza."
    },
    Gemini: {
      title: 'Chirone in Gemelli — La Frattura della Parola e la Cura dell’Ascolto Profondo',
      text: "La lesione tocca la sfera della parola, dell'apprendimento infantile e della fiducia nella propria intelligenza. Spesso si è stati sbeffeggiati o zittiti da piccoli, sviluppando il timore di non saper comunicare chiaramente o di essere considerati inadeguati nel ragionamento logico. Attraverso questa prova, la parola si purifica da ogni frivolezza, trasformandosi in una voce medicamentosa capace di curare le solitudini altrui attraverso la scrittura, l'insegnamento e l'ascolto empatico. L'insidia è il logorio intellettuale: affannarsi a dimostrare continuamente la propria erudizione per placare un senso interiore di inferiorità culturale.",
      sintesi: "Ferita nella comunicazione e nell'intelletto; il dono è una parola compassionevole capace di risanare le ferite dell'anima."
    },
    Cancer: {
      title: 'Chirone in Cancro — La Spina nel Nido Materno e il Balsamo dell’Accoglienza',
      text: "Chirone scava nel grembo delle origini familiari: il dolore nasce dalla percezione di un'assenza di nutrimento intimo, da un rifiuto precoce o dal dover fare da genitori ai propri stessi genitori. C'è una fame d'amore oceanica che nessuna rassicurazione convenzionale sembra placare. La grazia iniziatica sboccia quando si impara a diventare la madre compassionevole di se stessi, offrendo al mondo un'accoglienza calorosa e protettiva che non chiede nulla in cambio. Il rischio è il ricatto dell'abbandono: manipolare gli affetti attraverso il proprio dolore per costringere gli altri a non andarsene mai.",
      sintesi: "Ferita d'abbandono nell'infanzia e fame d'affetto; la forza sboccia nell'offrire un'accoglienza materna universale e generosa."
    },
    Leo: {
      title: 'Chirone in Leone — La Mortificazione del Cuore e la Sovranità Risorta',
      text: "Il trauma colpisce l'orgoglio, la creatività spontanea e il diritto sacro di brillare di luce propria. Nell'infanzia la tua espressività può essere stata derisa o soffocata da figure autorevoli invidiose, inducendoti a vergognarti della tua gioia naturale o a sentirti una comparsa sbiadita. Dalla cenere di questa umiliazione rinasce un'autorevolezza nobilissima, che non ha bisogno di applausi per sapere quanto vale e che sa incoraggiare il talento di chi è stato calpestato. L'ostacolo è il narcisismo difensivo: pretendere una deferenza esasperata dagli altri per compensare la segreta paura di essere invisibili.",
      sintesi: "Ferita dell'orgoglio e della spontaneità espressiva; la maestria è riaccendere la fiducia e la creatività in chi è stato umiliato."
    },
    Virgo: {
      title: 'Chirone in Vergine — L’Angoscia dell’Imperfezione e l’Arte Olistica del Risanamento',
      text: "La sofferenza chironiana tocca la percezione ossessiva dei propri difetti, la paura delle malattie e il senso opprimente di non essere mai abbastanza utili, puliti o preparati per affrontare la vita. Spesso si è stati sottoposti a critiche severe che hanno lacerato la stima di sé. Questa spina diventa la sorgente di una straordinaria competenza terapeutica, nutrizionale ed ecologica, capace di rimettere in sesto corpi e ambienti devastati con precisione impeccabile. Il limite è la tortura ipocondriaca: perdersi in un controllo maniacale dei dettagli fisici fino a rendere la quotidianità una gabbia ansiosa.",
      sintesi: "Ferita dell'inadeguatezza e timore dell'imperfezione; il riscatto è una vocazione formidabile alla cura olistica e all'ecologia."
    },
    Libra: {
      title: 'Chirone in Bilancia — La Frattura dello Specchio Relazionale e la Giustizia Equanime',
      text: "La piaga chironiana si manifesta nella sfera delle unioni e della fiducia nei patti umani: l'esperienza dolorosa dell'ingiustizia subita, del tradimento contrattuale o della solitudine dentro la coppia lascia cicatrici profonde. Hai dovuto imparare a non perdere la tua identità pur di farti amare dall'altro. Chi elabora questo passaggio diventa un mediatore straordinario, un arbitro illuminato capace di pacificare le contese più aspre ristabilendo l'equità senza ipocrisie. Il trabocchetto è il compiacimento sacrificale: accettare relazioni asimmetriche e umilianti pur di non dover affrontare la solitudine.",
      sintesi: "Ferita nei contratti e nelle relazioni intime; la saggezza fiorisce nel diventare custodi dell'equità autentica tra pari."
    },
    Scorpio: {
      title: 'Chirone in Scorpione — La Discesa nelle Acque Avvelenate e il Risveglio dello Sciamano',
      text: "Chirone penetra nei recessi più oscuri dell'anima: il confronto traumatico con la perdita, l'abuso di potere, la violazione dell'intimità o la morte prematura di legami capitali. Hai conosciuto il sapore acre del tradimento e la tentazione di morire dentro. Ma proprio dalle acque avvelenate dell'abisso estrai la medicina più potente: la capacità di accompagnare gli esseri umani attraverso i loro inferni interiori senza arretrare di un millimetro. È la firma del guaritore sciamanico. Il pericolo è l'amarezza distruttiva: restare intrappolati nel rancore vendicativo, facendo del proprio dolore una spada per ferire.",
      sintesi: "Ferita estrema nelle prove dell'abisso; la trasmutazione trasforma il veleno nel farmaco più potente di rinascita spirituale."
    },
    Sagittarius: {
      title: 'Chirone in Sagittario — La Crisi della Speranza e la Saggezza del Maestro Errante',
      text: "La lesione investe la fede nel destino, il senso della giustizia cosmica e la fiducia nei maestri spirituali. Puoi aver conosciuto l'ipocrisia di figure religiose o accademiche che professavano verità sublimi vivendo nella menzogna, sperimentando il vuoto disperato del disincanto filosofico. Da questo baratro risorge una saggezza autentica, spogliata di dogmi settari e fondata sulla compassione per i cercatori smarriti nel buio del mondo. L'ombra è il nichilismo cinico: deridere ogni ideale elevato o, all'opposto, arroccarsi in un fanatismo compensatorio per non sentire il vuoto.",
      sintesi: "Ferita del disincanto spirituale e perdita del senso; il trionfo è guidare gli altri verso una verità libera da ipocrisie."
    },
    Capricorn: {
      title: 'Chirone in Capricorno — L’Orfanezza della Vetta e la Paternità Spirituale Sovrana',
      text: "Il dolore chironiano nasce dal confronto precoce con responsabilità spietate, dal rifiuto delle autorità sociali o dal non aver mai ricevuto un riconoscimento per i propri sacrifici. Si è stati costretti a diventare adulti troppo presto, affrontando la bufera della vita senza un appoggio protettivo. Questa solitudine forgia un'autorevolezza etica indistruttibile: diventi la guida paziente che sa reggere il timone nel caos, offrendo agli altri una spalla sicura senza pretendere tributi di servitù. Il limite è l'indurimento marmoreo: credere che il mondo sia solo fatica e castigo, pietrificandosi in una severità senza lacrime.",
      sintesi: "Ferita della solitudine e del carico precoce; la maturità si compie nella paternità morale che protegge senza opprimere."
    },
    Aquarius: {
      title: 'Chirone in Acquario — L’Ostracismo dalla Tribù e la Medicina della Diversità',
      text: "La piaga chironiana si consuma nell'esperienza dell'esclusione sociale: sentirsi alieni, diversi, non conformi agli standard del gruppo dei pari o espulsi con disprezzo dalle cerchie conformiste. Hai conosciuto il gelo dell'isolamento dell'eretico. Chi risana questo strappo diventa il difensore appassionato dei diritti degli emarginati, creando spazi di libertà e accoglienza dove ogni unicità viene onorata come un tesoro sacro. C'è una visione anticipatrice e fraterna. La tentazione è il distacco snob: disprezzare la massa per non dover ammettere quanto abbia fatto male essere respinti dal branco.",
      sintesi: "Ferita dell'emarginazione e della diversità incompresa; il dono è aprire vie d'avanguardia per l'inclusione degli esclusi."
    },
    Pisces: {
      title: 'Chirone in Pesci — Il Naufragio nel Dolore del Mondo e la Grazia Universale',
      text: "La lesione non ha confini personali: l'individuo assorbe la sofferenza del pianeta, delle vittime senza voce e del mare invisibile del dolore collettivo come una ferita aperta nella propria carne. Si manifesta una permeabilità totale che può portare a sentirsi vittime predestinate del destino o a cercare la fuga nell'anestesia emotiva. La redenzione sboccia nella scoperta della compassione incondizionata: chi impara a non annegare diventa un canale di grazia mistica e risanamento spirituale per chi è disperato. Il rischio è la rinuncia depressiva: lasciarsi divorare dalla pena universale abbandonando ogni impegno pratico.",
      sintesi: "Ferita della permeabilità empatica universale; la vittoria è trasformare il dolore cosmico in una sorgente perenne di grazia."
    }
  },

  houses: {
    1: {
      title: 'Chirone in Prima Casa — La Cicatrice Visibile sul Volto e il Corpo-Medicina',
      text: "La presenza chironiana sul punto dell'Ascendente incide la ferita direttamente sull'immagine corporea, sulla percezione di sé e sulla presentazione al mondo esteriore. C'è spesso il ricordo di essersi sentiti sbagliati, goffi o inadeguati fin dalla prima infanzia, sviluppando una timidezza che mascherava un'ipersensibilità acuta. Quando impari ad accettare la tua vulnerabilità senza vergognartene, il tuo stesso corpo diventa uno strumento di guarigione immediata per chi ti avvicina: la tua presenza silenziosa rassicura chiunque stia soffrendo. La trappola è il complesso d'inferiorità cronico: sentirsi difettosi a prescindere da ogni successo terreno.",
      sintesi: "Vulnerabilità impressa sulla presenza fisica; la liberazione trasforma la propria ferita nel più potente strumento di cura."
    },
    2: {
      title: 'Chirone in Seconda Casa — L’Incertezza sul Proprio Valore e il Tesoro Nascosto',
      text: "La lacerazione tocca la capacità di quantificare il proprio valore e di godere delle risorse materiali senza sensi di colpa inconsci. Possono esserci state privazioni infantili o la svalutazione sistematica dei propri talenti da parte dell'ambiente educativo. Attraverso il lavoro di riscatto, scopri che la tua vera ricchezza non dipende dalle quotazioni di mercato ma dalla consistenza della tua anima, diventando capaci di insegnare agli altri come valorizzare ciò che la società scarta ingiustamente. L'insidia è il timore perenne della miseria: non sentirsi mai al sicuro anche con riserve abbondanti.",
      sintesi: "Ferita sul valore personale e sulle risorse terrene; la maestria è scoprire la vera abbondanza incorruttibile dentro di sé."
    },
    3: {
      title: 'Chirone in Terza Casa — La Parola Soffocata e la Scrittura che Medica',
      text: "Il trauma si è consumato nelle prime esperienze di apprendimento, nel confronto amaro con compagni di scuola o con fratelli che hanno sminuito le tue capacità comunicative. Hai potuto sperimentare blocchi verbali o la sensazione che le tue idee non interessassero a nessuno. Elaborando questo nodo, la tua parola si carica di un potere evocativo e risanatore immenso: sai scegliere il vocabolo esatto che rasserena un cuore afflitto e sai spiegare concetti complessi con una delicatezza magistrale. Il rischio è la paura del giudizio intellettuale: tacere per timore di dire una sciocchezza.",
      sintesi: "Ferita nell'apprendimento e nella comunicazione; la redenzione è una parola terapeutica che rischiara le menti confuse."
    },
    4: {
      title: 'Chirone in Quarta Casa — La Crepa nelle Mura Ancestrali e il Focolare Risorto',
      text: "La ferita affonda le radici nelle fondamenta intime della famiglia, dove il focolare domestico non ha offerto la protezione e il calore necessari a far fiorire l'anima in sicurezza. Hai conosciuto precocemente il senso di spaesamento interiore, sentendoti un ospite fragile tra le mura di casa. La via della guarigione consiste nel fondare una dimora adulta basata sull'accoglienza sincera, diventando un rifugio saldo per chi è stato privato della tenerezza infantile. La trappola è la nostalgia paralizzante: restare inchiodati al dolore delle proprie radici infantili senza mai osare voltare pagina.",
      sintesi: "Dolore profondo nelle radici domestiche; il riscatto è creare un focolare adulto capace di sanare ogni antica solitudine."
    },
    5: {
      title: 'Chirone in Quinta Casa — La Censura della Gioia e la Rinascita dell’Atto Creativo',
      text: "La vulnerabilità colpisce la spontaneità espressiva, il gioco, l'eros e il diritto di divertirsi senza dover dimostrare alcuna utilità pratica. Nell'infanzia ti è stato fatto credere che la tua creatività fosse una perdita di tempo o una vanità colpevole, congelando il calore del cuore in una timidezza austera. Quando rianimi questo fuoco sacro, le tue opere e il tuo modo di amare toccano vette di bellezza commovente, insegnando agli altri a riscoprire la gioia pura di esistere. L'ostacolo è il blocco dell'artista: distruggere le proprie creazioni prima di mostrarle per paura del rifiuto.",
      sintesi: "Ferita sull'espressione del piacere e dell'eros; la maestria è riaccendere la fiamma creativa propria e di chi ha perso la gioia."
    },
    6: {
      title: 'Chirone in Sesta Casa — La Fragilità del Corpo e la Vocazione del Terapeuta',
      text: "La presenza di Chirone nella casa della salute e del servizio quotidiano produce una spiccata sensibilità somatica: il corpo segnala ogni squilibrio interiore con sintomi precisi, costringendo a una ricerca accurata sulle cause profonde del malessere. Ti spinge a studiare medicine alternative, fitoterapia, alimentazione naturale ed ecologia del lavoro, acquisendo un sapere pratico di enorme valore per la salute pubblica. Diventi un terapeuta scrupoloso e instancabile. Il pericolo è l'ipocondria ansiosa: vivere in perenne allarme per la minima alterazione fisiologica, dimenticando la fiducia nei processi di autoguarigione.",
      sintesi: "Sensibilità corporale acuta e talento curativo; l'insidia è farsi divorare dall'ansia per la salute fisica."
    },
    7: {
      title: 'Chirone in Settima Casa — Lo Specchio della Ferita nel Riflesso del Compagno',
      text: "La relazione intima e il patto associativo diventano il luogo elettivo della guarigione attraverso lo specchio dell'altro: attrai partner feriti che risvegliano le tue antiche insicurezze di abbandono o di inadeguatezza relazionale. Hai dovuto sperimentare la sofferenza di un legame ineguale prima di comprendere che l'amore non si conquista mendicando briciole di attenzione. Chi matura questa lezione sa costruire alleanze fondate su una compassione reciproca indistruttibile, guidando le coppie verso una parità autentica. La debolezza è l'accondiscendenza servile: farsi calpestare pur di non restare soli.",
      sintesi: "Ferita risvegliata dai legami di coppia; la vittoria risiede nell'insegnare la dignità e la parità nell'unione reciproca."
    },
    8: {
      title: 'Chirone in Ottava Casa — La Discesa nell’Abisso e la Trasmutazione del Dolore',
      text: "Chirone risiede nei territori più scabrosi: le crisi psicologiche estreme, le eredità contese, la paura della morte e i traumi legati alla sessualità e alla fiducia tradita. Hai guardato negli occhi ciò che la maggior parte delle persone tenta di rimuovere a ogni costo, scoprendo che nel cuore stesso del dolore risiede la chiave della rigenerazione spirituale. Traghetti chi soffre attraverso le notti oscure dell'anima altrui, offrendo una presenza imperturbabile a chi affronta lutti o metamorfosi decisive. La trappola è l'ossessione per il dramma: crogiolarsi nella sofferenza come unica prova di profondità vitale.",
      sintesi: "Iniziazione attraverso le grandi prove dell'anima; il riscatto è guidare chi attraversa l'inferno verso la luce della rinascita."
    },
    9: {
      title: 'Chirone in Nona Casa — La Ferita del Dogma e la Guida del Mentore Libero',
      text: "La lesione chironiana si è consumata nel rapporto con la fede, con le verità ufficiali o con viaggi intrapresi alla ricerca di una salvezza esteriore che si è rivelata un'illusione amara. Hai conosciuto il tradimento di guide spirituali autoreferenziali e la desolazione di sentirti senza patria morale nel mondo. Dalla macerie di queste delusioni scaturisce una sapienza luminosa, capace di accompagnare i cercatori senza imporre catechismi, valorizzando l'esperienza diretta e vissuta dell'anima. Il limite è l'arroccamento scettico: rifiutare qualsiasi speranza spirituale per il terrore di essere di nuovo ingannati.",
      sintesi: "Ferita del disincanto religioso; la grazia fiorisce nel diventare maestri liberi che orientano senza imporre credi."
    },
    10: {
      title: 'Chirone in Decima Casa — La Vulnerabilità del Ruolo Pubblico e l’Esempio Morale',
      text: "Il trauma riguarda la reputazione mondana, il rapporto con l'autorità paterna o sociale e la paura cocente del fallimento professionale davanti agli occhi della comunità. Puoi aver conosciuto ingiustizie nei percorsi di carriera o la sensazione che la tua fatica non venisse mai premiata come meritava. Chi compie il riscatto chironiano diventa una figura autorevole e profondamente umana: guidi gli altri non attraverso il potere punitivo della carica ma con l'autorevolezza morale di chi conosce la debolezza umana. L'insidia è il timore dell'esposizione pubblica: sabotare il proprio successo per non essere giudicati.",
      sintesi: "Vulnerabilità sul palcoscenico della carriera; il compimento è un'autorità civile compassionevole e profondamente rispettata."
    },
    11: {
      title: 'Chirone in Undicesima Casa — L’Estraneità dal Gruppo e la Cura della Collettività',
      text: "La ferita nasce dal senso di esclusione dai circoli di amici, dalle associazioni studentesche o dai movimenti politici in cui speravi di trovare accoglienza fraterna. Ti sei sentito a lungo una presenza eccentrica, non omologabile e guardata con diffidenza dai conformisti del branco. Questa solitudine dolorosa ti rende capaci di fondare comunità inclusive, dove nessuno viene discriminato per la propria unicità e dove i progetti collettivi sono al servizio del riscatto dei più deboli. La debolezza è la misantropia difensiva: respingere le persone a priori per la paura atavica di essere nuovamente rifiutati.",
      sintesi: "Ferita dell'esclusione sociale; la maestria si traduce nella creazione di reti fraterne che proteggono gli spiriti liberi."
    },
    12: {
      title: 'Chirone in Dodicesima Casa — La Compassione Sacra nell’Oceano del Dolore Sommerso',
      text: "Chirone dimora nelle cavità invisibili dell'inconscio primordiale e dell'eredità karmica: si sperimenta una tristezza senza causa apparente, un'empatia sconfinata per la sofferenza di tutti gli esseri viventi e un senso di isolamento che il mondo esteriore fatica a comprendere. Nei momenti di solitudine contemplativa, di silenzio o di lavoro discreto a beneficio degli ultimi scopri una fonte inesauribile di pace spirituale e grazia curatrice. Risani nel segreto le anime afflitte. Il pericolo è il rifugio nell'apatia: farsi schiacciare dalla pena del mondo, rifugiandosi nell'inerzia per paura di soffrire.",
      sintesi: "Ferita sommersa nell'inconscio collettivo; la redenzione trasforma il dolore segreto in un balsamo universale di compassione."
    }
  },

  dignities: {},

  combinations: {
    'Virgo|6': {
        title: "Chirone in Vergine in Sesta Casa",
        canonico: "La presenza di Chirone nella Vergine e nella sesta casa focalizza la ferita iniziatica sulla salute del corpo, sulla fatica del lavoro quotidiano e sulla ricerca incessante di un'igiene perfetta dell'esistenza. Nel canone contemporaneo questa configurazione designa l'operatore di cura, il sapiente della fisiologia naturale e colui che conosce la fragilità della materia per averla patita in prima persona fin dai primi anni. L'individuo matura un'attenzione acutissima ai dettagli organici ed ecologici, mettendo a punto terapie di rara efficacia preventiva. I rischi tradizionali toccano l'ipocondria invalidante, l'ansia da perfezionismo lavorativo e il servilismo somatico che sacrifica il riposo sull'altare delle incombenze pratiche. La pretesa di sanare ogni anomalia biologica o procedurale sfocia in una tortura senza fine: il corpo e la società ritrovano equilibrio solo quando la cura impara a convivere con il limite costitutivo della materia vivente.",
        lilithiano: "Cresci con la sensazione che il tuo corpo sia un meccanismo difettoso, che ogni tuo malessere sia una vergogna da nascondere e che tu debba lavorare fino all'esaurimento per meritarti il pane quotidiano. L'ingratitudine dell'apparato burocratico e familiare considerava la tua dedizione un atto dovuto, ignorando la fatica silenziosa che logorava i tuoi nervi.\n\nLilith spalanca le porte del tuo dispensario: il tuo corpo non è una bestia da soma da immolare sull'altare del lavoro continuo né un congegno da vivisezionare con lo sguardo del giudice severo. La tua ferita nella carne è il tuo varco di sapienza più prezioso. Non devi guarire per guadagnarti il diritto di respirare: la tua persona era sacra prima ancora che ti ferissero. La vera salute sboccia quando deponi l'angoscia della perfezione e osi concederti il riposo senza chiedere perdono a nessuno.\n\nPossiedi una compassione terapeutica formidabile e uno sguardo che individua subito la radice somatica del dolore altrui: sai dove intervenire con un tocco lieve per sbloccare energie stagnanti. Deporre il giogo della perfezione forzata restituisce sacralità al gesto quotidiano: la vera cura sboccia spontanea dove la fatica non deve più pagare tributi al senso di colpa.",
        sintesi: "Chirone in sesta casa in Vergine: ferita somatica e ansia del dovere che si trasmutano in sapienza terapeutica e rispetto del limite vitale."
      },
    'Aries|1': {
        title: "Chirone in Ariete in Prima Casa",
        canonico: "Chirone all'Ascendente nell'Ariete concentra la problematica della ferita primordiale sul nucleo originario dell'identità somatica e sul diritto fondamentale di affermare la propria esistenza nel mondo. La tradizione individua in questa segnatura l'anima che ha sperimentato precocemente il rifiuto o la censura severa verso ogni moto spontaneo di vitalità e coraggio, sviluppando un'intima esitazione prima di combattere per la propria causa. La persona difende i deboli con ardimento fulmineo ma fatica a riconoscere la legittimità della propria forza. I pericoli canonici riguardano l'autosabotaggio nei momenti di affermazione cruciale, l'aggressività compensatoria e il rischio di traumi fisici al capo causati dalla fretta rabbiosa. L'esibizione muscolare impiegata come paravento della propria fragilità crolla al primo urto reale: la leadership autentica si consolida solo quando l'individuo non nasconde più la cicatrice ma la porta come segno della propria tempra.",
        lilithiano: "Ti hanno fatto dubitare della tua legittimità su questa terra fin dai primi passi, rimproverandoti ogni scatto di ribellione naturale e facendoti sentire colpevole per il solo fatto di voler respirare a pieni polmoni. I rimproveri precoci contro la tua baldanza naturale avevano seminato il sospetto velenoso che ogni manifestazione di forza fosse un torto arrecato ai deboli.\n\nLilith ti asciuga le lacrime dalla fronte e ti ordina di rialzare il capo: non hai bisogno dell'autorizzazione di alcuna corte per abitare questo suolo né devi giustificare il fuoco che ti brucia dentro. La tua vulnerabilità corporale non è una condanna alla debolezza, è la radice della tua autentica regalità. Non hai l'obbligo di accumulare vittorie titaniche per dimostrare che esisti: la tua presenza è preziosa perché è viva, franca e indivisa. Smetti di aggredire il mondo per la paura di subire offese.\n\nC'è in te un talento sublime nel riaccendere il coraggio nei cuori disperati: chi ti incontra ritrova la voglia di lottare semplicemente guardando come cammini a testa alta nonostante le prove del passato. Riconoscere la ferita senza cedere all'auto-commiserazione accende un'autorità immune al ricatto: chi ha attraversato il proprio strazio senza spegnere il fuoco cammina nel mondo con dignità sovrana.",
        sintesi: "Chirone all'Ascendente in Ariete: ferita originaria sul diritto di esistere che rinasce come guida coraggiosa e compassionevole."
      }
  },

  retrograde: {
    title: 'Chirone Retrogrado — Il Ritorno Iniziatore nella Ferita Segreta',
    text: "La piaga originaria non cerca balsami esterni né elemosina consolazioni presso chi non può comprendere la radice del dolore. Con Chirone retrogrado, il processo di risanamento abbandona l'urgenza di guarire gli altri per fuggire dal proprio vuoto: l'individuo deve scendere senza difese nella memoria della propria vulnerabilità. Si comprende con lucidità toccante che certe ferite dell'anima non sono difetti da correggere, ma feritoie attraverso cui penetra la visione profonda delle cose. Nasce così un'automedicina sobria, che non dipende dal giudizio di maestri o terapeuti di facciata. La ferita può trasformarsi in compiacimento: affezionarsi al proprio strazio come all'unico segno certo della propria identità, rifiutando ogni sollievo.",
    sintesi: "Sosta consapevole nella carne vulnerabile: la piaga diventa varco di sapienza senza ricorrere a protesi esteriori."
  }
};


    // =========================================================================
  // CERERE — la grande madre nutrice, la sacralità del corpo e della terra,
  // la sovranità del nutrimento autonomo e il potere di trasmutare il lutto.
  // =========================================================================
// Bozza di BODIES.Ceres per calcolatore-corpi-dict.js
  BODIES.Ceres = {
  signs: {
    Aries: {
      title: 'Cerere in Ariete — L’Auto-Nutrimento Fiero e l’Autonomia della Cura',
      text: "L'archetipo della grande madre nutrice si esprime attraverso l'indipendenza, la rapidità d'azione e il rifiuto di dipendere da chiunque per la propria sussistenza vitale. Ti prendi cura della propria persona e di chi ami incoraggiando la forza, l'attività fisica e la capacità di difendersi da soli nel mondo. Non sopporti i ricatti sentimentali basati sul bisogno indotto. Il limite è l'impazienza con la fragilità: irritarsi davanti alla lentezza altrui o pretendere che chi sta male si rimetta in piedi all'istante, dimenticando il valore dei tempi lenti di convalescenza.",
      sintesi: "Nutrimento fondato sull'autonomia e sull'azione vigorosa; l'insidia è l'insofferenza verso i tempi fisiologici di ripresa."
    },
    Taurus: {
      title: 'Cerere in Toro — L’Abbondanza Feconda e la Santità della Terra',
      text: "Cerere trova nel Toro una consonanza naturale profonda: il nutrimento passa attraverso la tavola imbandita, il contatto sensoriale con la terra, la cura delle piante e la sicurezza economica tangibile. Sai creare ambienti domestici rigogliosi e accoglienti in cui il corpo ritrova immediatamente pace e ristoro. Possiedi un talento innato per l'agricoltura, la cucina e la conservazione delle risorse. La trappola coincide con il possesso soffocante: identificare l'amore con il controllo materiale o usare il cibo e il denaro come strumenti per legare a sé i propri cari.",
      sintesi: "Cura radicata nell'abbondanza dei frutti della terra; l'ombra è il controllo possessivo esercitato attraverso le risorse materiali."
    },
    Gemini: {
      title: 'Cerere in Gemelli — Il Pane della Parola e la Condivisione delle Idee',
      text: "La cura e il nutrimento si manifestano attraverso lo stimolo intellettuale, la conversazione vivace, la lettura e lo scambio continuo di informazioni utili. Ti prendi cura delle persone ascoltando i loro dubbi, offrendo libri, spiegazioni chiare o contatti preziosi capaci di sbloccare una situazione stagnante. Educhi con tratto leggero e brillante. Il pericolo risiede nell'intellettualizzazione del dolore: offrire spiegazioni logiche e nozioni a chi avrebbe semplicemente bisogno di un abbraccio affettuoso e di un silenzio partecipe.",
      sintesi: "Nutrimento attraverso il sapere e il dialogo; il limite è scambiare la spiegazione mentale per vicinanza affettiva."
    },
    Cancer: {
      title: 'Cerere in Cancro — Il Grembo Primordiale e la Protezione del Focolare',
      text: "L'energia di Cerere tocca qui il vertice dell'istinto materno e protettivo: la cura dell'altro è viscerale, avvolgente, capace di percepire la fame emotiva e fisica altrui prima ancora che venga espressa a parole. Sai creare un nido caldo dove chiunque si sente al sicuro dalle intemperie della vita. C'è una dedizione affettiva commovente. L'ombra è l'iperprotettività asfissiante: impedire ai figli o al partner di crescere e sbagliare, vivendo ogni normale passo verso l'autonomia come un tradimento o un abbandono intollerabile.",
      sintesi: "Cura materna totale e accoglienza emotiva profonda; la fatica è accettare che chi amiamo debba spiegare le ali da solo."
    },
    Leo: {
      title: 'Cerere in Leone — La Regalità Generosa e la Celebrazione della Vita',
      text: "Il nutrimento assume i toni magnanimi della festa solare: ti prendi cura degli altri infondendo coraggio, celebrando i loro successi con orgoglio sincero e offrendo doni splendidi che scaldano il cuore. Desideri che chi ami si senta speciale, ammirato e incoraggiato a esprimere il proprio talento unico. C'è una nobiltà protettiva grandiosa. L'insidia risiede nella pretesa di gratitudine: sentirsi offesi se il proprio impegno generoso non viene riconosciuto con tributi di devozione, cadendo in un broncio regale che gela l'atmosfera.",
      sintesi: "Nutrimento caloroso che accende la fiducia nel talento; il rischio è pretendere riconoscenza e lodi continue per la propria dedizione."
    },
    Virgo: {
      title: 'Cerere in Vergine — La Cura Artigianale e la Scienza del Benessere Organico',
      text: "Cerere opera con maestria impeccabile nel campo della nutrizione sana, delle terapie naturali, dell'igiene del corpo e della gestione ordinata della casa. Ti prendi cura del prossimo attraverso servizi pratici insostituibili, preparando rimedi efficaci, organizzando la quotidianità e vigilando con attenzione affettuosa sulla salute di tutta la famiglia. Sei un pilastro operativo. Il limite è la critica ansiosa: trasformare la sollecitudine in un elenco continuo di rimproveri e divieti, facendo sentire chi ti sta accanto costantemente inadeguato o sotto esame.",
      sintesi: "Dedizione pratica impeccabile e cura della salute; il difetto è l'ansia del controllo igienico che toglie spontaneità al vivere."
    },
    Libra: {
      title: 'Cerere in Bilancia — L’Armonia dell’Accoglienza e l’Equità nel Dare e Ricevere',
      text: "La funzione di cura si esprime attraverso la grazia estetica, l'ascolto pacificatore e la ricerca costante di un perfetto equilibrio tra i bisogni propri e quelli altrui. Sai creare ambienti armoniosi, curati nei dettagli visivi e nei toni di voce, dove le persone ritrovano serenità dopo le tensioni quotidiane. Pretendi che nelle relazioni l'attenzione sia reciproca. La difficoltà consiste nella dipendenza dal compiacere: faticare a dire di no per paura di incrinare la pace della convivenza, accumulando risentimenti silenziosi per il troppo dare non corrisposto.",
      sintesi: "Nutrimento mediato dall'armonia e dall'ascolto paritario; la trappola è non saper porre limiti fermi alle pretese altrui."
    },
    Scorpio: {
      title: 'Cerere in Scorpione — Il Patto di Demetra negli Inferi e la Cura nell’Ombra',
      text: "L'archetipo materno affronta il mito del lutto, della perdita e della trasformazione radicale dei legami. Sai prenderti cura di chi sta attraversando momenti devastanti, lutti, fallimenti o rinascite psicologiche complesse, offrendo una presenza lucida e coraggiosa che non ha paura di guardare negli occhi il dolore. Possiedi un potere di rigenerazione psichica formidabile. L'ombra è il ricatto viscerale del dolore: trattenere le persone amate attraverso il senso di colpa, ricordando continuamente i sacrifici immensi compiuti per salvarle dall'abisso.",
      sintesi: "Sostegno potente nelle crisi estreme e cura dell'anima ferita; il pericolo è usare la memoria dei sacrifici come catena emotiva."
    },
    Sagittarius: {
      title: 'Cerere in Sagittario — Il Nutrimento della Speranza e l’Espansione dell’Anima',
      text: "La cura si traduce in apertura di orizzonti, entusiasmo contagioso e incoraggiamento morale a intraprendere grandi viaggi ed esplorazioni filosofiche. Ti prendi cura degli altri offrendo una prospettiva fiduciosa sul futuro, condividendo la saggezza appresa nelle tue avventure e nutrendo lo spirito con cibi esotici e visioni elevate. C'è una generosità calorosa e ottimista. L'insidia è la superficialità dogmatica: elargire massime edificanti e prediche paternalistiche a chi avrebbe bisogno di un sostegno pratico e tangibile nelle difficoltà quotidiane.",
      sintesi: "Nutrimento dello spirito e fiducia nel destino; il limite è rifugiarsi nelle prediche astratte quando serve aiuto pratico."
    },
    Capricorn: {
      title: 'Cerere in Capricorno — La Frugalità Protettiva e la Garanzia delle Riserve',
      text: "Il nutrimento non si disperde in effusioni sentimentali ma si incarna nella responsabilità solida, nella disciplina economica e nella capacità di assicurare la sopravvivenza del clan anche negli inverni più rigidi. Insegni a chi ami a diventare forte, autonomo e capace di reggersi sulle proprie gambe, offrendo una protezione incrollabile nei momenti di crisi reale. Sei la garanzia della continuità. L'ombra è l'aridità punitiva: razionare l'affetto e il calore emotivo considerandoli debolezze, inducendo nei familiari un continuo senso di colpa e debito morale.",
      sintesi: "Protezione solida e costruzione di riserve durature; la debolezza è la severità frugale che nega la tenerezza quotidiana."
    },
    Aquarius: {
      title: 'Cerere in Acquario — La Cura Fraterna e la Solidarietà Senza Barriere',
      text: "L'archetipo di Cerere si allarga oltre i confini ristretti della famiglia biologica per abbracciare la collettività, gli amici e le cause sociali d'avanguardia. Ti prendi cura delle persone offrendo loro spazi di libertà, rispettando la loro diversità e promuovendo forme di alimentazione etica, ecologica e sostenibile per l'intero pianeta. Credi in una comunità basata sulla cooperazione reciproca. La difficoltà risiede nel distacco dalle esigenze personali: dedicare tempo ed energie a grandi progetti umanitari dimenticando i bisogni d'affetto di chi ti vive accanto.",
      sintesi: "Solidarietà comunitaria e nutrimento etico; l'errore è trascurare i bisogni intimi delle persone care per inseguire ideali lontani."
    },
    Pisces: {
      title: 'Cerere in Pesci — La Compassione Sacra e la Grazia dell’Accoglienza Universale',
      text: "La funzione nutrice non conosce confini egoici: si manifesta come una dedizione sconfinata e compassionevole verso chiunque soffra, verso gli animali indifesi e verso le creature dimenticate dal mondo. Sai offrire un conforto silenzioso che scioglie i dolori più antichi con un semplice gesto di grazia spirituale. C'è una maternità universale disinteressata. Il rischio evidente è l'esaurimento sacrificale: farsi dissanguare da persone parassite, trascurando completamente il proprio sostentamento fisico fino ad ammalarsi per troppo amore indifferenziato.",
      sintesi: "Compassione oceanica e cura disinteressata dei sofferenti; la sfida vitale è proteggere le proprie riserve per non autodistruggersi."
    }
  },

  houses: {
    1: {
      title: 'Cerere in Prima Casa — La Presenza Nutriente e la Sovranità del Corpo',
      text: "L'impatto con l'esterno emana un'energia accogliente, protettiva e rassicurante che ispira fiducia immediata in chiunque si avvicini. Il rapporto con il proprio corpo e con il diritto di essere nutriti con dignità è al centro della traiettoria vitale: hai dovuto imparare in prima persona a concederti cura e riposo senza sentirti in colpa. Possiedi una vitalità feconda che irradia salute e forza terrena. La trappola è il martirio materno precoce: assumere il ruolo di madre o protettore di tutti fin da piccoli, dimenticando di ascoltare le proprie personali necessità fisiche.",
      sintesi: "Presenza rassicurante e feconda alla soglia del mondo; il compito è imparare a nutrire se stessi prima di curare gli altri."
    },
    2: {
      title: 'Cerere in Seconda Casa — L’Abbondanza Feconda e la Sovranità Materiale',
      text: "La sicurezza e la percezione del proprio valore si radicano nella capacità autonoma di produrre, gestire e far fruttificare le risorse terrene con metodo fecondo. Trovi profonda serenità nel contatto con la terra, nella cucina sana e nella cura oculata del tuo patrimonio, rifiutando di dipendere dai sussidi altrui. C'è un talento eccezionale nell'amministrazione dei beni tangibili. L'ombra è l'ansia della penuria: vivere con il terrore viscerale che le provviste possano esaurirsi, trasformando la parsimonia equilibrata in un accumulo difensivo che impedisce di godere del benessere.",
      sintesi: "Prosperità terrena costruita con amore e metodo; il limite è l'angoscia della scarsità che pietrifica la generosità."
    },
    3: {
      title: 'Cerere in Terza Casa — La Parola che Nutre e l’Insegnamento Fecondo',
      text: "La cura e la sollecitudine si manifestano attraverso l'istruzione primaria, il consiglio pratico, la parola incoraggiante e lo scambio caloroso con l'ambiente circostante. Nelle relazioni con fratelli e vicini assumi un ruolo protettivo e mediatore, diffondendo saperi utili legati all'ecologia, alla salute e al buon vivere comune. Sei un insegnante accogliente ed empatico. La debolezza è l'ansia verbale protettiva: intervenire continuamente con consigli non richiesti nelle faccende quotidiane degli altri, soffocando la loro autonomia decisionale.",
      sintesi: "Educazione empatica e parole capaci di rassicurare; l'insidia è l'eccesso di sollecitudine verbale che diventa invadenza."
    },
    4: {
      title: 'Cerere in Quarta Casa — Il Santuario del Focolare e la Salvaguardia delle Radici',
      text: "Cerere dimora nella propria sede naturale di terra interiore: la casa è concepita come un grembo sacro, provvisto di ogni conforto materiale ed emotivo per chi vi trova rifugio. C'è un legame viscerale con la terra d'origine e con la cucina tradizionale della propria genealogia, accompagnato dal desiderio di proteggere le memorie della stirpe da ogni violazione esterna. Sei il cuore pulsante della dimora. Il rischio risiede nel nido claustrofobico: creare un ambiente così protettivo da rendere traumatico qualsiasi allontanamento dei familiari verso il mondo adulto.",
      sintesi: "Focolare domestico ricco di calore e nutrimento arcaico; la prova è lasciare che i propri cari escano dal nido senza sensi di colpa."
    },
    5: {
      title: 'Cerere in Quinta Casa — La Fecondità Creativa e la Gioia di Nutrire l’Arte',
      text: "L'energia materna e nutriente si riversa nella creazione artistica, nell'educazione gioiosa della prole e nella celebrazione del piacere carnale vissuto come dono sacro della vita. Se ti dedichi a un'opera lo fai con la pazienza e l'amore con cui si coltiva un giardino prezioso, donando forma a creazioni ricche di vitalità sensoriale. Con i figli esprimi una dedizione generosa e affettuosa. L'insidia è il legame possessivo con le proprie opere: rifiutarsi di lasciar camminare i progetti con le proprie gambe per paura che perdano la loro purezza iniziale.",
      sintesi: "Creatività rigogliosa e amore appassionato per i propri frutti; il nodo è non trattenere le creazioni nella propria orbita esclusiva."
    },
    6: {
      title: 'Cerere in Sesta Casa — Il Servizio alla Terra e la Maestria del Benessere Quotidiano',
      text: "La dedizione quotidiana, l'igiene organica, l'alimentazione naturale e la cura degli animali trovano in questo settore la loro massima efficacia applicativa. Trovi la tua realizzazione nel rendere efficiente, sano e armonioso l'ambiente lavorativo proprio e dei colleghi, vigilando con perizia su ogni dettaglio della routine fisiologica. Sei una presenza curatrice indispensabile nella comunità. La trappola è il logorio operativo da perfezionismo: assumersi il carico materiale di tutto l'ufficio fino a sacrificare la propria salute per compiere il dovere.",
      sintesi: "Servizio impeccabile e cura della salute corporea; la salvezza esige di non sacrificare il proprio organismo al dovere continuo."
    },
    7: {
      title: 'Cerere in Settima Casa — Il Nutrimento Reciproco nel Patto di Coppia',
      text: "La sfera delle unioni matrimoniali e dei contratti paritari è fondata sulla cura reciproca, sull'accoglienza calorosa e sul sostegno concreto nei momenti di difficoltà terrena. Cerchi un compagno con cui condividere la gestione della casa e dei beni con assoluta lealtà e reciprocità di premure affettive. I tuoi accordi sono improntati alla generosità. L'ombra è la sindrome della crocerossina: legarsi a partner bisognosi di assistenza continua, confondendo la cura materna con l'amore di coppia e finendo per sentirsi svuotati di energia.",
      sintesi: "Patti basati sulla reciproca sollecitudine e cura paritaria; il pericolo è fare da genitore al partner annullando l'eros."
    },
    8: {
      title: 'Cerere in Ottava Casa — Il Lutto Trasmutato e la Rinascita dalle Perdite',
      text: "L'archetipo di Demetra sperimenta la discesa negli inferi per recuperare la figlia perduta: la vita ti chiama ad affrontare prove di separazione dolorosa, perdite patrimoniali o trasformazioni radicali dei legami intimi. Possiedi la capacità quasi miracolosa di far rinascere la fecondità e l'abbondanza proprio dove sembrava regnare la devastazione più nera, offrendo sostegno psicologico a chi affronta grandi lutti. La trappola è il ricatto dell'angoscia: trattenere le persone amate con la minaccia inconscia che una loro partenza causerebbe la tua morte spirituale.",
      sintesi: "Rinascita della fecondità dopo grandi prove di lutto; la forza suprema si manifesta nel saper lasciare andare senza distruggersi."
    },
    9: {
      title: 'Cerere in Nona Casa — La Fede nella Madre Terra e l’Ospitalità Universale',
      text: "La visione filosofica della vita si nutre del rispetto per le leggi della natura, dell'ecologia planetaria e dell'ospitalità sacra verso i viaggiatori di ogni terra. Cerchi una spiritualità radicata nella materia vivente, celebrando i cicli delle stagioni e diffondendo una cultura della cura che supera ogni frontiera geografica o confessionale. Accogli e orienti con calore chi cerca una direzione. L'insidia risiede nel paternalismo dottrinale: pretendere di sapere cosa sia meglio per la crescita spirituale altrui, imponendo le proprie ricette etiche con eccessiva intransigenza.",
      sintesi: "Sapienza della terra e accoglienza senza confini; il limite è voler imporre la propria visione ecologica come dogma assoluto."
    },
    10: {
      title: 'Cerere in Decima Casa — L’Autorità Protettiva e la Cura del Bene Pubblico',
      text: "La vocazione professionale e il ruolo sociale sono motivati dal desiderio profondo di proteggere e nutrire la comunità: ti affermi in ruoli di leadership legati all'alimentazione, alla sanità, all'ambiente o alla difesa dei diritti dei lavoratori. La tua autorità è rispettata perché fondata su una dirittura etica incorruttibile e su una dedizione autentica al benessere di chi ti è affidato. Sei una guida autorevole e protettiva. Il rischio risiede nell'eccesso di carichi istituzionali: sentirsi l'unico garante del bene comune, esaurendo le proprie forze per dovere pubblico.",
      sintesi: "Leadership protettiva e dedizione al bene della collettività; la cura esige di non farsi schiacciare dalle responsabilità sociali."
    },
    11: {
      title: 'Cerere in Undicesima Casa — La Rete Solidale e l’Alimentazione del Futuro',
      text: "I legami di gruppo e le appartenenze ideali traggono linfa dalla volontà di costruire una convivenza più giusta, solidale e rispettosa dei beni comuni e delle risorse naturali. Partecipi a cooperative, banche del cibo, comunità energetiche o reti ecologiche d'avanguardia che lavorano per l'emancipazione dei più deboli attraverso la redistribuzione equa della ricchezza terrena. Lotti al fianco degli altri con generosità fidata. L'ostacolo è la delusione di fazione: soffrire amaramente quando i membri del gruppo mostrano egoismi ordinari che infrangono l'ideale comunitario.",
      sintesi: "Reti solidali e cooperazione per la tutela dei beni comuni; il nodo è non lasciarsi scoraggiare dalle umane meschinità."
    },
    12: {
      title: 'Cerere in Dodicesima Casa — Il Nutrimento Silenzioso e la Compassione Invisibile',
      text: "Cerere opera nei luoghi di clausura, negli ospedali, negli istituti o nel segreto della meditazione solitaria: doni conforto materiale e spirituale a chi soffre al riparo da ogni visibilità mondana, senza chiedere alcuna lode per la tua carità. C'è una capacità enorme di risanare le ferite invisibili dell'anima attraverso la preghiera, il silenzio e la dedizione agli ultimi della terra. Sei una sentinella compassionevole. La vulnerabilità risiede nella solitudine del soccorritore: dimenticarsi di nutrire la propria carne terrena, scivolando nell'inedia emotiva per eccesso di sacrificio.",
      sintesi: "Carità silenziosa e nutrimento spirituale degli ultimi; la salvezza richiede di non dimenticare la cura della propria persona."
    }
  },

  dignities: {},

  combinations: {
    'Taurus|2': {
        title: "Cerere in Toro in Seconda Casa",
        canonico: "La collocazione di Cerere nel Toro e nella seconda casa esprime la più pura convergenza tra la funzione nutrice dell'asteroide e la fecondità organica della materia terrestre. La dottrina astrologica classica e contemporanea riconosce in tale configurazione la matrice dell'abbondanza generosa, della prosperità agraria e della capacità sapiente di preservare le risorse senza speculazioni parassitarie. Chi detiene tale contrassegno possiede un senso infallibile per il valore degli alimenti, dei beni tangibili e della parsimonia operosa, creando attorno alla propria persona un'oasi di nutrimento fecondo che resiste alle carestie esterne. I rischi consueti toccano l'avarizia conservatrice, il panico della penuria che spinge ad accumulare provviste inutili e la manipolazione affettiva mediante il cibo o il denaro. I granai sigillati con troppa cura attirano parassiti e roditori: la ricchezza accumulata per sfuggire al tempo perde fragranza e vitalità se non si rinnova attraverso il commercio aperto e l'ospitalità festosa.",
        lilithiano: "Cresci con la persuasione che per trovare sicurezza dovevi stringere i pugni, serrare le madie e dimostrare di bastare unicamente alle tue forze per non rischiare di morire di fame nel disinteresse generale. L'ansia atavica delle generazioni contadine trasformava la tavola in una contabilità affannosa, negando il diritto alla gratuità e al piacere disinteressato.\n\nLilith si accomoda alla tua mensa per scacciare l'angoscia della carestia: questa terra è madre generosa e il tuo corpo ha pieno diritto di goderne i frutti con dignità regale. Non devi pagare alcun tributo di servitù né piegare la schiena per meritare il tuo sostentamento. Il tuo potere supremo non è chiuso nei forzieri blindati, ma nelle tue mani operose che sanno far germogliare la vita ovunque si posino. Rifiuta con fierezza chiunque cerchi di usare il pane come arma di ricatto morale sulla tua autonomia.\n\nPossiedi una saggezza della materia che pochissimi conoscono: sai custodire la fertilità senza incatenare nessuno e sai come nutrire chi ami lasciandolo interamente libero. Un animo pacificato con le leggi del suolo sparge le sementi a piene mani: la vera prosperità fiorisce luminosa proprio dove si estingue la paura della carestia.",
        sintesi: "Cerere in seconda casa in Toro: nutrimento sovrano e abbondanza terrena che si compiono liberandosi dall'incubo della carestia."
      },
    'Virgo|6': {
        title: "Cerere in Vergine in Sesta Casa",
        canonico: "Nel segno della Vergine e nel sesto settore dell'oroscopo, Cerere trova una collocazione di straordinaria affinità elementale, legando il principio dell'accudimento alla cura minuziosa dei corpi, all'igiene quotidiana e all'etica del lavoro artigianale. La trattatistica astrologica scorge in questa posizione la devozione operosa che sa discernere ciò che nutre da ciò che intossica, elaborando protocolli di servizio e terapie naturali di grande precisione. Chi presenta tale configurazione manifesta una vocazione instancabile per il riordino dei processi biologici e per l'assistenza metodica ai bisogni della comunità. Le ombre canoniche si manifestano nell'ansia ossessiva per la purezza, nel criticismo sterilizzante verso i minimi difetti dell'ambiente circostante e nel rischio di un servilismo logorante che sacrifica il piacere vitale sull'altare delle mansioni d'ufficio. La mania della bonifica assoluta trasforma l'orto in un deserto sterile: la terra e il corpo conservano salute duratura solo finché l'agricoltore accetta l'esistenza dell'erba selvatica e del mistero che nutre la zolla.",
        lilithiano: "Ti chiedevano di funzionare come un orologio impeccabile, facendoti intendere che ogni sbavatura, imperfezione o momento di stanchezza fosse un fallimento imperdonabile. I giudizi familiari pesavano su ogni gesto quotidiano come un esame di idoneità perenne, legando l'affetto all'efficienza del servizio prestato.\n\nLilith entra nella tua officina quotidiana e spezza la morsa del dovere cieco: il tuo valore primordiale non si misura dal numero di fardelli che riesci a portare senza gemere. Servire non significa farsi calpestare da chi approfitta della tua dedizione. La sapienza dei ritmi biologici non è una condanna alla servitù volontaria, ma un potere sacro che appartiene anzitutto alla custodia della tua integrità. Quando impari a dire un rifiuto categorico a mansioni umilianti, trasformi il lavoro in un atto regale di sovranità.\n\nC'è nella tua mente un discernimento limpido e una perizia diagnostica che nessun inganno può confondere: sai distinguere il grano dal loglio e individuare con sguardo infallibile il rimedio che restituisce vigore alla terra esausta. L'ordine fecondo non ha bisogno di carcerieri: mani sapienti governano i dettagli con sobria grazia, liberando la cura quotidiana dall'incubo del dovere servile.",
        sintesi: "Cerere nel domicilio vergineo della sesta casa: perizia artigianale e tutela meticolosa della vita che sbocciano disarmando l'ansia della perfezione servile."
      }
  },

  retrograde: {
    title: 'Cerere Retrograda — Il Ritiro Autonomo del Nutrimento Interiore',
    text: "L'accudimento cessa di essere una moneta di scambio o una prestazione dovuta per meritare l'accettazione familiare. Quando Cerere inverte la propria rotta celeste, la sorgente del sostentamento vitale si ritrae dal circuito dell'approvazione esterna: si impara a farsi grembo per se stessi, bonificando il rapporto con il corpo e con i ritmi biologici fondamentali. Questa posizione insegna a non mendicare calore da fonti aride e a rifiutare con fermezza ogni manipolazione affettiva mascherata da sollecitudine materna. Ne scaturisce una capacità solida di bastare a se stessi nei momenti di carestia relazionale. La chiusura autarchica resta lo scoglio maggiore: blindare la propria vita emotiva per il terrore che accogliere il nutrimento altrui significhi perdere la libertà.",
    sintesi: "Sostentamento sottratto al ricatto del dovere: farsi grembo sovrano per il proprio corpo e per la propria fame."
  }
};



BODIES.Pallas = {
  "signs": {
    "Aries": {
      "title": "Pallade in Ariete — L’Assalto Tattico Fulmineo e la Risoluzione Immediata",
      "text": "L'intelligenza strategica si coniuga con l'impulso primordiale dell'Ariete: non ti perdi in estenuanti pianificazioni teoriche, ma cogli al volo il punto debole dell'avversario e colpisci con precisione chirurgica prima che le difese si organizzino. C'è una brillantezza tattica nelle situazioni di emergenza che richiede decisioni fulminee. La mente opera come una lama affilata nel risolvere contese complesse. Il rischio è la fretta impulsiva: attaccare prima di aver verificato l'intera scacchiera, sottovalutando la resistenza di fortificazioni nemiche ben radicate.",
      "sintesi": "Strategia rapida e risoluzione fulminea dei conflitti; l'insidia è la fretta che trascura i piani a lungo termine."
    },
    "Taurus": {
      "title": "Pallade in Toro — La Difesa Inespugnabile delle Posizioni Terrene",
      "text": "La visione strategica di Pallade si ancora alla materia, alla gestione patrimoniale e alla conservazione ostinata del terreno conquistato. Non cedi a provocazioni verbali effimere: preferisci fortificare i tuoi confini economici, ottimizzare la produzione e attendere con pazienza incrollabile che l'avversario esaurisca le sue scorte in assalti inutili. C'è un'intelligenza artigianale e finanziaria solidissima. La trappola è la rigidità tattica: rifiutarsi di modificare una strategia consolidata anche quando il contesto esterno è radicalmente mutato.",
      "sintesi": "Resistenza strategica e protezione metodica delle risorse; l'ostacolo è l'immobilismo davanti alle novità del mercato."
    },
    "Gemini": {
      "title": "Pallade in Gemelli — L’Agilità Dialettica e il Riconoscimento degli Schemi",
      "text": "La dea della saggezza esprime qui una straordinaria abilità nel decifrare codici, collegare dati eterogenei e vincere le dispute attraverso una logica brillante e disarmante. Giochi d'anticipo muovendo le pedine del linguaggio, dell'informazione e delle alleanze trasversali con una scioltezza da grande scacchista. Negozi con perizia innata, sbloccando trattative apparentemente compromesse. Il limite è l'eccesso di sofismi: complicare inutilmente i problemi con bizantinismi dialettici che disorientano gli alleati e allontanano la concretezza dell'azione.",
      "sintesi": "Intelligenza tattica e decifrazione brillante dei codici; il pericolo è perdersi nei labirinti della pura retorica."
    },
    "Cancer": {
      "title": "Pallade in Cancro — La Protezione Intelligente del Clan e l’Intuito Tattico",
      "text": "La strategia militare e civile si mette al servizio della salvaguardia del focolare intimo, della genealogia e dei legami affettivi primari. Possiedi un intuito psicologico formidabile che percepisce le minacce nascoste prima che diventino visibili, difendendo la privacy e la sicurezza della famiglia con astuzia e tenacia incrollabile. Sai creare reti protettive invisibili. L'ombra è la sindrome della fortezza assediata: vedere nemici e congiure ovunque, isolando i propri cari in un recinto difensivo che impedisce il sano confronto con il mondo esterno.",
      "sintesi": "Strategia protettiva guidata dall'intuito affettivo; il nodo è non trasformare la tutela del clan in paranoia persecutoria."
    },
    "Leo": {
      "title": "Pallade in Leone — La Maestria Drammaturgica e la Leadership Ispirata",
      "text": "La tattica politica e creativa assume una dimensione monumentale e scenografica: sai che l'autorità si consolida non solo con la logica ma con il carisma visivo, la dignità del portamento e la capacità di ispirare le masse attraverso grandi simboli. Governi i conflitti a testa alta, disdegnando i colpi bassi e costringendo gli avversari a confrontarsi su un terreno di lealtà regale. Sei un regista straordinario della vita pubblica. Il trabocchetto coincide con l'orgoglio vulnerabile: rifiutare un ripiegamento strategico necessario per non macchiare la propria reputazione di sovrano invitto.",
      "sintesi": "Comando carismatico e regia grandiosa dei progetti; il rischio è l'ostinazione dell'ego che rifiuta le ritirate strategiche."
    },
    "Virgo": {
      "title": "Pallade in Vergine — La Precisione Chirurgica e la Bonifica dei Sistemi",
      "text": "Pallade raggiunge qui la massima efficacia nell'analisi dei processi, nell'ottimizzazione organizzativa e nella soluzione di problemi tecnici complessi. Riconosci la minima imperfezione strutturale in un progetto e individui la mossa correttiva con un'economia di mezzi impareggiabile: nessun movimento è superfluo, nessuna risorsa viene sprecata. C'è una lucidità terapeutica e ingegneristica d'eccellenza. Il pericolo è l'ipercritica paralizzante: focalizzarsi a tal punto sui singoli dettagli difettosi da perdere di vista l'obiettivo strategico generale.",
      "sintesi": "Precisione tecnica impeccabile e bonifica dei processi; l'insidia è farsi assorbire dal microscopico perdendo la visione d'insieme."
    },
    "Libra": {
      "title": "Pallade in Bilancia — La Giustizia Forense e l’Arbitrato Imparziale",
      "text": "L'asteroide della saggezza incarna l'ideale della giustizia equanime, della mediazione forense e della conciliazione dei contrari senza spargimento di sangue. Comprendi che la vittoria più duratura non distrugge il nemico ma lo trasforma in un alleato attraverso patti impeccabili fondati sul reciproco vantaggio e sulla simmetria dei diritti. Sei l'arbitro supremo nelle grandi controversie civili. La debolezza è l'eccesso di diplomazia: voler accontentare tutte le parti in causa fino a snaturare la decisione necessaria, rimandando all'infinito il verdetto definitivo.",
      "sintesi": "Arbitrato forense sublime e arte del negoziato; il difetto è l'esitazione a tagliare i nodi per preservare una pace apparente."
    },
    "Scorpio": {
      "title": "Pallade in Scorpione — La Guerra Psicologica Lucida e l’Infiltrazione nell’Ombra",
      "text": "La strategia si immerge negli abissi dell'inconscio, delle dinamiche segrete di potere e dello smascheramento delle corruzioni occulte. Sei capace di sostenere battaglie psicologiche prolungate nell'ombra senza mai scoprire le tue carte, anticipando le manovre nemiche con un sesto senso investigativo implacabile. Nessun ricatto può farti vacillare. La tentazione mortale è l'uso cinico dell'astuzia: orchestrare vendette sotterranee o manipolare le fragilità dell'avversario solo per il gusto del dominio occulto, logorando la propria purezza etica.",
      "sintesi": "Intelligenza investigativa profonda e strategia negli abissi; la virtù chiede di non fare del sospetto un'arma distruttiva."
    },
    "Sagittarius": {
      "title": "Pallade in Sagittario — La Visione Giuridica Universale e la Strategia Globale",
      "text": "La mente tattica abbraccia orizzonti geopolitici, filosofici e di diritto internazionale: concepisci strategie di vasto respiro capaci di unire popoli distanti attorno a valori condivisi di libertà e sapienza. Non ti accontenti di vittorie di corto raggio, ma progetti alleanze che influenzeranno le generazioni a venire, difendendo la causa della giustizia con un'eloquenza ispirata e contagiosa. C'è una nobiltà etica illuminata. L'ombra è il dogmatismo morale: pretendere che la propria visione etica sia universalmente valida, trascurando le peculiarità culturali concrete dei singoli territori.",
      "sintesi": "Strategia globale e visione giuridica dei popoli; il limite è l'astrazione idealistica che sottovaluta gli attriti locali."
    },
    "Capricorn": {
      "title": "Pallade in Capricorno — L’Ingegneria Istituzionale e la Pazienza del Tempo",
      "text": "L'intelletto strategico opera con la freddezza e la solidità delle grandi pietre angolari: studi l'architettura delle istituzioni, i regolamenti statali e i meccanismi del comando per costruire riforme durature capaci di resistere a qualsiasi terremoto politico. La tua pazienza tattica è inesauribile: sai pianificare le tappe del successo nell'arco di decenni senza mai tradire il tuo obiettivo finale. Sei l'eminenza grigia incorruttibile. Il rischio è la rigidità autoritaria: costruire sistemi burocratici così ferrei da soffocare la creatività individuale e l'umanità dei collaboratori.",
      "sintesi": "Architettura istituzionale solida e visione a lungo termine; la trappola è la burocrazia inflessibile che soffoca la vita."
    },
    "Aquarius": {
      "title": "Pallade in Acquario — L’Invenzione Sociale e la Progettazione di Reti Orizzontali",
      "text": "Pallade sposa la causa dell'avanguardia tecnologica, della democrazia paritaria e della risoluzione innovativa delle crisi civili. Progetti strutture sociali orizzontali, open source e prive di centri di comando piramidali, convinti che l'intelligenza collettiva sia superiore a qualsiasi decisione verticistica imposta dall'alto. C'è una lucidità rivoluzionaria pacifica e brillante. L'ostacolo è l'utopismo distaccato: innamorarsi di schemi teorici perfetti che funzionano sulla carta ma che non tengono conto delle bassezze emotive e dei limiti umani della realtà.",
      "sintesi": "Innovazione sociale d'avanguardia e reti tra pari; la fatica è calare i sistemi ideali nelle imperfezioni del quotidiano."
    },
    "Pisces": {
      "title": "Pallade in Pesci — La Risoluzione Olistica e la Grazia che Disinnesca il Conflitto",
      "text": "La strategia trascende la logica cartesiana per abbracciare l'intuizione non lineare, la diplomazia empatica e la capacità di disarmare l'avversario togliendogli il bersaglio del conflitto. Comprendi che la vera vittoria consiste nel dissolvere le ragioni stesse della contesa attraverso il perdono, la musica, l'arte e la compassione universale. Sai muoverti nelle situazioni nebulose con una grazia che confonde chi si affida solo alla forza bruta. Il limite è la passività evasiva: fuggire dalle contese necessarie scambiando la debolezza remissiva per saggezza spirituale.",
      "sintesi": "Strategia intuitiva che dissolve le contese per compassione; il pericolo è cedere il passo all'ingiustizia per timore del contrasto."
    }
  },
  "houses": {
    "1": {
      "title": "Pallade in Prima Casa — Lo Sguardo Strategico e l’Autorità Mentale sul Volto",
      "text": "La persona si presenta al mondo con uno sguardo penetrante, vigile e straordinariamente intelligente che analizza ogni dettaglio dell'ambiente in una frazione di secondo. Comunichi un'autorevolezza mentale innata che scoraggia i tentativi di inganno o prepotenza da parte di chi ti incontra: le tue parole sono soppesate, taglienti e prive di fronzoli superficiali. Possiedi la presenza del guerriero pacifico che vince prima ancora di combattere. La trappola è l'ipervigilanza corporale: restare costantemente tesi in assetto difensivo, temendo che qualsiasi rilassamento possa esporre a un attacco.",
      "sintesi": "Presenza penetrante e autorevolezza strategica impressa sul volto; la lezione è imparare a deporre la corazza mentale."
    },
    "2": {
      "title": "Pallade in Seconda Casa — L’Ingegno Patrimoniale e l’Architettura delle Risorse",
      "text": "La sicurezza materiale e la gestione delle proprie finanze sono governate da una logica pianificatoria impeccabile: sai come far fruttificare i tuoi risparmi, ideare fonti alternative di reddito e proteggere il patrimonio da crisi bancarie con manovre oculate e tempestive. Non ti lasci sedurre da speculazioni facili, preferendo investire in beni strategici e competenze tecniche durature. C'è un talento eccellente nell'amministrazione autonoma. La tentazione insidiosa è l'iper-razionalizzazione economica: subordinare ogni scelta esistenziale a criteri di pura convenienza tattica, negando spazio alla generosità spontanea.",
      "sintesi": "Gestione economica intelligente e difesa strategica dei beni; l'insidia è farsi guidare unicamente da calcoli utilitaristici."
    },
    "3": {
      "title": "Pallade in Terza Casa — La Parola Forense e la Precisione Geometrica del Pensiero",
      "text": "L'intelletto è uno strumento affilatissimo di argomentazione logica, analisi critica e abilità negoziale nella comunicazione quotidiana. Nelle discussioni non perdi mai il filo del discorso, smontando le tesi dell'avversario con eleganza matematica e citando fatti inconfutabili che non lasciano spazio a repliche. Nei rapporti con fratelli o vicini mantieni una dirittura equa e imparziale. Sei un saggista o un divulgatore eccezionale. Il rischio è l'aridità polemica: trattare ogni conversazione come un dibattito forense da vincere a ogni costo, raggelando l'intimità affettiva.",
      "sintesi": "Pensiero logico e parola persuasiva insuperabile; il pericolo è la freddezza dialettica che spegne la spontaneità dei rapporti."
    },
    "4": {
      "title": "Pallade in Quarta Casa — La Difesa Intelligente del Focolare e delle Radici",
      "text": "La strategia di Pallade presidia l'ambito domestico, la salvaguardia dell'abitazione e la bonifica delle memorie genealogiche. Sei colui che riorganizza gli spazi familiari con genialità architettonica, risolve liti ereditarie con lucidità imparziale e difende la pace delle mura domestiche da intrusioni esterne sgradite. C'è una protezione attenta e discreta delle proprie origini. La debolezza è la tendenza a governare la casa come una caserma o un tribunale: imporre regole razionali ferree alla vita intima, dimenticando che il calore umano ha bisogno di tolleranza e imperfezione.",
      "sintesi": "Tutela strategica della casa e risanamento dei conflitti familiari; la trappola è imporre un rigore domestico eccessivo."
    },
    "5": {
      "title": "Pallade in Quinta Casa — Il Gioco Scacchistico della Creazione e l’Arte Sovrana",
      "text": "La creatività, il corteggiamento e l'educazione sono vissuti come territori di maestria intellettuale e perizia tecnica raffinata. Se ti dedichi all'arte o alla drammaturgia lo fai con un rigore compositivo ammirevole, ideando opere strutturate con precisione geometrica che incantano per intelligenza e originalità. Nei giochi ami le sfide mentali, gli scacchi e le tattiche competitive pulite. Con i figli insegni l'autonomia di giudizio e il pensiero critico. L'ombra è la freddezza sentimentale: calcolare ogni mossa amorosa come in una partita, privando l'eros della sua naturale follia passionale.",
      "sintesi": "Creazione artistica magistrale e pensiero critico applicato al gioco; il limite è calcolare l'amore come una mossa di scacchi."
    },
    "6": {
      "title": "Pallade in Sesta Casa — La Bonifica Chirurgica delle Inefficienze Operative",
      "text": "Pallade risiede nel proprio ambiente di massima padronanza tecnica: il lavoro quotidiano, la sanità e l'ottimizzazione dei metodi operativi. Sei capace di prendere in mano un'azienda o un reparto disastrato e rimetterlo a nuovo in tempi rapidissimi, eliminando sprechi, snellendo procedure e creando protocolli di sicurezza esemplari. C'è una comprensione profonda della fisiologia corporea e delle terapie mirate. La trappola coincide con l'ossessione del controllo lavorativo: pretendere standard di perfezione disumani dai collaboratori, logorando i rapporti con un perfezionismo esasperante.",
      "sintesi": "Riorganizzazione impeccabile del lavoro e salute governata con saggezza; l'insidia è il perfezionismo che distrugge la serenità dei colleghi."
    },
    "7": {
      "title": "Pallade in Settima Casa — La Diplomazia Incorruttibile e il Negoziato Paritario",
      "text": "La sfera delle alleanze formali e del matrimonio è governata dal principio della giustizia contrattuale e del rispetto rigoroso della parità: cerchi un compagno con cui confrontarti intellettualmente ad armi pari, condividendo decisioni strategiche con lucidità e rispetto reciproco. Componi i conflitti con saggezza innata, risolvendo liti tra soci o coppie in crisi con formule negoziali impeccabili. La difficoltà consiste nell'intellettualizzare il legame: trasformare la convivenza in un negoziato perpetuo di diritti e doveri, dove ogni moto spontaneo del cuore viene sottoposto al vaglio della ragione forense.",
      "sintesi": "Alleanze paritarie e mediazione impeccabile dei conflitti; la fatica è non ridurre la relazione a un trattato diplomatico continuo."
    },
    "8": {
      "title": "Pallade in Ottava Casa — La Tattica Iniziatica nelle Crisi e nel Potere Occulto",
      "text": "La mente strategica si confronta con le dinamiche sotterranee del potere, della gestione dei patrimoni comuni e della risoluzione di crisi psicologiche estreme. Mantieni una calma imperturbabile nei momenti di tracollo, decifrando le congiure avversarie e negoziando accordi finanziari complessi con una freddezza che incute timore reverenziale. Indaghi con acume infallibile i segreti occulti. Il rischio è la tentazione del machiavellismo: usare la propria superiorità psicologica per manipolare gli altri nell'ombra, finendo per restare intrappolati nelle proprie stesse trame.",
      "sintesi": "Lucidità imperturbabile nelle crisi estreme e strategia occulta; il pericolo è cedere alla manipolazione machiavellica del potere."
    },
    "9": {
      "title": "Pallade in Nona Casa — La Visione Giuridica e la Sapienza delle Grandi Civiltà",
      "text": "L'intelletto si dedica agli studi giuridici, alla filosofia comparata, alle scienze politiche e alla difesa dei diritti civili a livello internazionale. Possiedi la statura del giurista illuminato o dell'ambasciatore culturale, capace di tessere ponti di intesa e cooperazione tra civiltà diverse attraverso la ricerca di principi morali universali. I tuoi viaggi sono esplorazioni intellettuali che ampliano la visione del mondo. L'ombra è l'astrazione accademica dogmatica: rifugiarsi in teorie perfette sulla giustizia universale disinteressandosi delle contese pratiche del proprio vicinato.",
      "sintesi": "Sapienza filosofica e difesa dei diritti civili universali; il limite è la lontananza accademica dai problemi reali della terra."
    },
    "10": {
      "title": "Pallade in Decima Casa — La Stratega delle Istituzioni e il Comando per Merito",
      "text": "La carriera mondana e il ruolo pubblico sono guidati da una pianificazione strategica di lungo corso, costruita su meriti professionali indiscutibili, competenza tecnica e rettitudine morale incorruttibile. Sei una guida ideale nei momenti di riorganizzazione istituzionale o politica, capace di prendere decisioni difficili con lucidità impeccabile e senza cedimenti emotivi. La tua reputazione pubblica è quella di un servitore supremo del bene comune. L'insidia è la solitudine al vertice: diventare un leader rispettato ma temuto, incapace di mostrare la propria vulnerabilità umana.",
      "sintesi": "Leadership istituzionale fondata sulla competenza e sul merito; la prova è non pietrificarsi nella freddezza del ruolo pubblico."
    },
    "11": {
      "title": "Pallade in Undicesima Casa — La Rete Tattica tra Pari e la Politica per il Futuro",
      "text": "L'intelligenza strategica si esprime all'interno di partiti, comitati civici, associazioni culturali e movimenti d'avanguardia sociale. Sei l'ideatore delle campagne, l'organizzatore delle alleanze orizzontali e il garante della democrazia interna al gruppo, capace di mantenere compatto il collettivo attorno a obiettivi di riforma civile duraturi. Credi nella forza del consenso informato tra pari. L'ostacolo è il fazionismo teorico: scontrarsi con compagni di lotta per minuscole divergenze procedurali, disperdendo energie preziose in battaglie ideologiche di corridoio.",
      "sintesi": "Progettazione di riforme collettive e alleanze strategiche tra pari; il nodo è non sprecare la visione in dispute di fazione."
    },
    "12": {
      "title": "Pallade in Dodicesima Casa — La Chiaroveggenza Silenziosa e la Difesa dell’Invisibile",
      "text": "Pallade opera nei territori reconditi dell'inconscio, dei sogni premonitori e delle battaglie condotte nell'ombra a protezione dei più deboli. Possiedi un'intuizione strategica sotterranea che anticipa le mosse avversarie prima che vengano concepite, agendo dietro le quinte con discrezione assoluta per sventare pericoli e proteggere istituzioni benefiche. Consigli nell'ombra con immenso valore strategico. Il pericolo è la sensazione di isolamento intellettuale: credere che nessuno possa comprendere la profondità della tua visione, rifugiandosi in un mutismo disilluso.",
      "sintesi": "Strategia sottile e protezione dei deboli nell'ombra; la sfida consiste nel non isolarsi nella disillusione silenziosa."
    }
  },
  "dignities": {},
  "combinations": {
    'Aquarius|11': {
        title: "Pallade in Acquario in Undicesima Casa",
        canonico: "La presenza di Pallade nell'Acquario e nell'undicesima casa esalta l'intelligenza tattica e la saggezza legislativa applicate ai grandi progetti di rinnovamento sociale e alla coordinazione dei movimenti collettivi. La dottrina vi individua la mente lungimirante delle riforme orizzontali, capace di scorgere geometrie di collaborazione inedite e di disinnescare gerarchie feudali attraverso un pensiero sistemico di rara audacia. Chi riceve questa impronta formula piani a lungo termine per federare talenti divergenti attorno a battaglie di civiltà, rifiutando compromessi clientelari. I pericoli tradizionali riguardano l'eccesso di teorizzazione astratta, la freddezza manipolatoria che riduce i legami a calcoli d'influenza e l'utopismo rigido che disprezza i tempi lenti della maturazione umana. La freddezza geometrica applicata ai destini collettivi rischia di generare apparati mostruosi: il progetto sociale conserva valore civile solo finché la pianificazione strategica si fa carico dei volti concreti dei singoli cittadini.",
        lilithiano: "Fin dai primi anni avverti lo sconcerto di fronte alle ipocrisie delle gerarchie costituite e ai patti tribali fondati sull'obbedienza cieca. Le fazioni politiche e i direttivi esigevano fedeltà cieca allo statuto, punendo come tradimento ogni proposta che sfuggisse al controllo dell'apparato.\n\nLilith accende la fiaccola della tua mente eretica e demolisce l'ansia di approvazione del gruppo: non sei al mondo per fare da ingranaggio sacrificabile nei progetti ambiziosi di consorterie opportuniste. La vera fratellanza nasce tra spiriti liberi che si riconoscono nell'autonomia reciproca, mai nell'omologazione forzata. La tua mente strategica è un'arma scintillante che non deve mai piegarsi al cinismo dei corridoi del potere: quando difendi i tuoi ideali senza scendere a patti con l'ipocrisia, disarticoli con disinvoltura i giochi di corte.\n\nPossiedi un colpo d'occhio visionario capace di anticipare i nodi cruciali della storia con largo anticipo: sai come unire voci disperse in una falange invincibile senza pretendere alcuna subordinazione personale. Un'intelligenza libera da tessere partitiche traccia geometrie di emancipazione autentica: le visioni concepite nell'indipendenza accendono sentieri che scardinano l'oppressione secolare.",
        sintesi: "Pallade nella visione dell'Acquario in undicesima casa: lungimiranza strategica e riforme libertarie che trionfano rifiutando il gelo dei calcoli opportunisti."
      },
    'Virgo|6': {
        title: "Pallade in Vergine in Sesta Casa",
        canonico: "L'allocazione di Pallade nella Vergine e nel sesto settore conferisce alla facoltà strategica un rigore metodico infallibile, fondato sull'analisi microscopica dei dettagli, sull'eccellenza peritale e sulla difesa impeccabile dei diritti nel campo del lavoro e della salute. Il sapere classico riconosce qui l'avvocatura delle cause complesse e l'ingegno organizzativo che smonta cavilli oppressivi tramite la padronanza perfetta delle norme e delle tecniche operative. La persona affronta ogni problema scomponendolo nelle sue componenti minime, senza cedere a suggestioni emotive o a scorciatoie fallaci. I difetti consueti registrati dalla tradizione toccano la paralisi analitica, il logoramento polemico sulle minuzie e la tendenza all'ipercritica vendicativa contro colleghi o sottoposti. La strategia che eccede nell'analisi minuta dei rischi finisce per mancare il momento propizio per l'azione: sul campo di battaglia come nei cantieri civili, la perfezione del piano non compensa l'esitazione dell'esecutore.",
        lilithiano: "Hai conosciuto presto l'amarezza di vedere l'eccellenza e la dedizione sfruttate da chi occupa posti di comando senza alcun merito reale. I colleghi indolenti e i superiori arroganti approfittavano della tua precisione chirurgica per scaricarti addosso il peso delle incombenze più complesse.\n\nLilith affila la lama della tua intelligenza e rovescia il tavolo dei compromessi umilianti: la tua meticolosità non è un dono da regalare ai parassiti del sistema. Non sei qui per correggere in silenzio i guasti prodotti dall'arroganza altrui né per accettare ruoli subalterni come se fossero un destino obbligato. Il tuo senso dell'ordine è una potenza investigativa tagliente: quando smetti di farti scudo con la riservatezza e affronti le ingiustizie a viso aperto, la tua logica ineccepibile fa tremare i padroni del vapore.\n\nConservi una lucidità peritale magistrale che non lascia scampo alle menzogne contrattuali o alle manipolazioni organizzative: smascheri gli abusi smontando ogni pretesto formale con la forza dei fatti documentati. Mettere la propria maestria al riparo dalle pretese dei tiranni è il supremo atto di giustizia: il rigore operativo si trasforma in un presidio inviolabile di libertà.",
        sintesi: "Pallade nel rigore della Vergine in sesta casa: acume analitico e difesa delle prerogative concrete che si affermano spezzando il ricatto del silenzio operoso."
      }
  },
  "retrograde": {
    "title": "Pallade Retrograda — La Strategia Segreta e l’Architettura Mentale Interiore",
    "text": "La scacchiera strategica viene allestita nel silenzio, dove l'occhio osserva le geometrie del conflitto senza intervenire anzitempo. Chi possiede Pallade retrograda non spreca il proprio ingegno in polemiche di facciata o contese da tribunale: studia le linee di frattura della realtà, individuando la falla strutturale nel dispositivo dell'avversario con freddezza millimetrica. L'intelligenza geometrica e la capacità di decodificare schemi complessi vengono impiegate prima di tutto per liberare la propria mente da condizionamenti ideologici. Si formula così un pensiero originale che non deve nulla ai manuali di partito. Uno sguardo troppo sospettoso scorge complotti ovunque, paralizzando l'azione per eccesso di calcolo difensivo.",
    "sintesi": "Decodifica millimetrica delle geometrie del conflitto: mente strategica che abbatte le trappole mentali nel silenzio."
  }
};


BODIES.Juno = {
  "signs": {
    "Aries": {
      "title": "Giunone in Ariete — L’Alleanza Guerriera e l’Indipendenza Fiera nella Coppia",
      "text": "L'asteroide dell'impegno relazionale incontra il fuoco primordiale dell'Ariete, chiedendo un'unione fondata sulla lealtà diretta, sulla parità di rango e sul rispetto assoluto dell'autonomia personale. Non tolleri partner sottomessi o dominanti: cerchi un compagno con cui combattere fianco a fianco, capace di sostenere confronti accesi senza nutrire rancori sotterranei. C'è un bisogno vitale di conservare la propria iniziativa individuale all'interno del vincolo nuziale. L'insidia è la conflittualità impulsiva: trasformare la relazione in un'arena di scontro continuo, rischiando di confondere la passione con la sopraffazione reciproca.",
      "sintesi": "Patto di lealtà fiera e passione guerriera; il rischio è fare della vita di coppia un costante campo di battaglia."
    },
    "Taurus": {
      "title": "Giunone in Toro — Il Patto Radicato e la Devozione Sensuale Tangibile",
      "text": "L'alleanza nuziale esige stabilità incrollabile, sicurezza patrimoniale e una profonda intesa dei sensi radicata nella materia confortevole. Intendi il matrimonio come una fortezza comune costruita su basi economiche solide, fedeltà indefessa e piccoli piaceri condivisi nel ritmo lento delle stagioni terrene. Doni una lealtà indistruttibile a chi dimostra costanza e affidabilità nel tempo. Sei una colonna portante della casa. La trappola è il possesso geloso: considerare il compagno come una propria esclusiva proprietà materiale, paralizzando la crescita del legame con l'ansia del cambiamento.",
      "sintesi": "Legame solido fondato su stabilità materiale e sensualità; la debolezza è la tendenza al possesso territoriale e avaro."
    },
    "Gemini": {
      "title": "Giunone in Gemelli — La Connessione Intellettuale e l’Intesa Verbale Eburnea",
      "text": "Il vincolo d'amore si accende e si consolida attraverso lo scambio mentale perenne, la complicità brillante e la condivisione di mille interessi culturali. Hai bisogno di un partner che sia anzitutto un interlocutore stimolante, un amico arguto con cui dialogare senza filtri, viaggiare e commentare le vicende del mondo con umorismo leggero. La noia intellettuale è il peggior veleno per l'intimità. C'è una freschezza gioiosa nel coltivare patti flessibili. Il punto fragile è l'inconsistenza affettiva: restare sulla superficie delle parole per fuggire la vulnerabilità di un coinvolgimento emotivo viscerale.",
      "sintesi": "Patto di complicità mentale e dialogo ininterrotto; il pericolo risiede nella fuga intellettuale davanti alle emozioni profonde."
    },
    "Cancer": {
      "title": "Giunone in Cancro — Il Giuramento Protettivo e la Sacralità della Vulnerabilità",
      "text": "L'impegno sacro si radica nel grembo della tenerezza, della cura domestica e della protezione incondizionata dei moti dell'anima. Cerchi un legame che sia un rifugio sicuro contro il gelo del mondo esterno, dove deporre le difese e costruire un focolare intimo fatto di memorie familiari, dedizione reciproca e sensibilità condivisa. La fedeltà è considerata un dovere assoluto e naturale. Offri un calore accogliente che nutre in profondità. L'ombra è la manipolazione emotiva: colpevolizzare il compagno o fare leva sulle sue debolezze per timore di perdere la centralità nel nido.",
      "sintesi": "Devozione protettiva e comunione intima del focolare; il nodo è non trasformare l'attaccamento in ricatto sentimentale."
    },
    "Leo": {
      "title": "Giunone in Leone — Il Matrimonio Sovrano e la Condivisione del Trono",
      "text": "L'unione assume i contorni di un regno congiunto, dove l'amore si manifesta attraverso la fierezza, la generosità principesca e la celebrazione pubblica del partner. Cerchi una persona di cui essere profondamente fieri, un alleato carismatico e nobiliare con cui dividere gli onori del mondo senza mai competere per la corona. L'ammirazione reciproca è l'alimento indispensabile per mantenere viva la scintilla. Sai donare una fedeltà magnanima e radiosa. Il rischio è l'orgoglio ferito: punire duramente il partner con il gelo del disprezzo se non ricevi la venerazione speciale che pretendi per diritto regale.",
      "sintesi": "Patto nobiliare di lealtà regale e ammirazione mutua; la trappola è esigere un'adorazione cortigiana che soffoca la parità."
    },
    "Virgo": {
      "title": "Giunone in Vergine — La Cura Pratica del Legame e la Fedeltà Operosa",
      "text": "Il patto coniugale si edifica attraverso l'operosità discreta, il sostegno tangibile e il miglioramento costante della vita quotidiana condivisa. Non credi ai vuoti proclami romantici ma misuri la sacralità del giuramento nei gesti di servizio, nell'affidabilità domestica e nella precisione con cui alleggerisci il carico dell'altro. C'è un'onestà metodica encomiabile che protegge la coppia dal degrado delle abitudini. L'ostacolo è l'ipercritica ansiosa: passare al vaglio ogni minimo difetto o dimenticanza del compagno, trasformando la vita a due in un severo esame di laboratorio che raffredda la dolcezza.",
      "sintesi": "Devozione concreta espressa nel servizio quotidiano; il limite è tormentare il partner con un perfezionismo logorante."
    },
    "Libra": {
      "title": "Giunone in Bilancia — L’Archetipo dell’Unione Equanime e la Giustizia del Cuore",
      "text": "L'asteroide trova qui la sua naturale affinità con l'ideale del matrimonio paritario, dell'armonia estetica e della giustizia contrattuale impeccabile. Intendi l'unione come un capolavoro di grazia diplomatica, in cui ogni decisione viene ponderata insieme con rispetto squisito delle esigenze dell'altro. Cerchi una bellezza raffinata nella condivisione etica e civile della vita. Doni un'attenzione costante ai desideri del partner. La trappola è l'ipocrisia conciliante: reprimere i propri malumori legittimi pur di mantenere una facciata di idillio perfetto, accumulando risentimenti silenziosi che erodono il patto.",
      "sintesi": "Ideale supremo di equilibrio e bellezza relazionale; l'insidia è fingere la pace pur di evitare il confronto necessario."
    },
    "Scorpio": {
      "title": "Giunone in Scorpione — La Fusione Alchemica Totale e il Rifiuto del Tradimento",
      "text": "L'alleanza relazionale non ammette mezze misure: esige una fusione psichica assoluta, una lealtà incorruttibile fino al midollo e il coraggio di attraversare insieme le ombre dell'inconscio. Non cerchi un semplice consorte sociale ma un complice di destini estremi, capace di stringere un patto di sangue emotivo dove ogni segreto viene svelato. La passione è travolgente e trasformativa. L'ombra è l'ossessione del controllo: nutrire sospetti corrosivi, spiare l'altro o punire ogni percepita disattenzione con vendette psicologiche implacabili che distruggono la fiducia comune.",
      "sintesi": "Patto viscerale di fedeltà assoluta e fusione psichica; il pericolo è la gelosia distruttiva che intossica l'unione."
    },
    "Sagittarius": {
      "title": "Giunone in Sagittario — Il Cammino di Libertà e la Condivisione dei Grandi Orizzonti",
      "text": "Il matrimonio è concepito come una grandiosa avventura filosofica, un viaggio senza fine alla ricerca della verità e dell'espansione spirituale comune. Cerchi un compagno d'avventura allineato ai tuoi ideali etici, che ami esplorare culture lontane e che non intenda l'impegno come una prigione soffocante di convenzioni borghesi. L'ottimismo e la fiducia reciproca sono le ali dell'unione. C'è un entusiasmo contagioso nel fare progetti ambiziosi. Il rischio è la presunzione dogmatica: imporre la propria visione morale come unica legge della coppia o fuggire le responsabilità ordinarie per inseguire mete lontane.",
      "sintesi": "Alleanza percorsa su sentieri di esplorazione e crescita etica; il nodo è non fuggire la concretezza delle responsabilità quotidiane."
    },
    "Capricorn": {
      "title": "Giunone in Capricorno — La Rocca Contrattuale e l’Impegno Indistruttibile",
      "text": "Il patto di Giunone assume la dignità severa di un trattato solenne, costruito per resistere alle tempeste del tempo, dell'invecchiamento e delle avversità sociali. Non cerchi facili innamoramenti passeggeri: investi in una persona matura, fidata e leale con cui edificare una posizione rispettabile e duratura nel mondo. La tua fedeltà è una roccia granitica su cui l'altro può contare senza timore di smentite. C'è una serietà magistrale. Il limite è l'indurimento emotivo: trattare il matrimonio come un'impresa burocratica o un contratto d'affari, dimenticando di nutrire la tenerezza e la vulnerabilità del cuore.",
      "sintesi": "Patto di lealtà incrollabile e solidità nel tempo; la trappola risiede nell'eccessivo rigore che trasforma l'amore in puro dovere."
    },
    "Aquarius": {
      "title": "Giunone in Acquario — L’Alleanza Eretica e il Patto Anticonvenzionale",
      "text": "L'impegno nuziale si affranca dai dogmi patriarcali e dalle tradizioni conformiste: concepisci la coppia come un'amicizia superiore fondata sulla libertà paritaria e sul rispetto dello spazio vitale di ciascuno. Puoi scegliere forme di convivenza insolite, patti aperti o unioni a distanza che scandalizzano i benpensanti ma che funzionano a meraviglia per la vostra intesa spirituale. Cerchi un complice per cambiare la società. L'ombra è il distacco glaciale: rifugiarsi in un'astratta teoria dell'indipendenza per timore dell'intimità corporea, negando al compagno il calore dell'affetto ordinario.",
      "sintesi": "Unione anticonformista e patto tra spiriti liberi e paritari; l'ostacolo è il disimpegno emotivo che raggela la complicità."
    },
    "Pisces": {
      "title": "Giunone in Pesci — La Devozione Mistica e la Trascendenza dei Confini Egotici",
      "text": "Il giuramento d'amore tocca vertici di dedizione mistica e compassione senza confini: intendi il matrimonio come una fusione di anime disposte a dissolvere ogni egoismo per guarirsi a vicenda. Possiedi una capacità sovrumana di perdonare, comprendere i silenzi e avvolgere il partner in un manto di dolcezza salvifica che lenisce ogni affanno terrestre. C'è una comunione telepatica finissima. Il trabocchetto coincide con la sindrome del salvatore: innamorarsi di persone ferite o viziose sperando di redimerle, sacrificando la propria dignità sull'altare di un martirio sentimentale sterile.",
      "sintesi": "Comunione sublime di anime e dedizione compassionevole; il pericolo è sacrificarsi per riscattare partner distruttivi o inaffidabili."
    }
  },
  "houses": {
    "1": {
      "title": "Giunone in Prima Casa — L’Aura dell’Alleato Nato e la Definizione di Sé nell’Altro",
      "text": "La presenza di Giunone sull'Ascendente conferisce una grazia diplomatica innata e rende la ricerca dell'anima affine un tratto distintivo della propria identità esteriore. Ti presenti al mondo con una naturale predisposizione all'incontro, attirando compagni che riconoscono immediatamente in te il valore di un patto solido e leale. Non concepisci la tua esistenza come una monade isolata: fiorisci pienamente quando hai al fianco una presenza con cui dividere le sfide della vita. La debolezza è la dipendenza identitaria: modellare la propria persona sui desideri del partner, smarrendo i confini del proprio io.",
      "sintesi": "Portamento seduttivo e vocazione naturale all'alleanza; la sfida consiste nel non smarrire la propria identità dentro la coppia."
    },
    "2": {
      "title": "Giunone in Seconda Casa — L’Alleanza Patrimoniale e la Condivisione dei Valori Concreti",
      "text": "Il patto di Giunone investe direttamente la gestione delle risorse economiche, la tutela del patrimonio comune e la condivisione di valori materiali tangibili. Consideri essenziale che l'unione offra garanzie finanziarie indiscutibili e che entrambi i membri collaborino con saggezza alla costruzione della prosperità domestica. Non ti unisci a partner irresponsabili o scialacquatori: chiedi concretezza e affidabilità nei conti. C'è un talento notevole negli affari familiari. Il rischio risiede nel mercanteggiare l'affetto: subordinare la tenerezza al rendimento economico o usare il denaro come leva di ricatto emotivo.",
      "sintesi": "Sicurezza economica e accordo sui beni materiali; la tentazione da evitare è fare del denaro la misura esclusiva dell'affetto."
    },
    "3": {
      "title": "Giunone in Terza Casa — Il Patto Quotidiano nella Parola e l’Accordo Fraterno",
      "text": "La stabilità della relazione si costruisce nello scambio continuo di messaggi, nella curiosità condivisa e nella capacità di negoziare con garbo i piccoli accordi della quotidianità. Cerchi un compagno che sia una presenza familiare rassicurante, con cui condividere tragitti brevi, letture stimolanti e confidenze fraterne senza segreti né finzioni. La comunicazione aperta è il termometro veritiero della salute della coppia. Risolvi i dissidi familiari con abile diplomazia. L'insidia è il logorio polemico: perdersi in battibecchi continui su quisquilie quotidiane, logorando l'intimità con frecciate verbali evitabili.",
      "sintesi": "Intesa fondata sul dialogo quotidiano e sulla confidenza fraterna; il nodo è non esasperare le dispute su questioni secondarie."
    },
    "4": {
      "title": "Giunone in Quarta Casa — La Sacralità del Nido Condiviso e il Focolare Inviolabile",
      "text": "Il giuramento d'amore trova la sua cattedrale tra le mura domestiche, nella salvaguardia delle radici ancestrali e nella cura dell'abitazione come rifugio sacro. Cerchi un partner che sappia fare della casa un'oasi di pace, protezione e rispetto per le memorie intime della discendenza. L'impegno nuziale è indissolubilmente legato al progetto di una famiglia accogliente e unita. Doni una tenerezza protettiva inesauribile. Il limite è l'involuzione claustrofobica: chiudere la coppia in un fortino domestico impenetrabile, impedendo alla vita a due di aprirsi con fiducia agli stimoli del mondo.",
      "sintesi": "Patto consacrato alla custodia del focolare e delle radici; il pericolo è rinchiudere l'intimità in un isolamento soffocante."
    },
    "5": {
      "title": "Giunone in Quinta Casa — L’Alleanza Giocosa e il Patto Creativo Sovrano",
      "text": "L'impegno relazionale deve vibrare di passione romantica, gioia celebrativa e cooperazione artistica feconda. Cerchi un compagno con cui condividere la bellezza del gioco, il piacere del corteggiamento perenne e l'orgoglio per progetti creativi o per l'educazione solare dei figli. Il patto perde vigore se subentra la grigia abitudine borghese: hai bisogno di ammirare la magnificenza espressiva dell'altro. C'è una generosità festosa che irradia la coppia. L'ombra è la teatralità drammatica: montare scandali o scenate di gelosia vistose per ravvivare un legame che teme la normale quiete ordinaria.",
      "sintesi": "Complicità festosa e creatività passionale nella coppia; la trappola risiede nel creare drammi teatrali per sfuggire la noia."
    },
    "6": {
      "title": "Giunone in Sesta Casa — Il Servizio Reciproco e l’Intesa nei Dettagli del Quotidiano",
      "text": "L'alleanza nuziale dimostra il suo valore autentico nell'aiuto pratico quotidiano, nella cura della salute del partner e nella gestione armoniosa delle incombenze domestiche e lavorative. Credi nella devozione operosa: sostieni il compagno quando è affaticato o ammalato, organizzando la routine con una dedizione impeccabile che toglie ogni peso dalle sue spalle. Spesso il legame nasce proprio in contesti professionali condivisi. Il punto debole è l'asimmetria del carico: assumersi tutte le fatiche organizzative finendo per sentirsi una servitù incompresa anziché una presenza paritaria.",
      "sintesi": "Fedeltà operosa e supporto pratico nel lavoro di ogni giorno; la salvaguardia impone di non diventare i servitori del partner."
    },
    "7": {
      "title": "Giunone in Settima Casa — L’Apoteosi del Matrimonio Sacro e lo Specchio dell’Altro",
      "text": "Giunone dimora nella sua casa naturale, dove il principio dell'unione solenne raggiunge la massima centralità esistenziale e simbolica. Il matrimonio, il patto pubblico e la parità contrattuale costituiscono il perno attorno a cui si struttura la tua evoluzione interiore: vedi nel partner lo specchio veritiero in cui contemplare le tue luci e le tue ombre. Possiedi un talento eccezionale nell'arte della conciliazione e nella salvaguardia della giustizia relazionale. L'insidia è il terrore della solitudine: restare ancorati a compromessi castranti pur di non dichiarare concluso un patto che ha ormai esaurito la sua verità.",
      "sintesi": "Compimento perfetto del patto coniugale e parità tra sposi; il limite è sopportare unioni svuotate pur di non restare soli."
    },
    "8": {
      "title": "Giunone in Ottava Casa — Il Vincolo di Sangue Emotivo e la Rigenerazione nella Crisi",
      "text": "La collocazione nell'ottavo settore conduce Giunone nelle profondità della sessualità trasformativa, della gestione dei patrimoni congiunti e delle eredità psicologiche complesse. Non stipuli accordi leggeri: esigi una lealtà totale che sappia affrontare i tabù, le crisi finanziarie e i dolori più aspri senza mai tradire la parola data. L'unione diventa un crogiolo alchemico dove entrambi gli sposi rinascono spogliati delle proprie maschere superficiali. Il rischio è la guerra di logoramento: usare l'intimità o i beni materiali come armi per dominare l'altro in una spirale di ricatti sottili.",
      "sintesi": "Patto viscerale che forgia l'anima attraverso le tempeste; la trappola risiede nelle lotte sotterranee di potere e denaro."
    },
    "9": {
      "title": "Giunone in Nona Casa — La Compagnia di Viaggio Filosofico e l’Elevazione Spirituale",
      "text": "L'alleanza coniugale è vissuta come una grande spedizione verso terre lontane, sistemi di pensiero elevati e ideali etici cosmopoliti. Ti attraggono persone di diversa nazionalità, maestri di sapienza o spiriti liberi con cui allargare costantemente i confini della propria visione del mondo. Il legame si nutre di confronti filosofici fecondi, pellegrinaggi culturali e fede condivisa nel destino. Doni un respiro universale alla coppia. L'ostacolo è il fanatismo morale: pretendere che il compagno abbracci ciecamente le tue credenze religiose o dottrinali, giudicando come infedeltà ogni sua divergenza teorica.",
      "sintesi": "Unione illuminata da alti orizzonti filosofici e viaggi; il difetto è l'intolleranza verso le convinzioni personali del partner."
    },
    "10": {
      "title": "Giunone in Decima Casa — L’Unione Pubblica di Prestigio e l’Alleanza Istituzionale",
      "text": "Il patto di Giunone si colloca al vertice del cielo sociale, legando strettamente la scelta del compagno alla reputazione, allo status professionale e all'affermazione pubblica. Desideri un partner stimato, autorevole e capace di affiancarti nella scalata ai vertici della comunità con dignità impeccabile e condotta inappuntabile. La coppia si presenta come una potenza istituzionale rispettata da tutti. C'è un senso altissimo dell'onore civile. La trappola è l'aridità di convenienza: mantenere in piedi un matrimonio di facciata per preservare privilegi mondani e prestigio sociale, sacrificando la sincerità del sentimento.",
      "sintesi": "Alleanza solenne di prestigio sociale e successo pubblico; l'insidia è conservare matrimoni di pura convenienza istituzionale."
    },
    "11": {
      "title": "Giunone in Undicesima Casa — L’Unione Ideale nella Comunità e il Patto di Libertà",
      "text": "L'alleanza relazionale sboccia all'interno di progetti comunitari, battaglie civili e cerchie di amicizie guidate da valori umanitari condivisi. Cerchi un partner che sia anzitutto il tuo migliore alleato ideologico, una persona aperta al futuro con cui sperimentare un patto egualitario immune dai vincoli del conformismo borghese. Nella coppia regnano la complicità fraterna e il rispetto per i sogni individuali di emancipazione. C'è una lealtà visionaria. L'ombra è la dispersione nel collettivo: dedicare tutte le energie alle cause politiche del gruppo, trascurando l'intimità privata del compagno.",
      "sintesi": "Patto di cooperazione fraterna e ideali comunitari; il rischio è sacrificare la vicinanza intima alle esigenze del gruppo."
    },
    "12": {
      "title": "Giunone in Dodicesima Casa — Il Patto Karmico Silenzioso e la Devozione Invisibile",
      "text": "L'asteroide dell'impegno opera nelle profondità mistiche della dodicesima casa, segnalando unioni cariche di memorie ancestrali, risonanze karmiche e dedizione silenziosa al di là della visibilità mondana. Puoi vivere amori segreti, relazioni con persone bisognose di assistenza o sentire un vincolo invisibile indistruttibile che non ha bisogno di contratti terreni per esistere. La tua capacità di perdono e sacrificio per l'altro tocca la santità laica. La debolezza è l'annullamento sacrificale: accettare di rimanere nell'ombra o tollerare tradimenti continui in nome di un'astratta missione di redenzione karmica.",
      "sintesi": "Legame karmico silenzioso e devozione spirituale profonda; la salvezza esige di non sacrificare la propria dignità nell'ombra."
    }
  },
  "dignities": {},
  "combinations": {
    'Libra|7': {
        title: "Giunone in Bilancia in Settima Casa",
        canonico: "Nel segno della Bilancia e nella settima casa, Giunone raggiunge la sua espressione archetipica primaria, ponendo il tema della fedeltà contrattuale, dell'alleanza paritaria e della dignità nuziale al centro dell'esperienza biografica. La tradizione considera tale collocazione come la ricerca imprescindibile di un compagno degno, con cui condividere la sovranità sull'esistenza secondo regole di trasparenza, bellezza formale e reciproco rispetto. L'individuo non concepisce il legame amoroso come sottomissione emotiva, ma come un trattato sacro tra potenze autonome che uniscono le proprie forze. Le problematiche classiche emergono nella dipendenza dal giudizio estetico, nella simulazione di una quiete artefatta per timore delle rotture scandalose e nella manipolazione raffinata esercitata attraverso il senso di colpa. La finzione della perfetta intesa coniugale crolla alla prima tempesta se l'accordo non ha mai conosciuto la prova del fuoco: un'alleanza dura nei decenni solo quando entrambi i soci hanno il coraggio di nominare l'attrito senza timore del dissenso.",
        lilithiano: "Ti crescevano nella credenza che la tua dignità nel mondo fosse incompleta senza un legame sancito, inducendoti a pensare che una persona senza consorte fosse esposta al disprezzo della comunità. La morale perbenista insegnava che il fallimento di un'unione fosse la peggiore delle vergogne, costringendo la persona a tollerare freddezza e umiliazioni pur di salvare le apparenze.\n\nLilith penetra nel tempio dei tuoi patti coniugali e ne dissacra le clausole mercenarie: nessuna promessa d'amore vale la rinuncia alla propria voce sovrana. Un patto che esige la censura della tua fiamma vitale non è un matrimonio di anime, è una galera con le tende di velluto. La tua fedeltà appartiene prima di tutto al tuo fuoco interiore. Non devi implorare considerazione né contrattare il rispetto a colpi di compromessi: se chi cammina al tuo fianco pretende l'inchino invece del confronto paritario, il gesto più sacro è rompere il vincolo e andarsene con la corona sul capo.\n\nMostri una grazia nobilissima nel tessere legami autentici e un intuito formidabile per riconoscere la vera reciprocità dello sguardo: sai donare una lealtà incrollabile a chi dimostra di meritare la tua stima. Un patto regale non esige sacrifici d'identità: due sovranità libere cooperano nello stesso spazio senza che l'una debba farsi ombra per lasciare risplendere l'altra.",
        sintesi: "Giunone in domicilio bilancino nella settima casa: patto d'alleanza sovrano e ricerca di equità nuziale che trionfano rifiutando la finzione del decoro formale."
      },
    'Scorpio|8': {
        title: "Giunone in Scorpione in Ottava Casa",
        canonico: "La presenza di Giunone nello Scorpione e nell'ottava casa sposta l'asse della fedeltà relazionale sul terreno incandescente dei patti viscerali, delle eredità psicologiche e della fusione trasformatrice attraverso le crisi condivise. Gli interpreti tradizionali descrivono qui un legame che trascende le forme superficiali per ancorarsi a giuramenti irrevocabili, in cui i partner mettono a nudo vulnerabilità estreme e patrimoni segreti. Chi presenta questa configurazione esige una lealtà totale che non ammette mezze misure e concepisce l'intimità come una discesa nei misteri della psiche. I pericoli canonici toccano l'ossessione del tradimento, la gelosia distruttiva, l'uso della sessualità o del denaro come leve di ricatto e la brama di dominare interamente l'animo dell'altro. La pretesa di possedere l'anima dell'altro fino all'ultimo pensiero genera labirinti di spionaggio e vendette sotterranee: nessun vincolo sopravvive a lungo dove la fiducia deve essere continuamente estorta con la violenza del controllo.",
        lilithiano: "Porti nel sangue il ricordo di giuramenti traditi e di intimità violate, dove la richiesta di fiducia si è trasformata nell'ennesima trappola per disarmare le tue difese. Le dinamiche ricattatorie dei legami passati avevano impresso il terrore del tradimento imminente, inducendo a trasformare la relazione in un interrogatorio permanente.\n\nLilith scende nei sotterranei delle tue alleanze ferite e ti ordina di gettare via le armi del rancore: nutrire l'odio e pianificare rappresaglie logora solo le tue viscere, mantenendoti nel laccio della sagoma dei tuoi persecutori. La tua regalità non si difende imprigionando l'altro in una tela di sospetti o pretendendo confessioni estorte con il tormento. La tua vera potenza risiede nella capacità di guardare l'abisso relazionale senza tremare, sapendo che nessuna perdita o tradimento può intaccare il nucleo incorruttibile della tua persona. Quando smetti di cercare il controllo assoluto, il ricatto affettivo crolla all'istante.\n\nEsprimi un magnetismo profondo e un coraggio sciamanico capace di trasformare le rovine emotive in una sorgente perenne di rinascita spirituale: sai amare con un'intensità che non teme le tempeste. Deporre le armi del sospetto davanti a chi merita rispetto apre le porte alla sola alleanza indistruttibile: condividere l'abisso senza pretendere padroni genera un legame immune a ogni tempesta.",
        sintesi: "Giunone nell'ottava casa in Scorpione: vincolo viscerale e fedeltà incandescente che si santificano estirpando il veleno del controllo e della vendetta."
      }
  },
  "retrograde": {
    "title": "Giunone Retrograda — Il Matrimonio Mistico Interiore e la Sovranità Infrangibile",
    "text": "Il patto d'alleanza esige come condizione irrinunciabile la fedeltà alla propria verità originaria, prima ancora di aprirsi a qualsiasi unione terrena. Giunone retrograda disintegra l'illusione che un contratto formale o una promessa d'altare possano colmare una frattura interiore. L'individuo matura un netto rifiuto dei compromessi di comodo che chiedono l'amputazione della propria sovranità in cambio di sicurezza economica o rispettabilità borghese. Chi porta questa traccia impara a stringere alleanze fondate su un riconoscimento reciproco autentico, tra due solitudini fiere che scelgono di camminare affiancate. Il rischio è la diffidenza barricadera: temere che ogni legame sia una gabbia, respingendo anche chi si avvicina con intenzioni limpide e paritarie.",
    "sintesi": "Patto fondato sulla sovranità interiore: diserzione dai matrimoni di convenienza per scegliere alleanze libere e paritarie."
  }
};


BODIES.Vesta = {
  "signs": {
    "Aries": {
      "title": "Vesta in Ariete — La Fiamma Primordiale dell’Autonomia e la Devozione Solitaria",
      "text": "Il sacro fuoco interiore arde con l'impeto primigenio del pioniere: la dedizione si accende solo per cause intraprese in totale solitudine e libertà d'azione. Non accetti interferenze nella gestione della tua energia vitale, custodendola con ferocia contro chi vorrebbe imbrigliarla in mansioni subordinate. Possiedi una capacità di concentrazione fulminea quando persegui una vocazione che accende il tuo entusiasmo pionieristico. C'è una purezza d'intenti cristallina. Il pericolo è l'isolamento intollerante: disperdere la fiamma sacra in battaglie sterili contro l'autorità o bruciare le proprie energie per impazienza, rifiutando ogni cooperazione.",
      "sintesi": "Fiamma sacra dell'autonomia e dedizione ardente; l'insidia è bruciare la propria linfa vitale nell'intolleranza solitaria."
    },
    "Taurus": {
      "title": "Vesta in Toro — Il Fuoco nel Santuario della Materia e la Preservazione Sacra",
      "text": "La custodia della fiamma si radica nel rispetto per i ritmi biologici, per la sacralità della terra e per la conservazione meticolosa delle risorse concrete. Consideri il corpo stesso come un tempio da onorare con disciplina serena, purificando i tuoi spazi attraverso il lavoro manuale, la cura delle piante o l'artigianato nobile. Dimostri una perseveranza indistruttibile nel portare avanti compiti a lungo termine che richiedono devozione paziente. La trappola coincide con la pietrificazione abitudinaria: confondere la sacralità dell'impegno con un attaccamento ossessivo alle forme materiali, barricandosi nel comfort per paura del mutamento.",
      "sintesi": "Custodia perseverante della materia viva e del corpo come tempio; il limite è la chiusura ostinata nelle comodità note."
    },
    "Gemini": {
      "title": "Vesta in Gemelli — La Custodia del Verbo e la Concentrazione sulla Verità",
      "text": "Il fuoco sacro della sacerdotessa si esprime attraverso la purezza del linguaggio, l'accuratezza filologica e la trasmissione fedele del sapere. Sai isolare il pensiero dal frastuono delle opinioni contingenti, focalizzando la mente sulla decifrazione di concetti complessi e sulla condivisione di informazioni incorrotte. La parola è vissuta come uno strumento liturgico capace di illuminare la confusione circostante. C'è un talento eccellente nell'insegnamento rigoroso. Il punto fragile è l'ipertrofia mentale: frammentare l'energia in una molteplicità di nozioni erudite ma disconnesse, perdendo il calore umano dell'esperienza vissuta.",
      "sintesi": "Consacrazione del pensiero alla chiarezza logica; il rischio risiede nel disperdere il fuoco interiore in freddi tecnicismi."
    },
    "Cancer": {
      "title": "Vesta in Cancro — La Fiamma del Focolare Intimo e la Purezza delle Radici",
      "text": "La sacralità si manifesta nella custodia dell'ambiente domestico, nella protezione delle memorie d'infanzia e nella salvaguardia del benessere psicologico dei propri affetti. Intendi la casa come un santuario inviolabile in cui alimentare la brace della tenerezza e della compassione familiare, tenendo a distanza le contaminazioni del caos mondano. Doni una dedizione protettiva quasi materna che sa lenire le ferite dell'anima. La tentazione da evitare è il ricatto dell'accudimento: trasformare la cura del nido in una gabbia claustrofobica, colpevolizzando chi cerca l'indipendenza al di fuori delle mura domestiche.",
      "sintesi": "Custodia devota del focolare e protezione delle radici; l'ostacolo è soffocare l'autonomia altrui con un accudimento opprimente."
    },
    "Leo": {
      "title": "Vesta in Leone — Il Fuoco dell’Entusiasmo Sovrano e la Devozione Creativa",
      "text": "La fiamma di Vesta risplende con l'intensità dell'oro solare: consacri la tua esistenza all'arte, all'espressione teatrale e all'irradiazione di una bellezza che scalda i cuori altrui. C'è una dedizione nobilissima al proprio talento creativo, che viene coltivato con orgoglio liturgico e generosità maestosa, rifiutando ogni mediocrità compromissoria. La presenza emana un calore che incoraggia chi si trova nello sconforto. Il trabocchetto è il culto del proprio ego: pretendere che gli altri venerino la tua opera come un altare infallibile, cadendo nella disperazione quando non giungono gli applausi sperati.",
      "sintesi": "Devozione regale all'espressione artistica e al fuoco del cuore; la trappola risiede nell'esigere un'ammirazione sacrale esclusiva."
    },
    "Virgo": {
      "title": "Vesta in Vergine — L’Arte Sacra della Purezza Operativa e la Dedizione al Vivente",
      "text": "Vesta trova qui la sua dimora archetipica più congeniale: il servizio quotidiano, la cura del dettaglio e l'igiene della vita vengono elevati a disciplina spirituale di prim'ordine. Operi con una maestria artigianale e medica straordinaria, dedicandoti alla bonifica di corpi malati, strumenti disfunzionali o ambienti degradati con umiltà e rigore metodico encomiabile. Sei colui che purifica il lavoro da ogni impurità. L'ombra è il martirio dell'autosfruttamento: imporsi standard di perfezione sovrumani che portano all'esaurimento psico-fisico, giudicando ogni imperfezione corporea come un peccato mortale.",
      "sintesi": "Purezza operosa e servizio sacro dedicato alla guarigione; l'insidia è farsi divorare dall'ossessione del controllo impeccabile."
    },
    "Libra": {
      "title": "Vesta in Bilancia — La Custodia dell’Armonia e la Verità della Relazione",
      "text": "Il fuoco sacro vigila sulla correttezza etica delle relazioni umane, sulla ricerca dell'equità nei contratti e sulla tutela della bellezza formale. Non sopporti i compromessi volgari o le relazioni basate sul disordine emotivo: consacri le tue energie alla costruzione di legami limpidi, raffinati e reciprocamente rispettosi dello spazio spirituale di ciascuno. C'è una vocazione diplomatica che pacifiche le tensioni con misura. La debolezza è la paralisi del giudizio: sacrificare la propria verità interiore pur di preservare una facciata di armonia incorrotta, negando i conflitti necessari alla crescita.",
      "sintesi": "Dedizione all'equilibrio etico e alla giustizia relazionale; il pericolo è mascherare la discordia dietro una purezza di facciata."
    },
    "Scorpio": {
      "title": "Vesta in Scorpione — La Trasmutazione Alchemica nel Fuoco Segreto e il Ritiro Iniziatore",
      "text": "La fiamma di Vesta brucia nelle caverne più occulte dell'anima, purificando la sessualità, il dolore e i tabù dell'inconscio attraverso un rigore alchemico inflessibile. Sei capace di un'ascesi profonda e di una concentrazione silenziosa che penetra i misteri più oscuri, rigenerando le risorse vitali attraverso una devozione senza compromessi. La fedeltà alla propria verità interiore è indistruttibile. Il rischio coincide con il fanatismo sotterraneo: nutrire ossessioni vendicative, usare la castità o il segreto come armi di ricatto morale, o chiudersi in una diffidenza che respinge ogni calore spontaneo.",
      "sintesi": "Fuoco segreto di rigenerazione alchemica e rigore psichico; il nodo è non trasformare la disciplina in gelo vendicativo."
    },
    "Sagittarius": {
      "title": "Vesta in Sagittario — La Fiamma dell’Ideale Universale e la Fede Incorrotta",
      "text": "La sacerdotessa consacra la propria fiaccola alla ricerca della sapienza filosofica, alla difesa di nobili ideali civili e alla propagazione della verità spirituale oltre ogni confine geografico. Vivi la tua vita come un pellegrinaggio sacro, animato da una passione contagiosa per l'espansione della coscienza che non ammette compromessi con il cinismo ordinario. C'è una generosità visionaria che ispira gli altri. L'ombra risiede nel dogmatismo fanatico: ritenersi i soli depositari della retta via, tentando di convertire con foga intransigente chi segue sentieri differenti dal proprio.",
      "sintesi": "Devozione ardente agli ideali etici e alla sapienza universale; la trappola è cadere nella presunzione dell'ortodossia intollerante."
    },
    "Capricorn": {
      "title": "Vesta in Capricorno — La Custodia del Dovere Etico e la Disciplina Silenziosa",
      "text": "Il fuoco sacro si custodisce nella roccia del dovere civile, nella pazienza ascetica e nella costruzione di opere destinate a superare il giudizio dei secoli. Non cerchi scorciatoie comode o ricompense passeggere: accetti sacrifici silenziosi con una dignità stoica esemplare, lavorando nell'ombra per garantire la stabilità di istituzioni, progetti o ideali collettivi superiori. C'è un'integrità morale a prova di scandalo. Il limite è l'inaridimento burocratico: reprimere ogni spontaneità affettiva sull'altare di un rigore spietato, trasformando la propria esistenza in un gelido monumento al sacrificio.",
      "sintesi": "Disciplina stoica e devozione alle responsabilità supreme; l'insidia è pietrificare il cuore in un rigore privo di dolcezza."
    },
    "Aquarius": {
      "title": "Vesta in Acquario — Il Fuoco dell’Umanità Libera e la Devozione all’Uguaglianza",
      "text": "La fiamma di Vesta illumina il futuro dell'umanità, consacrandosi alla difesa dei diritti universali, alla cooperazione paritaria e alla distruzione dei privilegi di casta. Non vincoli la tua devozione a singoli individui o a clan ristretti: orienti la tua concentrazione verso il bene comune, sperimentando nuove forme di comunità fraterna fondate sulla libertà e sul progresso civile. Apri strade etiche con passo instancabile. La vulnerabilità risiede nel distacco impersonale: amare appassionatamente l'umanità in astratto, dimenticando di ascoltare le sofferenze concrete delle persone che ti vivono accanto.",
      "sintesi": "Custodia devota della libertà fraterna e dell'uguaglianza; il difetto è amare l'ideale collettivo trascurando l'individuo vicino."
    },
    "Pisces": {
      "title": "Vesta in Pesci — Il Sacrificio Mistico della Fiamma e l’Ospitalità Senza Confini",
      "text": "Il fuoco sacro dell'asteroide si scioglie nelle acque della compassione oceanica, dove la devozione diventa preghiera universale, dedizione ai sofferenti e comunione con l'invisibile. Possiedi la grazia dell'accoglienza incondizionata: chiunque si avvicini alla tua luce trova conforto, perdono e risanamento morale lontano da ogni giudizio inquisitorio. C'è un misticismo naturale di rara purezza. Il trabocchetto coincide con la dispersione martiriale: farsi assorbire completamente dalle pene del mondo fino a spegnere la propria vitalità, confondendo la sacralità del servizio con l'annientamento autodistruttivo.",
      "sintesi": "Compassione senza confini e devozione silenziosa agli ultimi; la salvezza esige di non sacrificare la propria vita per gli altri."
    }
  },
  "houses": {
    "1": {
      "title": "Vesta in Prima Casa — La Presenza Consacrata e la Fiamma nel Cuore dell’Io",
      "text": "La collocazione di Vesta sull'Ascendente conferisce un'aura di purezza, gravità serena e dedizione incorruttibile che si imprime nell'intero portamento della persona. Comunichi un senso di integrità e indipendenza spirituale che incute rispetto immediato: gli altri percepiscono chiaramente che la tua anima custodisce un fuoco che non può essere spento né venduto. Sei capace di una solitudine nobile e feconda che alimenta la tua forza. L'insidia risiede nell'isolamento austero: apparire così inaccessibili o distaccati da scoraggiare chiunque desideri condividere un momento di affetto ordinario.",
      "sintesi": "Presenza nobilissima e indipendenza spirituale inscritta nel corpo; la lezione è non fare dell'austerità un muro insormontabile."
    },
    "2": {
      "title": "Vesta in Seconda Casa — La Sacralizzazione delle Risorse e il Fuoco del Sostentamento",
      "text": "Il fuoco dell'impegno sacro investe la sfera patrimoniale, la produzione materiale e la gestione delle proprie energie fisiche. Non ricerchi il denaro per ostentare lusso vacuo: accumuli e custodisci beni con una disciplina meticolosa, destinandoli unicamente a progetti etici o a garantire un'autonomia economica incrollabile. Sai vivere con sobrietà ammirevole senza farti piegare dalle mode consumistiche. C'è un talento nel far fruttare il lavoro artigianale. La debolezza è la privazione ansiosa: imporsi privazioni inutili per paura della contaminazione economica, rifiutando i legittimi piaceri della materia.",
      "sintesi": "Gestione sacra delle finanze e sobrietà economica incorruttibile; il limite è cadere in una parsimonia severa e punitiva."
    },
    "3": {
      "title": "Vesta in Terza Casa — La Custodia della Parola Chiara e la Concentrazione Intellettuale",
      "text": "La mente opera come un laboratorio di cesello concettuale, dove ogni parola viene pesata, depurata da ambiguità e orientata alla trasmissione rigorosa del vero. Quando ti dedichi allo studio, alla scrittura o all'insegnamento, manifesti una capacità di focalizzazione straordinaria, isolandoti dal rumore di fondo per ore intere. Nei rapporti quotidiani esigi una lealtà comunicativa impeccabile. Sei un archivista o un divulgatore di rara perizia. Il rischio è la rigidità verbale: rifiutare le conversazioni leggere o giudicare con severità chi parla con spontaneità imperfetta.",
      "sintesi": "Concentrazione intellettuale prodigiosa e rigore nella parola; il nodo è non spegnere la freschezza del dialogo con pedanteria."
    },
    "4": {
      "title": "Vesta in Quarta Casa — Il Tempio del Focolare Domestico e la Purificazione Genealogica",
      "text": "La sacralità di Vesta risiede nell'intimità del proprio focolare: trasformi l'abitazione in un tempio di raccoglimento, silenzio e rigenerazione psichica dove la fiamma dell'affetto primario arde con vigore inestinguibile. C'è una vocazione profonda a purificare le memorie dolorose della stirpe, riscattando vecchi rancori genealogici attraverso la dedizione al benessere delle radici familiari. Doni un'accoglienza calorosa a chi cerca ristoro. L'ombra è la clausura difensiva: fare della casa un rifugio blindato che taglia i ponti con l'esterno, temendo qualsiasi confronto con la complessità sociale.",
      "sintesi": "Casa vissuta come santuario di pace e bonifica delle radici; l'ostacolo è rifugiarsi nelle mura domestiche per fuggire il mondo."
    },
    "5": {
      "title": "Vesta in Quinta Casa — La Fiamma della Creazione Autonoma e la Devozione all’Arte",
      "text": "L'asteroide accende il settore della creatività, del piacere e dell'autoespressione con un'intensità quasi rituale. Quando crei un'opera d'arte, dirigi un progetto teatrale o ti dedichi a un'attività ricreativa, lo fai con un'assoluta devozione liturgica, cercando la scintilla divina della bellezza pura. Non disperdi le tue energie in avventure effimere: vivi anche l'eros come un'esperienza che deve accendere il sacro fuoco del cuore. C'è un talento fecondo. Il pericolo risiede nell'eccessiva serietà nel gioco: togliere spontaneità al divertimento e all'amore pretendendo che ogni atto creativo abbia una rilevanza solenne.",
      "sintesi": "Consacrazione della vita alla creazione artistica e al fuoco erotico; l'insidia è appesantire la leggerezza del gioco."
    },
    "6": {
      "title": "Vesta in Sesta Casa — Il Rito del Servizio Quotidiano e l’Olocausto del Dovere",
      "text": "La collocazione nella sesta casa esprime la massima dedizione al lavoro, all'igiene del corpo e alla cura instancabile del prossimo nel quotidiano. Sei la persona su cui tutti possono contare per risolvere problemi operativi complessi, riorganizzare archivi confusi o assistere colleghi e pazienti con una generosità metodica infallibile. Trovi la tua pace spirituale nella precisione del gesto umile. C'è una grandezza silenziosa. La trappola coincide con il collasso per iper-lavoro: trasformarsi nei martiri dell'ufficio o della clinica, dimenticando il riposo e immolandosi sull'altare di mansioni interminabili.",
      "sintesi": "Servizio impeccabile e cura sacra dei compiti quotidiani; il grande pericolo è consumare la salute nel lavoro indefesso."
    },
    "7": {
      "title": "Vesta in Settima Casa — La Sacralità del Patto e la Purezza dell’Incontro",
      "text": "Il fuoco di Vesta illumina il regno delle unioni contrattuali e delle collaborazioni paritarie: esigi che ogni patto relazionale sia un'alleanza pulita, fondata sulla fedeltà reciproca a una causa comune o a un percorso di elevazione spirituale. Non sopporti i matrimoni di pura comodità sociale né le unioni in cui uno dei partner divora l'energia dell'altro. Sei capace di una dedizione straordinaria alla crescita del compagno. Il rischio è la severità moralistica: pretendere che la persona amata mantenga una condotta irreprensibile, condannando ogni debolezza come un sacrilegio imperdonabile.",
      "sintesi": "Purezza e dedizione etica nei legami coniugali; la tentazione da disinnescare è imporre al partner un ideale di perfezione irreale."
    },
    "8": {
      "title": "Vesta in Ottava Casa — Il Fuoco Sotterraneo della Rigenerazione e il Patto di Sangue",
      "text": "La sacralità si cala nelle profondità della sessualità trasformativa, della gestione delle crisi interiori e della custodia dei misteri esoterici. Sei in grado di attraversare lutti, fallimenti economici e sconvolgimenti emotivi mantenendo accesa la fiaccola della speranza e dell'integrità interiore con una tenacia leggendaria. Possiedi una grande saggezza nell'amministrare risorse occulte o eredità complesse. L'ombra è la repressione dei desideri: reprimere le pulsioni corporee sotto il velo di una rigida purificazione mentale, o usare il segreto come strumento di dominio psicologico.",
      "sintesi": "Fiamma segreta di rigenerazione nelle prove dell'abisso; il nodo è non castrare la vitalità erotica con dogmi puritani."
    },
    "9": {
      "title": "Vesta in Nona Casa — La Fiaccola della Ricerca Filosofica e la Dedizione all’Assoluto",
      "text": "L'asteroide accende una sete inestinguibile di verità filosofica, sapienza teologica e confronto con culture lontane nel tempo e nello spazio. Consacri la tua esistenza all'insegnamento superiore, alla ricerca accademica rigorosa o a viaggi iniziatici finalizzati all'ampliamento degli orizzonti morali dell'umanità. La tua fede nella giustizia cosmica non vacilla davanti alle delusioni umane. C'è un'autorevolezza morale altissima. Il limite è l'inquisizione dottrinale: condannare le opinioni eterodosse con l'ardore di chi si crede l'unico guardiano dell'ortodossia, allontanando chi la pensa diversamente.",
      "sintesi": "Vocazione sacerdotale alla verità filosofica e alla giustizia; la debolezza è giudicare le convinzioni altrui con intolleranza."
    },
    "10": {
      "title": "Vesta in Decima Casa — La Vocazione Pubblica Incorruttibile e l’Autorità Sacra",
      "text": "La fiamma di Vesta risplende sul palcoscenico della carriera, della reputazione e della funzione istituzionale. Ti affermi come una figura di rettitudine morale indiscutibile, capace di governare uffici pubblici, aziende o comunità con una dedizione sacrale al bene comune che esclude qualsiasi corruzione o interesse egoistico. Il tuo lavoro è la tua preghiera visibile al mondo. C'è una dedizione che suscita ammirazione universale. Il rischio coincide con la solitudine dell'apice: sacrificare la propria vita privata e la tenerezza domestica all'altare del prestigio sociale.",
      "sintesi": "Autorità morale incorruttibile e dedizione sacra alla professione; l'insidia è annullare l'intimità affettiva per dovere pubblico."
    },
    "11": {
      "title": "Vesta in Undicesima Casa — La Fiamma della Fratellanza Ideale e la Rete dei Puri",
      "text": "La devozione di Vesta si indirizza verso gruppi di progresso, cooperative sociali e circoli intellettuali che condividono ideali umanitari e scientifici innovativi. Ti dedichi con abnegazione instancabile al funzionamento di progetti collettivi, fungendo da custode silenzioso della coesione morale del gruppo e prevenendo derive particolaristiche con saggezza serena. Sei l'amico fidato che non tradisce mai la causa. La trappola è l'elitarismo settario: considerare il proprio gruppo come una cerchia di eletti puri e immacolati, guardando con sufficienza la società esterna.",
      "sintesi": "Custodia devota della cooperazione fraterna e degli ideali sociali; il limite risiede nel chiudersi in un club di presunti eletti."
    },
    "12": {
      "title": "Vesta in Dodicesima Casa — Il Ritiro Monastico Silenzioso e la Luce nel Buio del Mondo",
      "text": "L'asteroide opera nei territori invisibili dell'inconscio, della meditazione solitaria e della cura misericordiosa degli ultimi e degli emarginati. Sei colui che tiene viva la luce della speranza anche nei momenti di disperazione collettiva, operando nell'ombra degli ospedali, dei monasteri o del silenzio notturno senza chiedere ricompensa o plauso mondano. Possiedi una profonda grazia mistica. Il punto debole è la tentazione dell'evasione: rifugiarsi nella solitudine ascetica per fuggire le ruvidità del mondo materiale, consumandosi in un martirio interiore che nessuno comprende.",
      "sintesi": "Luce mistica accesa nel segreto del silenzio e dedizione agli ultimi; la lezione è non fare dell'isolamento una fuga dalla realtà."
    }
  },
  "dignities": {},
  "combinations": {
    'Virgo|6': {
        title: "Vesta in Vergine in Sesta Casa",
        canonico: "Nella Vergine e nella sesta casa, Vesta celebra la perfetta coincidenza tra la fiamma della concentrazione sacra e il culto metodico della disciplina quotidiana, della salute organica e del perfezionamento peritale. La dottrina astrologica individua in questo settore la custode del fuoco che purifica la vita materiale attraverso il rigore dell'attenzione focalizzata, dedicando le proprie migliori energie a opere di utilità concreta e di soccorso silenzioso. L'individuo mostra una capacità eccezionale di isolarsi dalle distrazioni per penetrare nei dettagli più reconditi di un'arte o di una scienza terapeutica. Le criticità consuete segnalate dai maestri riguardano l'isterilimento burocratico, l'ansia autopunitiva che nega al corpo ogni conforto e la tendenza a trasformare il dovere in un tiranno implacabile che emargina la tenerezza umana. L'isolamento ascetico che disprezza le debolezze della terra finisce per isterilire l'anima in un perfezionismo gelido: la sacralità del compito si manifesta proprio nella capacità di benedire la fatica imperfetta degli esseri umani.",
        lilithiano: "Ti inculcavano l'obbligo di consumare le tue giornate nel sacrificio anonimo, facendoti ritenere che concedersi un momento di riposo, di svago o di piacere sensibile fosse un peccato di egoismo da espiare. L'ambiente circostante dava per scontata la tua disponibilità perpetua, trattando la dedizione silenziosa come un debito naturale anziché come una scelta libera.\n\nLilith entra nel tuo sacrario operativo e rovescia gli altari del martirio gratuito: il fuoco che custodisci nel petto non deve bruciare per alimentare le comodità di chi ti circonda. Il tuo corpo è un tempio venerabile, non un forno da combustione per soddisfare le scadenze del mondo. La vera purezza dello spirito non ha nulla da spartire con la mortificazione dei sensi o con la paura del disordine. Recupera la sacralità della fiamma tenendola accesa anzitutto per illuminare il tuo cammino: quando impari a delimitare orari invalicabili e a proteggere la tua solitudine creativa, il tuo lavoro smette di essere schiavitù e diviene liturgia di libertà.\n\nManeggi un talento di concentrazione prodigioso e una maestria artigianale capace di risanare tessuti lacerati con cura minuziosa: niente sfugge al tuo occhio attento. Custodire il focolare per vocazione interiore e non per dovere servile trasfigura la routine quotidiana: mani fiere edificano templi di operosa salute che sfidano l'usura dei secoli.",
        sintesi: "Vesta nel domicilio vergineo di sesta casa: fiamma sacra della concentrazione e rito del lavoro che risplendono rigettando l'illusione autopunitiva del martirio."
      },
    'Scorpio|8': {
        title: "Vesta in Scorpione in Ottava Casa",
        canonico: "La collocazione di Vesta nello Scorpione e nell'ottava casa concentra la fiamma interiore della dedizione nel crogiolo incandescente della trasmutazione psichica, dell'alchimia erotica e della custodia dei misteri iniziatici. La letteratura astrologica riconosce qui una sentinella delle forze rigeneratrici della natura profonda, capace di preservare l'integrità spirituale attraverso le prove più laceranti e di purificare traumi atavici tramite un rigore meditativo inflessibile. Chi porta questo sigillo è attratto da ciò che la società respinge o nasconde, orientando la propria volontà verso la conoscenza delle leggi del karma e della rinascita interiore. I pericoli tradizionali toccano la fissazione morbosa sui lutti, l'angoscia della contaminazione morale che porta alla freddezza difensiva e l'uso punitivo del silenzio nelle relazioni intime. La segregazione del fuoco interiore in una solitudine vendicativa consuma i tessuti vitali di chi la coltiva: la passione custodita nell'ipogeo ritrova la sua sacralità solo quando accetta di farsi brace che scalda senza distruggere.",
        lilithiano: "Fin dai primi anni hai percepito la presenza di segreti inconfessabili attorno alla tua culla, sentendo gravare addosso il peso di tabù ancestrali legati alla carne, al sesso e alla morte. Le censure ecclesiastiche e i moralismi borghesi avevano bollato il tuo magnetismo istintivo come una minaccia alla decenza da soffocare sotto strati di cenere.\n\nLilith squarcia i veli del tuo pudore imposto e riaccende la torcia primordiale nel tempio delle tue viscere: la tua energia erotica e la tua attrazione per l'ombra non sono marchi di abiezione, ma sorgenti divine di guarigione e sovranità. I guardiani della morale predicano la castità per sottrarti la chiave della tua forza vitale. Rifiuta la vergogna instillata da chi ha paura della vita selvaggia: il tuo calore sacro appartiene unicamente a te e a chi sa accostarsi al tuo mistero con reverenza regale. Nessun trauma ereditario ha il potere di spegnere la scintilla di resurrezione che ti arde nel midollo.\n\nSei custode di una lucidità esoterica formidabile e di una fermezza spirituale che sa attraversare i corridoi della morte interiore senza smarrire l'orientamento: trasformi il piombo della sofferenza in oro incorruttibile. Onorare la fiamma sotterranea senza abbassare lo sguardo dissipa ogni residuo di vergogna: una presenza che accetta le proprie profondità irradia un calore regale che risveglia la vita sopita.",
        sintesi: "Vesta custode dell'ottava casa in Scorpione: fiamma trasmutatrice e alchimia viscerale che rinascono trionfanti depurando l'eredità dei tabù e dei sensi di colpa."
      }
  },
  "retrograde": {
    "title": "Vesta Retrograda — Il Ritiro della Fiamma nel Santuario Segreto dell’Anima",
    "text": "La custodia del fuoco sacro diserta gli altari pubblici per raccogliersi nella camera più interna della coscienza. Con Vesta retrograda, il senso della consacrazione e del dovere non risponde a liturgie istituite né a sacrifici pretesi dalla famiglia per mantenere una facciata decorosa. La persona sa convergere la propria attenzione con intensità monastica su ciò che riconosce essenziale, scartando il superfluo senza rimpianti. Questo distacco conferisce un'integrità spirituale che non ha bisogno di testimoni per restare pura. La devozione diventa un atto intimo di fedeltà al proprio scopo vitale. Il limite è l'inaccessibilità intransigente: considerare il consorzio umano una palude contaminante, negandosi al calore della vicinanza e della condivisione quotidiana.",
    "sintesi": "Consacrazione raccolta nel santuario della coscienza: la fiamma essenziale arde senza bisogno di testimoni né sacrifici imposti."
  }
};


BODIES.ParsFortunae = {
  "signs": {
    "Aries": {
      "title": "Punto di Fortuna in Ariete — La Prosperità dell’Audacia e la Vittoria Pionieristica",
      "text": "La vera gioia interiore e il senso di pienezza esistenziale si accendono quando prendi l'iniziativa in prima persona, aprendo sentieri inesplorati con coraggio indomito. Non trovi fortuna nell'adeguarti a percorsi tracciati da altri né nella prudenza passiva: la sorte premia la tua intraprendenza diretta, la rapidità decisionale e la capacità di superare gli ostacoli con energia fiduciosa. C'è una vitalità radiosa che trasforma ogni sfida in un'opportunità di conquista. Il limite è l'ansia competitiva: misurare il proprio successo unicamente sul battere gli avversari, cadendo nella frustrazione quando le circostanze richiedono pazienza e diplomazia.",
      "sintesi": "Pienezza raggiunta attraverso l'audacia pionieristica e l'azione diretta; l'insidia è la rabbia per i ritardi inevitabili."
    },
    "Taurus": {
      "title": "Punto di Fortuna in Toro — La Prosperità Tangibile e la Pienezza Terrena",
      "text": "Il punto di massimo compimento si radica nella stabilità materiale, nel contatto sensoriale con la bellezza naturale e nella coltivazione paziente di beni durevoli. Sperimenti una profonda beatitudine quando costruisci basi solide per te e per chi ami, assaporando i frutti del lavoro senza fretta e rispettando i ritmi organici della crescita terrena. La ricchezza autentica fluisce spontaneamente quando coltivi l'appagamento per ciò che è tangibile e genuino. C'è una calma feconda. La trappola è la paura della scarsità: farsi ossessionare dall'accumulo materiale, dimenticando che la vera sicurezza nasce dalla fiducia nella fertilità della vita.",
      "sintesi": "Prosperità solida fondata sul godimento sereno della terra e del corpo; il nodo è non farsi paralizzare dall'avarizia."
    },
    "Gemini": {
      "title": "Punto di Fortuna in Gemelli — La Gioia dell’Intelletto Vivace e la Prosperità nelle Relazioni",
      "text": "La felicità dell'anima scaturisce dalla curiosità inesauribile, dalla varietà degli stimoli intellettuali e dalla leggerezza del gioco comunicativo quotidiano. Raggiungi il tuo centro ideale quando puoi connettere idee diverse, divulgare conoscenze con arguzia e tessere reti sociali vivaci senza vincoli rigidi. La vita ti sorride attraverso scoperte impreviste, incontri fortuiti e letture illuminanti che mantengono lo spirito eternamente giovane e flessibile. Sei un interprete straordinario del presente. L'ostacolo è la dispersione superficiale: svolazzare tra mille interessi senza approfondirne alcuno, scivolando nell'ansia da sovrastimolazione informativa.",
      "sintesi": "Benessere scaturito dalla curiosità intellettuale e dallo scambio verbale; il rischio risiede nel disperdere il fuoco mentale."
    },
    "Cancer": {
      "title": "Punto di Fortuna in Cancro — La Beatitudine del Focolare e l’Accoglienza Radicata",
      "text": "La sorgente della tua realizzazione prospera nel grembo della tenerezza affettiva, nella cura del nido domestico e nella fedeltà alle proprie radici emotive profonde. Sperimenti una grazia immensa quando puoi offrire rifugio e nutrimento intimo a chi ami, creando spazi caldi in cui ogni vulnerabilità viene protetta e onorata come un tesoro sacro. La prosperità coincide con la pace interiore e con la sicurezza del cuore. C'è un intuito psicologico formidabile. La debolezza è il rifugio regressivo: chiudersi a riccio nei ricordi del passato per paura delle intemperie esterne, soffocando le relazioni con un attaccamento ansioso.",
      "sintesi": "Gioia radicata nella tenerezza familiare e nella sicurezza del nido; il limite è fuggire il confronto con il mondo esterno."
    },
    "Leo": {
      "title": "Punto di Fortuna in Leone — La Maestà del Cuore e la Gloria dell’Espressione Solare",
      "text": "Il compimento esistenziale fiorisce nella gioia dell'autoespressione magnanima, nella creatività generosa e nel calore radioso con cui incoraggi gli altri a brillare. La sorte sostiene le tue imprese quando agisci con cuore nobile e fiero, disdegnando le mezze misure o i calcoli meschini e celebrando la vita con entusiasmo festoso e teatrale. Possiedi il dono regale di accendere l'entusiasmo ovunque ti trovi, donando senza riserve. L'ombra coincide con la vanità infantile: pretendere l'applauso costante come condizione per essere felici, precipitando nell'amarezza quando il mondo non riconosce la tua luce.",
      "sintesi": "Fioritura solare attraverso la creatività magnanima e il calore vitale; la trappola risiede nella dipendenza dagli applausi mondani."
    },
    "Virgo": {
      "title": "Punto di Fortuna in Vergine — La Grazia della Precisione e la Realizzazione nell’Opera Quotidiana",
      "text": "La pienezza interiore si conquista nell'armonia dell'ordine intelligente, nell'efficienza metodica e nel sollievo concreto che puoi portare agli esseri viventi. Trovi la tua beatitudine quando perfezioni una tecnica, bonifichi un ambiente disordinato o metti la tua perizia al servizio della salute e del buon funzionamento dei sistemi quotidiani. L'universo ti ricompensa attraverso la maestria artigianale e la chiarezza limpida del discernimento. C'è una dedizione discreta e nobilissima. Il rischio è l'ipercritica logorante: torturarsi per dettagli insignificanti, perdendo di vista la bellezza complessiva del mosaico della vita.",
      "sintesi": "Realizzazione ottenuta nell'arte dell'ordine pratico e della cura del vivente; l'insidia è il perfezionismo ansioso che toglie il respiro."
    },
    "Libra": {
      "title": "Punto di Fortuna in Bilancia — L’Armonia dell’Accordo Perfetto e la Grazia Relazionale",
      "text": "Il successo più alto e la felicità più autentica sbocciano nella mediazione diplomatica, nella creazione di bellezza artistica e nella reciprocità limpida degli incontri umani. Sei al culmine delle tue energie quando favorisci la concordia tra le parti, coltivando relazioni basate su squisita equità, rispetto contrattuale e raffinatezza estetica. La fortuna ti arride quando cooperi da pari a pari, rifiutando ogni sopraffazione brutale. C'è un fascino conciliante irresistibile. Il pericolo è la paralisi dell'indecisione: dipendere eccessivamente dall'approvazione altrui per timore del conflitto, sacrificando la propria autenticità sull'altare di una pace apparente.",
      "sintesi": "Prosperità nutrita dall'armonia relazionale e dal senso della giustizia; il nodo è non smarrire il proprio volere nel compromesso."
    },
    "Scorpio": {
      "title": "Punto di Fortuna in Scorpione — La Rinascita dalle Crisi e l’Oro Alchemico dell’Abisso",
      "text": "La fortuna non si manifesta in pascoli tranquilli ma nelle acque agitate della trasmutazione profonda, dove ogni perdita diventa il concime per una rinascita trionfale. Raggiungi la tua massima potenza quando accetti di guardare nell'ombra, smascherando le ipocrisie e rigenerando le risorse materiali e psicologiche attraverso un'onestà viscerale che non teme la fine delle forme esaurite. C'è un magnetismo formidabile che attrae ricchezze nascoste. Il trabocchetto risiede nell'ossessione del controllo: cedere alla diffidenza rancorosa, vivendo come in una perenne trincea psicologica che impedisce di godere della luce del sole.",
      "sintesi": "Potenza e rigenerazione che trionfano attraverso le crisi più aspre; la trappola è restare avvelenati dal sospetto e dalla vendetta."
    },
    "Sagittarius": {
      "title": "Punto di Fortuna in Sagittario — L’Abbondanza dei Grandi Spazi e la Fede nella Luce",
      "text": "La pienezza dell'essere si espande a dismisura nel viaggio verso orizzonti sconosciuti, nella ricerca filosofica appassionata e nella fiducia incrollabile nell'ordine benevolo del cosmo. La sorte ti spalanca le porte quando agisci con generosità audace, abbracciando culture eterogenee, divulgando visioni elevate e mantenendo uno sguardo ottimista e privo di cinismo. Trovi la tua fortuna nell'avventura della conoscenza e nella libertà di movimento. C'è una grazia che attira opportunità provvidenziali. L'ostacolo è l'eccesso di presunzione: confidare incautamente nella buona sorte trascurando i limiti concreti della realtà materiale.",
      "sintesi": "Abbondanza cosmica alimentata dalla fede nel destino e dall'esplorazione; il rischio risiede nella temerarietà imprudente."
    },
    "Capricorn": {
      "title": "Punto di Fortuna in Capricorno — La Sovranità della Vetta e la Ricompensa della Perseveranza",
      "text": "La realizzazione più solida e duratura si edifica attraverso la disciplina stoica, la maturità paziente e la conquista graduale di vette professionali e sociali prestigiose. Sperimenti una gioia profonda quando vedi i tuoi progetti strutturarsi nella materia con maestria architettonica, resistendo all'erosione del tempo grazie a una dirittura etica impeccabile. Il destino premia la tua tenacia silenziosa con un'autorevolezza indiscussa e con risorse tangibili stabili. C'è una grandezza solenne. Il limite è la solitudine arida: sacrificare ogni slancio affettivo al raggiungimento di doveri istituzionali, pietrificandosi in una severità senza sorrisi.",
      "sintesi": "Successo indistruttibile edificato con pazienza e rigore magistrale; l'insidia è inaridire l'anima sull'altare dell'ambizione fredda."
    },
    "Aquarius": {
      "title": "Punto di Fortuna in Acquario — La Libertà della Visione Fraterna e il Trionfo dell’Originalità",
      "text": "La beatitudine più pura si compie quando rompi gli schemi obsoleti della tradizione, partecipando a battaglie per l'emancipazione collettiva e inventando soluzioni d'avanguardia per il benessere dell'umanità. La prosperità fluisce nella tua vita quando operi all'interno di reti paritarie, valorizzando la diversità di ciascuno e custodendoti libero da conformismi soffocanti. Trovi la tua fortuna nell'essere una voce innovatrice e fraterna che guarda avanti con speranza indomita. C'è un genio lungimirante. La vulnerabilità è il distacco teorico: disperdersi in utopie astratte perdendo il contatto con le esigenze concrete ed emotive del presente quotidiano.",
      "sintesi": "Fioritura autentica nell'innovazione civile e nella libertà tra pari; il limite risiede nel rifugiarsi in astrattismi impersonali."
    },
    "Pisces": {
      "title": "Punto di Fortuna in Pesci — La Grazia dell’Abbandono Mistico e la Comunione Oceanica",
      "text": "La sorgente della felicità suprema risiede nella fusione con il mistero invisibile, nella compassione universale che scioglie ogni giudizio e nella contemplazione della bellezza poetica e musicale. Raggiungi la pienezza dell'essere quando deponi l'ansia del controllo egotico, lasciandoti guidare dal flusso provvidenziale della vita con fede incondizionata e aprendo il cuore alla cura dei sofferenti. La sorte ti premia attraverso sincronicità prodigiose e intuizioni artistiche divine. C'è una soavità salvifica. Il pericolo è l'evasione disordinata: rifugiarsi in fantasie passive o fuggire la concretezza della vita terrena per timore del dolore mondano.",
      "sintesi": "Beatitudine nella compassione oceanica e nella comunione col mistero; il nodo è non perdersi nella passività sognante."
    }
  },
  "houses": {
    "1": {
      "title": "Punto di Fortuna in Prima Casa — La Forza Radiosa dell’Autenticità Personale",
      "text": "Il sigillo della prosperità è impresso direttamente sul portamento, sull'energia vitale e sulla spontaneità con cui ti presenti al mondo. Raggiungi il tuo massimo benessere quando ti fidi del tuo istinto primario, agendo con coraggio e senza chiedere permessi preventivi per esprimere la tua unicità. La fortuna risiede nell'essere totalmente fedeli a se stessi: la tua presenza fisica e magnetica apre porte insperate ovunque ti muovi. C'è una naturalezza radiosa che infonde sicurezza negli altri. Il rischio risiede nell'egocentrismo ingenuo: dimenticare che la propria fioritura deve armonizzarsi con le esigenze di chi cammina al tuo fianco.",
      "sintesi": "Prosperità scaturita dall'autenticità e dalla vitalità personale; l'insidia è isolarsi in un individualismo autoreferenziale."
    },
    "2": {
      "title": "Punto di Fortuna in Seconda Casa — La Generazione Spontanea dell’Abbondanza Materiale",
      "text": "La collocazione nella casa delle risorse indica un talento innato nel produrre ricchezza, attrarre stabilità economica e valorizzare i propri talenti con pragmatismo impeccabile. La pienezza giunge quando comprendi il valore del denaro come energia neutra di libertà e nutrimento, investendo in beni solidi e vivendo in armonia con le proprie necessità corporee. L'abbondanza fluisce con generosità costante quando lavori con calma e determinazione terrena. C'è una fecondità mirabile. La trappola è l'ossessione conservatrice: farsi dominare dall'ansia di accumulare beni, finendo per diventare prigionieri del proprio stesso patrimonio.",
      "sintesi": "Abbondanza materiale e sicurezza solida nate dal lavoro paziente; la tentazione da disinnescare è la paura ansiosa della penuria."
    },
    "3": {
      "title": "Punto di Fortuna in Terza Casa — Il Dono della Parola Chiara e la Grazia nell’Ambiente Immediato",
      "text": "La sorte benevola si manifesta nella fluidità delle comunicazioni quotidiane, nell'apprendimento rapido e nella vivacità dei legami con fratelli, vicini e compagni di strada. Sperimenti una gioia profonda quando metti in circolo informazioni utili, scrivi con eleganza o risolvi problemi pratici grazie a un intelletto flessibile e sempre vigile. La prosperità bussa alla tua porta attraverso piccoli viaggi, conversazioni stimolanti e intuizioni brillanti. C'è una freschezza contagiosa nel comunicare. Il pericolo è la dispersione logorroica: consumare le proprie preziose risorse mentali in chiacchiere sterili e polemiche di poco conto.",
      "sintesi": "Felicità coltivata nella chiarezza verbale e negli scambi quotidiani; il limite risiede nel disperdere le energie in futilità."
    },
    "4": {
      "title": "Punto di Fortuna in Quarta Casa — La Serenità Radicata nel Centro Interiore e nel Nido",
      "text": "Il tesoro più prezioso della tua vita è custodito nella quiete domestica, nella pace del santuario interiore e nella bonifica delle memorie genealogiche. Raggiungi la beatitudine quando costruisci un focolare accogliente e sicuro, capace di proteggere la tua intimità dal tumulto mondano e di offrire radici stabili alla tua crescita personale. La prosperità giunge spesso attraverso proprietà immobiliari, beni di famiglia o un'attività svolta tra le mura domestiche. C'è un calore rigeneratore inestimabile. L'ombra è la reclusione difensiva: rinchiudersi nella comodità del nido per timore di affrontare le sfide della vita pubblica.",
      "sintesi": "Pace profonda e fortuna radicata nel calore del focolare; il nodo è non fare della casa una trincea contro il mondo esterno."
    },
    "5": {
      "title": "Punto di Fortuna in Quinta Casa — L’Estasi della Creazione Artistica e la Luce del Gioco",
      "text": "La fortuna si riversa abbondante dove ci sono celebrazione della vita, passione amorosa, talento artistico e gioia radiosa condivisa con i figli o con il pubblico. Conquisti la tua fioritura più piena quando tratti l'esistenza come un'opera d'arte da scolpire con generosità fiera, disdegnando la monotonia borghese e investendo con entusiasmo nei tuoi desideri più autentici. Il successo ti sorride attraverso progetti creativi originali e un carisma affascinante. C'è una luminosità feconda. Il rischio è la dissipazione teatrale: cercare continuamente emozioni forti o scommesse rischiose per placare un vuoto interiore temporaneo.",
      "sintesi": "Gioia radiosa manifestata nell'arte, nel gioco e nella celebrazione vitale; l'ostacolo è dissipare le energie in drammi effimeri."
    },
    "6": {
      "title": "Punto di Fortuna in Sesta Casa — La Maestria Risanatrice nell’Organizzazione del Vivente",
      "text": "Il senso di compimento e di pace operosa scaturisce dalla cura meticolosa della salute, dall'efficienza dell'ingranaggio quotidiano e dal sollievo pratico offerto al prossimo. Sperimenti un senso profondo di utilità e armonia quando metti ordine nel disordine, sviluppando competenze tecniche raffinate e dedicandoti con generosità metodica al benessere dei colleghi o dei collaboratori. L'universo ricompensa la tua umile dedizione con sicurezza lavorativa e rispetto universale. C'è un'intelligenza pratica formidabile. La trappola è l'ansia del dovere: consumarsi nel lavoro incessante dimenticando di concedere riposo e svago alla propria persona.",
      "sintesi": "Realizzazione conquistata nel lavoro ben fatto e nella cura quotidiana; il limite è cadere nell'ossessione del dovere continuo."
    },
    "7": {
      "title": "Punto di Fortuna in Settima Casa — La Benedizione dell’Incontro e l’Armonia tra Pari",
      "text": "La tua prosperità esistenziale è strettamente connessa alla qualità delle relazioni intime, dei patti matrimoniali e delle collaborazioni professionali basate sull'equità. Raggiungi il massimo splendore quando impari a cooperare da pari a pari, trovando nell'altro uno specchio leale che amplia le tue prospettive e moltiplica le tue risorse terrene. La sorte ti favorisce attraverso contratti vantaggiosi e compagni di vita devoti e fidati. Possiedi una grazia diplomatica irresistibile. Il pericolo è l'eccessiva dipendenza: subordinare la propria felicità al consenso costante dell'altro, temendo la solitudine come una sventura.",
      "sintesi": "Abbondanza e compimento nutriti dall'alleanza armoniosa tra pari; l'insidia risiede nel delegare la propria felicità al partner."
    },
    "8": {
      "title": "Punto di Fortuna in Ottava Casa — Il Riscatto dell’Eredità Psichica e il Tesoro dell’Ombra",
      "text": "La collocazione nell'ottavo settore orienta la fortuna verso le risorse condivise, le eredità inattese, gli investimenti finanziari strategici e la maestria psicologica nelle crisi. Scopri la tua vera abbondanza quando hai il coraggio di scendere nell'abisso delle tue emozioni, trasmutando la paura e il dolore in un potere spirituale indistruttibile. La sorte ti arride nelle situazioni limite, dove la tua lucidità consente di salvare patrimoni o relazioni apparentemente compromessi. C'è un'autorità magnetica. L'ombra è la lotta sotterranea di potere: farsi consumare dal controllo o dall'avidità nelle questioni di denaro comune.",
      "sintesi": "Trionfo e ricchezza estratti dalle prove dell'abisso e dalle crisi; il nodo è non lasciarsi corrompere dal desiderio di dominio."
    },
    "9": {
      "title": "Punto di Fortuna in Nona Casa — La Beatitudine della Sapienza Superiore e dei Grandi Viaggi",
      "text": "La fortuna dispiega le sue ali maestose nei grandi viaggi geografici e interiori, nello studio della filosofia, dell'astrologia o del diritto e nell'insegnamento illuminato. Fiorisci pienamente quando oltrepassi le frontiere del noto, confrontandoti con culture straniere e coltivando una visione etica cosmopolita che infonde speranza a chi ti ascolta. La vita ti ricompensa attraverso opportunità propizie all'estero e una reputazione accademica o spirituale eccellente. C'è un ottimismo che attira la benevolenza del destino. Il rischio è la presunzione dogmatica: ergersi a maestri infallibili disdegnando la concretezza della vita quotidiana.",
      "sintesi": "Prosperità alimentata da ampi orizzonti filosofici e viaggi dello spirito; l'ostacolo è il distacco snob dalla realtà ordinaria."
    },
    "10": {
      "title": "Punto di Fortuna in Decima Casa — Il Compimento della Vocazione e l’Autorità Riconosciuta",
      "text": "Il compimento esistenziale culmina nella realizzazione professionale, nella reputazione pubblica impeccabile e nella conquista di un ruolo di prestigio nella società. Sperimenti una profonda beatitudine quando vedi i tuoi sforzi riconosciuti dalla comunità, assumendo responsabilità direttive con dignità etica e saggezza protettiva verso chi dipende dalla tua guida. La fortuna sostiene le tue ambizioni più alte, coronando la tua costanza con un successo solido e duraturo. C'è una maestà autorevole. La debolezza è la prigionia dello status: sacrificare la propria felicità intima e il riposo per preservare a ogni costo l'immagine pubblica.",
      "sintesi": "Trionfo professionale e onore sociale raggiunti con integrità; la trappola risiede nel sacrificare la vita interiore alle ambizioni esterne."
    },
    "11": {
      "title": "Punto di Fortuna in Undicesima Casa — La Realizzazione nei Progetti Comuni e nella Rete Fraterna",
      "text": "La sorgente della prosperità scaturisce dalle amicizie sincere, dalla cooperazione all'interno di circoli intellettuali e dalla partecipazione attiva a ideali di progresso comunitario. La pienezza esistenziale si accende quando collabori a progetti di ampio respiro con spiriti fraterni, orientando il tuo ingegno verso riforme civili che nobilitano la comunità. La sorte ti sorride attraverso alleanze fidate e la protezione di figure influenti che credono nella tua visione. C'è una fratellanza radiosa. Il pericolo è l'astrattezza farraginosa: perdere tempo in utopie collettive inconcludenti che non producono alcun frutto tangibile per la vita.",
      "sintesi": "Felicità nutrita dalla condivisione fraterna e da progetti per il futuro; il limite è disperdersi in teorie astratte prive di concretezza."
    },
    "12": {
      "title": "Punto di Fortuna in Dodicesima Casa — Il Tesoro Invisibile del Silenzio e la Pace dell’Anima",
      "text": "Il Punto di Fortuna dimora nella casa del mistero, della contemplazione solitaria e della trascendenza spirituale: la tua ricchezza più pura è invisibile agli occhi del mondo superficiale. Sperimenti una grazia ineffabile nei ritiri meditativi, nel silenzio della preghiera o nell'opera caritatevole svolta al riparo da ogni vanagloria mondana. La vita ti protegge in modo provvidenziale da pericoli occulti, donandoti una serenità interiore indistruttibile che nessuna tempesta terrestre può turbare. C'è una compassione salvifica. L'ombra è l'inerzia isolazionista: fuggire nel sogno mistico per paura di affrontare i doveri ordinari della vita terrena.",
      "sintesi": "Pace mistica e protezione provvidenziale custodite nel silenzio dell'anima; l'insidia è fuggire la realtà rifugiandosi nell'isolamento."
    }
  },
  "dignities": {},
  "combinations": {
    'Taurus|2': {
        title: "Punto di Fortuna in Toro in Seconda Casa",
        canonico: "La presenza della Parte di Fortuna nel Toro e nel secondo settore segnala che il compimento naturale dell'anima, il senso di pienezza vitale e la fioritura della provvidenza si realizzano attraverso il contatto diretto con la materia feconda, la stabilità patrimoniale e la serenità corporea. Gli antichi scorgevano in questo schema l'indice di una grazia tangibile che premia la pazienza operosa, il senso del valore intrinseco e l'amore per i frutti della terra. La persona trova gioia genuina nel costruire risorse solide con le proprie mani, godendo della ricchezza senza frenesie speculative e istituendo un ambiente di accoglienza serena. Le insidie canoniche risiedono nell'attaccamento possessivo ai beni esteriori, nella paura paralizzante dei mutamenti economici e nella tendenza a considerare il benessere fisico come unico metro di giudizio. L'avidità che accumula per paura del domani si trasforma presto in una prigione di ferro: la fortuna terrena conserva fragranza e grazia solo finché la mano sa aprirsi per seminare con gioiosa confidenza nel ciclo delle stagioni.",
        lilithiano: "Cresci con la voce asfissiante della scarsità nelle orecchie, sentendoti ripetere che la terra è una matrigna crudele e che ogni momento di abbondanza sarà pagato a caro prezzo da rovesci improvvisi. Le prediche sulla frugalità forzata mascheravano il terrore della scarsità, imponendo la rinuncia al piacere come supremo contrassegno della virtù.\n\nLilith appare nel mezzo della tua oasi e spazza via le nebbie dell'ansia economica: la tua carne è fatta della medesima sostanza dell'universo e ha pieno titolo per prosperare nella pienezza e nel conforto sovrano. L'angoscia della fame è un'arma brandita dai padroni per farti accettare compromessi miserabili e legarti a contratti servili. Rompi l'illusione della povertà ancestrale: il tuo vero patrimonio non riposa nei forzieri protetti dalle serrature, ma nella tua formidabile capacità di generare sostanza ovunque tu poggi i piedi. Quando rifiuti di tremare davanti ai ricatti materiali, la terra ti risponde con generosità regale.\n\nDimostri un fiuto magistrale per la fertilità e una saggezza pacata che sa trasformare fatiche grezze in opere durature e piaceri genuini: crei rifugi di pace e ricchezza che resistono alle tempeste della storia. La ricchezza che non deve chiedere scusa a nessuno feconda la realtà circostante: godere del frutto della terra senza sensi di colpa apre sorgenti di abbondanza inesauribile.",
        sintesi: "Punto di Fortuna nel grembo del Toro in seconda casa: compimento somatico e prosperità terrena che fioriscono dissipando l'incubo ancestrale della scarsità."
      },
    'Sagittarius|9': {
        title: "Punto di Fortuna in Sagittario in Nona Casa",
        canonico: "La collocazione della Parte di Fortuna nel Sagittario e nella nona casa indica che la realizzazione dell'individuo e l'accesso alla felicità prosperano nella dilatazione degli orizzonti intellettuali, nei grandi viaggi della mente e del corpo e nella scoperta entusiastica di una sintesi sapienziale universale. La tradizione astrologica vi scorge il sigillo dell'esploratore illuminato, la cui provvidenza risiede nella generosità di vedute, nella fede limpida verso il destino e nella capacità di scorgere un senso provvidenziale dietro le vicende del mondo. Chi porta questa configurazione trova la propria fortuna ogni volta che osa valicare i confini del conosciuto, dialogando con culture eterogenee e trasmettendo speranza ai viandanti. I rischi canonicamente attestati riguardano l'ottimismo ingenuo che sottovaluta i pericoli reali, la presunzione dogmatica che trasforma la libertà in arroganza dottrinale e l'inquietudine perpetua che impedisce ogni approdo stabile. La ricerca della beatitudine che ignora la polvere del tragitto si riduce a un'avventura turistica dell'intelletto: la fortuna spirituale arricchisce la persona solo se la grandezza delle idee trova compimento in una condotta limpida e leale verso i compagni di strada.",
        lilithiano: "Volevano rinchiudere il tuo sguardo entro i confini stretti del cortile di paese, imponendoti di recitare formule preconfezionate e spiegandoti che l'audacia filosofica fosse una tracotanza punibile con l'emarginazione. La mediocrità del villaggio e i divieti dell'ortodossia sbarravano le porte a qualsiasi esplorazione filosofica che non fosse stata preventivamente vidimata dall'autorità.\n\nLilith cavalca al tuo fianco sulle piste aperte del vento per disperdere i fumi dell'oscurantismo confessionale: l'universo non è una sala di tribunale né un carcere punitivo per peccatori trepidanti. La tua fortuna coincide esattamente con la tua audacia intellettuale di spingerti oltre le colonne d'Ercole delle consuetudini. Non devi chiedere il permesso ad alcuno per esplorare le vette della filosofia o per sperimentare la grazia dell'esistenza. Nel nono settore del Sagittario la tua gioia sovrana si accende quando rifiuti la mediocrità dei dogmi angusti e osi credere nella dignità sconfinata del tuo spirito errante.\n\nNutri un entusiasmo contagioso e un respiro profetico che sa infondere coraggio negli animi smarriti, indicando rotte di liberazione che nessuno osava immaginare: la tua mente vola alta sui crinali della verità. Cavalcare verso l'aperto senza mendicare garanzie dogmatiche è la suprema ricchezza dello spirito: la beatitudine fiorisce lungo il tragitto di chi osa guardare l'infinito a viso aperto.",
        sintesi: "Punto di Fortuna nei vasti orizzonti del Sagittario in nona casa: grazia provvidenziale ed espansione sapienziale che trionfano superando ogni gabbia dottrinale."
      }
  }
};


BODIES.Vertex = {
  "signs": {
    "Aries": {
      "title": "Vertice in Ariete — L’Incontro Fatale con l’Audacia e l’Iniziazione all’Azione",
      "text": "Il punto elettrico del destino si accende attraverso situazioni improvvise che esigono coraggio indomito, affermazione personale e rottura decisa con qualsiasi dipendenza rassicurante. Nella tua vita gli eventi cruciali assumono spesso la forma di sfide inattese o incontri catalizzatori che costringono a prendere in mano la propria esistenza con risolutezza immediata. L'evoluzione personale chiede di scoprire il guerriero pacifico interiore, imparando a guidare il proprio cammino senza mendicare l'approvazione altrui. L'ombra è la reattività rabbiosa: reagire agli eventi del destino con aggressività cieca o impulsività distruttiva, scambiando la violenza per forza sovrana.",
      "sintesi": "Svolta fatale che esige audacia e autonomia; il rischio è reagire con rabbia impulsiva alle richieste del destino."
    },
    "Taurus": {
      "title": "Vertice in Toro — L’Appello del Destino alla Stabilità e al Valore Tangibile",
      "text": "L'asse del destino attraversa il regno della materia, spingendoti a costruire una sicurezza economica duratura e a sviluppare un'autosufficienza terrena incorruttibile. Gli incontri sincronici e le svolte esistenziali ti orientano a fare chiarezza sui tuoi valori primari, imparando a riconoscere ciò che merita devozione autentica e abbandonando speculazioni effimere. Il compito evolutivo è custodire con pazienza la vita tangibile, rispettando i ritmi biologici della terra e della carne. Il trabocchetto risiede nell'ostinazione difensiva: resistere al richiamo dell'evoluzione per paura di perdere i propri punti di riferimento materiali consolidati.",
      "sintesi": "Chiamata del destino all'ancoraggio materiale e alla stabilità; l'insidia è il rifiuto ostinato di ogni mutamento vitale."
    },
    "Gemini": {
      "title": "Vertice in Gemelli — La Svolta Elettrica nella Parola e l’Epifania Intellettuale",
      "text": "Il destino si manifesta come una folgorazione verbale, un incontro inatteso con un'idea rivoluzionaria o una conversazione casuale che devia per sempre il corso della tua esistenza. La vita ti sprona a sviluppare una mente flessibile, capace di mettere in discussione certezze dogmatiche e di fare da ponte informativo tra mondi apparentemente incompatibili. Le lezioni cruciali arrivano attraverso lo studio, la scrittura e la trasmissione schietta del vero. L'ostacolo è l'ambiguità opportunistica: fuggire la profondità etica delle proprie intuizioni, rifugiandosi in una vivacità intellettuale fine a se stessa che non conclude nulla.",
      "sintesi": "Risveglio fatale attraverso il dialogo e la conoscenza; il pericolo è perdersi nella curiosità frammentaria senza sintesi."
    },
    "Cancer": {
      "title": "Vertice in Cancro — La Chiamata Karmica alla Vulnerabilità e alla Cura del Cuore",
      "text": "La porta del destino si spalanca nell'ambito dell'intimità affettiva, della salvaguardia delle radici familiari e dell'accoglienza incondizionata delle proprie emozioni profonde. Eventi provvidenziali ti conducono a deporre corazze professionali rigide per apprendere l'arte sacra della compassione e del nutrimento empatico verso il prossimo e verso la propria persona. L'anima scopre la vocazione a diventare un rifugio caldo per chi è smarrito. La debolezza consiste nella tentazione del controllo affettivo: ricorrere al senso di colpa o a fragilità ostentate per trattenere a ogni costo chi tenta di allontanarsi.",
      "sintesi": "Iniziazione del destino alla tenerezza e alla vulnerabilità; la trappola è usare il bisogno d'amore come strumento di controllo."
    },
    "Leo": {
      "title": "Vertice in Leone — Il Risveglio Solare della Sovranità e la Prova del Coraggio Espressivo",
      "text": "Il varco elettrico del Vertice impone una prova ineludibile di dignità, presenza carismatica e assunzione del proprio talento creativo davanti al mondo. Le svolte decisive della vita si verificano quando le circostanze ti costringono a uscire dall'ombra della massa, assumendo un ruolo di guida magnanima e ispiratrice senza timore del giudizio altrui. La sfida del cuore consiste nel brillare di luce propria con generosità fiera. Il rischio risiede nel narcisismo ferito: pretendere adorazione cieca da chi ti circonda o crollare nell'amarezza teatrale se il destino non ti riserva il plauso immediato.",
      "sintesi": "Svolta provvidenziale che esige leadership e creatività; il nodo è non confondere la vera dignità con la vanità teatrale."
    },
    "Virgo": {
      "title": "Vertice in Vergine — La Svolta Fatale nel Servizio e l’Iniziazione all’Ordine Sacro",
      "text": "L'appello karmico si manifesta nell'opera quotidiana, nell'acquisizione di una perizia tecnica impeccabile e nella consacrazione delle proprie forze al risanamento olistico del vivente. Eventi improvvisi possono cambiare radicalmente le tue abitudini di salute o la tua professione, orientandoti verso il servizio pratico, l'ecologia o la cura scientifica delle disfunzioni umane. Il sentiero evolutivo chiede di nobilitare ogni gesto con precisione e umiltà. L'ombra è l'ipercritica autodistruttiva: perdersi nell'ansia dei dettagli imperfetti, logorando la serenità d'animo con un perfezionismo che paralizza l'azione.",
      "sintesi": "Chiamata del destino all'efficienza risanatrice e al servizio pratico; l'insidia è farsi sopraffare dall'ansia del controllo."
    },
    "Libra": {
      "title": "Vertice in Bilancia — L’Incontro Predestinato con l’Altro e la Bilancia della Giustizia",
      "text": "La porta elettrica si apre nell'incontro speculare con l'altro: relazioni decisive, patti nuziali o collaborazioni contrattuali irrompono nella tua vita con la forza del destino, obbligandoti a confrontarti con la parità e con l'equità etica. La maturità spirituale esige di sviluppare una maestria diplomatica incorruttibile, imparando a conciliare posizioni opposte senza tradire la verità del tuo animo. C'è una ricerca altissima di grazia e giustizia. La tentazione da evitare è il compromesso pavido: accettare accordi ingiusti o umilianti pur di preservare la pace esteriore, rinnegando la propria integrità.",
      "sintesi": "Incontri fatali che insegnano l'equità e la diplomazia; il limite è svendere la propria voce per paura dei disaccordi."
    },
    "Scorpio": {
      "title": "Vertice in Scorpione — La Metamorfosi Ineluttabile nell’Abisso e la Verità Viscerale",
      "text": "Il punto del destino scava nelle profondità psicologiche più vertiginose: crisi inattese, esperienze limite o legami travolgenti demoliscono le tue difese consce per costringerti a una rigenerazione totale dell'essere. Il cammino interiore impone di affrontare i tabù, trasmutando il veleno delle perdite in oro spirituale e risorgendo dalle ceneri dei vecchi attaccamenti con un'onestà viscerale che non teme nulla. Possiedi un potere alchemico prodigioso. Il pericolo è l'avvelenamento rancoroso: restare intrappolati nel risentimento vendicativo, usando la propria conoscenza occulta per dominare gli altri.",
      "sintesi": "Svolta iniziatica attraverso la discesa nell'ombra e la rinascita; la trappola risiede nel cedere al veleno della vendetta."
    },
    "Sagittarius": {
      "title": "Vertice in Sagittario — L’Irruzione della Verità Filosofica e la Fede Ritrovata",
      "text": "La chiamata del destino assume la forma di un'espansione subitanea degli orizzonti: viaggi in terre remote, incontri con maestri spirituali o crisi di fede che demoliscono le angustie dei pregiudizi provinciali. L'esistenza ti esorta a intraprendere una ricerca instancabile del senso supremo della vita, abbracciando una filosofia cosmopolita e donando agli altri una prospettiva carica di ottimismo e speranza autentica. C'è una vocazione all'insegnamento etico. L'ostacolo è il fanatismo dottrinale: ergersi a profeti intolleranti della propria verità, giudicando chiunque non condivida il tuo credo.",
      "sintesi": "Risveglio karmico orientato alla saggezza e all'esplorazione; il rischio è scivolare nell'arroganza del dogmatismo religioso."
    },
    "Capricorn": {
      "title": "Vertice in Capricorno — La Vocazione Ineludibile alla Responsabilità e al Potere Sovrano",
      "text": "Il Vertice ti mette a confronto con la prova del tempo, della maturità stoica e dell'assunzione di pesanti responsabilità civili o professionali. Le svolte del destino spingono a diventare la guida ferma e affidabile di cui la comunità ha bisogno, costruendo opere solide che durano nel tempo senza pretendere applausi immediati. Il compimento si raggiunge conquistando la vetta personale attraverso l'integrità etica e la pazienza incrollabile. Il limite è l'indurimento cinico: credere che la vita sia unicamente sacrificio e dovere burocratico, chiudendo il cuore a ogni tenerezza spontanea.",
      "sintesi": "Chiamata del destino all'autorevolezza etica e alla perseveranza; l'insidia è inaridire l'anima in una severità spietata."
    },
    "Aquarius": {
      "title": "Vertice in Acquario — L’Incontro con l’Avanguardia Fraterna e la Rottura delle Catene",
      "text": "La porta elettrica del destino scardina le consuetudini ordinarie, proiettandoti verso comunità innovative, movimenti di emancipazione civile o scoperte tecnologiche rivoluzionarie. Eventi imprevisti ti strappano al conformismo rassicurante della cerchia familiare, chiedendo di dedicare le migliori risorse alla causa della libertà e dell'uguaglianza tra spiriti liberi. Diventi una sentinella del futuro che non teme di apparire controcorrente. La debolezza è la ribellione sterile: coltivare l'anticonformismo come pura provocazione egotica, senza costruire alternative concrete.",
      "sintesi": "Svolta provvidenziale verso ideali fraterni e libertà sociale; il nodo è non ridurre l'originalità a una posa eccentrica."
    },
    "Pisces": {
      "title": "Vertice in Pesci — Il Risveglio Mistico della Compassione e la Dissoluzione dei Confini",
      "text": "L'appello karmico tocca le corde della trascendenza spirituale, della dedizione misericordiosa ai bisognosi e della riconnessione mistica con la totalità del cosmo. Sincronicità misteriose o prove esistenziali complesse dissolvono i confini egoici, insegnando l'arte sublime del perdono incondizionato e della preghiera silenziosa. L'anima scopre il dono di farsi canale vivente di grazia e risanamento per chi soffre nel gelo mondano. Il rischio è la deriva vittimistica: farsi travolgere dal caos emotivo o cercare l'evasione in dipendenze illusorie per fuggire la concretezza terrena.",
      "sintesi": "Iniziazione del destino alla compassione universale e all'estasi mistica; il limite è annegare nella confusione e nella fuga."
    }
  },
  "houses": {
    "1": {
      "title": "Vertice in Prima Casa — Il Varco Elettrico dell’Autodefinizione e la Rivelazione di Sé",
      "text": "La presenza del Vertice in prossimità dell'Ascendente segnala che la tua intera incarnazione terrena è scandita da svolte fulminee che ridefiniscono radicalmente la personalità. Incontri persone o sperimenti eventi catalizzatori che agiscono come fulmini sul tuo cammino, costringendoti a gettare vecchie maschere per abbracciare un'autenticità fiera e indomabile. Il destino esige di assumere la piena sovranità della propria presenza corporea e morale senza scuse. C'è un magnetismo catalitico eccezionale. L'insidia risiede nell'impulsività ansiosa: lasciarsi sballottare da ogni tempesta esteriore invece di restare ancorati al proprio asse.",
      "sintesi": "Svolte folgoranti che forgiano l'identità e la sovranità personale; la sfida è mantenere il radicamento nel caos degli eventi."
    },
    "2": {
      "title": "Vertice in Seconda Casa — La Svolta Materiale e l’Ancoraggio ai Valori Incorruttibili",
      "text": "L'asse elettrico tocca la sfera delle finanze personali, della stabilità fisica e della scoperta della propria autosufficienza materiale. Crisi patrimoniali inattese o guadagni provvidenziali intervengono nella tua esistenza per insegnare a non poggiare la sicurezza sul consenso altrui, ma sulla padronanza delle risorse interiori e concrete. La vita sprona a edificare una ricchezza solida fondata su un'etica cristallina. C'è una fecondità potenziale enorme. La trappola è l'attaccamento avido: aggrapparsi con terrore ai beni materiali per paura di una sorte percepita come instabile e minacciosa.",
      "sintesi": "Chiamata del destino all'indipendenza economica e alla dignità concreta; il nodo è non farsi schiacciare dalla paura della perdita."
    },
    "3": {
      "title": "Vertice in Terza Casa — L’Incontro Folgorante nella Comunicazione e il Messaggero Fatale",
      "text": "Il destino parla attraverso la parola scritta, la voce di un interlocutore casuale o una notizia improvvisa che scompagina i tuoi piani razionali. Ti trovi spesso nel posto giusto al momento giusto per ricevere o trasmettere informazioni che cambiano il corso di carriere o relazioni, fungendo da messaggero provvidenziale per chi ti ascolta. L'invito primario è purificare il pensiero da ogni finzione, coltivando una dialettica veritiera e illuminante. Il rischio è la dispersione polemica: consumare l'energia delle intuizioni in battibecchi quotidiani sterili che non lasciano tracce durature.",
      "sintesi": "Epifanie folgoranti nel dialogo e nelle comunicazioni del quotidiano; il pericolo è perdersi nella polemica verbale sterile."
    },
    "4": {
      "title": "Vertice in Quarta Casa — La Chiamata Ineludibile al Riscatto delle Radici Familiari",
      "text": "Il varco karmico si colloca nelle fondamenta più intime dell'anima, nella memoria della genealogia e nella custodia del focolare domestico. Eventi ineludibili spingono ad affrontare traumi ancestrali sepolti, risanando antiche ferite di sangue attraverso la creazione di una casa accogliente e libera dai ricatti morali del clan originario. L'individuo impara a farsi genitore compassionevole e saggio della propria persona. C'è una profondità emotiva sacra. Il rischio è il rifugio regressivo: arroccarsi dentro le certezze del passato per sottrarsi al confronto e alle sfide del mondo aperto.",
      "sintesi": "Svolta fatale orientata alla bonifica delle memorie d'infanzia; l'ostacolo è il rifugio regressivo tra le mura domestiche."
    },
    "5": {
      "title": "Vertice in Quinta Casa — L’Iniziazione Folgorante nell’Amore e l’Urgenza Creativa",
      "text": "Il destino ti raggiunge attraverso passioni amorose travolgenti, l'urgenza feconda di creare opere d'arte o l'irruzione trasformativa dei figli nella tua esistenza. Questi eventi agiscono come varchi di iniziazione che spazzano via la mediocrità della vita ordinaria, costringendoti a scoprire il potere radioso del tuo cuore libero e la gioia della celebrazione vitale. La fioritura esige di donare la propria creatività senza mezze misure. Il pericolo coincide con la dissipazione drammatica: farsi travolgere da dipendenze passionali che divorano la lucidità, trasformando l'amore in una tragedia continua.",
      "sintesi": "Passioni fatali e risveglio artistico che infiammano l'anima; la trappola risiede nel consumarsi in melodrammi distruttivi."
    },
    "6": {
      "title": "Vertice in Sesta Casa — Il Varco del Destino nell’Opera Quotidiana e nella Cura del Corpo",
      "text": "L'appello elettrico del Vertice si manifesta nell'ambiente lavorativo, nella gestione dei doveri di ogni giorno o in crisi di salute che impongono una radicale riforma del proprio stile di vita. Circostanze inattese conducono a comprendere la sacralità della materia biologica, orientando l'ingegno verso discipline mediche, organizzative o ecologiche al servizio della comunità. Si scopre la maestria del gesto umile e risanatore. Il limite è l'ansia ossessiva del dovere: immolarsi sull'altare di carichi disumani credendo che il proprio valore dipenda dalla fatica.",
      "sintesi": "Iniziazione del destino attraverso il servizio quotidiano e la salute; l'insidia è farsi schiacciare dall'ansia del perfezionismo."
    },
    "7": {
      "title": "Vertice in Settima Casa — La Porta Elettrica dell’Unione Karmica e lo Specchio Fatale",
      "text": "La collocazione nel settore delle unioni rappresenta la sede classica del Vertice, dove gli incontri relazionali assumono una natura di destino inequivocabile. Partner cruciali entrano nella tua vita con un tempismo folgorante, funzionando da specchi inesorabili che mostrano parti negate della propria anima e cambiando in modo permanente la tua rotta esistenziale. L'evoluzione richiede di imparare la cooperazione paritaria e la lealtà contrattuale senza sacrificare la sovranità personale. L'ombra è la codipendenza compulsiva: credere che l'altro sia l'unico arbitro del proprio destino, cedendo il timone della vita.",
      "sintesi": "Incontri di destino e alleanze nuziali trasformatrici; il nodo è non sacrificare la propria indipendenza sull'altare della coppia."
    },
    "8": {
      "title": "Vertice in Ottava Casa — Il Crogiolo della Rigenerazione Psichica e il Patto con l’Ombra",
      "text": "Il varco karmico conduce nelle profondità alchemiche dell'inconscio, delle risorse condivise, dei legami passionali viscerali e dell'elaborazione delle perdite. L'esperienza terrena impone di attraversare tempeste emotive intense e prove di metamorfosi economica o psicologica in cui ciò che muore lascia il posto a una potenza interiore inattaccabile. Possiedi una capacità di risurrezione che disorienta chi ti credeva senza risorse. Il rischio risiede nella guerra di dominio sotterraneo: farsi avvelenare dal risentimento o usare i segreti altrui come leve di ricatto psicologico.",
      "sintesi": "Metamorfosi alchemica e rigenerazione dalle tempeste dell'abisso; la trappola è restare prigionieri della sete di controllo."
    },
    "9": {
      "title": "Vertice in Nona Casa — La Rivelazione nei Grandi Orizzonti e l’Incontro con il Maestro",
      "text": "La freccia del destino punta verso terre lontane, culture straniere e illuminazioni filosofiche che aprono varchi sconfinati nella tua coscienza. Un viaggio improvviso, la lettura di un testo sacro o l'incontro con una guida spirituale autentica possono trasformare la tua visione del mondo in un battito di ciglia, liberandoti dalle gabbie del dogmatismo originario. L'anima riceve l'impulso a farsi voce di verità universale. L'ostacolo è l'arroganza dell'illuminato: ritenersi superiori a chi vive nell'ordinario, predicando teorie astratte senza applicarle nella vita reale.",
      "sintesi": "Rivelazione filosofica e grandi viaggi che espandono l'anima; il limite è presumere di possedere la verità assoluta."
    },
    "10": {
      "title": "Vertice in Decima Casa — La Chiamata del Destino al Comando Pubblico e alla Vocazione",
      "text": "Il Vertice culmina nel settore del Medio Cielo, annunciando una vocazione pubblica che prima o poi esigerà piena dedizione davanti alla comunità. Circostanze provvidenziali chiamano ad assumere ruoli di comando, responsabilità etiche e incarichi istituzionali di rilievo, testando la dirittura morale sotto lo sguardo del pubblico. Il mandato richiede di governare senza arroganza, offrendo un esempio incorruttibile di integrità. Il rischio è la prigionia della reputazione: sacrificare la propria verità intima e gli affetti cari per difendere un ruolo di prestigio mondano.",
      "sintesi": "Chiamata del destino al ruolo pubblico e alla leadership etica; l'insidia è farsi dominare dall'ambizione e dallo status."
    },
    "11": {
      "title": "Vertice in Undicesima Casa — L’Aggancio Karmico alla Rete Collettiva e l’Ideale Rivoluzionario",
      "text": "Il varco elettrico ti proietta all'interno di circoli intellettuali, collettivi di riforma sociale o amicizie carismatiche che orientano la tua vita verso il progresso comune. Incontri compagni di strada con cui condividi un'affinità elettiva immediata, unendoti a loro per promuovere innovazioni culturali e civili capaci di abbattere vecchi privilegi. Si manifesta la missione di presenziare alla fratellanza paritaria senza cedere a fanatismi. La tentazione è il settarismo fazioso: trasformare il gruppo dei pari in una tribù chiusa ed esclusiva, considerando nemico chiunque non condivida i vostri manifesti.",
      "sintesi": "Incontri fatali nelle reti fraterne e dedizione alle riforme; il pericolo risiede nell'isolamento fazioso e dogmatico."
    },
    "12": {
      "title": "Vertice in Dodicesima Casa — Il Portale Mistico del Risveglio e l’Appello dell’Invisibile",
      "text": "La porta del destino si schiude nelle dimensioni occulte dell'inconscio collettivo, del silenzio meditativo e della comunione mistica con ciò che oltrepassa la forma terrena. Puoi sperimentare sogni profetici, risvegli interiori subitanei o la chiamata silenziosa a soccorrere chi soffre nell'ombra, scoprendo che la tua vera forza risiede nell'arrendersi al flusso misterioso della grazia. Il percorso esige di purificare il karma ancestrale attraverso il perdono compassionevole. L'ombra è la fuga dissociativa: scivolare nella paranoia o nell'auto-isolamento distruttivo per terrore delle complessità materiali del mondo.",
      "sintesi": "Risveglio mistico e portale karmico aperto sull'invisibile; la lezione è non fare della spiritualità una fuga dalla realtà terrena."
    }
  },
  "dignities": {},
  "combinations": {
    'Scorpio|8': {
        title: "Vertice in Scorpione in Ottava Casa",
        canonico: "La collocazione del Vertice nello Scorpione e nell'ottava casa concentra il crocevia del destino sulle soglie delle trasformazioni radicali, delle crisi trasmutative e degli incontri fatidici che disciolgono le difese dell'ego. La letteratura contemporanea scorge in questo varco la necessità evolutiva ineludibile di attraversare la notte dell'anima, affrontando le tematiche della morte simbolica, della rigenerazione patrimoniale e della fusione psicologica profonda. La persona sperimenta svolte biografiche repentine che mandano in frantumi le comodità esteriori per costringere la coscienza a scoprire la propria indistruttibilità essenziale. I pericoli descritti dalla tradizione riguardano la fascinazione per il baratro, il cedimento alla paranoia ossessiva e il tentativo disperato di manipolare il legame con gli altri per scongiurare l'esperienza dell'abbandono. L'ostinazione a combattere l'inevitabile trasforma la crisi in una lenta agonia: il varco fatidico si supera solo deponendo le vecchie difese per consentire alla metamorfosi di compiere la sua opera purificatrice.",
        lilithiano: "Hai incontrato presto la violenza delle rotture laceranti, sentendo franare sotto i piedi il terreno delle certezze che credevi eterne. Le prediche moralistiche dipingevano le sventure esistenziali come castighi meritati, inducendo la vergogna per ferite che chiedevano unicamente ascolto e rispetto.\n\nLilith varca con passo fermo la soglia del tuo abisso interiore e dissolve l'incantesimo della disperazione: le tempeste che hanno sradicato le tue vecchie illusioni non sono venute per annientarti, ma per forgiare una fibra sovrana che nessun tiranno potrà mai spezzare. Quello che il mondo chiama sciagura è il tuo battesimo regale di libertà. Non devi vergognarti delle cicatrici né giustificarti per la durezza che hai dovuto indossare per risalire dalle macerie. Nell'ottava casa dello Scorpione, il Vertice ti consegna l'autorità di chi ha guardato in faccia l'oscurità e ne è emerso con la fiaccola della vittoria tra le mani.\n\nBrilli di una tempra di rinascita incomparabile e di un intuito penetrante che scorge le correnti sotterranee della realtà prima di chiunque altro: niente può piegarti perché hai già conosciuto l'azzeramento e sai come risorgere con maggior vigore. Uscire intatti dall'incendio dell'anima conferisce un'autorità immune al terrore: chi ha conosciuto l'azzeramento e ne è risorto infonde una fermezza incrollabile in chiunque affronti la bufera.",
        sintesi: "Vertice fatidico in ottava casa nello Scorpione: battesimo alchemico delle crisi estreme che genera un'autorità invincibile spazzando via il terrore della perdita."
      },
    'Libra|7': {
        title: "Vertice in Bilancia in Settima Casa",
        canonico: "La presenza del Vertice tra i gradi della Bilancia e nel settimo settore oroscopico costituisce la soglia cardinale degli incontri predestinati, in cui il compimento della vocazione individuale si attua attraverso lo specchio paritario dell'alleanza relazionale. La dottrina vi ravvisa il sigillo di accordi karmici inderogabili: le unioni significative non rispondono a una scelta casuale, ma fungono da catalizzatori per l'apprendimento dell'equità contrattuale, della grazia diplomatica e della lealtà tra uguali. L'individuo è chiamato a sperimentare la reciprocità senza cadere nella compiacenza accondiscendente né nella prevaricazione mascherata. Le criticità consuete riguardano la paralisi volitiva per compiacere l'interlocutore, l'angoscia della solitudine che spinge ad accettare vincoli mortificanti e la finzione di un'armonia puramente esteriore. La fuga dal conflitto in nome della tranquillità apparente trasforma il patto predestinato in una finzione teatrale: l'incontro karmico nobilita i contraenti solo se entrambi hanno il coraggio di guardarsi negli occhi senza maschere protettive.",
        lilithiano: "Sin dalla giovinezza udivi la cantilena che voleva definire il tuo valore unicamente attraverso lo sguardo altrui, convincendoti che per meritare amore dovevi smussare ogni asperità e sacrificare la tua autenticità alle buone maniere borghesi. I precettori mondani predicavano la sottomissione affettiva come suprema virtù relazionale, paventando la solitudine come una disgrazia da scongiurare a qualsiasi costo.\n\nLilith fa il suo ingresso nella stanza degli specchi relazionali e manda in frantumi ogni patto fondato sul ricatto del consenso: nessun accordo ha il diritto di chiederti di farti piccola per non oscurare chi ti siede accanto. La finta concordia comprata a prezzo della sottomissione è una gabbia che avvelena lo spirito. Nel settimo settore della Bilancia, il destino ti riserva incontri memorabili non per trovarti un padrone, ma per metterti a confronto con alleanze all'altezza della tua statura regale. Se chi ti sta di fronte esige la tua rinuncia per concederti benevolenza, il gesto sovrano è chiudere la porta e proseguire a testa alta.\n\nPorti con te una grazia radiosa e un senso incorruttibile dell'armonia tra spiriti liberi: sai stringere patti di lealtà adamantina che esaltano l'unicità di ciascuno senza pretendere ombre o servitù. Un'alleanza autentica si edifica unicamente tra spiriti che non hanno bisogno di dominare né di essere guidati: l'incontro fecondo tra pari celebra la sovranità della bellezza senza catene.",
        sintesi: "Vertice nella settima casa della Bilancia: incontro predestinato e patti di reciproca equità che si sublimano rifiutando il ricatto del consenso cortese."
      }
  }
};

  window.LILITH_BODY_DICT = BODIES;

  const EMPTY = { sign: null, house: null, dignity: null, combination: null, retrograde: null };

  /**
   * Restituisce gli strati testuali disponibili per un corpo collocato.
   * @param {object} planet elemento di chart.planets
   * @returns {object} { sign, house, dignity, combination, retrograde }
   *                   le voci non ancora scritte valgono null
   */
  window.getLilithBodyLayers = function (planet) {
    if (!planet || !BODIES[planet.name]) return Object.assign({}, EMPTY);
    const body = BODIES[planet.name];
    return {
      sign: (body.signs && body.signs[planet.sign]) || null,
      house: (body.houses && body.houses[planet.house]) || null,
      dignity: (body.dignities && body.dignities[planet.sign]) || null,
      combination: (body.combinations && body.combinations[planet.sign + '|' + planet.house]) || null,
      retrograde: planet.is_retrograde ? (body.retrograde || null) : null
    };
  };

})(window);
