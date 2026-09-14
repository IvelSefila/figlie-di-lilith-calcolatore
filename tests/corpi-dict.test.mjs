import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Regole di qualità del dizionario esegetico dei corpi: valgono per Marte
// oggi e per ogni corpo che verrà aggiunto dopo.
const window = {};
const context = vm.createContext({ window, console });
vm.runInContext(readFileSync(new URL('../wordpress-child-theme/js/calcolatore-corpi-dict.js', import.meta.url), 'utf8'), context, { filename: 'calcolatore-corpi-dict.js' });

const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const HOUSES = Array.from({ length: 12 }, (_, i) => i + 1);
// Deve restare allineata a DIGNITIES in calcolatore-engine.js.
const DIGNITIES = {
  Sun: { Domicilio: ['Leo'], Esaltazione: ['Aries'], Esilio: ['Aquarius'], Caduta: ['Libra'] },
  Moon: { Domicilio: ['Cancer'], Esaltazione: ['Taurus'], Esilio: ['Capricorn'], Caduta: ['Scorpio'] },
  Mercury: { Domicilio: ['Gemini', 'Virgo'], Esaltazione: ['Virgo'], Esilio: ['Sagittarius', 'Pisces'], Caduta: ['Pisces'] },
  Venus: { Domicilio: ['Taurus', 'Libra'], Esaltazione: ['Pisces'], Esilio: ['Aries', 'Scorpio'], Caduta: ['Virgo'] },
  Mars: { Domicilio: ['Aries', 'Scorpio'], Esaltazione: ['Capricorn'], Esilio: ['Taurus', 'Libra'], Caduta: ['Cancer'] },
  Jupiter: { Domicilio: ['Sagittarius', 'Pisces'], Esaltazione: ['Cancer'], Esilio: ['Gemini', 'Virgo'], Caduta: ['Capricorn'] },
  Saturn: { Domicilio: ['Capricorn', 'Aquarius'], Esaltazione: ['Libra'], Esilio: ['Cancer', 'Leo'], Caduta: ['Aries'] }
};

const dict = window.LILITH_BODY_DICT;
const bodies = Object.entries(dict);

// Ogni blocco è una coppia [etichetta, testo]: i due registri di una sintesi
// contano come blocchi distinti, così nessuno dei due può parafrasare l'altro.
const blocksOf = body => [
  ...Object.entries(body.signs || {}).map(([k, v]) => [`segno ${k}`, v.text]),
  ...Object.entries(body.houses || {}).map(([k, v]) => [`casa ${k}`, v.text]),
  ...Object.entries(body.dignities || {}).map(([k, v]) => [`dignità ${k}`, v.text]),
  ...Object.entries(body.combinations || {}).flatMap(([k, v]) => [
    [`sintesi ${k} · canonico`, v.canonico],
    [`sintesi ${k} · lilithiano`, v.lilithiano]
  ]),
  ...(body.retrograde ? [['retrogrado', body.retrograde.text]] : [])
];

const titlesOf = body => [
  ...Object.values(body.signs || {}),
  ...Object.values(body.houses || {}),
  ...Object.values(body.dignities || {}),
  ...Object.values(body.combinations || {}),
  ...(body.retrograde ? [body.retrograde] : [])
].map(v => v.title);

test('il dizionario espone almeno un corpo e la funzione di lookup', () => {
  assert.ok(bodies.length > 0);
  assert.equal(typeof window.getLilithBodyLayers, 'function');
});

