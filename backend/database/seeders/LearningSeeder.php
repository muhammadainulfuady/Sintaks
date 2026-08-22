<?php

namespace Database\Seeders;

use App\Models\LearningPath;
use App\Models\Lesson;
use App\Models\LessonReference;
use App\Models\Module;
use Illuminate\Database\Seeder;

class LearningSeeder extends Seeder
{
    public function run(): void
    {
        $learningPath = LearningPath::firstOrCreate(
            ['slug' => 'python'],
            [
                'name' => 'Python',
                'description' => 'Belajar Python dari dasar hingga mahir.',
                'icon' => 'python_icon',
                'is_active' => true,
                'order' => 1,
            ]
        );

        $modules = [
            ['title' => 'Python Fundamentals', 'slug' => 'python-fundamentals', 'description' => 'Dasar-dasar sintaks Python.'],
            ['title' => 'Operator', 'slug' => 'operator', 'description' => 'Kenali operator yang digunakan dalam Python.'],
            ['title' => 'Conditional', 'slug' => 'conditional', 'description' => 'Buat keputusan dengan kondisi Python.'],
            ['title' => 'Loop', 'slug' => 'loop', 'description' => 'Ulangi proses dengan for dan while.'],
        ];

        $createdModules = [];
        foreach ($modules as $order => $moduleData) {
            $createdModules[] = Module::firstOrCreate(
                ['learning_path_id' => $learningPath->id, 'slug' => $moduleData['slug']],
                $moduleData + ['order' => $order + 1, 'is_active' => true]
            );
        }

        foreach ($createdModules as $index => $module) {
            if ($index > 0) {
                $module->prerequisites()->syncWithoutDetaching([$createdModules[$index - 1]->id]);
            }

            foreach ($this->lessonsFor($module->slug) as $lessonOrder => $lessonData) {
                $lessonAttributes = $lessonData;
                unset($lessonAttributes['reference']);

                $lesson = Lesson::firstOrCreate(
                    ['module_id' => $module->id, 'slug' => $lessonData['slug']],
                    $lessonAttributes + ['order' => $lessonOrder + 1, 'is_active' => true]
                );

                if (isset($lessonData['reference'])) {
                    LessonReference::firstOrCreate(
                        ['lesson_id' => $lesson->id, 'url' => $lessonData['reference']['url']],
                        $lessonData['reference'] + ['order' => 1]
                    );
                }
            }
        }
    }

    private function lessonsFor(string $moduleSlug): array
    {
        return match ($moduleSlug) {
            'python-fundamentals' => [
                $this->lesson('apa-itu-python', 'Apa itu Python?', 'Python adalah bahasa pemrograman yang mudah dipelajari.', ['Python memiliki sintaks yang mudah dibaca.'], 'https://docs.python.org/3/tutorial/'),
                $this->lesson('syntax-dasar', 'Syntax Dasar', 'Pelajari aturan dasar penulisan kode Python.'),
                $this->lesson('variable', 'Variable', 'Variable digunakan untuk menyimpan nilai.'),
                $this->lesson('data-types', 'Data Types', 'Python memiliki beberapa tipe data dasar.'),
            ],
            'operator' => [
                $this->lesson('arithmetic', 'Arithmetic Operator', 'Gunakan operator aritmatika untuk perhitungan.'),
                $this->lesson('comparison', 'Comparison Operator', 'Bandingkan dua nilai dengan operator perbandingan.'),
                $this->lesson('logical', 'Logical Operator', 'Gabungkan kondisi dengan and, or, dan not.'),
            ],
            'conditional' => [
                $this->lesson('if', 'if', 'Jalankan kode ketika kondisi bernilai benar.'),
                $this->lesson('elif', 'elif', 'Tambahkan kondisi alternatif.'),
                $this->lesson('else', 'else', 'Sediakan aksi ketika semua kondisi sebelumnya salah.'),
            ],
            'loop' => [
                $this->lesson('for', 'for', 'Ulangi kode untuk setiap item dalam iterable.'),
                $this->lesson('while', 'while', 'Ulangi kode selama kondisi bernilai benar.'),
            ],
            default => [],
        };
    }

    private function lesson(string $slug, string $title, string $explanation, array $keyPoints = [], ?string $referenceUrl = null): array
    {
        $lesson = [
            'slug' => $slug,
            'title' => $title,
            'explanation' => $explanation,
            'key_points' => $keyPoints,
        ];

        if ($referenceUrl !== null) {
            $lesson['reference'] = ['title' => "Referensi {$title}", 'url' => $referenceUrl];
        }

        return $lesson;
    }
}