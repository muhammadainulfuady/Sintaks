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

            // Add all 5 users to each community with allowed enum values ('owner', 'member')
            foreach ($users as $uIndex => $userObj) {
                $role = ($userObj->id === $cData['owner']->id) ? 'owner' : 'member';
                CommunityMember::firstOrCreate(
                    ['community_id' => $comm->id, 'user_id' => $userObj->id],
                    ['role' => $role, 'joined_at' => now()->subDays(5 - $uIndex)]
                );
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
                $msgSender = $users[$mIndex % count($users)];
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
