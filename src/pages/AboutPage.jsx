import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../shared/hooks/useI18n.js';
import {
  BookOpen,
  Zap,
  Shield,
  Clock,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Printer,
  Layers,
  Star,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const features = [
    {
      icon: Clock,
      gradient: 'from-brand-400 to-emerald-500',
      shadowColor: 'shadow-brand-500/20',
      title: "Tez va Oson",
      desc: "Atigi 5 daqiqada professional test yarating. Hech qanday murakkab sozlamalar kerak emas.",
    },
    {
      icon: Zap,
      gradient: 'from-blue-400 to-indigo-500',
      shadowColor: 'shadow-blue-500/20',
      title: "Zamonaviy Shablon",
      desc: "A/B/C/D ko'rinishidagi chiroyli Multiple Choice shablonlari tayyor — faqat savollaringizni kiriting.",
    },
    {
      icon: Printer,
      gradient: 'from-amber-400 to-orange-500',
      shadowColor: 'shadow-amber-500/20',
      title: "Chop Etish",
      desc: "Yaratilgan testni bir tugma bosish orqali PDF sifatida yuklab oling yoki to'g'ridan-to'g'ri chop eting.",
    },
    {
      icon: Shield,
      gradient: 'from-violet-400 to-purple-500',
      shadowColor: 'shadow-violet-500/20',
      title: "Xavfsiz Saqlash",
      desc: "Barcha testlaringiz hisobingizda saqlanadi va istalgan vaqtda qayta foydalanishingiz mumkin.",
    },
    {
      icon: Layers,
      gradient: 'from-teal-400 to-cyan-500',
      shadowColor: 'shadow-teal-500/20',
      title: "Tayyor Shablonlar",
      desc: "Oldindan tayyorlangan shablonlardan foydalaning — vaqtingizni tejang, sifatni oshiring.",
    },
    {
      icon: Star,
      gradient: 'from-rose-400 to-pink-500',
      shadowColor: 'shadow-rose-500/20',
      title: "Professional Natija",
      desc: "Excel yoki Wordga ehtiyoj yo'q. Har bir test toza, professional va chop etishga tayyor holda chiqadi.",
    },
  ];

  const steps = [
    {
      number: '01',
      title: "Shablonni tanlang",
      desc: "O'zingizga mos bo'lgan yoki tayyor test shablonlaridan birini tanlang.",
      gradient: 'from-brand-400 to-emerald-500',
    },
    {
      number: '02',
      title: "Test yarating",
      desc: "Savolni kiriting, A/B/C/D variantlarni to'ldiring va to'g'ri javobni belgilang.",
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      number: '03',
      title: "Chop eting yoki saqlang",
      desc: "Testni PDF sifatida yuklab oling yoki keyinroq foydalanish uchun saqlang.",
      gradient: 'from-violet-400 to-purple-500',
    },
  ];

  const stats = [
    { icon: FileText, value: '1,247', label: "Yaratilgan testlar", gradient: 'from-brand-400 to-emerald-500' },
    { icon: Users, value: '523', label: "Faol o'qituvchilar", gradient: 'from-blue-400 to-indigo-500' },
    { icon: CheckCircle, value: '89', label: "Tayyor shablonlar", gradient: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ──── HERO ──── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-brand-50/30 to-emerald-50/30" />
        <div className="absolute top-10 -left-20 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-emerald-200/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4" />
            AutoQuiz haqida
          </div>
          <h1 className="animate-slide-up stagger-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
            O'qituvchilar uchun{' '}
            <span className="bg-gradient-to-r from-brand-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient">
              aqlli test
            </span>
            {' '}yaratish platformasi
          </h1>
          <p className="animate-slide-up stagger-3 text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            AutoQuiz — o'qituvchilarga professional testlarni tez, oson va sifatli yaratishga
            yordam beradigan zamonaviy vosita. Excel va Wordga xayrlashing — hamma narsa bir joyda!
          </p>
          <div className="animate-slide-up stagger-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/create')}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-brand-500 to-emerald-500 hover:from-brand-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all active:scale-[0.97] cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              Test yaratishni boshlash
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/templates')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-[0.97] cursor-pointer"
            >
              Shablonlarni ko'rish
            </button>
          </div>
        </div>
      </section>

      {/* ──── STATS ──── */}
      <section className="relative py-16 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`animate-slide-up stagger-${i + 1} group bg-gray-50/50 rounded-3xl p-8 text-center border border-gray-100 hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="text-4xl font-extrabold text-gray-900 mb-1">{s.value}</p>
                  <p className="text-gray-500 font-medium text-sm">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── FEATURES ──── */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-50/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-sm font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" />
              Imkoniyatlar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Nima uchun{' '}
              <span className="bg-gradient-to-r from-brand-500 to-emerald-500 bg-clip-text text-transparent">AutoQuiz?</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Zamonaviy texnologiyalar yordamida test yaratish jarayonini soddalashtiramiz
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className={`animate-slide-up stagger-${Math.min(i + 1, 6)} group bg-white rounded-3xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 cursor-default`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg ${f.shadowColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── HOW IT WORKS ──── */}
      <section className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-sm font-semibold mb-4">
              <CheckCircle className="w-3.5 h-3.5" />
              Qadamlar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Qanday{' '}
              <span className="bg-gradient-to-r from-brand-500 to-emerald-500 bg-clip-text text-transparent">ishlaydi?</span>
            </h2>
            <p className="text-gray-500 text-lg">Faqat 3 ta qadam — va testingiz tayyor!</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`animate-slide-up stagger-${i + 1} group flex items-start gap-6 bg-gray-50/50 hover:bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-card-hover transition-all duration-500`}
              >
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.gradient} text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
