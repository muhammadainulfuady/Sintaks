import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  FileText,
  Gauge,
  Menu,
  MessageCircleQuestion,
  NotebookPen,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import logoTripleC from '../../assets/Salinan LOGO TRIPLE-C.png';
import logoTcc from '../../assets/Salinan LOGO TCC.png';
import logoJack from '../../assets/JACK 3.png';
import logoSintaks from '../../assets/logosintaks.png';
import heroImage from '../../assets/hero.png';
import novaMascot from '../../assets/maskotnova.png';
import { ScrollReveal } from '../../components/landing/ScrollReveal';

const navigation = [
  { label: 'Tentang Sintaks', href: '#tentang' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'NOVA', href: '#nova' },
];

const features = [
  { icon: BookOpen, title: 'Belajar Terstruktur', description: 'Learning path, modul, dan materi tersusun dari dasar agar kamu tidak bingung memulai.' },
  { icon: NotebookPen, title: 'Catatan Pribadi', description: 'Simpan poin penting dari setiap materi untuk dibaca kembali saat dibutuhkan.' },
  { icon: Code2, title: 'Interactive Coding', description: 'Tulis dan coba solusi Python langsung saat mengerjakan challenge.' },
  { icon: ClipboardCheck, title: 'Quiz Interaktif', description: 'Uji pemahaman melalui theory, code writing, dan code completion.' },
  { icon: Gauge, title: 'Evaluasi Otomatis', description: 'Dapatkan feedback yang jelas setelah jawabanmu diperiksa sistem.' },
  { icon: Bot, title: 'NOVA AI Tutor', description: 'Tanya konsep yang sedang dipelajari dan dapatkan penjelasan yang ramah pemula.' },
];

const journey = ['Pilih learning path', 'Pelajari modul', 'Baca materi', 'Simpan catatan', 'Tanya NOVA', 'Kerjakan quiz', 'Lanjut ke materi berikutnya'];

