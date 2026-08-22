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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class QuizAndCommunitySeeder extends Seeder
{
    public function run(): void
    {
        // 1. User Dummy
        $admin = User::firstOrCreate(
            ['email' => 'admin@sintaks.id'],
            [
                'name' => 'Admin Sintaks',
                'username' => 'admin_sintaks',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'avatar' => 'avatar_admin',
                'total_xp' => 1000,
            ]
        );

        $user1 = User::firstOrCreate(
            ['email' => 'ainul@example.com'],
            [
                'name' => 'Ainul Fuady',
                'username' => 'ainulfuady',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'avatar' => 'avatar_01',
                'total_xp' => 150,
            ]
        );

        $user2 = User::firstOrCreate(
            ['email' => 'budi@example.com'],
            [
                'name' => 'Budi Coder',
                'username' => 'budi_coder',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'avatar' => 'avatar_02',
                'total_xp' => 80,
            ]
        );

        // 2. Learning Path & Module Dummy (via DB Table)
        $pathId = DB::table('learning_paths')->where('slug', 'python')->value('id');
        if (!$pathId) {
            $pathId = DB::table('learning_paths')->insertGetId([
                'name' => 'Python',
                'slug' => 'python',
                'description' => 'Belajar Python dari dasar hingga mahir.',
                'icon' => 'python_icon',
                'is_active' => true,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $moduleId = DB::table('modules')->where('slug', 'python-fundamentals')->value('id');
        if (!$moduleId) {
            $moduleId = DB::table('modules')->insertGetId([
                'learning_path_id' => $pathId,
                'title' => 'Python Fundamentals',
                'slug' => 'python-fundamentals',
                'description' => 'Dasar-dasar sintaks Python.',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 3. Quiz Dummy
        $quiz = Quiz::firstOrCreate(
            ['module_id' => $moduleId],
            [
                'title' => 'Quiz: Python Fundamentals',
                'description' => 'Uji pemahamanmu tentang dasar-dasar sintaks Python.',
                'passing_score' => 70,
                'is_active' => true,
            ]
        );

        // Soal 1: Theory (Pilihan Ganda)
        $q1 = QuizQuestion::firstOrCreate(
            ['quiz_id' => $quiz->id, 'order' => 1],
            [
                'type' => 'theory',
                'question' => 'Apa output dari fungsi print(type(10)) di Python?',
                'explanation' => 'Angka 10 di Python adalah tipe data integer (<class \'int\'>).',
                'language' => 'python',
                'is_active' => true,
            ]
        );

        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'A'], ['content' => "<class 'int'>", 'is_correct' => true, 'order' => 1]);
        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'B'], ['content' => "<class 'str'>", 'is_correct' => false, 'order' => 2]);
        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'C'], ['content' => "<class 'float'>", 'is_correct' => false, 'order' => 3]);
        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q1->id, 'label' => 'D'], ['content' => "<class 'bool'>", 'is_correct' => false, 'order' => 4]);

        // Soal 2: Code Writing (Ketik Kode)
        $q2 = QuizQuestion::firstOrCreate(
            ['quiz_id' => $quiz->id, 'order' => 2],
            [
                'type' => 'code_writing',
                'question' => "Buatlah program Python yang mencetak teks 'Hello, World!' ke layar.",
                'starter_code' => "# Tulis kode Python kamu di bawah ini\n",
                'language' => 'python',
                'time_limit_seconds' => 10,
                'memory_limit_mb' => 64,
                'is_active' => true,
            ]
        );

        TestCase::firstOrCreate(['quiz_question_id' => $q2->id, 'order' => 1], ['input' => null, 'expected_output' => 'Hello, World!', 'is_hidden' => false]);
        TestCase::firstOrCreate(['quiz_question_id' => $q2->id, 'order' => 2], ['input' => null, 'expected_output' => 'Hello, World!', 'is_hidden' => true]);

        // Soal 3: Code Completion (Lengkapi Kode)
        $q3 = QuizQuestion::firstOrCreate(
            ['quiz_id' => $quiz->id, 'order' => 3],
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

        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q3->id, 'content' => 'for'], ['label' => null, 'is_correct' => true, 'order' => 1]);
        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q3->id, 'content' => 'while'], ['label' => null, 'is_correct' => false, 'order' => 2]);
        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q3->id, 'content' => 'range(5)'], ['label' => null, 'is_correct' => true, 'order' => 3]);
        QuizQuestionOption::firstOrCreate(['quiz_question_id' => $q3->id, 'content' => 'range(4)'], ['label' => null, 'is_correct' => false, 'order' => 4]);

        TestCase::firstOrCreate(['quiz_question_id' => $q3->id, 'order' => 1], ['input' => null, 'expected_output' => "0\n1\n2\n3\n4", 'is_hidden' => false]);

        // 4. Community Dummy
        $comm1 = Community::firstOrCreate(
            ['name' => 'Belajar Python Bareng'],
            [
                'owner_id' => $user1->id,
                'description' => 'Komunitas belajar Python dari dasar hingga mahir.',
            ]
        );

        $comm2 = Community::firstOrCreate(
            ['name' => 'Python Pemula Indonesia'],
            [
                'owner_id' => $user2->id,
                'description' => 'Tempat bertanya dan berdiskusi untuk pemula Python.',
            ]
        );

        // Memberships
        CommunityMember::firstOrCreate(['community_id' => $comm1->id, 'user_id' => $user1->id], ['role' => 'owner', 'joined_at' => now()]);
        CommunityMember::firstOrCreate(['community_id' => $comm1->id, 'user_id' => $user2->id], ['role' => 'member', 'joined_at' => now()]);
        CommunityMember::firstOrCreate(['community_id' => $comm2->id, 'user_id' => $user2->id], ['role' => 'owner', 'joined_at' => now()]);

        // Messages
        CommunityMessage::firstOrCreate(
            ['community_id' => $comm1->id, 'content' => 'Halo semuanya! Selamat datang di komunitas Belajar Python Bareng.'],
            ['user_id' => $user1->id]
        );

        CommunityMessage::firstOrCreate(
            ['community_id' => $comm1->id, 'content' => 'Halo Mas Ainul! Senang bisa bergabung di komunitas ini.'],
            ['user_id' => $user2->id]
        );
    }
}
