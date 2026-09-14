import SwissEph from './vendor/swisseph/src/swisseph.js';
import { Temporal, tzLookup, moment } from './vendor/swiss-time.mjs?v=2026c';

let ready;
export function initialize() {
  if (!ready) ready = (async () => {
    const swe = new SwissEph();
    await swe.initSwissEph();
    return swe;
  })().catch(error => { ready = null; throw error; });
  return ready;
}

export function resolveTime(req) {
  if (req.latitude == null || req.longitude == null || req.latitude === '' || req.longitude === '') throw Error('Coordinate geografiche mancanti.');
  const lat = Number(req.latitude), lon = Number(req.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) >= 90 || Math.abs(lon) > 180) throw Error('Coordinate geografiche non valide.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(req.date) || !/^\d{2}:\d{2}(:\d{2})?$/.test(req.time)) throw Error('Data o ora non valida.');
  let local;
  try { local = Temporal.PlainDateTime.from(`${req.date}T${req.time}`, { overflow:'reject' }); }
  catch { throw Error('Data o ora inesistente nel calendario.'); }
  if (Number(req.time.split(':')[2] || 0) > 59) throw Error('Secondi non validi.');
  if (local.year < 1800 || local.year > 2399) throw Error('Le effemeridi incluse coprono gli anni 1800–2399.');
  const zone = req.timezone?.trim() || tzLookup(lat, lon);
  const rules = moment.tz.zone(zone);
  if (!rules) throw Error('Fuso IANA non riconosciuto.');
  const wall = local.toZonedDateTime('UTC').epochMilliseconds;
  const candidates = [...new Set(rules.offsets)].map(offset => Math.round(wall + offset * 60000))
    .filter(instant => Math.abs(instant - rules.utcOffset(instant) * 60000 - wall) < 1)
    .sort((a,b) => a-b);
  if (!candidates.length) throw Error('Questa ora locale non esiste a causa del cambio dell’ora legale.');
  let instant = candidates[0];
  if (candidates.length > 1) {
    if (!['earlier','later'].includes(req.dst)) throw Error('Quella notte l’orologio è tornato indietro e questa ora si è ripetuta due volte: scegli la prima o la seconda occorrenza nel campo «Ora Ripetuta».');
    instant = req.dst === 'later' ? candidates.at(-1) : candidates[0];
  }
  const seconds = Math.round(-rules.utcOffset(instant) * 60);
  const abs = Math.abs(seconds), pad = n => String(n).padStart(2,'0');
  const offset = `${seconds < 0 ? '-' : '+'}${pad(Math.floor(abs/3600))}:${pad(Math.floor(abs%3600/60))}${abs%60 ? ':'+pad(abs%60) : ''}`;
  return {utc:Temporal.Instant.fromEpochMilliseconds(instant).toZonedDateTimeISO('UTC'), zone, offset, lat, lon, tzVersion:moment.tz.dataVersion};
}

// Call the C interface directly to check return flags (including silent fallbacks).
function position(swe, jd, body) {
  const m = swe.SweModule, out = m._malloc(48), err = m._malloc(256);
  try {
    const flags = m.ccall('swe_calc_ut','number',Array(5).fill('number'),[jd,body,258,out,err]);
    if (flags < 0 || !(flags & 2)) throw Error('Effemeridi Swiss mancanti o non utilizzabili per il corpo ' + body + '.');
    const values = Array.from(m.HEAPF64.subarray(out / 8, out / 8 + 6));
    if (!values.every(Number.isFinite)) throw Error('Risultato astronomico non valido.');
    return values;
  } finally { m._free(out); m._free(err); }
}

export async function calculate(req) {
  const time = resolveTime(req);
  const hs = req.house_system || 'P';
  if (!['P','K','W','C','R','E'].includes(hs)) throw Error('Sistema di case non supportato.');
  const swe = await initialize(), m = swe.SweModule, u = time.utc;
  const jdOut=m._malloc(16), err=m._malloc(256);
  let jd, jdTT;
  try {
    const status=m.ccall('swe_utc_to_jd','number',Array(9).fill('number'),[u.year,u.month,u.day,u.hour,u.minute,u.second,1,jdOut,err]);
    if(status<0) throw Error('Conversione UTC non riuscita.');
    jd=m.HEAPF64[jdOut/8+1];
    jdTT=m.HEAPF64[jdOut/8];
  } finally {m._free(jdOut);m._free(err);}
  const cp=m._malloc(104), ap=m._malloc(80);
  let cusps, angles;
  try {
    const status=m.ccall('swe_houses','number',Array(6).fill('number'),[jd,time.lat,time.lon,hs.charCodeAt(0),cp,ap]);
    if(status<0) throw Error('Il sistema di case scelto non è calcolabile a questa latitudine. Scegli Whole Sign o Equal.');
    cusps=Array.from(m.HEAPF64.subarray(cp/8+1,cp/8+13));
    angles=Array.from(m.HEAPF64.subarray(ap/8,ap/8+10));
    if (![...cusps,...angles].every(Number.isFinite)) throw Error('Case o angoli non validi.');
  } finally {m._free(cp);m._free(ap);}
  const ids={Sun:0,Moon:1,Mercury:2,Venus:3,Mars:4,Jupiter:5,Saturn:6,Uranus:7,Neptune:8,Pluto:9,Lilith:12,TrueLilith:13,TrueNode:11,Chiron:15,Ceres:17,Pallas:18,Juno:19,Vesta:20};
  const positions={}, speeds={};
  for(const [name,id] of Object.entries(ids)) {const p=position(swe,jd,id);positions[name]=p[0];speeds[name]=p[3];}
  const sun = position(swe,jd,0);
  const isDiurnal = swe.azalt(jd,0,[time.lon,time.lat,0],0,15,sun).trueAltitude >= 0;
  return {jd,jdTT,positions,speeds,cusps,angles,isDiurnal,utc:u.toInstant().toString(),timezone:time.zone,offset:time.offset,tzVersion:time.tzVersion,version:swe.version(),warnings:u.year<1970?['Fuso storico precedente al 1970: verificare la documentazione locale dell’ora di nascita.']:[]};
}
