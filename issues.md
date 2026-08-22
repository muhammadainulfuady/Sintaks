## Description
Implementasi learning structure (Learning Path → Module → Lesson) dengan progress tracking, user notes, XP history, dan NOVA AI Assistant.

**Dikerjakan oleh:** RifqiRafii — fokus penuh pada Learning system & NOVA, tidak ada overlap.

## Tasks (Scope RifqiRafii)
- [x] Create LearningPath, Module, Lesson, LessonReference Models dengan relationships
- [x] Create LessonProgress, ModuleProgress Models untuk track completion status per module/lesson
- [x] Create Note Model untuk user notes per lesson
- [x] Create XPTransaction Model untuk track audit trail perolehan XP
- [x] Create LearningPathController dengan methods:
  - `index()` — list active learning paths (`GET /learning-paths`)
  - `show()` — get learning path detail with modules & progress (`GET /learning-paths/{slug}`)
  - `enroll()` — enroll to learning path (`POST /learning-paths/{slug}/enroll`)
  - `getModules()` — list modules in learning path (`GET /learning-paths/{slug}/modules`)
- [x] Create ModuleController dengan methods:
  - `show()` — get module detail with lessons & quiz status (`GET /modules/{slug}`)
  - `getLessons()` — list lessons in module (`GET /modules/{slug}/lessons`)
- [x] Create LessonController dengan methods:
  - `show()` — get lesson content (`GET /lessons/{slug}`)
  - `complete()` — mark lesson as completed, calculate module progress, award XP (`POST /lessons/{slug}/complete`)
- [x] Create NoteController dengan methods:
  - `index()` — list user's notes (`GET /notes`)
  - `storeForLesson()` — create note dari lesson (`POST /lessons/{slug}/notes`)
  - `destroy()` — delete note milik sendiri (`DELETE /notes/{id}`)
- [ ] Create NovaController & NovaService dengan methods:
  - `chat()` — send message to NOVA AI tutor with lesson/module context (`POST /nova/chat`)
- [x] Create ProgressController & XPController dengan methods:
  - `getProgressSummary()` — get dashboard progress summary (`GET /progress`)
  - `getModuleProgress()` — get progress per module (`GET /progress/modules`)
  - `getXpHistory()` — get total XP & transaction history (`GET /xp`)
- [x] Create NotePolicy untuk authorization (only owner can delete note)
- [x] Create ModuleLockService untuk handle prerequisite module locking
- [ ] Setup API routes di `routes/api.php` persis sesuai docs/api-docs.json:
  - `GET /learning-paths`
  - `GET /learning-paths/{slug}`
  - `POST /learning-paths/{slug}/enroll`
  - `GET /learning-paths/{slug}/modules`
  - `GET /modules/{slug}`
  - `GET /modules/{slug}/lessons`
  - `GET /lessons/{slug}`
  - `POST /lessons/{slug}/complete`
  - `GET /notes`
  - `POST /lessons/{slug}/notes`
  - `DELETE /notes/{id}`
  - `POST /nova/chat`
  - `GET /progress`
  - `GET /progress/modules`
  - `GET /xp`
- [x] Create seeders untuk test learning paths, modules, lessons

## Acceptance Criteria
- Learning path hierarchy berfungsi dengan baik (path → modules → lessons)
- URL menggunakan `{slug}` untuk SEO & UX friendly
- Progress tracking akurat & prerequisite module locking bekerja (403 jika locked)
- User hanya bisa akses/hapus notes miliknya (validated di backend via Policy)
- XP diberikan otomatis ketika lesson completed dan tercatat di xp_transactions
- NOVA AI Assistant berfungsi di konteks Lesson/Module, **MUST NOT** ada di Quiz (per RULES.md)
- All responses mengembalikan format JSON konsisten: `{ message, code, data, errors }`

## Priority
🔴 High — core learning functionality

## Related Documentation
- SCHEMA.md
- ARCHITECTURE.md
- RULES.md
- docs/api-docs.json