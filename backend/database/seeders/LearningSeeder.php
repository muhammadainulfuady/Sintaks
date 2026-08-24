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
        // Sembunyikan alur placeholder yang belum memiliki materi lengkap.
        LearningPath::query()->where('slug', '!=', 'python')->update(['is_active' => false]);

        $path = LearningPath::updateOrCreate(
            ['slug' => 'python'],
            [
                'name' => 'Belajar Python dari Dasar',
                'description' => 'Kurikulum Python bertahap untuk pemula: sintaks, data, percabangan, koleksi, perulangan, function, hingga dictionary.',
                'icon' => 'python_icon', 'order' => 1, 'is_active' => true,
            ]
        );

        $modules = [
            ['slug' => 'python-fundamentals', 'title' => '1. Dasar-Dasar Python', 'description' => 'Kenali Python, sintaks, variabel, tipe data, dan output.'],
            ['slug' => 'operator-dan-string', 'title' => '2. Operator & String', 'description' => 'Gunakan operator, input pengguna, dan string untuk mengolah data sederhana.'],
            ['slug' => 'conditional', 'title' => '3. Percabangan', 'description' => 'Buat program mengambil keputusan dengan if, elif, else, dan operator logika.'],
            ['slug' => 'collections', 'title' => '4. List, Tuple & Set', 'description' => 'Simpan banyak nilai dan pilih struktur koleksi yang tepat.'],
            ['slug' => 'loop', 'title' => '5. Perulangan', 'description' => 'Otomatiskan pekerjaan berulang menggunakan for, while, break, dan continue.'],
            ['slug' => 'functions', 'title' => '6. Function', 'description' => 'Rapikan program menjadi function yang dapat digunakan kembali.'],
            ['slug' => 'dictionary', 'title' => '7. Dictionary', 'description' => 'Kelola data berpasangan key-value dan gabungkan dengan konsep Python lain.'],
        ];

        $createdModules = [];
        foreach ($modules as $index => $moduleData) {
            $createdModules[] = Module::updateOrCreate(
                ['learning_path_id' => $path->id, 'slug' => $moduleData['slug']],
                $moduleData + ['order' => $index + 1, 'is_active' => true]
            );
        }

        foreach ($createdModules as $index => $module) {
            $module->prerequisites()->sync($index === 0 ? [] : [$createdModules[$index - 1]->id]);

            foreach ($this->lessonsFor($module->slug) as $lessonOrder => $lessonData) {
                $lesson = Lesson::updateOrCreate(
                    ['module_id' => $module->id, 'slug' => $lessonData['slug']],
                    $lessonData + ['order' => $lessonOrder + 1, 'is_active' => true]
                );

                LessonReference::updateOrCreate(
                    ['lesson_id' => $lesson->id, 'url' => 'https://docs.python.org/3/tutorial/'],
                    ['title' => 'Dokumentasi Python', 'order' => 1]
                );
            }
        }
    }

    private function lessonsFor(string $moduleSlug): array
    {
        return match ($moduleSlug) {
            'python-fundamentals' => [
                $this->lesson('apa-itu-python', 'Apa itu Python?', 'Python adalah bahasa pemrograman yang mudah dibaca dan banyak dipakai untuk web, otomatisasi, data, dan AI.', ['Sintaks ringkas', 'Dijalankan oleh interpreter', 'Ekosistem library besar'], "print('Halo, Python!')", 'Halo, Python!'),
                $this->lesson('syntax-dasar', 'Aturan Sintaks & Indentasi', 'Python memakai indentasi, biasanya empat spasi, untuk menandai blok kode.', ['Python case-sensitive', 'Akhiri kondisi dengan :', 'Jangan campur tab dan spasi'], "if True:\n    print('Indentasi benar')", 'Indentasi benar'),
                $this->lesson('variable', 'Variabel', 'Variabel adalah nama untuk menyimpan data. Python menentukan tipe data dari nilai yang diberikan.', ['Gunakan snake_case', 'Nama harus bermakna', 'Nilai dapat berubah'], "nama = 'Ayu'\numur = 18\nprint(nama, umur)", 'Ayu 18'),
                $this->lesson('data-types', 'Tipe Data Dasar', 'Tipe dasar yang sering dipakai adalah int, float, str, dan bool.', ['int: bilangan bulat', 'float: desimal', 'str: teks', 'bool: True atau False'], "nilai = 92.5\nlulus = True\nprint(type(nilai).__name__, type(lulus).__name__)", 'float bool'),
                $this->lesson('output-print', 'Output dengan print()', 'print() menampilkan teks atau nilai ke layar. Gunakan f-string untuk teks dinamis.', ['Koma mencetak beberapa nilai', 'F-string memakai awalan f'], "nama = 'Rani'\nprint(f'Halo, {nama}!')", 'Halo, Rani!'),
            ],
            'operator-dan-string' => [
                $this->lesson('operator-aritmatika', 'Operator Aritmatika', 'Gunakan +, -, *, /, //, %, dan ** untuk menghitung.', ['// pembagian bulat', '% sisa bagi', '** pangkat'], "total = 17 + 8\nsisa = 17 % 5\nprint(total, sisa)", '25 2'),
                $this->lesson('operator-perbandingan', 'Operator Perbandingan & Logika', 'Perbandingan menghasilkan True atau False. and, or, dan not menggabungkan kondisi.', ['== membandingkan nilai', 'and: semua benar', 'or: salah satu benar'], "umur = 18\nprint(umur >= 17 and umur < 60)", 'True'),
                $this->lesson('input-pengguna', 'Menerima Input', 'input() selalu menghasilkan string. Gunakan int() atau float() saat membutuhkan angka.', ['input() mengembalikan str', 'Konversi tipe bila diperlukan'], "nama = input('Nama: ')\nprint(f'Halo, {nama}!')", 'Contoh input Dika: Halo, Dika!'),
                $this->lesson('string-dasar', 'Mengolah String', 'String adalah teks di dalam tanda kutip. Kamu dapat mengakses karakter dan memakai method string.', ['Index pertama adalah 0', 'upper() membuat huruf kapital', 'strip() menghapus spasi tepi'], "teks = 'Python'\nprint(teks[0], teks.upper())", 'P PYTHON'),
            ],
            'conditional' => [
                $this->lesson('if-statement', 'Kondisi if', 'Blok if dijalankan hanya ketika kondisinya bernilai True.', ['Akhiri kondisi dengan :', 'Isi blok harus diindentasi'], "nilai = 80\nif nilai >= 75:\n    print('Lulus')", 'Lulus'),
                $this->lesson('if-else', 'Kondisi if-else', 'else menyediakan aksi alternatif bila kondisi if bernilai False.', ['else tidak memiliki kondisi', 'Satu blok saja yang dijalankan'], "umur = 15\nif umur >= 17:\n    print('Boleh membuat KTP')\nelse:\n    print('Belum cukup umur')", 'Belum cukup umur'),
                $this->lesson('elif-statement', 'Kondisi elif', 'elif memeriksa kondisi tambahan dari atas ke bawah.', ['Boleh lebih dari satu elif', 'Urutkan kondisi dengan baik'], "nilai = 85\nif nilai >= 90:\n    print('A')\nelif nilai >= 80:\n    print('B')\nelse:\n    print('C')", 'B'),
                $this->lesson('conditional-practice', 'Latihan Percabangan', 'Gabungkan perbandingan dan logika untuk membuat keputusan yang jelas.', ['Ternary cocok untuk kondisi sederhana', 'Pilih nama variabel yang jelas'], "saldo = 50000\nharga = 30000\nprint('Beli' if saldo >= harga else 'Saldo kurang')", 'Beli'),
            ],
            'collections' => [
                $this->lesson('list-dasar', 'List', 'List menyimpan banyak nilai berurutan dan dapat diubah.', ['List ditulis dengan []', 'append() menambah item', 'Index dimulai dari 0'], "buah = ['apel', 'mangga']\nbuah.append('jeruk')\nprint(buah)", "['apel', 'mangga', 'jeruk']"),
                $this->lesson('list-slicing', 'Index & Slicing List', 'Gunakan index untuk satu item dan slicing untuk mengambil sebagian list.', ['list[-1] item terakhir', 'Batas akhir slicing tidak ikut diambil'], "angka = [10, 20, 30, 40]\nprint(angka[1:3])", '[20, 30]'),
                $this->lesson('tuple-dasar', 'Tuple', 'Tuple mirip list tetapi tidak dapat diubah setelah dibuat.', ['Tuple ditulis dengan ()', 'Cocok untuk data tetap'], "koordinat = (6, 9)\nprint(koordinat[0])", '6'),
                $this->lesson('set-dasar', 'Set', 'Set menyimpan nilai unik tanpa urutan tetap.', ['Set ditulis dengan {}', 'Duplikat otomatis dihapus', 'Set tidak mendukung index'], "angka = {1, 2, 2, 3}\nprint(len(angka))", '3'),
            ],
            'loop' => [
                $this->lesson('for-range', 'For dengan range()', 'for mengulang blok kode untuk setiap item. range(n) menghasilkan angka dari 0 sampai n-1.', ['range(start, stop, step)', 'Variabel loop berubah setiap iterasi'], "for angka in range(1, 4):\n    print(angka)", "1\n2\n3"),
                $this->lesson('for-collection', 'For pada Koleksi', 'for dapat langsung mengunjungi setiap item di list, string, tuple, atau dictionary.', ['Tidak perlu mengatur index manual', 'Gunakan nama variabel yang jelas'], "warna = ['merah', 'biru']\nfor item in warna:\n    print(item)", "merah\nbiru"),
                $this->lesson('while-loop', 'While Loop', 'while berjalan selama kondisi bernilai True. Ubah nilai pengontrol agar tidak menjadi infinite loop.', ['Siapkan nilai awal', 'Ubah pengontrol di dalam loop'], "nomor = 1\nwhile nomor <= 3:\n    print(nomor)\n    nomor += 1", "1\n2\n3"),
                $this->lesson('break-continue', 'break & continue', 'break menghentikan loop, sedangkan continue melewati sisa proses pada iterasi sekarang.', ['break keluar dari loop', 'continue lanjut ke iterasi berikutnya'], "for angka in range(5):\n    if angka == 2:\n        continue\n    print(angka)", "0\n1\n3\n4"),
            ],
            'functions' => [
                $this->lesson('def-function', 'Membuat Function', 'Function adalah blok kode bernama yang dapat dipanggil berkali-kali dengan def.', ['Nama function sebaiknya kata kerja', 'Isi function harus diindentasi'], "def sapa():\n    print('Selamat belajar!')\n\nsapa()", 'Selamat belajar!'),
                $this->lesson('function-parameters', 'Parameter & Argumen', 'Parameter menerima data dari pemanggil function; argumen adalah nilai yang dikirimkan.', ['Parameter ada di dalam ()', 'Argumen dapat posisi atau keyword'], "def sapa(nama):\n    print(f'Halo, {nama}!')\n\nsapa('Nadia')", 'Halo, Nadia!'),
                $this->lesson('return-function', 'Nilai Kembali dengan return', 'return mengirimkan hasil function kepada pemanggil agar dapat dipakai kembali.', ['Kode setelah return tidak dijalankan', 'Tanpa return hasilnya None'], "def luas_persegi(sisi):\n    return sisi * sisi\n\nprint(luas_persegi(4))", '16'),
                $this->lesson('default-parameters', 'Default Parameter', 'Default parameter memberi nilai cadangan ketika argumen tidak dikirimkan.', ['Default ditulis setelah parameter wajib', 'Nilai default dapat dioverride'], "def sapa(nama, salam='Halo'):\n    print(f'{salam}, {nama}!')\n\nsapa('Bima')", 'Halo, Bima!'),
            ],
            'dictionary' => [
                $this->lesson('dictionary-dasar', 'Membuat Dictionary', 'Dictionary menyimpan data dalam pasangan key dan value.', ['Dictionary ditulis dengan {}', 'Key harus unik', 'Value dapat beragam tipe'], "siswa = {'nama': 'Ayu', 'nilai': 90}\nprint(siswa['nama'])", 'Ayu'),
                $this->lesson('dictionary-access', 'Mengakses & Mengubah Dictionary', 'Ambil value memakai key. get() aman ketika key mungkin belum tersedia.', ['data[key] error jika key tidak ada', 'get(key, default) memberi cadangan'], "profil = {'nama': 'Raka'}\nprofil['kelas'] = '10A'\nprint(profil.get('kelas'))", '10A'),
                $this->lesson('dictionary-loop', 'Loop Dictionary', 'Gunakan items() untuk membaca key dan value sekaligus di dalam loop.', ['keys() memberi semua key', 'values() memberi semua value', 'items() memberi key dan value'], "nilai = {'Ana': 90, 'Budi': 80}\nfor nama, skor in nilai.items():\n    print(nama, skor)", "Ana 90\nBudi 80"),
                $this->lesson('dictionary-practice', 'Latihan: Data Sederhana', 'Gabungkan dictionary, conditional, dan function untuk mengolah data yang lebih terstruktur.', ['Pilih key yang konsisten', 'Pisahkan logika ke function'], "def status_siswa(siswa):\n    return 'Lulus' if siswa['nilai'] >= 75 else 'Belum lulus'\n\nprint(status_siswa({'nama': 'Sita', 'nilai': 82}))", 'Lulus'),
            ],
            default => [],
        };
    }

    private function lesson(string $slug, string $title, string $explanation, array $keyPoints, string $code, string $output): array
    {
        return ['slug' => $slug, 'title' => $title, 'explanation' => $explanation, 'key_points' => $keyPoints, 'code_example' => $code, 'output_example' => $output];
    }
}
