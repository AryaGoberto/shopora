# 🚀 Shopora E-commerce Platform

**Shopora** adalah platform *e-commerce* modern yang cepat, aman, dan mudah dioperasikan. Dibangun untuk memberikan pengalaman belanja yang mulus (*seamless*) bagi pelanggan dan alat manajemen yang kuat untuk penjual. Dibuat oleh tim sisfor hebat (arya, azizah, aradyzah, bryan, deiv)
## 📖 Daftar Is

1. [Demo](#-demo--tinjauan)
2. [Fitur Utama](#-fitur-utama)
3. [Tech Stack](#-tech-stack)
4. [Persiapan Lokal (Instalasi)](#-persiapan-lokal-instalasi)
5. [Struktur Proyek](#-struktur-proyek)
6. [Kontribusi](#-kontribusi)
7. [Lisensi](#-lisensi)


## 🌐 Demo & Tinjauan

Lihat langsung bagaimana Shopora beroperasi!

* **Demo Langsung:** [Link ke Vercel/Netlify Deployment Anda]
* **Akun Demo:**
    * **Email:** `demo@shopora.com`
    * **Password:** `password123`
 

## 🌟 Fitur Utama

### Pengalaman Pelanggan (Frontend)

* **Pencarian Cepat:** Pencarian produk yang instan dan *powerful*.
* **Keranjang Belanja:** Manajemen kuantitas dan *checkout* yang intuitif.
* **Autentikasi:** Login/Register dengan Google/GitHub (OAuth) dan kredensial.
* **Review Produk:** Sistem penilaian dan ulasan yang terintegrasi.

### Manajemen Toko (Admin Dashboard)

* **CRUD Produk:** Tambah, Edit, Hapus produk dengan manajemen inventaris.
* **Manajemen Pesanan:** Pembaruan status pesanan (*Pending*, *Processing*, *Shipped*).
* **Laporan Dasar:** Grafik penjualan dan ringkasan pendapatan.

## 🛠️ Tech Stack

**Frontend & Backend (Full-Stack):**
* **Framework:** [Next.js](https://nextjs.org/) (Menggunakan App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Komponen UI:** [Shadcn/ui](https://ui.shadcn.com/) (Jika digunakan)
* **TypeScript:** Untuk *type-safety* di seluruh proyek.

**Database & Layanan:**
* **Database:** [PostgreSQL] (melalui **Supabase** atau **Neon**)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Autentikasi:** [NextAuth.js] atau [Clerk] (Jika digunakan)


## 🚀 Persiapan Lokal (Instalasi)

### Prasyarat

* Node.js (LTS v18+)
* Akun dan Database Supabase (atau penyedia PostgreSQL lainnya)
* Kunci API NextAuth/Clerk

### Langkah-langkah

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/user/shopora-ecommerce.git](https://github.com/user/shopora-ecommerce.git)
    cd shopora-ecommerce
    ```

2.  **Instal Dependensi**
    ```bash
    npm install
    # atau yarn install / pnpm install
    ```

3.  **Konfigurasi Variabel Lingkungan**
    Buat file `.env.local` di root proyek, lalu isi dengan kunci Anda:
    ```
    # Database
    DATABASE_URL="postgresql://[user]:[password]@[host]:5432/[database]"

    # NextAuth / Autentikasi
    NEXTAUTH_SECRET="random_string_secret"
    GITHUB_ID="..."
    GITHUB_SECRET="..."
    ```

4.  **Migrasi Database**
    Jalankan migrasi Prisma untuk membuat tabel di database Anda:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Jalankan Server Pengembangan**
    ```bash
    npm run dev
    ```
    Buka `http://localhost:3000` di browser Anda.


    ## 💚 Kontribusi

Kami menyambut kontribusi! Baik itu laporan *bug*, saran fitur, atau *pull request* kode, silakan merujuk ke file [CONTRIBUTING.md](CONTRIBUTING.md) (Jika ada).

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
