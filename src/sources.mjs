const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const status={proposal:'候選人提案',current:'現行公告（依公告日期）',unverified:'狀態待查證'};
export function validateSources(data,sources){
 for(const [id,s] of Object.entries(sources)){
  if(!/^[a-z0-9-]+$/.test(id)||!s.title||!status[s.status])throw Error(`invalid source: ${id}`);
  if(s.url&&new URL(s.url).protocol!=='https:')throw Error(`unsafe source URL: ${id}`);
  for(const d of [s.published,s.reviewed])if(d!==null&&!/^\d{4}-\d{2}-\d{2}$/.test(d))throw Error(`invalid source date: ${id}`);
 }
 for(const p of data.PL){
  if(!status[p.status]||!['reviewed','partial','unverified'].includes(p.verification)||!p.sourceRefs?.length)throw Error(`missing source status: ${p.id}`);
  for(const id of p.sourceRefs)if(!Object.hasOwn(sources,id))throw Error(`unknown source: ${id}`);
 }
}
export function citation(p,sources){
 const review=p.reviewed?`內容審查：${esc(p.reviewed)}`:'完整內容尚待審查';
 const verification={reviewed:'已查閱所列主張',partial:'部分主張已查閱，其餘待查證',unverified:'原文與歸屬待查證'}[p.verification];
 return `<div class="citation"><p>${status[p.status]}；${verification}。${review}。</p><p>來源：${p.sourceRefs.map(id=>`<a href="#source-${id}">${esc(sources[id].title)}</a>`).join('、')}</p></div>`;
}
export function sourceList(sources){
 return '<ul class="src">'+Object.entries(sources).map(([id,s])=>`<li id="source-${id}">${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`:esc(s.title)}<div class="d">${status[s.status]}；發布：${s.published||'未確認'}；原文查閱：${s.reviewed||'尚未完成'}。${esc(s.note)}</div></li>`).join('')+'</ul><p>來源更正：請附政策名稱、原文網址與日期，透過<a href="https://github.com/shaoyuwa/hanyingyilan.github.io/issues">儲存庫議題</a>提出；請勿提供個人申領資料。</p>';
}
