import { test } from '@playwright/test';

test('demo selector', async ({ page }) => {
    await page.goto('https://demoqa.com/login');
});