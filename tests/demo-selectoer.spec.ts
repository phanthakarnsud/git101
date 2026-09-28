import { test, Page } from '@playwright/test';

test('demo selector', async ({ page }) => {
    await page.goto('https://demoqa.com/login');
    await page.locator('id=userName').fill('demoqa');
    await page.locator('id=password').fill('Welcome1!');
    await page.click('id=login');
    //await page.waitForNavigation();
});

test('demo chain selector', async ({ page }) => {
    await page.goto('https://demoqa.com/login');
});

test('demo hover', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.hover('css=div.navbar__item.dropdown--hoverable >> nth=0');
    await page.click('css=div.navbar__item.dropdown--hoverable >> css=a[href*="/python/"]');
    await page.waitForSelector('text=Playwright for Python');
    test.setTimeout(0);
    await page.pause();
});

test('demo page Navigate', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.waitForLoadState('networkidle');
    await page.click('text=Elements');

    test.setTimeout(0);
    await page.pause();
});

test('demo New page', async ({ page,context }) => {
    await page.goto('https://demoqa.com/browser-windows');

    const pagePromise = context.waitForEvent('page');
    await page.locator('[id=tabButton]').click();
    const newPage: Page = await pagePromise;

    await newPage.waitForLoadState();
    const text =  await newPage.locator('[id=sampleHeading]').textContent();
    console.log(text);
    test.setTimeout(0);
    await page.pause();
});





