/**
 * Natal Chart SVG Visualization - Figlie di Lilith Edition (Canon 2026 Mobile-First)
 * Rendering vettoriale SVG ultra-dettagliato, responsive e scalabile per schermi mobile e desktop.
 * Gestione interattiva completa di click/tap su pianeti, cuspidi e raggi di aspetto con highlight.
 */

(function (window) {
  'use strict';

  const LilithChartRenderer = {
    center: 300,
    outerRadius: 280,
    zodiacWidth: 38,
    houseRadius: 242,   // Bordo interno della fascia zodiacale (280 - 38)
    planetRadius: 180,  // Orbita primaria dei pianeti ben distanziata dalla fascia delle case
    houseBandRadius: 136, // Confine tra la fascia delle case e il cerchio degli aspetti
    innerRadius: 130,   // Cerchio centrale aspetti & sigillo Lilith (raggio interno 130)

    currentChartData: null,
    aspectFilter: 'all',
    showAsteroids: true,
    selectedPlanet: null,
    selectedAspect: null,
    onSelectPlanet: null,
    onSelectAspect: null,

    // Zodiac signs
    signs: [
      { name: 'Aries', itName: 'Ariete', symbol: '♈', element: 'fire' },
      { name: 'Taurus', itName: 'Toro', symbol: '♉', element: 'earth' },
      { name: 'Gemini', itName: 'Gemelli', symbol: '♊', element: 'air' },
      { name: 'Cancer', itName: 'Cancro', symbol: '♋', element: 'water' },
      { name: 'Leo', itName: 'Leone', symbol: '♌', element: 'fire' },
      { name: 'Virgo', itName: 'Vergine', symbol: '♍', element: 'earth' },
      { name: 'Libra', itName: 'Bilancia', symbol: '♎', element: 'air' },
      { name: 'Scorpio', itName: 'Scorpione', symbol: '♏', element: 'water' },
      { name: 'Sagittarius', itName: 'Sagittario', symbol: '♐', element: 'fire' },
      { name: 'Capricorn', itName: 'Capricorno', symbol: '♑', element: 'earth' },
      { name: 'Aquarius', itName: 'Acquario', symbol: '♒', element: 'air' },
      { name: 'Pisces', itName: 'Pesci', symbol: '♓', element: 'water' }
    ],

    planetSymbols: {
      'Sun': '☉', 'Moon': '☽', 'Mercury': '☿', 'Venus': '♀', 'Mars': '♂',
      'Jupiter': '♃', 'Saturn': '♄', 'Uranus': '♅', 'Neptune': '♆', 'Pluto': '♇',
      'TrueNode': '☊', 'MeanNode': '☊', 'Chiron': '⚷', 'Lilith': '⚸', 'TrueLilith': '⚸',
      'Ceres': '⚳', 'Pallas': '⚴', 'Juno': '⚵', 'Vesta': '⚶',
      'ParsFortunae': '⊗', 'Vertex': 'Vx',
      'Sole': '☉', 'Luna': '☽', 'Mercurio': '☿', 'Venere': '♀', 'Marte': '♂',
      'Giove': '♃', 'Saturno': '♄', 'Urano': '♅', 'Nettuno': '♆', 'Plutone': '♇',
      'Nodo Nord': '☊', 'Nodo Medio': '☊', 'Chirone': '⚷', 'Lilith Media': '⚸', 'Lilith (Vera)': '⚸',
      'Cerere': '⚳', 'Pallade': '⚴', 'Giunone': '⚵', 'Vesta': '⚶', 'Punto di Fortuna': '⊗'
    },

    aspectColors: {
      'conjunction': '#a855f7',
      'opposition': '#ef4444',
      'square': '#ff5a1f',
      'trine': '#c7a56b',
      'sextile': '#38bdf8',
      'quincunx': '#eab308',
      'Congiunzione': '#a855f7',
      'Opposizione': '#ef4444',
      'Quadratura': '#ff5a1f',
      'Trigono': '#c7a56b',
      'Sestile': '#38bdf8',
      'Quinconce': '#eab308'
    },

    elementColors: {
      'fire': '#ef4444',
      'earth': '#10b981',
      'air': '#38bdf8',
      'water': '#6366f1'
    },

    lonToAngle(lon, ascLon) {
      let diff = (lon - ascLon + 360) % 360;
      return (180 - diff) * Math.PI / 180.0;
    },

    polarToCartesian(angle, radius) {
      return {
        x: this.center + radius * Math.cos(angle),
        y: this.center - radius * Math.sin(angle)
      };
    },

    render(svg, chartData) {
      this.currentChartData = chartData;
      if (!svg) return;
      svg.innerHTML = '';
      svg.setAttribute('viewBox', '0 0 600 600');

      const ascLon = chartData.houses?.angles?.ascendant?.longitude ||
                     (chartData.house_cusps && chartData.house_cusps[0]) || 0;

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = `
        <radialGradient id="lilith-center-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#240c0c"/>
          <stop offset="60%" stop-color="#120606"/>
          <stop offset="100%" stop-color="#070303"/>
        </radialGradient>
        <radialGradient id="lilith-outer-grad" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stop-color="#080404"/>
          <stop offset="100%" stop-color="#140606"/>
        </radialGradient>
        <filter id="lilith-glow-sigil" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="lilith-hover-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      `;
      svg.appendChild(defs);

      let cuspsArray = [];
      if (chartData.houses && chartData.houses.cusps) {
        cuspsArray = chartData.houses.cusps.map(c => typeof c === 'number' ? c : c.longitude);
      } else if (Array.isArray(chartData.house_cusps)) {
        cuspsArray = chartData.house_cusps;
      }

      let planetPositions = {};
      if (chartData.planet_positions) {
        planetPositions = chartData.planet_positions;
      } else if (chartData.planets) {
        chartData.planets.forEach(p => {
          planetPositions[p.name] = p.longitude;
        });
      }

      // Crea il gruppo contenitore trasformabile per Zoom e Pan
      const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      chartGroup.setAttribute('id', 'chart-main-group');
      chartGroup.setAttribute('class', 'chart-main-group');
      svg.appendChild(chartGroup);

      this.renderBackground(chartGroup);
      this.renderZodiacWheel(chartGroup, ascLon);
      this.renderHouses(chartGroup, cuspsArray, ascLon);
      this.renderCenterBackground(chartGroup);
      this.renderAspects(chartGroup, planetPositions, chartData.aspects, ascLon);
      this.renderCenterHub(chartGroup);
      this.renderPlanets(chartGroup, chartData.planets, ascLon);

      // Inizializza o aggiorna i controlli interattivi di Zoom & Pan (mouse, rotellina, pinch-to-zoom 2 dita)
      this.initPanZoom(svg);
    },

    renderBackground(svg) {
      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bg.setAttribute('cx', this.center);
      bg.setAttribute('cy', this.center);
      bg.setAttribute('r', this.outerRadius);
      bg.setAttribute('fill', 'url(#lilith-outer-grad)');
      bg.setAttribute('stroke', 'rgba(199, 165, 107, 0.35)');
      bg.setAttribute('stroke-width', '1.5');
      svg.appendChild(bg);
    },

    renderZodiacWheel(svg, ascLon) {
      const innerR = this.outerRadius - this.zodiacWidth;

      for (let i = 0; i < 12; i++) {
        const signLon = i * 30;
        const startAngle = this.lonToAngle(signLon, ascLon);
        const endAngle = this.lonToAngle(signLon + 30, ascLon);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const element = this.signs[i].element;

        path.setAttribute('d', this.createArcPath(
          this.center, this.center,
          innerR, this.outerRadius,
          startAngle, endAngle
        ));
        path.setAttribute('fill', this.elementColors[element] + '18');
        path.setAttribute('stroke', 'rgba(199, 165, 107, 0.22)');
        path.setAttribute('stroke-width', '1');
        svg.appendChild(path);

        const tickPosInner = this.polarToCartesian(startAngle, innerR);
        const tickPosOuter = this.polarToCartesian(startAngle, this.outerRadius);
        const tickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tickLine.setAttribute('x1', tickPosInner.x);
        tickLine.setAttribute('y1', tickPosInner.y);
        tickLine.setAttribute('x2', tickPosOuter.x);
        tickLine.setAttribute('y2', tickPosOuter.y);
        tickLine.setAttribute('stroke', 'rgba(199, 165, 107, 0.35)');
        tickLine.setAttribute('stroke-width', '1');
        svg.appendChild(tickLine);

        const midAngle = (startAngle + endAngle) / 2;
        const symbolR = (innerR + this.outerRadius) / 2;
        const pos = this.polarToCartesian(midAngle, symbolR);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 1);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', this.elementColors[element]);
        text.setAttribute('font-size', '17');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-family', 'sans-serif');
        text.textContent = this.signs[i].symbol;
        svg.appendChild(text);
      }
    },

    createArcPath(cx, cy, innerR, outerR, startAngle, endAngle) {
      const innerStart = {
        x: cx + innerR * Math.cos(startAngle),
        y: cy - innerR * Math.sin(startAngle)
      };
      const innerEnd = {
        x: cx + innerR * Math.cos(endAngle),
        y: cy - innerR * Math.sin(endAngle)
      };
      const outerStart = {
        x: cx + outerR * Math.cos(startAngle),
        y: cy - outerR * Math.sin(startAngle)
      };
      const outerEnd = {
        x: cx + outerR * Math.cos(endAngle),
        y: cy - outerR * Math.sin(endAngle)
      };

      let diff = endAngle - startAngle;
      if (diff < 0) diff += 2 * Math.PI;
      const largeArc = diff > Math.PI ? 1 : 0;

      return `M ${outerStart.x} ${outerStart.y}
              A ${outerR} ${outerR} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}
              L ${innerEnd.x} ${innerEnd.y}
              A ${innerR} ${innerR} 0 ${largeArc} 1 ${innerStart.x} ${innerStart.y}
              Z`;
    },

    renderHouses(svg, cusps, ascLon) {
      if (!cusps || cusps.length < 12) return;

      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', 'lilith-houses-layer');

      // 1. Cerchio separatore sottile tra la fascia delle case e il cerchio centrale
      const houseBandBorder = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      houseBandBorder.setAttribute('cx', this.center);
      houseBandBorder.setAttribute('cy', this.center);
      houseBandBorder.setAttribute('r', this.innerRadius);
      houseBandBorder.setAttribute('fill', 'none');
      houseBandBorder.setAttribute('stroke', 'rgba(199, 165, 107, 0.35)');
      houseBandBorder.setAttribute('stroke-width', '1');
      group.appendChild(houseBandBorder);

      // Cerchio esterno della fascia delle case (sotto lo zodiaco)
      const houseOuterBorder = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      houseOuterBorder.setAttribute('cx', this.center);
      houseOuterBorder.setAttribute('cy', this.center);
      houseOuterBorder.setAttribute('r', this.houseRadius);
      houseOuterBorder.setAttribute('fill', 'none');
      houseOuterBorder.setAttribute('stroke', 'rgba(199, 165, 107, 0.35)');
      houseOuterBorder.setAttribute('stroke-width', '1');
      group.appendChild(houseOuterBorder);

      for (let i = 0; i < 12; i++) {
        const angle = this.lonToAngle(cusps[i], ascLon);
        const inner = this.polarToCartesian(angle, this.innerRadius);
        const outer = this.polarToCartesian(angle, this.houseRadius);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', inner.x);
        line.setAttribute('y1', inner.y);
        line.setAttribute('x2', outer.x);
        line.setAttribute('y2', outer.y);

        const isCardinal = [0, 3, 6, 9].includes(i);
        if (isCardinal) {
          line.setAttribute('stroke', '#ff5a1f');
          line.setAttribute('stroke-width', '2');
        } else {
          line.setAttribute('stroke', 'rgba(199, 165, 107, 0.35)');
          line.setAttribute('stroke-width', '1');
          line.setAttribute('stroke-dasharray', '3,3');
        }

        group.appendChild(line);

        // Badge angolari cardinali (AC, IC, DC, MC) sul perimetro della fascia
        if (isCardinal) {
          const labels = { 0: 'ASC', 3: 'IC', 6: 'DSC', 9: 'MC' };
          const angleIndices = { 0: 12, 3: 15, 6: 14, 9: 13 }; // Indici degli angoli nel dataset
          const tagPos = this.polarToCartesian(angle, this.innerRadius + 8);
          const tagGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          tagGroup.setAttribute('class', 'lilith-cardinal-tag-group');
          tagGroup.style.cursor = 'pointer';

          const tagTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          tagTitle.textContent = `${labels[i]} (Angolo Cardinale) • Clicca per approfondire`;
          tagGroup.appendChild(tagTitle);

          const tagText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tagText.setAttribute('x', tagPos.x);
          tagText.setAttribute('y', tagPos.y + 1);
          tagText.setAttribute('text-anchor', 'middle');
          tagText.setAttribute('dominant-baseline', 'middle');
          tagText.setAttribute('fill', '#ff5a1f');
          tagText.setAttribute('font-size', '8.5');
          tagText.setAttribute('font-weight', 'bold');
          tagText.setAttribute('font-family', 'sans-serif');
          tagText.textContent = labels[i];
          tagGroup.appendChild(tagText);

          tagGroup.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof window.openHouseModalByIndex === 'function') {
              window.openHouseModalByIndex(angleIndices[i]);
            }
          });

          tagGroup.addEventListener('mouseenter', () => {
            tagText.setAttribute('fill', '#ffffff');
            tagText.style.filter = 'drop-shadow(0 0 4px #ff5a1f)';
          });
          tagGroup.addEventListener('mouseleave', () => {
            tagText.setAttribute('fill', '#ff5a1f');
            tagText.style.filter = '';
          });

          group.appendChild(tagGroup);
        }

        // Calcolo corretto del punto medio angolare per il numero della casa
        const nextCusp = cusps[(i + 1) % 12];
        const startAng = this.lonToAngle(cusps[i], ascLon);
        const endAng = this.lonToAngle(nextCusp, ascLon);
        let diffAng = endAng - startAng;
        while (diffAng < -Math.PI) diffAng += 2 * Math.PI;
        while (diffAng > Math.PI) diffAng -= 2 * Math.PI;
        const midAngle = startAng + diffAng / 2;

        // Posiziona il numero della casa nella fascia interna protetta
        const numR = this.innerRadius + 18;
        const numPos = this.polarToCartesian(midAngle, numR);

        // Badge circolare elegante interattivo per il numero della casa
        const houseBadgeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        houseBadgeGroup.setAttribute('class', 'lilith-house-badge-group');
        houseBadgeGroup.style.cursor = 'pointer';

        const badgeTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        badgeTitle.textContent = `Casa ${i + 1} • Clicca per approfondire significato e risveglio`;
        houseBadgeGroup.appendChild(badgeTitle);

        const badgeCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        badgeCircle.setAttribute('cx', numPos.x);
        badgeCircle.setAttribute('cy', numPos.y);
        badgeCircle.setAttribute('r', '7.5');
        badgeCircle.setAttribute('fill', '#100707');
        badgeCircle.setAttribute('stroke', 'rgba(199, 165, 107, 0.4)');
        badgeCircle.setAttribute('stroke-width', '1');
        badgeCircle.setAttribute('class', 'house-number-bg');
        houseBadgeGroup.appendChild(badgeCircle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', numPos.x);
        text.setAttribute('y', numPos.y + 1);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#c7a56b');
        text.setAttribute('font-size', '9.5');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-family', 'sans-serif');
        text.textContent = (i + 1).toString();
        houseBadgeGroup.appendChild(text);

        houseBadgeGroup.addEventListener('click', (e) => {
          e.stopPropagation();
          if (typeof window.openHouseModalByIndex === 'function') {
            window.openHouseModalByIndex(i);
          }
        });

        houseBadgeGroup.addEventListener('mouseenter', () => {
          badgeCircle.setAttribute('stroke', '#ff5a1f');
          badgeCircle.setAttribute('fill', '#2d0f0f');
          badgeCircle.setAttribute('stroke-width', '1.5');
          text.setAttribute('fill', '#ffffff');
        });
        houseBadgeGroup.addEventListener('mouseleave', () => {
          badgeCircle.setAttribute('stroke', 'rgba(199, 165, 107, 0.4)');
          badgeCircle.setAttribute('fill', '#100707');
          badgeCircle.setAttribute('stroke-width', '1');
          text.setAttribute('fill', '#c7a56b');
        });

        group.appendChild(houseBadgeGroup);
      }

      svg.appendChild(group);
    },

    renderAspects(svg, planetPositions, aspects, ascLon) {
      if (!aspects || !planetPositions) return;

      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', 'lilith-aspects-layer');

      for (const aspect of aspects) {
        const lon1 = planetPositions[aspect.planet1];
        const lon2 = planetPositions[aspect.planet2];
        if (lon1 === undefined || lon2 === undefined) continue;

        const angle1 = this.lonToAngle(lon1, ascLon);
        const angle2 = this.lonToAngle(lon2, ascLon);

        const pos1 = this.polarToCartesian(angle1, this.innerRadius);
        const pos2 = this.polarToCartesian(angle2, this.innerRadius);

        const aspName = (aspect.aspect || aspect.aspect_type || '').toLowerCase();
        const strokeColor = this.aspectColors[aspect.aspect] || this.aspectColors[aspect.aspect_it] || '#c7a56b';

        let category = 'minor';
        if (['conjunction', 'opposition', 'square', 'trine', 'sextile', 'congiunzione', 'opposizione', 'quadratura', 'trigono', 'sestile'].includes(aspName)) {
          category = 'major';
        }
        if (['opposition', 'square', 'semisquare', 'sesquiquadrate', 'opposizione', 'quadratura'].includes(aspName)) {
          category = 'tension';
        }
        if (['trine', 'sextile', 'semisextile', 'trigono', 'sestile'].includes(aspName)) {
          category = 'harmonic';
        }

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', pos1.x);
        line.setAttribute('y1', pos1.y);
        line.setAttribute('x2', pos2.x);
        line.setAttribute('y2', pos2.y);
        line.setAttribute('stroke', strokeColor);
        line.setAttribute('stroke-width', '1.8');
        line.setAttribute('opacity', '0.75');
        line.setAttribute('class', 'aspect-line');
        line.setAttribute('data-planet1', aspect.planet1);
        line.setAttribute('data-planet2', aspect.planet2);
        line.setAttribute('data-aspect-type', aspName);
        line.setAttribute('data-category', category);

        line.style.cursor = 'pointer';
        line.addEventListener('mouseenter', () => {
          if (!this.selectedAspect && !this.selectedPlanet) {
            this.highlightAspect(line, aspect);
          }
        });
        line.addEventListener('mouseleave', () => {
          if (!this.selectedAspect && !this.selectedPlanet) {
            this.resetHighlights();
          }
        });
        line.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectAspect(aspect, line);
        });

        group.appendChild(line);
      }

      svg.appendChild(group);
      this.applyAspectFilter();
    },

    renderPlanets(svg, planets, ascLon) {
      if (!planets) return;

      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', 'lilith-planets-layer');

      const filteredPlanets = this.showAsteroids
        ? planets
        : planets.filter(p => !p.category || p.category === 'planet' || p.category === 'node');

      const positions = this.calculatePlanetPositions(filteredPlanets, ascLon);

      for (const planet of positions) {
        const radius = planet.displayRadius || this.planetRadius;
        const pos = this.polarToCartesian(planet.displayAngle, radius);
        const category = planet.category || 'planet';

        // Traccia un raggio guida elegante in oro se il pianeta è stato sfalsato radialmente o angolarmente
        const angleDiff = Math.abs(planet.displayAngle - planet.actualAngle);
        const radiusDiff = Math.abs(radius - this.planetRadius);
        if (angleDiff > 0.02 || radiusDiff > 4) {
          const tickOuter = this.polarToCartesian(planet.actualAngle, this.houseRadius - 3);
          const tickInner = this.polarToCartesian(planet.displayAngle, radius + (radius < this.planetRadius ? 14 : -14));
          const tickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          tickLine.setAttribute('x1', tickOuter.x);
          tickLine.setAttribute('y1', tickOuter.y);
          tickLine.setAttribute('x2', tickInner.x);
          tickLine.setAttribute('y2', tickInner.y);
          tickLine.setAttribute('stroke', 'rgba(199, 165, 107, 0.45)');
          tickLine.setAttribute('stroke-width', '1.2');
          tickLine.setAttribute('stroke-dasharray', '2,2');
          group.appendChild(tickLine);
        }

        let nodeRadius = 13;
        let nodeBorderColor = planet.is_retrograde ? '#ef4444' : 'rgba(199, 165, 107, 0.85)';
        let nodeBg = '#140c0c';
        let symbolSize = '13';

        const isLilith = (planet.name === 'Lilith' || planet.name === 'Lilith Media' || planet.name === 'Lilith (Vera)' || planet.original_name === 'Lilith' || planet.original_name === 'TrueLilith');
        if (isLilith) {
          nodeRadius = 15.5;
          nodeBorderColor = '#ff5a1f';
          nodeBg = '#270808';
          symbolSize = '15.5';
        } else if (category === 'asteroid') {
          nodeRadius = 10.5;
          nodeBorderColor = '#10b981';
          symbolSize = '11';
        } else if (category === 'point' || category === 'centaur') {
          nodeRadius = 11;
          nodeBorderColor = '#f59e0b';
          symbolSize = '11.5';
        }

        const pGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        pGroup.setAttribute('class', 'planet-node');
        pGroup.setAttribute('data-planet-name', planet.name);
        pGroup.setAttribute('data-category', category);
        pGroup.style.cursor = 'pointer';

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', nodeRadius);
        circle.setAttribute('fill', nodeBg);
        circle.setAttribute('stroke', nodeBorderColor);
        circle.setAttribute('stroke-width', isLilith ? '2.5' : '1.5');
        circle.setAttribute('class', 'planet-circle');
        if (isLilith) circle.setAttribute('filter', 'url(#lilith-glow-sigil)');
        pGroup.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 1);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', isLilith ? '#ff5a1f' : '#ffffff');
        text.setAttribute('font-size', symbolSize);
        text.setAttribute('font-family', 'sans-serif');
        text.setAttribute('class', 'planet-symbol');
        text.textContent = this.planetSymbols[planet.name] || '⚸';
        pGroup.appendChild(text);

        if (planet.is_retrograde) {
          const rText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          rText.setAttribute('x', pos.x + nodeRadius - 1);
          rText.setAttribute('y', pos.y + nodeRadius - 1);
          rText.setAttribute('text-anchor', 'middle');
          rText.setAttribute('dominant-baseline', 'middle');
          rText.setAttribute('fill', '#ef4444');
          rText.setAttribute('font-size', '7.5');
          rText.setAttribute('font-weight', 'bold');
          rText.textContent = 'R';
          pGroup.appendChild(rText);
        }

        pGroup.addEventListener('mouseenter', () => {
          if (!this.selectedAspect && !this.selectedPlanet) {
            this.highlightPlanet(planet.name);
          }
        });
        pGroup.addEventListener('mouseleave', () => {
          if (!this.selectedAspect && !this.selectedPlanet) {
            this.resetHighlights();
          }
        });
        pGroup.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectPlanet(planet, pGroup);
        });

        group.appendChild(pGroup);
      }

      svg.appendChild(group);
    },

    calculatePlanetPositions(planets, ascLon) {
      const minSeparation = 0.20; // ~11.5 gradi angolari di separazione
      const baseRadius = this.planetRadius;

      const positions = planets.map(p => ({
        ...p,
        actualAngle: this.lonToAngle(p.longitude, ascLon),
        displayAngle: this.lonToAngle(p.longitude, ascLon),
        displayRadius: baseRadius
      }));

      // Ordina circolarmente per angolo reale
      positions.sort((a, b) => a.actualAngle - b.actualAngle);

      // FASE 1: Rilevamento cluster e scaglionamento radiale a 2 livelli (interno/esterno)
      const n = positions.length;
      for (let i = 0; i < n; i++) {
        const prev = positions[(i - 1 + n) % n];
        const curr = positions[i];
        let diff = Math.abs(curr.actualAngle - prev.actualAngle);
        if (diff > Math.PI) diff = 2 * Math.PI - diff;

        if (diff < 0.16) { // Corpi celesti in congiunzione stretta (< 9.2 gradi)
          // Alterna il raggio per distanziare i cerchi radialmente: livello esterno (+22px) e livello interno (-18px)
          const tier = (i % 2 === 1) ? 22 : -18;
          curr.displayRadius = baseRadius + tier;
        }
      }

      // FASE 2: Rilassamento repulsivo a coppie (pairwise) per eliminare ogni collisione residua
      for (let it = 0; it < 30; it++) {
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            const p1 = positions[i];
            const p2 = positions[j];
            const radDiff = Math.abs(p1.displayRadius - p2.displayRadius);
            // Se sono sullo stesso livello radiale richiedono piena separazione angolare
            const requiredSep = radDiff < 15 ? minSeparation : (minSeparation * 0.45);

            let diff = p2.displayAngle - p1.displayAngle;
            while (diff < -Math.PI) diff += 2 * Math.PI;
            while (diff > Math.PI) diff -= 2 * Math.PI;

            if (Math.abs(diff) < requiredSep) {
              const overlap = requiredSep - Math.abs(diff);
              const sign = diff >= 0 ? 1 : -1;
              p2.displayAngle += sign * overlap * 0.5;
              p1.displayAngle -= sign * overlap * 0.5;
            }
          }
        }
      }

      return positions;
    },

    renderCenterBackground(svg) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', this.center);
      circle.setAttribute('cy', this.center);
      circle.setAttribute('r', this.innerRadius);
      circle.setAttribute('fill', 'url(#lilith-center-grad)');
      circle.setAttribute('stroke', 'rgba(199, 165, 107, 0.45)');
      circle.setAttribute('stroke-width', '2');
      circle.style.pointerEvents = 'none';
      svg.appendChild(circle);
    },

    renderCenterHub(svg) {
      const hubGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      hubGroup.setAttribute('class', 'lilith-center-hub');
      hubGroup.style.pointerEvents = 'none';

      // Piccolo mozzo ornamentale da 24px che non copre i raggi
      const hubBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hubBg.setAttribute('cx', this.center);
      hubBg.setAttribute('cy', this.center);
      hubBg.setAttribute('r', '24');
      hubBg.setAttribute('fill', '#140606');
      hubBg.setAttribute('stroke', 'rgba(199, 165, 107, 0.65)');
      hubBg.setAttribute('stroke-width', '1.5');
      hubGroup.appendChild(hubBg);

      const sigilText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sigilText.setAttribute('x', this.center);
      sigilText.setAttribute('y', this.center + 4);
      sigilText.setAttribute('text-anchor', 'middle');
      sigilText.setAttribute('dominant-baseline', 'middle');
      sigilText.setAttribute('fill', '#ff5a1f');
      sigilText.setAttribute('font-size', '22');
      sigilText.setAttribute('font-family', 'Georgia, serif');
      sigilText.textContent = '⚸';
      hubGroup.appendChild(sigilText);

      svg.appendChild(hubGroup);
    },

    renderCenter(svg) {
      this.renderCenterBackground(svg);
      this.renderCenterHub(svg);
    },

    highlightPlanet(planetName) {
      const aspectLines = document.querySelectorAll('.aspect-line');
      const planetNodes = document.querySelectorAll('.planet-node');

      planetNodes.forEach(node => {
        if (node.getAttribute('data-planet-name') === planetName) {
          node.style.opacity = '1';
          const circle = node.querySelector('circle');
          if (circle) circle.setAttribute('stroke-width', '3.5');
        } else {
          node.style.opacity = '0.35';
        }
      });

      aspectLines.forEach(line => {
        const p1 = line.getAttribute('data-planet1');
        const p2 = line.getAttribute('data-planet2');
        if (p1 === planetName || p2 === planetName) {
          line.style.opacity = '1';
          line.setAttribute('stroke-width', '3');
          const otherPlanet = p1 === planetName ? p2 : p1;
          const partnerNode = document.querySelector(`.planet-node[data-planet-name="${otherPlanet}"]`);
          if (partnerNode) partnerNode.style.opacity = '0.9';
        } else {
          line.style.opacity = '0.05';
        }
      });
    },

    highlightAspect(line, aspect) {
      const aspectLines = document.querySelectorAll('.aspect-line');
      const planetNodes = document.querySelectorAll('.planet-node');

      aspectLines.forEach(l => {
        if (l === line) {
          l.style.opacity = '1';
          l.setAttribute('stroke-width', '4');
        } else {
          l.style.opacity = '0.05';
        }
      });

      planetNodes.forEach(node => {
        const name = node.getAttribute('data-planet-name');
        if (name === aspect.planet1 || name === aspect.planet2) {
          node.style.opacity = '1';
          const circle = node.querySelector('circle');
          if (circle) circle.setAttribute('stroke-width', '3');
        } else {
          node.style.opacity = '0.25';
        }
      });
    },

    resetHighlights() {
      const aspectLines = document.querySelectorAll('.aspect-line');
      const planetNodes = document.querySelectorAll('.planet-node');

      aspectLines.forEach(line => {
        line.style.opacity = '0.75';
        line.setAttribute('stroke-width', '1.8');
      });

      planetNodes.forEach(node => {
        node.style.opacity = '1';
        const circle = node.querySelector('circle');
        if (circle) {
          const isLilith = node.getAttribute('data-planet-name')?.includes('Lilith');
          circle.setAttribute('stroke-width', isLilith ? '2.5' : '1.5');
        }
      });
    },

    selectPlanet(planet, nodeElement) {
      if (this.selectedPlanet && this.selectedPlanet.name === planet.name) {
        this.selectedPlanet = null;
        this.resetHighlights();
        if (this.onSelectPlanet) this.onSelectPlanet(null);
        return;
      }

      this.selectedAspect = null;
      this.selectedPlanet = planet;
      this.highlightPlanet(planet.name);

      if (this.onSelectPlanet) {
        this.onSelectPlanet(planet);
      }
    },

    selectAspect(aspect, lineElement) {
      if (this.selectedAspect &&
          this.selectedAspect.planet1 === aspect.planet1 &&
          this.selectedAspect.planet2 === aspect.planet2) {
        this.selectedAspect = null;
        this.resetHighlights();
        if (this.onSelectAspect) this.onSelectAspect(null);
        return;
      }

      this.selectedPlanet = null;
      this.selectedAspect = aspect;
      if (lineElement) {
        this.highlightAspect(lineElement, aspect);
      } else {
        const line = document.querySelector(`.aspect-line[data-planet1="${aspect.planet1}"][data-planet2="${aspect.planet2}"], .aspect-line[data-planet1="${aspect.planet2}"][data-planet2="${aspect.planet1}"]`);
        if (line) this.highlightAspect(line, aspect);
      }

      if (this.onSelectAspect) {
        this.onSelectAspect(aspect);
      }
    },

    resetSelection() {
      this.selectedPlanet = null;
      this.selectedAspect = null;
      this.resetHighlights();
      if (this.onSelectPlanet) this.onSelectPlanet(null);
      if (this.onSelectAspect) this.onSelectAspect(null);
    },

    setAspectFilter(filter) {
      this.aspectFilter = filter;
      this.applyAspectFilter();
    },

    applyAspectFilter() {
      const filter = this.aspectFilter || 'all';
      const lines = document.querySelectorAll('.aspect-line');
      lines.forEach(line => {
        const cat = line.getAttribute('data-category');
        let visible = false;
        if (filter === 'all') {
          visible = true;
        } else if (filter === 'major' && (cat === 'major' || cat === 'tension' || cat === 'harmonic')) {
          visible = true;
        } else if (filter === 'hard' && cat === 'tension') {
          visible = true;
        } else if (filter === 'soft' && cat === 'harmonic') {
          visible = true;
        }
        line.style.display = visible ? '' : 'none';
        line.setAttribute('display', visible ? 'inline' : 'none');
      });

      // Sincronizza anche la tabella aspetti nel DOM se presente
      const tableRows = document.querySelectorAll('#lilith-aspects-table tbody tr.aspect-row-item');
      tableRows.forEach(row => {
        const cat = row.getAttribute('data-category');
        let visible = false;
        if (filter === 'all') {
          visible = true;
        } else if (filter === 'major' && (cat === 'major' || cat === 'tension' || cat === 'harmonic')) {
          visible = true;
        } else if (filter === 'hard' && cat === 'tension') {
          visible = true;
        } else if (filter === 'soft' && cat === 'harmonic') {
          visible = true;
        }
        row.style.display = visible ? '' : 'none';
      });
    },

    toggleAsteroids(show, svg) {
      this.showAsteroids = show;
      if (this.currentChartData && svg) {
        this.render(svg, this.currentChartData);
      }
    },

    // ========================================================================
    // PAN & ZOOM SYSTEM (Rotellina mouse, pulsanti +/- e pinch-to-zoom a 2 dita)
    // ========================================================================
    zoomState: {
      scale: 1,
      minScale: 0.8,
      maxScale: 3.5,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      initialPinchDist: 0,
      initialScale: 1
    },

    initPanZoom(svg) {
      if (!svg) return;
      const state = this.zoomState;
      const container = svg.parentElement;
      const mainGroup = svg.getElementById('chart-main-group');
      if (!mainGroup) return;

      // Applica la trasformazione corrente
      this.updateChartTransform(mainGroup);

      // Collega pulsanti di controllo zoom toolbar
      const btnIn = document.getElementById('lilith-zoom-in');
      const btnOut = document.getElementById('lilith-zoom-out');
      const btnReset = document.getElementById('lilith-zoom-reset');

      if (btnIn && !btnIn._hasZoomListener) {
        btnIn._hasZoomListener = true;
        btnIn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.zoomBy(1.25);
        });
      }
      if (btnOut && !btnOut._hasZoomListener) {
        btnOut._hasZoomListener = true;
        btnOut.addEventListener('click', (e) => {
          e.stopPropagation();
          this.zoomBy(0.8);
        });
      }
      if (btnReset && !btnReset._hasZoomListener) {
        btnReset._hasZoomListener = true;
        btnReset.addEventListener('click', (e) => {
          e.stopPropagation();
          this.resetZoom();
        });
      }

      if (svg._hasPanZoomListeners) return;
      svg._hasPanZoomListeners = true;

      // 1. ZOOM CON LA ROTELLINA DEL MOUSE
      svg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.11;
        this.zoomBy(delta, e.clientX, e.clientY, svg);
      }, { passive: false });

      // 2. DRAG CON IL MOUSE (PAN)
      svg.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Solo tasto sinistro
        state.isDragging = true;
        state.startX = e.clientX - state.translateX;
        state.startY = e.clientY - state.translateY;
        if (container) container.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!state.isDragging) return;
        state.translateX = e.clientX - state.startX;
        state.translateY = e.clientY - state.startY;
        this.clampTranslation(svg);
        this.updateChartTransform(mainGroup);
      });

      window.addEventListener('mouseup', () => {
        if (state.isDragging) {
          state.isDragging = false;
          if (container) container.style.cursor = 'grab';
        }
      });

      // 3. PINCH-TO-ZOOM A 2 DITA E TRASCINAMENTO TOUCH SU MOBILE
      let activePointers = new Map();

      svg.addEventListener('pointerdown', (e) => {
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (activePointers.size === 1) {
          state.isDragging = true;
          state.startX = e.clientX - state.translateX;
          state.startY = e.clientY - state.translateY;
        } else if (activePointers.size === 2) {
          state.isDragging = false;
          const pts = Array.from(activePointers.values());
          state.initialPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          state.initialScale = state.scale;
        }
      });

      svg.addEventListener('pointermove', (e) => {
        if (!activePointers.has(e.pointerId)) return;
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.size === 2) {
          // Gesto Pinch con due dita
          e.preventDefault();
          const pts = Array.from(activePointers.values());
          const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          if (state.initialPinchDist > 5) {
            const factor = currentDist / state.initialPinchDist;
            const newScale = Math.min(state.maxScale, Math.max(state.minScale, state.initialScale * factor));
            state.scale = newScale;
            this.clampTranslation(svg);
            this.updateChartTransform(mainGroup);
          }
        } else if (activePointers.size === 1 && state.isDragging && state.scale > 1.05) {
          // Se la ruota è ingrandita, consenti il pan con un dito
          e.preventDefault();
          state.translateX = e.clientX - state.startX;
          state.translateY = e.clientY - state.startY;
          this.clampTranslation(svg);
          this.updateChartTransform(mainGroup);
        }
      });

      const handlePointerEnd = (e) => {
        activePointers.delete(e.pointerId);
        if (activePointers.size < 2) {
          state.initialPinchDist = 0;
        }
        if (activePointers.size === 0) {
          state.isDragging = false;
        }
      };

      svg.addEventListener('pointerup', handlePointerEnd);
      svg.addEventListener('pointercancel', handlePointerEnd);
    },

    zoomBy(factor, clientX, clientY, svg) {
      const state = this.zoomState;
      const oldScale = state.scale;
      const newScale = Math.min(state.maxScale, Math.max(state.minScale, oldScale * factor));
      if (Math.abs(newScale - oldScale) < 0.001) return;

      state.scale = newScale;

      const mainGroup = document.getElementById('chart-main-group');
      if (mainGroup) {
        this.clampTranslation(svg || document.getElementById('chart-svg'));
        this.updateChartTransform(mainGroup);
      }
    },

    clampTranslation(svg) {
      const state = this.zoomState;
      const limit = (state.scale - 1) * 260;
      if (state.scale <= 1) {
        state.translateX = 0;
        state.translateY = 0;
      } else {
        state.translateX = Math.max(-limit, Math.min(limit, state.translateX));
        state.translateY = Math.max(-limit, Math.min(limit, state.translateY));
      }
    },

    updateChartTransform(mainGroup) {
      if (!mainGroup) return;
      const state = this.zoomState;
      // Trasformazione attorno al centro (300, 300) del viewBox SVG
      mainGroup.setAttribute('transform',
        `translate(${state.translateX}, ${state.translateY}) translate(300, 300) scale(${state.scale}) translate(-300, -300)`
      );
    },

    resetZoom() {
      const state = this.zoomState;
      state.scale = 1;
      state.translateX = 0;
      state.translateY = 0;
      state.isDragging = false;
      const mainGroup = document.getElementById('chart-main-group');
      if (mainGroup) {
        this.updateChartTransform(mainGroup);
      }
      this.resetSelection();
    },

    exportSVG(dateStr = 'tema_lilith') {
      const svg = document.getElementById('chart-svg');
      if (!svg) return;

      const clone = svg.cloneNode(true);
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('width', '1200');
      clone.setAttribute('height', '1200');
      clone.setAttribute('viewBox', '0 0 600 600');

      // Riporta il gruppo principale in scala standard 1:1 per l'export HD
      const cloneGroup = clone.querySelector('#chart-main-group');
      if (cloneGroup) {
        cloneGroup.setAttribute('transform', '');
      }

      const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = `
        text { font-family: 'Inter', sans-serif; }
        .planet-symbol { font-weight: 500; }
      `;
      clone.insertBefore(style, clone.firstChild);

      const serializer = new XMLSerializer();
      const source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(clone);
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dateStr}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  window.LilithChartRenderer = LilithChartRenderer;
})(window);
