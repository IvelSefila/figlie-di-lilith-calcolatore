import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {calculate} from '../wordpress-child-theme/js/swiss-precision.mjs';
const python=process.argv[2];
if(!python) throw Error('Pass the path to Python with pyswisseph in .validation-python');
// Unpack the exact ephemeris assets shipped with WASM for matching settings.
const dir='wordpress-child-theme/js/vendor/swisseph/wasm/';
const js=await readFile(dir+'swisseph.js','utf8'), data=await readFile(dir+'swisseph.data');
const files=[...js.matchAll(/filename:"\/sweph\/([^"]+)",start:(\d+),end:(\d+)/g)];
assert.ok(files.length>=3);
await mkdir('.validation-ephemeris',{recursive:true});
for(const [,name,start,end] of files) await writeFile('.validation-ephemeris/'+name,data.subarray(+start,+end));
const places=[['Europe/Rome',41.9,12.5],['America/New_York',40.7,-74],['Asia/Kathmandu',27.7,85.3],['Australia/Sydney',-33.9,151.2],['Pacific/Chatham',-43.9,-176.5],['Europe/London',51.5,-.12],['America/Sao_Paulo',-23.5,-46.6],['Asia/Kolkata',22.6,88.4],['Asia/Tokyo',35.7,139.7],['Africa/Casablanca',33.6,-7.6],['UTC',0,0],['Europe/Oslo',80,15]];
const dates=['1800-06-15','1850-01-15','1900-06-15','1945-08-15','1970-01-15','2000-01-01','2016-12-31','2024-03-31','2024-10-27','2026-09-14','2100-06-15','2399-06-15'];
const cases=[];
for(const [timezone,latitude,longitude] of places) for(const date of dates) for(const house_system of ['P','K','W','C','R','E']) cases.push({date,time:'12:34:56',timezone,latitude,longitude,house_system});
const native=spawnSync(python,['tools/native-reference.py'],{input:JSON.stringify(cases),encoding:'utf8',maxBuffer:20e6});
if(native.status!==0) throw Error(native.stderr);
const ref=JSON.parse(native.stdout),max={positionArcseconds:0,speedDegreesPerDay:0,cuspArcseconds:0,angleArcseconds:0,timeSeconds:0};
let passed=0,expectedErrors=0;const failures=[];
const angular=(a,b)=>Math.abs(((a-b+540)%360)-180);
for(let i=0;i<cases.length;i++) {
 const r=ref.results[i];let v;
 try{v=await calculate(cases[i]);}catch(e){if(r.error){expectedErrors++;continue;}failures.push({case:cases[i],error:e.message});continue;}
 if(r.error){failures.push({case:cases[i],error:'Native error: '+r.error});continue;}
 if(v.utc!==r.utc || v.isDiurnal!==r.isDiurnal){failures.push({case:cases[i],error:'UTC or day/night mismatch',actual:v.utc,expected:r.utc});continue;}
 for(const key of Object.keys(r.positions)){max.positionArcseconds=Math.max(max.positionArcseconds,angular(v.positions[key],r.positions[key])*3600);max.speedDegreesPerDay=Math.max(max.speedDegreesPerDay,Math.abs(v.speeds[key]-r.speeds[key]));}
 for(let j=0;j<12;j++)max.cuspArcseconds=Math.max(max.cuspArcseconds,angular(v.cusps[j],r.cusps[j])*3600);
 for(let j=0;j<8;j++)max.angleArcseconds=Math.max(max.angleArcseconds,angular(v.angles[j],r.angles[j])*3600);
 max.timeSeconds=Math.max(max.timeSeconds,Math.abs(v.jd-r.jd)*86400,Math.abs(v.jdTT-r.jdTT)*86400);passed++;
}
const report={nativeVersion:ref.version,nativeTz:ref.tzVersion,total:cases.length,passed,expectedErrors,max,failures};
await mkdir('output/validation',{recursive:true});
await writeFile('output/validation/native-comparison.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
assert.equal(failures.length,0);assert.ok(max.positionArcseconds<0.001);assert.ok(max.cuspArcseconds<0.001);assert.ok(max.angleArcseconds<0.001);assert.ok(max.timeSeconds<0.001);assert.ok(max.speedDegreesPerDay<1e-6);
