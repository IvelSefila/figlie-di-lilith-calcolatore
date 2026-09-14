import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('wordpress-child-theme');
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/'){
   const markup=(await readFile(path.join(root,'template-parts/calcolatore-markup.php'),'utf8')).replace(/<\?php[\s\S]*?\?>/g,'');
   res.setHeader('Content-Type','text/html; charset=utf-8');
   res.end(`<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/css/calcolatore-lilith.css"><body>${markup}${['aspects-dict','chart','engine','app'].map(n=>`<script src="/js/calcolatore-${n}.js"></script>`).join('')}<script type="module" src="/js/calcolatore-swiss.mjs"></script></body></html>`);return;
  }
  const file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(!file.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
  const ext=path.extname(file);res.setHeader('Content-Type',({'.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.wasm':'application/wasm'})[ext]||'application/octet-stream');
  res.end(await readFile(file));
 }catch{res.writeHead(404);res.end();}
}).listen(4189,'127.0.0.1',()=>console.log('Preview http://127.0.0.1:4189'));
