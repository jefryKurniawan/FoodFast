import { test, expect }  from '@playwright/test' ;

test('menangani pembayaran gagal', async ({ page }) => {
    // api
    await page.route('**/send-email', route => route.fulfill({
        status: 400,
        body: JSON.stringify({ error: 'Saldo Tidak Cukup' }),
    }))

    // trigger
    await page.goto('https://foodfast.com/payment');
    await page.click('#confirm-payment')

   await expect(page.locator('.payment-error')).toContainText('Saldo Tidak Cukup');
});