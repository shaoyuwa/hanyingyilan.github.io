import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inspectHTML} from '../scripts/check-http.mjs';
import {loadPolicies} from '../scripts/build.mjs';
const html=readFileSync('index.html','utf8'),data=loadPolicies(),sources=JSON.parse(readFileSync('content/sources.json','utf8'));
test('non-JavaScript response checker requires every policy and original content',()=>{
 assert.deepEqual(inspectHTML(html,data,sources),{policies:23,sources:11});
 assert.throws(()=>inspectHTML(html.replace(/<article class="pcard" id="policy-[\s\S]*?<\/article>/,''),data,sources),/23 policy/);
 assert.throws(()=>inspectHTML(html.replace(/<p class="meta">出處：[\s\S]*?<\/p>/,''),data,sources),/missing content/);
});
test('non-JavaScript response checker rejects missing citations and source details',()=>{
 assert.throws(()=>inspectHTML(html.replace(/href="#source-[^"]+"/,'href="#removed"'),data,sources),/missing citation/);
 assert.throws(()=>inspectHTML(html.replace(/<li id="source-[\s\S]*?<\/li>/,''),data,sources),/missing source/);
});