for (const [name, body] of bodies) {
  test(`${name}: copertura completa di segni, case e dignità`, () => {
    for (const sign of SIGNS) assert.ok(body.signs?.[sign], `manca il segno ${sign}`);
    for (const house of HOUSES) assert.ok(body.houses?.[house], `manca la casa ${house}`);
    const expected = DIGNITIES[name];
    if (expected) {
      const wanted = Object.values(expected).flat();
      for (const sign of wanted) assert.ok(body.dignities?.[sign], `manca la dignità in ${sign}`);
      for (const [sign, entry] of Object.entries(body.dignities || {})) {
        assert.ok(expected[entry.kind]?.includes(sign), `${sign} dichiarato ${entry.kind}, incoerente con il motore`);
      }
    } else {
      assert.equal(Object.keys(body.dignities || {}).length, 0, 'dignità dichiarate per un corpo che non ne ha');
    }
  });

  test(`${name}: ogni voce ha titolo, testo e sintesi non vuoti`, () => {
    const entries = [
      ...Object.entries(body.signs || {}).map(([k, v]) => [`segno ${k}`, v]),
      ...Object.entries(body.houses || {}).map(([k, v]) => [`casa ${k}`, v]),
      ...Object.entries(body.dignities || {}).map(([k, v]) => [`dignità ${k}`, v]),
      ...(body.retrograde ? [['retrogrado', body.retrograde]] : [])
    ];
    for (const [label, entry] of entries) {
      for (const field of ['title', 'text', 'sintesi']) {
        assert.ok(typeof entry[field] === 'string' && entry[field].trim().length > 0, `${label}: campo ${field} mancante`);
      }
      assert.ok(entry.text.split(/\s+/).length >= 55, `${label}: testo troppo breve per una lettura completa`);
    }
    for (const [key, entry] of Object.entries(body.combinations || {})) {
      assert.match(key, /^[A-Z][a-z]+\|(?:[1-9]|1[0-2])$/, `chiave sintesi non valida: ${key}`);
      for (const field of ['title', 'canonico', 'lilithiano', 'sintesi']) {
        assert.ok(typeof entry[field] === 'string' && entry[field].trim().length > 0, `sintesi ${key}: campo ${field} mancante`);
      }
      assert.ok(entry.canonico.split(/\s+/).length >= 80, `sintesi ${key}: registro canonico troppo breve`);
      assert.ok(entry.lilithiano.split(/\s+/).length >= 80, `sintesi ${key}: registro lilithiano troppo breve`);
    }
  });

  test(`${name}: nessuna frase riciclata fra blocchi diversi`, () => {
    const seen = new Map();
    const collisions = [];
    for (const [label, text] of blocksOf(body)) {
      const words = text.toLowerCase().normalize('NFD').replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
      for (let i = 0; i + 6 <= words.length; i++) {
        const gram = words.slice(i, i + 6).join(' ');
        if (seen.has(gram) && seen.get(gram) !== label) collisions.push(`«${gram}» in ${seen.get(gram)} e ${label}`);
        else seen.set(gram, label);
      }
    }
    assert.deepEqual(collisions, [], 'sequenze identiche riusate fra blocchi');
  });

  // Il calcolatore si rivolge a chi legge senza presumerne il genere: in
  // italiano il punto debole sono i participi e gli aggettivi che concordano
  // con il soggetto della seconda persona. Le eccezioni ammesse sono quelle
  // in cui la concordanza riguarda un sostantivo del testo, non chi legge.
  const GENDER_PATTERNS = [
    /\bt[eu]\s+stess[oa]\b/gi,
    // Participi regolari e irregolari: «ti sei mossa», «sei costretta»,
    // «sei protetto» concordano tutti con chi legge.
    /\b(?:ti\s+)?(?:sei|eri|sarai|saresti|fossi)\s+(?:mai\s+|già\s+|sempre\s+|poi\s+)?[a-zà-ùA-ZÀ-Ù]+(?:at[oa]|ut[oa]|is[oa]|ss[oa]|st[oa]|nt[oa]|lt[oa]|tt[oa])\b/gi,
    /\bti\s+(?:hanno|ha|avevano|aveva|avranno|avrà)\s+(?:mai\s+|già\s+)?[a-zà-ùA-ZÀ-Ù]+(?:ata|ate|ati)\b/gi,
    /\b(?:ancora|già|sempre)\s+(?:viv[oa]|sol[oa]|stanc[oa]|pront[oa]|liber[oa]|sicur[oa])\b/gi,
    /\bdiventare\s+[a-zà-ù]+(?:iva|ivo|osa|oso)\b/gi
  ];
  const GENDER_ALLOWED = [
    // La concordanza cade su un sostantivo del testo, non su chi legge.
    'essere minacciato',   // → qualcuno
    'essere sbagliata',    // → una direzione
    'essere esercitata',   // → la forza
    'essere usata'         // → la forza
  ];

  test(`${name}: il testo non presume il genere di chi legge`, () => {
    const found = [];
    for (const [label, text] of blocksOf(body)) {
      for (const pattern of GENDER_PATTERNS) {
        for (const match of text.match(pattern) || []) {
          if (!GENDER_ALLOWED.some(ok => match.toLowerCase().includes(ok))) {
            found.push(`${label}: «${match.trim()}»`);
          }
        }
      }
    }
    assert.deepEqual(found, [], 'forme marcate al maschile o al femminile rivolte a chi legge');
  });

  test(`${name}: i titoli sono tutti distinti`, () => {
    const titles = titlesOf(body);
    assert.equal(new Set(titles).size, titles.length, 'titoli duplicati');
  });
}

