# RULES.md — Sintaks Development Rules

> Dokumen ini berisi aturan dan batasan yang **wajib dipatuhi** selama pengembangan Sintaks, baik oleh developer manusia maupun AI coding assistant.
>
> RULES.md bukan PRD, bukan Architecture Documentation, bukan Database Schema, dan bukan Design System. Gunakan dokumen yang tepat sesuai konteks yang dibutuhkan.

---

## Daftar Isi

1. [Hierarki Dokumentasi](#1-hierarki-dokumentasi)
2. [Product Scope](#2-product-scope)
3. [NOVA Rules](#3-nova-rules)
4. [Quiz Rules](#4-quiz-rules)
5. [Code Execution Rules](#5-code-execution-rules)
6. [User Notes Rules](#6-user-notes-rules)
7. [Learning Progress & XP Rules](#7-learning-progress--xp-rules)
8. [Community Rules](#8-community-rules)
9. [User Profile Rules](#9-user-profile-rules)
10. [Authorization Rules](#10-authorization-rules)
11. [Admin Rules](#11-admin-rules)
12. [Frontend Rules](#12-frontend-rules)
13. [Backend Rules](#13-backend-rules)
14. [Database Rules](#14-database-rules)
15. [API Rules](#15-api-rules)
16. [UI/UX Rules](#16-uiux-rules)
17. [Icon & Emoji Rules](#17-icon--emoji-rules)
18. [Error Handling Rules](#18-error-handling-rules)
19. [Accessibility Rules](#19-accessibility-rules)
20. [Code Quality Rules](#20-code-quality-rules)
21. [Dependency Rules](#21-dependency-rules)
22. [Git Rules](#22-git-rules)
23. [Scope Control](#23-scope-control)

---

## 1. Hierarki Dokumentasi

Setiap dokumen memiliki tanggung jawab yang berbeda dan tidak boleh saling menduplikasi secara berlebihan.

| Dokumen | Tanggung Jawab |
|---------|----------------|
| `PRD.md` | Apa yang dibangun dan product requirements |
| `ARCHITECTURE.md` | Bagaimana sistem dibangun secara teknis |
| `SCHEMA.md` | Bagaimana database dan data model disusun |
| `DESIGN.md` | Bagaimana UI/UX Sintaks harus terlihat dan berperilaku |
| `RULES.md` | Aturan dan batasan yang wajib dipatuhi selama development |
| `README.md` | Cara setup, menjalankan, dan memahami project |

Jika sebuah keputusan sudah didefinisikan di dokumen lain, RULES.md cukup memberikan constraint dan referensinya — tidak perlu menduplikasi seluruh isinya.

---

## 2. Product Scope

### Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React |
| Backend | Laravel 12 |
| Database | MySQL |
| Database Management | phpMyAdmin |

### Struktur Pembelajaran

```
Learning Path
    └── Module
            └── Lesson
            └── Quiz
```

### MVP Scope

Fitur yang diizinkan pada MVP:

| No | Fitur |
|----|-------|
| 1 | Authentication |
| 2 | User Profile |
| 3 | User Avatar |
| 4 | Python Learning Path |
| 5 | Module |
| 6 | Lesson / Materi |
| 7 | User Notes |
| 8 | NOVA AI Assistant |
| 9 | Theory Quiz |
| 10 | Code Writing Quiz |
| 11 | Code Completion Quiz |
| 12 | Automatic Code Evaluation |
| 13 | Test Case |
| 14 | Code Execution Sandbox |
| 15 | Learning Progress |
| 16 | XP |
| 17 | Level |
| 18 | Community |

### Out of Scope

Fitur-fitur berikut **MUST NOT** diimplementasikan pada MVP:

- Search (global, lesson, module, community)
- Notification
- Learning Streak
- Achievement & Badge
- Leaderboard
- Programming Skills pada profile
- Multiple programming language (selain Python)
- NOVA di dalam Quiz (dalam bentuk apapun)
- Complex recommendation system
- Social media feed
- Follower system
- Private messaging
- Video pembelajaran
- Enterprise-grade CMS

> **Catatan:** Arsitektur boleh dibuat cukup extensible agar bahasa pemrograman lain dan fitur tambahan dapat ditambahkan di masa depan. Namun ekstensi tersebut **tidak boleh diimplementasikan sekarang**.

---

## 3. NOVA Rules

NOVA adalah AI learning assistant yang bersifat context-aware terhadap Module dan Lesson yang sedang dipelajari.

### Ketersediaan NOVA

| Konteks | NOVA |
|---------|------|
| Module | ✅ Tersedia |
| Lesson | ✅ Tersedia |
| Quiz (semua tipe) | ❌ **TIDAK tersedia** |

### NOVA MUST NOT berada di dalam Quiz

Ini adalah aturan yang tidak boleh dilanggar dalam kondisi apapun:

- **MUST NOT** ada tombol "Ask NOVA" di halaman Quiz.
- **MUST NOT** ada NOVA hint di Quiz.
- **MUST NOT** ada NOVA error explanation di Quiz.
- **MUST NOT** ada NOVA yang membaca atau mengevaluasi jawaban Quiz.
- **MUST NOT** ada NOVA quiz assistant dalam bentuk apapun.

Jika user salah menjawab Quiz, sistem Quiz sendiri yang memberikan feedback — bukan NOVA.

Contoh feedback yang benar:

```
❌ Jawaban belum benar.

Penjelasan:
Gunakan operator == untuk melakukan perbandingan.

[ Coba Lagi ]
```

Bukan:

```
[ Tanya NOVA ]
```

### Yang Boleh Dilakukan NOVA

NOVA boleh:

- Menjelaskan konsep dari materi yang sedang dipelajari
- Menyederhanakan penjelasan
- Memberikan analogi dan contoh tambahan
- Merangkum materi atau module
- Menjelaskan bagian tertentu dari Lesson
- Menjelaskan isi catatan user (Note) jika relevan
- Menjelaskan error secara konseptual dalam konteks materi Lesson

### Yang Tidak Boleh Dilakukan NOVA

- **MUST NOT** menjadi chatbot general-purpose.
- **MUST NOT** menjawab pertanyaan di luar konteks pembelajaran Sintaks.
- **MUST NOT** memberikan jawaban langsung untuk soal Quiz dalam bentuk apapun, bahkan jika diminta secara tidak langsung.

---

## 4. Quiz Rules

### Aturan Akses

- Quiz hanya dapat diakses setelah **seluruh lesson** dalam module diselesaikan.
- Quiz berada di akhir setiap Module.

### Tipe Quiz

Quiz mendukung tiga tipe:

1. **Theory Question** — Pertanyaan pilihan ganda mengenai konsep.
2. **Code Writing** — User menulis kode dari awal untuk menyelesaikan problem.
3. **Code Completion** — User melengkapi bagian kode yang dikosongkan dengan memilih token yang tersedia.

### Alur Evaluasi

Setiap soal Quiz mengikuti alur:

```
Jawaban User
    ↓
Evaluasi Sistem
    ↓
Benar → Lanjut ke soal berikutnya
Salah → Feedback sistem → User mencoba lagi
```

### Feedback Quiz

- Feedback harus diberikan **langsung** setelah user menjawab.
- Feedback harus jelas dan mudah dipahami pemula.
- Feedback **MUST NOT** melibatkan NOVA dalam bentuk apapun.

### Code Writing Quiz

Flow evaluasi Code Writing:

```
Kode User
    ↓
Syntax Check
    ↓
Security Check
    ↓
Sandbox Execution
    ↓
Test Case Evaluation
    ↓
Result: Correct / Wrong Answer / Syntax Error / Runtime Error / Timeout
```

### Code Completion Quiz

- User diberikan kode dengan bagian yang dikosongkan.
- User memilih token dari daftar pilihan yang disediakan.
- Token yang dipilih ditempatkan ke posisi blank yang sesuai.
- Setelah semua blank terisi, user mengirim untuk dievaluasi.
- Evaluasi menggunakan mekanisme yang sama dengan Code Writing.

### Hasil Evaluasi Quiz

Hasil yang valid untuk Code Writing dan Code Completion:

- `Correct`
- `Wrong Answer`
- `Syntax Error`
- `Runtime Error`
- `Timeout`
- `Execution Error`

---

## 5. Code Execution Rules

### Aturan Utama

**MUST NOT** menjalankan kode user secara langsung di application server Laravel.

Pola berikut **dilarang keras**:

```
User Code → Laravel → execute()
```

### Sandbox Requirements

Kode user **MUST** dijalankan di isolated execution environment (sandbox) dengan minimal:

- CPU limit
- Memory limit
- Execution timeout
- Network restriction
- File system isolation
- Process restriction

Tujuan sandbox adalah mencegah malicious code memengaruhi server utama.

### Alur Eksekusi yang Benar

```
User Code
    ↓
Syntax Check
    ↓
Security Check
    ↓
Isolated Sandbox Execution
    ↓
Test Case Evaluation
    ↓
Result dikembalikan ke user
```

### Bahasa Pemrograman

Pada MVP, **hanya Python** yang didukung oleh code execution engine.

Detail arsitektur sandbox mengikuti `ARCHITECTURE.md`.

---

## 6. User Notes Rules

- Note **dimiliki sepenuhnya** oleh user yang membuatnya.
- Note **terhubung** dengan Lesson asal tempat note dibuat.
- User dapat membuat, melihat, dan menghapus note miliknya.
- User dapat membuka Lesson asal dari halaman Notes.

### Batasan Akses

- **MUST NOT** user mengakses Note milik user lain.
- **MUST NOT** user mengubah Note milik user lain.
- **MUST NOT** user menghapus Note milik user lain.

Validasi ownership Note **MUST** diterapkan di backend (Policy/Gate), bukan hanya di frontend.

### Emoji dalam Note

- Emoji **boleh** digunakan di dalam isi Note jika memang ditulis oleh user.
- Emoji **MUST NOT** digunakan sebagai UI icon pada fitur Notes.

---

## 7. Learning Progress & XP Rules

### Progress yang Disimpan

Sistem **MUST** menyimpan:

- Status completion setiap Lesson per user
- Persentase kemajuan setiap Module
- Status completion setiap Module
- Skor Quiz dan jumlah percobaan
- Total XP user

### Status Module

| Status | Keterangan |
|--------|------------|
| Not Started | Module tersedia, belum dimulai |
| In Progress | Setidaknya satu Lesson selesai |
| Completed | Seluruh Lesson dan Quiz selesai |
| Locked | Prerequisite belum diselesaikan |

### Aturan Prerequisite

- User **MUST** menyelesaikan module prerequisite sebelum module berikutnya dapat dibuka.
- Locking/unlocking module dikendalikan oleh sistem berdasarkan progress.

### XP

XP diberikan dari aktivitas berikut:

- Menyelesaikan Lesson
- Menyelesaikan Quiz
- Berhasil menjawab soal Code Writing atau Code Completion dengan benar

XP **MUST NOT** diberikan dari aktivitas di luar yang telah disebutkan di atas tanpa persetujuan product owner.

Aturan detail nilai XP per aktivitas mengikuti `PRD.md`.

### Gamifikasi MVP

Gamifikasi MVP **hanya** mencakup:

- XP
- Level

**MUST NOT** mengimplementasikan:

- Streak
- Achievement
- Badge
- Leaderboard

---

## 8. Community Rules

Community adalah fitur social learning sederhana untuk berbagi dan diskusi antar pengguna.

### Fitur yang Diizinkan

- Membuat Community (nama & deskripsi)
- Join Community
- Leave Community
- Melihat daftar Community dan Community yang diikuti
- Kirim dan baca pesan dalam Community
- Melihat anggota Community

### Batasan Community

**MUST NOT** mengimplementasikan:

- Private messaging
- Forum berthread
- Reaction pada pesan
- Attachment / file upload
- Voice chat / video call
- Moderasi hierarkis
- Feed algorithm atau recommendation system
- Follower system
- Like economy / social ranking
- Notification sistem Community

### Prinsip Utama

- Community **MUST NOT** mengubah Sintaks menjadi platform social media.
- Community bukan pengganti NOVA.
- Jika fitur moderation diperlukan, gunakan solusi yang paling sederhana.

Detail skema Community mengikuti `SCHEMA.md`.

---

## 9. User Profile Rules

### Informasi yang Ditampilkan di Profile

Profile boleh menampilkan:

- Avatar
- Username
- XP
- Level
- Learning Progress (progress module)
- Daftar Completed Modules

### Yang MUST NOT Ada di Profile

- Programming Skills (skill rating, skill percentage, technology list)
- Skill chart atau skill ranking
- Streak
- Achievement / Badge
- Leaderboard rank

---

## 10. Authorization Rules

Setiap user **hanya boleh mengakses resource miliknya sendiri**.

Contoh aturan yang **MUST** diterapkan:

- User A **MUST NOT** membaca, mengubah, atau menghapus Note milik User B.
- User A **MUST NOT** mengubah atau memanipulasi Progress User B.
- User A **MUST NOT** mengubah Profile User B.
- Akses Community **MUST** disesuaikan dengan membership dan permission yang berlaku.

Authorization **MUST** diterapkan menggunakan **Policy / Gate Laravel** di sisi backend.

Jangan mengandalkan frontend saja untuk authorization check.

---

## 11. Admin Rules

Admin bertanggung jawab terhadap content management Sintaks.

### Yang Dapat Dikelola Admin

- Learning Path (buat, edit, hapus, urutkan)
- Module (buat, edit, hapus, urutkan, atur prerequisite)
- Lesson (buat, edit, hapus, kelola seluruh elemen konten)
- Quiz (buat, edit, hapus soal beserta tipe, jawaban, dan penjelasan)
- Coding Question (buat, edit, hapus beserta starter code, test case, time limit, memory limit)
- Test Case (tentukan public dan hidden test case)

### Batasan Admin

- Admin **MUST NOT** mengubah data user secara sembarangan.
- Admin **MUST NOT** mengakses Note atau Progress user tanpa alasan yang valid.
- Admin CMS **MUST** tetap sederhana dan fungsional — bukan enterprise-grade.

---

## 12. Frontend Rules

Frontend menggunakan **React**.

### Aturan Wajib

- Gunakan component-based architecture.
- Buat component yang reusable dan single-responsibility.
- Hindari component yang terlalu besar; pecah jika terlalu kompleks.
- **MUST NOT** menaruh business logic kompleks langsung di JSX.
- Hindari duplikasi UI logic.
- Gunakan naming convention yang konsisten di seluruh codebase.
- Gunakan state management sesuai kebutuhan — jangan over-engineer.
- **MUST NOT** menambahkan library baru tanpa alasan yang jelas.

Detail struktur project mengikuti `ARCHITECTURE.md`.

---

## 13. Backend Rules

Backend menggunakan **Laravel 12**.

### Aturan Wajib

- Ikuti Laravel conventions.
- Controller **MUST** tetap sederhana — hanya menangani HTTP request dan response.
- Business logic kompleks **MUST NOT** ditumpuk di Controller.
- Gunakan **Form Request** untuk validasi input.
- Gunakan **Policy / Gate** untuk authorization.
- Gunakan Service atau Action class jika business logic membutuhkan abstraction yang nyata.
- **MUST NOT** membuat abstraction hanya untuk terlihat clean tanpa kebutuhan yang jelas.
- **MUST NOT** menduplikasi business logic.
- **MUST NOT** mengekspose sensitive information melalui response API.

---

## 14. Database Rules

Database menggunakan **MySQL**, dikelola melalui **phpMyAdmin**.

### Source of Truth

**Laravel Migration adalah source of truth untuk database schema.**

phpMyAdmin digunakan untuk:
- Melihat dan meng-query database
- Debugging
- Database administration

**MUST NOT** menjadikan perubahan manual di phpMyAdmin sebagai satu-satunya cara mengubah schema. Semua perubahan schema **MUST** direfleksikan dalam Migration.

### Aturan Schema

- Gunakan **foreign key** untuk setiap relationship.
- Gunakan **index** pada field yang sering digunakan sebagai kondisi query.
- Hindari duplikasi data.
- Gunakan `timestamps` jika relevan.
- Gunakan naming convention yang konsisten di seluruh schema.
- **MUST NOT** menyimpan data yang tidak diperlukan.

Detail schema mengikuti `SCHEMA.md`.

---

## 15. API Rules

### Aturan Wajib

- API **MUST** konsisten dalam format request dan response.
- Gunakan pendekatan **RESTful** jika sesuai.
- Setiap endpoint **MUST** memiliki validasi input.
- Setiap endpoint **MUST** memiliki authorization check yang sesuai.
- Error response **MUST** memiliki format yang jelas dan konsisten.
- **MUST NOT** mengekspose sensitive information (password, token, data internal) dalam response.
- **MUST NOT** membuat endpoint baru jika endpoint yang sudah ada masih dapat digunakan.

Detail arsitektur API mengikuti `ARCHITECTURE.md`.

---

## 16. UI/UX Rules

Sintaks adalah platform e-learning. Desain harus mencerminkan karakter educational, bukan social media atau enterprise dashboard.

### Prinsip Desain

- Clean, modern, dan friendly.
- Light theme sebagai pendekatan utama.
- Prioritaskan readability dan clear hierarchy.
- Navigasi harus mudah dan intuitif.
- Feedback kepada user harus jelas dan tidak membingungkan.

### Yang MUST NOT Dilakukan

- **MUST NOT** membuat UI yang terlalu ramai atau dark-heavy.
- **MUST NOT** membuat UI yang menyerupai social media feed.
- **MUST NOT** membuat dashboard enterprise yang terlalu kompleks.

Detail design system mengikuti `DESIGN.md`.

---

## 17. Icon & Emoji Rules

### Aturan Utama

**MUST NOT** menggunakan emoji sebagai UI icon.

Contoh yang **dilarang**:

```
🐍 Python
🤖 NOVA
⭐ Notes
🔥 XP
📚 Learning
💻 Coding
```

Gunakan **SVG icon** dengan satu style yang konsisten di seluruh aplikasi.

Contoh yang benar:

```
[SVG Python Icon] Python
[SVG AI Icon] NOVA
[SVG Bookmark Icon] Notes
[SVG Star Icon] XP
[SVG Book Icon] Learning
```

### Pengecualian

Emoji **boleh** digunakan jika merupakan bagian dari:

- User-generated content (pesan Community, Note user)
- Contoh kode dalam materi pembelajaran
- Konten Lesson

Konteks di atas adalah konten, bukan UI. Jangan samakan keduanya.

---

## 18. Error Handling Rules

### Prinsip Utama

Error **MUST** mudah dipahami oleh user — hindari menampilkan technical error mentah.

**MUST NOT** menampilkan:

```
500 Internal Server Error
```

Gunakan pesan yang informatif:

```
Terjadi kesalahan saat menyimpan catatan. Silakan coba lagi.
```

### Error pada Code Execution

Untuk coding error, tampilkan:

- Jenis error (Syntax Error, Runtime Error, Timeout, dll.)
- Lokasi error jika tersedia
- Penjelasan singkat yang dapat dipahami pemula
- Arahan agar user dapat memperbaiki kode

Error dari code execution **MUST NOT** menggunakan NOVA untuk penjelasannya — sistem yang memberikan feedback, bukan NOVA.

---

## 19. Accessibility Rules

Implementasi aksesibilitas minimal yang **MUST** dipenuhi:

- Keyboard navigation harus berfungsi pada elemen utama.
- Setiap elemen form **MUST** memiliki label yang proper.
- Setiap button **MUST** memiliki accessible label — terutama icon-only button.
- SVG icon **MUST** memiliki `aria-label` atau `title` yang deskriptif.
- Kontras warna antara teks dan latar belakang **MUST** memadai.
- Pesan error **MUST** ditampilkan secara eksplisit — **MUST NOT** mengandalkan warna saja untuk menunjukkan status.

---

## 20. Code Quality Rules

### Naming & Structure

- Gunakan meaningful naming — nama variabel, fungsi, dan komponen harus mencerminkan tujuannya.
- Hindari duplikasi kode; gunakan abstraksi jika memang diperlukan.
- Hindari function atau component yang terlalu panjang; pecah jika perlu.
- Hapus unused code sebelum merge.

### Keamanan

- **MUST NOT** hardcode secret, API key, atau password di dalam kode.
- **MUST NOT** commit API key, password, atau credential ke repository.
- **MUST NOT** mengekspose data sensitif melalui response atau log.

### Kebersihan Kode

- Hapus semua `console.log`, `dd()`, dan statement debug sebelum production.
- **MUST NOT** membuat workaround yang merusak arsitektur hanya untuk menyelesaikan bug sementara.
- **MUST NOT** menambahkan kompleksitas yang tidak diperlukan sebagai solusi.

---

## 21. Dependency Rules

Sebelum menambahkan dependency baru, lakukan pengecekan berikut secara berurutan:

1. Apakah functionality sudah tersedia dari framework (Laravel atau React)?
2. Apakah project sudah memiliki library yang dapat digunakan untuk kebutuhan ini?
3. Jika library baru memang diperlukan, apakah library tersebut mature dan well-maintained?
4. Apakah library ini benar-benar diperlukan, atau ini over-engineering?

**MUST NOT** menambahkan dependency hanya untuk menyelesaikan masalah kecil yang dapat diselesaikan dengan kode sederhana.

---

## 22. Git Rules

### Format Commit Message

Gunakan format: `type: deskripsi singkat`

| Type | Kapan Digunakan |
|------|-----------------|
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `refactor` | Refactoring tanpa mengubah behavior |
| `style` | Perubahan tampilan / styling |
| `docs` | Pembaruan dokumentasi |
| `test` | Menambahkan atau mengubah test |
| `chore` | Maintenance / konfigurasi |

Contoh commit yang baik:

```
feat: add lesson progress tracking
feat: add nova lesson assistant
feat: add code completion quiz
fix: fix quiz evaluation logic
fix: fix note ownership validation
refactor: simplify quiz feedback handler
style: update lesson layout
docs: update architecture documentation
```

### Yang MUST NOT Dilakukan

**MUST NOT** menggunakan commit message yang tidak informatif:

```
update
fix
test
final
final2
aaa
temporary
```

---

## 23. Scope Control

### Aturan Terpenting

**Jangan menambahkan fitur hanya karena fitur tersebut "mungkin bagus" atau "bisa berguna nanti".**

Jika sebuah fitur tidak ada di `PRD.md` dan belum disepakati oleh product owner, fitur tersebut **MUST NOT** diimplementasikan.

### Prosedur Jika Menemukan Ide Fitur Baru

1. **Jangan langsung implementasikan.**
2. Tandai sebagai future consideration.
3. Tanyakan kepada product owner dan tunggu keputusan.

Tujuannya adalah mencegah scope creep yang dapat memperlambat delivery MVP dan menambah kompleksitas yang tidak perlu.

---

## Most Important Product Rules

Jika terjadi konflik antara keputusan implementasi dan product intent, selalu prioritaskan aturan berikut:

1. Sintaks adalah **learning platform**, bukan social media.
2. Learning flow harus sederhana dan tidak membingungkan pemula.
3. **Python adalah satu-satunya language pada MVP.**
4. NOVA hanya tersedia di Module dan Lesson.
5. **NOVA MUST NOT tersedia di Quiz dalam bentuk apapun.**
6. Quiz dievaluasi sepenuhnya oleh sistem — bukan oleh NOVA.
7. Kode user **MUST** dijalankan di dalam sandbox yang terisolasi.
8. User hanya boleh mengakses data miliknya sendiri.
9. Jangan menambahkan fitur di luar scope yang telah disepakati.
10. Jangan over-engineer.
11. UI harus clean, educational, dan light-oriented.
12. Gunakan SVG icon — **MUST NOT** menggunakan emoji sebagai UI icon.
13. Prioritaskan simplicity dan maintainability di atas segalanya.

---

*RULES.md — Sintaks MVP. Dokumen ini berlaku sebagai guardrails selama development dan harus dipatuhi oleh seluruh anggota tim maupun AI coding assistant yang terlibat dalam pengembangan Sintaks.*