export const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Sintaks beranda">
            <div className="flex items-center gap-1.5" aria-label="Logo partner">
              <img src={logoTripleC} alt="Logo Triple-C" className="h-7 w-auto object-contain" />
              <img src={logoTcc} alt="Logo TCC" className="h-7 w-auto object-contain" />
              <img src={logoJack} alt="Logo JACK" className="h-7 w-auto object-contain" />
            </div>
            <img src={logoSintaks} alt="Logo Sintaks" className="h-9 w-9 rounded-xl object-contain" />
            <span className="font-sans text-xl font-extrabold tracking-tight">Sintaks</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi landing page">
            {navigation.map((item) => <a key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700">{item.label}</a>)}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link to="/login" className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100">Login</Link>
            <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700">Mulai Belajar <ArrowRight size={16} /></Link>
          </div>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden" aria-label="Buka menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden"><div className="mx-auto grid max-w-7xl gap-1">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-indigo-50">{item.label}</a>)}<div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3"><Link to="/login" className="rounded-xl border border-slate-200 px-3 py-2.5 text-center text-sm font-bold">Login</Link><Link to="/register" className="rounded-xl bg-indigo-600 px-3 py-2.5 text-center text-sm font-bold text-white">Mulai Belajar</Link></div></div></div>}
      </header>

      <main className="relative z-10">
        <ScrollReveal className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700"><Sparkles size={14} /> Platform belajar Python berbahasa Indonesia</span>
            <h1 className="mt-6 max-w-3xl font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Belajar coding dari <span className="text-indigo-600">baris pertama.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">Sintaks membantu kamu belajar Python secara bertahap melalui materi yang jelas, latihan interaktif, quiz, dan AI tutor yang siap menemani.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">Mulai Belajar Gratis <ArrowRight size={17} /></Link><Link to="/login" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Saya sudah punya akun</Link></div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500"><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Untuk pemula</span><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Materi bertahap</span><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Gratis mulai belajar</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-100 via-indigo-100 to-violet-100 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-indigo-200/60 sm:p-7">
              <div className="flex items-center justify-between"><div className="flex items-center gap-3"><img src={logoSintaks} alt="" className="h-11 w-11 rounded-xl object-contain" /><div><p className="text-xs font-bold text-indigo-600">PYTHON FUNDAMENTALS</p><p className="font-sans text-lg font-extrabold">Mulai dari dasar</p></div></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Pemula</span></div>
              <div className="mt-6 rounded-2xl bg-slate-900 p-5 font-mono text-sm leading-7 text-slate-200 shadow-inner"><p><span className="text-fuchsia-300">nama</span> = <span className="text-emerald-300">&quot;Pembelajar&quot;</span></p><p><span className="text-sky-300">print</span>(<span className="text-amber-200">f&quot;Halo, {'{'}nama{'}'}!&quot;</span>)</p><p className="mt-3 border-t border-slate-700 pt-3 text-emerald-300">Halo, Pembelajar!</p></div>
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-indigo-50 p-4"><img src={novaMascot} alt="Maskot NOVA" className="h-14 w-14 object-contain" /><p className="text-sm leading-5 text-slate-600"><strong className="text-slate-900">NOVA siap membantu.</strong><br />Bingung dengan sintaks Python? Tanyakan langsung.</p></div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal><section id="tentang" className="border-y border-slate-200 bg-white py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-bold text-indigo-600">KENAPA SINTAKS?</p><h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">Apa itu Sintaks?</h2><p className="mt-4 text-base leading-7 text-slate-600">Tempat belajar programming yang membuat langkah pertama terasa jelas, aman, dan menyenangkan—tanpa harus belajar sendirian.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{[['Mulai dari dasar', 'Materi Python tersusun dari konsep paling mendasar.'], ['Praktik dan evaluasi', 'Pahami konsep lalu uji kemampuanmu lewat quiz interaktif.'], ['Didampingi NOVA', 'Dapatkan penjelasan tambahan saat menemukan materi yang membingungkan.']].map(([title, body], index) => <div key={title} className="rounded-2xl border border-slate-200 p-6"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-sm font-extrabold text-indigo-600">0{index + 1}</span><h3 className="mt-4 font-sans text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></div>)}</div></div></section></ScrollReveal>

        <ScrollReveal><section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="text-center"><p className="text-sm font-bold text-indigo-600">ALUR BELAJAR</p><h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">Selangkah demi selangkah sampai paham.</h2></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">{journey.map((step, index) => <React.Fragment key={step}><div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"><span className="text-xs font-bold text-indigo-600">LANGKAH {index + 1}</span><p className="mt-2 text-sm font-bold text-slate-800">{step}</p></div>{index < journey.length - 1 && <ChevronRight className="hidden self-center justify-self-center text-indigo-300 lg:block" />}</React.Fragment>)}</div></section></ScrollReveal>

        <ScrollReveal><section id="fitur" className="bg-indigo-50/50 py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-bold text-indigo-600">FITUR UTAMA</p><h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">Belajar coding dengan cara yang lebih interaktif.</h2></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, description }) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={21} /></div><h3 className="mt-5 font-sans text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>)}</div></div></section></ScrollReveal>

        <ScrollReveal><section id="quiz" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-bold text-indigo-600">QUIZ EXPERIENCE</p><h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">Belajar tidak berhenti di materi.</h2><p className="mt-4 text-base leading-7 text-slate-600">Uji pemahaman dengan pertanyaan konsep, menulis kode sendiri, atau melengkapi kode. Setiap jawaban mendapat feedback yang jelas agar kamu terus berkembang.</p><Link to="/register" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700">Coba quiz setelah daftar <ArrowRight size={16} /></Link></div><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-slate-900 p-5 shadow-xl"><span className="rounded-full bg-indigo-500/30 px-2.5 py-1 text-[11px] font-bold text-indigo-100">CODE WRITING</span><p className="mt-4 text-sm font-semibold text-white">Tampilkan angka ganjil dari 1 sampai 10.</p><pre className="mt-4 overflow-x-auto rounded-xl bg-slate-800 p-4 text-xs leading-6 text-slate-200"><code>for i in range(1, 11):{`\n`}    if i % 2 != 0:{`\n`}        print(i)</code></pre><div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/15 p-3 text-xs font-semibold text-emerald-300"><CheckCircle2 size={15} /> Benar! Semua test case lulus.</div></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">CODE COMPLETION</span><pre className="mt-5 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-6 text-slate-200"><code>___ i in _____:{`\n`}    if i % 2 == 0:{`\n`}        print(i)</code></pre><div className="mt-4 flex flex-wrap gap-2"><span className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white">for</span><span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">range(1, 11)</span></div><p className="mt-4 text-xs text-slate-500">Lengkapi kode dengan pilihan yang tepat.</p></div></div></div></section></ScrollReveal>

        <ScrollReveal><section id="nova" className="bg-slate-900 py-20 text-white"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><p className="text-sm font-bold text-indigo-300">NOVA AI TUTOR</p><h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">Ada yang membingungkan? NOVA siap menemani.</h2><p className="mt-4 max-w-xl text-base leading-7 text-slate-300">NOVA membantu menjelaskan konsep, memberi analogi, dan menyederhanakan materi yang sedang kamu pelajari—tanpa memberi jawaban quiz secara langsung.</p><Link to="/register" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50">Belajar bersama NOVA <MessageCircleQuestion size={17} /></Link></div><div className="flex items-center gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8"><img src={novaMascot} alt="Maskot NOVA" className="h-28 w-28 object-contain sm:h-36 sm:w-36" /><div className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-xl"><p className="font-bold text-indigo-700">NOVA</p><p className="mt-1">&ldquo;Kita pelajari pelan-pelan, ya. Mau saya jelaskan contoh function ini?&rdquo;</p></div></div></div></section></ScrollReveal>
      </main>
      <footer className="relative z-10 border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><div className="flex items-center gap-2"><img src={logoSintaks} alt="" className="h-7 w-7 object-contain" /><span className="font-semibold text-slate-700">Sintaks</span></div><p>Jembatan dari Baris Pertama Menuju Developer Profesional.</p></div></footer>
    </div>
  );
};
