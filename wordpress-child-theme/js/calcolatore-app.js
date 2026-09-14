/**
 * Calcolatore Tema Natale - Figlie di Lilith (Canon 2026)
 * Logica applicativa, URL Hash zero-database, rendering operativo a 7 punti,
 * dizionari italiani per visualizzazione fedele e Pop-up Modale / Bottom-Sheet Touch.
 *
 * Il calcolo astronomico avviene interamente nel browser tramite Swiss
 * Ephemeris (js/calcolatore-swiss.mjs). Nessun backend, nessuna chiave API.
 */

let currentLilithChartData = null;
let currentLilithPayload = null;
let currentLilithMode = 'astronomy';
let currentModalAspectIndex = 0;

// ================= DIZIONARIO ITALIANO =================
const PLANET_NAMES_IT = {
    'Sun': 'Sole',
    'Moon': 'Luna',
    'Mercury': 'Mercurio',
    'Venus': 'Venere',
    'Mars': 'Marte',
    'Jupiter': 'Giove',
    'Saturn': 'Saturno',
    'Uranus': 'Urano',
    'Neptune': 'Nettuno',
    'Pluto': 'Plutone',
    'TrueNode': 'Nodo Lunare Nord',
    'MeanNode': 'Nodo Lunare Medio',
    'Chiron': 'Chirone',
    'Lilith': 'Lilith (Luna Nera)',
    'TrueLilith': 'Lilith Osculatrice',
    'Lilith Media': 'Lilith (Luna Nera)',
    'Lilith (Vera)': 'Lilith Osculatrice',
    'Ceres': 'Cerere',
    'Pallas': 'Pallade Atena',
    'Juno': 'Giunone',
    'Vesta': 'Vesta',
    'ParsFortunae': 'Punto di Fortuna',
    'Vertex': 'Vertex Iniziativo',
    'Pholus': 'Pholus',
    'Nessus': 'Nessus',
    'Chariklo': 'Cariclo'
};

const CATEGORY_NAMES_IT = {
    'luminary': 'Luminare',
    'personal': 'Pianeta Personale',
    'social': 'Pianeta Sociale',
    'transpersonal': 'Pianeta Transpersonale',
    'lunar_node': 'Nodo Karmico',
    'lunar_apogee': 'Apogeo Lunare',
    'centaur': 'Centauro Iniziativo',
    'asteroid': 'Archetipo Femminile (Asteroide)',
    'point': 'Punto Cardinale',
    'arabic_part': 'Parte Araba'
};

const SIGN_NAMES_IT = {
    'Aries': 'Ariete',
    'Taurus': 'Toro',
    'Gemini': 'Gemelli',
    'Cancer': 'Cancro',
    'Leo': 'Leone',
    'Virgo': 'Vergine',
    'Libra': 'Bilancia',
    'Scorpio': 'Scorpione',
    'Sagittarius': 'Sagittario',
    'Capricorn': 'Capricorno',
    'Aquarius': 'Acquario',
    'Pisces': 'Pesci'
};

const ASPECT_NAMES_IT = {
    'conjunction': 'Congiunzione',
    'opposition': 'Opposizione',
    'square': 'Quadrato',
    'trine': 'Trigono',
    'sextile': 'Sestile',
    'quincunx': 'Incongiunzione',
    'semisquare': 'Semiquadrato',
    'sesquiquadrate': 'Sesquiquadrato',
    'semisextile': 'Semisestile',
    'quintile': 'Quintile',
    'biquintile': 'Biquintile'
};

function getPlanetDisplayName(name) {
    return PLANET_NAMES_IT[name] || name;
}

function getCategoryDisplayName(cat) {
    return CATEGORY_NAMES_IT[cat] || 'Corpo Celeste';
}

function getSignDisplayName(sign) {
    return SIGN_NAMES_IT[sign] || sign;
}

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

function getAspectDisplayName(asp) {
    return ASPECT_NAMES_IT[asp] || asp;
}

document.addEventListener('DOMContentLoaded', () => {
    initLilithCalculator();
});

function initLilithCalculator() {
    const form = document.getElementById('lilith-chart-form');
    if (!form) return;

    initLilithCallbacks();
    initLilithFormEvents();
    initLilithModalEvents();
    initLilithDefaultDate();
    checkLilithUrlHash();

    // Scarica e inizializza il WASM delle effemeridi mentre l'utente compila
    // il modulo, così il primo calcolo è immediato.
    waitForLilithEngine(20000)
        .then(() => window.lilithPrewarmEphemeris && window.lilithPrewarmEphemeris())
        .catch(() => {});
}

function initLilithCallbacks() {
    LilithChartRenderer.onSelectPlanet = (planet) => {
        if (!planet) {
            showEmptyLilithInspector();
        } else {
            renderLilithPlanetInspector(planet);
            if (window.innerWidth < 1024 && currentLilithChartData && currentLilithChartData.planets) {
                const idx = currentLilithChartData.planets.findIndex(p => p.name === planet.name);
                if (idx !== -1) {
                    openPlanetModalByIndex(idx);
                }
            }
        }
    };

    LilithChartRenderer.onSelectAspect = (aspect) => {
        if (!aspect) {
            showEmptyLilithInspector();
        } else {
            renderLilithAspectInspector(aspect);
            if (window.innerWidth < 1024 && currentLilithChartData && currentLilithChartData.aspects) {
                const idx = currentLilithChartData.aspects.indexOf(aspect);
                if (idx !== -1) {
                    openAspectModalByIndex(idx);
                }
            }
        }
    };
}

function initLilithFormEvents() {
    const form = document.getElementById('lilith-chart-form');
    const locationInput = document.getElementById('lilith-location');
    const suggestionsDropdown = document.getElementById('lilith-suggestions');

    // Form submit
    form.addEventListener('submit', handleLilithFormSubmit);

    // Geocoding input
    let debounce;
    locationInput.addEventListener('input', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => geocodeLilithLocation(e.target.value), 300);
    });

    locationInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (suggestionsDropdown) suggestionsDropdown.classList.remove('active');
        }, 250);
    });

    // Mode Switch (3 Prospettive: Astronomica, Operativa 8 Punti, Dominio & Lussuria Lilithiana)
    // Mode Switch (Prospettiva: Astronomica, Karma & Destino, Lettura Lilithiana)
    const btnAstronomy = document.getElementById('lilith-btn-mode-astronomy');
    const btnKarma = document.getElementById('lilith-btn-mode-karma');
    const btnDark = document.getElementById('lilith-btn-mode-dark');
    const btnReading = document.getElementById('lilith-btn-mode-reading');
    const btnOperational = document.getElementById('lilith-btn-mode-operational');
    const btnJumpKarma = document.getElementById('lilith-btn-jump-karma');

    if (btnAstronomy) btnAstronomy.addEventListener('click', () => setLilithMode('astronomy'));
    if (btnKarma) btnKarma.addEventListener('click', () => setLilithMode('karma'));
    if (btnDark) btnDark.addEventListener('click', () => setLilithMode('dark'));
    if (btnReading) btnReading.addEventListener('click', () => setLilithMode('dark'));
    if (btnOperational) btnOperational.addEventListener('click', () => setLilithMode('dark'));
    if (btnJumpKarma) btnJumpKarma.addEventListener('click', () => setLilithMode('karma'));

    // Coming Soon Modal Listeners
    const btnComingSoon = document.getElementById('lilith-btn-coming-soon');
    if (btnComingSoon) btnComingSoon.addEventListener('click', openComingSoonModal);

    const comingSoonClose = document.getElementById('lilith-coming-soon-close');
    const comingSoonBackdrop = document.getElementById('lilith-coming-soon-backdrop');
    const comingSoonDismiss = document.getElementById('lilith-coming-soon-dismiss');
    if (comingSoonClose) comingSoonClose.addEventListener('click', closeComingSoonModal);
    if (comingSoonBackdrop) comingSoonBackdrop.addEventListener('click', closeComingSoonModal);
    if (comingSoonDismiss) comingSoonDismiss.addEventListener('click', closeComingSoonModal);

    // Aspect filter pills
    document.querySelectorAll('.lilith-pill[data-aspect-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lilith-pill[data-aspect-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            LilithChartRenderer.setAspectFilter(btn.dataset.aspectFilter);
        });
    });

    // Asteroids toggle
    const toggleAst = document.getElementById('lilith-toggle-asteroids');
    if (toggleAst) {
        toggleAst.addEventListener('change', (e) => {
            const svg = document.getElementById('chart-svg');
            LilithChartRenderer.toggleAsteroids(e.target.checked, svg);
        });
    }

    // Reset view
    const btnReset = document.getElementById('lilith-btn-reset-view');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            LilithChartRenderer.resetSelection();
        });
    }

    // Tabs dati astronomici
    document.querySelectorAll('.lilith-data-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.lilith-data-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.lilith-tab-content').forEach(c => c.style.display = 'none');
            const target = document.getElementById(`lilith-tab-${tabName}`);
            if (target) target.style.display = 'block';
        });
    });

    // Azioni Toolbar
    const btnShare = document.getElementById('lilith-btn-share');
    if (btnShare) btnShare.addEventListener('click', shareLilithHash);

    const btnSvg = document.getElementById('lilith-btn-export-svg');
    if (btnSvg) {
        btnSvg.addEventListener('click', () => {
            const dateInput = document.getElementById('lilith-birth-date');
            const dateStr = dateInput ? dateInput.value : 'lilith';
            LilithChartRenderer.exportSVG(dateStr);
        });
    }

    const btnPdf = document.getElementById('lilith-btn-print-pdf');
    if (btnPdf) btnPdf.addEventListener('click', () => window.print());

    const btnJson = document.getElementById('lilith-btn-export-json');
    if (btnJson) btnJson.addEventListener('click', exportLilithJSON);

    const btnNew = document.getElementById('lilith-btn-new-chart');
    if (btnNew) btnNew.addEventListener('click', resetLilithForm);

    // Preset Storici Certificati (Rodden Rating AA)
    document.querySelectorAll('.lilith-preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const key = btn.dataset.preset;
            if (FAMOUS_PRESETS[key]) {
                document.querySelectorAll('.lilith-preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadLilithPreset(FAMOUS_PRESETS[key]);
            }
        });
    });
}

const FAMOUS_PRESETS = {
    einstein: {
        name: "Albert Einstein",
        sex: "M",
        date: "1879-03-14",
        time: "11:30",
        location: "Ulm, Germania",
        latitude: 48.4011,
        longitude: 9.9876,
        timezone: "Europe/Berlin",
        house_system: "P"
    },
    jung: {
        name: "Carl Gustav Jung",
        sex: "M",
        date: "1875-07-26",
        time: "19:32",
        location: "Kesswil, Svizzera",
        latitude: 47.5933,
        longitude: 9.3178,
        timezone: "Europe/Zurich",
        house_system: "P"
    },
    curie: {
        name: "Marie Curie",
        sex: "F",
        date: "1867-11-07",
        time: "12:00",
        location: "Varsavia, Polonia",
        latitude: 52.2297,
        longitude: 21.0122,
        timezone: "Europe/Warsaw",
        house_system: "P"
    },
    bowie: {
        name: "David Bowie",
        sex: "M",
        date: "1947-01-08",
        time: "09:00",
        location: "Brixton, Londra, UK",
        latitude: 51.4613,
        longitude: -0.1156,
        timezone: "Europe/London",
        house_system: "P"
    },
    jobs: {
        name: "Steve Jobs",
        sex: "M",
        date: "1955-02-24",
        time: "19:15",
        location: "San Francisco, USA",
        latitude: 37.7749,
        longitude: -122.4194,
        timezone: "America/Los_Angeles",
        house_system: "P"
    }
};

function loadLilithPreset(preset) {
    const dateInput = document.getElementById('lilith-birth-date');
    const timeInput = document.getElementById('lilith-birth-time');
    const locInput = document.getElementById('lilith-location');
    const latInput = document.getElementById('lilith-latitude');
    const lonInput = document.getElementById('lilith-longitude');
    const tzInput = document.getElementById('lilith-timezone');
    const hsInput = document.getElementById('lilith-house-system');
    const sexInput = document.getElementById('lilith-sex');
    const geoBadge = document.getElementById('lilith-geo-badge');

    if (sexInput && preset.sex) sexInput.value = preset.sex;
    // I preset maschili restano nell'elenco come promessa del Canone futuro,
    // ma non producono una lettura scritta per il femminile.
    if (preset.sex && preset.sex !== 'F') {
        openComingSoonModal('maschile');
        return;
    }

    if (dateInput) dateInput.value = preset.date;
    if (timeInput) timeInput.value = preset.time;
    if (locInput) locInput.value = preset.location;
    if (latInput) latInput.value = preset.latitude;
    if (lonInput) lonInput.value = preset.longitude;
    if (tzInput) tzInput.value = preset.timezone;
    if (hsInput) hsInput.value = preset.house_system || 'P';

    if (geoBadge) {
        geoBadge.textContent = `Preset: ${preset.name} (${preset.latitude.toFixed(4)}°, ${preset.longitude.toFixed(4)}°)`;
        geoBadge.style.color = '#34d399';
    }

    executeLilithCalculation(preset);
}

function initLilithDefaultDate() {
    const dateInput = document.getElementById('lilith-birth-date');
    const timeInput = document.getElementById('lilith-birth-time');
    if (dateInput && !dateInput.value) {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 30);
        dateInput.valueAsDate = d;
    }
    if (timeInput && !timeInput.value) {
        timeInput.value = '12:00';
    }
}

// ============== URL HASH (ZERO DATABASE PRIVACY) ==============

function encodeLilithHash(payload) {
    try {
        const jsonStr = JSON.stringify(payload);
        const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
        const newHash = `#data=${encoded}`;
        if (history.replaceState) {
            history.replaceState(null, '', window.location.pathname + window.location.search + newHash);
        } else {
            window.location.hash = newHash;
        }
    } catch (e) {
        console.warn('Encoding hash error:', e);
    }
}

function checkLilithUrlHash() {
    if (window.location.hash && window.location.hash.startsWith('#data=')) {
        try {
            const rawHash = window.location.hash.substring(6);
            const decoded = decodeURIComponent(escape(atob(rawHash)));
            const payload = JSON.parse(decoded);

            const dateIn = document.getElementById('lilith-birth-date');
            const timeIn = document.getElementById('lilith-birth-time');
            const locIn = document.getElementById('lilith-location');
            const latIn = document.getElementById('lilith-latitude');
            const lonIn = document.getElementById('lilith-longitude');
            const tzIn = document.getElementById('lilith-timezone');
            const hsIn = document.getElementById('lilith-house-system');

            if (dateIn && payload.date) dateIn.value = payload.date;
            if (timeIn && payload.time) timeIn.value = payload.time;
            if (locIn && payload.location) locIn.value = payload.location;
            if (latIn && payload.latitude) latIn.value = payload.latitude;
            if (lonIn && payload.longitude) lonIn.value = payload.longitude;
            if (tzIn && payload.timezone) tzIn.value = payload.timezone;
            if (hsIn && payload.house_system) hsIn.value = payload.house_system;
            const dstIn = document.getElementById('lilith-birth-dst');
            if (dstIn && payload.dst) dstIn.value = payload.dst;
            const sexIn = document.getElementById('lilith-sex');
            if (sexIn && payload.sex) sexIn.value = payload.sex;

            // I link condivisi prima dell'introduzione del campo non lo
            // contengono: si assume il femminile, l'unico oggi disponibile.
            if (payload.sex && payload.sex !== 'F') {
                openComingSoonModal('maschile');
                return;
            }

            if (latIn && lonIn && latIn.value && lonIn.value) {
                const geoBadge = document.getElementById('lilith-geo-badge');
                if (geoBadge) {
                    geoBadge.textContent = `Caricato da link crittografato (${payload.latitude}, ${payload.longitude})`;
                    geoBadge.style.color = '#34d399';
                }
                executeLilithCalculation(payload);
            }
        } catch (e) {
            console.error('Lilith hash decoding error:', e);
        }
    }
}

function shareLilithHash() {
    if (!currentLilithPayload) {
        showLilithToast('Esegui prima un calcolo per generare il link condivisibile.');
        return;
    }

    encodeLilithHash(currentLilithPayload);
    const fullUrl = window.location.href;

    navigator.clipboard.writeText(fullUrl).then(() => {
        showLilithToast("L'utente può salvare il link nei preferiti o condividerlo con un amico senza che nessun dato sensibile venga mai salvato su un server.", 8000);
    }).catch(() => {
        window.prompt("Copia questo link sicuro (zero database):", fullUrl);
    });
}

