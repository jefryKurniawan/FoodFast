import { test, expect }  from '@playwright/test' ;

test('checkout berhasil dengan e-wallet', async ({ page }) => {
    // login
    await page.goto('https://foodfast.com/login');
    await page.fill('#email', 'user@contoh.com');
    await page.fill('#password', 'Pass123!');
    await page.click('#login-btn');

    // checkout
    await page.click('.restaurant-card:first-child');
    await page.click('.add-to-card:first-child');
    await page.click('#checkout-btn');

    // payment
    await page.click('#payment-ewallet');
    await page.click('#confirm-payment');

    await expect(page.locator('.order-success')).toBeVisible();
});