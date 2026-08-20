# Product Requirements Document — Sintaks

> **Versi:** 1.0 — MVP
> **Status:** Draft
> **Bahasa:** Indonesia

---

## Daftar Isi

1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Product Vision](#3-product-vision)
4. [Goals](#4-goals)
5. [Non-Goals](#5-non-goals)
6. [Target Users](#6-target-users)
7. [User Roles](#7-user-roles)
8. [Core User Journey](#8-core-user-journey)
9. [Product Structure](#9-product-structure)
10. [Functional Requirements](#10-functional-requirements)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [MVP Scope](#12-mvp-scope)
13. [Out of Scope](#13-out-of-scope)
14. [Acceptance Criteria](#14-acceptance-criteria)
15. [Future Considerations](#15-future-considerations)
16. [Requirement Decisions](#16-requirement-decisions)

---

## 1. Product Overview

**Nama Produk:** Sintaks

**Tagline:** *"Sintaks — Jembatan dari Baris Pertama Menuju Developer Profesional"*

**Deskripsi Singkat:**
Sintaks adalah platform pembelajaran programming interaktif berbahasa Indonesia yang membantu pengguna belajar pemrograman secara bertahap dan terstruktur.

Pengalaman belajar pada Sintaks terinspirasi dari pola pembelajaran interaktif seperti Duolingo dan Sideme: Learn Coding, namun berfokus secara penuh pada pembelajaran programming. Materi disusun dalam Bahasa Indonesia agar lebih mudah dipahami oleh pelajar lokal.

**Konsep Utama Produk:**

| No | Konsep | Deskripsi Singkat |
|----|--------|-------------------|
| 1 | Structured Learning | Pembelajaran bertahap melalui Learning Path → Module → Lesson → Quiz |
| 2 | Interactive Learning Material | Materi dilengkapi contoh kode, output, tips, dan poin penting |
| 3 | Personal Notes | User dapat menyimpan catatan pribadi dari materi yang dipelajari |
| 4 | Context-aware AI Tutor (NOVA) | Asisten AI yang memahami konteks materi yang sedang dipelajari user |
| 5 | Interactive Quiz | Kuis interaktif dengan tiga tipe: Theory, Code Writing, Code Completion |
| 6 | Automatic Code Evaluation | Evaluasi kode otomatis dengan test case dan sandbox eksekusi |
| 7 | Progress Tracking | Sistem melacak progress pembelajaran user per lesson dan module |
| 8 | XP | Sistem poin sederhana sebagai motivasi belajar |
| 9 | Community Sharing | Ruang diskusi antar user untuk berbagi pengalaman belajar |

---

## 2. Problem Statement

Banyak pemula yang ingin belajar programming di Indonesia menghadapi kendala berikut:

- **Keterbatasan bahasa:** Mayoritas sumber belajar programming tersedia dalam Bahasa Inggris, sehingga menjadi hambatan bagi pemula yang belum mahir berbahasa Inggris.
- **Kurangnya struktur:** Pemula sering kebingungan menentukan urutan materi yang harus dipelajari dan tidak memiliki panduan yang jelas.
- **Tidak ada feedback langsung:** Pemula kesulitan mengetahui apakah kode yang mereka tulis sudah benar tanpa bimbingan dari instruktur.
- **Belajar secara pasif:** Sebagian besar sumber belajar hanya menyajikan teks atau video tanpa memberikan kesempatan praktik langsung dan evaluasi otomatis.
- **Tidak ada pendampingan kontekstual:** Ketika pemula bingung pada suatu materi, mereka tidak memiliki tempat bertanya yang memahami konteks materi tersebut secara langsung.

---

## 3. Product Vision

Sintaks menjadi platform pembelajaran programming berbahasa Indonesia yang paling mudah diakses dan paling efektif bagi pemula, dengan menggabungkan struktur pembelajaran bertahap, latihan kode langsung, evaluasi otomatis, dan pendampingan AI yang relevan dengan materi.

---

## 4. Goals

**G-01 — Pembelajaran Terstruktur**
Menyediakan learning path yang terorganisir sehingga pemula dapat belajar programming secara bertahap tanpa kebingungan menentukan langkah selanjutnya.

**G-02 — Praktik Langsung**
Memberikan kesempatan kepada user untuk langsung menulis dan menjalankan kode di dalam platform, dengan evaluasi otomatis berbasis test case.

**G-03 — Pendampingan Kontekstual**
Menyediakan AI tutor (NOVA) yang memahami konteks materi yang sedang dipelajari, sehingga user dapat bertanya dan mendapatkan penjelasan yang relevan.

**G-04 — Feedback Segera**
Memberikan feedback langsung setelah user mengerjakan quiz, baik untuk jawaban benar maupun salah, sehingga user dapat belajar dari setiap percobaan.

**G-05 — Bahasa yang Inklusif**
Seluruh materi, antarmuka, dan interaksi tersedia dalam Bahasa Indonesia agar mudah dipahami oleh pemula lokal.

**G-06 — Motivasi Berkelanjutan**
Mendorong user untuk terus belajar melalui sistem XP dan progress tracking yang jelas.

**G-07 — Komunitas Pendukung**
Menyediakan ruang komunitas sederhana agar user dapat saling berbagi pengalaman dan berdiskusi.

---

## 5. Non-Goals

Berikut adalah hal-hal yang **bukan** tujuan Sintaks pada fase MVP:

- Menjadi platform kursus berbayar lengkap seperti Udemy atau Coursera.
- Menyediakan sertifikasi resmi untuk pembelajaran.
- Mendukung multiple programming language pada MVP (selain Python).
- Menyediakan fitur live coding bersama instruktur.
- Menjadi chatbot general-purpose (NOVA hanya kontekstual terhadap materi).
- Menyediakan konten video.
- Membangun fitur sosial yang kompleks seperti private messaging, forum berthread, atau moderasi komunitas yang hierarkis.

---

## 6. Target Users

### Primary Users

| Segmen | Karakteristik |
|--------|---------------|
| Mahasiswa | Sedang menempuh pendidikan tinggi, ingin belajar programming sebagai keterampilan tambahan atau bagian dari kurikulum |
| Pelajar | Siswa SMA/SMK yang tertarik mengenal dunia programming sejak dini |
| Pemula Absolut | Individu yang sama sekali belum pernah belajar programming dan ingin memulai dari nol |
| Calon Software Developer | Individu yang memiliki tujuan karier sebagai developer dan membutuhkan fondasi yang kuat |

### Secondary Users

| Segmen | Karakteristik |
|--------|---------------|
| Developer Pemula | Individu yang sudah mulai coding namun ingin memperkuat fondasi dasar |
| Career Switcher | Profesional dari bidang lain yang ingin beralih ke dunia teknologi |

### Admin

Admin adalah pengelola internal Sintaks yang bertugas mengelola dan memperbarui konten pembelajaran, quiz, dan soal coding di dalam platform.

---

## 7. User Roles

### Role: Guest

User yang belum melakukan login.

| Akses | Keterangan |
|-------|------------|
| Halaman publik | Dapat melihat halaman beranda, informasi produk, dan learning path yang tersedia |
| Pembelajaran | Tidak dapat mengakses materi, quiz, atau fitur personal |
| Autentikasi | Harus login atau register untuk menggunakan fitur pembelajaran |

### Role: User

User yang telah melakukan login dan memiliki akun aktif.

| Akses | Keterangan |
|-------|------------|
| Learning Path | Memilih dan mengikuti learning path (Python) |
| Module & Lesson | Membaca materi, melihat contoh kode, menyelesaikan lesson |
| Personal Notes | Membuat, melihat, dan menghapus catatan pribadi |
| NOVA | Bertanya kepada NOVA dalam konteks Module/Lesson |
| Quiz | Mengerjakan quiz Theory, Code Writing, dan Code Completion |
| Progress | Melihat progress pembelajaran |
| XP | Mendapatkan dan melihat total XP |
| Profile & Avatar | Mengelola profil dan memilih avatar |
| Community | Membuat, bergabung, meninggalkan community, dan mengirim pesan |

### Role: Admin

Admin internal Sintaks yang mengelola konten platform.

| Akses | Keterangan |
|-------|------------|
| Learning Path | Membuat, mengedit, menghapus, dan mengurutkan learning path |
| Module | Membuat, mengedit, menghapus, mengurutkan, dan mengatur prerequisite module |
| Lesson | Membuat, mengedit, menghapus konten lesson termasuk kode, output, tips, dan referensi |
| Quiz | Membuat, mengedit, menghapus soal quiz beserta jawaban dan penjelasan |
| Coding Question | Mengelola starter code, test case, expected output, time limit, dan memory limit |

---

## 8. Core User Journey

### Journey Utama: Pembelajaran

```
Register / Login
       ↓
   Dashboard
       ↓
 Pilih Python (Learning Path)
       ↓
   Pilih Module
       ↓
   Pilih Lesson
       ↓
   Baca Materi
       ↓
[Opsional] Simpan Note
       ↓
[Opsional] Bertanya kepada NOVA
       ↓
 Selesaikan Lesson
       ↓
Lanjut ke Lesson berikutnya
       ↓
Semua Lesson dalam Module selesai
       ↓
      Quiz
       ↓
Theory / Code Writing / Code Completion
       ↓
    Evaluasi Sistem
  ↙              ↘
Salah           Benar
  ↓               ↓
Feedback       Lanjut ke
Sistem         pertanyaan
  ↓            berikutnya
Coba lagi          ↓
              Quiz Selesai
                   ↓
           Module Completed
                   ↓
              Mendapat XP
                   ↓
       Module berikutnya terbuka
                   ↓
          Continue Learning
```

**Catatan Penting — Batas NOVA:**

| Kondisi | NOVA |
|---------|------|
| User membaca Lesson | ✅ Tersedia |
| User berada di dalam Module | ✅ Tersedia |
| User mengerjakan Quiz (semua tipe) | ❌ Tidak tersedia |

### Journey: Komunitas

```
User membuka halaman Community
       ↓
   Browse Community
  ↙            ↘
Join           Buat Community Baru
Community           ↓
  ↓           Isi nama & deskripsi
Masuk ke           ↓
Community      Community dibuat
  ↓                ↓
Kirim Pesan    Masuk sebagai Owner
  ↓
Lihat Pesan Anggota Lain
```

---

## 9. Product Structure

### Hierarki Konten Pembelajaran

```
Learning Path
    └── Module (berurutan, dapat dikunci)
            └── Lesson (berurutan)
            └── Quiz (setelah semua Lesson selesai)
                    ├── Theory Question
                    ├── Code Writing
                    └── Code Completion
```

### Learning Path MVP

Pada MVP, hanya terdapat satu Learning Path:

**Python**

Contoh struktur module:

```
Python
├── Module 01 — Python Fundamentals
│   ├── Apa itu Python?
│   ├── Syntax Dasar
│   ├── Variable
│   ├── Data Types
│   └── Quiz
│
├── Module 02 — Operator
│   ├── Arithmetic
│   ├── Comparison
│   ├── Logical
│   └── Quiz
│
├── Module 03 — Conditional
│   ├── if
│   ├── elif
│   ├── else
│   └── Quiz
│
└── Module 04 — Loop
    ├── for
    ├── while
    └── Quiz
```

### Status Module

| Status | Keterangan |
|--------|------------|
| Not Started | Module tersedia namun belum dimulai |
| In Progress | Setidaknya satu lesson telah diselesaikan |
| Completed | Seluruh lesson dan quiz telah diselesaikan |
| Locked | Module sebelumnya (prerequisite) belum diselesaikan |

### Konten Lesson

Setiap Lesson dapat berisi satu atau lebih elemen berikut:

| Elemen | Keterangan |
|--------|------------|
| Explanation | Penjelasan konsep utama |
| Code Example | Contoh kode yang relevan |
| Output | Hasil eksekusi dari contoh kode |
| Key Points | Poin-poin penting yang harus diingat |
| Tips | Saran praktis terkait materi |
| Illustration | Ilustrasi visual jika diperlukan |
| References | Referensi sumber terkait |
| Common Mistakes | Kesalahan umum yang sering dilakukan pemula |

---

## 10. Functional Requirements

### Authentication

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-AUTH-01 | Register | User dapat membuat akun baru dengan email dan password | MUST |
| FR-AUTH-02 | Login | User dapat masuk menggunakan email dan password | MUST |
| FR-AUTH-03 | Logout | User dapat keluar dari sesi aktif | MUST |
| FR-AUTH-04 | Password Reset | User dapat mengajukan reset password melalui email | SHOULD |
| FR-AUTH-05 | Role Assignment | Sistem membedakan role User dan Admin | MUST |
| FR-AUTH-06 | Session Management | Sesi login dikelola dengan aman dan memiliki masa berlaku | MUST |

---

### Learning Path

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-LP-01 | Tampil Learning Path | User dapat melihat daftar Learning Path yang tersedia | MUST |
| FR-LP-02 | Pilih Learning Path | User dapat memilih Learning Path untuk memulai pembelajaran | MUST |
| FR-LP-03 | Satu Learning Path MVP | Pada MVP, hanya Learning Path Python yang tersedia | MUST |
| FR-LP-04 | Status Enrollment | Sistem mencatat apakah user sudah memilih suatu Learning Path | MUST |

---

### Module

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-MOD-01 | Daftar Module | User dapat melihat daftar module dalam Learning Path yang dipilih | MUST |
| FR-MOD-02 | Urutan Module | Module ditampilkan sesuai urutan yang telah ditentukan | MUST |
| FR-MOD-03 | Status Module | Setiap module memiliki status: Not Started, In Progress, Completed, atau Locked | MUST |
| FR-MOD-04 | Module Locking | Module yang memiliki prerequisite akan terkunci hingga module sebelumnya diselesaikan | MUST |
| FR-MOD-05 | Buka Module | User dapat membuka module yang tersedia (tidak dalam status Locked) | MUST |
| FR-MOD-06 | Progress Module | Sistem menampilkan persentase kemajuan per module | MUST |

---

### Lesson

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-LES-01 | Daftar Lesson | User dapat melihat daftar lesson dalam satu module | MUST |
| FR-LES-02 | Baca Lesson | User dapat membaca materi lesson secara lengkap | MUST |
| FR-LES-03 | Konten Lesson | Lesson dapat menampilkan explanation, code example, output, key points, tips, illustration, references, dan common mistakes | MUST |
| FR-LES-04 | Selesaikan Lesson | User dapat menandai lesson sebagai selesai setelah membaca materi | MUST |
| FR-LES-05 | Status Lesson | Sistem menyimpan status completion setiap lesson per user | MUST |
| FR-LES-06 | Urutan Lesson | Lesson ditampilkan sesuai urutan yang telah ditentukan dalam module | MUST |
| FR-LES-07 | Navigasi Lesson | User dapat berpindah ke lesson berikutnya atau kembali ke lesson sebelumnya | MUST |
| FR-LES-08 | Quiz Setelah Lesson | Setelah semua lesson dalam module selesai, user dapat mengakses quiz module tersebut | MUST |

---

### Notes

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-NOTE-01 | Buat Note | User dapat membuat catatan pribadi dari konten yang ada dalam lesson | MUST |
| FR-NOTE-02 | Relasi Note ke Lesson | Setiap note terhubung dengan lesson asal tempat note dibuat | MUST |
| FR-NOTE-03 | Lihat Note | User dapat melihat seluruh note yang pernah dibuat | MUST |
| FR-NOTE-04 | Hapus Note | User dapat menghapus note yang tidak diperlukan | MUST |
| FR-NOTE-05 | Navigasi ke Lesson Asal | User dapat membuka kembali lesson yang menjadi sumber note | MUST |
| FR-NOTE-06 | NOVA dan Note | NOVA dapat menggunakan note user sebagai konteks tambahan jika relevan dengan percakapan dalam Module/Lesson | SHOULD |
| FR-NOTE-07 | Note Bersifat Personal | Note hanya dapat dilihat oleh user pemiliknya | MUST |

---

### NOVA — AI Learning Assistant

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-NOVA-01 | Ketersediaan NOVA | NOVA hanya tersedia pada konteks Module dan Lesson, tidak tersedia di Quiz | MUST |
| FR-NOVA-02 | Context Awareness | NOVA mendapatkan konteks berupa Learning Path, Module, Lesson, materi lesson, contoh kode, key points, dan note user yang relevan sebelum menjawab | MUST |
| FR-NOVA-03 | Fitur Ask | User dapat mengajukan pertanyaan mengenai materi yang sedang dipelajari | MUST |
| FR-NOVA-04 | Fitur Explain | User dapat meminta NOVA memberikan penjelasan yang lebih sederhana atas suatu konsep | MUST |
| FR-NOVA-05 | Fitur Example | User dapat meminta NOVA memberikan contoh tambahan terkait materi | MUST |
| FR-NOVA-06 | Fitur Summarize | User dapat meminta NOVA merangkum materi atau module yang sedang dipelajari | MUST |
| FR-NOVA-07 | Fitur Error Explanation | Jika terdapat contoh kode dalam konteks materi, NOVA dapat membantu menjelaskan error secara konseptual | SHOULD |
| FR-NOVA-08 | Fitur Explain Note | User dapat meminta NOVA menjelaskan kembali isi catatan yang telah dibuat | SHOULD |
| FR-NOVA-09 | Peran sebagai Tutor | NOVA berperan sebagai tutor yang membimbing pemahaman, bukan sekadar mesin pemberi jawaban langsung | MUST |
| FR-NOVA-10 | Tidak Ada di Quiz | NOVA tidak memberikan hint, penjelasan error, atau feedback terhadap jawaban quiz dalam bentuk apapun | MUST |

---

### Quiz

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-QUIZ-01 | Akses Quiz | Quiz hanya dapat diakses setelah seluruh lesson dalam module diselesaikan | MUST |
| FR-QUIZ-02 | Tiga Tipe Quiz | Quiz mendukung tiga tipe: Theory Question, Code Writing, dan Code Completion | MUST |
| FR-QUIZ-03 | Urutan Pertanyaan | Soal quiz ditampilkan dalam urutan yang telah ditentukan | MUST |
| FR-QUIZ-04 | Feedback Langsung | Setelah user menjawab satu soal, sistem langsung memberikan feedback benar atau salah | MUST |
| FR-QUIZ-05 | Feedback Benar | Jika jawaban benar, sistem menampilkan pesan konfirmasi dan user dapat melanjutkan ke soal berikutnya | MUST |
| FR-QUIZ-06 | Feedback Salah | Jika jawaban salah, sistem menampilkan pesan kesalahan beserta penjelasan konsep singkat jika tersedia, dan user dapat mencoba kembali | MUST |
| FR-QUIZ-07 | Lanjut ke Soal Berikutnya | User dapat melanjutkan ke soal berikutnya setelah menjawab dengan benar | MUST |
| FR-QUIZ-08 | Quiz Selesai | Setelah semua soal dijawab benar, quiz dinyatakan selesai dan module ditandai sebagai Completed | MUST |
| FR-QUIZ-09 | XP dari Quiz | User mendapatkan XP setelah menyelesaikan quiz dengan benar | MUST |
| FR-QUIZ-10 | Tidak Ada NOVA | NOVA tidak tersedia dalam semua tipe quiz | MUST |

**Theory Question**

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-QUIZ-TH-01 | Tampil Soal Theory | Sistem menampilkan pertanyaan pilihan ganda beserta pilihan jawaban | MUST |
| FR-QUIZ-TH-02 | Pilih Jawaban | User memilih satu jawaban dari pilihan yang tersedia | MUST |
| FR-QUIZ-TH-03 | Evaluasi Jawaban | Sistem mengevaluasi pilihan user dan menentukan benar atau salah | MUST |

**Code Writing**

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-QUIZ-CW-01 | Tampil Problem | Sistem menampilkan deskripsi problem yang harus diselesaikan user dengan menulis kode | MUST |
| FR-QUIZ-CW-02 | Code Editor | User diberikan code editor untuk menulis kode dari awal | MUST |
| FR-QUIZ-CW-03 | Submit Kode | User dapat menekan tombol "Run Code" atau "Check Answer" untuk mengirim kode | MUST |
| FR-QUIZ-CW-04 | Evaluasi Otomatis | Sistem melakukan syntax check, security check, eksekusi kode di sandbox, dan evaluasi test case | MUST |
| FR-QUIZ-CW-05 | Hasil Evaluasi | Sistem mengembalikan salah satu hasil: Syntax Error, Runtime Error, Wrong Answer, atau Correct | MUST |
| FR-QUIZ-CW-06 | Feedback Error | Jika terdapat error, sistem menampilkan jenis dan lokasi error yang relevan | MUST |
| FR-QUIZ-CW-07 | Perbaiki Kode | User dapat memperbaiki kode dan mengirim ulang | MUST |

**Code Completion**

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-QUIZ-CC-01 | Tampil Kode Tidak Lengkap | Sistem menampilkan kode dengan bagian yang sengaja dikosongkan | MUST |
| FR-QUIZ-CC-02 | Token Pilihan | Sistem menyediakan daftar token pilihan yang dapat dipilih user untuk mengisi bagian kosong | MUST |
| FR-QUIZ-CC-03 | Pilih Token | User memilih token dan menempatkannya ke bagian kosong yang sesuai | MUST |
| FR-QUIZ-CC-04 | Submit Kode Lengkap | Setelah semua bagian kosong terisi, user dapat mengirim kode untuk dievaluasi | MUST |
| FR-QUIZ-CC-05 | Evaluasi Kode Completion | Sistem melakukan syntax check, eksekusi kode, dan evaluasi test case | MUST |
| FR-QUIZ-CC-06 | Feedback dan Perbaikan | Sistem memberikan feedback atas hasil evaluasi; user dapat memperbaiki jika salah | MUST |

---

### Code Execution

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-CODE-01 | Syntax Validation | Sebelum eksekusi, sistem melakukan syntax check terhadap kode user | MUST |
| FR-CODE-02 | Security Validation | Sistem melakukan pemeriksaan keamanan untuk mendeteksi kode berbahaya sebelum eksekusi | MUST |
| FR-CODE-03 | Sandbox Execution | Kode user dieksekusi di lingkungan sandbox yang terisolasi, terpisah dari server utama | MUST |
| FR-CODE-04 | Test Case Evaluation | Sistem mengevaluasi output eksekusi kode terhadap public test case dan hidden test case yang telah ditentukan | MUST |
| FR-CODE-05 | Public Test Case | Terdapat test case yang ditampilkan kepada user sebagai referensi | SHOULD |
| FR-CODE-06 | Hidden Test Case | Terdapat test case tersembunyi yang digunakan untuk memastikan solusi tidak dibuat khusus untuk contoh tertentu | MUST |
| FR-CODE-07 | Timeout | Eksekusi kode memiliki batas waktu untuk mencegah infinite loop atau eksekusi berlebihan | MUST |
| FR-CODE-08 | Hasil Evaluasi | Sistem mengembalikan salah satu status: Syntax Error, Runtime Error, Wrong Answer, Correct, atau Timeout | MUST |
| FR-CODE-09 | Bahasa MVP | Pada MVP, hanya kode Python yang didukung | MUST |

---

### Progress

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-PROG-01 | Simpan Progress Lesson | Sistem menyimpan status completion setiap lesson yang telah diselesaikan user | MUST |
| FR-PROG-02 | Simpan Progress Module | Sistem menghitung dan menyimpan persentase penyelesaian setiap module berdasarkan lesson yang selesai | MUST |
| FR-PROG-03 | Simpan Hasil Quiz | Sistem menyimpan skor quiz, jumlah percobaan, jumlah jawaban benar, dan jumlah jawaban salah | MUST |
| FR-PROG-04 | Tampil Progress di Dashboard | Dashboard menampilkan progress user secara ringkas | MUST |
| FR-PROG-05 | Progress Menentukan Urutan Belajar | Status progress digunakan untuk menentukan module mana yang dapat diakses (locking/unlocking) | MUST |
| FR-PROG-06 | Continue Learning | Sistem dapat menampilkan titik pembelajaran terakhir user sehingga user dapat melanjutkan dari tempat terakhir | MUST |

---

### XP

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-XP-01 | Mendapatkan XP dari Lesson | User mendapatkan XP setelah menyelesaikan sebuah lesson | MUST |
| FR-XP-02 | Mendapatkan XP dari Quiz | User mendapatkan XP setelah menyelesaikan quiz module | MUST |
| FR-XP-03 | Mendapatkan XP dari Coding | User mendapatkan XP setelah berhasil menjawab soal code writing atau code completion dengan benar | MUST |
| FR-XP-04 | Tampil Total XP | User dapat melihat total XP yang dimiliki di dashboard dan halaman profil | MUST |
| FR-XP-05 | XP Tersimpan | Total XP user disimpan secara persisten dan diperbarui setiap ada aktivitas yang memberikan XP | MUST |

---

### Community

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-COM-01 | Buat Community | User dapat membuat community baru dengan nama dan deskripsi | MUST |
| FR-COM-02 | Lihat Community | User dapat melihat daftar community yang tersedia dan community yang diikuti | MUST |
| FR-COM-03 | Join Community | User dapat bergabung dengan community yang ada | MUST |
| FR-COM-04 | Leave Community | User dapat meninggalkan community yang pernah diikuti | MUST |
| FR-COM-05 | Kirim Pesan | Anggota community dapat mengirim pesan dalam community | MUST |
| FR-COM-06 | Baca Pesan | Anggota community dapat membaca pesan yang dikirim oleh anggota lain | MUST |
| FR-COM-07 | Lihat Anggota | User dapat melihat daftar anggota suatu community | SHOULD |
| FR-COM-08 | Informasi Community | Community memiliki nama, deskripsi, owner, dan daftar anggota | MUST |
| FR-COM-09 | Owner Community | User yang membuat community secara otomatis menjadi owner | MUST |

---

### Profile

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-PROFILE-01 | Lihat Profile | User dapat melihat halaman profil miliknya sendiri | MUST |
| FR-PROFILE-02 | Avatar | User dapat memilih atau mengatur avatar untuk profilnya | MUST |
| FR-PROFILE-03 | Tampil XP di Profile | Profile menampilkan total XP yang dimiliki user | MUST |
| FR-PROFILE-04 | Tampil Learning Progress | Profile menampilkan progress pembelajaran user termasuk module yang telah diselesaikan | MUST |
| FR-PROFILE-05 | Tampil Completed Modules | Profile menampilkan daftar module yang telah diselesaikan user | MUST |
| FR-PROFILE-06 | Edit Username/Name | User dapat mengedit nama atau username pada profilnya | SHOULD |

---

### Admin Content Management

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-ADMIN-01 | Kelola Learning Path | Admin dapat membuat, mengedit, menghapus, dan mengurutkan learning path | MUST |
| FR-ADMIN-02 | Kelola Module | Admin dapat membuat, mengedit, menghapus, mengurutkan, dan mengatur prerequisite module | MUST |
| FR-ADMIN-03 | Kelola Lesson | Admin dapat membuat, mengedit, dan menghapus lesson beserta seluruh elemennya (explanation, code example, output, key points, tips, references, common mistakes) | MUST |
| FR-ADMIN-04 | Kelola Quiz | Admin dapat membuat, mengedit, dan menghapus soal quiz beserta tipe, jawaban, dan penjelasan | MUST |
| FR-ADMIN-05 | Kelola Coding Question | Admin dapat membuat, mengedit, dan menghapus soal coding beserta starter code, bahasa yang diizinkan, test case, expected output, time limit, dan memory limit | MUST |
| FR-ADMIN-06 | Kelola Test Case | Admin dapat menentukan public test case dan hidden test case untuk setiap coding question | MUST |
| FR-ADMIN-07 | CMS Fungsional | Admin Content Management System berfokus pada kemudahan pengelolaan konten, bukan fitur enterprise yang kompleks | MUST |

---

## 11. Non-Functional Requirements

### Performance

| ID | Requirement | Keterangan |
|----|-------------|------------|
| NFR-PERF-01 | Responsivitas UI | Antarmuka harus terasa responsif; perpindahan halaman dan interaksi dasar tidak boleh terasa lambat |
| NFR-PERF-02 | Quiz Feedback Cepat | Feedback quiz untuk soal Theory harus muncul segera setelah user memilih jawaban |
| NFR-PERF-03 | Code Execution Timeout | Eksekusi kode user di sandbox harus memiliki batas waktu yang jelas untuk mencegah eksekusi tak terbatas |
| NFR-PERF-04 | NOVA Response Time | Respons NOVA harus diterima dalam waktu yang wajar agar pengalaman bertanya terasa natural |

### Usability

| ID | Requirement | Keterangan |
|----|-------------|------------|
| NFR-USE-01 | Interface Sederhana | Antarmuka harus bersih dan tidak membingungkan pemula |
| NFR-USE-02 | Materi Mudah Dibaca | Materi lesson harus mudah dibaca dari segi tipografi, spasi, dan layout |
| NFR-USE-03 | Feedback Mudah Dipahami | Pesan feedback quiz harus jelas dan mudah dimengerti oleh pemula |
| NFR-USE-04 | Code Editor Nyaman | Editor kode pada quiz harus mudah digunakan dengan fitur dasar seperti indentasi otomatis |
| NFR-USE-05 | Responsive / Mobile-Friendly | Platform dapat digunakan dengan nyaman di perangkat desktop maupun mobile |

### Accessibility

| ID | Requirement | Keterangan |
|----|-------------|------------|
| NFR-ACC-01 | Keyboard Navigation | Pengguna dapat menavigasi elemen utama menggunakan keyboard |
| NFR-ACC-02 | Kontras Warna | Elemen teks dan latar belakang memiliki kontras warna yang memadai untuk keterbacaan |
| NFR-ACC-03 | Font Mudah Dibaca | Ukuran font dan jenis font dipilih untuk kemudahan membaca |
| NFR-ACC-04 | Pesan Error Jelas | Seluruh pesan error ditampilkan dalam bahasa yang jelas dan dapat dipahami user |

### Security

| ID | Requirement | Keterangan |
|----|-------------|------------|
| NFR-SEC-01 | Authentication | Sistem autentikasi melindungi akses ke fitur yang memerlukan login |
| NFR-SEC-02 | Authorization | Akses ke fitur tertentu dibatasi sesuai role (User vs Admin) |
| NFR-SEC-03 | Secure Code Execution | Kode user tidak dieksekusi langsung di server utama |
| NFR-SEC-04 | Sandbox Isolation | Eksekusi kode berlangsung di lingkungan terisolasi untuk mencegah dampak terhadap sistem lain |
| NFR-SEC-05 | Malicious Code Protection | Sistem memiliki mekanisme untuk mendeteksi dan mencegah eksekusi kode berbahaya sebelum masuk ke sandbox |

### Scalability

| ID | Requirement | Keterangan |
|----|-------------|------------|
| NFR-SCALE-01 | Extensible Learning Path | Arsitektur sistem dirancang agar learning path dan bahasa pemrograman baru dapat ditambahkan di masa depan |
| NFR-SCALE-02 | MVP Scope | Pada MVP, hanya Learning Path Python yang diimplementasikan |

---

## 12. MVP Scope

Pengembangan MVP dibagi ke dalam enam fase:

### Phase 1 — Core Learning

Fokus membangun fondasi pengalaman belajar.

- Autentikasi (Register, Login, Logout)
- Profil User dan Avatar
- Dashboard
- Python Learning Path
- Module (dengan status dan locking)
- Lesson (dengan seluruh elemen konten)
- Progress Tracking (lesson dan module)
- Personal Notes

### Phase 2 — Quiz

Menambahkan sistem evaluasi interaktif.

- Theory Quiz
- Code Writing Quiz
- Code Completion Quiz
- Code Execution Engine (sandbox, syntax check, security check)
- Test Case Evaluation (public dan hidden)
- Automatic Evaluation dan Feedback
- Error Detection dan Pesan Error
- Quiz Progress dan Status Completion

### Phase 3 — NOVA

Mengintegrasikan AI tutor yang kontekstual.

- Fitur Ask NOVA
- Fitur Explain
- Fitur Example
- Fitur Summarize / Resume
- Context-aware berdasarkan Module dan Lesson aktif
- Fitur Explain Note (menjelaskan catatan user)
- Fitur Error Explanation dalam konteks materi

> **Catatan:** NOVA tidak tersedia di dalam Quiz pada fase mana pun.

### Phase 4 — XP

Menambahkan sistem gamifikasi sederhana.

- Pemberian XP dari lesson, quiz, dan coding challenge
- Penyimpanan dan tampilan total XP

### Phase 5 — Community

Menambahkan fitur komunitas pengguna.

- Buat Community
- Join Community
- Leave Community
- Community Chat (kirim dan baca pesan)
- Lihat Anggota Community

### Phase 6 — Content Expansion *(Di Luar MVP Utama)*

- Learning Path tambahan
- Bahasa pemrograman tambahan

---

## 13. Out of Scope

Fitur-fitur berikut secara eksplisit **tidak termasuk dalam MVP Sintaks**:

| Kategori | Fitur yang Tidak Termasuk |
|----------|--------------------------|
| Bahasa Pemrograman | Multiple programming languages (JavaScript, Java, C++, SQL, dll.) |
| Pencarian | Global search, search lesson, search module, search community |
| Notifikasi | Push notification, learning reminder, streak reminder, achievement notification, quiz notification |
| Gamifikasi | Streak, Achievement, Badge, Level system, Leaderboard |
| Profile | Programming Skills (skill rating, skill percentage, skill chart, technology skill list) |
| NOVA | NOVA di dalam Quiz, NOVA hint pada Quiz, NOVA error explanation pada Quiz, NOVA feedback terhadap jawaban Quiz |
| Community | Private messaging, complex forum/thread, reaction pada pesan, attachment/file upload, voice chat, video call, moderator hierarchy kompleks, notification system, community recommendation/search |
| Sosial | Advanced social features lainnya |
| CMS | Enterprise-grade CMS dengan fitur kompleks |
| Konten | Video pembelajaran |

---

## 14. Acceptance Criteria

### Authentication

| Kriteria |
|---------|
| User dapat membuat akun baru menggunakan email dan password |
| User dapat login menggunakan email dan password yang telah terdaftar |
| User dapat logout dari sesi aktif |
| Akses ke fitur pembelajaran memerlukan status login |
| Admin memiliki akses yang berbeda dari User biasa |

### Learning Path & Module

| Kriteria |
|---------|
| User yang telah login dapat melihat Learning Path Python |
| User dapat melihat daftar module dalam Learning Path Python beserta statusnya |
| Module yang memiliki prerequisite tidak dapat dibuka jika module sebelumnya belum selesai |
| Status module diperbarui secara otomatis berdasarkan progress user |
| Persentase kemajuan module ditampilkan dengan benar |

### Lesson

| Kriteria |
|---------|
| User dapat membuka dan membaca lesson yang tersedia |
| Lesson menampilkan seluruh elemen konten yang telah diisi (explanation, code example, output, dll.) |
| User dapat menyelesaikan lesson dan status tersimpan |
| User dapat berpindah ke lesson berikutnya atau kembali ke lesson sebelumnya |
| Quiz module hanya dapat diakses setelah seluruh lesson dalam module diselesaikan |

### Personal Notes

| Kriteria |
|---------|
| User dapat membuat note dari konten lesson yang sedang dibaca |
| Setiap note terhubung dengan lesson asal |
| User dapat melihat seluruh catatan yang pernah dibuat |
| User dapat menghapus catatan |
| User dapat membuka lesson asal dari halaman catatan |
| Note tidak terlihat oleh user lain |

### NOVA

| Kriteria |
|---------|
| NOVA tersedia saat user berada di halaman Module atau Lesson |
| NOVA menerima konteks berupa Learning Path, Module, Lesson, dan materi yang relevan sebelum menjawab |
| User dapat mengajukan pertanyaan dan NOVA memberikan jawaban yang relevan dengan materi |
| User dapat meminta penjelasan lebih sederhana dan NOVA merespons berdasarkan materi |
| User dapat meminta contoh tambahan dan NOVA memberikan contoh yang relevan |
| User dapat meminta NOVA merangkum materi atau module |
| NOVA tidak muncul dan tidak dapat diakses pada halaman Quiz dalam bentuk apapun |

### Quiz — Theory

| Kriteria |
|---------|
| Sistem menampilkan soal pilihan ganda beserta pilihan jawaban |
| User dapat memilih satu jawaban |
| Jika benar, sistem menampilkan feedback positif dan user dapat lanjut |
| Jika salah, sistem menampilkan feedback dan penjelasan jika tersedia, user dapat mencoba kembali |

### Quiz — Code Writing

| Kriteria |
|---------|
| Sistem menampilkan deskripsi problem yang harus diselesaikan dengan kode |
| User dapat menulis kode di code editor yang tersedia |
| User dapat mengirim kode untuk dievaluasi |
| Sistem mendeteksi dan melaporkan syntax error beserta lokasinya |
| Sistem mendeteksi dan melaporkan runtime error |
| Sistem mengevaluasi kode terhadap test case dan melaporkan Wrong Answer jika output tidak sesuai |
| Sistem menyatakan Correct jika kode memenuhi semua test case |
| User mendapatkan XP setelah berhasil menjawab dengan benar |

### Quiz — Code Completion

| Kriteria |
|---------|
| Sistem menampilkan kode dengan bagian yang dikosongkan |
| Sistem menyediakan token pilihan yang dapat dipilih user |
| User dapat menempatkan token ke bagian kosong |
| Setelah semua bagian terisi, user dapat mengirim kode untuk dievaluasi |
| Sistem melakukan evaluasi yang sama seperti Code Writing (syntax, eksekusi, test case) |
| Feedback diberikan dan user dapat memperbaiki jika salah |

### Code Execution

| Kriteria |
|---------|
| Kode user tidak dieksekusi langsung di server utama |
| Eksekusi berlangsung di environment sandbox yang terisolasi |
| Sistem melakukan syntax check sebelum eksekusi |
| Sistem melakukan security check sebelum eksekusi |
| Eksekusi memiliki batas waktu (timeout) |
| Hasil evaluasi dikembalikan kepada user berupa status yang jelas |

### Progress & XP

| Kriteria |
|---------|
| Progress lesson tersimpan dan ditampilkan dengan akurat |
| Progress module diperbarui otomatis berdasarkan lesson yang selesai |
| Dashboard menampilkan progress dan titik pembelajaran terakhir |
| User mendapatkan XP dari lesson, quiz, dan coding challenge |
| Total XP tersimpan dan ditampilkan di dashboard serta profile |

### Community

| Kriteria |
|---------|
| User dapat membuat community baru dengan nama dan deskripsi |
| User yang membuat community menjadi owner secara otomatis |
| User dapat bergabung dengan community yang tersedia |
| User dapat meninggalkan community |
| Anggota community dapat mengirim dan membaca pesan |
| User dapat melihat daftar anggota community |

### Profile

| Kriteria |
|---------|
| User dapat melihat halaman profil miliknya |
| User dapat memilih atau mengatur avatar |
| Profile menampilkan total XP |
| Profile menampilkan progress pembelajaran dan daftar module yang telah diselesaikan |

### Admin Content Management

| Kriteria |
|---------|
| Admin dapat membuat, mengedit, menghapus, dan mengurutkan learning path |
| Admin dapat membuat, mengedit, menghapus, mengurutkan, dan mengatur prerequisite module |
| Admin dapat membuat, mengedit, dan menghapus lesson beserta seluruh elemen kontennya |
| Admin dapat membuat, mengedit, dan menghapus soal quiz dari semua tipe |
| Admin dapat membuat, mengedit, dan menghapus coding question beserta test case |
| Admin dapat membedakan antara public test case dan hidden test case |

---

## 15. Future Considerations

Berikut adalah fitur dan pengembangan yang dapat dipertimbangkan setelah MVP selesai, namun **bukan bagian dari MVP**:

| Kategori | Pertimbangan Masa Depan |
|----------|------------------------|
| Konten | Penambahan Learning Path untuk bahasa pemrograman lain (JavaScript, Java, dll.) |
| Konten | Modul lanjutan untuk Python (OOP, File I/O, Libraries) |
| Quiz | Tipe soal quiz tambahan |
| Gamifikasi | Achievement atau badge jika terbukti meningkatkan engagement |
| Profil | Riwayat aktivitas pembelajaran |
| Admin | Fitur analytics dan statistik penggunaan konten |
| Community | Moderasi konten komunitas |
| Platform | Aplikasi mobile native |

---

## 16. Requirement Decisions

Bagian ini mencatat keputusan-keputusan penting yang telah dikunci untuk MVP Sintaks.

| No | Keputusan | Status |
|----|-----------|--------|
| 1 | MVP hanya mendukung Learning Path Python | **Terkunci** |
| 2 | NOVA hanya tersedia di Module dan Lesson | **Terkunci** |
| 3 | NOVA tidak tersedia di Quiz dalam bentuk apapun (tidak ada hint, tidak ada error explanation, tidak ada feedback jawaban) | **Terkunci** |
| 4 | Quiz dievaluasi sepenuhnya oleh sistem otomatis, bukan oleh NOVA | **Terkunci** |
| 5 | Quiz mendukung tiga tipe: Theory Question, Code Writing, dan Code Completion | **Terkunci** |
| 6 | XP adalah satu-satunya mekanisme gamifikasi utama pada MVP | **Terkunci** |
| 7 | Tidak ada fitur Streak | **Terkunci** |
| 8 | Tidak ada fitur Achievement | **Terkunci** |
| 9 | Tidak ada fitur Badge | **Terkunci** |
| 10 | Tidak ada Level system | **Terkunci** |
| 11 | Tidak ada Leaderboard | **Terkunci** |
| 12 | Tidak ada fitur Search (global, lesson, module, maupun community) | **Terkunci** |
| 13 | Tidak ada sistem Notification | **Terkunci** |
| 14 | Profile memiliki Avatar sebagai fitur personalisasi | **Terkunci** |
| 15 | Profile tidak memiliki fitur Programming Skills dalam bentuk apapun (tidak ada skill rating, skill chart, atau technology list) | **Terkunci** |
| 16 | Community bersifat sederhana: hanya mendukung create, join, leave, dan chat | **Terkunci** |
| 17 | Community tidak memiliki private messaging, forum berthread, reaction, attachment, voice chat, video call, atau moderasi hierarkis | **Terkunci** |
| 18 | Eksekusi kode user harus menggunakan isolated sandbox yang terpisah dari server utama | **Terkunci** |
| 19 | Admin CMS dibuat fungsional untuk kebutuhan pengelolaan konten, bukan enterprise-grade | **Terkunci** |
| 20 | MVP tidak boleh over-engineered; setiap keputusan desain mengutamakan kesederhanaan dan kebutuhan nyata | **Terkunci** |

---

*Dokumen ini adalah PRD versi MVP Sintaks. Seluruh keputusan requirement yang tertulis di sini berlaku sebagai acuan utama pengembangan. Detail arsitektur, skema database, dan spesifikasi API akan didefinisikan dalam dokumen terpisah.*