// ===========================================================================
// Controlli globali.
//
// Le regole per corpo sopra non bastano: una formula di raccordo distribuita
// su corpi diversi le supera tutte pur essendo esattamente il difetto che
// questo dizionario esiste per eliminare. Questi controlli guardano l'opera
// intera e per strato omogeneo.
// ===========================================================================

const LAYERS = { segni: [], case: [], dignità: [], retrogradi: [], 'sintesi · canonico': [], 'sintesi · lilithiano': [] };
for (const [name, body] of bodies) {
  for (const [k, v] of Object.entries(body.signs || {})) LAYERS.segni.push([`${name}/${k}`, v.text]);
  for (const [k, v] of Object.entries(body.houses || {})) LAYERS.case.push([`${name}/casa ${k}`, v.text]);
  for (const [k, v] of Object.entries(body.dignities || {})) LAYERS['dignità'].push([`${name}/${k}`, v.text]);
  if (body.retrograde) LAYERS.retrogradi.push([`${name}`, body.retrograde.text]);
  for (const [k, v] of Object.entries(body.combinations || {})) {
    LAYERS['sintesi · canonico'].push([`${name}/${k}`, v.canonico]);
    LAYERS['sintesi · lilithiano'].push([`${name}/${k}`, v.lilithiano]);
  }
}
const ALL_BLOCKS = Object.values(LAYERS).flat();
const words = text => text.toLowerCase().normalize('NFD').replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);

// Dentro un corpo la soglia è 6 parole (regola per corpo, sopra). Fra corpi
// diversi si allenta a 8: il lessico tecnico della tradizione — «il luogo dei
// nemici occulti», «in domicilio notturno» — ricorre legittimamente, otto
// parole identiche no.
test('nessuna formula riciclata fra corpi diversi', () => {
  const seen = new Map();
  const collisions = [];
  for (const [label, text] of ALL_BLOCKS) {
    const ws = words(text);
    for (let i = 0; i + 8 <= ws.length; i++) {
      const gram = ws.slice(i, i + 8).join(' ');
      if (seen.has(gram) && seen.get(gram) !== label) collisions.push(`«${gram}» in ${seen.get(gram)} e ${label}`);
      else seen.set(gram, label);
    }
  }
  assert.deepEqual(collisions.slice(0, 20), [], `${collisions.length} sequenze di 8 parole riusate fra corpi diversi`);
});

