import {test,expect} from '@playwright/test';
test('card modal contains focus, inerts background and restores opener',async({page})=>{
 await page.goto('/');await page.locator('#mkcard').click();const modal=page.getByRole('dialog');await expect(modal).toBeVisible();
 await page.locator('#cClose').focus();await page.keyboard.press('Tab');await expect(page.locator('#cShare')).toBeFocused();
 await page.keyboard.press('Shift+Tab');await expect(page.locator('#cClose')).toBeFocused();
 await page.locator('#theme').evaluate(e=>e.focus());expect(await page.evaluate(()=>document.activeElement.closest('#cardModal')!==null)).toBe(true);
 await page.keyboard.press('Escape');await expect(modal).toHaveCount(0);await expect(page.locator('#mkcard')).toBeFocused();
 await page.locator('#mkcard').click();await page.locator('#cClose').click();await expect(page.locator('#mkcard')).toBeFocused();
});
test('game does not consume Space on unrelated controls',async({page})=>{
 await page.goto('/');await page.locator('#gameOpen').click();
 for(const selector of ['#mon','#copyAll','#lineAll']){
  await page.locator(selector).focus();const canceled=await page.locator(selector).evaluate(e=>!e.dispatchEvent(new KeyboardEvent('keydown',{key:' ',code:'Space',bubbles:true,cancelable:true})));expect(canceled).toBe(false);
 }
 await page.locator('#gthrow').focus();await page.keyboard.press('Space');await expect(page.locator('#gmsg')).not.toBeEmpty();
});
test('skip navigation reaches main with visible focus and contextual controls',async({page})=>{
 await page.goto('/');await page.keyboard.press('Tab');const skip=page.getByRole('link',{name:'跳至主要內容'});await expect(skip).toBeFocused();await expect(skip).toBeVisible();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 for(const group of ['65–79 歲長輩','80–89 歲長輩','90–99 歲長輩','百歲人瑞'])for(const action of ['增加','減少'])await expect(page.getByRole('button',{name:action+' '+group,exact:true})).toHaveCount(1);
});
test('large dark mobile dialog keeps controls reachable and targets below navigation',async({page})=>{
 await page.setViewportSize({width:320,height:720});await page.goto('/');await page.locator('#sizebtn').click();await page.locator('#theme').click();
 await page.getByRole('navigation').getByRole('link',{name:'來源',exact:true}).click();
 const target=await page.locator('#sources').boundingBox(),bar=await page.locator('.bar').boundingBox();expect(target.y).toBeGreaterThanOrEqual(bar.y+bar.height);
 await page.locator('#mkcard').click();await page.locator('#cClose').focus();await expect(page.locator('#cClose')).toBeInViewport();await page.screenshot({path:'test-results/modal-320-dark-large.png'});
 await page.keyboard.press('Escape');await expect(page.locator('#mkcard')).toBeFocused();
});
