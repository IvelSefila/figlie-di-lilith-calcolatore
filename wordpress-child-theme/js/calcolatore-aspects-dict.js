/**

 * Dizionario Esegetico Completo degli Aspetti Planetari - Canone Figlie di Lilith (2026)

 * Copertura esegetica avanzata per tutte le combinazioni planetarie e tutte le geometrie sacre,

 * arricchita con la dimensione suprema dell'Eros Oscuro, della Lussuria Sacra e dell'Ombra da Cavalcare.

 */



(function(window) {

  'use strict';



  const NAME_MAP_TO_KEY = {

    'Sole': 'Sun', 'Sun': 'Sun',

    'Luna': 'Moon', 'Moon': 'Moon',

    'Mercurio': 'Mercury', 'Mercury': 'Mercury',

    'Venere': 'Venus', 'Venus': 'Venus',

    'Marte': 'Mars', 'Mars': 'Mars',

    'Giove': 'Jupiter', 'Jupiter': 'Jupiter',

    'Saturno': 'Saturn', 'Saturn': 'Saturn',

    'Urano': 'Uranus', 'Uranus': 'Uranus',

    'Nettuno': 'Neptune', 'Neptune': 'Neptune',

    'Plutone': 'Pluto', 'Pluto': 'Pluto',

    'Lilith': 'Lilith', 'Lilith Media': 'Lilith', 'Lilith (Vera)': 'Lilith', 'TrueLilith': 'Lilith',

    'Chirone': 'Chiron', 'Chiron': 'Chiron',

    'Nodo Nord': 'TrueNode', 'TrueNode': 'TrueNode', 'MeanNode': 'TrueNode', 'Nodo Lunare': 'TrueNode',

    'Cerere': 'Ceres', 'Ceres': 'Ceres',

    'Pallade': 'Pallas', 'Pallas': 'Pallas',

    'Giunone': 'Juno', 'Juno': 'Juno',

    'Vesta': 'Vesta',

    'Punto di Fortuna': 'ParsFortunae', 'ParsFortunae': 'ParsFortunae',

    'Vertex': 'Vertex'

  };



  const NAME_MAP_TO_IT = {

    'Sun': 'Sole', 'Sole': 'Sole',

    'Moon': 'Luna', 'Luna': 'Luna',

    'Mercury': 'Mercurio', 'Mercurio': 'Mercurio',

    'Venus': 'Venere', 'Venere': 'Venere',

    'Mars': 'Marte', 'Marte': 'Marte',

    'Jupiter': 'Giove', 'Giove': 'Giove',

    'Saturn': 'Saturno', 'Saturno': 'Saturno',

    'Uranus': 'Urano', 'Urano': 'Urano',

    'Neptune': 'Nettuno', 'Nettuno': 'Nettuno',

    'Pluto': 'Plutone', 'Plutone': 'Plutone',

    'Lilith': 'Lilith', 'Lilith Media': 'Lilith Media', 'Lilith (Vera)': 'Lilith Vera', 'TrueLilith': 'Lilith Vera',

    'Chiron': 'Chirone', 'Chirone': 'Chirone',

    'TrueNode': 'Nodo Nord', 'MeanNode': 'Nodo Lunare', 'Nodo Nord': 'Nodo Nord',

    'Ceres': 'Cerere', 'Cerere': 'Cerere',

    'Pallas': 'Pallade', 'Pallade': 'Pallade',

    'Juno': 'Giunone', 'Giunone': 'Giunone',

    'Vesta': 'Vesta',

    'ParsFortunae': 'Punto di Fortuna', 'Punto di Fortuna': 'Punto di Fortuna',

    'Vertex': 'Vertex'

  };



  const ASPECT_IT = {

    'conjunction': 'Congiunzione', 'Congiunzione': 'Congiunzione',

    'opposition': 'Opposizione', 'Opposizione': 'Opposizione',

    'trine': 'Trigono', 'Trigono': 'Trigono',

    'square': 'Quadratura', 'Quadratura': 'Quadratura',

    'sextile': 'Sestile', 'Sestile': 'Sestile',

    'quincunx': 'Quinconce', 'Quinconce': 'Quinconce'

  };

  const ARCHETYPE_EROS_MAP = {
    Sun: {
      title: "il Magnetismo Solare Radiante",
      drive: "l'impulso radiante a fecondare e brillare con fierezza regale",
      lust: "la passione solare dell'auto-incoronazione carnale",
      shadow: "dell'orgoglio cieco che riduce l'amplesso a un trofeo dell'ego",
      transmute: "celebrando l'amplesso come un rito sovrano di splendore e generosità vitale"
    },
    Moon: {
      title: "la Notte Uterina dell'Inconscio",
      drive: "la brama viscerale di fusione somatica e accoglimento notturno",
      lust: "la lussuria biologica delle maree e dell'utero ancestrale",
      shadow: "della dipendenza simbiotica o del terrore divoratore dell'abbandono",
      transmute: "accogliendo l'intenso richiamo delle acque primordiali senza alcuna colpa"
    },
    Mercury: {
      title: "la Parola Erotica e il Logos Iniziatore",
      drive: "la seduzione intellettuale che accende la carne attraverso il verbo proibito",
      lust: "l'eccitazione cerebrale che dissacra i tabù della mente",
      shadow: "del cinismo voyeuristico o del distacco che viviseziona le emozioni",
      transmute: "usando il linguaggio come una lama sottile di piacere liberatorio"
    },
    Venus: {
      title: "il Santuario della Sensualità Magnetica",
      drive: "il magnetismo della bellezza incorruttibile che esige devozione assoluta",
      lust: "la voluttà raffinata che consacra il piacere come un'arte magica",
      shadow: "della svendita del proprio valore per compiacenza seduttiva",
      transmute: "onorando il corpo come un tempio vivente di voluttà inviolabile"
    },
    Mars: {
      title: "il Fuoco Predatorio della Spinta Vitale",
      drive: "la furia cinetica che conquista il piacere senza esitazioni né scuse",
      lust: "la carica fallica o amazzonica che prende d'assalto il godimento",
      shadow: "della violenza predatoria cieca o della sopraffazione impaziente",
      transmute: "incanalando la forza vitale in pura maestria carnale e audacia sovrana"
    },
    Jupiter: {
      title: "l'Ebbrezza Dionisiaca dell'Abbondanza",
      drive: "l'anelito espansivo a celebrare l'orgia sacra dei sensi oltre ogni limite",
      lust: "la lussuria generosa e debordante che abbatte ogni morale borghese",
      shadow: "dell'eccesso dissipatore privo di discernimento e rispetto dei confini",
      transmute: "facendo del piacere un inno cosmico alla gioia e alla sacra abbondanza"
    },
    Saturn: {
      title: "la Maestria Tantrica del Tempo e della Soglia",
      drive: "la disciplina della pietra nera e il piacere forgiato nel controllo e nell'attesa",
      lust: "l'eros denso, trattenuto e regale che domina le correnti della carne",
      shadow: "della rigidezza colpevolizzante, del gelo anaffettivo o della censura del corpo",
      transmute: "sublimando l'attesa febbrile nella più potente e duratura estasi dei sensi"
    },
    Uranus: {
      title: "il Fulmine Eretico della Libertà Radicale",
      drive: "la scarica elettrica della trasgressione che polverizza ogni tabù sociale",
      lust: "l'eccitazione anarchica e sperimentale che scardina ogni convenzione",
      shadow: "dell'instabilità compulsiva e della fuga anaffettiva da qualsiasi legame",
      transmute: "usando il piacere come strumento di risveglio della coscienza cosmica"
    },
    Neptune: {
      title: "l'Estasi Oceanica della Dissoluzione Mistica",
      drive: "il richiamo ipnotico dell'abisso che dissolve ogni barriera tra carne e spirito",
      lust: "l'eros sciamanico e trascendente del rapimento estatico e della devozione",
      shadow: "della perdita confusa di sé nelle nebbie della dipendenza o dell'illusione",
      transmute: "abbandonandosi alle correnti del piacere mistico come una sacerdotessa nel mare"
    },
    Pluto: {
      title: "la Forgia Tellurica degli Inferi",
      drive: "il magnetismo catartico della morte dell'ego e della resurrezione carnale",
      lust: "la lussuria viscerale della possessione totale e della rigenerazione sciamanica",
      shadow: "della manipolazione ossessiva, del ricatto psichico e del possesso tirannico",
      transmute: "attraversando il fuoco del desiderio senza paura per rinascere padrona dell'ombra"
    },
    Lilith: {
      title: "la Fiamma Primordiale della Sovranità Senza Padroni",
      drive: "la rivendicazione assoluta del corpo sacro che rifiuta ogni sottomissione patriarcale",
      lust: "la lussuria selvaggia e ancestrale che risveglia la Kundalini nera",
      shadow: "della ribellione distruttiva fine a se stessa o dell'isolamento feroce per rancore",
      transmute: "cavalcando la propria natura indomita con regale orgoglio e senza mai chiedere scusa"
    },
    Chiron: {
      title: "la Medicina Iniziatica della Ferita Carnale",
      drive: "la catarsi sensoriale che trasforma il dolore del rifiuto nel più potente afrodisiaco",
      lust: "il piacere che guarisce la vergogna ancestrale del corpo attraverso la verità nuda",
      shadow: "del vittimismo che si crogiola nella ferita credendosi indegna di godere",
      transmute: "consacrando la vulnerabilità della carne a supremo strumento di liberazione"
    },
    TrueNode: {
      title: "il Varco Karmico del Destino Carnale",
      drive: "l'attrazione predestinata che infrange i vecchi contratti d'anima per compiere la missione",
      lust: "l'iniziazione erotica fatale che riscrive la memoria cellulare nel piacere sovrano",
      shadow: "della tentazione regressiva di adagiarsi nella gabbia dorata delle vite passate",
      transmute: "varcando la soglia dell'estasi carnale come un atto di compimento evolutivo"
    },
    Ceres: {
      title: "la Fertilità Tellurica della Grande Madre",
      drive: "l'eros vorace e nutriente della terra ancestrale",
      lust: "la sensualità feconda che accoglie e rigenera nella carne viva",
      shadow: "del possesso materno soffocante che divora l'autonomia del partner",
      transmute: "nutrendo il desiderio con l'abbondanza spontanea della natura incorruttibile"
    },
    Pallas: {
      title: "la Seduzione Strategica della Mente Adamantina",
      drive: "l'intelligenza tattica che conduce la scacchiera del desiderio a sangue freddo",
      lust: "il piacere lucido del trionfo intellettuale e dell'eccitazione strategica",
      shadow: "della calcolata freddezza che inibisce l'abbandono del cuore",
      transmute: "sposando la lucidità della mente alla voluttà della carne sovrana"
    },
    Juno: {
      title: "il Patto Tantrico tra Sovrani Incoronati",
      drive: "la fedeltà esclusiva e adamantina che non tollera mediocrità né profanazioni",
      lust: "l'orgasmo sacro celebrato all'altare dell'uguaglianza tra pari degni",
      shadow: "del risentimento vendicativo per il tradimento o della gelosia tirannica",
      transmute: "fondando l'intimità su un patto indissolubile di rispetto e potere condiviso"
    },
    Vesta: {
      title: "il Fuoco Segreto del Focolare Interiore",
      drive: "la concentrazione dell'energia erotica usata come fiamma sacra di consacrazione",
      lust: "l'estasi pura della sacerdotessa che custodisce il tempio della propria carne",
      shadow: "della castità repressiva o dell'isolamento fanatico dal mondo",
      transmute: "alimentando la fiamma vitale come un rito continuo di auto-incoronazione"
    },
    ParsFortunae: {
      title: "l'Estasi della Sincronicità Sensoriale",
      drive: "il fluire perfetto del corpo nell'attimo presente di grazia corporea",
      lust: "il godimento gioioso e spontaneo dell'abbondanza sensoriale",
      shadow: "della dissipazione superficiale del piacere nell'inseguimento effimero",
      transmute: "celebrando l'amplesso come un dono sincronico di prosperità cosmica"
    },
    Vertex: {
      title: "il Vortice Magnetico del Destino Inevitabile",
      drive: "l'incontro carnale fatale che spalanca le porte del destino e scardina ogni difesa",
      lust: "l'attrazione magnetica irresistibile che consuma le resistenze della mente",
      shadow: "della sensazione di impotenza di fronte a una forza che travolge la volontà",
      transmute: "arrendendosi all'iniziazione del destino con lucida presenza e dignità sovrana"
    }
  };

  const PAIR_INTERPRETATIONS = {


    // ================= SOLE & LUNA =================

    "Sun_Moon": {

      name: "Sole & Luna",

      conjunction: {

        title: "Sole Congiunto a Luna (Novilunio Interiore)",

        subtitle: "Fusione della Volontà Sovrana con la Matrice dell'Inconscio",

        function: "Fusione totale tra la coscienza vigile e la corrente somatica dell'istinto. Non vi è separazione tra ciò che desideri e ciò di cui hai bisogno: ogni scelta è un atto unitario che impegna l'intero essere.",

        manifestation: "Personalità compatta, dotata di enorme concentrazione soggettiva. Le decisioni vengono prese all'istante perché cuore e testa non competono, ma procedono come un solo fiume in piena.",

        shadow: "Cecità verso la prospettiva altrui, totale assorbimento nelle proprie necessità interiori e difficoltà a mediare con chi richiede una separazione tra logica ed emotività.",

        directive: "Traduci questa compattezza in pura sovranità: semina la tua intenzione nel vuoto sacro e permettile di fiorire senza cercare conferme nel mondo esterno.",

        dark_eros: "L'amplesso interiore assoluto tra Re e Regina. La lussuria diventa fame totalizzante: l'eros non ammette terzi né mezze misure, è l'orgasmo cosmico che ricongiunge la carne all'anima. Cavalcare quest'ombra significa non vergognarsi mai della propria brama primordiale, trasformando l'intimità in una liturgia sovrana dove ci si offre e ci si possiede completamente."

      },

      opposition: {

        title: "Sole Opposto a Luna (Plenilunio Iniziatico)",

        subtitle: "L'Asse della Massima Tensione tra Sovranità e Vulnerabilità",

        function: "La luce del mezzogiorno solare fronteggia la notte profonda della memoria lunare. Sei costantemente chiamato a mediare tra il dovere di affermare la tua regalità nel mondo e il richiamo delle radici affettive.",

        manifestation: "Vissuto di lacerazione periodica tra carriera e vita intima, tra autonomia radicale e bisogno di fusione. Le relazioni fungono da specchio impietoso ma illuminante delle parti rinnegate.",

        shadow: "Proiezione continua: affidare all'altro il compito di rappresentare la debolezza o, al contrario, la fredda autorità, sentendosi sempre divisi a metà.",

        directive: "Riconosci che il Sole e la Luna governano lo stesso cielo in tempi diversi: impara a regnare sulla tua luce senza mai vergognarti della tua ombra vulnerabile.",

        dark_eros: "Tensione erotica magnetica a specchio: attrazione fatale per chi è l'opposto esatto, dove l'atto carnale è una resa dei conti e un campo di battaglia estatica. La lussuria nasce dalla distanza che arde: cavalca la tempesta della seduzione e del duello senza farti consumare dalla gelosia, facendo dell'amplesso un rito di resa reciproca tra divinità."

      },

      trine: {

        title: "Sole in Trigono a Luna",

        subtitle: "Flusso Armonico tra Vocazione e Sentimento",

        function: "Canale di grazia innata in cui la volontà cosciente e l'inconscio cooperano senza frizioni. Ciò che intraprendi riceve il pieno appoggio delle tue forze vitali ed emotive profonde.",

        manifestation: "Senso di pace interiore, facilità nel tessere relazioni stabili, carisma sereno che ispira fiducia e naturale resilienza di fronte alle tempeste della vita.",

        shadow: "Tendenza all'adagiamento nella comodità: poiché tutto fluisce senza sforzo, si rischia di evitare i conflitti purificatori necessari per il salto evolutivo.",

        directive: "Usa questa pace interiore non come un rifugio passivo, ma come una piattaforma solida per osare imprese che richiedono un coraggio sovrano.",

        dark_eros: "Flusso orgasmico ininterrotto tra istinto e corpo: la lussuria è fluida, calda, spontanea, priva di blocchi moralisti. Cavalca quest'ombra usandola per rigenerare la tua vitalità sacra: il piacere carnale vissuto nella pienezza è la tua medicina alchemica più potente."

      },

      square: {

        title: "Sole in Quadratura a Luna",

        subtitle: "Fuoco d'Attrito Evolutivo tra Identità e Bisogno",

        function: "Attrito strutturale a 90° tra ciò che vuoi costruire come individuo sovrano e i condizionamenti emotivi ereditati dal lignaggio. È la ferita che costringe l'anima ad auto-crearsi.",

        manifestation: "Lotta costante per non farsi risucchiare dalle richieste dell'ambiente d'origine. Tendenza a vivere ogni scelta di emancipazione con un senso di colpa viscerale da disinnescare.",

        shadow: "Auto-sabotaggio inconscio: fare un passo avanti nella realizzazione per poi regredire in stati di dipendenza o vittimismo affettivo.",

        directive: "Spezza le catene delle aspettative ancestrali: la tua sovranità lilithiana nasce precisamente nel momento in cui scegli te stesso contro il ricatto della consuetudine.",

        dark_eros: "Fuoco erotico lacerante scatenato dall'attrito e dal tabù: il piacere si accende furioso proprio quando vi è divieto, tensione o contrasto emotivo. Cavalcare quest'ombra significa non temere la propria natura carnale più viscerale e trasgressiva, usandola come una lama per demolire ogni residuo di pudore o colpa inculcata."

      },

      sextile: {

        title: "Sole in Sestile a Luna",

        subtitle: "Alleanza Costruttiva tra Volontà e Intuizione",

        function: "Opportunità fluida di dialogo tra le facoltà solari e lunari. La mente cosciente apprende con rapidità come decodificare e onorare i segnali inviati dal corpo e dai sogni.",

        manifestation: "Ottima capacità di comunicazione interpersonale, intelligenza emotiva bilanciata e facilità nel conciliare progetti personali e cura delle relazioni.",

        shadow: "Dispersione energetica se non viene posta un'intenzione chiara che canalizzi questo potenziale collaborativo.",

        directive: "Focalizza questa armonia su un'opera precisa: quando la tua mente e il tuo sentire sono alleati, nessun ostacolo materiale può resisterti.",

        dark_eros: "Piacere lucido e comunicativo: seduzione erotica verbale, intelligenza del corpo e complicità sensuale. Cavalca quest'ombra esplorando i recessi più segreti della fantasia condivisa, facendo del desiderio un laboratorio di raffinata arte carnale."

      },

      quincunx: {

        title: "Sole in Quinconce a Luna",

        subtitle: "Riconfigurazione Sottile dei Ritmi Interiori",

        function: "Disallineamento cieco a 150° tra chi sei chiamato a essere e il modo in cui ti prendi cura di te. Richiede continui aggiustamenti invisibili per non sacrificare la salute sull'altare dell'ambizione.",

        manifestation: "Sensazione ricorrente che qualcosa sfugga, sbalzi d'energia improvvisi quando ci si impegna troppo nel lavoro dimenticando i bisogni primari del corpo.",

        shadow: "Ipocondria, senso cronico di non essere mai nel posto giusto al momento giusto, iper-adattamento sfibrante.",

        directive: "Ricalibra costantemente il tuo baricentro: non chiedere al tuo corpo più di quanto la tua anima sia disposta a benedire con il riposo sacro.",

        dark_eros: "Fame erotica intermittente e sotterranea: il corpo desidera ciò che la mente razionale non osa nominare. Cavalcare quest'ombra richiede di ascoltare gli spasmi dell'istinto e dare asilo sacro alle proprie fantasie più eccentriche senza autogiudizio."

      }

    },



    // ================= SOLE & LILITH =================

    "Sun_Lilith": {

      name: "Sole & Lilith",

      conjunction: {

        title: "Sole Congiunto a Lilith (Eclisse della Sottomissione)",

        subtitle: "Consacrazione della Sovranità Incondizionata",

        function: "Fusione suprema tra l'archetipo dell'identità centrale e la fiamma indomita della Luna Nera. La persona è incapace di servire o di piegarsi a dogmi ipocriti: la propria stessa esistenza è un manifesto di libertà radicale.",

        manifestation: "Presenza magnetica, fiera, a tratti intimidatoria. Capacità innata di vedere l'ombra altrui e di smascherare l'autoritarismo ovunque si nasconda.",

        shadow: "Orgoglio ferino distruttivo, rifiuto a priori di qualsiasi alleanza, paranoia di dominazione che porta all'esilio volontario.",

        directive: "Non scambiare la ribellione per libertà: la vera sovrana non ha bisogno di combattere ogni tiranno, le basta sedere sul proprio trono e governare se stessa.",

        dark_eros: "Il vertice dell'eros sacrilego e regale: la luce solare si accende della lussuria ancestrale della Luna Nera. Sei la creatura che gode nell'atto di infrangere ogni dogma morale; il sesso è un atto di auto-incoronazione che non chiede mai permesso né perdono. Cavalca quest'ombra incarnando la fiamma dell'amante indomabile: chi tocca il tuo corpo deve inchinarsi alla tua sovranità selvaggia."

      },

      opposition: {

        title: "Sole Opposto a Lilith",

        subtitle: "Lo Specchio dell'Emancipazione Negata",

        function: "Polarità elettrica tra la maschera sociale solare e l'istinto primordiale di Lilith. Si viene attratti da figure che incarnano l'Ombra, la trasgressione o il rifiuto, finché non si riconosce che quella fiamma appartiene al proprio Sé.",

        manifestation: "Conflitti epici con figure autoritarie, attrazione fatale verso relazioni che mettono in discussione la propria rispettabilità convenzionale.",

        shadow: "Proiettare Lilith all'esterno considerandola una minaccia da estirpare, oppure farsi dominare dal terrore di essere emarginati dalla società.",

        directive: "Integra la tua natura oscura: non lasciare che il mondo decida quanto della tua intensità sia accettabile. Rivendica la tua interezza.",

        dark_eros: "Seduzione fatale e speculare: attrazione magnetica per figure che incarnano l'abisso della trasgressione e la tentazione proibita. Cavalca quest'ombra senza farti distruggere dalla paura dell'annientamento: l'eros dell'opposizione è un varco per integrare il tuo demone interiore attraverso il fuoco della passione carnale."

      },

      trine: {

        title: "Sole in Trigono a Lilith",

        subtitle: "Naturale Regalità Selvatica",

        function: "Canale di straordinaria fluidità dove il potere della Luna Nera alimenta direttamente la luminosità solare. L'autenticità viscerale viene espressa senza aggressività ma con una fermezza regale disarmante.",

        manifestation: "Carisma magnetico, fascino misterioso che non ha bisogno di ostentazione, facilità nell'affrontare argomenti tabù trasformandoli in fonti di guarigione.",

        shadow: "Dare per scontata la propria libertà senza comprendere il prezzo che altri pagano per raggiungerla; eccessiva sicurezza che sfocia nel disprezzo verso i deboli.",

        directive: "Sii faro per chi è ancora prigioniero delle gabbie morali: illumina la notte degli altri senza bruciarli con la tua fiamma.",

        dark_eros: "Magnetismo erotico felino e naturale: fascino oscuro emanato senza sforzo, che attrae irresistibilmente senza bisogno di artifici volgari. Cavalca questa grazia nera per dominare il desiderio con eleganza regale, trasformando l'intimità in un'esperienza di iniziazione mistica."

      },

      square: {

        title: "Sole in Quadratura a Lilith",

        subtitle: "Il Fuoco Iniziatore dell'Esilio e del Riscatto",

        function: "Tensione lacerante tra il desiderio di essere amati e riconosciuti e l'imperativo sacro di non scendere a compromessi. È l'aspetto del martirio o del risveglio titanico.",

        manifestation: "Esperienze precoci di rifiuto o censura della propria unicità da parte di padri, maestri o istituzioni. Scelte di vita polarizzanti che rompono i ponti col passato.",

        shadow: "Rancore corrosivo, tendenza a distruggere i propri successi prima che altri possano criticarli, ribellione reattiva fine a se stessa.",

        directive: "Trasmuta il veleno del rifiuto in ambrosia di sovranità: chi è stato esiliato dal finto paradiso ha il dovere e il potere di fondare il proprio impero incorruttibile.",

        dark_eros: "Lussuria vulcanica nata dalla ferita dell'esilio: il sesso vissuto come rivendicazione viscerale e rottura violenta delle catene. Cavalcare quest'ombra significa trasformare la vergogna imposta dal perbenismo nella più feroce e liberatoria estasi carnale, domando il fuoco che arde nelle viscere."

      },

      sextile: {

        title: "Sole in Sestile a Lilith",

        subtitle: "Intelligenza Istintiva & Dignità Adamantina",

        function: "Ponte armonico tra lucidità cosciente e profondità istintuale. Permette di negoziare con il mondo senza mai vendere una sola briciola della propria anima.",

        manifestation: "Capacità strategica eccezionale nel muoversi in ambienti ostili mantenendo segreta e intatta la propria libertà interiore.",

        shadow: "Usare la propria lucidità in modo cinico per manipolare le ipocrisie altrui a proprio esclusivo vantaggio.",

        directive: "Metti la tua intelligenza al servizio della verità: non accontentarti di sfuggire alla trappola, mostra la via d'uscita a chi ti è affine.",

        dark_eros: "Lucidità erotica penetrante: capacità di decifrare le voglie inconfessabili altrui e di guidare l'amplesso con sapienza sciamanica. Cavalca l'ombra della seduzione come una danza iniziatica di verità assoluta."

      },

      quincunx: {

        title: "Sole in Quinconce a Lilith",

        subtitle: "L'Aggiustamento del Fuoco Nascosto",

        function: "Disarmonia tra la propria immagine pubblica e l'ombra lilithiana, che emerge spesso come un lapsus scomodo o una crisi inaspettata di ribellione.",

        manifestation: "Tendenza a reprimere la propria intensità nei contesti formali, salvo poi esplodere improvvisamente con conseguenze destabilizzanti.",

        shadow: "Vergogna per la propria visceralità, sensazione di essere guasti o inadatti alla convivenza umana.",

        directive: "Crea spazi sacri quotidiani per la tua natura selvaggia: non costringerla a irrompere come un terremoto, dalle cittadinanza nel tuo tempio.",

        dark_eros: "Richiamo erotico notturno che destabilizza la rispettabilità: fantasie oscure che chiedono diritto di cittadinanza. Cavalca quest'ombra donando alla tua carne lo spazio rituale che merita, senza reprimere la tua anima famelica."

      }

    },



    // ================= SOLE & PLUTONE =================

    "Sun_Pluto": {

      name: "Sole & Plutone",

      conjunction: {

        title: "Sole Congiunto a Plutone",

        subtitle: "L'Alchimia del Potere Atomico Interiore",

        function: "Fusione tra l'identità cosciente e le forze abissali dell'inconscio. Sei un canale vivente di trasmutazione: la tua vita è una serie di morti simboliche e rinascite folgoranti.",

        manifestation: "Sguardo magnetico e penetrante, carisma ipnotico, capacità di reggere crisi catastrofiche uscendone rinvigoriti. Rifiuto viscerale della superficialità.",

        shadow: "Ossessione di controllo, paranoia del tradimento, tirannia psicologica e incapacità di mostrare la minima debolezza.",

        directive: "Usa il tuo potere immenso per liberare e guarire, mai per dominare: la vera regalità plutonica non teme la resa, perché sa di essere immortale.",

        dark_eros: "L'eros del potere supremo e della metamorfosi totale: il sesso non è svago, è una discesa sciamanica negli inferi dove l'ego muore per rinascere indomabile. La lussuria è densa, viscerale, magnetica fino all'ossessione. Cavalca quest'ombra accogliendo la piccola morte dell'orgasmo come un varco di resurrezione alchemica."

      },

      opposition: {

        title: "Sole Opposto a Plutone",

        subtitle: "La Battaglia dei Titani per il Trono dell'Io",

        function: "Asse di confronto radicale con le dinamiche di potere. Si attraggono regolarmente figure dominanti o manipolatorie finché non si comprende che il nemico da integrare è la propria ombra di controllo.",

        manifestation: "Lotte estenuanti per l'autonomia, incontri predestinati che distruggono le vecchie certezze dell'ego per forgiare una determinazione incorruttibile.",

        shadow: "Vittimismo persecutorio, dinamiche di distruzione reciproca nei legami intimi, vendicatività implacabile.",

        directive: "Ritira le tue proiezioni di potere: nessuno può dominarti se tu non deleghi il controllo della tua paura della morte e della perdita.",

        dark_eros: "Guerra di possessione erotica: chi domina chi nel letto sacro? Dinamiche di potere estremo dove il piacere confina con la resa incondizionata. Cavalca quest'ombra imparando a cedere il controllo solo all'estasi pura del ricongiungimento con l'abisso."

      },

      trine: {

        title: "Sole in Trigono a Plutone",

        subtitle: "Potere Rigenerativo Naturale",

        function: "Flusso regale di energia trasmutativa. L'Io cosciente accede spontaneamente ai serbatoi più profondi di resilienza e risanamento psicofisico.",

        manifestation: "Autorità naturale senza sforzo, dono sciamanico o psicologico di comprendere le motivazioni segrete altrui, capacità di trasformare il piombo in oro.",

        shadow: "Pigrizia nell'esercitare il proprio potere, tendenza a manovrare le cose da dietro le quinte senza mai esporsi in prima persona.",

        directive: "Agisci alla luce del sole: metti la tua forza sotterranea al servizio di opere audaci e visibili che risanino il tessuto circostante.",

        dark_eros: "Potenza sessuale rigenerativa inesauribile: l'amplesso guarisce ogni cicatrice e ricarica il corpo di forza tellurica ancestrale. Cavalca quest'ombra con consapevolezza sacerdotale, facendoti canale vivente di trasmutazione biologica."

      },

      square: {

        title: "Sole in Quadratura a Plutone",

        subtitle: "Il Crogiolo del Dominio e della Resa",

        function: "Tensione atomica a 90° tra l'autoaffermazione dell'ego e la forza implacabile del destino sotterraneo. Obbliga a continue discese negli abissi della psiche.",

        manifestation: "Eventi cataclismatici che azzerano lo status quo, attrazione per dinamiche ad alto rischio, relazioni segnate da gelosie laceranti o manipolazioni.",

        shadow: "Crudeltà preventiva, paranoia di essere distrutti che porta a distruggere per primi, avidità di controllo assoluto.",

        directive: "Lascia morire ciò che deve morire: non abbarbicarti a false certezze, il tuo potere reale comincia dove finisce la tua paura del vuoto.",

        dark_eros: "Tantra selvaggio e liberatorio: brama viscerale che sfida i confini tra tormento e piacere. Cavalcare quest'ombra richiede il coraggio di guardare nell'abisso della propria fame sessuale e domarla come un destriero di fuoco senza farsi incatenare."

      },

      sextile: {

        title: "Sole in Sestile a Plutone",

        subtitle: "Lucidità Occulta & Autorità Alchemica",

        function: "Ponte armonico che conferisce determinazione adamantina, capacità di vedere oltre le apparenze e di rigenerarsi rapidamente dalle fatiche.",

        manifestation: "Talento investigativo, carisma silenzioso ma autorevole, abilità nel risanare persone o situazioni in crisi profonda.",

        shadow: "Tendenza a compiacersi del proprio potere psicologico rimanendo emotivamente inaccessibili.",

        directive: "Usa la tua visione a raggi X per smontare le gabbie altrui: sii lo scalpello che libera la scultura dalla pietra.",

        dark_eros: "Alchimia erotica raffinata: maestria nel manipolare le correnti del desiderio sotterraneo per risvegliare l'anima dell'amante e condurla oltre le soglie ordinarie della percezione."

      },

      quincunx: {

        title: "Sole in Quinconce a Plutone",

        subtitle: "La Purificazione delle Scorie Sotterranee",

        function: "Attrito sottile tra la propria direzione di vita e dinamiche inconsce sotterranee che sabotano periodicamente i piani coscienti.",

        manifestation: "Sensazione di dover sempre pagare un dazio oscuro per ogni successo, emergenza di complessi di colpa ingiustificati.",

        shadow: "Vivere nel terrore di un castigo imminente, auto-punizione masochistica.",

        directive: "Fai pace con la tua ombra: non nascondere il tuo lato oscuro sotto il tappeto, consacralo al tuo tempio con rispetto.",

        dark_eros: "Attrazione per l'ombra inconfessabile e per il proibito: pulsioni oscure che richiedono trasformazione e sfogo rituale senza giudizio, cavalcate con rispetto sciamanico."

      }

    },



    // ================= LUNA & LILITH =================

    "Moon_Lilith": {

      name: "Luna & Lilith",

      conjunction: {

        title: "Luna Congiunta a Lilith (Il Plenilunio Nero)",

        subtitle: "L'Iniziazione all'Utero Primordiale & Alla Notte Senza Padrone",

        function: "Fusione totale tra la psiche lunare materna e la fiamma selvatica dell'apogeo. La donna o l'anima rifiuta radicalmente il ruolo di nutrice sacrificale o di vittima: la propria femminilità è selvaggia, sacra e inviolabile.",

        manifestation: "Intuizione sciamanica folgorante, connessione viscerale con i ritmi della terra e della notte, rifiuto biologico di qualsiasi legame basato sulla dipendenza o sulla colpa.",

        shadow: "Rabbia uterina distruttiva, terrore del tradimento affettivo che porta ad azzannare per primi, isolamento emotivo feroce.",

        directive: "Onora il tuo sangue e la tua notte: non cercare l'approvazione del patriarcato o della morale comune. Sii sacerdotessa del tuo tempio e proteggi le tue figlie spirituali.",

        dark_eros: "L'utero della notte e la sorgente della lussuria primordiale. Qui l'eros è puramente biologico, sciamanico, notturno: è la fame della lupa che non accetta gabbie e che vive l'intimità come un rito sacro di piacere e potere rigeneratore. Cavalca quest'ombra immergendoti nella tua natura selvatica senza alcuna traccia di colpa patriarcale: il tuo corpo è la terra vergine prima di ogni dominazione."

      },

      opposition: {

        title: "Luna Opposta a Lilith",

        subtitle: "La Spaccatura tra la Madre e la Strega",

        function: "Conflitto a specchio tra il bisogno di appartenenza e accudimento e l'imperativo di libertà selvaggia. Si vive la dolorosa lacerazione tra conformarsi per essere amati o ribellarsi rimanendo soli.",

        manifestation: "Rapporti complessi con la madre biologica o con la maternità, oscillazione tra dolcezza accogliente e freddezza ferina improvvisa.",

        shadow: "Giudicare come 'malvagia' o 'sporca' la propria natura carnale e istintiva, oppure disprezzare la tenerezza considerandola una debolezza fatale.",

        directive: "Nutri la tua lupa interiore: la vera madre sa essere feroce per difendere la verità. Unisci la coppa della cura alla spada dell'inviolabilità.",

        dark_eros: "Lacerazione erotica tra il bisogno di essere accuditi e la furia di essere divorati dalla passione selvaggia. Cavalca quest'ombra smettendo di dividere l'amore dalla lussuria: unisci la tenerezza dell'acqua al veleno della notte, trasformando la scissione in una sfrenata unione catartica."

      },

      trine: {

        title: "Luna in Trigono a Lilith",

        subtitle: "Saggezza Tellurica Fluida",

        function: "Armonia splendida tra la sensibilità lunare e la forza adamantina della Luna Nera. L'inconscio non ha segreti per la coscienza: si naviga l'oscurità con la grazia di una pantera.",

        manifestation: "Magnetismo ancestrale, doti medianiche o terapeutiche naturali, capacità di accogliere il dolore altrui senza farsi contaminare.",

        shadow: "Distacco aristocratico dal dolore altrui, cinismo verso le debolezze sentimentali del mondo.",

        directive: "Diventa levatrice del risveglio: insegna a chi ha paura del buio che la notte è il grembo fecondo in cui nascono le stelle.",

        dark_eros: "Fluidità erotica ipnotica: sogni erotici premonitori, intuizione carnale profonda, magnetismo viscerale che ammalia e seduce senza sforzo. Cavalca quest'ombra come una sacerdotessa delle maree oscure, facendo del piacere un atto di magia naturale."

      },

      square: {

        title: "Luna in Quadratura a Lilith",

        subtitle: "Il Taglio del Cordone Ancestrale",

        function: "Attrito lancinante tra le memorie di sottomissione del lignaggio femminile e la chiamata a spezzare la catena. Ogni passo verso la libertà richiede di superare sensi di colpa viscerali.",

        manifestation: "Ferite precoci di rifiuto materno, sensazione di non essere mai al sicuro nel proprio nido, repulsione verso i ruoli domestici tradizionali.",

        shadow: "Vittimismo rancoroso, tendenza a respingere chi ama per paura di essere manipolati, auto-boicottaggio emotivo.",

        directive: "Sii la prima donna libera della tua stirpe: il dolore che senti non è solo tuo, è il parto sacro della tua sovranità incondizionata.",

        dark_eros: "Il demone notturno dell'inconscio: terrore della propria stessa brama sessuale e brivido bruciante della trasgressione. Cavalcare quest'ombra è l'atto di coraggio supremo: spalanca le porte del tuo labirinto sensoriale e scopri che la tua sensualità carnale è incorruttibile e divina."

      },

      sextile: {

        title: "Luna in Sestile a Lilith",

        subtitle: "Accordo dei Ritmi Lunari & Fiuto Ancestrale",

        function: "Opportunità fluida di conciliare vita emotiva e indipendenza fiera. Permette di creare relazioni intime senza mai perdere un briciolo di autonomia.",

        manifestation: "Sensibilità acuta ai cicli naturali, empatia selettiva e protetta, grande rispetto per i propri confini psichici.",

        shadow: "Usare la propria intelligenza emotiva per tenere a distanza le persone senza mai aprirsi fino in fondo.",

        directive: "Custodisci la tua sorgente: insegna con il tuo esempio che si può amare profondamente senza mai rinunciare alla propria sovranità.",

        dark_eros: "Intesa sensoriale istintiva: capacità di sintonizzare il respiro, la pelle e il battito cardiaco con le correnti più profonde del piacere, cavalcando l'ombra del desiderio come un'onda di risveglio."

      },

      quincunx: {

        title: "Luna in Quinconce a Lilith",

        subtitle: "L'Aggiustamento del Grembo Sommerso",

        function: "Disarmonia tra i bisogni affettivi quotidiani e l'istinto fiero di Lilith, creando spesso incomprensioni nei momenti di vulnerabilità.",

        manifestation: "Sentirsi improvvisamente soffocati in un legame proprio quando tutto sembra andare bene, con reazioni di fuga incomprensibili per il partner.",

        shadow: "Ansia relazionale, senso di colpa per non riuscire ad accontentarsi di un affetto convenzionale.",

        directive: "Educa chi ti ama a comprendere i tuoi ritmi: chi ti ama davvero saprà rispettare la tua necessità di ritirarti nella tua foresta interiore.",

        dark_eros: "Spasmi emotivi e carnali nell'amplesso: il corpo desidera un'intensità che la mente razionale teme. Cavalca quest'ombra affidandoti all'intelligenza biologica e al brivido che rompe ogni conformismo."

      }

    },



    // ================= VENERE & MARTE =================

    "Venus_Mars": {

      name: "Venere & Marte",

      conjunction: {

        title: "Venere Congiunta a Marte",

        subtitle: "Il Matrimonio Alchemico Primordiale",

        function: "Fusione totale tra il principio ricettivo del piacere e la forza assertiva dell'azione. Sei una creatura di straordinario magnetismo erotico e creativo, dove desiderio e conquista operano all'unisono.",

        manifestation: "Carisma sensuale irresistibile, passionalità ardente, talento artistico vigoroso, facilità nell'attirare e concretizzare relazioni appassionate.",

        shadow: "Incapacità di tollerare la noia, tendenza a vivere solo di picchi di adrenalina passionale, impulsività nelle scelte sentimentali.",

        directive: "Consacra il tuo fuoco alchemico: l'unione tra Venere e Marte è la forgia della vita. Usa la tua passione per dare forma a creazioni che durino nel tempo.",

        dark_eros: "Il matrimonio alchemico primordiale dell'Eros: la carne si infiamma all'istante, la lussuria è immediata, impaziente, irresistibile. È l'archetipo dell'amante assoluto in cui attrazione e conquista sono una sola forza. Cavalca quest'ombra godendo pienamente del tuo appetito carnale, senza diluirlo in convenzioni o ipocrisie morali."

      },

      opposition: {

        title: "Venere Opposta a Marte",

        subtitle: "L'Eterna Danza di Attrazione e Duello",

        function: "Tensione magnetica costante tra il bisogno di armonia e la spinta alla sfida. Nelle relazioni si alternano passione bruciante e conflitti accesi per ristabilire i territori individuali.",

        manifestation: "Attrazione fatale verso partner con cui scoppiano scintille continue; la vita amorosa è un'avventura dinamica che non conosce compromessi tiepidi.",

        shadow: "Guerra dei sessi interiorizzata, proiettare la rabbia sul partner o sabotare la pace di coppia per paura della routine.",

        directive: "Fai della tensione la corda che suona la tua melodia: impara ad amare nel contrasto, riconoscendo che la passione si nutre di confini rispettati.",

        dark_eros: "Scintilla erotica perenne e magnetismo degli opposti: il desiderio vive della distanza che arde prima dell'impatto carnale. Cavalca quest'ombra godendo del duello amoroso e della seduzione come terreno di conquista e resa estatica reciproca."

      },

      trine: {

        title: "Venere in Trigono a Marte",

        subtitle: "Grazia Sensuale & Dinamismo Naturale",

        function: "Flusso perfetto tra seduzione e assertività. Ciò che desideri viene conquistato con una naturalezza e un fascino che non generano mai rancore.",

        manifestation: "Grande vitalità fisica, stile accattivante, successo spontaneo nella sfera affettiva ed economica, talento nel risolvere controversie col sorriso.",

        shadow: "Narcisismo seduttivo, superficialità nei legami dovuta all'eccessiva facilità nell'ottenere consensi.",

        directive: "Usa la tua grazia conquistatrice per nobilitare l'ambiente: la bellezza unita al coraggio ha il potere di risvegliare il mondo dal suo torpore.",

        dark_eros: "Grazia sensuale e ardore perfetto: l'arte dell'amplesso vissuta come capolavoro estetico e fisico senza inibizioni. Cavalca quest'ombra donando e ricevendo godimento con generosità sovrana e spregiudicata eleganza."

      },

      square: {

        title: "Venere in Quadratura a Marte",

        subtitle: "Il Crogiolo della Passione Tempestosa",

        function: "Attrito esplosivo a 90° tra ciò che attrae il cuore e ciò che accende l'istinto carnale. Produce una carica di energia passionale immensa che chiede catarsi.",

        manifestation: "Bivi amorosi tormentati, attrazione verso persone incompatibili sul piano pratico ma irresistibili sul piano magnetico, impazienza viscerale.",

        shadow: "Drammi affettivi ricorrenti, gelosie corrosive, scambiare il conflitto distruttivo per vero amore.",

        directive: "Trasmuta il fuoco della contesa in pura potenza creativa: non dissipare la tua energia vitale in guerre di territorio, canalizzala nella tua opera d'arte.",

        dark_eros: "Eros bruciante, impulsivo e vorace: sesso nato dall'attrito viscerale e dal brivido del contrasto. Cavalcare quest'ombra significa bruciare ogni ipocrisia sul rogo del desiderio puro, domando il vulcano senza farsi distruggere dall'ossessione."

      },

      sextile: {

        title: "Venere in Sestile a Marte",

        subtitle: "Complicità Elettiva & Seduzione Intelligente",

        function: "Ponte collaborativo tra bellezza e assertività. Permette di negoziare accordi fruttuosi e di vivere l'amore con un equilibrio sano tra passione e rispetto.",

        manifestation: "Facilità nel collaborare con il sesso opposto, buon gusto dinamico, abilità nelle arti e negli affari.",

        shadow: "Compromessi prematuri per evitare la necessaria asprezza del confronto.",

        directive: "Sii ambasciatrice/ambasciatore di alleanze feconde: costruisci ponti d'oro dove altri vedono solo mura divisorie.",

        dark_eros: "Seduzione brillante e intesa sensoriale complice: piacere del corteggiamento audace e complicità assoluta tra i corpi. Cavalca l'ombra del desiderio facendo dell'amplesso un gioco raffinato e trasgressivo."

      },

      quincunx: {

        title: "Venere in Quinconce a Marte",

        subtitle: "L'Aggiustamento del Desiderio",

        function: "Disallineamento tra il modo di concepire l'affetto e l'impulso sessuale, provocando temporanee esitazioni o scelte affettive contraddittorie.",

        manifestation: "Difficoltà a trovare partner che soddisfino contemporaneamente l'esigenza di tenerezza e quella di avventura ardente.",

        shadow: "Frustrazione intima cronicizzata, scissione tra sesso e amore con conseguente senso di insoddisfazione perenne.",

        directive: "Non accontentarti di mezze misure: accorda con pazienza il tuo strumento, finché non troverai chi sa onorare sia la tua rosa che la tua spada.",

        dark_eros: "Tensione tra raffinatezza sensuale e pulsione istintiva: cavalcare quest'ombra trovando l'accordo supremo tra il bacio che venera e il morso che possiede, senza alcuna censura moralista."

      }

    },



    // ================= VENERE & LILITH =================

    "Venus_Lilith": {

      name: "Venere & Lilith",

      conjunction: {

        title: "Venere Congiunta a Lilith (La Rosa Nera)",

        subtitle: "La Bellezza che non Chiede il Permesso di Esistere",

        function: "Fusione assoluta tra il principio del valore/bellezza e la libertà radicale della Luna Nera. È la fine definitiva di ogni sottomissione patriarcale: la donna non è oggetto di compiacenza, ma sacerdotessa del proprio piacere.",

        manifestation: "Magnetismo fatale e carisma ipnotico. Rifiuto viscerale dei ruoli matrimoniali convenzionali basati sulla dipendenza o sulla sottomissione.",

        shadow: "Uso cinico della seduzione come strumento di vendetta contro il genere maschile o contro chi incarna l'autorità; terrore di essere ingabbiata che impedisce l'abbandono amoroso.",

        directive: "Incarna la Rosa Nera: sii testimone della bellezza che non si svende mai. La tua sovranità relazionale è un altare sacro inviolabile.",

        dark_eros: "La Rosa Nera del Piacere Inviolabile: il vertice assoluto della lussuria sacra. Venere e la Luna Nera si uniscono per proclamare la fine di ogni sottomissione erotica: il tuo piacere è un tempio autonomo, non una concessione a un padrone. Cavalcare quest'ombra significa incarnare la divina seduttrice che gode senza colpa né pudore borghese, trasformando il proprio magnetismo carnale in un'arma di sovranità assoluta che piega qualsiasi tirannia morale."

      },

      opposition: {

        title: "Venere Opposta a Lilith",

        subtitle: "La Cortigiana e la Strega",

        function: "Tensione a specchio tra il bisogno di essere amata ed elogiata e l'istinto selvaggio che disprezza i compromessi sociali. Si viene costantemente sfidati a scegliere tra la compiacenza per farsi accettare e la verità nuda.",

        manifestation: "Attrazione per relazioni proibite, segrete o scandalose; rotture drammatiche non appena il partner cerca di 'addomesticare' la personalità.",

        shadow: "Vivere una doppia vita sentimentale, vergognarsi delle proprie voglie più oscure, oppure distruggere sistematicamente legami sani per paura della noia.",

        directive: "Integra la seduttrice e la ribelle: la vera regina non ha bisogno di compiacere per essere adorata. Mostra il tuo volto intero e ama solo chi sa sostenere il tuo sguardo.",

        dark_eros: "Il duello della seduzione proibita: attrazione fatale per ciò che scandalizza il perbenismo e sesso vissuto come varco di trasgressione catartica. Cavalca quest'ombra rivendicando la tua lussuria contro il giudizio ipocrita del mondo: la tua carne risponde solo alla legge della notte sovrana."

      },

      trine: {

        title: "Venere in Trigono a Lilith",

        subtitle: "Fascino Sovrano & Grazia Letale",

        function: "Armonia splendida tra bellezza formale e abisso selvaggio. La seduzione è naturale, sofisticata e mai volgare: un veleno dolcissimo che disarma chiunque.",

        manifestation: "Stile unico che fa tendenza, eleganza aristocratica unita a un'aura di mistero impenetrabile, relazioni basate sul rispetto e sull'ammirazione reciproca.",

        shadow: "Distacco emotivo freddo, manipolazione disinvolta degli amanti considerati giocattoli per l'ego.",

        directive: "Consacra la tua bellezza: usa il tuo potere di attrazione per ispirare la liberazione di chi ti è accanto, mai per collezionare cuori infranti.",

        dark_eros: "Fascino sensuale devastante e ipnotico: chi si sdraia al tuo fianco sperimenta un piacere tellurico che non dimenticherà mai più. Cavalca questa grazia nera con regale fierezza, facendo dell'amplesso un rito magico che risveglia l'essenza immortale."

      },

      square: {

        title: "Venere in Quadratura a Lilith",

        subtitle: "Il Rifiuto del Compromesso Amoroso",

        function: "Attrito lacerante tra il desiderio di armonia affettiva e il rifiuto viscerale di qualsiasi gabbia patriarcale. Spesso segna un passato di mortificazione del proprio corpo o della propria sensualità.",

        manifestation: "Scelte sentimentali burrascose, rifiuto delle etichette tradizionali, terrore di essere usate o sminuite nel proprio valore sacro.",

        shadow: "Crudeltà sentimentale reattiva, autopunizione attraverso amori tossici, rifiuto della propria stessa femminilità per paura di essere sottomesse.",

        directive: "Riconciliati con il tuo tempio carnale: il tuo corpo è sacro precisamente perché è indomito. Chi ti vuole deve meritare l'accesso al tuo santuario.",

        dark_eros: "Lacerazione tra il desiderio di compiacere per essere amati e l'urlo selvaggio della lussuria che vuole dominare. Cavalcare quest'ombra richiede di smettere di farsi addomesticare: abbraccia la tua lussuria più viscerale come un fuoco purificatore che incenerisce ogni senso di colpa."

      },

      sextile: {

        title: "Venere in Sestile a Lilith",

        subtitle: "Magnetismo Elettivo & Grazia Ribelle",

        function: "Ponte armonico che permette di esprimere una sensualità magnetica e non convenzionale senza provocare conflitti distruttivi.",

        manifestation: "Capacità di tessere alleanze affettive paritarie, gusto artistico originale e trasgressivo ma raffinato, fiuto per l'autenticità negli altri.",

        shadow: "Tendenza a calcolare le relazioni per evitare di essere vulnerabili.",

        directive: "Sii custode della sensualità libera: dimostra al mondo che la purezza non è sottomissione, ma fedeltà assoluta al proprio desiderio sovrano.",

        dark_eros: "Maestria erotica raffinata e spregiudicata: capacità di rendere sacro il peccato e irresistibile il proibito. Cavalca l'ombra della passione carnale con intelligenza sensuale, disarmando ogni censura."

      },

      quincunx: {

        title: "Venere in Quinconce a Lilith",

        subtitle: "L'Aggiustamento del Piacere",

        function: "Disallineamento tra il modo in cui esprimi dolcezza e l'istinto fiero di Lilith, creando spesso incomprensioni nei momenti di intimità.",

        manifestation: "Sentirsi improvvisamente soffocati in un legame proprio quando tutto sembra andare bene, con reazioni di fuga incomprensibili per il partner.",

        shadow: "Ansia relazionale, senso di colpa per non riuscire ad accontentarsi di un amore convenzionale.",

        directive: "Educa chi ti ama a comprendere i tuoi ritmi: chi ti ama davvero saprà rispettare la tua necessità di ritirarti nella tua foresta interiore.",

        dark_eros: "Fantasie inconfessabili che premono sotto la pelle: cavalca quest'ombra liberandole nel tempio sacro dell'intimità senza paura del giudizio, trasformando il tabù nel tuo personale afrodisiaco di rinascita."

      }

    },



    // ================= MARTE & LILITH =================

    "Mars_Lilith": {

      name: "Marte & Lilith",

      conjunction: {

        title: "Marte Congiunto a Lilith (La Spada Nera)",

        subtitle: "La Forza Incorruttibile della Difesa Sacra",

        function: "Fusione infuocata tra l'assertività marziale e la rabbia sacra della Luna Nera. Sei una guerriera nata per difendere i santuari inviolabili dell'anima e abbattere ogni abuso di potere.",

        manifestation: "Coraggio indomito di fronte al pericolo, intolleranza istintiva per la debolezza ipocrita o per la tirannia, potenza fisica ed energetica straordinaria.",

        shadow: "Furia distruttiva incontrollata, tendenza a reagire con violenza spropositata alle provocazioni, distruzione di alleati nell'incendio della collera.",

        directive: "Consacra la tua spada al Risveglio: la furia cieca ti rende vulnerabile ai tiranni, mentre la determinazione lucida e chirurgica ti rende invincibile.",

        dark_eros: "La spada infuocata dell'Eros predatorio: unione selvaggia tra la carica guerriera di Marte e l'istinto indomito di Lilith. La lussuria è famelica, primitiva, tempestosa; nell'amplesso si abbatte ogni pudore e si cavalca la fiera interiore. Cavalca quest'ombra con pugno d'acciaio: la tua energia sessuale è la forza tellurica che infrange ogni gabbia e risveglia la Kundalini guerriera."

      },

      opposition: {

        title: "Marte Opposto a Lilith",

        subtitle: "Il Duello tra il Guerriero e la Strega",

        function: "Asse di tensione esplosiva con l'energia maschile o con l'archetipo dell'aggressore. Si attirano situazioni di conflitto in cui si è costretti a difendere con i denti la propria sovranità.",

        manifestation: "Battaglie estenuanti nei rapporti di coppia o sul lavoro, dinamiche di sfida continua per stabilire chi detiene il controllo effettivo.",

        shadow: "Vivere in uno stato perenne di allerta e paranoia difensiva, logorando il proprio sistema nervoso e allontanando chi desidera solo cooperare.",

        directive: "Deponi l'armatura nel tuo tempio: non tutto il mondo è un nemico in agguato. Riserva la tua lama per le battaglie che contano davvero.",

        dark_eros: "Scontro erotico all'ultimo sangue: l'amplesso come duello di dominazione e sottomissione consapevole. Cavalca quest'ombra godendo dell'intensità dello scontro per ripulire l'anima da ogni debolezza e forgiare un desiderio incrollabile."

      },

      trine: {

        title: "Marte in Trigono a Lilith",

        subtitle: "Istinto Guerriero Sovrano & Azione Fulminea",

        function: "Flusso regale dove l'istinto di Lilith guida con infallibile precisione ogni azione marziale. La persona colpisce nel segno senza sforzo e senza rimorsi inutili.",

        manifestation: "Tempismo perfetto nelle scelte di rottura o di conquista, assenza di paure paralizzanti, capacità di proteggere se stessi e i propri cari con naturale autorevolezza.",

        shadow: "Crudeltà disinvolta verso chi si oppone, tendenza a calpestare i confini altrui giustificandosi con la propria libertà.",

        directive: "Usa la tua forza per liberare, mai per sopraffare: la vera guerriera di Lilith combatte per consacrare la vita, non per accumulare cadaveri.",

        dark_eros: "Potenza cinetica carnale fulminea: istinto infallibile nel condurre il gioco erotico al suo apice selvaggio. Cavalca quest'ombra con fierezza animale incorrotta, facendo dell'amplesso un atto di pura affermazione vitale."

      },

      square: {

        title: "Marte in Quadratura a Lilith",

        subtitle: "Il Crogiolo della Furia Trasmutata",

        function: "Attrito a 90° ad altissima tensione: la ferita di essere stati repressi o violentati nella propria volontà primordiale genera un vulcano pronto a eruttare.",

        manifestation: "Crisi di collera viscerale scatenate dal minimo sentore di sopraffazione; tendenza ad auto-sabotarsi attraverso conflitti periferici distruttivi.",

        shadow: "Sindrome di vendetta permanente, attrazione per situazioni di pericolo estremo, rischio di farsi del male nella foga della reazione.",

        directive: "Governa il tuo vulcano interiore: l'energia che brucia può distruggere la tua vita o forgiare il diamante della tua sovranità. La scelta è tua in ogni istante.",

        dark_eros: "Furia orgiastica e brama viscerale che non tollera freni: il sesso diventa valvola di sfogo per una pressione cosmica titanica. Cavalca quest'ombra incanalando l'impeto carnale verso vette di estasi catartica, trasformando la rabbia repressa in potenza tantrica."

      },

      sextile: {

        title: "Marte in Sestile a Lilith",

        subtitle: "Prontezza Tattica & Assertività Lucida",

        function: "Opportunità fluida di combinare coraggio marziale e fiuto psicologico profondo per disinnescare qualsiasi trappola o avversario.",

        manifestation: "Efficacia straordinaria nei momenti di emergenza, sangue freddo nelle dispute, capacità di dire 'No' con un'autorità che non ammette repliche.",

        shadow: "Tendenza a calcolare le dispute in modo cinico, perdendo la capacità di perdonare quando la crisi è superata.",

        directive: "Sii guardiana dei confini: difendi il tuo territorio con fermezza regale e insegna agli altri come rispettare la propria dignità.",

        dark_eros: "Ardore tattico e coraggio erotico: audacia nell'esplorare territori sconosciuti del piacere senza alcuna titubanza, cavalcando l'ombra della conquista con precisione chirurgica."

      },

      quincunx: {

        title: "Marte in Quinconce a Lilith",

        subtitle: "L'Aggiustamento della Spinta Cinetica",

        function: "Disallineamento tra il modo in cui pianifichi l'azione e l'istinto selvaggio che chiede sfogo, provocando spesso esitazioni seguite da scatti impulsivi.",

        manifestation: "Sensazione di muoversi controvento, incidenti minori dovuti alla rabbia repressa che non trova un canale espressivo chiaro.",

        shadow: "Passività aggressiva, rimuginio rancoroso che avvelena la motivazione quotidiana.",

        directive: "Allinea la tua spada al tuo istinto: non iniziare nulla se la tua anima viscerale non dice un 'Sì' pieno e convinto.",

        dark_eros: "Pulsione vulcanica sotterranea che cerca sbocchi: cavalca quest'ombra dando al corpo il ritmo serrato che esige per liberarsi dalla gabbia delle buone maniere."

      }

    },



    // ================= PLUTONE & LILITH =================

    "Pluto_Lilith": {

      name: "Plutone & Lilith",

      conjunction: {

        title: "Plutone Congiunto a Lilith (Il Sole Nero degli Inferi)",

        subtitle: "La Massima Potenza di Morte, Rinascita e Sovranità Inviolabile",

        function: "Fusione cosmica tra il Signore degli Inferi e la Sovrana della Notte Primordiale. È l'aspetto della potenza occulta pura: la persona ha accesso diretto alle radici biologiche e psichiche della rigenerazione.",

        manifestation: "Carisma ipnotico incontenibile, capacità sciamanica di operare nell'ombra per estirpare il male alla radice, resistenza titanica a qualsiasi trauma o tortura psicologica.",

        shadow: "Ossessione di annientamento del nemico, nichilismo cosmico, paranoia viscerale che impedisce qualsiasi vulnerabilità umana.",

        directive: "Riconosci che chi governa l'abisso non ha bisogno di dimostrare nulla: la tua presenza è sufficiente per trasmutare il buio in luce imperitura.",

        dark_eros: "Il Tantra dell'Abisso & Il Sole Nero della Lussuria: la massima concentrazione di energia sessuale occulta dello zodiaco. L'eros qui è una porta tra i mondi: l'orgasmo è un rito di morte dell'ego e resurrezione della potenza sciamanica. Cavalca quest'ombra senza tremare: non vi è perversione o abisso che tu non possa trasformare in oro alchemico. Nelle tue viscere arde il fuoco sacro che governa i destini."

      },

      opposition: {

        title: "Plutone Opposto a Lilith",

        subtitle: "L'Asse del Confronto con i Poteri Occulti",

        function: "Conflitto a specchio tra due potenze telluriche titaniche. Si viene chiamati a fronteggiare manipolazioni sistemiche, abusi patriarcali o segreti ancestrali indicibili.",

        manifestation: "Battaglie estreme per il controllo della propria anima, incontri fatali con figure manipolatorie che obbligano a un risveglio radicale del proprio potere.",

        shadow: "Restare invischiati in guerre occulte o legali per tutta la vita, alimentando l'odio e l'ossessione della distruzione reciproca.",

        directive: "Trascendi la guerra degli inferi: il vero sovrano non combatte per vendetta, ma taglia i legami con il mondo dei morti e cammina verso la libertà assoluta.",

        dark_eros: "Possessione fatale e legami carnali da cui non si può fuggire: attrazione magnetica ossessiva che brucia le vite precedenti. Cavalca quest'ombra dominando il terrore di perderti nell'altro: resta sovrana anche nell'occhio del ciclone erotico, facendo dell'amplesso il luogo della tua rinascita libera."

      },

      trine: {

        title: "Plutone in Trigono a Lilith",

        subtitle: "Alchimia Sotterranea Fluida",

        function: "Canale di straordinaria potenza rigenerativa in cui l'istinto di Lilith e il potere di Plutone cooperano senza alcuna dispersione energetica.",

        manifestation: "Capacità miracolosa di guarire dalle crisi più buie, magnetismo naturale che attira risorse nascoste e fedeltà incorruttibile alle proprie radici.",

        shadow: "Sentirsi talmente autosufficienti da disprezzare le convenzioni e i bisogni delle persone comuni, isolandosi dal mondo.",

        directive: "Metti questo potere alchemico a servizio della trasmutazione collettiva: aiuta chi brancola nel buio a trovare la luce della propria sovranità.",

        dark_eros: "Magia sessuale naturale e incorruttibile: capacità di veicolare l'energia dell'orgasmo per materializzare desideri e piegare la realtà. Cavalca quest'ombra con reverenza sacerdotale, celebrando la sacralità delle forze sotterranee."

      },

      square: {

        title: "Plutone in Quadratura a Lilith",

        subtitle: "Il Crogiolo Nucleare dell'Ombra",

        function: "Tensione ad altissima intensità tra il bisogno plutonico di controllo e il rifiuto viscerale di Lilith verso ogni gabbia. È il marchio delle metamorfosi più radicali.",

        manifestation: "Crisi di vita che demoliscono ogni certezza materiale ed emotiva, costringendo l'anima a rinascere letteralmente dalle proprie ceneri più volte.",

        shadow: "Gusto morboso per la catastrofe, autodistruzione come forma estrema di controllo sul destino, crudeltà reattiva.",

        directive: "Muori mille volte e rinasci altrettante: la tua anima è fatta di materia indistruttibile, nessun inferno ha il potere di trattenerti prigioniera.",

        dark_eros: "La forgia del fuoco atomico sotterraneo: pulsioni sessuali indicibili che distruggono ogni convenzione morale. Cavalcare quest'ombra è la prova iniziatica suprema: scendi negli inferi della tua carne e risorgi regina assoluta del tuo piacere, senza più temere alcun demone."

      },

      sextile: {

        title: "Plutone in Sestile a Lilith",

        subtitle: "Lucidità Penetrativa & Alleanza Iniziatica",

        function: "Ponte armonico che dona una vista a raggi X sui segreti dell'inconscio umano e sui giochi di potere del mondo visibile e invisibile.",

        manifestation: "Dono psicologico e strategico eccezionale, capacità di smantellare menzogne secolari con poche parole sussurrate al momento giusto.",

        shadow: "Usare questa penetrazione per manipolare subdolamente gli altri senza mai assumersi la responsabilità delle conseguenze.",

        directive: "Sii testimone dell'invisibile: illumina gli angoli bui dell'umanità senza mai diventare complice della tirannia dell'ombra.",

        dark_eros: "Sguardo ipnotico e penetrazione psichica nell'amplesso: il piacere tocca le corde più recondite dell'anima, facendo crollare ogni maschera nell'intimità sacra."

      },

      quincunx: {

        title: "Plutone in Quinconce a Lilith",

        subtitle: "L'Aggiustamento del Potere Segreto",

        function: "Attrito sottile tra la vocazione alla rigenerazione e residui di paure ancestrali legate all'essere perseguitati per la propria potenza occulta.",

        manifestation: "Sensazione di dover nascondere la propria vera intensità per non spaventare il contesto circostante, periodi di isolamento ermetico.",

        shadow: "Complesso della perseguitata, sabotaggio del proprio impatto pubblico per paura delle rappresaglie dell'autorità.",

        directive: "Non aver paura della tua grandezza oscura: il mondo ha bisogno di spiriti liberi che non si lascino intimidire dalla notte.",

        dark_eros: "Attrazione per l'abisso e per il proibito: cavalca quest'ombra accogliendo la tua natura carnale come un mistero sacro da svelare a tappe, senza mai vergognarti dell'intensità che abita le tue profondità."

      }

    },

    // ================= VENERE & PLUTONE =================
    "Venus_Pluto": {
      name: "Venere & Plutone",
      conjunction: {
        title: "Venere Congiunta a Plutone (L'Eros degli Inferi e la Piccola Morte)",
        subtitle: "Attrazione Magnetica Fatale, Metamorfosi Tantrica e Bellezza Incorruttibile",
        function: "Fusione alchemica a 0° tra il principio del valore e della sensualità (Venere) e la potenza di morte e rinascita tellurica (Plutone). L'affettività e l'eros sono spogliati di qualsiasi superficialità borghese: amare significa attraversare il crogiolo catartico della trasformazione integrale.",
        manifestation: "Magnetismo fatale irresistibile, sguardi che penetrano le difese psichiche altrui all'istante, attrazione per legami viscerali che esigono fedeltà adamantina e verità nuda.",
        shadow: "Gelosia distruttiva, terrore del tradimento, dinamiche occulte di manipolazione e possesso ossessivo che soffocano la spontaneità.",
        directive: "Riconosci che il tuo valore è immortale: smetti di confondere il controllo sull'altro con l'amore sovrano. Lascia morire l'ego nella passione per risorgere padrona assoluta del tuo potere magnetico.",
        dark_eros: "L'orgasmo come varco di morte e resurrezione sciamanica: l'eros di Venere e Plutone non ammette mezze misure. È la lussuria tellurica dell'annientamento estatico, dove l'amplesso spazza via l'identità ordinaria per risvegliare il serpente kundalinico più antico. Cavalcare quest'ombra significa godere dell'intensità carnale più viscerale senza alcun senso di colpa morale, facendo dell'intimità un tempio di rigenerazione alchemica e potere indivisibile."
      },
      opposition: {
        title: "Venere Opposta a Plutone",
        subtitle: "Il Duello di Possessione & La Sfida del Potere Magnetico",
        function: "Polarità a specchio a 180° tra il desiderio di armonia sensuale e le correnti sotterranee di dominio psicologico. Si attraggono partner che incarnano l'ombra, il magnetismo oscuro o la ferita del tradimento.",
        manifestation: "Relazioni vissute come campi di battaglia emotiva e contese di sovranità. Si oscilla tra il bisogno di arrendersi totalmente alla passione e il timore paranoico di essere divorati o manipolati.",
        shadow: "Guerra di logoramento emotivo, ricatto affettivo sotterraneo, attrazione compulsiva per legami clandestini o autodistruttivi.",
        directive: "Sii la sovrana del tuo altare: non cercare fuori di te il potere che temi negli altri. Riconosci la tua oscurità e offrila solo a chi è capace di sostenere il tuo sguardo senza piegarsi.",
        dark_eros: "Tensione erotica febbrile alimentata dal pericolo e dalla seduzione estrema: la lussuria scaturisce dal duello di sovranità tra due anime che rifiutano di cedere lo scettro. Cavalcare quest'ombra richiede di smettere di usare il sesso come strumento di difesa o controllo, trasformando la contesa carnale in una resa estatica all'incommensurabile forza dell'abisso condiviso."
      },
      square: {
        title: "Venere in Quadratura a Plutone",
        subtitle: "Il Crogiolo del Desiderio Proibito & La Forgia del Riscatto",
        function: "Attrito a 90° ad altissima tensione tra la voluttà dei sensi e le pulsioni primordiali di dominio. L'amore e l'erotismo sono vissuti come una crisi catartica da cui non si esce mai uguali a prima.",
        manifestation: "Attrazione fatale per situazioni complesse, tabù sociali e triangoli relazionali in cui il piacere si accende proprio attraverso la rottura o il divieto imposto dal contesto.",
        shadow: "Autodistruzione sentimentale, tendenza a sabotare la felicità serena per nostalgia della tempesta, rancore vendicativo.",
        directive: "Spezza la catena del dramma compulsivo: la passione non ha bisogno del veleno per essere divina. Usa la tua intensità per purificare i tuoi desideri da ogni residuo di indegnità.",
        dark_eros: "Lussuria bruciante nata dalla trasgressione del tabù: l'eccitazione si infiamma nella collisione tra il sacro e il profano, dove il corpo sperimenta il brivido dell'inconfessabile. Cavalcare quest'ombra significa accogliere la propria natura insaziabile e strappare il velo della vergogna patriarcale: il tuo desiderio è una forza dirompente che purifica attraverso il fuoco dei sensi."
      },
      trine: {
        title: "Venere in Trigono a Plutone",
        subtitle: "Alchimia Magnetica Fluida & Carisma Incorruttibile",
        function: "Canale di grazia a 120° tra bellezza e profondità tellurica. La sensualità e il potere personale cooperano spontaneamente, donando una comprensione istintiva dei desideri altrui e un'attrazione irresistibile.",
        manifestation: "Capacità naturale di affascinare, rigenerare le relazioni attraverso la passione autentica, trasmutare le ferite emotive in magnetismo seduttivo sereno e autorevole.",
        shadow: "Compiacimento nell'usare il proprio fascino per ottenere vantaggi occulti, senza mettersi mai realmente in gioco.",
        directive: "Custodisci questo dono sacro: usa il tuo magnetismo per elevare e risvegliare chi ti è vicino, trasformando l'amore in un'arte magica di trasformazione.",
        dark_eros: "Eros tantrico spontaneo e armonioso: la fusione tra carne e anima avviene senza attrito, liberando correnti di piacere rigeneratore che risanano ogni blocco energetico. Cavalcare quest'ombra significa abitare il proprio corpo come un tempio vivente di voluttà regale, dove ogni carezza è una consacrazione alla bellezza immortale."
      },
      sextile: {
        title: "Venere in Sestile a Plutone",
        subtitle: "Alleanza Strategica tra Fascino e Perspicacia Occulta",
        function: "Sinergia a 60° tra grazia relazionale e acume psicologico. Permette di leggere con precisione chirurgica le dinamiche intime e di maneggiare il potere affettivo con eleganza diplomatica.",
        manifestation: "Fiducia selettiva, lealtà profonda verso i legami scelti, abilità nel navigare le zone d'ombra dei rapporti senza farsi travolgere dal dramma.",
        shadow: "Tendenza a calcolare le mosse affettive con eccessivo distacco, frenando l'abbandono emotivo sincero.",
        directive: "Consenti alla tua anima di scendere nelle acque profonde: l'eleganza si compie solo quando accetta di sporcarsi con la materia viva della passione.",
        dark_eros: "Complicità erotica raffinata e penetrante: la seduzione si gioca sul filo degli sguardi, dei dettagli segreti e della tensione psicologica sottile. Cavalca quest'ombra orchestrando il piacere con maestria e intelligenza sensuale, scoprendo nella confidenza erotica il più intimo dei poteri."
      },
      quincunx: {
        title: "Venere in Quinconce a Plutone",
        subtitle: "Ricalibrazione dell'Ombra Affettiva & Disintossicazione dei Sensi",
        function: "Attrito a 150° tra il bisogno di piacere leggero e il richiamo ineludibile dell'abisso emotivo. Esige una continua messa a punto interiore per non confondere l'amore con l'ossessione.",
        manifestation: "Sensazione ciclica di non essere compresi nei propri desideri più oscuri, alternanza tra periodi di distacco sensuale e fiammate di passione destabilizzante.",
        shadow: "Somatizzazione dell'ansia affettiva, dipendenze emotive velate, paura di non essere mai all'altezza della propria intensità.",
        directive: "Accetta che la tua sensualità ha ritmi non convenzionali: accorda la tua arpa interiore affinché suoni sia le note chiare del piacere sia i bassi profondi del mistero.",
        dark_eros: "Lussuria sotterranea che fermenta nell'ombra: il desiderio richiede una metamorfosi interiore per manifestarsi senza sensi di colpa o scissioni interiori. Cavalca quest'ombra riconoscendo che la tua fame carnale merita uno spazio sovrano di espressione, liberandoti dalla necessità di celare il tuo lato più conturbante."
      }
    },

    // ================= MARTE & PLUTONE =================
    "Mars_Pluto": {
      name: "Marte & Plutone",
      conjunction: {
        title: "Marte Congiunto a Plutone (La Forgia Nucleare dell'Ombra)",
        subtitle: "Potenza Primordiale, Resistenza Infrangibile e Sovranità della Pulsione",
        function: "Fusione tellurica a 0° tra il braccio armato della volontà (Marte) e il reattore nucleare degli inferi (Plutone). La forza d'impatto, il coraggio e la resistenza fisica raggiungono livelli titanici.",
        manifestation: "Determinazione incrollabile, capacità di agire sotto stress estremo, carisma da combattente indomita che non arretra davanti a nessun ostacolo o intimidazione.",
        shadow: "Furia distruttiva, spietatezza, tendenza a schiacciare gli altri o a ricercare la violenza psicologica come prova della propria invulnerabilità.",
        directive: "Trascendi la distruzione cieca: incanala questa forza nucleare in un'opera di riscatto sovrano. Non sei nata per fare la guerra al mondo, ma per governare la tua stessa potenza.",
        dark_eros: "L'amplesso come rito sciamanico di pura forza vitale: la lussuria di Marte e Plutone congiunti è vulcanica, predatoria, implacabile. È l'energia che demolisce ogni pudore e inibizione, trasformando la carne in uno strumento di potenza titanica. Cavalcare quest'ombra significa cavalcare la tigre del proprio desiderio selvaggio: possedere ed essere possedute senza catene morali, celebrando l'orgasmo come l'atto sacro che squarcia il velo della debolezza umana."
      },
      opposition: {
        title: "Marte Opposto a Plutone",
        subtitle: "L'Asse del Confronto con la Forza Tirannica",
        function: "Tensione a 180° tra l'azione diretta e le correnti sotterranee di coercizione. Si manifesta un duello continuo tra la propria affermazione e il potere coercitivo dell'ambiente esterno o dei partner.",
        manifestation: "Attrazione o scontro con personalità dominanti, sfide aperte di controllo, rabbia repressa che esplode in modo intermittente e dirompente.",
        shadow: "Paranoia persecutoria, atteggiamento belligerante costante, rischio di farsi consumare dal rancore o dalla brama di vendetta.",
        directive: "Disinnesca il gioco del tiranno: la tua forza non dipende dalla sconfitta altrui. Mantieni saldo il tuo centro e agisci con precisione adamantina, senza farti provocare.",
        dark_eros: "Duello erotico di sottomissione e dominio: la lussuria si accende nello scontro tra due volontà incrollabili. È la tensione magnetica del predatore che incontra il suo pari, dove la resa carnale è un atto supremo di coraggio reciproco. Cavalca quest'ombra sublimando la rivalità nel piacere dell'estasi carnale più intensa e dissacrante."
      },
      square: {
        title: "Marte in Quadratura a Plutone",
        subtitle: "La Tensione Vulcanica & La Sfida della Trasmutazione del Fuoco",
        function: "Attrito esplosivo a 90° tra l'istinto d'attacco e le forze magmatiche dell'inconscio. L'energia psicofisica è immensa ma costretta in una forgia pressurizzata che richiede valvole di sfogo regali.",
        manifestation: "Crisi rigeneratrici improvvise, intolleranza assoluta a qualsiasi restrizione o comando autoritario, coraggio sovrumano nei momenti di emergenza.",
        shadow: "Aggressività reattiva spropositata, auto-sabotaggio distruttivo, tendenza a forzare le situazioni con violenza anziché con lucidità strategica.",
        directive: "Sii il fabbro della tua spada: non lasciare che il calore della forgia ti consumi. Doma la tua furia e trasformala in audacia chirurgica e resistenza incorruttibile.",
        dark_eros: "Fame carnale selvaggia che rompe gli argini: l'eros si alimenta dell'attrito e del pericolo, sfidando ogni divieto imposto. Cavalca quest'ombra spazzando via ogni residuo di colpa: la tua sessualità è un fuoco primordiale che esige totale verità carnale e che trova nella passione estrema la sua più autentica trasmutazione."
      },
      trine: {
        title: "Marte in Trigono a Plutone",
        subtitle: "Flusso Incorruttibile di Potenza & Rigenerazione Psicosomatica",
        function: "Alleanza a 120° in cui l'istinto cinetico e il potere occulto cooperano alla perfezione. La capacità di rigenerarsi fisicamente e psicologicamente dopo ogni prova è straordinaria.",
        manifestation: "Carisma autorevole, resistenza fisica inesauribile, maestria nel gestire situazioni complesse con determinazione serena e determinata.",
        shadow: "Uso spietato del proprio ascendente sugli altri, distacco freddo di fronte alla vulnerabilità altrui.",
        directive: "Metti la tua forza al servizio della guarigione e della protezione: chi governa gli inferi con naturalezza ha il dovere di guidare chi brancola nel buio.",
        dark_eros: "Sensualità potente e magnetismo inarrestabile: il corpo risponde con vigore primordiale a ogni richiamo del piacere, veicolando una carica erotica ipnotica. Cavalca quest'ombra celebrando la tua forza fisica e la tua resistenza carnale, godendo del sesso come di una sorgente inesauribile di giovinezza e sovranità."
      },
      sextile: {
        title: "Marte in Sestile a Plutone",
        subtitle: "Precisione Strategica & Maestria dell'Azione Risoluta",
        function: "Canale di opportunità a 60° tra coraggio operativo e discernimento psicologico. Permette di intervenire nelle situazioni critiche con tempismo perfetto e minimo dispendio energetico.",
        manifestation: "Abilità nell'individuare il punto debole di qualsiasi avversario o problema, capacità di trasformare la tensione in risultati concreti e duraturi.",
        shadow: "Cinismo opportunistico, tendenza a manipolare le mosse altrui per garantire il proprio esclusivo controllo.",
        directive: "Agisci come una guerriera sapiente: colpisci solo quando è necessario, mirando sempre all'evoluzione e mai alla distruzione fine a se stessa.",
        dark_eros: "Intesa erotica densa e complice: l'eccitazione si alimenta della padronanza del ritmo e dell'esplorazione dei limiti fisici ed emotivi. Cavalca quest'ombra guidando il gioco carnale con mano ferma e mente lucida, facendo del desiderio uno spazio di liberazione cosciente."
      },
      quincunx: {
        title: "Marte in Quinconce a Plutone",
        subtitle: "Ricalibrazione dell'Impulso Viscerale & Dominio dell'Ombra",
        function: "Attrito a 150° tra l'impulso ad agire immediatamente e le complesse correnti sotterranee dell'inconscio. Richiede disciplina interiore per non disperdere la forza in conflitti sterili.",
        manifestation: "Episodi di stanchezza improvvisa alternati a picchi di energia travolgente, difficoltà a dosare l'aggressività nelle relazioni quotidiane.",
        shadow: "Rancore trattenuto che avvelena l'organismo, paura della propria stessa forza che porta all'inibizione temporanea dell'azione.",
        directive: "Pazienta e affina la tua mira: non ogni battaglia merita la tua energia. Impara a riconoscere quando è il momento di colpire e quando è il momento di ritirarsi nel santuario.",
        dark_eros: "Tensione carnale sotterranea che pulsa nell'ombra: il desiderio richiede di essere liberato dalle gabbie del controllo ossessivo. Cavalca quest'ombra permettendo al tuo istinto di esprimersi senza remore mentali, trasformando l'ansia da prestazione in una resa orgasmica al potere puro della terra."
      }
    },

    // ================= LUNA & PLUTONE =================
    "Moon_Pluto": {
      name: "Luna & Plutone",
      conjunction: {
        title: "Luna Congiunta a Plutone (L'Utero degli Inferi e la Percezione Chiaroveggente)",
        subtitle: "Profondità Psichica Abissale, Attaccamento Viscerale e Rigenerazione Emotiva",
        function: "Fusione a 0° tra la psiche inconscia e la matrice degli inferi. La sensibilità emotiva è radarica e penetrante: non esiste segreto, menzogna o sfumatura che possa sfuggire alla percezione viscerale.",
        manifestation: "Presenza magnetica e imperscrutabile, legami simbiotici intensissimi, istinto sciamanico e capacità di accompagnare gli altri attraverso le loro notti più oscure.",
        shadow: "Terrore dell'abbandono e del tradimento, ricatto affettivo inconscio, gelosia morbosa e tendenza a controllare l'anima del partner.",
        directive: "Taglia il cordone ombelicale con il dramma: la tua sicurezza non risiede nel possesso dell'altro, ma nella tua eterna capacità di rinascere dal vuoto.",
        dark_eros: "Lussuria viscerale dell'abisso emotivo: il sesso per Luna-Plutone non è mai solo fisico, è un patto di sangue psichico, un coito dell'anima e delle viscere che squarcia ogni confine. Cavalcare quest'ombra significa non temere la propria fame divoratrice di intimità totale: vivi l'amplesso come un banchetto sacro in cui ci si nutre della verità più cruda dell'altro, dissolvendo ogni maschera borghese nella voluttà della rinascita."
      },
      opposition: {
        title: "Luna Opposta a Plutone",
        subtitle: "La Tensione tra Bisogno di Dolcezza e Richiamo dell'Abisso",
        function: "Polarità a 180° tra l'istinto di protezione e sicurezza emotiva e le dinamiche manipolatorie o distruttive dell'ambiente d'origine o delle relazioni primarie.",
        manifestation: "Attrazione fatale per partner complessi che risvegliano le paure più arcaiche, oscillazione tra freddezza difensiva ed eruzioni emotive vulcaniche.",
        shadow: "Proiettare il mostro divoratore sul partner, vittimismo reattivo, manipolazione dei sentimenti per prevenire l'abbandono.",
        directive: "Sii la madre incorrotta di te stessa: non permettere all'ombra altrui di violare il tuo santuario interiore. Governa la tua emotività con mano regale.",
        dark_eros: "Attrazione fatale per l'eros oscuro che sconvolge e purifica: il desiderio si accende nella vulnerabilità esposta al pericolo emotivo. Cavalca quest'ombra trasformando il terrore di essere manipolati nell'estasi della resa lucida, facendo dell'amplesso un varco di guarigione delle memorie carnali più antiche."
      },
      square: {
        title: "Luna in Quadratura a Plutone",
        subtitle: "La Forgia del Cordone Spezzato & La Sovranità Emotiva",
        function: "Attrito a 90° tra il bisogno somatico di pace e la forza travolgente delle memorie ancestrali traumatiche. La vita intima è un crogiolo continuo di purificazione.",
        manifestation: "Rapporti conflittuali precoci con figure materne dominanti o sofferenti, sensazione di dover sempre lottare per preservare la propria integrità psichica.",
        shadow: "Auto-sabotaggio affettivo, fobia dell'intimità mascherata da cinismo, risentimento covato nel silenzio.",
        directive: "Rinasci da te stessa: il dolore della tua stirpe termina con te. Consacra la tua sensibilità alla libertà e non alla perpetuazione del sacrificio.",
        dark_eros: "Lussuria viscerale che scaturisce dalla rottura dei tabù interiorizzati: eccitazione che nasce dal superamento della colpa materna e morale. Cavalca quest'ombra riconoscendo che il tuo corpo ti appartiene totalmente: sperimenta il piacere più crudo e liberatorio come atto sacro di riscatto sovrano."
      },
      trine: {
        title: "Luna in Trigono a Plutone",
        subtitle: "Intuizione Sciamanica Fluida & Guarigione Tellurica",
        function: "Canale armonico a 120° tra inconscio e potere sotterraneo. La psiche possiede una capacità naturale di assorbire i colpi della vita e trasmutarli in saggezza magnetica.",
        manifestation: "Empatia profonda e protetta, fiuto infallibile per la verità, carisma accogliente che rassicura e affascina chiunque entri nella propria sfera.",
        shadow: "Distacco aristocratico verso i drammi altrui, tendenza a ritenersi al di sopra delle fragilità umane ordinarie.",
        directive: "Sii il porto sicuro per gli erranti: usa la tua lucidità psichica per dissipare le nebbie dell'illusione e mostrare la via della rigenerazione.",
        dark_eros: "Eros ipnotico e avvolgente: sensualità liquida e profonda come la notte oceanica, capace di incantare e risvegliare l'amante attraverso una devozione carnale assoluta. Cavalca quest'ombra con la grazia di una regina della notte, facendo dell'intimità un rito di estasi rigeneratrice."
      },
      sextile: {
        title: "Luna in Sestile a Plutone",
        subtitle: "Acume Psicologico & Alleanza con l'Inconscio",
        function: "Collaborazione a 60° tra sensibilità somatica e discernimento occulto. Permette di comprendere le radici psicologiche dei comportamenti propri e altrui senza farsi ferire.",
        manifestation: "Capacità di rinnovare le relazioni attraverso dialoghi profondi, equilibrio tra dolcezza e fermezza, gestione magistrale delle crisi domestiche o relazionali.",
        shadow: "Tendenza a psicanalizzare costantemente chi si ama, evitando il coinvolgimento spontaneo.",
        directive: "Unisci la saggezza del cuore alla lucidità dell'abisso: offri il tuo intuito per costruire legami incorruttibili.",
        dark_eros: "Complicità sensoriale profonda: sintonizzazione telepatica con i desideri inconfessabili del partner e capacità di condurlo dolcemente verso la dissoluzione dei blocchi carnali. Cavalca quest'ombra con leggerezza sapiente e magnetismo sicuro."
      },
      quincunx: {
        title: "Luna in Quinconce a Plutone",
        subtitle: "Ricalibrazione della Vulnerabilità & Guarigione Psicosomatica",
        function: "Dissonanza a 150° tra la sete di tenerezza e l'impulso sotterraneo a proteggersi attraverso il controllo. Esige un lavoro paziente di auto-accoglienza.",
        manifestation: "Fluttuazioni dell'umore legate a paure sotterranee irrisolte, tendenza a somatizzare l'ansia relazionale negli organi viscerali.",
        shadow: "Diffidenza cronica che impedisce l'abbandono all'amore sereno, senso di colpa per i propri bisogni emotivi oscuri.",
        directive: "Ascolta il tuo corpo con compassione regale: le ombre che senti bussare non chiedono di essere scacciate, ma illuminate dalla tua stessa luce sovrana.",
        dark_eros: "Desiderio carnale viscerale frenato dal timore del giudizio: la lussuria chiede di essere liberata dalle paure di contaminazione. Cavalca quest'ombra abbandonando ogni difesa e riscoprendo il piacere come il più naturale balsamo di liberazione e beatitudine."
      }
    },

    // ================= SOLE & MARTE =================
    "Sun_Mars": {
      name: "Sole & Marte",
      conjunction: {
        title: "Sole Congiunto a Marte (La Spada Solare del Sovrano)",
        subtitle: "Volontà Vulcanica, Assertività Radiante e Trionfo dell'Azione",
        function: "Fusione fiammeggiante a 0° tra il centro cosciente della regalità (Sole) e il braccio operativo della forza e del desiderio (Marte). L'intento e l'azione sono un solo raggio di fuoco: ciò che viene concepito viene immediatamente realizzato.",
        manifestation: "Vitalità esuberante, coraggio fisico indomito, piglio di comando naturale, intolleranza per la pigrizia e prontezza nell'affrontare qualsiasi sfida a testa alta.",
        shadow: "Egocentrismo prepotente, collera reattiva, tendenza a imporre la propria volontà calpestando la sensibilità di chi è più fragile.",
        directive: "Sii un leader che illumina e non un tiranno che brucia: governa la tua forza con la nobiltà del cuore solare, impugnando la tua autorità a difesa della verità.",
        dark_eros: "L'eros del predatore incoronato: la carica sessuale è pura energia solare radiante, imperiosa e febbrile. Non vi è esitazione né vergogna: il desiderio vuole essere consumato nell'atto trionfale della conquista carnale. Cavalcare quest'ombra significa non scusarsi per la propria audacia erotica: rivendica il diritto di prendere ciò che desideri con fiera passione, trasformando l'amplesso in una celebrazione del fuoco vitale indivisibile."
      },
      opposition: {
        title: "Sole Opposto a Marte",
        subtitle: "L'Asse del Duello di Sovranità & La Sfida della Provocazione",
        function: "Tensione a 180° tra l'auto-percezione del valore solare e l'impulso aggressivo esterno. Si attirano avversari o partner volitivi che sfidano l'autorità, costringendo a un continuo affinamento della propria assertività.",
        manifestation: "Frequenti contese per il potere, irritabilità di fronte a ordini imposti, oscillazione tra orgoglio ferito e reazioni bellicose.",
        shadow: "Competizione distruttiva, paranoia di essere sottomessi, spreco di energie vitali in battaglie d'onore sterili.",
        directive: "La vera regalità non ha bisogno di difendere il trono contro ogni sfidante: mantieni il tuo aplomb sovrano e lascia che gli avversari si logorino contro la loro stessa arroganza.",
        dark_eros: "Attrazione magnetica accesa dalla sfida: l'eros si infiamma nello scontro tra due volontà decise a non cedere. La seduzione è un corpo a corpo in cui il piacere si guadagna sul campo attraverso una passione febbrile e indomabile. Cavalca quest'ombra trasformando la rivalità in gioco erotico di dominio e resa alternata, godendo della scintilla elettrica dell'altro."
      },
      square: {
        title: "Sole in Quadratura a Marte",
        subtitle: "La Forgia dell'Eroe & Il Superamento dell'Impazienza Distruttiva",
        function: "Attrito esplosivo a 90° tra l'immagine di sé e l'azione impulsiva. La persona sente una spinta incessante a dimostrare il proprio valore, rischiando incidenti di percorso o contrasti accesi.",
        manifestation: "Resistenza strenua alle frustrazioni, temperamento sanguigno, prontezza a rischiare tutto per affermare i propri progetti.",
        shadow: "Comportamento spericolato, impazienza che brucia le tappe, collera che distrugge in un attimo ponti faticosamente costruiti.",
        directive: "Modella il tuo ferro rovente con precisione chirurgica: la fretta è il veleno della forza. Impara a temporeggiare per scatenare la tua potenza solo nell'istante perfetto.",
        dark_eros: "Furia erotica ad altissima pressione: la lussuria nasce dall'attrito e dall'urgenza viscerale di scaricare la tensione carnale repressa. Cavalca quest'ombra trasformando l'aggressività grezza in una passione carnale devastante e purificatrice, capace di spazzare via ogni residuo di inibizione morale o perbenismo borghese."
      },
      trine: {
        title: "Sole in Trigono a Marte",
        subtitle: "Flusso Armonico di Vigore & Spontanea Assertività",
        function: "Canale di grazia a 120° tra nobiltà e vigore. L'intenzione cosciente e la pulsione fisica cooperano senza il minimo attrito, donando un'azione fluida, sicura e irresistibile.",
        manifestation: "Salute robusta, tempismo perfetto nelle decisioni, magnetismo maschile o amazzonico naturale che ispira fiducia e ammirazione.",
        shadow: "Pigrizia nell'allenare la propria volontà quando le cose riescono troppo facilmente, compiacimento dei successi immediati.",
        directive: "Usa questo flusso radiante per compiere grandi imprese: il talento naturale è una torcia che va tenuta accesa attraverso la dedizione costante.",
        dark_eros: "Sensualità radiante, atletica e sicura di sé: l'amplesso è una festa dei sensi in cui la gioia del corpo si esprime con slancio sovrano e privo di ombre nefaste. Cavalca quest'ombra celebrando la bellezza del vigore carnale, offrendo e ricevendo piacere con generosità inesauribile."
      },
      sextile: {
        title: "Sole in Sestile a Marte",
        subtitle: "Alleanza Dinamica tra Lucidità e Prontezza Operativa",
        function: "Sinergia dinamica a 60° che facilita la cooperazione tra pianificazione cosciente ed esecuzione energica.",
        manifestation: "Abilità nell'organizzare strategie concrete, entusiasmo contagioso nei gruppi di lavoro, spirito d'iniziativa tempestivo.",
        shadow: "Tendenza a disperdere la carica iniziale in troppi progetti paralleli senza portarne a termine alcuno.",
        directive: "Sii un'architetta d'azione: focalizza la tua fiamma su un obiettivo alla volta e osserva come ogni ostacolo si dissolve sotto la tua spinta.",
        dark_eros: "Complicità erotica audace e giocosa: seduzione intelligente e disinibita, in cui il desiderio si alimenta della prontezza di spirito e della complicità carnale. Cavalca quest'ombra godendo dell'iniziativa reciproca senza paure di rifiuto."
      },
      quincunx: {
        title: "Sole in Quinconce a Marte",
        subtitle: "Ricalibrazione della Direzione della Spinta Vitale",
        function: "Attrito a 150° tra chi si vuole essere e le modalità con cui si persegue il desiderio. Richiede una raffinata auto-regolazione per non esaurirsi prima del traguardo.",
        manifestation: "Sensazione di spingere a vuoto o di essere fraintesi nelle proprie buone intenzioni assertivie, cali energetici post-sforzo.",
        shadow: "Frustrazione passivo-aggressiva, dubbio sulle proprie capacità fisiche o decisionali.",
        directive: "Allinea la freccia alla vera vocazione del tuo cuore: non combattere battaglie per procura, spara solo dove risiede il tuo destino sovrano.",
        dark_eros: "Desiderio carnale intenso ma discontinuo: l'ombra richiede di armonizzare il ritmo del corpo con quello della mente, eliminando le ansie da prestazione per abbandonarsi a un piacere spontaneo e rigeneratore."
      }
    },

    // ================= LUNA & MARTE =================
    "Moon_Mars": {
      name: "Luna & Marte",
      conjunction: {
        title: "Luna Congiunta a Marte (Il Sangue Caldo dell'Istinto)",
        subtitle: "Pulsione Carnale Viscerale, Reattività Emozionale e Fame Indomabile",
        function: "Fusione a 0° tra l'inconscio somatico (Luna) e l'impulso d'azione e desiderio (Marte). Le emozioni non passano per la mente: sono vissute come scosse fisiologiche immediate, passionali e indomabili.",
        manifestation: "Reattività fulminea, istinto di protezione feroce per i propri cari, coraggio passionale che agisce di pancia senza calcolo del pericolo.",
        shadow: "Irascibilità, suscettibilità esasperata, tendenza a vivere ogni divergenza come un attacco biologico personale.",
        directive: "Governa il tuo fuoco uterino: il sangue caldo è una pozione magica se custodita nel calice della lucidità, ma diventa veleno se versata ovunque con rabbia cieca.",
        dark_eros: "La lussuria cruda dell'istinto ancestrale: l'eros di Luna e Marte è immediato, carnale, insaziabile. È la fame dell'amante che vuole mordere la carne e sentire il battito del sangue nell'amplesso, senza alcuna ipocrisia cortese. Cavalcare quest'ombra significa accogliere la propria natura sensoriale più ardente: il sesso è un rito di possessione e abbandono viscerale dove la vulva e il fallo celebrano la loro unione primordiale al di sopra di ogni dogma morale."
      },
      opposition: {
        title: "Luna Opposta a Marte",
        subtitle: "L'Asse della Tensione tra Accoglienza e Conquista",
        function: "Tensione a 180° tra il bisogno di sicurezza e coccole emotive e la spinta a lottare o aggredire. Spesso si proietta l'aggressività sul partner o si subiscono le intemperanze altrui.",
        manifestation: "Relazioni domestiche tempestose, alternanza tra dolcezza dipendente e rotture rabbiose improvvise, conflitti interiori tra pace e adrenalina.",
        shadow: "Guerra di logoramento tra i sessi, rancore infantile trattenuto, tendenza a provocare il partner per testarne la fedeltà.",
        directive: "Armonizza la culla e la spada: impara a difendere la tua vulnerabilità senza bisogno di aggredire preventivamente chi ti ama.",
        dark_eros: "Tensione magnetica tra dolcezza e ferocia: l'eros si infiamma nello scontro tra il bisogno di essere cullati e la pulsione di essere travolti dalla passione carnale più impetuosa. Cavalca quest'ombra smettendo di reprimere la tua natura infuocata: lascia che la tempesta dei sensi purifichi le tue ferite affettive."
      },
      square: {
        title: "Luna in Quadratura a Marte",
        subtitle: "Il Fuoco nell'Acqua & Il Crogiolo della Reattività",
        function: "Attrito a 90° tra l'ipersensibilità della psiche e l'irruenza marziana. Si sperimenta una costante turbolenza emotiva interna che fatica a trovare pace.",
        manifestation: "Vulnerabilità infiammabile, reazioni emotive impulsive di cui ci si pente subito dopo, insofferenza verso le debolezze proprie e altrui.",
        shadow: "Auto-ferimento emotivo, distruzione dei legami intimi durante accessi d'ira, somatizzazioni gastriche o infiammatorie.",
        directive: "Trasforma il tuo vapore rovente in forza creativa: non soffocare la tua collera e non scagliarla contro chi ti è vicino. Usala per bruciare le tue catene interiori.",
        dark_eros: "Lussuria bruciante nata dalla ribellione intima: l'eros è alimentato dalla tensione e dal superamento dei divieti interiorizzati. Cavalca quest'ombra riconoscendo che la tua passione ardente non è una colpa, ma il segnale vitale che la tua anima rifiuta di essere addomesticata o spenta dalla noia quotidiana."
      },
      trine: {
        title: "Luna in Trigono a Marte",
        subtitle: "Flusso di Passione Feconda & Naturale Coraggio",
        function: "Alleanza a 120° in cui il sentire emotivo sostiene pienamente l'azione fisica. La determinazione è spontanea e priva di tormento psicologico.",
        manifestation: "Personalità calda, accogliente ma risoluta; capacità di proteggere i propri confini con grazia e fermezza; grande entusiasmo nella vita quotidiana.",
        shadow: "Tendenza a dare per scontata la propria riserva di energia vitale, trascurando il riposo rigeneratore.",
        directive: "Sii la protettrice sapiente: usa la tua vitalità calorosa per donare coraggio a chi si sente smarrito o privo di forze.",
        dark_eros: "Passione carnale fluida e generosa: il corpo e le emozioni si muovono all'unisono nell'amplesso, liberando un'energia vitale gioiosa, calda e rigeneratrice. Cavalca quest'ombra donandoti al piacere con fierezza naturale, facendo dell'intimità una celebrazione della vita che arde."
      },
      sextile: {
        title: "Luna in Sestile a Marte",
        subtitle: "Accordo Dinamico tra Intuito Somatico e Prontezza",
        function: "Sinergia a 60° tra l'intuito istintivo e la prontezza d'intervento. Permette di percepire i bisogni immediati e agire prontamente per soddisfarli.",
        manifestation: "Prontezza d'animo nelle emergenze familiari, schiettezza emotiva sana, abilità nel motivare gli altri attraverso l'esempio.",
        shadow: "Sbrigatività nell'ascoltare chi ha ritmi interiori più lenti e riflessivi.",
        directive: "Sii un faro d'azione empatica: combina la tua sensibilità con la tua iniziativa per creare ambienti in cui ciascuno possa sentirsi al sicuro e attivo.",
        dark_eros: "Complicità sensoriale schietta e vitale: la seduzione è diretta, priva di ipocrisie e giochi manipolatori. Cavalca quest'ombra chiedendo apertamente ciò che desideri a livello carnale, celebrando l'intesa fisica senza vergogne."
      },
      quincunx: {
        title: "Luna in Quinconce a Marte",
        subtitle: "Ricalibrazione tra Bisogno Emotivo e Spinta all'Azione",
        function: "Dissonanza a 150° in cui la persona si sente divisa tra il riposo nell'intimità e la brama di conquista nel mondo.",
        manifestation: "Frequenti oscillazioni tra apatia sensibile e impeto improvviso, fatica ad armonizzare i cicli del sonno e del recupero con l'attività fisica.",
        shadow: "Frustrazione muta, tendenza a farsi carico di compiti gravosi per poi risentirsi con gli altri.",
        directive: "Rispetta le tue maree biologiche: non costringere il tuo cuore a correre quando ha bisogno di silenzio, né a dormire quando la tua linfa chiama all'avventura.",
        dark_eros: "Desiderio carnale intermittente e misterioso: l'eccitazione si risveglia quando si supera la frizione tra il bisogno di cura affettiva e la fame di passione travolgente. Cavalca quest'ombra accogliendo i tuoi desideri senza giudicarli, lasciando che il corpo ritrovi il suo ritmo sovrano."
      }
    },

    // ================= VENERE & URANO =================
    "Venus_Uranus": {
      name: "Venere & Urano",
      conjunction: {
        title: "Venere Congiunta a Urano (Il Fulmine dell'Eros Eretico)",
        subtitle: "Magnetismo Folgorante, Amore Libero e Rottura dei Tabù Borghesi",
        function: "Fusione elettrizzante a 0° tra la sensualità magnetica (Venere) e il fulmine cosmico della trasgressione e dell'originalità (Urano). L'attrazione è istantanea, fuori dagli schemi e priva di qualsiasi conformismo morale.",
        manifestation: "Fascino elettrizzante, stile estetico audace e all'avanguardia, attrazione per anime eccentriche e relazioni fondate sulla massima libertà reciproca.",
        shadow: "Insofferenza nevrotica verso qualsiasi impegno stabile, tendenza a fuggire non appena sorge la routine, rotture brutali e improvvise.",
        directive: "Sii pioniera dell'amore sovrano: non temere la tua diversità erotica, ma impara che la vera libertà non consiste nel fuggire, bensì nell'amare senza farsi imprigionare da dogmi morali ipocriti.",
        dark_eros: "L'orgasmo come scossa tellurica liberatrice: la lussuria di Venere e Urano congiunti è elettrica, dissacrante, futurista. È l'eccitazione che si accende nella trasgressione dei ruoli, nelle pratiche anticonvenzionali e nell'esplorazione di confini erotici inesplorati. Cavalcare quest'ombra significa rifiutare qualsiasi etichetta o senso di colpa patriarcale: il tuo corpo è un conduttore di fulmini cosmici che usa il piacere per risvegliare la coscienza e liberare la carne dalla noia del mondo."
      },
      opposition: {
        title: "Venere Opposta a Urano",
        subtitle: "L'Asse della Tensione tra Fusione e Indipendenza Assoluta",
        function: "Polarità a 180° tra il desiderio di intimità affettiva e il terrore viscerale di perdere la propria libertà individuale. Si attirano partner imprevedibili o distaccati.",
        manifestation: "Relazioni a strappi, colpi di fulmine seguiti da repentine distanze, oscillazione tra passione divoratrice e freddezza anaffettiva improvvisa.",
        shadow: "Sabotaggio sistematico dei legami duraturi, ricerca del dramma della rottura per risentire il brivido dell'autonomia.",
        directive: "Stabilisci un patto di sovranità: chi ti ama veramente non vuole incatenarti, e tu non hai bisogno di scappare per rimanere te stessa. Trova il centro tra legame e volo.",
        dark_eros: "Tensione erotica febbrile alimentata dall'imprevedibilità e dal pericolo dell'abbandono: il piacere si accende nella distanza prima della scarica elettrica dell'amplesso. Cavalca quest'ombra godendo della sorpresa e della passione fulminea, facendo dell'intimità uno spazio di rinnovamento continuo dove ogni incontro è come il primo."
      },
      square: {
        title: "Venere in Quadratura a Urano",
        subtitle: "Il Terremoto del Desiderio & La Ribellione Sentimentale",
        function: "Attrito ad altissima tensione a 90° tra il bisogno armonico del cuore e la spinta anarchica alla trasgressione. La vita affettiva è costellata di rivoluzioni improvvise.",
        manifestation: "Insofferenza verso le aspettative sociali di matrimonio o fedeltà borghese, attrazione per amori complicati o socialmente vietati.",
        shadow: "Instabilità affettiva cronica, alienazione sensoriale, tendenza a ferire chi ama con atteggiamenti scostanti e cinici.",
        directive: "Purifica il tuo fuoco eretico: la ribellione fine a se stessa è solo una trappola dell'ego. Usa la tua energia per forgiare nuovi paradigmi di rispetto e voluttà libera.",
        dark_eros: "Lussuria esplosiva e dissacrante: l'eros si infiamma nello shock della provocazione e nella rottura di ogni pudore borghese. Cavalca quest'ombra esplorando i tuoi desideri più eccentrici senza vergogna, facendo della tua sessualità un laboratorio sacro di sperimentazione estatica."
      },
      trine: {
        title: "Venere in Trigono a Urano",
        subtitle: "Flusso Radiante di Fascino Unico & Spontanea Sovranità",
        function: "Canale armonico a 120° in cui l'originalità e la sensualità cooperano con naturalezza. La persona esprime una bellezza magnetica e inclassificabile senza alcuno sforzo.",
        manifestation: "Carisma moderno, capacità di mantenere viva la scintilla nei rapporti concedendo e chiedendo spazi liberi, gusto artistico rivoluzionario.",
        shadow: "Disinteresse per le persone che non possiedono una mente brillante o uno stile fuori dal comune, snobismo estetico.",
        directive: "Sii ambasciatrice della bellezza del futuro: ispira gli altri a osare e a liberarsi dalle catene della mediocrità con la tua stessa grazia.",
        dark_eros: "Eros scintillante e aperto a nuove frontiere: il piacere è una danza elettrica che risveglia ogni cellula del corpo con raffinata leggerezza e curiosità indomabile. Cavalca quest'ombra celebrando la tua unicità carnale, inventando nuovi linguaggi del desiderio che oltrepassano il già visto."
      },
      sextile: {
        title: "Venere in Sestile a Urano",
        subtitle: "Complicità Elettrizzante & Alleanza delle Menti Libere",
        function: "Sinergia a 60° tra grazia seduttiva e apertura mentale. Permette di rinnovare costantemente i legami affettivi attraverso interessi stimolanti e rispetto reciproco.",
        manifestation: "Facilità nel stringere amicizie affettuose non convenzionali, spirito pionieristico nelle arti visive e nelle relazioni umane.",
        shadow: "Tendenza a intellectualizzare le emozioni per evitare di sprofondare nella passione viscerale.",
        directive: "Coltiva l'amicizia sovrana: i migliori amanti sono coloro che sanno essere compagni di cospirazione ed evoluzione spirituale.",
        dark_eros: "Complicità erotica audace e stimolante: la seduzione si nutre di parole proibite, giochi di ruolo e scambi intellettuali ad alto tasso erotico. Cavalca quest'ombra con mente libera e cuore impavido, scoprendo nell'eccitazione mentale il preludio più potente del piacere carnale."
      },
      quincunx: {
        title: "Venere in Quinconce a Urano",
        subtitle: "Ricalibrazione tra Bisogno di Calore e Spinta Anarchica",
        function: "Dissonanza a 150° tra la tenerezza affettiva tradizionale e il bisogno improvviso di isolamento o trasgressione. Esige un continuo riallineamento delle aspettative.",
        manifestation: "Sensazione di sentirsi in gabbia non appena un rapporto diventa intimo, alternata al rimpianto per la sicurezza perduta.",
        shadow: "Comportamenti bizzarri che allontanano le persone care senza una reale motivazione, senso di solitudine incompresa.",
        directive: "Impara ad abitare i tuoi paradossi: non devi scegliere tra amare e volare. Costruisci legami abbastanza ampi da contenere sia le tue radici che le tue ali.",
        dark_eros: "Desiderio carnale insolito e discontinuo: l'eccitazione richiede condizioni psicologiche particolari per accendersi, rifiutando ogni copione prestabilito. Cavalca quest'ombra ascoltando le richieste più singolari del tuo corpo senza giudicarle strane o sbagliate."
      }
    },

    // ================= VENERE & NETTUNO =================
    "Venus_Neptune": {
      name: "Venere & Nettuno",
      conjunction: {
        title: "Venere Congiunta a Nettuno (L'Eros Oceanico e la Devozione Mistica)",
        subtitle: "Estasi dei Sensi, Fusione Tantrica e Bellezza Eterea Trascendente",
        function: "Fusione a 0° tra la sensualità umana (Venere) e l'oceano infinito dell'inconscio mistico (Nettuno). L'amore è vissuto come una liturgia spirituale, un dissolvimento totale dei confini dell'io nell'abbraccio con il divino.",
        manifestation: "Bellezza eterea e incantatrice, sensibilità artistica sublime, devozione totale verso l'amato, capacità di percepire l'anima attraverso la pelle.",
        shadow: "Idealizzazione cieca del partner, sindrome della crocerossina, tendenza a farsi calpestare o a perdersi in illusioni sentimentali devastanti.",
        directive: "Consacra il tuo calice ma mantieni i confini del tuo tempio: la vera devozione non è annullamento di sé, ma comunione tra due sovranità che contemplano l'infinito.",
        dark_eros: "L'amplesso come varco di dissoluzione estatica: la lussuria di Venere e Nettuno è oceanica, ipnotica, trascendente. Il piacere non si ferma all'epidermide, ma penetra nell'astrale, dove il coito è una preghiera sacrilega e sublime che dissolve ogni barriera tra carne e spirito. Cavalcare quest'ombra significa non temere la perdita del controllo ordinario nell'orgasmo: abbandonati alle correnti del piacere mistico come una sacerdotessa nel mare notturno, facendoti canale di una grazia sensoriale ineffabile."
      },
      opposition: {
        title: "Venere Opposta a Nettuno",
        subtitle: "L'Asse del Disincanto & La Sfida del Tradimento delle Illusioni",
        function: "Polarità a 180° tra l'amore terreno concreto e l'anelito verso una perfezione sentimentale inafferrabile. Spesso si sperimentano disillusioni cocenti o amori irraggiungibili.",
        manifestation: "Attrazione per figure sofferenti o sfuggenti, tendenza a proiettare sul partner un'aura divina per poi rimanere distrutti dalla realtà umana.",
        shadow: "Vittimismo romantico, fuga nella fantasia per non affrontare la mediocrità del quotidiano, vulnerabilità a manipolazioni affettive.",
        directive: "Apri gli occhi senza chiudere il cuore: la bellezza dell'umano risiede proprio nelle sue imperfezioni. Ama la carne reale e non il fantasma dei tuoi sogni.",
        dark_eros: "Seduzione ipnotica ma rischiosa: il piacere è avvolto nel fumo dell'inconfessabile, in cui la mente rischia di perdersi in fantasie che divorano la realtà. Cavalca quest'ombra ancorando la tua sensualità al respiro del corpo: godi dell'ebbrezza dell'amplesso senza farti inghiottire dalle nebbie dell'illusione, rimanendo regina vigile della tua stessa estasi."
      },
      square: {
        title: "Venere in Quadratura a Nettuno",
        subtitle: "Il Labirinto degli Specchi Affettivi & La Purificazione della Devozione",
        function: "Attrito a 90° tra il bisogno sensoriale di certezza e le correnti ingannevoli dell'illusione romantica. L'anima deve attraversare il deserto delle delusioni per trovare il vero amore autentico.",
        manifestation: "Esperienze precoci di promesse tradite, tendenza a nascondere a se stessi i difetti evidenti dell'amato, sacrificio affettivo mal riposto.",
        shadow: "Auto-inganno sentimentale, rifugio nell'alcol o in paradisi artificiali per lenire la ferita del rifiuto, confusione tra pietà e amore.",
        directive: "Spezza lo specchio incantato: l'amore vero non richiede che tu diventi martire. Impara a pretendere rispetto e lealtà tangibile prima di aprire le porte del tuo santuario.",
        dark_eros: "Lussuria tentatrice e trascinante: l'eros si alimenta del mistero, del divieto e del confine labile tra peccato e santità. Cavalca quest'ombra spogliando la tua sessualità da ogni ipocrisia colpevolizzante: vivi l'estasi carnale come un rito di disintossicazione spirituale, dove il piacere abbatte i muri della vergogna."
      },
      trine: {
        title: "Venere in Trigono a Nettuno",
        subtitle: "Flusso di Grazia Magica & Magnetismo Poetico Infallibile",
        function: "Canale armonico a 120° tra bellezza e trascendenza. La persona emana un'aura fatata e irresistibile che suscita tenerezza, ispirazione e desiderio di purezza negli altri.",
        manifestation: "Doti artistiche e musicali innate, carisma rilassante e rassicurante, capacità di creare atmosfere di straordinaria armonia sensoriale.",
        shadow: "Passività affettiva, tendenza ad aspettare che le cose accadano magicamente senza compiere scelte coraggiose.",
        directive: "Incarna la magia nel mondo tangibile: usa il tuo talento estetico e spirituale per risanare la bruttezza e il cinismo dell'epoca presente.",
        dark_eros: "Sensualità tantrica avvolgente e ipnotica: il piacere scorre come un liquido dorato che accarezza i centri sottili, portando gli amanti a stati di estasi prolungata e beatitudine meditativa. Cavalca quest'ombra celebrando la tua devozione carnale come un'arte sacra, dove l'orgasmo è comunione con il cosmo intero."
      },
      sextile: {
        title: "Venere in Sestile a Nettuno",
        subtitle: "Sensibilità Raffinata & Cura Poetica dell'Altro",
        function: "Sinergia a 60° tra delicatezza affettiva e immaginazione feconda. Permette di comprendere i silenzi e le ferite emotive con grande tatto.",
        manifestation: "Gusto estetico sofisticato, generosità empatica misurata e protetta, abilità nel consolare e risvegliare la speranza.",
        shadow: "Tendenza a sfuggire le discussioni aspre o i chiarimenti necessari per preservare una pace apparente.",
        directive: "Sii custode della gentilezza regale: la vera dolcezza è forte come la roccia e sa imporre rispetto senza mai alzare la voce.",
        dark_eros: "Complicità sensoriale sottile e incantata: la seduzione passa attraverso la musica, gli aromi, le carezze che sfiorano l'anima prima della carne. Cavalca quest'ombra esplorando i recessi più poetici e delicati dell'eros, facendo dell'amplesso un sogno lucido vissuto a due."
      },
      quincunx: {
        title: "Venere in Quinconce a Nettuno",
        subtitle: "Ricalibrazione tra Sete di Assoluto e Limite del Quotidiano",
        function: "Dissonanza a 150° tra il desiderio di una fusione mistica perfetta e la prosaica realtà dei bisogni materiali e carnali.",
        manifestation: "Insoddisfazione sottile nelle relazioni ordinarie, sensazione periodica che manchi qualcosa di inafferrabile nel piacere vissuto.",
        shadow: "Malinconia sentimentale, disconnessione sensoriale che impedisce di godere pienamente del momento presente.",
        directive: "Radica il tuo cielo nella terra: la divinità si manifesta nell'odore della pelle, nel respiro affannato, nella carne viva. Non cercare altrove ciò che hai già tra le braccia.",
        dark_eros: "Lussuria sfuggente che desidera l'irraggiungibile: l'eccitazione si risveglia quando si accetta la sacralità del corpo imperfetto. Cavalca quest'ombra abbandonando la pretesa di un'esperienza asettica e abbracciando la carne reale in tutta la sua calda, disarmante verità."
      }
    },

    // ================= VENERE & SATURNO =================
    "Venus_Saturn": {
      name: "Venere & Saturno",
      conjunction: {
        title: "Venere Congiunta a Saturno (Il Tantra del Tempio di Ossidiana)",
        subtitle: "Fedeltà Incorruttibile, Maestria Sensoriale e Sovranità sul Tempo",
        function: "Fusione a 0° tra la dea del piacere (Venere) e il maestro della soglia e del rigore (Saturno). L'amore e la sensualità sono forgiati nel fuoco lento della disciplina e della responsabilità sovrana: niente è concesso alla superficialità.",
        manifestation: "Bellezza austera e aristocratica, fedeltà incrollabile verso i patti stabiliti, maturità affettiva precoce, attrazione per relazioni solide e durature nel tempo.",
        shadow: "Gelo emotivo, paura paralizzante del rifiuto che porta a corazzarsi, senso di indegnità affettiva che convince di non meritare il piacere.",
        directive: "Sciogli la corazza di ghiaccio: il vero rigore saturniano serve a proteggere il sacro e non a imprigionare la vita. Il tuo valore è assoluto e la tua bellezza matura con gli anni come oro antico.",
        dark_eros: "Il tantra oscuro della soglia e del controllo: la lussuria di Venere e Saturno congiunti è densa, trattenuta, regale. È l'eccitazione dell'attesa febbrile, del piacere differito e della maestria della carne dove il dominio sensoriale e la sottomissione devota si fondono in un rito austero e profondamente eccitante. Cavalcare quest'ombra significa spazzare via il senso di colpa e il pudore bigotto: il tuo corpo è un tempio di pietra nera dove il godimento si consuma con la solennità di una consacrazione eterna."
      },
      opposition: {
        title: "Venere Opposta a Saturno",
        subtitle: "L'Asse della Tensione tra Desiderio e Senso del Dovere",
        function: "Polarità a 180° tra la brama di gioia sensuale e le severe richieste morali o materiali dell'ambiente o del partner. Spesso ci si sente non amati o giudicati inadeguati.",
        manifestation: "Relazioni con partner più anziani o rigidi, timore costante di essere abbandonati o usati, oscillazione tra sacrifici eccessivi e chiusura glaciale.",
        shadow: "Autocritica spietata sulla propria bellezza, cinismo sentimentale reattivo, rifiuto del piacere vissuto come debolezza o peccato.",
        directive: "Sii la prima a concederti grazia: non devi guadagnarti il diritto di esistere o di essere amata con la sofferenza. Deponi le armi del sacrificio e accogli la dolcezza.",
        dark_eros: "Tensione erotica tra il freno morale e l'esplosione della passione trattenuta: il piacere si intensifica nella trasgressione del divieto imposto dal dovere o dall'autorità. Cavalca quest'ombra permettendo al calore della tua lussuria di sciogliere ogni blocco ancestrale, godendo della resa carnale come del più dolce riscatto sul tempo."
      },
      square: {
        title: "Venere in Quadratura a Saturno",
        subtitle: "La Forgia del Valore Sovrano & La Guarigione della Ferita di Rifiuto",
        function: "Attrito a 90° tra il bisogno affettivo e l'esperienza del freddo, del ritardo o del distacco. È l'aspetto che costringe a costruire un'autostima adamantina indipendente dagli altri.",
        manifestation: "Ferite precoci di solitudine affettiva o di severità genitoriale, tendenza a diffidare dei complimenti e a schermarsi dietro un'autosufficienza fiera ma dolorosa.",
        shadow: "Invidia per la felicità altrui, pessimismo amoroso, incapacità di lasciarsi andare per timore di mostrare debolezza.",
        directive: "Forgia il tuo diamante dal carbone del passato: le ferite ti hanno resa immune alle adulazioni vuote. Ora puoi amare con la forza incorruttibile di chi basta a se stessa.",
        dark_eros: "Lussuria severa e profonda: il desiderio ha dovuto lottare contro la censura interiore e la vergogna del corpo per emergere. Cavalca quest'ombra abbattendo il giudice interiore: la tua carne non è peccaminosa, è il crogiolo in cui la passione diventa potenza regale che non chiede scusa a nessuno."
      },
      trine: {
        title: "Venere in Trigono a Saturno",
        subtitle: "Flusso di Lealtà Adamantina & Stabilità Radiante del Cuore",
        function: "Canale armonico a 120° tra valore e durata. L'affettività possiede una stabilità naturale, donando relazioni solide, serenità finanziaria e maturità sensuale priva di ansie.",
        manifestation: "Capacità di costruire alleanze che resistono a qualsiasi tempesta, senso innato della misura e dell'eleganza classica, affidabilità totale.",
        shadow: "Eccessiva prudenza che può far perdere occasioni di passione travolgente, timore del disordine emotivo.",
        directive: "Custodisci la tua rocca: la tua fedeltà è un tesoro raro nel mondo del consumo effimero. Offrila solo a chi dimostra di possedere la tua stessa nobiltà d'animo.",
        dark_eros: "Eros maturo, denso e sicuro: la sensualità non ha fretta, si assapora con la calma dei maestri tantrici che sanno guidare l'energia sessuale verso vette di estasi duratura. Cavalca quest'ombra celebrando la maestria della tua carne e la bellezza che non teme il passare degli anni."
      },
      sextile: {
        title: "Venere in Sestile a Saturno",
        subtitle: "Alleanza tra Grazia e Saggezza Costruttiva",
        function: "Sinergia a 60° tra buon gusto e pragmatismo. Permette di gestire le relazioni e le risorse con intelligenza, rispetto dei tempi e sincerità.",
        manifestation: "Ottimo fiuto per gli accordi duraturi, franchezza affettiva mai offensiva, capacità di consigliare gli altri con saggezza ed equilibrio.",
        shadow: "Tendenza a dare priorità al dovere rispetto al gioco e al divertimento spontaneo.",
        directive: "Unisci il dovere alla gioia: permettiti di festeggiare i tuoi traguardi senza rimandare il piacere a un futuro indefinito.",
        dark_eros: "Complicità carnale solida e rassicurante: il piacere si fortifica nella fiducia e nella conoscenza meticolosa dei ritmi del corpo. Cavalca quest'ombra esplorando la disciplina del piacere con calma sovrana e dedizione reciproca."
      },
      quincunx: {
        title: "Venere in Quinconce a Saturno",
        subtitle: "Ricalibrazione tra Libero Piacere e Responsabilità Emotiva",
        function: "Dissonanza a 150° tra il richiamo della leggerezza sensuale e il peso dei doveri assunti. Esige una continua revisione dei propri confini interiori.",
        manifestation: "Difficoltà a rilassarsi durante i momenti intimi per l'affiorare di pensieri pratici o sensi di colpa professionali.",
        shadow: "Sentirsi costantemente in debito verso gli altri, negarsi il meritato riposo carnale.",
        directive: "Stabilisci orari sacri per il piacere: quando sei nel tempio dell'amore, chiudi la porta a ogni sollecitudine del mondo esterno.",
        dark_eros: "Desiderio carnale contenuto che attende il permesso della mente per liberarsi: la lussuria chiede di essere svincolata dal dovere. Cavalca quest'ombra concedendoti l'estasi senza doverla giustificare con alcuna fatica preventiva."
      }
    },

    // ================= MARTE & SATURNO =================
    "Mars_Saturn": {
      name: "Marte & Saturno",
      conjunction: {
        title: "Marte Congiunto a Saturno (La Spada Forgiata nel Ghiaccio)",
        subtitle: "Resistenza Titanica, Azione Chirurgica e Maestria della Pressione",
        function: "Fusione a 0° tra il principio del fuoco cinetico (Marte) e il maestro della disciplina e della struttura (Saturno). È l'aspetto della massima concentrazione energetica: l'impulso non è mai disperso, ma compresso fino a diventare irresistibile.",
        manifestation: "Capacità sovrumana di sopportare sforzi prolungati, tempismo implacabile, determinazione che non si arrende mai di fronte agli ostacoli più ardui.",
        shadow: "Frustrazione compressa che rischia di trasformarsi in crudeltà fredda, blocco paralizzante dell'azione per timore del fallimento, rigidità autoritaria.",
        directive: "Sii la scultrice del tuo destino: usa il rigore per dare forma all'audacia. La tua forza è come l'acciaio: piegala solo per renderla più letale ed efficace.",
        dark_eros: "Il tantra oscuro della morsa e della resistenza: la lussuria di Marte e Saturno congiunti è densa, controllata, feroce. È il piacere che si accumula nell'attesa, nella contenzione dell'orgasmo e nella tensione muscolare prolungata fino al limite della sopportazione. Cavalcare quest'ombra significa padroneggiare la carne senza alcuna paura del rigore o del dolore catartico: fa' dell'amplesso una prova d'iniziazione fisica dove il controllo sovrano culmina nella più devastante liberazione dell'energia vitale."
      },
      opposition: {
        title: "Marte Opposto a Saturno",
        subtitle: "L'Asse della Tensione tra Impeto e Freno Autoritario",
        function: "Polarità a 180° tra la spinta ad avanzare e le barriere imposte dall'esterno o da figure d'autorità. Si sperimenta spesso la sensazione di avere il piede contemporaneamente sull'acceleratore e sul freno.",
        manifestation: "Conflitti aspri con superiori o regole opprimenti, oscillazione tra ribellione impulsiva e resa rassegnata, tendenza ad accumulare risentimento.",
        shadow: "Cinismo disilluso, aggressività passiva vendicativa, paura di agire apertamente che porta a manovre sotterranee.",
        directive: "Non sfondare i muri a testate: osserva la struttura e trova i cardini della porta. La pazienza strategica è l'arma segreta con cui abbatterai ogni tiranno.",
        dark_eros: "Tensione erotica tra repressione ed esplosione carnale: il desiderio si infiamma nello scontro tra l'inibizione severa e la furia dell'istinto che pretende il suo spazio. Cavalca quest'ombra trasformando il contrasto in una dinamica eccitante di dominio e resa, dove la passione abbatte ogni gabbia imposta dalla censura morale."
      },
      square: {
        title: "Marte in Quadratura a Saturno",
        subtitle: "Il Crogiolo della Prova di Resistenza & Il Riscatto della Spada",
        function: "Attrito a 90° tra il desiderio di conquista immediata e il muro del ritardo e della frustrazione. È una delle configurazioni più potenti per temprare il carattere, purché non ci si arrenda.",
        manifestation: "Esperienze di severità precoce, ostacoli materiali ricorrenti che costringono a ricalibrare i piani, tenacia indomita acquisita sul campo.",
        shadow: "Rabbia sorda auto-distruttiva, sensazione di essere perseguitati dalla sfortuna, durezza eccessiva verso se stessi e verso gli altri.",
        directive: "Accetta la prova del fuoco e del ghiaccio: ogni stop imposto dalla vita è servito a perfezionare la tua maestria. Quando agirai, nessun potere potrà fermarti.",
        dark_eros: "Lussuria forgiata nella tensione: l'eros si risveglia nella lotta contro i blocchi fisici ed emotivi interiorizzati. Cavalcare quest'ombra significa rompere la morsa della colpa e della vergogna: reclama il piacere come tuo diritto inalienabile, trasformando la fatica passata nella più ardente e indomabile vitalità sensuale."
      },
      trine: {
        title: "Marte in Trigono a Saturno",
        subtitle: "Flusso di Precisione Infallibile & Forza Costruttiva",
        function: "Canale armonico a 120° tra audacia e prudenza. L'azione è metodica, potente e priva di esitazioni: ogni colpo va a segno con il minimo dispendio di forze.",
        manifestation: "Grande autorevolezza professionale, capacità di portare a termine imprese monumentali con calma serena, affidabilità granitica.",
        shadow: "Insofferenza verso chi si lamenta o non regge i ritmi di lavoro imposti, mancanza di compassione per la fragilità altrui.",
        directive: "Costruisci opere eterne: usa questa mirabile combinazione di fuoco e pietra per edificare santuari di verità e libertà per chi verrà dopo di te.",
        dark_eros: "Sensualità solida, potente e ritmata: il piacere è vissuto con vigore atletico e maestria tantrica, guidando l'amplesso verso un'unione profonda e rigenerante che ristora le energie vitali. Cavalca quest'ombra con dignità sovrana, celebrando la sacralità della resistenza carnale."
      },
      sextile: {
        title: "Marte in Sestile a Saturno",
        subtitle: "Alleanza Dinamica di Autodisciplina e Tempismo",
        function: "Sinergia a 60° che permette di conciliare l'entusiasmo dell'iniziativa con la necessaria cautela tattica.",
        manifestation: "Buona gestione dello stress, capacità di organizzare il lavoro con efficienza militare senza perdere la flessibilità, costanza premiata.",
        shadow: "Prudenza eccessiva che può far ritardare il momento della vittoria definitiva.",
        directive: "Fidati della tua preparazione: hai studiato il terreno e affilato le armi, ora avanza con passo sicuro verso la tua meta.",
        dark_eros: "Complicità carnale fondata sulla maestria del corpo: la seduzione è misurata, intensa e priva di fretta. Cavalca quest'ombra esplorando la gradualità del piacere e la profondità dei sensi con consapevolezza adamantina."
      },
      quincunx: {
        title: "Marte in Quinconce a Saturno",
        subtitle: "Ricalibrazione tra Sforzo Fisico e Limiti Strutturali",
        function: "Dissonanza a 150° tra l'urgenza di agire e il timore di non avere risorse sufficienti per completare l'opera. Esige un'accurata gestione delle energie.",
        manifestation: "Tendenza a strafare per poi cadere in stati di esaurimento psicofisico, oscillazione tra audacia e cautela paralizzante.",
        shadow: "Risentimento verso i propri limiti fisici, frustrazione per i ritardi burocratici o pratici.",
        directive: "Impara l'economia della forza: non sprecare energie preziose in battaglie secondarie. Conserva il tuo fuoco per le sfide che contano davvero.",
        dark_eros: "Desiderio carnale denso ma frenato da tensioni muscolari o timori inconsci: la lussuria chiede di essere sciolta attraverso la lentezza e il calore. Cavalca quest'ombra deponendo la rigidezza e lasciando che il corpo si abbandoni alla naturalezza del godimento."
      }
    },

    // ================= MARTE & URANO =================
    "Mars_Uranus": {
      name: "Marte & Urano",
      conjunction: {
        title: "Marte Congiunto a Urano (La Scarica Elettrica della Rivoluzione)",
        subtitle: "Audacia Folgorante, Rottura di Ogni Limite e Azione Geniale",
        function: "Fusione fulminante a 0° tra la carica guerriera (Marte) e l'elettricità sovversiva della trascendenza (Urano). L'azione è istantanea, originale, incurante del pericolo e capace di spezzare qualsiasi paralisi.",
        manifestation: "Riflessi fulminei, coraggio ribelle senza limiti, capacità di ribaltare situazioni disperate in una frazione di secondo con trovate geniali.",
        shadow: "Imprudenza suicida, impulsività ingestibile, intolleranza nevrotica a qualsiasi freno o consiglio di prudenza, rischio di incidenti per fretta cieca.",
        directive: "Sii il parafulmine della libertà e non una mina impazzita: governa la scarica elettrica con lucidità cosmica, colpendo solo per spezzare le gabbie dell'anima.",
        dark_eros: "L'orgasmo come esplosione atomica liberatoria: la lussuria di Marte e Urano congiunti è selvaggia, sperimentale, elettrizzante. È la pulsione che rifiuta qualsiasi tabù tradizionale e che gode nella rottura di ogni schema prestabilito: una fiammata cinetica che risveglia ogni fibra nervosa. Cavalcare quest'ombra significa osare l'inosabile nella sfera carnale, vivendo il piacere come una scossa tellurica sacra che manda in cortocircuito la mente ordinaria e spalanca l'estasi del corpo sovrano."
      },
      opposition: {
        title: "Marte Opposto a Urano",
        subtitle: "L'Asse del Conflitto Esplosivo & La Sfida della Ribellione Cieca",
        function: "Polarità a 180° tra l'azione personale e gli scossoni improvvisi provenienti dall'ambiente o dagli altri. Si vive una tensione nervosa costante che rischia di esplodere in rotture clamorose.",
        manifestation: "Incontri con persone provocatorie o imprevedibili, reazioni furiose a qualsiasi tentativo di controllo, brama febbrile di indipendenza.",
        shadow: "Distruzione vendicativa di relazioni e progetti per un puntiglio di libertà, ribellione infantile priva di scopo costruttivo.",
        directive: "Non farti teleguidare dalle provocazioni: chi perde il controllo cede il proprio potere. Sii l'occhio calmo al centro della tempesta elettrica.",
        dark_eros: "Tensione erotica al fulmicotone: l'eros si accende nell'imprevedibilità, nello scontro di volontà e nel brivido dell'avventura estrema. Cavalca quest'ombra godendo dell'eccitazione febbrile senza farti ferire dal dramma, facendo dell'amplesso una catarsi che libera ogni carica accumulata."
      },
      square: {
        title: "Marte in Quadratura a Urano",
        subtitle: "La Tensione al Voltaggio Massimo & La Forgia del Lampo",
        function: "Attrito a 90° tra la forza d'impatto fisica e l'impazienza rivoluzionaria. L'organismo sopporta un carico di tensione elettrica altissimo che richiede canali di sfogo creativi o sportivi.",
        manifestation: "Ribellione feroce contro qualsiasi autorità oppressiva, colpi di testa clamorosi, capacità di rompere schemi secolari con audacia sfacciata.",
        shadow: "Collera improvvisa e devastante, autolesionismo reattivo, tendenza a distruggere tutto quando le cose non vanno alla velocità desiderata.",
        directive: "Incapsula il fulmine nella spada: la vera rivoluzionaria sa quando attendere nell'ombra per colpire nel punto esatto che farà crollare l'intero sistema.",
        dark_eros: "Lussuria esplosiva e dissacrante: l'eros è alimentato dalla trasgressione pura, dalla velocità e dalla rottura di ogni limite fisico o morale. Cavalca quest'ombra liberando la tua carne dalle ipocrisie del perbenismo: il tuo desiderio è una forza elettrica primordiale che risveglia e incendia chiunque sia capace di sostenerne la carica."
      },
      trine: {
        title: "Marte in Trigono a Urano",
        subtitle: "Flusso di Genio Operativo & Audacia Infallibile",
        function: "Canale armonico a 120° in cui l'originalità e la decisione pratica si fondono spontaneamente. La persona trova vie d'uscita inedite a problemi ritenuti insolubili con facilità disarmante.",
        manifestation: "Carisma pionieristico, inventiva brillante, capacità di catalizzare il cambiamento sociale o lavorativo con entusiasmo contagioso.",
        shadow: "Superficialità verso i dettagli noiosi, disinteresse rapido per i progetti una volta superata la fase eccitante della novità.",
        directive: "Sii la pioniera del risveglio: usa la tua scintilla per aprire sentieri nel buio e mostrare al mondo che un'altra via è sempre possibile.",
        dark_eros: "Sensualità elettrizzante e aperta all'avanguardia: il piacere è una danza dinamica di continue scoperte carnali, vissuta con gioia disinibita e totale assenza di colpa. Cavalca quest'ombra sperimentando liberamente con il partner, facendo dell'intimità un gioco elettrico di pura libertà."
      },
      sextile: {
        title: "Marte in Sestile a Urano",
        subtitle: "Alleanza tra Prontezza di Riflessi e Visione Futura",
        function: "Sinergia a 60° che dona prontezza strategica, prontezza nel cogliere le opportunità tecnologiche e sociali e apertura alle novità.",
        manifestation: "Spirito di collaborazione con menti innovative, abilità nel risolvere emergenze con lucidità e freddezza, coraggio civile.",
        shadow: "Dispersione energetica se non si mantengono stabili gli obiettivi primari.",
        directive: "Sfrutta le correnti favorevoli: quando il vento del cambiamento soffia, alza le vele e guida la tua nave verso porti inesplorati.",
        dark_eros: "Complicità sensoriale stimolante e vivace: l'attrazione si accende attraverso l'originalità, le sorprese e la sperimentazione complice. Cavalca quest'ombra portando una ventata di aria fresca nella tua vita carnale."
      },
      quincunx: {
        title: "Marte in Quinconce a Urano",
        subtitle: "Ricalibrazione del Ritmo Nervoso & Scarica dell'Ansia",
        function: "Dissonanza a 150° tra l'impulso ad agire con impeto e gli scatti nervosi improvvisi che disorientano l'azione. Esige pratiche di radicamento a terra.",
        manifestation: "Irrequietezza motoria, insonnia legata a pensieri ossessivi di cambiamento, cambi repentini di umore o rotta.",
        shadow: "Autosabotaggio per noia improvvisa, rottura ingiustificata di collaborazioni fruttuose.",
        directive: "Metti le radici prima di scatenare la tempesta: connettiti alla terra per poter scaricare la tensione in eccesso senza bruciare i tuoi circuiti interiori.",
        dark_eros: "Desiderio intermittente e fulmineo: l'eccitazione richiede di essere canalizzata con cura per non consumarsi in un attimo di nervosismo. Cavalca quest'ombra prendendoti il tempo di respirare a fondo, trasformando l'ansia elettrica in piacere denso e liberatorio."
      }
    },

    // ================= SATURNO & LILITH =================
    "Saturn_Lilith": {
      name: "Saturno & Lilith",
      conjunction: {
        title: "Saturno Congiunto a Lilith (Il Patto della Pietra Nera)",
        subtitle: "Sovranità Adamantina sull'Ombra, Autorità Inviolabile e Fine della Sottomissione",
        function: "Fusione titanica a 0° tra il Signore del Tempo e della Legge (Saturno) e la Sovrana Primordiale della Notte Indomita (Lilith). L'anima acquisisce la padronanza assoluta sulla propria ombra: i tabù, le paure ancestrali e le leggi patriarcali vengono decodificati e dominati con autorità regale.",
        manifestation: "Presenza austera, magnetica e intimidatoria; rigetto biologico di qualsiasi obbedienza servile; saggezza antica e capacità di regnare sulla propria solitudine senza soffrirne.",
        shadow: "Cinisimo marmoreo, durezza spietata verso la vulnerabilità altrui, terrore di essere imprigionati che porta a erigere mura difensive impenetrabili.",
        directive: "Incarna l'autorità della sacerdotessa incoronata: non combattere la legge, diventa tu stessa la sorgente della tua legge sovrana. Siede sul tuo trono di ossidiana con orgoglio adamantino.",
        dark_eros: "Il culmine del dominio tantrico e dell'eros sacro: qui la lussuria non è debolezza della carne, ma la più alta forma di potere regale. È l'eccitazione che nasce dal controllo rigoroso che si spalanca sull'abisso primordiale, dove l'amplesso è una liturgia austera e sacrilega di iniziazione carnale. Cavalcare quest'ombra significa non vergognarsi mai della propria fame di potere e piacere: fa' della tua carne un tempio inviolabile dove solo chi si sottomette alla tua regalità interiore ha il privilegio di entrare."
      },
      opposition: {
        title: "Saturno Opposto a Lilith",
        subtitle: "L'Asse del Confronto con la Censura e la Morale Opprimente",
        function: "Tensione a 180° tra l'imperativo morale o sociale costituito e la fiamma selvatica che rifiuta qualsiasi compromesso. Si sperimenta spesso il giudizio, la condanna o l'emarginazione da parte di istituzioni o figure paterne.",
        manifestation: "Battaglie prolungate per la propria indipendenza, attrazione per persone severe che cercano di reprimere la propria natura istintiva, risveglio tardivo ma inarrestabile della sovranità.",
        shadow: "Autocensura feroce, senso di colpa paralizzante per i propri desideri più oscuri, paura di essere puniti per la propria libertà.",
        directive: "Spezza la lapide del giudizio patriarcale: la morale degli uomini non ha potere sulle leggi della natura primordiale. Cammina a testa alta fuori dal recinto.",
        dark_eros: "Tensione erotica tra il rigore del tabù e la vertigine della trasgressione carnale: la lussuria esplode con violenza catartica nel momento in cui ci si rifiuta di sottomettersi al ricatto morale. Cavalca quest'ombra godendo pienamente del tuo corpo selvaggio senza mai chiedere scusa al tiranno interiore."
      },
      square: {
        title: "Saturno in Quadratura a Lilith",
        subtitle: "La Forgia della Roccia Spezzata & Il Trionfo sul Senso di Colpa",
        function: "Attrito a 90° tra le restrizioni della realtà materiale e la furia dell'istinto represso. È il sigillo di chi ha dovuto pagare a caro prezzo ogni briciola di autonomia conquistata.",
        manifestation: "Punizioni o rifiuti precoci per aver manifestato la propria vera natura, solitudine forzata vissuta come prigionia prima di essere trasmutata in forza adamantina.",
        shadow: "Amarezza cronica, risentimento vendicativo contro la società, rigidezza difensiva che impedisce di godere delle gioie semplici.",
        directive: "Trascendi il martirio: Lilith non cerca compassione, cerca sovranità. Trasforma le cicatrici della tua repressione nell'armatura più splendente del tuo riscatto.",
        dark_eros: "Lussuria febbrile nata dalla ribellione al divieto assoluto: l'eccitazione è una rivincita carnale contro anni di mortificazione e pudore imposto. Cavalca quest'ombra strappando le bende della vergogna: la tua sessualità è un fuoco primordiale che riduce in cenere qualsiasi dogma moralistico."
      },
      trine: {
        title: "Saturno in Trigono a Lilith",
        subtitle: "Flusso di Maestria Oscura & Naturale Autorità Inviolabile",
        function: "Canale armonico a 120° tra disciplina e fiamma indomabile. La persona integra la propria natura ribelle con la capacità di costruire strutture stabili e durature.",
        manifestation: "Carisma rispettato anche dagli avversari, capacità di muoversi nell'ombra con totale padronanza delle regole per volgerle a proprio favore, indipendenza incrollabile.",
        shadow: "Distacco gelido verso chi è vittima delle convenzioni, cinismo aristocratico.",
        directive: "Sii maestra di liberazione: insegna agli altri che la vera emancipazione non è anarchia caotica, ma l'arte di fondare la propria vita su basi indistruttibili.",
        dark_eros: "Sensualità tantrica regale e solenne: il piacere si fonde con la maestria del corpo e del tempo, consentendo una gestione delle correnti erotiche che trasforma l'amplesso in un rito di longevità e rigenerazione sovrana. Cavalca quest'ombra celebrando il tuo potere carnale con calma incorruttibile."
      },
      sextile: {
        title: "Saturno in Sestile a Lilith",
        subtitle: "Alleanza Strategica tra Regole del Mondo e Istinto Indomito",
        function: "Sinergia a 60° che permette di utilizzare le strutture del mondo ordinario per proteggere e nutrire la propria sacra selvatichezza interiore.",
        manifestation: "Abilità diplomatica che dissimula la ferocia interiore, capacità di ottenere autonomia materiale senza attirare censure inutili.",
        shadow: "Tendenza a scendere a troppi compromessi formali rischiando di anestetizzare la fiamma viva.",
        directive: "Sii come la lupa travestita da regina: usa il protocollo per proteggere il tuo branco e il tuo santuario segreto.",
        dark_eros: "Complicità erotica discreta e adamantina: il piacere si consuma in spazi protetti e consacrati, lontano da sguardi indiscreti, con dedizione severa e intensissima. Cavalca quest'ombra creando la tua isola di libertà carnale inviolabile."
      },
      quincunx: {
        title: "Saturno in Quinconce a Lilith",
        subtitle: "Ricalibrazione dell'Ombra Istituzionale & Libertà Vigilata",
        function: "Dissonanza a 150° tra l'obbligo di conformarsi esteriormente per motivi di sicurezza e il ruggito interiore della Luna Nera che esige verità assoluta.",
        manifestation: "Sensazione ciclica di tradire se stesse per compiacere l'ambiente lavorativo o familiare, seguita da attacchi di ribellione feroce.",
        shadow: "Ipocrisia difensiva che logora l'anima, colite e somatizzazioni ossee o cutanee da stress morale.",
        directive: "Allinea la maschera al tuo vero volto: smetti di scusarti per la tua natura. Impara a dire i tuoi no con voce ferma e inequivocabile.",
        dark_eros: "Desiderio carnale viscerale trattenuto dal decoro sociale: la lussuria chiede di essere liberata dalle paure di biasimo. Cavalca quest'ombra lasciando emergere la tua natura selvatica nell'intimità più autentica, senza maschere né convenienze."
      }
    },

    // ================= URANO & LILITH =================
    "Uranus_Lilith": {
      name: "Urano & Lilith",
      conjunction: {
        title: "Urano Congiunto a Lilith (Il Fulmine Nero dell'Anarchia Sacra)",
        subtitle: "Ribellione Folgorante, Rottura Eretica di Ogni Catena e Libertà Radicale",
        function: "Fusione esplosiva a 0° tra il fulmine del risveglio cosmico (Urano) e la fiamma indomita della Luna Nera (Lilith). È l'aspetto della trasgressione pura e della liberazione da ogni condizionamento patriarcale, sociale o dogmatico.",
        manifestation: "Anticonformismo assoluto, magnetismo conturbante e rivoluzionario, allergia viscerale a qualsiasi forma di gabbia o etichetta, spirito d'avanguardia indomabile.",
        shadow: "Caos distruttivo fine a se stesso, alienazione rancorosa dal consorzio umano, tendenza a distruggere ponti fertili solo per il gusto di scandalizzare.",
        directive: "Sii la tempesta che spazza via il marciume ma fa respirare i germogli: non limitarti a distruggere le catene, inaugura nuovi cieli di libertà regale.",
        dark_eros: "L'orgasmo come scossa dissacrante di libertinaggio sacro: la lussuria di Urano e Lilith congiunti è anarchica, sperimentale, priva di qualsiasi limite convenzionale. È l'eccitazione febbrile che nasce dall'infrangere l'ultimo tabù, vivendo la sessualità come un atto di dissacrazione estatica e liberazione della Kundalini nera. Cavalcare quest'ombra significa rivendicare la totale sovranità sul proprio corpo: sperimenta senza confini morali, facendo del piacere una rivoluzione cosmica contro ogni perbenismo borghese."
      },
      opposition: {
        title: "Urano Opposto a Lilith",
        subtitle: "L'Asse della Tensione Eretica & Il Bivio dell'Emancipazione",
        function: "Polarità a 180° tra l'impulso ideologico di rinnovamento e la viscerale pulsione istintiva di rifiuto. Si attirano situazioni e persone che provocano continue rotture e disorientamenti.",
        manifestation: "Relazioni esplosive che nascono e muoiono come uragani, oscillazione tra distacco mentale gelido e fiammate passionali feroci.",
        shadow: "Incapacità di radicarsi in qualsiasi progetto duraturo per paura ossessiva di perdere l'autonomia.",
        directive: "Trova l'asse della tua sovranità: la vera libertà non è instabilità cronica, è la capacità di restare fedele a se stessa anche in mezzo al disordine del mondo.",
        dark_eros: "Tensione erotica magnetica a specchio: attrazione fatale per chi è portatore di rottura e scandalo. La lussuria si accende nel pericolo dell'imprevisto e nella sfida delle convenzioni carnali. Cavalca quest'ombra godendo dell'eccitazione elettrica dell'amplesso senza farti dilaniare dal terrore dell'impegno."
      },
      square: {
        title: "Urano in Quadratura a Lilith",
        subtitle: "Il Cortocircuito dell'Ombra & La Forgia della Trasgressione",
        function: "Attrito ad altissima tensione a 90° tra l'urgenza di rivoluzione e il rifiuto viscerale di compromesso. L'energia nervosa è vulcanica e pretende vie d'uscita originali.",
        manifestation: "Espulsioni repentine da comunità o contesti conservatori, scelte di vita controcorrente che sconvolgono l'ambiente d'origine, coraggio dissacrante.",
        shadow: "Iper-reattività paranoica, sabotaggio delle proprie alleanze per sfiducia preventiva, isolamento ostile.",
        directive: "Governa il tuo voltaggio: non bruciare la tua stessa casa per scaldarti. Canalizza la tua rabbia sacra in opere rivoluzionarie che durino nel tempo.",
        dark_eros: "Lussuria bruciante nata dalla collisione tra tabù infranto e shock psicologico: l'eros si alimenta dell'audacia e della provocazione carnale più radicale. Cavalca quest'ombra accogliendo i tuoi impulsi più estremi senza vergogna, trasformando l'eccitazione in una lama affilata di risveglio spirituale."
      },
      trine: {
        title: "Urano in Trigono a Lilith",
        subtitle: "Flusso di Genio Selvaggio & Libera Sovranità Magnetica",
        function: "Canale armonico a 120° tra intuizione futurista e istinto indomito. L'emancipazione avviene con naturalezza straordinaria e carisma magnetico irresistibile.",
        manifestation: "Capacità di vivere la propria unicità senza suscitare odio ma ammirazione, doti profetiche, originalità artistica e comunicativa folgorante.",
        shadow: "Disprezzo per chi resta imprigionato nelle convenzioni sociali ordinarie.",
        directive: "Sii faro dell'era nuova: mostra con la tua grazia disinvolta che è possibile vivere libere, sovrane e rispettate.",
        dark_eros: "Sensualità elettrizzante e visionaria: il piacere carnale scorre libero da sensi di colpa come un fiume di luce pura, aprendo le porte a esperienze estatiche e tantriche rivoluzionarie. Cavalca quest'ombra celebrando il tuo corpo come un tempio cosmico in continua espansione."
      },
      sextile: {
        title: "Urano in Sestile a Lilith",
        subtitle: "Alleanza Dinamica di Visione Eretica e Istinto Sveglio",
        function: "Sinergia a 60° che facilita la connessione con cerchie di affinità elettiva e la creazione di progetti all'avanguardia.",
        manifestation: "Prontezza nel cogliere le mutazioni culturali, abilità nel tessere reti di solidarietà anticonformista, mente brillante e curiosa.",
        shadow: "Tendenza a intellectualizzare la ribellione senza calarla pienamente nella carne viva.",
        directive: "Radica la tua visione: usa la tua intelligenza non convenzionale per costruire spazi fisici di libertà reale.",
        dark_eros: "Complicità sensoriale elettrizzante: la seduzione unisce l'ardire intellettuale alla curiosità carnale più audace. Cavalca quest'ombra esplorando fantasie insolite con spirito libero e mente aperta."
      },
      quincunx: {
        title: "Urano in Quinconce a Lilith",
        subtitle: "Ricalibrazione tra Visione Mentale e Bisogno Viscerale",
        function: "Dissonanza a 150° tra l'ideale teorico di libertà e le reali richieste viscerali del corpo e delle emozioni profonde.",
        manifestation: "Disconnessione occasionale tra ciò che si teorizza a parole e ciò che si tollera a livello carnale, ansia da prestazione ribelle.",
        shadow: "Fingere una disinvoltura che non si sente realmente, forzandosi a situazioni estreme solo per dimostrare indipendenza.",
        directive: "Sii onesta con le tue viscere: la vera emancipazione rispetta i tempi del tuo corpo e non deve obbedire a nessun copione ideologico prestabilito.",
        dark_eros: "Desiderio carnale discontinuo che richiede di accordare la mente eccitata con il ritmo somatico: la lussuria chiede sincerità totale. Cavalca quest'ombra ascoltando il tuo corpo prima di qualsiasi teoria mentale sul piacere."
      }
    },

    // ================= NETTUNO & LILITH =================
    "Neptune_Lilith": {
      name: "Nettuno & Lilith",
      conjunction: {
        title: "Nettuno Congiunto a Lilith (Il Vortice dell'Abisso Oceanico)",
        subtitle: "Seduzione Sciamanica Ipnotica, Magia Sessuale Dissolutiva e Risveglio delle Acque Primordiali",
        function: "Fusione magica a 0° tra l'oceano infinito dell'inconscio mistico (Nettuno) e la fiamma selvatica della Luna Nera (Lilith). È il regno della seduzione ipnotica, dei sogni profetici e della magia sessuale: i confini tra carne, spirito e magia naturale si dissolvono.",
        manifestation: "Fascino conturbante da sirena sciamanica, sensibilità medianica folgorante, capacità di ammaliare le anime attraverso il silenzio e lo sguardo, sogni lucidi ricorrenti.",
        shadow: "Vampirismo energetico subito o agito, perdersi in labirinti di dipendenza affettiva o sostanze per fuggire la realtà dura, fobie dell'invisibile.",
        directive: "Governa le tue maree oscure: la tua magia è potente solo se mantieni il timone della lucidità interiore. Non annegare nell'abisso che sei chiamata a governare.",
        dark_eros: "La liturgia dell'amplesso come varco dimensionale: la lussuria di Nettuno e Lilith è ipnotica, sciamanica, oceanica. È l'orgasmo come dissoluzione estatica dell'ego nelle acque nere primordiali, dove il coito è un rito di possessione sottile e magia erotica trasmutativa. Cavalcare quest'ombra significa non temere la vertigine dell'ignoto: abbandonati alla corrente sensuale come una creatura marina primordiale, facendo della tua carne il calice della grazia sacrilega e della rigenerazione assoluta."
      },
      opposition: {
        title: "Nettuno Opposto a Lilith",
        subtitle: "L'Asse del Canto della Sirena & La Sfida del Tradimento Illusorio",
        function: "Polarità a 180° tra l'idealismo romantico trascendente e l'istinto carnale crudo. Spesso si oscilla tra la santità asessuata e la colpa per la propria brama carnale.",
        manifestation: "Attrazione per partner ingannevoli o sfuggenti che incarnano l'illusione o la ferita ancestrale, proiezioni sacrificali pesanti.",
        shadow: "Cadere in trappole di seduzione tossica, sentirsi sporche dopo l'intimità a causa di residui di condizionamento religioso colpevolizzante.",
        directive: "Purifica le acque della tua psiche: la sensualità è sacra e non ha nulla di immondo. Lava via la polvere del dogma e guarda la tua bellezza nuda.",
        dark_eros: "Attrazione magnetica conturbante verso il proibito e il mistico: l'eros si alimenta della nebbia del desiderio non confessato e della resa ipnotica. Cavalca quest'ombra spogliando la tua voluttà da ogni senso di colpa o peccato, celebrando l'intimità come una comunione cosmica che risana le scissioni dell'anima."
      },
      square: {
        title: "Nettuno in Quadratura a Lilith",
        subtitle: "Il Velo di Maya Spezzato & La Purificazione delle Acque Ancestrali",
        function: "Attrito a 90° tra le illusioni spirituali e il richiamo bruciante della verità selvaggia. L'anima deve attraversare nebbie fitte di disillusione per ritrovare il proprio potere intatto.",
        manifestation: "Esperienze precoci di manipolazione psicologica o spirituale, tendenza a confondere la fuga dalla realtà con l'illuminazione, intuizioni brucianti.",
        shadow: "Autocommiserazione vittimistica, caduta in chimere esoteriche rassicuranti ma sterili, paranoia psichica.",
        directive: "Sii la sacerdotessa che squarcia il velo delle menzogne: impara a distinguere la vera magia naturale dalle illusioni dell'ego spirituale.",
        dark_eros: "Lussuria febbrile e trascinante che scardina ogni certezza: l'eccitazione si accende nel confine tra estasi mistica e possessione carnale. Cavalca quest'ombra ancorando la tua energia erotica alla presenza corporea vigile: non farti rapire dai fantasmi, vivi la tua passione nella pienezza dei sensi vivi."
      },
      trine: {
        title: "Nettuno in Trigono a Lilith",
        subtitle: "Flusso di Grazia Sciamanica & Magnetismo Naturale Infallibile",
        function: "Canale armonico a 120° in cui la sensibilità sottile e l'inviolabilità selvaggia cooperano armoniosamente. La persona naviga le dimensioni dell'inconscio con grazia felina.",
        manifestation: "Doti di guarigione psichica, magnetismo naturale che affascina senza sforzo, talento per la poesia ermetica, la musica e i rituali sacri della terra.",
        shadow: "Indolenza magica, tendenza a isolarsi nel proprio mondo dorato evitando i doveri materiali.",
        directive: "Diventa canale di redenzione per la notte: usa il tuo canto per lenire i cuori infranti e risvegliare le anime intorpidite dal sonno della ragione.",
        dark_eros: "Sensualità oceanica, fluida e senza confini: il piacere scorre come un'onda calda che avvolge gli amanti in uno stato di trance estatica e profonda guarigione sensoriale. Cavalca quest'ombra donandoti al mistero dell'amplesso con reverenza sacerdotale, celebrando l'unione tra le anime e i corpi."
      },
      sextile: {
        title: "Nettuno in Sestile a Lilith",
        subtitle: "Alleanza Dinamica di Empatia Sottile e Autonomia Fiera",
        function: "Sinergia a 60° tra immaginazione poetica e intuito tellurico. Permette di percepire i bisogni non detti altrui mantenendo intatta la propria sovranità.",
        manifestation: "Capacità di consigliare con saggezza sciamanica, sensibilità estetica raffinata, protezione spontanea contro le intrusioni psichiche negative.",
        shadow: "Tendenza a sfuggire i confronti aspri rifugiandosi nel silenzio evasivo.",
        directive: "Tessi la tela dei sogni lucidi: unisci la tua poesia alla tua fermezza interiore per manifestare bellezza incorruttibile nel tuo cerchio.",
        dark_eros: "Complicità sensoriale incantatrice: l'intimità si gioca su sfumature impercettibili, atmosfere suggestive e abbandono fiducioso al flusso dei sensi. Cavalca quest'ombra assaporando la magia del piacere condiviso con leggerezza sovrana."
      },
      quincunx: {
        title: "Nettuno in Quinconce a Lilith",
        subtitle: "Ricalibrazione tra Bisogno di Trascendenza e Realismo Carnale",
        function: "Dissonanza a 150° tra la brama di fusione cosmica totale e l'istinto di protezione del proprio spazio sacro. Esige un'ecologia psichica scrupolosa.",
        manifestation: "Stanchezza improvvisa in ambienti caotici o affollati, sensazione di confusione tra le proprie pulsioni e quelle assorbite dall'esterno.",
        shadow: "Fobia della contaminazione emotiva, oscillazione tra ritiro monastico e immersione caotica.",
        directive: "Purifica il tuo specchio interiore: ogni giorno lava via le scorie psichiche del mondo con bagni di sale e silenzio, ristabilendo la tua sacra inviolabilità.",
        dark_eros: "Desiderio carnale avvolto in un alone di mistero e timore: la lussuria chiede di essere liberata dalle paure di perdita d'identità. Cavalca quest'ombra accogliendo la dolcezza della resa senza temere di perdere la tua sovranità interiore."
      }
    },

    // ================= CHIRONE & LILITH =================
    "Chiron_Lilith": {
      name: "Chirone & Lilith",
      conjunction: {
        title: "Chirone Congiunto a Lilith (La Ferita Carnale dell'Esilio Trasmutata in Oro)",
        subtitle: "Iniziazione Sciamanica, Guarigione della Vergogna Primordiale e Sovranità sul Dolore",
        function: "Fusione a 0° tra il Guaritore Ferito (Chirone) e la Luna Nera Primordiale (Lilith). L'anima porta impressa nella carne la memoria ancestrale del rifiuto, della persecuzione o dell'emarginazione per aver incarnato la verità indomita: questa stessa ferita diventa la sorgente della più potente medicina iniziatica.",
        manifestation: "Capacità di comprendere e risanare istantaneamente il trauma carnale e morale altrui; magnetismo da guida sciamanica; rifiuto intransigente di ogni ipocrisia.",
        shadow: "Vittimismo rancoroso, identificazione ossessiva con il ruolo dell'emarginata o della capro espiatorio, sfiducia cronica nella possibilità di essere amata per ciò che si è.",
        directive: "Smetti di leccarti le ferite come una vittima: la tua cicatrice è la fessura sacra attraverso cui la luce del risveglio penetra nel mondo. Incoronati con il tuo stesso dolore trasmutato.",
        dark_eros: "L'eros sacro che sorge dalle ceneri della ferita: la lussuria di Chirone e Lilith congiunti è la catarsi carnale suprema. È il piacere che guarisce la memoria del rifiuto patriarcale e della colpa del corpo, trasformando la vulnerabilità esposta nel più potente afrodisiaco di liberazione. Cavalcare quest'ombra significa cavalcare la cicatrice con fierezza selvaggia: nel sesso non vi è più nulla da nascondere o di cui vergognarsi, ogni gemito è una consacrazione alla bellezza immortale della tua carne redenta."
      },
      opposition: {
        title: "Chirone Opposto a Lilith",
        subtitle: "L'Asse della Guarigione dei Reietti & La Sfida del Rifiuto Riflesso",
        function: "Polarità a 180° tra il proprio bisogno di sanare le ferite e l'incontro con partner o maestri che riaprono la piaga dell'abbandono o della censura.",
        manifestation: "Attrazione per figure sofferenti che cercano di domare la propria selvatichezza, oppure attrazione per persone che giudicano 'troppo intensa' la propria natura.",
        shadow: "Proiettare il carnefice sull'altro, farsi carico del dolore altrui sacrificando la propria sovranità, cinismo difensivo.",
        directive: "Sii la terapeuta di te stessa prima di curare il mondo: nessuno può bandirti dal tuo stesso tempio a meno che tu non deponga lo scettro.",
        dark_eros: "Tensione erotica tra il timore di mostrare la propria nudità emotiva e il bisogno disperato di una fusione carnale riparatrice. Cavalca quest'ombra offrendo il tuo desiderio autentico senza maschere, scoprendo nell'intimità più cruda il miracolo della guarigione reciproca."
      },
      square: {
        title: "Chirone in Quadratura a Lilith",
        subtitle: "Il Crogiolo del Riscatto Carnale & Lo Strappo del Giudizio",
        function: "Attrito lancinante a 90° tra il dolore dell'esclusione sociale o familiare e la fiamma interiore che rifiuta categoricamente di piegarsi per essere accettata.",
        manifestation: "Crisi precoci d'identità, sensazione di non avere un posto sicuro nel mondo degli uomini, coraggio feroce nato dal non avere più nulla da perdere.",
        shadow: "Autolesionismo psicologico o corporeo, ribellione disperata che danneggia la propria salute, rancore verso la società conformista.",
        directive: "Riconosci che il tuo esilio era la tua consacrazione: non sei nata per adattarti a una società malata, ma per mostrare la via della salute selvaggia.",
        dark_eros: "Lussuria bruciante nata dalla trasgressione del marchio d'infamia: l'eccitazione è un grido di riscatto sovrano contro chi ha tentato di far sentire sbagliato il tuo corpo. Cavalca quest'ombra celebrando la sensualità come il tuo più sacro atto di insubordinazione vitale."
      },
      trine: {
        title: "Chirone in Trigono a Lilith",
        subtitle: "Flusso di Medicina Tellurica & Saggezza Istintiva Risanatrice",
        function: "Canale armonico a 120° tra vulnerabilità e maestria dell'ombra. La comprensione del dolore diventa un dono spontaneo e privo di sofferenza attiva.",
        manifestation: "Capacità innata di consigliare e risvegliare chi soffre per il proprio corpo o per la propria sessualità, carisma compassionevole e autorevole.",
        shadow: "Tendenza a dare per scontata la propria guarigione, trascurando la manutenzione del proprio benessere emotivo.",
        directive: "Diffondi la tua medicina regale: crea cerchi di donne e anime libere in cui la verità possa essere detta senza paura di condanna.",
        dark_eros: "Eros terapeutico e rigeneratore: l'amplesso scorre come un balsamo sacro che dissolve ogni blocco psicologico, infondendo nel corpo un profondo senso di beatitudine e pace ritrovata. Cavalca quest'ombra vivendo il piacere come una medicina naturale di giovinezza e sovranità."
      },
      sextile: {
        title: "Chirone in Sestile a Lilith",
        subtitle: "Alleanza Dinamica tra Intuito Curativo e Rispetto dei Confini",
        function: "Sinergia a 60° che permette di utilizzare le lezioni apprese dalla sofferenza passata per costruire relazioni intime mature e protette.",
        manifestation: "Abilità nel negoziare spazi di libertà reciproca nei rapporti, discernimento infallibile verso le ferite non rimarginate altrui.",
        shadow: "Prudenza eccessiva nel riaprirsi all'amore dopo una delusione.",
        directive: "Apri le porte con cautela regale: meriti compagni di viaggio che sappiano onorare le tue cicatrici come medaglie di saggezza.",
        dark_eros: "Complicità sensoriale profonda e riparatrice: la seduzione si nutre di confidenze sincere e rispetto assoluto dei limiti del corpo, aprendo la via a un piacere intenso e liberato. Cavalca quest'ombra godendo della tenerezza che incontra la passione selvaggia."
      },
      quincunx: {
        title: "Chirone in Quinconce a Lilith",
        subtitle: "Ricalibrazione della Ferita d'Inadeguatezza & Auto-Accoglienza",
        function: "Dissonanza a 150° tra il desiderio di sentirsi intere e l'insorgere intermittente di antichi dubbi sulla propria dignità di essere amate.",
        manifestation: "Momenti di sconforto solitario non motivati da eventi esterni, timore improvviso che la propria intensità possa spaventare chi è vicino.",
        shadow: "Tendenza a nascondere i propri bisogni carnali per paura di essere giudicate perverse o pretenziose.",
        directive: "Abbraccia la tua bambina selvaggia: non deve più nascondersi nel bosco per non disturbare gli altri. C'è posto per tutta la tua verità alla mensa della vita.",
        dark_eros: "Desiderio carnale profondo frenato dal timore del rifiuto: la lussuria chiede di essere liberata dalle residue vergogne interiorizzate. Cavalca quest'ombra osando chiedere ciò che ti fa vibrare, scoprendo che la tua fame di piacere è la parte più pura e viva della tua anima."
      }
    },

    // ================= NODO NORD & LILITH =================
    "TrueNode_Lilith": {
      name: "Nodo Nord & Lilith",
      conjunction: {
        title: "Nodo Nord Congiunto a Lilith (Il Varco Karmico della Sovranità Assoluta)",
        subtitle: "Destino di Emancipazione Radicale, Chiamata Iniziatica e Riconquista del Trono",
        function: "Fusione karmica a 0° tra la direzione evolutiva dell'incarnazione (Nodo Nord) e la sorgente primordiale dell'ombra indomita (Lilith). La persona è nata con un mandato chiaro: spezzare le catene di sottomissione ereditate dalle vite passate e incarnare la sovranità senza padroni.",
        manifestation: "Incontri fatali con figure lilithiane, eventi sincronici che costringono a scegliere la libertà a discapito della sicurezza borghese, carisma da iniziatrice di una nuova stirpe.",
        shadow: "Terrore di abbandonare le vecchie abitudini compiacenti del Nodo Sud, tentazione di rimanere nella gabbia dorata per non affrontare l'ignoto dell'autonomia.",
        directive: "Varcare la soglia senza voltarti indietro: il tuo passato è cenere, il tuo futuro è il regno della tua anima incoronata. Cammina verso la tua ombra regale con fede assoluta.",
        dark_eros: "L'eros come portale di iniziazione predestinata: la lussuria di Nodo Nord e Lilith congiunti è la chiamata carnale del destino. È l'orgasmo che non è solo piacere momentaneo, ma un atto alchemico che riscrive la memoria cellulare e rompe i giuramenti di castità, sottomissione o vergogna stipulati nelle vite passate. Cavalcare quest'ombra significa accogliere il piacere proibito come la chiave segreta dell'evoluzione: attraverso la carne liberata, compi la consacrazione della tua anima alla libertà immortale."
      },
      opposition: {
        title: "Nodo Nord Opposto a Lilith (Lilith sul Nodo Sud)",
        subtitle: "Il Riscatto dell'Antica Sovrana & La Trasmutazione della Ribellione Solitaria",
        function: "Tensione a 180° tra le memorie ataviche di solitudine feroce, esilio o punizioni per aver osato essere libera (Lilith sul Nodo Sud) e la sfida di integrare questa maestria oscura in opere collaborative nel mondo presente.",
        manifestation: "Naturale confidenza con l'occulto e il tabù fin dall'infanzia, tendenza spontanea all'isolamento fiero, paura di fidarsi delle alleanze umane.",
        shadow: "Ostinazione nella solitudine rancorosa, rifiuto aprioristico di qualsiasi compromesso costruttivo, disprezzo per la società degli uomini.",
        directive: "Non rimanere prigioniera del tuo deserto di gloria passata: porta la saggezza della tua solitudine ancestrale dentro il mondo, costruendo ponti di potere per le tue sorelle.",
        dark_eros: "Memoria carnale antichissima di lussuria sovrana: il corpo ricorda l'arte dell'estasi sacra praticata nei templi dimenticati. Cavalca quest'ombra senza farti intrappolare dalla nostalgia o dalla diffidenza: dona la tua conoscenza erotica all'amante degno, facendo dell'amplesso un ponte tra i mondi."
      },
      square: {
        title: "Nodo Nord in Quadratura a Lilith",
        subtitle: "La Tensione al Crocevia Evolutivo & La Scelta della Sovranità",
        function: "Attrito a 90° in cui la chiamata evolutiva entra in collisione periodica con la rabbia ancestrale o con il timore di essere nuovamente emarginate per aver seguito la propria vocazione.",
        manifestation: "Bivi esistenziali ineludibili in cui bisogna scegliere tra l'approvazione del clan e la fedeltà a se stesse, rotture sincroniche che liberano il cammino.",
        shadow: "Auto-sabotaggio del proprio destino luminoso per fedeltà inconscia alle tragedie della stirpe materna, paura di essere troppo visibili.",
        directive: "Scegli te stessa a ogni bivio: il cosmo mette alla prova la tua determinazione per verificare se sei degna della corona che ti attende. Non esitare.",
        dark_eros: "Lussuria bruciante al crocevia del destino: l'eccitazione erotica si risveglia quando si ha il coraggio di rompere il patto con la mediocrità. Cavalca quest'ombra vivendo il sesso come una decisione sovrana che afferma la tua presenza viva e desiderante nel mondo."
      },
      trine: {
        title: "Nodo Nord in Trigono a Lilith",
        subtitle: "Flusso Armonico con il Destino Sovrano & Spontanea Emancipazione",
        function: "Canale di grazia a 120° tra destino evolutivo e potenza dell'ombra. La vita conduce naturalmente la persona verso situazioni e alleanze che favoriscono la sua piena fioritura selvaggia.",
        manifestation: "Incontri provvidenziali che accelerano il risveglio personale, carisma naturale che attira ammiratori della propria fierezza, facilità nel liberarsi da legami tossici.",
        shadow: "Tendenza ad attendere che il destino compia tutto da solo, senza compiere atti di coraggio attivo.",
        directive: "Asseconda la corrente regale del tuo destino: dispiega le tue ali nere e vola verso il tuo compimento, guidando altre anime verso la stessa libertà.",
        dark_eros: "Eros predestinato e trasmutativo: gli incontri carnali hanno il sapore di appuntamenti karmici ineludibili che sciolgono antichi nodi dell'anima con naturalezza estatica. Cavalca quest'ombra accogliendo l'amante inviato dal destino come uno specchio sacro di risveglio reciproco."
      },
      sextile: {
        title: "Nodo Nord in Sestile a Lilith",
        subtitle: "Alleanza Dinamica tra Opportunità di Vita e Istinto Sveglio",
        function: "Sinergia a 60° che offre costanti occasioni pratiche per affermare la propria indipendenza con intelligenza e tempismo.",
        manifestation: "Capacità di scegliere le battaglie giuste al momento giusto, abilità nel circondarsi di persone che rispettano la propria autonomia, fiuto evolutivo.",
        shadow: "Dispersione in troppe esperienze senza ancorare l'emancipazione a un'opera centrale.",
        directive: "Cogli le opportunità del destino: ogni porta che si apre è un invito a salire un gradino verso il tuo trono.",
        dark_eros: "Complicità erotica evolutiva: la seduzione è intelligente, magnetica e orientata alla crescita spirituale attraverso il piacere carnale. Cavalca quest'ombra esplorando la sacralità dei sensi con leggerezza e consapevolezza del tuo cammino."
      },
      quincunx: {
        title: "Nodo Nord in Quinconce a Lilith",
        subtitle: "Ricalibrazione tra Chiamata del Futuro e Retaggi dell'Ombra",
        function: "Dissonanza a 150° tra la direzione in cui la vita chiama ad avanzare e le vecchie paure dell'ombra che tentano di trattenere l'anima nel porto sicuro.",
        manifestation: "Esitazione periodica prima di grandi salti evolutivi, sensazione di dover sempre rinegoziare la propria libertà con se stesse.",
        shadow: "Perdersi in dubbi paralizzanti, cercare scuse per non compiere il passo decisivo verso l'autonomia.",
        directive: "Taglia il filo invisibile del dubbio: la tua destinazione è la sovranità, e ogni passo verso di essa è benedetto dalla forza della terra intera.",
        dark_eros: "Desiderio carnale misterioso che annuncia una svolta evolutiva: l'eccitazione erotica si accende quando si accetta di lasciarsi alle spalle le vecchie paure. Cavalca quest'ombra vivendo il piacere come l'atto sacro che ti proietta nel tuo futuro sovrano."
      }
    }
  };

  const ARCHETYPE_CORE = {

    Sun: { it: 'Sole', role: 'la Volontà Sovrana e il Nucleo di Coscienza Regale', shadow: "dell'orgoglio cieco o dell'autocelebrazione narcisistica", light: "la luce incorruttibile del Sé autentico che non ha bisogno di compiacere" },

    Moon: { it: 'Luna', role: "l'Intelligenza Somatica, l'Inconscio e la Memoria Primordiale", shadow: 'della regressione difensiva, della paura viscerale o della dipendenza simbiotica', light: "la saggezza accogliente dell'intuito e l'inviolabilità del corpo sacro" },

    Mercury: { it: 'Mercurio', role: 'il Logos Iniziatore, la Parola Tagliente e la Decodifica dei Segreti', shadow: 'del cinismo calcolatore, della menzogna tattica o della dispersione nevrotica', light: 'la lucidità adamantina che nomina la verità e scioglie le illusioni' },

    Venus: { it: 'Venere', role: 'il Santuario del Valore Sovrano, la Bellezza Incondizionata e il Piacere Sacro', shadow: 'della compiacenza seduttiva, della svendita del proprio valore o della vanità esteriore', light: 'la sovranità estetica e relazionale che attira solo ciò che è degno del proprio altare' },

    Mars: { it: 'Marte', role: "la Spada dell'Azione, l'Assertività Guerriera e la Difesa dei Confini Inviolabili", shadow: "della rabbia distruttiva, della fretta impulsiva o dell'aggressione reattiva", light: 'il coraggio fiammeggiante che abbatte le gabbie e difende il santuario interiore' },

    Jupiter: { it: 'Giove', role: "la Grande Visione Iniziatica, l'Espansione Filosofica e la Fede nel Destino", shadow: "della dismisura dogmatica, dell'ingenuità cieca o della superbia spirituale", light: 'la saggezza magnanima che apre varchi nel cosmo e ispira le anime' },

    Saturn: { it: 'Saturno', role: 'il Signore della Soglia, il Realismo Adamantino e la Maestria del Tempo', shadow: "della rigidità pietrificante, del cinismo paralizzante o della colpa ancestrale", light: "la spina dorsale incorruttibile che forgia il diamante dell'anima nella disciplina" },

    Uranus: { it: 'Urano', role: 'il Fulmine Prometeico, la Libertà Assoluta e la Demolizione dei Dogmi', shadow: "della ribellione fine a se stessa, del distacco anaffettivo o dell'instabilità caotica", light: "il genio rivoluzionario che smantella l'illusione per consacrare lo spazio alla verità" },

    Neptune: { it: 'Nettuno', role: "la Mistica dell'Infinito, la Dissoluzione dei Veli e la Trascendenza Estatica", shadow: "della fuga illusoria, del vittimismo masochista o delle nebbie dell'autoinganno", light: "l'oceano della compassione pura e l'accesso diretto ai misteri invisibili dell'Anima Mundi" },

    Pluto: { it: 'Plutone', role: 'il Fuoco Sotterraneo degli Inferi, la Morte e Rinascita e il Potere Occulto', shadow: "dell'ossessione di controllo, della sete di vendetta o del terrore del tradimento", light: 'la potenza alchemica indistruttibile che rinasce sovrana da qualsiasi cenere' },

    Lilith: { it: 'Lilith', role: 'la Fiamma Indomita Primordiale, il Rifiuto Sacro di Ogni Sottomissione e la Purezza Istintuale', shadow: "dell'esilio rancoroso, dell'isolamento distruttivo o della guerra preventiva", light: "la regalità incoronata nella notte che siede sul proprio trono senza chiedere perdono per la propria intensità" },

    Chiron: { it: 'Chirone', role: "il Guaritore Iniziato, la Ferita Sacra e la Medicina dell'Anima", shadow: "della trappola del dolore cronico o della delega sacrificale", light: "la saggezza sciamanica che trasforma la cicatrice nella più alta arte medica" },

    TrueNode: { it: 'Nodo Nord', role: "la Bussola Magnetica del Destino Evolutivo e il Richiamo della Grande Opera", shadow: "della fuga regressiva nel già noto e nella comodità arcaica", light: "il salto quantico dell'anima verso la piena realizzazione della sua missione terrena" },

    Ceres: { it: 'Cerere', role: "il Nutrimento Sacro, il Ciclo delle Stagioni e la Cura Rigeneratrice", shadow: "del ricatto affettivo o del lutto non integrato", light: "la capacità inesauribile di nutrire l'anima anche attraverso il rigido inverno" },

    Pallas: { it: 'Pallade', role: "la Saggezza Strategica, la Giustizia Incorruttibile e la Visione a Raggi X", shadow: "del cinismo calcolatore o della repressione della grazia", light: "la vittoria ottenuta con l'intelligenza suprema e la giustizia del cuore" },

    Juno: { it: 'Giunone', role: "il Patto Sacro tra Sovrani, l'Alleanza Paritaria e la Lealtà Elettiva", shadow: "del risentimento per il patto tradito o della gelosia divorante", light: "l'unione indistruttibile fondata sull'onore e sul rispetto mutuo" },

    Vesta: { it: 'Vesta', role: "la Fiamma Interiore Inestinguibile, la Devozione Monastica e il Fuoco del Tempio", shadow: "dell'isolamento fanatico o del sacrificio sterile", light: "la concentrazione purissima che compie miracoli attraverso la dedizione assoluta" },

    ParsFortunae: { it: 'Punto di Fortuna', role: "l'Armonia Cosmica tra Corpo, Mente e Anima e il Flusso della Grazia", shadow: "della passività inerte in attesa di miracoli esterni", light: "la sincronicità perfetta che si spalanca quando si è perfettamente allineati al proprio Sé" },

    Vertex: { it: 'Vertex', role: "il Cancello del Destino, gli Incontri Predestinati e i Salti Quantici Karmici", shadow: "della resistenza ostinata ai punti di svolta evolutivi", light: "il varco sacro attraverso cui compagni di destino mutano il corso della storia personale" }

  };

  window.getLilithAspectInterpretation = function(p1Raw, p2Raw, aspectRaw) {
    const k1 = NAME_MAP_TO_KEY[p1Raw] || p1Raw;
    const k2 = NAME_MAP_TO_KEY[p2Raw] || p2Raw;
    const it1 = NAME_MAP_TO_IT[k1] || p1Raw;
    const it2 = NAME_MAP_TO_IT[k2] || p2Raw;
    const aspKey = (aspectRaw || '').toLowerCase();
    const aspIt = ASPECT_IT[aspKey] || aspectRaw;

    const pairKey1 = `${k1}_${k2}`;
    const pairKey2 = `${k2}_${k1}`;

    const bespoke = (PAIR_INTERPRETATIONS[pairKey1] && PAIR_INTERPRETATIONS[pairKey1][aspKey]) ||
                    (PAIR_INTERPRETATIONS[pairKey2] && PAIR_INTERPRETATIONS[pairKey2][aspKey]);

    if (bespoke) {
      return bespoke;
    }

    const arch1 = ARCHETYPE_CORE[k1] || { it: it1, role: `la funzione fondamentale di ${it1}`, shadow: "dello squilibrio energetico", light: `la maestria di ${it1}` };
    const arch2 = ARCHETYPE_CORE[k2] || { it: it2, role: `il principio operativo di ${it2}`, shadow: "della mancata integrazione", light: `la saggezza di ${it2}` };

    const erosMap1 = ARCHETYPE_EROS_MAP[k1] || {
      title: `il Potere di ${it1}`,
      drive: `l'impulso primordiale di ${it1}`,
      lust: `la pulsione carnale di ${it1}`,
      shadow: `dello squilibrio di ${it1}`,
      transmute: `onorando la sacralità di ${it1}`
    };
    const erosMap2 = ARCHETYPE_EROS_MAP[k2] || {
      title: `il Potere di ${it2}`,
      drive: `l'impulso primordiale di ${it2}`,
      lust: `la pulsione carnale di ${it2}`,
      shadow: `dello squilibrio di ${it2}`,
      transmute: `onorando la sacralità di ${it2}`
    };

    const isLilithInvolved = (k1 === 'Lilith' || k2 === 'Lilith');

    let title = `${it1} in ${aspIt} con ${it2}`;
    let subtitle = "";
    let dyn = "";
    let manifest = "";
    let shadow = "";
    let directive = "";
    let darkEros = "";

    switch (aspKey) {
      case 'conjunction':
        subtitle = "Fusione Alchemica a 0° & Unione Operativa Indivisibile";
        dyn = `Fusione assoluta a 0° tra ${arch1.role} e ${arch2.role}. In questo tema natale le due forze operano come un solo raggio d'azione concentrato, azzerando qualsiasi separazione tra l'impulso iniziale e la risposta profonda.`;
        manifest = `Nella vita pratica, ogni attivazione di ${it1} accende all'unisono il canale di ${it2}. Questa densità genera un magnetismo formidabile e una lucidità di intenti che non tollera dispersioni periferiche.`;
        shadow = `Rischio di cortocircuito o iper-identificazione: se la forza congiunta scivola nella trappola ${arch1.shadow} o ${arch2.shadow}, la personalità può diventare inflessibile o cieca alle sfumature.`;
        directive = isLilithInvolved
          ? `Consacra questa fusione alla tua sovranità inalienabile: la Luna Nera non si fonde per perdersi, ma per incoronare la tua luce con la fiamma dell'inviolabile Sé.`
          : `Canalizza questa immensa carica verso un'opera regale: quando due archetipi si uniscono nel tuo tempio interiore, hai il potere di manifestare ciò che altri ritengono impossibile.`;
        darkEros = `Fusione alchemica indivisibile a 0° tra ${erosMap1.title} e ${erosMap2.title}: la lussuria fonde ${erosMap1.drive} con ${erosMap2.drive} in un solo fuoco vulcanico. Nella geometria della congiunzione non vi è separazione tra stimolo e risposta carnale: l'energia sessuale opera come un raggio laser concentrato. Cavalcare quest'ombra richiede di superare il rischio ${erosMap1.shadow} e ${erosMap2.shadow}, ${erosMap1.transmute} e facendo dell'amplesso un varco di risveglio della Kundalini sovrana.`;
        break;

      case 'opposition':
        subtitle = "Asse di Polarità a 180° & Specchio Iniziatico di Potere";
        dyn = `Le due divinità celesti si guardano a 180° attraverso la ruota zodiacale. Si manifesta una tensione a specchio tra ${arch1.role} e ${arch2.role}, esigendo un'integrazione cosciente che non sacrifichi nessun polo.`;
        manifest = `Questo aspetto opera sovente attraverso le relazioni e i bivi esistenziali: si sperimenta una delle due forze in prima persona proiettando l'altra sugli altri, attirando partner o avversari che fungono da maestri impietosi delle proprie parti celate.`;
        shadow = `Oscillazione estenuante tra gli estremi, senso di scissione tra dovere e desiderio, cadendo nel vicolo cieco ${arch1.shadow} in alternanza a quello ${arch2.shadow}.`;
        directive = isLilithInvolved
          ? `Non cedere al ricatto dell'esilio o della sottomissione: la vera sacerdotessa sa abitare l'asse della tensione mantenendo saldo il proprio trono al centro di entrambe le forze.`
          : `Sii l'asse immobile attorno a cui danza la polarità cosmica: integra ${it1} e ${it2} come le due ali con cui la tua anima spicca il volo verso la libertà.`;
        darkEros = `Asse di polarità a 180° tra ${erosMap1.title} e ${erosMap2.title}: l'eros si accende nella tensione magnetica a specchio tra opposti complementari. Il desiderio arde nella distanza che separa ${erosMap1.drive} da ${erosMap2.drive}, trasformando l'incontro carnale in un duello estatico di seduzione e sovranità reciproca. Cavalcare quest'ombra significa non fuggire la tensione né usarla per dominare l'altro: cavalca la tempesta della polarità, trasmutando la sfida intima in una consacrazione di potere condiviso.`;
        break;

      case 'trine':
        subtitle = "Flusso Sovrano a 120° & Armonia Naturale degli Elementi";
        dyn = `Canale di grazia naturale a 120° tra segni della medesima matrice elementale. ${arch1.role} coopera in modo splendido e spontaneo con ${arch2.role}, costituendo un talento ereditario adamantino.`;
        manifest = `Le risorse fluiscono con facilità, le decisioni complesse si sciolgono con grazia e la personalità manifesta ${arch1.light} arricchita dalla profondità di ${arch2.light}, suscitando rispetto e naturale attrazione.`;
        shadow = `Tendenza ad adagiarsi sulla comodità del talento innato, evitando le prove del fuoco che forgiano la vera maestria iniziatica.`;
        directive = `Fai fruttare questo dono sacro: non accontentarti di vivere nella facilità della grazia, usa questo flusso per aprire vie maestre per il Cerchio e per chi ti segue.`;
        darkEros = `Flusso naturale e armonico a 120° tra ${erosMap1.title} e ${erosMap2.title}: la sensualità scorre con la grazia innata degli elementi affini, unendo ${erosMap1.lust} con ${erosMap2.lust} senza la minima dispersione o senso di colpa. È il piacere che rigenera la linfa vitale e scioglie le tensioni corporee con magnetica dolcezza. Cavalcare quest'ombra significa godere della propria natura sensuale con totale generosità sovrana, facendo dell'intimità una sorgente inesauribile di bellezza ed estasi.`;
        break;

      case 'square':
        subtitle = "Attrito Iniziativo a 90° & Forgia di Risveglio Trasmutativo";
        dyn = `Attrito sacro a 90°: ${arch1.role} e ${arch2.role} si fronteggiano in un angolo retto di fuoco e rottura. Nessuna delle due forze cede all'altra, costringendo l'anima ad abbandonare ogni mediocrità.`;
        manifest = `La vita presenta bivi inevitabili e crisi periodiche che mettono con le spalle al muro. È l'aspetto dei grandi destini: la persona è costretta ad auto-crearsi superando le lacerazioni interiori.`;
        shadow = `Frustrazione corrosiva, paranoia difensiva, rischio di sabotare i propri successi scivolando ${arch1.shadow} o scontrandosi con ${arch2.shadow}.`;
        directive = isLilithInvolved
          ? `Accetta il crogiolo della trasformazione: Lilith usa la quadratura per bruciare via ogni maschera di compiacenza patriarcale. Dalle ceneri del tuo vecchio io sorge la regina incoronata.`
          : `Vedi nella tensione la forgia del tuo diamante: il ferro arrugginisce se lasciato in pace, ma la spada sotto il martello diventa incorruttibile. Governa il tuo fuoco interiore.`;
        darkEros = `Attrito dinamico a 90° tra ${erosMap1.title} e ${erosMap2.title}: l'eccitazione erotica scaturisce dalla collisione ad alta pressione tra ${erosMap1.drive} e ${erosMap2.drive}. Nella quadratura la lussuria non è mai accomodante né tiepida: è la rottura catartica del tabù che accende il piacere attraverso il superamento del divieto e della paura. Cavalcare quest'ombra significa non reprimere la furia del proprio desiderio: usa questa tensione bruciante per distruggere ogni residuo di pudore borghese e incoronare la tua carne libera.`;
        break;

      case 'sextile':
        subtitle = "Alleanza Dinamica a 60° & Opportunità Costruttiva";
        dyn = `Ponte collaborativo a 60° tra elementi affini. Si crea un'intelligente sinergia operativa tra ${arch1.role} e ${arch2.role}, stimolando creatività, discernimento e diplomazia regale.`;
        manifest = `Facilità nell'apprendimento, abilità nel tessere alleanze strategiche feconde e prontezza nel cogliere le opportunità evolutive prima degli altri.`;
        shadow = `Dispersione del potenziale se ci si limita a buone intenzioni senza concretizzare l'alleanza in opere tangibili.`;
        directive = `Attiva coscientemente questo ponte cosmico: quando decidi di allineare ${it1} e ${it2}, il cosmo si piega per fornirti gli strumenti necessari al trionfo.`;
        darkEros = `Alleanza stimolante a 60° tra ${erosMap1.title} e ${erosMap2.title}: l'eros si alimenta della complicità intelligente, dell'affinità tattica e della seduzione che unisce ${erosMap1.drive} all'opportunità offerta da ${erosMap2.drive}. Cavalcare quest'ombra significa esplorare i sentieri del piacere con curiosità audace e mente vigile, scoprendo nella confidenza erotica una via d'emancipazione profonda e priva di colpa.`;
        break;

      case 'quincunx':
      default:
        subtitle = "Riconfigurazione Sottile a 150° & Alchimia dell'Ombra";
        dyn = `Sfida di riallineamento a 150° tra due piani di frequenza differenti. Richiede una raffinata operazione di alchimia psichica per fare dialogare ${arch1.role} con ${arch2.role}.`;
        manifest = `Sensazione intermittente che qualcosa necessiti di una regolazione sottile, con momenti di stanchezza o dubbi passeggeri che fungono da campanelli d'allarme per la propria ecologia interiore.`;
        shadow = `Perfezionismo ansioso, senso cronico di inadeguatezza o tendenza a somatizzare lo sforzo di tenere insieme forze apparentemente estranee.`;
        directive = `Ascolta i sussurri del corpo e dell'inconscio: non forzare l'unione con la violenza della mente, accorda le due corde con la delicatezza di un'arpista sacra.`;
        darkEros = `Alchimia sottile a 150° tra ${erosMap1.title} e ${erosMap2.title}: dissonanza intima tra frequenze apparentemente estranee che esige una raffinata trasmutazione carnale. Il desiderio si muove nell'ombra tra ${erosMap1.drive} e ${erosMap2.drive}, richiedendo che il corpo sciolga antiche inibizioni prima di lasciarsi andare all'estasi. Cavalcare quest'ombra significa accogliere la natura complessa e atipica dei propri desideri, facendo della metamorfosi intima la chiave per accedere a vette inesplorate di piacere.`;
        break;
    }

    return {
      title: title,
      subtitle: subtitle,
      function: dyn,
      manifestation: manifest,
      shadow: shadow,
      directive: directive,
      dark_eros: darkEros
    };
  };

})(typeof window !== 'undefined' ? window : global);
