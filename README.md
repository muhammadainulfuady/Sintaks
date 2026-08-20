# Sintaks

Platform e-learning programming interaktif berbahasa Indonesia. Sintaks membantu pengguna belajar programming secara bertahap melalui Learning Path terstruktur, Lesson interaktif, Quiz dengan evaluasi otomatis, dan AI learning assistant bernama NOVA.

---

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Menjalankan Project](#menjalankan-project)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Build Production](#build-production)
- [Troubleshooting](#troubleshooting)
- [Dokumentasi](#dokumentasi)

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React (SPA), TypeScript |
| Backend | Laravel 12 (PHP) |
| Database | MySQL |
| Database Management | phpMyAdmin (developer only) |
| Authentication | Laravel Sanctum (Bearer Token) |
| HTTP Client | Axios |
| Routing | React Router |
| Form Validation | React Hook Form + Zod |
| Code Execution | Code Execution Service (sandbox terisolasi) |
| AI Integration | NOVA Service → AI Provider Eksternal |
| API Style | REST API (JSON) |

---

## Project Structure

```
sintaks/
├── frontend/          # React SPA
├── backend/           # Laravel 12 API
├── docs/              # Dokumentasi project
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── DESIGN.md
│   └── RULES.md
└── README.md
```

### Frontend (`frontend/`)

```
frontend/
└── src/
    ├── app/           # Router dan entry point
    ├── components/    # Komponen UI generik (Button, Input, Card, dll.)
    ├── features/      # Komponen dan logik per domain (auth, learning, quiz, nova, dll.)
    ├── pages/         # Halaman utama per route
    ├── services/      # Komunikasi dengan Laravel API (Axios)
    ├── hooks/         # Custom hooks lintas fitur
    ├── layouts/       # Layout wrapper (AppLayout, AuthLayout, AdminLayout)
    ├── utils/         # Helper, formatter, constants
    └── types/         # TypeScript type definitions
```

### Backend (`backend/`)

```
backend/
└── app/
    ├── Http/
    │   ├── Controllers/   # Controller per domain (Auth, Learning, Quiz, Nova, dll.)
    │   ├── Requests/      # Form Request untuk validasi input
    │   └── Resources/     # API Resource untuk format response
    ├── Models/            # Eloquent models
    ├── Services/          # Business logic (QuizEvaluationService, NovaService, dll.)
    └── Policies/          # Authorization (NotePolicy, CommunityPolicy, AdminPolicy)
```

---

## Prerequisites

Pastikan tools berikut sudah terpasang sebelum memulai:

| Tool | Minimum |
|------|---------|
| PHP | Sesuai kebutuhan Laravel 12 (cek `composer.json`) |
| Composer | Versi terbaru |
| Node.js | Sesuai kebutuhan project (cek `.nvmrc` atau `package.json`) |
| npm / yarn | Sesuai package manager yang digunakan project |
| MySQL | 8.x atau lebih baru |
| phpMyAdmin | Opsional, untuk database management lokal |

> Periksa `backend/composer.json` dan `frontend/package.json` untuk versi dependency yang tepat.

---

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd sintaks
```

### 2. Install Backend Dependencies

```bash
cd backend
composer install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Environment Setup

### Backend

Buat file `.env` dari template:

```bash
cd backend
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Isi konfigurasi di `.env`:

```env
APP_NAME=Sintaks
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sintaks
DB_USERNAME=root
DB_PASSWORD=

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000

# AI Provider untuk NOVA (gunakan salah satu)
AI_PROVIDER_API_KEY=
AI_PROVIDER_BASE_URL=

# Code Execution Service
CODE_EXECUTION_SERVICE_URL=http://localhost:8001
```

> Jangan pernah menyimpan nilai secret di `.env.example` atau meng-commit `.env` ke repository.

### Frontend

Buat file `.env` dari template:

```bash
cd frontend
cp .env.example .env
```

Isi konfigurasi di `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## Database Setup

### Membuat Database

Buat database baru di MySQL:

```sql
CREATE DATABASE sintaks CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Atau gunakan phpMyAdmin untuk membuat database secara visual.

### Menjalankan Migration

```bash
cd backend
php artisan migrate
```

### Menjalankan Seeder (Opsional)

Jika tersedia seeder untuk data awal (learning path, module, lesson):

```bash
php artisan db:seed
```

Atau untuk seeder tertentu:

```bash
php artisan db:seed --class=LearningPathSeeder
```

### Reset Database (Development)

```bash
php artisan migrate:fresh --seed
```

> Perintah ini akan menghapus seluruh data. Gunakan hanya di environment development.

---

## Menjalankan Project

### Backend

```bash
cd backend
php artisan serve
```

Backend akan berjalan di: `http://localhost:8000`

### Frontend

```bash
cd frontend
npm run dev
```

Frontend akan berjalan di: `http://localhost:3000` (atau port yang dikonfigurasi Vite)

### phpMyAdmin

Akses phpMyAdmin melalui browser sesuai konfigurasi lokal. Default umumnya:
`http://localhost/phpmyadmin`

> phpMyAdmin digunakan hanya untuk kebutuhan development (query, debugging, melihat schema). phpMyAdmin **tidak** menjadi bagian dari application runtime dan tidak dapat diakses oleh pengguna Sintaks.

---

## Development Workflow

### Membuat Migration Baru

```bash
cd backend
php artisan make:migration create_nama_tabel_table
```

Setelah mengedit file migration:

```bash
php artisan migrate
```

> Laravel Migration adalah **source of truth** untuk database schema. Semua perubahan schema harus dilakukan melalui Migration, bukan hanya melalui phpMyAdmin.

### Membuat Model, Controller, dan Resource

```bash
# Model + Migration + Controller sekaligus
php artisan make:model NamaModel -mc

# Form Request
php artisan make:request NamaRequest

# Policy
php artisan make:policy NamaPolicy
```

### Format Commit Message

Gunakan format `type: deskripsi`:

```
feat: add lesson progress tracking
fix: fix note ownership validation
refactor: simplify quiz feedback handler
style: update lesson layout
docs: update readme
```

Hindari commit message yang tidak informatif seperti `update`, `fix`, `final`, atau `aaa`.

---

## Testing

### Backend

Jalankan seluruh test suite Laravel:

```bash
cd backend
php artisan test
```

Jalankan test untuk file atau folder tertentu:

```bash
php artisan test --filter=QuizEvaluationTest
```

Test coverage mencakup:
- Feature test untuk seluruh endpoint API (autentikasi, learning, quiz, notes, community)
- Unit test untuk Service yang kritis (QuizEvaluationService, ModuleLockService, LearningProgressService, XPService)
- Authorization test (user tidak dapat mengakses data milik user lain)

### Frontend

Jalankan test komponen React:

```bash
cd frontend
npm run test
```

Test coverage mencakup:
- Komponen quiz (Theory, Code Writing, Code Completion)
- Komponen NOVA chat
- Komponen lesson content
- Alur login/logout dan navigasi dasar

---

## Build Production

### Frontend

Build static files React untuk production:

```bash
cd frontend
npm run build
```

Output akan berada di folder `dist/`. File ini dapat di-serve sebagai static files melalui web server atau CDN.

### Backend

Untuk production, jalankan optimisasi Laravel:

```bash
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Pastikan konfigurasi di `.env` production sudah benar sebelum menjalankan perintah di atas:

```env
APP_ENV=production
APP_DEBUG=false
```

---

## Troubleshooting

### `php artisan serve` tidak bisa diakses dari frontend

Pastikan `APP_URL` di `.env` backend dan `VITE_API_BASE_URL` di `.env` frontend sudah sesuai. Periksa juga konfigurasi CORS di `config/cors.php`.

### Error 401 Unauthorized pada semua request API

Pastikan token Sanctum dikirimkan di header `Authorization: Bearer <token>`. Periksa juga konfigurasi `SANCTUM_STATEFUL_DOMAINS` di `.env` backend.

### Migration gagal

Pastikan database sudah dibuat dan konfigurasi `DB_*` di `.env` sudah benar. Cek koneksi ke MySQL:

```bash
php artisan db:show
```

### Frontend tidak bisa connect ke backend

Periksa apakah backend sudah berjalan dan `VITE_API_BASE_URL` di `.env` frontend sudah mengarah ke URL yang benar.

### Perubahan schema tidak ter-reflect di database

Jalankan migration:

```bash
php artisan migrate
```

Jika schema sudah sangat berbeda, gunakan di development:

```bash
php artisan migrate:fresh --seed
```

Jangan jalankan `migrate:fresh` di environment staging atau production.

### Storage tidak dapat ditulis

```bash
cd backend
chmod -R 775 storage bootstrap/cache
php artisan storage:link
```

---

## Dokumentasi

Dokumentasi lengkap project tersedia di folder `docs/`:

| Dokumen | Isi |
|---------|-----|
| `PRD.md` | Product requirements dan functional specification |
| `ARCHITECTURE.md` | Arsitektur sistem, komponen, dan keputusan teknis |
| `SCHEMA.md` | Database schema dan relasi antar tabel |
| `DESIGN.md` | Design system, UI/UX guidelines, dan komponen visual |
| `RULES.md` | Development rules dan guardrails untuk developer dan AI coding assistant |

---

*Sintaks — Platform e-learning programming berbahasa Indonesia.*
