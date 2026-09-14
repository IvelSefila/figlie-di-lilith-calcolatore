/**
 * Figlie di Lilith - Motore Astrologico (strato interpretativo)
 *
 * Le posizioni dei corpi celesti, le cuspidi e la distinzione diurno/notturno
 * arrivano esclusivamente da Swiss Ephemeris 2.10.03 (js/swiss-precision.mjs,
 * ponte in js/calcolatore-swiss.mjs). Questo file NON contiene né deve mai
 * contenere calcoli astronomici propri o approssimati: si occupa di segni,
 * case, dignità, aspetti con orbi differenziati, dominanti e delle letture
 * interpretative (Operativa a 7 punti, Lilithiana, Karma & Destino, Unificata).
 */

(function(window) {
  'use strict';

  const LILITH_ASTRO_DICT = {"PLANETS": {"Sun": {"title": "Costruire l'Identità", "function": "Principio di individuazione, volontà centrale e nucleo dell'identità cosciente.", "manifestation": "Si manifesta come la spinta a diventare 'qualcuno', a prendere decisioni autonome e a irradiare la propria essenza.", "shadow": "Ego ipertrofico, bisogno eccessivo di riconoscimento, tirannia, cecità verso i bisogni altrui.", "constructive": "Leadership naturale, chiarezza di intenti, capacità di 'stare al centro' senza schiacciare gli altri.", "context": "Situazioni in cui è richiesta leadership, autonomia decisionale, visibilità pubblica o creatività personale.", "errors": "Confondere l'essere (Sole) con il fare (Marte) o con l'apparire (Ascendente).", "directive": "Agisci come il Re/Regina del tuo regno interiore: governa con benevolenza ma con ferma autorità."}, "Moon": {"title": "Gestire i Bisogni Emotivi", "function": "Principio reattivo, memoria emotiva, adattamento biologico e senso di sicurezza.", "manifestation": "Si attiva automaticamente per proteggere la vita e la sicurezza emotivo-biologica, cercando nutrimento, appartenenza e stabilità interiore.", "shadow": "Regressione infantile, dipendenza, capricci, manipolazione emotiva, incapacità di uscire dalla zona di comfort.", "constructive": "Capacità di nutrire se stessi e gli altri, empatia profonda, intuito protettivo, adattabilità resiliente.", "context": "Vita domestica, relazioni intime, momenti di crisi, situazioni che toccano la vulnerabilità.", "errors": "Pensare che la Luna sia 'debolezza' invece che la base biologica necessaria per qualsiasi azione solare.", "directive": "Ascolta il bisogno sottostante all'emozione, ma non lasciare che l'urgenza reattiva detti la strategia a lungo termine."}, "Mercury": {"title": "Elaborare e Connettere", "function": "Principio di connessione logica, analisi discriminativa, scambio di informazioni e mediazione.", "manifestation": "Opera attraverso il linguaggio, il pensiero analitico, la curiosità e la capacità di notare pattern e dettagli.", "shadow": "Frammentazione mentale, astuzia sterile, menzogna, instabilità nervosa, verbalismo vuoto.", "constructive": "Chiarezza comunicativa, agilità mentale, capacità di negoziazione e traduzione di concetti complessi.", "context": "Comunicazione, commercio, studio, risoluzione di problemi logici, interazioni sociali veloci.", "errors": "Pensare che capire una cosa (Mercurio) significhi averla realizzata (Saturno) o integrata (Giove).", "directive": "Usa la mente come uno strumento di precisione, non come un generatore di rumore di fondo."}, "Venus": {"title": "Valutare e Armonizzare", "function": "Principio di attrazione, valutazione del valore, ricerca di armonia e relazione.", "manifestation": "Si esprime nelle scelte estetiche, nel modo di amare, nella gestione delle risorse e nella ricerca del piacere.", "shadow": "Vanità, superficialità, indolenza, dipendenza dal giudizio altrui, evitamento del conflitto necessario.", "constructive": "Diplomazia, capacità di creare bellezza, intelligenza relazionale, sana autostima e valorizzazione.", "context": "Relazioni affettive, gestione del denaro, scelte estetiche, situazioni che richiedono compromesso.", "errors": "Ridurre Venere solo all'amore romantico; è prima di tutto la capacità di dare valore alle cose.", "directive": "Chiediti sempre: 'Che valore ha questo per me?' prima di impegnare le tue risorse."}, "Mars": {"title": "Affermare e Difendere", "function": "Principio cinetico, spinta all'azione, difesa del confine e affermazione della volontà.", "manifestation": "È il motore che permette di iniziare le cose, superare ostacoli, dire di no e conquistare obiettivi.", "shadow": "Aggressività distruttiva, violenza, impazienza, dispersione energetica, incapacità di fermarsi.", "constructive": "Coraggio, iniziativa, capacità di tagliare i rami secchi, protezione efficace di sé e degli altri.", "context": "Conflitti, competizione, inizio di nuovi progetti, situazioni di emergenza, sport e sessualità.", "errors": "Reprimere Marte porta all'implosione o alla malattia; va canalizzato, non soffocato.", "directive": "Usa la tua forza per costruire o difendere, mai solo per reagire ciecamente."}, "Jupiter": {"title": "Espandere e Integrare", "function": "Principio di espansione, sintesi, fiducia sistemica e ricerca di significato.", "manifestation": "Spinge a crescere, a esplorare nuovi orizzonti, a dare fiducia alla vita e a cercare connessioni più ampie.", "shadow": "Eccesso, dogmatismo, fanatismo, ingenuità pericolosa, inflazione dell'ego ('God complex').", "constructive": "Ottimismo realistico, visione d'insieme, generosità, capacità di insegnare e guidare.", "context": "Crescita personale, studi superiori, viaggi, questioni legali/etiche, progetti a lungo termine.", "errors": "Credere che 'di più' sia sempre 'meglio'. Giove senza Saturno è solo vapore.", "directive": "Espanditi dove hai già costruito una struttura solida, altrimenti rischi di disperderti."}, "Saturn": {"title": "Strutturare e Realizzare", "function": "Principio di realtà, limite, tempo, struttura e concretizzazione.", "manifestation": "Si manifesta attraverso la disciplina, il senso del dovere, la capacità di sopportare la frustrazione per un obiettivo.", "shadow": "Rigidità, cinismo, depressione, paura del fallimento, aridità emotiva, controllo ossessivo.", "constructive": "Maestria, autorevolezza, integrità, capacità di costruire opere durature, saggezza.", "context": "Carriera, responsabilità, gestione del tempo, scadenze, prove di maturità, vecchiaia.", "errors": "Vedere Saturno come un nemico; è l'unico pianeta che garantisce che i risultati durino nel tempo.", "directive": "Accetta il limite come un confine necessario per dare forma alla tua opera."}, "Uranus": {"title": "Innovare e Risvegliare", "function": "Principio di individuazione improvvisa, rottura degli schemi obsoleti e visione futuristica.", "manifestation": "Agisce come un fulmine che rompe la stasi, portando idee radicali, ribellione e cambiamenti improvvisi.", "shadow": "Disgregazione fine a se stessa, fanatismo utopico, incapacità di legarsi, alienazione, shock.", "constructive": "Genialità, libertà interiore, capacità di vedere alternative dove altri vedono vicoli ciechi.", "context": "Situazioni bloccate, tecnologia, gruppi e collettivi, momenti di svolta radicale.", "errors": "Confondere la ribellione adolescenziale con la vera libertà uraniana (che è liberazione DALLO schema).", "directive": "Sii fedele alla tua verità unica, anche se questo significa disattendere le aspettative convenzionali."}, "Neptune": {"title": "Trascendere e Immaginare", "function": "Principio di dissoluzione dei confini, immaginazione, spiritualità e connessione universale.", "manifestation": "Si esprime nei sogni, nell'arte, nell'empatia totale, nell'intuizione mistica e nella fusione con il tutto.", "shadow": "Fuga dalla realtà, dipendenze, illusioni, vittimismo, confusione identitaria, inganno.", "constructive": "Compassione attiva, ispirazione artistica elevata, spiritualità autentica, servizio disinteressato.", "context": "Arte, spiritualità, aiuto agli altri, momenti di confusione o perdita di riferimenti.", "errors": "Cercare Nettuno nella materia (dipendenze) invece che nello spirito o nell'arte.", "directive": "Arrenditi a ciò che è più grande di te, ma mantieni i piedi ben piantati a terra."}, "Pluto": {"title": "Trasformare e Rigenerare", "function": "Principio di morte e rinascita, potere nucleare, verità viscerale e trasformazione profonda.", "manifestation": "Emerge nelle crisi, nelle ossessioni, nelle lotte di potere e nei processi di eliminazione del superfluo.", "shadow": "Manipolazione, crudeltà, compulsione, brama di potere, autodistruzione, paranoia.", "constructive": "Capacità rigenerativa totale, autenticità radicale, potere psicologico, coraggio di affrontare l'ombra.", "context": "Crisi profonde, lutti, sessualità intensa, gestione di grandi capitali o potere, psicoterapia.", "errors": "Pensare di poter 'controllare' Plutone. Si può solo decidere come attraversare la trasformazione.", "directive": "Lascia morire ciò che non serve più, per permettere alla nuova forma di emergere."}, "Chiron": {"title": "Integrare la Ferita", "function": "Il 'Guaritore Ferito', punto di massima vulnerabilità che diventa chiave di saggezza.", "manifestation": "Si manifesta dove ci sentiamo inadeguati o feriti, e dove paradossalmente possiamo aiutare gli altri.", "shadow": "Vittimismo cronico, identificazione con la malattia/dolore, rifiuto di guarire.", "constructive": "Empatia curativa, saggezza nata dall'esperienza, capacità di integrare le parti rifiutate.", "context": "Salute, insegnamento, processi di guarigione, accettazione dei propri limiti.", "errors": "Cercare di 'risolvere' Chirone. Non si risolve, si accoglie.", "directive": "Trasforma la tua vulnerabilità nella tua più grande risorsa di comprensione umana."}, "TrueNode": {"title": "Perseguire la Direzione Evolutiva", "function": "Il 'Nord' magnetico dell'evoluzione personale, ciò che l'anima vuole apprendere.", "manifestation": "Si sente come una sfida, qualcosa di nuovo e sconosciuto che attrae e spaventa.", "shadow": "Fuga nel Nodo Sud (ciò che è già noto/comodo), rifiuto di crescere.", "constructive": "Coraggio di esplorare nuovi territori, allineamento con il destino, senso di scopo.", "context": "Scelte di vita fondamentali, bivi, momenti in cui si sente che 'c'è di più'.", "errors": "Cercare gratificazione immediata nel Nodo Nord; è un percorso, non un bancomat.", "directive": "Vai verso ciò che ti spaventa leggermente ma ti fa sentire 'giusto'."}, "MeanNode": {"title": "Perseguire la Direzione Evolutiva", "function": "Il 'Nord' magnetico dell'evoluzione personale, ciò che l'anima vuole apprendere.", "manifestation": "Si sente come una sfida, qualcosa di nuovo e sconosciuto che attrae e spaventa.", "shadow": "Fuga nel Nodo Sud (ciò che è già noto/comodo), rifiuto di crescere.", "constructive": "Coraggio di esplorare nuovi territori, allineamento con il destino, senso di scopo.", "context": "Scelte di vita fondamentali, bivi, momenti in cui si sente che 'c'è di più'.", "errors": "Cercare gratificazione immediata nel Nodo Nord; è un percorso, non un bancomat.", "directive": "Vai verso ciò che ti spaventa leggermente ma ti fa sentire 'giusto'."}, "Lilith": {"title": "Rivendicare la Sovranità Incondizionata", "function": "Luna Nera Lilith (Apogeo Lunare): il punto di non-negoziabilità dell'anima, l'istinto primordiale non addomesticato dal patriarcato o dai compromessi sociali.", "manifestation": "Si manifesta come un rifiuto viscerale della sottomissione, un magnetismo oscuro e lucido, e un'attrazione verso la verità nuda.", "shadow": "Rabbia distruttiva indiscriminata, paranoia di tradimento, isolamento ostile o nichilismo punitivo.", "constructive": "Autonomia totale, chiaroveggenza psicologica, emancipazione radicale, regalità interiore che non chiede il permesso di esistere.", "context": "Dinamiche di potere, sessualità sacra, momenti di rottura dei condizionamenti imposti e iniziazione ai misteri dell'Ombra.", "errors": "Cercare di addomesticare o reprimere Lilith con la morale comune, oppure scambiarla per mero capriccio distruttivo.", "directive": "Non piegare mai la tua dignità primordiale. Accetta il fuoco della tua verità e trasformalo in sovranità incorruttibile."}, "Lilith Media": {"title": "Radicare la Luna Nera Media", "function": "L'archetipo costante e profondo del Femminile Oscuro e Iniziatico.", "manifestation": "Emerge come un sottofondo continuo di autodeterminazione e fedeltà a sé stessi.", "shadow": "Senso di alienazione dal mondo convenzionale.", "constructive": "Integrità psichica adamantina e potere magnetico costante.", "context": "Lavoro interiore a lungo termine, iniziazione esoterica e deprogrammazione dei dogmi.", "errors": "Credere di doversi giustificare di fronte a chi esige la tua sottomissione.", "directive": "Cammina a testa alta nella tua notte: la Luna Nera è la tua guida ancestrale."}, "Lilith (Vera)": {"title": "Invocare l'Apogeo Osculatore", "function": "L'impatto immediato, tagliente e imprevedibile della verità di Lilith nell'istante esatto.", "manifestation": "Lampo intuitivo improvviso, rottura istantanea di legami tossici o maschere ipocrite.", "shadow": "Impulsività incendiaria che brucia ponti necessari prima del tempo.", "constructive": "Chirurgia spirituale: tagliare di netto ciò che avvelena la vita.", "context": "Crisi repentine, rivelazioni scioccanti, battaglie di indipendenza.", "errors": "Agire per pura reazione cieca anziché per pura lucidità.", "directive": "Usa la spada della verità con la precisione di una sacerdotessa, non con la furia cieca."}, "Ceres": {"title": "Custodire il Nutrimento Sacro", "function": "Principio del nutrimento profondo, ciclo di perdita e rinascita, legame con la Terra.", "manifestation": "Cura viscerale, capacità di far fiorire e attraversare l'inverno dell'anima.", "shadow": "Senso di deprivazione affettiva, ricatto morale attraverso la cura o il cibo.", "constructive": "Capacità inesauribile di rigenerazione e generosità incondizionata.", "context": "Relazioni di cura, elaborazione del lutto, ecologia interiore.", "errors": "Nutrire gli altri dimenticandosi di nutrire se stessi.", "directive": "Onora le stagioni del tuo cuore: ciò che sembra morto in inverno rinascerà in primavera."}, "Pallas": {"title": "Esercitare la Saggezza Strategica", "function": "Intelligenza guerriera, pattern-recognition, arte della strategia e giustizia.", "manifestation": "Visione a raggi X delle strutture di potere e problem-solving fulmineo.", "shadow": "Iper-razionalizzazione gelida delle emozioni, conflitto perpetuo.", "constructive": "Vittoria senza sangue, maestria tattica e difesa dei giusti.", "context": "Strategia professionale, negoziati complessi, battaglie etiche.", "errors": "Rinnegare la vulnerabilità emotiva per paura di apparire deboli.", "directive": "Pianifica con la mente fredda di Atena e colpisci con la precisione della dea."}, "Juno": {"title": "Onorare il Patto Sacro", "function": "Principio del matrimonio sacro, alleanza paritaria e rispetto nei legami.", "manifestation": "Esigenza assoluta di parità, lealtà e reciprocità nei contratti e nelle unioni.", "shadow": "Gelosia divorante, risentimento vendicativo per tradimento del patto.", "constructive": "Costruzione di alleanze invincibili fondate sull'onore reciproco.", "context": "Relazioni di coppia stabili, partnership professionali fondative.", "errors": "Rimanere in contratti ormai traditi per pura paura della solitudine.", "directive": "Accetta solo patti sacri in cui entrambi i sovrani sono incoronati al medesimo livello."}, "Vesta": {"title": "Custodire la Fiamma Interiore", "function": "Fuoco sacro della devozione, concentrazione monastica e sovranità su di sé.", "manifestation": "Dedizione totale a un'opera o vocazione, purezza di intenti.", "shadow": "Isolamento fanatico, freddezza verso il mondo umano.", "constructive": "Capacità di compiere grandi opere attraverso il fuoco della concentrazione pura.", "context": "Studi profondi, sacerdozio personale, ricerca spirituale o artistica.", "errors": "Spegnere il proprio fuoco per accontentare la mediocrità circostante.", "directive": "Custodisci il tuo focolare interiore: è l'altare da cui scaturisce ogni tuo miracolo."}, "ParsFortunae": {"title": "Attivare il Flusso di Prosperità", "function": "Punto di perfetta armonia tra Corpo (ASC), Mente/Volontà (Sole) e Inconscio (Luna).", "manifestation": "Dove la fortuna fluisce naturalmente quando si è allineati alla propria vocazione.", "shadow": "Pigrizia nell'attesa di una fortuna passiva che non richiede impegno.", "constructive": "Stato di grazia, sincronicità continue, abbondanza naturale.", "context": "Scelte di carriera, investimenti di tempo ed energia, realizzazione personale.", "errors": "Cercare la fortuna fuori da te, anziché allineare i tuoi tre centri di coscienza.", "directive": "Sii presente a te stesso: l'abbondanza è una conseguenza del tuo allineamento interiore."}, "Vertex": {"title": "Accogliere i Cancelli del Destino", "function": "Punto di svolta karmica e incontri predestinati che alterano radicalmente il corso della vita.", "manifestation": "Sensazione di fatalità o di incontri predestinati irresistibili.", "shadow": "Resistenza ostinata ai cambiamenti necessari, paura dell'ignoto.", "constructive": "Salto quantico evolutivo attraverso l'incontro con compagni di destino.", "context": "Momenti spartiacque, incontri che cambiano la vita, bivi del destino.", "errors": "Considerare una crisi di passaggio come una condanna invece che come un'iniziazione.", "directive": "Quando il cancello del destino si apre, varcalo con coraggio senza voltarti indietro."}}, "SIGNS": {"Aries": {"mode": "con impeto diretto, coraggio e immediatezza", "adverb": "Impulsivamente", "style": "guerriero"}, "Taurus": {"mode": "con stabilità, concretezza e tempi lenti", "adverb": "Stabilmente", "style": "costruttore"}, "Gemini": {"mode": "con curiosità, leggerezza e mobilità mentale", "adverb": "Intellettualmente", "style": "messaggero"}, "Cancer": {"mode": "con sensibilità, protezione e coinvolgimento emotivo", "adverb": "Emotivamente", "style": "custode"}, "Leo": {"mode": "con passione, drammaticità e centralità", "adverb": "Teatralmente", "style": "sovrano"}, "Virgo": {"mode": "con precisione, analisi critica e senso pratico", "adverb": "Analiticamente", "style": "tecnico"}, "Libra": {"mode": "con diplomazia, ricerca di equilibrio ed estetica", "adverb": "Diplomaticamente", "style": "mediatore"}, "Scorpio": {"mode": "con intensità, profondità e spirito indagatore", "adverb": "Intensamente", "style": "investigatore"}, "Sagittarius": {"mode": "con entusiasmo, fiducia e visione ampia", "adverb": "Espansivamente", "style": "esploratore"}, "Capricorn": {"mode": "con disciplina, ambizione e strategica freddezza", "adverb": "Strategicamente", "style": "stratega"}, "Aquarius": {"mode": "con originalità, lucidità e visione collettiva", "adverb": "Con originalità", "style": "visionario"}, "Pisces": {"mode": "con empatia, intuito e fusione emozionale", "adverb": "Intuitivamente", "style": "mistico"}}, "HOUSES": {"1": {"name": "L'Identità e l'Inizio", "area": "nella tua affermazione personale e nell'aspetto fisico"}, "2": {"name": "Le Risorse e i Valori", "area": "nella gestione del denaro, dei talenti e dell'autostima"}, "3": {"name": "La Comunicazione e l'Ambiente", "area": "nel modo di pensare, comunicare e muoverti nel quotidiano"}, "4": {"name": "Le Radici e la Casa", "area": "nella vita privata, nella famiglia e nel mondo interiore"}, "5": {"name": "La Creatività e l'Espressione", "area": "nei progetti creativi, nell'amore romantico e nel rapporto con i figli"}, "6": {"name": "Il Lavoro e la Routine", "area": "nell'organizzazione quotidiana, nel lavoro e nella salute fisica"}, "7": {"name": "Le Relazioni", "area": "nei rapporti a due, nelle collaborazioni e nei contratti"}, "8": {"name": "La Trasformazione e le Risorse Condivise", "area": "nell'intimità profonda, nelle crisi e nella gestione del potere"}, "9": {"name": "L'Espansione e il Senso", "area": "negli studi, nei viaggi e nella ricerca di una filosofia di vita"}, "10": {"name": "La Realizzazione e il Ruolo", "area": "nella carriera, nella reputazione e nel ruolo pubblico"}, "11": {"name": "I Progetti e il Futuro", "area": "nelle amicizie, nei gruppi e nella visione del futuro"}, "12": {"name": "L'Oltre e l'Inconscio", "area": "nella solitudine, nella spiritualità e nei meccanismi inconsci"}}, "ASPECTS": {"Conjunction": {"name": "Fusione", "desc": "le due funzioni operano insieme, non si distinguono più l'una dall'altra."}, "Sextile": {"name": "Stimolo", "desc": "le due funzioni collaborano facilmente e si supportano a vicenda."}, "Square": {"name": "Attrito", "desc": "le due funzioni sono in conflitto e richiedono uno sforzo cosciente per essere integrate."}, "Trine": {"name": "Flusso", "desc": "le energie scorrono senza ostacoli, creando un talento naturale."}, "Opposition": {"name": "Polarizzazione", "desc": "le due funzioni tirano in direzioni opposte, richiedendo una negoziazione continua."}}};

  const SIGNS = [
    { name: 'Aries', itName: 'Ariete', element: 'Fuoco', modality: 'Cardinale' },
    { name: 'Taurus', itName: 'Toro', element: 'Terra', modality: 'Fissa' },
    { name: 'Gemini', itName: 'Gemelli', element: 'Aria', modality: 'Mobile' },
    { name: 'Cancer', itName: 'Cancro', element: 'Acqua', modality: 'Cardinale' },
    { name: 'Leo', itName: 'Leone', element: 'Fuoco', modality: 'Fissa' },
    { name: 'Virgo', itName: 'Vergine', element: 'Terra', modality: 'Mobile' },
    { name: 'Libra', itName: 'Bilancia', element: 'Aria', modality: 'Cardinale' },
    { name: 'Scorpio', itName: 'Scorpione', element: 'Acqua', modality: 'Fissa' },
    { name: 'Sagittarius', itName: 'Sagittario', element: 'Fuoco', modality: 'Mobile' },
    { name: 'Capricorn', itName: 'Capricorno', element: 'Terra', modality: 'Cardinale' },
    { name: 'Aquarius', itName: 'Acquario', element: 'Aria', modality: 'Fissa' },
    { name: 'Pisces', itName: 'Pesci', element: 'Acqua', modality: 'Mobile' }
  ];
  function getSignArticulated(signIt) {
    const map = {
      'Ariete': "dell'Ariete",
      'Toro': 'del Toro',
      'Gemelli': 'dei Gemelli',
      'Cancro': 'del Cancro',
      'Leone': 'del Leone',
      'Vergine': 'della Vergine',
      'Bilancia': 'della Bilancia',
      'Scorpione': 'dello Scorpione',
      'Sagittario': 'del Sagittario',
      'Capricorno': 'del Capricorno',
      'Acquario': "dell'Acquario",
      'Pesci': 'dei Pesci'
    };
    return map[signIt] || ('di ' + signIt);
  }

  function getStyleArticulated(style) {
    if (!style) return '';
    const s = style.trim().toLowerCase();
    if (s.startsWith('investigatore') || s.startsWith('esploratore')) {
      return "dell'" + s;
    }
    if (s.startsWith('stratega')) {
      return 'dello ' + s;
    }
    return 'del ' + s;
  }


  const DIGNITIES = {
    "Sun": { "domicile": ["Leo"], "exaltation": ["Aries"], "detriment": ["Aquarius"], "fall": ["Libra"] },
    "Moon": { "domicile": ["Cancer"], "exaltation": ["Taurus"], "detriment": ["Capricorn"], "fall": ["Scorpio"] },
    "Mercury": { "domicile": ["Gemini", "Virgo"], "exaltation": ["Virgo"], "detriment": ["Sagittarius", "Pisces"], "fall": ["Pisces"] },
    "Venus": { "domicile": ["Taurus", "Libra"], "exaltation": ["Pisces"], "detriment": ["Aries", "Scorpio"], "fall": ["Virgo"] },
    "Mars": { "domicile": ["Aries", "Scorpio"], "exaltation": ["Capricorn"], "detriment": ["Taurus", "Libra"], "fall": ["Cancer"] },
    "Jupiter": { "domicile": ["Sagittarius", "Pisces"], "exaltation": ["Cancer"], "detriment": ["Gemini", "Virgo"], "fall": ["Capricorn"] },
    "Saturn": { "domicile": ["Capricorn", "Aquarius"], "exaltation": ["Libra"], "detriment": ["Cancer", "Leo"], "fall": ["Aries"] }
  };

  function norm360(deg) {
    let r = deg % 360;
    if (r < 0) r += 360;
    return r;
  }

  function getSignFromLongitude(deg) {
    const n = norm360(deg);
    const idx = Math.floor(n / 30);
    const signObj = SIGNS[idx] || SIGNS[0];
    const signDeg = Math.floor(n % 30);
    const signMin = Math.floor(((n % 30) - signDeg) * 60);
    return {
      sign: signObj.name,
      sign_it: signObj.itName,
      degree: signDeg,
      minute: signMin,
      formatted: `${signObj.itName} ${signDeg}°${signMin.toString().padStart(2, '0')}'`
    };
  }

  // Le posizioni dei corpi e le cuspidi provengono esclusivamente da Swiss
  // Ephemeris (js/calcolatore-swiss.mjs). Qui si formatta soltanto l'output:
  // nessun calcolo astronomico approssimato è più presente nel motore.
  function buildHousesData(cuspLongitudes, ascmc) {
    const angle = lon => ({ longitude: norm360(lon), ...getSignFromLongitude(lon) });
    return {
      cusps: cuspLongitudes.map((cLon, i) => ({
        house_number: i + 1,
        longitude: norm360(cLon),
        ...getSignFromLongitude(cLon)
      })),
      angles: {
        ascendant: angle(ascmc[0]),
        mc: angle(ascmc[1]),
        descendant: angle(ascmc[0] + 180),
        ic: angle(ascmc[1] + 180),
        vertex: angle(ascmc[3])
      }
    };
  }

  function getPlanetHouse(planetLon, cusps) {
    for (let i = 0; i < 12; i++) {
      const start = cusps[i].longitude;
      const end = cusps[(i + 1) % 12].longitude;
      if (start > end) {
        if (planetLon >= start || planetLon < end) return i + 1;
      } else {
        if (planetLon >= start && planetLon < end) return i + 1;
      }
    }
    return 1;
  }

  function getEssentialDignity(planetName, signName) {
    const dig = DIGNITIES[planetName];
    if (!dig) return null;
    if (dig.domicile && dig.domicile.includes(signName)) return "Domicilio";
    if (dig.exaltation && dig.exaltation.includes(signName)) return "Esaltazione";
    if (dig.detriment && dig.detriment.includes(signName)) return "Esilio";
    if (dig.fall && dig.fall.includes(signName)) return "Caduta";
    return null;
  }

  function calculateAspects(planetsList) {
    const ASPECT_TYPES = [
      { name: 'conjunction', itName: 'Congiunzione', angle: 0, baseOrb: 8 },
      { name: 'opposition', itName: 'Opposizione', angle: 180, baseOrb: 8 },
      { name: 'trine', itName: 'Trigono', angle: 120, baseOrb: 7 },
      { name: 'square', itName: 'Quadratura', angle: 90, baseOrb: 7 },
      { name: 'sextile', itName: 'Sestile', angle: 60, baseOrb: 5 },
      { name: 'quincunx', itName: 'Quinconce', angle: 150, baseOrb: 3 }
    ];

    const aspects = [];
    for (let i = 0; i < planetsList.length; i++) {
      for (let j = i + 1; j < planetsList.length; j++) {
        const p1 = planetsList[i];
        const p2 = planetsList[j];

        let diff = Math.abs(p1.longitude - p2.longitude);
        if (diff > 180) diff = 360 - diff;

        for (const asp of ASPECT_TYPES) {
          let allowedOrb = asp.baseOrb;
          if (p1.name === 'Sun' || p1.name === 'Moon' || p2.name === 'Sun' || p2.name === 'Moon') {
            allowedOrb += 2;
          }
          if (p1.category === 'asteroid' || p2.category === 'asteroid') {
            allowedOrb = Math.min(allowedOrb, 3.5);
          }

          const currentOrb = Math.abs(diff - asp.angle);
          if (currentOrb <= allowedOrb) {
            const strength = Math.max(0.2, parseFloat((1.0 - (currentOrb / allowedOrb)).toFixed(2)));
            let nature = 'armonia';
            if (['opposition', 'square', 'semisquare', 'sesquiquadrate'].includes(asp.name)) {
              nature = 'tensione';
            } else if (asp.name === 'conjunction') {
              nature = 'fusione';
            }

            // Interpretazione esoterica canonica approfondita (da calcolatore-aspects-dict.js se presente, o fallback integrato)
            let aspectInterp;
            if (typeof window !== 'undefined' && typeof window.getLilithAspectInterpretation === 'function') {
              aspectInterp = window.getLilithAspectInterpretation(p1.name, p2.name, asp.name);
            }
            if (!aspectInterp) {
              const dictPlanets = LILITH_ASTRO_DICT.PLANETS || {};
              const p1Def = dictPlanets[p1.name] || { title: p1.name, function: 'archetipo cosciente', manifestation: 'impulso primordiale' };
              const p2Def = dictPlanets[p2.name] || { title: p2.name, function: 'archetipo di trasformazione', manifestation: 'bisogno fondamentale' };

              let erosGeometricDesc = "";
              if (asp.name === 'conjunction') {
                erosGeometricDesc = `Fusione alchemica a ${asp.angle}° tra ${p1.it_name || p1.name} e ${p2.it_name || p2.name}: le due pulsioni si uniscono in un solo fuoco vulcanico indivisibile, azzerando ogni separazione tra stimolo e risposta carnale.`;
              } else if (asp.name === 'opposition') {
                erosGeometricDesc = `Tensione magnetica a ${asp.angle}° tra ${p1.it_name || p1.name} e ${p2.it_name || p2.name}: l'eros si infiamma nello spazio della polarità, trasformando l'incontro carnale in un duello estatico di seduzione e sovranità reciproca.`;
              } else if (asp.name === 'square') {
                erosGeometricDesc = `Attrito dinamico a ${asp.angle}° tra ${p1.it_name || p1.name} e ${p2.it_name || p2.name}: l'eccitazione erotica nasce dalla rottura del tabù e dalla tensione trasmutativa che demolisce ogni falso perbenismo.`;
              } else if (asp.name === 'trine') {
                erosGeometricDesc = `Flusso armonico a ${asp.angle}° tra ${p1.it_name || p1.name} e ${p2.it_name || p2.name}: la sensualità scorre con grazia fluida tra elementi affini, rigenerando la linfa vitale e donando estasi magnetica naturale.`;
              } else if (asp.name === 'sextile') {
                erosGeometricDesc = `Alleanza stimolante a ${asp.angle}° tra ${p1.it_name || p1.name} e ${p2.it_name || p2.name}: complicità intelligente e seduzione raffinata che uniscono le due forze in una danza di piacere condiviso e privo di colpa.`;
              } else {
                erosGeometricDesc = `Alchimia sottile a ${asp.angle}° tra ${p1.it_name || p1.name} e ${p2.it_name || p2.name}: riconfigurazione intima dell'ombra che richiede di armonizzare due frequenze differenti per accedere a un'estasi più profonda.`;
              }

              aspectInterp = {
                title: `${p1.it_name || p1.name} in ${asp.itName} a ${p2.it_name || p2.name}`,
                subtitle: `Geometria Sacra a ${asp.angle}° di ${asp.itName}`,
                function: `Interazione dinamica a ${asp.angle}° tra ${p1Def.title || p1.name} e ${p2Def.title || p2.name}. Configurazione geometrica di ${nature.toUpperCase()}.`,
                manifestation: `${p1Def.manifestation || ''} Questa spinta si intreccia con ${p2.it_name || p2.name}: ${p2Def.manifestation || ''}`,
                shadow: `Rischio di polarizzazione o conflitto tra il bisogno di ${p1Def.title || p1.name} e quello di ${p2Def.title || p2.name}.`,
                constructive: `Integrazione suprema: far dialogare la forza di ${p1.it_name || p1.name} con la saggezza di ${p2.it_name || p2.name}.`,
                directive: `Non reprimere nessuna delle due istanze: trova un accordo sovrano tra ${p1.it_name || p1.name} e ${p2.it_name || p2.name}.`,
                dark_eros: `${erosGeometricDesc} Cavalcare quest'ombra richiede di superare ogni residuo di colpa patriarcale, facendo dell'amplesso un atto sacro di sovranità carnale e potere rigeneratore.`
              };
            }

            aspects.push({
              planet1: p1.name,
              planet2: p2.name,
              aspect: asp.name,
              aspect_it: asp.itName,
              aspect_type: asp.itName,
              angle: asp.angle,
              orb: parseFloat(currentOrb.toFixed(2)),
              strength: strength,
              nature: nature,
              formatted: `${p1.it_name || p1.name} ${asp.itName} ${p2.it_name || p2.name} (${currentOrb.toFixed(1)}°)`,
              interpretation: aspectInterp
            });
            break;
          }
        }
      }
    }
    return aspects;
  }

  function calculateDominanceAndSignature(planetsList, aspectsList) {
    const elements = { "Fuoco": 0, "Terra": 0, "Aria": 0, "Acqua": 0 };
    const modalities = { "Cardinale": 0, "Fissa": 0, "Mobile": 0 };
    const weights = {
      "Sun": 3.5, "Moon": 3.5, "Mercury": 2, "Venus": 2, "Mars": 2,
      "Jupiter": 1.5, "Saturn": 1.5, "Lilith": 2.5, "Uranus": 1, "Neptune": 1, "Pluto": 1.5
    };

    let totalWeight = 0;
    for (const p of planetsList) {
      const w = weights[p.name] || 0.5;
      totalWeight += w;
      const sObj = SIGNS.find(s => s.name === p.sign) || SIGNS[0];
      if (elements[sObj.element] !== undefined) elements[sObj.element] += w;
      if (modalities[sObj.modality] !== undefined) modalities[sObj.modality] += w;
    }

    for (const k in elements) elements[k] = parseFloat(((elements[k] / totalWeight) * 100).toFixed(1));
    for (const k in modalities) modalities[k] = parseFloat(((modalities[k] / totalWeight) * 100).toFixed(1));

    const domElement = Object.keys(elements).reduce((a, b) => elements[a] > elements[b] ? a : b);
    const domModality = Object.keys(modalities).reduce((a, b) => modalities[a] > modalities[b] ? a : b);

    // CALCOLO PUNTI DI FORZA E DOMINANZA PLANETARIA RIGOROSA
    const corePlanetNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Lilith'];
    const planetScores = [];
    let sumPlanetScores = 0;

    for (const p of planetsList) {
      if (!corePlanetNames.includes(p.name)) continue;

      let score = (weights[p.name] || 1.5) * 5.0; // Punteggio base archetipico

      // 1. Bonus / Malus per Dignità Essenziale
      if (p.dignity === 'Domicilio') score += 7;
      else if (p.dignity === 'Esaltazione') score += 5;
      else if (p.dignity === 'Caduta') score -= 2;
      else if (p.dignity === 'Esilio') score -= 3;

      // 2. Bonus per Posizione nelle Case (Angularità)
      if ([1, 10].includes(p.house)) score += 6; // Angoli primari (ASC, MC)
      else if ([4, 7].includes(p.house)) score += 4; // Angoli secondari (IC, DSC)
      else if ([2, 5, 8, 11].includes(p.house)) score += 2.5; // Case succedenti
      else score += 1; // Case cadenti

      // 3. Bonus per Aspetti Maggiori attivi
      if (aspectsList && Array.isArray(aspectsList)) {
        const pAspects = aspectsList.filter(a => a.planet1 === p.name || a.planet2 === p.name);
        score += pAspects.length * 1.5;
      }

      score = Math.max(5, Math.round(score));
      planetScores.push({
        planet: p.name,
        it_name: p.it_name || p.name,
        score: score
      });
      sumPlanetScores += score;
    }

    // Calcola le percentuali e ordina in classifica decrescente di dominanza
    planetScores.forEach(ps => {
      ps.percentage = sumPlanetScores > 0 ? parseFloat(((ps.score / sumPlanetScores) * 100).toFixed(1)) : 0;
    });

    planetScores.sort((a, b) => b.score - a.score);

    return {
      dominant_element: domElement,
      dominant_modality: domModality,
      chart_signature: `${domElement} ${domModality}`,
      element_balance: elements,
      modality_balance: modalities,
      planetary_dominance: planetScores
    };
  }

  function generateOperationalInterpretation(planetsList, aspectsList) {
    const planetsInterp = {};
    const dictPlanets = LILITH_ASTRO_DICT.PLANETS || {};
    const dictSigns = LILITH_ASTRO_DICT.SIGNS || {};
    const dictHouses = LILITH_ASTRO_DICT.HOUSES || {};

    const dictErosPlanets = {
      "Sun": "La divinizzazione del desiderio: il magnetismo solare accende una presenza erotica regale ed esigente, trasformando la passione carnale nel teatro glorioso della propria sovranità, dove dominare ed essere adorati è il varco dell'ombra.",
      "Moon": "La fame insaziabile dell'inconscio: desideri notturni inconfessabili, magnetismo viscerale e richiamo carnale primordiale che risucchia ogni certezza diurna nell'abisso della fusione ancestrale.",
      "Mercury": "L'erotismo cerebrale e perverso: parole che incendiano la carne, voyeurismo intellettuale, lussuria verbale e gioco proibito dei pensieri che demoliscono ogni tabù mentale.",
      "Venus": "L'estasi dei sensi portata all'estremo: magnetismo fatale, lussuria viscerale e voluttà oscura che rifiuta il compiacimento borghese per farsi sacerdozio carnale e varco verso il sacro peccato.",
      "Mars": "La pulsione predatoria e carnale indomita: il fuoco animale del desiderio che brucia senza maschere. L'ombra suprema da cavalcare è la furia erotica trasformata in magnetismo implacabile e potenza trasmutativa.",
      "Jupiter": "L'eccesso dionisiaco: brama di espansione orgiastica, voracità carnale ed estasi senza limiti morali, dove la lussuria diventa rito sacro di abbondanza e trascendenza di ogni frontiera.",
      "Saturn": "L'ascesi oscura e il dominio dei sensi: erotismo trattenuto che cresce sotto la pressione del tempo, geometrie di potere, controllo e resa carnale cesellata nella pietra del tabù.",
      "Uranus": "L'elettroshock erotico e anticonformista: rottura improvvisa di ogni codice convenzionale, lussuria sperimentale e feticcio liberatorio che disintegra le armature sociali.",
      "Neptune": "L'orgasmo oceanico e dissolutivo: eros mistico, tentazione dell'abbandono senza confini dove la carne si fa fumo e la lussuria diventa trance ipnotica e fusione con l'invisibile.",
      "Pluto": "Il coito alchemico tra morte e rinascita: eros tantrico nero, possesso viscerale e orgasmo che dissolve le difese dell'ego per risvegliare il serpente kundalinico delle profondità della terra.",
      "Lilith": "L'apice assoluto della sovranità erotica e della lussuria sacra: non chiede permesso, non accetta compromessi. È il fuoco primordiale della femmina indomita che cavalca l'abisso della carne per forgiare la libertà dell'anima.",
      "Lilith Media": "L'apice assoluto della sovranità erotica e della lussuria sacra: non chiede permesso, non accetta compromessi. È il fuoco primordiale della femmina indomita che cavalca l'abisso della carne per forgiare la libertà dell'anima.",
      "Lilith (Vera)": "Il punto di massimo magnetismo oscuro e lussuria trascendente: la pulsione viscerale che azzanna il limite umano per trasformare l'ombra più profonda in potere magico e sovranità assoluta.",
      "Chiron": "L'eros della ferita aperta: lussuria che sorge dal dolore e dalla sensazione di essere inadeguati o respinti, tramutata nel magnetismo più vulnerabile, viscerale e risanatore.",
      "TrueNode": "La bussola carnale del destino: incontri magnetici inevitabili, attrazione predestinata e lussuria iniziatica che spinge verso l'evoluzione radicale della coscienza.",
      "MeanNode": "La traiettoria dell'attrazione fatale: memorie carnali arcaiche che richiamano patti d'anima e desideri irrisolti da cavalcare per completare il ciclo.",
      "Ceres": "L'eros nutriente e carnale: lussuria vorace della terra feconda, possesso ancestrale e piacere viscerale che radica l'energia vitale nel grembo cosmico.",
      "Pallas": "La seduzione strategica: intelligenza tattica al servizio del magnetismo erotico, padronanza del gioco del desiderio e conquista lucida della preda.",
      "Juno": "Il patto d'ombra e sovranità relazionale: lussuria come vincolo sacro ed esclusivo, gelosia arcaica trasmutata in alleanza di fuoco incondizionata.",
      "Vesta": "La sacerdotessa del fuoco segreto: lussuria canalizzata nella devozione assoluta della fiamma interiore, kundalini custodita e rilasciata solo nell'atto sacro.",
      "ParsFortunae": "L'apice del magnetismo attrattivo: la lussuria e la gioia estatica della carne come catalizzatore supremo di abbondanza e sincronicità cosmica.",
      "Vertex": "Il vortice del destino erotico: attrazione fatale che spalanca le porte del karma attraverso un incontro carnale che sconvolge ogni traiettoria pregressa."
    };

    for (const p of planetsList) {
      const pDef = dictPlanets[p.name] || dictPlanets['Sun'];
      const sDef = dictSigns[p.sign] || dictSigns['Aries'] || { mode: 'con intensità sovrana', adverb: 'Profondamente', style: 'iniziatico' };
      const hDef = dictHouses[p.house] || dictHouses[1] || { name: "L'Identità e l'Inizio", area: "nella tua sfera di affermazione" };

      const signName = p.sign_it || p.sign || '';
      const signArt = getSignArticulated(signName);
      const title = `${pDef.title || p.name} (${p.it_name || p.name} in ${signName})`;
      const func = pDef.function || "Archetipo operativo primario.";
      const manif = `${pDef.manifestation || ''} In questa configurazione, l'energia opera ${sDef.mode} e trova piena espressione ${hDef.area}.`;
      const shadow = `${pDef.shadow || ''} L'ombra specifica consiste nell'esprimersi ${sDef.adverb ? sDef.adverb.toLowerCase() : 'impulsivamente'} in modo distorto, scivolando negli eccessi ${getStyleArticulated(sDef.style)}.`;
      const constructive = `${pDef.constructive || ''} La chiave risiede nell'incarnare lo stile ${getStyleArticulated(sDef.style)} per elevare la funzione planetaria.`;
      const context = `Questa dinamica emerge con particolare evidenza ${hDef.area}. ${pDef.context || ''}`;
      const errors = pDef.errors || "Evita di identificarti ciecamente con i condizionamenti esterni.";
      const directive = `${pDef.directive || ''} Opera ${sDef.adverb ? sDef.adverb.toLowerCase() : 'consapevolmente'}, mirando al compimento nella sfera di: ${hDef.name}.`;

      const baseEros = dictErosPlanets[p.name] || dictErosPlanets["Lilith"];
      const cleanMode = (sDef.mode || 'con intensità').trim();
      const darkEros = `${baseEros} Nel segno ${signArt}, questa forza opera ${cleanMode} e trova ${hDef.area} il suo campo d'azione e di conquista primario: cavalcare quest'ombra significa superare ogni pudore convenzionale e impugnare il proprio desiderio erotico come uno scettro di pura sovranità.`;

      planetsInterp[p.name] = {
        title,
        function: func,
        manifestation: manif,
        shadow,
        constructive,
        context,
        errors,
        directive,
        dark_eros: darkEros
      };
    }

    return {
      planets: planetsInterp
    };
  }

  function generateLilithDarkInterpretation(planetsList, aspectsList, housesData, domSig) {
    const sun = planetsList.find(p => p.name === 'Sun') || planetsList[0];
    const moon = planetsList.find(p => p.name === 'Moon') || planetsList[1];
    const lilith = planetsList.find(p => p.name === 'Lilith' || p.name === 'Lilith Media' || p.name === 'Lilith (Vera)') || planetsList[0];

    const manifestoTitle = `Proclama di Sovranità & Lussuria Sacra: La Legge di ${lilith.sign_it || lilith.sign}`;
    const manifestoLead = `Non sei nata per chiedere il permesso né per conformarti alle gabbie morali dell'obbedienza. Nel tuo cielo, Lilith si erge in ${lilith.sign_it || lilith.sign} (Casa ${lilith.house}), affiancata dal volere sovrano del Sole in ${sun.sign_it || sun.sign} e dalla fame sotterranea della Luna in ${moon.sign_it || moon.sign}. La tua iniziazione comincia dove finisce la paura del peccato: cavalcare l'ombra significa trasformare la lussuria, il desiderio e il potere in un trono incrollabile.`;

    const DOMINION_ARCHETYPES = {
      "Sun": {
        role: "Il Trono Solare del Comando",
        dominion: "Sovranità incondizionata, regalità che non chiede scusa, splendore autoritario che esige adorazione o sottomissione. La tua presenza deve occupare lo spazio senza esitazioni.",
        dark_eros: "La divinizzazione della carne: un erotismo predatorio e solare dove essere desiderati e adorati è un rito sacro di possesso e celebrazione della propria grandezza.",
        taboo: "Il senso di colpa di brillare troppo o di apparire arroganti: distruggi il bisogno di compiacere gli umiliati.",
        decree: "Non regnare a metà: comanda sul tuo destino e fa' che il tuo desiderio sia legge assoluta."
      },
      "Moon": {
        role: "La Regina della Notte & La Matrice Oscura",
        dominion: "Dominio psicologico e magnetismo sotterraneo. Capacità di percepire le crepe intime degli altri e manovrare le maree emotive senza mai svelare la propria vulnerabilità.",
        dark_eros: "La fame notturna insaziabile: attrazione viscerale, fusione carnale primordiale che risucchia ogni certezza diurna nell'abisso dell'abbandono selvaggio.",
        taboo: "La paura di essere 'troppo intensa, bisognosa o divorante': la tua fame è il calderone della rinascita.",
        decree: "Abbraccia l'abisso delle tue maree interiori: l'istinto sa cosa possedere molto prima della mente."
      },
      "Mercury": {
        role: "Il Serpente Ipnotico & La Parola di Potere",
        dominion: "Comando attraverso la dialettica chirurgica, fascinazione mentale, manipolazione lucida dei simboli e capacità di incantare la mente altrui fino alla resa.",
        dark_eros: "Lussuria verbale e voyeurismo della mente: parole oscene sussurrate all'orecchio come sigilli rituali, gioco perverso di sguardi e pensieri proibiti.",
        taboo: "Il pudore di esprimere fantasie mentali 'insane o perverse': il verbo è il primo organo sessuale dell'anima.",
        decree: "Usa la parola come un pugnale intriso di veleno dolce: seduce la mente per dominare la carne."
      },
      "Venus": {
        role: "La Sacerdotessa della Lussuria Sovrana",
        dominion: "Il potere della seduzione fatale: farsi implorare, stabilire il prezzo del proprio favore, dominare attraverso la bellezza e il rifiuto calcolato.",
        dark_eros: "Voluttà sacra e piacere che disprezza i canoni borghesi: estasi sensoriale estrema, abbandono ai piaceri della carne come forma più alta di culto magico.",
        taboo: "La vergogna del peccato carnale e dell'edonismo smodato: la carne è il tempio dove Dio e il Diavolo si congiungono.",
        decree: "Non prostituire il tuo piacere per affetto o approvazione: esigi l'adorazione totale prima di concedere un solo bacio."
      },
      "Mars": {
        role: "La Bestia Indomita & L'Artiglio Iniziativo",
        dominion: "Forza d'attacco inarrestabile, assenza di paura, capacità di azzannare le occasioni e schiacciare le resistenze con ferocia impassibile.",
        dark_eros: "Pulsione predatoria cruda, lussuria viscerale animale: il desiderio che brucia senza maschere, orgasmo vissuto come una conquista gloriosa e liberazione di pura energia d'ombra.",
        taboo: "Il timore di sembrare 'aggressiva, violenta o non conforme al ruolo sottomesso': la tua rabbia è la forgia del tuo trono.",
        decree: "Sfodera la spada senza esitazioni: l'ombra non chiede permesso, prende ciò che le appartiene per diritto di forza."
      },
      "Jupiter": {
        role: "Il Tiranno Dionisiaco & L'Orgia di Potere",
        dominion: "Espansione regale illimitata, audacia cosmica, facoltà di imporre la propria visione come verità imperante e piegare la realtà ai propri disegni grandiosi.",
        dark_eros: "Lussuria senza frontiere morali, brama dionisiaca di possesso e godimento smodato, celebrazione carnale orgiastica dell'abbondanza sovrana.",
        taboo: "Il terrore dell'eccesso e la morale della mediocrità ascetica: castigarsi è la bestemmia più grande contro la vita.",
        decree: "Dilata ogni confine: non accontentarti delle briciole, divora l'intero banchetto del mondo."
      },
      "Saturn": {
        role: "Il Signore di Pietra & Il Dominatore del Tempo",
        dominion: "Controllo glaciale, autorità implacabile, maestria del silenzio e dell'attesa strategica: piegare gli avversari per sfinimento e costruire imperi inattaccabili.",
        dark_eros: "Erotismo austero, dominazione psicologica, rigore e tabù: il piacere del comando formale, sottomissione consensuale e potere cesellato nella carne.",
        taboo: "La paura dell'invecchiamento o della solitudine nel comando: la solitudine della vetta è il prezzo naturale della sovranità.",
        decree: "Forgia la tua armatura nella roccia: chi impara a dominare se stesso comanda senza sforzo su chiunque altro."
      },
      "Uranus": {
        role: "Il Fulmine Sovversivo & L'Anarchia del Piacere",
        dominion: "Rottura traumatica di ogni catena, imprevedibilità magnetica, distruzione dei vincoli tribali e familiari per forgiare una legge 100% propria.",
        dark_eros: "Elettroshock carnale, perversione liberatoria, feticismo dell'inedito e del proibito: lussuria che disintegra le norme e inventa nuove geometrie di piacere.",
        taboo: "La paura di essere etichettata come 'scandalosa, deviata o folle': la deviazione è la rottura sacra della matrice schiavizzante.",
        decree: "Sii la tempesta improvvisa: fulmina ogni convenzione e fai tremare chi sperava di poterti addomesticare."
      },
      "Neptune": {
        role: "La Sirena Dissolutiva & Il Veleno Estatico",
        dominion: "Fascinazione ipnotica invisibile, penetrazione occulta nell'aura altrui, capacità di far perdere il senso della realtà alla preda attraverso un miraggio estatico.",
        dark_eros: "Orgasmo oceanico e dissolutivo: trance erotica, eros mistico senza limiti corporei, dove la carne e lo spirito si fondono in un naufragio di voluttà assoluta.",
        taboo: "La tentazione del vittimismo o dell'autodistruzione: trasforma la tua capacità di assorbire l'invisibile in un filtro magico attivo.",
        decree: "Non annegare nelle illusioni altrui: sii tu il mare profondo in cui gli altri bramano di perdersi per sempre."
      },
      "Pluto": {
        role: "Il Signore dell'Abisso & Il Coito Tantrico Nero",
        dominion: "Potere magnetico occulto e inesorabile, morte e resurrezione psichica, capacità di dominare i terrori più intimi degli altri e trasformarli in leve di comando.",
        dark_eros: "Eros tantrico nero, possesso viscerale totale, orgasmo come catarsi di morte dell'ego e risveglio furente del serpente kundalinico sotterraneo.",
        taboo: "La paura della distruzione e del caos viscerale: solo chi muore all'obbedienza può risorgere sovrano.",
        decree: "Scendi negli inferi della tua carne e pretendi la corona: nessun potere è reale finché non è stato battezzato nell'abisso."
      },
      "Lilith": {
        role: "La Dea Madre Indomita & Il Santo Graal della Lussuria",
        dominion: "L'apice assoluto del potere primordiale femminile: non ammette superiori, non riconosce padroni, rifiuta la sottomissione dell'Eden patriarcale e fonda il proprio regno nel deserto dell'ombra.",
        dark_eros: "La lussuria sacra primigenia: il piacere sessuale ed erotico come porta verso l'illuminazione magica, fuoco kundalinico che incenerisce la colpa ed esalta la libertà sovrana della carne.",
        taboo: "La paura ancestrale di essere marchiata come 'demoniaca, cattiva o ingovernabile': accogli la tua natura demoniaca come il tuo sigillo più sacro.",
        decree: "Tu sei la prima, la non nata dalla costola di nessuno: cavalca la tigre dell'ombra con orgoglio regale e non voltarti mai indietro."
      },
      "Lilith Media": {
        role: "La Dea Madre Indomita & Il Santo Graal della Lussuria",
        dominion: "L'apice assoluto del potere primordiale femminile: non ammette superiori, non riconosce padroni, rifiuta la sottomissione dell'Eden patriarcale e fonda il proprio regno nel deserto dell'ombra.",
        dark_eros: "La lussuria sacra primigenia: il piacere sessuale ed erotico come porta verso l'illuminazione magica, fuoco kundalinico che incenerisce la colpa ed esalta la libertà sovrana della carne.",
        taboo: "La paura ancestrale di essere marchiata come 'demoniaca, cattiva o ingovernabile': accogli la tua natura demoniaca come il tuo sigillo più sacro.",
        decree: "Tu sei la prima, la non nata dalla costola di nessuno: cavalca la tigre dell'ombra con orgoglio regale e non voltarti mai indietro."
      },
      "Lilith (Vera)": {
        role: "Il Vortice di Fuoco Nero & L'Oscenità Sacra",
        dominion: "Il punto di massimo attrito astronomico reale: il richiamo dell'abisso che spezza ogni barriera razionale e impone la sovranità della pulsione più pura e tagliente.",
        dark_eros: "L'amplesso sciamanico e trascendente: il piacere erotico che azzanna la realtà ordinaria per estrarre il nettare dell'immortalità iniziatica.",
        taboo: "Il terrore della propria intensità magnetica distruttiva: ciò che distruggi era solo la tua prigione.",
        decree: "Incendia l'Eden con il tuo sospiro: la tua lussuria non è peccato, è il battito cardiaco della Terra primordiale."
      },
      "Chiron": {
        role: "La Zanna del Dolore & La Ferita Erotizzata",
        dominion: "Il potere che nasce dall'aver attraversato l'agonia del rifiuto: chi non ha più nulla da temere diventa invincibile e sa dove colpire per disarmare chiunque.",
        dark_eros: "L'eros della ferita aperta: lussuria e piacere scatenati dalla vulnerabilità estrema, brama carnale come unguento feroce e trasmutativo.",
        taboo: "La vergogna della propria mutilazione emotiva: la cicatrice è il canale d'oro da cui zampilla il tuo carisma più ipnotico.",
        decree: "Non mendicare guarigione: trasforma la tua ferita nell'arma letale con cui comandi sul tuo regno."
      },
      "TrueNode": {
        role: "La Bussola del Destino Carnale",
        dominion: "Allineamento magnetico con la propria evoluzione ineluttabile: forza attrattiva che catalizza incontri di potere e alleanze karmiche definitive.",
        dark_eros: "Lussuria iniziatica predestinata: attrazioni fatali che sconvolgono ogni ordine precostituito per compiere la metamorfosi dell'anima.",
        taboo: "Il rimpianto del passato sicuro: ciò che lasci indietro è solo zavorra per il tuo trono.",
        decree: "Segui la fiamma del tuo desiderio più audace: il destino si inchina davanti a chi ha il coraggio di desiderare tutto."
      },
      "MeanNode": {
        role: "La Memoria del Patto d'Ombra",
        dominion: "Richiamo alle forze ataviche della linea genealogica occulta: attingere al potere ancestrale dei desideri insoddisfatti delle tue antenate.",
        dark_eros: "Eros arcaico e karmico: brama ancestrale che torna a farsi carne per riscattare secoli di repressione e silenzio forzato.",
        taboo: "Il peso della lealtà familiare conformista: spezza il patto di sottomissione ereditato nel sangue.",
        decree: "Riconquista la sovranità negata alle donne del tuo sangue: tu sei la loro voce, la loro vendetta e il loro trionfo carnale."
      },
      "Ceres": {
        role: "Il Ventre Insaziabile della Terra",
        dominion: "Dominio sulla materia vitale, possesso ancestrale, autorità sul nutrimento e sulla privazione: decidere chi sfamare e chi condannare alla carestia.",
        dark_eros: "Lussuria della carne feconda e vorace, piacere materno-oscuro, orgasmo che radica l'energia vitale nel grembo cosmico.",
        taboo: "La colpa della possessività carnale: rivendica il diritto sacro di possedere ciò che hai generato o nutrito.",
        decree: "Fa' del tuo corpo il tempio dell'abbondanza: chi entra nella tua orbita deve riconoscere la sovranità del tuo grembo."
      },
      "Pallas": {
        role: "La Regina Guerriera & La Tattica del Desiderio",
        dominion: "Intelligenza strategica applicata al potere e alla seduzione: anticipare ogni mossa della controparte, condurre il gioco erotico con freddezza magistrale.",
        dark_eros: "Erotismo cerebrale e marziale: la voluttà della conquista strategica, il brivido di disarmare la mente prima di possedere il corpo.",
        taboo: "La paura di sembrare 'calcolatrice, fredda o priva di cuore': la strategia è la forma più alta di autodifesa sovrana.",
        decree: "Non combattere mai senza un piano: fa' cadere le difese della tua preda con la precisione di una dea della guerra."
      },
      "Juno": {
        role: "Il Patto Erotico Esclusivo & Il Dominio Relazionale",
        dominion: "Imposizione di condizioni indiscutibili nelle relazioni: rifiuto della sottomissione coniugale, pretesa di un'alleanza di potere paritaria o dominante.",
        dark_eros: "Lussuria come sigillo di alleanza esclusiva: passione gelosa trasmutata in fuoco incondizionato e patto di sangue carnale.",
        taboo: "Il terrore dell'abbandono o della solitudine: chi non rispetta il tuo trono merita solo l'esilio dal tuo regno.",
        decree: "Esigi devozione assoluta o fai terra bruciata: una regina non divide il letto con chi non riconosce la sua corona."
      },
      "Vesta": {
        role: "La Custode della Kundalini Segreta",
        dominion: "Autonomia erotica assoluta: non appartenere a nessuno se non al fuoco interiore, padronanza sacra della propria energia kundalinica.",
        dark_eros: "Lussuria canalizzata nel rito sacro interiore: la fiamma che brucia in silenzio, estasi tantrica solitaria o condivisa solo con chi è degno dell'iniziazione.",
        taboo: "La vergogna dell'autoerotismo o della castità strategica: la tua sessualità ti appartiene in via esclusiva.",
        decree: "Custodisci la tua fiamma: rilasciala solo quando l'atto è un rito di trasmutazione, mai per noia o mendicanza affettiva."
      },
      "ParsFortunae": {
        role: "Il Vortice dell'Oro & La Gloria dei Sensi",
        dominion: "Magnetismo di abbondanza materiale e carnale: attirare la ricchezza e il piacere come conseguenza naturale della propria sovranità.",
        dark_eros: "Il piacere orgiastico come catalizzatore magico di prosperità: godere della carne per attirare la fortuna cosmica.",
        taboo: "L'ipocrisia dell'ascetismo pauperista: il lusso e la bellezza sono tributi dovuti alla tua regalità interiore.",
        decree: "Godi di ogni bene della terra senza sensi di colpa: la fortuna bacia solo chi sa desiderare con maestà."
      },
      "Vertex": {
        role: "La Porta Iniziatica dell'Attrazione Fatale",
        dominion: "Il potere degli incontri predestinati: agire come catalizzatore di destino per chiunque entri in contatto con te.",
        dark_eros: "Il vortice del sesso karmico: incontri sconvolgenti che risvegliano memorie dimenticate e spingono oltre i confini del consentito.",
        taboo: "La resistenza al cambiamento radicale provocato dal desiderio: lasciati attraversare dalla tempesta del fato.",
        decree: "Sii il varco del destino: chi ti incontra non potrà mai più tornare quello di prima."
      }
    };

    const planetsDark = [];
    for (const p of planetsList) {
      const arch = DOMINION_ARCHETYPES[p.name] || DOMINION_ARCHETYPES["Lilith"];
      const sObj = SIGNS.find(s => s.name === p.sign) || { itName: p.sign, element: 'Fuoco', modality: 'Cardinale' };
      
      planetsDark.push({
        name: p.name,
        it_name: p.it_name || p.name,
        glyph: (typeof LilithChartRenderer !== 'undefined' && LilithChartRenderer.planetSymbols[p.name]) || '⚸',
        sign: sObj.itName,
        house: p.house,
        formatted: p.formatted,
        role: arch.role,
        title: `${p.it_name || p.name} in ${sObj.itName}: ${arch.role}`,
        dominion_power: `${arch.dominion} Nel segno ${getSignArticulated(sObj.itName)}, il tuo comando si esprime con l'energia dell'Elemento ${sObj.element} e in modalità ${sObj.modality}: non concedere tregua a chi tenta di limitare il tuo raggio d'azione nel settore di Casa ${p.house}.`,
        dark_eros: `${arch.dark_eros} Attraverso la lente ${getSignArticulated(sObj.itName)}, la voluttà carnale rifiuta ogni tabù convenzionale: fai del tuo piacere un atto di ribellione sacra e potere magnetico.`,
        taboo_to_shatter: arch.taboo,
        lilithian_decree: arch.decree
      });
    }

    const aspectsDark = (aspectsList || []).slice(0, 8).map(a => {
      const p1Name = a.planet1;
      const p2Name = a.planet2;
      const isHard = ['opposition', 'square', 'semisquare', 'sesquiquadrate'].includes(a.aspect);
      const isConj = a.aspect === 'conjunction';

      let dynamic = '';
      let trans = '';
      if (isConj) {
        dynamic = `Fusione totale di potere e lussuria. Non esiste separazione tra l'impulso di ${p1Name} e la pulsione di ${p2Name}: l'energia agisce come un unico magnete indomito che seduce e comanda.`;
        trans = `Usa questa compattezza carnale per imporre il tuo volere: chiunque tenti di dividerti si scontrerà con una fortezza inscindibile.`;
      } else if (isHard) {
        dynamic = `Attrito di dominio carnale e psicologico. ${p1Name} e ${p2Name} ingaggiano una lotta di potere feroce: nessuno dei due vuole cedere lo scettro. È la tensione dell'amplesso estremo, dove il conflitto diventa afrodisiaco di pura potenza.`;
        trans = `Non addomesticare questo scontro con false paci: cavalca l'attrito come una frusta iniziatica per piegare la realtà alle tue condizioni.`;
      } else {
        dynamic = `Fluire magnetico del fascino e del comando naturale. ${p1Name} e ${p2Name} cospirano in perfetta complicità erotica: la seduzione opera senza sforzo apparente, attirando prede e alleanze nel tuo cerchio.`;
        trans = `Non adagiarti sul compiacimento: sfrutta questo magnetismo ipnotico per conquistare posizioni di assoluto comando relazionale.`;
      }

      return {
        title: `${a.formatted || a.aspect_it}`,
        planet1: p1Name,
        planet2: p2Name,
        nature: a.nature,
        angle: a.angle,
        orb: a.orb,
        dynamic: dynamic,
        transmutation: trans
      };
    });

    return {
      manifesto_title: manifestoTitle,
      manifesto_lead: manifestoLead,
      planets_dark: planetsDark,
      aspects_dark: aspectsDark,
      dominance_synthesis: `La tua firma celeste è dominata dall'Elemento ${domSig ? domSig.dominant_element : 'Fuoco'} e dalla modalità ${domSig ? domSig.dominant_modality : 'Cardinale'}. Nel codice di Lilith, questo significa che il tuo potere non è una richiesta né una preghiera: è un decreto impresso negli astri che attende solo di essere agito nella materia viva.`
    };
  }

  function generateLilithKarmaDestiny(planetsList, aspectsList, housesData, domSig) {
    const northNode = planetsList.find(p => p.name === 'TrueNode' || p.name === 'MeanNode') || {
      name: 'TrueNode', sign: 'Aries', sign_it: 'Ariete', house: 1, formatted: 'Ariete 15°00\'', longitude: 15
    };

    const southLon = norm360(northNode.longitude + 180);
    const southSignObj = getSignFromLongitude(southLon);
    const southHouse = (northNode.house + 6 - 1) % 12 + 1;

    const saturn = planetsList.find(p => p.name === 'Saturn') || {
      name: 'Saturn', sign: 'Capricorn', sign_it: 'Capricorno', house: 10, formatted: 'Capricorno 0°00\'', is_retrograde: false
    };
    const pluto = planetsList.find(p => p.name === 'Pluto') || {
      name: 'Pluto', sign: 'Scorpio', sign_it: 'Scorpione', house: 8, formatted: 'Scorpione 0°00\''
    };
    const lilith = planetsList.find(p => p.name === 'Lilith' || p.name === 'Lilith Media' || p.name === 'Lilith (Vera)') || planetsList[0];

    const vertex = (housesData && housesData.angles && housesData.angles.vertex) || planetsList.find(p => p.name === 'Vertex') || {
      formatted: 'Punto del Destino', sign_it: 'Cosmo'
    };
    const mc = (housesData && housesData.angles && housesData.angles.mc) || {
      formatted: 'Zenith', sign_it: 'Vocazione'
    };
    const ic = (housesData && housesData.angles && housesData.angles.ic) || {
      formatted: 'Nadir', sign_it: 'Radici Ancestrali'
    };

    const SOUTH_ARCH = {
      'Aries': {
        origin: "Memoria ancestrale di battaglie solitarie, diffidenza cronica e isolamento difensivo per non subire assoggettamento.",
        trap: "Reagire con impeto distruttivo non appena si percepisce una richiesta di compromesso, scambiando la cooperazione per debolezza.",
        breakthrough: "Deprogramma il riflesso della guerra continua: la vera forza sovrana non ha bisogno di aggredire per proteggere il proprio spazio vitale."
      },
      'Taurus': {
        origin: "Radicamento passato nella materia, attaccamento viscerale alle certezze tangibili e terrore della precarietà o del vuoto.",
        trap: "Rimanere in stallo in relazioni, situazioni o abitudini morte solo perché familiari, stabili o economicamente comode.",
        breakthrough: "Spezza l'illusione del controllo materiale: la tua sicurezza non risiede nei possedimenti, ma nella tua capacità rigeneratrice interiore."
      },
      'Gemini': {
        origin: "Eredità di dispersione intellettuale, curiosità superficiale, chiacchiericcio sterile e fuga dalle profondità dense dell'anima.",
        trap: "Accumulare nozioni, pareri e contatti senza mai prendere una posizione sacra, usando l'ironia disincantata per non impegnarsi emotivamente.",
        breakthrough: "Zittisci il rumore della mente ordinaria: passa dall'opinione fugace alla grande visione iniziatica che orienta il tuo destino."
      },
      'Cancer': {
        origin: "Memoria di dipendenza affettiva simbiotica, ricatti emotivi infantili e terrore claustrofobico di uscire dal nido protettivo familiare.",
        trap: "Cercare figure genitoriali sostitutive a cui delegare la propria sicurezza, recitando il ruolo della creatura fragile per timore dell'abbandono.",
        breakthrough: "Taglia il cordone ombelicale psichico: assumiti la responsabilità totale del tuo impero personale senza più pretendere salvatori esterni."
      },
      'Leo': {
        origin: "Retaggio di palcoscenico e corte, dipendenza dal prestigio personale, narcisismo ferito e costante bisogno di adorazione.",
        trap: "Misurare il proprio valore unicamente attraverso gli sguardi altrui, cedendo al risentimento quando non si è al centro della scena.",
        breakthrough: "Dona la tua regalità a una causa cosmica più grande: trasforma l'orgoglio dell'ego in una fiamma che ispira ed emancipa il collettivo."
      },
      'Virgo': {
        origin: "Fardello di servilismo non riconosciuto, ansia da prestazione maniacale, perfezionismo paralizzante e autopunizione interiore.",
        trap: "Credere di dover essere costantemente utili e irreprensibili per meritare il diritto di respirare ed essere amati.",
        breakthrough: "Infrangi la tirannia del controllo ossessivo: arrenditi al mistero dell'invisibile e accetta la sublime sacralità del caos fecondo."
      },
      'Libra': {
        origin: "Memoria di compromessi disonorevoli, abdicazione della propria sovranità per compiacere il partner e paura viscerale della solitudine.",
        trap: "Tacere la propria verità e reprimere il fuoco di Lilith per mantenere una facciata di armonia finta e conformista.",
        breakthrough: "Impara a sostenere il disaccordo senza piegare la testa: un'anima sovrana non negozia la propria dignità per elemosinare compagnia."
      },
      'Scorpio': {
        origin: "Eredità di tradimenti laceranti, dinamiche di potere distruttive, paranoia del controllo e dipendenza viscerale dalla catastrofe.",
        trap: "Sabotare inconsciamente ogni pace duratura perché si confonde la serenità con la noia e si crede che solo il tormento sia garanzia di passione autentica.",
        breakthrough: "Rilascia il veleno dei vecchi risentimenti: costruisci basi adamantine di pace, godimento sensoriale e prosperità serena."
      },
      'Sagittarius': {
        origin: "Memoria di dogmatismo dottrinario, fanatismo idealista, arroganza filosofica e fughe nomadi dalle responsabilità ordinarie.",
        trap: "Credere di possedere già tutte le risposte e guardare con condiscendenza chi vive nella complessità del piano terreno.",
        breakthrough: "Scendi dal pulpito della certezza astratta: impara a dialogare con umiltà, ad ascoltare e a incarnare la verità nel qui e ora."
      },
      'Capricorn': {
        origin: "Imprinting di solitudine austera, oppressione patriarcale del dovere e soppressione del cuore per scalare una vetta sociale arida.",
        trap: "Identificarsi unicamente con la propria produttività e i propri titoli, reprimendo la vulnerabilità e diffidando della tenerezza come segno di debolezza.",
        breakthrough: "Consacra il tuo tempio intimo: permettiti di sentire, piangere e nutrire la tua anima lontano da ogni dovere mondano."
      },
      'Aquarius': {
        origin: "Memoria di alienazione, rifugio nell'utopia cerebrale, distacco emotivo gelido e dispersione della propria individualità nel gruppo.",
        trap: "Trincerarsi dietro l'alibi dell'anticonformismo teorico per non sporcarsi le mani con il fuoco carnale del desiderio e della responsabilità personale.",
        breakthrough: "Sali sul trono della tua sovranità carnale: incarna la tua unicità nella materia e brilla con la fiera audacia del tuo fuoco solare."
      },
      'Pisces': {
        origin: "Fardello ancestrale di martirio e sacrificio, confusione nei confini, vittimismo passivo e fughe dissociative dalla materia.",
        trap: "Farsi carico dei fardelli e dei debiti altrui fino all'esaurimento vitale, scambiando il masochismo per elevazione spirituale.",
        breakthrough: "Traccia confini sacri invalicabili: la vera maestria spirituale comincia dalla disciplina, dall'ordine e dalla lucidità discriminante."
      }
    };

    const NORTH_ARCH = {
      'Aries': {
        mission: "La Rivendicazione della Sovranità Primigenia",
        destination: "Conquistare l'auto-affermazione assoluta: camminare nell'ignoto con l'audacia di chi è nato per aprire nuove strade.",
        command: "Non cercare alleanze che ti limitino: guida con il tuo fuoco indomito."
      },
      'Taurus': {
        mission: "L'Edificazione del Tempio Autonomo & La Pace Carnale",
        destination: "Costruire stabilità incrollabile, autosufficienza materiale e godimento sacro della materia terrena.",
        command: "Radica le tue radici nella roccia: la tua pace e la tua autostima sono fortezze inviolabili."
      },
      'Gemini': {
        mission: "Il Risveglio della Mente Agile & La Parola Trasmutativa",
        destination: "Esplorare la realtà con curiosità pura, trasmettere la conoscenza senza dogmi e connettere anime attraverso il Verbo.",
        command: "Usa la parola come una chiave alchemica: adatta il tuo linguaggio alla verità del momento."
      },
      'Cancer': {
        mission: "La Consacrazione del Focolare Intimo & L'Intuito Viscerale",
        destination: "Costruire un santuario di nutrimento profondo, onorare la propria sensibilità e trasformarla in chiaroveggenza protettiva.",
        command: "Custodisci la tua sorgente interiore: il vero potere regale nasce dalla purezza del tempio emotivo."
      },
      'Leo': {
        mission: "L'Incoronazione dell'Ego Sovrano & La Gloria Creativa",
        destination: "Occupare il centro del tuo regno senza esitazioni, creare bellezza radiosa e donare il tuo calore con generosità maestosa.",
        command: "Brilla con tutto il tuo splendore: il mondo ha bisogno della tua luce, non della tua modestia."
      },
      'Virgo': {
        mission: "L'Alchimia della Precisione & Il Rigore Sacro",
        destination: "Padroneggiare la disciplina quotidiana, purificare la salute del corpo e trasformare il lavoro in liturgia iniziatica.",
        command: "Coltiva l'eccellenza nel dettaglio: la grandezza cosmica si specchia nella precisione di ogni gesto."
      },
      'Libra': {
        mission: "Il Patto di Parità & L'Eleganza del Potere Condiviso",
        destination: "Fondere la propria forza con alleati degni, creare patti sacri di mutua elevazione e padroneggiare la diplomazia di potere.",
        command: "Esigi rispetto assoluto nei tuoi legami: un'anima sovrana sceglie solo alleati al proprio livello."
      },
      'Scorpio': {
        mission: "La Discesa negli Inferi & Il Trionfo della Fenice",
        destination: "Abbracciare la trasmutazione viscerale, la verità senza censure, la sessualità tantrica e la rinascita dalle macerie.",
        command: "Non temere il buio della trasformazione: è nell'abisso che risiede il tesoro della tua immortalità."
      },
      'Sagittarius': {
        mission: "L'Espansione Titanica & La Ricerca della Grande Legge",
        destination: "Elevare lo spirito oltre i confini del noto, fidarsi della propria visione profetica e cercare la verità che rende liberi.",
        command: "Punta la freccia verso le stelle più alte: non accontentarti di verità comode o dogmi imposti."
      },
      'Capricorn': {
        mission: "La Vetta della Maestria & L'Impero del Tempo",
        destination: "Forgiare un'autorevolezza incrollabile, assumere il comando del proprio destino e costruire opere che sfidano i secoli.",
        command: "Comanda con la fermezza della roccia: la sovranità duratura si forgia nella pazienza e nel rigore morale."
      },
      'Aquarius': {
        mission: "La Rottura delle Gabbie & La Visione Eretica del Futuro",
        destination: "Spezzare ogni convenzione ipocrita, incarnare la ribellione cosmica e aprire la strada a una nuova era di libertà individuale.",
        command: "Sii l'anomalia luminosa del sistema: non conformarti mai a un ordine che esige la tua cecità."
      },
      'Pisces': {
        mission: "La Mistica Oceanica & La Trascendenza del Sé",
        destination: "Riconnetterti alla sorgente universale, dissolvere l'illusione della separazione e guidare attraverso la chiaroveggenza e l'arte.",
        command: "Fidati del flusso invisibile: l'infinito ti sostiene in ogni istante del tuo cammino."
      }
    };

    const sKey = southSignObj.sign || 'Libra';
    const nKey = northNode.sign || 'Aries';
    const southInfo = SOUTH_ARCH[sKey] || SOUTH_ARCH['Libra'];
    const northInfo = NORTH_ARCH[nKey] || NORTH_ARCH['Aries'];

    return {
      coords_summary: {
        north_node: `${northNode.formatted} (Casa ${northNode.house})`,
        south_node: `${southSignObj.formatted} (Casa ${southHouse})`,
        saturn: `${saturn.formatted} (Casa ${saturn.house})${saturn.is_retrograde ? ' [R]' : ''}`,
        pluto: `${pluto.formatted} (Casa ${pluto.house})`,
        lilith: `${lilith.formatted} (Casa ${lilith.house})`,
        vertex: `${vertex.formatted || 'Punto Focale'}`,
        mc: `${mc.formatted || 'Zenith'}`
      },

      why_here: {
        title: "Perché ho deciso di essere qui? (L'Origine & il Patto d'Incarnazione)",
        pact_lead: `Non sei un'anima giunta per errore né per caso nella densità della materia. Prima della tua incarnazione in questo corpo biologico, la tua coscienza ha scelto con precisione astronomica il punto d'impatto: incarnarsi sotto l'asse nodale di ${southSignObj.sign_it} / ${northNode.sign_it}, con il richiamo ancestrale di Casa ${southHouse} e la radice notturna dell'IC in ${ic.sign_it}. Hai stipulato un patto d'onore con l'ombra: scendere nel crogiolo della materia per trasmutarlo in oro di pura sovranità.`,
        south_node_title: `L'Eredità Ancestrale del Nodo Sud in ${southSignObj.sign_it} (Casa ${southHouse})`,
        south_node_text: southInfo.origin,
        saturn_title: `La Palestra del Tempo & Il Debito di Struttura: Saturno in ${saturn.sign_it} (Casa ${saturn.house})`,
        saturn_text: `Saturno rappresenta il patto di rigore che hai sottoscritto per forgiare la tua tempra: collocato in ${saturn.sign_it} nel settore di Casa ${saturn.house}${saturn.is_retrograde ? ' in moto retrogrado' : ''}, non è una condanna esterna, ma la disciplina inflessibile che la tua anima ha scelto per imparare l'autosufficienza e l'integrità totale, spingendoti a fare affidamento unicamente sulla tua autorità interiore.`,
        pluto_title: `Il Riscatto delle Ceneri: Plutone in ${pluto.sign_it} (Casa ${pluto.house})`,
        pluto_text: `Plutone in ${pluto.sign_it} (Casa ${pluto.house}) è il patto di immersione nell'abisso: hai accettato di confrontarti con la perdita, l'intensità o il tradimento per comprendere che nulla può annientare chi ha imparato a morire e risorgere dalle proprie ceneri come una fenice sovrana.`
      },

      what_to_do: {
        title: "Cosa devo fare? (L'Alchimia del Presente & l'Inerzia da Spezzare)",
        lead: `Il karma non è una punizione decretata da un demiurgo esterno: è la memoria meccanica delle abitudini non risolte che spinge a rifugiarsi nel copione automatico del Nodo Sud ogni volta che la vita mette alla prova. Per compiere la tua opera iniziatica, occorre operare una deprogrammazione lucida nel proprio presente quotidiano.`,
        trap_title: `La Trappola Meccanica da Disinnescare: Il Rifugio Inconscio in ${southSignObj.sign_it}`,
        trap_text: southInfo.trap,
        action_title: "L'Atto di Deprogrammazione Quotidiana",
        action_text: southInfo.breakthrough,
        daily_directive: `Rifiuta il ruolo della comparsa o della vittima predestinata. Quando avverti la tentazione di regredire nelle vecchie ferite o nelle dipendenze ataviche, attiva il fuoco di Lilith: prendi il comando cosciente della tua energia e compi esattamente la scelta opposta rispetto al tuo vecchio automatismo.`
      },

      where_to_go: {
        title: "Dove devo andare? (La Stella Polare del Destino & il Trono di Lilith)",
        lead: `Il tuo destino non è un copione già scritto ed immutabile: è una vetta sacra che attende di essere conquistata con il coraggio della tua Volontà Sovrana. La bussola evolutiva del tuo tema natale indica una traiettoria precisa che parte dal superamento del passato per approdare alla maestria terrena.`,
        north_node_title: `La Stella Polare del Nodo Nord in ${northNode.sign_it} (Casa ${northNode.house})`,
        north_node_text: `${northInfo.destination} ${northInfo.command}`,
        vertex_title: `I Cancelli del Fato & Gli Incontri Predestinati: Vertex (${vertex.formatted || vertex.sign_it})`,
        vertex_text: `Il Vertex (${vertex.formatted || vertex.sign_it}) è il portale sincronico delle svolte irrevocabili: sul tuo cammino compariranno incontri e bivi del destino non programmabili, che agiranno come catalizzatori sacri per costringerti ad abbandonare la vecchia pelle e compiere la tua missione evolutiva.`,
        mc_title: `Il Monumento nel Mondo: Medio Cielo (MC) in ${mc.sign_it || 'Zenith'}`,
        mc_text: `L'apice celeste del Medio Cielo (${mc.formatted || mc.sign_it}) rappresenta l'opera tangibile e la reputazione imperitura che lascerai in eredità: non accontentarti di sopravvivere in segreto, ma imprimi la tua maestria nella storia con fierezza.`,
        lilith_title: `La Consacrazione della Fiamma di Lilith in ${lilith.sign_it} (Casa ${lilith.house})`,
        lilith_text: `Nel codice delle Figlie di Lilith, il compimento del destino non è obbedienza a dogmi esterni, ma la totale emancipazione della tua natura primigenia: con Lilith in ${lilith.sign_it} (Casa ${lilith.house}), la tua corona si forgia nell'assoluta fedeltà a te stessa, nell'abbattimento di ogni senso di colpa e nella glorificazione della tua libertà sovrana.`
      }
    };
  }

  window.generateLilithDarkInterpretation = generateLilithDarkInterpretation;
  window.generateLilithKarmaDestiny = generateLilithKarmaDestiny;

  // ==========================================================================
  // MOTORE DI LETTURA SINTETICA UNIFICATA A 3 PASSAGGI (CANONE CODEX ASTRA)
  // 1. Individuare e pesare (segno, casa, orbi stretti <1.8°, angoli, governatore)
  // 2. Interpretazione combinatoria (convergenze, attriti ed esplicita assenza)
  // 3. Lettura unica a 5 capitoli non ridondanti
  // ==========================================================================

  const CODEX_SIGNS = {
    'Aries': { it: 'Ariete', element: 'Fuoco', modality: 'Cardinale', ruler: 'Mars', subruler: null, style: 'guerriero pionieristico' },
    'Taurus': { it: 'Toro', element: 'Terra', modality: 'Fissa', ruler: 'Venus', subruler: null, style: 'costruttore incrollabile' },
    'Gemini': { it: 'Gemelli', element: 'Aria', modality: 'Mobile', ruler: 'Mercury', subruler: null, style: 'messaggero lucido' },
    'Cancer': { it: 'Cancro', element: 'Acqua', modality: 'Cardinale', ruler: 'Moon', subruler: null, style: 'custode viscerale' },
    'Leo': { it: 'Leone', element: 'Fuoco', modality: 'Fissa', ruler: 'Sun', subruler: null, style: 'sovrano indomito' },
    'Virgo': { it: 'Vergine', element: 'Terra', modality: 'Mobile', ruler: 'Mercury', subruler: 'Chiron', style: 'alchimista del dettaglio' },
    'Libra': { it: 'Bilancia', element: 'Aria', modality: 'Cardinale', ruler: 'Venus', subruler: null, style: 'arbitro incorruttibile' },
    'Scorpio': { it: 'Scorpione', element: 'Acqua', modality: 'Fissa', ruler: 'Pluto', subruler: 'Mars', style: 'iniziatore degli abissi' },
    'Sagittarius': { it: 'Sagittario', element: 'Fuoco', modality: 'Mobile', ruler: 'Jupiter', subruler: null, style: 'esploratore titanico' },
    'Capricorn': { it: 'Capricorno', element: 'Terra', modality: 'Cardinale', ruler: 'Saturn', subruler: null, style: 'monarca della vetta' },
    'Aquarius': { it: 'Acquario', element: 'Aria', modality: 'Fissa', ruler: 'Uranus', subruler: 'Saturn', style: 'ribelle visionario' },
    'Pisces': { it: 'Pesci', element: 'Acqua', modality: 'Mobile', ruler: 'Neptune', subruler: 'Jupiter', style: 'mistico oceanico' }
  };

  const CODEX_HOUSES = {
    1: { name: 'Prima Casa (ASC)', domain: "l'affermazione dell'identità corporea, la presenza magnetica immediata e il coraggio di esistere", realm: "campo dell'Io e dell'autoaffermazione" },
    2: { name: 'Seconda Casa', domain: "l'autonomia materiale, il senso di autostima inviolabile e la sovranità sulle proprie risorse", realm: "risorse e valori concreti" },
    3: { name: 'Terza Casa', domain: "il potere del Verbo, la lucidità discriminante e la rottura delle convenzioni comunicative", realm: "comunicazione, pensiero e ambiente" },
    4: { name: 'Quarta Casa (IC)', domain: "le radici ancestrali, il santuario intimo e la deprogrammazione del lignaggio familiare", realm: "santuario interiore e lignaggio" },
    5: { name: 'Quinta Casa', domain: "il fuoco creativo puro, la sovranità erotica spontanea e la regalità che non mendica approvazione", realm: "creatività, eros e auto-espressione" },
    6: { name: 'Sesta Casa', domain: "la padronanza del corpo biologico, l'efficienza chirurgica e il rifiuto del servilismo mascherato da dovere", realm: "ritmo vitale, salute e maestria tecnica" },
    7: { name: 'Settima Casa (DSC)', domain: "lo specchio dell'Altro, il patto d'onore tra pari e l'eliminazione dei compromessi compiacenti", realm: "relazioni, contratti e specchio altrui" },
    8: { name: 'Ottava Casa', domain: "l'alchimia viscerale di morte e rinascita, la sessualità trasmutativa e la gestione del potere occulto", realm: "crisi, trasformazione profonda e beni condivisi" },
    9: { name: 'Nona Casa', domain: "la conquista della verità filosofica diretta, i viaggi iniziatici e lo sgretolamento dei dogmi imposti", realm: "grande visione, etica e ricerca del Senso" },
    10: { name: 'Decima Casa (MC)', domain: "l'apice della realizzazione mondana, l'autorevolezza incorruttibile e la costruzione del proprio regno autonomo", realm: "ruolo pubblico, vocazione e maestria" },
    11: { name: 'Undicesima Casa', domain: "le alleanze tra spiriti liberi, la visione del futuro e l'emancipazione dai conformismi della tribù", realm: "ideali, alleanze di pari e progetti futuri" },
    12: { name: 'Dodicesima Casa', domain: "la notte dell'inconscio, la solitudine sacra come tempio di potenza e il contatto con il mistero primordiale", realm: "solitudine sacra, dissoluzione e mistero" }
  };

  const CODEX_PLANET_NAMES_IT = {
    'Sun': 'Sole', 'Moon': 'Luna', 'Mercury': 'Mercurio', 'Venus': 'Venere', 'Mars': 'Marte',
    'Jupiter': 'Giove', 'Saturn': 'Saturno', 'Uranus': 'Urano', 'Neptune': 'Nettuno', 'Pluto': 'Plutone',
    'Lilith': 'Lilith Media', 'TrueLilith': 'Lilith (Vera)', 'Lilith Media': 'Lilith Media', 'Lilith (Vera)': 'Lilith (Vera)',
    'TrueNode': 'Nodo Nord', 'MeanNode': 'Nodo Medio', 'Chiron': 'Chirone', 'Ceres': 'Cerere',
    'Pallas': 'Pallade', 'Juno': 'Giunone', 'Vesta': 'Vesta', 'ParsFortunae': 'Punto di Fortuna', 'Vertex': 'Vertex'
  };

  function angleDiffLocal(a, b) {
    let d = Math.abs(norm360(a) - norm360(b));
    if (d > 180) d = 360 - d;
    return d;
  }

  function extractLilithProfile(planetsList, aspectsList, housesData) {
    const lilith = (planetsList || []).find(p => p.name === 'Lilith' || p.name === 'Lilith Media' || p.name === 'TrueLilith' || p.name === 'Lilith (Vera)') || (planetsList && planetsList[0]) || {
      name: 'Lilith', sign: 'Scorpio', sign_it: 'Scorpione', house: 7, longitude: 210, sign_degree: 0, sign_minute: 0
    };
    const trueLilith = (planetsList || []).find(p => p.name === 'TrueLilith' || p.name === 'Lilith (Vera)');

    const sMeta = CODEX_SIGNS[lilith.sign] || CODEX_SIGNS['Scorpio'];
    const hMeta = CODEX_HOUSES[lilith.house] || CODEX_HOUSES[1];

    // 1. Vicinanza agli angoli
    const angles = (housesData && housesData.angles) || {};
    const ascLon = angles.ascendant ? angles.ascendant.longitude : 0;
    const mcLon = angles.mc ? angles.mc.longitude : 90;
    const dscLon = angles.descendant ? angles.descendant.longitude : norm360(ascLon + 180);
    const icLon = angles.ic ? angles.ic.longitude : norm360(mcLon + 180);
    const vtxLon = angles.vertex ? angles.vertex.longitude : null;

    const distAsc = angleDiffLocal(lilith.longitude, ascLon);
    const distDsc = angleDiffLocal(lilith.longitude, dscLon);
    const distMc = angleDiffLocal(lilith.longitude, mcLon);
    const distIc = angleDiffLocal(lilith.longitude, icLon);
    const distVtx = vtxLon !== null ? angleDiffLocal(lilith.longitude, vtxLon) : 999;

    const ANGULAR_ORB = 6.5;
    let angularity = { isAngular: false, angleName: null, orb: null, type: 'subterranean', description: null };

    if (distAsc <= ANGULAR_ORB) {
      angularity = { isAngular: true, angleName: 'ASC (Ascendente)', orb: distAsc, type: 'ascendant', description: `Lilith è congiunta all'Ascendente con un'orbe di ${distAsc.toFixed(2)}°: la sovranità primordiale è impressa direttamente nel corpo, nell'aura magnetica e nella maschera d'impatto sul mondo. Impossibile da addomesticare fin dal primo sguardo.` };
    } else if (distDsc <= ANGULAR_ORB) {
      angularity = { isAngular: true, angleName: 'DSC (Discendente)', orb: distDsc, type: 'descendant', description: `Lilith è situata sull'asse del Discendente a ${distDsc.toFixed(2)}° dall'angolo: la Luna Nera diventa il guardiano inflessibile dello specchio relazionale. Attira figure polarizzanti ed esige patti assoluti o la rottura immediata.` };
    } else if (distMc <= ANGULAR_ORB) {
      angularity = { isAngular: true, angleName: 'MC (Medio Cielo)', orb: distMc, type: 'mc', description: `Lilith culmina al Medio Cielo con un'orbe di ${distMc.toFixed(2)}°: la vocazione pubblica è eretica e regale. Il destino rifiuta i compromessi gerarchici, le autorità patriarcali e le vie battute.` };
    } else if (distIc <= ANGULAR_ORB) {
      angularity = { isAngular: true, angleName: 'IC (Fondo Cielo)', orb: distIc, type: 'ic', description: `Lilith è radicata nel Fondo Cielo (Nadir) a ${distIc.toFixed(2)}° dall'angolo: il patto d'ombra affonda nelle radici ancestrali e nel lignaggio intimo. Il sancta sanctorum privato è una fortezza inaccessibile ai profani.` };
    } else if (distVtx <= ANGULAR_ORB) {
      angularity = { isAngular: true, angleName: 'Vertex', orb: distVtx, type: 'vertex', description: `Lilith è allineata al Vertex del Destino (orbe ${distVtx.toFixed(2)}°): funge da portale sincronico fatale per incontri carnali ed emotivi che spezzano per sempre i vecchi paradigmi.` };
    } else {
      angularity = { isAngular: false, angleName: null, orb: null, type: 'subterranean', description: `Lilith opera come corrente carsica nei recessi di ${hMeta.name}: non si esibisce in superficie, ma forgia il proprio potere alchemicamente nell'esperienza interiore e nella concentrazione silenziosa.` };
    }

    // 2. Dispositore del segno di Lilith
    const rulerName = sMeta.ruler;
    const subrulerName = sMeta.subruler;
    const rulerPlanet = (planetsList || []).find(p => p.name === rulerName);
    const subrulerPlanet = subrulerName ? (planetsList || []).find(p => p.name === subrulerName) : null;

    // 3. Aspetti di Lilith pesati per orbe
    const allAspects = aspectsList || [];
    const lilithAspectsRaw = allAspects.filter(a => {
      return (a.planet1 === lilith.name || a.planet2 === lilith.name ||
              (trueLilith && (a.planet1 === trueLilith.name || a.planet2 === trueLilith.name)));
    });

    const lilithAspects = [];
    const seenPairs = new Set();
    for (const a of lilithAspectsRaw) {
      const otherPlanetName = (a.planet1 === lilith.name || (trueLilith && a.planet1 === trueLilith.name)) ? a.planet2 : a.planet1;
      const pairKey = `${a.aspect}_${otherPlanetName}`;
      if (seenPairs.has(pairKey)) continue;
      seenPairs.add(pairKey);

      const orb = typeof a.orb === 'number' ? a.orb : parseFloat(a.orb || 0);
      let tier = 3;
      let weight = 1.0;
      if (orb <= 1.8) {
        tier = 1;
        weight = 3.0;
      } else if (orb <= 4.0) {
        tier = 2;
        weight = 2.0;
      }

      const isHard = ['opposition', 'square', 'semisquare', 'sesquiquadrate'].includes(a.aspect);
      const isSoft = ['trine', 'sextile'].includes(a.aspect);
      const isConj = a.aspect === 'conjunction';

      lilithAspects.push({
        aspect: a.aspect,
        aspect_it: a.aspect_it || a.name || a.aspect,
        otherPlanet: otherPlanetName,
        otherPlanetIt: CODEX_PLANET_NAMES_IT[otherPlanetName] || otherPlanetName,
        orb: orb,
        tier: tier,
        weight: weight,
        isHard: isHard,
        isSoft: isSoft,
        isConj: isConj
      });
    }

    lilithAspects.sort((a, b) => a.orb - b.orb);

    const sunAspect = lilithAspects.find(a => a.otherPlanet === 'Sun');
    const moonAspect = lilithAspects.find(a => a.otherPlanet === 'Moon');
    const venusAspect = lilithAspects.find(a => a.otherPlanet === 'Venus');
    const marsAspect = lilithAspects.find(a => a.otherPlanet === 'Mars');
    const saturnAspect = lilithAspects.find(a => a.otherPlanet === 'Saturn');
    const plutoAspect = lilithAspects.find(a => a.otherPlanet === 'Pluto');
    const jupiterAspect = lilithAspects.find(a => a.otherPlanet === 'Jupiter');
    const uranusAspect = lilithAspects.find(a => a.otherPlanet === 'Uranus');
    const neptuneAspect = lilithAspects.find(a => a.otherPlanet === 'Neptune');
    const rulerAspect = rulerPlanet ? lilithAspects.find(a => a.otherPlanet === rulerPlanet.name) : null;

    return {
      lilith,
      trueLilith,
      sMeta,
      hMeta,
      angularity,
      ruler: {
        name: rulerName,
        nameIt: CODEX_PLANET_NAMES_IT[rulerName] || rulerName,
        planet: rulerPlanet,
        subruler: subrulerPlanet,
        aspectWithLilith: rulerAspect
      },
      aspects: lilithAspects,
      connections: {
        sun: sunAspect,
        moon: moonAspect,
        venus: venusAspect,
        mars: marsAspect,
        saturn: saturnAspect,
        pluto: plutoAspect,
        jupiter: jupiterAspect,
        uranus: uranusAspect,
        neptune: neptuneAspect
      }
    };
  }

  function generateUnifiedLilithReading(planetsList, aspectsList, housesData, domSig) {
    const profile = extractLilithProfile(planetsList, aspectsList, housesData);
    const { lilith, sMeta, hMeta, angularity, ruler, aspects, connections } = profile;

    const tightHard = aspects.filter(a => a.isHard && a.tier <= 2);
    const tightSoft = aspects.filter(a => a.isSoft && a.tier <= 2);
    const conjunctions = aspects.filter(a => a.isConj);

    // -------------------------------------------------------------
    // CAPITOLO I: NUCLEO LILITHIANO (Radice Primordiale & Sovranità)
    // -------------------------------------------------------------
    const elementConvergence = (sMeta.element === 'Acqua' && [4, 8, 12].includes(lilith.house)) ||
                               (sMeta.element === 'Fuoco' && [1, 5, 9].includes(lilith.house)) ||
                               (sMeta.element === 'Terra' && [2, 6, 10].includes(lilith.house)) ||
                               (sMeta.element === 'Aria' && [3, 7, 11].includes(lilith.house));

    let convergenceText = '';
    if (elementConvergence) {
      convergenceText = `Si manifesta una <strong>convergenza elementale totale</strong>: il segno ${getSignArticulated(sMeta.it)} e l'ambito di ${hMeta.name} condividono la stessa frequenza d'azione (${sMeta.element}). La tua rivendicazione di sovranità non sperimenta dispersione: quando decidi di non piegarti, lo fai con un'interezza che disorienta chi è abituato a mercanteggiare.`;
    } else {
      convergenceText = `La combinazione genera una <strong>polarità feconda</strong>: l'energia ${sMeta.element} ${getSignArticulated(sMeta.it)} è costretta a incarnarsi nel terreno di ${hMeta.name}. Questa tensione non disperde la tua forza, ma impone alla tua fiamma di non restare un moto astratto, costringendola a forgiare risultati tangibili in ${hMeta.realm}.`;
    }

    let dispositorConduit = '';
    if (ruler.planet) {
      const rSign = CODEX_SIGNS[ruler.planet.sign] || { it: ruler.planet.sign };
      dispositorConduit = `Il canale materiale attraverso cui questa sovranità viene agita nel mondo è presidiato dal suo governatore, <strong>${ruler.nameIt}</strong>, posizionato in <em>${rSign.it} (Casa ${ruler.planet.house})</em>${ruler.planet.dignity ? ` in stato di ${ruler.planet.dignity}` : ''}. Non si tratta di una forza cieca: la radice di Lilith riceve ordini operativi da questo posizionamento, indicando che la tua indipendenza si compie pienamente quando padroneggi il settore di Casa ${ruler.planet.house}.`;
      if (ruler.aspectWithLilith) {
        dispositorConduit += ` Inoltre, il contatto diretto tra Lilith e il proprio governatore (${ruler.aspectWithLilith.aspect_it}, orbe ${ruler.aspectWithLilith.orb.toFixed(2)}°) stabilisce un ponte a circuito chiuso: l'istinto primordiale e la volontà esecutiva comunicano istantaneamente, senza intermediari.`;
      }
    }

    const nucleoHtml = `
      <div class="lilith-synthesis-card nucleo-card">
        <div class="synthesis-badge">👑 CAPITOLO I • ESSENZA PRIMORDIALE</div>
        <h4 class="synthesis-title">Il Nucleo di Sovranità: Lilith in ${sMeta.it} (${lilith.sign_degree}°${lilith.sign_minute.toString().padStart(2, '0')}') in ${hMeta.name}</h4>
        <div class="synthesis-body">
          <p class="synthesis-lead">
            Nel codice iniziatico delle Figlie di Lilith, la Luna Nera non rappresenta una tara o un castigo da purgare,
            ma il punto di assoluta non-negoziabilità della coscienza: dove rifiuti per costituzione animica di essere addomesticata,
            subordinata o plasmata dalle convenzioni morali del contesto.
          </p>
          <p>
            Con Lilith posizionata ${getSignArticulated(sMeta.it)} nel territorio di <strong>${hMeta.name}</strong>, il tuo istinto ancestrale
            opera con lo stile del <em>${sMeta.style}</em>, riversandosi specificamente in <strong>${hMeta.domain}</strong>.
            ${convergenceText}
          </p>
          <div class="synthesis-angular-box">
            <span class="angular-tag">📍 Radicamento Geometrico: ${angularity.isAngular ? `Angolarità Attiva su ${angularity.angleName}` : 'Flusso Carsico Sotterraneo'}</span>
            <p>${angularity.description}</p>
          </div>
          <p class="synthesis-dispositor">
            ${dispositorConduit}
          </p>
        </div>
      </div>
    `;

    // -------------------------------------------------------------
    // CAPITOLO II: RELAZIONI & DINAMICHE DI LEGAME (Lo Specchio & l'Eros)
    // -------------------------------------------------------------
    let relationalThrust = '';
    const isRelationalHouse = [7, 8, 5].includes(lilith.house);

    if (isRelationalHouse) {
      relationalThrust = `Avendo Lilith radicata direttamente nel settore di Casa ${lilith.house} (${hMeta.realm}), il teatro delle relazioni intime non è un porto di quiete convenzionale, ma il tuo crogiolo alchemico primario. Esigi una parità assoluta e viscerale: qualsiasi tentativo dell'altro di stabilire una gerarchia o un controllo patriarcale attiva un'espulsione immediata e senza ritorno.`;
    } else {
      relationalThrust = `Lilith non presidia le case di coppia convenzionali, ma irradia la sua sovranità a partire da Casa ${lilith.house}. Nelle relazioni non porti il bisogno della mendicante affettiva: entri nel legame solo se l'altro non ostacola la tua padronanza in ${hMeta.realm}.`;
    }

    let eroticWiring = '';
    if (connections.venus) {
      const vOrb = connections.venus.orb.toFixed(2);
      if (connections.venus.isHard) {
        eroticWiring += `<p><strong>Attrito Erotico Venere-Lilith (${connections.venus.aspect_it}, orbe ${vOrb}°):</strong> Si manifesta una frattura tra il desiderio sociale di piacere/armonizzare (Venere) e la brama lilithiana di verità nuda e non compiacente. Non puoi accontentarti di un'attrazione da cartolina: hai bisogno di un patto carnale ed estetico in cui la tua ombra sia venerata, non tollerata.</p>`;
      } else if (connections.venus.isConj) {
        eroticWiring += `<p><strong>Fusione Venere-Lilith (Congiunzione, orbe ${vOrb}°):</strong> Fascino ipnotico e magnetismo primordiale indivisibili. La tua grazia seduce proprio perché porta in sé il profumo del pericolo e del divieto: chi si avvicina percepisce che la tua bellezza non è un oggetto di consumo ma una regalità autonoma.</p>`;
      } else {
        eroticWiring += `<p><strong>Alleanza Venere-Lilith (${connections.venus.aspect_it}, orbe ${vOrb}°):</strong> Armonia naturale tra l'eros e la sovranità. Il piacere carnale diventa una via regia di consacrazione personale: non vivi il desiderio con colpa ma con regale padronanza.</p>`;
      }
    }

    if (connections.mars) {
      const mOrb = connections.mars.orb.toFixed(2);
      if (connections.mars.isHard) {
        eroticWiring += `<p><strong>Tensione Marziale Marte-Lilith (${connections.mars.aspect_it}, orbe ${mOrb}°):</strong> Scontro alchemico tra la volontà cinetica di conquista (Marte) e l'indipendenza viscerale di Lilith. Nelle dinamiche intime il confine tra passione e contesa di comando è millimetrico: se l'altro tenta di dominarti, scatta una risposta d'attacco devastante. La sfida è trasformare questa rivalità in intensità tantrica condivisa.</p>`;
      } else if (connections.mars.isConj) {
        eroticWiring += `<p><strong>Fusione Marte-Lilith (Congiunzione, orbe ${mOrb}°):</strong> Un vulcano di istinto guerriero e lussuria sacra. Il tuo corpo non tollera esitazioni: l'atto sessuale ed erotico è un rito di combustione e di pura potenza.</p>`;
      } else {
        eroticWiring += `<p><strong>Flusso Marte-Lilith (${connections.mars.aspect_it}, orbe ${mOrb}°):</strong> Sinergia invincibile tra desiderio d'azione e fiamma primordiale. Sai esattamente cosa vuoi e quando andartene, senza esitazioni o rimpianti passivi.</p>`;
      }
    }

    let absenceRelational = '';
    if (!connections.venus && !connections.mars && !isRelationalHouse) {
      absenceRelational = `<p class="synthesis-absence"><em>Nota di Rigore Iniziatico:</em> Nel tuo tema natale Lilith non forma aspetti maggiori stretti con Venere o Marte, né occupa le case del legame contrattuale (Casa 7 o 8). Questo indica che la tua ferita di sovranità <strong>non è dipendente dalla convalida di un partner</strong>: non cerchi nell'altro chi ti salvi o chi ti confermi la tua regalità, preservando la tua vita affettiva da complessi drammi proiettivi.</p>`;
    }

    const relazioniHtml = `
      <div class="lilith-synthesis-card relazioni-card">
        <div class="synthesis-badge">🍷 CAPITOLO II • RELAZIONI &amp; DINAMICHE DI LEGAME</div>
        <h4 class="synthesis-title">Lo Specchio dell'Altro, l'Eros Sacro &amp; i Confini Inviolabili</h4>
        <div class="synthesis-body">
          <p>${relationalThrust}</p>
          ${eroticWiring}
          ${absenceRelational}
          <div class="synthesis-boundary-box">
            <strong>Il Patto Iniziatico di Coppia:</strong>
            <span>Chiunque desideri condividere il tuo cammino deve sottoscrivere una clausola aurea: non esigere mai la tua sottomissione, né chiederti di spegnere la tua intensità per rasserenare le proprie insicurezze. Un'unione con te è un patto tra sovrani o non è nulla.</span>
          </div>
        </div>
      </div>
    `;

    // -------------------------------------------------------------
    // CAPITOLO III: CONFLITTI, FRATTURE & PUNTI DI TENSIONE (L'Ombra)
    // -------------------------------------------------------------
    let hardAspectsNarrative = '';

    if (tightHard.length > 0) {
      hardAspectsNarrative = `<ul class="synthesis-aspects-list">`;
      for (const a of tightHard) {
        const orbStr = a.orb.toFixed(2);
        const isDominant = a.tier === 1;
        let conflictDetail = '';

        if (a.otherPlanet === 'Moon') {
          conflictDetail = `Lacerazione profonda tra il bisogno emotivo-biologico di appartenenza/sicurezza (Luna) e l'imperativo ancestrale di autonomia non negoziabile (Lilith). La tentazione d'ombra è oscillare tra l'isolamento feroce e la reazione infantile quando ci si sente esposti.`;
        } else if (a.otherPlanet === 'Sun') {
          conflictDetail = `Attrito tra la volontà cosciente/ruolo solare (Sole) e la pulsione viscerale dell'Ombra (Lilith). L'ego può temere che rivelare la propria vera intensità porti all'esilio sociale o al rifiuto paterno/autoritario.`;
        } else if (a.otherPlanet === 'Saturn') {
          conflictDetail = `Assedio della struttura patriarcale e del senso di colpa (Saturno) contro la sovranità indomita (Lilith). La trappola è imporsi una severità autodistruttiva o credere di dover espiare una colpa ancestrale per il solo fatto di esistere con potenza.`;
        } else if (a.otherPlanet === 'Pluto') {
          conflictDetail = `Guerra nucleare negli abissi psichici (Plutone-Lilith): dinamiche ossessive, paura del tradimento totale e terrore di essere manipolati. Il rischio è bruciare ogni ponte al primo sospetto invece di padroneggiare la trasmutazione.`;
        } else if (a.otherPlanet === 'Mercury') {
          conflictDetail = `Cortocircuito tra la mente logica verbale (Mercurio) e l'istinto primigenio (Lilith): la parola rischia di diventare una lama cinica usata per ferire prima di essere feriti.`;
        } else {
          conflictDetail = `Attrito dinamico di ${a.aspect_it} con ${a.otherPlanetIt}: questa forza celeste contesta a Lilith il controllo del campo di coscienza, generando un banco di prova dove non sono ammesse mezze misure.`;
        }

        hardAspectsNarrative += `
          <li class="synthesis-aspect-item ${isDominant ? 'dominant-aspect' : ''}">
            <div class="aspect-header">
              <span class="aspect-badge-hard">${isDominant ? '⚡ SCONTRO DOMINANTE (<1.8°)' : '⚔️ ATTRITO ATTIVO'}</span>
              <strong>Lilith ${a.aspect_it} ${a.otherPlanetIt}</strong> (Orbe: ${orbStr}°)
            </div>
            <p class="aspect-desc">${conflictDetail}</p>
          </li>
        `;
      }
      hardAspectsNarrative += `</ul>`;
    } else {
      hardAspectsNarrative = `
        <div class="synthesis-empty-friction">
          <span class="empty-icon">🛡️</span>
          <p>
            <strong>Nessuna Lacerazione Diretta nel Tema:</strong> Lilith non forma quadrature o opposizioni serrate con i pianeti maggiori.
            La tua ombra primordiale non è in guerra civile con la tua coscienza solare né con la tua emotività lunare.
            Il punto di tensione non deriva quindi da un sabotaggio interno, ma dal divario inevitabile tra la tua naturalezza regale e la mediocrità del mondo esterno, che spesso non sa come contenere una forza così lucida e non frammentata.
          </p>
        </div>
      `;
    }

    const conflittiHtml = `
      <div class="lilith-synthesis-card conflitti-card">
        <div class="synthesis-badge">⚔️ CAPITOLO III • CONFLITTI, FRATTURE &amp; PUNTI DI TENSIONE</div>
        <h4 class="synthesis-title">Il Crogiolo Iniziatico &amp; La Trappola della Reattività d'Ombra</h4>
        <div class="synthesis-body">
          <p class="synthesis-lead">
            La vera regalità di Lilith non si dimostra nell'assenza di conflitto, ma nella capacità di non farsi avvelenare
            dalle proprie stesse armi difensive. Ecco dove la geometria celeste genera il massimo attrito:
          </p>
          ${hardAspectsNarrative}
        </div>
      </div>
    `;

    // -------------------------------------------------------------
    // CAPITOLO IV: RISORSE & ALCHIMIA DI TRASMUTAZIONE
    // -------------------------------------------------------------
    let softAspectsNarrative = '';

    if (tightSoft.length > 0 || conjunctions.length > 0) {
      const favorableList = [...tightSoft, ...conjunctions.filter(c => !['Moon', 'Saturn'].includes(c.otherPlanet))];
      softAspectsNarrative = `<ul class="synthesis-aspects-list">`;
      for (const a of favorableList) {
        const orbStr = a.orb.toFixed(2);
        let alchDetail = '';

        if (a.otherPlanet === 'Pluto') {
          alchDetail = `Capacità sciamanica di rigenerazione totale: puoi discendere nelle ceneri delle situazioni più tossiche ed emergerne con un'autorevolezza raddoppiata. Il tuo sguardo penetra qualsiasi finzione.`;
        } else if (a.otherPlanet === 'Jupiter') {
          alchDetail = `Magia espansiva e autorevolezza filosofica: la tua emancipazione non resta sterile ribellione, ma diventa un faro e un insegnamento che ispira gli altri a spezzare le proprie catene.`;
        } else if (a.otherPlanet === 'Uranus') {
          alchDetail = `Genialità ribelle e chiaroveggenza strategica: capacità di tagliare schemi obsoleti con la velocità della folgore, anticipando i tempi storici e i condizionamenti sociali.`;
        } else if (a.otherPlanet === 'Neptune') {
          alchDetail = `Grazia mistica e intuito ipnotico: capacità di incanalare l'ombra nell'arte sacra, nella visione trascendente e nella poesia occulta.`;
        } else if (a.otherPlanet === 'Sun') {
          alchDetail = `Allineamento regale: la tua volontà cosciente e il tuo istinto primigenio coincidono. Irradi una presenza magnetica che non ha bisogno di giustificarsi.`;
        } else {
          alchDetail = `Canale alchemico privilegiato: ${a.otherPlanetIt} agisce come alleato devoto della tua fiamma di Lilith, offrendoti una leva di potere naturale in ${hMeta.realm}.`;
        }

        softAspectsNarrative += `
          <li class="synthesis-aspect-item resource-aspect">
            <div class="aspect-header">
              <span class="aspect-badge-soft">🗝️ LEVA ALCHEMICA (${a.tier <= 1 ? 'PRIMARIA' : 'ATTIVA'})</span>
              <strong>Lilith ${a.aspect_it} ${a.otherPlanetIt}</strong> (Orbe: ${orbStr}°)
            </div>
            <p class="aspect-desc">${alchDetail}</p>
          </li>
        `;
      }
      softAspectsNarrative += `</ul>`;
    } else {
      softAspectsNarrative = `
        <div class="synthesis-resource-pure">
          <p>
            La tua leva alchemica principale non risiede in scorciatoie planetarie, ma nella <strong>purezza incontaminata della tua Lilith in ${sMeta.it}</strong>.
            Operando senza condizionamenti esterni, la trasmutazione avviene direttamente attraverso la fedeltà adamantina al tuo codice d'onore in ${hMeta.realm}:
            trasformare ogni tentativo di denigrazione in pietra angolare della tua indipendenza.
          </p>
        </div>
      `;
    }

    const risorseHtml = `
      <div class="lilith-synthesis-card risorse-card">
        <div class="synthesis-badge">🗝️ CAPITOLO IV • RISORSE &amp; ALCHIMIA DI TRASMUTAZIONE</div>
        <h4 class="synthesis-title">Dalla Ferita alla Corona: I Canali di Potere Iniziatico</h4>
        <div class="synthesis-body">
          <p class="synthesis-lead">
            L'alchimia lilithiana insegna che ciò che il mondo chiama 'ombra' o 'scandalo' è in verità piombo grezzo pronto a farsi oro.
            Le geometrie armoniche e i vettori di potenza del tuo cielo offrono leve esplicite per forgiare il tuo scettro:
          </p>
          ${softAspectsNarrative}
        </div>
      </div>
    `;

    // -------------------------------------------------------------
    // CAPITOLO V: SINTESI INTEGRATIVA OPERATIVA (I 3 DECRETI DEL CANONE)
    // -------------------------------------------------------------
    let decretoRecidere = '';
    let decretoConsacrare = '';
    let formulaSovrana = '';

    if (sMeta.it === 'Scorpione' || lilith.house === 8) {
      decretoRecidere = "Recidi immediatamente la dipendenza dal controllo ossessivo e il sospetto paranoico. Non confondere l'allerta vigile con la tortura interiore: chi non è degno della tua fiducia non va perseguitato né spiato, va semplicemente allontanato per sempre dal tuo regno.";
      decretoConsacrare = "Consacra la tua chiaroveggenza viscerale e il potere del silenzio. Il tuo grembo psichico è un santuario trasmutativo: usalo per rigenerarti nell'abisso senza permettere a nessuno di profanare il tuo mistero.";
      formulaSovrana = "«Io attraverso il fuoco della notte e rinasco integra: ciò che non mi distrugge mi incorona.»";
    } else if (sMeta.it === 'Ariete' || lilith.house === 1) {
      decretoRecidere = "Recidi la reattività cieca e la guerra continua contro i mulini a vento. Non sprecare la tua fiamma regale in battibecchi sterili o in difese premature: la tua presenza parla da sé.";
      decretoConsacrare = "Consacra la tua audacia d'avanguardia e il diritto inviolabile di esistere per prima, senza chiedere scusa né permesso ad alcuno.";
      formulaSovrana = "«Io sono la fiamma che apre la via: non cammino dietro nessuno, non mi inchino a nessuno.»";
    } else if (sMeta.it === 'Toro' || lilith.house === 2) {
      decretoRecidere = "Recidi l'attaccamento a situazioni o relazioni morte mantenute solo per pigrizia, paura della privazione o falsa comodità economica.";
      decretoConsacrare = "Consacra la tua autosufficienza materiale e l'inviolabilità del tuo tempio carnale: la tua autostima è una fortezza che nessun prezzo può comprare.";
      formulaSovrana = "«Il mio valore è sacro e inalienabile: nessuno mercanteggia con la mia terra sacra.»";
    } else if (sMeta.it === 'Gemelli' || lilith.house === 3) {
      decretoRecidere = "Recidi la frammentazione nel chiacchiericcio sterile e l'uso dell'ironia cinica come scudo per non mostrare la tua verità più densa.";
      decretoConsacrare = "Consacra il potere del tuo Verbo: trasforma la tua parola in una chiave iniziatica capace di nominare ciò che gli altri tacciono per paura.";
      formulaSovrana = "«La mia lingua è una lama d'oro: disintegro la menzogna con la precisione del Vero.»";
    } else if (sMeta.it === 'Cancro' || lilith.house === 4) {
      decretoRecidere = "Recidi il ricatto affettivo, il senso di colpa tramandato dal clan materno e la paura ancestrale di essere considerata la 'figlia cattiva'.";
      decretoConsacrare = "Consacra il tuo focolare intimo come spazio inviolabile di nutrimento magico: sii madre e protettrice assoluta della tua sovranità.";
      formulaSovrana = "«Io spezzo la catena del sangue obbediente: custodisco solo il patto della mia verità interiore.»";
    } else if (sMeta.it === 'Leone' || lilith.house === 5) {
      decretoRecidere = "Recidi la dipendenza dal plauso esterno e la ferita dell'orgoglio non applaudito: la regina regna anche nel deserto più solitario.";
      decretoConsacrare = "Consacra la tua creatività erotica e la regalità del tuo cuore generoso: splendi per il solo godimento di bruciare, non per elemosinare sguardi.";
      formulaSovrana = "«Il mio splendore non chiede pubblico: io sono la fiamma che illumina il mio stesso tempio.»";
    } else if (sMeta.it === 'Vergine' || lilith.house === 6) {
      decretoRecidere = "Recidi l'ansia maniacale di perfezionismo e l'illusione di dover servire o sacrificarti per meritare il tuo posto nel cosmo.";
      decretoConsacrare = "Consacra la tua maestria chirurgica e l'ecologia del tuo corpo: fai di ogni rito quotidiano un atto di purificazione e potere.";
      formulaSovrana = "«Io non sono la serva di nessuno: la mia disciplina è il rito sacro della mia sovranità.»";
    } else if (sMeta.it === 'Bilancia' || lilith.house === 7) {
      decretoRecidere = "Recidi il compromesso disonorevole stipulato per paura del conflitto o dell'isolamento: la pace comprata al prezzo della tua dignità è veleno puro.";
      decretoConsacrare = "Consacra il patto di parità adamantina: accetta al tuo fianco solo chi è in grado di sostenere il tuo sguardo senza abbassare gli occhi.";
      formulaSovrana = "«Non c'è alleanza senza rispetto totale: io scelgo solo chi riconosce la mia corona.»";
    } else if (sMeta.it === 'Sagittario' || lilith.house === 9) {
      decretoRecidere = "Recidi il dogmatismo presuntuoso e la fuga nell'astrazione teorica per non misurarti con le responsabilità carnali del presente.";
      decretoConsacrare = "Consacra la tua sete eretica di grandi orizzonti e la libertà del tuo spirito nomade: viaggia verso la verità che libera, mai verso quella che imprigiona.";
      formulaSovrana = "«Nessun dogma può recintare il mio cielo: io cerco solo la Verità che rende sovrani.»";
    } else if (sMeta.it === 'Capricorno' || lilith.house === 10) {
      decretoRecidere = "Recidi il gelo emotivo difensivo e il bisogno di conformarti ai titoli e alle gerarchie del sistema per sentirti al sicuro.";
      decretoConsacrare = "Consacra la tua autorità incorruttibile: costruisci un'opera duratura che sfidi il tempo, fondata unicamente sulla tua etica interiore.";
      formulaSovrana = "«Io non salgo sul trono concesso da altri: io erigo la mia vetta pietra su pietra.»";
    } else if (sMeta.it === 'Acquario' || lilith.house === 11) {
      decretoRecidere = "Recidi il distacco cerebrale asettico e l'illusione che l'anticonformismo teorico basti a renderti libera senza sporcarti le mani con la vita viva.";
      decretoConsacrare = "Consacra la tua visione d'avanguardia e la sorellanza con le anime audaci: apri varchi nel futuro per chi non ha ancora voce.";
      formulaSovrana = "«Io sono l'anomalia sacra che infrange la prigione: la mia libertà è la mia unica legge.»";
    } else {
      decretoRecidere = "Recidi il fardello del vittimismo, la tentazione di fare da crocerossina ai carnefici e la confusione dei confini psichici.";
      decretoConsacrare = "Consacra la tua solitudine mistica e la chiaroveggenza oceanica: fa' del tuo silenzio la sorgente da cui sgorga ogni miracolo vitale.";
      formulaSovrana = "«Io nuoto negli abissi senza annegare: la mia vulnerabilità è il canale del mio potere infinito.»";
    }

    const sintesiHtml = `
      <div class="lilith-synthesis-card sintesi-card">
        <div class="synthesis-badge">📜 CAPITOLO V • SINTESI INTEGRATIVA OPERATIVA</div>
        <h4 class="synthesis-title">I Tre Decreti Non Negoziabili del Canone di Lilith</h4>
        <div class="synthesis-body">
          <p class="synthesis-lead">
            L'astrologia iniziatica non è un oracolo passivo: è una chiamata alle armi della coscienza.
            Per sigillare questa lettura unica e integrare la tua fiamma celeste nella vita quotidiana,
            ecco i tre decreti operativi per il tuo cammino:
          </p>
          
          <div class="synthesis-decree-grid">
            <div class="decree-card decree-sever">
              <div class="decree-icon">🗡️</div>
              <h5>Decreto I • Cosa Recidere Senza Pietà</h5>
              <p>${decretoRecidere}</p>
            </div>

            <div class="decree-card decree-consecrate">
              <div class="decree-icon">🕯️</div>
              <h5>Decreto II • Cosa Consacrare &amp; Custodire</h5>
              <p>${decretoConsacrare}</p>
            </div>

            <div class="decree-card decree-formula">
              <div class="decree-icon">👑</div>
              <h5>Decreto III • La Formula di Sovranità</h5>
              <p class="formula-quote">${formulaSovrana}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    return {
      profile: profile,
      html: `
        <div class="lilith-unified-synthesis-wrapper">
          <div class="synthesis-engine-header">
            <span class="synthesis-tag">🏛️ CANONE CODEX ASTRA &amp; FIGLIE DI LILITH</span>
            <h3>Motore di Lettura Sintetica Unificata a 5 Dimensioni</h3>
            <p class="synthesis-subtitle">
              Un'unica visione organica, senza ripetizioni né frammentazioni. Geometria astronomica pesata per orbi stretti,
              angolarità e governatore del segno, trasmutata in liturgia di sovranità non negoziabile.
            </p>
          </div>

          <div class="synthesis-chapters-container">
            ${nucleoHtml}
            ${relazioniHtml}
            ${conflittiHtml}
            ${risorseHtml}
            ${sintesiHtml}
          </div>
        </div>
      `,
      chapters: {
        nucleo: nucleoHtml,
        relazioni: relazioniHtml,
        conflitti: conflittiHtml,
        risorse: risorseHtml,
        sintesi: sintesiHtml
      }
    };
  }

  window.extractLilithProfile = extractLilithProfile;
  window.generateUnifiedLilithReading = generateUnifiedLilithReading;

  // METODO PRINCIPALE ESPORTO: calcolo autonomo natal chart
  /**
   * Assembla il tema natale a partire dal risultato grezzo di Swiss Ephemeris.
   * `swiss` è l'oggetto restituito da calculate() in js/swiss-precision.mjs:
   * { jd, positions, speeds, cusps[12], angles[10], isDiurnal, utc, timezone,
   *   offset, tzVersion, version, warnings }.
   * Questo modulo non esegue alcun calcolo astronomico proprio.
   */
  function assembleChart(swiss, req) {
    const rawPositions = Object.assign({}, swiss.positions);

    // Alias storici usati dai motori interpretativi
    rawPositions['Lilith Media'] = swiss.positions.Lilith;
    rawPositions['Lilith (Vera)'] = swiss.positions.TrueLilith;
    rawPositions['Nodo Nord'] = swiss.positions.TrueNode;

    // 2. Case e angoli (cuspidi Swiss per il sistema richiesto)
    const housesData = buildHousesData(swiss.cusps, swiss.angles);

    // 3. Pars Fortunae — diurno/notturno dall'altitudine geometrica reale del
    // Sole calcolata da Swiss, indipendente dal sistema di case scelto.
    const sunLon = rawPositions.Sun;
    const moonLon = rawPositions.Moon;
    const ascLon = housesData.angles.ascendant.longitude;
    const isDiurnal = swiss.isDiurnal;
    rawPositions.ParsFortunae = norm360(
      isDiurnal ? (ascLon + moonLon - sunLon) : (ascLon + sunLon - moonLon)
    );

    // 4. Vertex
    rawPositions.Vertex = housesData.angles.vertex.longitude;

    // 5. Array Pianeti formattato conforme allo schema dell'UI
    const PLANET_ORDER = [
      { name: 'Sun', itName: 'Sole', cat: 'planet' },
      { name: 'Moon', itName: 'Luna', cat: 'planet' },
      { name: 'Mercury', itName: 'Mercurio', cat: 'planet' },
      { name: 'Venus', itName: 'Venere', cat: 'planet' },
      { name: 'Mars', itName: 'Marte', cat: 'planet' },
      { name: 'Jupiter', itName: 'Giove', cat: 'planet' },
      { name: 'Saturn', itName: 'Saturno', cat: 'planet' },
      { name: 'Uranus', itName: 'Urano', cat: 'planet' },
      { name: 'Neptune', itName: 'Nettuno', cat: 'planet' },
      { name: 'Pluto', itName: 'Plutone', cat: 'planet' },
      { name: 'Lilith', itName: 'Lilith Media', cat: 'point' },
      { name: 'TrueLilith', itName: 'Lilith (Vera)', cat: 'point' },
      { name: 'TrueNode', itName: 'Nodo Nord', cat: 'point' },
      { name: 'Chiron', itName: 'Chirone', cat: 'centaur' },
      { name: 'Ceres', itName: 'Cerere', cat: 'asteroid' },
      { name: 'Pallas', itName: 'Pallade', cat: 'asteroid' },
      { name: 'Juno', itName: 'Giunone', cat: 'asteroid' },
      { name: 'Vesta', itName: 'Vesta', cat: 'asteroid' },
      { name: 'ParsFortunae', itName: 'Punto di Fortuna', cat: 'arabic_part' },
      { name: 'Vertex', itName: 'Vertex', cat: 'point' }
    ];

    const planets = [];
    for (const item of PLANET_ORDER) {
      const lon = rawPositions[item.name];
      if (lon === undefined) continue;
      const sInfo = getSignFromLongitude(lon);
      const hNum = getPlanetHouse(lon, housesData.cusps);
      const dig = getEssentialDignity(item.name, sInfo.sign);

      // Stato retrogrado dalla velocità in longitudine restituita da Swiss.
      let isRetro = false;
      const speed = swiss.speeds[item.name];
      if (typeof speed === 'number' && Number.isFinite(speed)) {
        isRetro = speed < 0;
      }
      if (['Sun', 'Moon', 'ParsFortunae', 'Vertex'].includes(item.name)) {
        isRetro = false;
      }

      planets.push({
        name: item.name,
        it_name: item.itName,
        longitude: lon,
        sign: sInfo.sign,
        sign_it: sInfo.sign_it,
        sign_degree: sInfo.degree,
        sign_minute: sInfo.minute,
        formatted: sInfo.formatted,
        house: hNum,
        is_retrograde: isRetro,
        dignity: dig,
        category: item.cat
      });
    }

    // 6. Aspetti
    const aspects = calculateAspects(planets);

    // 7. Dominanze & Firma
    const domSig = calculateDominanceAndSignature(planets, aspects);

    // 8. Interpretazione Operativa 7/8 punti
    const interpretation = generateOperationalInterpretation(planets, aspects);

    // 9. Rilettura Lilithiana di Dominio ed Eros Oscuro
    const darkReading = generateLilithDarkInterpretation(planets, aspects, housesData, domSig);

    // 10. Karma & Destino Sovrano (Patto d'Incarnazione, Nodi Lunari, Saturno, Plutone, Lilith, Vertex)
    const karmaDestiny = generateLilithKarmaDestiny(planets, aspects, housesData, domSig);

    // 11. Motore di Lettura Sintetica Unificata a 5 Dimensioni (Canone Codex Astra & Figlie di Lilith)
    const unifiedReading = generateUnifiedLilithReading(planets, aspects, housesData, domSig);

    return {
      planets: planets,
      houses: housesData,
      aspects: aspects,
      patterns: [],
      dominant_element: domSig.dominant_element,
      dominant_modality: domSig.dominant_modality,
      chart_signature: domSig.chart_signature,
      element_balance: domSig.element_balance,
      modality_balance: domSig.modality_balance,
      planetary_dominance: domSig.planetary_dominance,
      interpretation: interpretation,
      dark_reading: darkReading,
      karma_destiny: karmaDestiny,
      unified_reading: unifiedReading,
      utc_datetime: swiss.utc,
      julian_day: swiss.jd,
      is_diurnal: isDiurnal,
      ephemeris: {
        engine: 'Swiss Ephemeris',
        version: swiss.version,
        timezone: swiss.timezone,
        utc_offset: swiss.offset,
        tz_database: swiss.tzVersion,
        house_system: req.house_system || 'P',
        warnings: swiss.warnings || []
      }
    };
  }

  window.LilithEngine = {
    assembleChart: assembleChart,
    buildHousesData: buildHousesData,
    getSignFromLongitude: getSignFromLongitude,
    getPlanetHouse: getPlanetHouse,
    norm360: norm360
  };

})(window);
