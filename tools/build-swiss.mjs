import { build } from 'esbuild';
import { mkdir, cp } from 'node:fs/promises';
const dest = 'wordpress-child-theme/js/vendor/swisseph';
await mkdir(dest, { recursive: true });
for (const name of ['src', 'wasm', 'LICENSE', 'package.json']) {
  await cp(`node_modules/swisseph-wasm/${name}`, `${dest}/${name}`, { recursive: true });
}
await build({entryPoints:['tools/swiss-time-source.mjs'], bundle:true, format:'esm', outfile:'wordpress-child-theme/js/vendor/swiss-time.mjs', minify:true});
for (const [source,name] of [['@js-temporal/polyfill/LICENSE','TEMPORAL-LICENSE'],['tz-lookup/LICENSE','TZ-LOOKUP-LICENSE'],['jsbi/LICENSE','JSBI-LICENSE'],['moment-timezone/LICENSE','MOMENT-TIMEZONE-LICENSE'],['moment/LICENSE','MOMENT-LICENSE']]) {
  await cp(`node_modules/${source}`, `wordpress-child-theme/js/vendor/${name}`);
}
