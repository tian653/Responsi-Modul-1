# API Peminjaman Buku

Ini adalah RESTful API untuk sistem peminjaman buku oleh anggota perpustakaan. Dibangun menggunakan Node.js, Express.js, dan Supabase sebagai database. Proyek ini disiapkan untuk di-deploy ke Vercel agar dapat diakses secara publik.

## Deskripsi Umum & Tujuan Proyek

Proyek ini bertujuan untuk menyediakan layanan backend (API) dalam mengelola data peminjaman buku perpustakaan. API ini mendukung operasi CRUD (Create, Read, Update, Delete) pada tabel peminjaman, serta memiliki fitur filter query untuk mengambil data peminjaman berdasarkan status (misalnya `GET /loans?status=Terlambat`).

## Struktur Data / Schema (Tabel Supabase)

Tabel: `loans`

| Kolom         | Tipe Data                  | Keterangan                           |
|---------------|----------------------------|--------------------------------------|
| `id`          | `uuid` (Primary Key)       | ID unik untuk setiap peminjaman      |
| `member_name` | `text`                     | Nama anggota peminjam                |
| `book_title`  | `text`                     | Judul buku yang dipinjam             |
| `borrow_date` | `date`                     | Tanggal peminjaman                   |
| `return_date` | `date`                     | Tanggal pengembalian yang diharapkan |
| `status`      | `text`                     | Status peminjaman (contoh: "Dipinjam", "Dikembalikan", "Terlambat") |
| `created_at`  | `timestamp with time zone` | Waktu pencatatan (otomatis)          |

## Contoh Request & Response

### 1. Mengambil Semua Peminjaman (Filter Opsional)

**Request:** `GET /loans` atau `GET /loans?status=Terlambat`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "c62b5d4a-3453-4bf3-863a-4ef31a90d819",
      "member_name": "Budi Santoso",
      "book_title": "Belajar Express JS",
      "borrow_date": "2026-10-01",
      "return_date": "2026-10-08",
      "status": "Dipinjam",
      "created_at": "2026-10-01T08:00:00Z"
    }
  ]
}
```

### 2. Membuat Peminjaman Baru

**Request:** `POST /loans`
```json
{
  "member_name": "Ani Wijaya",
  "book_title": "Pemrograman Node.js",
  "borrow_date": "2026-10-02",
  "return_date": "2026-10-09",
  "status": "Dipinjam"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "f51b5e5b-1234-5678-abcd-1ef23a91b820",
    "member_name": "Ani Wijaya",
    "book_title": "Pemrograman Node.js",
    "borrow_date": "2026-10-02",
    "return_date": "2026-10-09",
    "status": "Dipinjam",
    "created_at": "2026-10-02T10:00:00Z"
  }
}
```

### 3. Mengubah Status Peminjaman

**Request:** `PUT /loans/:id`
```json
{
  "member_name": "Ani Wijaya",
  "book_title": "Pemrograman Node.js",
  "borrow_date": "2026-10-02",
  "return_date": "2026-10-09",
  "status": "Dikembalikan"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "f51b5e5b-1234-5678-abcd-1ef23a91b820",
    "member_name": "Ani Wijaya",
    "book_title": "Pemrograman Node.js",
    "borrow_date": "2026-10-02",
    "return_date": "2026-10-09",
    "status": "Dikembalikan",
    "created_at": "2026-10-02T10:00:00Z"
  }
}
```

### 4. Menghapus Data Peminjaman

**Request:** `DELETE /loans/:id`

**Response (200 OK):**
```json
{
  "message": "Loan deleted successfully"
}
```

## Panduan Instalasi & Cara Menjalankan Lokal

1. **Clone repository ini** (jika dari Github):
   ```bash
   git clone <repo_url>
   cd responsimodul1
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable**:
   Buat file `.env` di root folder proyek dan isi dengan credential Supabase Anda (bisa salin dari `.env.example`):
   ```env
   SUPABASE_URL=https://xyzcompany.supabase.co
   SUPABASE_KEY=eyJh... (anon public key)
   ```

4. **Menjalankan Server (Mode Development)**:
   ```bash
   npm run dev
   ```
   Server akan berjalan secara lokal, umumnya pada `http://localhost:3000`.

## Link Hasil Deployment Vercel

*(Ganti link di bawah ini setelah mendeploy proyek ke Vercel)*

**Base URL API:** `https://responsimodul1-yourusername.vercel.app`

Cara Deploy ke Vercel:
1. Pastikan kode sudah di-push ke repository GitHub.
2. Login ke Vercel, lalu pilih **Add New Project**.
3. Import repository GitHub ini.
4. Tambahkan environment variables (`SUPABASE_URL` dan `SUPABASE_KEY`) pada bagian pengaturan Vercel.
5. Klik **Deploy**.