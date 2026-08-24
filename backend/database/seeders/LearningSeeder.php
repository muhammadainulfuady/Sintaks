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
        $learningPaths = [
            [
                'name' => 'Python Fundamentals',
                'slug' => 'python',
                'description' => 'Kuasai sintaks dasar, variabel, tipe data, kondisi, dan perulangan Python dari nol.',
                'icon' => 'python_icon',
                'order' => 1,
            ],
            [
                'name' => 'Python Data Structures',
                'slug' => 'python-data-structures',
                'description' => 'Pelajari struktur data penting: List, Tuple, Dictionary, Set, dan manipulasi String.',
                'icon' => 'data_structure_icon',
                'order' => 2,
            ],
            [
                'name' => 'Object Oriented Programming (OOP)',
                'slug' => 'python-oop',
                'description' => 'Pahami konsep Class, Object, Inheritance, Polymorphism, dan Encapsulation di Python.',
                'icon' => 'oop_icon',
                'order' => 3,
            ],
            [
                'name' => 'Automation & Scripting',
                'slug' => 'python-automation',
                'description' => 'Otomatisasi tugas sehari-hari, membaca file CSV/JSON, dan melakukan web scraping.',
                'icon' => 'automation_icon',
                'order' => 4,
            ],
            [
                'name' => 'Data Science & AI Essentials',
                'slug' => 'python-data-science',
                'description' => 'Pengenalan analisis data menggunakan NumPy, Pandas, dan integrasi AI Prompting.',
                'icon' => 'ai_ds_icon',
                'order' => 5,
            ],
        ];

        $createdPaths = [];
        foreach ($learningPaths as $pathData) {
            $createdPaths[] = LearningPath::firstOrCreate(
                ['slug' => $pathData['slug']],
                $pathData + ['is_active' => true]
            );
        }

        $mainPath = $createdPaths[0]; // Python Fundamentals

        $modules = [
            ['title' => 'Python Fundamentals', 'slug' => 'python-fundamentals', 'description' => 'Pengenalan sejarah, aturan sintaks, dan cara kerja Python.'],
            ['title' => 'Operator & Ekpresi', 'slug' => 'operator', 'description' => 'Operator aritmatika, perbandingan, logika, dan penugasan.'],
            ['title' => 'Pengondisian (Conditional)', 'slug' => 'conditional', 'description' => 'Kontrol alur program dengan statement if, elif, dan else.'],
            ['title' => 'Perulangan (Looping)', 'slug' => 'loop', 'description' => 'Mengulang instruksi secara efisien menggunakan for dan while.'],
            ['title' => 'Fungsi & Modularisasi', 'slug' => 'functions', 'description' => 'Membuat fungsi kustom, argumen, return value, dan lambda.'],
        ];

        $createdModules = [];
        foreach ($modules as $order => $moduleData) {
            $createdModules[] = Module::firstOrCreate(
                ['learning_path_id' => $mainPath->id, 'slug' => $moduleData['slug']],
                $moduleData + ['order' => $order + 1, 'is_active' => true]
            );
        }

        foreach ($createdModules as $index => $module) {
            if ($index > 0) {
                $module->prerequisites()->syncWithoutDetaching([$createdModules[$index - 1]->id]);
            }

            foreach ($this->lessonsFor($module->slug) as $lessonOrder => $lessonData) {
                $references = $lessonData['references'] ?? [];
                unset($lessonData['references']);

                $lesson = Lesson::firstOrCreate(
                    ['module_id' => $module->id, 'slug' => $lessonData['slug']],
                    $lessonData + [
                        'order' => $lessonOrder + 1,
                        'is_active' => true,
                        'code_example' => $lessonData['code_example'] ?? "print('Hello, Python!')\n",
                        'output_example' => $lessonData['output_example'] ?? "Hello, Python!\n",
                    ]
                );

                foreach ($references as $refOrder => $ref) {
                    LessonReference::firstOrCreate(
                        ['lesson_id' => $lesson->id, 'url' => $ref['url']],
                        $ref + ['order' => $refOrder + 1]
                    );
                }
            }
        }
    }

    private function lessonsFor(string $moduleSlug): array
    {
        return match ($moduleSlug) {
            'python-fundamentals' => [
                $this->lesson('apa-itu-python', 'Apa itu Python?', 'Python adalah bahasa pemrograman tingkat tinggi yang sangat populer karena sintaksnya yang bersih.', ['Sintaks bersih', 'Banyak library', 'Populer di AI & Data'], 'https://docs.python.org/3/tutorial/'),
                $this->lesson('syntax-dasar', 'Syntax Dasar', 'Aturan penulisan kode di Python tidak menggunakan tanda kurung kurawal, melainkan menggunakan indentasi spasi.', ['Indentasi wajib 4 spasi', 'Case sensitive', 'Baris baru sebagai pemisah']),
                $this->lesson('variable', 'Variable & Menyimpan Data', 'Variabel digunakan untuk menyimpan nilai data di memori.', ['Tidak perlu deklarasi tipe', 'Penamaan snake_case']),
                $this->lesson('data-types', 'Tipe Data Dasar', 'Python memiliki tipe data bawaan seperti integer, float, string, dan boolean.', ['Integer (bilangan bulat)', 'Float (desimal)', 'String (teks)', 'Boolean (True/False)']),
                $this->lesson('output-print', 'Menampilkan Output dengan print()', 'Fungsi print() digunakan untuk mencetak teks atau nilai variabel ke konsol.', ['print() otomatis menambah newline', 'Bisa mencetak multiple nilai dengan koma']),
            ],
            'operator' => [
                $this->lesson('arithmetic', 'Operator Aritmatika', 'Operator untuk perhitungan matematika seperti +, -, *, /, %, **, //.', ['+ Penjumlahan', '- Pengurangan', '* Perkalian', '/ Pembagian']),
                $this->lesson('comparison', 'Operator Perbandingan', 'Operator untuk membandingkan dua nilai yang menghasilkan True atau False.', ['== Sama dengan', '!= Tidak sama dengan', '> Lebih besar', '< Lebih kecil']),
                $this->lesson('logical', 'Operator Logika', 'Operator and, or, dan not untuk menggabungkan pernyataan kondisi.', ['and (kedua harus True)', 'or (salah satu True)', 'not (membalikkan hasil)']),
                $this->lesson('assignment', 'Operator Penugasan', 'Operator untuk memberikan nilai ke variabel secara langsung atau singkat (=, +=, -=).', ['= Assignment', '+= Add and assign', '-= Subtract and assign']),
                $this->lesson('membership', 'Operator Keanggotaan (in)', 'Operator in dan not in untuk memeriksa apakah suatu nilai ada di dalam deretan data.', ['in (memeriksa keberadaan)', 'not in (memeriksa ketidakberadaan)']),
            ],
            'conditional' => [
                $this->lesson('if-statement', 'Pengondisian if', 'Struktur kontrol dasar untuk mengeksekusi blok kode jika kondisi True.', ['Kondisi bernilai Boolean', 'Wajib menggunakan indentasi']),
                $this->lesson('else-statement', 'Pengondisian else', 'Dijalankan ketika kondisi pada statement if sebelumnya bernilai False.', ['Eksekusi alternatif', 'Tanpa syarat tambahan']),
                $this->lesson('elif-statement', 'Pengondisian elif', 'Digunakan untuk menguji beberapa kondisi alternatif secara berurutan.', ['Singkatan dari else if', 'Bisa digunakan beberapa kali']),
                $this->lesson('nested-conditional', 'Pengondisian Bersarang', 'Memasukkan struktur if di dalam blok if lainnya untuk logika yang lebih kompleks.', ['Perhatikan kedalaman indentasi']),
                $this->lesson('ternary-operator', 'Ternary Operator', 'Cara singkat menuliskan kondisional sederhana dalam satu baris kode.', ['Sintaks: value_if_true if condition else value_if_false']),
            ],
            'loop' => [
                $this->lesson('for-loop', 'Perulangan For', 'Mengulang eksekusi kode untuk setiap item dalam himpunan data seperti range(), list, atau string.', ['Mengiterasi elemen', 'Kombinasi dengan range()']),
                $this->lesson('while-loop', 'Perulangan While', 'Mengulang eksekusi kode selama kondisi bernilai True.', ['Perhatikan infinite loop', 'Update variabel pengontrol']),
                $this->lesson('break-statement', 'Pemberhentian dengan break', 'Menghentikan secara paksa perulangan sebelum iterasi selesai.', ['Keluar dari loop terdekat']),
                $this->lesson('continue-statement', 'Melompati dengan continue', 'Melompati sisa instruksi di iterasi saat ini dan lanjut ke iterasi berikutnya.', ['Skip iterasi tertentu']),
                $this->lesson('else-in-loop', 'Blok else pada Loop', 'Dijalankan setelah perulangan selesai secara normal tanpa interupsi break.', ['Fitur unik Python']),
            ],
            'functions' => [
                $this->lesson('def-function', 'Mendefinisikan Fungsi (def)', 'Fungsi adalah blok kode terorganisir yang digunakan kembali dengan kata kunci def.', ['Reusability kode', 'Nama fungsi intuitif']),
                $this->lesson('function-parameters', 'Parameter & Argumen', 'Mengirimkan nilai input ke dalam fungsi melalui parameter.', ['Parameter posisional', 'Keyword arguments']),
                $this->lesson('return-statement', 'Mengembalikan Nilai (return)', 'Mengembalikan hasil eksekusi fungsi ke pemanggil.', ['Mengakhiri eksekusi fungsi', 'Bisa return multiple values']),
                $this->lesson('default-parameters', 'Default Parameter Values', 'Memberikan nilai bawaan pada parameter jika argumen tidak diberikan saat dipanggil.', ['Mencegah error missing argument']),
                $this->lesson('lambda-function', 'Fungsi Lambda (Anonymous)', 'Fungsi kecil tanpa nama yang ditulis dalam satu baris.', ['Sintaks: lambda params: expression']),
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
            $lesson['references'] = [
                ['title' => "Dokumentasi Resmi {$title}", 'url' => $referenceUrl],
            ];
        }

        return $lesson;
    }
}