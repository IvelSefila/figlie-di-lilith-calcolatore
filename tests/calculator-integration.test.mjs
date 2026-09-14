import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { calculate } from '../wordpress-child-theme/js/swiss-precision.mjs';

// Carica lo strato interpretativo esattamente come farebbe il browser.
const window = {};
const context = vm.createContext({ window, console, Math, Date, JSON, Object, Array, String, Number, isNaN, parseInt, parseFloat });
for (const file of ['calcolatore-aspects-dict.js', 'calcolatore-engine.js']) {
  vm.runInContext(readFileSync(new URL(`../wordpress-child-theme/js/${file}`, import.meta.url), 'utf8'), context, { filename: file });
}

const engineSource = readFileSync(new URL('../wordpress-child-theme/js/calcolatore-engine.js', import.meta.url), 'utf8');
const base = { date: '1990-06-15', time: '14:30', latitude: 41.9028, longitude: 12.4964, timezone: 'Europe/Rome', house_system: 'P' };
const build = async req => window.LilithEngine.assembleChart(await calculate({ ...base, ...req }), { ...base, ...req });

test('il motore interpretativo non contiene più astronomia approssimata', () => {
  for (const banned of ['calculateAstroPositions', 'calculateHouseCusps', 'calculateJulianDay', 'solveKepler', 'getHeliocentricPos', 'planetKepler']) {
    assert.ok(!engineSource.includes(banned), `residuo del motore kepleriano: ${banned}`);
  }
  assert.equal(window.calculateLilithNatalChartClientSide, undefined, 'il fallback approssimato deve essere rimosso');
  assert.equal(typeof window.LilithEngine.assembleChart, 'function');
});

test('il tema assemblato espone i 20 elementi e la provenienza delle effemeridi', async () => {
  const chart = await build({});
  assert.equal(chart.planets.length, 20);
  assert.equal(chart.ephemeris.engine, 'Swiss Ephemeris');
  assert.equal(chart.ephemeris.version, '2.10.03');
  assert.equal(chart.ephemeris.timezone, 'Europe/Rome');
  assert.equal(chart.ephemeris.utc_offset, '+02:00');
  assert.equal(chart.utc_datetime, '1990-06-15T12:30:00Z');
  assert.ok(chart.aspects.length > 0 && chart.interpretation && chart.dark_reading && chart.karma_destiny && chart.unified_reading);
});

test('posizioni e cuspidi coincidono con Swiss, senza rielaborazioni', async () => {
  const swiss = await calculate(base);
  const chart = window.LilithEngine.assembleChart(swiss, base);
  for (const planet of chart.planets) {
    if (['ParsFortunae', 'Vertex'].includes(planet.name)) continue;
    assert.ok(Math.abs(planet.longitude - swiss.positions[planet.name]) < 1e-9, planet.name);
  }
  chart.houses.cusps.forEach((cusp, i) => assert.ok(Math.abs(cusp.longitude - swiss.cusps[i]) < 1e-9, `cuspide ${i + 1}`));
  assert.ok(Math.abs(chart.houses.angles.vertex.longitude - swiss.angles[3]) < 1e-9);
});

test('lo stato retrogrado viene dalla velocità Swiss, non da una differenza finita', async () => {
  const swiss = await calculate(base);
  const chart = window.LilithEngine.assembleChart(swiss, base);
  for (const planet of chart.planets) {
    if (['Sun', 'Moon', 'ParsFortunae', 'Vertex'].includes(planet.name)) {
      assert.equal(planet.is_retrograde, false);
    } else {
      assert.equal(planet.is_retrograde, swiss.speeds[planet.name] < 0, planet.name);
    }
  }
});

test('i sei sistemi di case producono cuspidi diverse (nessuna sostituzione silenziosa)', async () => {
  const seen = new Map();
  for (const hs of ['P', 'K', 'W', 'C', 'R', 'E']) {
    const key = (await build({ house_system: hs })).houses.cusps.map(c => c.longitude.toFixed(6)).join(',');
    assert.ok(!seen.has(key), `${hs} restituisce le stesse cuspidi di ${seen.get(key)}`);
    seen.set(key, hs);
  }
});

test('il Punto di Fortuna segue il diurno/notturno Swiss e non il sistema di case', async () => {
  for (const time of ['03:00', '09:00', '15:00', '21:00']) {
    const reference = await build({ time });
    for (const house_system of ['W', 'E', 'R']) {
      const other = await build({ time, house_system });
      assert.equal(other.is_diurnal, reference.is_diurnal);
    }
    const pf = reference.planets.find(p => p.name === 'ParsFortunae').longitude;
    const asc = reference.houses.angles.ascendant.longitude;
    const sun = reference.planets.find(p => p.name === 'Sun').longitude;
    const moon = reference.planets.find(p => p.name === 'Moon').longitude;
    const expected = ((reference.is_diurnal ? asc + moon - sun : asc + sun - moon) % 360 + 360) % 360;
    assert.ok(Math.abs(pf - expected) < 1e-9, `Punto di Fortuna alle ${time}`);
  }
});

test('il fuso della località determina l’istante, anche fuori dall’Europa', async () => {
  const cases = [
    [{ latitude: -34.6037, longitude: -58.3816, timezone: 'America/Argentina/Buenos_Aires', date: '2001-12-20', time: '23:45' }, '2001-12-21T02:45:00Z'],
    [{ latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo', date: '1995-07-01', time: '10:00' }, '1995-07-01T01:00:00Z'],
    [{ latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata', date: '1975-09-09', time: '05:20' }, '1975-09-08T23:50:00Z']
  ];
  for (const [req, utc] of cases) assert.equal((await build(req)).utc_datetime, utc);
});
