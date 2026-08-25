<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizQuestionOption;
use App\Models\TestCase;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\CommunityMessage;
use App\Models\Note;
use App\Models\XPTransaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class QuizAndCommunitySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Fetch User Models
        $users = User::all();
        $admin = $users->firstWhere('email', 'admin@sintaks.id') ?? $users[0];
        $user1 = $users->firstWhere('email', 'ainul@example.com') ?? $users[1];
        $user2 = $users->firstWhere('email', 'budi@example.com') ?? $users[2];
        $user3 = $users->firstWhere('email', 'citra@example.com') ?? $users[3] ?? $user1;
        $user4 = $users->firstWhere('email', 'dewi@example.com') ?? $users[4] ?? $user2;

        // 2. Fetch Modules & Lessons
        $modules = DB::table('modules')->get();
        $lessons = DB::table('lessons')->get();

        // Ensure at least 5 quizzes
        foreach ($modules->take(5) as $moduleIndex => $module) {
            $quiz = Quiz::firstOrCreate(
                ['module_id' => $module->id],
                [
                    'title' => "Quiz: {$module->title}",
                    'description' => "Uji pemahamanmu tentang materi {$module->title}.",
                    'passing_score' => 70,
                    'is_active' => true,
                ]
            );

            // Create 5 questions per quiz
            // Q1: Theory Multiple Choice
            $q1 = QuizQuestion::firstOrCreate(
                ['quiz_id' => $quiz->id, 'order' => 1],
                [
                    'type' => 'theory',
                    'question' => 'Apa tipe data bawaan Python untuk menyimpan urutan angka bulat?',
                    'explanation' => 'Tipe data int (integer) digunakan untuk menyimpan bilangan bulat.',
                    'language' => 'python',
                    'is_active' => true,
                ]
            );
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'A'], ['content' => "<class 'int'>", 'is_correct' => true, 'order' => 1]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'B'], ['content' => "<class 'str'>", 'is_correct' => false, 'order' => 2]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'C'], ['content' => "<class 'float'>", 'is_correct' => false, 'order' => 3]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'D'], ['content' => "<class 'bool'>", 'is_correct' => false, 'order' => 4]);

            // Q2: Theory Multiple Choice
            $q2 = QuizQuestion::firstOrCreate(
                ['quiz_id' => $quiz->id, 'order' => 2],
                [
                    'type' => 'theory',
                    'question' => 'Simbol apa yang digunakan untuk menuliskan komentar satu baris di Python?',
                    'explanation' => 'Karakter pagar (#) digunakan untuk komentar satu baris.',
                    'language' => 'python',
                    'is_active' => true,
                ]
            );
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q2->id, 'label' => 'A'], ['content' => '#', 'is_correct' => true, 'order' => 1]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q2->id, 'label' => 'B'], ['content' => '//', 'is_correct' => false, 'order' => 2]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q2->id, 'label' => 'C'], ['content' => '/*', 'is_correct' => false, 'order' => 3]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q2->id, 'label' => 'D'], ['content' => '<!--', 'is_correct' => false, 'order' => 4]);

            // Q3: Code Writing (Ketik Kode)
            $q3 = QuizQuestion::firstOrCreate(
                ['quiz_id' => $quiz->id, 'order' => 3],
                [
                    'type' => 'code_writing',
                    'question' => "Buatlah program Python yang mencetak teks 'Sintaks Python' ke layar.",
                    'starter_code' => "# Tulis kode Python kamu di bawah ini\n",
                    'language' => 'python',
                    'time_limit_seconds' => 10,
                    'memory_limit_mb' => 64,
                    'is_active' => true,
                ]
            );
            TestCase::firstOrCreate(['quiz_question_id' => $q3->id, 'order' => 1], ['input' => null, 'expected_output' => 'Sintaks Python', 'is_hidden' => false]);
            TestCase::firstOrCreate(['quiz_question_id' => $q3->id, 'order' => 2], ['input' => null, 'expected_output' => 'Sintaks Python', 'is_hidden' => true]);

            // Q4: Code Completion (Lengkapi Kode)
            $q4 = QuizQuestion::firstOrCreate(
                ['quiz_id' => $quiz->id, 'order' => 4],
                [
                    'type' => 'code_completion',
                    'question' => 'Lengkapi kode berikut agar mencetak angka 0 sampai 4:',
                    'code_template' => "___BLANK_1___ i in ___BLANK_2___:\n    print(i)",
                    'language' => 'python',
                    'time_limit_seconds' => 10,
                    'memory_limit_mb' => 64,
                    'is_active' => true,
                ]
            );
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q4->id, 'content' => 'for'], ['label' => null, 'is_correct' => true, 'order' => 1]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q4->id, 'content' => 'while'], ['label' => null, 'is_correct' => false, 'order' => 2]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q4->id, 'content' => 'range(5)'], ['label' => null, 'is_correct' => true, 'order' => 3]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q4->id, 'content' => 'range(4)'], ['label' => null, 'is_correct' => false, 'order' => 4]);
            TestCase::firstOrCreate(['quiz_question_id' => $q4->id, 'order' => 1], ['input' => null, 'expected_output' => "0\n1\n2\n3\n4", 'is_hidden' => false]);

            // Q5: Theory Multiple Choice
            $q5 = QuizQuestion::firstOrCreate(
                ['quiz_id' => $quiz->id, 'order' => 5],
                [
                    'type' => 'theory',
                    'question' => 'Fungsi mana yang digunakan untuk mengkonversi nilai menjadi teks (string)?',
                    'explanation' => 'Fungsi str() mengkonversi objek menjadi tipe data String.',
                    'language' => 'python',
                    'is_active' => true,
                ]
            );
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q5->id, 'label' => 'A'], ['content' => 'str()', 'is_correct' => true, 'order' => 1]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q5->id, 'label' => 'B'], ['content' => 'int()', 'is_correct' => false, 'order' => 2]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q5->id, 'label' => 'C'], ['content' => 'text()', 'is_correct' => false, 'order' => 3]);
            QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q5->id, 'label' => 'D'], ['content' => 'toString()', 'is_correct' => false, 'order' => 4]);
        }

        // Quiz yang relevan untuk setiap modul pada alur Python.
        $quizBlueprints = [
            'python-fundamentals' => [
                ['Python memakai apa untuk menandai blok kode?', 'Indentasi (umumnya 4 spasi) menentukan blok kode Python.', ['Kurung kurawal', 'Indentasi', 'Titik koma', 'Tag HTML'], 1],
                ['Tipe data untuk teks di Python adalah ...', 'str digunakan untuk menyimpan teks.', ['int', 'float', 'str', 'bool'], 2],
                ['Fungsi untuk menampilkan nilai ke layar adalah ...', 'print() mencetak nilai ke konsol.', ['show()', 'echo()', 'console()', 'print()'], 3],
                ['Manakah nama variabel yang mengikuti gaya Python?', 'snake_case digunakan untuk nama variabel Python.', ['nama_siswa', 'nama-siswa', 'Nama Siswa', '2nama'], 0],
                ['Nilai Boolean yang benar adalah ...', 'Boolean Python ditulis True atau False dengan huruf awal kapital.', ['true', 'TRUE', 'True', 'yes'], 2],
            ],
            'operator-dan-string' => [
                ['Hasil dari 17 % 5 adalah ...', '% menghasilkan sisa pembagian.', ['2', '3', '5', '17'], 0],
                ['Operator untuk membandingkan dua nilai adalah ...', '== membandingkan nilai, sedangkan = memberi nilai.', ['=', '==', '===', ':='], 1],
                ['input() mengembalikan data bertipe ...', 'Hasil input() selalu string sebelum dikonversi.', ['int', 'float', 'str', 'bool'], 2],
                ['Method untuk membuat string menjadi huruf besar adalah ...', 'upper() menghasilkan string dengan huruf kapital.', ['capitalize()', 'upper()', 'large()', 'titlecase()'], 1],
                ['Operator logika yang benar jika kedua kondisi benar adalah ...', 'and hanya True ketika semua kondisi bernilai True.', ['or', 'not', 'and', 'in'], 2],
            ],
            'conditional' => [
                ['Kata kunci untuk kondisi pertama adalah ...', 'if memulai percabangan di Python.', ['when', 'if', 'case', 'check'], 1],
                ['Blok yang dijalankan jika kondisi if salah adalah ...', 'else menjadi alternatif ketika if bernilai False.', ['elif', 'other', 'else', 'default'], 2],
                ['elif digunakan untuk ...', 'elif memeriksa kondisi tambahan.', ['mengulang kode', 'kondisi tambahan', 'membuat fungsi', 'menghapus nilai'], 1],
                ['Tanda yang wajib ditulis setelah kondisi if adalah ...', 'Titik dua menandai awal blok kondisi.', [';', ':', ',', '.'], 1],
                ['Jika nilai = 80, hasil nilai >= 75 adalah ...', '80 memang lebih besar atau sama dengan 75.', ['True', 'False', '80', 'Error'], 0],
            ],
            'collections' => [
                ['Koleksi yang bisa diubah setelah dibuat adalah ...', 'List bersifat mutable.', ['tuple', 'list', 'string', 'int'], 1],
                ['Koleksi yang menyimpan nilai unik adalah ...', 'Set otomatis menghapus nilai duplikat.', ['list', 'tuple', 'set', 'str'], 2],
                ['Sintaks list menggunakan ...', 'List ditulis di antara tanda kurung siku.', ['()', '[]', '{}', '<>'], 1],
                ['Index terakhir sebuah list dapat diakses dengan ...', 'Index negatif -1 menunjuk item terakhir.', ['list[0]', 'list[1]', 'list[-1]', 'list[last]'], 2],
                ['Tuple paling cocok digunakan untuk ...', 'Tuple tepat ketika data tidak boleh berubah.', ['data yang sering diubah', 'data yang tetap', 'nilai unik saja', 'teks panjang'], 1],
            ],
            'loop' => [
                ['range(3) menghasilkan angka ...', 'range(3) menghasilkan 0, 1, dan 2.', ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3 saja'], 1],
                ['Loop yang cocok saat jumlah pengulangan belum diketahui adalah ...', 'while berjalan selama kondisinya True.', ['for', 'while', 'if', 'def'], 1],
                ['break berfungsi untuk ...', 'break menghentikan loop terdekat.', ['memulai loop', 'menghentikan loop', 'melewati satu iterasi', 'mencetak data'], 1],
                ['continue berfungsi untuk ...', 'continue melewati sisa kode di iterasi saat ini.', ['menghentikan program', 'melewati iterasi saat ini', 'mengulang dari awal', 'menghapus loop'], 1],
                ['Agar while tidak infinite loop, kita perlu ...', 'Nilai pengontrol kondisi harus diperbarui.', ['menambah print()', 'mengubah nilai pengontrol', 'menggunakan list', 'menulis elif'], 1],
            ],
            'functions' => [
                ['Kata kunci untuk membuat function Python adalah ...', 'def digunakan untuk mendefinisikan function.', ['func', 'function', 'def', 'define'], 2],
                ['Data yang diterima function disebut ...', 'Parameter didefinisikan pada function.', ['output', 'parameter', 'loop', 'index'], 1],
                ['Kata kunci untuk mengirim hasil function adalah ...', 'return mengirimkan nilai kepada pemanggil function.', ['print', 'yielding', 'return', 'send'], 2],
                ['Parameter dengan nilai cadangan disebut ...', 'Default parameter dipakai jika argumen tidak dikirim.', ['global parameter', 'default parameter', 'loop parameter', 'empty parameter'], 1],
                ['Function membantu kode menjadi ...', 'Function membuat kode dapat digunakan ulang.', ['lebih acak', 'sulit diuji', 'dapat digunakan ulang', 'selalu lebih panjang'], 2],
            ],
            'dictionary' => [
                ['Dictionary menyimpan data dalam bentuk ...', 'Dictionary menyimpan pasangan key dan value.', ['index dan loop', 'key dan value', 'baris dan kolom', 'huruf dan angka'], 1],
                ['Key pada dictionary harus ...', 'Setiap key dictionary harus unik.', ['selalu angka', 'unik', 'selalu string', 'berurutan'], 1],
                ['Method aman untuk mengambil value dari key yang mungkin tidak ada adalah ...', 'get() dapat mengembalikan nilai cadangan tanpa error.', ['find()', 'value()', 'get()', 'read()'], 2],
                ['Method dictionary untuk loop key dan value sekaligus adalah ...', 'items() menghasilkan pasangan key dan value.', ['keys()', 'values()', 'items()', 'pairs()'], 2],
                ['Sintaks untuk menambah kelas ke profil adalah ...', "Penugasan ke key baru menambahkan data dictionary.", ["profil.add('kelas')", "profil['kelas'] = '10A'", "profil.kelas('10A')", "append(profil, 'kelas')"], 1],
            ],
        ];

        $moduleBySlug = $modules->keyBy('slug');
        foreach ($quizBlueprints as $moduleSlug => $questions) {
            $module = $moduleBySlug->get($moduleSlug);
            if ($module === null) {
                continue;
            }

            $quiz = Quiz::updateOrCreate(
                ['module_id' => $module->id],
                ['title' => "Quiz: {$module->title}", 'description' => "Uji pemahamanmu tentang {$module->title}.", 'passing_score' => 70, 'is_active' => true]
            );

            foreach ($questions as $order => [$questionText, $explanation, $options, $correctIndex]) {
                $question = QuizQuestion::updateOrCreate(
                    ['quiz_id' => $quiz->id, 'order' => $order + 1],
                    ['type' => 'theory', 'question' => $questionText, 'explanation' => $explanation, 'language' => 'python', 'starter_code' => null, 'code_template' => null, 'is_active' => true]
                );

                QuizQuestionOption::where('quiz_question_id', $question->id)->delete();
                TestCase::where('quiz_question_id', $question->id)->delete();
                foreach ($options as $optionOrder => $option) {
                    QuizQuestionOption::create([
                        'quiz_question_id' => $question->id,
                        'label' => chr(65 + $optionOrder),
                        'content' => $option,
                        'is_correct' => $optionOrder === $correctIndex,
                        'order' => $optionOrder + 1,
                    ]);
                }
            }
        }

        // 3. Create 5 Communities
        $communitiesData = [
            ['name' => 'Belajar Python Bareng', 'description' => 'Komunitas belajar Python dari dasar hingga mahir untuk pemula dan umum.', 'owner' => $admin],
            ['name' => 'Python Pemula Indonesia', 'description' => 'Tempat berdiskusi, bertanya, dan berkolaborasi sesama pembelajar Python di Indonesia.', 'owner' => $user1],
            ['name' => 'Django & Web Development', 'description' => 'Diskusi seputar pengembangan aplikasi web backend menggunakan framework Django dan FastAPI.', 'owner' => $user2],
            ['name' => 'Automation & Web Scraping', 'description' => 'Komunitas otomatisasi tugas harian dan ekstraksi data web dengan Python.', 'owner' => $user3],
            ['name' => 'Data Science & AI Club', 'description' => 'Wadah eksplorasi analisis data, Machine Learning, dan Generative AI Prompting.', 'owner' => $user4],
        ];

        foreach ($communitiesData as $cIndex => $cData) {
            $comm = Community::firstOrCreate(
                ['name' => $cData['name']],
                [
                    'owner_id' => $cData['owner']->id,
                    'description' => $cData['description'],
                ]
            );

            // Seed membership bervariasi agar alur join juga dapat dicoba dengan data dummy.
            $communityMembers = [];
            foreach ($users as $uIndex => $userObj) {
                if ($userObj->id !== $cData['owner']->id && ($uIndex + $cIndex) % 2 !== 0) {
                    continue;
                }

                $role = ($userObj->id === $cData['owner']->id) ? 'owner' : 'member';
                CommunityMember::firstOrCreate(
                    ['community_id' => $comm->id, 'user_id' => $userObj->id],
                    ['role' => $role, 'joined_at' => now()->subDays(5 - $uIndex)]
                );
                $communityMembers[] = $userObj;
            }

            // Create 5 Messages per community
            $messages = [
                "Halo semuanya! Selamat datang di grup {$comm->name}.",
                "Halo! Senang sekali bisa bergabung di komunitas ini.",
                "Ada yang punya rekomendasi materi belajar Python yang bagus?",
                "Kalian bisa cek modul dan kuis interaktif di platform Sintaks ini!",
                "Semangat belajar semuanya! Jangan ragu buat tanya kalau ada error.",
            ];

            foreach ($messages as $mIndex => $msgText) {
                $msgSender = $communityMembers[$mIndex % count($communityMembers)];
                CommunityMessage::firstOrCreate(
                    [
                        'community_id' => $comm->id,
                        'user_id' => $msgSender->id,
                        'content' => $msgText,
                    ],
                    ['created_at' => now()->subHours(10 - $mIndex)]
                );
            }
        }

        // 4. Create 5 Notes attached to lessons
        $notesContents = [
            'Python wajib menggunakan 4 spasi untuk indentasi. Jangan campur tab dan spasi!',
            'List bersifat mutable (bisa diubah), sedangkan Tuple bersifat immutable (tidak bisa diubah).',
            'Gunakan range(start, stop, step) untuk mengontrol urutan angka pada for loop.',
            'Selalu gunakan default argument di bagian akhir parameter fungsi.',
            'Class adalah cetakan (blueprint), sedangkan Object adalah bentuk nyata (instance) dari class.',
        ];

        foreach ($notesContents as $nIndex => $content) {
            $targetLesson = $lessons[$nIndex % count($lessons)];
            Note::firstOrCreate(
                [
                    'user_id' => $user1->id,
                    'lesson_id' => $targetLesson->id,
                ],
                [
                    'content' => $content,
                    'created_at' => now()->subDays($nIndex),
                ]
            );
        }

        // 5. Create 5 XP Transactions
        $xpData = [
            ['user' => $admin, 'amount' => 500, 'source_type' => 'lesson_completion', 'source_id' => 1, 'description' => 'Menyelesaikan Modul Python Fundamentals'],
            ['user' => $user1, 'amount' => 150, 'source_type' => 'quiz_completion', 'source_id' => 1, 'description' => 'Lulus Quiz Python Fundamentals dengan nilai sempurna'],
            ['user' => $user2, 'amount' => 100, 'source_type' => 'lesson_completion', 'source_id' => 2, 'description' => 'Menyelesaikan Pelajaran Operator Aritmatika'],
            ['user' => $user3, 'amount' => 80, 'source_type' => 'quiz_completion', 'source_id' => 2, 'description' => 'Lulus Quiz Operator'],
            ['user' => $user4, 'amount' => 50, 'source_type' => 'lesson_completion', 'source_id' => 3, 'description' => 'Menyelesaikan Pelajaran Apa itu Python'],
        ];

        foreach ($xpData as $xpItem) {
            XPTransaction::firstOrCreate(
                [
                    'user_id' => $xpItem['user']->id,
                    'source_type' => $xpItem['source_type'],
                    'source_id' => $xpItem['source_id'],
                ],
                [
                    'amount' => $xpItem['amount'],
                    'description' => $xpItem['description'],
                    'created_at' => now(),
                ]
            );
        }
    }
}
