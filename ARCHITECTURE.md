# Architecture Document — Sintaks

> **Versi:** 1.0 — MVP
> **Status:** Draft
> **Referensi:** PRD.md v1.0
> **Bahasa:** Indonesia

---

## Daftar Isi

1. [Architecture Overview](#1-architecture-overview)
2. [Architecture Principles](#2-architecture-principles)
3. [System Components](#3-system-components)
4. [High-Level Architecture Diagram](#4-high-level-architecture-diagram)
5. [Frontend Architecture](#5-frontend-architecture)
6. [Backend Architecture](#6-backend-architecture)
7. [API Architecture](#7-api-architecture)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [Learning Architecture](#9-learning-architecture)
10. [Notes Architecture](#10-notes-architecture)
11. [NOVA Architecture](#11-nova-architecture)
12. [Quiz Architecture](#12-quiz-architecture)
13. [Code Execution Architecture](#13-code-execution-architecture)
14. [Test Case Architecture](#14-test-case-architecture)
15. [Progress Architecture](#15-progress-architecture)
16. [XP Architecture](#16-xp-architecture)
17. [Community Architecture](#17-community-architecture)
18. [Profile Architecture](#18-profile-architecture)
19. [Admin Architecture](#19-admin-architecture)
20. [Database Architecture](#20-database-architecture)
21. [Data Flow](#21-data-flow)
22. [Error Handling](#22-error-handling)
23. [Security Architecture](#23-security-architecture)
24. [Performance](#24-performance)
25. [Scalability](#25-scalability)
26. [Deployment Architecture](#26-deployment-architecture)
27. [Observability](#27-observability)
28. [Testing Architecture](#28-testing-architecture)
29. [Architecture Decisions](#29-architecture-decisions)
30. [Trade-offs](#30-trade-offs)
31. [Future Architecture Considerations](#31-future-architecture-considerations)
32. [Final Architecture Summary](#32-final-architecture-summary)

---

## 1. Architecture Overview

Sintaks dibangun di atas arsitektur **Modular Monolith** untuk aplikasi utama, dengan dua service terpisah untuk kebutuhan khusus: Code Execution Service dan integrasi AI Provider untuk NOVA.

Pendekatan ini dipilih karena sesuai untuk tim kecil, mudah dikembangkan, dan tidak memerlukan infrastruktur microservices yang kompleks pada tahap MVP.

### Gambaran Umum

**Alur utama aplikasi:**

```
Browser
  ↓
React Frontend
  ↓  (REST API)
Laravel 12 API
  ↓
MySQL
```

**Alur Code Execution:**

```
React
  ↓
Laravel
  ↓
Code Execution Service
  ↓
Sandbox (Python Runtime)
  ↓
Result / Output
  ↓
Laravel (Evaluasi Test Case)
  ↓
React
```

**Alur NOVA:**

```
React
  ↓
Laravel
  ↓
Nova Service (Context Builder)
  ↓
AI Provider
  ↓
NOVA Response
  ↓
Laravel
  ↓
React
```

**Database management tool (hanya untuk developer):**

```
Developer
  ↓
phpMyAdmin
  ↓
MySQL
```

phpMyAdmin **tidak** berada dalam alur request aplikasi. User tidak pernah berinteraksi dengan phpMyAdmin.

---

## 2. Architecture Principles

### 1. Separation of Concerns
Setiap lapisan memiliki tanggung jawab yang jelas dan tidak tumpang tindih. React menangani UI, Laravel menangani business logic dan orchestration, MySQL menyimpan data, Code Execution Service menjalankan kode user, dan NOVA menangani AI response.

### 2. API-First Communication
React dan Laravel berkomunikasi **hanya melalui REST API**. Tidak ada server-side rendering yang mencampur PHP dan HTML secara langsung. Seluruh data dikirim dan diterima dalam format JSON.

### 3. Secure Code Execution
Kode yang ditulis user tidak pernah dieksekusi langsung di server Laravel. Eksekusi selalu terjadi di dalam Code Execution Service yang berjalan di lingkungan sandbox terisolasi dengan resource limit yang ketat.

### 4. Context-Aware AI
NOVA mendapatkan konteks lengkap sebelum menjawab pertanyaan user. Konteks dibangun oleh Nova Service di sisi Laravel menggunakan data dari database, bukan dari input user secara langsung. NOVA hanya tersedia di Module dan Lesson, **tidak di Quiz**.

### 5. Simple MVP Architecture
Tidak ada komponen tambahan yang tidak diperlukan. Redis, Elasticsearch, Kafka, dan sejenisnya tidak digunakan kecuali terbukti dibutuhkan. Kesederhanaan lebih diprioritaskan daripada kelengkapan fitur infrastruktur.

### 6. Modular Backend
Backend Laravel diorganisir secara modular berdasarkan domain (Learning, Quiz, NOVA, Community, XP). Setiap domain memiliki Service, Controller, Model, dan Policy sendiri sehingga mudah dikembangkan dan di-maintain.

### 7. Reusable Frontend Components
Komponen React dibagi menjadi komponen UI generik (tombol, input, card) dan komponen domain spesifik (LessonCard, QuizQuestion, NOVAChat). Komponen generik dapat digunakan ulang di seluruh fitur.

### 8. Validation at Multiple Layers
Validasi dilakukan di tiga lapisan: validasi di sisi React (client-side), validasi di Laravel menggunakan Form Requests (server-side), dan validasi khusus sebelum eksekusi kode (syntax check, security check).

### 9. Least Privilege
User hanya dapat mengakses dan memodifikasi data miliknya sendiri. Admin memiliki akses terpisah yang dikontrol secara eksplisit menggunakan role dan Laravel Policies. Code execution sandbox berjalan tanpa akses jaringan dan filesystem host.

### 10. Maintainability
Struktur kode mengikuti konvensi Laravel dan React yang umum agar mudah dipahami oleh developer baru. Tidak ada abstraksi yang tidak perlu. Setiap layer memiliki tanggung jawab yang dapat dijelaskan dalam satu kalimat.

---

## 3. System Components

### Frontend — React

React berjalan di browser sebagai Single Page Application (SPA).

**Tanggung jawab:**
- Menampilkan seluruh antarmuka pengguna
- Mengelola state UI (halaman aktif, form, loading state)
- Berkomunikasi dengan Laravel melalui REST API
- Menampilkan learning interface (lesson, module, learning path)
- Menampilkan quiz interface (theory, code writing, code completion)
- Menampilkan code editor untuk Code Writing dan Code Completion
- Menampilkan NOVA chat interface pada Module/Lesson
- Menampilkan notes interface
- Menampilkan community interface
- Menampilkan profile interface
- Menampilkan admin interface untuk content management

---

### Backend — Laravel 12

Laravel berjalan sebagai API server yang menangani seluruh business logic aplikasi.

**Tanggung jawab:**
- Mengelola autentikasi dan autorisasi user
- Mengelola seluruh business logic pembelajaran (learning path, module, lesson, progress)
- Mengelola quiz dan evaluasi jawaban theory
- Mengorkestrasikan permintaan eksekusi kode ke Code Execution Service
- Mengorkestrasikan permintaan ke NOVA melalui Nova Service
- Mengelola notes user
- Mengelola XP
- Mengelola community dan pesan
- Menyediakan seluruh endpoint REST API
- Mengelola admin operations

---

### Database — MySQL

MySQL adalah satu-satunya database relasional yang digunakan Sintaks.

**Data yang disimpan:**

| Domain | Data |
|--------|------|
| Users & Auth | User, password hash, role, token |
| Profile | Avatar reference, name, username |
| Learning | Learning path, module, lesson, lesson content |
| Progress | Lesson completion, module completion |
| Notes | Note content, relasi ke lesson dan user |
| Quiz | Quiz question, tipe, pilihan jawaban, penjelasan |
| Quiz Progress | Attempt, jawaban, skor, benar/salah |
| Coding Question | Soal, starter code, time limit, memory limit |
| Test Case | Input, expected output, public/hidden flag |
| Code Submission | Kode yang dikirim, hasil evaluasi |
| XP | Total XP per user, riwayat XP |
| Community | Community, daftar anggota, pesan |

Schema lengkap akan didefinisikan dalam dokumen `SCHEMA.md`.

---

### Database Management Tool — phpMyAdmin

phpMyAdmin digunakan **hanya oleh developer** untuk keperluan:
- Melihat struktur tabel dan relasi
- Menjalankan query SQL secara manual
- Menginspeksi data selama development
- Debugging permasalahan database
- Memverifikasi migrasi

**phpMyAdmin tidak menjadi bagian dari application runtime.**
User tidak pernah mengakses phpMyAdmin melalui aplikasi Sintaks.

---

### Authentication — Laravel Sanctum

Laravel Sanctum digunakan untuk token-based authentication antara React dan Laravel API. Setelah login, user mendapatkan Bearer Token yang dikirim pada setiap request API melalui header `Authorization`.

---

### NOVA Service

Nova Service adalah komponen Laravel (bukan service terpisah) yang bertanggung jawab membangun konteks percakapan dan berkomunikasi dengan AI Provider eksternal.

**Tanggung jawab:**
- Mengambil data konteks dari database (learning path, module, lesson, materi, key points, notes user)
- Membangun prompt yang kontekstual untuk dikirim ke AI Provider
- Mengirim request ke AI Provider
- Menerima dan meneruskan respons ke React

NOVA hanya dipanggil dari konteks Module atau Lesson. Tidak ada endpoint atau logika NOVA yang berkaitan dengan Quiz.

---

### Code Execution Service

Code Execution Service adalah service terpisah (bukan bagian dari Laravel) yang bertugas menjalankan kode Python user secara aman.

**Tanggung jawab:**
- Menerima kode dari Laravel
- Melakukan syntax check
- Melakukan security check (static analysis sederhana)
- Menjalankan kode di dalam sandbox yang terisolasi
- Menerapkan resource limit (CPU, memory, waktu)
- Mengembalikan output atau error ke Laravel

Laravel bertindak sebagai orchestrator: menerima kode dari React, meneruskan ke Code Execution Service, menerima hasilnya, mengevaluasi terhadap test case, dan mengembalikan hasil akhir ke React.

---

### Sandbox

Sandbox adalah environment terisolasi tempat kode Python user dieksekusi. Implementasi konkret dapat menggunakan container (Docker) atau namespace isolation. Detail implementasi Sandbox akan dibahas dalam dokumen teknis tersendiri.

---

### Admin Interface

Admin interface dibangun menggunakan React (bagian dari frontend yang sama) dengan route dan tampilan khusus admin. Admin mengakses data melalui endpoint Laravel API yang dilindungi middleware admin.

---

## 4. High-Level Architecture Diagram

### Diagram Arsitektur Utama

```
                         ┌─────────────────────┐
                         │       Browser        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend     │
                         │   (SPA)              │
                         └──────────┬──────────┘
                                    │
                                    │  REST API (JSON)
                                    │  Authorization: Bearer Token
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Laravel 12 API     │
                         │   (Modular Monolith) │
                         └──────────┬──────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               │                    │                     │
               ▼                    ▼                     ▼
   ┌───────────────────┐  ┌─────────────────┐  ┌──────────────────────┐
   │   MySQL Database  │  │  NOVA Service   │  │  Code Execution      │
   │                   │  │  (dalam Laravel) │  │  Service             │
   └───────────────────┘  └────────┬────────┘  └──────────┬───────────┘
                                   │                       │
                                   ▼                       ▼
                            ┌─────────────┐        ┌─────────────────┐
                            │ AI Provider │        │  Sandbox         │
                            │ (Eksternal) │        │  (Python Runtime)│
                            └─────────────┘        └─────────────────┘
```

### Diagram Database Management (Developer Only)

```
   Developer
      │
      │  (Browser / Tool)
      ▼
  phpMyAdmin
      │
      ▼
  MySQL Database
```

phpMyAdmin berada di luar alur request aplikasi sepenuhnya.

---

## 5. Frontend Architecture

### Struktur Direktori

```
src/
├── app/
│   ├── router.tsx            # React Router — definisi seluruh route
│   ├── store.ts              # State management global (jika diperlukan)
│   └── App.tsx
│
├── components/               # Komponen UI generik yang dapat digunakan ulang
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   └── ProgressBar.tsx
│   └── layout/
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── PageWrapper.tsx
│
├── features/                 # Komponen dan logik per domain/fitur
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── hooks/
│   │       └── useAuth.ts
│   │
│   ├── learning/
│   │   ├── components/
│   │   │   ├── LearningPathCard.tsx
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── ModuleList.tsx
│   │   │   ├── LessonCard.tsx
│   │   │   ├── LessonContent.tsx
│   │   │   ├── CodeExample.tsx
│   │   │   └── ProgressIndicator.tsx
│   │   └── hooks/
│   │       ├── useLearningPath.ts
│   │       ├── useModule.ts
│   │       └── useLesson.ts
│   │
│   ├── notes/
│   │   ├── components/
│   │   │   ├── NoteForm.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   └── NoteList.tsx
│   │   └── hooks/
│   │       └── useNotes.ts
│   │
│   ├── nova/
│   │   ├── components/
│   │   │   ├── NOVAChat.tsx
│   │   │   ├── NOVAMessage.tsx
│   │   │   └── NOVAInput.tsx
│   │   └── hooks/
│   │       └── useNOVA.ts
│   │
│   ├── quiz/
│   │   ├── components/
│   │   │   ├── QuizContainer.tsx
│   │   │   ├── TheoryQuestion.tsx
│   │   │   ├── CodeWritingQuestion.tsx
│   │   │   ├── CodeCompletionQuestion.tsx
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── TokenSelector.tsx
│   │   │   └── QuizFeedback.tsx
│   │   └── hooks/
│   │       └── useQuiz.ts
│   │
│   ├── community/
│   │   ├── components/
│   │   │   ├── CommunityList.tsx
│   │   │   ├── CommunityCard.tsx
│   │   │   ├── CommunityChat.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── MemberList.tsx
│   │   └── hooks/
│   │       └── useCommunity.ts
│   │
│   ├── profile/
│   │   ├── components/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── AvatarSelector.tsx
│   │   │   └── CompletedModules.tsx
│   │   └── hooks/
│   │       └── useProfile.ts
│   │
│   └── admin/
│       ├── components/
│       │   ├── LearningPathForm.tsx
│       │   ├── ModuleForm.tsx
│       │   ├── LessonForm.tsx
│       │   ├── QuizForm.tsx
│       │   └── TestCaseForm.tsx
│       └── hooks/
│           └── useAdmin.ts
│
├── pages/                    # Halaman utama yang dirender oleh router
│   ├── public/
│   │   ├── HomePage.tsx
│   │   └── LandingPage.tsx
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── learning/
│   │   ├── LearningPathPage.tsx
│   │   ├── ModulePage.tsx
│   │   └── LessonPage.tsx
│   ├── quiz/
│   │   └── QuizPage.tsx
│   ├── notes/
│   │   └── NotesPage.tsx
│   ├── community/
│   │   ├── CommunityListPage.tsx
│   │   └── CommunityPage.tsx
│   ├── profile/
│   │   └── ProfilePage.tsx
│   └── admin/
│       ├── AdminDashboardPage.tsx
│       ├── AdminModulePage.tsx
│       ├── AdminLessonPage.tsx
│       └── AdminQuizPage.tsx
│
├── services/                 # Fungsi untuk komunikasi dengan Laravel API
│   ├── api.ts                # Axios instance + interceptor untuk token
│   ├── authService.ts
│   ├── learningService.ts
│   ├── noteService.ts
│   ├── novaService.ts
│   ├── quizService.ts
│   ├── codeExecutionService.ts
│   ├── communityService.ts
│   ├── profileService.ts
│   └── adminService.ts
│
├── hooks/                    # Custom hooks lintas fitur
│   ├── useAuth.ts            # State autentikasi global
│   ├── useProgress.ts
│   └── useXP.ts
│
├── layouts/
│   ├── AppLayout.tsx         # Layout utama dengan navbar dan sidebar
│   ├── AuthLayout.tsx        # Layout untuk halaman login/register
│   └── AdminLayout.tsx       # Layout khusus admin
│
├── utils/
│   ├── formatter.ts
│   ├── validators.ts
│   └── constants.ts
│
└── types/                    # TypeScript type definitions
    ├── auth.types.ts
    ├── learning.types.ts
    ├── quiz.types.ts
    ├── community.types.ts
    └── api.types.ts
```

### Tanggung Jawab per Lapisan

**Pages**
Setiap page bertanggung jawab mengambil data yang diperlukan, mengelola state halaman, dan menyusun komponen fitur. Page tidak berisi business logic.

**Features / Components**
Komponen domain berisi logika tampilan spesifik untuk setiap fitur. Komponen `ui/` adalah komponen presentasional murni yang tidak memiliki pengetahuan tentang domain apapun.

**Services**
Seluruh komunikasi dengan API Laravel dilakukan melalui service. Komponen React tidak melakukan `fetch` atau `axios` secara langsung; selalu melalui fungsi di `services/`.

**Hooks**
Custom hooks mengenkapsulasi logika yang dapat dibagikan antar komponen dalam satu domain. Hook berinteraksi dengan service dan mengembalikan state serta fungsi ke komponen.

### State Management

Untuk MVP, state dikelola menggunakan **React built-in state** (`useState`, `useReducer`, `useContext`):

- **Auth state** (user, token, role) → React Context
- **Page/local state** → `useState` per komponen
- **Server state** (data dari API) → dikelola di dalam custom hooks dengan loading/error state

Jika kebutuhan state management semakin kompleks seiring perkembangan fitur, dapat dipertimbangkan penambahan library seperti Zustand atau TanStack Query. Namun untuk MVP, pendekatan ini cukup dan menghindari kompleksitas yang tidak perlu.

### Form Validation

Validasi form dilakukan di sisi client menggunakan library form seperti **React Hook Form** dikombinasikan dengan schema validation (Zod). Validasi server-side tetap menjadi lapisan validasi utama.

### Error Handling

- Error dari API dikembalikan dalam format JSON yang konsisten dari Laravel
- Setiap service function menangkap error dan meneruskannya ke komponen melalui state
- Error autentikasi (401) ditangkap di Axios interceptor dan mengarahkan user ke halaman login
- Error umum (500, network) ditampilkan sebagai pesan generik kepada user

### Loading State

Setiap request API memiliki tiga state: `idle`, `loading`, dan `error`. State loading ditangani di level hook dan ditampilkan melalui komponen spinner atau skeleton di halaman.

---

## 6. Backend Architecture

### Struktur Direktori Laravel

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── AuthController.php
│   │   │   └── PasswordResetController.php
│   │   ├── Learning/
│   │   │   ├── LearningPathController.php
│   │   │   ├── ModuleController.php
│   │   │   └── LessonController.php
│   │   ├── Note/
│   │   │   └── NoteController.php
│   │   ├── Nova/
│   │   │   └── NovaController.php
│   │   ├── Quiz/
│   │   │   ├── QuizController.php
│   │   │   └── QuizAttemptController.php
│   │   ├── CodeExecution/
│   │   │   └── CodeExecutionController.php
│   │   ├── Progress/
│   │   │   └── ProgressController.php
│   │   ├── XP/
│   │   │   └── XPController.php
│   │   ├── Community/
│   │   │   ├── CommunityController.php
│   │   │   └── CommunityMessageController.php
│   │   ├── Profile/
│   │   │   └── ProfileController.php
│   │   └── Admin/
│   │       ├── AdminLearningPathController.php
│   │       ├── AdminModuleController.php
│   │       ├── AdminLessonController.php
│   │       ├── AdminQuizController.php
│   │       └── AdminCodingQuestionController.php
│   │
│   ├── Requests/
│   │   ├── Auth/
│   │   │   ├── RegisterRequest.php
│   │   │   └── LoginRequest.php
│   │   ├── Learning/
│   │   │   └── CompleteLessonRequest.php
│   │   ├── Note/
│   │   │   └── CreateNoteRequest.php
│   │   ├── Nova/
│   │   │   └── NovaChatRequest.php
│   │   ├── Quiz/
│   │   │   └── SubmitQuizAttemptRequest.php
│   │   ├── CodeExecution/
│   │   │   └── RunCodeRequest.php
│   │   ├── Community/
│   │   │   ├── CreateCommunityRequest.php
│   │   │   └── SendMessageRequest.php
│   │   └── Admin/
│   │       ├── StoreLessonRequest.php
│   │       └── StoreQuizRequest.php
│   │
│   └── Resources/            # API Resources untuk transformasi response JSON
│       ├── UserResource.php
│       ├── Learning/
│       │   ├── LearningPathResource.php
│       │   ├── ModuleResource.php
│       │   └── LessonResource.php
│       ├── NoteResource.php
│       ├── Quiz/
│       │   ├── QuizResource.php
│       │   └── QuizAttemptResource.php
│       ├── Community/
│       │   ├── CommunityResource.php
│       │   └── MessageResource.php
│       └── ProfileResource.php
│
├── Models/
│   ├── User.php
│   ├── LearningPath.php
│   ├── Module.php
│   ├── Lesson.php
│   ├── LessonProgress.php
│   ├── Note.php
│   ├── Quiz.php
│   ├── QuizQuestion.php
│   ├── QuizAttempt.php
│   ├── QuizAnswer.php
│   ├── CodingQuestion.php
│   ├── TestCase.php
│   ├── CodeSubmission.php
│   ├── XP.php
│   ├── Community.php
│   ├── CommunityMember.php
│   └── CommunityMessage.php
│
├── Services/
│   ├── Learning/
│   │   ├── LearningProgressService.php   # Mengelola lesson/module progress
│   │   └── ModuleLockService.php         # Mengelola locking/unlocking module
│   │
│   ├── Quiz/
│   │   ├── QuizEvaluationService.php     # Evaluasi jawaban Theory
│   │   └── QuizProgressService.php       # Menyimpan quiz attempt dan hasil
│   │
│   ├── Nova/
│   │   ├── NovaContextBuilder.php        # Membangun konteks dari DB
│   │   └── NovaService.php               # Mengirim request ke AI Provider
│   │
│   ├── CodeExecution/
│   │   ├── CodeExecutionService.php      # Orkestrator ke Code Exec Service
│   │   └── TestCaseEvaluator.php         # Membandingkan output vs expected
│   │
│   ├── XP/
│   │   └── XPService.php                 # Memberikan dan mencatat XP
│   │
│   └── Community/
│       └── CommunityService.php
│
├── Policies/
│   ├── NotePolicy.php          # Hanya pemilik yang dapat mengelola note
│   ├── CommunityPolicy.php     # Hanya owner yang dapat mengelola community
│   └── AdminPolicy.php         # Hanya admin yang dapat mengakses resource admin
│
├── Jobs/                       # Background jobs jika diperlukan
│   └── ProcessCodeExecution.php  # Opsional: jika eksekusi kode dijalankan async
│
└── Support/
    └── Helpers/
        └── ApiResponse.php     # Format response JSON yang konsisten
```

### Penjelasan Komponen Backend

**Controllers**
Controller hanya menerima request, mendelegasikan ke Service, dan mengembalikan API Resource sebagai response. Controller tidak mengandung business logic.

**Form Requests**
Validasi input dilakukan di Form Request sebelum data masuk ke controller. Ini memisahkan validasi dari business logic dan memudahkan testing.

**Services**
Business logic ada di layer Service. Service dapat memanggil Model secara langsung atau memanggil Service lain. Service tidak mengetahui tentang HTTP request atau response.

**Models**
Model merepresentasikan entitas database. Model dapat memiliki relationships, scopes, dan mutators. Tidak ada business logic yang kompleks di Model.

**Policies**
Authorization dikontrol melalui Laravel Policy. Setiap aksi sensitif (hapus note, kelola community) diotorisasi melalui Policy yang sesuai.

**API Resources**
API Resources mengontrol data apa yang dikembalikan ke frontend. Ini mencegah over-fetching dan memastikan respons yang konsisten.

---

## 7. API Architecture

React berkomunikasi dengan Laravel **hanya melalui REST API**. Seluruh request menggunakan format JSON. Request yang memerlukan autentikasi menyertakan Bearer Token di header.

### Contoh Endpoint Tingkat Tinggi

```
# Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password

# User & Profile
GET    /api/me
PUT    /api/me
GET    /api/profile/{username}

# Learning Path
GET    /api/learning-paths
GET    /api/learning-paths/{id}
POST   /api/learning-paths/{id}/enroll

# Module
GET    /api/learning-paths/{id}/modules
GET    /api/modules/{id}

# Lesson
GET    /api/modules/{id}/lessons
GET    /api/lessons/{id}
POST   /api/lessons/{id}/complete

# Notes
GET    /api/notes
POST   /api/lessons/{id}/notes
DELETE /api/notes/{id}

# NOVA (hanya untuk Module/Lesson)
POST   /api/nova/chat

# Quiz
GET    /api/modules/{id}/quiz
POST   /api/quizzes/{id}/attempts
GET    /api/quizzes/{id}/attempts/{attemptId}

# Code Execution (untuk Code Writing dan Code Completion)
POST   /api/code/run

# Progress
GET    /api/progress
GET    /api/progress/modules

# XP
GET    /api/xp

# Community
GET    /api/communities
POST   /api/communities
GET    /api/communities/{id}
POST   /api/communities/{id}/join
POST   /api/communities/{id}/leave
GET    /api/communities/{id}/members
GET    /api/communities/{id}/messages
POST   /api/communities/{id}/messages

# Admin — Learning Path
GET    /api/admin/learning-paths
POST   /api/admin/learning-paths
PUT    /api/admin/learning-paths/{id}
DELETE /api/admin/learning-paths/{id}

# Admin — Module
GET    /api/admin/modules
POST   /api/admin/modules
PUT    /api/admin/modules/{id}
DELETE /api/admin/modules/{id}

# Admin — Lesson
GET    /api/admin/lessons
POST   /api/admin/lessons
PUT    /api/admin/lessons/{id}
DELETE /api/admin/lessons/{id}

# Admin — Quiz & Questions
GET    /api/admin/quizzes
POST   /api/admin/quizzes
PUT    /api/admin/quizzes/{id}
DELETE /api/admin/quizzes/{id}
POST   /api/admin/quizzes/{id}/questions
PUT    /api/admin/questions/{id}
DELETE /api/admin/questions/{id}

# Admin — Coding Question & Test Case
POST   /api/admin/coding-questions
PUT    /api/admin/coding-questions/{id}
DELETE /api/admin/coding-questions/{id}
POST   /api/admin/coding-questions/{id}/test-cases
PUT    /api/admin/test-cases/{id}
DELETE /api/admin/test-cases/{id}
```

Endpoint di atas merupakan gambaran tingkat tinggi. Detail request/response schema akan didefinisikan dalam dokumen API Specification terpisah.

### Format Response

Seluruh respons API menggunakan format JSON yang konsisten:

```json
// Sukses
{
  "success": true,
  "data": { ... },
  "message": "Berhasil"
}

// Error
{
  "success": false,
  "message": "Pesan error yang jelas",
  "errors": { ... }
}
```

---

## 8. Authentication & Authorization

### Authentication Flow

Sintaks menggunakan **Laravel Sanctum** untuk token-based API authentication.

```
User mengisi form Register/Login
  ↓
React mengirim POST /api/auth/login
  ↓
Laravel memvalidasi kredensial
  ↓
Laravel membuat Sanctum Token
  ↓
Token dikirim ke React dalam response
  ↓
React menyimpan token di memory (atau localStorage)
  ↓
Setiap request berikutnya menyertakan:
  Authorization: Bearer {token}
  ↓
Laravel middleware auth:sanctum memvalidasi token
  ↓
Request dilanjutkan jika token valid
```

### Token Handling

Token disimpan di sisi client dan disertakan pada setiap request. Ketika user logout, token dihapus dari sisi server dan sisi client. Token memiliki masa berlaku yang dikonfigurasi di Laravel.

### User Roles

Sistem menggunakan dua role utama:

| Role | Deskripsi |
|------|-----------|
| `user` | User standar yang mengikuti pembelajaran |
| `admin` | Admin yang mengelola konten platform |

Role disimpan di tabel `users` dan diverifikasi di middleware.

### Authorization

**Middleware:**
- `auth:sanctum` — memastikan user sudah login
- `role:admin` — custom middleware yang memastikan user memiliki role admin

**Laravel Policies:**
- `NotePolicy` — memastikan user hanya dapat melihat, membuat, dan menghapus note miliknya sendiri
- `CommunityPolicy` — memastikan hanya owner yang dapat melakukan operasi tertentu pada community
- `AdminPolicy` — memastikan hanya admin yang dapat mengakses endpoint admin

**Prinsip utama:**
- User A tidak dapat menghapus note milik User B
- User biasa tidak dapat mengakses endpoint `/api/admin/*`
- Endpoint NOVA tidak menerima request dari konteks quiz (dikontrol di level Controller)
- Progress hanya dapat dibaca/dimodifikasi oleh user yang bersangkutan

---

## 9. Learning Architecture

### Hierarki Konten

```
LearningPath (Python)
    │
    └── Module (urutan 1, 2, 3, …)
            │
            ├── Lesson (urutan 1, 2, 3, …)
            │       └── LessonContent (explanation, code, output, tips, dll.)
            │
            └── Quiz
                    └── QuizQuestion (Theory / Code Writing / Code Completion)
```

### Ordering

Module dan Lesson memiliki kolom `order` di database. Ketika admin mengubah urutan, nilai `order` diperbarui. React menampilkan module dan lesson berdasarkan urutan ini.

### Module Prerequisite & Locking

Setiap module dapat memiliki `prerequisite_module_id`. Ketika user mencoba membuka suatu module, `ModuleLockService` memeriksa:

```
Apakah module ini memiliki prerequisite?
  ↓ Ya
Apakah prerequisite tersebut sudah berstatus Completed?
  ↓ Tidak → Kembalikan status Locked, tolak akses
  ↓ Ya → Izinkan akses
  ↓ Tidak ada prerequisite → Izinkan akses
```

### Module Status

Status module dihitung secara dinamis oleh `LearningProgressService` berdasarkan data progress user:

| Status | Kondisi |
|--------|---------|
| `locked` | Prerequisite belum selesai |
| `not_started` | Tidak ada lesson yang selesai |
| `in_progress` | Setidaknya satu lesson selesai, namun quiz belum selesai |
| `completed` | Semua lesson selesai DAN quiz selesai |

### Lesson Completion

Ketika user menandai lesson sebagai selesai:
1. Controller menerima request `POST /api/lessons/{id}/complete`
2. `LearningProgressService` membuat atau memperbarui record di `lesson_progress`
3. Progress module dikalkulasi ulang
4. `XPService` memberikan XP untuk completion lesson
5. Response dikembalikan ke React dengan status terbaru

### Quiz Akses

Quiz hanya dapat diakses jika semua lesson dalam module sudah berstatus selesai. Pemeriksaan dilakukan di `QuizController` sebelum mengembalikan data quiz.

---

## 10. Notes Architecture

### Struktur Relasi

```
User (1)
  └── Notes (banyak)
          └── Lesson (1, relasi ke lesson asal)
```

Setiap Note dimiliki oleh satu User dan terhubung ke satu Lesson.

### Alur Pembuatan Note

```
User memilih teks atau menulis catatan di Lesson
  ↓
React mengirim POST /api/lessons/{id}/notes
  ↓
Laravel memvalidasi input dan memastikan lesson_id valid
  ↓
NoteController membuat record Note dengan user_id dan lesson_id
  ↓
Note disimpan di database
  ↓
Response dikembalikan ke React
```

### Authorization

`NotePolicy` memastikan:
- User hanya dapat melihat note miliknya sendiri (`user_id === auth()->id()`)
- User hanya dapat menghapus note miliknya sendiri
- User tidak dapat mengakses note user lain

Ketika user membuka halaman Notes, Laravel hanya mengembalikan note dengan `user_id` yang sesuai dengan user yang sedang login.

### Relasi ke Lesson

Setiap note menyimpan `lesson_id`. Dari halaman Notes, user dapat mengklik note untuk navigasi langsung ke lesson asal. React menggunakan data `lesson_id` dan informasi lesson (nama, modul) yang dikembalikan bersama data note.

### NOVA dan Notes

Ketika user bertanya kepada NOVA dari dalam sebuah Lesson, `NovaContextBuilder` dapat mengambil note-note milik user yang terhubung ke lesson atau module yang sedang aktif, lalu menyertakannya sebagai bagian dari konteks percakapan.

---

## 11. NOVA Architecture

### Posisi NOVA dalam Sistem

NOVA adalah fitur **khusus Module dan Lesson**. Tidak ada endpoint, komponen, atau logika yang menghubungkan NOVA dengan Quiz.

### Alur Request NOVA

```
User mengetik pertanyaan di NOVAChat (dalam Lesson/Module)
  ↓
React mengirim POST /api/nova/chat
  dengan payload:
  {
    "message": "pertanyaan user",
    "context": {
      "lesson_id": 5,
      "module_id": 2
    }
  }
  ↓
NovaController menerima request
  ↓
NovaContextBuilder mengambil data dari database:
  - Data Learning Path
  - Data Module
  - Data Lesson
  - Lesson content (explanation, code examples, key points, common mistakes)
  - Note user yang relevan (jika ada)
  ↓
NovaContextBuilder menyusun prompt sistem dan konteks
  ↓
NovaService mengirim request ke AI Provider (API eksternal)
  dengan:
  - System prompt (peran NOVA sebagai tutor Python)
  - Konteks materi
  - Riwayat percakapan (jika disertakan)
  - Pertanyaan user
  ↓
AI Provider mengembalikan respons
  ↓
NovaService meneruskan respons ke Controller
  ↓
Controller mengembalikan respons ke React
  ↓
React menampilkan respons di NOVAChat
```

### Context yang Dibangun NOVA

```
NovaContextBuilder mengumpulkan:
  ├── Nama Learning Path ("Python")
  ├── Nama dan deskripsi Module saat ini
  ├── Nama Lesson saat ini
  ├── Konten Lesson:
  │     ├── Explanation
  │     ├── Code Examples
  │     ├── Output contoh
  │     ├── Key Points
  │     ├── Tips
  │     └── Common Mistakes
  └── Note user yang terhubung ke lesson/module ini (opsional)
```

### Kemampuan NOVA (sesuai PRD)

| Kemampuan | Cara Implementasi |
|-----------|-------------------|
| Ask | User mengetik pertanyaan bebas; konteks dikirim ke AI Provider |
| Explain | User meminta penjelasan lebih sederhana; prompt meminta AI untuk menyederhanakan |
| Example | User meminta contoh; prompt meminta AI untuk memberikan contoh tambahan dari konteks |
| Summarize | User meminta rangkuman; prompt meminta AI untuk merangkum lesson/module |
| Explain Note | User memilih note; isi note dikirim sebagai bagian konteks dengan permintaan penjelasan |
| Error Explanation | Jika ada code example di konteks dan user bertanya tentang error, AI menjelaskan secara konseptual |

### Batasan NOVA

- NOVA **tidak tersedia** di halaman Quiz (QuizPage, QuizContainer)
- Tidak ada endpoint `/api/nova/quiz/*` atau sejenisnya
- `NovaController` memvalidasi bahwa request berasal dari konteks lesson/module yang valid
- Komponen `NOVAChat` tidak di-render pada halaman Quiz

### AI Provider

Pada MVP, Sintaks menggunakan satu AI Provider eksternal (misalnya OpenAI atau Anthropic). Konfigurasi API key disimpan di environment variable Laravel, tidak pernah di-expose ke frontend.

### RAG

Pada MVP, NOVA menggunakan **context injection** langsung dari database, bukan RAG atau vector database. Pendekatan ini cukup karena konten setiap lesson sudah terstruktur dan terbatas. RAG dapat dipertimbangkan di masa depan jika volume konten bertambah signifikan.

---

## 12. Quiz Architecture

Quiz mendukung tiga tipe soal: Theory, Code Writing, dan Code Completion.

### Theory Quiz

```
QuizController mengembalikan data soal:
  - question text
  - pilihan jawaban (A, B, C, D)
  - (correct_answer_id TIDAK dikirim ke frontend)
  ↓
React menampilkan soal dan pilihan
  ↓
User memilih jawaban
  ↓
React mengirim POST /api/quizzes/{id}/attempts
  dengan answer_id
  ↓
QuizEvaluationService membandingkan answer_id dengan correct_answer_id di database
  ↓
Jika benar:
  - QuizProgressService menyimpan hasil (benar)
  - XPService memberikan XP
  - Response: { correct: true }
Jika salah:
  - QuizProgressService menyimpan hasil (salah)
  - Response: { correct: false, explanation: "..." }
  ↓
React menampilkan feedback sesuai hasil
```

Jawaban yang benar (`correct_answer_id`) **tidak pernah dikirim ke frontend** sebelum user menjawab. Evaluasi selalu terjadi di sisi server.

### Code Writing Quiz

```
QuizController mengembalikan:
  - Deskripsi problem
  - Starter code (jika ada)
  - Bahasa (Python)
  - Instruksi
  ↓
React menampilkan CodeEditor
  ↓
User menulis kode
  ↓
User menekan "Run Code" / "Check Answer"
  ↓
React mengirim POST /api/code/run
  dengan:
  {
    "code": "kode user",
    "quiz_question_id": 10,
    "language": "python"
  }
  ↓
CodeExecutionController meneruskan ke CodeExecutionService
  ↓
[Lihat Code Execution Architecture]
  ↓
Hasil eksekusi dikembalikan ke Laravel
  ↓
TestCaseEvaluator membandingkan output dengan test case
  ↓
Jika semua test case lolos:
  - QuizProgressService menyimpan hasil (benar)
  - XPService memberikan XP
  - Response: { result: "correct" }
Jika gagal:
  - QuizProgressService menyimpan hasil (salah)
  - Response: { result: "wrong_answer" / "syntax_error" / "runtime_error" / "timeout", detail: "..." }
  ↓
React menampilkan feedback
```

### Code Completion Quiz

```
QuizController mengembalikan:
  - Kode tidak lengkap (dengan placeholder untuk blank)
  - Daftar token pilihan
  ↓
React menampilkan kode dengan slot kosong
React menampilkan daftar token yang dapat dipilih
  ↓
User memilih token dan menempatkan ke slot yang sesuai
  ↓
Setelah semua slot terisi, user menekan "Check Answer"
  ↓
React mengirim POST /api/code/run
  dengan kode yang sudah dilengkapi
  ↓
Proses evaluasi sama seperti Code Writing
  ↓
Feedback ditampilkan
```

### Tidak Ada NOVA di Quiz

Halaman Quiz (`QuizPage`) tidak me-render komponen `NOVAChat`. Tidak ada tombol "Tanya NOVA", tidak ada hint dari AI. Seluruh feedback berasal dari sistem evaluasi quiz.

---

## 13. Code Execution Architecture

Ini adalah bagian yang paling kritis dari sisi keamanan.

### Prinsip Utama

Kode user **tidak pernah dieksekusi langsung** menggunakan fungsi seperti `exec()`, `shell_exec()`, atau `system()` di server Laravel.

### Alur Eksekusi Kode

```
React mengirim kode ke Laravel API
  ↓
CodeExecutionController menerima request
  ↓
Input validation (ukuran kode, karakter dasar)
  ↓
CodeExecutionService mempersiapkan payload
  ↓
Code Execution Service (service terpisah) menerima request
  ↓
  ┌─────────────────────────────────────────┐
  │         Code Execution Service           │
  │                                         │
  │  1. Syntax Check (Python AST/parser)    │
  │     → Jika gagal: kembalikan SyntaxError│
  │                                         │
  │  2. Security Check (static analysis)    │
  │     → Blokir: import os, subprocess,    │
  │       sys, socket, open, eval, exec,    │
  │       __import__, dan sejenisnya        │
  │     → Jika terdeteksi: tolak eksekusi   │
  │                                         │
  │  3. Masukkan kode ke dalam Sandbox      │
  └─────────────────────────────────────────┘
                    ↓
         ┌──────────────────────┐
         │      Sandbox          │
         │  (Isolated Container) │
         │                      │
         │  - CPU limit         │
         │  - Memory limit      │
         │  - Execution timeout │
         │  - No network access │
         │  - No filesystem     │
         │    access (host)     │
         │  - No subprocess     │
         │  - Python Runtime    │
         └──────────┬───────────┘
                    │
                    ▼
         Output / Error / Timeout
                    │
                    ▼
         Code Execution Service
         mengembalikan hasil ke Laravel
                    ↓
         TestCaseEvaluator di Laravel
         membandingkan output dengan
         expected output dari test case
                    ↓
         Hasil evaluasi:
         ├── Correct
         ├── Wrong Answer
         ├── Syntax Error
         ├── Runtime Error
         └── Timeout
                    ↓
         Laravel mengembalikan hasil ke React
```

### Resource Limits pada Sandbox

| Resource | Limit |
|----------|-------|
| Execution time | Dikonfigurasi per soal (misalnya: 5–10 detik) |
| Memory | Dibatasi (misalnya: 64MB–128MB) |
| Network | Tidak ada akses jaringan |
| Filesystem | Read-only atau tanpa akses ke host filesystem |
| Process | Tidak dapat spawn subprocess |
| Output size | Dibatasi untuk mencegah output flooding |

### Hasil Evaluasi

| Status | Keterangan |
|--------|------------|
| `correct` | Output sesuai dengan semua test case |
| `wrong_answer` | Eksekusi berhasil tetapi output tidak sesuai |
| `syntax_error` | Kode memiliki syntax error Python |
| `runtime_error` | Kode menghasilkan exception saat dieksekusi |
| `timeout` | Eksekusi melebihi batas waktu |
| `security_violation` | Kode mengandung pola yang diblokir oleh security check |

---

## 14. Test Case Architecture

### Struktur Test Case

Setiap Coding Question dapat memiliki banyak Test Case.

```
CodingQuestion
  └── TestCase[]
        ├── input (opsional)
        ├── expected_output
        ├── is_hidden (boolean)
        └── description (opsional, untuk public test case)
```

### Public vs Hidden Test Case

| Tipe | Dikirim ke Frontend | Fungsi |
|------|---------------------|--------|
| Public | Ya (input dan deskripsi) | Membantu user memahami format yang diharapkan |
| Hidden | Tidak | Memastikan solusi tidak dibuat untuk kasus tertentu saja |

**Public test case** ditampilkan ke user sebagai referensi sehingga mereka memahami format input dan output yang diharapkan.

**Hidden test case** disimpan di database dan **tidak pernah dikirim ke frontend**. Evaluasi dilakukan sepenuhnya di sisi server.

### Alur Evaluasi Test Case

```
Output dari Sandbox diterima oleh TestCaseEvaluator
  ↓
Laravel mengambil semua test case dari database
  (public DAN hidden)
  ↓
Untuk setiap test case:
  ├── Jalankan kode dengan input test case
  ├── Ambil output aktual
  ├── Bandingkan dengan expected_output
  └── Catat hasil (pass/fail)
  ↓
Jika semua test case pass → Correct
Jika ada satu test case fail → Wrong Answer
  (dengan detail test case mana yang gagal, tanpa mengungkap hidden test case)
```

---

## 15. Progress Architecture

### Data Progress yang Disimpan

| Data | Tabel | Keterangan |
|------|-------|------------|
| Lesson completion | `lesson_progress` | Status selesai per lesson per user |
| Module completion | Dihitung dari `lesson_progress` + quiz | Status module dihitung secara dinamis |
| Quiz attempt | `quiz_attempts` | Setiap percobaan quiz |
| Quiz result | `quiz_attempts` | Skor, benar, salah, status |
| Last accessed | `lesson_progress` | Untuk fitur Continue Learning |

### Module Status Calculation

```
LearningProgressService.getModuleStatus($userId, $moduleId):

1. Ambil semua lesson dalam module
2. Ambil semua lesson_progress user untuk lesson-lesson tersebut
3. Hitung jumlah lesson yang selesai
4. Ambil status quiz module terakhir

Jika module memiliki prerequisite yang belum selesai → Locked
Jika tidak ada lesson yang selesai → Not Started
Jika sebagian lesson selesai ATAU quiz belum selesai → In Progress
Jika semua lesson selesai DAN quiz selesai → Completed
```

### Continue Learning

Sistem menyimpan `last_accessed_at` pada `lesson_progress`. Dashboard mengambil lesson terakhir yang diakses user dan menampilkan tombol "Lanjutkan" yang mengarah langsung ke lesson tersebut.

### Module Unlocking

Setelah user menyelesaikan quiz suatu module:
1. `QuizProgressService` memperbarui status quiz sebagai selesai
2. `ModuleLockService` memeriksa apakah ada module yang menunggu module ini sebagai prerequisite
3. Module berikutnya secara otomatis menjadi `not_started` (tidak lagi `locked`)

---

## 16. XP Architecture

### Sumber XP

| Aktivitas | XP diberikan |
|-----------|-------------|
| Menyelesaikan Lesson | Setelah `POST /api/lessons/{id}/complete` berhasil |
| Menyelesaikan Quiz | Setelah seluruh soal quiz dijawab benar |
| Menjawab benar Code Writing | Setelah evaluasi `correct` |
| Menjawab benar Code Completion | Setelah evaluasi `correct` |

### XP Service

`XPService` bertanggung jawab memberikan dan mencatat XP:

```php
XPService::award($userId, $amount, $source, $sourceId):
  1. Tambahkan ke total XP user
  2. Catat di tabel xp_history:
     - user_id
     - amount
     - source (lesson_complete / quiz_complete / coding_correct)
     - source_id (id lesson/quiz/question)
     - created_at
```

### Penyimpanan XP

XP user disimpan di dua tempat:
- `users.total_xp` — total keseluruhan untuk tampilan cepat
- `xp_history` — riwayat detail per aktivitas

Pendekatan ini memudahkan tampilan total XP tanpa query agregat setiap saat, sekaligus mempertahankan riwayat untuk keperluan debugging dan audit sederhana.

### Idempotency

`XPService` memastikan XP tidak diberikan dua kali untuk aktivitas yang sama. Sebelum memberikan XP, service memeriksa apakah record di `xp_history` dengan `source` dan `source_id` yang sama sudah ada untuk user tersebut.

### Tidak Ada Gamifikasi Lanjutan

XP adalah satu-satunya mekanisme gamifikasi pada MVP. Tidak ada Level, Achievement, Badge, Streak, atau Leaderboard. Jangan menambahkan fitur-fitur tersebut.

---

## 17. Community Architecture

### Struktur Data

```
Community
  ├── id
  ├── name
  ├── description
  ├── owner_id (FK ke users)
  ├── created_at
  │
  ├── CommunityMembers[]
  │     ├── community_id
  │     ├── user_id
  │     └── joined_at
  │
  └── CommunityMessages[]
        ├── id
        ├── community_id
        ├── user_id
        ├── content
        └── created_at
```

### Alur Join & Leave

```
# Join
User menekan tombol Join
React → POST /api/communities/{id}/join
Laravel memeriksa: apakah user sudah menjadi anggota?
Jika belum → tambahkan ke community_members
Response: status berhasil

# Leave
User menekan tombol Leave
React → POST /api/communities/{id}/leave
Laravel memeriksa: apakah user adalah owner?
  Jika ya → owner tidak dapat leave (atau transfer ownership)
  Jika bukan owner → hapus dari community_members
Response: status berhasil
```

### Community Chat

Pesan community disimpan di tabel `community_messages`. React mengambil pesan terbaru melalui `GET /api/communities/{id}/messages` dengan pagination.

**Polling sederhana** dapat digunakan untuk MVP: React melakukan request ulang setiap beberapa detik untuk mendapatkan pesan baru. Ini cukup untuk MVP dan tidak memerlukan infrastruktur WebSocket.

Jika kebutuhan real-time meningkat di masa depan, **Laravel Broadcasting** dengan Pusher atau Laravel Echo dapat ditambahkan tanpa mengubah arsitektur utama.

### Authorization Community

- Hanya anggota (member) yang dapat mengirim dan membaca pesan dalam community
- Hanya owner yang dapat menghapus community (jika diimplementasikan)
- User yang belum join tidak dapat mengirim pesan
- `CommunityPolicy` mengontrol seluruh otorisasi ini

---

## 18. Profile Architecture

### Data Profile

Profile adalah representasi publik dari user dalam platform Sintaks.

```
User
  ├── name / username
  ├── email
  ├── avatar_key (referensi ke avatar yang dipilih)
  ├── total_xp
  └── [Progress & Completed Modules — diambil dari tabel progress]
```

### Avatar

Avatar diimplementasikan sebagai pilihan dari kumpulan avatar preset yang tersedia di frontend. User memilih avatar dari daftar, dan nilai `avatar_key` (string identifier) disimpan di database. Tidak ada upload gambar dari user.

### Data yang Ditampilkan di Profile

| Data | Sumber |
|------|--------|
| Nama / Username | Tabel `users` |
| Avatar | `users.avatar_key` |
| Total XP | `users.total_xp` |
| Learning Progress | Dihitung dari `lesson_progress` |
| Completed Modules | Diambil dari progress + quiz status |

### Tidak Ada Programming Skills

Profile **tidak memiliki** field atau tampilan untuk Programming Skills, skill rating, skill chart, atau technology list. Data ini bukan bagian dari MVP.

---

## 19. Admin Architecture

### Admin Interface

Admin mengakses Sintaks melalui antarmuka React yang sama dengan user biasa, namun dengan route dan komponen khusus admin. Route admin dilindungi oleh pemeriksaan role di sisi React (redirect jika bukan admin) dan middleware di sisi Laravel (response 403 jika bukan admin).

### Admin Data Flow

```
Admin membuka Admin Dashboard
  ↓
React Admin Interface
  ↓
Request ke /api/admin/* dengan Bearer Token
  ↓
Laravel middleware: auth:sanctum + role:admin
  ↓
Admin Controller
  ↓
Service (bisnis logik konten)
  ↓
MySQL
  ↓
Response ke React
```

### Operasi Admin

| Entitas | Operasi |
|---------|---------|
| Learning Path | Create, Read, Update, Delete, Reorder |
| Module | Create, Read, Update, Delete, Reorder, Set Prerequisite |
| Lesson | Create, Read, Update, Delete (termasuk semua elemen konten) |
| Quiz | Create, Read, Update, Delete |
| Quiz Question | Create, Read, Update, Delete (untuk semua tipe) |
| Coding Question | Create, Read, Update, Delete (starter code, time limit, memory limit) |
| Test Case | Create, Read, Update, Delete, Set public/hidden |

### Authorization Admin

Semua endpoint `/api/admin/*` dilindungi oleh dua lapisan:
1. `auth:sanctum` — memastikan user login
2. Middleware `EnsureUserIsAdmin` — memastikan role adalah `admin`

Admin tidak memiliki akses ke data personal user (notes, quiz attempts individual) kecuali data yang diperlukan untuk analisis konten.

---

## 20. Database Architecture

### Database Utama

MySQL digunakan sebagai satu-satunya database relasional Sintaks. Laravel berkomunikasi dengan MySQL melalui Eloquent ORM dan Laravel migrations.

### Database Management Tool

phpMyAdmin digunakan oleh developer untuk:
- Inspeksi struktur tabel
- Menjalankan query manual selama development
- Debugging data
- Memverifikasi hasil migrasi

phpMyAdmin **tidak** menjadi bagian dari application runtime dan **tidak** dapat diakses oleh user melalui aplikasi Sintaks.

### Foreign Keys & Referential Integrity

Seluruh relasi antar tabel menggunakan foreign key constraint yang didefinisikan melalui Laravel migrations. Ini memastikan integritas data, misalnya:
- Note tidak dapat ada tanpa user atau lesson yang valid
- Quiz attempt tidak dapat ada tanpa user atau quiz yang valid
- Test case tidak dapat ada tanpa coding question yang valid

Strategi `onDelete` disesuaikan per relasi: cascade untuk data yang harus ikut terhapus (misalnya, menghapus lesson menghapus semua note pada lesson tersebut), dan restrict untuk relasi yang harus diproteksi.

### Indexing (High-Level)

Kolom yang sering digunakan dalam query relasional harus diindeks:

| Kolom | Alasan |
|-------|--------|
| `lesson_progress.user_id` | Sering difilter per user |
| `lesson_progress.lesson_id` | Sering di-join dengan lesson |
| `notes.user_id` | Selalu difilter per user |
| `notes.lesson_id` | Digunakan untuk filter per lesson |
| `quiz_attempts.user_id` | Sering difilter per user |
| `community_members.community_id` | Digunakan untuk cek membership |
| `community_messages.community_id` | Selalu difilter per community |
| `xp_history.user_id` | Sering difilter per user |
| `modules.learning_path_id` | Digunakan dalam join module-path |
| `lessons.module_id` | Digunakan dalam join lesson-module |

Detail schema lengkap, tipe data, dan index spesifik akan didefinisikan dalam dokumen `SCHEMA.md`.

---

## 21. Data Flow

### Learning — Membaca Lesson

```
User membuka halaman Lesson
  ↓
React mengirim GET /api/lessons/{id}
  ↓
LessonController mengambil data lesson + konten dari MySQL
  ↓
LearningProgressService memeriksa status lesson (sudah selesai atau belum)
  ↓
LessonResource memformat data
  ↓
Response JSON ke React
  ↓
React menampilkan konten lesson
```

### Note — Membuat Note

```
User menulis catatan di halaman Lesson
  ↓
React mengirim POST /api/lessons/{id}/notes
  { "content": "teks catatan" }
  ↓
NoteController memvalidasi input (Form Request)
  ↓
NoteController membuat record Note di MySQL
  (user_id dari token, lesson_id dari URL)
  ↓
NoteResource memformat data
  ↓
Response ke React
  ↓
React menampilkan note baru di daftar
```

### NOVA — Percakapan

```
User mengetik pertanyaan di NOVAChat (dalam Lesson)
  ↓
React mengirim POST /api/nova/chat
  { "message": "...", "lesson_id": 5, "module_id": 2 }
  ↓
NovaController memvalidasi konteks (lesson/module valid)
  ↓
NovaContextBuilder mengambil dari MySQL:
  - Data lesson, module, learning path
  - Konten lesson (explanation, code, key points, dll.)
  - Note user yang relevan
  ↓
NovaContextBuilder membangun system prompt dan konteks
  ↓
NovaService mengirim request ke AI Provider (HTTP request eksternal)
  ↓
AI Provider mengembalikan respons teks
  ↓
NovaController mengembalikan respons ke React
  ↓
React menampilkan respons di NOVAChat
```

### Theory Quiz — Menjawab Soal

```
User memilih jawaban pada soal Theory
  ↓
React mengirim POST /api/quizzes/{id}/attempts
  { "question_id": 1, "answer_id": "B" }
  ↓
QuizController menerima request
  ↓
QuizEvaluationService membandingkan answer_id dengan correct_answer dari DB
  ↓
QuizProgressService menyimpan attempt ke MySQL
  ↓
Jika benar: XPService.award(userId, xp, 'quiz_correct', questionId)
  ↓
Response: { correct: true/false, explanation: "..." }
  ↓
React menampilkan feedback
```

### Coding Quiz — Code Writing

```
User menulis kode dan menekan "Check Answer"
  ↓
React mengirim POST /api/code/run
  { "code": "...", "quiz_question_id": 10, "language": "python" }
  ↓
CodeExecutionController memvalidasi input
  ↓
CodeExecutionService mengirim request ke Code Execution Service (HTTP/internal)
  ↓
Code Execution Service:
  ├── Syntax check
  ├── Security check
  └── Eksekusi di Sandbox
  ↓
Sandbox mengeksekusi kode dengan setiap test case input
  ↓
Output dikembalikan ke Laravel
  ↓
TestCaseEvaluator membandingkan output aktual vs expected output (semua test case)
  ↓
Jika semua lolos:
  QuizProgressService.saveResult(correct)
  XPService.award(userId, xp, 'coding_correct', questionId)
  Response: { result: "correct" }
Jika gagal:
  QuizProgressService.saveResult(wrong)
  Response: { result: "wrong_answer/syntax_error/...", detail: "..." }
  ↓
React menampilkan feedback
```

### Community — Mengirim Pesan

```
User mengetik pesan di Community Chat
  ↓
React mengirim POST /api/communities/{id}/messages
  { "content": "pesan" }
  ↓
CommunityMessageController memvalidasi:
  - Apakah user adalah anggota community ini?
  ↓
CommunityMessage dibuat di MySQL
  ↓
Response: message resource
  ↓
React menampilkan pesan baru
  ↓
(Polling berikutnya akan mengambil pesan ini juga)
```

### Database Management — Developer

```
Developer membuka phpMyAdmin di browser
  ↓
phpMyAdmin terhubung langsung ke MySQL
  ↓
Developer dapat menginspeksi tabel, menjalankan query, dll.
  (Sepenuhnya terpisah dari alur aplikasi)
```

---

## 22. Error Handling

### Strategi Error per Layer

**Frontend (React)**

| Kondisi Error | Penanganan |
|---------------|------------|
| Network error / API tidak tersedia | Tampilkan pesan "Koneksi bermasalah, coba lagi" |
| 401 Unauthorized | Interceptor Axios redirect ke halaman login |
| 403 Forbidden | Tampilkan pesan "Akses tidak diizinkan" |
| 404 Not Found | Tampilkan halaman 404 atau pesan konten tidak ditemukan |
| 422 Validation Error | Tampilkan pesan error per field pada form |
| 500 Server Error | Tampilkan pesan error generik |
| Loading state | Tampilkan spinner atau skeleton |

**Backend (Laravel)**

| Kondisi Error | Penanganan |
|---------------|------------|
| Validation error | Laravel Form Request mengembalikan 422 dengan detail error |
| Unauthenticated | Sanctum mengembalikan 401 |
| Unauthorized (Policy) | Laravel Policy mengembalikan 403 |
| Model tidak ditemukan | Eloquent ModelNotFoundException → 404 |
| Server error | Handler mengembalikan 500 dengan pesan generik |

**NOVA**

| Kondisi Error | Penanganan |
|---------------|------------|
| AI Provider tidak tersedia | Kembalikan pesan error yang informatif, jangan crash |
| Timeout dari AI Provider | Kembalikan pesan bahwa NOVA sedang sibuk, coba lagi |
| Konteks tidak valid | Validasi di Controller sebelum memanggil NovaService |

**Code Execution**

| Kondisi Error | Pesan ke User |
|---------------|--------------|
| Syntax Error | Tunjukkan baris dan jenis syntax error |
| Runtime Error | Tunjukkan jenis exception dan pesan error |
| Timeout | "Kode kamu melebihi batas waktu eksekusi" |
| Security Violation | "Kode kamu mengandung operasi yang tidak diizinkan" |
| Wrong Answer | "Output kamu belum sesuai, coba periksa kembali" |
| Code Exec Service down | Pesan generik, log error di server |

### Format Error Response

Seluruh error dari Laravel dikembalikan dalam format yang konsisten:

```json
{
  "success": false,
  "message": "Pesan yang dapat ditampilkan ke user",
  "errors": {
    "field_name": ["Pesan validasi field"]
  }
}
```

---

## 23. Security Architecture

### Authentication

- Laravel Sanctum digunakan untuk API token authentication
- Password disimpan menggunakan `bcrypt` (Laravel default)
- Token memiliki masa berlaku yang dikonfigurasi
- Logout menghapus token dari database

### Authorization

- Seluruh endpoint yang memerlukan login dilindungi middleware `auth:sanctum`
- Endpoint admin dilindungi middleware tambahan yang memeriksa role
- Laravel Policies digunakan untuk otorisasi per resource (note, community)
- User tidak dapat mengakses atau memodifikasi data milik user lain

### Input Validation

- Validasi di sisi client (React) untuk UX
- Validasi di sisi server (Laravel Form Requests) sebagai lapisan utama
- Panjang input dibatasi untuk mencegah payload yang berlebihan

### API Security

- **CORS** dikonfigurasi di Laravel untuk hanya mengizinkan origin frontend Sintaks
- **CSRF** tidak diperlukan karena menggunakan token-based API (bukan session cookie untuk API)
- **Rate limiting** diterapkan pada endpoint sensitif seperti login, register, dan NOVA chat menggunakan Laravel rate limiter

### AI Input Security

- Input user yang dikirim ke NOVA divalidasi panjang dan formatnya di sisi Laravel
- Input tidak dikirim langsung ke AI Provider tanpa melalui context builder
- Konteks yang dikirim ke AI Provider hanya berisi data dari database Sintaks, bukan data user lain

### Code Execution Security (prioritas tertinggi)

```
Lapisan pertahanan:
  1. Validasi input — panjang kode dibatasi
  2. Static analysis / Security check — blokir import berbahaya
     (os, subprocess, socket, sys, open, eval, exec, __import__, dll.)
  3. Sandbox isolation — container terpisah dari host
  4. Resource limits — CPU, memory, waktu
  5. No network — sandbox tidak memiliki akses internet
  6. No filesystem — sandbox tidak dapat membaca/menulis file host
```

Kode user tidak pernah menyentuh server Laravel secara langsung untuk dieksekusi.

### Database Security

- Laravel Eloquent menggunakan prepared statements secara default → SQL injection tidak mungkin terjadi melalui ORM
- Koneksi database hanya dapat diakses dari Laravel server, tidak dari luar
- phpMyAdmin hanya dapat diakses dari jaringan internal/developer

---

## 24. Performance

### API Response

- Gunakan **Eager Loading** Eloquent untuk menghindari N+1 query problem. Contoh: saat mengambil module beserta lessonnya, gunakan `Module::with('lessons')` bukan loop query.
- Gunakan **API Resources** untuk mengontrol field yang dikembalikan sehingga tidak ada data berlebih.

### Pagination

Data yang berpotensi besar harus dipaginasi:
- Daftar community messages
- Daftar notes user
- Daftar community

Gunakan cursor-based atau offset-based pagination dari Laravel.

### Database Indexing

Index pada kolom yang sering digunakan sebagai filter atau join (sudah dijelaskan di Bagian 20). Ini adalah optimisasi paling impactful untuk MVP.

### Queue / Background Job

Eksekusi kode oleh Code Execution Service bersifat asynchronous secara teknis (menunggu respons). Untuk MVP, request dapat bersifat synchronous (Laravel menunggu respons dari Code Execution Service). Jika waktu respons terasa terlalu lama, eksekusi dapat dipindahkan ke Laravel Job Queue (menggunakan database driver, tanpa Redis).

### Caching

Caching tidak ditambahkan secara default. Jika terdapat query yang terbukti berat dan data jarang berubah (seperti daftar learning path atau module), caching dengan Laravel Cache (file driver) dapat ditambahkan kemudian. Jangan tambahkan Redis hanya untuk caching jika belum terbukti dibutuhkan.

### Code Execution Timeout

Setiap eksekusi kode di sandbox memiliki timeout yang dikonfigurasi. Laravel menunggu respons dari Code Execution Service dengan timeout yang sedikit lebih lama dari timeout sandbox, agar error timeout dapat ditangkap dengan benar.

---

## 25. Scalability

### MVP

Pada MVP, arsitektur berjalan dalam satu deployment sederhana:
- React: static hosting atau CDN
- Laravel: single server
- MySQL: single instance
- Code Execution Service: satu instance di server yang sama atau terpisah

### Extensible untuk Bahasa Lain (Future)

Meskipun MVP hanya mendukung Python, Code Execution Service dirancang agar bahasa lain dapat ditambahkan tanpa mengubah arsitektur inti:

```
Request ke Code Execution Service:
{
  "language": "python",  // dapat diganti dengan "javascript", "java", dll.
  "code": "...",
  "test_cases": [...]
}
```

Code Execution Service memilih runtime yang sesuai berdasarkan field `language`. Menambahkan bahasa baru berarti menambahkan runtime baru di dalam Code Execution Service, tanpa mengubah kode Laravel atau React.

### Extensible Learning Path

Database dirancang untuk mendukung banyak learning path. Menambahkan learning path JavaScript di masa depan hanya memerlukan penambahan data, bukan perubahan arsitektur.

---

## 26. Deployment Architecture

### Environment

| Environment | Fungsi |
|-------------|--------|
| Development | Pengembangan lokal developer. Semua service berjalan di mesin lokal. phpMyAdmin tersedia. |
| Staging | Tiruan production. Digunakan untuk testing sebelum rilis. |
| Production | Environment yang digunakan pengguna nyata. |

### Gambaran Deployment

```
Internet
  ↓
[Web Server / Reverse Proxy]
  │
  ├── React Frontend (Static Files)
  │     → Dihosting sebagai static files
  │       (dapat di-serve dari web server yang sama atau CDN)
  │
  └── Laravel API
        → PHP-FPM + Nginx/Apache
        ↓
        MySQL
        (dapat di-server yang sama atau terpisah)

[Terpisah atau di server yang sama]
Code Execution Service
  ↓
Sandbox (Docker Container / Isolated Process)
```

### phpMyAdmin di Setiap Environment

| Environment | phpMyAdmin |
|-------------|------------|
| Development | Tersedia untuk semua developer. Biasanya diakses via localhost. |
| Staging | Tersedia untuk developer/QA dengan akses terbatas. |
| Production | **Tidak di-expose ke publik.** Akses hanya melalui VPN atau SSH tunnel jika benar-benar diperlukan. |

### Konfigurasi Environment

Laravel menggunakan file `.env` untuk konfigurasi per environment:
- Database credentials
- AI Provider API key
- Code Execution Service URL
- APP_ENV, APP_DEBUG
- Sanctum token expiry

Tidak ada secret yang di-commit ke repository.

---

## 27. Observability

### Application Logs

Laravel secara default menggunakan Monolog untuk logging. Log disimpan di `storage/logs/laravel.log` dan mencakup:
- Error dan exception
- Request yang gagal autentikasi
- Query lambat (jika slow query log diaktifkan)

Level log dikonfigurasi per environment (DEBUG di development, ERROR di production).

### Error Logs

Error yang tidak tertangani oleh aplikasi dicatat secara otomatis oleh Laravel exception handler. Untuk production, dapat diintegrasikan dengan service seperti Sentry (opsional, bukan requirement MVP) untuk notifikasi error secara proaktif.

### Code Execution Logs

Code Execution Service mencatat setiap eksekusi:
- ID request
- Bahasa
- Waktu eksekusi
- Status hasil (correct, error, timeout)
- Resource usage

Log ini **tidak menyimpan kode user** secara default untuk menjaga privasi, kecuali untuk keperluan debugging yang spesifik.

### NOVA / AI Request Logs

Request ke AI Provider dicatat dengan informasi:
- Timestamp
- Module/Lesson context ID
- Durasi request
- Status sukses/gagal

Konten pesan user dan respons AI **tidak disimpan di log** untuk menjaga privasi. Jika penyimpanan conversation diperlukan di masa depan, harus ada kebijakan privasi yang jelas.

### Basic Monitoring

Untuk MVP, monitoring sederhana menggunakan:
- Web server access log (Nginx/Apache) untuk memonitor traffic dan error rate
- Laravel log untuk application error
- Uptime monitoring sederhana (ping ke endpoint health check)

---

## 28. Testing Architecture

### Frontend Testing

**Component Testing**
Setiap komponen React diuji secara terisolasi menggunakan React Testing Library. Fokus pada:
- Komponen quiz (Theory, Code Writing, Code Completion)
- Komponen NOVA chat
- Komponen lesson content

**Integration Testing**
Pengujian alur lengkap per fitur:
- Alur login/logout
- Alur membaca lesson dan menyelesaikannya
- Alur mengerjakan quiz
- Alur membuat dan menghapus note

### Backend Testing

**Unit Testing**
Pengujian unit untuk Service yang kritis:
- `QuizEvaluationService` — memastikan evaluasi benar/salah akurat
- `ModuleLockService` — memastikan locking/unlocking bekerja dengan benar
- `LearningProgressService` — memastikan kalkulasi progress akurat
- `NovaContextBuilder` — memastikan konteks dibangun dengan benar
- `TestCaseEvaluator` — memastikan perbandingan output akurat
- `XPService` — memastikan XP diberikan dengan benar dan tidak duplikat

**Feature / API Testing**
Pengujian endpoint API menggunakan Laravel's built-in testing (PHPUnit):
- Autentikasi (register, login, logout)
- Akses learning path, module, lesson
- Pembuatan dan penghapusan note
- Submit quiz attempt
- Akses community
- Authorization (user A tidak dapat mengakses data user B)
- Admin endpoint tidak bisa diakses oleh user biasa

### Code Execution Testing

**Sandbox Tests**
- Memastikan kode Python yang valid berhasil dieksekusi
- Memastikan kode dengan syntax error mengembalikan `syntax_error`
- Memastikan kode dengan runtime error mengembalikan `runtime_error`
- Memastikan loop tak terbatas mengembalikan `timeout`

**Security Tests**
- Memastikan `import os` dan sejenisnya diblokir
- Memastikan `subprocess.run()` diblokir
- Memastikan `open()` untuk akses filesystem diblokir
- Memastikan output kode berbahaya tidak sampai ke sistem host

**Test Case Evaluation Tests**
- Memastikan output yang sesuai dengan expected output → `correct`
- Memastikan output yang tidak sesuai → `wrong_answer`
- Memastikan hidden test case tidak bocor ke response yang dikirim ke client

### NOVA Testing

**Context Building Tests**
- Memastikan `NovaContextBuilder` mengambil data yang benar dari database
- Memastikan note user yang relevan disertakan dalam konteks
- Memastikan data lesson yang lengkap tersedia dalam konteks

**Integration Tests**
- Memastikan endpoint `/api/nova/chat` menolak request dari konteks quiz
- Memastikan endpoint `/api/nova/chat` memerlukan autentikasi
- Memastikan respons dikembalikan dalam format yang benar

---

## 29. Architecture Decisions

| Keputusan | Pilihan | Alasan |
|-----------|---------|--------|
| Frontend Framework | React | Ditetapkan sebagai project requirement |
| Backend Framework | Laravel 12 | Ditetapkan sebagai project requirement |
| Database | MySQL | Ditetapkan sebagai project requirement |
| Database Management Tool | phpMyAdmin | Development dan database management tool |
| API Style | REST | Sederhana, well-understood, dan mudah di-maintain untuk tim kecil |
| Authentication | Laravel Sanctum | Terintegrasi dengan Laravel, cocok untuk SPA + API |
| Architecture Pattern | Modular Monolith | Cocok untuk MVP dan tim kecil; tidak memerlukan overhead microservices |
| Code Execution | Isolated Sandbox Service | Security critical; kode user tidak boleh dieksekusi di server utama |
| AI Integration | NOVA + AI Provider eksternal | Fleksibel, tidak perlu mengelola model sendiri di MVP |
| NOVA Context | Context Injection dari DB | Cukup untuk MVP; konten terstruktur dan terbatas |
| Community Real-time | Polling sederhana | Cukup untuk MVP; menghindari kompleksitas WebSocket |
| State Management (Frontend) | React Context + useState | Cukup untuk MVP; menghindari overhead library state management |
| Background Jobs | Laravel Queue (database driver) | Ringan, tidak memerlukan Redis; cukup untuk MVP |
| Gamification | XP saja | Sesuai PRD; tidak over-engineer |

---

## 30. Trade-offs

### Modular Monolith vs Microservices

**Dipilih: Modular Monolith**

Microservices memberikan isolasi yang kuat antara domain, tetapi membutuhkan infrastruktur yang kompleks (service discovery, inter-service communication, deployment pipeline per service, dll.). Untuk tim kecil dan MVP, overhead ini tidak sebanding dengan manfaatnya.

Modular Monolith mempertahankan kesederhanaan deployment dan development, sambil tetap memisahkan domain secara logical melalui struktur direktori dan Services. Jika di masa depan salah satu domain perlu dipisahkan menjadi service sendiri, struktur modular memudahkan proses tersebut.

Pengecualian yang sengaja dibuat: Code Execution Service **sengaja dipisahkan** karena alasan keamanan, bukan kemudahan. Ini adalah batasan yang tidak dapat dikompromikan.

---

### Direct Execution vs Isolated Sandbox

**Dipilih: Isolated Sandbox (tidak dapat dikompromikan)**

Menjalankan kode user langsung di server menggunakan `exec()` atau `shell_exec()` membuka risiko keamanan yang serius: akses filesystem, akses jaringan, konsumsi resource tak terbatas, dan potensi privilege escalation. Ini bukan trade-off yang dapat diterima dalam kondisi apapun.

Sandbox menambah kompleksitas deployment, namun ini adalah requirement yang tidak dapat diabaikan untuk keamanan platform.

---

### Context Injection vs RAG

**Dipilih untuk MVP: Context Injection**

RAG (Retrieval Augmented Generation) dengan vector database memungkinkan NOVA mencari konten yang relevan dari seluruh basis pengetahuan. Namun untuk MVP, volume konten terbatas dan terstruktur dengan baik per lesson/module.

Context injection langsung dari database lebih sederhana, tidak memerlukan infrastruktur tambahan (vector database, embedding model), dan cukup efektif selama konten per lesson tidak terlalu panjang. RAG dapat dipertimbangkan ketika volume konten bertambah signifikan di masa depan.

---

### REST vs GraphQL

**Dipilih: REST**

GraphQL memberikan fleksibilitas query yang lebih besar, namun membutuhkan learning curve dan setup yang lebih kompleks (schema, resolvers, DataLoader untuk N+1). Untuk MVP dengan endpoint yang relatif jelas dan tim yang mungkin belum familiar dengan GraphQL, REST lebih pragmatis dan mudah di-maintain.

---

### MySQL vs NoSQL

**Dipilih: MySQL**

Data Sintaks bersifat relasional dengan struktur yang jelas (User → Progress → Lesson → Module → Learning Path). Relasi antar entitas adalah inti dari fitur learning dan progress tracking. MySQL dengan foreign key dan relasi yang kuat lebih sesuai daripada NoSQL document store.

NoSQL bisa menjadi pilihan untuk data seperti chat history atau log jika diperlukan performa write yang tinggi, namun untuk MVP semua data dikelola di MySQL untuk kesederhanaan.

---

### Real-time Chat vs Polling

**Dipilih untuk MVP: Polling**

WebSocket atau Server-Sent Events memberikan pengalaman real-time yang lebih baik untuk community chat. Namun, infrastruktur tambahan yang diperlukan (Pusher, Redis, Laravel Echo) menambah kompleksitas yang tidak kritis untuk MVP.

Polling sederhana (React melakukan request setiap beberapa detik) cukup untuk MVP. Jika engagement community meningkat dan real-time menjadi kebutuhan nyata, Laravel Broadcasting dapat ditambahkan tanpa mengubah arsitektur utama.

---

## 31. Future Architecture Considerations

Berikut adalah pertimbangan arsitektur yang mungkin diperlukan setelah MVP, tetapi **tidak diimplementasikan sekarang**:

| Topik | Pertimbangan |
|-------|-------------|
| Multiple Programming Languages | Code Execution Service perlu menambahkan runtime per bahasa. Arsitektur sudah dirancang extensible melalui field `language` pada request. |
| RAG untuk NOVA | Jika volume konten meningkat, vector database dan embedding dapat ditambahkan agar NOVA dapat mencari konten yang relevan dari seluruh basis pengetahuan. |
| Real-time Community Chat | Laravel Broadcasting dengan Pusher atau Laravel WebSockets dapat menggantikan polling. Perubahan minimal di sisi React dan Laravel. |
| Code Execution Workers | Jika volume submission meningkat, Code Execution Service dapat di-scale secara horizontal dengan multiple worker. |
| Caching Layer | Jika query berat mulai teridentifikasi, Redis cache dapat ditambahkan untuk data yang jarang berubah (learning path, module list). |
| Advanced Community | Moderasi, thread, atau reaction dapat ditambahkan setelah fitur dasar community terbukti digunakan. |

---

## 32. Final Architecture Summary

### Diagram Arsitektur Lengkap

```
                    ┌──────────────────────────┐
                    │         Browser           │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      React Frontend        │
                    │        (SPA)               │
                    │                            │
                    │  Auth / Learning / Quiz    │
                    │  NOVA / Notes / Community  │
                    │  Profile / Admin           │
                    └────────────┬─────────────┘
                                 │
                                 │  REST API (JSON)
                                 │  Authorization: Bearer Token
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Laravel 12 API         │
                    │   (Modular Monolith)        │
                    │                            │
                    │  Controllers / Services    │
                    │  Policies / Resources      │
                    │  Auth / Learning / Quiz    │
                    │  NOVA / XP / Community     │
                    └─────────────┬────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────────┐
│  MySQL Database   │   │   NOVA Service    │   │  Code Execution      │
│                   │   │  (dalam Laravel)  │   │  Service             │
│  Users, Progress  │   │                  │   │  (service terpisah)  │
│  Learning, Quiz   │   │  Context Builder │   │                      │
│  Notes, XP        │   │  Prompt Builder  │   │  Syntax Check        │
│  Community        │   └────────┬─────────┘   │  Security Check      │
└──────────────────┘            │              └──────────┬───────────┘
                                │                         │
                                ▼                         ▼
                       ┌────────────────┐      ┌──────────────────────┐
                       │  AI Provider   │      │       Sandbox         │
                       │  (Eksternal)   │      │  (Isolated Container) │
                       │               │      │                       │
                       │  Claude /      │      │  Python Runtime       │
                       │  OpenAI / dll. │      │  CPU + Memory Limit   │
                       └────────────────┘      │  No Network / No FS  │
                                               └──────────────────────┘
```

### Developer Database Management (Terpisah dari Alur Aplikasi)

```
   Developer
      │
      │  (Browser — network internal saja)
      ▼
  phpMyAdmin
      │
      ▼
  MySQL Database
```

### Ringkasan Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React (SPA) |
| Backend | Laravel 12 (PHP) |
| Database | MySQL |
| Database Management | phpMyAdmin (developer only) |
| Authentication | Laravel Sanctum (Bearer Token) |
| AI Integration | NOVA Service → AI Provider Eksternal |
| Code Execution | Code Execution Service → Sandbox (Docker / Container) |
| API Style | REST API (JSON) |
| Architecture | Modular Monolith + Isolated Code Execution Service |

### Batasan yang Tidak Boleh Dilanggar

| Aturan | Alasan |
|--------|--------|
| Kode user tidak pernah dieksekusi di Laravel server | Keamanan |
| NOVA tidak tersedia di Quiz dalam bentuk apapun | Sesuai PRD |
| phpMyAdmin tidak menjadi bagian dari application runtime | Arsitektur |
| Hidden test case tidak pernah dikirim ke frontend | Integritas quiz |
| User hanya dapat mengakses data miliknya sendiri | Privasi dan keamanan |
| Tidak ada fitur di luar scope PRD.md | Fokus MVP |

---

*Dokumen ini adalah Architecture Document versi MVP Sintaks. Seluruh keputusan arsitektur yang tertulis di sini harus konsisten dengan PRD.md v1.0. Schema database lengkap akan didefinisikan dalam dokumen `SCHEMA.md`. Spesifikasi API lengkap akan didefinisikan dalam dokumen API Specification terpisah.*
