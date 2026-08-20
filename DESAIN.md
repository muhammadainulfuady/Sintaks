# DESAIN.md — Spesifikasi Desain UI/UX Sintaks

> **Versi:** 1.0 — MVP
> **Referensi:** PRD.md v1.0 · ARCHITECTURE.md v1.0 · SCHEMA.md v1.0
> **Platform:** React (SPA) + Laravel 12 API
> **Bahasa:** Indonesia

---

## Daftar Isi

1. [Brand & Product Identity](#1-brand--product-identity)
2. [Design Principles](#2-design-principles)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing System](#5-spacing-system)
6. [Border Radius](#6-border-radius)
7. [Shadow & Depth](#7-shadow--depth)
8. [Iconography](#8-iconography)
9. [Animation](#9-animation)
10. [Layout System](#10-layout-system)
11. [Responsive Design](#11-responsive-design)
12. [Global Navigation](#12-global-navigation)
13. [Design Tokens — Final Table](#13-design-tokens--final-table)
14. [Component Design System](#14-component-design-system)
15. [Page Inventory](#15-page-inventory)
16. [Authentication Pages](#16-authentication-pages)
17. [Dashboard](#17-dashboard)
18. [Learning Path Page](#18-learning-path-page)
19. [Module Page](#19-module-page)
20. [Lesson Page](#20-lesson-page)
21. [NOVA UI](#21-nova-ui)
22. [Quiz Experience](#22-quiz-experience)
23. [Theory Quiz](#23-theory-quiz)
24. [Code Writing Quiz](#24-code-writing-quiz)
25. [Code Completion Quiz](#25-code-completion-quiz)
26. [Code Editor](#26-code-editor)
27. [Quiz Result](#27-quiz-result)
28. [Notes](#28-notes)
29. [Community](#29-community)
30. [Profile](#30-profile)
31. [Admin UI](#31-admin-ui)
32. [Feedback System](#32-feedback-system)
33. [Empty States](#33-empty-states)
34. [Loading States](#34-loading-states)
35. [Error States](#35-error-states)
36. [Accessibility](#36-accessibility)
37. [Responsive Page Specification](#37-responsive-page-specification)
38. [User Flow](#38-user-flow)
39. [Visual Do & Don't](#39-visual-do--dont)
40. [Design Decisions / Conflicts](#40-design-decisions--conflicts)
41. [Final Checklist](#41-final-checklist)

---

## 1. Brand & Product Identity

### Nama & Tagline

**Nama:** Sintaks
**Tagline:** *"Jembatan dari Baris Pertama Menuju Developer Profesional"*

### Karakter Brand

Sintaks adalah platform belajar programming berbahasa Indonesia untuk pemula dan developer awal. Setiap keputusan desain mengutamakan karakter berikut:

| Karakter | Artinya dalam Desain |
|----------|----------------------|
| Edukatif | Hierarki konten jelas. Progress selalu terlihat. Materi terasa mudah dicerna. |
| Friendly | Bahasa UI ramah. Warna hangat namun tetap profesional. Tidak ada intimidasi visual. |
| Modern | Typography bersih. Grid konsisten. Tidak ada elemen dekoratif yang tidak fungsional. |
| Clean | Whitespace cukup. Komponen tidak berdesakan. Satu fokus per halaman. |
| Encouraging | Feedback positif terlihat jelas. Progress diperjelas. Error dijelaskan, bukan hanya ditampilkan. |
| Beginner-Friendly | Tidak ada jargon UI yang membingungkan. Code editor terasa welcoming, bukan intimidating. |

### Sintaks Terasa Seperti

Platform yang membuat belajar coding terasa mudah dimulai — bukan IDE, bukan enterprise dashboard, bukan social media. Bayangkan seorang tutor yang duduk di sebelah kamu dan menjelaskan Python dengan sabar.

---

## 2. Design Principles

Sepuluh prinsip ini menjadi landasan setiap keputusan desain Sintaks. Ketika ada trade-off, urutan ini menjadi prioritas.

1. **Learning First** — Setiap halaman dirancang untuk mendukung proses belajar, bukan untuk memamerkan fitur.
2. **Simplicity over Complexity** — Jika ada dua cara untuk menampilkan informasi, pilih yang lebih sederhana.
3. **Clear Progression** — User selalu tahu di mana posisinya dan langkah selanjutnya.
4. **Beginner Friendly** — Tidak ada asumsi bahwa user sudah familiar dengan konvensi developer tools.
5. **Feedback Should Teach** — Error bukan hanya sinyal gagal — error menjelaskan apa yang salah dan kenapa.
6. **Minimize Cognitive Load** — Satu halaman, satu tugas utama. Jangan sajikan terlalu banyak pilihan sekaligus.
7. **Consistent Interaction** — Pola interaksi yang sama untuk aksi yang sama, di semua halaman.
8. **Mobile Friendly** — Layout mobile dirancang sendiri, bukan sekadar penyusutan desktop.
9. **Accessible by Default** — Contrast cukup, keyboard navigable, screen reader friendly — dari awal, bukan sebagai afterthought.
10. **Light and Approachable** — Background terang, warna hangat, nuansa pendidikan yang menyenangkan.

---

## 3. Color System

### Filosofi Warna

Sintaks menggunakan **light theme sebagai satu-satunya tema**. Palette dipilih berdasarkan:
- Primary brand color yang terasa modern, trustworthy, dan educational.
- Semantic color yang konsisten — setiap warna punya satu makna, tidak digunakan untuk keperluan lain.
- Warna tidak mencolok. Tidak ada neon. Tidak ada gradients yang berlebihan.

### Palette Utama

**Primary: Indigo**
Indigo dipilih karena kombinasi unik yang jarang dimiliki warna lain: terasa teknologis dan profesional sekaligus accessible dan tidak mengintimidasi. Dibanding biru (terlalu korporat), ungu (terlalu playful), atau hijau (terlalu asosiasi dengan success state), indigo memberi kesan "tempat belajar yang serius tapi friendly."

```
Primary:        #4F46E5  — Indigo 600
PrimaryHover:   #4338CA  — Indigo 700
PrimaryLight:   #EEF2FF  — Indigo 50 (background aksen ringan)
```

**Secondary: Slate**
Digunakan untuk elemen UI netral — teks, border, surface.

```
Text:           #0F172A  — Slate 900
TextSecondary:  #64748B  — Slate 500
TextMuted:      #94A3B8  — Slate 400
Background:     #F8FAFC  — Slate 50
Surface:        #FFFFFF  — Pure White
Border:         #E2E8F0  — Slate 200
BorderStrong:   #CBD5E1  — Slate 300
```

**Semantic Colors**

```
Success:        #16A34A  — Green 600
SuccessLight:   #F0FDF4  — Green 50
Warning:        #D97706  — Amber 600
WarningLight:   #FFFBEB  — Amber 50
Error:          #DC2626  — Red 600
ErrorLight:     #FEF2F2  — Red 50
Info:           #0284C7  — Sky 600
InfoLight:      #F0F9FF  — Sky 50
```

**XP Color**
```
XP:             #7C3AED  — Violet 600 (subtle, sedikit berbeda dari Primary)
XPLight:        #F5F3FF  — Violet 50
```

### Design Tokens — Color

| Token | Value | Penggunaan |
|-------|-------|------------|
| `color.background` | `#F8FAFC` | Background halaman utama |
| `color.surface` | `#FFFFFF` | Card, modal, panel |
| `color.surfaceHover` | `#F1F5F9` | State hover pada card/list item |
| `color.primary` | `#4F46E5` | CTA button, active nav, link penting |
| `color.primaryHover` | `#4338CA` | Hover state primary button |
| `color.primaryLight` | `#EEF2FF` | Aksen ringan, badge primary, highlight |
| `color.text` | `#0F172A` | Body text, heading utama |
| `color.textSecondary` | `#64748B` | Label, deskripsi pendek, metadata |
| `color.textMuted` | `#94A3B8` | Placeholder, disabled text, hint |
| `color.border` | `#E2E8F0` | Border card, divider, input border |
| `color.borderStrong` | `#CBD5E1` | Border yang perlu lebih terlihat |
| `color.success` | `#16A34A` | Jawaban benar, lesson selesai, status complete |
| `color.successLight` | `#F0FDF4` | Background feedback sukses |
| `color.warning` | `#D97706` | Peringatan, status in progress |
| `color.warningLight` | `#FFFBEB` | Background feedback peringatan |
| `color.error` | `#DC2626` | Error kode, validasi gagal, status gagal |
| `color.errorLight` | `#FEF2F2` | Background feedback error |
| `color.info` | `#0284C7` | Informasi tambahan, tips |
| `color.infoLight` | `#F0F9FF` | Background tip/info |
| `color.xp` | `#7C3AED` | Label XP, badge XP gained |
| `color.xpLight` | `#F5F3FF` | Background badge XP |

---

## 4. Typography

### Filosofi Typography

Sintaks menggunakan tiga font role:
- **Display / UI:** untuk heading, label, navigasi.
- **Body:** untuk konten lesson, deskripsi, paragraph.
- **Code:** monospace khusus untuk kode Python, contoh kode, output.

### Font Families

```css
--font-sans:  'Plus Jakarta Sans', system-ui, sans-serif;
--font-body:  'Inter', system-ui, sans-serif;
--font-mono:  'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

**Alasan Plus Jakarta Sans:**
Terasa modern dan bersih, memiliki karakter yang sedikit lebih "friendly" dibanding Inter murni, cocok untuk heading yang terasa educational. Inter sebagai body font memberikan readability tinggi untuk teks panjang.

**Alasan JetBrains Mono:**
Memiliki ligaturs yang baik untuk kode Python, mudah dibaca, terlihat profesional tanpa terasa intimidating bagi pemula.

### Type Scale

| Token | Size | Line Height | Weight | Penggunaan |
|-------|------|-------------|--------|------------|
| `text.xs` | 12px | 1.5 | 400 | Label kecil, metadata, badge |
| `text.sm` | 14px | 1.5 | 400 | Body secondary, helper text |
| `text.base` | 16px | 1.6 | 400 | Body utama, paragraph |
| `text.lg` | 18px | 1.5 | 500 | Subheading, card title |
| `text.xl` | 20px | 1.4 | 600 | Section heading |
| `text.2xl` | 24px | 1.3 | 600 | Page subtitle |
| `text.3xl` | 30px | 1.2 | 700 | Page title |
| `text.4xl` | 36px | 1.1 | 700 | Hero heading (auth page) |
| `code.sm` | 13px | 1.6 | 400 | Inline code |
| `code.base` | 14px | 1.7 | 400 | Code block, editor |

### Aturan Typography

- Heading menggunakan `font-sans` (Plus Jakarta Sans).
- Body paragraph menggunakan `font-body` (Inter), ukuran 16px, line-height 1.6 — optimal untuk membaca lesson panjang.
- Semua elemen kode menggunakan `font-mono`.
- Maksimum lebar baca (measure) untuk body lesson: **72ch** — mencegah baris terlalu panjang.
- Jangan menggunakan font-weight di bawah 400 untuk body text.
- Hindari ALL CAPS untuk paragraf. Boleh untuk label kecil dengan letter-spacing.

---

## 5. Spacing System

Sistem spacing berbasis 4px. Semua jarak menggunakan kelipatan dari basis ini.

| Token | Value | Penggunaan Umum |
|-------|-------|-----------------|
| `space.1` | 4px | Jarak sangat kecil, gap icon-label |
| `space.2` | 8px | Padding kecil, gap dalam group |
| `space.3` | 12px | Padding badge, gap list item kecil |
| `space.4` | 16px | Padding default komponen, gap standard |
| `space.5` | 20px | Gap medium |
| `space.6` | 24px | Padding card, gap section kecil |
| `space.8` | 32px | Gap antar section, padding panel |
| `space.10` | 40px | Jarak antar komponen besar |
| `space.12` | 48px | Padding halaman mobile |
| `space.16` | 64px | Jarak antar section besar, padding halaman desktop |
| `space.20` | 80px | Hero padding |

### Aturan Spacing

- Padding horizontal halaman (mobile): `space.6` (24px) — cukup untuk breathing room di layar kecil.
- Padding horizontal halaman (desktop): `space.16` (64px).
- Gap antar card dalam grid: `space.4` (16px) hingga `space.6` (24px).
- Jarak antar section pada halaman: minimal `space.12` (48px).
- Inner padding card: `space.4`–`space.6` (16px–24px).

---

## 6. Border Radius

| Token | Value | Penggunaan |
|-------|-------|------------|
| `radius.sm` | 4px | Badge kecil, tag, chip |
| `radius.md` | 8px | Input, button standard |
| `radius.lg` | 12px | Card kecil, dropdown |
| `radius.xl` | 16px | Card utama, modal, panel |
| `radius.2xl` | 20px | Card besar (Learning Path) |
| `radius.pill` | 9999px | Badge pill, tag status |

### Aturan Radius

- Card konten utama menggunakan `radius.xl` (16px).
- Button menggunakan `radius.md` (8px) — tidak terlalu kotak, tidak terlalu bubble.
- Badge status (Locked, Completed, In Progress) menggunakan `radius.pill`.
- Modal dan NOVA panel menggunakan `radius.xl`.
- Code editor menggunakan `radius.lg` — terasa seperti terminal tapi bersih.
- Tidak ada border-radius 0 pada elemen yang terlihat user (kecuali intentional untuk desain tabel admin).

---

## 7. Shadow & Depth

Sintaks menggunakan shadow secara minimal. Hierarki dicapai melalui kombinasi background color, border, dan shadow ringan.

| Token | Value | Penggunaan |
|-------|-------|------------|
| `shadow.none` | `none` | Elemen flat, item dalam list |
| `shadow.sm` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Card secondary, input focus ring tidak |
| `shadow.md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)` | Card utama, dropdown |
| `shadow.lg` | `0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)` | Modal, NOVA panel, floating element |
| `shadow.focus` | `0 0 0 3px rgba(79,70,229,0.2)` | Focus ring untuk keyboard nav |

### Hierarki Depth

```
Background (#F8FAFC)
  └── Surface / Card (#FFFFFF + border + shadow.sm)
        └── Elevated Card (shadow.md)
              └── Modal / Panel (shadow.lg)
```

Tidak ada neumorphism. Tidak ada heavy glassmorphism. Border tipis (`1px solid color.border`) + shadow ringan sudah cukup memberi kedalaman.

---

## 8. Iconography

### Library yang Direkomendasikan

Gunakan **Lucide React** sebagai satu-satunya icon library. Lucide dipilih karena:
- Konsisten secara visual (stroke 2px, rounded corners, viewBox 24x24).
- Tersedia sebagai React component — mudah digunakan tanpa setup rumit.
- Coverage lengkap untuk semua kebutuhan Sintaks.
- Open source, bebas lisensi.

```
npm install lucide-react
```

Import per icon:
```tsx
import { BookOpen, CheckCircle, Lock, Code } from 'lucide-react';
```

### Aturan Icon Mutlak

**TIDAK BOLEH** menggunakan emoji sebagai elemen UI dalam bentuk apapun.

| Yang Dilarang | Pengganti yang Benar |
|---------------|----------------------|
| 🐍 Python | `<Code size={20} />` + label "Python" |
| 🤖 NOVA | Custom NOVA SVG icon atau `<Sparkles size={20} />` |
| ⭐ Catatan | `<Bookmark size={20} />` |
| 🔥 XP | `<Star size={20} />` atau `<Zap size={20} />` |
| 🎯 Target | `<Target size={20} />` |
| 📚 Materi | `<BookOpen size={20} />` |
| ✓ Check | `<CheckCircle size={20} />` |
| ❌ Error | `<XCircle size={20} />` |

Catatan: emoji pada **konten teks lesson** (yang diketik admin) tidak dilarang — itu konten, bukan UI element.

### Semantic Icon Map

| Konteks | Icon (Lucide) |
|---------|--------------|
| Learning Path | `BookOpen` |
| Module | `Layers` |
| Lesson | `FileText` |
| Quiz | `ClipboardList` |
| NOVA AI | `Sparkles` |
| Notes / Catatan | `Bookmark` |
| Progress selesai | `CheckCircle` |
| Progress belum mulai | `Circle` |
| Locked | `Lock` |
| Unlocked | `Unlock` |
| In Progress | `Clock` |
| XP | `Zap` |
| Community | `Users` |
| Chat / Pesan | `MessageCircle` |
| Send | `Send` |
| Profile / User | `User` |
| Avatar / Kamera | `Camera` |
| Settings | `Settings` |
| Dashboard | `LayoutDashboard` |
| Success | `CheckCircle` |
| Error | `XCircle` |
| Warning | `AlertTriangle` |
| Info | `Info` |
| Code | `Code2` |
| Run Code | `Play` |
| Copy | `Copy` |
| Reset | `RotateCcw` |
| Hapus | `Trash2` |
| Edit | `Pencil` |
| Tambah | `Plus` |
| Kembali | `ChevronLeft` |
| Lanjut | `ChevronRight` |
| Buka / Expand | `ChevronDown` |
| Tutup | `X` |

### Ukuran Icon

| Konteks | Ukuran |
|---------|--------|
| Dalam teks / label kecil | 14px (`size={14}`) |
| Dalam button, list item | 16px (`size={16}`) |
| Standalone icon navigasi | 20px (`size={20}`) |
| Icon utama (empty state, hero) | 40–48px |

### Warna Icon

- Icon dekoratif: `color.textSecondary` (`#64748B`)
- Icon pada elemen aktif: `color.primary` (`#4F46E5`)
- Icon success: `color.success` (`#16A34A`)
- Icon error: `color.error` (`#DC2626`)
- Icon warning: `color.warning` (`#D97706`)
- Icon info: `color.info` (`#0284C7`)

### Aksesibilitas Icon

Icon dekoratif (sudah ada label teks di sebelahnya):
```tsx
<BookOpen size={20} aria-hidden="true" />
```

Icon fungsional (icon-only button tanpa label teks):
```tsx
<button aria-label="Hapus catatan">
  <Trash2 size={16} aria-hidden="true" />
</button>
```

Icon dengan tooltip:
```tsx
<button aria-label="Reset kode ke starter code">
  <RotateCcw size={16} aria-hidden="true" />
</button>
```

Jangan membuat icon-only button tanpa accessible name.

---

## 9. Animation

### Filosofi

Animasi harus memperkuat proses belajar, bukan mengalihkan perhatian. Gunakan untuk memberikan feedback yang jelas — bukan untuk dekorasi.

### Durasi

| Token | Durasi | Penggunaan |
|-------|--------|------------|
| `duration.fast` | 100ms | Hover state, toggle kecil |
| `duration.base` | 150ms | Button state, highlight |
| `duration.medium` | 200ms | Fade in, slide kecil |
| `duration.slow` | 300ms | Modal open/close, page transition |
| `duration.xslow` | 400ms | Progress bar transition |

### Easing

```css
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1);   /* Semua transisi general */
--ease-enter:    cubic-bezier(0, 0, 0.2, 1);       /* Elemen masuk (fade in, slide in) */
--ease-exit:     cubic-bezier(0.4, 0, 1, 1);       /* Elemen keluar */
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1); /* Quiz correct feedback */
```

### Daftar Animasi yang Digunakan

| Elemen | Animasi | Durasi |
|--------|---------|--------|
| Button hover | background-color transition | fast (100ms) |
| Button press | scale(0.97) | fast (100ms) |
| Card hover | translateY(-2px), shadow upgrade | base (150ms) |
| Progress bar fill | width transition | xslow (400ms) + ease-default |
| Modal/overlay open | fade in + scale(0.95→1) | slow (300ms) |
| Modal/overlay close | fade out | medium (200ms) |
| NOVA typing indicator | animated dots | loop |
| Quiz feedback (correct) | scale bounce + background flush | medium + bounce easing |
| Quiz feedback (wrong) | shake kecil (translateX) | fast |
| Page transition | fade in | medium (200ms) |
| Sidebar open (mobile) | slide in dari kiri | slow (300ms) |
| Drawer open (mobile) | slide in dari bawah | slow (300ms) |
| Toast/notification | slide in dari atas atau bawah | medium (200ms) |
| Lesson item check | checkmark fill animation | base (150ms) |

### Yang Tidak Boleh Dilakukan

- Tidak ada animasi yang berlangsung lebih dari 500ms (kecuali loading spinner).
- Tidak ada animasi parallax.
- Tidak ada animasi yang loop terus tanpa tujuan (kecuali loading indicator).
- Tidak ada animasi yang muncul saat user scroll (scroll-triggered animation) — mengganggu proses belajar.
- Selalu sertakan `prefers-reduced-motion` fallback:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Layout System

### Container

```
Max-width container: 1280px
Padding horizontal (desktop): 64px (space.16) di kiri & kanan
Padding horizontal (tablet): 32px (space.8)
Padding horizontal (mobile): 24px (space.6)
```

### Layout Utama Aplikasi (Desktop)

Semua halaman authenticated menggunakan `AppLayout`:

```
┌──────────────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main Content (flex-1)         │
│                         │                                  │
│  [Logo Sintaks]         │  ┌──── Header Halaman ────┐    │
│                         │  │ Breadcrumb / Page Title │    │
│  [Nav Item] Dashboard   │  └─────────────────────────┘   │
│  [Nav Item] Learning    │                                  │
│  [Nav Item] Notes       │  [Konten Halaman]               │
│  [Nav Item] Community   │                                  │
│  [Nav Item] Profile     │                                  │
│                         │                                  │
│  ──────────────         │                                  │
│  [Avatar] Username      │                                  │
│  [Logout]               │                                  │
└─────────────────────────┴──────────────────────────────────┘
```

- Sidebar: `width: 240px`, `position: fixed`, `height: 100vh`, background `color.surface`, border-right `1px solid color.border`.
- Main content: `margin-left: 240px`, padding internal `space.8` (32px).

### Layout Lesson Page (Desktop — 3 Kolom)

Halaman lesson menggunakan layout khusus tiga kolom:

```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar App (240px)                                           │
├──────────────┬───────────────────────────┬───────────────────┤
│ Lesson Nav   │  Lesson Content           │  NOVA Panel       │
│ (200px)      │  (flex-1, max 680px)      │  (320px)          │
│              │                           │                   │
│ [Lesson 1] ✓ │  ## For Loop              │  [NOVA Header]    │
│ [Lesson 2] ✓ │                           │  [Chat Messages]  │
│ [Lesson 3] → │  Explanation...           │  [Suggestions]    │
│ [Lesson 4]   │                           │  [Input]          │
│              │  ```python                │                   │
│  [Quiz] 🔒   │  for i in range(5):       │                   │
│              │    print(i)               │                   │
│              │  ```                      │                   │
│              │                           │                   │
│              │  [Output]                 │                   │
│              │  [Key Points]             │                   │
│              │  [Tips]                   │                   │
│              │  [References]             │                   │
│              │                           │                   │
│              │  [Selesaikan Lesson]      │                   │
└──────────────┴───────────────────────────┴───────────────────┘
```

- Lesson Navigation: `width: 200px`, fixed atau sticky, overflow-y: auto.
- Lesson Content: max-width `680px`, centered dalam area tengah.
- NOVA Panel: `width: 320px`, fixed di kanan, height mengikuti viewport.

### Layout Auth (Centered)

```
┌──────────────────────────────────┐
│                                  │
│     [Logo Sintaks]               │
│     [Tagline]                    │
│                                  │
│  ┌────────────────────────┐      │
│  │    Form Card           │      │
│  │    max-width: 400px    │      │
│  └────────────────────────┘      │
│                                  │
└──────────────────────────────────┘
```

---

## 11. Responsive Design

### Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `screen.sm` | 640px | Mobile landscape, small phone |
| `screen.md` | 768px | Tablet portrait |
| `screen.lg` | 1024px | Tablet landscape, laptop kecil |
| `screen.xl` | 1280px | Desktop |
| `screen.2xl` | 1536px | Desktop besar |

Primary breakpoints yang digunakan:

```
< 768px   → Mobile behavior
768–1023px → Tablet behavior
≥ 1024px  → Desktop behavior
```

### Behavior per Breakpoint

**Mobile (< 768px)**

- Sidebar hilang. Navigasi menjadi **Bottom Navigation Bar** (5 item: Dashboard, Learning, Notes, Community, Profile).
- NOVA Panel menjadi **Bottom Sheet** yang bisa di-expand dari tombol di dalam lesson page.
- Quiz dalam single column.
- Code editor full-width dengan horizontal scroll untuk baris kode panjang.
- Card Learning Path dan Module menjadi stacked (full-width).
- Header halaman menyertakan hamburger menu jika ada sub-navigasi.
- Lesson Navigation menjadi **Drawer** yang dibuka dari tombol di header lesson.

**Tablet (768px–1023px)**

- Sidebar menjadi **Collapsible Sidebar** (bisa dikecilkan menjadi icon-only mode, lebar 56px).
- Layout lesson: dua kolom (Lesson Nav + Content). NOVA menjadi floating button di kanan bawah yang membuka Bottom Sheet.
- Card dalam grid 2 kolom.
- Code editor full-width atau 75% lebar halaman.

**Desktop (≥ 1024px)**

- Layout tiga kolom penuh pada halaman lesson.
- Sidebar fixed 240px.
- Grid card bisa 3 kolom.

### Bottom Navigation (Mobile)

```
┌──────────────────────────────────────────┐
│                                          │
│            [Konten Halaman]              │
│                                          │
├───────────┬──────────┬────────┬──────────┤
│ Dashboard │ Learning │ Notes  │Community │ Profile │
│  [icon]   │  [icon]  │ [icon] │ [icon]   │ [icon]  │
│  label    │  label   │ label  │  label   │  label  │
└───────────┴──────────┴────────┴──────────┴─────────┘
```

- Height bottom nav: 56px.
- Icon 20px, label 11px.
- Active state: icon dan label menggunakan `color.primary`.
- Background `color.surface` dengan `shadow.lg` di bagian atas.
- Safe area padding untuk notch/gesture bar (iOS).

---

## 12. Global Navigation

### Desktop Sidebar

```
┌─────────────────────────┐
│  [S] Sintaks            │  ← Logo + nama, 40px height
│                         │
│  ─── Menu ──────────    │
│  [LayoutDashboard]      │
│  Dashboard              │
│                         │
│  [BookOpen]             │
│  Learning               │
│                         │
│  [Bookmark]             │
│  Notes                  │
│                         │
│  [Users]                │
│  Community              │
│                         │
│  ─── ─────────────      │
│  [User] username        │
│  [LogOut] Keluar        │
└─────────────────────────┘
```

- Nav item height: 40px.
- Active state: background `color.primaryLight`, teks `color.primary`, left border 3px `color.primary`.
- Hover state: background `color.surfaceHover`.
- Padding horizontal item: `space.4` (16px).
- Gap antar item: `space.1` (4px).

**Keputusan UX:** Profile tidak masuk sebagai nav item utama — hanya ada shortcut di bawah sidebar. Ini mengurangi visual noise dan menjaga fokus navigasi pada learning activities. User mengakses Profile melalui klik avatar di bawah sidebar.

### Breadcrumb

Digunakan pada halaman dengan hierarki dalam (Module → Lesson):

```
Python  /  Module 04 — Loop  /  For Loop
```

- Font: `text.sm`, `color.textSecondary`.
- Separator: `/` karakter, bukan icon.
- Item aktif (current page): `color.text`, bold.
- Item sebelumnya: `color.textSecondary`, clickable link dengan hover underline.

---

## 13. Design Tokens — Final Table

### CSS Custom Properties

Implementasi sebagai CSS variables untuk digunakan di React:

```css
:root {
  /* Colors */
  --color-background:     #F8FAFC;
  --color-surface:        #FFFFFF;
  --color-surface-hover:  #F1F5F9;
  --color-primary:        #4F46E5;
  --color-primary-hover:  #4338CA;
  --color-primary-light:  #EEF2FF;
  --color-text:           #0F172A;
  --color-text-secondary: #64748B;
  --color-text-muted:     #94A3B8;
  --color-border:         #E2E8F0;
  --color-border-strong:  #CBD5E1;
  --color-success:        #16A34A;
  --color-success-light:  #F0FDF4;
  --color-warning:        #D97706;
  --color-warning-light:  #FFFBEB;
  --color-error:          #DC2626;
  --color-error-light:    #FEF2F2;
  --color-info:           #0284C7;
  --color-info-light:     #F0F9FF;
  --color-xp:             #7C3AED;
  --color-xp-light:       #F5F3FF;

  /* Typography */
  --font-sans:  'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;

  /* Font Sizes */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */

  /* Spacing */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;

  /* Border Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  20px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:   0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05);
  --shadow-lg:   0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04);
  --shadow-focus: 0 0 0 3px rgba(79,70,229,0.2);

  /* Transitions */
  --duration-fast:   100ms;
  --duration-base:   150ms;
  --duration-medium: 200ms;
  --duration-slow:   300ms;
  --duration-xslow:  400ms;
  --ease-default:  cubic-bezier(0.4, 0, 0.2, 1);

  /* Breakpoints (digunakan via media queries) */
  /* --screen-sm: 640px, --screen-md: 768px, --screen-lg: 1024px, --screen-xl: 1280px */

  /* Component Heights */
  --height-input:       40px;
  --height-button:      40px;
  --height-button-sm:   32px;
  --height-button-lg:   48px;
  --height-sidebar:     100vh;
  --height-bottom-nav:  56px;
  --height-navbar:      60px;
  --width-sidebar:      240px;
  --width-nova-panel:   320px;
  --width-lesson-nav:   200px;
  --max-width-container: 1280px;
  --max-width-content:   680px;   /* Lesson reading width */
  --max-width-form:      400px;   /* Auth form */
}
```

### Tailwind Configuration (Opsional)

Jika project memilih menggunakan Tailwind CSS, extend `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
          light: '#EEF2FF',
        },
        xp: {
          DEFAULT: '#7C3AED',
          light: '#F5F3FF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        content: '680px',
        form: '400px',
      },
    },
  },
};
```

---

## 14. Component Design System

### A. Layout Components

**AppShell**
Wrapper utama authenticated pages. Mengandung Sidebar (desktop) atau Bottom Navigation (mobile) + main content area.

Props: `children`

Behavior:
- Desktop: Sidebar fixed kiri + content area dengan margin-left.
- Mobile: Bottom nav + content full-width.

**Sidebar**
Desktop navigation panel.

```
Props: currentPath, user
States: normal, item-active, item-hover
```

**BottomNavigation**
Mobile navigation bar di bawah layar.

```
Props: currentPath
States: normal, active, hidden (saat scroll ke bawah di lesson)
```

Behavior: Sembunyikan Bottom Nav saat user scroll ke bawah dalam Lesson Page — untuk memaksimalkan area baca. Muncul kembali saat scroll ke atas.

**PageWrapper**
Container untuk setiap page content. Menerapkan max-width dan padding.

---

### B. Navigation Components

**NavItem**
```
Props: icon, label, href, isActive
States: default, hover, active
Visual: icon 20px + label 14px + left-border indicator saat active
```

**Breadcrumb**
```
Props: items[]  // { label, href }
Visual: item / item / current-item
```

**Tabs**
Digunakan pada Module Page untuk switching antara Lessons dan Quiz.
```
Props: tabs[], activeTab, onTabChange
Visual: underline style, bukan pill/box
States: default, active, hover
```

---

### C. Learning Components

**LearningPathCard**
Card untuk Learning Path (Python) di halaman Learning Path.

```
Props: title, description, progress, moduleCount, icon
Visual:
┌────────────────────────────────────┐
│  [Code2 icon, 32px]                │
│  Python                            │
│  Belajar programming dari dasar    │
│                                    │
│  Progress: ███████░░░ 70%          │
│  12 Module • 48 Lesson             │
│  [Lanjut Belajar →]                │
└────────────────────────────────────┘
Border: 1px color.border
Shadow: shadow.md
Radius: radius.2xl
Hover: card naik 2px + shadow upgrade
```

**ModuleCard**
Card untuk setiap Module dalam Learning Path.

```
Props: title, description, order, status, progress, lessonCount
Status variants: locked, not_started, in_progress, completed

Locked:
┌────────────────────────────────────┐
│  [Lock icon]  Module 02 — Operator │
│  ████░░░░░░░  0%                   │
│  Selesaikan Module 01 terlebih dahulu │
└────────────────────────────────────┘
Background: color.surface, opacity sedikit reduced
Border: color.border, style dashed

In Progress:
┌────────────────────────────────────┐
│  [Clock icon]  Module 03           │
│  ███████░░░░  60%                  │
│  3 dari 5 Lesson selesai           │
│  [Lanjut →]                        │
└────────────────────────────────────┘

Completed:
┌────────────────────────────────────┐
│  [CheckCircle icon, green]  Module 01│
│  ████████████  100%                │
│  5 Lesson • Quiz Selesai           │
└────────────────────────────────────┘
Border-left: 3px color.success
```

**LessonItem**
Item dalam daftar lesson di dalam Module Page atau Lesson Navigation.

```
Props: title, status, isActive, onClick
States: not_started, in_progress, completed, active (sedang dibaca)

Visual:
[CheckCircle/Circle/ChevronRight icon]  Judul Lesson
                                        ^-- icon sesuai status

Completed:  icon CheckCircle (color.success), teks color.textSecondary, line-through subtle
Active:     background color.primaryLight, teks color.primary, bold
In Progress: icon ChevronRight (color.primary)
Not Started: icon Circle (color.textMuted)
```

**ProgressBar**
```
Props: value (0–100), size, color, showLabel
Sizes: sm (4px), md (8px), lg (12px)
Visual: background color.border, fill color sesuai context (primary/success/warning)
Animation: width transition 400ms ease
```

---

### D. Content Components

**ContentSection**
Wrapper untuk setiap section dalam lesson (Explanation, Key Points, Tips, dll).

**CodeBlock**
Menampilkan contoh kode Python dengan syntax highlighting.

```
Props: code, language, showOutput, output
Visual:
┌────────────────────────────────────┐
│ Python                    [Copy]   │  ← header bar, background #1E293B
│                                    │
│  for i in range(5):                │  ← kode dengan syntax highlighting
│      print(i)                      │     background: #0F172A (dark code area)
│                                    │     font: font-mono, 14px
└────────────────────────────────────┘
```

**Catatan penting:** CodeBlock untuk materi (bukan quiz) menggunakan dark background HANYA pada area kode — ini adalah code display area, bukan keseluruhan halaman. Background halaman tetap terang.

Syntax Highlighting color scheme (minimal, tidak mencolok):
```
keyword:   #818CF8  (indigo muda)
string:    #86EFAC  (hijau muda)
number:    #FCA5A5  (merah muda)
comment:   #64748B  (slate, italic)
function:  #93C5FD  (biru muda)
default:   #E2E8F0  (putih gading)
```

**OutputBlock**
Menampilkan output dari contoh kode.

```
Visual:
┌────────────────────────────────────┐
│ Output                             │  ← label kecil, background slate-800
│ 0                                  │
│ 1                                  │
│ 2                                  │
└────────────────────────────────────┘
```

**ImportantPoint**
Menampilkan Key Points dari lesson.

```
Visual: card dengan left-border 3px color.primary, background color.primaryLight
[Info icon, 16px]  Poin penting teks
```

**TipCard**
Menampilkan Tips dari lesson.

```
Visual: card dengan background color.infoLight, border color.info (opacity 0.3)
[Lightbulb icon, 16px]  Tips teks
```

**CommonMistakeCard**
Menampilkan Common Mistakes.

```
Visual: card dengan background color.warningLight, border color.warning (opacity 0.3)
[AlertTriangle icon, 16px]  Kesalahan umum teks
```

---

### E. NOVA Components

**NovaPanel**
Panel NOVA di kanan halaman lesson (desktop) atau bottom sheet (mobile).

**NovaMessage**
Bubble chat individual. Dua variant: user dan NOVA.

```
User message:  background color.primary, teks putih, aligned kanan
NOVA message:  background color.surface, border, aligned kiri
```

**NovaInput**
Input teks untuk mengirim pesan ke NOVA.

**NovaSuggestion**
Tombol suggestion cepat di atas input NOVA.

```
Visual: chip-style button, border, radius.pill
[Apa itu for loop?]  [Jelaskan lebih mudah]  [Berikan contoh]
```

**NovaTypingIndicator**
Animated indicator saat NOVA sedang memproses.

```
Visual: tiga titik bergerak (bouncing dots animation)
```

---

### F. Quiz Components

**QuizHeader**
Header quiz yang menampilkan progress dan nomor soal.

```
Visual:
Soal 3 dari 10
[████████░░░░░░░░]  30%
                       ← progress bar
```

**QuestionCard**
Wrapper soal quiz.

**AnswerOption (Theory)**
Pilihan jawaban pilihan ganda.

```
Props: label, text, isSelected, isCorrect, isWrong, isDisabled
States:
- Default: border color.border, background color.surface
- Hover: border color.primaryLight, background color.primaryLight
- Selected: border color.primary, background color.primaryLight
- Correct (after submit): border color.success, background color.successLight
                          [CheckCircle icon, color.success] di kanan
- Wrong (after submit): border color.error, background color.errorLight
                        [XCircle icon, color.error] di kanan
```

**QuizProgress**
Progress bar + nomor soal di header quiz.

**QuizFeedback**
Feedback setelah menjawab soal.

```
Correct:
┌─────────────────────────────────┐
│ [CheckCircle, green]  Benar!    │  ← background color.successLight
│ Penjelasan singkat di sini.     │
│                    [Lanjut →]   │
└─────────────────────────────────┘

Wrong:
┌─────────────────────────────────┐
│ [XCircle, red]  Belum tepat.    │  ← background color.errorLight
│ Penjelasan singkat di sini.     │
│                 [Coba Lagi]     │
└─────────────────────────────────┘
```

Feedback tidak memenuhi seluruh layar. Muncul di bawah soal atau sebagai panel di bawah area soal.

**CodeEditor** (lihat Section 26)

**CodeCompletionOption**
Token pilihan yang bisa diklik user untuk mengisi blank.

```
Props: text, isUsed, isSelected
States:
- Default: pill button, border color.border
- Hover: background color.primaryLight
- Used/Selected: background color.primary, teks putih
- Disabled (sudah dipakai): opacity 0.4, pointer-events none
```

**TestResult**
Menampilkan hasil evaluasi kode.

---

### G. Notes Components

**NoteCard**
Card catatan di halaman Notes.

```
┌───────────────────────────────────────────┐
│ [Bookmark icon]  range(5) menghasilkan    │
│                  angka 0 sampai 4.        │
│                                           │
│  Python  /  Loop  /  For Loop             │  ← tag kecil
│                         [Buka Materi →]   │
│                              [Trash2]     │
└───────────────────────────────────────────┘
```

**SaveNoteButton**
Tombol di dalam lesson untuk menyimpan catatan.

```
States:
- Default:  [Bookmark icon]  Simpan Catatan
- Saved:    [BookmarkCheck icon, color.primary]  Tersimpan
```

---

### H. Community Components

**CommunityCard**
```
┌────────────────────────────────────┐
│  Python Beginner Indonesia         │
│  12 anggota                        │
│  Belajar Python bersama.           │
│                     [Buka →]       │  ← jika sudah join
│                     [Gabung]       │  ← jika belum join
└────────────────────────────────────┘
```

**MessageBubble**
```
[Avatar]  Username
          Pesan teks
          14:32
```

**MessageInput**
```
[Input field...............]  [Send button]
```

---

### I. Button System

**Variant: Primary**
```
Background: color.primary
Text: white
Hover: color.primaryHover
Focus: shadow.focus (ring indigo)
Disabled: opacity 0.5, cursor not-allowed
Loading: [Spinner icon] teks
Height: --height-button (40px)
Radius: --radius-md (8px)
Padding: 10px 20px
```

**Variant: Secondary**
```
Background: color.surface
Text: color.primary
Border: 1px color.primary
Hover: background color.primaryLight
```

**Variant: Ghost**
```
Background: transparent
Text: color.textSecondary
Hover: background color.surfaceHover
```

**Variant: Danger**
```
Background: color.error
Text: white
Hover: #B91C1C (Red 700)
```

**Variant: Success (digunakan setelah jawaban benar)**
```
Background: color.success
Text: white
```

**Icon Button**
```
Padding: 8px
Border-radius: radius.md
Harus memiliki aria-label
```

**Size Variants**

| Size | Height | Padding H | Font |
|------|--------|-----------|------|
| sm | 32px | 12px | text.sm |
| md (default) | 40px | 20px | text.base |
| lg | 48px | 24px | text.lg |

---

### J. Form System

**Input Field**
```
Structure:
[Label teks]          ← text.sm, color.text, font-weight 500
[Input element]       ← height 40px, padding 10px 14px, radius.md
                         border: 1px color.border
                         focus: border color.primary, shadow.focus
[Helper text]         ← text.sm, color.textSecondary (opsional)
[Error message]       ← text.sm, color.error, dengan XCircle icon 14px

Required indicator:
Label Teks *         ← asterisk warna color.error
```

**Textarea**
Sama dengan Input, height auto dengan min-height 80px.

**Error Display**
Error selalu muncul tepat di bawah field yang bermasalah, bukan di atas form atau di akhir halaman.

```
[Input — border color.error]
[XCircle icon, 14px, red]  Pesan error spesifik
```

---

### K. Card System

Card hanya memiliki tiga level:

1. **Level 0 — Flat:** background color.surface, border `1px solid color.border`, no shadow. Digunakan untuk list item, sub-section.
2. **Level 1 — Elevated:** border + `shadow.sm`. Digunakan untuk card konten biasa.
3. **Level 2 — Prominent:** border + `shadow.md`. Digunakan untuk card utama (Learning Path Card, Module Card aktif).

Jangan membuat card lebih dari tiga level kedalaman visual.

---

### L. Badge & Status

**Module Status Badge**

| Status | Background | Text Color | Icon | Label |
|--------|-----------|------------|------|-------|
| locked | color.border | color.textMuted | `Lock` | Terkunci |
| not_started | color.surfaceHover | color.textSecondary | `Circle` | Belum Dimulai |
| in_progress | color.warningLight | color.warning | `Clock` | Sedang Dipelajari |
| completed | color.successLight | color.success | `CheckCircle` | Selesai |

**XP Badge**
```
[Zap icon, 14px, color.xp]  +20 XP
Background: color.xpLight
Border-radius: radius.pill
```

---

## 15. Page Inventory

### Public Pages
| Route | Halaman |
|-------|---------|
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Lupa Password |
| `/reset-password/:token` | Reset Password |

### User Pages (Authenticated)
| Route | Halaman |
|-------|---------|
| `/dashboard` | Dashboard |
| `/learning` | Learning Path Page (Python) |
| `/learning/modules/:moduleId` | Module Page |
| `/learning/lessons/:lessonId` | Lesson Page |
| `/quiz/:quizId` | Quiz Page |
| `/notes` | Notes Page |
| `/community` | Community List Page |
| `/community/:communityId` | Community Detail Page |
| `/profile` | Profile Page |

### Admin Pages (Admin Only)
| Route | Halaman |
|-------|---------|
| `/admin` | Admin Dashboard |
| `/admin/learning-paths` | Learning Path Management |
| `/admin/modules` | Module Management |
| `/admin/lessons` | Lesson Management |
| `/admin/quizzes` | Quiz Management |
| `/admin/questions` | Question Management |
| `/admin/test-cases` | Test Case Management |

**Tidak ada halaman:** Search, Notification, Achievement, Streak, Leaderboard.

---

## 16. Authentication Pages

### Login Page

**Layout:** Centered card, max-width 400px, padding `space.8`.

**Structure:**
```
[Logo Sintaks — 40px]
Selamat datang kembali
Masuk untuk melanjutkan belajar

─────────────────────────────

Email
[input: type="email"]

Password
[input: type="password"] [toggle show/hide]

[Masuk →]   ← Primary button, full-width

Belum punya akun? Daftar

Lupa password?
```

**Validasi:**
- Email: wajib, format email valid.
- Password: wajib, minimal 8 karakter.
- Error dari server (wrong credentials): muncul sebagai **alert error** di atas form, bukan tooltip.

**CTA:** "Masuk" — jelas, satu per halaman. Tidak ada teks marketing atau dekorasi berlebihan.

---

### Register Page

**Structure:**
```
[Logo Sintaks]
Buat akun baru
Mulai belajar programming hari ini.

─────────────────────────────

Nama Lengkap
[input]

Username
[input]
Digunakan sebagai identitas kamu di Sintaks.

Email
[input: type="email"]

Password
[input: type="password"]
Minimal 8 karakter.

Konfirmasi Password
[input: type="password"]

[Daftar →]   ← Primary button, full-width

Sudah punya akun? Masuk
```

---

### Forgot Password Page

```
[Logo Sintaks]
Lupa Password?
Masukkan emailmu untuk mendapatkan link reset password.

Email
[input]

[Kirim Link Reset]   ← Primary button

[← Kembali ke Login]   ← Ghost button
```

**Success state (setelah submit):**
```
[CheckCircle icon, 48px, color.success]
Email terkirim
Link reset password sudah dikirim ke email@example.com.
Periksa inbox dan folder spam.

[← Kembali ke Login]
```

---

### Reset Password Page

```
[Logo Sintaks]
Buat Password Baru

Password Baru
[input: type="password"]

Konfirmasi Password Baru
[input: type="password"]

[Simpan Password →]
```

---

## 17. Dashboard

**Tujuan halaman:** User langsung tahu harus belajar apa sekarang.

### Layout Desktop

```
┌─────────────────────────────────────────────────────────┐
│  Sidebar   │  Selamat datang kembali, Riel              │
│            │  Lanjutkan belajarmu hari ini.              │
│            │                                             │
│            │  ┌─── Continue Learning ─────────────────┐ │
│            │  │  [Code2 icon]  Python                  │ │
│            │  │  Module 04 — Loop                      │ │
│            │  │  Sedang: For Loop                      │ │
│            │  │  ██████████░░░░ 60%                    │ │
│            │  │                   [Lanjut Belajar →]   │ │
│            │  └────────────────────────────────────────┘ │
│            │                                             │
│            │  ┌─── Module Berikutnya ──────────────────┐ │
│            │  │  Module 05 — Function                  │ │
│            │  │  Belum dimulai                         │ │
│            │  └────────────────────────────────────────┘ │
│            │                                             │
│            │  ┌─── Catatan Terakhir ───────────────────┐ │
│            │  │  [NoteCard kecil]  [NoteCard kecil]    │ │
│            │  │                        [Lihat Semua →] │ │
│            │  └────────────────────────────────────────┘ │
└────────────┴────────────────────────────────────────────┘
```

### Komponen Dashboard

**Continue Learning Card**
Card yang paling prominent di dashboard. Menampilkan modul dan lesson terakhir yang diakses (berdasarkan `lesson_progress.last_accessed_at` dari schema).

```
Background: color.surface
Border-left: 4px solid color.primary
Padding: space.6
Shadow: shadow.md
```

Jika user baru pertama kali login (belum pernah membuka lesson):
```
┌────────────────────────────────────────────┐
│  [BookOpen icon, 32px]                     │
│  Mulai belajarmu                           │
│  Kamu belum memulai pelajaran apapun.      │
│                 [Mulai Python →]           │
└────────────────────────────────────────────┘
```

**Next Module Card**
Menampilkan modul berikutnya yang belum dimulai, sebagai dorongan untuk melanjutkan. Tampil hanya jika ada modul berikutnya.

**Recent Notes**
Dua hingga tiga NoteCard terbaru dalam layout horizontal. CTA "Lihat Semua" mengarah ke `/notes`.

### Dashboard Mobile

- Continue Learning Card: full-width, stacked.
- Module Berikutnya: full-width.
- Recent Notes: horizontal scroll atau stacked 1 kolom.
- Bottom Navigation tetap terlihat.

### Greeting

```
Selamat datang kembali, [nama user]
```

Gunakan nama user dari `users.name`. Jangan menggunakan "Halo!" atau salam yang terlalu informal jika tidak sesuai konteks. Cukup direct: "Selamat datang kembali."

---

## 18. Learning Path Page

**MVP hanya menampilkan satu Learning Path: Python.**

### Layout

```
┌────────────────────────────────────────────────────────┐
│ Sidebar │  Python                                       │
│         │  Belajar programming dari dasar menggunakan  │
│         │  bahasa Python                                │
│         │                                               │
│         │  Progress: ████████░░░ 80%  8 dari 10 Module │
│         │                                               │
│         │  ─── Daftar Module ──────────────────────    │
│         │                                               │
│         │  ┌───────────────────────────────────────┐   │
│         │  │ [CheckCircle]  M01 — Python Fundamentals  │
│         │  │ Selesai                    [Buka →]    │   │
│         │  └───────────────────────────────────────┘   │
│         │                                               │
│         │  ┌───────────────────────────────────────┐   │
│         │  │ [Clock, warning]  M03 — Conditional   │   │
│         │  │ Sedang dipelajari  ██████░░  60%  [Lanjut] │
│         │  └───────────────────────────────────────┘   │
│         │                                               │
│         │  ┌───────────────────────────────────────┐   │
│         │  │ [Lock]  M04 — Loop                    │   │
│         │  │ Selesaikan Module 03 terlebih dahulu  │   │
│         │  └───────────────────────────────────────┘   │
└─────────┴──────────────────────────────────────────────┘
```

### Progression Indicator

Gunakan vertical list dengan connector line antara module. Connector line berwarna:
- `color.success` untuk module completed.
- `color.border` untuk module belum dimulai / locked.
- `color.primary` untuk module in_progress.

```
  [●] M01 — Selesai
  │
  [●] M02 — Selesai
  │
  [►] M03 — Sedang dipelajari (highlighted)
  │
  [○] M04 — Locked (line dimmed)
```

### Module Status Visual

| Status | Card Treatment |
|--------|---------------|
| completed | border-left 3px green, CheckCircle icon, teks muted |
| in_progress | border-left 3px indigo, Clock icon, progress bar |
| not_started | border normal, Circle icon, teks secondary |
| locked | border dashed, Lock icon, teks muted, background slightly dimmed |

---

## 19. Module Page

### Layout

```
Breadcrumb: Python / Module 04 — Loop

Module 04 — Loop
Mempelajari konsep perulangan dalam Python

Progress: ████████░░  80%  4 dari 5 Lesson selesai

Tabs: [Lesson]  [Quiz]

─── Daftar Lesson ──────────────────────────────

[✓] Apa itu Loop?                         Selesai
[✓] For Loop                              Selesai
[→] While Loop                            Sedang
[○] Nested Loop                           Belum
[○] Break dan Continue                    Belum

─── Quiz ────────────────────────────────────────

[Lock icon]
Quiz tersedia setelah seluruh lesson selesai.
1 dari 5 lesson tersisa.

```

Jika semua lesson selesai, Quiz section berubah menjadi:

```
[ClipboardList icon]
Quiz siap dikerjakan!
Uji pemahaman kamu tentang Loop.
                        [Mulai Quiz →]
```

### Tab: Lesson vs Quiz

- Tab Lesson: tampil by default.
- Tab Quiz: accessible tapi dengan visual lock state jika belum semua lesson selesai.
- Jangan disable tab Quiz — biarkan user melihat status quiz. Yang di-disable adalah CTA-nya.

---

## 20. Lesson Page

### Layout Desktop (3 Kolom)

```
┌──────────────┬─────────────────────────────┬────────────────────┐
│ Lesson Nav   │ Content (max-width 680px)   │  NOVA Panel 320px  │
│ 200px        │                             │                    │
│              │ Breadcrumb                  │  [NOVA Header]     │
│ [✓] Lesson 1 │ Python / Loop / For Loop    │  ─────────────     │
│ [✓] Lesson 2 │                             │  [Messages]        │
│ [→] Lesson 3 │ # For Loop                  │                    │
│ [○] Lesson 4 │                             │  [Suggestions]     │
│              │ Penjelasan panjang...        │  [Input + Send]    │
│ ─────────    │                             │                    │
│ [🔒 Quiz]    │ ```python                   │                    │
│              │ for i in range(5):          │                    │
│              │     print(i)               │                    │
│              │ ```                         │                    │
│              │                             │                    │
│              │ [Output]                    │                    │
│              │ [Key Points]                │                    │
│              │ [Tips]                      │                    │
│              │ [Common Mistakes]           │                    │
│              │ [References]                │                    │
│              │                             │                    │
│              │ [Simpan Catatan]            │                    │
│              │                             │                    │
│              │ ─────────────────────────   │                    │
│              │ [← Lesson Sebelumnya]       │                    │
│              │         [Selesaikan →]      │                    │
└──────────────┴─────────────────────────────┴────────────────────┘
```

### Lesson Content — Order Tampilan

Konten lesson ditampilkan dalam urutan berikut:
1. **Explanation** — penjelasan konsep utama (markdown rendered)
2. **Code Example** — CodeBlock dengan syntax highlighting
3. **Output** — OutputBlock
4. **Key Points** — ImportantPoint cards
5. **Tips** — TipCard
6. **Common Mistakes** — CommonMistakeCard
7. **References** — list link eksternal

Setiap section diberi spacing `space.8` (32px) antar satu sama lain untuk breathing room.

### Lesson Navigation (Kiri)

- Sticky saat scroll.
- Item aktif (lesson yang sedang dibaca): highlighted dengan `color.primaryLight` background.
- Item selesai: checkmark hijau.
- Item belum dimulai: circle muted.
- Quiz di bawah list lesson dengan lock icon jika belum tersedia.

### Tombol Navigasi Lesson (Bawah Content)

```
[← Lesson Sebelumnya]          [Lesson Berikutnya →]
                           atau
[← Lesson Sebelumnya]          [Selesaikan Lesson →]
```

"Selesaikan Lesson" hanya muncul pada lesson terakhir yang belum selesai dalam module. Klik → POST `/api/lessons/{id}/complete` → lesson ditandai selesai → progress diperbarui.

### Save Note Button

Tombol "Simpan Catatan" ada di akhir lesson content, sebelum navigation buttons.

```
[Bookmark icon]  Simpan Catatan
```

Klik → membuka modal kecil (atau inline expander) untuk mengetik catatan.

**Modal Simpan Catatan:**
```
┌──────────────────────────────────┐
│ Simpan Catatan                [X] │
│                                   │
│ Catatan kamu                      │
│ [textarea, min-height 80px]       │
│ Dari: Python / Loop / For Loop    │
│                                   │
│ [Batal]         [Simpan Catatan] │
└───────────────────────────────────┘
```

### Lesson Page Mobile

- Lesson Navigation tersembunyi. Dibuka via button "Daftar Lesson" di header.
- NOVA tersembunyi. Dibuka via floating button di kanan bawah (fabButton):
  ```
  [Sparkles icon, 20px]
  Tanya NOVA
  ```
  Klik → membuka Bottom Sheet NOVA dari bawah layar.
- Content full-width.
- Navigation buttons (prev/next) sticky di bawah content.

---

## 21. NOVA UI

### Posisi & Visibility

**Hanya ada di Module Page dan Lesson Page.**

NOVA tidak ada di:
- Dashboard
- Learning Path Page
- Quiz Page
- Notes Page
- Community Page
- Profile Page
- Admin Pages

### Desktop — NOVA Panel (320px, kanan)

```
┌──────────────────────────────────────┐
│ [Sparkles icon, 18px]  NOVA          │  ← header, background color.primaryLight
│ Tutor AI untuk materi ini            │
├──────────────────────────────────────┤
│                                      │
│  [Bot / Sparkles icon, 32px]         │  ← jika belum ada percakapan
│  Hai! Saya NOVA, tutormu.            │
│  Ada yang ingin kamu tanyakan        │
│  tentang For Loop?                   │
│                                      │
├──────────────────────────────────────┤
│  Quick actions:                      │
│  [Jelaskan lebih mudah]              │  ← NovaSuggestion chips
│  [Berikan contoh lain]               │
│  [Rangkum materi ini]                │
├──────────────────────────────────────┤
│ [input: Ketik pertanyaan...]  [Send] │  ← NovaInput
└──────────────────────────────────────┘
```

Setelah ada percakapan:
```
┌──────────────────────────────────────┐
│ [Sparkles]  NOVA         [X Clear]   │
├──────────────────────────────────────┤
│                                      │
│  [User Avatar]  Riel                 │
│  Apa itu range(5)?        14:30      │
│                                      │
│  [NOVA]                              │
│  range(5) menghasilkan               │
│  sequence: 0, 1, 2, 3, 4            │
│  — total 5 angka, dimulai           │
│  dari 0 secara default.             │  14:30
│                                      │
├──────────────────────────────────────┤
│ [input: Ketik pertanyaan...]  [Send] │
└──────────────────────────────────────┘
```

**Loading state NOVA:**
Saat menunggu respons, tampilkan typing indicator:
```
[NOVA]
● ● ●   ← animated bouncing dots
```

**Error state NOVA:**
```
[NOVA]
[AlertTriangle icon]
Maaf, ada kendala menghubungi NOVA.
Coba lagi beberapa saat.
[Coba Lagi]
```

### Mobile — NOVA Bottom Sheet

Tombol trigger: FAB (Floating Action Button) di kanan bawah halaman lesson.

```
[Sparkles icon]
NOVA
```

Bottom sheet slides up dari bawah. Tidak fullscreen — sekitar 60% tinggi viewport.

```
┌──────────────────────────────────────────┐
│ ─────  (drag handle)                     │
│ [Sparkles]  NOVA                [X]      │
├──────────────────────────────────────────┤
│ [Chat messages area]                     │
│                                          │
│                                          │
│                                          │
├──────────────────────────────────────────┤
│ [NovaSuggestion chips - scroll horizontal]│
├──────────────────────────────────────────┤
│ [input]                         [Send]   │
└──────────────────────────────────────────┘
```

**NOVA Tidak Boleh Ada di Quiz — Implementasi:**
Komponen `NovaPanel` dan NOVA FAB tidak di-render sama sekali pada route `/quiz/*`. Bukan hanya tersembunyi — tidak ada di DOM.

---

## 22. Quiz Experience

### Alur Quiz

```
[Mulai Quiz] dari Module Page
     ↓
Quiz dimulai dari soal pertama
     ↓
Theory → Pilih jawaban → Submit → Feedback → Lanjut
Code Writing → Tulis kode → Run → Evaluasi → Feedback → Lanjut
Code Completion → Isi blank → Check Answer → Evaluasi → Feedback → Lanjut
     ↓
Soal terakhir selesai
     ↓
Quiz Result Page
```

### Quiz Header (Global)

Selalu terlihat di atas semua soal:

```
┌─────────────────────────────────────────────┐
│ Module 04 — Loop                            │
│ Soal 3 dari 10                              │
│ ████████░░░░░░░░░░░  30%                   │
└─────────────────────────────────────────────┘
```

Progress bar menggunakan `color.primary` fill.

### NOVA Tidak Ada di Quiz

Seluruh area kanan (tempat NOVA biasanya ada) dikosongkan. Layout quiz menggunakan dua kolom maksimal:
- Kiri: daftar soal / navigasi (opsional, bisa linear tanpa sidebar).
- Tengah/Utama: soal aktif.

Tidak ada tombol "Tanya NOVA," tidak ada panel NOVA, tidak ada referensi NOVA di seluruh UI quiz.

---

## 23. Theory Quiz

### Layout

```
┌───────────────────────────────────────────────────────┐
│  Soal 3 dari 10          ████░░░░░░░  30%             │
├───────────────────────────────────────────────────────┤
│                                                       │
│  Apa fungsi keyword 'for' pada Python?                │
│                                                       │
│  ○  A. Membuat function                               │
│  ○  B. Melakukan iterasi                              │
│  ○  C. Membuat variable                               │
│  ○  D. Menghapus data                                 │
│                                                       │
│                          [Periksa Jawaban →]          │
└───────────────────────────────────────────────────────┘
```

CTA "Periksa Jawaban" hanya aktif setelah user memilih salah satu jawaban.

### Setelah Submit — Benar

```
┌───────────────────────────────────────────────────────┐
│  [CheckCircle, 20px, color.success]  Benar!           │  ← flush background color.successLight
│  'for' digunakan untuk melakukan iterasi pada         │
│  Python — baik untuk list, range, maupun iterable    │
│  lainnya.                                             │
│                                          [Lanjut →]  │
└───────────────────────────────────────────────────────┘
```

Pilihan jawaban yang benar di-highlight dengan `color.successLight` + border `color.success`. Pilihan salah yang dipilih user (jika ada, tapi Theory adalah single-answer) tetap seperti semula.

### Setelah Submit — Salah

```
┌───────────────────────────────────────────────────────┐
│  [XCircle, 20px, color.error]  Belum tepat.           │  ← flush background color.errorLight
│  'for' digunakan untuk melakukan iterasi, bukan       │
│  untuk mendefinisikan function.                       │
│  Jawaban yang benar: B. Melakukan iterasi             │
│                                      [Coba Lagi]     │
└───────────────────────────────────────────────────────┘
```

Pilihan salah yang dipilih user: background `color.errorLight`, border `color.error`.
Jawaban benar (jika berbeda dari pilihan user): background `color.successLight`, border `color.success`.

**Behavior "Coba Lagi":** Reset pilihan, user bisa memilih ulang. Jawaban tidak dikunci — PRD menyatakan user dapat mencoba kembali jika salah.

---

## 24. Code Writing Quiz

### Layout

```
┌──────────────────────────────────────────────────────┐
│  Soal 5 dari 10          ████████░░░░  50%           │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Buat program menggunakan for untuk menampilkan      │
│  angka ganjil dari 1 sampai 10.                      │
│                                                      │
│  ┌─── Editor ──────────────────────────────────────┐ │
│  │ Python                                [Reset]   │ │
│  │ 1  # Tulis kode kamu di sini          [Copy]    │ │
│  │ 2                                               │ │
│  │ 3                                               │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│                              [Run Code ▶]            │
└──────────────────────────────────────────────────────┘
```

### Setelah Run — Loading

```
[Spinner]  Menjalankan kode...
```

### Setelah Run — Syntax Error

```
┌─────────────────────────────────────────────────┐
│ [XCircle, red]  Syntax Error                    │
│                                                 │
│ Baris 2:                                        │
│ Terdapat kesalahan sintaks. Periksa tanda       │
│ kurung atau titik dua yang mungkin terlewat.   │
└─────────────────────────────────────────────────┘
```

### Setelah Run — Runtime Error

```
┌─────────────────────────────────────────────────┐
│ [XCircle, red]  Runtime Error                   │
│                                                 │
│ NameError: Variabel 'i' belum didefinisikan.    │
│ Pastikan variabel kamu sudah dideklarasikan     │
│ sebelum digunakan.                              │
└─────────────────────────────────────────────────┘
```

**Catatan:** Pesan error diterjemahkan ke bahasa yang lebih mudah dipahami pemula. Raw Python error ditampilkan sebagai hint di dalam collapsible "Detail Error" (opsional). Jangan tampilkan stack trace penuh.

### Setelah Run — Wrong Answer

```
┌─────────────────────────────────────────────────┐
│ [XCircle, red]  Output belum sesuai.            │
│                                                 │
│ Output kamu:          Yang diharapkan:          │
│ 1                     1                         │
│ 3                     3                         │
│ 5                     5                         │
│ 7                     7                         │
│                       9                         │
│                                                 │
│ Angka 9 belum muncul di output kamu.            │
└─────────────────────────────────────────────────┘
```

Comparison table side-by-side — user langsung tahu perbedaannya.

### Setelah Run — Correct

```
┌─────────────────────────────────────────────────┐
│ [CheckCircle, green]  Kode kamu benar!          │  ← background successLight
│                                                 │
│ [Zap, violet]  +15 XP                           │
│                                    [Lanjut →]  │
└─────────────────────────────────────────────────┘
```

XP badge muncul dengan animasi subtle (fade in + scale).

---

## 25. Code Completion Quiz

### Layout

```
┌──────────────────────────────────────────────────────┐
│  Soal 7 dari 10          ████████████░░  70%         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Lengkapi kode berikut untuk menampilkan             │
│  angka genap dari 1 sampai 10.                       │
│                                                      │
│  ┌─── Kode ───────────────────────────────────────┐  │
│  │  [___] i in [_________]:                       │  │ ← blank sebagai chip kosong
│  │      if i % [___] == 0:                        │  │
│  │          print(i)                              │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  Pilihan token:                                      │
│  [for]  [while]  [range(10)]  [2]  [3]              │
│                                                      │
│                        [Periksa Jawaban →]           │
└──────────────────────────────────────────────────────┘
```

### Blank Element

Blank (slot kosong) tampil sebagai:
```
[  ___________  ]   ← dashed border, background color.primaryLight, min-width 80px
```

Saat user mengklik token, token tersebut mengisi blank berikutnya yang kosong (kiri ke kanan, atas ke bawah). Atau user bisa klik blank tertentu untuk fokus, lalu klik token.

### Setelah Token Dipilih

Token yang sudah dipakai:
```
[for]   ← background color.primary, teks putih, sudah tidak bisa diklik
```

Blank yang sudah terisi:
```
[for]   ← tampil sebagai filled chip dalam kode, dengan X kecil untuk menghapus
```

User bisa klik X pada filled chip untuk mengembalikan token ke pilihan.

### Setelah Check Answer — Benar

Sama dengan Code Writing Quiz — feedback sukses + XP badge.

### Setelah Check Answer — Salah

```
┌─────────────────────────────────────────────────┐
│ [XCircle, red]  Ada yang kurang tepat.          │
│                                                 │
│  [___3___] i in [range(10)]:   ← slot salah highlighted merah
│      if i % [__2__] == 0:                       │
│          print(i)                               │
│                                                 │
│ Token pada posisi 1 belum tepat.                │
│                              [Coba Lagi]       │
└─────────────────────────────────────────────────┘
```

Slot yang salah: border `color.error`, background `color.errorLight`.

---

## 26. Code Editor

### Spesifikasi Komponen

Code Editor digunakan pada:
- Code Writing Quiz
- Code Completion Quiz (partial — hanya untuk menampilkan kode dengan blank, bukan editor penuh)

**Library rekomendasi:** `@uiw/react-codemirror` atau `Monaco Editor` (sebagai alternatif yang lebih berat).

Untuk MVP yang tidak terlalu kompleks, `@uiw/react-codemirror` lebih ringan dan cukup.

### Fitur Wajib

- Syntax highlighting Python
- Line numbers
- Auto-indent (tab = 4 spasi)
- Monospace font (`font-mono`, 14px)
- Copy button
- Reset button (mengembalikan ke starter code)

### Tampilan

```
┌──────────────────────────────────────────────┐
│ Python                         [Reset] [Copy]│  ← Toolbar
├──────────────────────────────────────────────┤
│ 1  │  # Tulis kode kamu di sini             │
│ 2  │                                         │
│ 3  │                                         │
│ 4  │                                         │
└──────────────────────────────────────────────┘
```

- Background editor: `#1E293B` (Slate 800) — dark hanya untuk area kode.
- Gutter (line numbers): background `#0F172A`, teks `#475569`.
- Cursor: warna putih atau `#818CF8` (indigo muda).
- Min-height: 160px. Max-height: 400px dengan scroll internal.
- Radius: `radius.lg` (12px) — terasa bersih.

### Mobile

- Editor full-width.
- Horizontal scroll otomatis untuk baris kode yang panjang.
- Font size 13px (satu ukuran lebih kecil dari desktop).
- Keyboard virtual tidak menutupi editor — gunakan `resize: none` dan scroll positioning.

### Aksesibilitas Editor

- Editor harus bisa digunakan dengan keyboard saja.
- Tab key menghasilkan indentasi, bukan pindah focus (behavior coding editor standar).
- ESC key melepas focus dari editor dan kembali ke navigasi halaman.
- Tersedia `aria-label="Code editor untuk soal ini"`.

---

## 27. Quiz Result

### Layout

```
┌──────────────────────────────────────────────┐
│                                              │
│   [CheckCircle icon, 48px, color.success]    │
│   Quiz Selesai!                              │
│                                              │
│   ┌────────────────────────────────────┐     │
│   │   Score                            │     │
│   │   8 / 10  Jawaban Benar            │     │
│   │                                    │     │
│   │   [Zap icon]  +20 XP didapat       │     │
│   └────────────────────────────────────┘     │
│                                              │
│   ████████████████░░  80%                    │
│   8 benar  •  2 salah  •  10 soal            │
│                                              │
│   [Kembali ke Module]  [Lanjut ke Module →]  │
│                                              │
└──────────────────────────────────────────────┘
```

**CTA utama:** "Lanjut ke Module Berikutnya" — hanya muncul jika ada module berikutnya dan module tersebut sudah ter-unlock.

**Tidak ada:** Achievement, Badge, Streak, Leaderboard. Hanya score, XP, dan navigasi lanjutan.

**XP yang ditampilkan:** Hanya XP dari quiz ini (`+20 XP`). Total XP terbaru bisa terlihat di Profile, bukan di halaman result.

---

## 28. Notes

### Notes Page

```
Breadcrumb: Dashboard / Catatan Saya

Catatan Saya
[jumlah catatan]

─── Daftar Catatan ──────────────────────────────────

[NoteCard]  [NoteCard]  [NoteCard]
[NoteCard]  [NoteCard]

```

Grid: 3 kolom desktop, 2 kolom tablet, 1 kolom mobile.

### NoteCard Detail

```
┌────────────────────────────────────────────┐
│ range(5) menghasilkan angka 0 sampai 4.   │  ← konten catatan
│ Dimulai dari 0, bukan 1.                  │
│                                            │
│ [Code2 icon, 12px]  Python  /             │
│ [Layers icon, 12px]  Loop  /              │
│ [FileText icon, 12px]  For Loop           │  ← breadcrumb mini
│                                            │
│ [Buka Materi →]              [Trash2]      │
└────────────────────────────────────────────┘
```

- "Buka Materi →" navigasi ke lesson asal (`lesson_id` dari schema).
- "Hapus" (Trash2 icon): konfirmasi sebelum hapus.

### Konfirmasi Hapus Catatan

Dialog sederhana, bukan fullscreen modal:

```
┌─────────────────────────────────┐
│ Hapus catatan ini?              │
│ Tindakan ini tidak bisa dibatalkan. │
│                                 │
│ [Batal]          [Hapus]        │
└─────────────────────────────────┘
```

### Empty State Notes

```
[Bookmark icon, 48px, color.textMuted]

Belum ada catatan

Simpan poin penting dari lesson agar
mudah kamu ingat kembali.

[Mulai Belajar →]
```

---

## 29. Community

### Community List Page

```
Komunitas

[+ Buat Komunitas]   ← Secondary button, di kanan header

─── Komunitas Saya ────────────────────────────────

[Joined CommunityCard]  [Joined CommunityCard]

─── Temukan Komunitas ─────────────────────────────

[CommunityCard]  [CommunityCard]  [CommunityCard]
```

Layout: 3 kolom desktop, 2 tablet, 1 mobile.

### CommunityCard

```
┌────────────────────────────────────────┐
│  Python Beginner Indonesia             │
│  [Users icon, 14px]  12 anggota       │
│  Belajar Python bersama pemula.        │
│                         [Buka →]       │  ← jika sudah join
│                         [Gabung]       │  ← jika belum join
└────────────────────────────────────────┘
```

Jika sudah join: badge kecil "Bergabung" di pojok kanan atas card.

### Community Create

Modal atau halaman terpisah dengan form sederhana:

```
Buat Komunitas Baru

Nama Komunitas *
[input, max: 100 karakter]

Deskripsi
[textarea, optional]
Ceritakan tujuan komunitas ini.

[Batal]            [Buat Komunitas →]
```

### Community Detail Page

```
┌────────────────────────────────────────────────┐
│ Python Beginner Indonesia          [Leave ↗]  │  ← header
│ [Users icon] 12 anggota                        │
│ Belajar Python bersama pemula.                 │
├────────────────────────────────────────────────┤
│                                                │
│ [Avatar] Riel    13:20                         │
│ Hai semua! Ada yang sudah selesai Module 3?    │
│                                                │
│          [Avatar] Andi  13:21                  │
│          Udah! Baru selesai tadi pagi.         │  ← user lain, aligned kiri
│                                                │
│ [Avatar] Riel    13:22                         │  ← user sendiri, aligned kanan
│ Wah keren! Loop emang seru ya.                 │
│                                                │
│                                                │
├────────────────────────────────────────────────┤
│ [input: Tulis pesan...]              [Send →] │
└────────────────────────────────────────────────┘
```

**Polling:** Community chat menggunakan polling (fetch setiap beberapa detik) sesuai Architecture. Tidak ada real-time WebSocket di MVP. Tampilkan loading indicator subtle saat polling.

**Leave Community:** Konfirmasi dialog sebelum leave.

```
Tinggalkan komunitas ini?
Kamu bisa bergabung kembali kapan saja.

[Batal]          [Tinggalkan]
```

### Community Loading State

Saat memuat pesan awal:
```
[skeleton bubbles — 3–4 bubble placeholder]
```

---

## 30. Profile

### Profile Page

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  [Avatar circle, 80px]                  │   │
│  │  [Camera icon, overlay saat hover]      │   │
│  │                                         │   │
│  │  Riel                                   │   │
│  │  @zeovarince                            │   │
│  │                                         │   │
│  │  [Zap icon]  120 XP                     │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ─── Progress Pembelajaran ───────────────      │
│                                                 │
│  Python                                         │
│  ████████████░░  80%  8 dari 10 Module          │
│                                                 │
│  ─── Module Selesai ────────────────────        │
│                                                 │
│  [CheckCircle] M01 — Python Fundamentals        │
│  [CheckCircle] M02 — Operator                   │
│  [CheckCircle] M03 — Conditional                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Avatar System

Avatar adalah preset yang dipilih dari koleksi gambar (bukan upload file user). Sesuai Schema: `users.avatar` menyimpan key string seperti `avatar_01`, `avatar_python`.

**Avatar Selector:**

```
Pilih Avatar

┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │
└───┘ └───┘ └───┘ └───┘ └───┘

Pilihan yang aktif: border 3px color.primary + checkmark overlay

                           [Simpan]
```

Klik avatar circle di profil → buka modal Avatar Selector.

### Yang Tidak Ada di Profile

Tidak ada: Programming Skills, Streak display, Achievement/Badge, Leaderboard, Activity Feed, riwayat aktivitas.

Profile adalah halaman yang sederhana: siapa kamu, berapa XP-mu, sejauh mana progressmu.

---

## 31. Admin UI

### Admin Layout

```
┌───────────────┬──────────────────────────────────────────┐
│ Admin Sidebar │  Konten Admin                            │
│ 220px         │                                          │
│               │  [Page Title]                            │
│ [Learning     │                                          │
│  Paths]       │  [Action Buttons: + Tambah, Filter]     │
│               │                                          │
│ [Modules]     │  [Table / List]                          │
│               │                                          │
│ [Lessons]     │  [Pagination]                            │
│               │                                          │
│ [Quizzes]     │                                          │
│               │                                          │
│ [Questions]   │                                          │
│               │                                          │
│ [Test Cases]  │                                          │
│               │                                          │
│ ─────────     │                                          │
│ [← User View] │                                          │
└───────────────┴──────────────────────────────────────────┘
```

### Admin Table

Tabel CRUD standar dengan kolom: data utama, status, aksi (Edit, Hapus). Tidak ada styling yang terlalu dekoratif — admin mengutamakan fungsionalitas.

```
┌──────────────────────────────────────────────────────────┐
│ Module                                  [+ Tambah Module] │
├──────────────────────────────────────────────────────────┤
│ Judul                │ Order │ Status  │ Aksi             │
├──────────────────────┼───────┼─────────┼──────────────────┤
│ Python Fundamentals  │ 1     │ Aktif   │ [Edit] [Hapus]   │
│ Operator             │ 2     │ Aktif   │ [Edit] [Hapus]   │
│ Conditional          │ 3     │ Aktif   │ [Edit] [Hapus]   │
│ Loop                 │ 4     │ Draft   │ [Edit] [Hapus]   │
└──────────────────────┴───────┴─────────┴──────────────────┘
```

### Admin Form (Create/Edit)

Halaman form menggunakan layout card dengan label-input yang jelas. Tidak ada wizard multi-step — semua dalam satu halaman untuk kesederhanaan MVP.

Untuk Lesson Form, gunakan rich text editor atau markdown editor untuk field `explanation`. Field `code_example` dan `output_example` menggunakan textarea dengan monospace font.

### Test Case Form

```
Test Case — Soal Coding

Input (opsional)
[textarea]

Expected Output *
[textarea, font-mono]
Output harus exact match, termasuk spasi dan newline.

[x] Hidden Test Case
Test case tersembunyi tidak ditampilkan ke user.

[Batal]          [Simpan Test Case]
```

---

## 32. Feedback System

### Prinsip

Setiap feedback menggunakan minimal tiga sinyal: **icon + teks + warna**. Jangan hanya mengandalkan warna.

### Success Feedback

```
Background: color.successLight
Border: 1px color.success (opacity 0.3)
Icon: CheckCircle, color.success, 18px
Text: color.success atau color.text
```

### Error Feedback

```
Background: color.errorLight
Border: 1px color.error (opacity 0.3)
Icon: XCircle, color.error, 18px
Text: color.error atau color.text
```

### Warning Feedback

```
Background: color.warningLight
Border: 1px color.warning (opacity 0.3)
Icon: AlertTriangle, color.warning, 18px
Text: color.warning atau color.text
```

### Info Feedback

```
Background: color.infoLight
Border: 1px color.info (opacity 0.3)
Icon: Info, color.info, 18px
Text: color.info atau color.text
```

### Toast Notifications

Untuk action sukses singkat (simpan catatan, leave community):

```
┌────────────────────────────────────┐
│ [CheckCircle]  Catatan tersimpan  │  ← muncul di kanan atas (desktop) atau bawah (mobile)
└────────────────────────────────────┘
```

Durasi: 3 detik, auto-dismiss. Max 1 toast sekaligus.

---

## 33. Empty States

Setiap empty state harus:
1. Menampilkan icon yang relevan (48px, `color.textMuted`).
2. Menjelaskan keadaan dalam satu kalimat.
3. Memberikan satu kalimat konteks atau panduan.
4. Menawarkan CTA jika relevan.

| Halaman | Icon | Teks Utama | Sub-teks | CTA |
|---------|------|------------|----------|-----|
| Notes — belum ada | `Bookmark` | Belum ada catatan | Simpan poin penting dari lesson. | Mulai Belajar → |
| Community — belum join | `Users` | Belum bergabung ke komunitas | Temukan komunitas belajar yang cocok. | Jelajahi Komunitas |
| Community — belum ada komunitas | `Users` | Belum ada komunitas | Jadilah yang pertama membuat komunitas. | Buat Komunitas |
| NOVA — belum ada percakapan | `Sparkles` | Tanya apa saja tentang materi ini | Saya siap membantu kamu memahami. | — |
| Dashboard — belum mulai | `BookOpen` | Mulai belajarmu | Kamu belum membuka pelajaran apapun. | Mulai Python → |

---

## 34. Loading States

### Skeleton Loading

Gunakan skeleton placeholder yang mengimitasi bentuk konten yang akan dimuat. Jangan tampilkan halaman blank.

```
Skeleton color: color.border (#E2E8F0) dengan shimmer animation
Shimmer: gradient yang bergerak dari kiri ke kanan, duration 1.5s, loop
```

**Dashboard skeleton:**
```
[Rectangle 200x80, shimmer]   ← Continue Learning card
[Rectangle 200x50, shimmer]   ← Next Module card
[Rectangle 120x80, shimmer] [120x80] [120x80]  ← Notes
```

**Lesson Content skeleton:**
```
[Line 80%, shimmer]
[Line 70%, shimmer]
[Line 90%, shimmer]
[Rectangle 100x80, shimmer]  ← code block
[Line 60%, shimmer]
```

**Community messages skeleton:**
```
[Circle 32px] [Rectangle 60% 40px, shimmer]
              [Rectangle 40% 20px, shimmer]
```

### Spinner

Untuk loading yang tidak bisa pakai skeleton (submit form, run code):

```
[Spinner icon, 20px, color.primary, animation: rotate 1s linear infinite]
Sedang diproses...
```

### NOVA Loading

```
[NOVA]
● ● ●   ← animated dots, 600ms per cycle
```

### Code Execution Loading

```
[Play icon, animasi pulse]  Menjalankan kode...
```

---

## 35. Error States

### Page-level Error (API Gagal)

```
[AlertTriangle icon, 48px, color.error]

Terjadi kendala

Koneksi ke server gagal. Muat ulang halaman
atau coba beberapa saat lagi.

[Muat Ulang]
```

### Section-level Error (Component gagal load)

```
[XCircle icon, 24px, color.error]
Gagal memuat konten.
[Coba Lagi]
```

### NOVA Error

```
[NOVA bubble — background color.errorLight]
[AlertTriangle icon]  Maaf, terjadi kendala.
Coba kirim pertanyaanmu lagi.
[Coba Lagi]
```

### Kaidah Bahasa Error

- Jangan katakan "Error 500" atau technical stack trace kepada user biasa.
- Gunakan bahasa aktif dan ramah: "Gagal memuat" bukan "Data tidak dapat dimuat."
- Selalu tawarkan aksi: "Coba Lagi" atau "Muat Ulang."
- Jangan salahkan user dalam pesan error.

---

## 36. Accessibility

### Kontras Warna

Semua pasangan warna teks/background harus memenuhi **WCAG 2.1 Level AA** (minimum ratio 4.5:1 untuk teks normal, 3:1 untuk teks besar):

| Pasangan | Ratio (approx) | Status |
|----------|---------------|--------|
| `color.text` (#0F172A) pada `color.background` (#F8FAFC) | ~15:1 | Pass AA |
| `color.textSecondary` (#64748B) pada `color.surface` (#FFFFFF) | ~5.9:1 | Pass AA |
| `color.primary` (#4F46E5) teks pada putih | ~5.6:1 | Pass AA |
| `color.error` (#DC2626) teks pada `color.errorLight` | ~4.7:1 | Pass AA |
| Teks putih pada `color.primary` (#4F46E5) button | ~5.6:1 | Pass AA |

### Keyboard Navigation

- Semua elemen interaktif (button, link, input, AnswerOption) harus bisa dicapai dan diaktifkan via keyboard.
- Urutan focus mengikuti visual order halaman.
- Tidak ada focus trap kecuali di dalam modal (modal harus trap focus).
- ESC menutup modal dan mengembalikan focus ke trigger element.

### Focus Visible

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

Jangan pernah `outline: none` tanpa pengganti focus indicator.

### Semantic HTML

- Gunakan `<nav>` untuk navigasi.
- Gunakan `<main>` untuk konten utama.
- Gunakan `<button>` untuk tombol (bukan `<div onClick>`).
- Gunakan `<label>` yang terhubung ke setiap input.
- Gunakan heading hierarchy yang benar (h1 → h2 → h3).
- Gunakan `<article>` atau `<section>` dengan `aria-label` untuk area konten.

### ARIA

- Icon dekoratif: `aria-hidden="true"`.
- Icon button tanpa teks: `aria-label`.
- Progress bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Alert/feedback: `role="alert"` atau `aria-live="polite"` untuk feedback quiz.
- Loading state: `aria-busy="true"` pada container yang loading.

### Form Accessibility

```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" required aria-describedby="email-error" />
<span id="email-error" role="alert">Email wajib diisi.</span>
```

### Code Editor

- Tersedia `aria-label="Code editor"`.
- Tersedia keyboard shortcut untuk common action (Ctrl+Enter untuk Run Code).
- Jika menggunakan CodeMirror, gunakan built-in accessibility features.

---

## 37. Responsive Page Specification

| Halaman | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|---------|-------------------|---------------------|-----------------|
| Login/Register | Centered card 400px | Centered card 380px | Full-width, padding 24px |
| Dashboard | 2 kolom (Continue Learning + Next Module), 3 kolom recent notes | 2 kolom, 2 kolom notes | 1 kolom stacked, 1 kolom notes |
| Learning Path | List module dengan connector | List module | List module, full-width |
| Module | Tabs Lesson/Quiz, lesson list | Sama seperti desktop | Drawer untuk lesson list |
| Lesson | 3 kolom (nav 200px + content + NOVA 320px) | 2 kolom (nav collapsed + content), NOVA = FAB | 1 kolom, drawer nav, NOVA = bottom sheet |
| Quiz | 1 kolom content (max-width 640px) centered | 1 kolom | 1 kolom full-width |
| Notes | Grid 3 kolom | Grid 2 kolom | Grid 1 kolom |
| Community List | Grid 3 kolom | Grid 2 kolom | Grid 1 kolom |
| Community Detail | Chat full-height dengan header | Chat full-height | Chat full-height, no sidebar |
| Profile | Card centered max-width 600px | Card centered | Full-width |
| Admin | Sidebar 220px + content area | Sidebar collapsible + content | Sidebar sebagai top nav atau drawer |

---

## 38. User Flow

### Flow Utama: Pembelajaran

```
[Login] → [Dashboard]
                ↓
    [Continue Learning ATAU Mulai Python]
                ↓
    [Learning Path — Python]
                ↓
    [Module Page — pilih atau lanjutkan]
                ↓
    [Lesson Page]
                ↓
    [Baca konten: Explanation → Code → Output → Key Points → Tips]
                ↓
    [Opsional: Simpan Catatan via "Simpan Catatan" button]
    [Opsional: Tanya NOVA via panel atau FAB]
                ↓
    [Selesaikan Lesson → lesson_progress.status = completed]
                ↓
    [Lesson berikutnya ATAU semua lesson selesai]
                ↓
    [Quiz tersedia → CTA "Mulai Quiz" di Module Page]
                ↓
    [Quiz Page: soal demi soal]
    [Theory → Pilih → Submit → Feedback → Lanjut]
    [Code Writing → Tulis → Run → Evaluasi → Feedback → Lanjut]
    [Code Completion → Isi blank → Check → Evaluasi → Feedback → Lanjut]
                ↓
    [Quiz Result → Score + XP]
                ↓
    [Kembali ke Module ATAU Lanjut ke Module Berikutnya]
```

### Flow: Community

```
[Komunitas di sidebar/nav]
        ↓
[Community List Page]
        ↓
┌───────────────────┬───────────────────────┐
│  Jelajahi         │  Buat Baru            │
│  → klik [Gabung]  │  → klik [+ Buat]      │
│  → masuk Detail   │  → isi form nama +    │
│                   │    deskripsi          │
│                   │  → buat → masuk       │
│                   │    sebagai owner      │
└───────────────────┴───────────────────────┘
        ↓
[Community Detail — kirim dan baca pesan]
        ↓
[Opsional: Leave Community → konfirmasi]
```

### Flow: Notes

```
[Baca Lesson] → [Klik "Simpan Catatan"]
                        ↓
               [Modal → tulis catatan → Simpan]
                        ↓
               [Note tersimpan, toast konfirmasi]

[Notes di navigasi] → [Notes Page → lihat semua note]
                              ↓
                      [Klik "Buka Materi" → lesson asal]
                      [Klik Hapus → konfirmasi → hapus]
```

---

## 39. Visual Do & Don't

### DO

| Kategori | Yang Benar |
|----------|------------|
| Background | `color.background` (#F8FAFC) sebagai background halaman |
| Card | White (`#FFFFFF`) dengan border tipis dan shadow ringan |
| Typography | Plus Jakarta Sans untuk heading, Inter untuk body |
| CTA | Primary button indigo untuk aksi utama |
| Code area | Dark code block hanya untuk area kode, bukan seluruh halaman |
| Icon | Lucide React, konsisten stroke 2px, ukuran seragam |
| Spacing | Whitespace cukup — jangan padatkan elemen |
| Feedback | Icon + warna + teks — tiga sinyal sekaligus |
| Progress | Progress bar yang jelas dan akurat |
| NOVA | Hanya di Module/Lesson, tidak di Quiz |
| Error message | Bahasa ramah, dekat field, dengan aksi jelas |
| Avatar | Circle, preset, konsisten |

### DON'T

| Kategori | Yang Salah |
|----------|------------|
| Theme | Dark background sebagai tema utama halaman |
| Colors | Neon, warna cyberpunk, gradient berat |
| UI Style | Enterprise dashboard, social media feed, IDE penuh |
| Gamification | Streak, Achievement, Badge, Leaderboard, Level |
| NOVA | Panel NOVA atau tombol "Tanya NOVA" di halaman Quiz |
| Icon | Emoji sebagai elemen UI (bukan konten lesson) |
| Icon | Mencampur style icon (filled, outline, 3D, emoji) |
| Error | Menampilkan stack trace teknis ke user biasa |
| Animation | Animasi lebih dari 500ms, scroll-triggered animation, animasi loop dekoratif |
| Typography | Font size di bawah 12px, line-height di bawah 1.4 |
| Button | Icon-only button tanpa accessible label |
| Spacing | Padding random, tidak mengikuti spacing scale |

---

## 40. Design Decisions / Conflicts

Bagian ini mencatat konflik dan ketidakjelasan yang ditemukan antara PRD, Architecture, dan Schema, beserta keputusan desain yang diambil.

---

### Konflik 1: Avatar — Upload vs Preset

**Sumber konflik:**
PRD (Section 7) menyebutkan "Mengelola profil dan memilih avatar" tanpa spesifikasi teknis. Schema (Section 4) mendefinisikan `users.avatar` sebagai `VARCHAR(100)` dengan keterangan: "Key/identifier avatar preset yang dipilih — tidak ada upload file dari user."

**Keputusan desain:**
Mengikuti Schema. Avatar adalah pilihan dari koleksi preset, bukan upload file. Desain menampilkan grid avatar preset dalam modal selector. Ini konsisten dengan Schema dan menghindari kompleksitas file storage.

---

### Konflik 2: NOVA di Module vs Lesson

**Sumber konflik:**
PRD menyatakan "NOVA tersedia saat user berada di halaman Module atau Lesson." Architecture menyebut "NOVA hanya tersedia di Module dan Lesson."

**Klarifikasi:**
Module Page dalam konteks ini merujuk pada tampilan daftar lesson di dalam sebuah module, bukan hanya saat membaca lesson. NOVA panel muncul di kedua page tersebut.

**Keputusan desain:**
NOVA panel hadir di Module Page (ketika user melihat daftar lesson dalam satu module) dan Lesson Page. Di Module Page, NOVA dapat digunakan untuk bertanya tentang gambaran umum module. Di Lesson Page, NOVA memiliki konteks materi spesifik lesson yang sedang dibaca.

---

### Konflik 3: Lesson "Selesaikan" vs "Tandai Selesai"

**Sumber konflik:**
PRD menyebut "User dapat menandai lesson sebagai selesai setelah membaca materi." Tidak disebutkan apakah ada tombol "Tandai Selesai" eksplisit atau apakah sistem otomatis mendeteksi lesson selesai.

**Keputusan desain:**
Gunakan tombol eksplisit "Selesaikan Lesson →" di bagian bawah lesson content. Ini lebih jelas secara UX — user secara sadar menyelesaikan lesson, memberikan sense of accomplishment. Tombol hanya muncul ketika semua konten lesson sudah terscroll/terbaca (opsional: implementasi Intersection Observer untuk track apakah user sudah sampai ke bawah konten).

---

### Konflik 4: Progress Bar pada Dashboard — Module mana?

**Sumber konflik:**
Dashboard harus menampilkan "Continue Learning" dengan progress. Schema menyimpan `last_accessed_at` di `lesson_progress`, bukan di `module_progress`.

**Keputusan desain:**
Dashboard menampilkan module dari lesson yang paling terakhir diakses (`MAX(lesson_progress.last_accessed_at)`) beserta progress module tersebut. Jika ada beberapa lesson yang diakses di module berbeda, tampilkan module dari lesson paling terakhir.

---

### Konflik 5: Code Completion — Drag and Drop vs Click

**Sumber konflik:**
PRD mendeskripsikan "user dapat menempatkan token ke bagian kosong" tanpa menyebutkan mekanismenya (drag-drop atau klik).

**Keputusan desain:**
Gunakan mekanisme **klik** (bukan drag-drop) untuk MVP:
1. User klik token → token otomatis mengisi blank berikutnya yang kosong.
2. Atau: user klik blank tertentu dulu (fokus), lalu klik token.

Alasan: Drag-drop lebih complex untuk mobile dan membutuhkan library tambahan. Click lebih accessible dan mudah diimplementasikan. Sesuai PRD: "Tidak ada komponen tambahan yang tidak diperlukan."

---

### Konflik 6: Community — Chat polling interval

**Sumber konflik:**
Architecture menyebutkan "polling sederhana" untuk community chat tanpa menyebutkan interval.

**Keputusan desain (UX, bukan implementasi):**
Dari sisi UX, tampilkan loading indicator subtle saat polling berlangsung — bukan spinner penuh. Jika pesan baru masuk, tampilkan pesan baru secara smooth tanpa refresh seluruh halaman. Interval polling (3-10 detik) ditentukan oleh tim backend.

---

## 41. Final Checklist

### Brand
- [ ] Educational — karakter platform terasa seperti tempat belajar, bukan tool developer
- [ ] Modern — typography, color, dan layout mengikuti standar 2024+
- [ ] Friendly — tone UI ramah, tidak intimidating, bahasa Indonesia yang natural
- [ ] Light theme — background terang, tidak ada dark theme sebagai primary

### Learning
- [ ] Learning Path — card dan progression indicator Python
- [ ] Module — status (locked/not_started/in_progress/completed) divisualisasikan jelas
- [ ] Lesson — layout 3 kolom desktop, komponen konten lengkap (Explanation/Code/Output/KeyPoints/Tips/CommonMistakes/References)
- [ ] Progress — progress bar pada Module, Lesson, Learning Path, dan Dashboard

### NOVA
- [ ] Module/Lesson only — NOVA panel hadir hanya di Module Page dan Lesson Page
- [ ] Context-aware — UI menunjukkan NOVA aware terhadap materi yang sedang dibaca
- [ ] No NOVA in Quiz — tidak ada panel, button, atau referensi NOVA di seluruh Quiz UI

### Quiz
- [ ] Theory — UI pilihan ganda dengan state selected/correct/wrong
- [ ] Code Writing — code editor + run code + evaluasi output vs expected
- [ ] Code Completion — blank slots + token pilihan + check answer
- [ ] Code Editor — syntax highlighting, line numbers, copy, reset, beginner-friendly
- [ ] Automatic Evaluation — feedback dari sistem, bukan dari NOVA
- [ ] Error Feedback — Syntax Error, Runtime Error, Wrong Answer divisualisasikan dengan jelas dan bahasa ramah

### Notes
- [ ] Create — modal simpan catatan dari dalam Lesson
- [ ] Delete — konfirmasi hapus
- [ ] View — halaman Notes dengan NoteCard + link ke lesson asal

### Community
- [ ] Create — form nama + deskripsi
- [ ] Join — tombol Gabung pada CommunityCard
- [ ] Leave — konfirmasi leave dari dalam Community Detail
- [ ] Message — chat UI dengan bubble + input + send

### Profile
- [ ] Avatar — circle avatar, preset selector via modal
- [ ] Username — tampil di profile page
- [ ] XP — total XP dengan icon Zap
- [ ] Learning Progress — progress bar Python + daftar module selesai

### Excluded
- [ ] No Search — tidak ada search bar, search page, atau search functionality
- [ ] No Notification — tidak ada notification bell, notification page, atau notification system
- [ ] No Streak — tidak ada streak counter, streak display, atau streak reward
- [ ] No Achievement — tidak ada achievement badge, achievement page, atau achievement notification
- [ ] No Badge — tidak ada badge system dalam bentuk apapun
- [ ] No Level — tidak ada level display, level progression, atau level reward
- [ ] No Leaderboard — tidak ada leaderboard dalam bentuk apapun
- [ ] No Programming Skills — tidak ada skill rating, skill chart, atau technology list di profile

---

*Dokumen ini adalah Design Specification versi MVP Sintaks. Seluruh keputusan desain di sini konsisten dengan PRD.md v1.0, ARCHITECTURE.md v1.0, dan SCHEMA.md v1.0. Design tidak menambahkan fitur baru di luar scope PRD. Konflik antar dokumen dicatat dan diselesaikan pada Section 40.*
