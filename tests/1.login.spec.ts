import { test, expect } from '@playwright/test';

test('login dengan kredensial valid', async ({ page }) => {
    await page.goto('https://foodfast.com/login');
    await page.fill('#email', 'user@contoh.com');
    await page.fill('#password', 'Pass123!');
    await page.click('#login-btn');

    await expect(page).toHaveURL('https://foodfast.com/dashboard');
});

test('login dengan password salah', async ({ page }) => {
    await page.goto('https://foodfast.com/login');
    await page.fill('#email', 'user@contoh.com');
    await page.fill('#password', 'PasSalah');
    await page.click('#login-btn');

    await expect(page.locator('.error-message')).toContainText('Kredential tidak valid');
})