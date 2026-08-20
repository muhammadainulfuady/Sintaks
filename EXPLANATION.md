# EXPLANATION.md — Panduan Memahami Dokumentasi Sintaks

> **Untuk:** Orang awam, developer baru, atau siapa saja yang ingin paham kegunaan tiap file dokumentasi Sintaks
> **Bahasa:** Indonesia
> **Versi:** 1.0

---

## Daftar Isi

1. [Apa Itu File Dokumentasi?](#apa-itu-file-dokumentasi)
2. [ARCHITECTURE.md](#architecturemd)
3. [DESAIN.md](#desainmd)
4. [PRD.md](#prdmd)
5. [README.md](#readmemd)
6. [RULES.md](#rulesmd)
7. [SCHEMA.md](#schemamd)
8. [Urutan Baca yang Disarankan](#urutan-baca-yang-disarankan)

---

## Apa Itu File Dokumentasi?

Dokumentasi adalah **panduan tertulis yang menjelaskan sesuatu**. Di project Sintaks, ada 6 file dokumentasi utama yang masing-masing punya fungsi berbeda. Setiap file menjawab pertanyaan spesifik:

- **PRD.md** → "Apa yang mau kita bangun?"
- **ARCHITECTURE.md** → "Bagaimana cara membangunnya?"
- **SCHEMA.md** → "Database-nya gimana?"
- **RULES.md** → "Apa yang boleh dan tidak boleh?"
- **DESAIN.md** → "Warna, tombol, layout-nya gimana?"
- **README.md** → "Gimana cara mulai setup project?"

---

## ARCHITECTURE.md

### Kegunaan
Dokumen teknis yang menjelaskan **bagaimana sistem Sintaks dibangun secara struktur**.

### Yang Dibahas
- Komponen utama (React frontend, Laravel backend, MySQL database, Code Execution Service)
- Alur data — data mengalir dari mana ke mana
- Arsitektur per fitur (Learning, Quiz, NOVA, Code Execution, Progress, XP, Community)
- Diagram sistem — visualisasi bagaimana komponen terhubung
- Database design — tabel database dan relasi-nya

### Analogi Mudah
Bayangkan Anda ingin membangun rumah. **ARCHITECTURE.md itu seperti blueprint** — menunjukkan:
- Ada berapa ruangan?
- Ruangan mana yang terhubung?
- Aliran listrik, air, gas dari mana?
- Struktur bangunannya gimana?

### Siapa yang Perlu Baca?
- Backend developer (Laravel)
- Frontend developer (React)
- DevOps/Infrastructure engineer
- Siapa saja yang mau paham "gimana caranya sistem ini bekerja"

### Mudah Diingat
**"Cetak biru teknis — siapa ngapain, gimana caranya, komunikasi antar bagian."**

---

## DESAIN.md

### Kegunaan
Dokumen desain UI/UX visual Sintaks. Ini adalah **panduan visual — bagaimana aplikasi harus terlihat dan terasa**.

### Yang Dibahas
- Color system — warna apa yang digunakan (Indigo primary, Slate neutral)
- Typography — jenis font dan ukurannya (Plus Jakarta Sans, Inter, JetBrains Mono)
- Spacing system — jarak antar elemen (berbasis 4px)
- Icons — icon apa boleh digunakan (harus Lucide, JANGAN emoji sebagai UI element)
- Responsive design — tampilan di mobile, tablet, desktop berbeda gimana
- Component library — Button, Card, Input, Badge, dll harus terlihat seperti apa
- Layout per halaman — Dashboard, Lesson, Quiz, Profile, etc layout-nya gimana

### Analogi Mudah
**DESAIN.md itu seperti style guide seorang perancang interior**. Jika blueprint adalah struktur, style guide adalah:
- Warna cat ruangan
- Jenis karpet
- Ukuran furniture
- Tata letak barang

### Siapa yang Perlu Baca?
- Frontend developer (React) — wajib baca, biar coding-nya sesuai design
- Designer/UI-UX designer — obvious
- Backend developer — tidak wajib tapi bagus buat referensi

### Mudah Diingat
**"Design system — warna apa, font apa, tombol gimana, mobile gimana."**

---

## PRD.md (Product Requirements Document)

### Kegunaan
Dokumen yang menjelaskan **APA yang mau dibangun + business requirements**. Ini adalah **requirement spesifikasi — sebelum coding**.

### Yang Dibahas
- Problem statement — kenapa Sintaks perlu ada (problem apa yang diselesaikan)
- Product vision & goals — visi jangka panjang, apa tujuan produk
- Functional requirements per fitur — fitur apa saja yang harus ada (Auth, Learning Path, Quiz, NOVA, Community, XP)
- Acceptance criteria — bagaimana cara test/verifikasi feature berhasil
- MVP scope — fitur apa yang boleh di MVP (first release), apa yang out of scope (untuk release berikutnya)

### Analogi Mudah
**PRD.md itu seperti brief dari klien ke arsitek**. Klien bilang:
- "Saya mau rumah dengan 3 kamar"
- "Dapur harus modern"
- "Tidak perlu kolam renang (out of scope)"
- "Test keberhasilan: semua kamar sudah selesai, aman dihuniː"

### Siapa yang Perlu Baca?
- Product Manager (wajib)
- Developer (wajib) — biar tahu requirement apa yang harus dipenuhi
- Designer (wajib)
- QA/Tester (wajib) — biar tahu apa yang harus di-test

### Mudah Diingat
**"Apa yang harus dibikin — requirement per fitur, kriteria sukses."**

---

## README.md

### Kegunaan
Dokumen praktis yang menjelaskan **bagaimana cara setup, menjalankan, dan mengembangkan project**.

### Yang Dibahas
- Tech stack — teknologi apa yang digunakan (React, Laravel, MySQL, phpMyAdmin, Axios, React Router, dll)
- Project structure — folder mana untuk apa (src/, app/, backend/, frontend/)
- Installation steps — step-by-step clone repo, install dependency
- Environment setup — setup file .env dengan variable apa aja
- Database setup & migration — bagaimana membuat database baru
- Cara jalankan project — command apa untuk jalankan frontend, backend
- Troubleshooting — kalau error, solusi apa

### Analogi Mudah
**README.md itu seperti manual IKEA** — step-by-step cara merakit furniture atau setup. Tidak ada teori, langsung praktik:
1. Ambil part A dan B
2. Kencangkan dengan skrup
3. Done

### Siapa yang Perlu Baca?
- Developer baru yang baru pertama kali join project (WAJIB)
- Siapa saja yang ingin setup project di lokal mereka
- DevOps — untuk setup di production

### Mudah Diingat
**"Setup & running guide — clone, install, jalankan, debug."**

---

## RULES.md

### Kegunaan
Dokumen aturan dan constraint yang **WAJIB diikuti oleh developer dan AI coding assistant** saat mengembangkan Sintaks.

### Yang Dibahas
- Scope control — jangan nambah fitur di luar MVP, kontrol scope creep
- NOVA rules — NOVA hanya tersedia di Lesson/Module, TIDAK di Quiz (rule paling ketat)
- Code execution rules — kode user harus dijalankan di sandbox, jangan langsung di server
- Authorization rules — user hanya boleh akses data miliknya sendiri
- UI/UX rules — SVG icon wajib, emoji dilarang sebagai UI element
- Admin rules — apa yang boleh dilakukan admin
- Git rules — format commit message (feat:, fix:, refactor:, etc)
- Backend rules — ikuti Laravel conventions
- Database rules — migration adalah source of truth, bukan manual phpMyAdmin
- Dependency rules — sebelum tambah library baru, check dulu apakah sudah ada di framework

### Analogi Mudah
**RULES.md itu seperti hukum negara** — peraturan yang harus diikuti semua orang, kalau tidak akan dihukum (atau kode di-reject).

Contoh rule paling ketat: "NOVA TIDAK BOLEH ada di Quiz" — ini bukan saran, tapi **perintah absolute**.

### Siapa yang Perlu Baca?
- Developer (wajib)
- AI coding assistant (wajib)
- Tech lead (untuk enforce rules)

### Mudah Diingat
**"Do's & don'ts — apa boleh, apa jangan, apa harus."**

---

## SCHEMA.md

### Kegunaan
Dokumen database schema detail — **blueprint database Sintaks**. Ini menjelaskan struktur data di level paling detail.

### Yang Dibahas
- Tabel apa aja — daftar lengkap semua tabel (users, lessons, quiz, progress, xp, community, etc)
- Kolom per tabel — setiap tabel punya kolom apa (tipe data, nullable, default value)
- Primary key, foreign key, constraints — relasi antar tabel, aturan data
- Relationships antar tabel — tabel mana yang terhubung dengan tabel mana
- ER diagram (Entity Relationship Diagram) — visualisasi relasi tabel
- Indexing strategy — kolom mana yang perlu di-index untuk query cepat
- Migration order — urutan tabel harus dibuat (ada dependency)
- Soft delete decision — apakah pakai soft delete (di MVP: tidak)

### Analogi Mudah
**SCHEMA.md itu seperti struktur perpustakaan**:
- Ada tabel "Buku" (berisi title, author, ISBN)
- Ada tabel "Member" (berisi nama, email, ID member)
- Ada tabel "Peminjaman" (berisi member_id, book_id, tanggal peminjaman)
- Tabel "Peminjaman" terhubung ke tabel "Buku" dan "Member"

### Siapa yang Perlu Baca?
- Backend developer (wajib)
- Database administrator
- QA/Tester — untuk paham data flow
- DevOps — untuk setup database

### Mudah Diingat
**"Database design — tabel mana, kolom apa, relasi gimana."**

---

## Urutan Baca yang Disarankan

### Untuk Development (Optimal Order)

| # | File | Tujuan | Estimasi Waktu |
|---|------|--------|---|
| 1 | **PRD.md** | Paham "apa yang mau dibangun" | 30 menit |
| 2 | **ARCHITECTURE.md** | Paham "bagaimana struktur teknis" | 45 menit |
| 3 | **SCHEMA.md** | Paham "database gimana" | 30 menit |
| 4 | **RULES.md** | Paham "aturan yang wajib diikuti" | 20 menit |
| 5 | **DESAIN.md** | Paham "UI/UX gimana" | 40 menit |
| 6 | **README.md** | Praktik setup & running | 15 menit |

**Total: ~2.5 jam pertama kali**

### Untuk Role Spesifik

**Backend Developer:**
1. PRD.md → ARCHITECTURE.md → SCHEMA.md → RULES.md → README.md
2. DESAIN.md opsional (bagus untuk referensi API response)

**Frontend Developer:**
1. PRD.md → DESAIN.md → ARCHITECTURE.md → RULES.md → README.md
2. SCHEMA.md untuk paham data structure

**Designer/UI-UX:**
1. PRD.md → DESAIN.md
2. ARCHITECTURE.md hanya bagian UI flow
3. README.md hanya untuk paham setup

**QA/Tester:**
1. PRD.md (Acceptance Criteria) → RULES.md (constraint) → DESAIN.md (UI test case)
2. SCHEMA.md untuk paham data test case

**DevOps/Infrastructure:**
1. README.md → ARCHITECTURE.md → SCHEMA.md

---

## Quick Reference

### Kalau Anda Ingin Tahu...

| Pertanyaan | Baca File |
|-----------|-----------|
| "Apa sih Sintaks itu?" | PRD.md |
| "Gimana caranya sistem ini bekerja?" | ARCHITECTURE.md |
| "Database-nya struktur gimana?" | SCHEMA.md |
| "Warna tombol harus apa?" | DESAIN.md |
| "Boleh gak saya pakai emoji di UI?" | RULES.md |
| "Gimana cara setup project?" | README.md |
| "Boleh gak ada fitur X?" | RULES.md + PRD.md |
| "Gimana relasi user ke notes?" | SCHEMA.md |
| "NOVA boleh di Quiz gak?" | RULES.md (jawab: TIDAK) |

---

## Kesimpulan

Setiap file dokumentasi Sintaks punya peran spesifik:

1. **PRD.md** = "Apa yang dibangun"
2. **ARCHITECTURE.md** = "Bagaimana caranya"
3. **SCHEMA.md** = "Data disimpan gimana"
4. **RULES.md** = "Apa boleh dan tidak boleh"
5. **DESAIN.md** = "Terlihat gimana"
6. **README.md** = "Bagaimana cara mulai"

Membaca dokumentasi dengan urutan yang benar akan mempercepat Anda paham project dan bisa langsung produktif berkontribusi.

---

*EXPLANATION.md — Panduan memahami dokumentasi Sintaks untuk orang awam dan developer baru.*
