import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {loadPolicies} from './build.mjs';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export function inspectHTML(html,data,sources){
 assert.equal(data.PL.length,23);
 const articles=[...html.matchAll(/<article\b[^>]*id="policy-([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)];
 assert.equal(articles.length,23,'23 policy articles required');
 assert.equal(new Set(articles.map(a=>a[1])).size,23,'unique policy articles required');
 for(const p of data.PL){
  const article=articles.find(a=>a[1]===p.id)?.[2];assert.ok(article,`missing policy ${p.id}`);
  for(const text of [p.t,...p.body,p.ref])assert.ok(article.includes(esc(text)),`missing content ${p.id}: ${text}`);
  assert.ok(article.includes('候選人提案'),`missing proposal status ${p.id}`);
  assert.match(article,/內容審查：|完整內容尚待審查/);
  for(const id of p.sourceRefs)assert.ok(article.includes(`href="#source-${id}"`),`missing citation ${p.id}: ${id}`);
 }
 for(const [id,s] of Object.entries(sources)){
  const item=html.match(new RegExp(`<li id="source-${id}">([\\s\\S]*?)<\\/li>`))?.[1];assert.ok(item,`missing source ${id}`);
  for(const text of [s.title,s.published||'未確認',s.reviewed||'尚未完成',s.note])assert.ok(item.includes(esc(text)),`missing source detail ${id}`);
  if(s.url)assert.ok(item.includes(`href="${esc(s.url)}"`),`missing source URL ${id}`);
  assert.match(item,/候選人提案|現行公告（依公告日期）|狀態待查證/);
 }
 assert.match(html,/<link rel="canonical" href="https:\/\/hanyingyilan.github.io\/"/);
 assert.ok(html.includes('發布單位：韓瑩市長候選人辦公室'));
 return {policies:articles.length,sources:Object.keys(sources).length};
}
export async function checkHTTP(base){
 const data=loadPolicies(),sources=JSON.parse(readFileSync('content/sources.json','utf8'));
 const results=[];
 for(const path of ['', 'index.html','?utm_source=crawl-check','robots.txt','sitemap.xml']){
  const url=new URL(path,base),res=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(15000)});
  assert.equal(res.status,200,`${url} HTTP status`);const html=await res.text();
  let coverage;
  if(path==='robots.txt'){assert.match(html,/User-agent: \*\s+Allow: \//);assert.ok(html.includes('Sitemap: https://hanyingyilan.github.io/sitemap.xml'));}
  else if(path==='sitemap.xml')assert.ok(html.includes('<loc>https://hanyingyilan.github.io/</loc>'));
  else coverage=inspectHTML(html,data,sources);
  results.push({url:String(url),status:res.status,...coverage});
 }
 return {checkedAt:new Date().toISOString(),results};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 if(!process.argv[2])throw Error('Usage: node scripts/check-http.mjs BASE_URL');
 console.log(JSON.stringify(await checkHTTP(process.argv[2]),null,2));
}
