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
export function generate(){
 const data=JSON.parse(readFileSync('content/policies.json','utf8'));validate(data);
 const html=readFileSync('src/index.template.html','utf8');
 const outputs={'index.html':html,'assets/site.css':readFileSync('src/site.css','utf8'),'assets/js/app.js':readFileSync('src/app.js','utf8'),'assets/js/policies.js':'window.POLICY_DATA = '+JSON.stringify(data).replace(/</g,'\\u003c')+';\n'};
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