function showLilithToast(message, duration = 6000) {
    let container = document.getElementById('lilith-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'lilith-toast-container';
        container.className = 'lilith-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'lilith-toast';
    toast.innerHTML = `
        <div class="lilith-toast-icon">⚸</div>
        <div class="lilith-toast-msg">${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ============== GEOCODING AVANZATO (ZERO DUPLICATI, ZERO CIRILLICO, MASSIMA PRECISIONE) ==============

const LOCAL_ITALIAN_CITIES = [
    // Grandi Città & Capoluoghi Italiani
    { name: "Roma", prov: "RM", region: "Lazio", country: "Italia", lat: 41.8933, lon: 12.4829 },
    { name: "Milano", prov: "MI", region: "Lombardia", country: "Italia", lat: 45.4642, lon: 9.1900 },
    { name: "Napoli", prov: "NA", region: "Campania", country: "Italia", lat: 40.8518, lon: 14.2681 },
    { name: "Torino", prov: "TO", region: "Piemonte", country: "Italia", lat: 45.0703, lon: 7.6869 },
    { name: "Palermo", prov: "PA", region: "Sicilia", country: "Italia", lat: 38.1157, lon: 13.3615 },
    { name: "Genova", prov: "GE", region: "Liguria", country: "Italia", lat: 44.4056, lon: 8.9463 },
    { name: "Bologna", prov: "BO", region: "Emilia-Romagna", country: "Italia", lat: 44.4949, lon: 11.3426 },
    { name: "Firenze", prov: "FI", region: "Toscana", country: "Italia", lat: 43.7696, lon: 11.2558 },
    { name: "Bari", prov: "BA", region: "Puglia", country: "Italia", lat: 41.1171, lon: 16.8719 },
    { name: "Catania", prov: "CT", region: "Sicilia", country: "Italia", lat: 37.5079, lon: 15.0873 },
    { name: "Verona", prov: "VR", region: "Veneto", country: "Italia", lat: 45.4384, lon: 10.9916 },
    { name: "Venezia", prov: "VE", region: "Veneto", country: "Italia", lat: 45.4408, lon: 12.3155 },
    { name: "Messina", prov: "ME", region: "Sicilia", country: "Italia", lat: 38.1938, lon: 15.5540 },
    { name: "Padova", prov: "PD", region: "Veneto", country: "Italia", lat: 45.4064, lon: 11.8768 },
    { name: "Trieste", prov: "TS", region: "Friuli-Venezia Giulia", country: "Italia", lat: 45.6495, lon: 13.7768 },
    { name: "Taranto", prov: "TA", region: "Puglia", country: "Italia", lat: 40.4644, lon: 17.2470 },
    { name: "Brescia", prov: "BS", region: "Lombardia", country: "Italia", lat: 45.5416, lon: 10.2118 },
    { name: "Parma", prov: "PR", region: "Emilia-Romagna", country: "Italia", lat: 44.8015, lon: 10.3279 },
    { name: "Prato", prov: "PO", region: "Toscana", country: "Italia", lat: 43.8777, lon: 11.1022 },
    { name: "Modena", prov: "MO", region: "Emilia-Romagna", country: "Italia", lat: 44.6471, lon: 10.9252 },
    { name: "Reggio Calabria", prov: "RC", region: "Calabria", country: "Italia", lat: 38.1113, lon: 15.6473 },
    { name: "Reggio Emilia", prov: "RE", region: "Emilia-Romagna", country: "Italia", lat: 44.6983, lon: 10.6312 },
    { name: "Perugia", prov: "PG", region: "Umbria", country: "Italia", lat: 43.1107, lon: 12.3908 },
    { name: "Ravenna", prov: "RA", region: "Emilia-Romagna", country: "Italia", lat: 44.4184, lon: 12.2035 },
    { name: "Livorno", prov: "LI", region: "Toscana", country: "Italia", lat: 43.5485, lon: 10.3106 },
    { name: "Cagliari", prov: "CA", region: "Sardegna", country: "Italia", lat: 39.2238, lon: 9.1217 },
    { name: "Foggia", prov: "FG", region: "Puglia", country: "Italia", lat: 41.4622, lon: 15.5447 },
    { name: "Rimini", prov: "RN", region: "Emilia-Romagna", country: "Italia", lat: 44.0678, lon: 12.5695 },
    { name: "Salerno", prov: "SA", region: "Campania", country: "Italia", lat: 40.6824, lon: 14.7681 },
    { name: "Ferrara", prov: "FE", region: "Emilia-Romagna", country: "Italia", lat: 44.8381, lon: 11.6198 },
    { name: "Sassari", prov: "SS", region: "Sardegna", country: "Italia", lat: 40.7259, lon: 8.5556 },
    { name: "Latina", prov: "LT", region: "Lazio", country: "Italia", lat: 41.4676, lon: 12.9037 },
    { name: "Monza", prov: "MB", region: "Lombardia", country: "Italia", lat: 45.5845, lon: 9.2744 },
    { name: "Siracusa", prov: "SR", region: "Sicilia", country: "Italia", lat: 37.0755, lon: 15.2866 },
    { name: "Pescara", prov: "PE", region: "Abruzzo", country: "Italia", lat: 42.4618, lon: 14.2161 },
    { name: "Bergamo", prov: "BG", region: "Lombardia", country: "Italia", lat: 45.6983, lon: 9.6773 },
    { name: "Forlì", prov: "FC", region: "Emilia-Romagna", country: "Italia", lat: 44.2227, lon: 12.0407 },
    { name: "Trento", prov: "TN", region: "Trentino-Alto Adige", country: "Italia", lat: 46.0748, lon: 11.1217 },
    { name: "Vicenza", prov: "VI", region: "Veneto", country: "Italia", lat: 45.5455, lon: 11.5354 },
    { name: "Terni", prov: "TR", region: "Umbria", country: "Italia", lat: 42.5636, lon: 12.6433 },
    { name: "Bolzano", prov: "BZ", region: "Trentino-Alto Adige", country: "Italia", lat: 46.4983, lon: 11.3548 },
    { name: "Novara", prov: "NO", region: "Piemonte", country: "Italia", lat: 45.4469, lon: 8.6213 },
    { name: "Piacenza", prov: "PC", region: "Emilia-Romagna", country: "Italia", lat: 45.0526, lon: 9.6929 },
    { name: "Ancona", prov: "AN", region: "Marche", country: "Italia", lat: 43.6158, lon: 13.5189 },
    { name: "Andria", prov: "BT", region: "Puglia", country: "Italia", lat: 41.2268, lon: 16.2974 },
    { name: "Arezzo", prov: "AR", region: "Toscana", country: "Italia", lat: 43.4633, lon: 11.8796 },
    { name: "Udine", prov: "UD", region: "Friuli-Venezia Giulia", country: "Italia", lat: 46.0711, lon: 13.2346 },
    { name: "Cesena", prov: "FC", region: "Emilia-Romagna", country: "Italia", lat: 44.1396, lon: 12.2431 },
    { name: "Lecce", prov: "LE", region: "Puglia", country: "Italia", lat: 40.3515, lon: 18.1750 },
    { name: "Pesaro", prov: "PU", region: "Marche", country: "Italia", lat: 43.9125, lon: 12.9155 },
    { name: "Barletta", prov: "BT", region: "Puglia", country: "Italia", lat: 41.3204, lon: 16.2847 },
    { name: "Alessandria", prov: "AL", region: "Piemonte", country: "Italia", lat: 44.9130, lon: 8.6180 },
    { name: "La Spezia", prov: "SP", region: "Liguria", country: "Italia", lat: 44.1025, lon: 9.8241 },
    { name: "Pisa", prov: "PI", region: "Toscana", country: "Italia", lat: 43.7228, lon: 10.4017 },
    { name: "Pistoia", prov: "PT", region: "Toscana", country: "Italia", lat: 43.9333, lon: 10.9167 },
    { name: "Catanzaro", prov: "CZ", region: "Calabria", country: "Italia", lat: 38.9098, lon: 16.5877 },
    { name: "Lucca", prov: "LU", region: "Toscana", country: "Italia", lat: 43.8429, lon: 10.5027 },
    { name: "Brindisi", prov: "BR", region: "Puglia", country: "Italia", lat: 40.6327, lon: 17.9418 },
    { name: "Treviso", prov: "TV", region: "Veneto", country: "Italia", lat: 45.6669, lon: 12.2430 },
    { name: "Como", prov: "CO", region: "Lombardia", country: "Italia", lat: 45.8081, lon: 9.0852 },
    { name: "Grosseto", prov: "GR", region: "Toscana", country: "Italia", lat: 42.7603, lon: 11.1135 },
    { name: "Varese", prov: "VA", region: "Lombardia", country: "Italia", lat: 45.8206, lon: 8.8251 },
    { name: "Asti", prov: "AT", region: "Piemonte", country: "Italia", lat: 44.9007, lon: 8.2069 },
    { name: "Caserta", prov: "CE", region: "Campania", country: "Italia", lat: 41.0726, lon: 14.3323 },
    { name: "Ragusa", prov: "RG", region: "Sicilia", country: "Italia", lat: 36.9269, lon: 14.7306 },
    { name: "Pavia", prov: "PV", region: "Lombardia", country: "Italia", lat: 45.1847, lon: 9.1582 },
    { name: "Cremona", prov: "CR", region: "Lombardia", country: "Italia", lat: 45.1333, lon: 10.0333 },
    { name: "Viterbo", prov: "VT", region: "Lazio", country: "Italia", lat: 42.4174, lon: 12.1047 },
    { name: "Massa", prov: "MS", region: "Toscana", country: "Italia", lat: 44.0354, lon: 10.1417 },
    { name: "Cosenza", prov: "CS", region: "Calabria", country: "Italia", lat: 39.2983, lon: 16.2537 },
    { name: "Potenza", prov: "PZ", region: "Basilicata", country: "Italia", lat: 40.6404, lon: 15.8056 },
    { name: "Crotone", prov: "KR", region: "Calabria", country: "Italia", lat: 39.0808, lon: 17.1272 },
    { name: "Caltanissetta", prov: "CL", region: "Sicilia", country: "Italia", lat: 37.4901, lon: 14.0625 },
    { name: "Carrara", prov: "MS", region: "Toscana", country: "Italia", lat: 44.0792, lon: 10.0986 },

    // Cuneo e Comuni del Piemonte (Savigliano, Alba, Bra, Saluzzo, ecc.)
    { name: "Cuneo", prov: "CN", region: "Piemonte", country: "Italia", lat: 44.3845, lon: 7.5427 },
    { name: "Savigliano", prov: "CN", region: "Piemonte", country: "Italia", lat: 44.6440, lon: 7.6559 },
    { name: "Alba", prov: "CN", region: "Piemonte", country: "Italia", lat: 44.7009, lon: 8.0356 },
    { name: "Bra", prov: "CN", region: "Piemonte", country: "Italia", lat: 44.6974, lon: 7.8548 },
    { name: "Saluzzo", prov: "CN", region: "Piemonte", country: "Italia", lat: 44.6450, lon: 7.4907 },
    { name: "Mondovì", prov: "CN", region: "Piemonte", country: "Italia", lat: 44.3892, lon: 7.8258 },
    { name: "Fossano", prov: "CN", region: "Piemonte", country: "Italia", lat: 44.5501, lon: 7.7247 },
    { name: "Biella", prov: "BI", region: "Piemonte", country: "Italia", lat: 45.5667, lon: 8.0500 },
    { name: "Vercelli", prov: "VC", region: "Piemonte", country: "Italia", lat: 45.3217, lon: 8.4233 },
    { name: "Verbania", prov: "VB", region: "Piemonte", country: "Italia", lat: 45.9224, lon: 8.5519 },
    { name: "Aosta", prov: "AO", region: "Valle d'Aosta", country: "Italia", lat: 45.7370, lon: 7.3196 },
    { name: "Sanremo", prov: "IM", region: "Liguria", country: "Italia", lat: 43.8159, lon: 7.7761 },
    { name: "Imperia", prov: "IM", region: "Liguria", country: "Italia", lat: 43.8861, lon: 8.0267 },
    { name: "Savona", prov: "SV", region: "Liguria", country: "Italia", lat: 44.3080, lon: 8.4810 },
    { name: "Ivrea", prov: "TO", region: "Piemonte", country: "Italia", lat: 45.4667, lon: 7.8667 },
    { name: "Pinerolo", prov: "TO", region: "Piemonte", country: "Italia", lat: 44.8847, lon: 7.3300 },
    { name: "Moncalieri", prov: "TO", region: "Piemonte", country: "Italia", lat: 45.0006, lon: 7.6833 },
    { name: "Rivoli", prov: "TO", region: "Piemonte", country: "Italia", lat: 45.0700, lon: 7.5186 },
    { name: "Collegno", prov: "TO", region: "Piemonte", country: "Italia", lat: 45.0781, lon: 7.5731 },
    { name: "Casale Monferrato", prov: "AL", region: "Piemonte", country: "Italia", lat: 45.1372, lon: 8.4528 },
    { name: "Tortona", prov: "AL", region: "Piemonte", country: "Italia", lat: 44.8947, lon: 8.8647 },
    { name: "Novi Ligure", prov: "AL", region: "Piemonte", country: "Italia", lat: 44.7628, lon: 8.7889 },

    // Altri Capoluoghi Italiani
    { name: "Belluno", prov: "BL", region: "Veneto", country: "Italia", lat: 46.1425, lon: 12.2167 },
    { name: "Rovigo", prov: "RO", region: "Veneto", country: "Italia", lat: 45.0703, lon: 11.7903 },
    { name: "Gorizia", prov: "GO", region: "Friuli-Venezia Giulia", country: "Italia", lat: 45.9406, lon: 13.6219 },
    { name: "Pordenone", prov: "PN", region: "Friuli-Venezia Giulia", country: "Italia", lat: 45.9567, lon: 12.6606 },
    { name: "Siena", prov: "SI", region: "Toscana", country: "Italia", lat: 43.3188, lon: 11.3308 },
    { name: "Fermo", prov: "FM", region: "Marche", country: "Italia", lat: 43.1608, lon: 13.7183 },
    { name: "Ascoli Piceno", prov: "AP", region: "Marche", country: "Italia", lat: 42.8547, lon: 13.5758 },
    { name: "Macerata", prov: "MC", region: "Marche", country: "Italia", lat: 43.3000, lon: 13.4500 },
    { name: "Urbino", prov: "PU", region: "Marche", country: "Italia", lat: 43.7262, lon: 12.6366 },
    { name: "Rieti", prov: "RI", region: "Lazio", country: "Italia", lat: 42.4042, lon: 12.8628 },
    { name: "Frosinone", prov: "FR", region: "Lazio", country: "Italia", lat: 41.6400, lon: 13.3500 },
    { name: "Isernia", prov: "IS", region: "Molise", country: "Italia", lat: 41.5961, lon: 14.2333 },
    { name: "Campobasso", prov: "CB", region: "Molise", country: "Italia", lat: 41.5603, lon: 14.6628 },
    { name: "Benevento", prov: "BN", region: "Campania", country: "Italia", lat: 41.1306, lon: 14.7781 },
    { name: "Avellino", prov: "AV", region: "Campania", country: "Italia", lat: 40.9144, lon: 14.7906 },
    { name: "Matera", prov: "MT", region: "Basilicata", country: "Italia", lat: 40.6664, lon: 16.6045 },
    { name: "Vibo Valentia", prov: "VV", region: "Calabria", country: "Italia", lat: 38.6758, lon: 16.0983 },
    { name: "Enna", prov: "EN", region: "Sicilia", country: "Italia", lat: 37.5670, lon: 14.2792 },
    { name: "Agrigento", prov: "AG", region: "Sicilia", country: "Italia", lat: 37.3111, lon: 13.5765 },
    { name: "Trapani", prov: "TP", region: "Sicilia", country: "Italia", lat: 38.0176, lon: 12.5365 },
    { name: "Oristano", prov: "OR", region: "Sardegna", country: "Italia", lat: 39.9036, lon: 8.5919 },
    { name: "Nuoro", prov: "NU", region: "Sardegna", country: "Italia", lat: 40.3208, lon: 9.3292 },
    { name: "Olbia", prov: "SS", region: "Sardegna", country: "Italia", lat: 40.9239, lon: 9.4975 },

    // Grandi Città Internazionali
    { name: "Parigi", prov: "IDF", region: "Île-de-France", country: "Francia", lat: 48.8566, lon: 2.3522 },
    { name: "Londra", prov: "LDN", region: "Inghilterra", country: "Regno Unito", lat: 51.5074, lon: -0.1278 },
    { name: "Madrid", prov: "MAD", region: "Madrid", country: "Spagna", lat: 40.4168, lon: -3.7038 },
    { name: "Berlino", prov: "BER", region: "Berlino", country: "Germania", lat: 52.5200, lon: 13.4050 },
    { name: "Vienna", prov: "VIE", region: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738 },
    { name: "Berna", prov: "BE", region: "Berna", country: "Svizzera", lat: 46.9480, lon: 7.4474 },
    { name: "Lugano", prov: "TI", region: "Ticino", country: "Svizzera", lat: 46.0037, lon: 8.9511 },
    { name: "Ginevra", prov: "GE", region: "Ginevra", country: "Svizzera", lat: 46.2044, lon: 6.1432 },
    { name: "Zurigo", prov: "ZH", region: "Zurigo", country: "Svizzera", lat: 47.3769, lon: 8.5417 },
    { name: "Bruxelles", prov: "BRU", region: "Bruxelles", country: "Belgio", lat: 50.8503, lon: 4.3517 },
    { name: "Amsterdam", prov: "NH", region: "Olanda", country: "Paesi Bassi", lat: 52.3676, lon: 4.9041 },
    { name: "New York", prov: "NY", region: "New York", country: "Stati Uniti d'America", lat: 40.7128, lon: -74.0060 }
];

// Dizionario di Bonifica e De-Cirilizzazione (OpenStreetMap a volte indicizza toponimi con chiavi in cirillico)
const CYRILLIC_TOPONYMS_MAP = {
    'кунео': 'Cuneo', 'рим': 'Roma', 'милан': 'Milano', 'турин': 'Torino',
    'неаполь': 'Napoli', 'генуя': 'Genova', 'болонья': 'Bologna', 'флоренция': 'Firenze',
    'венеция': 'Venezia', 'верона': 'Verona', 'палермо': 'Palermo', 'катания': 'Catania',
    'бари': 'Bari', 'мессина': 'Messina', 'падуя': 'Padova', 'триест': 'Trieste',
    'брешиа': 'Brescia', 'парма': 'Parma', 'модена': 'Modena', 'реджо-эмилия': 'Reggio Emilia',
    'ливорно': 'Livorno', 'перуджа': 'Perugia', 'равенна': 'Ravenna', 'феррара': 'Ferrara',
    'римини': 'Rimini', 'салерно': 'Salerno', 'савильяно': 'Savigliano', 'пьемонт': 'Piemonte',
    'ломбардия': 'Lombardia', 'лацио': 'Lazio', 'тоскана': 'Toscana', 'венето': 'Veneto',
    'кампания': 'Campania', 'сицилия': 'Sicilia', 'сардиния': 'Sardegna', 'италия': 'Italia'
};

const CYRILLIC_TO_LATIN = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y',
    'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
    'х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
    'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ж':'Zh','З':'Z','И':'I','Й':'Y',
    'К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F',
    'Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Shch','Э':'E','Ю':'Yu','Я':'Ya'
};

function sanitizeCyrillic(str) {
    if (!str || typeof str !== 'string') return '';
    let res = str;
    for (const [cyr, it] of Object.entries(CYRILLIC_TOPONYMS_MAP)) {
        res = res.replace(new RegExp(cyr, 'gi'), it);
    }
    return res.split('').map(ch => CYRILLIC_TO_LATIN[ch] !== undefined ? CYRILLIC_TO_LATIN[ch] : ch).join('');
}

function haversineDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function searchLocalCities(query) {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return [];

    const startsWithMatches = [];
    const containsMatches = [];

    for (const city of LOCAL_ITALIAN_CITIES) {
        const nameLower = city.name.toLowerCase();
        const display = `${city.name} (${city.prov}), ${city.region}, ${city.country}`;
        const item = {
            name: city.name,
            display_name: display,
            latitude: city.lat,
            longitude: city.lon,
            timezone: 'Europe/Rome'
        };

        if (nameLower.startsWith(q)) {
            startsWithMatches.push(item);
        } else if (nameLower.includes(q)) {
            containsMatches.push(item);
        }
    }

    return [...startsWithMatches, ...containsMatches].slice(0, 5);
}

function parseNominatimItem(item) {
    const addr = item.address || {};
    let cityName = addr.city || addr.town || addr.village || addr.municipality || item.name || '';
    cityName = sanitizeCyrillic(cityName).trim();

    let county = addr.county || addr.province || '';
    county = sanitizeCyrillic(county).replace(/^Provincia di /i, '').replace(/^Città metropolitana di /i, '').trim();

    let state = addr.state || addr.region || '';
    state = sanitizeCyrillic(state).trim();

    let country = addr.country || '';
    country = sanitizeCyrillic(country).trim();

    const parts = [cityName];
    if (county && county.toLowerCase() !== cityName.toLowerCase()) parts.push(county);
    if (state && state.toLowerCase() !== county.toLowerCase()) parts.push(state);
    if (country) parts.push(country);

    return {
        name: cityName,
        display_name: parts.join(', '),
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        timezone: null
    };
}

function parsePhotonItem(f) {
    const p = f.properties || {};
    const coords = f.geometry ? f.geometry.coordinates : [0, 0];
    let cityName = p.name || p.city || '';
    cityName = sanitizeCyrillic(cityName).trim();

    let county = p.county || '';
    county = sanitizeCyrillic(county).replace(/^Provincia di /i, '').trim();

    let state = p.state || '';
    state = sanitizeCyrillic(state).trim();

    let country = p.country || '';
    country = sanitizeCyrillic(country).trim();

    const parts = [cityName];
    if (county && county.toLowerCase() !== cityName.toLowerCase()) parts.push(county);
    if (state && state.toLowerCase() !== county.toLowerCase()) parts.push(state);
    if (country) parts.push(country);

    return {
        name: cityName,
        display_name: parts.join(', '),
        latitude: coords[1],
        longitude: coords[0],
        timezone: null
    };
}

function deduplicateLocations(items) {
    const unique = [];
    for (const item of items) {
        if (!item || !item.name || isNaN(item.latitude) || isNaN(item.longitude)) continue;

        const isDuplicate = unique.some(existing => {
            const exName = existing.name.toLowerCase().trim();
            const itName = item.name.toLowerCase().trim();
            const sameOrContains = exName === itName || exName.includes(itName) || itName.includes(exName);
            const dist = haversineDistanceKm(existing.latitude, existing.longitude, item.latitude, item.longitude);
            if (sameOrContains && dist < 35.0) return true;

            // Deduplica per display_name identico
            if (existing.display_name.toLowerCase().trim() === item.display_name.toLowerCase().trim()) return true;

            return false;
        });

        if (!isDuplicate) {
            unique.push(item);
        }
    }
    return unique;
}

let lilithGeocodeRequestId = 0;
let isLilithLocationSelected = false;

async function geocodeLilithLocation(query) {
    const dropdown = document.getElementById('lilith-suggestions');
    if (!dropdown) return;

    const trimmed = query.trim();
    if (trimmed.length < 2) {
        dropdown.classList.remove('active');
        dropdown.innerHTML = '';
        return;
    }

    const currentReqId = ++lilithGeocodeRequestId;
    isLilithLocationSelected = false;

    // 1. Risposta istantanea in locale (0ms di latenza)
    const localMatches = searchLocalCities(trimmed);
    if (localMatches.length > 0) {
        renderLilithSuggestions(localMatches);
    }

    // 2. Interrogazione API remota con lingua forzata 'it'
    try {
        let remoteItems = [];

        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmed)}&format=json&addressdetails=1&limit=10&accept-language=it,en;q=0.8`;
            const res = await fetch(url, { headers: { 'Accept-Language': 'it,en;q=0.8' } });
            if (res.ok) {
                const data = await res.json();
                remoteItems = (data || []).map(item => parseNominatimItem(item));
            }
        } catch (e) {
            console.warn('Nominatim fallback su Photon:', e);
        }

        // Fallback a Photon Komoot se Nominatim non risponde
        if (remoteItems.length === 0) {
            try {
                const pUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(trimmed)}&limit=10&lang=it`;
                const pRes = await fetch(pUrl);
                if (pRes.ok) {
                    const pData = await pRes.json();
                    remoteItems = (pData.features || []).map(f => parsePhotonItem(f));
                }
            } catch (e2) {
                console.warn('Photon error:', e2);
            }
        }

        // Se l'utente ha continuato a digitare o ha già selezionato una voce, scarta le risposte
        if (currentReqId !== lilithGeocodeRequestId || isLilithLocationSelected) return;

        // Fusione intelligente e deduplicazione rigorosa
        const combined = [...localMatches, ...remoteItems];
        const deduped = deduplicateLocations(combined).slice(0, 6);

        renderLilithSuggestions(deduped);
    } catch (e) {
        console.error('Geocoding error:', e);
    }
}

function renderLilithSuggestions(results) {
    const dropdown = document.getElementById('lilith-suggestions');
    if (!dropdown) return;
    if (!results || results.length === 0) {
        dropdown.classList.remove('active');
        dropdown.innerHTML = '';
        return;
    }

    dropdown.innerHTML = results.map(r => `
        <div class="lilith-suggestion-entry"
             data-name="${escapeLilithHtml(r.name)}"
             data-display="${escapeLilithHtml(r.display_name)}"
             data-lat="${r.latitude}"
             data-lon="${r.longitude}"
             data-tz="${r.timezone || ''}">
            <div class="city-name">${escapeLilithHtml(r.name)}</div>
            <div class="city-desc">${escapeLilithHtml(r.display_name)}</div>
        </div>
    `).join('');

    dropdown.classList.add('active');

    dropdown.querySelectorAll('.lilith-suggestion-entry').forEach(entry => {
        const handleSelect = (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectLilithSuggestion(entry);
        };
        entry.addEventListener('mousedown', handleSelect);
        entry.addEventListener('click', handleSelect);
    });
}

function selectLilithSuggestion(entry) {
    isLilithLocationSelected = true;
    const locInput = document.getElementById('lilith-location');
    const latInput = document.getElementById('lilith-latitude');
    const lonInput = document.getElementById('lilith-longitude');
    const tzInput = document.getElementById('lilith-timezone');
    const geoBadge = document.getElementById('lilith-geo-badge');
    const dropdown = document.getElementById('lilith-suggestions');

    const cityName = entry.dataset.name;
    const displayName = entry.dataset.display || cityName;

    if (locInput) locInput.value = cityName;
    if (latInput) latInput.value = entry.dataset.lat;
    if (lonInput) lonInput.value = entry.dataset.lon;
    if (dropdown) dropdown.classList.remove('active');

    // Nominatim e Photon non restituiscono il fuso: lo deduciamo dalle
    // coordinate con tz-lookup, così ogni città del mondo ha una zona IANA.
    let tz = entry.dataset.tz || '';
    if (!tz && typeof window.lilithLookupTimezone === 'function') {
        tz = window.lilithLookupTimezone(entry.dataset.lat, entry.dataset.lon) || '';
    }
    if (tzInput) tzInput.value = tz;

    if (geoBadge) {
        geoBadge.textContent = `Coordinate: ${parseFloat(entry.dataset.lat).toFixed(4)}°, ${parseFloat(entry.dataset.lon).toFixed(4)}° (${cityName})`
            + (tz ? ` · fuso ${tz}` : '');
        geoBadge.style.color = '#34d399';
    }
}

function escapeLilithHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ============== FORM EXECUTION ==============

async function handleLilithFormSubmit(e) {
    e.preventDefault();

    const latInput = document.getElementById('lilith-latitude');
    const lonInput = document.getElementById('lilith-longitude');

    if (!latInput || !lonInput || !latInput.value || !lonInput.value) {
        showLilithToast('Seleziona una città dall\'elenco per ottenere latitudine e longitudine esatte.');
        return;
    }

    const form = document.getElementById('lilith-chart-form');
    const formData = new FormData(form);

    // La Lettura Lilithiana è oggi redatta per il femminile. Il Canone
    // maschile sarà un'opera distinta: fino ad allora il calcolo per gli
    // uomini non viene eseguito, invece di consegnare un testo che non li
    // riguarda.
    const sex = formData.get('sex');
    if (!sex) {
        showLilithToast('Indica il sesso: la lettura è redatta in forma diversa e non può essere generica.');
        return;
    }
    if (sex !== 'F') {
        openComingSoonModal('maschile');
        return;
    }

    const dstSelect = document.getElementById('lilith-birth-dst');
    const requestData = {
        date: formData.get('date'),
        time: formData.get('time'),
        location: document.getElementById('lilith-location').value,
        latitude: parseFloat(latInput.value),
        longitude: parseFloat(lonInput.value),
        timezone: document.getElementById('lilith-timezone').value || null,
        house_system: formData.get('house_system') || 'P',
        dst: dstSelect ? dstSelect.value : 'auto',
        sex: sex
    };

    executeLilithCalculation(requestData);
}

// Attende che js/calcolatore-swiss.mjs (modulo ES, quindi differito) abbia
// registrato il punto di ingresso, senza superare il timeout indicato.
function waitForLilithEngine(timeoutMs = 15000) {
    if (typeof window.calculateLilithNatalChart === 'function') return Promise.resolve();
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            window.removeEventListener('lilith-swiss-ready', onReady);
            reject(new Error('Le effemeridi Swiss non sono state caricate. Ricarica la pagina o svuota la cache del sito.'));
        }, timeoutMs);
        function onReady() {
            clearTimeout(timer);
            window.removeEventListener('lilith-swiss-ready', onReady);
            resolve();
        }
        window.addEventListener('lilith-swiss-ready', onReady);
    });
}

function showLilithCalculationError(message) {
    const inputCard = document.getElementById('lilith-input-section');
    if (!inputCard) {
        showLilithToast(message, 10000);
        return;
    }
    let box = document.getElementById('lilith-error-banner');
    if (!box) {
        box = document.createElement('div');
        box.id = 'lilith-error-banner';
        box.setAttribute('role', 'alert');
        box.className = 'lilith-error-banner';
        inputCard.insertBefore(box, inputCard.firstChild);
    }
    box.innerHTML = `<strong>Calcolo non eseguito.</strong> ${escapeLilithHtml(message)}`;
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearLilithCalculationError() {
    const box = document.getElementById('lilith-error-banner');
    if (box) box.style.display = 'none';
}

async function executeLilithCalculation(req) {
    currentLilithPayload = req;

    const inputCard = document.getElementById('lilith-input-section');
    const loadingCard = document.getElementById('lilith-loading-section');
    const resultsSection = document.getElementById('lilith-results-section');

    clearLilithCalculationError();
    if (inputCard) inputCard.style.display = 'none';
    if (loadingCard) loadingCard.style.display = 'block';
    if (resultsSection) resultsSection.style.display = 'none';

    try {
        await waitForLilithEngine();

        // Unica fonte di verità: Swiss Ephemeris. Nessun fallback approssimato:
        // meglio nessun tema che un tema sbagliato senza che l'utente lo sappia.
        const data = await window.calculateLilithNatalChart(req);

        currentLilithChartData = data;
        window.currentLilithChartData = data;

        encodeLilithHash(req);
        renderLilithResults(data, req);

        if (loadingCard) loadingCard.style.display = 'none';
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }

        // Scroll automatico fluido e immediato direttamente davanti alla grafica del cielo natale (Ruota Zodiacale)
        setTimeout(() => {
            const wheelBlock = document.getElementById('lilith-chart-wheel-container');
            if (wheelBlock) {
                wheelBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 120);

    } catch (e) {
        console.error('Calculation error:', e);
        if (loadingCard) loadingCard.style.display = 'none';
        if (inputCard) inputCard.style.display = 'block';
        showLilithCalculationError(e && e.message ? e.message : 'Errore imprevisto durante il calcolo.');
    }
}

function resetLilithForm() {
    const inputCard = document.getElementById('lilith-input-section');
    const resultsSection = document.getElementById('lilith-results-section');
    if (inputCard) inputCard.style.display = 'block';
    if (resultsSection) resultsSection.style.display = 'none';
    currentLilithChartData = null;
    currentLilithPayload = null;
    history.replaceState(null, '', window.location.pathname);
    showEmptyLilithInspector();
}

function setLilithMode(mode) {
    currentLilithMode = mode;
    const btnAstronomy = document.getElementById('lilith-btn-mode-astronomy');
    const btnKarma = document.getElementById('lilith-btn-mode-karma') || document.getElementById('lilith-btn-jump-karma');
    const btnDark = document.getElementById('lilith-btn-mode-dark') || document.getElementById('lilith-btn-mode-reading');
    const btnOperational = document.getElementById('lilith-btn-mode-operational');
    const viewAstronomy = document.getElementById('lilith-astronomy-view');
    const viewDark = document.getElementById('lilith-dark-view') || document.getElementById('lilith-reading-view');
    const viewOperational = document.getElementById('lilith-operational-view');

    [btnAstronomy, btnKarma, btnDark, btnOperational].forEach(b => { if (b) b.classList.remove('active'); });
    if (viewAstronomy) viewAstronomy.style.display = 'none';
    if (viewDark) viewDark.style.display = 'none';
    if (viewOperational) viewOperational.style.display = 'none';

    if (currentLilithMode === 'astronomy') {
        if (btnAstronomy) btnAstronomy.classList.add('active');
        if (viewAstronomy) viewAstronomy.style.display = 'block';
    } else if (currentLilithMode === 'karma') {
        if (btnKarma) btnKarma.classList.add('active');
        if (viewDark) viewDark.style.display = 'block';
        showLilithToast("🌌 Karma & Destino Attivato");
        setTimeout(() => {
            const secKarma = document.getElementById('lilith-sec-karma');
            if (secKarma) {
                secKarma.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    } else {
        // 'dark', 'reading', 'operational' -> Lettura Lilithiana Unificata
        if (btnDark) btnDark.classList.add('active');
        if (viewDark) viewDark.style.display = 'block';
        showLilithToast("🔥 Lettura Lilithiana Attivata");
        setTimeout(() => {
            const secDark = document.getElementById('lilith-sec-sintesi-unificata') || document.getElementById('lilith-sec-manifesto') || document.getElementById('lilith-dark-reading-container') || viewDark;
            if (secDark) {
                secDark.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 80);
    }
}

// ============== RENDERING RISULTATI ==============

function renderLilithResults(data, req) {
    // 1. Header Dossier
    const formattedDate = req.date ? req.date.split('-').reverse().join('/') : '';
    const locName = req.location || `${req.latitude}, ${req.longitude}`;
    const subjectTitle = document.getElementById('lilith-dossier-title');
    if (subjectTitle) subjectTitle.textContent = `Tema Natale • ${locName}`;

    const metaBox = document.getElementById('lilith-dossier-meta');
    if (metaBox) {
        const eph = data.ephemeris || {};
        const houseNames = { P: 'Placidus', K: 'Koch', W: 'Whole Sign', C: 'Campanus', R: 'Regiomontanus', E: 'Equal' };
        const houseCode = eph.house_system || req.house_system || 'P';
        const pills = [
            `📅 ${escapeLilithHtml(formattedDate)} ore ${escapeLilithHtml(req.time)}`,
            `📍 ${escapeLilithHtml(locName)}`,
            `🏛️ Case: ${escapeLilithHtml(houseNames[houseCode] || houseCode)}`
        ];
        // Provenienza verificabile dell'istante e delle effemeridi usate.
        if (eph.timezone) {
            pills.push(`🕰️ ${escapeLilithHtml(eph.timezone)} (UTC${escapeLilithHtml(eph.utc_offset || '')}) · ${escapeLilithHtml(data.utc_datetime || '')}`);
        }
        if (eph.version) {
            pills.push(`⚸ ${escapeLilithHtml(eph.engine || 'Swiss Ephemeris')} ${escapeLilithHtml(eph.version)}`);
        }
        (eph.warnings || []).forEach(w => pills.push(`⚠️ ${escapeLilithHtml(w)}`));
        metaBox.innerHTML = pills.map(p => `<span class="lilith-meta-pill">${p}</span>`).join('\n');
    }

    const sigVal = document.getElementById('lilith-sig-val');
    const sigSub = document.getElementById('lilith-sig-sub');
    if (sigVal) sigVal.textContent = data.chart_signature || 'Armonia Lilithiana';
    if (sigSub) sigSub.textContent = `${data.dominant_element || ''} • ${data.dominant_modality || ''}`;

    // 2. Ruota SVG
    const svg = document.getElementById('chart-svg');
    if (svg) LilithChartRenderer.render(svg, data);

    // 3. Tabelle
    renderLilithPlanetsTable(data.planets);
    renderLilithHousesTable(data.houses);
    renderLilithAspectsTable(data.aspects);
    renderLilithDominanceTab(data);

    // 4. Analisi Operativa
    renderLilithOperationalAnalysis(data);

    // 5. Rilettura Lilithiana di Dominio ed Eros Oscuro
    renderLilithDarkReading(data);

    // 6. Karma & Destino Sovrano (Origine Animica, Presente, Stella Polare)
    renderLilithKarmaDestiny(data);

    // 7. Motore di Lettura Sintetica Unificata a 5 Dimensioni (Canone Codex Astra)
    renderLilithUnifiedReading(data);

    // 8. Reset Inspector
    showEmptyLilithInspector();
}

function renderLilithPlanetsTable(planets) {
    const tbody = document.querySelector('#lilith-planets-table tbody');
    if (!tbody || !planets) return;

    tbody.innerHTML = planets.map(p => {
        const retro = p.is_retrograde ? '<span class="lilith-retro-badge" style="color:#ef4444;font-weight:bold;">R</span>' : '<span class="lilith-direct-badge" style="color:var(--lilith-dim);">D</span>';
        const glyph = LilithChartRenderer.planetSymbols[p.name] || '';
        const isLilith = (p.name === 'Lilith' || p.name === 'Lilith Media' || p.name === 'Lilith (Vera)');
        const displayName = p.it_name || getPlanetDisplayName(p.name);
        const signName = getSignDisplayName(p.sign);

        return `
            <tr class="lilith-clickable-row ${isLilith ? 'row-highlight-lilith' : ''}" onclick="inspectLilithPlanet('${p.name}')" title="Clicca per leggere l'interpretazione">
                <td>
                    <div style="display:flex;align-items:center;gap:6px;">
                        <span style="display:inline-block;width:20px;font-size:1.1rem;color:${isLilith ? '#ff5a1f' : 'var(--lilith-oro)'};">${glyph}</span>
                        <div>
                            <strong style="${isLilith ? 'color:#ff5a1f;' : ''}">${displayName}</strong>
                            ${isLilith ? '<span style="font-size:0.68rem;padding:2px 5px;background:rgba(255,90,31,0.25);border-radius:4px;color:#ff5a1f;margin-left:4px;font-weight:bold;">SOVRANA</span>' : ''}
                        </div>
                    </div>
                </td>
                <td class="lilith-cell-mono">${p.formatted || `${p.sign_degree}°${p.sign_minute}' ${signName}`}</td>
                <td>Casa ${p.house}</td>
                <td>${retro}</td>
                <td style="color:${p.dignity ? 'var(--lilith-oro)' : 'var(--lilith-dim)'};">${p.dignity || '-'}</td>
            </tr>
        `;
    }).join('');
}

// ==========================================================================
// ARCHETIPI & INTERPRETAZIONE ESOTERICA CASE E ANGOLI
// ==========================================================================

const LILITH_SIGN_METADATA = {
    'Aries': { name_it: 'Ariete', ruler: 'Marte', element: 'Fuoco', modality: 'Cardinale', mode: 'con impeto pionieristico, coraggio d\'avanguardia e immediatezza assoluta', style: 'Guerriero Iniziatico' },
    'Taurus': { name_it: 'Toro', ruler: 'Venere', element: 'Terra', modality: 'Fissa', mode: 'con stabilità incrollabile, radicamento carnale e fecondità paziente', style: 'Costruttore Adamantino' },
    'Gemini': { name_it: 'Gemelli', ruler: 'Mercurio', element: 'Aria', modality: 'Mobile', mode: 'con acume critico, versatilità intellettuale e parola penetrante', style: 'Messaggero Sovrano' },
    'Cancer': { name_it: 'Cancro', ruler: 'Luna', element: 'Acqua', modality: 'Cardinale', mode: 'con profondità ancestrale, custodia del tempio emotivo e protezione istintiva', style: 'Custode del Fuoco Notturno' },
    'Leo': { name_it: 'Leone', ruler: 'Sole', element: 'Fuoco', modality: 'Fissa', mode: 'con maestà radiosa, orgoglio sovrano e generosità indomita', style: 'Sovrano della Fiamma' },
    'Virgo': { name_it: 'Vergine', ruler: 'Mercurio / Chirone', element: 'Terra', modality: 'Mobile', mode: 'con rigore chirurgico, alchimia quotidiana e lucidità discriminante', style: 'Alchimista del Dettaglio' },
    'Libra': { name_it: 'Bilancia', ruler: 'Venere', element: 'Aria', modality: 'Cardinale', mode: 'con ricerca di armonia sacra, equità adamantina ed eleganza inflessibile', style: 'Mediatore di Potere' },
    'Scorpio': { name_it: 'Scorpione', ruler: 'Plutone / Marte', element: 'Acqua', modality: 'Fissa', mode: 'con intensità trasmutativa, magnetismo viscerale e sguardo che penetra ogni segreto', style: 'Iniziatore degli Abissi' },
    'Sagittarius': { name_it: 'Sagittario', ruler: 'Giove', element: 'Fuoco', modality: 'Mobile', mode: 'con visione titanica, anelito di libertà e sete di verità oltre i dogmi', style: 'Esploratore delle Grandi Leggi' },
    'Capricorn': { name_it: 'Capricorno', ruler: 'Saturno', element: 'Terra', modality: 'Cardinale', mode: 'con disciplina inflessibile, autorevolezza maestosa e resistenza al tempo', style: 'Monarca della Vetta' },
    'Aquarius': { name_it: 'Acquario', ruler: 'Urano / Saturno', element: 'Aria', modality: 'Fissa', mode: 'con originalità eretica, visione collettiva illuminata e rottura degli schemi', style: 'Ribelle Visionario' },
    'Pisces': { name_it: 'Pesci', ruler: 'Nettuno / Giove', element: 'Acqua', modality: 'Mobile', mode: 'con empatia universale, dissoluzione dei confini e intuizione oceanica', style: 'Mistico della Notte Eterna' }
};

const LILITH_HOUSE_ARCHETYPES = {
    1: {
        title: "L'Identità, il Corpo e la Sovranità Primigenia",
        roman: "I",
        sector: "Cuspide Vitale • Campo dell'Io e dell'Auto-affermazione",
        naturalRuler: "Marte (Ariete)",
        func: "Rappresenta l'incarnazione nella materia, l'istinto con cui rivendichi il tuo spazio vitale e la determinazione con cui ti presenti al mondo senza chiedere il permesso di esistere.",
        shadow: "Compromissione dell'identità per compiacere l'ambiente circostante, oppure aggressività reattiva priva di vera centratura sovrana.",
        directive: "Cammina con fierezza incrollabile: il tuo corpo e la tua presenza fisica sono il tempio della tua sovranità primordiale."
    },
    2: {
        title: "I Valori, le Risorse e il Potere Materiale Autonomo",
        roman: "II",
        sector: "Campo della Materia • Sostentamento, Risorse e Autostima",
        naturalRuler: "Venere (Toro)",
        func: "Governa l'autosufficienza economica, il senso di autostima profonda e la capacità di convertire l'energia vitale in abbondanza tangibile e indipendente.",
        shadow: "Attaccamento ansioso al possesso per paura del vuoto, o convinzione limitante di non meritare pienezza e prosperità materiale.",
        directive: "Radica le tue risorse su basi adamantine: la vera libertà spirituale comincia dall'autonomia economica."
    },
    3: {
        title: "La Parola Tagliente, l'Intelletto e l'Ambiente Prossimo",
        roman: "III",
        sector: "Campo del Verbo • Comunicazione, Mente Logica e Relazioni Quotidiane",
        naturalRuler: "Mercurio (Gemelli)",
        func: "Presiede all'agilità mentale, alla parola esatta che squarcia le ipocrisie e al modo di processare, scambiare e trasmettere la conoscenza.",
        shadow: "Dispersione in pettegolezzi sterili, manipolazione verbale o silenzio complice per timore delle reazioni altrui.",
        directive: "Usa il Verbo come una lama chirurgica che separa la verità dalla menzogna senza esitazione."
    },
    4: {
        title: "Le Radici Ancestrali, il Focolare e il Tempio Interiore",
        roman: "IV",
        sector: "Profondità Notturna • Origine Inconscia, Fondamenta e Focolare",
        naturalRuler: "Luna (Cancro)",
        func: "Custodisce la matrice psicologica ed emotiva più intima, il lignaggio ancestrale e il santuario interiore in cui ti rigeneri lontano da sguardi estranei.",
        shadow: "Prigionia nelle memorie tossiche transgenerazionali o rifiuto infantile delle proprie radici.",
        directive: "Purifica il tuo tempio interiore: onora ciò che ti ha generato ma deprogramma ogni eredità di sottomissione."
    },
    5: {
        title: "Il Fuoco Erotico, la Creazione e l'Auto-Espressione Sovrana",
        roman: "V",
        sector: "Campo dell'Estasi • Creazione, Piacere Sacro, Progetti e Discendenza",
        naturalRuler: "Sole (Leone)",
        func: "È il braciere della passione vitale, della creatività radiosa e del gioco sacro: la capacità di generare opere e bellezza senza vergogna né censure.",
        shadow: "Dipendenza narcisistica dagli applausi, drammatizzazione sterile o blocco puritano del piacere vitale.",
        directive: "Celebra la tua potenza generatrice: crea con l'audacia fiera di una dea che conosce il proprio potere."
    },
    6: {
        title: "La Disciplina Quotidiana, l'Alchimia del Lavoro e la Cura del Tempio",
        roman: "VI",
        sector: "Campo del Rito Quotidiano • Salute, Ritmo Vitale e Metodo Operativo",
        naturalRuler: "Mercurio / Chirone (Vergine)",
        func: "Trasforma le incombenze quotidiane in liturgia: cura e rispetto del tempio biologico, purificazione delle abitudini e precisione metodologica.",
        shadow: "Ipocondria ansiosa, perfezionismo paralizzante o sottomissione cieca a carichi alienanti.",
        directive: "Rendi sacro ogni gesto quotidiano: la maestria si coltiva nella precisione della disciplina interiore."
    },
    7: {
        title: "L'Alleanza tra Sovrani, il Patto di Parità e lo Specchio dell'Altro",
        roman: "VII",
        sector: "Campo dell'Incontro • Relazioni Intime, Contratti e Alleanze",
        naturalRuler: "Venere (Bilancia)",
        func: "Governa le relazioni a due, l'incontro paritario e la capacità di stipulare patti sacri dove ciascun individuo preserva la propria totale indipendenza.",
        shadow: "Codipendenza emotiva, svendita dei propri confini per timore della solitudine o proiezione delle proprie ombre sul partner.",
        directive: "Accetta soltanto patti d'onore tra anime sovrane; non concedere la tua intimità a chi non rispetta la tua maestà."
    },
    8: {
        title: "La Discesa agli Inferi, la Rigenerazione Sessuale e i Beni Condivisi",
        roman: "VIII",
        sector: "Soglia del Mistero • Morte Iniziatica, Erotismo Trasmutativo e Potere Occulto",
        naturalRuler: "Plutone / Marte (Scorpione)",
        func: "Il portale della morte e rinascita psicologica: l'alchimia della sessualità profonda, l'amministrazione delle risorse condivise e la maestria sui tabù.",
        shadow: "Gelosia distruttiva, ricatti emotivi/economici, paranoia o attaccamento traumatico al controllo.",
        directive: "Abbi il coraggio di morire e rinascere a te stessa: le ceneri del vecchio sono il nutrimento della tua Fenice."
    },
    9: {
        title: "La Conoscenza Arcana, i Grandi Orizzonti e l'Iniziazione Filosofica",
        roman: "IX",
        sector: "Campo dell'Elevazione • Ricerca di Senso, Viaggi Iniziatici e Visione Cosmica",
        naturalRuler: "Giove (Sagittario)",
        func: "Espansione verso orizzonti lontani: la conquista di una visione filosofica personale, la rottura dei dogmi religiosi imposti e l'integrazione di leggi universali.",
        shadow: "Dogmatismo ideologico, superbia spirituale o fuga in teorie astratte per evitare il confronto con la realtà materiale.",
        directive: "Cerca la verità direttamente alla sorgente cosmica, rifiutando ogni intermediario dogmatico tra te e l'Infinito."
    },
    10: {
        title: "La Realizzazione Adamantina, l'Autorevolezza e il Ruolo nel Mondo",
        roman: "X",
        sector: "Pinnacolo dell'Elevazione • Carriera, Reputazione e Sovranità Pubblica",
        naturalRuler: "Saturno (Capricorno)",
        func: "Rappresenta lo zenith del cielo di nascita: la costruzione della propria opera magna terrena, la conquista dell'autorevolezza e l'impatto pubblico duraturo.",
        shadow: "Cinismo spietato, brama cieca di prestigio sociale o paura paralizzante dell'autorità esterna.",
        directive: "Sii l'unica autorità suprema della tua vita: governa la tua opera con rigore adamantino, integrità e maestria."
    },
    11: {
        title: "La Sorellanza Eretica, i Grandi Progetti e la Visione del Futuro",
        roman: "XI",
        sector: "Campo del Collettivo Risvegliato • Reti Elettive, Ideali Utopici e Libertà",
        naturalRuler: "Urano / Saturno (Acquario)",
        func: "Presiede ai circoli di affinità elettiva, alla cooperazione tra pari risvegliati e alla capacità di rompere le consuetudini per inaugurare tempi nuovi.",
        shadow: "Conformismo di gruppo mascherato da ribellione, o distacco intellettuale freddo e privo di solidarietà viscerale.",
        directive: "Unisciti a chi condivide il tuo medesimo fuoco: la libertà è titanica quando ciascuna rimane integra e incorrotta."
    },
    12: {
        title: "Il Caos Primigenio, la Memoria Inconscia e il Ritorno alla Fonte",
        roman: "XII",
        sector: "Santuario dell'Invisibile • Solitudine Sacra, Trascendenza e Risveglio",
        naturalRuler: "Nettuno / Giove (Pesci)",
        func: "L'oceano dell'inconscio collettivo, la solitudine iniziatica e la dissoluzione dei limiti dell'ego per attingere al mistero e alla chiaroveggenza mistica.",
        shadow: "Vittimismo cronico, fuga in dipendenze o illusioni autodistruttive per paura di affrontare la solitudine.",
        directive: "Immergiti nelle acque profonde del tuo abisso interiore: là dove finisce l'illusione dell'ego comincia l'eternità."
    }
};

const LILITH_ANGLE_ARCHETYPES = {
    'ASC': {
        title: "Ascendente (ASC) • La Maschera Iniziatica e l'Impatto Magnetico",
        code: "ASC",
        sector: "Asse Orizzontale Orientale • Cuspide Fondativa di Casa 1",
        func: "È l'orizzonte orientale esatto all'istante della tua incarnazione: definisce il tuo campo bioenergetico, la prima impressione che imprimi sul mondo e il tuo modo istintivo di aprirti la strada.",
        shadow: "Identificarsi unicamente con l'apparenza esteriore, o recitare ruoli compiacenti per evitare l'attrito con l'ambiente.",
        directive: "Fai coincidere perfettamente la tua maschera con il tuo nucleo più profondo: la tua presenza deve comandare la stanza prima ancora che tu parli."
    },
    'MC': {
        title: "Medio Cielo (MC) • Il Pinnacolo del Potere e la Vocazione Sovrana",
        code: "MC",
        sector: "Asse Verticale Superiore • Zenith Celeste e Cuspide di Casa 10",
        func: "Il punto più alto raggiunto dalla sfera celeste: simboleggia l'apice del tuo destino mondano, la tua reputazione imperitura e la grandezza dell'opera che lascerai in eredità.",
        shadow: "Sindrome dell'impostore, compromessi d'onore per conformarsi al potere convenzionale o rifiuto delle proprie responsabilità storiche.",
        directive: "Punta alla vetta senza mai abbassare lo sguardo: la tua opera terrena è il testamento sacro della tua anima."
    },
    'DSC': {
        title: "Discendente (DSC) • Il Portale Relazionale e lo Specchio dell'Altro",
        code: "DSC",
        sector: "Asse Orizzontale Occidentale • Cuspide Relazionale di Casa 7",
        func: "L'orizzonte occidentale al calar del Sole: rappresenta le qualità che tendi ad attrarre e proiettare negli altri, nonché la porta d'accesso alle alleanze paritarie trasmutative.",
        shadow: "Attrarre alleati deboli o dominanti per paura di integrare le proprie qualità negate.",
        directive: "Riconosci nello sguardo dell'altro ciò che rifiuti di te stessa; trasforma ogni incontro in un patto di mutuo risveglio."
    },
    'IC': {
        title: "Fondo Cielo (IC) • Il Cuore della Notte e le Radici Ancestrali",
        code: "IC",
        sector: "Asse Verticale Inferiore • Nadir Celeste e Cuspide di Casa 4",
        func: "Il punto più profondo sotto la linea d'orizzonte: custodisce la sorgente notturna della tua energia, il lignaggio biologico e il fondamento su cui poggia l'intera tua esistenza.",
        shadow: "Stagnazione nel passato familiare tossico o paralisi regressiva nelle ferite d'infanzia.",
        directive: "Affonda le tue radici nella terra più oscura e ricca: più profonde sono le tue radici ancestrali, più titanico sarà il tuo slancio verso l'alto."
    },
    'Vx': {
        title: "Vertex (Vx) • Il Cancello del Destino Karmico e gli Incontri Iniziatici",
        code: "Vx",
        sector: "Punto Eclittico Speciale • Primo Verticale Occidentale",
        func: "Intersezione tra il primo verticale e l'eclittica: agisce come un vortice di attrazione per svolte repentine del destino, incontri con anime maestre e bivi evolutivi non programmabili.",
        shadow: "Resistenza ostinata alle svolte necessarie o sensazione di fatalismo impotente davanti agli eventi fatidici.",
        directive: "Quando il cancello del Vertex si spalanca, varcalo senza esitare: ciò che accade è la chiamata urgente della tua evoluzione."
    }
};

function getHouseAndAngleItems(houses) {
    if (!houses) return [];
    const items = [];

    // 12 Case Zodiacali
    if (houses.cusps && Array.isArray(houses.cusps)) {
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        houses.cusps.forEach(c => {
            const num = c.house_number;
            items.push({
                type: 'house',
                house_number: num,
                name: `Casa ${num}`,
                roman: romanNumerals[num - 1] || `${num}`,
                sign: c.sign,
                sign_it: c.sign_it,
                degree: c.degree,
                minute: c.minute,
                longitude: c.longitude,
                formatted: c.formatted
            });
        });
    }

    // 5 Angoli Cardinai e Punti Iniziatici
    if (houses.angles) {
        const a = houses.angles;
        if (a.ascendant) {
            items.push({
                type: 'angle',
                code: 'ASC',
                name: 'Ascendente (ASC)',
                roman: 'ASC',
                sign: a.ascendant.sign,
                sign_it: a.ascendant.sign_it,
                degree: a.ascendant.degree,
                minute: a.ascendant.minute,
                longitude: a.ascendant.longitude,
                formatted: a.ascendant.formatted
            });
        }
        if (a.mc) {
            items.push({
                type: 'angle',
                code: 'MC',
                name: 'Medio Cielo (MC)',
                roman: 'MC',
                sign: a.mc.sign,
                sign_it: a.mc.sign_it,
                degree: a.mc.degree,
                minute: a.mc.minute,
                longitude: a.mc.longitude,
                formatted: a.mc.formatted
            });
        }
        if (a.descendant) {
            items.push({
                type: 'angle',
                code: 'DSC',
                name: 'Discendente (DSC)',
                roman: 'DSC',
                sign: a.descendant.sign,
                sign_it: a.descendant.sign_it,
                degree: a.descendant.degree,
                minute: a.descendant.minute,
                longitude: a.descendant.longitude,
                formatted: a.descendant.formatted
            });
        }
        if (a.ic) {
            items.push({
                type: 'angle',
                code: 'IC',
                name: 'Fondo Cielo (IC)',
                roman: 'IC',
                sign: a.ic.sign,
                sign_it: a.ic.sign_it,
                degree: a.ic.degree,
                minute: a.ic.minute,
                longitude: a.ic.longitude,
                formatted: a.ic.formatted
            });
        }
        if (a.vertex) {
            items.push({
                type: 'angle',
                code: 'Vx',
                name: 'Vertex (Vx)',
                roman: 'Vx',
                sign: a.vertex.sign,
                sign_it: a.vertex.sign_it,
                degree: a.vertex.degree,
                minute: a.vertex.minute,
                longitude: a.vertex.longitude,
                formatted: a.vertex.formatted
            });
        }
    }

    return items;
}

function getHouseOrAngleInterpretation(item) {
    const signMeta = LILITH_SIGN_METADATA[item.sign] || {
        name_it: item.sign_it || item.sign,
        ruler: 'Cosmico',
        element: 'Celeste',
        modality: 'Fissa',
        mode: 'con determinazione e chiarezza',
        style: 'Sovrano'
    };

    if (item.type === 'angle') {
        const angleArch = LILITH_ANGLE_ARCHETYPES[item.code] || {
            title: `${item.name} in ${signMeta.name_it}`,
            code: item.code,
            sector: "Punto Iniziativo Celeste",
            func: `Punto focale delle energie del tema natale allineato al grado ${item.formatted}.`,
            shadow: "Disallineamento tra la funzione dell'angolo e la coscienza cosciente.",
            directive: "Integra questo asse con lucidità e fermezza sovrana."
        };

        return {
            title: `${item.name} in ${signMeta.name_it}`,
            subtitle: `${item.formatted} • Angolo Iniziativo • Governatore: ${signMeta.ruler}`,
            sector: angleArch.sector,
            ruler: signMeta.ruler,
            element: signMeta.element,
            modality: signMeta.modality,
            func: angleArch.func,
            manifestation: `Nel segno ${getSignArticulated(signMeta.name_it)} (${signMeta.element} ${signMeta.modality}), l'asse opera ${signMeta.mode}. Questo conferisce un'impronta da ${signMeta.style.toLowerCase()}, guidata dal principio archetipico di ${signMeta.ruler}.`,
            shadow: angleArch.shadow,
            directive: angleArch.directive
        };
    } else {
        const houseArch = LILITH_HOUSE_ARCHETYPES[item.house_number] || {
            title: `Casa ${item.house_number} in ${signMeta.name_it}`,
            roman: item.roman,
            sector: `Settore ${item.house_number}`,
            func: `Ambito di manifestazione per le esperienze connesse alla Casa ${item.house_number}.`,
            shadow: "Dinamiche reattive non portate a piena consapevolezza.",
            directive: "Governa questo settore con autonomia e consapevolezza sovrana."
        };

        return {
            title: `Casa ${item.house_number} (${houseArch.roman}) in ${signMeta.name_it}`,
            subtitle: `${item.formatted} • Cuspide di Casa • Governatore: ${signMeta.ruler}`,
            sector: houseArch.sector,
            ruler: signMeta.ruler,
            naturalRuler: houseArch.naturalRuler || 'Archetipo Naturale',
            element: signMeta.element,
            modality: signMeta.modality,
            func: houseArch.func,
            manifestation: `Con la cuspide in ${signMeta.name_it} (${signMeta.element} ${signMeta.modality}), l'energia di questo settore si esprime ${signMeta.mode}. La tua azione qui assume i tratti ${getStyleArticulated(signMeta.style)}, richiamando la forza archetipica di ${signMeta.ruler}.`,
            shadow: houseArch.shadow,
            directive: houseArch.directive
        };
    }
}

