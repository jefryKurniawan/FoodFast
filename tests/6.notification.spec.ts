import { test, expect }  from '@playwright/test' ;

test('menerima notifikasi email', async ({ page }) => {
    // api
    await page.route('**/send-email', route => route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
    }))

    // trigger
    await page.goto('https://foodfast.com/order-complete');

    // verifikasi
    const emailRequest = await page.waitForRequest('**/send-email');
    expect(emailRequest.postDataJSON()).toMatchObject({
        recipient: 'user@contoh.com',
        subject: 'Pesanan Berhasil',
    });
});