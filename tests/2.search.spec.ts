import { test, expect }  from '@playwright/test' ;

test('pencarian restoran valid', async ({ page }) => {
    await page.goto('https://foodfast.com');
    await page.fill('.search-input', 'Kopi Kenangan');
    await page.click('#search-btn');

    await expect(page.locator('.restaurant-card').first()).toContainText('Kopi Kenangan');
});

test('pencarian restoran tidak ditemukan', async ({ page }) => {
    await page.goto('https://foodfast.com');
    await page.fill('.search-input', 'Restoran Tidak Ada');
    await page.click('#search-btn');

    await expect(page.locator('.empty-state')).toContainText('Tidak DItemukan');
});