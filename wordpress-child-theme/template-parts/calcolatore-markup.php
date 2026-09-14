<?php
/**
 * Markup Componente: Calcolatore Tema Natale & Orientamento Strutturale
 * Design System: FiglieDiLilith.it (Canon 2026)
 *
 * @package FiglieDiLilith
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Rete di sicurezza: se questo markup viene incluso da un template non previsto
// da figlie_di_lilith_needs_calculator_assets(), gli script vengono comunque
// richiesti qui (WordPress li stampa nel footer).
if ( function_exists( 'figlie_di_lilith_enqueue_calculator_assets' ) ) {
    figlie_di_lilith_enqueue_calculator_assets();
}
?>

<div class="lilith-chart-wrapper" id="lilith-calcolatore-root">

  <!-- ==========================================================================
       HERO HEADER RITUALE
       ========================================================================== -->
  <header class="lilith-chart-hero">
    <div class="lilith-hero-sigil-badge" aria-hidden="true">⚸</div>
    <div class="lilith-formula-invocazione">Nella Gloria di Lilith e delle sue Figlie</div>
    <h1>Tema Natale Astronomico & Orientamento Strutturale</h1>
    <p class="lilith-hero-tagline">
      Calcolo di altissima precisione basato sulle Effemeridi Svizzere (Swiss Ephemeris), cuspidi Placidus,
      Luna Nera Lilith (Osculatrice e Media ⚸), Nodi Lunari e Corpi Centaurici.
    </p>
  </header>

  <!-- ==========================================================================
       BANNER PRIVACY RADICALE (Zero Database Canon)
       ========================================================================== -->
  <aside class="lilith-privacy-banner" role="region" aria-label="Garanzia di Riservatezza Zero Database">
    <div class="lilith-privacy-icon" aria-hidden="true">⚸</div>
    <div class="lilith-privacy-content">
      <div class="lilith-privacy-title">Architettura Zero-Database • Riservatezza Assoluta</div>
      <div class="lilith-privacy-highlight">
        <strong>L'utente può salvare il link nei preferiti o condividerlo con un amico senza che nessun dato sensibile venga mai salvato su un server.</strong>
      </div>
      <p class="lilith-privacy-subtext">
        I tuoi dati di nascita (data, ora, coordinate geografiche) non vengono mai registrati in alcun database né tracciati per profilazione.
        La condivisione avviene tramite un frammento crittografato client-side nell'URL (<code>#data=...</code>), garantendoti sovranità e privacy inviolabile.
      </p>
    </div>
  </aside>


  <!-- ==========================================================================
       FORM DI CALCOLO DI NASCITA
       ========================================================================== -->
  <section class="lilith-input-card" id="lilith-input-section" aria-labelledby="lilith-form-title">
    <div class="lilith-form-header">
      <h2 id="lilith-form-title">Traccia la tua Mappa Celeste</h2>
      <p>Inserisci i dettagli di nascita per calcolare le posizioni esatte dei corpi celesti e delle cuspidi.</p>
    </div>


    <form id="lilith-chart-form" novalidate>
      <div class="lilith-form-grid">
        <!-- Data di Nascita -->
        <div class="lilith-form-group">
          <label for="lilith-birth-date">Data di Nascita *</label>
          <input type="date" id="lilith-birth-date" name="date" required>
          <small>Giorno, mese e anno</small>
        </div>

        <!-- Ora di Nascita -->
        <div class="lilith-form-group">
          <label for="lilith-birth-time">Ora Esatta (Locale) *</label>
          <input type="time" id="lilith-birth-time" name="time" required value="12:00">
          <small>Formato 24h dall'estratto di nascita</small>
        </div>

        <!-- Ora ripetuta al ritorno dell'ora solare -->
        <div class="lilith-form-group">
          <label for="lilith-birth-dst">Ora Ripetuta (Cambio Ora)</label>
          <select id="lilith-birth-dst" name="dst">
            <option value="auto" selected>Automatico</option>
            <option value="earlier">Prima occorrenza (ora legale)</option>
            <option value="later">Seconda occorrenza (ora solare)</option>
          </select>
          <small>Serve solo nella notte in cui l'orologio torna indietro e la stessa ora si ripete due volte. Il fuso e l'ora legale sono ricavati automaticamente dal luogo e dalla data.</small>
        </div>

        <!-- Luogo di Nascita -->
        <div class="lilith-form-group lilith-form-group-wide">
          <label for="lilith-location">Città o Comune di Nascita *</label>
          <div class="lilith-autocomplete-wrapper">
            <input type="text" id="lilith-location" name="location" placeholder="Es. Roma, Milano, Napoli, Londra, New York..." autocomplete="off" required>
            <div id="lilith-suggestions" class="lilith-suggestions-box"></div>
          </div>
          <div id="lilith-geo-badge" class="lilith-geo-badge">Digita e seleziona la città dall'elenco per ottenere le coordinate esatte.</div>
          <!-- Campi Coordinate Nascosti -->
          <input type="hidden" id="lilith-latitude" name="latitude">
          <input type="hidden" id="lilith-longitude" name="longitude">
          <input type="hidden" id="lilith-timezone" name="timezone">
        </div>

        <!-- Sistema di Case -->
        <div class="lilith-form-group">
          <label for="lilith-house-system">Sistema di Domificazione</label>
          <select id="lilith-house-system" name="house_system">
            <option value="P" selected>Placidus (Tradizione Classica Iniziatica)</option>
            <option value="K">Koch (Psicologia Umanistica)</option>
            <option value="W">Whole Sign (Segno Intero Tradizionale)</option>
            <option value="C">Campanus (Spazio Primario)</option>
            <option value="R">Regiomontanus (Astrologia Oraria ed Esoterica)</option>
            <option value="E">Equal / Uguali dall'Ascendente</option>
          </select>
        </div>
      </div>

      <!-- ======================================================================
           AVVERTENZA LEGALE, FINALITÀ DEL SERVIZIO & TUTELA DEL LIBERO ARBITRIO
           (Visibile prima di calcolare il tema natale)
           ====================================================================== -->
      <div class="lilith-legal-disclaimer-box" id="lilith-legal-disclaimer-pre">
        <div class="lilith-disclaimer-header">
          <span class="lilith-legal-icon">⚖️</span>
          <div style="flex: 1;">
            <h4>AVVERTENZA LEGALE, FINALITÀ DEL SERVIZIO &amp; TUTELA DEL LIBERO ARBITRIO</h4>
            <span class="lilith-legal-sub">Informativa obbligatoria ai sensi della Legge Italiana, Artt. 1322 e 2043 C.C. • Reg. UE 2016/679 (GDPR)</span>
          </div>
        </div>
        <div class="lilith-disclaimer-body">
          <p>
            <strong>1. Natura dei Contenuti e Finalità Esclusiva:</strong> Il presente calcolatore, le effemeridi astronomiche fornite, le relative interpretazioni simboliche, psicologiche, karmiche ed esoteriche (ivi incluse le sezioni denominate «Karma &amp; Destino», «Lettura Lilithiana», «Eros Oscuro &amp; Lussuria Iniziatica», «Dominio» e ogni altro testo elaborato dal sistema) sono concepiti e messi a disposizione ad <strong>esclusivo scopo culturale, filosofico, artistico, introspettivo e di intrattenimento personale</strong>. Le discipline astrologiche ed esoteriche appartengono alla sfera della tradizione simbolica e culturale umana, sono prive di validità scientifica o valore predittivo certo e non costituiscono scienze esatte o dimostrabili.
          </p>
          <p>
            <strong>2. Esclusione Categorica di Consulenza Medica, Psicologica e Sanitaria:</strong> I testi generati <strong>non costituiscono, non intendono sostituire e non possono in alcun caso surrogare</strong> una diagnosi medica, un percorso di psicoterapia, una perizia psichiatrica o un parere sanitario professionale. In presenza di stati di sofferenza psicologica, disagio emotivo, ansia, depressione o sintomi fisici, l'utente è espressamente tenuto a rivolgersi tempestivamente al proprio medico curante o a specialisti iscritti ai rispettivi albi professionali sanitari abilitati.
          </p>
          <p>
            <strong>3. Esclusione di Consulenza Legale, Tributaria o Finanziaria:</strong> Nessuna informazione o chiave interpretativa offerta dal portale costituisce consulenza finanziaria, legale, fiscale o invito ad assumere impegni patrimoniali o contrattuali.
          </p>
          <p>
            <strong>4. Tutela Assoluta del Libero Arbitrio e Auto-Responsabilità:</strong> Le indicazioni su talenti, bivi karmici, attitudini o direttive interiori non hanno carattere deterministico, vincolante o precettivo, e non inducono né incentivano il compimento o l'omissione di alcuna condotta. Ai sensi degli artt. 1322 e 2043 del Codice Civile italiano, ogni decisione di vita, scelta personale, sentimentale, professionale o etica rimane rimessa all'<strong>esclusiva e insindacabile facoltà di discernimento, autodeterminazione e responsabilità civile e morale dell'utente</strong>. I titolari e gli sviluppatori del portale <em>Figlie di Lilith</em> declinano ogni responsabilità per l'interpretazione soggettiva, l'uso o le conseguenze dirette o indirette derivanti dalla consultazione delle analisi.
          </p>
          <p>
            <strong>5. Garanzia Privacy &amp; Architettura Zero-Database:</strong> In piena conformità al Regolamento Generale sulla Protezione dei Dati (GDPR UE 2016/679) e al D.Lgs. 196/2003, si certifica che i dati anagrafici e di nascita immessi sono elaborati istantaneamente ed esclusivamente sul dispositivo locale dell'utente (client-side) e non vengono mai salvati su database remoti, né archiviati o profilati per fini commerciali o di cessione a terzi.
          </p>
        </div>
      </div>

      <button type="submit" class="lilith-submit-btn" id="lilith-btn-submit">
        <span class="lilith-submit-btn-title">Calcola Tema Natale ⚸</span>
        <span class="lilith-submit-btn-legal">Affermo di aver letto e accettato l'Avvertenza Legale e le Finalità del Servizio</span>
      </button>
    </form>
  </section>

  <!-- ==========================================================================
       STATO DI CARICAMENTO RITUALE (Loading)
       ========================================================================== -->
  <div class="lilith-loading-card" id="lilith-loading-section" style="display: none;" aria-live="polite">
    <div class="lilith-ritual-spinner" aria-hidden="true"></div>
    <h3>Tracciamento Coordinate Celesti in Corso...</h3>
    <p>
      Interrogazione delle Effemeridi Svizzere ad alta precisione, allineamento cuspidi,
      orbite della Luna Nera Lilith ⚸ e calcolo delle dignità tolemaiche.
    </p>
  </div>

  <!-- ==========================================================================
       SEZIONE RISULTATI (Visualizzazione Grafica & Analitica)
       ========================================================================== -->
  <section id="lilith-results-section" style="display: none;" aria-label="Risultati del Calcolo Natale">
    
    <!-- ======================================================================
         BOX DISCLAIMER LEGALE UFFICIALE (Collocato tra Banner Privacy e Toolbar)
         ====================================================================== -->
    <div class="lilith-legal-disclaimer-box" id="lilith-legal-disclaimer">
      <div class="lilith-disclaimer-header">
        <span class="lilith-legal-icon">⚖️</span>
        <div style="flex: 1;">
          <h4>AVVERTENZA LEGALE, FINALITÀ DEL SERVIZIO &amp; TUTELA DEL LIBERO ARBITRIO</h4>
          <span class="lilith-legal-sub">Informativa obbligatoria ai sensi della Legge Italiana, Artt. 1322 e 2043 C.C. • Reg. UE 2016/679 (GDPR)</span>
        </div>
      </div>
      <div class="lilith-disclaimer-body">
        <p>
          <strong>1. Natura dei Contenuti e Finalità Esclusiva:</strong> Il presente calcolatore, le effemeridi astronomiche fornite, le relative interpretazioni simboliche, psicologiche, karmiche ed esoteriche (ivi incluse le sezioni denominate «Karma &amp; Destino», «Lettura Lilithiana», «Eros Oscuro &amp; Lussuria Iniziatica», «Dominio» e ogni altro testo elaborato dal sistema) sono concepiti e messi a disposizione ad <strong>esclusivo scopo culturale, filosofico, artistico, introspettivo e di intrattenimento personale</strong>. Le discipline astrologiche ed esoteriche appartengono alla sfera della tradizione simbolica e culturale umana, sono prive di validità scientifica o valore predittivo certo e non costituiscono scienze esatte o dimostrabili.
        </p>
        <p>
          <strong>2. Esclusione Categorica di Consulenza Medica, Psicologica e Sanitaria:</strong> I testi generati <strong>non costituiscono, non intendono sostituire e non possono in alcun caso surrogare</strong> una diagnosi medica, un percorso di psicoterapia, una perizia psichiatrica o un parere sanitario professionale. In presenza di stati di sofferenza psicologica, disagio emotivo, ansia, depressione o sintomi fisici, l'utente è espressamente tenuto a rivolgersi tempestivamente al proprio medico curante o a specialisti iscritti ai rispettivi albi professionali sanitari abilitati.
        </p>
        <p>
          <strong>3. Esclusione di Consulenza Legale, Tributaria o Finanziaria:</strong> Nessuna informazione o chiave interpretativa offerta dal portale costituisce consulenza finanziaria, legale, fiscale o invito ad assumere impegni patrimoniali o contrattuali.
        </p>
        <p>
          <strong>4. Tutela Assoluta del Libero Arbitrio e Auto-Responsabilità:</strong> Le indicazioni su talenti, bivi karmici, attitudini o direttive interiori non hanno carattere deterministico, vincolante o precettivo, e non inducono né incentivano il compimento o l'omissione di alcuna condotta. Ai sensi degli artt. 1322 e 2043 del Codice Civile italiano, ogni decisione di vita, scelta personale, sentimentale, professionale o etica rimane rimessa all'<strong>esclusiva e insindacabile facoltà di discernimento, autodeterminazione e responsabilità civile e morale dell'utente</strong>. I titolari e gli sviluppatori del portale <em>Figlie di Lilith</em> declinano ogni responsabilità per l'interpretazione soggettiva, l'uso o le conseguenze dirette o indirette derivanti dalla consultazione delle analisi.
        </p>
        <p>
          <strong>5. Garanzia Privacy &amp; Architettura Zero-Database:</strong> In piena conformità al Regolamento Generale sulla Protezione dei Dati (GDPR UE 2016/679) e al D.Lgs. 196/2003, si certifica che i dati anagrafici e di nascita immessi sono elaborati istantaneamente ed esclusivamente sul dispositivo locale dell'utente (client-side) e non vengono mai salvati su database remoti, né archiviati o profilati per fini commerciali o di cessione a terzi.
        </p>
        <p>
          <strong>6. Software di Terze Parti &amp; Attribuzioni:</strong> I calcoli astronomici sono eseguiti dalle <strong>Swiss Ephemeris 2.10.03</strong> di <a href="https://www.astro.com/swisseph/" target="_blank" rel="noopener noreferrer">Astrodienst AG</a> (Zollikon, Svizzera), compilate in WebAssembly tramite <a href="https://github.com/prolaxu/swisseph-wasm" target="_blank" rel="noopener noreferrer">swisseph-wasm</a>. Le Swiss Ephemeris sono distribuite da Astrodienst AG con licenza <strong>GNU Affero General Public License</strong> oppure con licenza professionale; questo portale le utilizza nel regime indicato nel file <code>LICENZA.md</code> del tema. La risoluzione dei fusi orari usa <a href="https://github.com/moment/moment-timezone" target="_blank" rel="noopener noreferrer">Moment Timezone</a> (MIT, archivio IANA 2026c), <a href="https://github.com/darkskyapp/tz-lookup" target="_blank" rel="noopener noreferrer">tz-lookup</a> (CC0) e il <a href="https://github.com/js-temporal/temporal-polyfill" target="_blank" rel="noopener noreferrer">polyfill Temporal</a> (ISC). Le ricerche geografiche interrogano i servizi pubblici OpenStreetMap Nominatim e Photon. I testi delle avvertenze e le note di licenza complete sono riportati nella directory <code>js/vendor/</code> del tema.
        </p>
      </div>
    </div>

    <!-- Toolbar Azioni & Switch Doppio Motore -->
    <div class="lilith-results-toolbar">
      <div class="lilith-mode-control">
        <span class="lilith-mode-label">Prospettiva:</span>
        <div class="lilith-segmented-switch">
          <button type="button" class="lilith-switch-btn active" id="lilith-btn-mode-astronomy">Dati Astronomici Puri</button>
          <button type="button" class="lilith-switch-btn karma-mode-btn" id="lilith-btn-mode-karma">🌌 Karma &amp; Destino</button>
          <button type="button" class="lilith-switch-btn dark-mode-btn" id="lilith-btn-mode-dark">🔥 Lettura Lilithiana</button>
        </div>
      </div>

      <div class="lilith-toolbar-buttons">
        <button type="button" class="lilith-action-btn coming-soon-btn" id="lilith-btn-coming-soon" title="In Arrivo: Motore Astrologico Tema Natale Lilithiano">
          ⏳ Coming Soon: Motore Astrologico Tema Natale Lilithiano
        </button>
        <button type="button" class="lilith-action-btn share" id="lilith-btn-share" title="Copia link permanente con i tuoi dati crittografati">
          🔗 Condividi Link Privato
        </button>
        <button type="button" class="lilith-action-btn" id="lilith-btn-export-svg" title="Scarica la ruota vettoriale SVG HD a 300 DPI">
          ⚸ Esporta SVG HD
        </button>
        <button type="button" class="lilith-action-btn print" id="lilith-btn-print-pdf" title="Stampa o salva in PDF il dossier A4">
          🖨️ Stampa Dossier A4
        </button>
        <button type="button" class="lilith-action-btn" id="lilith-btn-export-json" title="Scarica l'intero dataset astronomico in formato JSON">
          💾 Esporta JSON
        </button>
        <button type="button" class="lilith-action-btn" id="lilith-btn-new-chart" title="Effettua un nuovo calcolo per un'altra persona">
          ↺ Nuovo Calcolo
        </button>
      </div>
    </div>

    <!-- Ruota Zodiacale Dinamica (Grafica del Cielo Natale) -->
    <div class="lilith-wheel-card" id="lilith-chart-wheel-container">
      <div class="lilith-wheel-header">
        <div class="lilith-wheel-title-group">
          <h3>Ruota Zodiacale Dinamica ⚸</h3>
          <span class="lilith-wheel-hint">Tocca un punto celeste per dettagli • Zoom con rotellina o 2 dita (pinch)</span>
        </div>
        <!-- Toolbar Zoom & Pan Interattivo -->
        <div class="lilith-wheel-zoom-toolbar" role="toolbar" aria-label="Controlli Zoom Ruota">
          <button type="button" class="lilith-zoom-btn" id="lilith-zoom-in" title="Ingrandisci (o usa rotellina / pinch con 2 dita)">➕</button>
          <button type="button" class="lilith-zoom-btn" id="lilith-zoom-out" title="Riduci">➖</button>
          <button type="button" class="lilith-zoom-btn" id="lilith-zoom-reset" title="Ripristina dimensione predefinita">↺ Reset</button>
        </div>
      </div>

      <!-- Pannello Filtri Ruota (Aspetti & Asteroidi) -->
      <div class="lilith-chart-filters-panel">
        <div class="lilith-filter-pills">
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--lilith-oro); text-transform: uppercase; align-self: center; margin-right: 0.4rem;">Aspetti:</span>
          <button type="button" class="lilith-pill active" data-aspect-filter="all">Tutti</button>
          <button type="button" class="lilith-pill" data-aspect-filter="major">Maggiori</button>
          <button type="button" class="lilith-pill" data-aspect-filter="hard">Tensione</button>
          <button type="button" class="lilith-pill" data-aspect-filter="soft">Armonici</button>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <label class="lilith-toggle-switch">
            <input type="checkbox" id="lilith-toggle-asteroids" checked>
            <span>Mostra Asteroidi &amp; Centauri</span>
          </label>
          <button type="button" class="lilith-action-btn" id="lilith-btn-reset-view" style="font-size: 0.76rem; padding: 0.3rem 0.6rem;">
            Ripristina Vista
          </button>
        </div>
      </div>

      <div class="lilith-svg-container" id="lilith-svg-container">
        <svg id="chart-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruota Astrologica Natale Figlie di Lilith"></svg>
      </div>
    </div>

    <!-- Dossier Header con Metadati e Firma Energetica -->
    <header class="lilith-dossier-header">
      <div>
        <h2 id="lilith-dossier-title">Tema Natale • Figlie di Lilith</h2>
        <div class="lilith-meta-pill-box" id="lilith-dossier-meta"></div>
      </div>
      <div class="lilith-signature-card">
        <div class="lilith-sig-label">Firma Celeste Primaria</div>
        <div class="lilith-sig-val" id="lilith-sig-val">-</div>
        <div class="lilith-sig-sub" id="lilith-sig-sub">-</div>
      </div>
    </header>

    <!-- ======================================================================
         VISTA 1: DATI ASTRONOMICI PURI (Tabelle + Inspector)
         ====================================================================== -->
    <div id="lilith-astronomy-view">
      <!-- Layout Ispezione + Tabelle Dati -->
      <div class="lilith-main-display">
        <!-- Card Ispezione Interattiva (Inspector) -->
        <div class="lilith-inspector-card" id="lilith-inspector-container">
          <div class="lilith-empty-inspector" id="lilith-inspector-empty">
            <div class="lilith-inspector-icon">⚸</div>
            <div>
              <strong style="color: var(--lilith-oro); display: block; margin-bottom: 0.2rem;">Ispezione Punto Celeste</strong>
              <p style="font-size: 0.85rem; margin: 0;">Clicca o tocca un pianeta nella ruota o nelle tabelle per visualizzare la sua funzione operativa, l'ombra inconscia e la direttiva iniziatica.</p>
            </div>
          </div>
          <div id="lilith-inspector-content" style="display: none;"></div>
        </div>

        <!-- Colonna Destra: Tabelle Coordinate Celesti -->
        <div class="lilith-data-card">
          <div class="lilith-data-tabs">
            <button type="button" class="lilith-data-tab active" data-tab="planets">Pianeti & Punti Celesti</button>
            <button type="button" class="lilith-data-tab" data-tab="houses">Cuspidi & Case</button>
            <button type="button" class="lilith-data-tab" data-tab="aspects">Aspetti & Raggi</button>
            <button type="button" class="lilith-data-tab" data-tab="dominance">Dominanze & Elementi</button>
          </div>

          <!-- Tab 1: Pianeti -->
          <div class="lilith-tab-content" id="lilith-tab-planets">
            <table class="lilith-table" id="lilith-planets-table">
              <thead>
                <tr>
                  <th>Corpo Celeste</th>
                  <th>Longitudine</th>
                  <th>Casa</th>
                  <th>Moto</th>
                  <th>Dignità</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <!-- Tab 2: Case -->
          <div class="lilith-tab-content" id="lilith-tab-houses" style="display: none;">
            <table class="lilith-table" id="lilith-houses-table">
              <thead>
                <tr>
                  <th>Cuspide / Angolo</th>
                  <th>Grado Zodiacale</th>
                  <th style="text-align:right;">Dettaglio</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <!-- Tab 3: Aspetti -->
          <div class="lilith-tab-content" id="lilith-tab-aspects" style="display: none;">
            <table class="lilith-table" id="lilith-aspects-table">
              <thead>
                <tr>
                  <th>Aspetto &amp; Pianeti</th>
                  <th>Tipo</th>
                  <th>Orbe</th>
                  <th>Natura</th>
                  <th style="text-align:right;">Interpretazione</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <!-- Tab 4: Dominanze -->
          <div class="lilith-tab-content" id="lilith-tab-dominance" style="display: none;">
            <div class="lilith-dominance-box">
              <div class="lilith-dom-item lilith-clickable-dom" id="lilith-card-dom-elem" onclick="openDominantElementModal()" style="cursor:pointer;" title="Clicca per approfondire l'Elemento Dominante">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="lilith-dom-lbl">Elemento Dominante:</span>
                  <span class="lilith-dom-hint" style="font-size:0.68rem;color:var(--lilith-oro);font-weight:700;">Info ⚸</span>
                </div>
                <span class="lilith-dom-val" id="lilith-dom-elem">-</span>
              </div>
              <div class="lilith-dom-item lilith-clickable-dom" id="lilith-card-dom-mod" onclick="openDominantModalityModal()" style="cursor:pointer;" title="Clicca per approfondire la Modalità Dominante">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="lilith-dom-lbl">Modalità Dominante:</span>
                  <span class="lilith-dom-hint" style="font-size:0.68rem;color:var(--lilith-oro);font-weight:700;">Info ⚸</span>
                </div>
                <span class="lilith-dom-val" id="lilith-dom-mod">-</span>
              </div>
            </div>
            <table class="lilith-table" id="lilith-dominance-table">
              <thead>
                <tr>
                  <th>Pianeta</th>
                  <th>Punti <span class="lilith-hide-mobile">di Forza</span></th>
                  <th>% <span class="lilith-hide-mobile">Potere</span></th>
                  <th style="text-align:right;">Info</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================================
         VISTA 2: LETTURA LILITHIANA UNIFICATA • SOVRANITÀ, KARMA & INIZIAZIONE
         (Fusione di Karma & Destino, Dominio Sovrano & Decodifica Strutturale)
         ====================================================================== -->
    <div id="lilith-dark-view" class="lilith-reading-view" style="display: none;">
      <div class="lilith-dark-reading-panel">
        
        <!-- Header Unificato del Dossier Lilithiano -->
        <header class="lilith-dark-reading-header" id="lilith-sec-manifesto">
          <div class="lilith-dark-badge">🔥 CANALE DI SOVRANITÀ, KARMA &amp; RISVEGLIO LILITHIANO</div>
          <h3>Dossier Lilithiano • Lettura Iniziatica Integrale</h3>
          <p class="lilith-dark-lead">
            La fusione definitiva tra la decodifica strutturale ad alta precisione astronomica, l'asse karmico del destino e la sapienza oscura di Lilith.
            Nessun moralismo, nessuna ipocrisia: qui ogni pianeta, settore, nodo karmico e raggio di tensione svela la sua funzione operativa,
            il suo fuoco carnale più insaziabile e il patto di sovranità per cavalcare l'ombra con maestria interiore.
          </p>

          <!-- Barra di Salto Rapido (Touch-friendly & Mobile-ready) -->
          <nav class="lilith-reading-nav" aria-label="Navigazione Dossier">
            <button type="button" class="lilith-reading-nav-btn synthesis-nav-btn" onclick="document.getElementById('lilith-sec-sintesi-unificata').scrollIntoView({behavior:'smooth', block:'start'});">👑 Sintesi Unificata (3 Passaggi)</button>
            <button type="button" class="lilith-reading-nav-btn karma-nav-btn" onclick="document.getElementById('lilith-sec-karma').scrollIntoView({behavior:'smooth', block:'start'});">🌌 Karma &amp; Destino Sovrano</button>
            <button type="button" class="lilith-reading-nav-btn" onclick="document.getElementById('lilith-dark-reading-container').scrollIntoView({behavior:'smooth', block:'start'});">🔥 Dominio &amp; Lussuria Sacra</button>
            <button type="button" class="lilith-reading-nav-btn" onclick="document.getElementById('lilith-sec-struttura').scrollIntoView({behavior:'smooth', block:'start'});">✨ Decodifica a 8 Dimensioni</button>
            <button type="button" class="lilith-reading-nav-btn" onclick="document.getElementById('lilith-legal-disclaimer').scrollIntoView({behavior:'smooth', block:'start'});">⚖️ Avvertenza Legale</button>
          </nav>
        </header>

        <!-- ==============================================================
             SEZIONE SPECIALE: SINTESI UNIFICATA A 5 DIMENSIONI (CODEX ASTRA)
             ============================================================== -->
        <section class="lilith-synthesis-section" id="lilith-sec-sintesi-unificata" aria-labelledby="lilith-synthesis-title">
          <div id="lilith-unified-synthesis-container"></div>
        </section>

        <!-- Divisore Iniziativo con Simbolo Lilithiano -->
        <div class="lilith-reading-divider">
          <div class="lilith-divider-line"></div>
          <div class="lilith-divider-symbol">⚸ 👑 ⚸</div>
          <div class="lilith-divider-line"></div>
        </div>

        <!-- ==============================================================
             SEZIONE SPECIALE: KARMA & DESTINO SOVRANO (IL PATTO D'INCARNAZIONE)
             ============================================================== -->
        <section class="lilith-karma-section" id="lilith-sec-karma" aria-labelledby="lilith-karma-title">
          <div class="lilith-karma-header">
            <span class="lilith-karma-badge">🌌 ASSE DEL TEMPO • KARMA, ORIGINE &amp; DESTINO SOVRANO</span>
            <h3 id="lilith-karma-title">Il Patto d'Incarnazione: Perché Sei Qui, Cosa Fare &amp; Dove Andare</h3>
            <p class="lilith-karma-lead">
              L'anima non scende nella carne per caso. Prima della tua incarnazione hai stipulato un patto cosmico:
              sciogliere le inerzie del passato ancestrale, superare la prova di Saturno e Plutone, e compiere
              la tua traiettoria evolutiva verso la sovranità incondizionata della tua fiamma di Lilith.
            </p>
          </div>

          <!-- Contenitore Generato Dinamicamente dal Motore Astronomico -->
          <div id="lilith-karma-destiny-container"></div>

          <!-- NOTA DI RIMANDO ALL'AVVERTENZA LEGALE UFFICIALE -->
          <div class="lilith-karma-legal-note" style="margin-top: 2rem; padding: 1.1rem 1.3rem; background: rgba(18, 9, 23, 0.7); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.4rem;">⚖️</span>
            <p style="font-size: 0.84rem; color: #cbd5e1; margin: 0; line-height: 1.5;">
              <strong style="color: var(--lilith-oro);">Avvertenza Legale &amp; Pieno Libero Arbitrio:</strong>
              L'interpretazione su karma, bivi del destino ed eredità ancestrale ha finalità puramente simbolica e filosofica. Consulta l'<a href="#lilith-legal-disclaimer" onclick="document.getElementById('lilith-legal-disclaimer').scrollIntoView({behavior:'smooth', block:'start'}); return false;" style="color: var(--lilith-oro); text-decoration: underline; font-weight: 700;">Informativa Legale Ufficiale (Artt. 1322 e 2043 C.C.)</a> posta tra il banner privacy e la barra delle prospettive.
            </p>
          </div>
        </section>

        <!-- Divisore Iniziativo con Simbolo Lilithiano -->
        <div class="lilith-reading-divider">
          <div class="lilith-divider-line"></div>
          <div class="lilith-divider-symbol">⚸ 🌌 ⚸</div>
          <div class="lilith-divider-line"></div>
        </div>

        <!-- Parte 1: Dossier di Dominio, Lussuria Sacra & Sovranità (Generato da renderLilithDarkReading) -->
        <div class="lilith-dark-reading-container" id="lilith-dark-reading-container"></div>

        <!-- Divisore Iniziativo con Simbolo Lilithiano -->
        <div class="lilith-reading-divider" id="lilith-sec-struttura">
          <div class="lilith-divider-line"></div>
          <div class="lilith-divider-symbol">⚸ ✨ ⚸</div>
          <div class="lilith-divider-line"></div>
        </div>

        <!-- Parte 2: Decodifica Strutturale Completa a 8 Dimensioni (Generato da renderLilithOperationalAnalysis) -->
        <div class="lilith-operational-container" style="padding-top: 0;">
          <div class="lilith-operational-intro">
            <h3>Decodifica Strutturale &amp; Diagnosi a 8 Dimensioni</h3>
            <p>
              Ciascun archetipo celeste sezionato con rigore astronomico ed esoterico:
              1. Funzione, 2. Manifestazione, 3. Ombra Inconscia, 4. Integrazione Costruttiva,
              5. Contesto di Vita, 6. Errori Tipici, 7. Direttiva Iniziatica e <strong>🔥 8. Eros Oscuro &amp; Lussuria Iniziatica (L'Ombra da Cavalcare)</strong>.
            </p>
          </div>

          <div class="lilith-group-wrapper" id="lilith-analysis-container"></div>
        </div>

      </div>
    </div>

  </section>

  <!-- ==========================================================================
       CONFRONTO ASTRONOMICO & VALORE DIFFERENZIALE
       (I Pilastri di Verità del Nostro Motore Celeste)
       Collocato rigorosamente SOTTO il Calcolatore
       ========================================================================== -->
  <section class="lilith-value-section" id="lilith-value-comparison-section" aria-labelledby="lilith-value-title">
    <div class="lilith-section-heading">
      <span class="lilith-section-tag">Rigore Astronomico & Sapienza Iniziatica</span>
      <h2 id="lilith-value-title">I Pilastri di Verità del Nostro Motore Celeste</h2>
      <p class="lilith-section-subtitle">
        Tutto ciò che la nostra opera garantisce matematicamente e perché si distingue da qualsiasi calcolatore commerciale online.
      </p>
    </div>

    <div class="lilith-comparison-grid">
      <!-- 1. Precisione Astronomica Reale -->
      <article class="lilith-comp-card featured">
        <div class="lilith-comp-icon">📐</div>
        <h3>Swiss Ephemeris Native nel Browser</h3>
        <span class="lilith-status-tag our">Il Nostro Motore</span>
        <p>
          Posizioni geocentriche tropicali calcolate dalle <strong>Swiss Ephemeris 2.10.03</strong> compilate in WebAssembly, le stesse effemeridi usate dagli astrologi professionisti, eseguite direttamente nel tuo browser: nessun server, nessun dato di nascita trasmesso. Sei sistemi di domificazione reali (Placidus, Koch, Whole Sign, Campanus, Regiomontanus, Equal). Lo stato retrogrado [R] non è stimato, ma letto dalla velocità in longitudine <code>dλ/dt</code> restituita dalle effemeridi stesse. Se un calcolo non è eseguibile, il motore lo dichiara: non esiste alcun ripiego approssimato.
        </p>
        <span class="lilith-status-tag other">Gli Altri Portali</span>
        <p class="other-note">
          Spesso basati su tabelle statiche prefissate, approssimazioni prive di perturbazioni periodiche, assenza del calcolo matematico della velocità orbitale e cuspidi stimate con formule semplificate.
        </p>
      </article>

      <!-- 2. Luna Nera Lilith -->
      <article class="lilith-comp-card featured">
        <div class="lilith-comp-icon">⚸</div>
        <h3>Lilith Media &amp; Lilith Vera (Osculatrice)</h3>
        <span class="lilith-status-tag our">Il Nostro Motore</span>
        <p>
          Doppio calcolo astronomico nativo dell'apogeo lunare: sia Lilith Media (progressione perigeale media) sia Lilith Vera Osculatrice (corretta per le perturbazioni dell'evezione solare), con glifo canonico <span class="lilith-glyph">⚸</span>, dignità essenziali, aspetti dedicati e analisi dell'archetipo di sovranità e ombra.
        </p>
        <span class="lilith-status-tag other">Gli Altri Portali</span>
        <p class="other-note">
          Lilith quasi sempre assente, confusa con l'asteroide 1181 Lilith della fascia principale, oppure limitata alla sola posizione media senza alcuna distinzione astronomica.
        </p>
      </article>

      <!-- 3. 20 Corpi Celesti -->
      <article class="lilith-comp-card">
        <div class="lilith-comp-icon">🪐</div>
        <h3>20 Corpi Celesti, Dee Asteroidi &amp; Punti Iniziatici</h3>
        <span class="lilith-status-tag our">Il Nostro Motore</span>
        <p>
          Mappa completa a 20 elementi celesti: i 10 pianeti dell'astronomia classica e moderna, Lilith Media e Lilith Vera <span class="lilith-glyph">⚸</span>, il centauro Chirone, le quattro Dee Asteroidi del sacro femminile (Cerere, Pallade Atena, Giunone, Vesta), il Nodo Lunare Nord (con derivata retrograda reale), la Parte di Fortuna e il Vertex.
        </p>
        <span class="lilith-status-tag other">Gli Altri Portali</span>
        <p class="other-note">
          Spesso limitati ai soli 7 pianeti tradizionali o 10 corpi tolemaici, senza archetipi asteroidali né calcolo combinato di centauri e punti cardinali.
        </p>
      </article>

      <!-- 4. Diagnosi a 8 Dimensioni & Fusione di Dominio ed Eros -->
      <article class="lilith-comp-card featured">
        <div class="lilith-comp-icon">🔥</div>
        <h3>Diagnosi a 8 Dimensioni &amp; Fusione di Dominio ed Eros</h3>
        <span class="lilith-status-tag our">Il Nostro Motore</span>
        <p>
          Nessun oroscopo fatalista o censure moralistiche: decodifica strutturale a 8 dimensioni operative per ogni punto celeste (Funzione, Manifestazione, Ombra Inconscia, Integrazione, Contesto, Errori Tipici, Direttiva Iniziatica e 🔥 Eros Oscuro &amp; Lussuria Iniziatica), fusa in un unico dossier con la Rilettura Lilithiana di Dominio, 23 coppie cardine bespoke (138 aspetti) ed esegesi a 5 livelli senza ipocrisie.
        </p>
        <span class="lilith-status-tag other">Gli Altri Portali</span>
        <p class="other-note">
          Testi generici da rotocalco, descrizioni ambigue valide per chiunque (effetto Forer) o report superficiali con contenuti essenziali oscurati da paywall commerciali.
        </p>
      </article>

      <!-- 5. Zero Database & Privacy Radicale -->
      <article class="lilith-comp-card">
        <div class="lilith-comp-icon">🔒</div>
        <h3>Zero Database &amp; Privacy Radicale</h3>
        <span class="lilith-status-tag our">Il Nostro Motore</span>
        <p>
          Zero registrazione, nessuna richiesta di email e nessun salvataggio dei tuoi dati di nascita su database o server remoti. L'intero calcolo è eseguito in locale nel tuo browser e il link permanente è codificato nell'hash dell'URL (<code>#data=...</code>): la tua privacy biografica resta inviolabile.
        </p>
        <span class="lilith-status-tag other">Gli Altri Portali</span>
        <p class="other-note">
          Registrazione o email obbligatoria per visualizzare il tema, tracciamento pubblicitario e memorizzazione dei dati anagrafici su database per profilazione o campagne di marketing.
        </p>
      </article>

      <!-- 6. Grafica Vettoriale SVG Nativa & Stampa Dossier A4 -->
      <article class="lilith-comp-card">
        <div class="lilith-comp-icon">🖨️</div>
        <h3>Grafica Vettoriale SVG Nativa &amp; Stampa A4</h3>
        <span class="lilith-status-tag our">Il Nostro Motore</span>
        <p>
          Ruota zodiacale disegnata in pura grafica vettoriale SVG nativa scalabile all'infinito senza perdita di nitidezza, zoom e pan interattivi, download diretto del file <code>.svg</code> e dataset <code>.json</code>, con impaginazione <code>@media print</code> ottimizzata per la stampa su carta o PDF A4 pulito.
        </p>
        <span class="lilith-status-tag other">Gli Altri Portali</span>
        <p class="other-note">
          Immagini raster bitmap a bassa risoluzione (<code>.jpg</code>/<code>.png</code> sgranate), loghi pubblicitari ingombranti sovrimpressi sul grafico, o download del PDF vincolato ad abbonamenti a pagamento.
        </p>
      </article>
    </div>
  </section>

  <!-- ==========================================================================
       POPUP MODALE / BOTTOM-SHEET INTERATTIVO (Mobile & Desktop)
       Con Frecce Avanti/Indietro & Supporto Swipe con Dito
       ========================================================================== -->
  <div id="lilith-aspect-modal" class="lilith-aspect-modal" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="lilith-modal-backdrop" id="lilith-modal-backdrop"></div>
    <div class="lilith-modal-dialog">
      <div class="lilith-modal-handle-bar" aria-hidden="true"></div>
      <div class="lilith-modal-header">
        <div class="lilith-modal-badge" id="lilith-modal-badge">⚸</div>
        <div class="lilith-modal-title-box">
          <h3 id="lilith-modal-title">Dettaglio Aspetto</h3>
          <span id="lilith-modal-subtitle">Orbe &amp; Coordinate</span>
        </div>
        <button type="button" class="lilith-modal-close" id="lilith-modal-close" aria-label="Chiudi Scheda">&times;</button>
      </div>

      <!-- Barra di Navigazione Rapida (Frecce Avanti/Indietro & Contatore) -->
      <div class="lilith-modal-nav-bar">
        <button type="button" class="lilith-modal-nav-btn" id="lilith-modal-prev" aria-label="Precedente">
          <span>&#8592;</span> Prec
        </button>
        <span class="lilith-modal-counter" id="lilith-modal-counter">1 di 10</span>
        <button type="button" class="lilith-modal-nav-btn" id="lilith-modal-next" aria-label="Successivo">
          Succ <span>&#8594;</span>
        </button>
      </div>

      <div class="lilith-modal-body" id="lilith-modal-body">
        <!-- Contenuto dinamico inserito via JS -->
      </div>

      <div class="lilith-modal-footer">
        <button type="button" class="lilith-modal-action-btn" id="lilith-modal-dismiss">Chiudi Scheda</button>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       MODALE COMING SOON: CALCOLATORE & LETTURA ASTROLOGICA LILITHIANA COMPLETA
       ========================================================================== -->
  <div id="lilith-coming-soon-modal" class="lilith-aspect-modal" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="lilith-modal-backdrop" id="lilith-coming-soon-backdrop"></div>
    <div class="lilith-modal-dialog lilith-coming-soon-dialog">
      <div class="lilith-modal-handle-bar" aria-hidden="true"></div>
      <div class="lilith-modal-header">
        <div class="lilith-modal-badge" style="border-color:#ff5a1f;color:#ff5a1f;box-shadow:0 0 15px rgba(255,90,31,0.5);">⏳</div>
        <div class="lilith-modal-title-box">
          <h3 style="color:#ffffff;">Motore Astrologico Tema Natale Lilithiano</h3>
          <span style="color:var(--lilith-oro);font-style:italic;">In Arrivo • L'Oracolo Totale della Notte</span>
        </div>
        <button type="button" class="lilith-modal-close" id="lilith-coming-soon-close" aria-label="Chiudi Scheda">&times;</button>
      </div>

      <div class="lilith-modal-body" style="padding-top:1.2rem;">
        <div class="lilith-coming-soon-intro">
          <p style="font-size:0.95rem;color:#fae8ff;line-height:1.6;margin-bottom:1.2rem;">
            Stiamo forgiando il sistema astrologico più profondo, esigente e privo di censure mai concepito. Presto potrai accedere alla <strong>Lettura Astrologica Lilithiana Integrale</strong> e al nuovo calcolatore di livello oracolare.
          </p>
        </div>

        <div class="lilith-coming-soon-grid">
          <div class="lilith-coming-soon-card">
            <div class="cs-card-icon">🔥</div>
            <h4>Sinastria di Dominio &amp; Eros Carnale</h4>
            <p>Confronto magnetico tra due temi natali: calcolo dell'indice di fusione tantrica, attrazione fatale e nodi karmici di potere tra Lilith, Marte, Venere e Plutone.</p>
          </div>

          <div class="lilith-coming-soon-card">
            <div class="cs-card-icon">📡</div>
            <h4>Radar dei Transiti di Lilith in Tempo Reale</h4>
            <p>Monitoraggio continuo con effemeridi ad alta precisione: allarmi quando la Luna Nera transita sui tuoi angoli natali o attiva la miccia della trasmutazione dell'ombra.</p>
          </div>

          <div class="lilith-coming-soon-card">
            <div class="cs-card-icon">📜</div>
            <h4>Monografia Iniziatica Integrale (30+ Pagine PDF)</h4>
            <p>Dossier completo scaricabile in alta definizione tipografica, con sigillo personale, decani goetici, tavole delle dignità esoteriche e formule di sovranità.</p>
          </div>

          <div class="lilith-coming-soon-card">
            <div class="cs-card-icon">👑</div>
            <h4>Iniziazione ai 36 Decani &amp; Termini Egizi</h4>
            <p>Risoluzione al secondo d'arco per ogni cuspide e pianeta, con corrispondenze ermetiche e percorsi pratici per cavalcare il proprio destino.</p>
          </div>
        </div>

        <div class="lilith-coming-soon-waitlist">
          <div class="cs-waitlist-title">⚡ Ricevi l'Accesso Prioritario al Lancio</div>
          <p>Inserisci la tua email per essere tra le prime anime ad accedere alla Lettura Lilithiana Completa appena sarà attiva.</p>
          <form class="cs-waitlist-form" onsubmit="event.preventDefault(); if (window.handleLilithWaitlist) window.handleLilithWaitlist(this);">
            <input type="email" placeholder="La tua email sovrana..." required class="cs-waitlist-input" id="lilith-waitlist-email">
            <button type="submit" class="cs-waitlist-btn">Iscriviti alla Lista Prioritaria ⚸</button>
          </form>
          <div id="lilith-waitlist-feedback" class="cs-waitlist-feedback" style="display:none;"></div>
        </div>
      </div>

      <div class="lilith-modal-footer">
        <button type="button" class="lilith-modal-action-btn" id="lilith-coming-soon-dismiss">Chiudi Anteprima</button>
      </div>
    </div>
  </div>

</div>
