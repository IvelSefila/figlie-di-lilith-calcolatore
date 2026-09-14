import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,resolveTime,initialize} from '../wordpress-child-theme/js/swiss-precision.mjs';
const base={date:'2000-01-01',time:'12:00',latitude:41.9028,longitude:12.4964,timezone:'Europe/Rome',house_system:'P'};
test('Swiss files, bodies, UTC and regression Sun position',async()=>{
 const r=await calculate(base);
 assert.equal(r.version,'2.10.03'); assert.equal(r.utc,'2000-01-01T11:00:00Z');
 assert.equal(Object.keys(r.positions).length,18);
 assert.ok(Math.abs(r.positions.Sun-280.326446567)<1e-6);
});
test('missing ephemeris files never silently fall back to Moshier',async()=>{
 const swe=await initialize();
 swe.close(); swe.set_ephe_path('/missing-ephemeris');
 try {await assert.rejects(calculate(base),/Effemeridi Swiss/);}
 finally {swe.close();swe.set_ephe_path('sweph');}
});
test('timezone affects instant, including fractional offsets',()=>{
 assert.equal(resolveTime({...base,timezone:'America/New_York'}).utc.hour,17);
 assert.equal(resolveTime({...base,timezone:'Asia/Kathmandu'}).utc.minute,15);
 assert.equal(resolveTime({...base,timezone:''}).zone,'Europe/Rome');
});
test('pinned time rules, historical seconds and UTC date rollover',()=>{
 const r=resolveTime({...base,date:'1800-06-15'});
 assert.ok(r.tzVersion);assert.match(r.offset,/\+00:49:56/);
 assert.equal(resolveTime({...base,time:'00:15',timezone:'Asia/Kathmandu'}).utc.toPlainDate().toString(),'1999-12-31');
 assert.throws(()=>resolveTime({...base,time:'12:00:60'}));
 assert.throws(()=>resolveTime({...base,timezone:'Not/AZone'}));
 assert.throws(()=>resolveTime({...base,latitude:''}));
});
test('Fortuna day/night classification is independent of house system',async()=>{
 for(const time of ['00:00','06:00','12:00','18:00']) {
  const p=await calculate({...base,time});
  for(const house_system of ['W','E']) assert.equal((await calculate({...base,time,house_system})).isDiurnal,p.isDiurnal);
 }
});
test('different house systems and seconds produce different outputs',async()=>{
 const p=await calculate(base);
 for(const hs of ['K','R','C','E','W']) assert.notDeepEqual((await calculate({...base,house_system:hs})).cusps,p.cusps);
 assert.notEqual((await calculate({...base,time:'12:00:59'})).jd,p.jd);
});
test('invalid dates, bounds, gaps and ambiguous times are rejected',async()=>{
 assert.throws(()=>resolveTime({...base,date:'2000-02-31'}));
 assert.throws(()=>resolveTime({...base,date:'1700-01-01'}));
 assert.throws(()=>resolveTime({...base,date:'2024-03-31',time:'02:30'}));
 const repeat={...base,date:'2024-10-27',time:'02:30'};
 assert.throws(()=>resolveTime(repeat));
 const a=resolveTime({...repeat,dst:'earlier'}).utc.epochMilliseconds;
 const b=resolveTime({...repeat,dst:'later'}).utc.epochMilliseconds;
 assert.equal(b-a,3600000);
 await assert.rejects(calculate({...base,latitude:80}),/latitudine/);
 await assert.rejects(calculate({...base,house_system:'X'}));
});
