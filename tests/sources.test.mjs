import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateSources} from '../src/sources.mjs';
const sources=JSON.parse(readFileSync('content/sources.json'));const data=JSON.parse(readFileSync('content/policies.json'));
test('unknown source references and unsafe citation links are rejected',()=>{
 const bad=structuredClone(data);bad.PL[0].sourceRefs=['missing'];assert.throws(()=>validateSources(bad,sources),/unknown source/);
 const unsafe=structuredClone(sources);unsafe.campaign.url='javascript:alert(1)';assert.throws(()=>validateSources(data,unsafe),/unsafe/);
});
test('enhanced citation HTML also appears in the initial response',()=>{
 const context={window:{}};vm.runInNewContext(readFileSync('assets/js/policies.js','utf8'),context);
 const html=readFileSync('index.html','utf8');assert.equal(Object.keys(context.window.POLICY_CITATIONS).length,23);
 for(const citation of Object.values(context.window.POLICY_CITATIONS))assert.ok(html.includes(citation));
});

test('public video metadata contains no undated view counts',()=>{assert.doesNotMatch(readFileSync('index.html','utf8'),/[0-9,]+ 次觀看/)});
