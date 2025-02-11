import { test, expect }  from '@playwright/test' ;

test('checkout dengan transfer bank', async ({ page }) => {
    await page.goto('https://foodfast.com/checkout');
    await page.click('#payment-bank-transfer');

    const vaNumber = await page.locator('.va-number').innerText();
    expect(vaNumber).toMatch(/^\d{16}$/); // validasi format va number
});