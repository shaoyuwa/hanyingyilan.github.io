import {test,expect} from '@playwright/test';
test('alternate photos load only when selected and remain switchable',async({page})=>{
 const alternates=[];page.on('request',r=>{if(/\/(portrait2|p\d+)\.jpg$/.test(r.url()))alternates.push(new URL(r.url()).pathname)});
 await page.route(/^https:\/\//,r=>r.abort());await page.goto('/');
 // Advance beyond the old load + 1500ms prefetch without a wall-clock sleep.
 await page.clock.install();await page.clock.fastForward(5000);expect(alternates).toEqual([]);
 await page.locator('#swapPhoto').click();await expect(page.locator('#portraitImg2')).toHaveAttribute('src','portrait2.jpg');await expect.poll(()=>alternates).toEqual(['/portrait2.jpg']);
 await page.locator('#swapPhoto').click();await expect(page.locator('#portraitImg2')).toHaveAttribute('src','p4.jpg');await expect.poll(()=>alternates).toEqual(['/portrait2.jpg','/p4.jpg']);
 await expect(page.locator('video')).toHaveAttribute('preload','none');await expect(page.locator('.vcard.fb .vlink')).toHaveCount(11);
});
