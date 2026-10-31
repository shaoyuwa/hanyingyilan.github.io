import {test,expect} from '@playwright/test';
test('comparison, keyboard calculator, preferences, media and game',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 for(let i=0;i<3;i++){await page.locator('#steps button').nth(i).click();for(const id of ['tNew','tNow']){await page.locator('#'+id).click();await expect(page.locator('#'+id)).toHaveAttribute('aria-pressed','true');await expect(page.locator('#say')).not.toBeEmpty();}}
 await page.locator('#sizebtn').click();await expect(page.locator('html')).toHaveClass(/big/);await page.locator('#theme').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await page.locator('#theme').click();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 await page.locator('#swapPhoto').click();await expect(page.locator('#portraitImg2')).toBeVisible();
 await expect(page.locator('video')).toHaveAttribute('controls','');await expect(page.locator('.vcard.fb .vlink')).toHaveCount(11);
 await page.locator('#gameOpen').click();await expect(page.locator('#game')).toBeVisible();await page.locator('#gNow').click();await page.locator('#gthrow').click();await page.locator('#gameOpen').click();await expect(page.locator('#game')).toBeHidden();await page.locator('#gameOpen').click();await expect(page.locator('#gmsg')).toContainText('1 / 5');expect(errors).toEqual([]);
});
test('sharing success, fallback and generated image download',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t=>{window.copiedText=t}}});Object.defineProperty(navigator,'canShare',{value:undefined});});await page.goto('/');
 await page.locator('#copyAll').click();await expect(page.locator('#copyMsg')).toHaveText('已複製連結');expect(await page.evaluate(()=>window.copiedText)).toBe('https://hanyingyilan.github.io/');
 await page.evaluate(()=>navigator.clipboard.writeText=async()=>{throw Error('denied')});await page.locator('#copyAll').click();await expect(page.locator('#copyMsg')).toContainText('請手動複製');await page.locator('#copy').click();await expect(page.locator('#copied')).toContainText('無法複製');
 await page.locator('#mkcard').click();await expect(page.locator('#cardModal')).toBeVisible();await expect(page.locator('#cShare')).toBeFocused();await page.locator('#cShare').click();await expect(page.locator('#toast')).toContainText('不能直接分享');
 const download=page.waitForEvent('download');await page.locator('#cDl').click();expect((await download).suggestedFilename()).toBe('韓瑩政見卡.png');await page.keyboard.press('Escape');await expect(page.locator('#cardModal')).toHaveCount(0);expect(errors).toEqual([]);
});
for(const width of [320,390,1280])test(`responsive visual ${width}px and blocked third parties`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.route(/https:\/\/(fonts\.|www\.facebook\.com)/,r=>r.abort());await page.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('unavailable')};Storage.prototype.setItem=()=>{throw Error('unavailable')};Storage.prototype.removeItem=()=>{throw Error('unavailable')};});await page.goto('/');await expect(page.locator('#tiles .tile')).toHaveCount(6);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.screenshot({path:`test-results/site-${width}.png`,fullPage:true});
 if(width===1280){await page.evaluate(()=>document.documentElement.style.zoom='2');await expect(page.locator('h1')).toBeVisible();await page.screenshot({path:'test-results/site-200-percent.png',fullPage:true});}
});
