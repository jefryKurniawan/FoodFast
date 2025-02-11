# FoodFast Automated Test Suite

Repository ini berisi skenario pengujian otomatis untuk aplikasi FoodFast (aplikasi pemesanan makanan).

## 🛠 Instalasi

### Prasyarat

- Node.js v18+
- Google Chrome
- Git

### Langkah-langkah

```sh
https://github.com/jefryKurniawan/FoodFast.git
cd FoodFast
npm install
npx playwright install
```

### Menjalankan Tes

Semua tes

```sh
npm test
```

Tes Spesifik

```sh
npx playwright test tests/1.login.spec.ts
```

Generate Laporan HTML

```sh
npx playwright show-report
```

## Identifikasi Test Case

### 1. Login Pengguna

- Tujuan : Verifikasi sistem bisa menangani login valid/invalid
- file : 1.login.spec.ts
- Cakupan :
  - login dengan email & password valid
  - login dengan password salah
  - validasi pesan error

### 2. Pencarian Restoran

- Tujuan : Memastikan fitur pencarian restoran bekerja
- file : 2.search.spec.ts
- Cakupan :
  - pencarian dengan keyword valid
  - pencarian dengan keyword tidak valid
  - auto-suggest saat ketik

### 3. Manajemen Keranjang

- Tujuan : Validasi CRUD item keranjang
- file : 3.cart.spec.ts
- Cakupan :
  - tambah item
  - hapus item
  - update jumlah item
  - kalkulasi total otomatis

### 4. Checkout E-Wallet

- Tujuan : Verifikasi alur pembayaran digital
- file : 4.checkout.spec.ts
- Cakupan :
  - pilih metode e-wallet
  - redirect ke gateway pembayaran
  - simulasi pembayaran sukses

### 5. Pembayaran Transfer Bank

- Tujuan : Validasi pembayaran via Virtual Account
- file : 5.payment.spec.ts
- Cakupan :
  - generate VA number
  - validasi format VA
  - simulasi expired payment

### 6. Notifikasi Pesanan

- Tujuan : Pastikan notifikasi terkirim
- file : 6.notification.spec.ts
- Cakupan :
  - notification in-app
  - email konfirmasi

### 7. Error Handling

- Tujuan : Verifikasi sistem menangani error
- file : 6.error-handling.spec.ts
- Cakupan :
  - pembayaran gagal
  - API timeout
  - input invalid

## Identifikasi Test Case

### Bug 1 : Total Harga Keranjang Tidak Akurat

- Penyebab bug : Race condition saat update jumlah item
- Dampak bug bagi pengguna : Dampak pengguna membayar harga salah
- Prioritas = High
- Sarana perbaikan :

```sh
// atomic operation
await page.evaluate(() => {
    updateCartItemQuantity(itemId, newQuantity);
});
```

### Bug 2 : VA Number Tidak Ter-Generate

- Penyebab bug : Race condition di API Bank
- Dampak bug bagi pengguna : Pengguna tidak bisa bayar
- Prioritas = Critical
- Sarana perbaikan :

```sh
// mekanisme retry
async function generateVARetry(){
    let retries =  3;
    while(retries > 0) {
        try {
            return await generateVA();
        } catch (error) {
            retries--;
        }
    }
}
```

### Bug 3 : Email Notifikasi Spam

- Penyebab bug : Header email tidak terkonfirmasi DKIM
- Dampak bug bagi pengguna : email masuk ke folder spam
- Prioritas = Medium
- Sarana perbaikan :
  - validasi DNS record
  - tambahkan domain authentication di SMTP

## laporan Pengujian

Project : FoodFast v1.0.0
Tester : QA Team
Tanggal : 11 Februari 2025

Hasil Tes
| test case | status | keterangan |
|:-|:-|:-|
|Login Valid|:white_check_mark: Passed|-|
|Login Invalid|:white_check_mark: Passed|-|
|Checkout E-Wallet|:x: Failed|Error di Halaman konfirmasi|
|Generate VA|:white_check_mark: Passed|-|
|Notifikasi Email|:exclamation: Partial|Terkirim tapi delay 5 menit|

Ringkasan
Pass Rate: 85% (17/20 test passed)
Critical Bugs Found: 2