// Un incipit che si ripete è uno stampo. La soglia scala con la dimensione
// dello strato ma non scende mai sotto 2 né sale sopra 8: in 16 retrogradi
// tre aperture uguali sono già una formula, e in 2.880 sintesi un tetto
// percentuale lascerebbe passare centinaia di aperture identiche.
test('gli incipit non seguono uno stampo', () => {
  const offenders = [];
  for (const [layer, blocks] of Object.entries(LAYERS)) {
    if (blocks.length < 3) continue;
    const limit = Math.min(Math.max(2, Math.ceil(blocks.length * 0.10)), 8);
    const counts = new Map();
    for (const [, text] of blocks) {
      const key = words(text).slice(0, 3).join(' ');
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    for (const [key, n] of counts) {
      if (n > limit) offenders.push(`${layer}: «${key}…» apre ${n} blocchi su ${blocks.length} (massimo ${limit})`);
    }
  }
  assert.deepEqual(offenders, [], 'aperture ripetute');
});

// Le regole sopra guardano le parole. Queste guardano l'architettura: è lì
// che lo stampo si ripresenta dopo essere stato eliminato lessicalmente,
// ruotando i sinonimi — «il rimedio classico», «la dottrina indica»,
// «l'uso alto raccomandato dagli antichi» sono la stessa mossa retorica.
const frasi = text => text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
const capLimit = n => Math.min(Math.max(2, Math.ceil(n * 0.10)), 8);

// Segni, case e dignità sono voci di un'opera di consultazione: chiudere
// nominando il rischio è una convenzione del genere, non uno stampo, e la
// loro architettura uniforme è una scelta dichiarata. Le sintesi e i
// retrogradi sono invece lettura continua: lì la ripetizione si sente.
const LAYERS_LETTURA = ['retrogradi', 'sintesi · canonico', 'sintesi · lilithiano'];

test('le ultime frasi non aprono tutte allo stesso modo', () => {
  const offenders = [];
  for (const [layer, blocks] of Object.entries(LAYERS)) {
    if (!LAYERS_LETTURA.includes(layer)) continue;
    if (blocks.length < 3) continue;
    const limit = capLimit(blocks.length);
    const counts = new Map();
    for (const [, text] of blocks) {
      const last = frasi(text).at(-1) || '';
      const key = words(last).slice(0, 2).join(' ');
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    for (const [key, n] of counts) {
      if (n > limit) offenders.push(`${layer}: la chiusura comincia con «${key}…» in ${n} blocchi su ${blocks.length} (massimo ${limit})`);
    }
  }
  assert.deepEqual(offenders, [], 'chiusure con la stessa architettura');
});

test('le seconde frasi non seguono uno stampo', () => {
  const offenders = [];
  for (const [layer, blocks] of Object.entries(LAYERS)) {
    if (!LAYERS_LETTURA.includes(layer)) continue;
    if (blocks.length < 3) continue;
    const limit = capLimit(blocks.length);
    const counts = new Map();
    for (const [, text] of blocks) {
      const second = frasi(text)[1];
      if (!second) continue;
      const key = words(second).slice(0, 3).join(' ');
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    for (const [key, n] of counts) {
      if (n > limit) offenders.push(`${layer}: la seconda frase comincia con «${key}…» in ${n} blocchi (massimo ${limit})`);
    }
  }
  assert.deepEqual(offenders, [], 'seconde frasi a stampo');
});

// La formula prescrittiva («il rimedio classico è…», «la dottrina indica…»)
// appartiene legittimamente al registro canonico: il testo di riferimento su
// Marte in Bilancia in dodicesima la usa. Diventa uno stampo quando è la
// chiusura obbligata di ogni blocco. Tetto: due blocchi su cinque.
const FORMULA_PRESCRITTIVA = /(uso alto|la dottrina|il rimedio|l['’]?insegnamento classico|il precetto|la regola aurea|la sublimazione|l['’]?eccellenza prescritt|prescritt\w* (?:dagl|dai)|raccomandat\w* (?:dagl|dai)|i maestri (?:antichi|classici)|gli interpreti storici|i testi antichi|gli esperti del|dagli studiosi)/i;
test('la formula prescrittiva non è la chiusura obbligata del canonico', () => {
  const offenders = [];
  for (const [layer, blocks] of Object.entries(LAYERS)) {
    if (blocks.length < 5) continue;
    const used = blocks.filter(([, text]) => FORMULA_PRESCRITTIVA.test(text)).length;
    const limit = Math.ceil(blocks.length * 0.40);
    if (used > limit) offenders.push(`${layer}: formula prescrittiva in ${used} blocchi su ${blocks.length} (massimo ${limit})`);
  }
  assert.deepEqual(offenders, [], 'formula prescrittiva usata come stampo');
});

test('le chiuse non si ripetono', () => {
  const offenders = [];
  for (const [layer, blocks] of Object.entries(LAYERS)) {
    const counts = new Map();
    for (const [, text] of blocks) {
      const key = words(text).slice(-4).join(' ');
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    for (const [key, n] of counts) {
      if (n > 1) offenders.push(`${layer}: «…${key}» chiude ${n} blocchi`);
    }
  }
  assert.deepEqual(offenders, [], 'chiuse identiche');
});

// I nomi di ruolo hanno un maschile e un femminile: «sei un mediatore» esclude
// metà di chi legge. Restano ammessi i nomi di genere comune (custode, ospite,
// testimone) e le metafore che designano una cosa, non una persona.
const THING_NOUNS = ['punto', 'ponte', 'specchio', 'varco', 'filtro', 'canale', 'crocevia', 'terreno', 'campo', 'luogo', 'centro', 'perno', 'confine', 'rifugio', 'archivio', 'serbatoio', 'catalizzatore', 'contenitore', 'pilastro', 'elemento', 'strumento', 'seme', 'fuoco'];
test('nessun nome di ruolo marcato al maschile rivolto a chi legge', () => {
  const offenders = [];
  const pattern = /\b(?:sei|eri|sarai|diventi|resti|rimani|sentirti)\s+(?:un|il|lo)\s+([a-zà-ù]+)\b/gi;
  for (const [label, text] of ALL_BLOCKS) {
    for (const [match, noun] of text.matchAll(pattern)) {
      const bare = noun.toLowerCase();
      if (THING_NOUNS.includes(bare)) continue;              // metafora, non un ruolo
      if (!/(?:o|tore|sore|iere)$/.test(bare)) continue;      // -a, -e: genere comune o femminile
      offenders.push(`${label}: «${match.trim()}»`);
    }
  }
  assert.deepEqual(offenders, [], 'ruoli al maschile rivolti a chi legge');
});

test('getLilithBodyLayers restituisce gli strati giusti e degrada senza errori', () => {
  const layers = window.getLilithBodyLayers({ name: 'Mars', sign: 'Aries', house: 7, is_retrograde: false });
  assert.match(layers.sign.title, /Ariete/);
  assert.match(layers.house.title, /Settima/);
  assert.equal(layers.dignity.kind, 'Domicilio');
  assert.equal(layers.retrograde, null);

  const retro = window.getLilithBodyLayers({ name: 'Mars', sign: 'Gemini', house: 3, is_retrograde: true });
  assert.equal(retro.dignity, null, 'i Gemelli non sono una dignità di Marte');
  assert.ok(retro.retrograde.text);

  // Terzo strato: presente solo per la coppia segno × casa effettivamente scritta.
  const synth = window.getLilithBodyLayers({ name: 'Mars', sign: 'Libra', house: 12, is_retrograde: false });
  assert.equal(synth.dignity.kind, 'Esilio');
  assert.match(synth.combination.title, /Bilancia.*Dodicesima/);
  assert.ok(synth.combination.canonico && synth.combination.lilithiano);
  assert.equal(window.getLilithBodyLayers({ name: 'Mars', sign: 'Libra', house: 11, is_retrograde: false }).combination, null);

  // L'oggetto arriva da un altro realm: si confrontano i valori, non il prototipo.
  const unknown = window.getLilithBodyLayers({ name: 'UnknownBody', sign: 'Leo', house: 2, is_retrograde: false });
  assert.deepEqual({ ...unknown }, { sign: null, house: null, dignity: null, combination: null, retrograde: null });
  assert.doesNotThrow(() => window.getLilithBodyLayers(null));
});