function renderLilithHousesTable(houses) {
    const tbody = document.querySelector('#lilith-houses-table tbody');
    if (!tbody || !houses || !houses.cusps) return;

    const items = getHouseAndAngleItems(houses);
    if (!items || items.length === 0) return;

    let html = '';
    items.forEach((item, idx) => {
        // Intestazione sezione angoli cardinali dopo le 12 case
        if (idx === 12) {
            html += `
                <tr style="border-top:2px solid var(--lilith-border);background:rgba(255,90,31,0.06);color:var(--lilith-oro);font-weight:bold;">
                    <td colspan="3" style="padding:0.6rem 0.8rem;letter-spacing:0.05em;font-size:0.8rem;text-transform:uppercase;">
                        ⚸ Angoli Cardinali &amp; Punti Iniziatici
                    </td>
                </tr>
            `;
        }

        const isAngle = (item.type === 'angle');
        const badgeClass = isAngle ? 'lilith-house-badge-pill angle' : 'lilith-house-badge-pill';

        html += `
            <tr class="lilith-clickable-row house-row-item" onclick="openHouseModalByIndex(${idx})" title="Clicca per aprire la scheda di ${item.name}">
                <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span class="${badgeClass}">${item.roman}</span>
                        <strong>${item.name}</strong>
                    </div>
                </td>
                <td class="lilith-cell-mono">${item.formatted || '-'}</td>
                <td style="text-align:right;">
                    <button type="button" class="lilith-row-inspect-btn" onclick="event.stopPropagation(); openHouseModalByIndex(${idx});">
                        Leggi ⚸
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function renderLilithAspectsTable(aspects) {
    const tbody = document.querySelector('#lilith-aspects-table tbody');
    if (!tbody || !aspects) return;

    tbody.innerHTML = aspects.map((a, idx) => {
        const color = LilithChartRenderer.aspectColors[a.aspect] || LilithChartRenderer.aspectColors[a.aspect_it] || '#c7a56b';
        const strVal = a.strength ? (a.strength * 100).toFixed(0) : '85';
        const aspName = (a.aspect || a.aspect_type || a.aspect_it || '').toLowerCase();
        const isTension = (a.nature === 'tension' || a.nature === 'tensione' || ['opposition', 'square', 'semisquare', 'sesquiquadrate', 'opposizione', 'quadratura'].includes(aspName));
        const isFusion = (a.nature === 'fusione' || aspName.includes('conj') || aspName.includes('congiun'));
        const natureLabel = isTension ? '<span class="lilith-tag-tension">Tensione</span>' : (isFusion ? '<span class="lilith-tag-fusion">Fusione</span>' : '<span class="lilith-tag-harmony">Armonico</span>');

        let category = 'minor';
        if (['conjunction', 'opposition', 'square', 'trine', 'sextile', 'congiunzione', 'opposizione', 'quadratura', 'trigono', 'sestile'].includes(aspName)) {
            category = 'major';
        }
        if (['opposition', 'square', 'semisquare', 'sesquiquadrate', 'opposizione', 'quadratura'].includes(aspName) || isTension) {
            category = 'tension';
        }
        if (['trine', 'sextile', 'semisextile', 'trigono', 'sestile'].includes(aspName)) {
            category = 'harmonic';
        }

        const p1Name = getPlanetDisplayName(a.planet1);
        const p2Name = getPlanetDisplayName(a.planet2);
        const aspDisplayName = a.aspect_it || getAspectDisplayName(a.aspect);
        const labelFormatted = `${p1Name} ${aspDisplayName} ${p2Name}`;

        return `
            <tr class="lilith-clickable-row aspect-row-item" data-category="${category}" onclick="openAspectModalByIndex(${idx})" title="Clicca per aprire la scheda dell'aspetto">
                <td>
                    <div style="display:flex;align-items:center;gap:6px;">
                        <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${color};box-shadow:0 0 8px ${color};flex-shrink:0;"></span>
                        <strong>${labelFormatted}</strong>
                    </div>
                </td>
                <td style="color:${color};font-weight:700;">${aspDisplayName}</td>
                <td class="lilith-cell-mono">${a.orb.toFixed(1)}°</td>
                <td>${natureLabel}</td>
                <td style="text-align:right;">
                    <button type="button" class="lilith-row-inspect-btn" onclick="event.stopPropagation(); openAspectModalByIndex(${idx});">
                        Leggi ⚸
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    if (typeof LilithChartRenderer !== 'undefined' && typeof LilithChartRenderer.applyAspectFilter === 'function') {
        LilithChartRenderer.applyAspectFilter();
    }
}

function renderLilithDominanceTab(data) {
    const elElem = document.getElementById('lilith-dom-elem');
    const elMod = document.getElementById('lilith-dom-mod');
    const tbody = document.querySelector('#lilith-dominance-table tbody');

    if (elElem) elElem.textContent = data.dominant_element || '-';
    if (elMod) elMod.textContent = data.dominant_modality || '-';

    if (!tbody) return;

    let domList = data.planetary_dominance;
    if ((!domList || domList.length === 0) && data.planets) {
        // Fallback autonomo se la lista non è ancora calcolata
        const coreNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Lilith'];
        const weights = { "Sun": 3.5, "Moon": 3.5, "Mercury": 2, "Venus": 2, "Mars": 2, "Jupiter": 1.5, "Saturn": 1.5, "Lilith": 2.5, "Uranus": 1, "Neptune": 1, "Pluto": 1.5 };
        let sumScores = 0;
        domList = data.planets.filter(p => coreNames.includes(p.name)).map(p => {
            let sc = (weights[p.name] || 1.5) * 5.0;
            if (p.dignity === 'Domicilio') sc += 7;
            else if (p.dignity === 'Esaltazione') sc += 5;
            if ([1, 10].includes(p.house)) sc += 6;
            else if ([4, 7].includes(p.house)) sc += 4;
            sc = Math.max(5, Math.round(sc));
            sumScores += sc;
            return { planet: p.name, it_name: p.it_name || getPlanetDisplayName(p.name), score: sc };
        });
        domList.forEach(d => {
            d.percentage = sumScores > 0 ? parseFloat(((d.score / sumScores) * 100).toFixed(1)) : 0;
        });
        domList.sort((a, b) => b.score - a.score);
        data.planetary_dominance = domList;
    }

    if (!domList || domList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--lilith-dim);padding:1rem;">Nessuna dominanza calcolata.</td></tr>';
        return;
    }

    tbody.innerHTML = domList.map((d, i) => {
        const glyph = (typeof LilithChartRenderer !== 'undefined' && LilithChartRenderer.planetSymbols[d.planet]) || '⚸';
        const pName = d.it_name || getPlanetDisplayName(d.planet);
        const isLeader = (i === 0);
        const isLilith = (d.planet === 'Lilith' || d.planet === 'Lilith Media' || d.planet === 'Lilith (Vera)');
        const badgeColor = isLilith ? 'background:rgba(255,90,31,0.25);border-color:#ff5a1f;color:#ff5a1f;' : (isLeader ? 'background:rgba(199,165,107,0.3);border-color:var(--lilith-oro);color:var(--lilith-oro);' : '');

        return `
            <tr class="lilith-clickable-row dominance-row-item" onclick="openDominanceModalByIndex(${i})" title="Clicca per approfondire la dominanza di ${pName}">
                <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span class="lilith-house-badge-pill ${isLeader ? 'angle' : ''}" style="${badgeColor}">${i + 1}°</span>
                        <span style="display:inline-block;width:20px;font-size:1.1rem;color:${isLilith ? '#ff5a1f' : 'var(--lilith-oro)'};">${glyph}</span>
                        <div>
                            <strong style="${isLilith ? 'color:#ff5a1f;' : ''}">${pName}</strong>
                            ${isLeader ? ' <span style="font-size:0.75rem;color:var(--lilith-oro);font-weight:bold;">👑 Sovrano</span>' : ''}
                        </div>
                    </div>
                </td>
                <td><strong style="color:var(--lilith-oro);">${d.score}</strong> pts</td>
                <td class="lilith-cell-mono">${d.percentage ? d.percentage.toFixed(1) : '0.0'}%</td>
                <td style="text-align:right;">
                    <button type="button" class="lilith-row-inspect-btn" onclick="event.stopPropagation(); openDominanceModalByIndex(${i});">
                        Leggi ⚸
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ============== ANALISI OPERATIVA 7 PUNTI ==============

function renderLilithOperationalAnalysis(data) {
    const container = document.getElementById('lilith-analysis-container');
    if (!container) return;

    const interp = data.interpretation || {};
    const planetsInterp = interp.planets || {};

    const groups = [
        {
            title: "1. Coscienza Primordiale & Radici dell'Io",
            desc: "Sole (Volontà Sovrana), Luna (Matrice dell'Inconscio) e Maschera d'Entrata (Ascendente).",
            keys: ["Sun", "Moon", "Ascendente", "Sole", "Luna"]
        },
        {
            title: "2. Canali Operativi & Assertività nel Mondo",
            desc: "Mercurio (Intelletto e Parola), Venere (Filtro dei Desideri) e Marte (Azione Tagliente).",
            keys: ["Mercury", "Venus", "Mars", "Mercurio", "Venere", "Marte"]
        },
        {
            title: "3. Legge Strutturale & Sovranità",
            desc: "Giove (Espansione e Vocazione) e Saturno (Confini, Maestria del Tempo e Realismo).",
            keys: ["Jupiter", "Saturn", "Giove", "Saturno"]
        },
        {
            title: "4. Riconfigurazione Transpersonale & Metamorfosi",
            desc: "Urano (Rottura dei Condizionamenti), Nettuno (Trascendenza) e Plutone (Potere Sotterraneo).",
            keys: ["Uranus", "Neptune", "Pluto", "Urano", "Nettuno", "Plutone"]
        },
        {
            title: "5. L'Ombra Sacra: Lilith, Chirone & Nodi Iniziatici",
            desc: "La Ferita Guaritrice di Chirone e la Sovranità Incondizionata della Luna Nera (Lilith).",
            keys: ["Lilith", "TrueLilith", "Lilith Media", "Lilith (Vera)", "Chiron", "Chirone", "TrueNode", "MeanNode", "Nodo Nord"]
        },
        {
            title: "6. Archetipi del Femminile & Geometrie del Destino",
            desc: "Cerere (Nutrimento Sacro), Pallade (Strategia), Giunone (Patto), Vesta (Fuoco Interiore), Fortuna e Vertex.",
            keys: ["Ceres", "Pallas", "Juno", "Vesta", "Cerere", "Pallade", "Giunone", "ParsFortunae", "Punto di Fortuna", "Vertex"]
        }
    ];

    let html = '';

    groups.forEach(g => {
        const groupItems = [];
        const seen = new Set();

        g.keys.forEach(k => {
            if (planetsInterp[k] && !seen.has(planetsInterp[k].title)) {
                seen.add(planetsInterp[k].title);
                groupItems.push({ key: k, analysis: planetsInterp[k] });
            }
        });

        if (groupItems.length > 0) {
            html += `
                <div class="lilith-analytic-group">
                    <div class="lilith-group-head">
                        <h4>${g.title}</h4>
                        <p>${g.desc}</p>
                    </div>
                    ${groupItems.map(item => render7PointLilithCard(item.key, item.analysis)).join('')}
                </div>
            `;
        }
    });

    if (interp.aspects && interp.aspects.length > 0) {
        html += `
            <div class="lilith-analytic-group">
                <div class="lilith-group-head">
                    <h4>7. Tensioni & Raggi d'Integrazione Primari</h4>
                    <p>Decodifica dei nodi di forza che mettono alla prova la tua sovranità.</p>
                </div>
                ${interp.aspects.slice(0, 6).map(a => {
                    const p1 = getPlanetDisplayName(a.planet1);
                    const p2 = getPlanetDisplayName(a.planet2);
                    return render7PointLilithCard(`${p1} ↔ ${p2}`, a);
                }).join('')}
            </div>
        `;
    }

    container.innerHTML = html;
}

// Lettura a strati: segno, casa, dignità, moto. Ogni strato dice una cosa
// che gli altri non dicono, con un testo proprio di quella combinazione.
function renderLilithBodyLayers(layers) {
    if (!layers) return '';
    const order = [
        ['sign', 'tag-strato-segno'],
        ['house', 'tag-strato-casa'],
        ['dignity', 'tag-strato-dignita'],
        ['retrograde', 'tag-strato-moto']
    ];
    const paragraphs = txt => String(txt).split(/\n{2,}/).map(p => `<p>${escapeLilithHtml(p)}</p>`).join('');

    const blocks = order
        .filter(([k]) => layers[k] && layers[k].text)
        .map(([k, cls]) => `
            <div class="lilith-layer-block ${cls}">
                <h6>${escapeLilithHtml(layers[k].title || '')}</h6>
                ${paragraphs(layers[k].text)}
            </div>`)
        .join('');

    // Terzo strato: la sintesi segno × casa, nei due registri.
    const c = layers.combination;
    const synthesis = (c && (c.canonico || c.lilithiano)) ? `
        <div class="lilith-layer-block tag-strato-sintesi">
            <h6>${escapeLilithHtml(c.title || 'Sintesi')}</h6>
            ${c.canonico ? `<div class="lilith-registro lilith-registro-canonico">
                <span class="lilith-registro-tag">Insegnamento canonico</span>
                ${paragraphs(c.canonico)}
            </div>` : ''}
            ${c.lilithiano ? `<div class="lilith-registro lilith-registro-lilithiano">
                <span class="lilith-registro-tag">Insegnamento lilithiano</span>
                ${paragraphs(c.lilithiano)}
            </div>` : ''}
        </div>` : '';

    if (!blocks && !synthesis) return '';
    return `<div class="lilith-layers">${blocks}${synthesis}</div>`;
}

function render7PointLilithCard(key, a) {
    const glyph = LilithChartRenderer.planetSymbols[key] || '⚸';
    return `
        <div class="lilith-7point-card">
            <div class="lilith-card-head">
                <span class="card-glyph">${glyph}</span>
                <h5>${a.title || key}</h5>
            </div>

            ${renderLilithBodyLayers(a.layers)}

            <div class="lilith-point-row">
                <span class="lilith-pt-tag tag-funzione">1. Funzione</span>
                <p>${a.function || '-'}</p>
            </div>
            <div class="lilith-point-row">
                <span class="lilith-pt-tag tag-manifestazione">2. Manifestazione</span>
                <p>${a.manifestation || '-'}</p>
            </div>
            <div class="lilith-point-row">
                <span class="lilith-pt-tag tag-ombra">3. Ombra Inconscia</span>
                <p style="color:#fca5a5;">${a.shadow || '-'}</p>
            </div>
            <div class="lilith-point-row">
                <span class="lilith-pt-tag tag-costruttivo">4. Integrazione</span>
                <p style="color:#a7f3d0;">${a.constructive || '-'}</p>
            </div>
            <div class="lilith-point-row">
                <span class="lilith-pt-tag tag-contesto">5. Contesto</span>
                <p>${a.context || '-'}</p>
            </div>
            <div class="lilith-point-row">
                <span class="lilith-pt-tag tag-errori">6. Errori Tipici</span>
                <p style="color:#fdba74;">${a.errors || '-'}</p>
            </div>
            <div class="lilith-point-row lilith-directive-box">
                <span class="lilith-pt-tag tag-direttiva">7. Direttiva</span>
                <p style="color:#ffffff;"><strong>${a.directive || '-'}</strong></p>
            </div>
            ${a.dark_eros ? `
            <div class="lilith-eros-box">
                <span class="tag-eros">🔥 8. Eros Oscuro &amp; Lussuria Iniziatica (L'Ombra da Cavalcare)</span>
                <p>${a.dark_eros}</p>
            </div>` : ''}
        </div>
    `;
}

// ============== RILETTURA LILITHIANA: DOMINIO, POTERE ED EROS OSCURO ==============

function renderLilithDarkReading(data) {
    const container = document.getElementById('lilith-dark-reading-container');
    if (!container) return;

    const dark = data.dark_reading || (window.generateLilithDarkInterpretation && window.generateLilithDarkInterpretation(data.planets, data.aspects, data.houses));
    if (!dark) return;

    let html = `
        <!-- Proclama di Sovranità & Manifesto -->
        <div class="lilith-dark-manifesto-card">
            <div class="lilith-manifesto-crown">👑 ⚸ 👑</div>
            <h4>${dark.manifesto_title}</h4>
            <p class="lilith-manifesto-text">${dark.manifesto_lead}</p>
            <div class="lilith-manifesto-synthesis">
                <strong>⚡ Sintesi di Potere:</strong> ${dark.dominance_synthesis}
            </div>
        </div>

        <!-- Sezione 1: I Centri Planetari di Dominio & Lussuria -->
        <div class="lilith-dark-section">
            <div class="lilith-dark-section-title">
                <span class="dark-section-icon">🔥</span>
                <div>
                    <h4>I Centri di Comando &amp; Lussuria Sacra</h4>
                    <p>Come ogni archetipo celeste esprime la propria volontà di potenza e il proprio fuoco carnale.</p>
                </div>
            </div>

            <div class="lilith-dark-planets-grid">
                ${(dark.planets_dark || []).map(p => `
                    <div class="lilith-dark-planet-card">
                        <div class="dark-planet-head">
                            <span class="dark-planet-glyph">${p.glyph}</span>
                            <div>
                                <h5>${p.title}</h5>
                                <span class="dark-planet-sub">${p.formatted} • Casa ${p.house}</span>
                            </div>
                        </div>

                        <div class="dark-card-row row-dominion">
                            <span class="dark-row-tag tag-dominion">👑 Volontà di Dominio &amp; Sovranità</span>
                            <p>${p.dominion_power}</p>
                        </div>

                        <div class="dark-card-row row-eros">
                            <span class="dark-row-tag tag-eros-dark">🔥 Lussuria Iniziatica &amp; Fuoco Carnale</span>
                            <p>${p.dark_eros}</p>
                        </div>

                        <div class="dark-card-row row-taboo">
                            <span class="dark-row-tag tag-taboo">🌑 Tabù da Infrangere Senza Pietà</span>
                            <p>${p.taboo_to_shatter}</p>
                        </div>

                        <div class="dark-card-row row-decree">
                            <span class="dark-row-tag tag-decree">🧭 Decreto Sovrano di Lilith</span>
                            <p><strong>${p.lilithian_decree}</strong></p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Sezione 2: Le Geometrie Erotiche & I Nodi di Potere -->
        ${dark.aspects_dark && dark.aspects_dark.length > 0 ? `
        <div class="lilith-dark-section" style="margin-top: 2.5rem;">
            <div class="lilith-dark-section-title">
                <span class="dark-section-icon">⚔️</span>
                <div>
                    <h4>Le Geometrie di Conquista &amp; Raggi di Potere</h4>
                    <p>Come i contatti angolari tra i tuoi pianeti forgiano alleanze carnali e attriti di sopraffazione alchemica.</p>
                </div>
            </div>

            <div class="lilith-dark-aspects-grid">
                ${dark.aspects_dark.map(a => `
                    <div class="lilith-dark-aspect-card">
                        <div class="dark-aspect-head">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="color:#ff5a1f;font-weight:bold;font-size:1.1rem;">⚡</span>
                                <h5>${a.title}</h5>
                            </div>
                            <span class="dark-aspect-orb">Orbe: ${a.orb ? a.orb.toFixed(2) : '0.00'}° • Natura: ${a.nature}</span>
                        </div>

                        <div class="dark-card-row row-dynamic" style="margin-top:0.6rem;">
                            <span class="dark-row-tag tag-dynamic">🌀 Dinamica Erotica &amp; Tensione di Comando</span>
                            <p>${a.dynamic}</p>
                        </div>

                        <div class="dark-card-row row-transmutation" style="margin-top:0.5rem;">
                            <span class="dark-row-tag tag-transmutation">👑 Trasmutazione in Potere Assoluto</span>
                            <p><strong>${a.transmutation}</strong></p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;

    container.innerHTML = html;
}
window.renderLilithDarkReading = renderLilithDarkReading;

// ============== MOTORE DI LETTURA SINTETICA UNIFICATA A 5 DIMENSIONI (CODEX ASTRA) ==============

function renderLilithUnifiedReading(data) {
    const container = document.getElementById('lilith-unified-synthesis-container');
    if (!container) return;

    let synthesis = data.unified_reading;
    if (!synthesis && window.generateUnifiedLilithReading) {
        synthesis = window.generateUnifiedLilithReading(data.planets, data.aspects, data.houses, {
            dominant_element: data.dominant_element,
            dominant_modality: data.dominant_modality,
            chart_signature: data.chart_signature
        });
    }
    if (!synthesis || !synthesis.html) return;

    container.innerHTML = synthesis.html;
}
window.renderLilithUnifiedReading = renderLilithUnifiedReading;

// ============== SEZIONE KARMA & DESTINO SOVRANO ==============

function renderLilithKarmaDestiny(data) {
    const container = document.getElementById('lilith-karma-destiny-container');
    if (!container) return;

    const karma = data.karma_destiny || (window.generateLilithKarmaDestiny && window.generateLilithKarmaDestiny(data.planets, data.aspects, data.houses));
    if (!karma) return;

    const c = karma.coords_summary || {};
    const why = karma.why_here || {};
    const what = karma.what_to_do || {};
    const where = karma.where_to_go || {};

    let html = `
        <!-- Barra Coordinate Karmiche Astrali -->
        <div class="lilith-karma-coords-bar">
            <div class="lilith-karma-coord-item">
                <span class="coord-lbl">☊ Nodo Nord (Stella Polare)</span>
                <strong class="coord-val">${c.north_node || '-'}</strong>
            </div>
            <div class="lilith-karma-coord-item">
                <span class="coord-lbl">☋ Nodo Sud (Origine Animica)</span>
                <strong class="coord-val">${c.south_node || '-'}</strong>
            </div>
            <div class="lilith-karma-coord-item">
                <span class="coord-lbl">♄ Saturno (Debito di Tempo)</span>
                <strong class="coord-val">${c.saturn || '-'}</strong>
            </div>
            <div class="lilith-karma-coord-item">
                <span class="coord-lbl">♇ Plutone (Morte &amp; Rinascita)</span>
                <strong class="coord-val">${c.pluto || '-'}</strong>
            </div>
            <div class="lilith-karma-coord-item">
                <span class="coord-lbl">⚸ Lilith (Fiamma Sovrana)</span>
                <strong class="coord-val">${c.lilith || '-'}</strong>
            </div>
            <div class="lilith-karma-coord-item">
                <span class="coord-lbl">𝒱 Vertex (Bivio del Fato)</span>
                <strong class="coord-val">${c.vertex || '-'}</strong>
            </div>
            <div class="lilith-karma-coord-item">
                <span class="coord-lbl">🏛️ MC (Opera Regale)</span>
                <strong class="coord-val">${c.mc || '-'}</strong>
            </div>
        </div>

        <!-- I 3 GRANDI PILASTRI DELL'ANIMA -->
        <div class="lilith-karma-pillars-grid">
            
            <!-- PILASTRO 1: PERCHÉ HO DECISO DI ESSERE QUI? -->
            <article class="lilith-karma-card pillar-origin">
                <div class="lilith-karma-card-header">
                    <span class="pillar-num">PILASTRO I</span>
                    <h4>🌌 ${why.title || "Perché ho deciso di essere qui? (L'Origine &amp; il Patto d'Incarnazione)"}</h4>
                </div>
                <div class="lilith-karma-lead-box">
                    <p>${why.pact_lead || ''}</p>
                </div>

                <div class="lilith-karma-subitems">
                    <div class="lilith-karma-subitem">
                        <div class="subitem-head">
                            <span class="subitem-icon">☋</span>
                            <h5>${why.south_node_title || 'L\'Eredità Ancestrale del Nodo Sud'}</h5>
                        </div>
                        <p>${why.south_node_text || ''}</p>
                    </div>

                    <div class="lilith-karma-subitem">
                        <div class="subitem-head">
                            <span class="subitem-icon">♄</span>
                            <h5>${why.saturn_title || 'La Palestra del Tempo &amp; Il Debito di Struttura'}</h5>
                        </div>
                        <p>${why.saturn_text || ''}</p>
                    </div>

                    <div class="lilith-karma-subitem">
                        <div class="subitem-head">
                            <span class="subitem-icon">♇</span>
                            <h5>${why.pluto_title || 'Il Riscatto delle Ceneri'}</h5>
                        </div>
                        <p>${why.pluto_text || ''}</p>
                    </div>
                </div>
            </article>

            <!-- PILASTRO 2: COSA DEVO FARE? -->
            <article class="lilith-karma-card pillar-action">
                <div class="lilith-karma-card-header">
                    <span class="pillar-num">PILASTRO II</span>
                    <h4>⚡ ${what.title || "Cosa devo fare? (L'Alchimia del Presente &amp; l'Inerzia da Spezzare)"}</h4>
                </div>
                <div class="lilith-karma-lead-box">
                    <p>${what.lead || ''}</p>
                </div>

                <div class="lilith-karma-subitems">
                    <div class="lilith-karma-subitem trap-box">
                        <div class="subitem-head">
                            <span class="subitem-icon">⚠️</span>
                            <h5>${what.trap_title || 'La Trappola Meccanica da Disinnescare'}</h5>
                        </div>
                        <p>${what.trap_text || ''}</p>
                    </div>

                    <div class="lilith-karma-subitem action-box">
                        <div class="subitem-head">
                            <span class="subitem-icon">🗝️</span>
                            <h5>${what.action_title || 'L\'Atto di Deprogrammazione Quotidiana'}</h5>
                        </div>
                        <p>${what.action_text || ''}</p>
                    </div>

                    <div class="lilith-karma-directive-callout">
                        <div class="directive-icon">⚸</div>
                        <div>
                            <strong>Direttiva Iniziatica del Presente:</strong>
                            <p>${what.daily_directive || ''}</p>
                        </div>
                    </div>
                </div>
            </article>

            <!-- PILASTRO 3: DOVE DEVO ANDARE? -->
            <article class="lilith-karma-card pillar-destination">
                <div class="lilith-karma-card-header">
                    <span class="pillar-num">PILASTRO III</span>
                    <h4>🧭 ${where.title || "Dove devo andare? (La Stella Polare del Destino &amp; il Trono di Lilith)"}</h4>
                </div>
                <div class="lilith-karma-lead-box">
                    <p>${where.lead || ''}</p>
                </div>

                <div class="lilith-karma-subitems">
                    <div class="lilith-karma-subitem destiny-highlight">
                        <div class="subitem-head">
                            <span class="subitem-icon">☊</span>
                            <h5>${where.north_node_title || 'La Stella Polare del Nodo Nord'}</h5>
                        </div>
                        <p>${where.north_node_text || ''}</p>
                    </div>

                    <div class="lilith-karma-subitem">
                        <div class="subitem-head">
                            <span class="subitem-icon">𝒱</span>
                            <h5>${where.vertex_title || 'I Cancelli del Fato &amp; Gli Incontri Predestinati'}</h5>
                        </div>
                        <p>${where.vertex_text || ''}</p>
                    </div>

                    <div class="lilith-karma-subitem">
                        <div class="subitem-head">
                            <span class="subitem-icon">🏛️</span>
                            <h5>${where.mc_title || 'Il Monumento nel Mondo'}</h5>
                        </div>
                        <p>${where.mc_text || ''}</p>
                    </div>

                    <div class="lilith-karma-subitem lilith-highlight">
                        <div class="subitem-head">
                            <span class="subitem-icon">⚸</span>
                            <h5>${where.lilith_title || 'La Consacrazione della Fiamma di Lilith'}</h5>
                        </div>
                        <p>${where.lilith_text || ''}</p>
                    </div>
                </div>
            </article>

        </div>
    `;

    container.innerHTML = html;
}
window.renderLilithKarmaDestiny = renderLilithKarmaDestiny;

// ============== MODALE COMING SOON ==============

function openComingSoonModal(motivo) {
    const modal = document.getElementById('lilith-coming-soon-modal');
    if (!modal) return;

    // Quando la modale si apre perché il tema è maschile, va detto perché:
    // altrimenti sembra un guasto invece di una scelta editoriale.
    const intro = modal.querySelector('.lilith-coming-soon-intro');
    if (intro) {
        let nota = intro.querySelector('.lilith-coming-soon-nota');
        if (motivo === 'maschile') {
            if (!nota) {
                nota = document.createElement('p');
                nota.className = 'lilith-coming-soon-nota';
                intro.insertBefore(nota, intro.firstChild);
            }
            nota.innerHTML = '<strong>Il Canone maschile non è ancora scritto.</strong> '
                + 'La Lettura Lilithiana nasce dal femminile e ne parla la lingua: consegnarla a un uomo '
                + 'con i generi rovesciati sarebbe una contraffazione, non una cortesia. L’opera per il maschile '
                + 'è un lavoro distinto, già in cantiere.';
            nota.style.display = 'block';
        } else if (nota) {
            nota.style.display = 'none';
        }
    }

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
window.openComingSoonModal = openComingSoonModal;

function closeComingSoonModal() {
    const modal = document.getElementById('lilith-coming-soon-modal');
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
window.closeComingSoonModal = closeComingSoonModal;

window.handleLilithWaitlist = function(form) {
    const emailInput = document.getElementById('lilith-waitlist-email');
    const feedback = document.getElementById('lilith-waitlist-feedback');
    if (!emailInput || !emailInput.value) return;

    if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = `🔥 <strong>Patto Sigillato.</strong> L'indirizzo <em>${emailInput.value}</em> è stato inserito nel Registro Prioritario delle Figlie di Lilith. Riceverai la chiave d'accesso oracolare al momento del rilascio.`;
    }
    emailInput.disabled = true;
    const btn = form.querySelector('.cs-waitlist-btn');
    if (btn) {
        btn.textContent = 'Iscrizione Sigillata ⚸';
        btn.disabled = true;
    }
    showLilithToast("⚸ Iscrizione Prioritaria Confermata");
};

// ============== INSPECTOR ==============

function showEmptyLilithInspector() {
    const empty = document.getElementById('lilith-inspector-empty');
    const content = document.getElementById('lilith-inspector-content');
    if (empty) empty.style.display = 'flex';
    if (content) content.style.display = 'none';
}

function renderLilithPlanetInspector(p) {
    const empty = document.getElementById('lilith-inspector-empty');
    const content = document.getElementById('lilith-inspector-content');
    if (empty) empty.style.display = 'none';
    if (!content) return;
    content.style.display = 'block';

    const glyph = LilithChartRenderer.planetSymbols[p.name] || '⚸';
    const interp = p.interpretation || (currentLilithChartData?.interpretation?.planets?.[p.name]);
    const isLilith = (p.name === 'Lilith' || p.name === 'Lilith Media' || p.name === 'Lilith (Vera)');
    const displayName = p.it_name || getPlanetDisplayName(p.name);
    const signName = getSignDisplayName(p.sign);
    const categoryName = getCategoryDisplayName(p.category);

    content.innerHTML = `
        <div class="lilith-inspector-header">
            <div class="lilith-inspector-badge" style="${isLilith ? 'border-color:#ff5a1f;color:#ff5a1f;' : ''}">${glyph}</div>
            <div>
                <h4 style="${isLilith ? 'color:#ff5a1f;' : ''}">${displayName} in ${signName}</h4>
                <div class="lilith-inspector-coords">${p.formatted} • Casa ${p.house} • Grado ${p.sign_degree}°${p.sign_minute}</div>
            </div>
        </div>
        <div class="lilith-inspector-meta">
            <div><strong>Moto:</strong> ${p.is_retrograde ? '<span style="color:#c31818;">Retrogrado (R)</span>' : 'Diretto'}</div>
            <div><strong>Dignità:</strong> ${p.dignity || 'Nessuna'}</div>
            <div><strong>Categoria:</strong> ${categoryName}</div>
        </div>
        ${interp ? `
            <div class="lilith-inspector-brief">
                <div class="lilith-brief-row">
                    <strong>🎯 Funzione Operativa:</strong>
                    <p>${interp.function}</p>
                </div>
                <div class="lilith-brief-row">
                    <strong>⚡ Manifestazione:</strong>
                    <p>${interp.manifestation}</p>
                </div>
                <div class="lilith-brief-row">
                    <strong>🌑 Ombra da Riconoscere:</strong>
                    <p style="color:#fca5a5;">${interp.shadow}</p>
                </div>
                <div class="lilith-brief-row" style="border-top:1px dashed var(--lilith-border);padding-top:0.4rem;">
                    <strong>🧭 Direttiva Iniziatica:</strong>
                    <p style="color:#fff;"><strong>${interp.directive}</strong></p>
                </div>
                ${interp.dark_eros ? `
                <div class="lilith-brief-row" style="border-left: 3px solid #c026d3; background: linear-gradient(90deg, rgba(192,38,211,0.14) 0%, rgba(255,90,31,0.06) 100%); margin-top: 0.5rem; padding: 0.55rem 0.75rem; border-radius: 4px;">
                    <strong style="color:#fae8ff;">🔥 Eros Oscuro &amp; Lussuria Iniziatica (L'Ombra da Cavalcare):</strong>
                    <p style="color:#fae8ff;font-style:italic;margin-top:4px;">${interp.dark_eros}</p>
                </div>
                ` : ''}
            </div>
        ` : ''}
    `;
}

function renderLilithAspectInspector(aspect) {
    const empty = document.getElementById('lilith-inspector-empty');
    const content = document.getElementById('lilith-inspector-content');
    if (empty) empty.style.display = 'none';
    if (!content) return;
    content.style.display = 'block';

    const color = (window.LilithChartRenderer && (window.LilithChartRenderer.aspectColors[aspect.aspect] || window.LilithChartRenderer.aspectColors[aspect.aspect_it])) || '#c7a56b';
    const p1Name = getPlanetDisplayName(aspect.planet1);
    const p2Name = getPlanetDisplayName(aspect.planet2);
    const aspName = aspect.aspect_it || getAspectDisplayName(aspect.aspect);
    let interp = aspect.interpretation;

    if (!interp) {
        interp = {
            title: `${p1Name} in ${aspName} con ${p2Name}`,
            function: `Collegamento energetico di ${aspName} tra la funzione di ${p1Name} e il canale di ${p2Name}.`,
            manifestation: `Le due funzioni planetarie si attivano insieme nelle scelte di vita, nei nodi karmici e nelle relazioni primarie.`,
            shadow: `Rischio di polarizzazione o attrito interiore se cerchi di privilegiare un solo impulso reprimendo l'altro.`,
            directive: `Ascolta entrambi i poli con equanimità e trova una sintesi che esalti la tua sovranità personale.`
        };
    }

    const isTension = (aspect.nature === 'tension' || aspect.nature === 'tensione');
    const isFusion = (aspect.nature === 'fusione' || aspect.aspect === 'conjunction');
    const natureText = isTension
        ? '<span style="color:#ef4444;font-weight:bold;">Tensione Iniziatica (Sfida Evolutiva)</span>'
        : (isFusion
            ? '<span style="color:#a855f7;font-weight:bold;">Fusione Alchemica</span>'
            : '<span style="color:#c7a56b;font-weight:bold;">Armonia &amp; Flusso Naturale</span>');

    const formattedTitle = `${p1Name} ${aspName} ${p2Name}`;

    content.innerHTML = `
        <div class="lilith-inspector-header">
            <div style="width:22px;height:22px;border-radius:50%;background:${color};box-shadow:0 0 12px ${color};flex-shrink:0;"></div>
            <div>
                <h4 style="color:#ffffff;font-size:1.15rem;margin:0 0 4px 0;">${formattedTitle}</h4>
                ${interp.subtitle ? `<div style="color:var(--lilith-gold, #c7a56b);font-size:0.88rem;font-style:italic;margin-bottom:3px;">${interp.subtitle}</div>` : ''}
                <div class="lilith-inspector-coords">Angolo Esatto: ${aspect.angle}° • Scostamento d'Orbe: ${aspect.orb ? aspect.orb.toFixed(2) : '0.00'}°</div>
            </div>
        </div>
        <div class="lilith-inspector-meta">
            <div><strong>Natura:</strong> ${natureText}</div>
            <div><strong>Intensità:</strong> ${aspect.strength ? (aspect.strength * 100).toFixed(0) : '85'}%</div>
        </div>
        <div class="lilith-inspector-brief">
            <div class="lilith-brief-row">
                <strong>⚡ Significato &amp; Dinamica Fondamentale:</strong>
                <p>${interp.function || interp.manifestation}</p>
            </div>
            ${interp.manifestation ? `
            <div class="lilith-brief-row">
                <strong>🌀 Manifestazione nella Vita:</strong>
                <p>${interp.manifestation}</p>
            </div>` : ''}
            <div class="lilith-brief-row">
                <strong>🌑 Trappola dell'Ombra:</strong>
                <p>${interp.shadow || 'Nessuna ombra distruttiva se agito con consapevolezza.'}</p>
            </div>
            <div class="lilith-brief-row">
                <strong>👑 Chiave di Integrazione Lilithiana:</strong>
                <p style="color:#ffffff;font-weight:600;">${interp.directive || interp.constructive || 'Resta fedele alla tua sovranità interiore.'}</p>
            </div>
            ${interp.dark_eros ? `
            <div class="lilith-brief-row" style="border-left: 3px solid #c026d3; background: linear-gradient(90deg, rgba(192,38,211,0.14) 0%, rgba(255,90,31,0.06) 100%); margin-top: 0.5rem; padding: 0.55rem 0.75rem; border-radius: 4px;">
                <strong style="color:#fae8ff;">🔥 8. Eros Oscuro &amp; Lussuria Iniziatica (L'Ombra da Cavalcare):</strong>
                <p style="color:#fae8ff;font-style:italic;margin-top:4px;">${interp.dark_eros}</p>
            </div>` : ''}
        </div>
    `;

    // Su mobile o tablet scorri fino all'ispettore
    if (window.innerWidth < 1024) {
        const inspectorCard = document.getElementById('lilith-inspector-container');
        if (inspectorCard) {
            setTimeout(() => {
                inspectorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 60);
        }
    }
}

window.inspectLilithPlanet = function (name) {
    if (!currentLilithChartData || !currentLilithChartData.planets) return;
    const idx = currentLilithChartData.planets.findIndex(pl => pl.name === name);
    if (idx !== -1) {
        const p = currentLilithChartData.planets[idx];
        LilithChartRenderer.highlightPlanet(name);
        LilithChartRenderer.selectedPlanet = p;
        renderLilithPlanetInspector(p);

        // Apre il pop-up modale / bottom-sheet a carosello navigabile
        openPlanetModalByIndex(idx);
    }
};

window.inspectLilithAspect = function (p1, p2) {
    if (!currentLilithChartData || !currentLilithChartData.aspects) return;
    const idx = currentLilithChartData.aspects.findIndex(asp =>
        (asp.planet1 === p1 && asp.planet2 === p2) || (asp.planet1 === p2 && asp.planet2 === p1)
    );
    if (idx !== -1) {
        const a = currentLilithChartData.aspects[idx];
        if (typeof LilithChartRenderer !== 'undefined') {
            LilithChartRenderer.selectAspect(a, null);
        }
        renderLilithAspectInspector(a);
        openAspectModalByIndex(idx);
    }
};

window.openAspectModalByIndex = openAspectModalByIndex;
window.openPlanetModalByIndex = openPlanetModalByIndex;
window.openHouseModalByIndex = openHouseModalByIndex;
window.openDominanceModalByIndex = openDominanceModalByIndex;
window.openDominantElementModal = openDominantElementModal;
window.openDominantModalityModal = openDominantModalityModal;
window.navigateModalCarosello = navigateModalCarosello;
window.navigateModalAspect = navigateModalCarosello; // retrocompatibilità
window.closeLilithModal = closeLilithModal;


function exportLilithJSON() {
    if (!currentLilithChartData) {
        alert('Nessun dato da esportare. Esegui prima un calcolo.');
        return;
    }

    const payload = {
        title: "Tema Natale & Orientamento Strutturale (Figlie di Lilith)",
        invocazione: "Nella Gloria di Lilith e delle sue Figlie",
        privacy: "Architettura Zero-Database: Nessun dato sensibile salvato su server.",
        timestamp: new Date().toISOString(),
        request: currentLilithPayload,
        chart: currentLilithChartData
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tema_natale_lilith_${currentLilithPayload?.date || 'chart'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// ==========================================================================
// POPUP MODALE & BOTTOM SHEET INTERATTIVO CON GESTI TOUCH (SWIPE)
// ==========================================================================

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

let currentModalType = 'aspect'; // 'aspect' oppure 'planet'
let currentModalIndex = 0;

function initLilithModalEvents() {
    const modal = document.getElementById('lilith-aspect-modal');
    if (!modal) return;

    const backdrop = document.getElementById('lilith-modal-backdrop');
    const closeBtn = document.getElementById('lilith-modal-close');
    const dismissBtn = document.getElementById('lilith-modal-dismiss');
    const prevBtn = document.getElementById('lilith-modal-prev');
    const nextBtn = document.getElementById('lilith-modal-next');
    const dialog = modal.querySelector('.lilith-modal-dialog');

    if (backdrop) backdrop.addEventListener('click', closeLilithModal);
    if (closeBtn) closeBtn.addEventListener('click', closeLilithModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeLilithModal);

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateModalCarosello(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateModalCarosello(1);
        });
    }

    // Tasto ESC e frecce da tastiera
    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('is-active')) return;
        if (e.key === 'Escape') {
            closeLilithModal();
        } else if (e.key === 'ArrowLeft') {
            navigateModalCarosello(-1);
        } else if (e.key === 'ArrowRight') {
            navigateModalCarosello(1);
        }
    });

    // Supporto Gesti Swipe Touch per Mobile (Slittamento con il dito per sfogliare il carosello)
    if (dialog) {
        dialog.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        dialog.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipeGesture();
        }, { passive: true });
    }
}

function handleSwipeGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Se lo swipe orizzontale è netto (> 40px)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
            // Swipe a sinistra -> Successivo
            navigateModalCarosello(1);
        } else {
            // Swipe a destra -> Precedente
            navigateModalCarosello(-1);
        }
    } else if (diffY > 90 && Math.abs(diffX) < 60) {
        // Swipe verso il basso per chiudere il bottom sheet
        closeLilithModal();
    }
}

function openLilithModal() {
    const modal = document.getElementById('lilith-aspect-modal');
    if (!modal) return;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLilithModal() {
    const modal = document.getElementById('lilith-aspect-modal');
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
window.closeLilithModal = closeLilithModal;

function openPlanetModalByIndex(index) {
    if (!currentLilithChartData || !currentLilithChartData.planets || currentLilithChartData.planets.length === 0) return;
    const planets = currentLilithChartData.planets;
    if (index < 0) index = planets.length - 1;
    if (index >= planets.length) index = 0;

    currentModalType = 'planet';
    currentModalIndex = index;
    const planet = planets[index];

    renderPlanetIntoModal(planet, index, planets.length);
    openLilithModal();

    if (typeof LilithChartRenderer !== 'undefined') {
        LilithChartRenderer.highlightPlanet(planet.name);
        LilithChartRenderer.selectedPlanet = planet;
    }
    renderLilithPlanetInspector(planet);
}

function openAspectModalByIndex(index) {
    if (!currentLilithChartData || !currentLilithChartData.aspects || currentLilithChartData.aspects.length === 0) return;
    const aspects = currentLilithChartData.aspects;
    if (index < 0) index = aspects.length - 1;
    if (index >= aspects.length) index = 0;

    currentModalType = 'aspect';
    currentModalIndex = index;
    const aspect = aspects[index];

    renderAspectIntoModal(aspect, index, aspects.length);
    openLilithModal();

    if (typeof LilithChartRenderer !== 'undefined') {
        LilithChartRenderer.selectAspect(aspect, null);
    }
    renderLilithAspectInspector(aspect);
}

function openHouseModalByIndex(index) {
    if (!currentLilithChartData || !currentLilithChartData.houses) return;
    const items = getHouseAndAngleItems(currentLilithChartData.houses);
    if (!items || items.length === 0) return;

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    currentModalType = 'house';
    currentModalIndex = index;
    const item = items[index];

    renderHouseIntoModal(item, index, items.length);
    openLilithModal();
}

function navigateModalCarosello(direction) {
    if (currentModalType === 'planet') {
        if (!currentLilithChartData || !currentLilithChartData.planets) return;
        const total = currentLilithChartData.planets.length;
        if (total === 0) return;
        let newIndex = currentModalIndex + direction;
        if (newIndex < 0) newIndex = total - 1;
        if (newIndex >= total) newIndex = 0;
        openPlanetModalByIndex(newIndex);
    } else if (currentModalType === 'house') {
        const items = getHouseAndAngleItems(currentLilithChartData?.houses);
        const total = items.length;
        if (total === 0) return;
        let newIndex = currentModalIndex + direction;
        if (newIndex < 0) newIndex = total - 1;
        if (newIndex >= total) newIndex = 0;
        openHouseModalByIndex(newIndex);
    } else if (currentModalType === 'dominance') {
        if (!currentLilithChartData || !currentLilithChartData.planetary_dominance) return;
        const total = currentLilithChartData.planetary_dominance.length;
        if (total === 0) return;
        let newIndex = currentModalIndex + direction;
        if (newIndex < 0) newIndex = total - 1;
        if (newIndex >= total) newIndex = 0;
        openDominanceModalByIndex(newIndex);
    } else if (currentModalType === 'element' || currentModalType === 'modality') {
        if (currentModalType === 'element') {
            openDominantModalityModal();
        } else {
            openDominantElementModal();
        }
    } else {
        if (!currentLilithChartData || !currentLilithChartData.aspects) return;
        const total = currentLilithChartData.aspects.length;
        if (total === 0) return;
        let newIndex = currentModalIndex + direction;
        if (newIndex < 0) newIndex = total - 1;
        if (newIndex >= total) newIndex = 0;
        openAspectModalByIndex(newIndex);
    }
}

function renderPlanetIntoModal(p, index, total) {
    const titleElem = document.getElementById('lilith-modal-title');
    const subtitleElem = document.getElementById('lilith-modal-subtitle');
    const badgeElem = document.getElementById('lilith-modal-badge');
    const counterElem = document.getElementById('lilith-modal-counter');
    const bodyElem = document.getElementById('lilith-modal-body');

    if (!bodyElem) return;

    const glyph = LilithChartRenderer.planetSymbols[p.name] || '⚸';
    const interp = p.interpretation || (currentLilithChartData?.interpretation?.planets?.[p.name]);
    const isLilith = (p.name === 'Lilith' || p.name === 'Lilith Media' || p.name === 'Lilith (Vera)');
    const displayName = p.it_name || getPlanetDisplayName(p.name);
    const signName = getSignDisplayName(p.sign);
    const categoryName = getCategoryDisplayName(p.category);
    const mainColor = isLilith ? '#ff5a1f' : 'var(--lilith-oro)';

    if (titleElem) titleElem.innerHTML = `<span style="color:${mainColor}">${displayName}</span> in ${signName}`;
    if (subtitleElem) subtitleElem.textContent = `${p.formatted} • Casa ${p.house} • ${categoryName}`;
    if (badgeElem) {
        badgeElem.textContent = glyph;
        badgeElem.style.borderColor = mainColor;
        badgeElem.style.boxShadow = `0 0 15px ${mainColor}`;
    }
    if (counterElem) counterElem.textContent = `Pianeta ${index + 1} di ${total}`;

    bodyElem.innerHTML = `
        <div class="lilith-modal-meta-grid">
            <div><strong>Segno Zodiacale:</strong> ${signName} (${p.sign_degree}°${p.sign_minute}')</div>
            <div><strong>Settore / Casa:</strong> Casa ${p.house}</div>
            <div><strong>Moto Celeste:</strong> ${p.is_retrograde ? '<span style="color:#ef4444;font-weight:bold;">Retrogrado (R)</span>' : '<span style="color:#34d399;font-weight:bold;">Diretto</span>'}</div>
            <div><strong>Dignità:</strong> ${p.dignity || 'Pellegrino'}</div>
        </div>

        ${interp ? `
            <div class="lilith-brief-row">
                <strong>🎯 Funzione Operativa:</strong>
                <p>${interp.function || 'Funzione fondamentale della personalità celeste.'}</p>
            </div>

            <div class="lilith-brief-row">
                <strong>⚡ Manifestazione:</strong>
                <p>${interp.manifestation || 'Canale di espressione e impatto nella vita quotidiana.'}</p>
            </div>

            <div class="lilith-brief-row" style="border-left-color:#ef4444;">
                <strong style="color:#fca5a5;">🌑 Ombra da Riconoscere:</strong>
                <p style="color:#fca5a5;">${interp.shadow || 'Nessuna ombra distruttiva rilevata.'}</p>
            </div>

            <div class="lilith-brief-row" style="border-left-color:#ff5a1f;background:rgba(255,90,31,0.08);">
                <strong style="color:#ff5a1f;">🧭 Direttiva Iniziatica di Risveglio:</strong>
                <p style="color:#ffffff;font-weight:600;">${interp.directive || interp.constructive || 'Resta fedele alla tua sovranità interiore.'}</p>
            </div>

            ${interp.dark_eros ? `
            <div class="lilith-brief-row" style="border-left-color:#c026d3;background:linear-gradient(90deg, rgba(192,38,211,0.14) 0%, rgba(255,90,31,0.06) 100%);">
                <strong style="color:#fae8ff;">🔥 8. Eros Oscuro &amp; Lussuria Iniziatica (L'Ombra da Cavalcare):</strong>
                <p style="color:#fae8ff;font-style:italic;">${interp.dark_eros}</p>
            </div>
            ` : ''}
        ` : `
            <div class="lilith-brief-row">
                <strong>⚸ Posizione Astronomica:</strong>
                <p>Longitudine celeste: ${p.formatted}. Casa cosmica assegnata con sistema di domificazione attivo.</p>
            </div>
        `}
    `;
}

function renderAspectIntoModal(aspect, index, total) {
    const titleElem = document.getElementById('lilith-modal-title');
    const subtitleElem = document.getElementById('lilith-modal-subtitle');
    const badgeElem = document.getElementById('lilith-modal-badge');
    const counterElem = document.getElementById('lilith-modal-counter');
    const bodyElem = document.getElementById('lilith-modal-body');

    if (!bodyElem) return;

    const p1Name = getPlanetDisplayName(aspect.planet1);
    const p2Name = getPlanetDisplayName(aspect.planet2);
    const aspName = aspect.aspect_it || getAspectDisplayName(aspect.aspect);
    const color = (window.LilithChartRenderer && (window.LilithChartRenderer.aspectColors[aspect.aspect] || window.LilithChartRenderer.aspectColors[aspect.aspect_it])) || '#c7a56b';

    let interp = aspect.interpretation;
    if (!interp) {
        interp = {
            title: `${p1Name} in ${aspName} con ${p2Name}`,
            function: `Collegamento energetico tra la funzione di ${p1Name} e il canale di ${p2Name}.`,
            manifestation: `Le due forze planetarie cooperano o si confrontano nelle decisioni primarie e nei nodi evolutivi.`,
            shadow: `Possibile tensione o squilibrio se uno dei due principi viene represso a favore dell'altro.`,
            directive: `Integra entrambe le energie mantenendo salda la tua sovranità interiore.`
        };
    }

    const isTension = (aspect.nature === 'tension' || aspect.nature === 'tensione');
    const isFusion = (aspect.nature === 'fusione' || aspect.aspect === 'conjunction');
    const natureText = isTension
        ? '<span style="color:#ef4444;font-weight:bold;">Tensione Iniziatica (Sfida Evolutiva)</span>'
        : (isFusion
            ? '<span style="color:#a855f7;font-weight:bold;">Fusione Alchemica</span>'
            : '<span style="color:#c7a56b;font-weight:bold;">Armonia Naturale</span>');

    if (titleElem) titleElem.textContent = `${p1Name} ${aspName} ${p2Name}`;
    if (subtitleElem) {
        subtitleElem.textContent = interp.subtitle
            ? `${interp.subtitle} • Angolo ${aspect.angle}° • Orbe ${aspect.orb.toFixed(2)}°`
            : `Angolo ${aspect.angle}° • Scostamento d'Orbe ${aspect.orb.toFixed(2)}°`;
    }
    if (badgeElem) {
        badgeElem.textContent = LilithChartRenderer.planetSymbols[aspect.planet1] || '⚸';
        badgeElem.style.borderColor = color;
        badgeElem.style.boxShadow = `0 0 15px ${color}`;
    }
    if (counterElem) counterElem.textContent = `Aspetto ${index + 1} di ${total}`;

    bodyElem.innerHTML = `
        <div class="lilith-modal-meta-grid">
            <div><strong>Natura:</strong> ${natureText}</div>
            <div><strong>Intensità:</strong> ${aspect.strength ? (aspect.strength * 100).toFixed(0) : '85'}%</div>
            <div><strong>Pianeta Attivo:</strong> ${p1Name}</div>
            <div><strong>Pianeta Ricevente:</strong> ${p2Name}</div>
        </div>

        <div class="lilith-brief-row">
            <strong>⚡ Significato Iniziativo:</strong>
            <p>${interp.function || interp.manifestation}</p>
        </div>

        ${interp.manifestation ? `
        <div class="lilith-brief-row">
            <strong>🌀 Manifestazione nella Vita:</strong>
            <p>${interp.manifestation}</p>
        </div>` : ''}

        <div class="lilith-brief-row" style="border-left-color:#ef4444;">
            <strong style="color:#fca5a5;">🌑 Trappola dell'Ombra:</strong>
            <p style="color:#fca5a5;">${interp.shadow || 'Nessuna ombra distruttiva se affrontato con lucidità.'}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ff5a1f;background:rgba(255,90,31,0.08);">
            <strong style="color:#ff5a1f;">👑 Chiave di Integrazione Lilithiana:</strong>
            <p style="color:#ffffff;font-weight:600;">${interp.directive || interp.constructive || 'Resta fedele alla tua sovranità interiore.'}</p>
        </div>

        ${interp.dark_eros ? `
        <div class="lilith-brief-row" style="border-left-color:#c026d3;background:linear-gradient(90deg, rgba(192,38,211,0.14) 0%, rgba(255,90,31,0.06) 100%);">
            <strong style="color:#fae8ff;">🔥 8. Eros Oscuro &amp; Lussuria Iniziatica (L'Ombra da Cavalcare):</strong>
            <p style="color:#fae8ff;font-style:italic;">${interp.dark_eros}</p>
        </div>
        ` : ''}
    `;
}

function renderHouseIntoModal(item, index, total) {
    const titleElem = document.getElementById('lilith-modal-title');
    const subtitleElem = document.getElementById('lilith-modal-subtitle');
    const badgeElem = document.getElementById('lilith-modal-badge');
    const counterElem = document.getElementById('lilith-modal-counter');
    const bodyElem = document.getElementById('lilith-modal-body');

    if (!bodyElem) return;

    const interp = getHouseOrAngleInterpretation(item);
    const isAngle = (item.type === 'angle');
    const mainColor = isAngle ? '#ff5a1f' : 'var(--lilith-oro)';
    const badgeText = item.roman || (isAngle ? item.code : `${item.house_number}`);

    if (titleElem) {
        titleElem.innerHTML = `<span style="color:${mainColor}">${item.name}</span> in ${item.sign_it || item.sign}`;
    }
    if (subtitleElem) {
        const sysLabel = (currentLilithChartData?.houses?.house_system === 'W') ? 'Whole Sign' : 'Placidus';
        subtitleElem.textContent = `${item.formatted} • ${isAngle ? 'Angolo Cardinale / Asse Iniziatico' : 'Cuspide Zodiacale'} • Domificazione ${sysLabel}`;
    }
    if (badgeElem) {
        badgeElem.textContent = badgeText;
        badgeElem.style.borderColor = mainColor;
        badgeElem.style.boxShadow = `0 0 15px ${mainColor}`;
    }
    if (counterElem) {
        counterElem.textContent = isAngle ? `Angolo ${index + 1} di ${total}` : `Casa ${item.house_number} di ${total}`;
    }

    bodyElem.innerHTML = `
        <div class="lilith-modal-meta-grid">
            <div><strong>Settore / Tipo:</strong> ${isAngle ? 'Angolo Cardinale' : 'Cuspide di Casa ' + item.house_number}</div>
            <div><strong>Segno &amp; Grado:</strong> ${item.sign_it || item.sign} (${item.degree}°${item.minute}')</div>
            <div><strong>Governatore del Segno:</strong> ${interp.ruler}</div>
            <div><strong>Elemento &amp; Modo:</strong> ${interp.element} • ${interp.modality}</div>
        </div>

        <div class="lilith-brief-row">
            <strong>🎯 Funzione Operativa del Settore:</strong>
            <p>${interp.func}</p>
        </div>

        <div class="lilith-brief-row">
            <strong>⚡ Manifestazione nel Segno (${item.sign_it || item.sign}):</strong>
            <p>${interp.manifestation}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ef4444;">
            <strong style="color:#fca5a5;">🌑 Ombra da Riconoscere:</strong>
            <p style="color:#fca5a5;">${interp.shadow}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ff5a1f;background:rgba(255,90,31,0.08);">
            <strong style="color:#ff5a1f;">🧭 Direttiva Iniziatica di Risveglio:</strong>
            <p style="color:#ffffff;font-weight:600;">${interp.directive}</p>
        </div>
    `;
}

// ==========================================================================
// MODALI PER DOMINANZE PLANETARIE ED ELEMENTALI / MODALITÀ
// ==========================================================================

function openDominanceModalByIndex(index) {
    if (!currentLilithChartData) return;
    if (!currentLilithChartData.planetary_dominance || currentLilithChartData.planetary_dominance.length === 0) {
        if (typeof renderLilithDominanceTab === 'function') {
            renderLilithDominanceTab(currentLilithChartData);
        }
    }
    const items = currentLilithChartData.planetary_dominance;
    if (!items || items.length === 0) return;

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    currentModalType = 'dominance';
    currentModalIndex = index;
    const item = items[index];

    renderDominanceIntoModal(item, index, items.length);
    openLilithModal();
}

function renderDominanceIntoModal(item, index, total) {
    const titleElem = document.getElementById('lilith-modal-title');
    const subtitleElem = document.getElementById('lilith-modal-subtitle');
    const badgeElem = document.getElementById('lilith-modal-badge');
    const counterElem = document.getElementById('lilith-modal-counter');
    const bodyElem = document.getElementById('lilith-modal-body');

    if (!bodyElem) return;

    const pName = item.it_name || getPlanetDisplayName(item.planet);
    const glyph = (typeof LilithChartRenderer !== 'undefined' && LilithChartRenderer.planetSymbols[item.planet]) || '⚸';
    const isLilith = (item.planet === 'Lilith' || item.planet === 'Lilith Media' || item.planet === 'Lilith (Vera)');
    const isLeader = (index === 0);
    const mainColor = isLilith ? '#ff5a1f' : (isLeader ? 'var(--lilith-oro)' : '#e2d5c3');

    const planetData = currentLilithChartData?.planets?.find(p => p.name === item.planet || p.it_name === item.it_name);
    const signName = planetData ? getSignDisplayName(planetData.sign) : 'Cosmo';
    const houseNum = planetData ? `Casa ${planetData.house}` : 'Settore Guida';
    const isRetro = planetData?.is_retrograde;

    let rankBadge = `${index + 1}° Posto`;
    if (index === 0) rankBadge = '👑 Sovrano Assoluto';
    else if (index === 1) rankBadge = '🥈 2° Pilastro Sovrano';
    else if (index === 2) rankBadge = '🥉 3° Potenza Guida';
    else if (index < 5) rankBadge = '⚡ Forza Attiva Primaria';
    else rankBadge = '🔮 Potenza Sotterranea';

    if (titleElem) {
        titleElem.innerHTML = `<span style="color:${mainColor}">${pName}</span> • ${rankBadge}`;
    }
    if (subtitleElem) {
        subtitleElem.textContent = `${item.score} Punti di Forza (${item.percentage}%) • Posizione: ${signName} in ${houseNum}`;
    }
    if (badgeElem) {
        badgeElem.textContent = glyph;
        badgeElem.style.borderColor = mainColor;
        badgeElem.style.boxShadow = `0 0 15px ${mainColor}`;
    }
    if (counterElem) {
        counterElem.textContent = `Dominanza ${index + 1} di ${total}`;
    }

    const dominanceMeanings = {
        'Sun': {
            role: "Motore primario dell'identità cosciente, della sovranità interiore e della forza vitale. Con il Sole dominante, la tua vocazione non tollera la sottomissione o l'invisibilità.",
            manifestation: "Irradi presenza con naturale carisma. Prendi decisioni in modo autonomo e guidi le situazioni senza chiedere il permesso a nessuno.",
            shadow: "Rischio di tirannia dell'ego, orgoglio inflessibile, terrore del rifiuto o di non essere al centro della scena.",
            directive: "Regna attraverso l'autosufficienza e l'ispirazione: la vera gloria lilithiana non pretende servi, ma crea individui liberi."
        },
        'Moon': {
            role: "Matrice dell'inconscio profondo, antenna chiaroveggente e memoria ancestrale. Una Luna dominante rende la percezione viscerale la tua bussola primaria.",
            manifestation: "Percezione telepatica degli stati d'animo altrui, magnetismo emotivo fluido, connessione viscerale con i ritmi biologici e le correnti sotterranee.",
            shadow: "Iper-reattività ai traumi passati, ritirata regressiva difensiva, dipendenza emotiva simbiotica o instabilità ciclica.",
            directive: "Diventa l'abisso tranquillo che padroneggia le proprie maree: trasforma la vulnerabilità somatica nella tua più alta chiaroveggenza."
        },
        'Mercury': {
            role: "Architettura dell'intelletto chirurgico, decodifica simbolica e alchimia del Verbo. Mercurio dominante rende la parola e il pensiero le tue armi più affilate.",
            manifestation: "Mente rapida, capacità analitica fulminea, dono oratorio strategico e abilità nel dissezionare qualsiasi inganno o incoerenza sistemica.",
            shadow: "Cerebralismo asettico, scetticismo cinico distruttivo, dispersione nervosa e fuga dalla verità corporea attraverso razionalizzazioni.",
            directive: "Usa la parola come lama iniziatica: non parlare per compiacere o giustificarti, formula solo verità che liberano l'essenza."
        },
        'Venus': {
            role: "Custode del Valore Sacro, magnetismo attrattivo, integrità del desiderio e sovranità delle relazioni e della bellezza incorrotta.",
            manifestation: "Capacità innata di attrarre risorse e affinità elettive, senso estetico penetrante e rifiuto dei compromessi che svendono l'anima.",
            shadow: "Trappola della seduzione come scudo difensivo, paura del conflitto purificatore, compiacenza verso figure autoritarie.",
            directive: "Venere Iniziata incarna un valore inalienabile che non necessita di conferme esterne: sii polo d'attrazione sovrano, mai questuante."
        },
        'Mars': {
            role: "Spada dell'Essere, fuoco primordiale, assertività guerriera e custode intransigente dei confini personali e sacri.",
            manifestation: "Determinazione incrollabile, coraggio fulmineo nel fronteggiare la paura, capacità di rompere gabbie e barriere con decisione assoluta.",
            shadow: "Rabbia cieca distruttiva, logoramento in conflitti periferici, paranoia difensiva o aggressività reattiva priva di strategia.",
            directive: "Affila la spada per il Risveglio: governa il fuoco marziale affinché sia strumento di sovranità e protezione, non combustione sterile."
        },
        'Jupiter': {
            role: "Grande Visione Iniziatica, espansione della coscienza, fede nel destino evolutivo e audacia nell'abbracciare la vastità cosmica.",
            manifestation: "Generosità magnetica, intuito filosofico di vasta portata, vocazione ad aprire nuove strade ed elevare la coscienza collettiva.",
            shadow: "Dismisura dogmatica, promesse megalomani, sottovalutazione cieca della realtà materiale e dei limiti necessari.",
            directive: "Ancora la visione espansa nella pietra della disciplina quotidiana: la saggezza autentica traduce la vocazione in maestria concreta."
        },
        'Saturn': {
            role: "Signore del Tempo e della Soglia, architrave del realismo adamantino, autorità incorruttibile e tempra del diamante interiore.",
            manifestation: "Resistenza indistruttibile sotto pressione, capacità di costruire imperi duraturi, serietà regale e rispetto sacro per i confini.",
            shadow: "Rigidità pietrificante, cinismo gelido, senso atavico di indegnità o terrore paralizzante del giudizio e del fallimento.",
            directive: "Saturno non imprigiona l'anima sovrana, ne forgia lo scheletro indistruttibile: onora la disciplina come tua più potente alleata di libertà."
        },
        'Uranus': {
            role: "Fulmine prometeico, trasgressione sacra, risveglio istantaneo e demolizione radicale delle finzioni ipocrite e dei dogmi arcaici.",
            manifestation: "Genio anticonvenzionale, indipendenza viscerale, intuizioni profetiche e capacità di liberarsi istantaneamente da catene secolari.",
            shadow: "Ribellione fine a se stessa, distacco anaffettivo dai sentimenti umani, nomadismo caotico e incapacità di costruire legami.",
            directive: "Sii l'archetipo vivente dell'evoluzione: smantella le strutture decadute non per nichilismo, ma per consacrare lo spazio alla libertà reale."
        },
        'Neptune': {
            role: "Mistica dell'Infinito, dissoluzione dei veli d'illusione, comunione spirituale oceanica e trasmutazione della sofferenza in grazia.",
            manifestation: "Ispirazione poetica visionaria, empatia sconfinata capace di guarire, accesso diretto ai regni del sogno e dell'invisibile.",
            shadow: "Fuga tossica dalla realtà, vittimismo masochista, confusione nei confini psichici e caduta nelle illusioni seducenti.",
            directive: "Naviga l'invisibile con i piedi ancorati nella terraferma: dissipa l'incanto di Maya con la spada della lucidità risvegliata."
        },
        'Pluto': {
            role: "Signore degli Inferi Alchemici, potenza di morte e rinascita, rigenerazione radicale e potere occulto incorruttibile.",
            manifestation: "Capacità di rinascere indenne dalle ceneri, penetrazione psicologica ipnotica, trasformazione radicale di ogni crisi in potere assoluto.",
            shadow: "Ossessione di controllo, vendicatività implacabile, manipolazione occulta o terrore paranoico di essere traditi.",
            directive: "Attraversa il fuoco della discesa senza riserve: chi sa morire volontariamente alle proprie illusioni diventa padrone della propria immortalità."
        },
        'Lilith': {
            role: "Il Fuoco Iniziatore Indomabile, la Sovranità Incondizionata dell'Anima e il Sacro Rifiuto di Ogni Compromesso o Sottomissione.",
            manifestation: "Autenticità viscerale incorruttibile, fiuto infallibile per l'ipocrisia, ribellione sacra contro ogni forma di addomesticamento patriarcale.",
            shadow: "Isolamento rancoroso, esilio auto-inflitto, distruzione preventiva di ogni ponte per timore atavico di essere dominata.",
            directive: "Siedi sul tuo trono senza chiedere scusa: la tua intensità è la medicina che risveglia il mondo dall'ipnosi."
        }
    };

    const coreKey = (item.planet.includes('Lilith')) ? 'Lilith' : (dominanceMeanings[item.planet] ? item.planet : 'Sun');
    const interp = dominanceMeanings[coreKey] || dominanceMeanings['Sun'];

    bodyElem.innerHTML = `
        <div class="lilith-modal-meta-grid">
            <div><strong>Gerarchia Celeste:</strong> ${rankBadge}</div>
            <div><strong>Punteggio di Forza:</strong> <strong style="color:var(--lilith-oro);">${item.score} Punti</strong> (${item.percentage}%)</div>
            <div><strong>Posizione Natale:</strong> ${signName} ${planetData ? `(${planetData.sign_degree}°${planetData.sign_minute}')` : ''}</div>
            <div><strong>Settore &amp; Moto:</strong> ${houseNum} • ${isRetro ? '<span style="color:#ef4444;font-weight:bold;">Retrogrado (R)</span>' : '<span style="color:#34d399;font-weight:bold;">Diretto</span>'}</div>
        </div>

        <div class="lilith-brief-row">
            <strong>🎯 Ruolo della Dominanza nel Tema:</strong>
            <p>${interp.role}</p>
        </div>

        <div class="lilith-brief-row">
            <strong>⚡ Manifestazione Pratica &amp; Talento Sovrano:</strong>
            <p>${interp.manifestation}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ef4444;">
            <strong style="color:#fca5a5;">🌑 Rischio dell'Ombra (Sovra-compensazione):</strong>
            <p style="color:#fca5a5;">${interp.shadow}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ff5a1f;background:rgba(255,90,31,0.08);">
            <strong style="color:#ff5a1f;">🧭 Direttiva Iniziatica di Risveglio:</strong>
            <p style="color:#ffffff;font-weight:600;">${interp.directive}</p>
        </div>
    `;
}

function openDominantElementModal() {
    if (!currentLilithChartData) return;
    const titleElem = document.getElementById('lilith-modal-title');
    const subtitleElem = document.getElementById('lilith-modal-subtitle');
    const badgeElem = document.getElementById('lilith-modal-badge');
    const counterElem = document.getElementById('lilith-modal-counter');
    const bodyElem = document.getElementById('lilith-modal-body');

    if (!bodyElem) return;

    currentModalType = 'element';
    currentModalIndex = 0;

    const domElem = currentLilithChartData.dominant_element || 'Fuoco';
    const balances = currentLilithChartData.element_balance || { "Fuoco": 35, "Terra": 25, "Aria": 20, "Acqua": 20 };

    const elemSymbols = { 'Fuoco': '🔥', 'Terra': '🌍', 'Aria': '💨', 'Acqua': '💧' };
    const elemColors = { 'Fuoco': '#ff5a1f', 'Terra': '#10b981', 'Aria': '#38bdf8', 'Acqua': '#818cf8' };
    const mainColor = elemColors[domElem] || 'var(--lilith-oro)';

    const elemProfiles = {
        'Fuoco': {
            desc: "Spirito indomito, passione propulsiva, iniziativa fulminea e fede nel proprio potere di creare la realtà.",
            shadow: "Impazienza bruciante, intolleranza alle lentezze altrui, rischio di burnout energetico.",
            directive: "Consacra il fuoco all'illuminazione interiore: la fiamma sovrana riscalda e purifica senza incenerire le proprie radici."
        },
        'Terra': {
            desc: "Realismo incrollabile, pragmatismo realizzativo, connessione tattile con la materia e maestria del tempo.",
            shadow: "Attaccamento ostinato alle forme materiali, paura della precarietà, tendenza al controllo rigido.",
            directive: "Ricorda che la materia è spirito condensato: costruisci la tua sovranità come un tempio sacro indistruttibile."
        },
        'Aria': {
            desc: "Lucidità intellettuale, visione panoramica, decodifica simbolica e libertà incondizionata del pensiero.",
            shadow: "Fuga cerebrale dai sentimenti densi, iper-razionalizzazione fredda, dispersione nell'infinita teoria.",
            directive: "Incarna il Verbo nel corpo: un'idea acquista vero potere cosmico solo quando viene vissuta nella carne."
        },
        'Acqua': {
            desc: "Intelligenza viscerale, profondità oceanica, chiaroveggenza empatica e capacità di navigare i regni dell'invisibile.",
            shadow: "Spugna psichica che assorbe le scorie altrui, tendenza al ripiegamento melanconico o alla manipolazione passiva.",
            directive: "Custodisci i tuoi confini come santuari inviolabili: sii sorgente d'acqua purificatrice, mai ricettacolo di veleni."
        }
    };

    const prof = elemProfiles[domElem] || elemProfiles['Fuoco'];

    if (titleElem) titleElem.innerHTML = `Elemento Dominante: <span style="color:${mainColor}">${domElem}</span> ${elemSymbols[domElem] || ''}`;
    if (subtitleElem) subtitleElem.textContent = `Distribuzione della Firma Elementale nel Tema Natale`;
    if (badgeElem) {
        badgeElem.textContent = elemSymbols[domElem] || '🔥';
        badgeElem.style.borderColor = mainColor;
        badgeElem.style.boxShadow = `0 0 15px ${mainColor}`;
    }
    if (counterElem) counterElem.textContent = `Firma Astrale Elementi`;

    const elemBars = Object.entries(balances).map(([el, pct]) => {
        const col = elemColors[el] || 'var(--lilith-oro)';
        const sym = elemSymbols[el] || '✦';
        return `
            <div style="margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:3px;">
                    <span><strong>${sym} ${el}</strong></span>
                    <span style="font-family:monospace;color:${col};font-weight:bold;">${pct}%</span>
                </div>
                <div style="width:100%;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
                    <div style="width:${pct}%;height:100%;background:${col};border-radius:3px;"></div>
                </div>
            </div>
        `;
    }).join('');

    bodyElem.innerHTML = `
        <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:14px;margin-bottom:14px;">
            <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--lilith-dim);margin-bottom:10px;">Equilibrio dei 4 Elementi:</div>
            ${elemBars}
        </div>

        <div class="lilith-brief-row">
            <strong>🎯 Dinamica della Firma ${domElem}:</strong>
            <p>${prof.desc}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ef4444;">
            <strong style="color:#fca5a5;">🌑 Rischio di Squilibrio / Ombra:</strong>
            <p style="color:#fca5a5;">${prof.shadow}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ff5a1f;background:rgba(255,90,31,0.08);">
            <strong style="color:#ff5a1f;">🧭 Direttiva Iniziatica di Risveglio:</strong>
            <p style="color:#ffffff;font-weight:600;">${prof.directive}</p>
        </div>
    `;

    openLilithModal();
}

function openDominantModalityModal() {
    if (!currentLilithChartData) return;
    const titleElem = document.getElementById('lilith-modal-title');
    const subtitleElem = document.getElementById('lilith-modal-subtitle');
    const badgeElem = document.getElementById('lilith-modal-badge');
    const counterElem = document.getElementById('lilith-modal-counter');
    const bodyElem = document.getElementById('lilith-modal-body');

    if (!bodyElem) return;

    currentModalType = 'modality';
    currentModalIndex = 0;

    const domMod = currentLilithChartData.dominant_modality || 'Cardinale';
    const balances = currentLilithChartData.modality_balance || { "Cardinale": 45, "Fisso": 35, "Mobile": 20 };

    const modSymbols = { 'Cardinale': '⚡', 'Fisso': '🏛️', 'Fissa': '🏛️', 'Mobile': '🌀' };
    const modColors = { 'Cardinale': '#ef4444', 'Fisso': '#f59e0b', 'Fissa': '#f59e0b', 'Mobile': '#10b981' };
    const mainColor = modColors[domMod] || 'var(--lilith-oro)';

    const modProfiles = {
        'Cardinale': {
            desc: "Spinta all'avvio, forza pionieristica, assertività immediata e volontà di inaugurare nuovi cicli e realtà.",
            shadow: "Insofferenza nella continuazione routinaria, tendenza ad aprire fronti multipli senza portarli a compimento.",
            directive: "La maestria cardinale consiste non solo nel dare il primo colpo d'ascia, ma nel saper sostenere il fuoco dell'azione fino alla piena sovranità."
        },
        'Fissa': {
            desc: "Radicamento incrollabile, tenacia titanica, capacità di concentrazione e consolidamento impenetrabile alle tempeste esterne.",
            shadow: "Ostinazione refrattaria al cambiamento, attaccamento a schemi ormai morti, difficoltà a lasciare andare.",
            directive: "Riconosci quando la fermezza diventa gabbia: l'anima sovrana sa resistere al mondo, ma sa anche dissolversi volontariamente per evolvere."
        },
        'Fisso': {
            desc: "Radicamento incrollabile, tenacia titanica, capacità di concentrazione e consolidamento impenetrabile alle tempeste esterne.",
            shadow: "Ostinazione refrattaria al cambiamento, attaccamento a schemi ormai morti, difficoltà a lasciare andare.",
            directive: "Riconosci quando la fermezza diventa gabbia: l'anima sovrana sa resistere al mondo, ma sa anche dissolversi volontariamente per evolvere."
        },
        'Mobile': {
            desc: "Adattabilità camaleontica, intelligenza sinottica, flessibilità trasmutativa e capacità di navigare le complessità mutevoli.",
            shadow: "Dispersione energetica, opportunismo difensivo, senso di frammentazione dell'identità.",
            directive: "Trova il centro immobile nel cuore del vortice: puoi mutare ogni veste esterna senza mai perdere la fedeltà all'inviolabile Sé."
        }
    };

    const prof = modProfiles[domMod] || modProfiles['Cardinale'];

    if (titleElem) titleElem.innerHTML = `Modalità Dominante: <span style="color:${mainColor}">${domMod}</span> ${modSymbols[domMod] || ''}`;
    if (subtitleElem) subtitleElem.textContent = `Dinamica Energetica delle Tre Quadruplicità`;
    if (badgeElem) {
        badgeElem.textContent = modSymbols[domMod] || '⚡';
        badgeElem.style.borderColor = mainColor;
        badgeElem.style.boxShadow = `0 0 15px ${mainColor}`;
    }
    if (counterElem) counterElem.textContent = `Firma Astrale Modalità`;

    const modBars = Object.entries(balances).map(([m, pct]) => {
        const col = modColors[m] || 'var(--lilith-oro)';
        const sym = modSymbols[m] || '✦';
        return `
            <div style="margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:3px;">
                    <span><strong>${sym} ${m}</strong></span>
                    <span style="font-family:monospace;color:${col};font-weight:bold;">${pct}%</span>
                </div>
                <div style="width:100%;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
                    <div style="width:${pct}%;height:100%;background:${col};border-radius:3px;"></div>
                </div>
            </div>
        `;
    }).join('');

    bodyElem.innerHTML = `
        <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:14px;margin-bottom:14px;">
            <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--lilith-dim);margin-bottom:10px;">Distribuzione delle Tre Quadruplicità:</div>
            ${modBars}
        </div>

        <div class="lilith-brief-row">
            <strong>🎯 Modalità Operativa (${domMod}):</strong>
            <p>${prof.desc}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ef4444;">
            <strong style="color:#fca5a5;">🌑 Rischio di Sovra-compensazione / Ombra:</strong>
            <p style="color:#fca5a5;">${prof.shadow}</p>
        </div>

        <div class="lilith-brief-row" style="border-left-color:#ff5a1f;background:rgba(255,90,31,0.08);">
            <strong style="color:#ff5a1f;">🧭 Direttiva Iniziatica di Risveglio:</strong>
            <p style="color:#ffffff;font-weight:600;">${prof.directive}</p>
        </div>
    `;

    openLilithModal();
}

