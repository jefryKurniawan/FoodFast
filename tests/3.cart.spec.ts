import { test, expect }  from '@playwright/test' ;

test('menambahkan dan menghapus item dari keranjang', async ({ page }) => {
    await page.goto('https://foodfast.com/restaurants/1');

    // tambah item
    await page.click('#menu-item:first-child >> text=+');

    // hapus item
    await page.click('#menu-item:first-child >> text=-');

    const totalItems = await page.locator('.cart-count').innerText();
    await expect(totalItems).toBe('1');
});
