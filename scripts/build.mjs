import {HtmlValidate} from 'html-validate';
import {join} from 'node:path';
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
export function validate(data){
 const ids=new Set();
 for(const p of data.PL){
  if(ids.has(p.id))throw Error(`duplicate policy: ${p.id}`);ids.add(p.id);
  if(!['edm','news'].includes(p.src))throw Error(`unknown source classification: ${p.src}`);
  if(!data.PIL[p.p])throw Error(`unknown category: ${p.p}`);
  if(!p.t||!p.ref||!Array.isArray(p.body)||!p.body.length)throw Error(`incomplete policy: ${p.id}`);
 }
}
const htmlValidator=new HtmlValidate({rules:{'close-order':'error','no-implicit-close':'error'}});
export function validateHTML(html, outputs={}) {
 const report=htmlValidator.validateStringSync(html);
 if(!report.valid)throw Error('HTML syntax: '+report.results.flatMap(r=>r.messages.map(m=>m.message)).join('; '));
 const attrs=(name)=>[...html.matchAll(new RegExp('\\b(?:'+name+')=(?:"([^"]*)"|\'([^\']*)\'|([^\\s>]+))','g'))].map(m=>m[1]??m[2]??m[3]);
 const ids=attrs('id');
 if(new Set(ids).size!==ids.length)throw Error('duplicate DOM ID');
 for(const value of attrs('src|poster|href')) {
  const path=value.split(/[?#]/)[0];if(path&&!path.includes(':')&&!outputs[path]&&!existsSync(path))throw Error(`missing asset: ${path}`);
 }
 for(const value of attrs('href'))if(value.startsWith('#')&&!ids.includes(value.slice(1))&&!/^#six-(intl|traffic|city|tour|resil|welfare)$/.test(value))throw Error(`missing fragment: ${value}`);
}
const escape=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function renderOverview(data){
 return '<section id="policy-overview"><div class="wrap"><h2>完整政見與出處</h2>'+Object.entries(data.PIL).filter(([k])=>k!=='gov').map(([key,pillar])=>`<section id="six-${key}"><h3>${escape(pillar.n)}</h3><div class="cards">${data.PL.filter(p=>p.p===key).map(p=>`<article class="pcard" id="policy-${p.id}"><div class="bd"><h4>${escape(p.t)}</h4><ul>${p.body.map(b=>`<li>${escape(b)}</li>`).join('')}</ul><p class="meta">出處：${escape(p.ref)}</p>${p.go?`<a href="#${p.go}">查看相關互動</a>`:''}</div></article>`).join('')}</div></section>`).join('')+'</div></section>';
}
export function generate(){
 const data=JSON.parse(readFileSync('content/policies.json','utf8'));validate(data);
 const site=JSON.parse(readFileSync('content/site.json','utf8'));
 if(new URL(site.url).href!==site.url||new URL(site.url).pathname!=='/'||new URL(site.url).search||new URL(site.url).hash)throw Error('invalid production root');
 const html=readFileSync('src/index.template.html','utf8').replace('{{POLICY_OVERVIEW}}',renderOverview(data)).replaceAll('{{SITE_URL}}',site.url);
 const outputs={'index.html':html,'assets/site.css':readFileSync('src/site.css','utf8'),'assets/js/app.js':readFileSync('src/app.js','utf8'),'assets/js/optional.js':readFileSync('src/optional.js','utf8'),'assets/js/policies.js':'window.SITE_URL = '+JSON.stringify(site.url)+';\nwindow.POLICY_DATA = '+JSON.stringify(data).replace(/</g,'\\u003c')+';\n'};
 validateHTML(html,outputs);
 for(const file of ['preview-a.html','preview-b.html','preview-c.html'])validateHTML(readFileSync(file,'utf8'),outputs);
 return outputs;
}
export function writeOutputs(outputs,check=false,root='.'){
 for(const [relative,text] of Object.entries(outputs)){
  const path=join(root,relative);
  if(check){if(!existsSync(path)||readFileSync(path,'utf8')!==text)throw Error(`stale output: ${relative}`)}
  else{mkdirSync(path.includes('/')?path.slice(0,path.lastIndexOf('/')):'.',{recursive:true});writeFileSync(path,text)}
 }
}
export function build(check=false){writeOutputs(generate(),check)}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)build(process.argv.includes('--check'));
