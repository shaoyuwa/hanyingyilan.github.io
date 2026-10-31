// Local first-party lab: external services are aborted for repeatability.
// Start python3 -m http.server 8123 --bind 127.0.0.1 before running.
import {chromium} from '@playwright/test';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const destination=process.argv[2];if(!destination)throw Error('Pass a report JSON path');
const browser=await chromium.launch();const runs=[];
try{
 for(const reducedMotion of ['reduce','no-preference'])for(let run=1;run<=3;run++){
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,reducedMotion});const page=await context.newPage();
  const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1600000/8,uploadThroughput:750000/8});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Performance.enable');
  const requests=[];let bytes=0;cdp.on('Network.loadingFinished',e=>{bytes+=e.encodedDataLength});
  await page.route('**/*',r=>{const url=r.request().url();requests.push(url);return url.startsWith('http://127.0.0.1:8123/')?r.continue():r.abort();});
  await page.addInitScript(()=>{
   window.lab={lcpMs:null,cls:0,longTaskMs:0};let start=0,last=0,total=0;
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.lcpMs=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput){if(e.startTime-last>1000||e.startTime-start>5000){start=e.startTime;total=0}last=e.startTime;total+=e.value;window.lab.cls=Math.max(window.lab.cls,total)}}).observe({type:'layout-shift',buffered:true});
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.longTaskMs+=e.duration}).observe({type:'longtask',buffered:true});
  });
  await page.goto('http://127.0.0.1:8123/',{waitUntil:'load'});await page.waitForTimeout(8000);
  const metric=Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));const startup={...await page.evaluate(()=>window.lab),bytes,taskMs:metric.TaskDuration*1000,scriptMs:metric.ScriptDuration*1000,alternateRequests:requests.filter(u=>/\/(portrait2|p\d+)\.jpg$/.test(u)).length,iframeAttempts:requests.filter(u=>u.includes('facebook.com/plugins/')).length};
  for(const iframe of await page.locator('.vcard iframe').all()){await iframe.scrollIntoViewIfNeeded();await page.waitForTimeout(150)}
  await page.waitForTimeout(1000);
  runs.push({run,reducedMotion,startup,iframeAttemptsAfterScroll:requests.filter(u=>u.includes('facebook.com/plugins/')).length});console.log(JSON.stringify(runs.at(-1)));await context.close();
 }
 writeFileSync(destination,JSON.stringify({date:new Date().toISOString(),commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),productDiff:execFileSync('git',['diff','--','src','assets','index.html'],{encoding:'utf8'}),node:process.version,browser:browser.version(),conditions:{viewport:'390x844 DPR3 mobile touch',network:'1.6 Mbps down / 750 kbps up / 150ms latency',cpuSlowdown:4,startupWindow:'load + 8 seconds',cache:'disabled, new context each run',external:'aborted; no live font/player transfer or field data'},runs},null,2)+'\n');
}finally{await browser.close()}
